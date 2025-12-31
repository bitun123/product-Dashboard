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

 function todoList(){
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

 todoList()



let hours =  Array.from({length: 18},(elem,idx)=>`${6+ idx} :00 - ${7+idx}:00`)
let dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};
let dayPlanner = document.querySelector('.day-planner');
let wholedaySum = ''

hours.forEach((elem,idx)=>{
  let saveData = dayPlanData[idx] || ""
wholedaySum = wholedaySum + `   <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id = ${idx} type="text" placeholder="....." value = ${saveData}>
                </div>
             `
})

dayPlanner.innerHTML  = wholedaySum;
let dayPlannerInput  = document.querySelectorAll('.day-planner input');
dayPlannerInput.forEach((elem)=>{
elem.addEventListener('input',function(){
dayPlanData[elem.id] = elem.value;
localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData));
})
})