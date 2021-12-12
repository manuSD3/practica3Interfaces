<?php
$conexion = new mysqli('localhost', 'root', '','gym');

if ($conexion -> connect_errno){
  
   header('Location: FormularioLogin.html');
}else {
    
    session_start();
    $usuario =  $_SESSION['usuario'];
   
    if (empty($usuario)){
        header('Location: FormularioLogin.html');

    }else {
            try {
                $stmt = $conexion->prepare("SELECT * FROM persons WHERE email = ?");
                $stmt->bind_param('s',$usuario);
                $stmt->execute();
                $result = $stmt->get_result();
                $user = $result->fetch_assoc();

            }catch (PDOException $e){
            echo "Error: ".$e->getMessage();
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Formulario Login</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <script type="text/javascript" src="FormularioLogin.js"></script>
    <link rel="stylesheet" type="text/css" href="formulario.css">

    <!--====Fuentes====-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&family=Roboto:wght@300;400;700&family=Russo+One&display=swap" rel="stylesheet">
    <!--==============-->

</head>
<body>
    <header class="header">
        <nav>
            <a href="index.html"> Home </a>
            <a href="#"> Photos</a>
            <a href="FormularioDeContacto.html"> Contact </a>
        </nav>

       <div>
                <button class="botones-header"><a href="datosUsuario.php"> Mis datos </a></button>
       </div>
    </header>
    <!--=============FORMULARIO===========================-->

    <form id="formulario" name="registro" action="cerrarSesion.php" method="post" onsubmit="return validarTodo();">
    <h1>Usuario: <?php  echo $user['nombre'];?></h1>
       
        <div class="fila">
            <div class="izquierda">
                <label for="email">Email (Usuario):</label>
            </div>
            <div class="derecha">
               <p><?php  echo $user['email'];?></p>
            </div>
        </div>
        <br>
        <br>
        <br>
        <div class="fila">
            <div class="izquierda">
                <label for="email">Telefono: </label>
            </div>
            <div class="derecha">
               <p><?php  echo $user['telefono'];?></p>
            </div>
        </div>   
        <br>
        <br>      
        <br>
        <div class="fila">
            <div class="izquierda">
                <label for="email">Horario: </label>
            </div>
            <div class="derecha">
               <p><?php  echo $user['horario'];?></p>
            </div>
        </div>   
        <br>
        <br>      
        <br>
        <div class="fila">
            <div class="izquierda">
                <label for="email">Actividad: </label>
            </div>
            <div class="derecha">
               <p><?php  echo $user['Actividad'];?></p>
            </div>
        </div>   
        <br>
        <br>      
        <br>
        <input class="boton" type="submit" value="Salir de la sesión" />       
      </form> 
<!--=============FIN FORMULARIO===========================-->
    
<footer class="footer">
    <section>
        <h2 class="logo">Fitness Hub<span class="puntoLogo">.</span></h2>
    </section>

    <section class="connect">
        <h2>Connect</h2>
            <nav class="centrarFlex">
                <div class="centrarFlex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                      </svg>

                    <a href="https://www.facebook.com/">Facebook</a>
                </div>

                <div class="centrarFlex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <rect x="4" y="4" width="16" height="16" rx="4" />
                        <circle cx="12" cy="12" r="3" />
                        <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                      </svg>
                    <a href="https://www.instagram.com/">Instagram</a>
                </div>
            </nav>
    </section>
</footer>
      
</body>
</html>