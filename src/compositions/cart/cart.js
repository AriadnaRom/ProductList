import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./cart-item.scss?inline";
import "../../components/type-icon/type-icon.js";
import emptyCart from "../../assets/images/illustration-empty-cart.svg";
import removeIcon from "../../assets/images/icon-remove-item.svg";
import carbonIcon from "../../assets/images/icon-carbon-neutral.svg";
import "../../components/type-text/type-text.js";
import "../../components/type-button/type-button.js";
import "../../components/type-icon/type-icon.js";

export class Cart extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    items: { type: Array },
    textcart: { type: String },
    textaddcart: { type: String },
    texttotal: { type: String },
    textremove: { type: String },
    textconfirm: { type: String },
    textcarbon: { type: String },
  };

  constructor() {
    super();
    this.items = [];
    this.textcart = "";
    this.textaddcart = "";
    this.texttotal = "";
    this.textremove = "";
    this.textconfirm = "";
    this.textcarbon = "";
  }
//conteo de productos en el carrito
  _getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }
  //total de productos en el carrito
  _getTotal() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }

  _confirmOrder() {
    this.dispatchEvent(
      new CustomEvent("cart-confirm-order", { 
        bubbles: true,
         composed: true }),
    );
  }
//muestra el carrito de compras vacío
  _renderEmptyCart() {
    return html`
      <div class="empty-cart">
        <type-icon .src=${emptyCart} alt="" class="cart-icon"></type-icon>

        <type-text size="s" .text=${this.textaddcart}></type-text>
      </div>
    `;
  }
//lo que se muestra en el carrito de compras, los productos agregados y sus cantidades
  _renderCartItems() {
    return html`
      <ul>
        ${this.items.map(
          (item) => html`
            <li class="cart-item">
              <div class="item-info">
                <type-text
                  size="s"
                  weight="bold"
                  .text=${item.name}
                ></type-text>

                <div class="item-price">
                  <type-text
                    size="s"
                    class="item-quantity"
                    .text=${`${item.quantity}x`}
                  ></type-text>

                  <type-text
                    size="s"
                    class="item-unit-price"
                    .text=${`@ $${item.price.toFixed(2)}`}
                  ></type-text>

                  <type-text
                    size="s"
                    class="item-subtotal"
                    weight="semibold"
                    .text=${`$${(item.price * item.quantity).toFixed(2)}`}
                  ></type-text>
                </div>
              </div>

              <div class="button-remove">
                <type-button
                  .icon=${removeIcon}
                  variant="icon"
                  type="button"
                  @type-button-click=${() => this._removeItem(item.id)}
                ></type-button>
              </div>
            </li>
          `,
        )}
      </ul>
    `;
  }

//muestra el total de la orden en el carrito de compras 
  _renderOrderTotal() {
    const total = this._getTotal();

    return html`
      <div class="order-total">
        <type-text size="s" .text=${this.texttotal}></type-text>

        <type-text
          size="l"
          weight="bold"
          .text=${`$${total.toFixed(2)}`}
        ></type-text>
      </div>
    `;
  }

  _renderCarbonNotice() {
    return html`
      <div class="carbon-notice">
        <type-icon .src=${carbonIcon} alt=""></type-icon>
        <type-text size="s" .text=${this.textcarbon}></type-text>
      </div>
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

  render() {
    const itemCount = this._getItemCount();

    return html`
      <aside class="cart-panel">
        <type-text
          tag="h2"
          class="cart-title"
           weight="bold"
          .text=${`${this.textcart} (${itemCount})`}
        ></type-text>

        ${this.items.length === 0
          ? this._renderEmptyCart()
          : html`
              ${this._renderCartItems()} 
              ${this._renderOrderTotal()}
              ${this._renderCarbonNotice()}
              
              <type-button
                variant="primary"
                size="m"
                .text=${this.textconfirm}
                type="button"
                @type-button-click=${this._confirmOrder}
              ></type-button>
            `}
      </aside>
    `;
  }
}

customElements.define("shopping-cart", Cart);
