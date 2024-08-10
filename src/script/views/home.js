import NotesApi from "../data/api/api-notes.js";
import Utils from "../utils.js";

function home() {
  const noteListContainerElement = document.querySelector(
    "#noteUnarcContainer"
  );
  const noteListElement = noteListContainerElement.querySelector("note-list");
  const noteLoadingIndicator = document.querySelector(
    "#noteUnarcContainer loader-indicator"
  );

  const archiveNoteListContainerElement = document.querySelector(
    "#noteArchivedListContainer"
  );
  const archiveNoteListElement =
    archiveNoteListContainerElement.querySelector("note-list");
  const archiveNoteLoadingIndicator = document.querySelector(
    "#noteArchivedListContainer loader-indicator"
  );


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

  const showNotes = async () => {
    Utils.showElement(noteLoadingIndicator);

    try {
      const notes = await NotesApi.getAllNotes();
      if (notes.length > 0) {
        Utils.showElement(archiveNoteListContainerElement);
        displayNotesResult(notes);
      } else {
        console.info("No notes available");
        Utils.hideElement(archiveNoteListContainerElement);
      }
    } catch (error) {
      Utils.showResponseError(error);
    } finally {
      Utils.hideElement(noteLoadingIndicator);
    }
  };

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

  const showArchiveNotes = async () => {
    Utils.showElement(archiveNoteLoadingIndicator);

    try {
      const notes = await NotesApi.getAllArchiveNotes();
      if (notes.length > 0) {
        Utils.showElement(archiveNoteListContainerElement);
        displayArchiveResult(notes);
      } else {
        console.info(`No archive notes available`);
        Utils.hideElement(archiveNoteListContainerElement);
      }
    } catch (error) {
      Utils.showResponseError(error);
    } finally {
      Utils.hideElement(archiveNoteLoadingIndicator);
    }
  };

  // submit form event
  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const { title, body } = e.detail;
    try {
      const newNote = {
        title: title,
        body: body,
      };

      await NotesApi.addNote(newNote);

      await showNotes();
      await showArchiveNotes();
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

  // tombol archive note

  noteListElement.addEventListener("archiveNote", async (e) => {
    const note = e.detail;
    try {
      const noteItem = noteListElement.querySelector(
        `note-item[id-note=${note.id}]`
      );
      if (noteItem) {
        noteItem.note.archived = true;
        await NotesApi.moveToArchivedNote(note);
        await showNotes();
        await showArchiveNotes();
      }
    } catch (error) {
      Utils.showResponseError(error);
    }
  });

  archiveNoteListElement.addEventListener("archiveNote", async (e) => {
    const note = e.detail;
    try {
      const noteItem = archiveNoteListElement.querySelector(
        `note-item[id-note=${note.id}]`
      );
      if (noteItem) {
        noteItem.note.archived = false;
        await NotesApi.moveToNote(note);
        await showNotes();
        await showArchiveNotes();
      }
    } catch (error) {
      Utils.showResponseError(error);
    }
  });

  showNotes();
  showArchiveNotes();
}

export default home;
