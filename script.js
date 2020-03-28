var modal = document.getElementById("myModal");
var displayModal = document.getElementById("displayModal");
var btn = document.querySelector(".btn");
var span = document.getElementsByClassName("close")[0];
var closer = document.getElementsByClassName("closer")[0];

const contains = document.querySelector(".contains");
const recipeName = document.getElementById("recipeName");
const ingredients = document.getElementById("ingredients");
const instructions = document.getElementById("instructions");
const imgUrl = document.getElementById("imgURL");
const myForm = document.querySelector(".myForm");
let recipeArrayContainer = JSON.parse(localStorage.getItem("arrContainer"));
let count = 1;
let num = 0;

document.addEventListener('DOMContentLoaded', function() {
  init();
}, false);

function init(){
  for(let i = 0; i < recipeArrayContainer.length; i++){
    let getRecipeArr = recipeArrayContainer[i];
    createCard(getRecipeArr);
  }
  
}


//When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

//When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

closer.onclick = function() {
  displayModal.style.display = "none";
  location.reload();
  
  // var head = document.getElementById("modal-head");
  // var firstDiv = document.getElementById("firstList");
  // var secondDiv = document.getElementById("secondList");
  // var thirdDiv = document.getElementById("thirdList");


  // head.parentNode.removeChild(head);
  // firstDiv.parentNode.removeChild(firstDiv);
  // secondDiv.parentNode.removeChild(secondDiv);
  // thirdDiv.parentNode.removeChild(thirdDiv);

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

myForm.addEventListener("submit", function(e){
    e.preventDefault();
    if(recipeName.value == '' || ingredients.value == '' || instructions.value == '' || imgUrl == ''){
      alert("Complete The Form");
    }else{
      let recipeArray = [recipeName.value, ingredients.value, instructions.value, imgUrl.value, count];
      recipeArrayContainer.push(recipeArray);

      let arrContainer = JSON.stringify(recipeArrayContainer);
      localStorage.setItem('arrContainer', arrContainer);
      count++;
      modal.style.display = "none";
      location.reload();
    }
    
});


function createCard(array){
  let newCard = document.createElement("div");
  let newImg = document.createElement("img");
  let cardBody = document.createElement("div");
  let h5 = document.createElement("h5");
  let button = document.createElement("button");

  newCard.className = "card";
  newImg.className = "card-img";

  if(array[3] == '' || array[3].value == ''){
    newImg.src = "https://image.flaticon.com/icons/png/512/1509/1509676.png";
  }else if (array[3].value){
    newImg.src = array[3].value; 
  }else{
    newImg.src = array[3]; 

  }
  
  newCard.appendChild(newImg);
  cardBody.className = "card-body";
  newCard.appendChild(cardBody);
  h5.className = "card-title";
  if(array[0].value){
    h5.innerHTML = array[0].value;
  }else{
    h5.innerHTML = array[0];
  }
  
  cardBody.appendChild(h5);
  button.className = "btn-primary";
  button.innerHTML = "OPEN RECIPE";
  button.onclick = function(){
    displayCard(array);
  };
  cardBody.appendChild(button);

  document.querySelector(".container").appendChild(newCard);
  modal.style.display = "none";
  
}

function displayCard(array){
  displayModal.style.display = "block";

  let ingredientsArray = array.slice(1,2);
  //let ingredientListArray = ingredientsArray[0].split(",");
  let instructionArray = array.slice(2,3);

  let modalHead = document.createElement("div");
  let modalH1 = document.createElement("h1");
  let list = document.createElement("div");
  let firstList = document.createElement("div");
  let secondList = document.createElement("div");
  let thirdList = document.createElement("div");
  let modalH2 = document.createElement("h2");
  let modalH3 = document.createElement("h2");
  let ul = document.createElement("ul");
  let p = document.createElement("p");
  let deleteButton = document.createElement("button");
  let editButton = document.createElement("button");
  let li;


  modalHead.className = "modal-head";
  modalH1.className = "modal-h1";

  if(array[0].value){
    modalH1.innerHTML = array[0].value;
  }else{
    modalH1.innerHTML = array[0];
  }

  list.className = "list";
  firstList.className = "firstList";
  secondList.className = "secondList";
  thirdList.className = "thirdList";
  modalH2.className = "modal-h2";
  modalH2.innerHTML = "Ingredients";

  if(instructionArray[0].value){
    p.innerHTML = instructionArray[0].value;
  }else{
    p.innerHTML = instructionArray[0];
  }

  modalH3.className = "modal-h3";
  modalH3.innerHTML = "Instructions";
  editButton.className = "edit";
  deleteButton.className = "delete";
  editButton.innerHTML = "Edit Recipe";
  deleteButton.innerHTML = "Delete Recipe";

  deleteButton.onclick = function(){
    //deleteRecipe(array);

    var index = array[4];
  
    // for(let i = 0; i < recipeArrayContainer.length; i++){
    //   if(recipeArrayContainer[i][4]){
    //     if(recipeArrayContainer[i][4] === array[4]){
    //       index == i;
    //       break;
    //     }   
    //   }
    // } 

    
    displayModal.style.display = "none";
    recipeArrayContainer.splice(index, 1);
    localStorage.setItem("arrContainer", JSON.stringify(recipeArrayContainer));
    location.reload();


  }

  editButton.onclick = function(){
    editRecipe();
  }

  modalHead.appendChild(modalH1);
  list.appendChild(firstList);
  firstList.appendChild(modalH2);

  for(let i = 0; i < ingredientsArray.length; i++){
    li = document.createElement("li");

    if(ingredientsArray[i].value){
      let ingredientsLi = ingredientsArray[i].value;
      let contentLi = document.createTextNode(ingredientsLi);
      li.appendChild(contentLi);

    }else{
      let ingredientsLi = ingredientsArray;
      let contentLi = document.createTextNode(ingredientsLi);
      li.appendChild(contentLi);

    }
    ul.appendChild(li);    

  }

  firstList.appendChild(ul);

  list.appendChild(secondList);
  secondList.appendChild(modalH3);
  secondList.appendChild(p);

  list.appendChild(thirdList);
  thirdList.appendChild(deleteButton);
  thirdList.appendChild(editButton);

  document.getElementById("modal-content-display").appendChild(modalHead);
  document.getElementById("modal-content-display").appendChild(firstList);
  document.getElementById("modal-content-display").appendChild(secondList);
  document.getElementById("modal-content-display").appendChild(thirdList);

}

function deleteRecipe(array){
  var index = 0;
  
  for(let i = 0; i < recipeArrayContainer.length; i++){
    if(recipeArrayContainer[i][4] === array[4]){
      index == i;
      break;
    }
  } 
    alert(index);
    
    // recipeArrayContainer.splice(index, 1);
    // localstorage.setItem("arrContainer", JSON.stringify(recipeArrayContainer));
    // displayModal.style.display = "none";
    // location.reload();
}

function editRecipe(){
  alert("Edit Recipe Under Construction");
}


 




