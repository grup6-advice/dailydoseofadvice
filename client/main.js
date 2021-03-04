const baseUrl = "http://localhost:3000/"

$(document).ready(() => {
  auth()

  $("#register-form").on("click", (e) => {
    e.preventDefault()
    showRegisterForm()
  })

  $("#login-form").on("click", (e) => {
    e.preventDefault()
    auth()
  })

  $("#btn-login").on("click", (e) => {
    e.preventDefault()
    login()
  })
})

function auth() {
  if(!localStorage.getItem("access_token")) {
    $("#login").show()
    $("#register").hide()
    $("#salvation-card").hide()
    $("#btn-logout").hide()
  } else {
    $("#login").hide()
    $("#register").hide()
    $("#salvation-card").show()
    $("#btn-logout").show()
  }
}

function login() {
  const email = $("#login-email").val()
  const password = $("#login-password").val()

  $.ajax({
    url: baseUrl + "login",
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done(data => {
    localStorage.setItem("access_token", data.access_token)
    auth()
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
  .always(_=> {
    $('#register-email').val("")
    $('#register-password').val("")
  })
}

function register() {
  const email = $("#register-email").val()
  const password = $("#register-password").val()

  $.ajax({
    url: baseUrl + "register",
    method: "POST",
    data: {
      email,
      password
    }
  })
  .then((response) => {
    $('#register-email').val(email)
    $('#register-password').val(password)
    auth()
  })
  .fail((xhr, text) => {
    console.log(xhr, text)
  })
  .always(_=> {
    $('#register-email').val("")
    $('#register-password').val("")
  })
}

function logout() {
  localStorage.removeItem("access_token")
  auth()
}

function showRegisterForm() {
  $("#login").hide()
  $("#register").show()
}

function fetchQuote() {
  $("#").empty()
  $.ajax({
    url: baseUrl + "",
    method: "GET",
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .then(response => {
    response.forEach((el, index) => {
      $("#").append()
    })
    $("#").show()
  })
  .fail((xhr, text) => {
    console.log({ xhr, text });
})
}

function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
}