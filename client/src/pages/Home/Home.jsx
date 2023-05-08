import React, { useState, useCallback, useRef } from "react";
import Container from "react-bootstrap/esm/Container.js";
import Webcam from "react-webcam";
import "./scripts.js";
import "./Home.css";

function Home() {
  const [isActive, setIsActive] = useState(false);
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };



  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <Container fluid>
      <div className="d-flex flex-column justify-content-center align-items-center h-100 mt-5">
        <h2>Bienvenido ese</h2>
        <div class="switch-button">

    <input onClick={() => setIsActive(!isActive)} type="checkbox" name="switch-button" id="switch-label" class="switch-button__checkbox"></input>

    <label for="switch-label" class="switch-button__label"></label>
</div>
        {img === null ? (
          <>
            <div className="cam-container mt-4 h-100">

  
            {isActive &&  <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                height={338}
                width={600}
                className=" wc-image"
              />}
            </div>


            <div className="btn-container mt-4 mb-5">
              <button
                onClick={capture}
                className="btn btn-dark btn-lg"
                id="submit"
              >
                Captura
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="img-container mt-4 h-100">
              <img src={img} alt="screenshot"  />
            </div>

            <div className="btn-container mt-4 mb-5">
              <button
                onClick={() => setImg(null)}
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
