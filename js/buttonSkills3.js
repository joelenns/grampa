var wWorker;

var element2 = "";
var view = document.defaultView;
var myWindow = window;
var height11 = 0;
var height12 = 0;
var height13 = 0;

let scrollPixelBody = 0;
let scrollPixelElement = 0;
// Get the Content Menu and Go to Top buttons
const contentmenubutton = document.getElementById("myBtn2");
const gototopbutton = document.getElementById("myBtn");

// When the user scrolls down 200px from the top of the document
//   show those sticky buttons (Content Menu and Go to Top)
window.onscroll = function() {scrollFunction()};
function scrollFunction() {

element2 = "";
view = document.defaultView;
myWindow = window;
if (document.hasFocus()) {
  element2 = document.activeElement.tagName;
} else {
  myWindow.focus();
  element2 = document.activeElement.tagName;
}


  scrollPixelBody = document.body.scrollTop;
  scrollPixelElement = document.documentElement.scrollTop;
  if (scrollPixelBody > 200 || scrollPixelElement > 200) {
    contentmenubutton.style.display = "block";
  } else {
    contentmenubutton.style.display = "none";
  }
  if (scrollPixelBody > 400 || scrollPixelElement > 400) {
    gototopbutton.style.display = "block";
  } else {
    gototopbutton.style.display = "none";
  }
}

// When the user clicks on gototopbutton, scroll to the top of the document
function topFunction() {
  contentMenu();
  document.body.scrollTop = 0;
  document.body.scrollLeft = 0;
  document.documentElement.scrollTop = 0;
  document.documentElement.scrollLeft = 0;
}

function scrollToBookmark(verticalPixels) {
  document.body.scrollTop = verticalPixels;
  document.body.scrollLeft = 0;
  document.documentElement.scrollTop = verticalPixels;
  document.documentElement.scrollLeft = 0;
}

// myBtn2.onclick (Content Menu), scroll out the Content Menu 
//   [which will display CreateBookmark and BookmarkMenu]
function contentMenu() {

let height = view.innerHeight;
let height2 = view.outerHeight;
let height3 = myWindow.innerHeight;
let height4 = myWindow.outerHeight;
let height5 = myWindow.screenTop;
let height6 = myWindow.screenY;
let height7 = myWindow.pageYOffset;
let height8 = element2.offsetTop;
//let height9 element2.getComputedStyle().perspective-origin;
//let height10 element2.getComputedStyle().transform-origin;

  const element = document.documentElement;
  //  ignore horizonal scroll, e.g., let x = element.scrollLeft;
  let y = element.scrollTop;
  let bookmarkname = "";
  let bmarkname = location.pathname;
  let bmarkname2 = "";
  let bmarkname3 = "";
  let index = 0;
  // remove everything up to and including last pathname forwardslash
  index = bmarkname.lastIndexOf('\/');
  if (index > -1) {
    bmarkname2 = bmarkname.substr(index + 1);
//    index = bmarkname2.lastIndexOf('\/');
//    if (index > -1) {
//      bmarkname = bmarkname2.substr(index);
//      bmarkname2 = bmarkname;
//    } else {
//    }
  } else {
  }
  // remove '.html'
  bmarkname3 = bmarkname2.replace(".html", "");
  if (bmarkname3.length == 0) {
    // when URL / href contains only protocol:hostname
    bmarkname3 = "index";
  } else {
  }
  bookmarkname = bmarkname3 + "_" +
    checkTime(localStorage.length + 1) + "_" +
    stampdate();
  storeBookmark (bookmarkname, y.toFixed()); 

  height11 = myWindow.pageYOffset;
  element2.scrollIntoView(false); //scrollToBottom
  height12 = myWindow.pageYOffset;
  element2.scrollIntoView(true); //scrollToTop
  height13 = myWindow.pageYOffset;

  document.getElementById ("contentBookmarks").innerHTML =
    getAllStoredBookmarks() + "<br>" +
"height1 view.innerHeight =" + height + "<br>" +
"height2 view.outerHeight =" + height2 + "<br>" +
"height3 myWindow.innerHeight =" + height3 + "<br>" +
"height4 myWindow.outerHeight =" + height4 + "<br>" +
"height5 myWindow.screenTop =" + height5 + "<br>" +
"height6 myWindow.screenY =" + height6 + "<br>" +
"height7 myWindow.pageYOffset =" + height7 + "<br>" +
"height8 element2.offsetTop =" + height8 + "<br>" +
"height11 element2 before scrolling it" + height11 + "<br>" +
"height12 element2 scrollToBottom" + height12 + "<br>" +
"height13 element2 scrollToTop" + height13;
//"height9 element2.getComputedStyle().perspective-origin =" + height9 + "<br>" +
//"height10 element2.getComputedStyle().transform-origin =" + height10 + "<br>"

}

function getAllStoredBookmarks() {
  let str = "";
  let l = localStorage.length;
  let x = "";
  let i = 0;
  if (l > 0) {
    str = l + " Bookmarks " +
      " <button type=" + "button" +
      " onclick=" +
      "deleteAllStoredBookmarks(" +
      ")>× Delete all " + l + " 🔖 Bookmarks" +
      "</button><br>";
    for (i = 0; i < l; i++) {
      x = localStorage.key(i);
      str += x +
     " <button type=" +
     "button" +
     " onclick=" +
     "scrollToBookmark(" +
     localStorage.getItem(x) +
     ")> Scroll to 🔖 " +
     localStorage.getItem(x) +
     "</button>" +
     " <button type=" +
     "button" +
     " onclick=" +
     "delBookmark(" +
     '\"' +
     x +
     '\"' +
     ")> × " +
     "</button><br>";
    }
  } else {
  }
  return str;
}

function delBookmark (name) {
  localStorage.removeItem(name);
  document.getElementById ("contentBookmarks").innerHTML =
    getAllStoredBookmarks();
}

function deleteAllStoredBookmarks() {
  localStorage.clear();
/*
  let l = localStorage.length;
  let i = 0;
  if (l > 0) {
    for (i = 0; i < l; i++) {
      localStorage.removeItem(localStorage.key(i));
    }
  } else {
  }
*/
  document.getElementById ("contentBookmarks").innerHTML =
    getAllStoredBookmarks();
}

function storeBookmark (name, value) {
  if (typeof(Storage) !== "undefined") {
    // Code for localStorage or sessionStorage
    localStorage.setItem(name, value);
    //localStorage.name = value;
    } else {
    // No web storage Support.
  }
}

function stampdate () {
  const today = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const wkdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dateStamp = "";
  let wkday = wkdays[today.getDay()];
  let mo = months[today.getMonth()];
  let moday = today.getDate();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  dateStamp =  today.getFullYear() + "_" +
    mo + "_" + moday + "_" +
    wkday + "_" + h + "_" + m + "_" + s;
  return dateStamp;
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function startWorker() {
  if(typeof(Worker) !== "undefined") {
    if(typeof(wWorker) == "undefined") {
      wWorker = new Worker("js/demo_workers.js");
    }
    wWorker.onmessage = function(event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
  }
}

function stopWorker() { 
  wWorker.terminate();
  wWorker = undefined;
}

function myDarkModeFunction() {
   var elementDarkMode = document.body;
   elementDarkMode.classList.toggle("dark-mode");
}