import NavBar from "./components/NavBar";
import "./styles.css";
import {Route, Routes} from "react-router-dom";
import Tutorial from "./pages/Tutorial";
import Visualize from "./pages/Visualize";
import PatternMatch from "./pages/PatternMatch";
import WheelerProperty from "./pages/WheelerProperty";


function App() {

  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <Routes>
          <Route path="/" element={<Tutorial />}/>
          <Route path="/visualize" element={<Visualize />}/>
          <Route path="/patternmatch" element={<PatternMatch />}/>
          <Route path="/wheelerProperty" element={<WheelerProperty />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
