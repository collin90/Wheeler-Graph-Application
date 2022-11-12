import numpy as np
from graph_utils import *
from collections import defaultdict

def zero_in_degree_are_first(nodes, in_degree):
    m = np.inf # minimum order of a node with nonzero in-degree
    M = -1 # maximum order of a node with zero in-degree
    for n in nodes:
        if in_degree[n['id']] == 0 and n['order'] > M: M = n['order']
        elif in_degree[n['id']] > 0 and n['order'] < m: m = n['order']
    return M < m

def is_wheeler(G):
    """A graph is Wheeler if the nodes can be ordered such that
    1) 0 in-degree nodes come before others
    And for all e = (u, v, a) and e' = (u', v', a')  with source =: u, target =: v, label =: a,
    2) a < a' => v < v'                     <=> not (a < a' and v >= v')
    3) (a = a') and (u < u') => v <= v'     <=> not (a = a' and u < u' and v > v')
    
    O(E^2 + V)
    """
    nodes, edges = G['nodes'], G['edges']
    node_map = make_node_map(nodes) # Maps id to the node with that id
    in_degree = get_in_degrees(edges) # Maps id to degree of node

    if not zero_in_degree_are_first(nodes, in_degree): return False

    # Now compare all edges for cases 2 and 3
    def case2(e1, e2):
        return not (e1['label'] < e2['label'] and node_map[e1['target']]['order'] >= node_map[e2['target']]['order'])
    
    def case3(e1, e2):
        return not (e1['label'] == e2['label'] and node_map[e1['source']]['order'] < node_map[e2['source']]['order'] and node_map[e1['target']]['order'] > node_map[e2['target']]['order'])

    for e1 in edges:
        for e2 in edges:
            if (not case2(e1, e2)) or (not case3(e1, e2)): return False
    return True