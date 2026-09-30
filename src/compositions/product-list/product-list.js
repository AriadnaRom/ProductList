import { LitElement, html, css, unsafeCSS } from "lit";

import products from "../../../data.json";

import "../type-header/type-header.js";
import "../product-card/product-card.js";

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

  _getImagePath(path) {
    if (!path) return "";

    return new URL(
      path.replace("./", "../../"),
      import.meta.url,
    ).href;
  }

  _getProductImage(image) {
    return {
      desktop: this._getImagePath(image.desktop),
      tablet: this._getImagePath(image.tablet),
      mobile: this._getImagePath(image.mobile),
    };
  }

  _renderList() {
    return html`
      <type-header
        .title=${this.titleProduct}
      ></type-header>

      <section class="products">
        ${this.products.map(
          (product) => html`
            <product-card
              .image=${this._getProductImage(product.image)}
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

  render() {
    return html`${this._renderList()}`;
  }
}

customElements.define("product-list", ProductList);