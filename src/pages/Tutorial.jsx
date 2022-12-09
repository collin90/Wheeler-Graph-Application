import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MathJax from "react-mathjax";
import Graph from "../components/Graph";
import InteractiveGraph from "../components/InteractiveGraph";
import InteractiveGraphWithOILC from "../components/InteractiveGraphWithOILC";
import { useState } from 'react';
import { MarkerType } from 'reactflow';

const nodes2 = [
    { id: 'node1', style: { width: 30, height: 30, fontsize: 10 }, position: { x: 100, y: 50 } },
    { id: 'node2', style: { width: 30, height: 30, fontsize: 10 }, position: { x: 175, y: 50 } },
    { id: 'node3', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '30' }, position: { x: 100, y: 200 } },
    { id: 'node4', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '40' }, position: { x: 175, y: 200 } },
    { id: 'node5', style: { width: 30, height: 30, fontsize: 10 }, position: { x: 300, y: 50 } },
    { id: 'node6', style: { width: 30, height: 30, fontsize: 10 }, position: { x: 375, y: 50 } },
    { id: 'node7', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '10' }, position: { x: 300, y: 200 } },
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
    { id: 'node5', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '10' }, position: { x: 300, y: 50 } },
    { id: 'node6', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '30' }, position: { x: 375, y: 50 } },
    { id: 'node7', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '40' }, position: { x: 300, y: 200 } },
    { id: 'node8', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '10' }, position: { x: 500, y: 50 } },
    { id: 'node9', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '30' }, position: { x: 575, y: 50 } },
    { id: 'node10', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '40' }, position: { x: 500, y: 200 } },
    { id: 'node11', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '20' }, position: { x: 575, y: 200 } },

]

const edges3 = [
    { id: 'edge1', animated: true, source: 'node1', target: 'node3', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge2', animated: true, source: 'node2', target: 'node4', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge3', animated: true, source: 'node5', target: 'node7', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge4', animated: true, source: 'node6', target: 'node7', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#00FF00', }, style: { strokeWidth: 2, stroke: '#00FF00', } },
    { id: 'edge5', animated: true, source: 'node8', target: 'node10', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#FF0000', }, style: { strokeWidth: 2, stroke: '#FF0000', } },
    { id: 'edge6', animated: true, source: 'node9', target: 'node11', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#FF0000', }, style: { strokeWidth: 2, stroke: '#FF0000', } },
]

const nodes4 = [
    { id: 'node1', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '0' }, position: { x: 50, y: 150 } },
    { id: 'node2', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '1' }, position: { x: 450, y: 75 } },
    { id: 'node3', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '2' }, position: { x: 150, y: 150 } },
    { id: 'node4', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '3' }, position: { x: 350, y: 75 } },
    { id: 'node5', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '4' }, position: { x: 350, y: 225 } },
    { id: 'node6', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '5' }, position: { x: 250, y: 150 } },
    { id: 'node7', style: { width: 30, height: 30, fontsize: 10 }, data: { label: '6' }, position: { x: 450, y: 225 } },

]

