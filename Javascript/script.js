showNotes();

// If user enter data in our site then
let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function(e) {

    let addTxt = document.getElementById('addTxt')
    let notes = localStorage.getItem('notes')

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    // Date
    let date = new Date()

    let pushValue = addTxt.value;
    notesObj.push(pushValue);

    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTxt.value = " ";
    showNotes();
})

// Function to showElement from LocalStorage
function showNotes() {
    // console.log("showNotes")
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function(element, index) {
        html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Notes ${index+1}</h5>
            <p class="card-text notes">${element}</p>
            <a href="#" id="${index}" onclick='deleteNote(this.id)' class="btn btn-primary">Delete Note</a>
        </div>
    </div>
        `
    });
    let notesElm = document.getElementById('notes');
    let noteChecker = document.getElementById('noteContent')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;

        noteChecker.innerHTML = '<i>Here are your added notes</i>'
    } else {
        noteChecker.innerHTML = '<i>You have nothing here! Add Notes</i>'
    }
}

// Function to delete a note
function deleteNote(anyValue) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(anyValue, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    if (notesObj.length == 0) {
        console.log('0');
        location.reload()
    }
    showNotes();
}

// Searching Box
let searchTxt = document.getElementById('searchTxt');
let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', function() {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let checker = searchTxt.value;

    for (let i = 0; i < notesObj.length; i++) {

        let ch = document.getElementsByClassName('notes')[i].innerText.toLowerCase().indexOf(checker)
        let many = document.querySelectorAll('.noteCard')

        if (ch > -1) {
            many[i].style.display = '';
        } else {
            many[i].style.display = 'none';

        }
    }
})

// Page Scroller
const scroll = document.querySelector("#scrollToTop");

scroll.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behaviour: "smooth",
    });
})