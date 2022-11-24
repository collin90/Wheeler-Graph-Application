import Graph from "../components/Graph";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom'
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Background,
    MarkerType,
} from 'reactflow';

function Home() {
    // nodes is a list of node objects of the form: { id: 'string', style: {width: int, fontSize: int}, (data) {label: 'string'}, (position) {x: number, y: number} }
    // edges is a list of edge objects of the form: { id: 'string', source: 'node-id string', target: 'node-id string'} 
    const nodes = [
        { id: 'node1', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '1' }, position: { x: 50, y: 0 } },
        { id: 'node2', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '2' }, position: { x: 150, y: 50 } },
        { id: 'node3', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '3' }, position: { x: 250, y: 100 } },
        { id: 'node4', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '4' }, position: { x: 350, y: 150 } },
        { id: 'node5', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '5' }, position: { x: 450, y: 200 } },
        { id: 'node6', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '6' }, position: { x: 550, y: 250 } },
        { id: 'node7', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '7' }, position: { x: 650, y: 300 } },
        { id: 'node8', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '8' }, position: { x: 750, y: 350 } }
    ]
    ''
    const edges = [
        { id: 'edge1', animated: true, source: 'node1', target: 'node2', label: 'a', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#ADD8E6', }, style: { strokeWidth: 1, stroke: '#ADD8E6', } },
        { id: 'edge2', animated: true, source: 'node1', target: 'node3', label: 'a', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#ADD8E6', }, style: { strokeWidth: 1, stroke: '#ADD8E6', } },
        { id: 'edge3', animated: true, source: 'node2', target: 'node3', label: 'a', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#ADD8E6', }, style: { strokeWidth: 1, stroke: '#ADD8E6', } },
        { id: 'edge4', animated: true, source: 'node1', target: 'node5', label: 'b', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#90EE90', }, style: { strokeWidth: 1, stroke: '#90EE90', } },
        { id: 'edge5', animated: true, source: 'node2', target: 'node7', label: 'c', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#FFCCCB', }, style: { strokeWidth: 1, stroke: '#FFCCCB', } },
        { id: 'edge6', animated: true, source: 'node3', target: 'node5', label: 'b', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#90EE90', }, style: { strokeWidth: 1, stroke: '#90EE90', } },
        { id: 'edge7', animated: true, source: 'node5', target: 'node4', label: 'a', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#ADD8E6', }, style: { strokeWidth: 1, stroke: '#ADD8E6', } },
        { id: 'edge8', animated: true, source: 'node5', target: 'node7', label: 'c', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#FFCCCB', }, style: { strokeWidth: 1, stroke: '#FFCCCB', } },
        { id: 'edge10', animated: true, source: 'node6', target: 'node8', label: 'c', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#FFCCCB', }, style: { strokeWidth: 1, stroke: '#FFCCCB', } },
        { id: 'edge11', animated: true, source: 'node7', target: 'node6', label: 'b', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#90EE90', }, style: { strokeWidth: 1, stroke: '#90EE90', } },
        { id: 'edge12', animated: true, source: 'node7', target: 'node8', label: 'c', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#FFCCCB', }, style: { strokeWidth: 1, stroke: '#FFCCCB', } },
        { id: 'edge13', animated: true, source: 'node8', target: 'node4', label: 'a', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#ADD8E6', }, style: { strokeWidth: 1, stroke: '#ADD8E6', } }
    ]

    return (
        <Container>
            <Box py={3}>
                <Typography variant="h4" sx={{ fontWeight: 'medium' }}> Welcome! </Typography>
                <Typography variant="body1">
                    This site will introduce you to Wheeler graphs. Here is an example of a Wheeler graph.
                </Typography>
            </Box>
            <Box py={2} sx={{ border: 3 }} mb={3} style={{ width: 850, height: 450 }}>
                <div style={{ width: 850, height: 450 }} >
                    <Graph nodes={nodes} edges={edges} />
                </div>
            </Box>
            <Box pt={3}>
                <Typography variant="h4" sx={{ fontWeight: 'medium' }}> Navigation </Typography>
                <Typography variant="body1">
                    1. <Link to={"/tutorial"}>Tutorial</Link>: Learn all about Wheeler graphs and why they are important, and create some of your own! <br></br>
                    2. <Link to={"/visualize"}>Visualize</Link>: Visualize a Wheeler graph by inputting strings or text files <br></br>
                    3. <Link to={"/patternmatching"}>Pattern Matching</Link>: Match a string against a constructed graph <br></br>
                    4. <Link to={"/wheelerproperty"}>Find Ordering</Link>: Put in an unordered graph and try to find an ordering that satisfies the wheeler property if possible <br></br>
                </Typography>
            </Box>
            <Box pt={3} py={10}>
                <Typography variant="h4" sx={{ fontWeight: 'medium' }}> References </Typography>
                <Typography variant="body1">
                    Created by Joanna Bi, Collin Hughes, Julia Ross, and Brandon Stride as part of the Fall 2022 Computational Genomics: Sequences course by Benjamin Langmead, Johns Hopkins University.
                </Typography>
                <Typography variant="body1" pt={3}>
                    <p class="apa-reference">
                        Gagie, T., Manzini, G., &amp; Sirén, J. (2017). Wheeler graphs: A framework for BWT-based data structures. Theoretical Computer Science, 698, 67–78. https://doi.org/10.1016/j.tcs.2017.06.016
                    </p>
                    <p class="apa-reference">
                        Gibney, D., &amp; Thankachan, S. V. (2022). On the complexity of recognizing Wheeler graphs. Algorithmica, 84, 784–814. https://doi.org/10.1007/s00453-021-00917-5                     </p>
                    <p class="apa-reference">
                        Langmead, B. (2020). Wheeler graphs, part 1 [PDF]. Langmead Lab @ JHU. https://www.cs.jhu.edu/~langmea/resources/lecture_notes/255_wheeler_graph1_pub.pdf
                    </p>
                    <p class="apa-reference">
                        Langmead, B. (2020). Wheeler graphs, part 2 [PDF]. Langmead Lab @ JHU. https://www.cs.jhu.edu/~langmea/resources/lecture_notes/255_wheeler_graph1_pub.pdf
                    </p>
                </Typography>
            </Box>
        </Container >


    )


} export default Home;