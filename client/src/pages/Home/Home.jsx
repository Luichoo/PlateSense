import React, { useState, useCallback, useRef,useEffect } from "react";
import Container from "react-bootstrap/esm/Container.js";
import Webcam from "react-webcam";
import axios from "axios";
import "./scripts.js";
import "./Home.css";


function Home() {
  const [isActive, setIsActive] = useState(false);
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [islogged, setIslogged] = useState(false);
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
 
        const response = await axios.get(process.env.REACT_APP_API_URL+"access", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }, {crossDomain:true});
  
        console.log(response.data);
  
        if (response.data === true) {
          setIslogged(true);
        } else {
          console.log("no");
          setIslogged(false);
        }
      } catch (error) {
        console.log("noup");
        setIslogged(false);
      }
    };
  
    fetchLoggedStatus();
  }, []);

  console.log('logged '+islogged);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <Container fluid  style={{'height':'40rem'}}>
      {(islogged === false) ? (
        <>
         <h1>hola</h1>
        </>
       
      ):(

        <div className="d-flex flex-column justify-content-center align-items-center h-100 mt-5">
        <h2>Bienvenido {localStorage.getItem('clave')}</h2>
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
          ></input>

          <label htmlFor="switch-label" className="switch-button__label"></label>
          <div className="h-75"></div>
        </div>
        {img === null ? (
          <>

              <div className="cam-container mt-4 bg-wc wc-image" >
                {isActive && (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    height={338}
                    width={600}
                    className=" wc-image"
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

            <div
              className="btn-container mt-4 mb-5"
              style={{ marginTop: "1px" }}
            >
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
