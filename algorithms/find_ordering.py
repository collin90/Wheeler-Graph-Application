#used by the find ordering tab. This is the primary function called when the user clicks find ordering.

import numpy as np
import itertools as it
from is_wheeler import *
from has_cycle import *
from collections import defaultdict
from copy import deepcopy
from sspipe import p

GOOD_MESSAGE = 'Graph is Wheeler.'
DIFF_LABELS_MESSAGE = 'Graph cannot be Wheeler because a node has incoming edges with different labels.'
ALL_ORDERS_MESSAGE = 'Graph is not Wheeler because all possible orderings were tried.'
CYCLE_MESSAGE = 'Graph is not Wheeler because there is a cycle using edges with one unique edge label.'
TOO_LARGE_MESSAGE = 'Too many possible orderings to try.'

def fac(x):
    if x < 2: return 1
    return x * fac(x - 1)

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

    further_perms = combos(l[1:]) # use recursion and assume it works on the tail

    accum = []
    for t in l[0]:
        with_t = deepcopy(further_perms)
        { pm.insert(0, t) for pm in with_t } # this tuple needs to be included in the combos
        accum.extend(with_t)
    return accum

def get_ordered_graph(G, perm):
    """Orders the graph according to the given permutation of ids. Does not modify original graph.
    
    e.g. if perm=(d, c, b, a), then the order is d:0, c:1, b:2, a:3.
    """
    nodes = deepcopy(G['nodes'])
    node_map = make_node_map(nodes) # maps id to node
    for ord, id in enumerate(perm):
        node_map[id]['order'] = ord
    return {'nodes':nodes, 'edges':G['edges']}

def perm_fails(id_tuple, G):
    """True if the perm fails itself wrt the wheeler property, ignoring the zero-in-degree requirement."""
    return get_sub_graph_ids(G, id_tuple) | p(get_ordered_graph, id_tuple) | p(is_wheeler_no_degree) | p(lambda x : not x)

def reduce_perms(G, label_set):
    """Cut down on permutations required to check by ruling out perms that fail themselves"""
    vals = [ label_set[k] for k in sorted(label_set.keys()) ] # get label sets sorted by edge labels
    # try every permutation of the nodes within an equivalence class defined by incoming edge label
    return [ [ id_tuple for id_tuple in it.permutations(ids) if not perm_fails(id_tuple, G) ] for ids in vals ]

def get_all_orderings(G, perms):
    """Return all possible orderings.
    
    label_set is a map from an edge label to set of all node ids with that incoming edge label.

    """
    all_combos = [ flatten_tuples(ts) for ts in combos(perms) ] # try every combination of given permutations
    return [ get_ordered_graph(G, perm) for perm in all_combos ]

# TODO: As orderings are built, ensure they are "sub-wheeler". But each time we add an ordering
# of an equivalence class, we only check the edges that are new. No need to check old edges.
def find_ordering(G, MAX_ITERATIONS=2**20, MAX_ORDERS=fac(8)):
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

    # If each label set might need to check more than 2**10 orders, I'll back out of the computation.
    max_lset_orders = max([ fac(len(s)) for s in label_set.values() ])
    if MAX_ORDERS is not None and max_lset_orders > MAX_ORDERS: return dict({'ordering':None, 'message':TOO_LARGE_MESSAGE})

    perms = reduce_perms(G, label_set)
    
    # Check if there are no possible permutations for some label set. In this case, some eq class cannot be ordered at all
    # if any( [ not len(x) for x in perms ]): dict({'ordering':None, 'message':ALL_ORDERS_MESSAGE})
    
    # Now that the total number of permutations we must try is significantly reduced, check how many orderings will really be tried
    if MAX_ITERATIONS is not None:
        n_orders = 1
        for pset in perms:
            n_orders *= len(pset)
        # Since each order requires a call to is_wheeler in O(E^2 + V), total iterations is O(n_orders * (E^2 + V))
        if n_orders * (len(edges)**2 + len(nodes)) > MAX_ITERATIONS: return dict({'ordering':None, 'message':TOO_LARGE_MESSAGE})

    os = get_all_orderings(G, perms)
    for o in os:
        if is_wheeler(o): return {'ordering':o, 'message':GOOD_MESSAGE}

    return dict({'ordering':None, 'message':ALL_ORDERS_MESSAGE})


# It's much faster to run the executable from the command line than it is to run the Python code above.
# HOWEVER, it's slower to run the executable from within Python as I do below...

#from subprocess import Popen, PIPE, STDOUT
#import json

# Expected to be called from Wheeler-Graph-Application/ and not inside Wheeler-Graph-Application/algorithms/
#def find_ordering(G, MAX_ITERATIONS=2**20, MAX_ORDERS=fac(8)):
#    # For now I'm ignoring the max args
 #   child = Popen(['./algorithms/order.exe', '--json', json.dumps(G), '0'], stdout=PIPE, stderr=STDOUT)
 #   output, _ = child.communicate() # second item is error
 #   return json.loads(output)
