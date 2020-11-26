<?php

    session_start();

    include('./webfiles/controllers/controller.php');
    include('./webfiles/views/html_header.php');

    if($_SESSION["connected"]==false){
        header("Location: https://".$_SERVER['SERVER_NAME']."/customurl/login.php");
    }

?>

    <header>
        <menu>
            <a href="<?php getServerURL(); ?>" target="_blank"><?php getHostN(); ?></a>
            <a href="./webfiles/controllers/separate/logout.php">Déconnexion</a>
        </menu>
    </header>

    <article id="toolTitle">
        <h1>Personnalisez vos URLs</h1>
        <h2>et facilitez le partage de vos liens favoris à tous vos amis!</h2>
    </article>

    <article id="toolFonctions">
        <form action="./webfiles/controllers/addFunction.php" method="POST" class="customURLForm">
            <div class="originalURLField">
                <h3>Allons-y doucement...</h3>
                <p>Collez ci-dessous le lien que vous souhaitez personnaliser.</p>
                <div class="firstUrlInputContainer">
                    <input type="text" id="original-url" name="original-url" placeholder="Renseignez l'URL à personnaliser..." autocomplete="off">
                </div>
                <div class="firstUrlInputContainer">
                    <button type="button" id="validateFirst">Continuer...</button>
                </div>
            </div>

            <div class="CustomURLField">
                <h3>Transformez ce lien en une URL personnalisée...</h3>
                <p>Saisissez ci-dessous un nom simple, efficace et en rapport avec le sujet du lien initial.</p>
                <div class="customUrlInputContainer">
                    <label for="custom-url" class="inlineInputs"><?php getMinimizedServerURL(); ?></label>
                    <input type="text" class="inlineInputs" id="custom-url" name="custom-url" placeholder="personnalisez-moi" data-url="<?php getServerURL(); ?>" autocomplete="off">
                </div>

                <div class="customUrlInputContainer">
                    <button type="button" id="sendButton">Customiser</button>
                </div>
            </div>
        </form>
    </article>

    <div class="magicSeparator"></div>
    
    <article id="existingURLsContainer">
        <h3>Gérez vos liens :</h3>
        <div class="existingUrls">
            <?php queryAllUrls(); ?>
        </div>
    </article>

    <footer>
        <p>This amazing tool is brought by the ♥ of <a href="http://yohannmoy.fr/" target="_blank">Yohann MOY.</a></p>
    </footer>

<?php
    include('./webfiles/views/html_footer.php');
?>