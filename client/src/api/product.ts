import type { Product } from "../models/product";
import { API_URL } from "../config";

export class ApiProduct {
  constructor(private product?: Product) {
    this.product = product;
  }

  async fetchProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/product/${id}/`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  }
}
