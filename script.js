const signUpButton = document.getElementById('signUp');
const logInButton = document.getElementById('logIn');
const container = document.getElementById('container');
const backFlipCon = document.getElementById('backFlip-container');
const emailCon = document.getElementById('emailConfirmation');
const forgot = document.getElementById('forgot');
const closeForgot = document.getElementById('closeForgot');
const openEmailCon = document.getElementById('openEmailConfirmation');
const closeEmailCon = document.getElementById('closeEmailCon');

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
        container.classList.add("emailConfirmation-active");
        container.style.display = "none";
        backFlipCon.style.display = "none";
    })

    closeEmailCon.addEventListener('click', ()=> {
        container.classList.remove("emailConfirmation-active");
        container.style.display = "block";
        backFlipCon.style.display = "block";
    })
}

const matchPass = document.getElementById('matchPass');
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

if(matchPass){

    matchPass.addEventListener('click', ()=> {
        if(newPassword.value == confirmPassword.value){
            return true;
        }
        else{
            alert("Password must be same!");
            return false;
        }
    });
}
function check(){}

$('#pass, #repass').on('keyup', function () {
    if ($('#pass').val() == $('#repass').val()) {
        $('#message').html('Matching').css('color', 'green');
        $('#openEmailConfirmation').prop('disabled',false)

    } else {
        $('#message').html('Not Matching').css('color', 'red');
        $('#openEmailConfirmation').prop('disabled',true)
    }
});



// making a json from the sign up form data:
function getData(form) {
    let formData = new FormData(form);
    let map = {'action': 'signup'}
    // pairs the key and value from the form
    for(let pair of formData.entries()){
        map[pair[0]] = pair[1]
    }
    console.log("formData: " + map) //Object.fromEntries(map)
    sendRequest(map)
}


// catching the signup form and activating the sending procces
document.getElementById("sign-up").addEventListener("submit",function (e){
    e.preventDefault();
    getData(e.target);
})


//the sending procces
let sendRequest = async function (data) {
    fetch("http://localhost:8080/", {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(resp => {
            return resp.json()
        })
        .then( json => {
            console.log(json)
        })
        .catch(error => {
            console.log('error', error)
        })
};
