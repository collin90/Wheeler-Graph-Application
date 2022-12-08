import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import './css/index.css';
import axios from 'axios';
import { MarkerType } from 'reactflow';
import { URL } from '../url.js';

const initialNodes = [
  {
    id: '0',
    data: { label: 0 },
    position: { x: 0, y: 50 },
  },
];


let id = 1;
const getId = () => `${id++}`;
const decrementId = () => `${id--}`;
const resetId = () => {id = 1};

const edgeOptions = {
  animated: true,
  label: 'a',
  style: {stroke: '#ADD8E6'},
  markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#ADD8E6', }
}
const connectionLineStyle = { stroke: 'black' };

const fitViewOptions = {
  padding: 3,
};

const  AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const refJSONDownload=useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [change, setChange] = useState(0);
  const [wheeler, setWheeler] = useState(1);
  const { project } = useReactFlow();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  let textFileJSON = null;


  useEffect(() => {
    const path = `${URL}/checkWheeler`;
    axios.post(path, {nodes: nodes, edges: edges}).then(
      (response) => {
        var result = response.data;
        setWheeler(result.result);
      }, (error) => {
        console.log(error);
      }
    );

  }, [change, nodes.length, edges.length]);

  useEffect(() => {
    resetGraph();
  },[])

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();
        const newNode = {
          id,
          // we are removing the half of the node width (75) to center the new node
          position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
          data: { label: `${id}` },
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ id:uuidv4(), source: connectingNodeId.current, target: id, label: 'a'}));
      }
    },
    [project]
  );

  const getColor = (label) => {
    if(label == 'a') return '#ADD8E6';
    else if (label == 'b') return '#90EE90';
    else if (label == 'c') return '#ff7f50';
    else if (label == 'd') return '#CBC3E3';
    else return 'black';
  }

  const handleEdgeClick = (event, edge) => {
    let newLabel;
    if(edge.label == 'a') newLabel = 'b';
    else if (edge.label == 'b') newLabel = 'c';
    else if (edge.label == 'c') newLabel = 'd';
    else newLabel = 'x';
    const newEdges = edges.map(e => {
      if(e.id == edge.id){
        return {id: e.id, label: newLabel, source: e.source, target: e.target, style: {stroke: getColor(newLabel)},  markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor(newLabel) }}
      }
      else return e;
    });
    const filteredNewEdges = newEdges.filter(e => e.label != 'x')
    setEdges(filteredNewEdges);
    const c = change + 1;
    setChange(c);
  }

  const handleNodeClick = (event, node) => {
    if(nodes.length > 1) {
      const id_dropped = parseInt(node.id);
      const a = decrementId();
      
      //First, kill all edges with this node as a source or target, as well as the node itself.
      const newEdges = edges.filter(e => {return (e.source != id_dropped && e.target != id_dropped)});
      const newNodes = nodes.filter(n => {return n.id != id_dropped});
      
      //Next, update all the nodes So they are 1 less if they were bigger than the one that got dropped.
      const updatedNewNodes = newNodes.map(n => {
        if(parseInt(n.id) > id_dropped){
          const newId = (parseInt(n.id) - 1).toString();
          return {id: newId, position: n.position, data: {label: newId}}
        }
        else return n;
      })

      //Finally, update all the edges so they are still connecting the right nodes.
      const updatedNewEdges = newEdges.map(e => {
        if(parseInt(e.source) > id_dropped && parseInt(e.target) > id_dropped){
          const newSource = (parseInt(e.source) - 1).toString();
          const newTarget = (parseInt(e.target) - 1).toString();
          return {id: e.id, target: newTarget, source: newSource, label: e.label}
        }
        else if(parseInt(e.source) > id_dropped){
          const newSource = (parseInt(e.source) - 1).toString();
          return {id: e.id, target: e.target, source: newSource, label: e.label}
        }
        else if(parseInt(e.target) > id_dropped){
          const newTarget = (parseInt(e.target) - 1).toString();
          return {id: e.id, target: newTarget, source: e.source, label: e.label}
        }
        else return e;
      })
      setNodes(updatedNewNodes);
      setEdges(updatedNewEdges);
    }
  }

  const resetGraph = () => {
    resetId();
    const newNodes = initialNodes;
    const newEdges = [];
    setNodes(newNodes);
    setEdges(newEdges);
  }

  const addNode = () => {
    const newNodes = nodes;
    const id = getId();
    const newNode = {
      id: id,
      position: {x: 0, y: 0},
      data: { label: `${id}` },
    };
    setNodes((nds) => nds.concat(newNode));
  }

  const getDownload = () => {
      const makeTextFile = () => {
          var data = new Blob([JSON.stringify({nodes: nodes.map(node => ({id: node.id, order: node.data.label})), edges: edges.map(edge => ({id: uuidv4(), source: edge.source, target: edge.target, label: edge.label}))})], {type: 'text/json'});
          if (textFileJSON !== null) {
            window.URL.revokeObjectURL(textFile);
          }
          textFileJSON = window.URL.createObjectURL(data);
          return textFileJSON;
        };
  
      var link = refJSONDownload.current;
      link.href = makeTextFile();
      link.style.display = 'block';
  }

  return (
    <>
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={handleNodeClick}
        onEdgesChange={onEdgesChange}
        onEdgeClick={handleEdgeClick}
        defaultEdgeOptions={edgeOptions}
        connectionLineStyle={connectionLineStyle}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={fitViewOptions}
      />
    </div>
    <Grid container direction="row" mb={4}>
      <Grid item xs={3} >
        {wheeler ? <h2>This is a Wheeler Graph!</h2> : <h2>Not A Wheeler Graph!</h2>}
      </Grid>
      <Grid item xs={3} mt={3}>
        <Button onClick={resetGraph} variant='outlined'>Reset Graph</Button>
      </Grid>
      <Grid item xs={3} mt={3}>
        <Button onClick={addNode} variant='outlined'>Add Node</Button>
      </Grid>
      <Grid item xs={3} mt={3}>
        <Button onClick={getDownload} variant='outlined'>Create Graph JSON</Button>
      </Grid>
      <Grid item xs={3}>
        <a download="graphJSON.txt" ref={refJSONDownload} style={{'display':'none'}}>Download JSON Object</a>
      </Grid>
    </Grid>
    </>
  );
};


function InteractiveGraph () {
  return (
          <ReactFlowProvider>
              <AddNodeOnEdgeDrop/>
          </ReactFlowProvider>
    );
}

export default InteractiveGraph;