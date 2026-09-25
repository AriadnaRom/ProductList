import { LitElement, html, css, unsafeCSS } from "lit";
import "../../components/type-button/type-button.js";
import "../../components/type-text/type-text.js";
import "../../components/type-picture/type-picture.js";

import styles from "./product-card.scss?inline";
import cart from "../../assets/images/icon-add-to-cart.svg"

export class ProductCard extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    image: { type: Object },
    category: { type: String },
    name: { type: String },
    price: { type: Number },
    buttonText: { type: String },
    iconName: { type: String },
  };

  constructor() {
    super();

    this.image = {};
    this.category = "";
    this.name = "";
    this.price = 0;
    this.buttonText = "";
    this.iconName = "";
  }

  _renderCard() {
    return html`
      <article class="product-card">
        <div class="image-container">
          <type-picture .image=${this.image} alt=${this.name}> </type-picture>

          <div class="button">
            <type-button .icon=${cart} .text=${this.buttonText}></type-button>
          </div>
        </div>

        <div class="product-info">
          <type-text .text=${this.category}></type-text>

          <type-text .text=${this.name} weight="bold"> </type-text>

          <type-text .text=${`$${this.price.toFixed(2)}`}> </type-text>
        </div>
      </article>
    `;
  }

  render() {
    return html`${this._renderCard()}`;
  }
}

customElements.define("product-card", ProductCard);
