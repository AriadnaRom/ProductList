import { LitElement, html, css, unsafeCSS } from "lit";

import products from "../../data.json";


import "../compositions/type-header/type-header.js";
import "../compositions/product-card/product-card.js";

import styles from "./product-list.scss?inline";

export class ProductList extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    titleProduct: { type: String },
    products: { type: Array },
    buttonText: { type: String },
  };

  constructor() {
    super();

    this.titleProduct = "";
    this.products = products;
    this.buttonText = "";
  }



  _getImagePath(image) {
 return new URL(image.replace("./", "../"), import.meta.url).href;
}
  render() {
    return html`
      <type-header
        .title=${this.titleProduct}
      ></type-header>

      <section class="products">
        ${this.products.map(
          (product) => html`
            <product-card
              .image=${product.image}
              .name=${product.name}
              .category=${product.category}
              .price=${product.price}
              .buttonText=${this.buttonText}
            ></product-card>
          `,
        )}
      </section>
    `;
  }
}

customElements.define("product-list", ProductList);