import React, { useState, useCallback, useRef, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Webcam from "react-webcam";
//import { useHistory } from "react-router-dom";
import axios from "axios";
import "./scripts.js";
import "./Home.css";

function Home() {
  //const history = useHistory();
  const [isActive, setIsActive] = useState(false);
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [islogged, setIslogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar si la carga está en curso
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  function handlerWCB() {
    setDisabled(!disabled);
  }

  function handlertoggler() {
    setDisabled2(!disabled2);
    console.log(disabled2);
  }

  useEffect(() => {
    const fetchLoggedStatus = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + "access", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (response.data === true) {
          setIslogged(true);
        } else {
          localStorage.clear();
          setIslogged(false);
        }
      } catch (error) {
        localStorage.clear()
        setIslogged(false);
      } finally {
        setIsLoading(false); // Se establece isLoading en falso una vez que se ha completado la carga
      }
    };

    fetchLoggedStatus();
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  // Si isLoading es verdadero, puedes mostrar un indicador de carga
  if (isLoading) {
    return <div className="container-fluid d-flex flex-column justify-content-center align-content-center"  style={{ height: "50rem" }}>
       <h1 className="h1 display-2 p-3 text-center">Cargando...</h1>
      </div>;
  }

  return (
    <Container fluid style={{ height: "50rem" }}>
      {islogged === false ? (
        <div className="container d-flex flex-column justify-content-center align-content-center h-100">
          <h1 className="h1 display-2 p-3 text-center">PlateSense©</h1>
          <div className="row align-items-stretch">
            <div className="col rounded-end p-4">
              <h2 className="text-center py-5 display-6">Inicia sesión para continuar</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center h-100 mt-5">
          <h2>Bienvenido {localStorage.getItem("clave")}</h2>
          <div className="switch-button">
            <input
              onClick={() => {
                setIsActive(!isActive);
                handlerWCB();
              }}
              type="checkbox"
              name="switch-button"
              id="switch-label"
              className="switch-button__checkbox"
              disabled={disabled2}
            />
            <label htmlFor="switch-label" className="switch-button__label"></label>
            <div className="h-75"></div>
          </div>
          {img === null ? (
            <>
              <div className="cam-container mt-4 bg-wc wc-image">
                {isActive && (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    height={338}
                    width={600}
                    className="wc-image"
                  />
                )}
              </div>

              <div className="btn-container mt-4 mb-5">
                <button
                  onClick={() => {
                    capture();
                    handlertoggler();
                  }}
                  className="btn btn-dark btn-lg"
                  id="submit"
                  disabled={!disabled}
                >
                  Captura
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="img-container mt-4 h-100">
                <img src={img} alt="screenshot" className="wc-image" />
              </div>

              <div className="btn-container mt-4 mb-5" style={{ marginTop: "1px" }}>
                <button
                  onClick={() => {
                    setImg(null);
                    handlertoggler();
                  }}
                  className="btn btn-dark btn-lg"
                  id="submit"
                >
                  Repetir
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Container>
  );
}

export default Home;
