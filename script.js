const signUpButton = document.getElementById('signUp');
const logInButton = document.getElementById('logIn');
const container = document.getElementById('container');
const backFlipCon = document.getElementById('backFlip-container');
const emailCon = document.getElementById('emailConfirmation');
const forgot = document.getElementById('forgot');
const closeForgot = document.getElementById('closeForgot');
const openEmailCon = document.getElementById('openEmailConfirmation');

window.addEventListener("load", (event)=>{
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const mail = urlParams.get('mail')

})
function getMail(){
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const mail = urlParams.get('mail')
    return mail
}


if(signUpButton){

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    logInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    forgot.addEventListener('click', () => {
        container.classList.add("backFlip-container-active");
        container.style.display = "none";
        emailCon.style.display = "none";
    });

    closeForgot.addEventListener('click', () => {
        container.classList.remove("backFlip-container-active");
        container.style.display = "block";
        emailCon.style.display = "block";
    });

    openEmailCon.addEventListener('click', ()=> {
        if(validateForm()){
            container.classList.add("emailConfirmation-active");
            container.style.display = "none";
            backFlipCon.style.display = "none";
        }
    });
}

const matchPass = document.getElementById('matchPass');
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

if(matchPass){
    matchPass.addEventListener('click', ()=> {
        if(newPassword.value === confirmPassword.value){
            return true;
        }
        else{
            alert("Password must be same!");
            return false;
        }
    });
}


const welcomeModel = document.getElementById('welcomeModel');
const iamTeam = document.querySelector('.IAM');
const changePassModel = document.getElementById('changePassModel');
const showChangePassModel = document.getElementById('changePass');
const userStatus = document.getElementById("userStatusModel");
const showUserStatus = document.getElementById("usersStatus");
const approveAdminModel = document.getElementById("approveAdminModel");

if(welcomeModel){

    changePassModel.addEventListener('click', () => {
        showChangePassModel.style.display = "block";
        welcomeModel.style.display = "none";
        userStatus.style.display = "none";
        approveAdminModel.style.display = "none";

    })
    iamTeam.addEventListener('click', () => {
        welcomeModel.style.display = "block";
        showChangePassModel.style.display = "none";
        userStatus.style.display = "none";
        approveAdminModel.style.display = "none";

    })
    showUserStatus.addEventListener('click', () => {
        approveAdminModel.style.display = "block";
        userStatus.style.display = "none";
        welcomeModel.style.display = "none";
        showChangePassModel.style.display = "none";
    })
}

//Cancellation of sending a form before confirmation of the email
$(document).ready(function() {
    $(document).on('submit', '#sign-up', function() {
        // do your things
        return false;
    });
});
$(document).ready(function() {
    $(document).on('submit', '#OTP', function() {
        // do your things
        return false;
    });
});

$('#pass, #repass').on('keyup', function () {
    if ($('#pass').val() === $('#repass').val()) {
        $('#message').html('Matching').css('color', 'green');
        $('#openEmailConfirmation').prop('disabled',false)

    } else {
        $('#message').html('Not Matching').css('color', 'red');
        $('#openEmailConfirmation').prop('disabled',true)
    }
});

const sendLoginData = async () => {
    user = document.getElementById("userEmail").value;
    const data = {
        mail: document.getElementById("userEmail").value,
        pass: document.getElementById("userPass").value,
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
        403:()=>
        {
            alert("user in suspention!");
        }
    };
    const body = await response.json();
    const handler = handleResponse[response.status];
    if (handler) {
        handler(body);
    }
};

    function validateForm() {
        let name = document.forms["signUpForm"]["name"].value;
        let email = document.forms["signUpForm"]["email"].value;
        let pass = document.forms["signUpForm"]["pass"].value;
        let repass = document.forms["signUpForm"]["repass"].value;
        if (name === "" || email === "" || pass === "" || repass === "") {
            alert("You Must Fill In All Fields");
            return false;
        } else {
            sendSignUpData();
            return true
        }
    }

    const sendSignUpData= async  () => {

        const data = {
            "name":document.getElementById("newUsername").value,
            "mail":document.getElementById("newUserEmail").value,
            "pass": document.getElementById("pass").value,
            // "rePass": document.getElementById("repass").value
        }
        await fetch("http://localhost:8080/signUp", {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status===401 ){
                    location.reload();
                    alert("ERROR 401: Email already exists");
                }
            })
    }

    const forgotPassword= () => {
        const data = {
            "mail":document.getElementById("emailForgetPass").value,
        }
        fetch("http://localhost:8080/forgotPassword", {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => {
                location.reload();
                if (response.status===401){
                    alert("email not found");
                }
            })
    }

    const emailConfirmation = async () => {
        const data = {
            "name":document.getElementById("newUsername").value,
            "mail":document.getElementById("newUserEmail").value,
            "pass": document.getElementById("pass").value,
            "code":document.getElementById("OTPtext").value
        };
        const response = await fetch("http://localhost:8080/confirm", {
            method: "POST",
            body: JSON.stringify(data),
        });

        const handleResponse = {
            200: ({ location = "index.html" }) => {
                window.location.href = location;
                alert("User was added")
            },
            403: () => {
                alert("OTP code is false");
            },
            401: () => {
                alert("Verification Error");
            }
        };
        const body = await response.json();
        const handler = handleResponse[response.status];
        if (handler) {
            handler(body);
        }
    };
const changePassword= () => {
    const data = {
        "mail": getMail(),
        "pass": document.getElementById("currPassword").value,
        "newPass":document.getElementById("newPassword").value
    };
    fetch("http://localhost:8080/changePassword", {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.status===401){
                alert("email not found");
            }
        })
}

//LOGOUT & DELETING COOKIES

    const userLogOut = document.getElementById('logout');
    if(userLogOut){

        userLogOut.addEventListener('click', () =>{
            function get_cookie(name){
                return document.cookie.split(';').some(c => {
                    return c.trim().startsWith(name + '=');
                });
            }

            function delete_cookie( name, path, domain ) {
                if( get_cookie( name ) ) {
                    document.cookie = name + "=" +
                        ((path) ? ";path="+path:"")+
                        ((domain)?";domain="+domain:"") +
                        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
                }
            }
            window.location = "index.html";
        })
    }

// While suspended are checked date form is open

function openDateForm() {
    let checkRadio = document.querySelector(
        'input[name="userStatus"]:checked');

    if (checkRadio.value === "suspended") {
        document.getElementById("disp").innerHTML = checkRadio.value + " button checked" + `<br><input type="number" id="start" name="trip-start"
        value="1"
        min="0">`;
    } else if (checkRadio.value !== "suspended") {
        document.getElementById("disp").innerHTML = checkRadio.value + " button checked"
    } else {
        document.getElementById("disp").innerHTML
            = "No one selected";
    }
}
const suspension = async () => {
    const data = {
        "mail":document.getElementById("userEmail").value,
        "suspensionTime": document.getElementById("start").value,
    };
    const response = await fetch("http://localhost:8080/suspension", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

const getPin= () => {
    const data = {
        "code":document.getElementById("password").value,
    }
    fetch("http://localhost:8080/getPin", {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => {
            userStatus.style.display = "block";
            welcomeModel.style.display = "none";
            showChangePassModel.style.display = "none";
            approveAdminModel.style.display = "none";
            if (response.status===401){
                location.reload()
                alert("the Code is invalid");

            }
        })
}