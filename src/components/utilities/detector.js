import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./drawMesh";
import axios from "axios";

function euclidianDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function eyeAspectRatio(p1, p2, p3, p4, p5, p6) {
  var A = euclidianDistance(p2.x, p2.y, p6.x, p6.y)
  var B = euclidianDistance(p3.x, p3.y, p5.x, p5.y)
  var C = euclidianDistance(p1.x, p1.y, p4.x, p4.y)

  return ((A + B) / (2.0) * C)
}

function mouthAspectRatio(p1, p2, p3, p4, p5, p6) {
  var A = euclidianDistance(p2.x, p2.y, p6.x, p6.y)
  var B = euclidianDistance(p3.x, p3.y, p5.x, p5.y)
  var C = euclidianDistance(p1.x, p1.y, p4.x, p4.y)

  return ((A + B) / (2.0) * C)
}

export const runDetector = async (video, canvas) => {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detectorConfig = {
    runtime: "tfjs"
  };
  const detector = await faceLandmarksDetection.createDetector(
    model,
    detectorConfig
  );
  var updateCount;
  const detect = async (net) => {
    const estimationConfig = { flipHorizontal: false };
    const faces = await net.estimateFaces(video, estimationConfig);
    // console.log(faces)
    try {
      // console.log(mouthAspectRatio(faces[0].keypoints[61], faces[0].keypoints[37], faces[0].keypoints[267], faces[0].keypoints[291], faces[0].keypoints[314], faces[0].keypoints[84]))
      // console.log(eyeAspectRatio(faces[0].keypoints[33], faces[0].keypoints[160], faces[0].keypoints[158], faces[0].keypoints[133], faces[0].keypoints[153], faces[0].keypoints[144]))
      // console.log(eyeAspectRatio(faces[0].keypoints[362], faces[0].keypoints[385], faces[0].keypoints[387], faces[0].keypoints[263], faces[0].keypoints[373], faces[0].keypoints[380]))
     
      var MAR = mouthAspectRatio(faces[0].keypoints[61], faces[0].keypoints[37], faces[0].keypoints[267], faces[0].keypoints[291], faces[0].keypoints[314], faces[0].keypoints[84])
      var L_EAR = eyeAspectRatio(faces[0].keypoints[33], faces[0].keypoints[160], faces[0].keypoints[158], faces[0].keypoints[133], faces[0].keypoints[153], faces[0].keypoints[144])
      var R_EAR = eyeAspectRatio(faces[0].keypoints[362], faces[0].keypoints[385], faces[0].keypoints[387], faces[0].keypoints[263], faces[0].keypoints[373], faces[0].keypoints[380])
      if (MAR > 6000 || (L_EAR < 250 && R_EAR < 250)) {
        var audio = new Audio("notification.wav");
        audio.play();
        updateCount = true;
      }
      else {
        if (updateCount == true) {
          axios.post("/drowsiness-count", "updateCount");
          updateCount = false;
        }
      }
    }
    catch (e) {
      // neglect
    }
    const ctx = canvas.getContext("2d");
    requestAnimationFrame(() => drawMesh(faces[0], ctx));
    detect(detector);
  };
  detect(detector);
};
