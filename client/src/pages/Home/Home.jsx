import React, { useState, useCallback, useRef } from "react";
import Container from "react-bootstrap/esm/Container.js";
import Webcam from "react-webcam";
import "./scripts.js";
import "./Home.css";

function Home() {
  const [isActive, setIsActive] = useState(false);
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
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
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <Container fluid>
      <div className="d-flex flex-column justify-content-center align-items-center h-100 mt-5">
        <h2>Bienvenido ese</h2>
        <div class="switch-button">
          <input
            onClick={() => {
              setIsActive(!isActive);
              handlerWCB();
            }}
            type="checkbox"
            name="switch-button"
            id="switch-label"
            class="switch-button__checkbox"
            disabled={disabled2}
          ></input>

          <label for="switch-label" class="switch-button__label"></label>
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
    </Container>
  );
}

export default Home;
