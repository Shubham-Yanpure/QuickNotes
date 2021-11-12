//If a user adds note, Add it to the localstorage

showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addtxt = document.getElementById("addTxt");
    if (addtxt.value == "") {
        alert("Dear user, Note can't be empty!");
    } else {


        // let addtxt = document.getElementById("addTxt");             //copy the text
        let addTitle = document.getElementById("addTitle");         //copy the titlr
        let notes = localStorage.getItem("notes");                  //retrive notes key-pair value, if created
        if (notes == null) {                                          //only 1st time null
            notesObj = [];                                          //intiate null array
        } else {
            notesObj = JSON.parse(notes);                           //otherwise,retrive previous notes in notesObj
        }
        let myObj = {
            title: addTitle.value,                                 //created object of title & text
            text: addTxt.value
        }
        notesObj.push(myObj);                                        //pushes text into notesObj
        localStorage.setItem("notes", JSON.stringify(notesObj));     //store notes in localstorage
        addTxt.value = "";                                          //clears textarea
        addTitle.value = "";
        console.log(notesObj);
        showNotes();
    }
})


//function to show elements from localstorage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];                                         //same as above
    } else {
        notesObj = JSON.parse(notes);
        let html = "";                                         //create empty var
        notesObj.forEach(function (element, index) {
            html = html + `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                             <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>                  
                                <p class="card-text"> ${element.text} </p>
                                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                            </div>
                          </div>`

        });                                                    //generate a html card using template var
        let notesElm = document.getElementById("notes");
        if (notesObj.length != 0) {
            notesElm.innerHTML = html;                         //adds the card
        } else {
            notesElm.innerHTML = `<h6>Nothing to Show! Please Add some Notes...</h6>`;
        }
    }
}

//function to delete a note

function deleteNote(index) {                                  //this funC takes index no of elem that you want to delete
    let notes = localStorage.getItem("notes");                //retrive notes from local storage
    if (notes == null) {
        notesObj = [];                                        //parses into noteObj if not NULL
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);                                 //splices(starting index,how many elems you want to delete)
    localStorage.setItem("notes", JSON.stringify(notesObj));  //updates localstorage
    showNotes();
}

//searching a note

let search = document.getElementById('searchTxt');                      //retrive search text by id
search.addEventListener("input", function () {                             //adding eventListener when we enter text

    let inputVal = search.value;                                        //copying value into local var inputVal
    let noteCards = document.getElementsByClassName('noteCard');        //retring all noteCards by their classNames
    Array.from(noteCards).forEach(function (element) {                    //array.from() coverts anything into array for iteration
        let cardTxt = element.getElementsByTagName("p")[0].innerText;   //copying the text by tag <p>
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})


