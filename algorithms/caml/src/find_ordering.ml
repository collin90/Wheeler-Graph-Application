(*
   FIND_ORDERING

   Finds an ordering on a given graph. General graph functions are in graph_utils.ml
   Helper functions wrt permutations are in permutations.ml
*)

[@@@warning "-27"] (* Ignore unused variable warnings *)

open Core
open Graph_utils
open Permutations
open Result
open Result.Let_syntax

type return_record = {
  ordering: graph;
  message: string;
} [@@deriving yojson]

let good_message = "Graph is Wheeler."
let diff_labels_message = "Graph cannot be Wheeler because a node has incoming edges with different labels."
let all_orders_message = "Graph is not Wheeler because all possible orderings were tried."
let cycle_message = "Graph is not Wheeler because there is a cycle using edges with one unique edge label."
let too_large_message = "Too many possible orderings to try."
let unorderable_eq_message = "Graph is not Wheeler because some equivalence class cannot be ordered."

(* CYCLES *)

(* Looks for a cycle in the graph made only of edges with one label. Self-loops do not count *)
let check_label_cycle (g: graph) : (graph, string) result =
  if
    g.edges
    |> Edge.labels
    |> String_set.of_list
    |> String_set.exists ~f:(fun l -> get_sub_graph_label g l |> remove_self_loops |> has_cycle)
  then Error cycle_message else Ok g

(* WHEELER PROPERTY *)

(* True if all nodes with zero in-degree come first in the ordering on the graph *)
let zero_in_first (g: graph) : bool =
  let in_degree = get_in_degrees g in
  let deg id = match String_map.find in_degree id with None -> 0 | Some x -> x in
  let rec aux (ns: nodelist) (m: int) (m0: int) : bool =
    match ns with
    | [] -> m0 < m (* compare max and min orders *)
    | hd :: tl -> begin
      let d = deg hd.id in
      if d = 0 && hd.order > m0 then aux tl m hd.order else (* update max order for zero-in-degree*)
      if d > 0 && hd.order < m then aux tl hd.order m0 else (* update min order for nonzero-in-degree*)
      aux tl m m0
    end
  in
  aux g.nodes Int.max_value (-1)

let _is_wheeler ?(edge_product: (Edge.edge * Edge.edge) list option = None) (g: graph) (test_in_degree: bool) : bool =
  if test_in_degree && zero_in_first g |> not then false else
  let order id = g.nodes |> get_node_map |> (String_map.find >< id) |> Option.value_exn |> fun n -> n.order in
  let case2 e1 e2 = not begin String.(e1.label < e2.label) && order e1.target >= order e2.target end in
  let case3 e1 e2 = not begin String.(e1.label = e2.label) && order e1.source < order e2.source && order e1.target > order e2.target end in
  (* Consider all combos of edges. It may be given as an optional argument, or else we compute it here *)
  edge_product
  |> Option.value ~default:(List.cartesian_product g.edges g.edges)
  |> List.for_all ~f:(fun (e1, e2) -> case2 e1 e2 && case3 e1 e2)
  
let is_wheeler ?edge_product (g: graph) : bool = _is_wheeler ?edge_product g true
let is_wheeler_no_degree ?edge_product (g: graph) : bool = _is_wheeler ?edge_product g false

(* FIND ORDERING *)

(* Order the nodes according to the permutation of node ids *)
let get_ordered_graph (perm: string list) (g: graph) : graph =
  { nodes = Node.create_nodes perm ; edges = g.edges }

(* See next function. subg has precisely the ids in the given permutation *)
let perm_passes_subg (perm: string list) (subg: graph) : bool =
  subg
  |> get_ordered_graph perm
  |> is_wheeler_no_degree

(* False if the permutation (within an edge-label eq class) fails itself wrt Wheeler property *)
let perm_passes (perm: string list) (g: graph) : bool =
  get_sub_graph g perm |> perm_passes_subg perm

