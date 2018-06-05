// colorStyle
$(document).ready(function(){
  $("#styleSelector").change(function(){
    var color = $("#styleSelector").val();
    $("body").css('background' ,color );
  });
});

// modalDialog
const modal = document.querySelector(".modal");
const newCreate = document.querySelector(".newCreate");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

newCreate.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


// localStorage
if(localStorage){
  $(document).ready(function(){
    $(".save").click(function(){
      // Get input name
      const title = $("#title").val();
      const decleration =  $("#decleration").val();
      const deactive =  $("#deactive").val();
      const date =  $("#date").val();

      // Store data
      localStorage.setItem("title", title);
      localStorage.setItem("decleration", decleration);
      localStorage.setItem("deactive", deactive);
      localStorage.setItem("date", date);
    });
  });
} else{
  alert("Sorry, your browser do not support local storage.");
}