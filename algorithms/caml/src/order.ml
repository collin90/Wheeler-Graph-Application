(* 

  Run the order.exe executable with either named argument --file or --json.

  If --file is given, the next argument is a file path for a text file containing the json representation of a graph.

  If --json is given, the next argument is a json string for a graph.

  The last argument is optional and is the max number of orders to consider. If it is given to be 0, then no maximum is considered.
  
  NOTE: Expects json argument to be in quotes, and any quotes that are part of the json format must have backslashes.
  e.g. of valid call:
  ./order.exe --json "{\"nodes\":[{\"id\":\"0\",\"order\":0},{\"id\":\"1\",\"order\":1},{\"id\":\"2\",\"order\":2}],\"edges\":[{\"id\":\"asd\",\"source\":\"0\",\"target\":\"1\",\"label\":\"A\"},{\"id\":\"asdf\",\"source\":\"0\",\"target\":\"2\",\"label\":\"A\"}]}" 100

  e.g. of valid call with --file:
  ./order.exe --file ./test/unit_test_files/large_orderable1.txt 0
*)


let run_graph xs g =
  g
  |> Find_ordering.find_ordering ?max_orders:(match xs with [x] -> Some (Core.Int.of_string x) | _ -> None)
  |> Find_ordering.return_record_to_yojson
  |> Yojson.Safe.to_string
  |> Core.print_endline

let () = 
  match Core.Sys.get_argv () |> Core.Array.to_list with
  | _ :: "--file" :: filename :: xs -> begin
    filename
    |> Graph_utils.graph_from_file
    |> run_graph xs
  end
  | _ :: "--json" :: graphstring :: xs -> begin
    graphstring
    |> Yojson.Safe.from_string
    |> Graph_utils.graph_of_yojson
    |> Core.Result.ok_or_failwith
    |> run_graph xs
  end
  | _ -> failwith "[ARGUMENT ERROR] Not enough arguments. Expected named argument \"--file\" or \"--json\"."