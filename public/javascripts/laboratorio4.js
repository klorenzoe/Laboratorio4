function loadJWT()
{
    var password = document.getElementById('JSON_PASSWORD').value;
    var content = document.getElementById('JSON_CONTENT').value;
    document.location.href=  "/JWT/" + password +"&&"+ content;
}

function loadPizzas(pizzaJSON)
{
    console.log(pizzaJSON);
    var pizzas = JSON.parse(pizzaJSON);
    //Obtenemos la tabla
    var table = document.getElementById("pizzasInfo").getElementsByTagName("tbody")[0];
    
    // Constantes 
    let btn_edit = '<button type="submit" class="btn btn-warning m-1">Editar</button>';
    let btn_delete = '<button type="submit" class="btn btn-danger m-1">Borrar</button>';
    let form_edit = '<form action="pizzaCRUD/Update" method="get">';
    let form_delete = '<form action="pizzaCRUD/Delete" method="get">';
    let hidden = '<input type="text" style="display: none;" name="name" value="';
    let hiddenf = '">';

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
        pizzaOptions.innerHTML = form_edit + hidden +  pizzas[pizza].name + hiddenf + btn_edit + '</form>';
        pizzaOptions.innerHTML += form_delete + hidden +  pizzas[pizza].name + hiddenf + btn_delete + '</form>';
    }
}