(* 

  Run the order.exe executable with either named argument --file or --json. Exactly one of these arguments are required.

  Optional arguments are --max_orders and --max_iterations.

  Valid calls, where items in parentheses are optional:
  ./order.exe --file <filename> (--max_orders 40320 --max_iterations 1000000)
  ./order.exe --json <json string> (--max_orders 120 --max_iterations 10000)

  --max_iterations is the upper bound for iterations over graph elements when looking for an ordering.
    If this bound is expected to be exceeded, an error message will be returned.

  --max_orders is the upper bound for the number of suborderings to try within each equivalence class
    before the suborderings are combined into total orderings. Because some suborderings can never be
    part of a total Wheeler ordering, these suborderings are removed and are not considered for total
    orderings, thus not counting towards max_iterations.

  Example of valid call with --json:
  ./order.exe --json "{\"nodes\":[{\"id\":\"0\",\"order\":0},{\"id\":\"1\",\"order\":1},{\"id\":\"2\",\"order\":2}],\"edges\":[{\"id\":\"asd\",\"source\":\"0\",\"target\":\"1\",\"label\":\"A\"},{\"id\":\"asdf\",\"source\":\"0\",\"target\":\"2\",\"label\":\"A\"}]}" --max_orders 100

  Example of valid call with --file:
  ./order.exe --file ./test/unit_test_files/large_orderable1.txt

*)

open Core
module String_map = Map.Make(String)

let is_tag = String.is_prefix ~prefix:"--"

let parse_args xs =
  let rec parse_args' acc = function
    | tag :: value :: xss when is_tag tag -> parse_args' (String_map.add_exn acc ~key:tag ~data:value) xss
    | _ -> acc
  in
  parse_args' String_map.empty xs

let get_graph args =
  match String_map.find args "--json", String_map.find args "--file" with
  | Some j, None -> Yojson.Safe.from_string j |> Graph_utils.graph_of_yojson |> Result.ok_or_failwith
  | None, Some f -> Graph_utils.graph_from_file f (* same as line above but with Yojson.Safe.from_file *)
  | None, None -> failwith "[ARGUMENT ERROR] Not enough arguments. Expected named argument \"--file\" or \"--json\"."
  | _ -> failwith "[ARGUMENT ERROR] Too many arguments. Expected only one of \"--file\" or \"--json\" but got both."

let find m k f = Option.Let_syntax.(String_map.find m k >>| f)

let () = 
  let args =
    Sys.get_argv ()
    |> Array.to_list
    |> List.tl_exn (* First arg is always executable name. Ignore it *)
    |> parse_args
  in
  let get_int_arg = fun s -> find args s Int.of_string in
  args
  |> get_graph
  |> Find_ordering.find_ordering ?max_orders:(get_int_arg "--max_orders") ?max_iterations:(get_int_arg "--max_iterations")
  |> Find_ordering.return_record_to_yojson
  |> Yojson.Safe.to_string
  |> print_endline