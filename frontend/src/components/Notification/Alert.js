import "./bootstrap-v4.css";
import "./Noty.css"
import Noty from "noty";

export default function Alert(type, text) {
  new Noty({
    type: type,
    theme: "bootstrap-v4",
    layout: "topRight",
    text: `&#10004;  ${text}`,
    timeout: "2000"
  }).show();
}
