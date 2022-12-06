#Used by the pattern matching tab. This algorithm is executed when the user clicks the match button, if they have already input an oilc file and a string p.

def get_num_pattern_matches(O,L,C,P) :
    #we are given O, L, and C from a wheeler graph, as well as a string P that we are trying to match. 
    #We need an algorithm that can use this data quickly to return the number of times P occurs in the string/multistring.
    alphabet = []
    O = O.split('1') #splitting O into a list of '0' strings. Now, node x will be the x'th item in this list, and its outdegree will be the length of O[x]

    for letter in L:
        if letter not in alphabet:
            alphabet.append(letter)
    alphabet.sort()
    ranges_dict = {}
    ranges_dict[alphabet[0]] = [i for i in range(0,C[0])]
    for i in range(1, len(alphabet)):
        ranges_dict[alphabet[i]] = [j for j in range(C[i-1], C[i])]

    #now we have the orders of each node stored based on which letter is pointing to it.
    successful_range = ranges_dict[P[0]] if P[0] in ranges_dict else []

    for i in range(1,len(P)):
        current_letter = P[i]
        #we need to find out the RANGE OF NODES which come from successful_range, AND have their letter as current_letter
        next_successful_range = []
        for node_order in successful_range:

            #now we need to figure out which outgoing edge labels this node has.
            number_outgoing_edges = len(O[node_order+1])
            starting_index_of_this_nodes_edges = 1
            for n in O[0:node_order]:
                starting_index_of_this_nodes_edges += len(n)
            
            edge_labels = [L[j] for j in range(starting_index_of_this_nodes_edges, starting_index_of_this_nodes_edges+number_outgoing_edges)]
            
            #if the target letter is in the outgoing edge labels for this node, we need to figure out the rank of the first one.
            rank = 0
            if(current_letter in edge_labels):
                for x in range(0, starting_index_of_this_nodes_edges):
                    if (L[x] == current_letter): rank += 1

            #now that we have the edge labels coming from this node, we need to add the target nodes from these edges to next_successful_range
            #IF the edge label is equal to current_letter.
            for e in edge_labels:
                if (e == current_letter):
                    #we need to find out exactly which node this edge points to by using its rank.
                    next_successful_range.append(ranges_dict[e][rank])
                    rank += 1
            
        successful_range = next_successful_range

    return len(successful_range)