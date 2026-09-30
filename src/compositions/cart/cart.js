import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./cart-item.scss?inline";
import "../../components/type-icon/type-icon.js"
import emptyCart from "../../assets/images/illustration-empty-cart.svg";

export class Cart extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    items: { type: Array },
    textcart: { type: String },
    textaddcart:{type:String}
  };

  constructor() {
    super();
    this.items = [];
    this.textcart = "";
    this.textaddcart="";
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
      <aside class="cart-panel">
       <type-text
       tag="h2"
        class="cart-title"
        .text=${`${this.textcart}(${itemCount})`} ></type-text>

        ${this.items.length === 0
          ? html`
              <div class="empty-cart">
                <type-icon src=${emptyCart} 
                alt="" class="cart-icon">
              </type-icon>
                <type-text size="s" .text=${this.textaddcart}></type-text>
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
