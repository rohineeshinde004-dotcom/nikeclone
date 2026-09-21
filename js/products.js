/* products.js  -  search, filter and sort on the products page */

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

function showProducts() {
  var list = [];
  var word = document.getElementById("search-box").value.toLowerCase();
  var cat = document.getElementById("cat-select").value;
  var sort = document.getElementById("sort-select").value;

  // ---- step 1 : search + category filter ----
  for (var i = 0; i < PRODUCTS.length; i++) {
    var p = PRODUCTS[i];
    var text = (p.name + " " + p.cat + " " + p.sub + " " + p.desc).toLowerCase();

    var matchWord = true;
    if (word != "") {
      if (text.indexOf(word) == -1) {
        matchWord = false;
      }
    }

    var matchCat = true;
    if (cat != "All") {
      if (p.cat != cat) {
        matchCat = false;
      }
    }

    if (matchWord == true && matchCat == true) {
      list.push(p);
    }
  }

  // ---- step 2 : sorting ----
  if (sort == "low") {
    list.sort(function (a, b) { return a.price - b.price; });
  }
  if (sort == "high") {
    list.sort(function (a, b) { return b.price - a.price; });
  }
  if (sort == "name") {
    list.sort(function (a, b) { return a.name.localeCompare(b.name); });
  }

  // ---- step 3 : print on screen ----
  var html = "";
  for (var j = 0; j < list.length; j++) {
    html = html + makeCard(list[j]);
  }
  document.getElementById("product-list").innerHTML = html;

  var msg = document.getElementById("no-result");
  if (list.length == 0) {
    msg.style.display = "block";
  } else {
    msg.style.display = "none";
  }

  var info = list.length + " Products";
  if (word != "") {
    info = info + ' for "' + word + '"';
  }
  document.getElementById("result-text").innerHTML = info;
}

document.addEventListener("DOMContentLoaded", function () {
  // if user clicked a category on home page, select it here
  var cat = getQuery("cat");
  if (cat != null) {
    document.getElementById("cat-select").value = cat;
  }
  showProducts();

  // change the big heading as per the category
  var heading = document.getElementById("page-heading");
  var chosen = document.getElementById("cat-select").value;
  if (chosen != "All") {
    heading.innerHTML = chosen + "'s Shoes & Gear";
  }

  // search also works while typing
  document.getElementById("search-box").addEventListener("keyup", showProducts);
});
