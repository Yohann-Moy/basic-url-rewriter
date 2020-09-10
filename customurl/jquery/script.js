$( document ).ready(function() {

    $('#validateFirst').click(function(e){
        $('.URLerror').remove();
        console.log("Event clicked");

        let urlREGEX = new RegExp ('(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])');
        let originalURL = $("#original-url").val();

        // TEST DE L'URL DE BASE //

        if(originalURL.trim()!="" && urlREGEX.test(originalURL)){
            console.log("Original link : "+originalURL);
            $('.originalURLField').slideUp(200);
            $('.CustomURLField').slideDown(500);
        }

        else{
            $('.customURLForm').append('<div class="URLerror">URL vide ou ne correspond pas au standard URL</div>');   
        }
    });

    $("#sendButton").click(function(e){

        $('.URLerror').remove();
        
        e.preventDefault();

        let domain = "https://"+document.location.hostname+"/";
        let urlREGEX = new RegExp ('(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])');
        let originalURL = $("#original-url").val();
        let customURL = $("#custom-url").val();
        let errorCpt = 0;

        // TEST DE L'URL DE BASE //
        if(originalURL.trim()!="" && urlREGEX.test(originalURL)){
            console.log("Original link : "+originalURL);
        }

        else{
            $('.customURLForm').append('<div class="URLerror">URL vide ou ne correspond pas au standard URL</div>');
            errorCpt++;
        }


        // TEST DE L'URL MANUELLE //
        if(customURL.trim()!=""){
            console.log("Custom link : "+domain+customURL);
            $('#custom-url').attr('data-url', domain+customURL);
        }

        else{
            $('.customURLForm').append('<div class="URLerror">Custom URL vide ou ne correspond pas au standard texte</div>');
            errorCpt++;
        }

        // TEST DE SUCCES DE L'ENSEMBLE //
        if(errorCpt == 0){
            console.log("TOUT EST OK");

            $.ajax({
                method: "POST",
                url: "/customurl/webfiles/controllers/addFunction.php",
                headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
    
                data: {
                    "original_url": originalURL,
                    "custom_url": domain+customURL,
                },
    
                dataType: "text",
    
                success: function(response){
                    $('.existingUrls').slideUp(1000);
                    $('.existingUrls').load(document.URL +  ' .existingUrls');

                    $("#original-url").val('');
                    $("#custom-url").val('');
                    $('#custom-url').attr('data-url', '');

                    $('.existingUrls').slideDown(1000);
                },
    
                error: function(xhr){
                  console.log(xhr);
                  alert('ca ne fonctionne pas :(');
                },
            });
        }

        else{}

        console.log(errorCpt);
    });


    // DELETE URL FROM DATABASE //
    $(document).on('click','.dropRowButton', function (e){
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
                $('#linkRow_'+elId).slideUp(200);
                setTimeout(
                    function(){$('#linkRow_'+elId).remove();}
                    ,250
                );
            },

            error: function(xhr){
              console.log(xhr);
              alert('ca ne fonctionne pas :(');
            },
        });
    });
    
});