import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./cart-item.scss?inline";
import emptyCart from "../../assets/images/illustration-empty-cart.svg";

export class Cart extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    items: { type: Array },
    textcart: { type: String },
  };

  constructor() {
    super();
    this.items = [];
    this.textcart = "";
  }

  render() {
    //los producctos escogidos
    const itemCount = this.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    //preico del producto mas la cantidad
    const total = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return html`
      <aside class="cart-panel" aria-label="Your cart">
        <h2>${this.textcart} (${itemCount})</h2>
        ${this.items.length === 0
          ? html`
              <div class="empty-cart">
                <img src=${emptyCart} alt="" />
                <p>Your added items will appear here</p>
              </div>
            `
          : html`
              <ul>
                ${this.items.map(
                  (item) => html`
                    <li>
                      <div>
                        <strong>${item.name}</strong>
                        <p>
                          <span>${item.quantity}x</span> @
                          $${item.price.toFixed(2)}
                          <b>$${(item.price * item.quantity).toFixed(2)}</b>
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove ${item.name}"
                        @click=${() => this._removeItem(item.id)}
                      >
                        &times;
                      </button>
                    </li>
                  `,
                )}
              </ul>
              <div class="order-total">
                <span>Order Total</span><strong>$${total.toFixed(2)}</strong>
              </div>
            `}
      </aside>
    `;
  }

  _removeItem(id) {
    this.dispatchEvent(
      new CustomEvent("remove-from-cart", {
        detail: { id },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define("shopping-cart", Cart);
