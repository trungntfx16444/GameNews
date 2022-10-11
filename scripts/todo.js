"use strict";
//get Element
const inputTaskEle = getEle("#input-task");
const btnAddEl = getEle("#btn-add");
const todoListUlEl = getEle("#todo-list");
const delTaskEl = getEle(".close");
const doneEl = getEle(".checked");
////////////////////////////////////////////////////////

// FUNCTION

// clear todo list
function renderTodoList() {
  //clear todoList
  todoListUlEl.innerHTML = "";
  //add li
  todoArr.forEach((value, index) => {
    // if owner = user name login => render to do list
    if (value.owner === userCurrent.userName) {
      // create new li tag
      const li = document.createElement("li");
      li.innerHTML = `${value.task} <span class="close" onclick="delTodo(${index})">x</span>`;
      // if isDone = 1 => add class checked
      if (value.isDone === 1) {
        li.classList.add("checked");
      }
      //create click even
      li.addEventListener("click", function () {
        //add class checked
        checked(li, index);
      });
      // add li in ul
      todoListUlEl.appendChild(li);
    }
  });
}
// checked
function checked(li, index) {
  li.classList.add("checked");
  // change isDone value = 1;
  todoArr.forEach((value, i) => {
    if (i === index) {
      value.isDone = 1;
    }
  });
  // save new data to localStorage
  saveToStorage("USER_TODO", todoArr);
}
// delTodo
function delTodo(index) {
  // search form array todolist if index todolist = index element => delete
  todoArr.forEach((value, i) => {
    if (i === index) {
      todoArr.splice(i, 1);
    }
  });
  // save new data to localStorage
  saveToStorage("USER_TODO", todoArr);
  // render todo list
  renderTodoList();
}
///////////////////////////////////////////////////////

// take data userLog form localStorage
const userCurrent = getFromStorage("USER_LOGIN");

// create todoArr to localStorage
let todoArr = getFromStorage("USER_TODO");

// todoArr = null => create new Arr
if (todoArr === null) todoArr = new Array();

// render todo List user
renderTodoList();

// add todo
btnAddEl.addEventListener("click", () => {
  // create to do task
  const userTask = new Task(
    inputTaskEle.value,
    userCurrent.userName,
    doneEl.value
  );
  // add to do to arr
  todoArr.push(userTask);
  // save
  saveToStorage("USER_TODO", todoArr);
  // render to do list
  renderTodoList();
});
