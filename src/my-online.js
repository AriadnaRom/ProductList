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
      <product-list
      .titleProduct=${es.desserts}
      .buttonText=${es.cart}
      >

      </product-list>`;
  }
}

window.customElements.define("my-online", MyOnline);