const edges4 = [
    { id: 'edge1', animated: true, source: 'node1', target: 'node3', label: 'T', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#7393B3', }, style: { strokeWidth: 2, stroke: '#7393B3', } },
    { id: 'edge2', animated: true, source: 'node3', target: 'node6', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#7393B3', }, style: { strokeWidth: 2, stroke: '#7393B3', } },
    { id: 'edge3', animated: true, source: 'node6', target: 'node4', label: 'C', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#7393B3', }, style: { strokeWidth: 2, stroke: '#7393B3', } },
    { id: 'edge4', animated: true, source: 'node6', target: 'node5', label: 'G', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#7393B3', }, style: { strokeWidth: 2, stroke: '#7393B3', } },
    { id: 'edge5', animated: true, source: 'node4', target: 'node2', label: 'A', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#7393B3', }, style: { strokeWidth: 2, stroke: '#7393B3', } },
    { id: 'edge6', animated: true, source: 'node5', target: 'node7', label: 'G', markerEnd: { type: MarkerType.ArrowClosed, width: 8, height: 8, color: '#7393B3', }, style: { strokeWidth: 2, stroke: '#7393B3', } },
]

function Tutorial() {

    const [popUp, setpopUp] = useState(false);
    const handleMouseOver = () => {
        setpopUp(true);
    };
    const handleMouseOut = () => {
        setpopUp(false);
    }

    const [popUp2, setpopUp2] = useState(false);
    const handleMouseOver2 = () => {
        setpopUp2(true);
    };
    const handleMouseOut2 = () => {
        setpopUp2(false);
    }

    return (

        <Container>

            <MathJax.Provider>
                <Box pt={3}>
                    <Typography variant="h4" sx={{ fontWeight: 'medium' }}> Why Wheeler? </Typography>
                    <Typography variant="body1" ml={4}>
                        The <a href="https://en.wikipedia.org/wiki/Burrows%E2%80%93Wheeler_transform"> Burrows Wheeler Transform </a> is an algorithm that compresses a string. Due to properties like reversibility, it is very useful for many applications.
                        It originally only compresses a single string, but there now there are variations for other data structures like sets of strings and <a href="https://en.wikipedia.org/wiki/De_Bruijn_graph">de Bruijn graphs</a>.
                        The Wheeler graph is a framework that includes these variations.
                    </Typography>
                </Box>
                <Box pt={3}>
                    <Typography variant="h4" sx={{ fontWeight: 'medium' }}> Wheeler Graph Definition </Typography>
                </Box>

                <Box>
                    <Typography variant="body1" display="inline"> A <b>Wheeler Graph</b> is a </Typography>
                    <Typography variant="body1" className="has-popup" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> directed edge-labeled graph</Typography>
                    {popUp && <p className="popup"> A directed edge-labeled graph is a graph where the edges (lines) are labeled and have directions represented by arrows going between the nodes (vertices). </p>}
                    <Typography variant="body1" display="inline">, where each label is from a totally-ordered alphabet and the following are true. </Typography>
                    <Typography variant="body1"> The nodes can be ordered such that, </Typography>
                    <ol>
                        <li> Nodes with
                            <div className="has-popup" onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2}> in-degree </div>
                            {popUp2 && <p className="popup"> A node's in-degree is how many edges are directed towards it. Likewise, the out-degree is how many edges are coming out of it.  </p>}
                            0 come before nodes with positive in-degree </li>
                        <Typography variant="body1" ml={4}> Nodes without an arrow pointing towards them must come first </Typography>
                    </ol>
                    <Typography variant="body1">
                        And for all pairs of edges
                        <MathJax.Node inline formula={`\\: e = (u,v), e' = (u', v')\\:`} />
                        (labeled a and a' respectively),
                    </Typography>
                    <ol start="2">
                        <li>
                            <MathJax.Node inline formula={`a \\prec a' \\Longrightarrow v < v'`} />
                            <Typography variant="body1" ml={4}>If an edge labeled a is lexigraphically less than an edge labeled a', then that the lesser edge's destination should be less than the greater edge's destination. </Typography>
                            <Typography variant="body1" ml={6}>This also creates the corollary that all edges entering the same node have the same label since a node cannot have two incoming edges with different labels </Typography>
                        </li>
                        <Typography variant="body1" ml={6}>
                            <br></br> A &lt; B and 30 &lt; 40 =&gt; property holds
                            <br></br> A &lt; B and 10 &#x226E; 10 =&gt; property does not hold
                        </Typography>
                        <div style={{ width: 450, height: 300 }}>
                            <Graph nodes={nodes2} edges={edges2} />
                        </div>
                        <li>
                            <MathJax.Node inline formula={`(a = a') \\land (u < u') \\Longrightarrow v \\leq v'`} />
                            <Typography variant="body1" ml={4}>If an edge labeled a is lexigraphically equal to an edge labeled a' and the source of a is less than the source of a', then the destination of a must be less than or equal to the destination of a'. </Typography>
                        </li>
                        <Typography variant="body1" ml={6}>
                            <br></br> A = A, 10 &lt; 30, and 20 &#8804; 40 =&gt; property holds
                            <br></br> A = A, 10 &lt; 30, and 40 &#8804; 40 =&gt; property holds
                            <br></br> A = A, 10 &lt; 30, and 40 &#8816; 20 =&gt; property does not hold
                        </Typography>
                        <div style={{ width: 650, height: 300 }}>
                            <Graph nodes={nodes3} edges={edges3} />
                        </div>
                    </ol>
                </Box>
                <Box pt={3}>
                    <Typography variant="h4" sx={{ fontWeight: 'medium' }}> Try for Yourself! </Typography>
                    <Typography variant="body1" ml={4}>
                        1. Create a new node by dragging an edge from any existing node or clicking Add Node <br></br>
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
                <Box pt={10}>
                    <Typography variant="h4" sx={{ fontWeight: 'medium' }}> Wheeler Graph Motivation </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'medium' }}> Path Coherence </Typography>
                    <Typography variant="body1">
                        Wheeler graphs have a property called <b>path coherence.</b> This property is useful for reasons
                        we will explore below, and is thus a major motivation to use Wheeler Graphs.
                    </Typography>
                    <Typography variant="body1" ml={4} py={2}>
                        "G is path coherent if there is a total order of the nodes such that for any consecutive range [<i>i, j</i>] of nodes and string α,
                        the nodes reachable from those in [<i>i, j</i>] in |α| steps by following edges whose labels for α when concatenated,
                        themselves form a consecutive range" (Gagie 2017)
                    </Typography>
                    <Typography variant="body1">
                        This means that when matching a string, you can start from the shortest suffix and all edges that match that character
                        reach nodes with consecutive labels. Then, going from those nodes along the edge with the next character, you will reach
                        nodes that are also consecutive.
                        <br></br><br></br>

                    </Typography>
                </Box>
                <Box pt={3} ml={4}>
                    <Typography variant="h5" sx={{ fontWeight: 'medium' }}> Storage </Typography>
                    <Typography variant="body1">
                        Because of the path property, the Wheeler graph can be stored compactly and process strings quickly. We can be specific about the compression:
                        <br></br>
                        <br></br>
                        Given a graph G = (V,E), where V = set of vertices and E = set of edges,
                        and σ is the size of the alphabet.
                        <br></br>
                        |V| = n, |E| = e. Then, the graph may be
                        stored in 2(e + n) + e log σ + σ log e + o(n + e log σ) bits.
                        Path coherence is a valuable property, particularly because it allows us to
                        store the graph using bitvectors. To understand how to store a Wheeler graph in bitvectors,
                        we first need to understand unary encodings, in-degree bitvectors, out-degree bitvectors, and edge vectors.
                    </Typography>
                    <Typography variant="body1">
                        <br></br>
                        <b>Unary Encoding</b>
                        <br></br>
                        One way to store a Wheeler Graph is by using unary encodings
                        to storing the in- and out-degree nodes in bitvectors. We may also wish to store
                        the edge labels.
                        To encode a given number, n, in Unary, we simple write n 0s, followed by a
                        singular 1.
                        For example,
                        0 is encoded with 1
                        7 is encoded with 00000001
                        See <a href="https://en.wikipedia.org/wiki/Unary_coding"> here</a> for more information on unary encoding.
                    </Typography>
                    <Box py={3}>
                        <div style={{ width: 500, height: 300 }}>
                            <Graph nodes={nodes4} edges={edges4} />
                        </div>
                    </Box>
                    <Typography variant="body1" py={3}>
                        <b>In-degree Bitvector</b>
                        <br></br>
                        From left to right, we create a unary encoding for the number of in-degree nodes for the 0th to nth node in a Wheeler Graph with n nodes. Below, the variable name of this bitvector is I.
                    </Typography>
                    <Typography variant="h5" align="center">
                        <div style={{ padding: 0 }}>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "Verdana" }}>
                                        <li>I:</li>
                                        <li style={{ color: "white" }}>N/A  </li>
                                        <li >Node:  </li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>1</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>0</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>1</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>2</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>3</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>4</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>5</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>6</li>
                                    </ul></li>
                            </ul>
                        </div>
                    </Typography>
                    <Typography variant="body1" py={3}>
                        <b>Out-degree Bitvector</b>
                        <br></br>
                        From left to right, we create a unary encoding for the number of out-degree nodes for the 0th to nth node in a Wheeler Graph with n nodes. Below, the variable name of this bitvector is O.
                    </Typography>
                    <Typography variant="h5" align="center">
                        <div style={{ padding: 0 }}>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "Verdana" }}>
                                        <li>O:</li>
                                        <li style={{ color: "white" }}>N/A  </li>
                                        <li >Node:  </li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>0</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>1</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>1</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>2</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>3</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>4</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>001</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>5</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>1</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>6</li>
                                    </ul></li>
                            </ul>
                        </div>
                    </Typography>

                    <Typography variant="body1" py={3}>
                        <b>Edge Vector</b>
                        <br></br>
                        Observe that the number of 0s in the in or out-degree bitvector is the same as the number of edges.
                        Observe that the number of 1s in the in- or out- degree bitvector is the same as the number of nodes.
                        We map the 0s to edges from the out-degree bitvector.
                        We can see that this makes sense, because each edge can only be outgoing from one node.
                        It is important to be consistent with the ordering of edges that coordinate with the same node.
                        Below, the variable name of this vector is L.
                    </Typography>
                    <Typography variant="h5" align="center">
                        <div style={{ padding: 0 }}>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: "Verdana" }}>
                                        <li>L:</li>
                                        <li style={{ color: "white" }}>N/A  </li>
                                        <li>O:</li>
                                        <li style={{ color: "white" }}>N/A  </li>
                                        <li >Node:  </li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>T</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>0</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li style={{ color: "white" }}>N/A  </li>
                                        <li style={{ color: "white" }}>N/A  </li>
                                        <li>1</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>1</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>A</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>2</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>A</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>3</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>G</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>01</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>4</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>C   G</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>001</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>5</li>
                                    </ul></li>
                                <li style={{ display: "inline-block", margin: 9 }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li style={{ color: "white" }}>N/A  </li>
                                        <li style={{ color: "white" }}>N/A  </li>
                                        <li>1</li>
                                        <li><MathJax.Node inline formula={`\\uparrow`} /></li>
                                        <li>6</li>
                                    </ul></li>
                            </ul>
                        </div>
                    </Typography>
                    <Typography variant="body1" py={3}>
                        <b>Compressed Permutation Index</b>
                        <br></br>
                        An additional data structure, which used in pattern matching, is the array, C. C is composed of the number of edge labels that are lexicographically
                        less than or equal to a given label. Each index in array C coordinates to a member of the given string's alphabet, ordered lexicographically.
                        You can compute C as follows:
                        <br></br>
                        <br></br>
                        1. Lexicographically sort the string T.
                        <br></br>
                        2. Find the index of the last occurance of each member of the alphabet, and add 1 if the array is zero-indexed.
                        <br></br>
                        <br></br>
                        Below is C for the example we've been using.
                    </Typography>
                    <Typography variant="h5" align="center">
                        <div style={{ padding: 0 }}>
                            <ul style={{ listStyle: "none", padding: 0, margin: 5 }}>
                                <li>
                                    L: TAAGCG
                                </li>
                                <li>
                                    sort(L): AACGGT
                                </li>
                                <li>
                                    C: [2,3,5,6]
                                </li>
                            </ul>
                        </div>
                    </Typography>
                    <Typography variant="body1">
                        Now that you understand how to encode wheeler graphs with bit vectors, here is another interactive graph, where you can now see the OILC
                        representation of the graph as you build it (as long as your current graph is a wheeler graph).
                    </Typography>
                    <Box py={2} sx={{ border: 3 }} mt={2} mb={3}>
                        <div style={{ width: 'auto', height: window.innerHeight / 1.5 }}>
                            <InteractiveGraphWithOILC />
                        </div>
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'medium' }} mt={35} > Pattern Matching Inquiry </Typography>
                    <Typography variant="body1" pb={5}>
                        A third motivation for using Wheeler Graphs is in their application for pattern matching. Above, we showed
                        the notable compression capability of Wheeler Graphs. We observe that this compression maintains an ordering, which
                        is possible because of the graph's path coherence property. This makes the matching process easier in a pattern matching problem.
                        We can perform a relatively quick binary search on the compressed Graph.
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'medium' }}> Genomes as Graphs </Typography>
                    <Typography variant="body1" pb={15}>
                        Linear representations of genomes are not graph based. Traditionally, they are composed of one or more sequences.
                        Linear representations of genomes may poorly capture genetic variation and diploid genomes because only one version of the genome can be displayed at a time. Since graphs may branch, as we’ve seen in this tutorial, a singular graph can produce many different strings.
                        <br></br>
                        <br></br>
                        Graph based representations of genomes can also prevent bias when looking for genetic variation.
                        A traditional method might use a reference genome to compare alternative genomes for variation.
                        This creates bias towards the reference genome.
                        Representing multiple sequences in one graph may mitigate this bias by not establishing one sequence as the reference.
                        <br></br>
                        <br></br>
                        Wheeler graphs are particularly useful for representing genomes because they may represent a large genome in a reasonable amount of space, given the compact storage we discussed above. We also explore pattern matching in this tutorial. Finding patterns in DNA sequences is a focus of modern genetics.
                        For example, finding a pattern in the human genome that is linked to a certain rare disease can help physicians predict and diagnose a condition.
                    </Typography>
                </Box>
            </MathJax.Provider>
        </Container>
    )
} export default Tutorial;