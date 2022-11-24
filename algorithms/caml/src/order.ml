(* Arguments:
  1. Executable
  2. filename containing graph json string
  3. (optional) Max number of orderings to check. 0 means no max.
*)

let () = 
  match Core.Sys.get_argv () |> Core.Array.to_list with
  | _ :: filename :: xs -> begin
    filename
    |> Graph_utils.graph_from_file
    |> Find_ordering.find_ordering ?max_orders:(match xs with [x] -> Some (Core.Int.of_string x) | _ -> None)
    |> Find_ordering.return_record_to_yojson
    |> Yojson.Safe.to_string
    |> Core.print_endline
  end
  | _ -> failwith "[ARGUMENT ERROR] Not enough arguments. Expected filename."