import InteractiveGraph from "../components/InteractiveGraph";
import Box from "@mui/material/Box";

function PatternMatch () {
    return (
        <Box py={2} sx={{ border: 3}} mb={3}>
            <div style={{width:'auto', height:window.innerHeight/1.5}}>
                <InteractiveGraph />
            </div>
        </Box>
    );

} export default PatternMatch;