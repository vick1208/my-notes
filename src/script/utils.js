class Utils {
  static uniqueId() {
    const randomString = Math.random().toString(36).substring(2, 16);
    return `notes-${randomString}`;
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
