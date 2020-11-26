<?php
    require_once('../models/db_connect.php');

    $original = trim($_POST['original_url']);
    $custom = trim($_POST['custom_url']);
    $customTypedPart = trim($_POST['custom_url_typed_part']);
    
    $serviceURL = "https://".$_SERVER['SERVER_NAME']."/customurl";

    // Vérifier que la customisation n'a encore été pas stockée en BDD //
    $select = db_connect()->query("SELECT * FROM urlrewriter WHERE custom ='$custom'");
    $customURLCheckup = $select->fetch(PDO::FETCH_ASSOC);
    

    if(ctype_alnum($customTypedPart) && $customURLCheckup == NULL){
        
        $insert = db_connect()->prepare('INSERT INTO urlrewriter (original, custom) VALUES (:original, :custom)');

        $insert->bindParam(':original', $original);
        $insert->bindParam(':custom', $custom);
    
        $insert->execute();

    }

    else{

        if($customURLCheckup != NULL){
            echo "Custom URL already stored in database";
        }
        else{echo "Custom URL string contains non-alphanumeric characters";}
    }

?>