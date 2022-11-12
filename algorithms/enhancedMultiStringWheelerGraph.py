
def enhancedMultiStringWheelerGraph (inputArr) : 
    nodes = []
    edges = []
    all_prefixes = {}

    # How to get the multi string wheeler graph:
    #1. Loop from 0 to max(len(str_i)) where str_i could be whichever string is the longest.
    #2. At each index, make nodes for each letter that exists at that index. So, if at index 3 all strings have an 'A', we only need 1 node.
    #3. Make edges to connect each node from its predecessor(s) KEEPING TRACK OF WHICH STRING(s) THIS EDGE IS PART OF as well as label, source, target, etc... 
    #   (if all X strings go to the same node, that edge must have a property that says [1...X] are each included included.)
    #4. Order all nodes like in single string wheeler graph method, and return!

    #First, lets get the maximum input string length.
    max_len = 0
    new_input_array = []
    for i in range(len(inputArr)):
        s = '$' +  inputArr[i]
        new_input_array.append(s)
        if(len(s) > max_len):
            max_len = len(s)

    #Step 1: we need to loop over all indexes of the strings, and make a node / nodes for each index.
    for i in range(max_len):
        
        #Step 2: getting list of characters that appear at index i in any of the strings.
        all_chars_at_i = []
        cur_nodes = []
        for s in new_input_array:
            if i < len(s):
                all_chars_at_i.append(s[i])
        chars_at_i = set(all_chars_at_i)
        #need to make 1 node for each of these characters. A node has a placeholder id and a list of incoming strings (rather, their indexes).
        for c in chars_at_i:
            node = {'id' : '', 'incoming_strings':[]}
            for j, s in enumerate(new_input_array):
                if i<len(s) and s[i] == c: # this statement will always evaluate as true for at least 1 of the strings bc of the way chars_at_i was created.
                    if not node['id'] : node['id'] = s[0:i+1] #we're just giving a node a unique and comparable id the first time a string hits it.
                    node['incoming_strings'].append(j) #add this strings index to the list of incoming strings for the node.
                    all_prefixes[s[0:i+1]] = node['id'] #creating a lookup table as we go, where all the prefixes of all strings map to a certain node
            nodes.append(node)
            cur_nodes.append(node)

        #Step 3: Now we need to connect each of these to its predecessor(s)
        if i == 0 : continue #no incoming edges to the $ node.
        for node in cur_nodes:
            label = new_input_array[node['incoming_strings'][0]][i] #the last letter of any of the incoming strings (they will all be the same)
            target = node['id'] #We are making edges that will be TARGETTED into the current node.
            sources = {} # {source id : [strings involved]}
            for j in node['incoming_strings']:
                incoming_string = new_input_array[j][0:i+1]
                source_id = all_prefixes[incoming_string[0:i]]
                if(source_id not in sources): sources[source_id] = [j]
                else : sources[source_id].append(j)

            for source in sources:
                edge = {'source' : source, 'target': target, 'label': label, 'strings': sources[source]}
                edges.append(edge)
    
    #Step 4: Finally, we just have to order the nodes.
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
