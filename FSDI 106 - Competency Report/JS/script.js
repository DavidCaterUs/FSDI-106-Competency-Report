var serverUrl = "http://restclass.azurewebsites.net/API2/Todos";

var Todos = [];

function createNew() {
  var text = $("#txttest").val();


  var list = $("#todos");
  list.append('<li class="list-group-item list-group-item-primary"> ' + text + '<img class="jv-jq" src="images/jq-logo.png" alt="">' + '</li>' + '<br>');

  $("#txttest").val("").focus();


  var todo = {
    text: text,
    user: "Kleibert",
    state: 0 //new
  };

  displayTodo(todo);

  $.ajax({
    url: serverUrl,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(todo),
    success: function(res) {
      console.log("server says: ", res);
    },
    error: function(error) {
      console.error("error saving", error);
    }
  });

}
//recives  TODO item and displys it on the corresponding list
function displayTodo(todo) {
  if (todo.state == 0) {

    // create an item on the pending list

    var list = $("#todos");

    list.append(`<li id="${todo.id}" class="list-group-item list-group-item-primary">
     ${todo.text}  <img class="jv-jq" src="images/jq-logo.png" alt="">
       <button class="btn btn-outline-dark btn-sm" type="button" id="btn-done"
       onclick="markDone(${todo.id});">Done</button>  </li><br>`);

  } else {

    // create an item on the done list

    var list = $("#doneTodos");

    list.append('<li class="list-group-item list-group-item-primary"> ' + todo.text + '<img class="jv-jq" src="images/jq-logo.png" alt="">' + '</li>' + '<br>');

  }

}

  function markDone(id){
    console.log("Item Done", id);
    $("#" + id).remove();

    //find on the todos array the one with the id equals to do this one
    for (let i = 0; i < Todos.length; i++){
      if(Todos[i].id == id){
        Todos[i].state = 1;
        displayTodo(Todos[i]);
      }
    }
  }

function loadData() {
  //load data from backend
  //display todos

  $.ajax({
    url: serverUrl,
    type: "GET",
    success: function(res) {
      console.log("Respond from server: ", res);

      for (let i = 0; i < res.length; i++) {
        var item = res[i];
        if (res[i].user == "Kleibert") {
          console.log("this  item ");
          Todos.push(res[i]);
          displayTodo(res[i]);
        }
      }


    },
    error: function(error) {
      console.error("Error on data", error);
    }

  });
}


function init2() {
  //change the text on the fielfd
  // hard refresh of browser Ctrl + F5
  /*
   *jquery SELECTOR:
   *# = id
   * TAG
   */
  // $("#txttest").val("LAST");
  //
  // //assign the click event
  //
  $("#btn").click(createNew);
  $("#txttest").keypress(function(args) {

    if (args.keyCode == 13) {
      createNew();
    }



  });

  loadData();

}


$(document).ready(init2);
