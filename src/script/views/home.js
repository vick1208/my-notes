import Utils from '../utils.js'
import NotesData from '../data/local/notesData.js'


function home() {
    const noteListContainerElement = document.querySelector('#noteListContainer');
    const noteListElement = noteListContainerElement.querySelector('note-list');

    const showPersonalNote = () => {
        const result = NotesData.getAll();
        displayResult(result);

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

    showPersonalNote();

}






export default home;