import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./type-text.scss?inline";

export class TypeText extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

static properties = {
  text: {
    type: String,
    attribute: "text",
  },

  size: {
    type: String,
    attribute: "size",
  },

  alignText: {
    type: String,
    attribute: "align-text",
  },

  weight: {
    type: String,
    attribute: "weight",
  },

  tag: {
    type: String,
    attribute: "tag",
  }




};

  constructor() {
    super();

    this.text = "";
    this.size = "";
    this.alignText = "";
    this.weight = "";
    this.tag = "";
  }

  _renderContent() {
  const className = [this.size, this.alignText, `weight-${this.weight}`]
      .filter(Boolean)
      .join(" ");

      switch (this.tag) {
        case "h1":
          return html`<h1 class=${className}>${this.text}</h1>`;
        case "h2":
          return html`<h2 class=${className}>${this.text}</h2>`;
        case "h3":
          return html`<h3 class=${className}>${this.text}</h3>`;

        default:
          return html `<p class =${className}>${this.text}</p>`;
      }
  }

  render() {
    return html`${this._renderContent()}`;
  }
}

customElements.define("type-text", TypeText);
