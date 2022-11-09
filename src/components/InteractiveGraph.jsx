import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import './css/index.css';
import axios from 'axios';

const initialNodes = [
  {
    id: '0',
    data: { label: 0 },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;
const decrementId = () => {id--};

const edgeOptions = {
  animated: true,
  label: 'a',
  style: {stroke: '#ADD8E6'}
}
const connectionLineStyle = { stroke: 'black' };

const fitViewOptions = {
  padding: 3,
};

const AddNodeOnEdgeDrop = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [change, setChange] = useState(0);
  const [wheeler, setWheeler] = useState(1);
  const { project } = useReactFlow();
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    const path = 'http://127.0.0.1:5000/checkWheeler';
        axios.post(path, {nodes: nodes, edges: edges}).then(
            (response) => {
                var result = response.data;
                setWheeler(result.result);
            },
            (error) => {
                console.log(error);
            }
        );
  }, [change, nodes.length, edges.length]);

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
        return {id: e.id, label: newLabel, source: e.source, target: e.target, style: {stroke: getColor(newLabel)}}
      }
      else return e;
    });
    const filteredNewEdges = newEdges.filter(e => e.label != 'x')
    setEdges(filteredNewEdges);
    const c = change + 1;
    setChange(c);
  }

  const handleNodeClick = (event, node) => {
    const id_dropped = node.id;
    decrementId();
    const newEdges = edges.filter(e => {return (e.source != node.id && e.target != node.id)});
    const newNodes = nodes.filter(n => {return n.id != node.id});
    const updatedNewNodes = newNodes.map(n => {
      if(n.id > id_dropped){
        const newId = (parseInt(n.id) - 1).toString();
        return {id: newId, position: n.position, data: {label: newId}}
      }
      else return n;
    })
    const updatedNewEdges = newEdges.map(e => {
      if(e.source > id_dropped && e.target > id_dropped){
        const newSource = (parseInt(e.source) - 1).toString();
        const newTarget = (parseInt(e.target) - 1).toString();
        return {id: e.id, target: newTarget, source: newSource, label: e.label}
      }
      else if(e.source > id_dropped){
        const newSource = (parseInt(e.source) - 1).toString();
        return {id: e.id, target: e.target, source: newSource, label: e.label}
      }
      else if(e.target > id_dropped){
        const newTarget = (parseInt(e.target) - 1).toString();
        return {id: e.id, target: newTarget, source: e.source, label: e.label}
      }
      else return e;
    })
    setNodes(updatedNewNodes);
    setEdges(updatedNewEdges);
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
    <div>
      {wheeler ? <h2>This is a Wheeler Graph!</h2> : <h2>Not A Wheeler Graph!</h2>}
    </div>
    </>
  );
};


function InteractiveGraph () {
    return (
        <ReactFlowProvider>
            <AddNodeOnEdgeDrop />
        </ReactFlowProvider>
    );
}

export default InteractiveGraph;