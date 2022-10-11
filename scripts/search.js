"use strict";
// get element
const searchInputEl = getEle("#input-query");
const searchBtnEl = getEle("#btn-submit");
const previousBtnEl = getEle("#btn-prev");
const nextBtnEl = getEle("#btn-next");
const pageNumberEl = getEle("#page-num");
const newContentEl = getEle("#news-container");

// Variable
const PAGESIZE = 4;
const PAGE = "1";
const APIKEY = "a431d6c89d344585a995b2706611a13d";

// FUNCTION
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

// function search and render result API
const getSearchAPI = async function (keyword, pageSize, page, apiKey) {
  try {
    let dataSearch = await fetch(
      `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
    );
    dataSearch = await dataSearch.json();
    const totalResults = dataSearch.totalResults;
    // render search content
    dataSearch.articles.forEach((value) => {
      //create search div
      const div = document.createElement("div");
      // add content in search div tags
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
  } catch {
    console.error(`ERROR`);
  }
};

// function check validate
function checkValidate() {
  if (searchInputEl.value === "") {
    alert("Please type your search keyword!");
    return;
  }
}

// search active
searchBtnEl.addEventListener("click", async () => {
  //check validate
  checkValidate();
  // clear search result when you click
  newContentEl.innerHTML = "";
  // get value keyword
  const KEYWORD = searchInputEl.value;
  // search and render result
  const resultSearch = await getSearchAPI(KEYWORD, PAGESIZE, PAGE, APIKEY);
});

//btn next
nextBtnEl.addEventListener("click", async () => {
  // increase 1 when u click
  pageNumberEl.textContent++;
  // check show or hide previous btn
  hideAndShowPreViousBtn();
  // clear content
  newContentEl.innerHTML = "";
  // get value keyword
  const KEYWORD = searchInputEl.value;
  // render new content
  const totalResults = await getSearchAPI(
    KEYWORD,
    PAGESIZE,
    // use search page number to get api
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
  // get value keyword
  const KEYWORD = searchInputEl.value;
  // render new content
  const totalResults = await getSearchAPI(
    KEYWORD,
    PAGESIZE,
    // use search page number to get api
    pageNumberEl.textContent,
    APIKEY
  );
  // check show or hide next btn
  hideAndShowNextBtn(totalResults);
});
