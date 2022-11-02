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
    // nodes is a list of node objects of the form: { id: 'string', style: {width: int, fontSize: int}, (data) {label: 'string'}, (position) {x: number, y: number} }
    // edges is a list of edge objects of the form: { id: 'string', source: 'node-id string', target: 'node-id string'} 
    const nodes = [
        {id: 'node1', style: {width: 30, height: 30, fontsize: 10}, data: {label: '1'}, position: {x:0, y:0}},
        {id: 'node2', style: {width: 30, height: 30, fontsize: 10}, data: {label: '2'}, position: {x:100, y:50}},
        {id: 'node3', style: {width: 30, height: 30, fontsize: 10}, data: {label: '3'}, position: {x:200, y:100}},
        {id: 'node4', style: {width: 30, height: 30, fontsize: 10}, data: {label: '4'}, position: {x:300, y:150}},
        {id: 'node5', style: {width: 30, height: 30, fontsize: 10}, data: {label: '5'}, position: {x:400, y:200}},
        {id: 'node6', style: {width: 30, height: 30, fontsize: 10}, data: {label: '6'}, position: {x:500, y:250}},
        {id: 'node7', style: {width: 30, height: 30, fontsize: 10}, data: {label: '7'}, position: {x:600, y:300}},
        {id: 'node8', style: {width: 30, height: 30, fontsize: 10}, data: {label: '8'}, position: {x:700, y:350}}
    ]
''
    const edges = [
        {id: 'edge1', animated:true, source:'node1', target:'node2', label:'a', markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#ADD8E6',},style: {strokeWidth: 1,stroke: '#ADD8E6',}},
        {id: 'edge2', animated:true, source:'node1', target:'node3', label:'a',  markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#ADD8E6',},style: {strokeWidth: 1,stroke: '#ADD8E6',}},
        {id: 'edge3', animated:true, source:'node2', target:'node3', label:'a', markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#ADD8E6',},style: {strokeWidth: 1,stroke: '#ADD8E6',}},
        {id: 'edge4', animated:true, source:'node1', target:'node5', label:'b', markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#90EE90',},style: {strokeWidth: 1,stroke: '#90EE90',}},
        {id: 'edge5', animated:true, source:'node2', target:'node7', label:'c', markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#FFCCCB',},style: {strokeWidth: 1,stroke: '#FFCCCB',}},
        {id: 'edge6', animated:true, source:'node3', target:'node5', label:'b', markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#90EE90',},style: {strokeWidth: 1,stroke: '#90EE90',}},
        {id: 'edge7', animated:true, source:'node5', target:'node4', label:'a', markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#ADD8E6',},style: {strokeWidth: 1,stroke: '#ADD8E6',}},
        {id: 'edge8', animated:true, source:'node5', target:'node7', label:'c',  markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#FFCCCB',},style: {strokeWidth: 1,stroke: '#FFCCCB',}},
        {id: 'edge10', animated:true, source:'node6', target:'node8',label:'c',  markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#FFCCCB',},style: {strokeWidth: 1,stroke: '#FFCCCB',}},
        {id: 'edge11', animated:true, source:'node7', target:'node6',label:'b',  markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#90EE90',},style: {strokeWidth: 1,stroke: '#90EE90',}},
        {id: 'edge12', animated:true, source:'node7', target:'node8',label:'c',  markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#FFCCCB',},style: {strokeWidth: 1,stroke: '#FFCCCB',}},
        {id: 'edge13', animated:true, source:'node8', target:'node4',label:'a',  markerEnd: {type: MarkerType.ArrowClosed,width: 8,height: 8,color: '#ADD8E6',},style: {strokeWidth: 1,stroke: '#ADD8E6',}}
    ]
    
    return (
        <div style={{ height: 500 }}>
            <div>This is a tutorial on Wheeler graphs. Here is an example of a wheeler graph</div>
            <Graph nodes={nodes} edges={edges}/>
        </div>
    )


} export default Tutorial;