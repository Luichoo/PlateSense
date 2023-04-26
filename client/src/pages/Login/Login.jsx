import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import './scripts.js';

function Register() {
  return (
    <div className="body">
      <div className="container">


    <div className="container mt-5 bg-primary rounded shadow w-75 mb-5">
      <div className="row align-items-stretch">
        <div className="col bg_img d-none d-lg-block col-md-5 col-lg-5 col-xl-6">
        </div>
        <div className="col bg-white rounded-end p-4">
          <div className="text-end">
            <h1 className="h1 display-2 p-3">PricePaw©</h1>
          </div>
          <h2 className="text-center py-5 display-6">Login</h2>
          <form action="#">
            <div className="mb-4">
              <div className="mb-4 form-floating">
                <input type="text" className="form-control" name="username" placeholder="username" id="username" />
                <label for="username" className="form-label">Username</label>
              </div>
              <div className="mb-4 form-floating">
                <input type="password" className="form-control" name="password" placeholder="Password" id="password" />
                <label for="password" className="form-label">Password</label>
              </div>
              <span id="message"></span>
              <div className="d-grid justify-content-center align-content-center">
                <button type="submit" className="btn btn-dark mt-4" disabled id='submit'>
                  Iniciar Sesión
                </button>
              </div>
              <div className="my-3">
                <span>You don't have an account? <Link to="/register" className="text-decoration-none text-info fw-semibold" >Create one</Link></span>
              </div>
              <div className="my-3 text-center">
                <span><Link to="/" className="text-decoration-none text-info fw-semibold" >Go back</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Register;
