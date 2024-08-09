import NotesApi from "../data/api/api-notes.js";
import Utils from "../utils.js";

function home() {
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector("note-list");
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

  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { title, body } = e.detail;
    try {
      const newNote = {
        title: title,
        body: body,
      };

      const responseNote = await NotesApi.addNote(newNote);

      if (responseNote) {
        // await showNotes();
        location.reload();
      }
    } catch (error) {
      Utils.showResponseError(error);
    }
  });

  showNotes();
}

export default home;
