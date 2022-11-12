import numpy as np
from collections import defaultdict

def get_zero_in_degree(G):
    non_zero = [ e['target'] for e in G['edges'] ]
    all_ids = [ n['id'] for n in G['nodes'] ]
    return np.setdiff1d(all_ids, non_zero)

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
    label_set = get_label_set(G)
    eq_class = label_set[label]
    nodes = [ n for n in G['nodes'] if n['id'] in eq_class ] # keep only nodes with this incoming edge label
    edges = [ e for e in G['edges'] if e['source'] in eq_class and e['target'] in eq_class and e['label'] == label ]
    return {'nodes':nodes, 'edges':edges}

def remove_self_loops(G):
    return {'nodes':G['nodes'], 'edges':[ e for e in G['edges'] if e['source'] != e['target'] ]}

def get_neighbors(G):
    """Maps node id to set of ids that are neighbors"""
    neighbors = defaultdict(set)
    { neighbors[e['source']].add(e['target']) for e in G['edges'] }
    return neighbors

# TODO: Handle disconnected graph case.
# ^ In this case, can just do DFS on each node and return true if we ever make it back to specifically that node.
# ^ This is much worse in terms of time complexity, but it is miniscule compared to finding an ordering.
# ^ When we consider the expected size of the input, this is VERY fast.
def has_cycle(G):
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