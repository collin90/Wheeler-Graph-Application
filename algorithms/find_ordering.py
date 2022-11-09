import numpy as np
import itertools as it
from is_wheeler import is_wheeler
from collections import defaultdict

def dmin(l, default):
    """Gets minimum in the array. If array is empty, returns the default value."""
    return default if len(l) == 0 else np.min(l)

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

def invert_dict(d):
    """Inverts a dictionary by mapping v to the list of all k in d such that d[k] = v."""
    d_inv = defaultdict(list) # lists will be empty by default for every key
    { d_inv[v].append(k) for k, v in d.items() }
    return d_inv

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

    Implementation is tail recursive.
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

    return orders

def has_good_labels(incoming):
    label_sets = [ set([ e[2] for e in edges ]) for edges in incoming.values() ]
    return np.all(np.vectorize(len)(label_sets) <= 1) # ensure not more than two distinct labels on incoming edges

# TODO: test with more complex graphs. Seems to work on small graphs.
def find_ordering(G):
    incoming = dict() # O(VE) to construct. Could be more efficient
    for v in G[0]:
        incoming[v] = [ e for e in G[1] if e[1] == v ]

    if not has_good_labels(incoming):
        return "Cannot be Wheeler because a node has two incoming edges with different labels"

    # should try creating label_to_nodes directly instead of this way and then inverting.
    in_labels = dict()
    for v in G[0]:
        I = incoming[v]
        in_labels[v] = None if len(I) == 0 else I[0][2] # get the only incoming label
    
    label_to_nodes = invert_dict(in_labels)

    fac = lambda x : x * fac(x - 1) if x > 1 else 1 # factorial

    # Now must try every permutation of nodes with same edge label.
    perm_counts = [ fac(len(l)) for l in list(label_to_nodes.values()) ]
    N = np.product(perm_counts) # TODO: fix failure with int overload
    V = len(G[0])
    E = len(G[1])
    if N * (E * E + V) > 10**5: # small graphs reach 10**3 easily, but this is VERY fast.
        return f"Too large. {N} possible orderings => {N * (E * E + V)} iterations over graph elements."

    os = order(G, label_to_nodes) # Complexity of order is exactly N
    for o in os:
        if is_wheeler(G, o): return o
    return "Is not Wheeler because tried all possible orderings"