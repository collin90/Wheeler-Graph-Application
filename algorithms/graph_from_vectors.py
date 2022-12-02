def graph_from_OILC(O, I, L, C):

    nodes_count = O.count("1")
    edges = createEdges(I, O, L, C)
    nodes = createNodes(nodes_count)
    return nodes, edges

def createNodes(count):
    nodes = []
    for i in range(count):
        nodes.append({'id':i})
    return nodes

def createEdges(I, O, L, C):
    edges = []
    edgeOG = findEdges(I, O, L, C)
    for source in edgeOG:
        for edge in edgeOG[source]:
            target = edge[0]
            label = edge[1]
            edges.append({'source': source, 'target': target, 'label': label, 'id':str(source)+"_"+str(target)})
    return edges
def findEdges(I, O, L, C):
    inie = incomingDict(I) # dictionary of counts of incoming edge capacity
    edgy = {'A': 1, 'C': C[0], 'G': C[1], 'T': C[2]}

    edges = {} # running dictionary of 0 in-degree edges. key is the 0 in-degree node
    n = 1
    ed = 0
    for e in range(len(O)):
        if O[e] == '0':
            source = n
            label = L[ed]
            target = edgy[label] # dictionary of next node for a given label
            print(edgy)
            print(label)
            print(inie)
            print(target)
            inie[target] = inie[target] - 1
            if inie[target] < 1:
                edgy[label] = edgy[label] + 1 # If we are out of incoming edges, then increment capacity for given label
            if source not in edges:
                edges[source] = []
            edges[source].append([target + 1, label])
            ed = ed + 1 # Increment which edge you're on. Needed for nodes with multiple outgoing edges.
        else:
            n = n + 1 # Increment which node you're on
    return edges

#Keep track of number of incoming edges for each node
#nodes indexed starting at 1. Keys in the dict are node ids
def incomingDict(I):
    inie = {}
    curr = 0
    inie[0] = 0
    for i in I:
        if i == '1':
            curr = curr + 1
            inie[curr] = 0
        else:
            inie[curr] = inie[curr] + 1
    return inie

#TESTING 
#print(L_to_BWT('TAAGCG', '011010101001'))
#O = '01010010101011010101'
#I = '10010101010101010101'
#L = 'TTCGGAAATA'
#this is an example from the article: https://www.sciencedirect.com/science/article/pii/S0304397517305285#fg0010
#more edges than nodes makes things more complicated- subtract from number of nodes to get correct c matrix
#this example might be more complicated than what we'd do?
#doesn't work because to many edges 
#O2 = '000100101100100100101'
#L2 = 'AACAGCAGCGCGA'
#I2 = '101001001001001001001'
#C2 = [5, 9, 13, 0]
#C = [4, 5, 7, 10]
#print(graph_from_OILC(O, I, L, C))
#print(incomingDict(I))
#node_count = O2.count("1")
#print(findEdges(I2, O2, L2, C2))
#print(createEdges(I2, O2, L2, C2))
