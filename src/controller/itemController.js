function saveItem() {
    const myObject={
        id:$('#ItemID').val().toString().trim(),
        name:$('#ItemName').val().toString().trim(),
        qty:$('#ItemQTY').val().toString().trim(),
        price:$('#ItemPrice').val().toString().trim()
    }

    $.ajax({
        url:'http://localhost:8080/api/v1/item',
        type:'POST',
        dataType:'json',
        contentType:'application/json',
        success:function (resp) {
            if(resp.code == 200){
                alert("CUSTOMER ADDED");
                getAllItems();
            }else{
                alert(resp);
            }
        },
        data:JSON.stringify(myObject)
    });

}


function deleteItem() {

    let iID=$('#ItemID').val().toString().trim();

    if(confirm("are you sure  delete this item")){
        $.ajax({
            url:'http://localhost:8080/api/v1/item?'+$.param({id:iID}),
            type:'DELETE',
            dataType:'json',
            contentType:'application/json',
            success:function (resp) {
                if(resp.code == 200){
                    alert("ITEM DELETED");
                    getAllItems();
                }else{
                    alert(resp);
                }
            }
        })
    }

}

function updateItem() {
    const myObject={
        id:$('#ItemID').val().toString().trim(),
        name:$('#ItemName').val().toString().trim(),
        QTY:$('#ItemQTY').val().toString().trim(),
        price:$('#ItemPrice').val().toString().trim()
    }

    $.ajax({
        url:'http://localhost:8080/api/v1/item',
        type:'PUT',
        dataType:'json',
        contentType:'application/json',
        success:function (resp) {
            if(resp.code == 200){
                alert("CUSTOMER UPDATED");
                getAllItems();
            }else{
                alert(resp);
            }
        },
        data:JSON.stringify(myObject)
    })

}

function getAllItems() {
    $('#tblItembody').empty();

    $.ajax({
        url:'http://localhost:8080/api/v1/item',
        type:'GET',
        dataType:'json',
        contentType:'application/json',
        success:function (resp) {
            console.log(resp)
            $.each(resp.data,function (idx,ele) {
                let row='<tr>'+
                    '<td>'+ele.id+'</td>'+
                    '<td>'+ele.name+'</td>'+
                    '<td>'+ele.qty+'</td>'+
                    '<td>'+ele.price+'</td>'
                '</tr>';

                $('#tblItembody').append(row);
            })
        }
    })
}

$("#ItemID").on('keypress',function (e) {
    if(e.code == "Enter"){
        let iID=$('#ItemID').val();
        $.ajax({
            url:'http://localhost:8080/api/v1/item/'+iID,
            success:function (resp) {
                console.log(resp);
                let item = resp.data;

                $("#ItemID").val(item.id);
                $("#ItemName").val(item.name);
                $("#ItemQTY").val(item.qty);
                $("#ItemPrice").val(item.price);

            }
        })
    }
});
