/* ============================================================
   main.js  -  common code used by all pages
   BSc IT Mini Project  -  Nike Store Clone
   ============================================================ */

/* ---------- 1. PRODUCT LIST (our small database) ----------
   img  = photo of the product.
   Put your photos in the "images" folder with exactly these
   file names. Read  images/HOW_TO_ADD_PHOTOS.txt
------------------------------------------------------------ */
var PRODUCTS = [
  { id: 1,  name: "Nike Air Force 1 '07",            sub: "Men's Shoes",               cat: "Men",         price: 8195,  old: 9295,  colours: 3, img: "images/product1.jpg",  desc: "The radiance lives on in the Nike Air Force 1, the basketball original that puts a fresh spin on what you know best: crisp leather, bold colours and the perfect amount of flash." },
  { id: 2,  name: "Nike Dunk Low Retro",             sub: "Men's Shoes",               cat: "Men",         price: 9195,  old: 10795, colours: 2, img: "images/product2.jpg",  desc: "Created for the hardwood but taken to the streets, this basketball icon returns with crisp overlays and original team colours." },
  { id: 3,  name: "Nike Air Max 90",                 sub: "Men's Shoes",               cat: "Men",         price: 11895, old: 13495, colours: 4, img: "images/product3.jpg",  desc: "Nothing as fly, nothing as comfortable. The Air Max 90 stays true to its roots with the iconic Waffle sole, stitched overlays and visible Max Air cushioning." },
  { id: 4,  name: "Nike Pegasus 41",                 sub: "Men's Road Running Shoes",  cat: "Men",         price: 12795, old: 14295, colours: 3, img: "images/product4.jpg",  desc: "Responsive cushioning in the Pegasus gives you an energised ride for everyday road running. A springy feeling from two Air Zoom units helps you push the pace." },
  { id: 5,  name: "Nike Revolution 7",               sub: "Men's Road Running Shoes",  cat: "Men",         price: 3695,  old: 4295,  colours: 5, img: "images/product5.jpg",  desc: "Soft foam cushioning and a breathable knit upper make the Revolution 7 an easy pick for daily runs and gym sessions." },
  { id: 6,  name: "Nike Court Vision Low",           sub: "Women's Shoes",             cat: "Women",       price: 5995,  old: 6995,  colours: 3, img: "images/product6.jpg",  desc: "Inspired by the classic basketball shoes of the 80s, the Court Vision keeps things clean with a smooth upper and a rubber cupsole." },
  { id: 7,  name: "Nike V2K Run",                    sub: "Women's Shoes",             cat: "Women",       price: 10495, old: 11995, colours: 2, img: "images/product7.jpg",  desc: "Running style from the year 2000 is back. Metallic details, layered mesh and a low profile sole give this pair its retro look." },
  { id: 8,  name: "Nike Blazer Mid '77 Vintage",     sub: "Women's Shoes",             cat: "Women",       price: 8295,  old: 9495,  colours: 4, img: "images/product8.jpg",  desc: "Praised for its classic style, the Blazer Mid '77 brings a vintage look with exposed foam and an old school midsole finish." },
  { id: 9,  name: "Nike Air Force 1 LE",             sub: "Older Kids' Shoes",         cat: "Kids",        price: 6495,  old: 7295,  colours: 2, img: "images/product9.jpg",  desc: "The smaller version of the classic. Durable leather and a padded collar keep young feet comfortable all day at school and play." },
  { id: 10, name: "Nike Dri-FIT Sportswear Tee",     sub: "Men's T-Shirt",             cat: "Men",         price: 1795,  old: 2195,  colours: 6, img: "images/product10.jpg", desc: "Dri-FIT technology moves sweat away from your skin so you stay dry and comfortable during training." },
  { id: 11, name: "Nike Sportswear Club Fleece",     sub: "Women's Hoodie",            cat: "Women",       price: 4495,  old: 5295,  colours: 3, img: "images/product11.jpg", desc: "Soft brushed fleece and a roomy hood make this pullover an everyday favourite for cold mornings." },
  { id: 12, name: "Nike Brasilia 9.5 Duffel Bag",    sub: "Training Duffel Bag (60L)", cat: "Accessories", price: 2795,  old: 3295,  colours: 2, img: "images/product12.jpg", desc: "Built to carry your training gear, this duffel has a large main space, a shoe pocket and padded straps." }
];

