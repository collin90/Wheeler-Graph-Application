import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

function Graph (props) {

  const {nodes : initialNodes, edges: initialEdges} = props;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  useEffect(()=> {
    setNodes(props.nodes)
    setEdges(props.edges)
  },[props])


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <Controls />
    </ReactFlow>
  );
};

export default Graph;