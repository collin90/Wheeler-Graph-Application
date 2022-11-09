import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MathJax from "react-mathjax";

function Tutorial() {
    return (
        <Container>
            <MathJax.Provider>
                <Box py={3}>
                    <Typography variant="h5"> Wheeler Graph Tutorial </Typography>
                </Box>
                <Box>
                    <Typography variant="h6"> What is a Wheeler Graph? </Typography>
                </Box>
                <Box>
                    <Typography variant="body1"> A directed edge-labeled graph, where each label is from a totally-ordered alphabet, is a Wheeler Graph if </Typography>
                    <Typography variant="body1"> The nodes can be ordered such that: </Typography>
                    <ol>
                        <li>Nodes with in-degree 0 come before nodes with positive in-degree</li>
                        <Typography variant="body1" ml={4}> Nodes without an arrow pointing towards them must come first </Typography>
                    </ol>
                    <Typography variant="body1">
                        And for all pairs of edges
                        <MathJax.Node inline formula={`\\: e = (u,v), e' = (u', v')\\:`} />
                        (labeled a and a' respectively):
                    </Typography>
                    <ol start="2">
                        <li>
                            <MathJax.Node inline formula={`a \\prec ^3 a' \\Longrightarrow v < v'`} />
                            <Typography variant="body1" ml={4}>If an edge labeled a is alphabetically less than an edge labeled a', then that the lesser edge's destination should be less than the greater edge's destination. </Typography>
                            <Typography variant="body1" ml={6}>This also creates the corollary that all edges entering the same node have the same label since a node cannot have two incoming edges with different labels </Typography>
                        </li>
                        <li>
                            <MathJax.Node inline formula={`(a = a') \\land (u < u') \\Longrightarrow v \\leq v'`} />
                            <Typography variant="body1" ml={4}>If an edge labeled a is alphabetically equal to an edge labeled a' and the source of a is less than the source of a', then the destination of a must be less than or equal to the destination of a'. </Typography>
                        </li>
                    </ol>
                </Box>
                <Box>
                    <Typography variant="h6"> Why are Wheeler Graphs important? </Typography>
                </Box>
            </MathJax.Provider>
        </Container>

    )


} export default Tutorial;