
function loadJWT()
{
    var password = document.getElementById('JSON_PASSWORD').value;
    var content = document.getElementById('JSON_CONTENT').value;
    document.location.href=  "/JWT/" + password +"&&"+ content;
}

function loadPizzas(pizzaJSON)
{
    var pizzas = JSON.parse(pizzaJSON);
    //Obtenemos la tabla
    var table = document.getElementById("pizzasInfo").getElementsByTagName("tbody")[0];
    table.innerHTML = "";
    // Constantes 
    let btn_edit = '<button type="submit" name="'
    let btn_edit_f = '" class="btn btn-warning m-1">Editar</button>';
    let btn_delete = '<button id="btn_DeletePizza" name="'
    let btn_delete_f = '" class="btn btn-danger m-1">Borrar</button>';

    for(var pizza in pizzas)
    {
        //Insertamos una nueva fila
        var row = table.insertRow(0);
        //Insertamos las celdas
        var pizzaName =  row.insertCell(0);
        var pizzaDesc =  row.insertCell(1);
        var pizzaMix =  row.insertCell(2);
        var pizzaMass=  row.insertCell(3);
        var pizzaCheese =  row.insertCell(4);
        var pizzaPieces =row.insertCell(5);
        var pizzaOptions =  row.insertCell(6);

        pizzaName.innerHTML = pizzas[pizza].name;
        pizzaDesc.innerHTML = pizzas[pizza].desc;
        pizzaMix.innerHTML = pizzas[pizza].mix;
        pizzaMass.innerHTML = pizzas[pizza].mass;
        pizzaCheese.innerHTML = pizzas[pizza].cheese === "1" ? "Sí":'No';
        pizzaPieces.innerHTML = pizzas[pizza].pieces;
        pizzaOptions.innerHTML = btn_edit + pizzas[pizza].name  + btn_edit_f;
        pizzaOptions.innerHTML += btn_delete + pizzas[pizza].name  + btn_delete_f;
    }
}

function makeRequest(requestType, requestLink, dataJSON, successFunction)
{
    $.ajax({
        type: requestType,
        url: 'http://localhost:3000/' + requestLink,
        data: dataJSON,
        dataType: 'json',
        success : successFunction
    });
}

function showMessage(dataJSON){
    $('#form_CreatePizza').fadeOut();
    $('#message').html(dataJSON.message);
    $('#status').html(dataJSON.status);
    $('#message').show();
    $('#status').show();
}