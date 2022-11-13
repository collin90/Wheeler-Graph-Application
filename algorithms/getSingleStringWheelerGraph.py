
def getSingleStringWheelerGraph(inputStr):
        nodes = []
        edges = []
        # How to get the wheeler graph form our input string.
        # 1. Nodes is the list of all prefixes of the input string.
        # 2. connect each node to the next larger prefix with an edge LABELED by the next character in the string.
        # 3. The ordering of the nodes is sorted by alphabetical order on the reverse of the prefixes. $ < A < C < G < T
        firstNode = {'id': '$'}
        nodes.append(firstNode)
        # Steps 1 and 2, creating nodes and edges.
        for index, character in enumerate(inputStr):
                node = {'id': inputStr[0:index+1]}
                nodes.append(node)
                if(index < len(inputStr)):
                        edge = {'label': character,
                                'source': nodes[index]['id'],
                                'target': nodes[index+1]['id'],
                                }
                        edges.append(edge)
        
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