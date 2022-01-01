// Local Storage Setup --------------------------------------------------------------------->
// localStorage.removeItem('totalworkouttimes');
// localStorage.removeItem('totalresttimes');
let TotalWorkoutTimes = [];
let TotalRestTimes = [];
if (JSON.parse(localStorage.getItem("totalworkouttimes")) !== null) {
  TotalWorkoutTimes = JSON.parse(localStorage.getItem("totalworkouttimes"));
  if (TotalWorkoutTimes.length > 0) {
    let totalTimes = TotalWorkoutTimes.reduce((a, b) => a + b, 0);
    let averageTime = Math.round(totalTimes / TotalWorkoutTimes.length);
    $("#averageWorkoutTimeTimer").html(returnTime(averageTime));
  }
}
if (JSON.parse(localStorage.getItem("totalresttimes")) !== null) {
  TotalRestTimes = JSON.parse(localStorage.getItem("totalresttimes"));
  if (TotalRestTimes.length > 0) {
    let totalTimes = TotalRestTimes.reduce((a, b) => a + b, 0);
    let averageTime = Math.round(totalTimes / TotalRestTimes.length);
    $("#averageRestTimeTimer").html(returnTime(averageTime));
  }
}

console.log(TotalWorkoutTimes);
console.log(TotalRestTimes);

// Start and Stop Buttons ------------------------------------------------------------------>
let workoutButton = false;
let restButton = false;

let startWorkoutTime = 0;
let endWorkoutTime = 0;

function toggleWorkoutFunction() {
  if (workoutButton === false) {
    startWorkoutTime = Date.now();
    var startWorkout = new Date();
    $("#buttonOneContainer").css("background-color", "#5cdb5c");
    $("#buttonOneContainer").html(`
      <h1 class="startWorkoutButton">STOP WORKOUT</h1>
      `);
    $("#undoWorkoutButton").css("background-color", "#5cdb5c");
    $("#undoWorkoutButton").css("filter", "brightness(90%)");
    updateStartWorkoutTime(startWorkout);
    $("#stopWorkoutTimeTimer").html("00:00:00");
    $("#totalWorkoutTimer").html("00:00:00");
    workoutButton = true;
  } else {
    endWorkoutTime = Date.now();
    var EndWorkout = new Date();
    $("#buttonOneContainer").css("background-color", "#FC4445");
    $("#buttonOneContainer").css("color", "#EDF5e1");
    $("#buttonOneContainer").html(`
      <h1 class="startWorkoutButton">START WORKOUT</h1>
      `);
    $("#undoWorkoutButton").css("background-color", "rgba(224, 73, 73, 0.767)");
    TotalWorkoutTimes.push(getTime(startWorkoutTime, endWorkoutTime));
    localStorage.setItem("totalworkouttimes", JSON.stringify(TotalWorkoutTimes));
    console.log(localStorage.getItem("totalworkouttimes"));
    updateAverageWorkoutTime(TotalWorkoutTimes);
    updateStopWorkoutTime(EndWorkout);
    updateTotalWorkoutTime(getTime(startWorkoutTime, endWorkoutTime));
    workoutButton = false;
  }
};

let startRestTime = 0;
let endRestTime = 0;
let previousRestTime = 0;
$("#previousRestTimer").html(getTime(startRestTime, endRestTime) + ` seconds.`);

function toggleRestFunction() {
  if (restButton === false) {
    startRestTime = Date.now();
    var startRest = new Date();
    $("#buttonTwoContainer").css("background-color", "#5cdb5c");
    $("#buttonTwoContainer").html(`
      <h1 class="startRestButton">STOP REST</h1>
      `);
    $("#undoRestButton").css("background-color", "#5cdb5c");
    $("#undoRestButton").css("filter", "brightness(90%)");
    updateStartRestTime(startRest);
    $("#endRestTimer").html("00:00:00");
    $("#totalRestTimer").html("00:00:00");
    restButton = true;
  } else {
    endRestTime = Date.now();
    var EndRest = new Date();
    $("#buttonTwoContainer").css("background-color", "#FC4445");
    $("#buttonTwoContainer").css("color", "#EDF5e1");
    $("#buttonTwoContainer").html(`
      <h1 class="startRestButton">START REST</h1>
      `);
    $("#undoRestButton").css("background-color", "rgba(224, 73, 73, 0.767)");
    TotalRestTimes.push(getTime(startRestTime, endRestTime));
    localStorage.setItem("totalresttimes", JSON.stringify(TotalRestTimes));
    updateAverageRestTime(TotalRestTimes);
    updateStopRestTime(EndRest);
    updateTotalRestTime(getTime(startRestTime, endRestTime));
    restButton = false;
  }
};

// Time Getters -------------------------------------------------------------------------------->

function getTime(start, end) {
  return Math.round(((end - start) / 1000))
}

