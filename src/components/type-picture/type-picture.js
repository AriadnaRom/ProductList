import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./type-picture.scss?inline";

export class TypePicture extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    image: { type: Object },
    alt: { type: String },
  };

  constructor() {
    super();

    this.image = null;
    this.alt = "";
  }


  _renderPicture() {
     if (!this.image) return html``;

  const desktop = this.image.desktop || "";
  const tablet = this.image.tablet || desktop;
  const mobile = this.image.mobile || tablet;

  return html`
    <picture>
      <source
        media="(min-width: 1024px)"
        srcset=${desktop}
      />

      <source
        media="(min-width: 768px)"
        srcset=${tablet}
      />

      <img
        src=${mobile}
        alt=${this.alt}
      />
    </picture>
    `;
  }

  render() {
    return html`${this._renderPicture()} `;
  }
}

customElements.define("type-picture", TypePicture);
