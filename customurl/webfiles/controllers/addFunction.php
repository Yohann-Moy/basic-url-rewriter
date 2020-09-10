<?php
    require_once('../models/db_connect.php');

    $original = trim($_POST['original_url']);
    $custom = trim($_POST['custom_url']);
    $urlStatus = 0;
    
    $serviceURL = "https://".$_SERVER['SERVER_NAME']."/customurl";

    $urlREGEX = "%^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@|\d{1,3}(?:\.\d{1,3}){3}|(?:(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)(?:\.(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)*(?:\.[a-z\x{00a1}-\x{ffff}]{2,6}))(?::\d+)?(?:[^\s]*)?$%iu";
    
    // Vérifier que l'URL existe
        $originalUrlHeader = get_headers($original);

        if(!$originalUrlHeader || $originalUrlHeader[0] == 'HTTP/1.1 404 Not Found') {
            $urlStatus = 0;
        }

        else {
            $urlStatus = 1;
        }
    // 

    if(preg_match($urlREGEX, $original) && $urlStatus == 1){
        
        $insert = db_connect()->prepare('INSERT INTO urlrewriter (original, custom) VALUES (:original, :custom)');

        $insert->bindParam(':original', $original);
        $insert->bindParam(':custom', $custom);
    
        $insert->execute();

        $urlStatus = 0;
    }

    else{
        echo "L'URL saisie n'existe pas.";
    }

?>