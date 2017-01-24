var shadow = document.getElementById("shadow");
var gradients = [
  { start: [255, 115, 0], stop: [126, 15, 255] },
  { start: [126, 15, 255], stop: [126, 15, 255] },
  { start: [126, 15, 255], stop: [255, 115, 0] },
  { start: [255, 115, 0], stop: [255, 115, 0] }
];
var transition_time = 5;

var currentIndex = 0;
var nextIndex = 1;
var steps_count = 0;
var steps_total = Math.round(transition_time*60);
var rgb_steps = {
  start: [0,0,0],
  stop: [0,0,0]
};
var rgb_values = {
  start: [0,0,0],
  stop: [0,0,0]
};
var prefixes = ["-webkit-","-moz-","-o-","-ms-",""];
var div_style = shadow.style;
var color1, color2;

function set_next(num) {
  return (num + 1 < gradients.length) ? num + 1 : 0;
}

function calc_step_size(a,b) {
  return (a - b) / steps_total;
}

function calc_steps() {
  for (var key in rgb_values) {
    if (rgb_values.hasOwnProperty(key)) {
      for(var i = 0; i < 3; i++) {
        rgb_values[key][i] = gradients[currentIndex][key][i];
        rgb_steps[key][i] = calc_step_size(gradients[nextIndex][key][i],rgb_values[key][i]);
      }
    }
  }
}

function updateGradient(){
  for (var key in rgb_values) {
    if (rgb_values.hasOwnProperty(key)) {
      for(var i = 0; i < 3; i++) {
        rgb_values[key][i] += rgb_steps[key][i];
      }
    }
  }

  var t_color1 = "rgb("+(rgb_values.start[0] | 0)+","+(rgb_values.start[1] | 0)+","+(rgb_values.start[2] | 0)+")";
  var t_color2 = "rgb("+(rgb_values.stop[0] | 0)+","+(rgb_values.stop[1] | 0)+","+(rgb_values.stop[2] | 0)+")";

  if (t_color1 != color1 || t_color2 != color2) {
    color1 = t_color1;
    color2 = t_color2;

    div_style.backgroundImage = "-webkit-gradient(linear, left bottom, right top, from("+color1+"), to("+color2+"))";
    for (var i = 0; i < 4; i++) {
      div_style.backgroundImage = prefixes[i]+"linear-gradient(45deg, "+color1+", "+color2+")";
    }
  }

  steps_count++;
  if (steps_count > steps_total) {
    steps_count = 0;
    currentIndex = set_next(currentIndex);
    nextIndex = set_next(nextIndex);
    calc_steps();
  }

  if (div_style.backgroundImage.indexOf("gradient") != -1) {
    window.requestAnimationFrame(updateGradient)
  }
}

calc_steps();
window.requestAnimationFrame(updateGradient);
