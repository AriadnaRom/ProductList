import { LitElement, html, css, unsafeCSS } from "lit";

import "../../components/type-button/type-button.js";
import "../../components/type-text/type-text.js";
import "../../components/type-picture/type-picture.js";

import styles from "./product-card.scss?inline";

export class ConfirmCard extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    orderConfirmed: { state: true },
  };

  constructor() {
    super();

    this.orderConfirmed = false;
  }

  _confirmOrder() {
    if (Object.keys(this.cart).length > 0) this.orderConfirmed = true;
  }

  _startNewOrder() {
    this.renderRoot.querySelector("product-list")?.resetQuantities();
    this.cart = {};
    this.orderConfirmed = false;
  }

  _getOrderTotal() {
    return Object.values(this.cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  _renderConfirmation() {
    const items = Object.values(this.cart);

    return html`
      <div class="order-overlay">
        <section
          class="order-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-title"
        >
          <img class="confirmation-icon" src=${orderConfirmedIcon} alt="" />
          <h2 id="order-title">${es.orderConfirmed}</h2>
          <p class="order-subtitle">${es.orderThanks}</p>
          <div class="confirmed-items">
            ${items.map(
              (item) => html`
                <div class="confirmed-item">
                  <img src=${item.image.thumbnail} alt="" />
                  <div>
                    <div class="confirmed-name">${item.name}</div>
                    <div class="confirmed-meta">
                      <span class="confirmed-quantity">${item.quantity}x</span>
                      <span>@ $${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <span class="confirmed-price">
                    $${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              `,
            )}
            <div class="confirmed-total">
              <span>${es.orderTotal}</span>
              <strong>$${this._getOrderTotal().toFixed(2)}</strong>
            </div>
          </div>
          <type-button
            class="new-order-button"
            variant="primary"
            size="m"
            .text=${es.startNewOrder}
            type="button"
            @type-button-click=${this._startNewOrder}
          ></type-button>
        </section>
      </div>
    `;
  }

  render() {
    return html` ${this._renderConfirmatio()} `;
  }
}

customElements.define("confirm-card", ConfirmCard);
