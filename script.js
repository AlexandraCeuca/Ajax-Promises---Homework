const baseUrl = new URL ("https://api.nasa.gov/planetary/apod");
const key = "twGLnwJX8j7xeKEBfNZMcPjXzxkxtSfQjFSb3x9A";

baseUrl.searchParams.set('api_key', key)

const title = document.getElementById("title");
const image = document.getElementById("picture");
const loader = document.getElementById("loader");
const errorContainer = document.getElementById("error");

image.onload = function () {
    hideLoader()
    image.style.visibility = "visible";
};

getAstronomyPictureOfTheDay();

function getAstronomyPictureOfTheDay(date) {
    image.style.visibility = "hidden";
    displayLoader();
    const formatedDate= date ? dateFormat(date) : dateFormat(new Date());

    baseUrl.searchParams.set('date', formatedDate)
   
    fetch(baseUrl.href, { method: "GET" }) 
        .then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (jsonResp) {
                    hideError();
                    setPictureTitle ("Today's picture: " + jsonResp.title);
                    setPictureURL(jsonResp.url);         
                })
                .catch(function (error) {
                    return displayError(error || "Please try again! Something is wrong")
                })
            } else {
                return response.json().then(function (jsonResp) {
                    displayError(jsonResp.msg) 
                })
            }
        })
        .catch(function () {
            return displayError(error || "Please try again! Something is wrong")
        })
        
}


function setPictureURL(imageUrl) {
    image.src = null;
    image.src= imageUrl;
    image.style.marginBottom = "30px";
}

function setPictureTitle(imageTitle) {
    title.innerText = imageTitle;
    title.style.marginBottom = "30px";
    title.style.marginTop = "30px";
}

function fetchImageByDate () {
    let datePicker = document.getElementById("datePicker");
    console.log(datePicker.value);
    getAstronomyPictureOfTheDay(datePicker.value);
}

function dateFormat (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
    }

function displayLoader() {
    loader.style.opacity = 0.5;
    loader.style.display = "block";
}
  
function hideLoader() {
    loader.style.opacity = 1;
    loader.style.display = "none";
}
 function displayError(error) {
    hideLoader();
    errorContainer.innerText = error;
    image.style.display="none";
    title.style.display="none";
 }
 function hideError() {
    errorContainer.innerText = "";
 }
