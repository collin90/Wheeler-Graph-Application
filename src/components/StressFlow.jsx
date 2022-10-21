import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'reactflow';

import 'reactflow/dist/style.css';

function StressFlow () {

    function createNodesAndEdges(xNodes = 10, yNodes = 10) {
        const nodes = [];
        const edges = [];
        let nodeId = 1;
        let recentNodeId = null;
      
        for (let y = 0; y < yNodes; y++) {
          for (let x = 0; x < xNodes; x++) {
            const position = { x: x * 100, y: y * 50 };
            const data = { label: `Node ${nodeId}` };
            const node = {
              id: `stress-${nodeId.toString()}`,
              style: { width: 50, fontSize: 11 },
              data,
              position,
            };
            nodes.push(node);
      
            if (recentNodeId && nodeId <= xNodes * yNodes) {
              edges.push({
                id: `${x}-${y}`,
                source: `stress-${recentNodeId.toString()}`,
                target: `stress-${nodeId.toString()}`,
              });
            }
      
            recentNodeId = nodeId;
            nodeId++;
          }
        }
      
        return { nodes, edges };
      }
    
  const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges(10, 10);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  const updatePos = useCallback(() => {
    setNodes((nds) => {
      return nds.map((node) => {
        return {
          ...node,
          position: {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          },
        };
      });
    });
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    >
      <MiniMap />
      <Controls />
      <Background />

      <button onClick={updatePos} style={{ position: 'absolute', right: 10, top: 30, zIndex: 4 }}>
        change pos
      </button>
    </ReactFlow>
  );
};

export default StressFlow;