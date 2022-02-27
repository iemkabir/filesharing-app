const dropBox = document.querySelector(".DropBoxParent");
const inpt1 = document.querySelector(".fileInput");
let copyImage = document.querySelector(".copyImage");
let x = document.getElementById("snackbar");
console.log("working")
// this is just a comment
if(dropBox){
dropBox.addEventListener("dragover", function (e) {
  e.preventDefault();
  if(!dropBox.classList.contains("addDrag")) {
    console.log("in")
    dropBox.classList.add("addDrag");
  }
});

dropBox.addEventListener("dragleave", function (e) {
  e.preventDefault();
  dropBox.classList.remove("addDrag");
  console.log("Out")
});

dropBox.addEventListener("click", function () {
  console.log("clicked")
  inpt1.click();
});

}

