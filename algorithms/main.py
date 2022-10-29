#algorithm to determine if a graph has the wheeler property!
from flask import Flask, jsonify, request
from flask_cors import CORS
from getWheelerGraph import getWheelerGraph 

app = Flask(__name__)
CORS(app)

@app.route('/visualize', methods =['POST'])
def visualize():
    graph = getWheelerGraph(request.json['str'])
    return jsonify({"result": graph})

if __name__ == '__main__':
	app.run(debug = True)
