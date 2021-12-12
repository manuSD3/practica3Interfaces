<?php

    # Recoger los datos del formulario
    $nombre = $_POST['nombre'];
    $fechaNacimiento = $_POST['fecha_nac'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $sexo = $_POST['genero'];
    $actividades = $_POST['actividades'];
    $horario = $_POST['horario'];
    $pass2 = $_POST['pass2'];
      
    $pass = hash('sha512', $pass);
    $pass2 = hash('sha512', $pass2);
     
  if ($pass !== $pass2){
    header('Location: formulario_registro.html');
 
  }

  
    # Comprueba los datos, si falta alguno te dirige a la misma página
    if (empty($nombre) || empty($fechaNacimiento) || empty($telefono)
    || empty($email) || empty($pass)|| empty($sexo) 
    || empty($actividades) || empty($horario)){

        header('Location: formulario_registro.html');

        echo print_r($_POST);
    } else {
try {
    $conexion = new PDO('mysql:host=localhost;dbname=gym', 'root',''); 

    $statement = $conexion->prepare('INSERT INTO Persons (email, nombre, telefono, contraseña, sexo, horario, actividad) VALUES (:email, :nombre, :telefono, :pass, :sexo, :horario, :actividades)');
    $statement-> execute(array(':email' => $email, ':nombre' => $nombre, ':telefono' => $telefono,':pass'=>$pass, 'sexo'=> $sexo,':horario' => $horario, ':actividades'=>$actividades));
   
    // enviarCorreo($email, $pass);

    header('Location: index.html');
}catch (PDOException $e){
    // echo "Error: ".$e->getMessage();
    # Error te manda de nuevo al formulario
    header('Location: formulario_registro.html');
}
    }


    

/*
# Enviar correo // Configurar xampp para que funcione 
# https://www.youtube.com/watch?v=5NY603OX-eQ

function enviarCorreo($email, $pass){
    $enviar_a = $email;
    $asunto = 'Registro gym';
    $mensaje_correo = 'Gracias por registrarte en nuestro gym, Usuario: '.$email.' Contraseña: '.$pass;

    $email = "From: XXXXX.@gmail.com";
    mail($enviar_a, $asunto, $mensaje_correo, $email);
}
*/
?>




