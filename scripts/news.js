"use strict";
//get element
const newContentEl = getEle("#news-container");
const previousBtnEl = getEle("#btn-prev");
const nextBtnEl = getEle("#btn-next");
const pageNumberEl = getEle("#page-num");

//variable
// get user current frome local storage
let userCurrent = getFromStorage("USER_LOGIN");

// parse user to class instance to get API function
userCurrent = parseUser(userCurrent);

// get data user current had setting
let userSettings = getFromStorage(`${userCurrent.userName}_SETTINGS`);

// if user don't have any settings from localStorage => create new use setting -> render news
if (userSettings === null)
  userSettings = {
    userName: userCurrent.userName,
    newsPerPage: 3,
    category: "General",
  };
// value get API
const DATA = userCurrent;
const COUNTRY = "au";
// add category settings  to get API
const CATEGORY = userSettings.category;
// add new on page settings to get API
const PAGESIZE = userSettings.newsPerPage;
const PAGE = "1";
const APIKEY = "a431d6c89d344585a995b2706611a13d";

// FUNCTION
// show news
async function showNews(data, country, category, pageSize, page, apiKey) {
  //success
  try {
    //get API data
    const dataNews = await data.getAPI(
      country,
      category,
      pageSize,
      page,
      apiKey
    );
    const totalResults = dataNews.totalResults;
    // render new content
    dataNews.articles.forEach((value) => {
      //create new div
      const div = document.createElement("div");
      // add content in new div tags
      div.innerHTML = `<div class="card mb-3">
                          <div class="row g-0">
                            <div class="col-md-4">
                            <img src="${value.urlToImage}" class="img-fluid rounded-start" alt="pic-new">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${value.title}</h5>
                          <p class="card-text">${value.description}</p>
                           <a href="${value.url}" class="btn btn-primary">View</a>
                        </div>
                       </div>
                      </div>
                      </div>`;
      newContentEl.appendChild(div);
    });
    return totalResults;
    //error
  } catch {
    console.error("ERROR");
  }
}
//function preivous btn
// if page number = 1 -> hiden previous
function hideAndShowPreViousBtn() {
  // check page number = 1
  pageNumberEl.textContent === "1"
    ? // page number = 1 => add class d-none
      previousBtnEl.classList.add("d-none")
    : // page number != 1 => remove class d-none
      previousBtnEl.classList.remove("d-none");
}
//function next btn
function hideAndShowNextBtn(totalResults) {
  const pages = totalResults / PAGESIZE;
  // check page number >= total pages
  pageNumberEl.textContent >= pages
    ? //  page number >= total pages => add d-none class
      nextBtnEl.classList.add("d-none")
    : //  page number < total pages => remove d-none class
      nextBtnEl.classList.remove("d-none");
}

// hide previous btn
hideAndShowPreViousBtn();

// get api data and render new content
showNews(DATA, COUNTRY, CATEGORY, PAGESIZE, PAGE, APIKEY);

//btn next
nextBtnEl.addEventListener("click", async () => {
  // increase 1 when u click
  pageNumberEl.textContent++;
  // check show or hide previous btn
  hideAndShowPreViousBtn();
  // clear content
  newContentEl.innerHTML = "";
  // render new content
  const totalResults = await showNews(
    DATA,
    COUNTRY,
    CATEGORY,
    PAGESIZE,
    // use new page number to get api
    pageNumberEl.textContent,
    APIKEY
  );
  // check show or hide next btn
  hideAndShowNextBtn(totalResults);
});

//btn previous
previousBtnEl.addEventListener("click", async () => {
  //reduce 1 when you click
  pageNumberEl.textContent--;
  // check show or hide previous btn
  hideAndShowPreViousBtn();
  // clear content
  newContentEl.innerHTML = "";
  // render new content
  const totalResults = await showNews(
    DATA,
    COUNTRY,
    CATEGORY,
    PAGESIZE,
    // use new page number to get api
    pageNumberEl.textContent,
    APIKEY
  );
  // check show or hide next btn
  hideAndShowNextBtn(totalResults);
});
