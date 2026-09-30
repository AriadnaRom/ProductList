import { LitElement, html, css, unsafeCSS } from "lit";
import "../type-icon/type-icon.js"

import styles from "./type-button.scss?inline";

export class TypeButton extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    text: {
      type: String,
    },

    size: {
      type: String,
    },

    variant: {
      type: String,
    },

    type: {
      type: String,
    },

    selected: {
      type: Boolean,
      reflect: true,
    },

    icon: {
      type: String,
    },
      weight: {
    type: String,
    attribute: "weight",
  },
  };

  constructor() {
    super();

    this.text = "";
    this.size = "";
    this.variant = "";
    this.type = "";
    this.selected = false;
    this.icon = "";
      this.weight = "";
    
  }

  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("type-button-click", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  _renderContent() {
    const className = `
      ${this.size}
      ${this.variant}
      weight-${this.weight}
      ${this.selected ? "selected" : ""}
    `;

    return html`
      <button
        type=${this.type}
        class=${className}
        @click=${this._handleClick}
      >
        ${this.icon
          ? html`<type-icon .src=${this.icon}></type-icon>`
          : ""}

        ${this.text}
      </button>
    `;
  }

  render() {
    return html`
      ${this._renderContent()}
    `;
  }
}

customElements.define("type-button", TypeButton);