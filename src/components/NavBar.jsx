import {Link} from 'react-router-dom'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from "react-router";


function NavBar () {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">Wheeler Graphs</Link>
            <ul>
                <li>
                    <Link to="/tutorial">Tutorial</Link>
                </li>
                <li>
                    <Link to="/visualize">Visualize</Link>
                </li>
                <li>
                    <Link to="/patternmatch">Pattern Matching</Link>
                </li>
                <li>
                    <Link to="/wheelerproperty">Find Ordering</Link>
                </li>
            </ul>
        </nav>
    );
    const [value, setValue] = React.useState('Wheeler Graphs');
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
      setValue(newValue);
      if(newValue == 'Wheeler Graphs') navigate('/');
      else if (newValue == 'Tutorial') navigate('/tutorial');
      else if (newValue == 'Generate/Visualize') navigate('/visualize');
      else if (newValue == 'Pattern Match') navigate('/patternmatch');
      else if (newValue == 'Wheeler Property') navigate('/wheelerproperty')
    };
  
    return (
      <Box mt={1} bgcolor='light-blue' sx={{ width: '100%', justifyContent: "flex", display: 'flex', fontSize: '38px', fontWeight: 'bolder'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          sx={{'backgroundColor':'#EDF1FF', width: '100%'}}
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
            <Tab value="Wheeler Graphs" label="Wheeler Graphs"></Tab>
            <Tab value="Tutorial" label="Tutorial"></Tab>
            <Tab value="Generate/Visualize" label="Generate/Visualize" ></Tab>
            <Tab value="Pattern Match" label="Pattern Matching" ></Tab>
            <Tab value="Wheeler Property" label="Find Ordering" ></Tab>
        </Tabs>
      </Box>
    ); 

} export default NavBar;