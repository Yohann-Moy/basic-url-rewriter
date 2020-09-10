<?php

    function db_connect(){
        $user = '';
        $pass = '';
        
        try {
            $dbh = 
                new PDO('mysql:host=;dbname=;charset=UTF8',$user,$pass);
        } 
        
        catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }

        return $dbh;
    }

?>