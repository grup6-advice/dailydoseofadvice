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

  $("#btn-register").on("click", (e) => {
    e.preventDefault()
    register()
  })

  $("#btn-logout").on("click", (e) => {
    e.preventDefault()
    logout()
  })

  $("#salvage").on("click", (e) => {
    e.preventDefault()
    fetchPicture()
  })
})

function auth() {
  if(!localStorage.getItem("access_token")) {
    $("#login").show()
    $("#register").hide()
    $("#salvation-card").hide()
    $("#btn-logout").hide()
    $("#title").hide()
  } else {
    $("#login").hide()
    $("#register").hide()
    $("#salvation-card").show()
    $("#btn-logout").show()
    $("#title").show()
    fetchPicture()
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
  $.ajax({
    url: baseUrl + "quotes",
    method: "GET",
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .then(response => {
      $("#quote").append(`
      <p class="card-text">${response.quote}</p>
      <p class="card-text" style="font-weight: bold">${response.author}</p>
      `)
      // <h5 class="card-title mb-4">${response.quote}</h5>
      
    $("#quote").show()
  })
  .fail((xhr, text) => {
    console.log({ xhr, text });
})
}

function fetchAdvice() {
  $.ajax({
    url: baseUrl + "advice",
    method: "GET",
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .then(response => {
      $("#quote").append(`
      <h5 class="card-title mb-4">${response.advice}</h5>
      `)
      fetchQuote()
    // $("#quote").show()
  })
  .fail((xhr, text) => {
    console.log({ xhr, text });
})
}

function fetchPicture() {
  $("#quote").empty()
  $.ajax({
    url: baseUrl + "images",
    method: "GET",
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .then(response => {
      $("#quote").append(`
      <img src="${response.imageUrl}" class="card-img-top">
      `)
      // <h5 class="card-title mb-4">${response.quote}</h5>
      fetchAdvice()
    // $("#quote").show()
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