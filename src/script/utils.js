import Swal from "sweetalert2";

class Utils {
  static showResponseError(message = "Check your internet connection") {
    Swal.fire({
      icon: "error",
      title: "Uh oh",
      text: message,
    });
  }

  static showResponseConfirm(title,message,btnText){
    return Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: btnText,
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

  static formattedDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  }
}

export default Utils;
