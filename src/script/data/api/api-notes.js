import Utils from "../../utils";
import Swal from "sweetalert2";
const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getAllNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      if (responseJson.error) {
        Utils.showResponseError("failed to fetch all notes");
      }
      const unarchived = responseJson.data.filter(
        (note) => note.archived !== true
      );

      if (unarchived.length > 0) {
        console.info(unarchived);
        return unarchived;
      } else {
        return [];
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getAllArchiveNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      const responseJson = await response.json();
      if (responseJson.error) {
        Utils.showResponseError("failed to fetch all notes");
      }
      const archived = responseJson.data.filter(
        (note) => note.archived === true
      );
      if (archived > 0) {
        console.info(archived);
        return archived;
      } else {
        return [];
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  static async addNote(note) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        Utils.showResponseError(`failed to add: ${responseJson.message}`);
      } else {
        await Swal.fire({
          icon: "success",
          text: "Added new note",
          timer: 3000,
          showConfirmButton: false,
        });
        return responseJson;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteNote(noteId) {
    const options = {
      method: "DELETE",
    };

    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, options);
      const responseJson = await response.json();
      if (responseJson.error) {
        Utils.showResponseError(`failed to delete note: ${responseJson.message}`);
      }
      Utils.showResponseConfirm("Note deleted");
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default NotesApi;
