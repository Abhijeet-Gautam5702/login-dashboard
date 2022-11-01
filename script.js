const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const welcomeCont = document.querySelector(".welcome-container");
const btnCont = document.querySelector(".btn-container");
const loginCont = document.querySelector(".login-container");
const mainEl = document.getElementsByTagName("main")[0];
document.getElementsByTagName("main")[0];

loginBtn.addEventListener("click", function () {
  if (localStorage.getItem("userCreds") === null) {
    resetStorage();
  }

  const height = loginCont.offsetHeight;

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  //extract credential-array (of objects) from the localStorage
  const userCreds = JSON.parse(localStorage.getItem("userCreds"));
  if (searchUsername(userCreds, username)) {
    if (matchPassword(userCreds, password)) {
      btnCont.classList.toggle("hide-container");
      loginCont.classList.toggle("hide-container");
      welcomeCont.classList.toggle("show-container");

      welcomeCont.style.height = toString(height);

      mainEl.style.backgroundColor = "#7DF9FF";
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    } else {
      window.alert("You have entered an incorrect password");
      document.getElementById("password").value = "";
    }
  } else {
    window.alert("Account not found! Please sign up");
  }
});

signupBtn.addEventListener("click", function () {
  if (localStorage.getItem("userCreds") === null) {
    resetStorage();
  }

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const userCreds = JSON.parse(localStorage.getItem("userCreds"));
  if (searchUsername(userCreds, username)) {
    window.alert("Account with this username already exists! Please Log In");
  } else {
    const credObj = {
      username: username,
      password: password,
    };
    userCreds.push(credObj);
    localStorage.setItem("userCreds", JSON.stringify(userCreds));
  }

  btnCont.classList.toggle("hide-container");
  loginCont.classList.toggle("hide-container");
  welcomeCont.classList.toggle("show-container");
  mainEl.style.backgroundColor = "#7DF9FF";
  const welcomeTxt = welcomeCont.querySelector(".welcome-text");
  welcomeTxt.textContent = "Account successfully created!";

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
});

function searchUsername(arr, username) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].username === username) {
      return true;
    }
  }
  return false;
}

function matchPassword(arr, pass) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].password === pass) {
      return true;
    }
  }
  return false;
}

function resetStorage() {
  const empty = [];
  localStorage.setItem("userCreds", JSON.stringify(empty));
}

/*
1. when user clicks LOGIN, search for the username in the localStorage.

    1.a] If username present => match the password. 
        -> If matched, show the welcome-container and hide current containers. 
        -> If not matched, display "Incorrect Password" in the window-alert

    1.b] If username absent => display "account doesn't exist, please sign-up" in the window-alert

2. When the user clicks SIGNUP, search for the username in the localStorage.

    2.a] If username present => display "Account already exist, please login" in the window-alert.

    2.b] If username absent => store the credentials in the localStorage for future use. Display "Account successfully created" in the welcome-container. 


*/
