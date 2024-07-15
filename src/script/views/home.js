import Utils from '../utils.js'
import NotesData from '../data/local/notesData.js'


function home() {
    const noteListContainerElement = document.querySelector('#noteListContainer');
    const noteListElement = noteListContainerElement.querySelector('note-list');
    const form = document.querySelector('.notes-form');
    const titleInput = form.elements.noteTitle;
    const bodyInput = form.elements.noteBody;
    const saveBtn = document.getElementById('saveBtn')

    form.addEventListener('submit', (event) => event.preventDefault);

    titleInput.addEventListener('invalid', (event) => {
        event.target.setCustomValidity('');

        if (!event.target.validity.valid) {
            event.target.setCustomValidity('Judul wajib untuk diisi.');
            return;
        }

    });

    bodyInput.addEventListener('invalid', (event) => {
        event.target.setCustomValidity('');

        if (!event.target.validity.valid) {
            event.target.setCustomValidity('Isi catatan wajib untuk diisi.');
            return;
        }

    });

    const showPersonalNote = () => {
        const result = NotesData.getAll();
        displayResult(result);

        showNoteList();
    }

    function displayResult(notes) {
        const noteItemElements = notes.map((note) => {
            const noteItemElement = document.createElement('note-item');
            noteItemElement.note = note;

            return noteItemElement;
        });
        Utils.emptyElement(noteListElement);
        noteListElement.append(...noteItemElements);
    }

    function showNoteList() {
        Array.from(noteListContainerElement.children).forEach((element) => {
            Utils.hideElement(element);
        });
        Utils.showElement(noteListElement);
    }

    showPersonalNote();

    loadNoteData();
    setFormListener();

    saveBtn.addEventListener('click', function () {
        location.reload();

    });
}

function setFormListener() {
    const notesForm = document.getElementById('notesForm');

    notesForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const noteTitle = document.getElementById('noteTitle').value;
        const noteDesc = document.getElementById('noteBody').value;

        const note = {
            id: generateUniqueId(),
            title: noteTitle,
            body: noteDesc,
            createdAt: new Date().toISOString(),
            archived: false,
        }

        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        notes.push(note);

        localStorage.setItem('notes', JSON.stringify(notes))

        this.reset();

        loadNoteData();
    });
}

function generateUniqueId() {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 8);

    return `notes-${timestamp}-${randomString}`;
}


function loadNoteData() {
    const noteListElement = document.querySelector('note-list');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach((note) => {
        const noteItemElement = document.createElement('note-item');
        noteItemElement.note = note;
        noteListElement.append(noteItemElement);
    });
}

export default home;