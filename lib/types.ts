export interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  imageUrl: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  createdAt: string;
}

export interface StoreProduct {
  id: string;
  storeId: string;
  productId: string;
  price: number;
  stock: number;
  inStock: boolean;
  createdAt: string;
}

export interface StoreWithProducts extends Store {
  products: (StoreProduct & { product: Product })[];
}

export interface ProductWithStores extends Product {
  stores: (StoreProduct & { store: Store })[];
}

export interface CartItem {
  storeProductId: string;
  quantity: number;
}

export interface CartQuoteResponse {
  items: {
    storeProductId: string;
    quantity: number;
    price: number;
    subtotal: number;
    product: {
      id: string;
      name: string;
      category: string;
    };
    store: {
      id: string;
      name: string;
    };
  }[];
  subtotal: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
