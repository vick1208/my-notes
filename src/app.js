import "./script/components/index.js";
import "./styles/style.css";
import 'aos/dist/aos.css';
import home from "./script/views/home.js";
import AOS from "aos";

document.addEventListener("DOMContentLoaded", () => {

  AOS.init();

  home();
});
