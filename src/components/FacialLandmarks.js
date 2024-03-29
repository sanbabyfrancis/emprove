import React, { useRef, useState } from "react";
import "@tensorflow/tfjs";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";
import Webcam from "react-webcam";
import { runDetector } from "./utilities/detector";

const inputResolution = {
    width: 380,
    height: 350,
};
const videoConstraints = {
    width: inputResolution.width,
    height: inputResolution.height,
    facingMode: "user",
};
function FacialLandmarks(props) {
    const canvasRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    const handleVideoLoad = (videoNode) => {
        const video = videoNode.target;
        if (video.readyState !== 4) return;
        if (loaded) return;
        runDetector(video, canvasRef.current);
        setLoaded(true);
    };
    return (
        <div>
            <Webcam
                width={inputResolution.width}
                height={inputResolution.height}
                style={{ visibility: "hidden", position: "absolute" }}
                videoConstraints={videoConstraints}
                onLoadedData={handleVideoLoad}
            />
            <canvas
                ref={canvasRef}
                width={inputResolution.width}
                height={inputResolution.height}
                style={{ position: "absolute" }}
            />
            {loaded ? <></> : <header>Loading...</header>}
        </div>
    );
}

export default FacialLandmarks;