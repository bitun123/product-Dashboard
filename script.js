// ================== FEATURE OPEN / CLOSE ==================
function openFeature() {
  const elems = document.querySelectorAll(".elem");
  const fullElems = document.querySelectorAll(".fullElems");
  const backBtns = document.querySelectorAll(".back");

  elems.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElems[elem.id].style.display = "block";
    });
  });

  backBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      fullElems[btn.id].style.display = "none";
    });
  });
}
openFeature();

// ================== TODO -LIST ==================

function todoList() {
  let currentTask = JSON.parse(localStorage.getItem("currentTask")) || [];

  // ================== DOM REFERENCES ==================
  const taskContainer = document.querySelector(".allTask");
  const form = document.querySelector(".addTask form");
  const input = form.querySelector("input");
  const textarea = form.querySelector("textarea");
  const checkbox = form.querySelector(".checkBox input");

  // ================== RENDER ==================
  function renderTask() {
    taskContainer.innerHTML = currentTask
      .map(
        (task, index) => `
      <div class="task">
        <h2 class="task-title">
          <span class="task-text">${task.task}</span>
          <span class="${task.imp}">imp</span>
        </h2>

        <details>
          <summary></summary>
          <p>${task.details}</p>
        </details>

        <button data-index="${index}">Mark as Completed</button>
      </div>
    `
      )
      .join("");
  }

  renderTask();

  // ================== ADD TASK ==================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    currentTask.push({
      task: input.value.trim(),
      details: textarea.value.trim(),
      imp: checkbox.checked,
    });

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    form.reset();
    renderTask();
  });

  // ================== DELETE TASK (Event Delegation) ==================
  taskContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = Number(e.target.dataset.index);

      currentTask.splice(index, 1);
      localStorage.setItem("currentTask", JSON.stringify(currentTask));

      renderTask();
    }

    // Toggle full text
    if (e.target.classList.contains("task-text")) {
      e.target.classList.toggle("show-full");
    }
  });
}

todoList();
// ================== DAILY-PLAN ==================
function dailyPlan() {
  let hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx} :00 - ${7 + idx}:00`
  );
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  let dayPlanner = document.querySelector(".day-planner");
  let wholedaySum = "";

  hours.forEach((elem, idx) => {
    let saveData = dayPlanData[idx] || "";
    wholedaySum =
      wholedaySum +
      `   <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id = ${idx} type="text" placeholder="....." value =" ${saveData}">
                </div>
             `;
  });

  dayPlanner.innerHTML = wholedaySum;
  let dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach((elem) => {
    elem.addEventListener("input", function (e) {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlan();

// ================== MOTIVATION ==================

function motivation() {
  let motivationAuthor = document.querySelector(".motivation-3 h1");
  let motivationQuote = document.querySelector(".motivation-2 p");
  async function fetchQuote() {
    const response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();
    motivationQuote.innerHTML = `${data.quote} ,,`;
    motivationAuthor.innerHTML = `- ${data.author}`;
  }
  fetchQuote();
}
motivation();

// ================== PROMODORO ==================
function promodoro() {
  // ================= SELECT =================
  const headings = document.querySelectorAll(".heading h1");
  const timerText = document.querySelector(".timer h2");
  const startBtn = document.querySelector(".btn .promodoro-btn2");
  const pouseBtn = document.querySelector(".btn .promodoro-btn3");
  const resetBtn = document.querySelector(".btn .promodoro-btn1");

  // ================= TIME VALUES =================
  const TIMES = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 10 * 60,
  };

  // ================= DEFAULT STATE =================
  let currentMode = "pomodoro"; // ✅ default
  let totalSeconds = TIMES[currentMode];
  let interval = null;

  // ================= UPDATE TIMER =================
  function updateTimer() {
    let min = Math.floor(totalSeconds / 60);
    let sec = totalSeconds % 60;
    sec = sec < 10 ? "0" + sec : sec;
    timerText.textContent = `${String(min).padStart(2, "0")}:${String(
      sec
    ).padStart(2, "0")}`;
  }

  // ================= MODE CHANGE =================
  headings.forEach((h) => {
    h.addEventListener("click", () => {
      // active class switch
      headings.forEach((x) => x.classList.remove("active"));
      h.classList.add("active");

      // detect mode
      if (h.classList.contains("heading1")) currentMode = "pomodoro";
      if (h.classList.contains("heading2")) currentMode = "short";
      if (h.classList.contains("heading3")) currentMode = "long";

      // reset timer (DO NOT AUTO START)
      clearInterval(interval);
      totalSeconds = TIMES[currentMode];
      updateTimer();
    });
  });

  // ================= START BUTTON =================

  startBtn.addEventListener("click", () => {
    clearInterval(interval);
    interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        clearInterval(interval);
      }
    }, 1000);
  });

  pouseBtn.addEventListener("click", () => {
    clearInterval(interval);
  });

  resetBtn.addEventListener("click", () => {
    clearInterval(interval);

    totalSeconds = TIMES[currentMode];

    updateTimer();
  });

  // ================= INITIAL LOAD =================
  headings.forEach((h) => h.classList.remove("active"));
  document.querySelector(".heading1").classList.add("active"); // ✅ pomodoro active
  updateTimer(); // ✅ 25:00 show
}

promodoro();

// ================== DAILYgOALS ==================
function dailyGoals(){
  
let form = document.querySelector(".addgoals form");
let inputValue = document.querySelector(".addgoals form input");
let allGoals = document.querySelector(".allGoals");

  let  currentGoals = JSON.parse(localStorage.getItem("currentGoals")) || [];

function renderGoals() {
  allGoals.innerHTML = currentGoals.map((goal, idx) => {
return  `            <div class="goals">
                        <h1> ${goal.goals} </h1>
                        <button id= "${idx}">complete</button>
                        </div> `
  })
.join("");
}
renderGoals();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentGoals.push({
    goals: inputValue.value
  });
   localStorage.setItem("currentGoals", JSON.stringify(currentGoals));
  inputValue.value = "";
  renderGoals();
});



allGoals.addEventListener("click",(e)=>{

    if (e.target.tagName === "BUTTON") {
      const index = Number(e.target.dataset.idx);

      currentGoals.splice(index, 1);
      localStorage.setItem("currentGoals", JSON.stringify(currentGoals));
      renderGoals();
    }
})
}

dailyGoals();


// let api = "http://api.weatherapi.com/v1/current.json?key=&q=London&aqi=no"
let apiKey = "7fc4ea75c4c146ce9b345237260301";
let locations = 'kolkata'
let city =  document.querySelector('.left #city');
let time = document.querySelector('.left #localtime');
let state = document.querySelector('.left #state');
let temp = document.querySelector('.right #temp span');
let wind = document.querySelector('.right #wind span');
async function weatherCall(){
  let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locations}&aqi=yes`)
let data = await response.json();
city.innerText = data.location.name;
time.innerText = data.location.localtime;
state.innerText = data.location.region;
temp.innerText = data.current.temp_c;
wind.innerText = data.current.wind_kph;

}
weatherCall()


