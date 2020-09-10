<?php
    require_once('../models/db_connect.php');

    $idToDrop = $_POST['element_id'];

    $drop = db_connect()->prepare('DELETE FROM urlrewriter WHERE id = :idToDrop');

    $drop->bindParam(':idToDrop', $idToDrop);

    $drop->execute();

?>