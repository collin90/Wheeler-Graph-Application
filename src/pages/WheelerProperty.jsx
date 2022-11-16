import axios from "axios";
import {useState, useRef} from "react";
import Graph from "../components/Graph";
import Container from "@mui/material/Container";
import {MarkerType} from 'reactflow';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';


function WheelerProperty () {
    
    const [nodes, setNodes] = useState();
    const [edges, setEdges] = useState();
    const [graphableNodes, setGraphableNodes] = useState([]);
    const [graphableEdges, setGraphableEdges] = useState([]);
    const [message, setMessage] = useState('');
    const URL = `https://python-wheeler-algorithms-service-34nimsvaoa-uk.a.run.app/`;
    const refJSONDownload=useRef(null);
    let textFileJSON = null;


    const formGraph = (nodes, edges) => {
        //create the colors list
        let colors = {};
        edges.forEach(edge => {
            if (!(edge.label in colors)) colors[edge.label] = '#' + Math.floor(Math.random()*16777215).toString(16);
        })
        let nodeIndex = 0;
        let column = 0;
        let row = 0;
        const numRows = Math.ceil(Math.sqrt(nodes.length));
        const getPosition = () => {
            let xPos = Math.ceil(15 + 60*column);
            let yPos = Math.ceil(15 + 75*row);
            nodeIndex ++;
            row = (row + 1) % numRows;
            if(nodeIndex % numRows == 0) column++;

            return {x: xPos, y: yPos}
        }
        const formattedNodes = nodes.map(node => (
            {id: node.id, style: {width: 30, height: 30, fontsize: 10}, data: {label: node.order}, position: getPosition()}
            ));
        const formattedEdges = edges.map(edge => (
            {id: uuidv4(), animated:true, source:edge.source, target:edge.target, label:edge.label, markerEnd: {type: MarkerType.ArrowClosed,width: 6,height: 6,color: colors[edge.label],},style: {strokeWidth: 1.2,stroke: colors[edge.label],}}
        ));
        setGraphableNodes(formattedNodes);
        setGraphableEdges(formattedEdges);
    }


    const handleFileInput = (e) => {
        const files = e.target.files;
        let fileContent;
        let reader = new FileReader();
        reader.onload = (e) => {
            fileContent = e.target.result.replace(/[\r\n]/gm, '');
            console.log(fileContent);
            const g = JSON.parse(fileContent);
            setNodes(g.nodes);
            setEdges(g.edges);
        }
        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(files[0]);
    }

    const handleFileSubmit = () => {
        setMessage("Trying to find an ordering with the wheeler property...")
        const path = URL + 'findOrdering';
        axios.post(path, {nodes: nodes, edges: edges}).then(
            (response) => {
                const result = response.data;
                const graph = result.graph != 'None' ? JSON.parse(result.graph.replace(/'/g, '"')) : undefined;
                const m = result.message;
                graph ? formGraph(graph.nodes, graph.edges) : formGraph(nodes,edges);
                setMessage(m);
            },
            (error) => {
                console.log(error);
            }
        ); 
    }

    const createWheelerGraphFile = () => {   
        const makeTextFile = () => {
            var data = new Blob([JSON.stringify({nodes: nodes.map(node => ({id: node.id, order: node.order})), edges: edges.map(edge => ({id: uuidv4(), source: edge.source, target: edge.target, label: edge.label, strings: edge.strings}))})], {type: 'text/json'});
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
        <Container>
            <Box py={3}>
                <Typography variant="h4">Test for the Wheeler Property on an Unordered Graph</Typography>
            </Box>
            <Grid container direction="row">
                <Grid item xs={4}>
                    <input type="file" accept='.txt' onChange={handleFileInput} />
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={handleFileSubmit} variant='outlined'>Find a Wheeler Ordering</Button>
                </Grid>
            </Grid>
            <Typography variant="h6">{message}</Typography>
            <Box py={2} sx={{ border: 3}} mb={3} mt={3}>
                <div style={{width:'auto', height:window.innerHeight/1.5}}>
                    {graphableNodes.length < 200 ? <Graph nodes={graphableNodes} edges={graphableEdges}/> : <Graph ndoes={[]} edges={[]} /> }
                </div>
            </Box>
            <Stack spacing={.125} mb={3}>
                <Grid container direction = "row" mb={4}>
                    <Grid item xs={4}>
                        <Button onClick={createWheelerGraphFile} variant='outlined'>Create Wheeler Graph JSON</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <a download="graphJSON.txt" ref={refJSONDownload} style={{'display':'none'}}>Download JSON Object</a>
                    </Grid>
                </Grid>
            </Stack>

        </Container>
    );

} export default WheelerProperty;