import {Link} from 'react-router-dom'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function NavBar () {
    //return (
    //    <nav className="nav">
     //       <Link to="/" className="site-title">Wheeler Graphs</Link>
     //       <ul>
     //           <li>
     //               <Link to="/tutorial">Tutorial</Link>
     //           </li>
     //           <li>
     //               <Link to="/visualize">Visualize</Link>
     //           </li>
     //           <li>
     //               <Link to="/patternmatch">Pattern Matching</Link>
     //           </li>
     //           <li>
     //               <Link to="/wheelerproperty">Wheeler Property</Link>
     //           </li>
     //       </ul>
     //   </nav>
    //);
    const [value, setValue] = React.useState('Wheeler Graphs');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
            <Tab value="Wheeler Graphs" label="Wheeler Graphs"><Link to="/" /></Tab>
            <Tab value="Tutorial" label="Tutorial"><Link to="/tutorial" /></Tab>
            <Tab value="Generate/Visualize" label="Generate/Visualize" ><Link to="/visualize"/></Tab>
            <Tab value="Pattern Match" label="Pattern Matching" ><Link to="/patternmatch" /> </Tab>
            <Tab value="Wheeler Property" label="Wheeler Property" ><Link to="/wheelerproperty" /> </Tab>
        </Tabs>
      </Box>
    );

} export default NavBar;