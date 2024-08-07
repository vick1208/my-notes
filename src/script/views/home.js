import Utils from '../utils.js'
import NotesData from '../data/local/notesData.js'


function home() {
    const noteListContainerElement = document.querySelector('#noteListContainer');
    const noteListElement = noteListContainerElement.querySelector('note-list');

    

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

}






export default home;