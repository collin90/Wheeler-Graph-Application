import numpy as np
import itertools as it
from is_wheeler import *
from collections import defaultdict
from copy import deepcopy

# TODO: consider ruling out some of the tuples in `combos` that fail themselves i.e. there is some intersection among their own edges.
# ^ This can be done by extracting the subgraph for only those edges and checking if it is wheeler.
# TODO: find cycles of edges with the same label. These graphs cannot be wheeler (but I need to prove this). Use DFS and only follow edges of each label.

GOOD_MESSAGE = 'Graph is Wheeler.'
DIFF_LABELS_MESSAGE = 'Graph cannot be Wheeler because a node has incoming edges with two different labels.'
ALL_ORDERS_MESSAGE = 'Graph is not Wheeler because all possible orderings were tried.'

def flatten_tuples(l):
    """Flattens a list of tuples into a list"""
    acc = []
    { acc.append(v) for t in l for v in t }
    return acc

def combos(l):
    """
    l looks like [[(), ..., ()], ..., [(), ..., ()]] i.e. it is a list of lists of tuples.
    The tuples are some permutation of the node ids.
    Goal: Find all combinations of tuples such that each is taken from a distinct list. Preserve order.
    
    e.g. if l = [[(a, b), (b, a)], [(c)], [(d, e), (e, d)]],
    then combos(l) = [[(a, b), (c), (d, e)],
                        [(a, b), (c), (e, d)],
                        [(b, a), (c), (d, e)],
                        [(b, a), (c), (e, d)]]

    Implementation is not tail recursive.
    """
    n = len(l)
    if n == 0: return []
    if n == 1: return [ [t] for t in l[0] ] # give each tuple its own list to be built upon

    accum = []
    for t in l[0]:
        further_perms = combos(l[1:]) # use recursion and assume it works on the tail
        with_t = further_perms.copy()
        { pm.insert(0, t) for pm in with_t } # this tuple needs to be included in the combos
        accum.extend(with_t)
    return accum

def order(G, label_set):
    """Return all possible orderings. Considers how edge labels determine a range of values
    for which a node can take in the order.
    
    label_set is a map from the incoming edge label to set of all node ids with that incoming edge label.
    """
    vals = [ label_set[k] for k in sorted(label_set.keys()) ] # get label sets sorted by edge labels
    perms = [ list(it.permutations(ids)) for ids in vals ] # try every permutation of the nodes within an equivalence class defined by incoming edge label
    all_combos = [ flatten_tuples(ts) for ts in combos(perms) ] # try every combination of permutations from the line above
    r = np.arange(0, len(G['nodes'])) # [0..number of vertices]

    def get_ordered_graph(G, perm):
        nodes = deepcopy(G['nodes'])
        node_map = make_node_map(nodes) # maps id to node
        for id, ord in zip(perm, r):
            node_map[id]['order'] = ord
        return {'nodes':nodes, 'edges':G['edges']}

    return [ get_ordered_graph(G, perm) for perm in all_combos ]

def find_ordering(G, MAX_ITERATIONS=2**20):
    """Given a graph G, finds an ordering on the graph is possible. Will not try if the number of iterations over
    graph elements is greater than MAX_ITERATIONS.
    
    Parameters
    ----------
    G : { 'nodes': node list, 'edges': edge list }
    MAX_ITERATIONS: int = 2^20

    Returns
    -------
    dict = { 'ordering': graph or None, 'message': string }
    """
    nodes, edges = G['nodes'], G['edges']

    # Get all edge labels the are incoming to each node
    incoming = defaultdict(set) 
    { incoming[e['target']].add(e['label']) for e in edges }

    for labels in incoming.values(): # Check if any node has more than one label going into it.
        if len(labels) > 1: return dict({'ordering':None, 'message':DIFF_LABELS_MESSAGE})

    # Partition the nodes by the incoming label. This is sort of the inverse of incoming.
    label_set = defaultdict(set)
    { label_set[e['label']].add(e['target']) for e in edges }
    { label_set[''].add(n['id']) for n in nodes if n['id'] not in incoming.keys() } # zero-in-degree nodes have an empty label

    fac = lambda x : x * fac(x - 1) if x > 1 else 1 # factorial

    # Now must try every permutation of nodes with same edge label.
    N = 1 # I wish we could use np.product() for this, but it overflows at 2^32
    for p in [ fac(len(l)) for l in list(label_set.values()) ]:
        N *= p
    V = len(nodes)
    E = len(edges)
    # Assume that for every permutation, we must check if the whole graph is wheeler. It is wheeler in O(E^2 + V) for V the size of the vertices=nodes.
    if N * (E * E + V) > MAX_ITERATIONS:
        return dict({'ordering':None, 'message':f'Too many possibilities to try. There are {N} possible orderings => {N * (E * E + V)} iterations over graph elements required.'})

    os = order(G, label_set)
    for o in os:
        if is_wheeler(o): return {'ordering':o, 'message':GOOD_MESSAGE}

    return dict({'ordering':None, 'message':ALL_ORDERS_MESSAGE})