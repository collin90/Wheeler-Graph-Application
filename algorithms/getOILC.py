
def getOILC (nodes, edges): 
    if(len(nodes) == 0): return {'O': [], 'I': [], 'L': [], 'C': []}

    #we need to get the bit arrays: O, I, L, and C. 

    # O  &  I  (the outdegree and indegree arrays)
    # L        (the array of letters that each edge is labeled with)
    O = ''
    I = ''
    L = ''
    for i in range(len(nodes)):
        for n in nodes:
            if (n['order'] == i):
                #we have found the right node.
                for edge in edges:
                    if (edge['source'] == n['id']):
                        O += '0'
                        L += edge['label']
                    if (edge['target'] == n['id']):
                        I += '0'
        O += '1'
        I += '1'

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