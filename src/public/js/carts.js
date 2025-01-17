
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    let totalQuantity = 0;

    document.querySelectorAll('.quantity').forEach(quantityElement => {
        totalQuantity += parseInt(quantityElement.textContent);
    });

    cartCountElement.textContent = totalQuantity;
}

async function updateQuantity(cartId, productId, currentQuantity, change) {
    try {
        const newQuantity = currentQuantity + change;
        if (newQuantity < 1) {
            return;
        }

        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la cantidad del producto');
        }

        const data = await response.json();

        if (data.status === 'success') {
            document.getElementById(`quantity-${cartId}-${productId}`).textContent = newQuantity;
        } else {
            throw new Error(data.message || 'Error al actualizar la cantidad del producto');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el carrito. Intente otra vez');
    }
}

async function removeProduct(cartId, productId) {
    try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto del carrito');
        }

        const data = await response.json();

        if (data.status === 'success') {
            location.reload();
        } else {
            throw new Error(data.message || 'Error al eliminar el producto del carrito');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el carrito. Intente de nuevo.');
    }
}

async function emptyCart(cartId) {
    const userConfirmed = confirm("¿Estas seguro de que deseas vaciar el carrito?");
    if (!userConfirmed) {
        return;
    }

    try {
        const response = await fetch(`/api/carts/${cartId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el carrito');
        }

        const data = await response.json();

        if (data.status === 'success') {
            localStorage.removeItem('cartId');
            location.reload();
        } else {
            throw new Error(data.message || 'Error al eliminar el carrito');
        }
    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        alert('Error al eliminar el carrito. Intente otra vez');
    }
}