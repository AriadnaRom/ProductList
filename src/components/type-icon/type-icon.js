import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./type-icon.scss?inline";

export class TypeIcon extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    src: { type: String },
    alt:{type:String}
  };

  constructor() {
    super();
    this.src = "";
    this.alt = "";
  }

_renderIcons(){
return html`
  
   <img src=${this.src} alt=${this.alt} />
  `;
    
}


  render() {
    return html`${this._renderIcons()}`;
  }
}

customElements.define("type-icon", TypeIcon);
