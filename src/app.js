
import './script/components/index.js';

import home from './script/views/home.js'


document.addEventListener('DOMContentLoaded', () => {
    home();
    loadNotes();
    setFormListener();
});


// Validasi
const form = document.querySelector('.notes-form');
const titleInput = form.elements.noteTitle;
const descInput = form.elements.noteBody;

form.addEventListener('submit', (e) => e.preventDefault());

titleInput.addEventListener('invalid', (e) => {
    e.target.setCustomValidity('');

    if (e.target.validity.valueMissing) {
        e.target.setCustomValidity('Wajib diisi.');
        return;
    };
});

descInput.addEventListener('invalid', (e) => {
    e.target.setCustomValidity('');

    if (e.target.validity.valueMissing) {
        e.target.setCustomValidity('Wajib diisi.');
        return;
    };
});

// Add note to Storage
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

        loadNotes();
    });
}

function generateUniqueId() {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 8);

    return `notes-${timestamp}-${randomString}`;
}

function loadNotes() {
    const noteListElement = document.querySelector('note-list');

    // noteListElement.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const noteItemElement = document.createElement('note-item');
        noteItemElement.note = note;
        noteListElement.append(noteItemElement);
    });
}

// save button reload
const saveBtn = document.getElementById('saveBtn')
saveBtn.addEventListener('click', function () {
    location.reload();
});

