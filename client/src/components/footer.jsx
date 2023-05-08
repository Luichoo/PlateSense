import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUserEdit, faShippingFast, faBackspace} from '@fortawesome/free-solid-svg-icons'
// import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-center text-lg-start text-white">
      <div className="container p-4">
        <div className="row mt-4">
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0 "></div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">PlateSense</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/register" className="text-white"><FontAwesomeIcon icon={faBook} className="fa-fw me-2" />Registrate</Link>
              </li>
              <li>
                <Link to="/login" className="text-white"><FontAwesomeIcon icon={faUserEdit} className="fa-fw me-2" />Iniciar sesión</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0 ">
            <h5 className="text-uppercase">{'‎'}</h5>
            <ul className="list-unstyled">

              <li>
                <Link to="/" className="text-white"><FontAwesomeIcon icon={faShippingFast} className="fa-fw me-2" />Inicio</Link>
              </li>
              <li>
           <a href="#!" className="text-white"><FontAwesomeIcon icon={faBackspace} className="fa-fw me-2" />Quienes somos</a>
              </li>     


            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0 "></div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
