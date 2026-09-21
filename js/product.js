/* product.js  -  single product detail page */

var SIZES = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"];
var selectedSize = "";

function chooseSize(size) {
  selectedSize = size;
  var buttons = document.getElementsByClassName("size-btn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].className = "size-btn";
    if (buttons[i].innerHTML == size) {
      buttons[i].className = "size-btn selected";
    }
  }
  document.getElementById("size-error").innerHTML = "";
}

function changeDetailQty(change) {
  var box = document.getElementById("qty-value");
  var qty = Number(box.innerHTML) + change;
  if (qty < 1) { qty = 1; }
  if (qty > 10) { qty = 10; alert("Maximum 10 items allowed per product."); }
  box.innerHTML = qty;
}

function addProductToCart(id) {
  if (selectedSize == "") {
    document.getElementById("size-error").innerHTML = "Please select a size.";
    return;
  }
  var qty = Number(document.getElementById("qty-value").innerHTML);
  addToCart(id, selectedSize, qty);
  alert("Added to your Bag.");
  window.location.href = "cart.html";
}

function showDetail() {
  var id = getQuery("id");
  var p = getProduct(id);
  var area = document.getElementById("detail-area");

  if (p == null) {
    area.innerHTML = "<h2>Sorry, this product is not available.</h2><br>" +
                     '<a href="products.html" class="btn">Shop All Products</a>';
    return;
  }

  document.title = p.name + ". Nike IN";
  document.getElementById("crumb-name").innerHTML = p.name;

  var off = Math.round(((p.old - p.price) / p.old) * 100);

  var sizeHtml = "";
  for (var i = 0; i < SIZES.length; i++) {
    sizeHtml += '<button class="size-btn" onclick="chooseSize(\'' + SIZES[i] + '\')">UK ' + SIZES[i] + "</button>";
  }

  var html = "";
  html += '<div class="detail-box">';
  html += '  <div class="detail-img"><img src="' + p.img + '" alt="' + p.name + '"></div>';
  html += '  <div class="detail-info">';
  html += "    <h1>" + p.name + "</h1>";
  html += '    <p class="cat-name">' + p.sub + "</p>";
  html += '    <p class="detail-price">MRP : ' + money(p.price);
  html += '      <span class="old-price">' + money(p.old) + "</span>";
  html += '      <span class="off">' + off + "% off</span></p>";
  html += '    <p class="tax-note">incl. of taxes<br>(Also includes all applicable duties)</p>';

  html += '    <div class="size-head"><b>Select Size</b><span>Size Guide</span></div>';
  html += '    <div class="size-box">' + sizeHtml + "</div>";
  html += '    <p class="error-msg" id="size-error"></p>';

  html += '    <div class="qty-row"><h4>Quantity</h4>';
  html += '      <div class="qty-box">';
  html += '        <button onclick="changeDetailQty(-1)">-</button>';
  html += '        <span id="qty-value">1</span>';
  html += '        <button onclick="changeDetailQty(1)">+</button>';
  html += "      </div></div>";

  html += '    <button class="btn full add-btn" onclick="addProductToCart(' + p.id + ')">Add to Bag</button>';
  html += '    <button class="btn btn-outline full" onclick="alert(\'Added to your Favourites.\')">Favourite</button>';

  html += '    <p class="desc">' + p.desc + "</p>";
  html += '    <ul class="point-list">';
  html += "      <li>Free delivery on orders above " + money(2999) + "</li>";
  html += "      <li>Free 30 day returns for members</li>";
  html += "      <li>Cash on delivery available</li>";
  html += "    </ul>";
  html += "  </div>";
  html += "</div>";

  area.innerHTML = html;
  showSimilar(p);
}

function showSimilar(p) {
  var html = "";
  var count = 0;
  for (var i = 0; i < PRODUCTS.length; i++) {
    var s = PRODUCTS[i];
    if (s.cat == p.cat && s.id != p.id && count < 4) {
      html += '<div class="card"><a href="product.html?id=' + s.id + '">';
      html += '  <div class="img-box"><img src="' + s.img + '" alt="' + s.name + '"></div>';
      html += "  <h3>" + s.name + "</h3>";
      html += '  <p class="sub">' + s.sub + "</p>";
      html += '  <p class="price">MRP : ' + money(s.price) + "</p>";
      html += "</a></div>";
      count = count + 1;
    }
  }
  document.getElementById("similar-list").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", showDetail);
