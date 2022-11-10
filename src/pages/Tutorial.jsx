import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MathJax from "react-mathjax";
import Graph from "../components/Graph";
import InteractiveGraph from "../components/InteractiveGraph";
import { MarkerType } from 'reactflow';

const nodes2 = [
    { id: 'node1', style: { width: 30, height: 30, fontsize: 10 }, position: { x: 100, y: 50 } },
    { id: 'node2', style: { width: 30, height: 30, fontsize: 10 }, position: { x: 175, y: 50 } },
    { id: 'node3', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '30' }, position: { x: 100, y: 200 } },
    { id: 'node4', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '40' }, position: { x: 175, y: 200 } },
    { id: 'node5', style: { width: 30, height: 30, fontsize: 10 }, position: { x: 350, y: 50 } },
    { id: 'node6', style: { width: 30, height: 30, fontsize: 10 }, position: { x: 425, y: 50 } },
    { id: 'node7', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '10' }, position: { x: 350, y: 200 } },
]

const edges2 = [
    { id: 'edge1', animated: true, source: 'node1', target: 'node3', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge2', animated: true, source: 'node2', target: 'node4', label: 'B', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge3', animated: true, source: 'node5', target: 'node7', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#FF0000', }, style: { strokeWidth: 2, stroke: '#FF0000', } },
    { id: 'edge4', animated: true, source: 'node6', target: 'node7', label: 'B', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#FF0000', }, style: { strokeWidth: 2, stroke: '#FF0000', } },
]

const nodes3 = [
    { id: 'node1', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '10' }, position: { x: 100, y: 50 } },
    { id: 'node2', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '30' }, position: { x: 175, y: 50 } },
    { id: 'node3', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '20' }, position: { x: 100, y: 200 } },
    { id: 'node4', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '40' }, position: { x: 175, y: 200 } },
    { id: 'node5', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '10' }, position: { x: 350, y: 50 } },
    { id: 'node6', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '30' }, position: { x: 425, y: 50 } },
    { id: 'node7', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '40' }, position: { x: 350, y: 200 } },
]

const edges3 = [
    { id: 'edge1', animated: true, source: 'node1', target: 'node3', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge2', animated: true, source: 'node2', target: 'node4', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge3', animated: true, source: 'node5', target: 'node7', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge4', animated: true, source: 'node6', target: 'node7', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
]

const nodesProp = [
    { id: 'node1', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '1' }, position: { x: 100, y: 50 } },
    { id: 'node2', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '2' }, position: { x: 175, y: 50 } },
    { id: 'node3', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '3' }, position: { x: 100, y: 200 } },
    { id: 'node4', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '4' }, position: { x: 175, y: 200 } },
    { id: 'node5', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '5' }, position: { x: 350, y: 50 } },
    { id: 'node6', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '6' }, position: { x: 425, y: 50 } },
    { id: 'node7', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '7' }, position: { x: 350, y: 200 } },
]

const edgesProp = [
    { id: 'edge1', animated: true, source: 'node1', target: 'node3', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge2', animated: true, source: 'node2', target: 'node4', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge3', animated: true, source: 'node5', target: 'node7', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge4', animated: true, source: 'node6', target: 'node7', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
]

function Tutorial() {
    return (
        <Container>
            <MathJax.Provider>
                <Box pt={3}>
                    <Typography variant="h4" sx={{ fontWeight: 'medium' }}> Why Wheeler? </Typography>
                    <Typography variant="body1" ml={4}>
                        The Burrows-Wheeler Transform is an algorithm that compresses a string. Due to properties like reversibility, it is very useful for many applications.
                        It originally only compresses a single string, but there now there are variations for other data structures like sets of strings and de Bruijn graphs. 
                        The Wheeler graph is a framework that includes these variations. 
                    </Typography>
                </Box>
                <Box pt={3}>
                    <Typography variant="h4" sx={{ fontWeight: 'medium' }}> Wheeler Graph Definition </Typography>
                </Box>
                <Box>
                    <Typography variant="body1"> A <b>Wheeler Graph</b> is a directed edge-labeled graph, where each label is from a totally-ordered alphabet and the following are true. </Typography>
                    <Typography variant="body1"> The nodes can be ordered such that, </Typography>
                    <ol>
                        <li>Nodes with in-degree 0 come before nodes with positive in-degree</li>
                        <Typography variant="body1" ml={4}> Nodes without an arrow pointing towards them must come first </Typography>
                    </ol>
                    <Typography variant="body1">
                        And for all pairs of edges
                        <MathJax.Node inline formula={`\\: e = (u,v), e' = (u', v')\\:`} />
                        (labeled a and a' respectively),
                    </Typography>
                    <ol start="2">
                        <li>
                            <MathJax.Node inline formula={`a \\prec ^3 a' \\Longrightarrow v < v'`} />
                            <Typography variant="body1" ml={4}>If an edge labeled a is alphabetically less than an edge labeled a', then that the lesser edge's destination should be less than the greater edge's destination. </Typography>
                            <Typography variant="body1" ml={6}>This also creates the corollary that all edges entering the same node have the same label since a node cannot have two incoming edges with different labels </Typography>
                        </li>
                        <div style={{ width: 500, height: 300 }}>
                            <Graph nodes={nodes2} edges={edges2} fitView={true} />
                        </div>
                        <li>
                            <MathJax.Node inline formula={`(a = a') \\land (u < u') \\Longrightarrow v \\leq v'`} />
                            <Typography variant="body1" ml={4}>If an edge labeled a is alphabetically equal to an edge labeled a' and the source of a is less than the source of a', then the destination of a must be less than or equal to the destination of a'. </Typography>
                        </li>
                        <div style={{ width: 500, height: 300 }}>
                            <Graph nodes={nodes3} edges={edges3} fitView={true} />
                        </div>
                    </ol>
                </Box>
                <Box pt={3}>
                    <Typography variant="h4" sx={{ fontWeight: 'medium' }}> Wheeler Property </Typography>
                    <Typography variant="body1">
                        Wheeler graphs have a property called <b>path coherence.</b>
                    </Typography>
                    <Typography variant="body1" ml={4} py={2}>
                        "G is path coherent if there is a total order of the nodes such that for any consecutive range [<i>i, j</i>] of nodes and string α, the nodes reachable from those in [<i>i, j</i>] in |α| steps by following edges whose labels for α when concatenated, themselves form a consecutive range" (Gagie 2017)
                    </Typography>
                    <Typography variant="body1">
                        This means that when matching a string, you can start from the shortest suffix and all edges that match that character 
                        reach nodes with consecutive labels. Then, going from those nodes along the edge with the next character, you will reach 
                        nodes that are also consecutive. 
                        <br></br><br></br>
                        Because of this property, the Wheeler graph can be stored compactly and process strings quickly
                    </Typography>
                </Box>
                <Box pt={3}>
                    <Typography variant="h4" sx={{ fontWeight: 'medium' }}> Try for Yourself! </Typography>
                    <Typography variant="body1" ml={4}>
                        1. Create a new node by dragging an edge from any existing node <br></br>
                        2. Change the label of an edge by clicking on it <br></br>
                        3. Remove a node and its neighboring edges by clicking on it <br></br>
                        4. Remove an edge by clicking it when it is already labeled 'd' <br></br>
                    </Typography>
                </Box>
                <Box py={2} sx={{ border: 3 }} mb={3}>
                    <div style={{ width: 'auto', height: window.innerHeight / 1.5 }}>
                        <InteractiveGraph />
                    </div>
                </Box>
            </MathJax.Provider>
        </Container>
    )
} export default Tutorial;