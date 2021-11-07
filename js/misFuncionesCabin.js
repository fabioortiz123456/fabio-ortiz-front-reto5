function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.123.87:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

//Manejador GET
function traerInformacionSkate() {
    $.ajax({
        url:"http://129.151.123.87:8080/api/Cabin/all",
        //url: "http://localhost:8080/api/Cabin/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaSkate(response);
        }

    });

}

function pintarRespuestaSkate(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Modelo</td>";
        myTable+="<td>Rooms</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].rooms + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonSkate2" onclick="borrar(' + response[i].id + ')">Borrar cabaña!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="cargarDatosSkate(' + response[i].id + ')">Editar cabaña!</button></td>';
        myTable+='<td><button class = "botonSkate2" onclick="actualizar(' + response[i].id + ')">Actualizar cabaña!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaSkate").html(myTable);
}

//Capturar informacion para Actualizar
function cargarDatosSkate(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.123.87:8080/api/Cabin/"+id,
        //url: "http://localhost:8080/api/Cabin/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name").val(item.name);
            $("#brand").val(item.brand);
            $("#rooms").val(item.rooms);
            $("#description").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarSkate() {

   // if($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#rooms").val().length == 0 || $("#description").val().length == 0){
       //alert("Todos los campos son obligatorios")
    //}else{

            let elemento = {
                name: $("#name").val(),
                brand: $("#brand").val(),
                rooms: $("#rooms").val(),
                description: $("#description").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://129.151.123.87:8080/api/Cabin/save",
                //url: "http://localhost:8080/api/Cabin/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                   // $("#resultado").empty();
                    $("#name").val("");
                    $("#brand").val("");
                    $("#rooms").val("");
                    $("#description").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    //}
}

//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.123.87:8080/api/Cabin/"+idElemento,
            //url: "http://localhost:8080/api/Cabin/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#rooms").val().length == 0 || $("#description").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name").val(),
            brand: $("#brand").val(),
            rooms: $("#rooms").val(),
            description: $("#description").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.123.87:8080/api/Cabin/update",
           // url: "http://localhost:8080/api/Cabin/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();
                traerInformacionSkate();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name").val("");
                $("#brand").val("");
                $("#rooms").val("");
                $("#description").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
