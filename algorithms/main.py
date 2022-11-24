#algorithm to determine if a graph has the wheeler property!
from flask import Flask, jsonify, request
from flask_cors import CORS
from getSingleStringWheelerGraph import getSingleStringWheelerGraph 
from getMultiStringWheelerGraph import getMultiStringWheelerGraph
from getTrieWheelerGraph import getTrieWheelerGraph
from getOILC import getOILC
from ordered_wheeler_property import check_for_wheeler_property
from find_ordering import find_ordering


app = Flask(__name__)
CORS(app)

@app.route('/visualize', methods =['POST'])
def visualize():
    if (len(request.json['str']) == 1) :
        graph = getSingleStringWheelerGraph(request.json['str'][0])
        return jsonify({"result": graph})
    elif(len(request.json['str']) > 0):
        graph = getTrieWheelerGraph(request.json['str'])
        return jsonify({"result": graph})
    else:
        return jsonify({"result": {"nodes": [], "edges": []}})


@app.route('/compressed', methods = ['POST'])
def compressed():
    if (len(request.json['str']) == 1) :
        graph = getSingleStringWheelerGraph(request.json['str'][0])
    elif(len(request.json['str']) > 0):
        graph = getTrieWheelerGraph(request.json['str'])
    else : graph = {'nodes': [], 'edges': []}
    oilc = getOILC(graph['nodes'], graph['edges'])
    return jsonify(oilc)

@app.route('/checkWheeler', methods = ['POST'])
def checkWheeler():
    nodes = request.json['nodes'] 
    edges = request.json['edges']
    isWheeler = {'result' : check_for_wheeler_property(nodes, edges)}
    return jsonify(isWheeler)


@app.route('/findOrdering', methods=['POST'])
def findOrdering():
    r = find_ordering({'nodes': request.json['nodes'], 'edges': request.json['edges']}, MAX_ITERATIONS=100000000000000000000)
    return jsonify({"graph": str(r['ordering']), "message": r['message']})

@app.route("/")
def index():
    return "Congratulations, you're looking at your web app base endpoint"


if __name__ == '__main__':
	app.run(debug = True)
