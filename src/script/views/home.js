import NotesApi from "../data/api/api-notes.js";
import Utils from "../utils.js";

function home() {
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteListElement = noteListContainerElement.querySelector("note-list");

  const archiveNoteListContainerElement = document.querySelector(
    "#noteArchivedListContainer"
  );
  const archiveNoteListElement =
    archiveNoteListContainerElement.querySelector("note-list");

  const formElement = document.querySelector("note-form");

  function displayNotesResult(notes) {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      noteItemElement.setAttribute("id-note", note.id);

      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  }

  function displayArchiveResult(notes) {
    const archiveNoteItems = notes.map((note) => {
      const archiveNoteItem = document.createElement("note-item");
      archiveNoteItem.note = note;
      archiveNoteItem.setAttribute("id-note", note.id);

      return archiveNoteItem;
    });

    Utils.emptyElement(archiveNoteListElement);
    archiveNoteListElement.append(...archiveNoteItems);
  }

  const showNotes = async () => {
    // Utils.emptyElement(noteListElement);
    try {
      const notes = await NotesApi.getAllNotes();
      if (notes.length > 0) {
        displayNotesResult(notes);
      } else {
        console.info("No notes available");
      }
    } catch (error) {
      Utils.showResponseError(error);
    }
  };

  const showArchiveNotes = async () => {
    // Utils.emptyElement(archiveNoteListElement);
    try {
      const notes = await NotesApi.getAllArchiveNotes();
      if (notes.length > 0) {
        displayArchiveResult(notes);
      } else {
        console.info("No notes available");
      }
    } catch (error) {
      Utils.showResponseError(error);
    }
  };

  // tombol add note
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
        await showNotes();
      }
    } catch (error) {
      Utils.showResponseError(error);
    }
  });

  // tombol delete note
  noteListElement.addEventListener("deleteNote", async (e) => {
    const noteId = e.detail.noteId;
    try {
      await NotesApi.deleteNote(noteId);
      const noteItem = noteListElement.querySelector(
        `note-item[id-note=${noteId}]`
      );
      if (noteItem) {
        noteItem.remove();
      }
      await showNotes();
      await showArchiveNotes();
    } catch (error) {
      Utils.showResponseError(error);
    }
  });

  archiveNoteListElement.addEventListener("deleteNote", async (e) => {
    const noteId = e.detail.noteId;
    try {
      await NotesApi.deleteNote(noteId);
      const noteItem = archiveNoteListElement.querySelector(
        `note-item[id-note=${noteId}]`
      );
      if (noteItem) {
        noteItem.remove();
      }
      await showNotes();
      await showArchiveNotes();
    } catch (error) {
      Utils.showResponseError(error);
    }
  });

  showNotes();
  showArchiveNotes();
}

export default home;
