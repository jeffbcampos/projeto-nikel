const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(account){
        if(account.password !== password){
            alert("Opps! Verifique o usuário ou a senha.")
            return;
        }
        saveSession(email, checkSession);
        window.location.href = "home.html";
    }else{
        alert("Opps! Verifique o usuário ou a senha.");
        return;
    }
})

//Criar conta

document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();
    
    console.log("Enviou o form");

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5 ){
        alert("Preencha o campo com um e-mail valido");
        return;
    }
    
    if(password.length < 4 ){
        alert("Preencha o campo com uma senha no minimo 4 digitos.");
        return;
    }
    
    myModal.hide();

    salvarConta({
        login: email,
        password: password,
        transactions: []
    });

    alert("Conta criada com sucesso.");
});

function salvarConta(data){
    console.log(data);
    localStorage.setItem(data.login, JSON.stringify(data));
}

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session",data);
    }
    sessionStorage.setItem("logged",data);
}

function getAccount (key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    }
    return "";
}