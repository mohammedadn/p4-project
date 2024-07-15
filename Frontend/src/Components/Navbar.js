import { Link } from "react-router-dom";




function Navbar() {
  return (
    <div>

      <nav className="navbar navbar-expand-lg bg-dark navbar-dark m-3 ">
        <div className="container-fluid">
          <h1 className="text-bold text-primary m-2">
          <img src={"https://i.pinimg.com/originals/a5/fb/c9/a5fbc944a9738597d3db5060e7a077ee.jpg"} width="200" height="150" className="d-inline-block align-top" alt=""></img>
            
          </h1>

          <div
            className="collapse navbar-collapse justify-content-center "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto">
              <div className=" m-5">
                <li className="nav-item " >
                  <Link to="/home">
                    <h4>Home</h4>

                  </Link>
                </li>
                
              </div>
              <div className="m-5">
                <li className="nav-item">
                  <Link to="/trainers">
                    <h4>Trainers</h4>
                  </Link>
              </li>
              </div>
              <div className="m-5">
                <li className="nav-item">
                  <Link to="/workout">
                    <h4>Workout</h4>
                  </Link>
              </li>
              </div> 
              <div className="m-5">
                <li className="nav-item">
                  <Link to="/tracker">
                    <h4>Tracker</h4>
                  </Link>
              </li>
              </div> 
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;