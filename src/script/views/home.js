import NotesApi from "../data/api/api-notes.js";
import Utils from "../utils.js";

function home() {
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector("note-list");
  // const formElement = document.querySelector("#notesForm");
  const formElement = document.querySelector("note-form");

  const showNotes = async () => {
    Utils.emptyElement(noteListElement);
    try {
      const notes = await NotesApi.getAllNotes();
      displayNotesResult(notes);
    } catch (error) {
      Utils.showResponseError(error);
    }
  };

  function displayNotesResult(notes) {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;

      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  }

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const detail = e.detail;
    console.log(detail);
  });

  // light DOM element form
  // formElement.addEventListener("submit",(e)=>{
  //     e.preventDefault();
  //     const title = document.querySelector('#noteTitle').value;
  //     const body = document.querySelector('#noteBody').value;
  //     NotesData.addNotes(title,body);
  //     showPersonalNote();
  // });

  // showPersonalNote();
  showNotes();
}

export default home;
