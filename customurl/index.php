<?php
    include('./webfiles/controllers/controller.php');
    include('./webfiles/views/html_header.php');
?>

    <h1>Basic URL Rewriter</h1>

    <form action="./webfiles/controllers/addFunction.php" method="POST" class="customURLForm">
        <div class="originalURLField">
            <label for="original-url">Original URL:</label>
            <input type="text" id="original-url" name="original-url">
            <button type="button" id="validateFirst">Valider</button>
        </div>

        <div class="CustomURLField">
            <label for="custom-url">Custom URL:</label>
            <?php getServerURL(); ?>
            <input type="text" id="custom-url" name="custom-url" data-url="<?php getServerURL(); ?>">
            <input type="submit" value="Valider" id="sendButton">
        </div>
    </form>
    
    <h2>Liste des URLs existantes</h2>
        <div class="existingUrls">
            <?php queryAllUrls(); ?>
        </div>

<?php
    include('./webfiles/views/html_footer.php');
?>