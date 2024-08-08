import Swal from 'sweetalert2';

class Utils {
  static uniqueId() {
    const timestamp = Date.now().toString(); 
    const randomString = Math.random().toString(36).substring(2, 8);
    return `notes-${randomString}-${timestamp}`;
  }

  static showResponseError(message = "Error"){
    Swal.fire({
      icon: 'error',
      title: "Uh oh",
      text: message
    });
  }

  static emptyElement(element) {
    element.innerHTML = "";
  }

  

  static showElement(element) {
    element.style.display = "block";
    element.hidden = false;
  }
  static hideElement(element) {
    element.style.display = "none";
    element.hidden = true;
  }
}

export default Utils;
