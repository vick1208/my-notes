import './script/components/index.js'

import home from './script/views/home.js';

document.addEventListener('DOMContentLoaded', () => {
    home();
    loadNoteData();
    setNoteFormListener();

    
});

const form = document.querySelector('.notes-form');
const titleInput = form.elements.noteTitle;
const bodyInput = form.elements.noteBody;

form.addEventListener('submit', (event) => event.preventDefault());

titleInput.addEventListener('invalid', (e) => {
    e.target.setCustomValidity('');

    if (!e.target.validity.valid) {
        e.target.setCustomValidity('Wajib diisi.');
        return;
    };
});

bodyInput.addEventListener('invalid', (e) => {
    e.target.setCustomValidity('');

    if (!e.target.validity.valid) {
        e.target.setCustomValidity('Wajib diisi.');
        return;
    };
});


function setNoteFormListener() {
    const notesForm = document.getElementById('notesForm');

    notesForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const noteTitle = document.getElementById('noteTitle').value;
        const noteBody = document.getElementById('noteBody').value;

        const note = {
            id: generateUniqueId(),
            title: noteTitle,
            body: noteBody,
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

    return `notes-${randomString}-${timestamp}`;
}

function loadNoteData() {
    const noteListElement = document.querySelector('note-list');


    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const noteItemElement = document.createElement('note-item');
        noteItemElement.note = note;
        noteListElement.append(noteItemElement);
    });
}



const saveBtn = document.getElementById('saveBtn')
saveBtn.addEventListener('click', function () {
    location.reload();
});