import { Product } from "@/types";

export interface CartItem {
  id: string; // Combination of productId, size, color
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  size?: number | null;
  color?: string | null;
}

const CART_KEY = "shopping_cart";

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage", error);
    return [];
  }
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Dispatch event to update navbar badge
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

export const addToCart = (product: Product, quantity: number, size?: number | null, color?: string | null) => {
  const cart = getCart();
  const id = `${product.id}-${size || 'nosize'}-${color || 'nocolor'}`;
  
  const existingItemIndex = cart.findIndex(item => item.id === id);
  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Check if category is object or string
    let categoryName = "Giày";
    if (typeof product.category === 'object' && product.category !== null) {
      categoryName = product.category.name || "Giày";
    } else if (typeof product.category === 'string') {
      categoryName = product.category;
    }

    cart.push({
      id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image || product.imageUrl || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
      category: categoryName,
      size,
      color
    });
  }
  
  saveCart(cart);
};

export const updateQuantity = (id: string, delta: number) => {
  const cart = getCart();
  const updatedCart = cart.map(item => {
    if (item.id === id) {
      return { ...item, quantity: Math.max(1, item.quantity + delta) };
    }
    return item;
  });
  saveCart(updatedCart);
};

export const removeFromCart = (id: string) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== id);
  saveCart(updatedCart);
};

export const clearCart = () => {
  saveCart([]);
};

export const getCartCount = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};
