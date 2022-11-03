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
    const [texts, setTexts] = useState([{id: uuidv4(),text: ""}]);
    const [fileContent, setFileContent] = useState([]);
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
        const textArr = [];
        texts.forEach(text => textArr.push(text.text));
        console.log(textArr);
        axios.post(path, {str: textArr}).then(
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
        const files = e.target.files;
        console.log(files);
        let fileContents = [];
        for (let i = 0; i < files.length; i++){
            let reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
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
            var data = new Blob([JSON.stringify({nodes: nodes.map(node => ({id: node.id, order: node.data.label})), edges: edges.map(edge => ({id: edge.id, source: edge.source, target: edge.target, label: edge.label}))})], {type: 'text/json'});
    
            if (textFile !== null) {
              window.URL.revokeObjectURL(textFile);
            }
        
            textFile = window.URL.createObjectURL(data);
        
            return textFile;
          };
    
        var link = ref.current;
        link.href = makeTextFile();
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
        setTexts((texts) => texts.filter((text) => text.id !== id));
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
                            <TextBox editTextBox={handleEdit} removeTextBox={handleRemove} id={textbox.id}/>
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
                    <Graph nodes={nodes} edges={edges}/>
                </div>
            </Box>
            <Grid container direction = "row" mb={4}>
                <Grid item xs={4}>
                    <Button onClick={createWheelerGraphFile} variant='outlined'>Create Wheeler Graph JSON</Button>
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