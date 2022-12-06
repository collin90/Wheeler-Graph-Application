#This file is not currently in use! It was replaced by the getTrieWheelerGraph algorithm. That one is slightly more cool looking and space effective.

def getMultiStringWheelerGraph (inputArr):
    nodes = []
    edges = []
    # How to get the wheeler graph form our input string.
    # 0. first, append a $ to the end of each string.
    # 1. Nodes is the list of all rotations of all strings.
    # 2. connect each node to the following rotation where node 1's first char is moved to the back of node 2, and the edge is node 1's first char
    # 3. The ordering of the nodes is sorted by alphabetical order on the reverse of the rotations. $ < A < C < G < T
    
    #step 0, appending the $ sign to all strings if its not already there
    for i in range(len(inputArr)):
        if(inputArr[i][-1] != '$'):
            inputArr[i] += '$'
    
    #step 1 and 2. Appending all the nodes as well as all the edges in the list of input strings into the graph (unordered so far)
    for t in inputArr:
        tt = t * 2
        rotations = [ tt[i:i+len(t)] for i in range(len(t)) ]
        nodesSubset = []
        i = 0
        for r in rotations:
            node = {'id': r}
            nodesSubset.append(node)
            if (i > 0):
                edge = {'source': nodesSubset[i-1]['id'], 'target': nodesSubset[i]['id'], 'label': nodesSubset[i-1]['id'][0]}
                edges.append(edge)
            i += 1
        edges.append({'source': nodesSubset[i-1]['id'], 'target': nodesSubset[0]['id'], 'label': nodesSubset[i-1]['id'][0]})
        for node in nodesSubset:
            nodes.append(node)


    #step 3. We can order the nodes the exact same way we do in the single string case, but here we just have more 'disconnected' graphs
            #step 3, ordering the nodes
    ids = []
    for node in nodes:
            ids.append(node['id'][::-1])
    ids.sort()
    ids_dict = {}
    for index, id in enumerate(ids):
        ids_dict[id[::-1]] = index
                
    for node in nodes:
        target_id = node['id']
        node['order'] = ids_dict[target_id]

    
    return {'nodes': nodes, 'edges': edges}