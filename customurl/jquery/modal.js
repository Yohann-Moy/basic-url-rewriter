$( document ).ready(function() {
    $(document).on('click','.dropRowButton', function(){

        resetModalState();

        console.log($(this).attr("data-id"));

        $(document.body).append(`
            <div class='ym-modal-shadow'>
                <div class='ym-modal-container'>
                    <div class='ym-modal-box'>

                        <div class='ym-modal-header'>
                            <p>Supprimer cette redirection ?</p>
                        </div>

                        <div class='ym-modal-body'>
                            <p>La suppression de cette redirection impactera l'accès à la ressource initiale depuis les plateformes sur lesquelles vous avez partagé ce lien personnalisé.</p><br>
                            <p>Êtes-vous certain de vouloir poursuivre ?</p>
                        </div>

                        <div class='ym-modal-footer'>
                            <button type="button" class="refuse">Non</button>
                            <button type="button" class="accept" data-id="`+$(this).attr("data-id")+`">Oui</button>
                        </div>

                    </div>
                </div>
            </div>
        `);
    });

    $(document).on('click','.accept', function(){
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
                resetModalState();
            },

            error: function(xhr){
              console.log(xhr);
              alert('ca ne fonctionne pas :(');
            },
        });
    });

    $(document).on('click','.refuse', function(){
        resetModalState();
    });

    function resetModalState(){
        $('.ym-modal-shadow').remove();
        $('.ym-modal-container').remove();
    }

    $(document).mouseup(function(e) 
    {
        var container = $('.ym-modal-box');

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0 && e.which === 1) 
        {
            resetModalState();
        }
    });


});