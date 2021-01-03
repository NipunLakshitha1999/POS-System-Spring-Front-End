function placeOrder() {
    const myObject={
        orderID:$('#OrderID').val().toString().trim(),
        Orderdate:$('#Date').val().toString().trim(),
        cusID:$('#CusID').val().toString().trim(),
        itemCode:$('#OrderItemID').val().toString().trim(),
        qty:$('#OrderQTY').val().toString().trim()
    }

    console.log(myObject);
    $.ajax({
        url:'http://localhost:8080/api/v1/order',
        type:'POST',
        dataType:'json',
        contentType:'application/json',
        success:function (resp) {
            if(resp.code == 200){
                alert("Order ADDED");
            }else{
                alert(resp);
            }
        },
        data:JSON.stringify(myObject)
    })
}

function getAllOrderDetail() {

    $('#tblOrderItemBody').empty();

    $.ajax({
        url:'http://localhost:8080/api/v1/order',
        type:'GET',
        dataType:'json',
        contentType:'application/json',
        success:function (resp) {
            console.log(resp)
            $.each(resp.data,function (idx,ele) {
                let row='<tr>'+
                    '<td>'+ele.orderID+'</td>'+
                    '<td>'+ele.cusID+'</td>'+
                    '<td>'+ele.itemCode+'</td>'+
                    '<td>'+ele.qty+'</td>'
                '</tr>';

                $('#tblOrderItemBody').append(row);
            })
        }
    })
}

function getAllCustomersForDropDown() {
    $.ajax({
        url:'http://localhost:8080/api/v1/customer',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success:function (resp) {
            $.each(resp.data,function (idx,ele) {
                console.log(resp);
                $('#CusID').append('<option>' + ele.id+ '</option>');
            })
        }
    })
}

function getAllItemsForDropDown() {
    $.ajax({
        url:'http://localhost:8080/api/v1/item',
        type:'GET',
        dataType:'json',
        contentType:'application/json',
        success:function (resp) {
            console.log(resp)
            $.each(resp.data,function (idx,ele) {
                $('#OrderItemID').append('<option>' + ele.id + '</option>');
            })
        }
    })
}
