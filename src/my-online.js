import { LitElement, html, css, unsafeCSS } from "lit";
import "./compositions/product-list/product-list.js";
import "./compositions/cart/cart.js";
import { es } from "./locales/locale_es.js";
import styles from "./my-online.scss?inline";

export class MyOnline extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    cart: { state: true },
  };

  constructor() {
    super();
    this.cart = {};
  }

  _addToCart(event) {
    const product = event.detail;

    if (product.quantity <= 0) {
      const { [product.id]: removedItem, ...remainingItems } = this.cart;
      this.cart = remainingItems;
      return;
    }

    this.cart = {
      ...this.cart,
      [product.id]: {
        ...product,
      },
    };
  }

  _removeFromCart(event) {
    const productList = this.renderRoot.querySelector("product-list");
    const wasReset = productList?.resetProductQuantity(event.detail.id);

    if (!wasReset) {
      const { [event.detail.id]: removedItem, ...remainingItems } = this.cart;
      this.cart = remainingItems;
    }
  }

  _renderContent() {
    return html`
      <main class="main-content">
        <product-list
          .titleProduct=${es.desserts}
          .buttonText=${es.cart}
          .cart=${this.cart}
          @cart-change=${this._addToCart}
        ></product-list>

        <shopping-cart
          .items=${Object.values(this.cart)}
          .textcart=${es.YourCart}
          .textaddcart=${es.description}
          .texttotal=${es.orderTotal}
          .textremove=${es.textremove}
          .textconfirm=${es.confirmOrder}
          .textcarbon=${es.carbonNeutral}
          @remove-from-cart=${this._removeFromCart}
        ></shopping-cart>
      </main>
    `;
  }

  render() {
    return html` ${this._renderContent()} `;
  }
}

window.customElements.define("my-online", MyOnline);
