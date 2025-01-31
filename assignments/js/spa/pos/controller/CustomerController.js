// Button Events
$("#saveCustomer").click(function () {

    let customerID = $("#txtCustomerID").val();
    let customerName = $("#txtCustomerName").val();
    let customerAddress = $("#txtCustomerAddress").val();
    let customerContact = $("#txtCustomerContact").val();
    let customerSalary = $("#txtCustomerSalary").val();

    var customer = saveCustomer(customerID,customerName,customerAddress,customerContact,customerSalary);

    // push data
    customers.push(customer);


    clearData();
    loadAllCustomers();
    bindRowClickEvents();
    loadAllCustomersForOption();

});

function loadAllCustomers() {
    $("#tblCustomer").empty();
    for (var customer of customers) {

        var all = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td><td>${customer.salary}</td>
                        <td><button class="btn btn-warning btn-mini" data-bs-target="#editCustomers"
                        data-bs-toggle="modal" id="btn-edit"><i class="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                        </td>
                    </tr>`;

        $("#tblCustomer").append(all);
    }
}

function searchCustomer(cusID) {
    for (let customer of customers) {
        if (customer.id == cusID) {
            return customer;
        }
    }
}

$(document).on("click", "#btn-edit", function () {
    bindRowClickEvents();
});

function bindRowClickEvents() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let contact = $(this).children(":eq(3)").text();
        let salary = $(this).children(":eq(4)").text();


        $("#txtCustomerIDEdit").val(id);
        $("#txtCustomerNameEdit").val(name);
        $("#txtCustomerAddressEdit").val(address);
        $("#txtCustomerContactEdit").val(contact);
        $("#txtCustomerSalaryEdit").val(salary);

        $("#txtCustomerID").val(id);

    });

}
$("#updateCustomer").click(function (){
    let customerID = $("#txtCustomerIDEdit").val();
    let message = updateCustomer(customerID);
    if (message) {
        alert("Customer Updated Successfully");
    } else {
        alert("Update Failed..!");

    }
});

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);

    if (customer != null) {
        customer.id = $("#txtCustomerIDEdit").val();
        customer.name = $("#txtCustomerNameEdit").val();
        customer.address = $("#txtCustomerAddressEdit").val();
        customer.contact = $("#txtCustomerContactEdit").val();
        customer.salary = $("#txtCustomerSalaryEdit").val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

$('#delete').click(function () {
    let deleteID = $("#txtCustomerID").val();

    let option = confirm("Do you really want to delete " + deleteID);

    if (option) {
        if (deleteCustomer(deleteID)) {
            alert("Customer Successfully Deleted..");
            clearData();
        } else {
            alert("No such customer to delete. please check the id");
        }
    }

});

function deleteCustomer(cusId) {
    let customer = searchCustomer(cusId);

    if (customer != null) {
        let IndexNumber = customers.indexOf(customer);
        customers.splice(IndexNumber, 1);
        loadAllCustomers();
        bindRowClickEvents();
        return true;

    } else {
        return false;
    }
}
function clearData() {

    $("#txtCustomerID").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerContact").val("");
    $("#txtCustomerSalary").val("");

}

