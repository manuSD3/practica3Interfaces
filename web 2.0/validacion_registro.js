function cambiarBorde(enviar, elemento) {
    if (!enviar) {
        if (elemento != "izq" && elemento != "der") {
            document.getElementById(elemento).style.border="2px solid #cb2e35";
            //document.getElementById(elemento).style["boxShadow"]="inset 0px 0px 9px red";
            document.getElementById(elemento).style["boxShadow"]="0px 0px 9px #cb2e35";
        } else {
            document.getElementById(elemento).style.border="2px solid #cb2e35";
            document.getElementById(elemento).style.width="49%";
            document.getElementById(elemento).style["boxShadow"]="0px 0px 9px #cb2e35";
        }
    } else {
        if (elemento != "izq" && elemento != "der") {
            document.getElementById(elemento).style.border="1px solid black";
            document.getElementById(elemento).style["boxShadow"]="inset 0px 0px 0px red";
        } else {
            document.getElementById(elemento).style.border="none";
            document.getElementById(elemento).style["boxShadow"]="none";
        }
    }
}

function validaNombre() {
    let nombre = document.forms["registro"]["nombre"].value;
    const patron = /^([a-zA-Záéíóú']+ [a-zA-Záéíóú' ]+)$/gm;
    //esta expresion regular selecciona cualquier cadena de letras de la a a la z (minusculas o mayusculas), de cualquier longitud, separada por 1 espacio, y de al menos una letra antes y despues del espacio). Porque se supone que nombre y apellidos solo tienen letras y se escriben separados por un espacio. Tambien permite apostrofes.
    //la g (global) es para que tome todas las coincidencias, no devolverla despues de la primera. La m es para que distinga entre lineas.
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

function calcularEdad(fecha_nac) {     //deberia recibir una string en formato aaaa-mm-dd
    //metodo que divide un string en arrays si le indicamos el caracter separador
    let lista = fecha_nac.split("-");

    let dia = lista[2];
    let mes = lista[1];
    let anho = lista[0];
    
    let fechaActual = new Date();
    //esto se hace porque el metodo getYear cuenta desde el año 1900
    let anhoActual = fechaActual.getYear() + 1900;
    let mesActual = fechaActual.getMonth();
    let diaActual = fechaActual.getDate();
    
    let edad = anhoActual - anho;
    //condicion para tener en cuenta dia y mes
    if ((mesActual - (mes-1)) < 0 || ((mesActual - (mes-1)) == 0 && (diaActual - dia) < 0)) {
        edad--;
    }

    console.log(edad);

    return edad;
}

function validaFecha() {
    let fecha_nac = document.forms["registro"]["fecha_nac"].value;
    let enviar = false;

    let edad = calcularEdad(fecha_nac);

    if (fecha_nac == "") {
        document.getElementById("fechaMal").innerHTML = "La fecha es obligatoria";
    
    } else if (edad > 130 || edad < 0) {
        document.getElementById("fechaMal").innerHTML = "¿Seguro que has escrito bien el año?";

    } else if (edad < 16) {
        document.getElementById("fechaMal").innerHTML = "Para inscribirte en el gym debes tener al menos 16 años. Podría afectar a tu crecimiento :v";
    
    } else {
        document.getElementById("fechaMal").innerHTML = "";
        enviar = true;
    }

    cambiarBorde(enviar, "fecha_nac");

    return enviar;
}

function validaTelefono() {

    let telefono = document.forms["registro"]["telefono"].value;
    let elTele = "El teléfono ";
    let enviar = false;

    if (telefono == "") {
        document.getElementById("telefonoMal").innerHTML = elTele+"es obligatorio";
        
    } else if (telefono.length != 9) {
        document.getElementById("telefonoMal").innerHTML = elTele+"debe ser de 9 dígitos";
        
    } else {
        document.getElementById("telefonoMal").innerHTML ="";
        enviar = true;
    }

    cambiarBorde(enviar, "telefono");

    return enviar;
}

function validaEmail() {
    let email = document.forms["registro"]["email"].value;
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

/*
<svg height="210" width="1000">
  <line x1="500" y1="0" x2="0" y2="0" style="stroke:rgb(255,0,0);stroke-width:10" />
  Sorry, your browser does not support inline SVG.
</svg>
*/

function validaPassword() {
    let password = document.forms["registro"]["password"].value;
    const caracteres = /[!@#\$%\^&\*]+/gm;
    const minusculas = /[a-z]+/gm;
    const mayusculas = /[A-Z]+/gm;
    const numeros = /[0-9]+/gm;

    //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])$/gm
    let enviar = false;

    //if (!caracPermitidos.test(String(password))){

    if (password == "") {
        document.getElementById("contraseñaMal").innerHTML = "La contraseña es obligatoria";
        
    } else if (password.length > 16 || password.length < 8) {
        document.getElementById("contraseñaMal").innerHTML = "La contraseña debe ser de entre 8 y 16 caracteres";

    } else if (!caracteres.test(String(password))){
        document.getElementById("contraseñaMal").innerHTML = "La contraseña debe tener al menos un caracter especial (!,@,#,$,%,^,&,*)";
    } else if (!minusculas.test(String(password))){
        document.getElementById("contraseñaMal").innerHTML = "La contraseña debe tener al menos una letra minúscula";
    } else if (!mayusculas.test(String(password))){
        document.getElementById("contraseñaMal").innerHTML = "La contraseña debe tener al menos una letra mayúscula";
    } else if (!numeros.test(String(password))){
        document.getElementById("contraseñaMal").innerHTML = "La contraseña debe tener al menos un número";
  
    } else {
        document.getElementById("contraseñaMal").innerHTML = "";
        enviar = true;
        
    }

    cambiarBorde(enviar, "password");
    cambiarBorde(enviar, "password2");

    return enviar;
}

function validaPassword2() {
    let password = document.forms["registro"]["password"].value;
    let password2 = document.forms["registro"]["password2"].value;
    let enviar = false;

    if (password2 == "") {
        document.getElementById("contraseña2Mal").innerHTML = "Debes escribir la contraseña 2 veces";
        
    
    } else if (!(password.valueOf() === password2.valueOf())) {
        //document.getElementById("contraseñaMal").innerHTML = "";
        document.getElementById("contraseña2Mal").innerHTML = "Las contraseñas no coinciden";
        
 
    } else {
        //document.getElementById("contraseñaMal").innerHTML = "";
        document.getElementById("contraseña2Mal").innerHTML = "";
        enviar = true;
    }

    cambiarBorde(enviar, "password");
    cambiarBorde(enviar, "password2");

    return enviar;
}

function validaSexo() {
    let enviar = false;
    
    if (
    document.getElementById("hombre").checked == true ||
    document.getElementById("mujer").checked == true ||
    document.getElementById("otro").checked == true
    ) {
        document.getElementById("sexoMal").innerHTML = "";
        enviar = true;
    } else {
        document.getElementById("sexoMal").innerHTML = "Debes marcar el sexo";
    }

    cambiarBorde(enviar, "izq");

    return enviar;
}

function validaActividades() {
    let enviar = false;

    let sala = document.getElementById("sala");
    let yoga = document.getElementById("yoga");
    let spa = document.getElementById("spa");
    let natacion = document.getElementById("natacion");

    if (!sala.checked && !yoga.checked && !spa.checked && !natacion.checked){
        document.getElementById("actividadesMal").innerHTML = "Elige al menos una actividad";
    } else {
        document.getElementById("actividadesMal").innerHTML = "";
        enviar = true;
    }

    cambiarBorde(enviar, "der");

    return enviar;
}

//si esta funcion devuelve false, la informacion no será enviada al pulsar el boton enviar
function validarTodo() {
    let enviar=false;

    if (validaNombre() && validaFecha() && validaTelefono() && validaEmail() && validaPassword() && validaPassword2() && validaSexo() && validaActividades()) {
        enviar = true;
    }
    return enviar;
}

function validarAntes() {

    validaNombre();
    validaFecha();
    validaTelefono();
    validaEmail();
    validaPassword();
    validaPassword2();
    validaSexo();
    validaActividades();
    
    if (validarTodo()) {
        alert("Todo parece correcto");
    }
}

function limpiarErrores() {

    let ids = ["nombreMal", "fechaMal", "telefonoMal","emailMal","contraseñaMal","contraseña2Mal", "sexoMal", "actividadesMal"];

    for (let index = 0; index < ids.length; index++) {
        document.getElementById(ids[index]).innerHTML = "";
    }

    ids = ["nombre", "fecha_nac", "telefono","email","password","password2", "izq", "der"];

    for (let index = 0; index < ids.length; index++) {
        cambiarBorde(true, ids[index]);
    }

}

/*
console.log("Hello");
setTimeout(() => { console.log("World!"); }, 2000);
console.log("Goodbye!");
*/