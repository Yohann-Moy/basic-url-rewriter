<?php

    require_once('./webfiles/models/db_connect.php');

    function getServerURL(){
        $serverURL = "https://".$_SERVER['SERVER_NAME']."/";
        echo $serverURL;
    }

    function queryAllUrls(){
        $displayAll = db_connect()->query('SELECT * FROM urlrewriter');

        while($row = $displayAll->fetch(PDO::FETCH_ASSOC))
        {
            $datas[] = $row;
        }

        foreach($datas as $data){
            echo "<div class='linkRow' id='linkRow_".$data['id']."'>".$data['id']." - ".$data['original']." - <a href='".$data['custom']."' target='_blank'>".$data['custom']."</a><button type='button' class='dropRowButton' data-id='".$data['id']."'>x</button><br></div>";
        }
    }
?>