
//add date to form


/* Like Buttons */
const likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach((button) => {
      const countSpan = button.nextElementSibling;

      button.addEventListener('click', () => {
            let count = parseInt(countSpan.textContent, 10);
            count++;
            countSpan.textContent = count;
      })
})

/* Cart Mechanics */


const cartCount = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

const cartIcon = document.querySelector('.cart-display');

const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');



let cart = JSON.parse(localStorage.getItem('cart')) || [];

updateCartCount(); // ⬅ Ensures cart number shows on page load


// Click to display cart
cartIcon.addEventListener('click', openCartSidebar);


function openCartSidebar() {
      document.getElementById('cart-sidebar').classList.add('open');
      renderCartPanel(); // use your existing render logic
      updateCartCount();
}

function closeCartSidebar() {
      document.getElementById('cart-sidebar').classList.remove('open');
}


function renderCartPanel() {
      cartItemsEl.innerHTML = '';

      if (cart.length === 0) {
            cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalEl.textContent = '';
      return;
      }

      let total = 0;

      cart.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.classList.add('cart-item');

      itemEl.innerHTML = `
      <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
            <div class="cart-item-details">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-qty">Qty: ${item.quantity}</div>
                  <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                  <div class="quantity-controls">
                  <button onclick="changeQuantity(${index}, -1)">−</button>
                  <span>${item.quantity}</span>
                  <button onclick="changeQuantity(${index}, 1)">+</button>
                  </div>
                  <button onclick="removeItem(${index})" class="remove-button">Remove</button>
            </div>
      </div>
      `;



      cartItemsEl.appendChild(itemEl);
      total += item.price * item.quantity;
      });

      cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
}




// Cart + | - | Del buttons

function changeQuantity(index, delta) {
      cart[index].quantity += delta;

      if (cart[index].quantity <= 0) {
            cart.splice(index,1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCartPanel();
            return;
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCartPanel();


      const total = cart.reduce((sum, item) => sum + item.price* item.quantity, 0);
      cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
      
}

function removeItem(index) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCartPanel();
      
}




//Update Cart Panel


function updateCartCount() {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = count;
}

addToCartButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
            // Retrieve Classified Information
            const item = {
                  name: button.dataset.name,
                  price: parseFloat(button.dataset.price),
                  image: button.dataset.image,
                  quantity: 1
            };

            // Check for Double Agents
            const existingItem = cart.find(cartItem => cartItem.name === item.name);
            if (existingItem) {
                  existingItem.quantity++;
            } else {
                  cart.push(item);
            }

            //Report Intellegence

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();

            
            renderCartPanel();
            
            
      });


});
