"use strict";
// function get Ele
function getEle(el) {
  return document.querySelector(el);
}
// parseUser
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password
  );
  return user;
}

//create class user
class User {
  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    // get API
    this.getAPI = async function (country, category, pageSize, page, apiKey) {
      try {
        let response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
        );
        let APIdata = await response.json();
        return APIdata;
      } catch {
        console.error("API error");
      }
    };
  }
}

//Create task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
