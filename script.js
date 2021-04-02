/* global tm */

const mainEl = document.querySelector("#container");

const wizard = new tm.Wizard({
  introduction: {
    title: tm.html`Let’s teach your computer to recognize when your hands are up or down.`,
    description: tm.html`Click "Start", You'll need to allow access to your webcam. Note that your images stay private to you and do not leave your computer.`
  },
  classes: [
    {
      name: "No Hands Up",
      title: "“Record examples of yourself with no hands up.",
      description:
        "Hold the button and take at least 20 pictures of yourself with neither of your hands up."
    },
    {
      name: "Right Hand Up",
      title: "Record examples of yourself with your right hand up.",
      description:
        "Take at least 20 pictures of yourself with your right hand up. Make sure your hand is visible in every frame."
    },
    {
      name: "Left Hand Up",
      title: "Record examples of yourself with your left hand up.",
      description:
        "Take at least 20 pictures of yourself with your left hand up. Make sure your hand is visible in every frame."
    },
    {
      name: "Both Hands Up",
      title: "Record examples of yourself with your both hands up.",
      description:
        "Take at least 20 pictures of yourself with both of your hands up. Make sure your hands are visible in every frame."
    }
  ],
  onLoad: () => {
    console.log("model has loaded");
  },
  onPrediction: predictions => {
    const images = document.querySelectorAll(".prediction-image");
    let highestProb = Number.MIN_VALUE;
    let highestIndex = -1;
    predictions.forEach((pred, i) => {
      if (pred.probability > highestProb) {
        highestProb = pred.probability;
        highestIndex = i;
      }
    });
    images.forEach((img, i) => {
      if (i === highestIndex) {
        img.classList.remove("hidden");
      } else {
        img.classList.add("hidden");
      }
    });
  },
  onSampleAdded: added => {
    console.log(added);
  },
  onTrain: () => console.log("train begins"),
  onReady: () => {
    const inferenceCamera = wizard.createInferenceCamera({
      size: 270
    });
    const cameraContainer = document.querySelector(
      "#inference-camera-container"
    );
    cameraContainer.appendChild(inferenceCamera);
    mainEl.classList.add("ready");
  }
});

document
  .querySelector("#train-model-button")
  .addEventListener("click", () => wizard.open());
