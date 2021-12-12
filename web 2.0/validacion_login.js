//var intentos = 3;
//var passwordReal = "123456789";

function validaPassword(){
    let enviar = false;
    let passwordIntroducida = document.forms["login"]["password"].value;

    if (passwordIntroducida == "") {
        document.getElementById("contraseñaMal").innerHTML = "La contraseña es obligatoria";
    } else {
        document.getElementById("contraseñaMal").innerHTML = "";
        enviar=true;
    }
       

    /* } else if (!(passwordReal.valueOf() === passwordIntroducida.valueOf())) {
        document.getElementById("contraseñaMal").innerHTML = "Contraseña incorrecta. Le queda(n) "+intentos+" intento(s).";
        intentos--;
    }

	//(intentos > 0  &&  !contrasenha1.equals(contrasenha2));
	
	if (intentos == 0){
		document.getElementById("contraseñaMal").innerHTML="Intentos agotados. La cuenta ha sido bloqueada por seguridad. Contacte con el admin.";
	} else if (passwordReal.valueOf() === passwordIntroducida.valueOf()){
		document.getElementById("contraseñaMal").innerHTML="";
        enviar=true;
	} */

    cambiarBorde(enviar, "password");

    return enviar;
}

function validaEmail() {
    let email = document.forms["login"]["email"].value;
    const patron = /^([a-zA-Z0-9\-_][a-zA-Z0-9\-_\.]{0,252}[a-zA-Z0-9\-_]@[a-zA-Z0-9][a-zA-Z0-9\-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?)$/gm;
                                                 //^ para dominios de 2º nivel
    const caracPermitidos = /^([a-zA-Z0-9\-_\.@]+)$/gm;
    let enviar = false;

    if (email == "") {
        document.getElementById("emailMal").innerHTML = "El email es obligatorio";
    
    } else if (!caracPermitidos.test(String(email))){
        document.getElementById("emailMal").innerHTML = "Error. Solo se permiten letras, numeros, -, _, y puntos";
    
    } else if (!patron.test(String(email))){
        document.getElementById("emailMal").innerHTML = "Error. El correo no tiene el formato permitido.";
        
    } else {
        document.getElementById("emailMal").innerHTML = "";
        enviar = true;
    }

    cambiarBorde(enviar, "email");

    return enviar;
}

function validarTodo() {
    let enviar=false;

    if (validaPassword() && validaEmail()) {
        enviar = true;
    }
    return enviar;
}


function cambiarBorde(enviar, elemento) {
    if (!enviar) {
        document.getElementById(elemento).style.border="2px solid #cb2e35";
        //document.getElementById(elemento).style["boxShadow"]="inset 0px 0px 9px red";
        document.getElementById(elemento).style["boxShadow"]="0px 0px 9px #cb2e35";
    } else {
        document.getElementById(elemento).style.border="1px solid black";
        document.getElementById(elemento).style["boxShadow"]="inset 0px 0px 0px red";
    }
}

function validarAntes() {

    validaEmail();
    validaPassword();

    if (validarTodo()) {
        alert("Todo parece correcto");
    }
}

function limpiarErrores() {

    let ids = ["emailMal","contraseñaMal"];

    for (let index = 0; index < ids.length; index++) {
        document.getElementById(ids[index]).innerHTML = "";
    }

    ids = ["email","password"];

    for (let index = 0; index < ids.length; index++) {
        cambiarBorde(true, ids[index]);
    }

}