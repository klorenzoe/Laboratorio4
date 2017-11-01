function loadJWT()
{
    var password = document.getElementById('JSON_PASSWORD').value;
    var content = document.getElementById('JSON_CONTENT').value;
    document.location.href=  "/JWT/" + password +"&&"+ content;
}

function updatePizzas(pizzaJSON) {
    console.log(pizzaJSON);
    var pizza = JSON.parse(pizzaJSON);
    document.getElementById('pizzaName').value = pizza.name;
    document.getElementById('pizzaDesc').value = pizza.desc;
    var ingrediente = document.getElementsByName('mix');

    console.log(typeof pizza.mix === "string");
    if (typeof pizza.mix === "string") {
            switch (pizza.mix) {
                case "Jamón":
                    document.getElementById('jamon').checked = true;
                    break;
                case "Peperoni":
                    document.getElementById('pepe').checked = true;
                    break;
                case "Champiñones":
                    document.getElementById('champ').checked = true;
                    break;
                case "Pimientos":
                    document.getElementById('pimi').checked = true;
                    break;
                case "Cebolla":
                    document.getElementById('cebol').checked = true;
                    break;
                case "Anchoas":
                    document.getElementById('anch').checked = true;
                    break;
                case "Piña":
                    document.getElementById('pina').checked = true;
                    break;
                case "Tomates":
                    document.getElementById('tomat').checked = true;
                    break;
                case "Albahaca":
                    document.getElementById('albah').checked = true;
                    break;
                default:
                    break;
            }
    } else {
        for (var i in pizza.mix) {
            console.log(pizza.mix[i]);
            console.log(i);
            switch (pizza.mix[i]) {
                case "Jamón":
                    document.getElementById('jamon').checked = true;
                    break;
                case "Peperoni":
                    document.getElementById('pepe').checked = true;
                    break;
                case "Champiñones":
                    document.getElementById('champ').checked = true;
                    break;
                case "Pimientos":
                    document.getElementById('pimi').checked = true;
                    break;
                case "Cebolla":
                    document.getElementById('cebol').checked = true;
                    break;
                case "Anchoas":
                    document.getElementById('anch').checked = true;
                    break;
                case "Piña":
                    document.getElementById('pina').checked = true;
                    break;
                case "Tomates":
                    document.getElementById('tomat').checked = true;
                    break;
                case "Albahaca":
                    document.getElementById('albah').checked = true;
                    break;
                default:
                    break;
            }
        } 
    }
    var radio = document.getElementsByName('masa');
    switch (pizza.mass) {
        case "Delgada":
            radio[0].checked = true;
            break;
        case "Normal":
            radio[1].checked = true;
            break;
        case "Pan":
            radio[2].checked = true;
            break;
    }

    if (pizza.cheese === "1")
        document.getElementsByName('queso')[0].checked = true;

    document.getElementById('porciones').value = pizza.pieces;
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