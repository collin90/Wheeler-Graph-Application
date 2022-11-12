import unittest
import json
from is_wheeler import is_wheeler
from find_ordering import * # imports find_ordering function and MESSAGE consts

test_folder = './algorithms/unit_test_files/wheeler/'

def get_message(filename, MAX_ITERATIONS=2**20):
    infile = open(test_folder + filename, 'r')
    graph_string = infile.readline().removesuffix('\n')
    infile.close()
    return find_ordering(json.loads(graph_string), MAX_ITERATIONS)['message']

def print_order(filename, MAX_ITERATIONS=2**20):
    """Prints the nodes from the ordering so that we can see the solution."""
    infile = open(test_folder + filename, 'r')
    graph_string = infile.readline().removesuffix('\n')
    infile.close()
    print(find_ordering(json.loads(graph_string), MAX_ITERATIONS)['ordering']['nodes'])

class TestFindOrdering(unittest.TestCase):
    def test_find_ordering(self):
        self.assertEqual(GOOD_MESSAGE, get_message('simple_true1.txt'))
        self.assertEqual(GOOD_MESSAGE, get_message('simple_true2.txt'))
        self.assertEqual(GOOD_MESSAGE, get_message('simple_true3.txt'))
        self.assertEqual(CYCLE_MESSAGE, get_message('simple_false1.txt')) # could check for a cycle with all the same edge labels
        self.assertEqual(DIFF_LABELS_MESSAGE, get_message('simple_false2.txt'))

        self.assertEqual(GOOD_MESSAGE, get_message('complex_true1.txt')) # has 6 nodes, 11 edges => worst case is 6!*(11^2 + 6) ~= 91 thousand iterations over graph elements
        self.assertEqual(GOOD_MESSAGE, get_message('complex_orderable1.txt')) # has 8 nodes, 13 edges => worst case is 8!*(13^2 + 8) ~= 7 million
        self.assertEqual(GOOD_MESSAGE, get_message('complex_orderable2.txt')) # no edges. Creates all permutations and succeeds on the first one.
        self.assertEqual(GOOD_MESSAGE, get_message('complex_orderable3.txt')) # has 12 nodes, 13 edges => worst case is 12!*(13^2 + 12) ~= 86 billion
        self.assertEqual(GOOD_MESSAGE, get_message('complex_orderable4.txt', 2**23)) # 12n, 14e => 99.6 billion
        self.assertEqual(DIFF_LABELS_MESSAGE, get_message('complex_false1.txt')) # has 6 nodes
        self.assertEqual(CYCLE_MESSAGE, get_message('complex_unorderable1.txt', 2**23)) # 12n, 15e => 113 billion worst case. Is detected by finding a cycle
        self.assertEqual(ALL_ORDERS_MESSAGE, get_message('complex_unorderable2.txt', 2**23)) # 12n, 15e => 113 billion worst case.

if __name__ == '__main__':
    unittest.main()