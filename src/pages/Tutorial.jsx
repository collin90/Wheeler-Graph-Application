import Graph from "../components/Graph";
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Background,
    MarkerType,
  } from 'reactflow';

function Tutorial () {
    return (
    <div>
        <div style={{ height: 500 }}>
            <div>This page will hold the tutorial</div>
        </div>
        
        <div style={{ height: 500 }}>
        <iframe src="./teaching_guide.pdf" height="100%" width="100%"></iframe>
        </div>

    </div>

    )


} export default Tutorial;