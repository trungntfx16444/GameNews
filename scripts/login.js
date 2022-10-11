"use strict";

//// GET ELEMENT
const loginBtnEl = document.querySelector("#btn-submit");
const userNameEl = document.querySelector("#input-username");
const passwordEl = document.querySelector("#input-password");
//////////////////////////////////////////////////////////////////////

//// FUNCTION
const checkValid = function () {
  if (userNameEl.value === "") {
    alert("Please type username!");
    return;
  }
  if (passwordEl.value === "") {
    alert("Please type passowrd!");
    return;
  }
  return true;
};

// login
// find username
const checkUserName = function (data, valid) {
  let user;
  data.forEach((value) => {
    if (value.userName === valid) {
      user = value;
    }
  });
  return user;
};
// check password
const checkPassword = function (user, passValid) {
  if (user.password === passValid) {
    return true;
  }
  return false;
};
//login
const login = function (data, userValid, passValid) {
  //check username
  let user = checkUserName(data, userValid);
  // user name no exist
  if (!user) {
    alert("User name no exist!");
    return;
  }
  //user name exits
  let result = checkPassword(user, passValid);
  // if correct password
  if (result === true) {
    alert("Login success!");
    // save user information
    saveToStorage(`USER_LOGIN`, user);
    // move to page home
    window.location.href = "../index.html";
  } else {
    // if wrong pass
    alert("Wrong password");
    return;
  }
};
/////////////////////////////////////////////////////////////////////
loginBtnEl.addEventListener("click", () => {
  // if check validate
  if (!checkValid()) return;
  // get data users form localstorage
  const userData = getFromStorage("USER_ARRAY");
  // login active
  login(userData, userNameEl.value, passwordEl.value);
});
