import React, { useCallback, useRef, useState, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from'@mui/material/Box';
import 'reactflow/dist/style.css';
import './css/index.css';
import axios from 'axios';
import { MarkerType } from 'reactflow';
import Graph from "../components/Graph";

const getColor = (label) => {
  if(label == 'A') return '#ADD8E6';
  else if (label == 'B') return '#CBC3E3';
  else if (label == 'C') return '#ff7f50';
  else return 'black';
}

const initialNodes = [
  { id: 'node1', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '1' }, position: { x: 550, y: 50 } },
  { id: 'node2', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '2' }, position: { x: 600, y: 150 } },
  { id: 'node3', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '3' }, position: { x: 600, y: 250 } },
  { id: 'node4', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '4' }, position: { x: 550, y: 350 } },
  { id: 'node5', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '5' }, position: { x: 400, y: 350 } },
  { id: 'node6', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '6' }, position: { x: 350, y: 250 } },
  { id: 'node7', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '7' }, position: { x: 350, y: 150 } },
  { id: 'node8', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '8' }, position: { x: 400, y: 50 } },
]
const initialEdges = [
  { id: 'edge1_2', animated: true, source: 'node1', target: 'node2', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('A'), }, style: { strokeWidth: 2, stroke: getColor('A'), } },
  { id: 'edge1_3', animated: true, source: 'node1', target: 'node3', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('A'), }, style: { strokeWidth: 2, stroke: getColor('A'), } },
  { id: 'edge1_5', animated: true, source: 'node1', target: 'node5', label: 'B', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('B'), }, style: { strokeWidth: 2, stroke: getColor('B'), } },
  { id: 'edge2_7', animated: true, source: 'node2', target: 'node7', label: 'C', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('C'), }, style: { strokeWidth: 2, stroke: getColor('C'), } },
  { id: 'edge2_3', animated: true, source: 'node2', target: 'node3', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('A'), }, style: { strokeWidth: 2, stroke: getColor('A'), } },
  { id: 'edge3_5', animated: true, source: 'node3', target: 'node5', label: 'B', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('B'), }, style: { strokeWidth: 2, stroke: getColor('B'), } },
  { id: 'edge7_6', animated: true, source: 'node7', target: 'node6', label: 'B', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('B'), }, style: { strokeWidth: 2, stroke: getColor('B'), } },
  { id: 'edge7_8', animated: true, source: 'node7', target: 'node8', label: 'C', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('C'), }, style: { strokeWidth: 2, stroke: getColor('C'), } },
  { id: 'edge8_4', animated: true, source: 'node8', target: 'node4', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('A'), }, style: { strokeWidth: 2, stroke: getColor('A'), } },
  { id: 'edge6_8', animated: true, source: 'node6', target: 'node8', label: 'C', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('C'), }, style: { strokeWidth: 2, stroke: getColor('C'), } },
  { id: 'edge5_4', animated: true, source: 'node5', target: 'node4', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('A'), }, style: { strokeWidth: 2, stroke: getColor('A'), } },
  { id: 'edge5_6', animated: true, source: 'node5', target: 'node6', label: 'C', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: getColor('C'), }, style: { strokeWidth: 2, stroke: getColor('C'), } },
]

const TutorialGraph = () => {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  let step = 0;
  let goodNodes = [];
  let goodEdges = [];

  useEffect(() => {
    resetGraph();
  }, [])

  const resetGraph = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    step = 0;
  }

  const nextStep = (dir) => {
    if (dir = 1) {
      if (step < 4) {
        step++
      } else if (step > 0) {
        step--;
      }
    }

    switch(step) {
      case 1:
        // goodNodes = ['node5', 'node6'];
        // setNodes((nds) => 
        //   nds.map((node) => {
        //     if (goodNodes.includes(node.id)) {
        //       node.style = { ...node.style, backgroundColor: '#90EE90' };
        //     }
        //   }
        // ));
        // goodEdges = ["edge7_6", "edge1_5", "edge3_5"];
        // setEdges();
        // B
        //nodes: 5, 6
        //edges: 7-6, 1-5, 3-5, 
        break;
      case 2:
        // goodNodes = ['node8', 'node6'];
        // goodEdges.push("edge5_7");
        // goodEdges.push("edge6_8");

        // C
        //nodes: 8, 6
        //edges: 6-8, 5-7, 
        break;
      case 3:
        // goodNodes = ['node4'];
        // goodEdges = ["edge7_6", "edge6_8", "edge8_4"];
        //A
        //nodes: 4
        //edges: 8-4
        break;
      default:
    }
  }

  return (
    <>
      <Box py={2} sx={{ border: 3 }} mb={3}>
        <div style={{ height: 400 }}>
          <Graph nodes={nodes} edges={edges} />
        </div>
      </Box>
      <Grid container direction="row" >
        <Grid item xs={3} >
          <Button onClick={resetGraph} variant='outlined'>Reset</Button>
        </Grid>
        <Grid item xs={3} >
          <Button onClick={nextStep(1)} variant='outlined' >Previous</Button>
        </Grid>
        <Grid item xs={3} >
          <Button onClick={nextStep(1)} variant='outlined' >Next</Button>
        </Grid>
      </Grid>
    </>
  );
};


function PatternMatchingTutorial() {
  return (
    <ReactFlowProvider>
      <TutorialGraph />
    </ReactFlowProvider>
  );
}

export default PatternMatchingTutorial;