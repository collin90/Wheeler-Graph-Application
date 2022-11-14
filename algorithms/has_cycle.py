import numpy as np
from collections import defaultdict
from graph_utils import *

def has_cycle(G):
    """O(VE) implementation to look for cycle in disconnected graph."""
    neighbors = get_neighbors(G)

    def node_makes_cycle(src):
        visited = defaultdict(bool)
        visited[src] = True
        stack = list(neighbors[src]) # BFS search to make it back to the src node
        while len(stack) > 0:
            id = stack.pop()
            if id == src: return True
            if not visited[id]:
                visited[id] = True
                stack.extend(neighbors[id])
        return False

    # Look for a cycle starting at every node. Necessary to do this because G may not be simply connected.
    for id in q(G['nodes'], 'id'):
        if node_makes_cycle(id): return True
    return False

def has_label_cycle(G):
    """True if G has a cycle made of edges with one unique label. Self-loops do not count."""
    labels = set([ e['label'] for e in G['edges'] ])
    for label in labels:
        sub_G = get_sub_graph(G, label)
        no_self_loop_G = remove_self_loops(sub_G)
        if has_cycle(no_self_loop_G): return True
    return False