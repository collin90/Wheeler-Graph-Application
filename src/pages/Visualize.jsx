import axios from "axios";
import {useState, useRef} from "react";
import Graph from "../components/Graph";
import {MarkerType} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextBox from '../components/TextBox';

function Visualize () {
    
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [rawNodes, setRawNodes] = useState([]);
    const [rawEdges, setRawEdges] = useState([]);
    const [texts, setTexts] = useState([{id: uuidv4(),text: ""}]);
    const [fileContent, setFileContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const refJSONDownload=useRef(null);
    const refCompressedDownload=useRef(null);
    let textFileJSON = null;
    let textFileCompressed = null;

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
        const textArr = [];
        texts.forEach(text => textArr.push(text.text));
        console.log(textArr);
        axios.post(path, {str: textArr}).then(
            (response) => {
                var result = response.data;
                setRawNodes(result.result.nodes);
                setRawEdges(result.result.edges);
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
                setRawNodes(result.result.nodes);
                setRawEdges(result.result.edges);
                formGraph(result.result.nodes, result.result.edges);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const handleFileInput = (e) => {
        const files = e.target.files;
        console.log(files);
        let fileContents = [];
        for (let i = 0; i < files.length; i++){
            let reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result.replace(/[\r\n]/gm, '');
                fileContents.push(fileContent)
            }
            reader.onerror = (e) => alert(e.target.error.name);
            reader.readAsText(files[i]);
        }
        console.log(fileContents);
        setFileContent(fileContents);
    }

    const createWheelerGraphFile = () => {   
        const makeTextFile = () => {
            console.log(rawNodes);
            console.log(rawEdges);
            var data = new Blob([JSON.stringify({nodes: rawNodes.map(node => ({id: node.id, order: node.order})), edges: rawEdges.map(edge => ({id: uuidv4(), source: edge.source, target: edge.target, label: edge.label, strings: edge.strings}))})], {type: 'text/json'});
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

    const createWheelerGraphCompressedFile = () => {
        const path = 'http://127.0.0.1:5000/compressed';
        setLoading(true);
        console.log('making request');
        axios.post(path, {str: fileContent}).then(
            (response) => {
                function makeTextFile (oil) {
                    var data = new Blob([JSON.stringify(oil)], {type: 'text/json'});
                    if (textFileCompressed !== null) {
                        window.URL.revokeObjectURL(textFile);
                    }
                    textFileCompressed = window.URL.createObjectURL(data);
                    return textFileCompressed;
                }   
                var result = response.data;
                const oil = {O: result.O, I: result.I, L: result.L, C: result.C}
                var link = refCompressedDownload.current;
                link.href = makeTextFile(oil);
                link.style.display = 'block';
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const addTextField = () => {
        const textbox = {
          id: uuidv4(),
          text: "",
        };
        setTexts((texts) => [...texts, textbox]);
    };

    const handleEdit = (id, newText) => {
        //we need to edit the text section of the texts array for the box we are edititng now.
        setTexts((texts) =>
        texts.map((text) => {
          if (text.id !== id) {
            return text;
          } else {
            return { 'id': id, 'text': newText };
          }
        })
      );
    }

    const handleRemove = (id) => {
        //we need to remove the text box we clicked 'delete' on from the texts array.
        setTexts((texts) => texts.filter(text => text.id !== id));
    }

    return (
        <Container>
            <Box py={3}>
                <Typography variant="h4">Visualize Your Text as a Wheeler Graph</Typography>
            </Box>
            <Stack spacing={4}>
                <Typography variant="p">Input your own strings or choose .txt files containing strings of text to index</Typography>
                <Grid container direction='row'>
                    <Grid item xs={3}>
                        {texts.map(textbox => (
                            <TextBox editTextBox={handleEdit} removeTextBox={handleRemove} id={textbox.id} value={textbox.text}/>
                        ))}
                    </Grid>
                    <Grid item xs={1}>
                        <Button onClick={addTextField} variant='contained'>+</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleOnTextSubmit} variant='outlined'>Generate Graph From Texts</Button>
                    </Grid>
                </Grid>
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <input type="file" accept='.txt' multiple onChange={handleFileInput} />
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleOnFileSubmit} variant='outlined'>Generate Graph From Files</Button>
                    </Grid>
                </Grid>
            </Stack>
            <br></br>
            <Box py={2} sx={{ border: 3}} mb={3}>
                <div style={{width:'auto', height:window.innerHeight/1.5}}>
                    {nodes.length < 200 ? <Graph nodes={nodes} edges={edges}/> : <Graph ndoes={[]} edges={[]} /> }
                </div>
            </Box>
            <Stack spacing={.125} mb={3}>
                <Grid container direction = "row" mb={4}>
                    <Grid item xs={4}>
                        <Button onClick={createWheelerGraphFile} variant='outlined'>Create Wheeler Graph JSON</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <a download="wheelergraphJSON.txt" ref={refJSONDownload} style={{'display':'none'}}>Download JSON Object</a>
                    </Grid>
                </Grid>
                <Grid container direction = "row" mb={4}>
                    <Grid item xs={4}>
                        <Button onClick={createWheelerGraphCompressedFile} variant='outlined'>Create Compressed Index (files only)</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <a download="wheelergraphCompressed.txt" ref={refCompressedDownload} style={{'display':'none'}}>Download Compressed Index</a>
                    </Grid>
                    <Grid item xs={4}>
                        {loading ? <div><b>Please Wait, this takes a while for large texts...</b></div> : <></>}
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );

} export default Visualize;