/* ---------- 1B. IF A PHOTO IS MISSING ----------
   If an image file is not found, a grey box is shown in its place
   so that the design of the website does not break.
------------------------------------------------- */
window.addEventListener("error", function (e) {
  if (e.target && e.target.tagName == "IMG") {
    e.target.src = "https://placehold.co/600x600/f5f5f5/999999?text=Add+photo+here";
  }
}, true);

/* ---------- 2. SMALL HELPER FUNCTIONS ---------- */

// show price in rupees format
function money(n) {
  // Nike writes the price like  MRP : Rs. 8 195.00
  return "\u20B9 " + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

// find one product by its id
function getProduct(id) {
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id == id) {
      return PRODUCTS[i];
    }
  }
  return null;
}

// read a value from the url  (example: product.html?id=3)
function getQuery(key) {
  var params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/* ---------- 3. CART FUNCTIONS (saved in localStorage) ---------- */

function getCart() {
  var data = localStorage.getItem("cart");
  if (data == null) {
    return [];
  }
  return JSON.parse(data);
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  showCartCount();
}

function addToCart(id, size, qty) {
  var cart = getCart();
  var found = false;

  // if same product + same size already in cart then only increase qty
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id == id && cart[i].size == size) {
      cart[i].qty = cart[i].qty + qty;
      found = true;
    }
  }
  if (found == false) {
    cart.push({ id: Number(id), size: size, qty: qty });
  }
  saveCart(cart);
}

function removeFromCart(index) {
  var cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function changeQty(index, change) {
  var cart = getCart();
  cart[index].qty = cart[index].qty + change;
  if (cart[index].qty < 1) {
    cart[index].qty = 1;   // quantity can not go below 1
  }
  saveCart(cart);
}

// total number of items (used for the number near cart icon)
function cartCount() {
  var cart = getCart();
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total = total + cart[i].qty;
  }
  return total;
}

// sub total of all items
function cartSubTotal() {
  var cart = getCart();
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    var p = getProduct(cart[i].id);
    if (p != null) {
      total = total + (p.price * cart[i].qty);
    }
  }
  return total;
}

// shipping rule : free above 2999 otherwise 99
function shippingCharge() {
  var sub = cartSubTotal();
  if (sub == 0 || sub >= 2999) {
    return 0;
  }
  return 99;
}

function cartGrandTotal() {
  return cartSubTotal() + shippingCharge();
}

function showCartCount() {
  var el = document.getElementById("cart-count");
  if (el != null) {
    el.innerHTML = cartCount();
  }
}

/* ---------- 4. USER / LOGIN FUNCTIONS ---------- */

function getUsers() {
  var data = localStorage.getItem("users");
  if (data == null) {
    return [];
  }
  return JSON.parse(data);
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function currentUser() {
  return localStorage.getItem("currentUser");
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  alert("You are logged out.");
  window.location.href = "index.html";
}

// makes the CSV text of all users  (this file opens in MS Excel)
function makeCSV() {
  var users = getUsers();
  var text = "Email,Password\n";
  for (var i = 0; i < users.length; i++) {
    text = text + users[i].email + "," + users[i].password + "\n";
  }
  return text;
}

// download data.csv  -> open it with Excel
function downloadCSV() {
  var users = getUsers();
  if (users.length == 0) {
    alert("No user data found. Please create an account first.");
    return;
  }
  var blob = new Blob([makeCSV()], { type: "text/csv" });
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.csv";
  link.click();
}

/* ---------- 5. HEADER SEARCH + LOGIN LINK ---------- */

function doSearch(event) {
  event.preventDefault();
  var box = document.getElementById("search-box");
  window.location.href = "products.html?q=" + encodeURIComponent(box.value);
  return false;
}

function showUserLink() {
  var link = document.getElementById("user-link");
  if (link == null) {
    return;
  }
  var user = currentUser();
  if (user != null) {
    link.innerHTML = "Logout (" + user.split("@")[0] + ")";
    link.href = "#";
    link.onclick = function () {
      logoutUser();
      return false;
    };
  } else {
    link.innerHTML = "Login";
    link.href = "login.html";
  }
}

/* ---------- 6. RUN WHEN PAGE IS LOADED ---------- */
document.addEventListener("DOMContentLoaded", function () {
  showCartCount();
  showUserLink();

  // keep the searched word inside the search box
  var q = getQuery("q");
  var box = document.getElementById("search-box");
  if (q != null && box != null) {
    box.value = q;
  }
});
