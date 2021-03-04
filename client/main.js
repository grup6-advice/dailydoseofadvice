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
})

function auth() {
  if(localStorage.getItem("access_token")) {
    $("#login").show()
    $("#register").hide()
    $("#salvation-card").hide()
  } else {
    $("#login").hide()
    $("#register").hide()
    $("#salvation-card").show()
  }
}

function showRegisterForm() {
  $("#login").hide()
  $("#register").show()
}