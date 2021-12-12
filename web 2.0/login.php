<?php
$conexion = new mysqli('localhost', 'root', '','gym');

if ($conexion -> connect_errno){
   header('Location: FormularioLogin.html');
   
}else {
    $usuario = $_POST['usuario'];
    $pass = $_POST['pass'];
    
    $pass = hash('sha512', $pass);
    if (empty($usuario) || empty($pass)){
        
        header('Location: FormularioLogin.html');
    }else {
            try {
                $stmt = $conexion->prepare("SELECT * FROM persons WHERE email = ? AND contraseña = ?");
                $stmt->bind_param('ss',$usuario,$pass);
                $stmt->execute();
                $result = $stmt->get_result();
                $user = $result->fetch_assoc();

          
                if ($user['email']  !=  $usuario  || $user['contraseña'] !=  $pass){
                    echo "no has ingresado los datos con exito";
                }else {
                    session_start();
                    $_SESSION['usuario'] = $usuario; 
                    header('Location: datosUsuario.php');
                }

            }catch (PDOException $e){
            echo "Error: ".$e->getMessage();
        }
    }
}