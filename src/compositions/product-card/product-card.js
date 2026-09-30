import { LitElement, html, css, unsafeCSS } from "lit";

import "../../components/type-button/type-button.js";
import "../../components/type-text/type-text.js";
import "../../components/type-picture/type-picture.js";

import styles from "./product-card.scss?inline";

import cart from "../../assets/images/icon-add-to-cart.svg";
import iconMinus from "../../assets/images/icon-decrement-quantity.svg";
import iconPlus from "../../assets/images/icon-increment-quantity.svg";

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
    quantity: { type: Number },
  };

  constructor() {
    super();

    this.image = {};
    this.category = "";
    this.name = "";
    this.price = 0;
    this.buttonText = "";
    this.quantity = 0;
  }

  _addProduct() {
    this.quantity = 1;

    this._dispatchCartChange();
  }

  _decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity -= 1;

      this._dispatchCartChange();
    }
  }

  _increaseQuantity() {
    this.quantity += 1;

    this._dispatchCartChange();
  }

  _dispatchCartChange() {
    this.dispatchEvent(
      new CustomEvent("cart-change", {
        detail: {
          id: this.name,
          name: this.name,
          category: this.category,
          price: this.price,
          image: this.image,
          quantity: this.quantity,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _renderCartControl() {
    if (this.quantity === 0) {
      return html`
        <type-button
          .icon=${cart}
          .text=${this.buttonText}
          size="m"
          weight="bold"
          type="button"
          @type-button-click=${this._addProduct}
        ></type-button>
      `;
    }

    return html`
      <div class="quantity-control">
        <type-button
          .icon=${iconMinus}
          variant="icon"
          type="button"
          @type-button-click=${this._decreaseQuantity}
        ></type-button>

        <div class="quantity">
          ${this.quantity}
        </div>

        <type-button
          .icon=${iconPlus}
          variant="icon"
          type="button"
          @type-button-click=${this._increaseQuantity}
        ></type-button>
      </div>
    `;
  }

  _renderCard() {
    return html`
      <article class="product-card">
        <div class="image-container">
          <type-picture
            .image=${this.image}
            alt=${this.name}
          ></type-picture>

          <div class="button">
            ${this._renderCartControl()}
          </div>
        </div>

        <div class="product-info">
          <type-text
            size="m"
            .text=${this.category}
          ></type-text>

          <type-text
            size="m"
            .text=${this.name}
            weight="bold"
          ></type-text>

          <type-text
            class="price"
            size="m"
            weight="semibold"
            .text=${`$${this.price.toFixed(2)}`}
          ></type-text>
        </div>
      </article>
    `;
  }

  render() {
    return html`
      ${this._renderCard()}
    `;
  }
}

customElements.define("product-card", ProductCard);