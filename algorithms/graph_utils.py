# Some helper functions for working with graphs (used in find ordering algorithm)

from collections import defaultdict
import numpy as np

def q(ls, k):
    """Queries a list of dictionaries ls for the key k and returns a new list"""
    return [ d[k] for d in ls ]

def make_node_map(nodes):
    d = dict()
    for id, n in zip(q(nodes, 'id'), nodes):
        d[id] = n
    return d

def get_in_degrees(edges):
    d = defaultdict(int)
    for id in q(edges, 'target'):
        d[id] += 1
    return d

def get_zero_in_degree(G):
    """Gets the set of node ids that have zero in-degree"""
    non_zero = [ e['target'] for e in G['edges'] ]
    all_ids = [ n['id'] for n in G['nodes'] ]
    return np.setdiff1d(all_ids, non_zero) # seems a little faster to do it this way than using get_in_degrees

def get_label_set(G):
    """Gets the equivalence classes given by incoming edges labels. The return type is a map from an edge label
    to the set of node ids that are the target of that edge label.
    
    No incoming edge is designated by an empty string edge label.
    """
    nodes, edges = G['nodes'], G['edges']
    label_set = defaultdict(set)
    { label_set[e['label']].add(e['target']) for e in edges }
    { label_set[''].add(n['id']) for n in nodes if n['id'] in get_zero_in_degree(G) } # zero-in-degree nodes have an empty label
    return label_set

def get_sub_graph(G, label):
    """Gets the subgraph of G made only of edges with the given label."""
    label_set = get_label_set(G)
    eq_class = label_set[label]
    nodes = [ n for n in G['nodes'] if n['id'] in eq_class ] # keep only nodes with this incoming edge label
    edges = [ e for e in G['edges'] if e['source'] in eq_class and e['target'] in eq_class and e['label'] == label ]
    return {'nodes':nodes, 'edges':edges}

def get_sub_graph_ids(G, ids):
    """Gets the subgraph of G made only of nodes and edges strictly related to the given node ids.
    
    Returns references, but does not modify.
    """
    return {'nodes':[ n for n in G['nodes'] if n['id'] in ids ], 'edges':[ e for e in G['edges'] if e['source'] in ids and e['target'] in ids ]}

def remove_self_loops(G):
    """Returns references to the nodes and edges, but does not modify G or its components."""
    return {'nodes':G['nodes'], 'edges':[ e for e in G['edges'] if e['source'] != e['target'] ]}

def get_neighbors(G):
    """Maps node id to set of ids that are neighbors"""
    neighbors = defaultdict(set)
    { neighbors[e['source']].add(e['target']) for e in G['edges'] }
    return neighbors
