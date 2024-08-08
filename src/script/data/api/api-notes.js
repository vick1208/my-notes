import Utils from "../../utils";

const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getAllNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      if (responseJson.error) {
        Utils.showResponseError('failed to fetch all notes');
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

        Utils.showResponseError('failed to fetch all notes');
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
        
        Utils.showResponseError(`failed to add :${responseJson.message}`);
      }
      return responseJson;
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
        
        Utils.showResponseError("failed to delete note");
      }
      return responseJson;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}


export default NotesApi
