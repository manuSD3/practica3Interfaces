function validaNombre() {
    let nombre = document.forms["contacto"]["nombre"].value;
    const patron = /^([a-zA-Záéíóú']+ [a-zA-Záéíóú' ]+)$/gm;
    const patronNumeros = /[0-9]+/gm;
    const patronSoloLetras = /^([a-zA-Záéíóú' ]+)$/gm;
    let enviar = false;

    if (nombre == "") {

        document.getElementById("nombreMal").innerHTML = "Error. El nombre es obligatorio";

    //el metodo "test" da true si la variable coincide con la expresion regular
    } else if (patronNumeros.test(String(nombre))) {

        document.getElementById("nombreMal").innerHTML = "Error. No se permiten numeros.";
    
    } else if (!patronSoloLetras.test(String(nombre))) {
        
        document.getElementById("nombreMal").innerHTML = "Error. Solo se permiten letras, espacios y apostrofes.";

    } else if (!patron.test(String(nombre)) ) {
                
        document.getElementById("nombreMal").innerHTML = "Error. Introduce al menos 1 apellido, separado por un espacio.";
     
    } else {
          document.getElementById("nombreMal").innerHTML = "";
          enviar = true;
    }

    cambiarBorde(enviar, "nombre");

    return enviar;
}

function validaEmail() {
    let email = document.forms["contacto"]["email"].value;
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

function validaMensaje() {
    let mensaje = document.getElementById("mensaje").value;

    let enviar = false;

    if (mensaje == "") {

        document.getElementById("mensajeMal").innerHTML = "Escribe tu consulta";

    } else if (mensaje.length > 250) {
        //mostrar error
        //seria conveniente llamar a la funcion cuando esta escribiendo (onkeyup)
        document.getElementById("mensajeMal").innerHTML = "Te has pasado del límite de 250 caracteres";
    } else {
        document.getElementById("mensajeMal").innerHTML = "";
        enviar=true;
    }

    cambiarBorde(enviar, "mensaje");

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


function validarTodo() {
    let enviar=false;

    if (validaNombre() && validaEmail() && limiteCaracteres()) {
        enviar = true;
    }
    return enviar;
}

function validarAntes() {

    validaEmail();
    validaNombre();
    validaMensaje();

    if (validarTodo()) {
        alert("Todo parece correcto");
    }
}

function limpiarErrores() {

    let ids = ["emailMal","nombreMal", "mensajeMal"];

    for (let index = 0; index < ids.length; index++) {
        document.getElementById(ids[index]).innerHTML = "";
    }

    ids = ["email","nombre", "mensaje"];

    for (let index = 0; index < ids.length; index++) {
        cambiarBorde(true, ids[index]);
    }

}