import {LitElement, html, css, unsafeCSS  } from "lit";
import styles from "./type-header.scss?inline";
import "../../components/type-text/type-text.js";

export class TypeHeader extends LitElement {

    static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    title: { type: String },
    subtitle: { type: String },
    align: { type: String },
  };

  constructor() {
    super();
    this.title = "";
  }

  

  _renderContent() {
    return html`
      <div class="header">
        <type-text
          tag="h1"
          size="l"
          weight="bold"
          text="${this.title}"
          align="left"
        ></type-text>
      </div>
    `;
  }

  render() {
    return html`${this._renderContent()}`;
  }
}

customElements.define("type-header", TypeHeader);
