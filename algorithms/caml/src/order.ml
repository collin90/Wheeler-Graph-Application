(* 

  Run the order.exe executable with either named argument --file or --json.

  Optional arguments are --max_orders and --max_iterations.

  Example of valid call with --json:
  ./order.exe --json "{\"nodes\":[{\"id\":\"0\",\"order\":0},{\"id\":\"1\",\"order\":1},{\"id\":\"2\",\"order\":2}],\"edges\":[{\"id\":\"asd\",\"source\":\"0\",\"target\":\"1\",\"label\":\"A\"},{\"id\":\"asdf\",\"source\":\"0\",\"target\":\"2\",\"label\":\"A\"}]}" 100

*)

open Core

(* It's a better idea to use a map. Then I can add any number of arguments and access them with a string. It wouldn't be as hardcoded *)
type arg_record = {
  file: string option;
  json: string option;
  max_orders: int option;
  max_iterations: int option;
}

let empty_args = { file = None; json = None; max_orders = None; max_iterations = None }

let parse_args xs =
  let rec parse_args' acc = function
    | "--file" :: filename :: xss -> parse_args' { acc with file = Some filename } xss
    | "--json" :: graphstring :: xss -> parse_args' { acc with json = Some graphstring } xss
    | "--max_orders" :: x :: xss -> parse_args' { acc with max_orders = Some (Int.of_string x) } xss
    | "--max_iterations" :: x :: xss -> parse_args' { acc with max_iterations = Some (Int.of_string x) } xss
    | _ -> acc
  in
  parse_args' empty_args xs

let get_graph args =
  match args.json, args.file with
  | Some j, None -> Yojson.Safe.from_string j |> Graph_utils.graph_of_yojson |> Result.ok_or_failwith
  | None, Some f -> Graph_utils.graph_from_file f (* same as line above but with Yojson.Safe.from_file *)
  | None, None -> failwith "[ARGUMENT ERROR] Not enough arguments. Expected named argument \"--file\" or \"--json\"."
  | _ -> failwith "[ARGUMENT ERROR] Too many arguments. Expected only one of \"--file\" or \"--json\" but got both."

let () = 
  let args =
    Sys.get_argv ()
    |> Array.to_list
    |> List.tl_exn (* First arg is always executable name. Ignore it *)
    |> parse_args
  in
  args
  |> get_graph
  |> Find_ordering.find_ordering ?max_orders:(args.max_orders) ?max_iterations:(args.max_iterations)
  |> Find_ordering.return_record_to_yojson
  |> Yojson.Safe.to_string
  |> print_endline