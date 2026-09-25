import { LitElement, css, html } from "lit";
import "./pages/product-list.js";
import { es } from "./locales/locale_es.js";

export class MyOnline extends LitElement {
  static properties = {
    cart: { state: true },
  };

  constructor() {
    super();
    this.cart = {};
  }

  render() {
    return html`
      <main class="main-content">
        <product-list
          .titleProduct=${es.desserts}
          .buttonText=${es.cart}
        ></product-list>
        <shopping-cart></shopping-cart>
      </main>
    `;
  }
}

window.customElements.define("my-online", MyOnline);
