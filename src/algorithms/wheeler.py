#algorithm to determine if a graph has the wheeler property!
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/visualize', methods =['POST'])
def visualize():
    return jsonify({"Result": "Here is a wheeler graph!", "NODES": request.json['nodes'], "EDGES": request.json['edges']})

if __name__ == '__main__':
	app.run(debug = True)
