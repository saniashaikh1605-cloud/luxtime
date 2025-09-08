document.addEventListener("DOMContentLoaded", () => {
  let cartItems = [];
  const cartCount = document.getElementById("cart-count");
  const cartDetails = document.getElementById("cart-details");
  const viewCartBtn = document.getElementById("view-cart");
  const addButtons = document.querySelectorAll(".add-to-cart-btn");

  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);

      const existing = cartItems.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartItems.push({ name, price, quantity: 1 });
      }

      updateCartCount();
      button.textContent = "✔ Added";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = "Add to Cart";
        button.disabled = false;
      }, 1000);
    });
  });

  viewCartBtn.addEventListener("click", () => {
    cartDetails.classList.toggle("hidden");
    renderCart();
  });

  function updateCartCount() {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
  }

  function renderCart() {
    if (cartItems.length === 0) {
      cartDetails.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    let html = "<ul>";

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      html += `
        <li>
          <div>
            <strong>${item.name}</strong> x ${item.quantity}
          </div>
          <div>
            ₹${itemTotal.toFixed(2)}
            <button class="remove-btn" data-index="${index}">&times;</button>
          </div>
        </li>
      `;
    });

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    html += `
      </ul>
      <div style="margin-top: 10px; font-weight: bold;">
        Total: ₹${totalPrice.toFixed(2)}
      </div>
    `;

    cartDetails.innerHTML = html;

    const removeButtons = cartDetails.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
      const index = parseInt(button.dataset.index);
      button.addEventListener("click", () => {
        removeFromCart(index);
      });
    });
  }

  function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartCount();
    renderCart();
  }
});
