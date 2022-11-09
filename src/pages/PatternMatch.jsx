import InteractiveGraph from "../components/InteractiveGraph";
import Box from "@mui/material/Box";

function PatternMatch () {
    return (
        <>
            <div>
                1. Create a new node by dragging an edge from any existing node <br></br>
                2. Change the label of an edge by clicking on it <br></br>
                3. Remove a node and its neighboring edges by clicking on it <br></br>
                4. Remove an edge by clicking it when it is already labeled 'd' <br></br>
            </div>
            <Box py={2} sx={{ border: 3}} mb={3}>
                <div style={{width:'auto', height:window.innerHeight/1.5}}>
                    <InteractiveGraph />
                </div>
            </Box>
        </>
    );

} export default PatternMatch;