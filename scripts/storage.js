"use strict";
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function getFromStorage(key) {
  let data = localStorage.getItem(key);
  data = JSON.parse(data);
  return data;
}
