
var para
let studentlist = []

$(document).ready(function () {
    $("#add").click(function () {
        let studentid = para
        const student = {
            name: $("#name").val(),
            fatherName: $("#fathername").val(),
            age: $("#age").val(),
            gender: $("#gender").val(),
            contact: $("#phone").val(),
            address: $("#address").val(),
            studentid: para
        }
        let phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (student.name == "") {
            $("#nameerr").html(" Please Enter Your Full Name!");
        } else {
            $("#nameerr").hide();
        }
        if (student.fatherName == "") {
            $("#fname").html(" Please Enter Your Father Name!");
        } else {
            $("#fname").hide();
        } if (student.age == "") {
            $("#ageer").html(" Please Enter Your Age!");
        } else {
            $("#ageer").hide();
        } if (student.gender == "") {
            $("#genderer").html(" Please Select Your Gender!");
        } else {
            $("#genderer").hide();
        } if (student.contact == "" || !phoneNum.test(student.contact) || student.contact.length > 10) {
            $("#phoneerr").html(" Please Enter Your Phone Number!");

        } else {
            $("#phoneerr").hide();
        }
        if (student.address == "") {
            $("#adderr").html(" Please Enter Your Address!");
        } else {
            $("#adderr").hide();
        }

        if (student.name && student.fatherName && student.age && student.gender && student.contact && student.address && student.contact.length === 10) {
            if (para != '') {
                updatestudenttoapi(student)
            } else {

                $.ajax({
                    url: "https://634e4aa7f34e1ed826877cda.mockapi.io/student",
                    method: 'POST',
                    dataType: 'json',
                    data: student,
                    success: function (result) {
                        alert("Created Successfully")

                        studentlist.push(result)
                        onloadfromAPI();
                        document.getElementById("myform").reset();
                    },
                    error: function (err) {
                        console.log(err.statusText);
                    },

                });
            }
        }
        else {
            alert("Please Enter All Data")
        }

    });
});

function bulidTable(studentlist) {

    $('#records').html('');
    for (let i = 0; i < studentlist.length; i++) {
        row = '<tr><td>' + studentlist[i].name +
            '</td><td>' + studentlist[i].fatherName +
            '</td><td>' + studentlist[i].age +
            '</td><td>' + studentlist[i].contact +
            '</td><td>' + studentlist[i].address +
            '</td><td>' + studentlist[i].gender +

            '</td><td> <button class=" text-white btn bg-success" ><a class="text-white" href="index.html?id=' + studentlist[i].id + '">Edit</button></a></td>' +
            '<td><button  class=" text-white btn bg-danger" onclick="delStudent(' + studentlist[i].id + ')" >Del</button></td></tr>'
        $('#records').append(row);
    }
}

function onloadfromAPI() {

    $.ajax({
        url: "https://634e4aa7f34e1ed826877cda.mockapi.io/student",
        method: 'get',
        dataType: 'json',

        success: function (result) {
            bulidTable(result)
            console.log(result)
        },
        error: function (err) {
            console.log(err.statusText);
        },

    });

}
function getUrlParameter(studentlist) {
    studentlist = studentlist.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + studentlist + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var qsp = 'id'
para = getUrlParameter(qsp);

editlist(para);

function editlist(id) {

    $.ajax({
        url: "https://634e4aa7f34e1ed826877cda.mockapi.io/student/" + id,
        method: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log(result)
            $("#name").val(result.name);
            $("#fathername").val(result.fatherName);
            $("#age").val(result.age);
            $("#gender").val(result.gender);
            $("#phone").val(result.contact);
            $("#address").val(result.address);
            $("#student_id").val(result.id);
},
        error: function (err) {
            console.log(err.statusText);  
        },

    });

}
function updatestudenttoapi(student) {
 $.ajax({
        url: "https://634e4aa7f34e1ed826877cda.mockapi.io/student/" + student.studentid,
        method: 'PUT',
        dataType: 'json',
        data: student,
        success: function (result) {
            studentlist.push(result)
            console.log(result)
            alert("Edited successfully")
            onloadfromAPI(studentlist)
        },
        error: function (err) {
            console.log(err.statusText);
        },

    });

}
function delStudent(student) {

    console.log(student)
    $.ajax({
        url: "https://634e4aa7f34e1ed826877cda.mockapi.io/student/" + student,
        method: 'delete',
        dataType: 'json',

        success: function (result) {
            console.log(result)
            onloadfromAPI()
        },
        error: function (err) {
            console.log(err.statusText);
        },

    });
}
onloadfromAPI()