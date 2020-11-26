<?php 

    require_once('../../models/db_connect.php');
    session_start();

    if((isset($_POST["accountID"]) && trim($_POST["accountID"])!='') && (isset($_POST["password"]) && trim($_POST["password"])!='')){
        $accountIDRegex = "#^[a-zA-Z0-9_@]{4,20}$#";
        $passwordRegex = "#^[a-zA-Z0-9_@]{4,20}$#";

        /* Si l'identifiant et le mot de passe suivent les REGEX */
        if(preg_match($accountIDRegex, $_POST["accountID"]) && preg_match($passwordRegex, $_POST["password"])){

            /* Interroge la BDD pour récupérer les DATAS relatives au login saisi dans le formulaire d'inscription */
            $getAllAccountsLogins = db_connect()->query("SELECT * FROM urlrewaccounts WHERE login = '$_POST[accountID]'");

            /* Stocke et associe le premier résultat de la requête dans la variable tableau $db_get_login */
            $db_get_login = $getAllAccountsLogins->fetch(PDO::FETCH_ASSOC);
            
            /* Si la ligne login n'est pas vide et que son contenu match avec la saisie dans le formulaire */
            if($db_get_login['login'] != NULL && ($db_get_login['login'] == $_POST["accountID"])){
                echo "0";
            }

            /* Sinon, si l'utilisateur n'existe pas on insert ses data en base */
            else{
                $hashedPassword = password_hash($_POST["password"], PASSWORD_DEFAULT);

                $insert = db_connect()->prepare('INSERT INTO urlrewaccounts (login, password) VALUES (:login, :pwd)');
        
                $insert->bindParam(':login', $_POST["accountID"]);
                $insert->bindParam(':pwd', $hashedPassword);
            
                $insert->execute();
    
                $_SESSION["connected"] = true;

                echo "1";
                
                /* header("Location: https://".$_SERVER['SERVER_NAME']."/customurl"); */
            }
        }

        /* Si l'identifiant ou le mot de passe ne correspondent pas aux REGEX */
        else{
            echo "2";
        }
    }

    else{
        echo "3";
    }

?>