<?php

    require_once('./webfiles/models/db_connect.php');

    function getServerURL(){
        $serverURL = "https://".$_SERVER['SERVER_NAME']."/";
        echo $serverURL;
    }

    function getMinimizedServerURL(){
        $originServerURL = "https://".$_SERVER['SERVER_NAME'];
        $domain = pathinfo($_SERVER['SERVER_NAME'], PATHINFO_EXTENSION);
        $firstCut = substr($originServerURL, 0, 15);
        $endCut = substr(str_replace($domain, '',$originServerURL), -3);

        $minimizedServerURL = $firstCut.'...'.$endCut.$domain.'/';
        echo $minimizedServerURL;
    }

    function getHostN(){
        echo $_SERVER['SERVER_NAME'];
    }

    function queryAllUrls(){
        $displayAll = db_connect()->query('SELECT * FROM urlrewriter');

        while($row = $displayAll->fetch(PDO::FETCH_ASSOC))
        {
            $datas[] = $row;
        }

        foreach($datas as $data){
            if(strlen($data['original']) > 40){$minimizedOriginal = substr($data['original'], 0, 37).'...';}
            else{$minimizedOriginal = $data['original'];}

            if(strlen($data['custom']) > 40){$minimizedCustom = substr($data['custom'], 0, 37).'...';}
            else{$minimizedCustom = $data['custom'];}

            echo "
                <div class='linkRow' id='linkRow_".$data['id']."'>
                    <p class='alignedExistingURLs'>".$minimizedOriginal."</p>
                    <div class='alignedExistingURLs alignedExistingURLsCustom'>
                        <a href='".$data['custom']."' target='_blank'>".$minimizedCustom."</a>
                    </div>
                    <div class='alignedExistingURLs alignedExistingURLsActions'>
                        <button class='copyRowButton' data-clipboard-text='".$data['custom']."' data-link='".$data['custom']."'>Copier</button>
                        <button type='button' class='dropRowButton' data-id='".$data['id']."'>x</button>
                    </div>
                </div>
            ";
        }
    }
?>