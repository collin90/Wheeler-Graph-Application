open Core
open OUnit2
open Find_ordering

[@@@ocaml.warning "-32"] (* In case tests are commented out *)

(* unit_test_files doesn't get copied into _build *)
let test_folder = "../../../test/unit_test_files/"

(* Assumes the json is properly formatted and the file exists *)
let read_graph (infile: string) : Graph_utils.graph =
  test_folder ^ infile
  |> Yojson.Safe.from_file
  |> Graph_utils.graph_of_yojson
  |> Result.ok_or_failwith

let assert_wheeler (infile: string) (expected: bool) : unit =
  let output = infile |> read_graph |> is_wheeler
  in
  OUnit2.assert_equal expected output

let test_simple_wheeler _ =
  assert_wheeler "simple_false1.txt" false;
  assert_wheeler "simple_false2.txt" false;
  assert_wheeler "simple_true1.txt" true;
  assert_wheeler "simple_true2.txt" true;
  assert_wheeler "simple_true3.txt" true

let test_complex_wheeler _ =
  assert_wheeler "complex_false1.txt" false;
  assert_wheeler "complex_true1.txt" true

let is_wheeler_tests =
  "Is Wheeler"
  >: test_list
       [
        "Simple" >:: test_simple_wheeler;
        "Complex" >:: test_complex_wheeler;
       ]

let assert_message ?(max_orders) ?(max_iterations) (infile: string) (message: string) : unit =
  let output = infile |> read_graph |> find_ordering ?max_orders ?max_iterations
  in
  OUnit2.assert_equal message output.message

let test_simple_ordering _ =
  assert_message "simple_true1.txt" good_message;
  assert_message "simple_true2.txt" good_message;
  assert_message "simple_true3.txt" good_message;
  assert_message "simple_false1.txt" cycle_message;
  assert_message "simple_false2.txt" diff_labels_message

let test_complex_ordering _ =
  assert_message "complex_true1.txt" good_message; (* originally intended for is_wheeler *)
  assert_message "complex_orderable1.txt" good_message;
  assert_message "complex_orderable2.txt" good_message;
  assert_message "complex_orderable3.txt" good_message;
  assert_message "complex_orderable4.txt" good_message;
  assert_message "complex_orderable5.txt" good_message;
  assert_message "complex_false1.txt" diff_labels_message;
  assert_message "complex_unorderable1.txt" cycle_message;
  assert_message "complex_unorderable2.txt" all_orders_message

let test_large_ordering _ =
  let case = assert_message ?max_orders:None ?max_iterations:(Some (Int.pow 2 29)) in
  case "large_orderable1.txt" good_message;
  case "large_orderable3.txt" good_message;
  (* case "large_orderable4.txt" too_large_message; Increase bound to let this work *)
  case "large_unorderable1.txt" all_orders_message;
  case "large_unorderable2.txt" all_orders_message

let find_ordering_tests =
  "Find ordering"
  >: test_list
       [
         "Simple" >:: test_simple_ordering;
         "Complex" >:: test_complex_ordering;
         "Large" >:: test_large_ordering;
       ]

let series =
  "Graph tests"
  >::: [
         is_wheeler_tests;
         find_ordering_tests;
       ]

let () = run_test_tt_main series
