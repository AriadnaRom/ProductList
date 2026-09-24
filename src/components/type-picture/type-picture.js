import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./type-picture.scss?inline";

export class TypePicture extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    src: { type: String },
    alt: { type: String },
    image: { type: Object },
  };

  constructor() {
    super();
    this.src = "";
    this.alt = "";
    this.image = null;
  }

  _getImagePath(path) {
    if (!path) return "";
    return new URL(path.replace("./", "../"), import.meta.url).href;
  }

  _renderImageSet() {
    const image = this.image || {};
    const desktop = image.desktop || image.src || "";
    const tablet = image.tablet || desktop;
    const mobile = image.mobile || tablet;

    return html`
      <picture>
        <source
          media="(min-width: 1024px)"
          srcset=${this._getImagePath(desktop)}
        />
        <source
          media="(min-width: 768px)"
          srcset=${this._getImagePath(tablet)}
        />
        <img src=${this._getImagePath(mobile)} alt=${this.alt || ""} />
      </picture>
    `;
  }

  _renderPicture() {
    if (!this.src) return html``;

    return html`
      <img src=${this._getImagePath(this.src)} alt=${this.alt || ""} />
    `;
  }

  render() {
    if (
      this.image &&
      typeof this.image === "object" &&
      Object.keys(this.image).length
    ) {
      return this._renderImageSet();
    }

    return this._renderPicture();
  }
}

customElements.define("type-picture", TypePicture);
