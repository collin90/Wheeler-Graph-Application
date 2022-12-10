#used by the Pattern matching page. Uses O I and L vectors to produce lists of nodes and edges which can then be graphed.

def graph_from_OILC(O, L, C):

    nodes_count = O.count("1")
    edges = createEdges(O, L, C)
    nodes = createNodes(nodes_count)
    return {'nodes': nodes, 'edges': edges}

def createNodes(count):
    nodes = []
    for i in range(count):
        nodes.append({'id':i+1})
    return nodes

def createEdges(O, L, C):
    edges = []
    edgeOG = findEdges(O, L, C)
    for source in edgeOG:
        for edge in edgeOG[source]:
            target = edge[0]
            label = edge[1]
            edges.append({'source': source, 'target': target, 'label': label, 'id':str(source)+"_"+str(target)})
    return edges

def findEdges(O, L, C):
    edgy = getEdgy(L,C)
    edges = {} # running dictionary of 0 in-degree edges. key is the 0 in-degree node
    n = 1
    ed = 0
    for e in range(len(O)):
        if O[e] == '0':
            source = n
            label = L[ed]
            target = edgy[label] # dictionary of next node for a given label
            edgy[label] = edgy[label] + 1 # If we are out of incoming edges, then increment capacity for given label
            if source not in edges:
                edges[source] = []
            edges[source].append([target + 1, label])
            ed = ed + 1 # Increment which edge you're on. Needed for nodes with multiple outgoing edges.
        else:
            n = n + 1 # Increment which node you're on
    return edges

def getEdgy(L, C):
    alpha = []
    edgy = {}
    a_len = 0 #track how long alphabet is so we stop scanning string L when we've found the whole alphabet
    for i in range(len(L)):
        if L[i] not in alpha:
            alpha.append(L[i])
            a_len = a_len + 1
        if a_len == len(C):
            break
    alpha.sort() # sort alphabet so it aligns with ordering of C
    for a in range(len(C)):
        if a == 0:
            edgy[alpha[a]] = 1
        else:
            edgy[alpha[a]] = C[a - 1] + 1 # Edgy for a given label is C[prior_label] + 1
    return edgy

#TESTING 

#O = '01001010101101101'
#I = ''
#L = 'TCGGTTAA'
#C = [2, 3, 5, 8]

#print(findEdges(O, L, C))
#print(createEdges(O, L, C))

#print(getEdgy(L, C))