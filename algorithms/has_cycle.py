import numpy as np
from collections import defaultdict
from graph_utils import *

def has_cycle(G):
    if len(G['nodes']) == 0: return False

    neighbors = get_neighbors(G)

    def try_node(src):
        visited = defaultdict(bool)
        visited[src] = True
        stack = list(neighbors[src])
        while len(stack) > 0:
            id = stack.pop()
            if id == src: return True
            if not visited[id]:
                visited[id] = True
                stack.extend(neighbors[id])
        return False

    for id in q(G['nodes'], 'id'):
        if try_node(id): return True
    return False

def has_cycle_connected(G):
    """True if G has a cycle. Used algorithm from https://algotree.org/algorithms/tree_graph_traversal/depth_first_search/cycle_detection_in_directed_graphs/#:~:text=Detecting%20cycle%20in%20directed%20graphs%20using%20Depth-First-Search%20%28DFS%29,7%207.%20Detect_Cycle%20%28%20adjacent_node%20%29%20More%20items
    """
    if len(G['nodes']) == 0: return False

    neighbors = get_neighbors(G)

    visited = defaultdict(bool)
    inpath = defaultdict(bool)

    cycle_exists = False

    def rec_has_cycle(src):
        nonlocal cycle_exists
        visited[src] = True
        inpath[src] = True
        for id in neighbors[src]:
            if inpath[id]:
                cycle_exists = True
                return
            rec_has_cycle(id)
        inpath[src] = False

    rec_has_cycle(G['nodes'][0]['id']) # start at any node
    return cycle_exists

def has_label_cycle(G):
    """True if G has a cycle made of edges with one unique label. Self-loops do not count."""
    labels = set([ e['label'] for e in G['edges'] ])
    for label in labels:
        sub_G = get_sub_graph(G, label)
        no_self_loop_G = remove_self_loops(sub_G)
        if has_cycle(no_self_loop_G): return True
    return False