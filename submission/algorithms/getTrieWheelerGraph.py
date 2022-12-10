#used by the visualize tab. Gets a wheeler graph based on a set of strings, by finding the trie for those strings.

def getTrieWheelerGraph (inputArr):
    nodes = []
    edges = []
    ids_dict = {}

    #in this implementation we will take our multistring, and convert it into our friend the trie
    #the trie data structure is wheeler, because of the orderability of the nodes in multistrings.
    #all we need to do is build the trie, sort the nodes by reverse abc order, and we are done!
    
    
    #step 1, the root node. Ez.
    nodes.append({"id" : "#"})
    for i in range(len(inputArr)):
        inputArr[i] = inputArr[i] + '$'

    #Step 2, now to build the trie.
    for inputStr in inputArr:
        #walk across each string letter by letter
        for i in range(len(inputStr)):
            #if the current walk has already been made, we do nothing!
            if (inputStr[0:i+1] in ids_dict): continue
            #if the current walk has not already been made, we will need to add a new node and edge :)
            else :
                n = {"id" : inputStr[0:i+1]}
                nodes.append(n)
                ids_dict[n['id']] = 1
                source = '#' if i == 0 else inputStr[0:i]
                target = n['id']
                label = inputStr[i]
                e = {'source': source, 'target': target, 'label': label}
                edges.append({'source': source, 'target': target, 'label': label})

    #step 3, now to sort the nodes.
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