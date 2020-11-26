<?php
    session_start();
    include('../html_header.php');
    if(@$_SESSION["connected"]==true){
        header("Location: https://".$_SERVER['SERVER_NAME']."/customurl");
    }
?>

<article id="ym-connex-register-tool">
    <div class="ym-connex-register-entire-container">
        <div class="ym-connex-register-card-header">
            <h1>Créez un compte</h1>
        </div>
        <form action="./webfiles/controllers/separate/signme.php" method="POST" class="ym-login-form">
            <div class ="ym-connex-register-card-body">
                <div class="ym-form-group-row">
                    <label for="accountID" class="ym-form-labels">Choisissez un identifiant:</label>
                    <div class='ym-connex-register-input-row'>
                        <input id="accountID" type="text" class="ym-form-control" name="accountID" required="">
                    </div>
                </div>
                <div class="ym-form-group-row">
                    <label for="password" class="ym-form-labels">Choisissez un mot de passe:</label>
                    <div class='ym-connex-register-input-row'>
                        <input id="password" type="password" class="ym-form-control " name="password" required="">
                    </div>
                </div>
            </div>
            <div class="ym-connex-register-card-footer">
                <input type="submit" class="submitbutton" id="inscriptionButton" value="S'inscrire">
            </div>
        </form>
    </div>
</article>

<?php
    include('../html_footer.php');
?>