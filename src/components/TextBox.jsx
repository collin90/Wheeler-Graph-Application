import TextField from '@mui/material/TextField';
import { IconTrashX } from "@tabler/icons";
import Grid from '@mui/material/Grid';

function TextBox (props) {
    const {editTextBox, removeTextBox, id} = props;

    const handleOnRemove = () => {
        removeTextBox(id);
    }

    const handleOnEdit = (e) => {
        editTextBox(id, e.target.value);
    }
    
    return (
        <Grid container mb={1}>
            <TextField label="Text" variant="outlined" onChange={handleOnEdit} multiline></TextField>
            <button onClick={handleOnRemove}>
                <IconTrashX size={16} />
            </button>
        </Grid>
    );

} export default TextBox;