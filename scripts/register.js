"use strict";
// get ELement
const firstNameEl = getEle("#input-firstname");
const lastNameEl = getEle("#input-lastname");
const userNameEl = getEle("#input-username");
const passwordEl = getEle("#input-password");
const passwordConfirmEl = getEle("#input-password-confirm");
const registerEl = getEle("#btn-submit");
////////////////////////////////////////////////////////////

//// FUNCTION
// get ele
function getEle(el) {
  return document.querySelector(el);
}

// check username
function checkUserName(data, valid) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].userName === valid) return true;
  }
}

//check valild
function checkValid(data) {
  // check empty input
  if (firstNameEl.value === "") {
    alert("please type your first name!");
    return;
  }
  if (lastNameEl.value === "") {
    alert("please type your last name!");
    return;
  }
  if (userNameEl.value === "") {
    alert("please type your user name!");
    return;
  }
  if (passwordEl.value === "") {
    alert("please type your password!");
    return;
  }
  if (passwordConfirmEl.value === "") {
    alert("please confirm your password!");
    return;
  }
  //check length password
  if (passwordEl.value.length < 8) {
    alert("Password must 8 character");
    return;
  }
  //check password with password confirm
  if (passwordEl.value !== passwordConfirmEl.value) {
    alert("Password not correct");
    return;
  }
  // check username
  if (checkUserName(data, userNameEl.value)) {
    alert("user name had exist!");
    return;
  }
  return true;
}
//parse user
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password,
    userData.getAPI
  );
  return user;
}
// register btn
registerEl.addEventListener("click", () => {
  // take data form localStorage
  let userArr = getFromStorage("USER_ARRAY");
  // if data = null => data = new array
  if (userArr === null) userArr = new Array();

  // check valid
  if (checkValid(userArr)) {
    // valid ok
    //  add value in new user
    const user = new User(
      firstNameEl.value,
      lastNameEl.value,
      userNameEl.value,
      passwordEl.value
    );
    // add new user in array
    userArr.push(user);
    // save userArr in localStrorage
    saveToStorage("USER_ARRAY", userArr);
    // move to page login
    window.location.href = "../pages/login.html";
  } else {
    //valid not ok
    return;
  }
});
