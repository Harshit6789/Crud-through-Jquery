let studentArray = [];
let name, code, mail, number;
let studentElement;
var arr = JSON.parse(localStorage.getItem("User"));
setAndGetItem();
/* Take the data from form and push in array */
$("#submit").click(function () {
    name = $("#name").val();
    code = $("#code").val();
    mail = $("#mail").val();
    number = $("#number").val();
    studentElement = {
        name: name,
        code: code,
        mail: mail,
        number: number
    };
    if (onValidate()) {
        studentArray.push(studentElement);
        setAndGetItem("insert");
    }
})
/* Get and set the form data in the localstorage*/
function setAndGetItem(value) {
    if (!value) {

        if (arr && arr.length) {
            studentArray = arr;
            insertRecord();
        }
        else if (studentArray && studentArray.length) {

            localStorage.setItem('User', JSON.stringify(studentArray));
        }

    }
    else
        if (studentArray && studentArray.length) {

            localStorage.clear()
            localStorage.setItem('User', JSON.stringify(studentArray));
            insertRecord();
            resetForm();
        }
        else{
            $("tbody").empty();
            localStorage.setItem('User', JSON.stringify(studentArray));
        }

}

/*Insert the data in the table*/
function insertRecord() {
    if (studentArray && studentArray.length) {
        $("tbody").empty();
        let tr = " ";
        for (i = 0; i < studentArray.length; i++) {
            tr = `<tr><td>${studentArray[i].name}</td>  <td>${studentArray[i].code}</td> <td>${studentArray[i].mail} </td> <td>${studentArray[i].number} </td>  <td><a id="${i}" onclick="editRow(${i})">Edit</a> <a onclick="deleteRow(${i})">Delete</a></td></tr>`;
            $("tbody").append(tr);

        }

    }
}
/* Reset the form data*/
function resetForm() {
    $("#name").val("");
    $("#code").val("");
    $("#mail").val("");
    $("#number").val("");
}

/*show table data */ 
$("#showdata").click(function () {
    $("#table").toggle();
})

/* Edit the Row storage();*/
function editRow(rowId) {
    $("#name").val(studentArray[rowId].name);
    $("#code").val(studentArray[rowId].code);
    $("#mail").val(studentArray[rowId].mail);
    $("#number").val(studentArray[rowId].number);
    $('#update').css('display', 'inline');
    $('#submit').css('display', 'none');
    $('#update').val(rowId);
}

/*Update the Row*/
$("#update").click(function () {
    rowId = $("#update").val();
    let uname = $("#name").val();
    let ucode = $("#code").val();
    let umail = $("#mail").val();
    let unumber = $("#number").val();
    studentArray[rowId] = { name: uname, code: ucode, mail: umail, number: unumber };
    setAndGetItem("update");
    $('#update').css('display', 'none');
    $('#submit').css('display', 'inline');

})

/*delete the row*/ 
function deleteRow(rowId) {
    if (confirm("Are you sure you want to delete the row")) {
        studentArray.splice(rowId, 1);
        setAndGetItem("delete");
    }
}

/* Form Validations*/ 
function onValidate() {
    let username = $("#name").val();
    let usercode = $("#code").val();
    let usermail = $("#mail").val();
    let usernumber = $("#number").val();
    if (username.trim() == "") {
        $("#username").text("**Please Enter the Username");
        return false;
    }
    if ((username.length <= 2) || (username.length > 20)) {
        $("#username").text("**Please Enter the between 2 characters to 20 characters in Username");
        return false;
    }
    if (!isNaN(username)) {
        $("#username").text("**Please Enter Only character");
        return false;
    }
    $("#username").css("display", "none");


    if (usercode.trim() == "") {
        $("#pass").text("**Please Enter the Usercode");
        return false;
    }
    if ((usercode.length <= 2) || (usercode.length > 10)) {
        $("#pass").text("**Please Enter the code Between 2 to 9 character & number");
        return false;
    }
    $("#pass").css("display", "none");

    if (usermail.trim() == "") {
        $("#email").text("**Please Enter the Email id");
        return false;
    }
    if (usermail.indexOf('@') <= 0) {
        $("#email").text("**Please check the Position @ ");
        return false;
    }
    if ((usermail.charAt(usermail.length - 4) != ".") && (usermail.charAt(usermail.length - 3) != ".")) {
        $("#email").text("**Please check the Position . ");
        return false;
    }
    $("#email").css("display", "none");

    if (usernumber.trim() == "") {
        $("#mobileNumber").text("**Please Enter the Mobile Number");
        return false;
    }
    if (usernumber.length != 10) {
        $("#mobileNumber").text("**Please Enter 10 digits Number Only");
        return false;
    }
    $("#mobileNumber").css("display", "none");

    return true;
}

/*Sorting the table*/ 
$("#sort").click(function () {
    arr.sort((item1, item2) => {
        let name1 = item1.name.toUpperCase();
        let name2 = item2.name.toUpperCase();
        if (name1 < name2) {
            return -1;
        }
        else if (name1 > name2) {
            return 1;
        }
    })
    setAndGetItem("sort");
})

