/* order.js  -  order placed / confirmation page */

function showOrder() {
  var data = localStorage.getItem("lastOrder");
  var area = document.getElementById("order-area");

  if (data == null) {
    area.innerHTML = '<h2 class="page-title">No order found</h2>' +
                     "<p>You have not placed any order yet.</p><br>" +
                     '<a href="products.html" class="btn">Start shopping</a>';
    return;
  }

  var o = JSON.parse(data);

  var itemHtml = "";
  for (var i = 0; i < o.items.length; i++) {
    var p = getProduct(o.items[i].id);
    if (p == null) { continue; }
    itemHtml += "<tr>";
    itemHtml += "<td>" + (i + 1) + "</td>";
    itemHtml += "<td>" + p.name + "</td>";
    itemHtml += "<td>" + o.items[i].size + "</td>";
    itemHtml += "<td>" + o.items[i].qty + "</td>";
    itemHtml += "<td>" + money(p.price) + "</td>";
    itemHtml += "<td>" + money(p.price * o.items[i].qty) + "</td>";
    itemHtml += "</tr>";
  }

  var shipText = money(o.shipping);
  if (o.shipping == 0) {
    shipText = "FREE";
  }

  var html = "";
  html += '<div class="success-box">';
  html += '  <div class="tick">&#10004;</div>';
  html += "  <h1>THANK YOU FOR YOUR ORDER</h1>";
  html += "  <p>Order number : <b>" + o.orderNo + "</b></p>";
  html += "  <p>A confirmation email will be sent to <b>" + o.email + "</b></p>";
  html += "</div>";

  html += '<div class="order-detail">';
  html += "  <h2 class=\"page-title\">Order details</h2>";
  html += "  <table>";
  html += "    <tr><th>Order date</th><td>" + o.date + "</td></tr>";
  html += "    <tr><th>Expected delivery</th><td>" + o.delivery + "</td></tr>";
  html += "    <tr><th>Customer name</th><td>" + o.name + "</td></tr>";
  html += "    <tr><th>Mobile number</th><td>" + o.phone + "</td></tr>";
  html += "    <tr><th>Delivery address</th><td>" + o.address + "</td></tr>";
  html += "    <tr><th>Payment method</th><td>" + o.payment + "</td></tr>";
  html += "  </table>";

  html += "  <h2 class=\"page-title\">Items ordered</h2>";
  html += "  <table>";
  html += "    <tr><th>No.</th><th>Product</th><th>Size (UK)</th><th>Qty</th><th>Price</th><th>Total</th></tr>";
  html += itemHtml;
  html += '    <tr><td colspan="5">Sub total</td><td>' + money(o.subTotal) + "</td></tr>";
  html += '    <tr><td colspan="5">Shipping</td><td>' + shipText + "</td></tr>";
  html += '    <tr><th colspan="5">Total amount paid</th><th>' + money(o.total) + "</th></tr>";
  html += "  </table>";
  html += "</div>";

  html += '<div class="print-row">';
  html += '  <a href="products.html" class="btn">Continue Shopping</a> &nbsp;';
  html += '  <button class="btn btn-outline" onclick="window.print()">Print Bill</button>';
  html += "</div>";

  area.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", showOrder);
