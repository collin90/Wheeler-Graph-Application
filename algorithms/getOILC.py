
def getOILC (nodes, edges): 
    if(len(nodes) == 0): return {'O': [], 'I': [], 'L': [], 'C': []}

    #we need to get the bit arrays: O, I, L, and C. 

    # O  &  I  (the outdegree and indegree arrays)
    # L        (the array of letters that each edge is labeled with)
    O = ''
    I = ''
    L = ''
    node_order_dict = {}
    edge_source_dict = {}
    edge_target_dict = {}
    
    for n in nodes:
        node_order_dict[str(n['order'])] = n['id']

    for e in edges:
        if e['source'] not in edge_source_dict: 
            edge_source_dict[e['source']] = [{'label': e['label']}]
        else : 
            edge_source_dict[e['source']].append({'label': e['label']})
        
        if e['target'] not in edge_target_dict: 
            edge_target_dict[e['target']] = 1
        else : 
            edge_target_dict[e['target']] += 1


    for i in range(len(nodes)):
        id = node_order_dict[str(i)]
        out_edges = [] if id not in edge_source_dict else edge_source_dict[id]
        num_in_edges = 0 if id not in edge_target_dict else edge_target_dict[id]       
        O += '0' * len(out_edges) + '1'
        I += '0' * num_in_edges + '1'
        for o_e in out_edges:
            L += o_e['label']

    # C   (array containing |A| elements, where each element i is the number of edges with label <= A[i])
    # example: if edges are labeled with: a,a,a,a,b,b,b,c,c,d
    #          then C would be: [4,7,9,10]

    A = []
    for edge in edges:
        if edge['label'] not in A:
            A.append(edge['label'])
    A.sort()
    C = [0] * len(A)
    for edge in edges:
        for i,a in enumerate(A):
            if(edge['label'] <= a): C[i] += 1

            
    return {'O': O, 'I': I, 'L': L, 'C': C}