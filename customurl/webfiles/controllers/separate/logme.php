<?php 
    session_start();
    require_once('../../models/db_connect.php');

    if(isset($_POST["accountID"]) && trim($_POST["accountID"])!='' && isset($_POST["password"]) && trim($_POST["password"])!=''){

        $hashedPawwordFinder = db_connect()->prepare('SELECT password FROM urlrewaccounts WHERE login = :login');
        $hashedPawwordFinder->bindParam(':login', $_POST["accountID"]);
        $hashedPawwordFinder->execute();

        $db_hashed_pwd = $hashedPawwordFinder->fetch(PDO::FETCH_COLUMN);

        // Si la requête SQL fonctionne & donc que le login correspond à un mot de passe en base et que le mot de passe hashé issu de la base correspond au mot de passe saisi lors de la connexion //
        if($hashedPawwordFinder->execute()==true && password_verify($_POST["password"], $db_hashed_pwd)){
            $_SESSION["connected"] = true;
            echo "2";
            /* header("Location: https://".$_SERVER['SERVER_NAME']."/customurl"); */
        }

        else if($db_hashed_pwd ==''){
            echo"1";
        }

        else{echo "0";}
    }

    else{echo "L'accès à cette ressource n'est pas authorisé.";}

?>