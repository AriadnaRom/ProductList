import { LitElement, css, html } from "lit";
import "./compositions/product-list/product-list.js";
import "./compositions/cart/cart.js";
import { es } from "./locales/locale_es.js";

export class MyOnline extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .main-content {
      display: grid;
      grid-template-columns: minmax(0, 2.08fr) minmax(210px, 1fr);
      gap: 18px;
      align-items: start;
      max-width: 1440px;
      margin: 0 auto;
    }

    @media (max-width: 700px) {
      .main-content {
        grid-template-columns: 1fr;
      }
    }
  `;

  static properties = {
    cart: { state: true },
  };

  constructor() {
    super();
    this.cart =
      /** @type {Record<string, { id: string, name: string, category: string, price: number, image: object, quantity: number }>} */ ({});
  }

  _addToCart(event) {
    const product = event.detail;
    const existingItem = this.cart[product.id];

    this.cart = {
      ...this.cart,
      [product.id]: {
        ...product,
        quantity: existingItem ? existingItem.quantity + 1 : 1,
      },
    };
  }

  _removeFromCart(event) {
    const { [event.detail.id]: removedItem, ...remainingItems } = this.cart;
    this.cart = remainingItems;
  }

  render() {
    return html`
      <main
        class="main-content"
        @add-to-cart=${this._addToCart}
        @remove-from-cart=${this._removeFromCart}
      >
        <product-list
          .titleProduct=${es.desserts}
          .buttonText=${es.cart}
        ></product-list>
        <shopping-cart
          .items=${Object.values(this.cart)}
          .textcart=${es.YourCart}
        ></shopping-cart>
      </main>
    `;
  }
}

window.customElements.define("my-online", MyOnline);
