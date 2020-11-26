<?php 
    session_start();
    $_SESSION["connected"]==false;
    session_destroy();
    header("Location: https://".$_SERVER['SERVER_NAME']."/customurl/login.php");
?>