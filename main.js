//DOM Elements
let notesData = JSON.parse(localStorage.getItem("myNotes")) || [];
let newNotesButton = document.querySelector(".notesNew");
let notesModal = document.querySelector(".notesModal");
let notesForm = document.querySelector(".notesForm");
let closeForm = document.querySelector(".closeForm");
let notesList = document.querySelector(".notesList");
let searchForm = document.querySelector(".searchForm");
let searchInput = document.querySelector(".searchInput");


//Open Modal
newNotesButton.addEventListener("click", function () {
  notesModal.classList.add("active");
});

//Hide Modal
closeForm.addEventListener("click", function () {
  notesModal.classList.remove("active");
});


//Handle note form
  notesForm.addEventListener("submit", function (e) {
  e.preventDefault();
  //handle notes data
  let title = e.target.noteTitle.value;
  let content = e.target.noteEntry.value;
  let noteObj = createNoteObj(title, content);
  notesData.push(noteObj);
  localStorage.setItem("myNotes", JSON.stringify(notesData));

  //handle notes ui with data created
  populateNotes(notesData);
  notesModal.classList.remove("active");
  e.target.reset();
});

 
//UI Template Creation
function populateNotes(notesData) {
  let allNotes = notesData
    .map((note) => {
      return `
        <div class="notesItem">
              <h2>${note.title}</h2>
              <p>
               ${note.content}
              </p>
              <div class="notesMeta">
                <button class="notesDelete" data-id="${note.id}"> <img src="/simpleNotes/assets/trash.svg" height="12" alt=""> Delete</button>
              </div>
            </div>
        `;
    })
    .join(" ");
  notesList.innerHTML = allNotes;
}
populateNotes(notesData);


 
//Object Creation
function createNoteObj(title, content) {
  let newNote = {
    title: title,
    content: content,
    id: crypto.randomUUID(),
  };
  return newNote;
}

 
//Delete a list
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("notesDelete")) {
    let id = e.target.dataset.id;
    let shouldDelete = confirm("Are you sure to delete this note?");
    if (shouldDelete) {
      notesData = notesData.filter(function (note) {
        return note.id !== id;
      });
      localStorage.setItem("myNotes", JSON.stringify(notesData));
      populateNotes(notesData);
    }
  }
});


//Search a title
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (e.target.searchInput.value === "") {
    localStorage.setItem("myNotes", JSON.stringify(notesData));
      populateNotes(notesData);
      alert("Please enter a Title");
  } else {
    let textSearch = e.target.searchInput.value;
    let searchList = notesData.filter(function(el){
      return el.title === textSearch
    })
    populateNotes(searchList);
  }
  e.target.reset();
});
 
