import Utils from "../../utils";
import Swal from "sweetalert2";
const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getAllNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      if (responseJson.error) {
        Utils.showResponseError("Failed to fetch all notes");
      }
      const unarchived = responseJson.data;

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
        Utils.showResponseError("Failed to fetch all notes");
      }

      const archive = responseJson.data;


      if (archive.length > 0) {
        return archive
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
        Utils.showResponseError(`Failed to add: ${responseJson.message}`);
      } else {
        await Swal.fire({
          icon: "success",
          text: "Added new note",
          timer: 3000,
          showConfirmButton: false,
        });
        // return responseJson;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: "DELETE",
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        Utils.showResponseError(
          `Failed to delete note: ${responseJson.message}`
        );
      }

      
      Utils.showResponseConfirm("Note deleted");
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async moveToNote(note) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${note.id}/unarchive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        Utils.showResponseError(
          `Failed to unarchive note: ${responseJson.message}`
        );
      }
      
      Utils.showResponseConfirm("Note unarchived");
      return responseJson;

    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async moveToArchivedNote(note) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${note.id}/archive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        Utils.showResponseError(
          `Failed to archive note: ${responseJson.message}`
        );
      }
      
      Utils.showResponseConfirm("Note archived");
      return responseJson;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default NotesApi;
