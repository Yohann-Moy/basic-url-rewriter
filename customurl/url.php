<?php 
    require_once('./webfiles/models/db_connect.php');

    $originServerURL = "https://".$_SERVER['SERVER_NAME'];

    if (!isset($_GET["customurl"])) {
        echo "<br/>url not found";
        exit;
    }

    else{
        $typedURL = "https://".$_SERVER['SERVER_NAME']."/".$_GET["customurl"];
        $getUrlParams = db_connect()->query("SELECT * FROM urlrewriter WHERE custom ='$typedURL'");

        $numrows = $getUrlParams->rowCount();

        if($numrows == 1){
            $row = $getUrlParams->fetch(PDO::FETCH_ASSOC);
            $url = $row['original'];

            $originalUrlHeader = @get_headers($url);

            if(!$originalUrlHeader || $originalUrlHeader[0] == 'HTTP/1.1 404 Not Found') {
                header("Location: $originServerURL");
            }

            else {
                header("Location: $url");
            }
        }

        else{
            header("Location: $originServerURL");
        } 
    }
?>