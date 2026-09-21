/* home.js  -  shows the trending products on the home page */

function makeCard(p) {
  var html = "";
  html += '<div class="card">';
  html += '  <a href="product.html?id=' + p.id + '">';
  html += '    <div class="img-box"><img src="' + p.img + '" alt="' + p.name + '"></div>';
  html += '    <p class="tag">Just In</p>';
  html += "    <h3>" + p.name + "</h3>";
  html += '    <p class="sub">' + p.sub + "</p>";
  html += '    <p class="sub">' + p.colours + " Colours</p>";
  html += '    <p class="price">MRP : ' + money(p.price) + "</p>";
  html += "  </a>";
  html += "</div>";
  return html;
}

function showFeatured() {
  var box = document.getElementById("featured-products");
  var html = "";
  for (var i = 0; i < 8; i++) {
    html = html + makeCard(PRODUCTS[i]);
  }
  box.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", showFeatured);
