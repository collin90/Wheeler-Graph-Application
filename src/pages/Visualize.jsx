import axios from "axios";
import {useState} from "react"

function Visualize () {

    const [nodes, setNodes] = useState();
    const [edges, setEdges] = useState();

    const handleOnClick = () => {
        const path = 'http://127.0.0.1:5000/visualize';
        axios.post(path, {nodes: [1,2,3], edges: ["x","y","z"]}).then(
            (response) => {
                var result = response.data;
                console.log(result)
                setNodes(result.NODES)
                setEdges(result.EDGES)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <div>
            This is the visualization page
            <br></br>
            <button onClick={handleOnClick}>python run</button>
            <p>TODO: We need to let the user input a string. Then, when they click the button, we send the content as a POST to the visualize method in wheeler.py</p>
            <p>nodes: {nodes}</p>
            <p>edges: {edges}</p>
        </div>
    );

} export default Visualize;