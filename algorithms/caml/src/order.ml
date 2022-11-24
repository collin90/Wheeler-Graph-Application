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

(* IF WE'D PREFER THAT THE INPUT IS A GRAPH JSON STRING INSTEAD OF A FILENAME, UNCOMMENT THE FOLLOWING CODE, AND COMMENT THE ABOVE CODE.
  
  NOTE: Expects argument to be in quotes, and any quotes that are part of the json format must have backslashes.
  e.g. of valid call:
  ./order.exe "{\"nodes\":[{\"id\":\"0\",\"order\":0},{\"id\":\"1\",\"order\":1},{\"id\":\"2\",\"order\":2}],\"edges\":[{\"id\":\"asd\",\"source\":\"0\",\"target\":\"1\",\"label\":\"A\"},{\"id\":\"asdf\",\"source\":\"0\",\"target\":\"2\",\"label\":\"A\"}]}" 100
*)
(* let () = 
  match Core.Sys.get_argv () |> Core.Array.to_list with
  | _ :: graphstring :: xs -> begin
    graphstring
    |> Yojson.Safe.from_string
    |> Graph_utils.graph_of_yojson
    |> Core.Result.ok_or_failwith
    |> Find_ordering.find_ordering ?max_orders:(match xs with [x] -> Some (Core.Int.of_string x) | _ -> None)
    |> Find_ordering.return_record_to_yojson
    |> Yojson.Safe.to_string
    |> Core.print_endline
  end
  | _ -> failwith "[ARGUMENT ERROR] Not enough arguments. Expected graph json string." *)