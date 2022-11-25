const signUpButton = document.getElementById("signUp");
const logInButton = document.getElementById("logIn");
const container = document.getElementById("container");
const backFlipCon = document.getElementById("backFlip-container");
const emailCon = document.getElementById("emailConfirmation");
const forgot = document.getElementById("forgot");
const closeForgot = document.getElementById("closeForgot");
const openEmailCon = document.getElementById("openEmailConfirmation");
const closeEmailCon = document.getElementById("closeEmailCon");

if (signUpButton) {
  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  logInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  forgot.addEventListener("click", () => {
    container.classList.add("backFlip-container-active");
    container.style.display = "none";
    emailCon.style.display = "none";
  });

  closeForgot.addEventListener("click", () => {
    container.classList.remove("backFlip-container-active");
    container.style.display = "block";
    emailCon.style.display = "block";
  });

  openEmailCon.addEventListener("click", () => {
    container.classList.add("emailConfirmation-active");
    container.style.display = "none";
    backFlipCon.style.display = "none";
  });

  closeEmailCon.addEventListener("click", () => {
    container.classList.remove("emailConfirmation-active");
    container.style.display = "block";
    backFlipCon.style.display = "block";
  });
}

const matchPass = document.getElementById("matchPass");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

if (matchPass) {
  matchPass.addEventListener("click", () => {
    if (newPassword.value == confirmPassword.value) {
      return true;
    } else {
      alert("Password must be same!");
      return false;
    }
  });
}
//Cancellation of sending a form before confirmation of the email
$(document).ready(function () {
  $(document).on("submit", "#sign-up", function () {
    // do your things
    return false;
  });
});

$("#pass, #repass").on("keyup", function () {
  if ($("#pass").val() == $("#repass").val()) {
    $("#message").html("Matching").css("color", "green");
    $("#openEmailConfirmation").prop("disabled", false);
  } else {
    $("#message").html("Not Matching").css("color", "red");
    $("#openEmailConfirmation").prop("disabled", true);
  }
});

const sendSignUpData = () => {
  const data = {
    name: document.getElementById("newUsername").value,
    mail: document.getElementById("newUserEmail").value,
    pass: document.getElementById("pass").value,
  };
  fetch("http://localhost:8080/signup", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((response) => {
    //console.log(response))
    // window.location.href=response.headers.Location;
    if (response.status === 401) {
      alert("ERROR 401");
    }
  });
};
const sendLoginData = async () => {
  const data = {
    mail: document.getElementById("usreEmail").value,
    pass: document.getElementById("usrePass").value,
  };
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const handleResponse = {
    200: ({ location = "index.html" }) => {
      window.location.href = location;
    },
    401: () => {
      alert("Verification Error");
    },
  };
  const body = await response.json();
  const handler = handleResponse[response.status];
  if (handler) {
    handler(body);
  }
};
const forgotPassweord = () => {
  const data = {
    mail: document.getElementById("newUserEmail").value,
  };
  fetch("http://localhost:8080/forgotPassword", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((response) => {
    //console.log(response))
    // window.location.href=response.headers.Location;
    if (response.status === 401) {
      alert("good night yonit the btch");
    }
  });
};
const emailConfirmation = () => {
  const datad = {
    name: document.getElementById("newUsername").value,
    mail: document.getElementById("newUserEmail").value,
    pass: document.getElementById("pass").value,
    code: document.getElementById("OTPtext").value,
  };
  fetch("http://localhost:8080/confirm", {
    method: "POST",
    body: JSON.stringify(datad),
  }).then((response) => {
    //console.log(response))
    // window.location.href=response.headers.Location;
    if (response.status === 401) {
      alert("good night yonit the btch");
    }
  });
};

// const sendToServer = (data) => {
//     fetch("http://localhost:8080/login", {
//         method: 'POST',
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             //console.log(response))
//          // window.location.href=response.headers.Location;
//             if (response.status===401){
//                 alert("good night yonit the btch");
//             }
//         })
