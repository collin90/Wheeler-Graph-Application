import axios from "axios";
import {useState} from "react";
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
import { useEffect } from "react";

function PatternMatch () {
    
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [fileContent, setFileContent] = useState([]);
    const [P, setP] = useState({id: uuidv4(), text: ""});
    const [PSubstring, setPSubstring] = useState("");
    const [matchMessage, setMatchMessage] = useState("");
    const URL = `http://127.0.0.1:5000/`;

    //function that forms the initial graph after you submit an oilc file. 
    const formInitialGraph = (nodes, edges) => {

        //create the colors list
        let colors = {};
        edges.forEach(edge => {
            if (!(edge.label in colors)) colors[edge.label] = '#' + Math.floor(Math.random()*16777215).toString(16);
        })
        let nodeIndex = 0;
        let column = 0;
        let row = 0;
        const numRows = Math.ceil(Math.sqrt(nodes.length/2));
        const getPosition = () => {
            let xPos = Math.ceil(15 + 60*column);
            let yPos = Math.ceil(15 + 75*row);
            nodeIndex ++;
            row = (row + 1) % numRows;
            if(nodeIndex % numRows == 0) column++;

            return {x: xPos, y: yPos}
        }
        const formattedNodes = nodes.map(node => (
            {id: node.id.toString(), style: {width: 30, height: 30, fontsize: 10, background:'white'}, data: {label: node.id.toString()}, position: getPosition()}
            ));
        const formattedEdges = edges.map(edge => (
            {id: uuidv4(), animated:true, source:edge.source.toString(), target:edge.target.toString(), label:edge.label, markerEnd: {type: MarkerType.ArrowClosed,width: 6,height: 6,color: colors[edge.label],},style: {strokeWidth: 1.2,stroke: colors[edge.label],}}
        ));
        setNodes(formattedNodes);
        setEdges(formattedEdges);
    }

    const handleOnFileSubmit = () => {
        const path = URL + 'getGraphFromOILC';
        let oilc = JSON.parse(fileContent);
        axios.post(path, {oilc: oilc}).then(
            (response) => {
                var result = response.data;
                formInitialGraph(result.nodes, result.edges);
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
            const fileContent = e.target.result.replace(/[\r\n]/gm, '');
            setFileContent(fileContent);
        }
        reader.onerror = (e) => alert(e.target.error.name);
        reader.readAsText(file);
    }

    const handleEditP = (id, newText) => {
        setP({id: P.id, text: newText});
    }

    const handleRemoveP = () => {
        setP({id: P.id, text: ""});
    }

    const checkForFullMatch = (nodes) => {
        let highlightedNodes = nodes.filter(node => {return node.style.background === '#90EE90'});
        let numHighlighted = highlightedNodes.length;
        if (numHighlighted === 0 && PSubstring.length) setMatchMessage("P is not found in this Wheeler Graph.");
        else if (PSubstring.length === P.text.length && numHighlighted) {
            //need to do a dfs of the graph to find out how many times P was found. :)
            let count = 0;
            const dfs = (nodeId) => {
                let outgoing_edges = edges.filter(edge => {return edge.source === nodeId});
                if (outgoing_edges.length === 0) count += 1;
                outgoing_edges.forEach(edge => {dfs(edge.target)});
            }
            highlightedNodes.forEach(node => {dfs(node.id)});
            const s = count > 1 ? 's' : '';
            setMatchMessage(`P was found ${count} time${s}!`);
        }
        else setMatchMessage("");
    }

    useEffect(() => {
        //We've just stepped to the next letter. What is that letter?
        const currentChar = PSubstring.charAt(PSubstring.length-1);
        //now, all green nodes pointing to nodes by using current char need to be turned green.
        let good_nodes = [];
        edges.forEach(edge => {
            //need to find out if the target node is green (or we're at step 1)
            let source = nodes.find(o => o.id === edge.source);
            if(edge.label === currentChar && (source.style.background === '#90EE90' || PSubstring.length === 1)){
                good_nodes.push(edge.target);
            }
        });
        let highlightedNodes = nodes.map(node => {
            if(good_nodes.includes(node.id)){
                return {id: node.id, style: {width: 30, height: 30, fontsize: 10, background:'#90EE90'}, data: {label: node.id}, position: node.position}
            }
            else return {id: node.id, style: {width: 30, height: 30, fontsize: 10, background:'white'}, data: {label: node.id}, position: node.position}
        });
        setNodes(highlightedNodes);
        checkForFullMatch(highlightedNodes);
    }, [PSubstring]);



    const handleStep = () => {
        const p_sub = PSubstring.length < P.text.length ? P.text.substring(0,PSubstring.length+1) : P.text
        if(nodes.length < 200) setPSubstring(p_sub);
    }

    const handleRestart = () => {
        if (nodes.length < 200) setPSubstring("");
    }



    return (
        <Container>
            <Box py={3}>
                <Typography variant="h4">Visualize The Pattern Matching Process Using Wheeler Graphs</Typography>
            </Box>
            <Stack spacing={4}>
                <Typography variant="p">To get started, input the OILC file for a wheeler graph, and a string P you'd like to match</Typography>
                <Grid container direction="row">
                    <Grid item xs={4}>
                        <input type="file" accept='.txt' onChange={handleFileInput} />
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleOnFileSubmit} variant='outlined'>Generate Graph From OILC</Button>
                    </Grid>
                </Grid>
                <Grid container direction='row'>
                    <Grid item xs={3}>
                        <TextBox editTextBox={handleEditP} removeTextBox={handleRemoveP} id={P.id} value={P.text}/>
                    </Grid>
                </Grid>
            </Stack>
            <br></br>
            <Typography variant="p">After you've input your OILC file and chosen a string P, you can trace the <b>Pattern Matching Process</b> letter by letter by clicking 
            the <b>STEP</b> button below the graph. The step function is meant for small graphs with under 200 nodes. You can also skip to the end of the pattern matching process 
            by clicking <b>MATCH</b>.</Typography>
            <br></br>
            <Box py={2} sx={{ border: 3}} mt={3} mb={3}>
                <div style={{width:'auto', height:window.innerHeight/1.75}}>
                    {nodes.length < 200 ? <Graph nodes={nodes} edges={edges}/> : <Graph nodes={[]} edges={[]} /> }
                </div>
            </Box>
            <Stack spacing={.125} mb={1}>
                <Grid container direction = "row" mb={4}>
                    <Grid item xs={4}>
                        <Button onClick={handleStep} variant='outlined'><b>STEP</b></Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant='outlined'><b>MATCH</b></Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleRestart} variant='outlined'><b>RESTART</b></Button>
                    </Grid>
                </Grid>
            </Stack>
            <Typography variant="h4">Results:</Typography>
            <Box py={2} sx={{border: 1}}mb={3}>
                <Typography variant="h5" mb={0}>{PSubstring}</Typography>
                <Typography variant="h5" mb={1}>{matchMessage}</Typography>
            </Box>
        </Container>
    );

} export default PatternMatch;