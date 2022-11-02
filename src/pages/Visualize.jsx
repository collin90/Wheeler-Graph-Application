import axios from "axios";
import {useState, useRef} from "react";
import Graph from "../components/Graph";
import {MarkerType} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';



function Visualize () {
    
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [text, setText] = useState('');
    const [fileContent, setFileContent] = useState('');
    const ref=useRef(null);
    let textFile = null;


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
        setNodes(formattedNodes);
        setEdges(formattedEdges);
    }

    const handleOnTextSubmit = () => {
        const path = 'http://127.0.0.1:5000/visualize';
        axios.post(path, {str: text}).then(
            (response) => {
                var result = response.data;
                formGraph(result.result.nodes, result.result.edges);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const handleOnFileSubmit = () => {
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

    const handleTextInput = (e) => {
        setText(e.target.value);
    }

    const makeTextFile = () => {
        var data = new Blob([JSON.stringify({nodes: nodes.map(node => ({id: node.id, order: node.data.label})), edges: edges.map(edge => ({id: edge.id, source: edge.source, target: edge.target, label: edge.label}))})], {type: 'text/json'});

        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
    
        textFile = window.URL.createObjectURL(data);
    
        return textFile;
      };

    const createWheelerGraphFile = () => {
        var link = ref.current;
        link.href = makeTextFile();
    }



    return (
        <Container>
            <Box py={3}>
                <Typography variant="h4">Visualize Your Text as a Wheeler Graph</Typography>
            </Box>
            <Stack spacing={4}>
                <Typography variant="p">Input your own string or choose a .txt file containing a string of text to index</Typography>
                <Grid container direction='row'>
                    <Grid item xs={4} md={4}>
                        <TextField id="outlined-basic" label="Text" variant="outlined" onChange={handleTextInput} multiline/>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleOnTextSubmit} variant='outlined'>Generate Graph From Text</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <Input type="file" onChange={handleFileInput} />
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleOnFileSubmit} variant='outlined'>Generate Graph From File</Button>
                    </Grid>
                </Grid>
            </Stack>
            <br></br>
            <Box py={2} sx={{ border: 3}} mb={3}>
                <div style={{width:'auto', height:window.innerHeight/1.5}}>
                    <Graph nodes={nodes} edges={edges}/>
                </div>
            </Box>
            <Grid container direction = "row" mb={4}>
                <Grid item xs={4}>
                    <Button onClick={createWheelerGraphFile} variant='outlined'>Create Wheeler Graph File</Button>
                </Grid>
                <Grid item xs={1}>
                    <Box sx={{ border: 1}}>
                        <a download="wheelergraph.txt" ref={ref}>Download</a>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );

} export default Visualize;