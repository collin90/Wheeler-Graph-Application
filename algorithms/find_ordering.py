import numpy as np
import itertools as it
from is_wheeler import *
from collections import defaultdict

# def get_ranges(G):
#     """
#     Returns a dictionary that maps edge label c to [a, b) where the range (exclusive of b)
#     are the possible values in the ordering for which any node with incoming edge labeled
#     c can possibly take.

#     E.g. if 'R' -> (3, 7), then any vertex with incoming edge label 'R' must take one of
#     {3, 4, 5, 6} in the ordering.
#     """
#     vertices, edges = G
#     alphabet = set([ e[2] for e in edges ]) # not necessarily a character. Could be a string I guess

#     no_in = np.setdiff1d(vertices, [ e[1] for e in edges ]) # zero in-degree nodes

#     d = dict()
#     j = len(no_in)
#     d[None] = (0, j) # other keys will be characters, but with no incoming edges, say label is None.
#     for c in sorted(alphabet):
#         # inefficient, but not bad if we assume the alphabet and graph size are both small
#         n = len(list(set([ e[1] for e in edges if e[2] == c ])))
#         d[c] = (j, j + n)
#         j += n

#     return d

def flatten_tuples(l):
    """Flattens a list of tuples into a list"""
    acc = []
    { acc.append(v) for t in l for v in t }
    return acc

def combos(l):
    """
    l looks like [[(), ..., ()], ..., [(), ..., ()]] i.e. it is a list of lists of tuples.
    Goal: Find all combinations of tuples such that each is taken from a distinct list. Preserve order.
    
    e.g. if l = [[(0, 1), (1, 0)], [(2)], [(3, 4), (4, 3)]],
    then combos(l) = [[(0, 1), (2), (3, 4)],
                        [(0, 1), (2), (4, 3)],
                        [(1, 0), (2), (3, 4)],
                        [(1, 0), (2), (4, 3)]]

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

# TODO: consider yielding so that the graphs are not all stored in memory waiting to be tried
def order(G, label_to_nodes):
    """Return all possible orderings. Considers how edge labels determine a range of values
    for which a node can take in the order.
    
    label_to_nodes is a map from the incoming edge label to list of all nodes with that incoming edge label.
    """
    perms = [ list(it.permutations(ns)) for ns in label_to_nodes.values() ]
    all_combos = [ flatten_tuples(ts) for ts in combos(perms) ]
    r = np.arange(0, len(G[0])) # [0..number of vertices]

    orders = []
    for c in all_combos:
        d = dict()
        orders.append(d) # every order will be a dict from the node label to some int in the ordering
        for i in r:
            d[c[i]] = i # the i'th node label in the combo has order i

    return orders # change this return type to be a graph

def has_good_labels(incoming):
    """True iff every node has exactly 1 or 0 unique incoming edges labels.
    
    Parameters
    ----------
    incoming: dictionary mapping id to list of edges. Nodes with no incoming edges need not exist in this dictionary.
    """
    for edges in incoming.values():
        if len(set(q(edges, 'label'))) > 1: return False
    return True

def find_ordering(G, MAX_ITERATIONS=2**20):
    """Given a graph G, finds an ordering on the graph is possible. Will not try if the number of iterators over
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

    # Get all edges the are incoming to each node
    incoming = defaultdict(list) 
    { incoming[e['target']].append(e) for e in edges }

    if not has_good_labels(incoming):
        return dict({'ordering':None, 'message':'Graph cannot be Wheeler because a node has incoming edges with two different labels'})

    # Partition the nodes by the incoming label
    label_set = defaultdict(set)
    { label_set[e['label']].add(e['id']) for e in edges }

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
        if is_wheeler(o): return {'ordering':o, 'message':'Graph is Wheeler.'}

    return dict({'ordering':None, 'message':'Graph is not Wheeler because all possible orderings were tried.'})