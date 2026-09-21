/* about.js  -  small extra work for the about page */

document.addEventListener("DOMContentLoaded", function () {
  // show today's date at the bottom of the page
  var today = new Date();
  var p = document.createElement("p");
  p.className = "date-line";
  p.innerHTML = "Page opened on : " + today.toLocaleDateString("en-IN") +
                " at " + today.toLocaleTimeString("en-IN");
  document.getElementsByClassName("container")[0].appendChild(p);
});
