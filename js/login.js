/* login.js  -  login, signup and saving data for data.csv */

function openTab(which) {
  if (which == "login") {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("tab-login").className = "tab-btn active";
    document.getElementById("tab-signup").className = "tab-btn";
  } else {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("tab-login").className = "tab-btn";
    document.getElementById("tab-signup").className = "tab-btn active";
  }
}

// simple email checking
function checkEmail(email) {
  if (email.indexOf("@") > 0 && email.indexOf(".") > 2) {
    return true;
  }
  return false;
}

function signupUser() {
  var email = document.getElementById("signup-email").value.trim();
  var pass = document.getElementById("signup-password").value;
  var confirm = document.getElementById("signup-confirm").value;
  var msg = document.getElementById("signup-msg");
  msg.className = "msg error";

  if (email == "" || pass == "" || confirm == "") {
    msg.innerHTML = "Please fill all the boxes.";
    return;
  }
  if (checkEmail(email) == false) {
    msg.innerHTML = "Please enter a correct email id.";
    return;
  }
  if (pass.length < 6) {
    msg.innerHTML = "Password must be minimum 6 characters.";
    return;
  }
  if (pass != confirm) {
    msg.innerHTML = "Password and confirm password are not same.";
    return;
  }

  var users = getUsers();
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      msg.innerHTML = "This email is already registered. Please login.";
      return;
    }
  }

  // save the email and password  (this data goes into data.csv)
  users.push({ email: email, password: pass });
  saveUsers(users);

  msg.className = "msg success";
  msg.innerHTML = "Account created. Now you can login.";
  document.getElementById("signup-email").value = "";
  document.getElementById("signup-password").value = "";
  document.getElementById("signup-confirm").value = "";
  showUserTable();
}

function loginUser() {
  var email = document.getElementById("login-email").value.trim();
  var pass = document.getElementById("login-password").value;
  var msg = document.getElementById("login-msg");
  msg.className = "msg error";

  if (email == "" || pass == "") {
    msg.innerHTML = "Please enter email and password.";
    return;
  }

  var users = getUsers();
  var ok = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == pass) {
      ok = true;
    }
  }

  if (ok == false) {
    msg.innerHTML = "Wrong email or password. Please try again.";
    return;
  }

  localStorage.setItem("currentUser", email);
  msg.className = "msg success";
  msg.innerHTML = "Login successful. Please wait...";
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
}

// show all saved users in the table
function showUserTable() {
  var users = getUsers();
  var html = "<tr><th>No.</th><th>Email</th><th>Password</th></tr>";
  if (users.length == 0) {
    html = html + '<tr><td colspan="3">No data saved yet.</td></tr>';
  }
  for (var i = 0; i < users.length; i++) {
    html += "<tr><td>" + (i + 1) + "</td><td>" + users[i].email + "</td><td>" + users[i].password + "</td></tr>";
  }
  document.getElementById("user-table").innerHTML = html;
}

function clearUsers() {
  var sure = confirm("Do you really want to delete all saved login data?");
  if (sure == true) {
    localStorage.removeItem("users");
    localStorage.removeItem("currentUser");
    showUserTable();
    showUserLink();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // add two demo users the first time so the login page can be tested
  if (localStorage.getItem("users") == null) {
    var demo = [
      { email: "student@gmail.com", password: "123456" },
      { email: "teacher@gmail.com", password: "abc123" }
    ];
    saveUsers(demo);
  }
  showUserTable();
});
