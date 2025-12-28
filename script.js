function opnefeature() {
  let allElems = document.querySelectorAll(".elem");
  let allFullElems = document.querySelectorAll(".fullElems");
  let allFullElemBackbtn = document.querySelectorAll(".back");
  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      allFullElems[elem.id].style.display = "block";
    });
  });

  allFullElemBackbtn.forEach((back) => {
    back.addEventListener("click", () => {
      allFullElems[back.id].style.display = "none";
    });
  });
}
opnefeature();

let currentTask = [];

if (localStorage.getItem("currentTask")) {
  currentTask = JSON.parse(localStorage.getItem("currentTask"));
    renderTask(); 

} else {
  console.log("task list is empty");
}

function renderTask() {
  let allTask = document.querySelector(".allTask");
  let sum = "";
  currentTask.forEach((elem) => {
    console.log(elem.imp);
    sum =
      sum +
      `<div class="task">
   <h2 onclick="toggleFullText(this)">
            <span class="task-text" data-full="${elem.task}">
              ${elem.task}
            </span>
            <span class="${elem.imp}">imp</span>
          </h2>
    <details>
<summary></summary>
        <p>${elem.details}</p>
    
    </details>
<button>Mark as Completed</button>
</div>`;
  });

  allTask.innerHTML = sum;
}
function toggleFullText(h2) {
  const text = h2.querySelector(".task-text");
  text.classList.toggle("show-full");
}


let form = document.querySelector(".addTask form");
let input = document.querySelector(".addTask form input");
let taskDetailsArea = document.querySelector(".addTask form textarea");
let checkbox = document.querySelector(".addTask form .checkBox input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  currentTask.push({
    task: input.value,
    details: taskDetailsArea.value,
    imp: checkbox.checked,
  });
  localStorage.setItem("currentTask", JSON.stringify(currentTask));
  input.value = "";
  taskDetailsArea.value = "";
  checkbox.checked = false;
  renderTask();
});
