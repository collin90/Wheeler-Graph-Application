import {Link} from 'react-router-dom'


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
                    <Link to="/wheelerproperty">Wheeler Property</Link>
                </li>
            </ul>
        </nav>
    );

} export default NavBar;