/* checkout.js  -  order summary + form checking + place order */

function showSummary() {
  var cart = getCart();

  if (cart.length == 0) {
    alert("Your Bag is empty. Please add a product first.");
    window.location.href = "products.html";
    return;
  }

  var html = "";
  for (var i = 0; i < cart.length; i++) {
    var p = getProduct(cart[i].id);
    if (p == null) { continue; }
    html += '<div class="sum-item">';
    html += '  <img src="' + p.img + '" alt="' + p.name + '">';
    html += "  <div><b>" + p.name + "</b><br>Size UK " + cart[i].size + " | Qty " + cart[i].qty + "</div>";
    html += "  <div>" + money(p.price * cart[i].qty) + "</div>";
    html += "</div>";
  }
  document.getElementById("summary-items").innerHTML = html;

  var sub = cartSubTotal();
  var ship = shippingCharge();
  document.getElementById("sub-total").innerHTML = money(sub);
  if (ship == 0) {
    document.getElementById("ship-charge").innerHTML = "FREE";
  } else {
    document.getElementById("ship-charge").innerHTML = money(ship);
  }
  document.getElementById("grand-total").innerHTML = money(sub + ship);

  // if user is logged in, fill the email box automatically
  var user = currentUser();
  if (user != null) {
    document.getElementById("email").value = user;
  }
}

function getPayment() {
  var radios = document.getElementsByName("pay");
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked == true) {
      return radios[i].value;
    }
  }
  return "Cash on Delivery";
}

function placeOrder() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var address = document.getElementById("address").value.trim();
  var city = document.getElementById("city").value.trim();
  var pincode = document.getElementById("pincode").value.trim();
  var error = document.getElementById("error-msg");

  // ---------- form validation ----------
  if (name == "" || email == "" || phone == "" || address == "" || city == "" || pincode == "") {
    error.innerHTML = "Please fill all the boxes before placing the order.";
    return;
  }
  if (email.indexOf("@") < 1 || email.indexOf(".") < 3) {
    error.innerHTML = "Please enter a correct email id.";
    return;
  }
  if (phone.length != 10 || isNaN(phone) == true) {
    error.innerHTML = "Mobile number must be of 10 digits.";
    return;
  }
  if (pincode.length != 6 || isNaN(pincode) == true) {
    error.innerHTML = "Pin code must be of 6 digits.";
    return;
  }
  error.innerHTML = "";

  // ---------- make order number ----------
  var orderNo = "NK" + Math.floor(Math.random() * 900000 + 100000);

  var today = new Date();
  var delivery = new Date();
  delivery.setDate(today.getDate() + 5);

  var order = {
    orderNo: orderNo,
    name: name,
    email: email,
    phone: phone,
    address: address + ", " + city + " - " + pincode,
    payment: getPayment(),
    items: getCart(),
    subTotal: cartSubTotal(),
    shipping: shippingCharge(),
    total: cartGrandTotal(),
    date: today.toLocaleDateString("en-IN"),
    delivery: delivery.toLocaleDateString("en-IN")
  };

  localStorage.setItem("lastOrder", JSON.stringify(order));

  // cart is cleared after the order is placed
  localStorage.removeItem("cart");

  window.location.href = "order.html";
}

document.addEventListener("DOMContentLoaded", showSummary);
