open Core

let rec fac x = if x < 2 then 1 else x * (fac @@ x - 1)

(* Remove item from list *)
let rm (x: 'a) (l: 'a list) ~(equal: 'a -> 'a -> bool) : 'a list =
  List.filter l ~f:(fun y -> equal x y |> not)

(* Find all permutations of the list. *)
(* Implementation: for each value in the list, permute the rest of the list and put that value on the front of each permutation *)
let rec permutations (l: 'a list) ~(equal: 'a -> 'a -> bool) : 'a list list =
  match l with
  | [] -> []
  | [x] -> [[x]]
  | _ -> List.fold l ~init:[] ~f:(insert l ~equal)
  and
insert (l: 'a list) (accum: 'a list list) (x: 'a) ~(equal: 'a -> 'a -> bool) : 'a list list =
  rm x l ~equal (* Remove the value from the list, so we can permute the rest *)
  |> permutations ~equal
  |> List.map ~f:(List.cons x) (* Put the removed item on the front of the list *)
  |> List.append accum

(* The given list is of the following format, where different braces denote different levels in the list,
   l = [
    {(), ..., ()},
    ...
    {(), ..., ()}
   ].
   The goal is to find all combinations of (), with exactly one coming from each {}.

   For example, if l = [{(a, b), (b, a)}, {(c)}, {(d, e), (e, d)}], then combos l =
   [{(a, b), (c), (d, e)},
    {(a, b), (c), (e, d)},
    {(b, a), (c), (d, e)},
    {(b, a), (c), (e, d)}].

  Empty {} lists will be ignored.
*)
let combos (l : 'a list list list) : 'a list list list =
  let rec combos' = function
    | [] -> []
    | [p] -> List.map p ~f:List.return
    | hd :: tl ->
      let cs = combos' tl in (* Get all combos of tl, and then we'll put each item from hd on front *)
      (* List.map hd ~f:(fun a -> List.map cs ~f:(List.cons a)) |> List.join *)
      List.cartesian_product hd cs |> List.map ~f:(fun (a, b) -> a :: b)
    in
    List.filter l ~f:(Fn.compose not List.is_empty) |> combos'