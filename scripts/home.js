"use strict";

//get Element
const mainContainEl = document.querySelector("#main-content");
const loginModalEl = document.querySelector("#login-modal");
const welcomeMessageEl = document.querySelector("#welcome-message");
const logOutBtnEl = document.querySelector("#btn-logout");

// check use login form storage
const userLogin = getFromStorage("USER_LOGIN");

// if userLogin  exist
if (userLogin !== null) {
  // add class bootstrap display none => hide login and register
  loginModalEl.classList.add("d-none");
  // add content message
  welcomeMessageEl.textContent = `welcome ${userLogin.userName}`;
}

// btn logout
logOutBtnEl.addEventListener("click", () => {
  //remove login user from localStorage
  localStorage.removeItem("USER_LOGIN");
  // move to login page
  window.location.href = "../pages/login.html";
});
