showNotes()


const addBtn = document.getElementById("addBtn")
addBtn.addEventListener("click", function(e) {
    let addTxt = document.getElementById("addTxt")
    let addTitle = document.getElementById("addTitle")
    let notes = localStorage.getItem("notes")

    if (notes == null) {
        notesObj = []; // in this notesObj, where all the notes resides as a list
    } else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }

    notesObj.push(myObj); // in this list, value written in textArea is pushed
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes()
});


function showNotes(){

    let notes = localStorage.getItem("notes")

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "" // this is just a string
    notesObj.forEach( function(element, index) {

        html += `

            <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">${element.text}</p>
                  <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete note</button>
                </div>
            </div>
        `
    });

    let notesElm = document.getElementById("notes") // this is the div where , we display all the notes.

    if (notesObj.length != 0){
        notesElm.innerHTML = html
    } else {
        notesElm.innerHTML = `Nothing to show... add some notes to display `
    }
}


function deleteNote(index){
    console.log(`i am deleting ${index}`)

    let notes = localStorage.getItem("notes")

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes()

}


let search = document.getElementById("searchTxt")

search.addEventListener("input", function(){

    let dropDown = document.getElementById("dropdown")
    console.log(dropDown.value)

    let inputVal = search.value.toLowerCase()
    // console.log(`Print: ${inputVal}`)
    let noteCards = document.getElementsByClassName("noteCard")

    Array.from(noteCards).forEach(function(element){

        let cardTxt;

        if (dropDown.value == "title_search"){
            cardTxt = element.getElementsByTagName("h5")[0].innerText
            // console.log("searching from TITLE")
        }else {
            cardTxt = element.getElementsByTagName("p")[0].innerText
            // console.log("searching from CONTENT")
        }

        // console.log(cardTxt)

        if (cardTxt.includes(inputVal)){
            element.style.display = "block"
        }else {
            element.style.display = "none"
        }
    })

})


// add title
// search by either title or content
// mark notes as important



