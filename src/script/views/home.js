import Utils from "../utils.js";
import NotesData from "../data/local/notesData.js";

function home() {
  NotesData.initCheck();
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector("note-list");
  // const formElement = document.querySelector("#notesForm");
  const formElement = document.querySelector("note-form");

  const showPersonalNote = () => {
    const result = NotesData.getAllNotes();
    displayResult(result);
  };

  function displayResult(notes) {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.noteItem = note;

      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  }

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const { title, body } = e.detail;
    const newNote = {
      title: title,
      body: body,
    };
    console.log(newNote);
  });

  // light DOM element form
  // formElement.addEventListener("submit",(e)=>{
  //     e.preventDefault();
  //     const title = document.querySelector('#noteTitle').value;
  //     const body = document.querySelector('#noteBody').value;
  //     NotesData.addNotes(title,body);
  //     showPersonalNote();
  // });

  showPersonalNote();
}

export default home;
