<?php
    require_once('../models/db_connect.php');

    $original = trim($_POST['original_url']);
    $urlStatus = 0;

    $urlREGEX = "%^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@|\d{1,3}(?:\.\d{1,3}){3}|(?:(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)(?:\.(?:[a-z\d\x{00a1}-\x{ffff}]+-?)*[a-z\d\x{00a1}-\x{ffff}]+)*(?:\.[a-z\x{00a1}-\x{ffff}]{2,6}))(?::\d+)?(?:[^\s]*)?$%iu";

    //  Vérifier que l'URL existe
        $originalUrlHeader = get_headers($original);

        if(!$originalUrlHeader || $originalUrlHeader[0] == 'HTTP/1.1 404 Not Found') {
            $urlStatus = 0;
        }

        else {
            $urlStatus = 1;
        }
    //
    
    //  Vérifier que l'URL de base n'a pas été stockée en BDD //
        $select = db_connect()->query("SELECT * FROM urlrewriter WHERE original ='$original'");
        $originalURLCheckup = $select->fetch(PDO::FETCH_ASSOC);
    //
    

    if(preg_match($urlREGEX, $original) && $urlStatus == 1 && $originalURLCheckup == NULL){
        echo "First validation == OK";
    }

    else{

        if($originalURLCheckup != NULL){
            echo "Original URL already stored in database";
        }
        else{echo "Original URL returns 404 or do not match with the regexp";}
    }

?>