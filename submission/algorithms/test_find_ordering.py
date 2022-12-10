import unittest
import json
from find_ordering import * # imports find_ordering function and MESSAGE consts
from sspipe import p

def remove_suffix(input_string, suffix):
    if suffix and input_string.endswith(suffix):
        return input_string[:-len(suffix)]
    return input_string

test_folder = './algorithms/unit_test_files/Find Ordering Test Files/wheeler/'

def get_message(filename, MAX_ITERATIONS, MAX_ORDERS):
    infile = open(test_folder + filename, 'r')
    graph_string = remove_suffix(infile.readline(), '\n')
    infile.close()
    return graph_string | p(json.loads) | p(find_ordering, MAX_ITERATIONS, MAX_ORDERS) | p(lambda x : x['message'])

def test(this, message, filename, MAX_ITERATIONS=2**20, MAX_ORDERS=fac(8)):
    this.assertEqual(message, get_message(filename, MAX_ITERATIONS, MAX_ORDERS))

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
        test(self, GOOD_MESSAGE, 'complex_orderable2.txt', MAX_ORDERS=None) # no edges. Must create all orderings
        test(self, GOOD_MESSAGE, 'complex_orderable3.txt') # 12 nodes, 13 edges
        test(self, GOOD_MESSAGE, 'complex_orderable4.txt', 2**23) # 12 nodes 14 edges
        test(self, GOOD_MESSAGE, 'complex_orderable5.txt', 2**23) # 14 nodes

    def complex_unorderable(self):
        test(self, DIFF_LABELS_MESSAGE, 'complex_false1.txt') # 6 nodes. Is from is_wheeler tests
        test(self, CYCLE_MESSAGE, 'complex_unorderable1.txt') # 12 nodes, 15 edges => 113 billion worst case
        test(self, ALL_ORDERS_MESSAGE, 'complex_unorderable2.txt') # 12 nodes, 15 edges

    def large(self):
        def t(msg, fname):
            test(self, msg, fname, 2**30) # over 1 billion worst case
        t(GOOD_MESSAGE, 'large_orderable1.txt') # 21 nodes. 4 different edge labels. Incredibly large worst case.
        t(ALL_ORDERS_MESSAGE, 'large_unorderable1.txt') # Same graph as above but added edge makes unorderable
        t(GOOD_MESSAGE, 'large_orderable3.txt') # 24 nodes
        # t(TOO_LARGE_MESSAGE, 'large_orderable4.txt') # 31 nodes. Large alphabet. Is orderable when we let up to 4 billion ~ 2^32 iterations
        t(ALL_ORDERS_MESSAGE, 'large_unorderable2.txt')

    # The above functions are not run by unittest because they do not begin with "test". Run them here.
    def test_suite(self):
        self.simple()
        self.complex_orderable()
        self.complex_unorderable()
        self.large()

if __name__ == '__main__':
    unittest.main()