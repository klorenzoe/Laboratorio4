//jQuery
$(document).ready(function(){
    
    $('#nameMessage').hide();
    $('#descMessage').hide();
    $('#massMessage').hide();
    $('#piecesMessage').hide();
    
    $('#status').hide();
    $('#message').hide();
    
    // jQuery's create pizza method implementation...
    // Implementación del metodo jQuery para crear pizzas
    $('#btn_CreatePizza').click(function(){
        event.preventDefault();

        //Validamos que algunos campos esten correctos
        bool = true;
        if (!$('#pizzaName').val()){
            bool = false;
            $('#nameMessage').hide();
            $('#nameMessage').show();
        }
        if (!$('#pizzaDesc').val()){
            bool = false;
            $('#descMessage').hide();
            $('#descMessage').show();
        }
        if (!$('input[name=masa]:checked').val()){
            bool = false;
            $('#massMessage').hide();
            $('#massMessage').show();
        }
        if ($('#porciones').val() < 4 || $('#porciones').val() > 16){
            bool = false;
            $('#piecesMessage').hide();
            $('#piecesMessage').show();
        }
        // se valida que todo este correcto
        if (!bool) return;
        //Cremos el objeto pizza
        var pizza = {};
        mixR = "";
        $('input[name=mix]:checked').each(function() {
            mixR += ($(this).val()) + " ";
        });

        pizza = {
            name : $('#pizzaName').val(),
            desc : $('#pizzaDesc').val(),
            mix : mixR,
            mass : $('input[name=masa]:checked').val(),
            cheese : $('input[name=queso]:checked').val() === undefined ? 0:1,
            pieces : $('#porciones').val()
        }
        //Creamos el request al servidor por post
        makeRequest('POST', 'pizzaCRUD/Create', pizza, function(data) { showMessage(data); } );
    });


    //Implementación en jQuery del metodo para borrar/actualizar
    $(document).on('click', 'button', function(event) {
        if (this.id === "btn_DeletePizza"){
             //obtenemos el 'name' del boton que contiene el name de la pizza
             var pizzaName = this.name;
             makeRequest('DELETE', 'pizzaCRUD/Delete', { name : pizzaName }, function(data) { location.reload(); } );
        }
      });

      $('#btn_UpdatePizza').click(function(){
        event.preventDefault();
        
                //Validamos que algunos campos esten correctos
                bool = true;
                if (!$('#pizzaName').val()){
                    bool = false;
                    $('#nameMessage').hide();
                    $('#nameMessage').show();
                }
                if (!$('#pizzaDesc').val()){
                    bool = false;
                    $('#descMessage').hide();
                    $('#descMessage').show();
                }
                if (!$('input[name=masa]:checked').val()){
                    bool = false;
                    $('#massMessage').hide();
                    $('#massMessage').show();
                }
                if ($('#porciones').val() < 4 || $('#porciones').val() > 16){
                    bool = false;
                    $('#piecesMessage').hide();
                    $('#piecesMessage').show();
                }
                // se valida que todo este correcto
                if (!bool) return;
                //Cremos el objeto pizza
                var pizza = {};
                mixR = "";
                $('input[name=mix]:checked').each(function() {
                    mixR += ($(this).val()) + " ";
                });
        
                pizza = {
                    name : $('#pizzaName').val(),
                    desc : $('#pizzaDesc').val(),
                    mix : mixR,
                    mass : $('input[name=masa]:checked').val(),
                    cheese : $('input[name=queso]:checked').val() === undefined ? 0:1,
                    pieces : $('#porciones').val()
                }
        makeRequest('PUT', 'pizzaCRUD/Update', pizza, function(data) { showMessage(data); } );        
      });

    //Implementacion en JQuery del metodo para busqueda
    $('#btn_SearchPizza').click(function(){
        event.preventDefault();
        
        //obtenemos el 'name' del boton 
        var pizzaName = $('#word').val();
        makeRequest('GET', 'pizzaCRUD/Search', { name : pizzaName }, function(data) { loadPizzas(data.results) });
    });
});

