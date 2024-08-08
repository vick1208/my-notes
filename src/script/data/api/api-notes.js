const BASE_URL = "https://notes-api.dicoding.dev/v2";

class NotesApi {
  static async getAllNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      const notesData = responseJson.data;
      if (notesData.length > 0) {
        return notesData;
      } else {
        return [];
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  static async addNote(title, body) {
    const data = {
      title,
      body,
    };

    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error("Gagal menambahkan note: " + responseJson.message);
      }
      return responseJson;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async deleteNote(id) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, options);
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error("Gagal menghapus note: " + responseJson.message);
      }
      return responseJson;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
