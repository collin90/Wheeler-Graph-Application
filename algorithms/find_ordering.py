import numpy as np
import itertools as it
from is_wheeler import *
from has_cycle import has_label_cycle
from graph_utils import *
from collections import defaultdict
from copy import deepcopy
from sspipe import p, px

GOOD_MESSAGE = 'Graph is Wheeler.'
DIFF_LABELS_MESSAGE = 'Graph cannot be Wheeler because a node has incoming edges with different labels.'
ALL_ORDERS_MESSAGE = 'Graph is not Wheeler because all possible orderings were tried.'
CYCLE_MESSAGE = 'Graph is not Wheeler because there is a cycle using edges with one unique edge label.'

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

def get_ordered_graph(G, perm):
    """Orders the graph according to the given permutation of ids. Does not modify original graph.
    
    e.g. if perm=(d, c, b, a), then the order is d:0, c:1, b:2, a:3.
    """
    nodes = deepcopy(G['nodes'])
    node_map = make_node_map(nodes) # maps id to node
    for id, ord in zip(perm, np.arange(0, len(G['nodes']))):
        node_map[id]['order'] = ord
    return {'nodes':nodes, 'edges':G['edges']}

def perm_fails(id_tuple, G):
    """True if the perm fails itself wrt the wheeler property, ignore the zero-in-degree requirement."""
    return get_sub_graph_ids(G, id_tuple) | p(get_ordered_graph, id_tuple) | p(is_wheeler_no_degree) | p(lambda x : not x)

# TODO: if all perms fail for some label set, what happens?
def get_all_orderings(G, label_set):
    """Return all possible orderings. Considers how edge labels determine a range of values
    for which a node can take in the order.
    
    label_set is a map from an edge label to set of all node ids with that incoming edge label.
    """
    vals = [ label_set[k] for k in sorted(label_set.keys()) ] # get label sets sorted by edge labels
    # Permute the ids, but keep only the permutations that don't fail. See perm_fails
    perms = [ [ id_tuple for id_tuple in it.permutations(ids) if not perm_fails(id_tuple, G) ] for ids in vals ]
    all_combos = [ flatten_tuples(ts) for ts in combos(perms) ] # try every combination of permutations from the line above

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

    # If there is a cycle using only edges of some label, then the graph cannot be wheeler.
    if has_label_cycle(G): return dict({'ordering':None, 'message':CYCLE_MESSAGE})

    # Partition the nodes by the incoming label. This is sort of the inverse of incoming.
    label_set = get_label_set(G)

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

    # TODO: because we now cut back on possible permutations as they are generated, consider stopping early if we reach
    #       MAX_ITERATIONS / (E^2 + V) or if the set of all orderings is too large.
    os = get_all_orderings(G, label_set)
    for o in os:
        if is_wheeler(o): return {'ordering':o, 'message':GOOD_MESSAGE}

    return dict({'ordering':None, 'message':ALL_ORDERS_MESSAGE})