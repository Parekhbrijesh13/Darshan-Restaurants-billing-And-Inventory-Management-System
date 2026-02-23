import { apiFetch } from './http';

export async function fetchPosProducts() {
  return apiFetch('/products/pos');
}

export async function checkoutOrder(payload) {
  return apiFetch('/orders/checkout', {
    method: 'POST',
    body: payload   // ✅ no stringify here
  });
}

