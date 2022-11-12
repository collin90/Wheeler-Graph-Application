import unittest
import json
from is_wheeler import is_wheeler

test_folder = './algorithms/unit_test_files/wheeler/'

def run_file(filename):
    """Gets the graph from the file and returns the result of is_wheeler"""
    infile = open(test_folder + filename, 'r')
    graph_string = infile.readline().removesuffix('\n')
    infile.close()
    return is_wheeler(json.loads(graph_string))

class TestIsWheeler(unittest.TestCase):
    def test_is_wheeler(self):
        self.assertFalse(run_file('simple_false1.txt'))
        self.assertFalse(run_file('simple_false2.txt'))
        self.assertTrue(run_file('simple_true1.txt'))
        self.assertTrue(run_file('simple_true2.txt'))
        self.assertTrue(run_file('simple_true3.txt'))

        self.assertTrue(run_file('complex_true1.txt'))
        self.assertFalse(run_file('complex_false1.txt'))

if __name__ == '__main__':
    unittest.main()