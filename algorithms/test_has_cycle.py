import unittest
import json
from has_cycle import *

test_folder = './algorithms/unit_test_files/cycle/'

def run_file(filename, f):
    """Gets the graph from the file and returns the result of the function f on that graph"""
    infile = open(test_folder + filename, 'r')
    graph_string = infile.readline().removesuffix('\n')
    infile.close()
    return f(json.loads(graph_string))

class TestHasCycle(unittest.TestCase):
    def test_cycle(self):
        self.assertTrue(run_file('simple_cycle1.txt', has_cycle))
        self.assertTrue(run_file('simple_cycle2.txt', has_cycle))

        self.assertTrue(run_file('complex_cycle1.txt', has_cycle))
        self.assertFalse(run_file('complex_no_cycle1.txt', has_cycle))

        self.assertTrue(run_file('simple_self_loop.txt', has_cycle))
        self.assertTrue(run_file('complex_self_loop.txt', has_cycle))

        self.assertTrue(run_file('disconnected_cycle1.txt', has_cycle))
        self.assertTrue(run_file('disconnected_cycle2.txt', has_cycle))
        self.assertFalse(run_file('disconnected_no_cycle1.txt', has_cycle))
    
    def test_label_cycle(self):
        self.assertTrue(run_file('simple_cycle1.txt', has_label_cycle))
        self.assertFalse(run_file('simple_cycle2.txt', has_label_cycle))
        self.assertTrue(run_file('complex_cycle1.txt', has_label_cycle))
        self.assertFalse(run_file('complex_no_label_cycle1.txt', has_label_cycle))

if __name__ == '__main__':
    unittest.main()