function returnTime(seconds) {
  if (seconds < 10) {
    return `00:00:0${seconds}`
  } else if (seconds >= 10 && seconds < 60) {
    return `00:00:${seconds}`;
  } else if (seconds >= 60 && seconds < 600) {
    let minutes = Math.floor(seconds / 60);
    let newSeconds = seconds - (minutes * 60);
    if (newSeconds < 10) {
      return `00:0${minutes}:0${newSeconds}`
    } else {
      return `00:0${minutes}:${newSeconds}`
    }
  } else if (seconds >= 600 && seconds < 3600) {
    let minutes = Math.floor(seconds / 60);
    let newSeconds = seconds - (minutes * 60);
    if (newSeconds < 10) {
      return `00:${minutes}:0${newSeconds}`
    } else {
      return `00:${minutes}:${newSeconds}`
    }
  } else if (seconds >= 3600 && seconds < 3600) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let newSeconds = seconds - (hours * 3600) - (minutes * 60);
    if (minutes < 10) {
      if (seconds < 10) {
        return `0${hours}:0${minutes}:0${newSeconds}`
      } else {
        return `0${hours}:0${minutes}:${newSeconds}`
      }
    } else {
      if (seconds < 10) {
        return `0${hours}:${minutes}:0${newSeconds}`
      } else {
        return `0${hours}:${minutes}:${newSeconds}`
      }
    }
  } else {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let newSeconds = seconds - (hours * 3600) - (minutes * 60);
    if (minutes < 10) {
      if (seconds < 10) {
        return `${hours}:0${minutes}:0${newSeconds}`
      } else {
        return `${hours}:0${minutes}:${newSeconds}`
      }
    } else {
      if (seconds < 10) {
        return `${hours}:${minutes}:0${newSeconds}`
      } else {
        return `${hours}:${minutes}:${newSeconds}`
      }
    }
  }
}

// Current Rest Time DOM Manipulation -------------------------------------->
function updateStartRestTime(startTime) {
  if (startTime.getHours() > 12) {
    $("#startRestTimer").html(`${startTime.getHours() % 12}:${startTime.getMinutes()}:${startTime.getSeconds()} PM`)
  } else {
    $("#startRestTimer").html(`${startTime.getHours() % 12}:${startTime.getMinutes()}:${startTime.getSeconds()} AM`)
  }
}

// Stop Rest Time DOM Manipulation -------------------------------------->
function updateStopRestTime(startTime) {
  if (startTime.getHours() > 12) {
    $("#endRestTimer").html(`${startTime.getHours() % 12}:${startTime.getMinutes()}:${startTime.getSeconds()} PM`)
  } else {
    $("#endRestTimer").html(`${startTime.getHours() % 12}:${startTime.getMinutes()}:${startTime.getSeconds()} AM`)
  }
}

// Total Rest Time DOM Manipulation ------------------------------------->
function updateTotalRestTime(times) {
  $("#totalRestTimer").html(returnTime(times));
}

// Average Rest Time DOM Manipulation --------------------------------------->
function updateAverageRestTime(times) {
  let totalTimes = times.reduce((a, b) => a + b, 0);
  let averageTime = Math.round(totalTimes / times.length);
  $("#averageRestTimeTimer").html(returnTime(averageTime));
}

// Start Workout Time DOM Manipulation -------------------------------------->
function updateStartWorkoutTime(startTime) {
  if (startTime.getHours() > 12) {
    $("#startWorkoutTimeTimer").html(`${startTime.getHours() % 12}:${startTime.getMinutes()}:${startTime.getSeconds()} PM`)
  } else {
    $("#startWorkoutTimeTimer").html(`${startTime.getHours() % 12}:${startTime.getMinutes()}:${startTime.getSeconds()} AM`)
  }
}

// Stop Workout Time DOM Manipulation -------------------------------------->
function updateStopWorkoutTime(startTime) {
  if (startTime.getHours() > 12) {
    $("#stopWorkoutTimeTimer").html(`${startTime.getHours() % 12}:${startTime.getMinutes()}:${startTime.getSeconds()} PM`)
  } else {
    $("#stopWorkoutTimeTimer").html(`${startTime.getHours() % 12}:${startTime.getMinutes()}:${startTime.getSeconds()} AM`)
  }
}

// Total Workout Time DOM Manipulation ------------------------------------->
// #totalWorkoutTimer
function updateTotalWorkoutTime(times) {
  $("#totalWorkoutTimer").html(returnTime(times));
}

// Average Workout Time DOM Manipulation ------------------------------------>
function updateAverageWorkoutTime(times) {
  let totalTimes = times.reduce((a, b) => a + b, 0);
  let averageTime = Math.round(totalTimes / times.length);
  $("#averageWorkoutTimeTimer").html(returnTime(averageTime));
}


// Undo Buttons ---------------------------------------------------------------------------->
// Undo buttons need to refresh data 
function undoWorkoutButtonFunction() {
  if (TotalWorkoutTimes.length > 0) {
    TotalWorkoutTimes.pop();
    localStorage.setItem("totalworkouttimes", JSON.stringify(TotalWorkoutTimes));
    alert("Last entered workout has been removed.");
  } else {
    alert("No recorded workouts.");
  }
}

function undoRestButtonFunction() {
  if (TotalRestTimes.length > 0) {
    TotalRestTimes.pop();
    localStorage.setItem("totalresttimes", JSON.stringify(TotalRestTimes));
    alert("Last entered rest time has been removed.");
  } else {
    alert("No recorded rest times.");
  }
}

// Footer Buttons -------------------------------------------------------------------------->
function linkedinButton() {
  window.open("https://www.linkedin.com/in/muzaffer-ozen/", "_blank").focus();
}

function gitHubButton() {
  // window.open("https://github.com/TeBossIzHere/WeatherWebsite", "_blank").focus();
  alert("Feature not Setup");
}