let get_perms (max_orders: int) (g: graph) : (string list list list, string) result =
  let get_perms' (ids: string list) : string list list =
    let subg = get_sub_graph g ids in (* Take subgraph here so we don't do it on every permutation *)
    ids |> permutations ~equal:String.( = ) |> List.filter ~f:(fun perm -> perm_passes_subg perm subg)
  in
  let id_eq_classes =
    g
    |> get_label_set
    |> String_map.to_alist ?key_order:(Some `Increasing)
    |> List.map ~f:(fun (_, ss) -> String_set.to_list ss) (* Disregard label; just keep equivalence class of node ids *)
  in
  if List.exists id_eq_classes ~f:(fun l -> List.length l > max_orders) then Error too_large_message
  else List.map id_eq_classes ~f:get_perms' |> return

let get_all_orderings (g: graph) (max_iterations: int) (perms: string list list list) : (graph list, string) result =
  let n = List.length g.nodes in
  perms
  |> List.fold ~init:1 ~f:(fun accum l -> List.length l * accum) (* How many combos are needed *)
  |> fun num_iters -> if num_iters > max_iterations then Error too_large_message else Ok perms
  >>| combos (* using combos' here and no join statement afterwards is just a little slower *)
  >>| List.map ~f:List.join
  >>= fun l -> if List.exists l ~f:(fun q -> List.length q <> n) then Error unorderable_eq_message else Ok l (* Some eq class cannot be permuted <=> effectively tried all orders *)
  >>| List.map ~f:(get_ordered_graph >< g)

(* We cache cartesian product of edges because they don't change *)
let try_all_orderings (edges: edgelist) (os: graph list) : (graph, string) result =
  os
  |> List.find ~f:(is_wheeler ~edge_product:(Some (List.cartesian_product edges edges)))
  |> Result.of_option ~error:all_orders_message

(* This filters the orderings as it partially tries them. Is a little slower than get_all_orderings and try_all_orderings *)
(* Stopped working for some reason... *)
let filter_all_orderings (g: graph) (perms: string list list list) : (graph, string) result =
  let my_filter = fun ids -> get_sub_graph g ids |> get_ordered_graph ids |> is_wheeler_no_degree in
  let n = List.length g.nodes in
  perms
  |> combos' ~filter:my_filter
  |> fun l -> if List.exists l ~f:(fun q -> List.length q <> n) then Error unorderable_eq_message else Ok l (* Some eq class cannot be permuted <=> effectively tried all orders *) (* Is it better to assert that all are length n ?*)
  >>| List.find ~f:((get_ordered_graph >< g) ||> is_wheeler) (* Compose these to reduce the number of maps we do *)
  >>= Result.of_option ~error:all_orders_message
  >>| (get_ordered_graph >< g)

(* Checks if the graph has some node with two different incoming edge labels.
  If so, then Error msg. If not, then Ok graph. *)
let check_diff_labels (g: graph) : (graph, string) result =
  let ls = get_label_set g
    |> String_map.to_alist
    |> List.map ~f:Tuple2.get2
  in
  let n_sets id = List.filter ls ~f:(String_set.mem >< id) |> List.length in (* number of sets in which id occurs *)
  g.nodes
  |> Node.ids
  |> List.for_all ~f:(fun id -> (n_sets id) < 2) (* assert that each node is in fewer than 2 label sets *)
  |> fun is_ok -> if is_ok then Ok g else Error diff_labels_message

(* Monadic '>>=' binding are with Result. If it is ever Error 'msg', then it skips over the rest. *)
let find_ordering ?(max_orders: int = Int.max_value) ?(max_iterations: int = Int.max_value) (g: graph) : return_record =
  match
    g
    |> check_diff_labels
    >>= check_label_cycle
    >>= get_perms max_orders
    (*>>= filter_all_orderings g*)(* This is just a little slower than if I were to use it and remove the next two lines *)
    >>= get_all_orderings g max_iterations
    >>= try_all_orderings g.edges
  with
  | Ok g -> { ordering = g; message = good_message }
  | Error s -> { ordering = { nodes = []; edges = [] }; message = s} (* return empty graph and the error message *)