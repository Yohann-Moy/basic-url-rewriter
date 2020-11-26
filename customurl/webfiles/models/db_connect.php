<?php

    function db_connect(){
        $user = 'username';
        $pass = 'password';
        
        try {
            $dbh = 
            new PDO('mysql:host=dbhost;dbname=dbname;charset=UTF8',$user,$pass);
        } 
        
        catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }

        return $dbh;
    }

?>