// HTML Elements
let ratioSelect = document.getElementById("ratio-select");
let workDay = document.getElementById("workDay");
let begin = document.getElementById("begin");
let resetDay = document.getElementById("resetDay");

let standBtn = document.getElementById("standBtn");
let sitBtn = document.getElementById("sitBtn");

let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

let table = document.querySelector("table");

// Variables & starting values
let hour = 00;
let minute = 00;
let second = 00;
let count = 00;

let ratioStand = 0;
let ratioSit = 0;

let totalStand = 0;
let totalSit = 0;
let currStartTime = 0;
let currStopTime = 0;

let ratio = ratioSelect.value;
let workDayHours = workDay.value;
updateStandSitTime();

// Event listeners
ratioSelect.addEventListener("change", function () {
  ratio = this.value;
  updateStandSitTime();
});

workDay.addEventListener("change", function () {
  workDayHours = this.value;
  updateStandSitTime();
});

begin.addEventListener("click", function () {
  if (ratio == "0") {
    alert("Please select a Stand to sit Ratio.");
  } else {
    addRow("---", "---", "DAY START");
    this.setAttribute("disabled", true);
    workDay.setAttribute("disabled", true);
    ratioSelect.setAttribute("disabled", true);

    resetDay.removeAttribute("disabled");
    resetBtn.removeAttribute("disabled");
    startBtn.removeAttribute("disabled");
    stopBtn.removeAttribute("disabled");
  }
});

resetDay.addEventListener("click", function () {
  clearTable();
  totalStand = 0;
  totalSit = 0;
  begin.removeAttribute("disabled");
  ratioSelect.removeAttribute("disabled");
  workDay.removeAttribute("disabled");
  this.setAttribute("disabled", true);
});

standBtn.addEventListener("click", function () {
  if (!this.classList.contains("active")) {
    this.classList.add("active");
    sitBtn.classList.remove("active");
    reset();
  }
});

sitBtn.addEventListener("click", function () {
  if (!this.classList.contains("active")) {
    this.classList.add("active");
    standBtn.classList.remove("active");
    reset();
  }
});

startBtn.addEventListener("click", function () {
  timer = true;
  let sitOrStand = standBtn.classList.contains("active") ? "Stand" : "Sit";
  currStartTime = addRow("---", "---", sitOrStand);

  standBtn.setAttribute("disabled", true);
  sitBtn.setAttribute("disabled", true);
  resetBtn.setAttribute("disabled", true);
  resetDay.setAttribute("disabled", true);
  this.setAttribute("disabled", true);

  stopBtn.removeAttribute("disabled");

  stopWatch();
});

stopBtn.addEventListener("click", function () {
  timer = false;
  currStopTime = new Date();
  let duration = currStopTime.getTime() - currStartTime.getTime();

  if (standBtn.classList.contains("active")) {
    totalStand += duration;
    updateTime = timeToString(totalStand);
    document.getElementById("standTime").innerHTML = updateTime;
  } else {
    totalSit += duration;
    updateTime = timeToString(totalSit);
    document.getElementById("sitTime").innerHTML = updateTime;
  }

  let pos = table.rows.length - 1;
  table.rows[pos].cells[1].innerHTML = currStopTime.toLocaleTimeString();
  table.rows[pos].cells[2].innerHTML = `${timeToString(duration)}`;

  this.setAttribute("disabled", true);

  standBtn.removeAttribute("disabled");
  sitBtn.removeAttribute("disabled");
  resetBtn.removeAttribute("disabled");
  resetDay.removeAttribute("disabled");
  startBtn.removeAttribute("disabled");
});

resetBtn.addEventListener("click", function () {
  reset();
});

// Functions
function timeToString(time) {
  let cSecs = time / 1000;
  let cMins = cSecs / 60;
  let cHrs = cMins / 60;
  let roundMin = Math.floor(cMins);
  let roundSec = Math.floor(cSecs % 60);
  let roundHr = 0;
  if (cHrs >= 1) {
    roundHr = Math.floor(cHrs);
    roundMin = Math.floor(cMins % 60);
  }
  return `${roundHr} hrs ${roundMin} mins ${roundSec} sec`;
}

function reset() {
  timer = false;
  hour = 0;
  minute = 0;
  second = 0;
  count = 0;

  document.getElementById("standTime").innerHTML = timeToString(totalStand);
  document.getElementById("sitTime").innerHTML = timeToString(totalSit);
  document.getElementById("hr").innerHTML = "00";
  document.getElementById("min").innerHTML = "00";
  document.getElementById("sec").innerHTML = "00";
}

function updateStandSitTime() {
  let equalPortions = Number(ratio) + 1;
  let num = Number(workDayHours) / equalPortions;
  ratioStand = Number(ratio) * num;
  ratioSit = num;
  document.getElementById("suggestStand").innerText = ratioStand;
}

function clearTable() {
  let numRows = table.rows.length;
  for (let row = numRows - 1; row > 0; row--) {
    table.deleteRow(row);
  }
}

function addRow(c2, c3, c4) {
  let row = table.insertRow(table.rows.length);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let dateTime = new Date();
  cell1.innerHTML = dateTime.toLocaleTimeString();
  cell2.innerHTML = c2;
  cell3.innerHTML = c3;
  cell4.innerHTML = c4;
  return dateTime;
}

function stopWatch() {
  if (timer) {
    count++;

    if (count == 64) {
      second++;
      count = 0;
    }

    if (second == 60) {
      minute++;
      second = 0;
    }

    if (minute == 60) {
      hour++;
      minute = 0;
      second = 0;
    }

    let hrString = hour;
    let minString = minute;
    let secString = second;

    if (hour < 10) {
      hrString = "0" + hrString;
    }

    if (minute < 10) {
      minString = "0" + minString;
    }

    if (second < 10) {
      secString = "0" + secString;
    }

    document.getElementById("hr").innerHTML = hrString;
    document.getElementById("min").innerHTML = minString;
    document.getElementById("sec").innerHTML = secString;
    setTimeout(stopWatch, 10);
  }
}
