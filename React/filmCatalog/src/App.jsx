import { Outlet, Link } from "react-router-dom";

function App() {

  return (
    <>
      <Outlet />
      <ul>
        <li><Link to="/">home</Link></li>
        <li><Link to="/movie/:id">movie</Link></li>
        <li><Link to="/favorites">favorites</Link></li>
        <li><Link to="/search">search</Link></li>
      </ul>
    </>
  );
}

export default App
