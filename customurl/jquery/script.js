$( document ).ready(function() {

/*     $('.linkRow').slice(+3).hide();

    $('.existingUrls').each(function(e){

        let firstLinks = $(this).find(".linkRow:lt(3)");
        $(firstLinks).show();      

    }); */





        
    
    $(document).on("click", ".copyRowButton" , function(e){
        $(this).html('Copié!');
        $(this).css("border-color","#49A078");
        $(this).css("background-color","#49A078");

        setTimeout(function(e) { 
            $('.copyRowButton').html('Copier');
            $('.copyRowButton').css("border-right","2px solid #b9c4da");
            $('.copyRowButton').css("border-bottom","2px solid #b9c4da");
            $('.copyRowButton').css("background-color","#4c5e7d");
        }, 1000);
    });

    $(document).on("mouseover", ".copyRowButton" , function(){
        if($(this).html()!='Copié!'){
            $(this).css("background-color","#4c5e7dd5");
        }
    });

    $(document).on("mouseout", ".copyRowButton" , function() {
        if($(this).html()!='Copié!'){
            $(this).css("border-right","2px solid #b9c4da");
            $(this).css("border-bottom","2px solid #b9c4da");
            $(this).css("background-color","#4c5e7d");
        }
    });

    $('#validateFirst').click(function(e){
        $('.URLsuccess').remove();
        $('.URLerror').remove();
        $('.URLwarning').remove();

        let urlREGEX = new RegExp ('(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])');
        let originalURL = $("#original-url").val();

        // TEST DE L'URL DE BASE //

        if(originalURL.trim()!="" && urlREGEX.test(originalURL)){

            // Fonction AJAX qui permet de vérifier que l'URL retourne 200 ou 301 et qu'elle est conforme //

            $.ajax({
                method: "POST",
                url: "/customurl/webfiles/controllers/firstValidation.php",
                headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
    
                data: {
                    "original_url": originalURL,
                },
    
                dataType: "text",
    
                success: function(response){
                    /* console.log(response); */

                    if(response == "Original URL already stored in database"){
                        $('.URLerror').remove();
                        $('.customURLForm').append('<div class="URLwarning">Vous avez déja personnalisé cette URL. <a class="warningNevermind" href="">Ignorer</a></div>');
                    }

                    else if(response == "Original URL returns 404 or do not match with the regexp"){
                        $('.URLerror').remove();
                        $('.customURLForm').append("<div class='URLerror'>l'URL saisie n'existe pas (Erreur HTTP 404 - not found).</div>");
                    }

                    else{
                        $('.originalURLField').fadeOut(300);

                        setTimeout(function() { 
                            $('.CustomURLField').fadeIn(300)
                        }, 299);
                    }

                },
    
                error: function(xhr){
                  console.log(xhr);
                  alert('ca ne fonctionne pas :(');
                },
            });



            // Fin de l'AJAX
        }

        else{
            if(originalURL.trim()==""){
                $('.customURLForm').append("<div class='URLerror'>Saisissez une URL avant de souhaiter poursuivre.</div>");
            }
            else{
                $('.customURLForm').append("<div class='URLerror'>L'URL saisie ne correspond pas au standard syntaxique.</div>");
            }
               
        }
    });

    $(document).on("click", ".warningNevermind" , function(e){

        e.preventDefault();

        $('.URLsuccess').remove();
        $('.URLerror').remove();
        $('.URLwarning').remove();

        $('.originalURLField').fadeOut(300);

        setTimeout(function() { 
            $('.CustomURLField').fadeIn(300)
        }, 299);
    });

    $("#sendButton").click(function(e){

        $('.URLsuccess').remove();
        $('.URLerror').remove();
        $('.URLwarning').remove();
        
        e.preventDefault();

        let domain = "https://"+document.location.hostname+"/";
        let urlREGEX = new RegExp ('(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])');
        let originalURL = $("#original-url").val();
        let customURL = $("#custom-url").val();
        let errorCpt = 0;

        // TEST DE L'URL DE BASE //
        if(originalURL.trim()!="" && urlREGEX.test(originalURL)){
/*             console.log("Original link : "+originalURL); */
        }

        else{
            $('.customURLForm').append('<div class="URLerror">Saisissez une URL conforme et existante.</div>');
            errorCpt++;
        }


        // TEST DE L'URL MANUELLE //
        if(customURL.trim()!=""){
/*             console.log("Custom link : "+domain+customURL); */
            $('#custom-url').attr('data-url', domain+customURL);
        }

        else{
            $('.customURLForm').append('<div class="URLerror">Custom URL vide ou ne correspond pas au standard texte</div>');
            errorCpt++;
        }

        // TEST DE SUCCES DE L'ENSEMBLE //
        if(errorCpt == 0){
/*             console.log("TOUT EST OK"); */

            $.ajax({
                method: "POST",
                url: "/customurl/webfiles/controllers/addFunction.php",
                headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
    
                data: {
                    "original_url": originalURL,
                    "custom_url": domain+customURL,
                    "custom_url_typed_part":customURL,
                },
    
                dataType: "text",
    
                success: function(response){
                    /* console.log(response); */

                    if(response == "Custom URL already stored in database"){
                        $('.URLerror').remove();
                        $('.customURLForm').append('<div class="URLerror">Cette re-direction existe déjà.</div>');
                    }

                    else if(response == "Custom URL string contains non-alphanumeric characters"){
                        $('.customURLForm').append("<div class='URLerror'>La redirection ne peut que contenir des lettres et des chiffres.(a-z-A-Z-0-9).</div>");
                    }

                    else{
                        $('.URLerror').remove();
                        $('.CustomURLField').fadeOut(300);
    
                        setTimeout(function() { 
                            $('.customURLForm').append("<div class='URLsuccess'><h3>Félicitations, tout s'est passé comme sur des roulettes!</h3><p>Lien de base : <a href="+originalURL+" target='_blank'>"+originalURL+"</a></p><p>URL personnalisée associée : <a href="+domain+customURL+" target='_blank'>"+domain+customURL+"</a></p><button type='button' class='treatMoreLinks'>Traiter d'autres liens</button></div>").fadeIn(300);
                        }, 299);
                        
    
                        $('.existingUrls').hide();
                        $('.existingUrls').load(document.URL +  ' .existingUrls');
    
                        $("#original-url").val('');
                        $("#custom-url").val('');
                        $('#custom-url').attr('data-url', '');
    
                        $('.existingUrls').show();
                    }

                },
    
                error: function(xhr){
                  console.log(xhr);
                  alert('ca ne fonctionne pas :(');
                },
            });
        }

        else{}

/*         console.log(errorCpt); */
    });


    // DELETE URL FROM DATABASE //
/*     $(document).on('click','.dropRowButton', function (e){
        let elId = $(this).data("id");

        $.ajax({
            method: "POST",
            url: "/customurl/webfiles/controllers/rmFunction.php",
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            data: {
                "element_id": elId,
            },

            dataType: "text",

            success: function(response){
                $('#linkRow_'+elId).remove();
            },

            error: function(xhr){
              console.log(xhr);
              alert('ca ne fonctionne pas :(');
            },
        });
    }); */

    $(document).on('click','.treatMoreLinks', function (e){
        $('.URLsuccess').fadeOut(300);
        setTimeout(function() { 
            $('.originalURLField').fadeIn(300);
            $('.URLsuccess').remove();
        }, 299);
    });


    // Connexion stuff //

    function colorFieldsReINIT(){
        $("#accountID").css("border-color","#9aa6ba");
        $("#accountID").css("-webkit-text-fill-color","#4c5e7d");

        $("#password").css("border-color","#9aa6ba");
        $("#password").css("-webkit-text-fill-color","#4c5e7d");
    }

    $("#inscriptionButton").click(function(e){
        e.preventDefault();
        $('.createOrLoginAccountError').remove();
        colorFieldsReINIT();

        let accountName = $("#accountID").val();
        let pwd = $("#password").val();

        $.ajax({
            method: "POST",
            url: "/customurl/webfiles/controllers/separate/signme.php",
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            data: {
                "accountID": accountName,
                "password": pwd,
            },

            dataType: "text",

            success: function(response){

                if(response == 0){
                    $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>Identifiant déja associé à un compte.</div>");
                    $("#accountID").css("border-color","#ff6663");
                    $("#accountID").css("-webkit-text-fill-color","#ff6663");
                }
                else if(response == 1){
                    $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountSuccess'>Compte créé avec succès.</div>");
                    
                    $("#inscriptionButton").prop('disabled', true);
                    $("#accountID").prop('disabled', true);
                    $("#password").prop('disabled', true);

                    $("#accountID").css("border-color","#49A078");
                    $("#accountID").css("-webkit-text-fill-color","#49A078");
                    $("#password").css("border-color","#49A078");
                    $("#password").css("-webkit-text-fill-color","#49A078");
                    $("#inscriptionButton").css("background","#4c5e7dd5");
                    $("#inscriptionButton").css("cursor","not-allowed;");

                    $("#inscriptionButton").fadeOut(500);

                    setTimeout(function() { 
                        window.location.href = "./";
                    }, 2000);
                }

                else if(response == 2){
                    let LoginAndPwdREGEX = new RegExp('^[a-zA-Z0-9_@]{4,20}$');

                    if(LoginAndPwdREGEX.test($("#accountID").val())){
                        $("#accountID").css("border-color","#49A078");
                        $("#accountID").css("-webkit-text-fill-color","#49A078");
                    }

                    else{
                        $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>L'identifiant renseigné ne correspond pas aux règles syntaxiques authorisées.</div>");

                        $("#accountID").css("border-color","#ff6663");
                        $("#accountID").css("-webkit-text-fill-color","#ff6663");
                    }

                    if(LoginAndPwdREGEX.test($("#password").val())){
                        $("#password").css("border-color","#49A078");
                        $("#password").css("-webkit-text-fill-color","#49A078");
                    }

                    else{
                        $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>Le mot de passe renseigné ne correspond pas aux règles syntaxiques authorisées.</div>");

                        $("#password").css("border-color","#ff6663");
                        $("#password").css("-webkit-text-fill-color","#ff6663");
                    }
                }

                else if(response == 3){

                    if(($("#accountID").val()).trim()=='' && ($("#password").val()).trim()==''){
                        $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>Renseignez un identifiant et un mot de passe.</div>");

                        $("#accountID").css("border-color","#ff6663");
                        $("#accountID").css("-webkit-text-fill-color","#ff6663");

                        $("#password").css("border-color","#ff6663");
                        $("#password").css("-webkit-text-fill-color","#ff6663");
                    }

                    else if(($("#accountID").val()).trim()==''){
                        $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>Le compte n'a pas pu être créé car l'identifiant est vide.</div>");

                        $("#accountID").css("border-color","#ff6663");
                        $("#accountID").css("-webkit-text-fill-color","#ff6663");
                    }

                    else if(($("#password").val()).trim()==''){
                        $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>Le compte n'a pas pu être créé car aucun mot de passe n'a été renseigné.</div>");

                        $("#password").css("border-color","#ff6663");
                        $("#password").css("-webkit-text-fill-color","#ff6663");
                    }
                }
            },

            error: function(xhr){
                console.log(xhr);
                alert("Une erreur inattendue s'est produite. Réé-essayez après avoir raffraichi la page.");
            },
        });
    });

    $("#loginButton").click(function(e){
        e.preventDefault();
        $('.createOrLoginAccountError').remove();
        colorFieldsReINIT();

        let accountName = $("#accountID").val();
        let pwd = $("#password").val();

        if(($("#accountID").val()).trim()=='' && ($("#password").val()).trim()==''){
            $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>Renseignez votre identifiant et votre mot de passe.</div>");

            $("#accountID").css("border-color","#ff6663");
            $("#accountID").css("-webkit-text-fill-color","#ff6663");

            $("#password").css("border-color","#ff6663");
            $("#password").css("-webkit-text-fill-color","#ff6663");
        }

        else if(($("#accountID").val()).trim()==''){
            $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>Renseignez votre identifiant.</div>");

            $("#accountID").css("border-color","#ff6663");
            $("#accountID").css("-webkit-text-fill-color","#ff6663");
        }

        else if(($("#password").val()).trim()==''){
            $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>Renseignez votre mot de passe.</div>");

            $("#password").css("border-color","#ff6663");
            $("#password").css("-webkit-text-fill-color","#ff6663");
        }

        $.ajax({
            method: "POST",
            url: "/customurl/webfiles/controllers/separate/logme.php",
            headers: {
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            data: {
                "accountID": accountName,
                "password": pwd,
            },

            dataType: "text",

            success: function(response){

                /* console.log(response); */

                if(response == 0){
                    $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>L'identifiant et le mot de passe saisis sont incohérents.</div>");

                    $("#accountID").css("border-color","#ff6663");
                    $("#accountID").css("-webkit-text-fill-color","#ff6663");

                    $("#password").css("border-color","#ff6663");
                    $("#password").css("-webkit-text-fill-color","#ff6663");
                }

                else if(response == 1){
                    $('.ym-connex-register-card-body').append("<div class='createOrLoginAccountError'>L'identifiant saisi n'est associé à aucun compte.</div>");

                    $("#accountID").css("border-color","#ff6663");
                    $("#accountID").css("-webkit-text-fill-color","#ff6663");
                }

                else if(response == 2){window.location.href = "./";}
            },

            error: function(xhr){
                console.log(xhr);
                alert("Une erreur inattendue s'est produite. Réé-essayez après avoir raffraichi la page.");
            },
        });
    });
    
});

