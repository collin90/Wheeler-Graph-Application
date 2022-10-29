
def getWheelerGraph(inputStr):
    nodes = []
    edges = []
    for index, character in enumerate(inputStr):
        node = {'id': inputStr[index:],
                'label': character}
        nodes.append(node)
        if(index < len(inputStr)-1) :
            edge = {'id': index,
                    'source': inputStr[index:],
                    'target': inputStr[index+1:]}
            edges.append(edge)

    return {'nodes': nodes, 'edges': edges}