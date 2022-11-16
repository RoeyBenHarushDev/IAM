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


