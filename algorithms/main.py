#algorithm to determine if a graph has the wheeler property!
from flask import Flask, jsonify, request
from flask_cors import CORS
from getSingleStringWheelerGraph import getSingleStringWheelerGraph 
from getMultiStringWheelerGraph import getMultiStringWheelerGraph

app = Flask(__name__)
CORS(app)

@app.route('/visualize', methods =['POST'])
def visualize():
    if (len(request.json['str']) == 1) :
        graph = getSingleStringWheelerGraph(request.json['str'][0])
        return jsonify({"result": graph})
    elif(len(request.json['str']) > 0):
        graph = getMultiStringWheelerGraph(request.json['str'])
        return jsonify({"result": graph})
    else:
        return jsonify({"result": {"nodes": [], "edges": []}})

if __name__ == '__main__':
	app.run(debug = True)