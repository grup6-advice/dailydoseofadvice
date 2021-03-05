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
    signOut()
  })

  $("#salvage").on("click", (e) => {
    e.preventDefault()
    duckQuack.play()
    $("#quote").empty()
      fetchPicture()
  })

  $("#g-signin2").on("click", (e) => {
    e.preventDefault()
    onSignIn()
  })
})

const duckQuack = new Audio('./assets/quacksound.mp3')
const byebye = new Audio('./assets/byebye.mp4')
const hello = new Audio('./assets/hello.mp4')

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
    $("#quote").empty()
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
    swal({
      icon: "success",
      text: "Login Success!"
    })
    hello.play()
    localStorage.setItem("access_token", data.access_token)
    auth()
  })
  .fail((xhr, text) => {
    swal({
      icon: "error",
      text: xhr.responseJSON.message
    })
  })
  .always(_=> {
    $('#login-email').val("")
    $('#login-password').val("")
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
    swal({
      icon: "success",
      text: "Account has been created!"
    })
    $('#register-email').val(email)
    $('#register-password').val(password)
    auth()
  })
  .fail((xhr, text) => {
    swal({
      icon: "error",
      text: xhr.responseJSON.message[0]
    })
  })
  .always(_=> {
    $('#register-email').val("")
    $('#register-password').val("")
  })
}

function logout() {
  swal({
    icon: "info",
    text: "You have been logged out!"
  })
  byebye.play()
  localStorage.removeItem("access_token")
  auth()
}

function showRegisterForm() {
  $("#login").hide()
  $("#register").show()
}

function fetchQuote(picture, advice) {
  $.ajax({
    url: baseUrl + "quotes",
    method: "GET",
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(response => {
      $("#quote").append(`
      <img src="${picture}" class="card-img-top">
      <h5 class="card-title mb-4">${advice}</h5>
      <p class="card-text">${response.quote}</p>
      <p class="card-text" style="font-weight: bold">${response.author}</p>
      `)
    $("#quote").show()
  })
  .fail((xhr, text) => {
    console.log({ xhr, text });
})
.always(_=> {
  $("#loading").hide()
})
}

function fetchAdvice(picture) {
  $.ajax({
    url: baseUrl + "advice",
    method: "GET",
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(response => {
      let advice = response.advice
      fetchQuote(picture, advice)
  })
  .fail((xhr, text) => {
    console.log({ xhr, text });
})
}

function fetchPicture() {
  $("#loading").show()
  $.ajax({
    url: baseUrl + "images",
    method: "GET",
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(response => {
      let picture = response.imageUrl
      fetchAdvice(picture)
  })
  .fail((xhr, text) => {
    console.log({ xhr, text });
})
}



function onSignIn(googleUser) {
  $.ajax({
    url: 'http://localhost:3000/googleLogin',
    method: "POST",
    data: {
      token: googleUser.getAuthResponse().id_token
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