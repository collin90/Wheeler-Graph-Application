import unittest
import json
from is_wheeler import is_wheeler
from find_ordering import * # imports find_ordering function and MESSAGE consts
from sspipe import p

test_folder = './algorithms/unit_test_files/wheeler/'

def get_message(filename, MAX_ITERATIONS=2**20):
    infile = open(test_folder + filename, 'r')
    graph_string = infile.readline().removesuffix('\n')
    infile.close()
    return graph_string | p(json.loads) | p(find_ordering, MAX_ITERATIONS) | p(lambda x : x['message'])

def print_order(filename, MAX_ITERATIONS=2**20):
    """Prints the nodes from the ordering so that we can see the solution."""
    infile = open(test_folder + filename, 'r')
    graph_string = infile.readline().removesuffix('\n')
    infile.close()
    print(find_ordering(json.loads(graph_string), MAX_ITERATIONS)['ordering']['nodes'])

def test(this, message, filename, MAX_ITERATIONS=2**20):
    this.assertEqual(message, get_message(filename, MAX_ITERATIONS))

class TestFindOrdering(unittest.TestCase):
    def simple(self):
        test(self, GOOD_MESSAGE, 'simple_true1.txt')
        test(self, GOOD_MESSAGE, 'simple_true2.txt')
        test(self, GOOD_MESSAGE, 'simple_true3.txt')
        test(self, CYCLE_MESSAGE, 'simple_false1.txt')
        test(self, DIFF_LABELS_MESSAGE, 'simple_false2.txt')

    def complex_orderable(self):
        """These graphs are somewhat 'complex'. They aren't super simple or super large."""
        test(self, GOOD_MESSAGE, 'complex_true1.txt') # 6 nodes. Is from is_wheeler. Already ordered
        test(self, GOOD_MESSAGE, 'complex_orderable1.txt') # 8 nodes, 13 edges
        test(self, GOOD_MESSAGE, 'complex_orderable2.txt') # no edges. Must create all orderings
        test(self, GOOD_MESSAGE, 'complex_orderable3.txt') # 12 nodes, 13 edges
        test(self, GOOD_MESSAGE, 'complex_orderable4.txt', 2**23) # 12 nodes 14 edges
        test(self, GOOD_MESSAGE, 'complex_orderable5.txt', 2**23) # 14 nodes

    def complex_unorderable(self):
        test(self, DIFF_LABELS_MESSAGE, 'complex_false1.txt') # 6 nodes. Is from is_wheeler tests
        test(self, CYCLE_MESSAGE, 'complex_unorderable1.txt') # 12 nodes, 15 edges => 113 billion worst case
        test(self, ALL_ORDERS_MESSAGE, 'complex_unorderable2.txt') # 12 nodes, 15 edges

    def large(self):
        def t(msg, fname):
            test(self, msg, fname, None)
        t(GOOD_MESSAGE, 'large_orderable1.txt') # 20 nodes. 4 different edge labels. Incredibly large worst case.
        t(ALL_ORDERS_MESSAGE, 'large_unorderable1.txt') # Same graph as above but added edge makes unorderable

    # The above functions are not run by unittest because they do not begin with "test". Run them here.
    def test_suite(self):
        self.simple()
        self.complex_orderable()
        self.complex_unorderable()
        self.large()

if __name__ == '__main__':
    unittest.main()