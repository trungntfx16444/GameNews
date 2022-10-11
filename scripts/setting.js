"use strict";

// get element
const userCurrent = getFromStorage("USER_LOGIN");
const newPerPageEl = getEle("#input-page-size");
const categoryEl = getEle("#input-category");
const saveSettingsEl = getEle("#btn-submit");

// save setting button
saveSettingsEl.addEventListener("click", () => {
  // check validate
  if (newPerPageEl.value === "") {
    alert("Please input your page settings");
    return;
  }
  //create new userSettings
  const userSettings = {
    userName: userCurrent.userName,
    newsPerPage: newPerPageEl.value,
    category: categoryEl.value,
  };
  //save to storage
  saveToStorage(`${userSettings.userName}_SETTINGS`, userSettings);
});
