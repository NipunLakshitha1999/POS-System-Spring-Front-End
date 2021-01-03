function saveCustomer() {
const myObject={
    id:$('#CustomerID').val().toString().trim(),
    name:$('#CustomerName').val().toString().trim(),
    address:$('#CustomerAddress').val().toString().trim(),
    salary:$('#customerSalary').val().toString().trim()
}
console.log(myObject);
$.ajax({
    url:'http://localhost:8080/api/v1/customer',
    type:'POST',
    dataType:'json',
    contentType:'application/json',
    success:function (resp) {
        if(resp.code === 200){
            alert("CUSTOMER ADDED");
        }else{
            alert(resp);
        }

        getAllCustomers();
    },
    data:JSON.stringify(myObject)
})
}

function getAllCustomers() {
    $('#cusTbBody').empty();

    $.ajax({
        url:'http://localhost:8080/api/v1/customer',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success:function (resp) {
            $.each(resp.data,function (idx,ele) {
                let row='<tr>'+
                    '<td>'+ele.id+'</td>'+
                    '<td>'+ele.name+'</td>'+
                    '<td>'+ele.address+'</td>'+
                    '<td>'+ele.salary+'</td>'
                    '</tr>';

                $('#cusTbBody').append(row);
            })
        }
    })
}

function updateCustomer() {
    const myObject={
        id:$('#CustomerID').val().toString().trim(),
        name:$('#CustomerName').val().toString().trim(),
        address:$('#CustomerAddress').val().toString().trim(),
        salary:$('#customerSalary').val().toString().trim()
    }
    console.log(myObject);
    $.ajax({
        url:'http://localhost:8080/api/v1/customer',
        type:'PUT',
        dataType:'json',
        contentType:'application/json',
        success:function (resp) {
            if(resp.code === 200){
                alert("CUSTOMER UPDATED");
            }else{
                alert(resp);
            }
            getAllCustomers();
        },
        data:JSON.stringify(myObject)
    })
}

function deleteCustomer() {

    let cid=$('#CustomerID').val().toString().trim();

    if(confirm("are you sure  delete this customer")){
        $.ajax({
            url:'http://localhost:8080/api/v1/customer?'+$.param({id:cid}),
            type:'DELETE',
            dataType:'json',
            contentType:'application/json',
            success:function (resp) {
                if(resp.code === 200){
                    alert("CUSTOMER DELETED");
                }else{
                    alert(resp);
                }
                getAllCustomers();
            }
        })
    }
}

$("#CustomerID").on('keypress', function (e) {
    if (e.code == "Enter") {
        let customerID = $("#CustomerID").val();
        $.ajax({
            url: "http://localhost:8080/api/v1/customer/" + customerID,
            success: function (res) {
                console.log(res);
                let customer = res.data;
                $("#CustomerID").val(customer.id);
                $("#CustomerName").val(customer.name);
                $("#CustomerAddress").val(customer.address);
                $("#customerSalary").val(customer.salary);

            }
        });
    }
});

