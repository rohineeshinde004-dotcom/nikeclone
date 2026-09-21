/* cart.js  -  shows cart items, quantity buttons and total calculation */

function showCart() {
  var cart = getCart();
  var area = document.getElementById("cart-area");
  var empty = document.getElementById("empty-msg");

  if (cart.length == 0) {
    area.style.display = "none";
    empty.style.display = "block";
    return;
  }
  area.style.display = "flex";
  empty.style.display = "none";

  var html = "";
  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var p = getProduct(item.id);
    if (p == null) { continue; }

    var lineTotal = p.price * item.qty;

    html += '<div class="cart-item">';
    html += '  <img src="' + p.img + '" alt="' + p.name + '">';
    html += '  <div class="item-info">';
    html += "    <h3>" + p.name + "</h3>";
    html += "    <p>" + p.sub + "</p>";
    html += "    <p>Size UK " + item.size + "</p>";
    html += "    <p>MRP : " + money(p.price) + "</p>";
    html += '    <div class="qty-box">';
    html += '      <button onclick="minusQty(' + i + ')">-</button>';
    html += "      <span>" + item.qty + "</span>";
    html += '      <button onclick="plusQty(' + i + ')">+</button>';
    html += "    </div>";
    html += "  </div>";
    html += '  <div class="item-right">';
    html += '    <p class="line-total">' + money(lineTotal) + "</p>";
    html += '    <button class="remove-btn" onclick="removeItem(' + i + ')">Remove</button>';
    html += "  </div>";
    html += "</div>";
  }

  document.getElementById("cart-items").innerHTML = html;
  showTotal();
}

// automatic total calculation
function showTotal() {
  var sub = cartSubTotal();
  var ship = shippingCharge();

  document.getElementById("sub-total").innerHTML = money(sub);
  if (ship == 0) {
    document.getElementById("ship-charge").innerHTML = "FREE";
  } else {
    document.getElementById("ship-charge").innerHTML = money(ship);
  }
  document.getElementById("grand-total").innerHTML = money(sub + ship);

  var note = document.getElementById("ship-note");
  if (ship > 0) {
    note.innerHTML = "Add " + money(2999 - sub) + " more for free delivery.";
  } else {
    note.innerHTML = "You have got free delivery on this order.";
  }
}

function plusQty(i) {
  changeQty(i, 1);
  showCart();
}

function minusQty(i) {
  changeQty(i, -1);
  showCart();
}

function removeItem(i) {
  var sure = confirm("Remove this item from your Bag?");
  if (sure == true) {
    removeFromCart(i);
    showCart();
  }
}

document.addEventListener("DOMContentLoaded", showCart);
