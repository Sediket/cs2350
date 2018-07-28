/*

   Author:   Bradley Peatross
   Date:     July 27, 2018

   Filename: report.js



   Functions List:

   initPage()
      Initializes the contents of the Web page

   testLength()
      Tests a field for its length

   testPattern()
      Tests a field for its pattern

   validateForm
      Validates a Web form

   calcRow
      Calculates the costs within one row of the travel report

   calcTotal
      Calculates the total cost of the travel

   upDate
      Updates the total travel cost
*/

window.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  var dataFields = new Array();
  //get the expense entry fields
  var dataFields = document.getElementsByClassName("expenseEntry");
//add blur to all the fields and point to update function
  for (var i = 0;i < dataFields.length;i++){
    dataFields[i].addEventListener("blur", update);

  }

  //validate Form when submited
  var formObject = document.querySelector("#expform");
  formObject.addEventListener("submit", validateForm);

}


function testLength(field) {
//make sure length is more than 0
  if (field.value.length == 0){
    //make yellow if wrong
    field.style.backgroundColor = "yellow";
    return false;
  } else {
    //make white if good
    field.style.backgroundColor = "white";
    return true;
  }
}

function testPattern (field,regx) {
  //test regex agains field value
  if (regx.test(field.value)) {
    //white == good
    field.style.backgroundColor = "white";
    field.style.color = "black";
    return true;
  } else {
    //yellow/red == bad
    field.style.backgroundColor = "yellow";
    field.style.color = "red";
    return false;
  }
}

function validateForm(event) {
  var isValid = true;
//check all the input fields
  if (!(testLength(document.forms[0].lname))){isValid = false;}
  if (!(testLength(document.forms[0].fname))){isValid = false;}
  if (!(testLength(document.forms[0].address))){isValid = false;}
  if (!(testLength(document.forms[0].summary))){isValid = false;}
//check all regex fields
  if (!(testPattern(document.forms[0].account,/^ACT\d{6}$/))){isValid = false;}
  if (!(testPattern(document.forms[0].department,/^DEPT\d{3}$/))){isValid = false;}
  if (!(testPattern(document.forms[0].project,/^PROJ\d{5}$/))){isValid = false;}
  if (!(testPattern(document.forms[0].ssn,/(^\d{9}$|^\d{3}-\d{2}-\d{4}$)/))){isValid = false;}
//final check for isValid
  if (isValid == false){
    alert("Please fill out all required fields in the proper format.");
  }

  //stop the form from submitting to server
  if (!(isValid)) {
    event.preventDefault();
  }
  //return result
  return isValid;

}

function calcRow(row) {
  //calculate totals for the current row
  var travel = parseFloat(document.forms[0].elements["travel"+row].value);
  var lodge = parseFloat(document.forms[0].elements["lodge"+row].value);
  var meal = parseFloat(document.forms[0].elements["meal"+row].value);
  return travel + lodge + meal;
}

function calcTotal() {
  //calc totals using calcRow
  var totalExp = 0;
  for (var i = 0;i < 4;i++){
    totalExp += calcRow(i);
  }
  return totalExp;
}

function update() {
  //run this when ever mouse leaves expense fileds and validate
  var numRegExp = /^\d*(\.\d{0,2})?$/;
  if (numRegExp.test(this.value)) {

    this.value = parseFloat(this.value).toFixed(2);
    for (var i = 1;i < 4;i++){
      document.forms[0].elements["sub"+i].value = calcRow(i).toFixed(2);
    }
  } else {
    alert("Invalid currency value");
    this.value = 0.00;
    this.focus();
  }
}
