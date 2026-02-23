import { apiFetch } from "./http";

export function fetchInventory() {
  return apiFetch("/inventory");
}

export function fetchLowStock() {
  return apiFetch("/inventory/low-stock");
}

export function updateInventory(productId, payload) {
  return apiFetch(`/inventory/${productId}`, {
    method: "PUT",
    body: payload
  });
}

export const deleteInventory = async (productId) => {
  const response = await fetch(`http://localhost:8081/api/inventory/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete inventory");
  }
};

export const addInventory = async (productId, data) => {
  const response = await fetch(
    `http://localhost:8081/api/inventory/create?productId=${productId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add inventory");
  }

  return response.json();
};