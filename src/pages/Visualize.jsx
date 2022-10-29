import axios from "axios";
import {useState} from "react";
import Graph from "../components/Graph";
import {MarkerType} from 'reactflow';


function Visualize () {

    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [fileContent, setFileContent] = useState('');

    const formGraph = (nodes, edges) => {
        const formattedNodes = nodes.map(node => (
            {id: node.id, style: {width: Math.ceil(500/(nodes.length)), height: Math.ceil(500/(nodes.length)), fontsize: 5}, data: {label: node.label}, position: {x:Math.floor(Math.random()*500), y:Math.floor(Math.random()*500)}}
        ));
        const formattedEdges = edges.map(edge => (
            {id: edge.id, animated:true, source:edge.source, target:edge.target, label:'a', markerEnd: {type: MarkerType.ArrowClosed,width: 4,height: 4,color: '#ADD8E6',},style: {strokeWidth: 1,stroke: '#ADD8E6',}}
        ));
        setNodes(formattedNodes);
        setEdges(formattedEdges);
    }

    const handleOnSubmit = () => {
        const path = 'http://127.0.0.1:5000/visualize';
        axios.post(path, {str: fileContent}).then(
            (response) => {
                var result = response.data;
                formGraph(result.result.nodes, result.result.edges);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            setFileContent(fileContent);
        }
        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(file);
    }


    return (
        <div>
            This is the visualization page
            <br></br>
            <form>
                <input type="file" onChange={handleFileInput} />
            </form>
            <button onClick={handleOnSubmit}>Get Wheeler Graph</button>
            <br></br>
            <div style={{ height: 700, width: 700}}>
                <Graph nodes={nodes} edges={edges}/>
            </div>
        </div>
    );

} export default Visualize;