open Core

module String_set = Set.Make(String)
module String_map = Map.Make(String)

module Node = struct
  type node = {
    id: string;
    order: int;
  } [@@deriving yojson]

  type nodelist = node list [@@deriving yojson]
  
  let ids = List.map ~f:(fun n -> n.id)
  let orders = List.map ~f:(fun n -> n.order)
  let create_nodes = List.mapi ~f:(fun i a -> { id = a ; order = i })
end

module Edge = struct
  type edge = {
    id: string;
    source: string;
    target: string;
    label: string;
  } [@@deriving yojson]

  type edgelist = edge list [@@deriving yojson]

  let ids = List.map ~f:(fun e -> e.id)
  let sources = List.map ~f:(fun e -> e.source)
  let targets = List.map ~f:(fun e -> e.target)
  let labels = List.map ~f:(fun e -> e.label)
end

include Node
include Edge

type graph = {
  nodes: nodelist;
  edges: edgelist;
} [@@deriving yojson]

let graph_from_file fname = Yojson.Safe.from_file fname |> graph_of_yojson |> Result.ok |> Option.value_exn

(* Assumes nodes in ns have distinct ids *)
let get_node_map (ns: nodelist) : node String_map.t =
  ns
  |> List.zip_exn (Node.ids ns)
  |> String_map.of_alist_exn

(* Maps id to number of incoming edges. Not in map if in-degree is zero. *)
let get_in_degrees (g: graph) : int String_map.t =
  g.edges
  |> Edge.targets
  |> List.map ~f:(Fn.flip Tuple2.create ()) (* Map to arbitrary tuple *)
  |> String_map.of_alist_multi (* Maps target id to a list *)
  |> String_map.map ~f:List.length

(* List of node ids that have zero in-degree *)
let get_zero_in_degree (g: graph) : string list =
  let m = get_in_degrees g in
  g.nodes
  |> Node.ids
  |> List.filter ~f:(Fn.compose Option.is_none (String_map.find m))

(* Maps each edge label to set of node ids. i.e. gets the equivalence classes defined by incoming edge labels *)
let get_label_set (g: graph) : String_set.t String_map.t =
  List.zip_exn (Edge.labels g.edges) (Edge.targets g.edges)
  |> String_map.of_alist_multi (* Now edge label maps to list of target ids *)
  |> String_map.add_exn ~key:"" ~data:(get_zero_in_degree g)
  |> String_map.map ~f:String_set.of_list

(* Gets the subgraph defined by all edges with the given edge label.
   Assume this doesn't get called that much, and a quadratic approach is fine. *)
let get_sub_graph_label (g: graph) (l: string) : graph =
  match String_map.find (get_label_set g) l with
  | None -> {nodes = []; edges = []}
  | Some id_set -> begin
    let is_in = String_set.mem id_set in
    let new_nodes = List.filter g.nodes ~f:(fun n -> is_in n.id) in
    let new_edges = List.filter g.edges ~f:(fun e -> is_in e.source && is_in e.target) in
    { nodes = new_nodes; edges = new_edges }
  end

(* Keeps only nodes and edges restricted to the given node ids *)
let get_sub_graph (g: graph) (ids: string list) : graph =
  let is_in = List.mem ids ~equal:String.equal in
  { nodes = List.filter g.nodes ~f:(fun n -> is_in n.id); edges = List.filter g.edges ~f:(fun e -> is_in e.source && is_in e.target) }

(* Removes edges that make self loops *)
let remove_self_loops (g: graph) : graph =
  { nodes = g.nodes ; edges = List.filter g.edges ~f:(fun e -> String.(e.source <> e.target)) }

(* Maps node id to set of ids that are neighbors, i.e. gets adjacency map *)
let get_neighbors (g: graph) : string list String_map.t =
  List.zip_exn (Edge.sources g.edges) (Edge.targets g.edges)
  |> String_map.of_alist_multi

(* Looks for cycle in disconnected graph *)
let has_cycle (g: graph) =
  (* First step is to create the adjacency map *)
  let ns = get_neighbors g in
  let neighbors (id: string) : string list =
    match String_map.find ns id with None -> [] | Some ls -> ls
  in
  (* This will check if there is a cycle that starts and ends with the given node id *)
  let node_makes_cycle (src_id: string) : bool =
    let rec aux (visited: String_set.t) (stack: string list) : bool =
      match stack with
      | [] -> false (* exhausted all paths and didn't make it back to src *)
      | hd :: tl -> begin
        if String.(hd = src_id) then true (* Completed the cycle *)
        else if String_set.mem visited hd then aux visited tl (* Node already seen, so don't search neighbors*)
        else aux (String_set.add visited hd) (neighbors hd @ tl) (* Mark node as seen and search neighbors *)
      end
    in aux String_set.empty @@ neighbors src_id (* Begin by searching neighbors of src_id *)
  in
  g.nodes
  |> Node.ids
  |> List.exists ~f:node_makes_cycle