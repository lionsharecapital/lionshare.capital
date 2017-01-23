const shadow = document.getElementById('shadow');
const gradients = [
  { start: [255, 115, 0], stop: [126, 15, 255] },
  { start: [126, 15, 255], stop: [126, 15, 255] },
  { start: [126, 15, 255], stop: [255, 115, 0] },
  { start: [255, 115, 0], stop: [255, 115, 0] },
];
const transitionTime = 5;
let currentIndex = 0;
let nextIndex = 1;
let stepsCount = 0;
const stepsTotal = Math.round(transitionTime * 60);
const rgbSteps = {
  start: [0, 0, 0],
  stop: [0, 0, 0],
};
const rgbValues = {
  start: [0, 0, 0],
  stop: [0, 0, 0],
};
const shadowStyle = shadow.style;
let color1;
let color2;

function setNext(num) {
  return (num + 1 < gradients.length) ? num + 1 : 0;
}

function calcStepSize(a, b) {
  return (a - b) / stepsTotal;
}

function calcSteps() {
  for (const key in rgbValues) {
    if (rgbValues.hasOwnProperty(key)) {
      for (let i = 0; i < 3; i++) {
        rgbValues[key][i] = gradients[currentIndex][key][i];
        rgbSteps[key][i] = calcStepSize(gradients[nextIndex][key][i], rgbValues[key][i]);
      }
    }
  }
}

function updateGradient() {
  for (const key in rgbValues) {
    if (rgbValues.hasOwnProperty(key)) {
      for (let i = 0; i < 3; i++) {
        rgbValues[key][i] += rgbSteps[key][i];
      }
    }
  }

  const tColor1 = `
    rgb(${(rgbValues.start[0] | 0)}, ${(rgbValues.start[1] | 0)}, ${(rgbValues.start[2] | 0)})
  `;
  const tColor2 = `
    rgb(${(rgbValues.stop[0] | 0)}, ${(rgbValues.stop[1] | 0)}, ${(rgbValues.stop[2] | 0)})
  `;

  if (tColor1 !== color1 || tColor2 !== color2) {
    color1 = tColor1;
    color2 = tColor2;

    shadowStyle.backgroundImage = `
      -webkit-gradient(linear, left bottom, right top, from(${color1}), to(${color2}))
    `;
    for (let i = 0; i < 4; i++) {
      shadowStyle.backgroundImage = `linear-gradient(270deg, ${color1}, ${color2})`;
    }
  }

  stepsCount++;
  if (stepsCount > stepsTotal) {
    stepsCount = 0;
    currentIndex = setNext(currentIndex);
    nextIndex = setNext(nextIndex);
    calcSteps();
  }

  if (shadowStyle.backgroundImage.indexOf('gradient') !== -1) {
    window.requestAnimationFrame(updateGradient);
  }
}

calcSteps();
window.requestAnimationFrame(updateGradient);
