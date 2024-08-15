document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productDiv = event.target.closest('.product');
            const productId = productDiv.getAttribute('data-id');
            const productName = productDiv.querySelector('h3').textContent;
            const productPrice = parseFloat(productDiv.querySelector('p').textContent.replace('₹', '').trim());

            const product = {
                id: productId,
                name: productName,
                price: productPrice
            };

            cart.push(product);
            updateCart();
        });
    });

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((product, index) => {
            const item = document.createElement('li');
            item.textContent = `${product.name} - ₹${product.price.toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-from-cart');
            removeButton.dataset.index = index;

            removeButton.addEventListener('click', (event) => {
                const indexToRemove = event.target.dataset.index;
                cart.splice(indexToRemove, 1);
                updateCart();
            });

            item.appendChild(removeButton);
            cartItems.appendChild(item);

            total += product.price;
        });

        const totalElement = document.createElement('li');
        totalElement.classList.add('total');
        totalElement.textContent = `Total: ₹${total.toFixed(2)}`;
        cartItems.appendChild(totalElement);
    }
});
