// Variables globales
let cart = [];

// Selección de elementos del DOM
const cartModal = document.getElementById('cart-modal');
const viewCartBtn = document.getElementById('view-cart-btn');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Mostrar el carrito
viewCartBtn.onclick = () => {
    updateCart();
    cartModal.style.display = 'flex';
};

closeCart.onclick = () => {
    cartModal.style.display = 'none';
};

// Agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.onclick = (event) => {
        const productCard = event.target.closest('.product-card');
        const product = {
            id: productCard.dataset.id,
            name: productCard.dataset.name,
            price: parseFloat(productCard.dataset.price),
        };
        addToCart(product);
    };
});

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
            <p>${product.name} - $${product.price} x ${product.quantity}</p>
            <button class="remove-item" data-id="${product.id}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(item);

        total += product.price * product.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    attachRemoveItemListeners();
}

function attachRemoveItemListeners() {
    document.querySelectorAll('.remove-item').forEach(button => {
        button.onclick = (event) => {
            const productId = event.target.dataset.id;
            cart = cart.filter(product => product.id !== productId);
            updateCart();
        };
    });
}

document.getElementById('checkout-btn').onclick = () => {
    alert('Compra finalizada. Gracias por tu compra.');
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
};
