
def check_for_wheeler_property (nodes, edges):

    #First, we need to check rule 0: That all nodes with indegree 0 are first in the ordering.
    #To do this, we'll partition the nodes into a list of nodes with indegree 0, and a list all other nodes. 
    #Then, if any of the indegree 0 nodes have an order (node.data.label in this case) higher than any of the other nodes' order, we can immediately return FALSE (0).
    indegree_zero_nodes = []
    indegree_positive_nodes = []
    for node in nodes: 
        indegree_zero = True
        for edge in edges:
            if edge['target'] == node['id']:
                indegree_zero = False
                break
        if indegree_zero: indegree_zero_nodes.append(int(node['data']['label']))
        else: indegree_positive_nodes.append(int(node['data']['label']))
    
    if (len(indegree_positive_nodes) > 0 and len(indegree_zero_nodes) > 0 and max(indegree_zero_nodes) > min(indegree_positive_nodes)) : return 0

    #Next, we need to check rule 1: For any pair of edges, if e1.label < e2.label, then e1.target < e2.target
    #We will simultaneously check rule 2: For any pair of edges, if e1.label == e2.label AND e1.source < e2.source, then e1.target <= e2.target.
    for e1 in edges:
        for e2 in edges:
            if (e1['label'] < e2['label'] and int(e1['target']) >= int(e2['target'])): return 0
            if (e1['label'] == e2['label'] and int(e1['source']) < int(e2['source']) and int(e1['target']) > int(e2['target'])): return 0
    
    return 1