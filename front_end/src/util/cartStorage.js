const CART_KEY = "learnova_cart";
const CART_EVENT = "learnova-cart-updated";

const getCartItems = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read cart from localStorage", error);
    return [];
  }
};

const saveCartItems = (items) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_EVENT));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};

const buildCartItem = (course) => ({
  id: course.id,
  title: course.title,
  teacher: course.instructor || course.instructorName || "Unknown Instructor",
  price: Number(course.basePrice ?? 0),
  qty: 1,
  image: course.thumbnailUrl || course.image || "",
});

const addToCart = (course) => {
  const items = getCartItems();
  const existing = items.find((item) => item.id === course.id);
  if (existing) {
    const updated = items.map((item) =>
      item.id === course.id ? { ...item, qty: item.qty + 1 } : item,
    );
    saveCartItems(updated);
    return updated;
  }

  const nextItems = [...items, buildCartItem(course)];
  saveCartItems(nextItems);
  return nextItems;
};

const removeFromCart = (itemId) => {
  const items = getCartItems().filter((item) => item.id !== itemId);
  saveCartItems(items);
  return items;
};

const updateCartQty = (itemId, qty) => {
  const items = getCartItems().map((item) =>
    item.id === itemId ? { ...item, qty: Math.max(1, qty) } : item,
  );
  saveCartItems(items);
  return items;
};

const clearCart = () => {
  saveCartItems([]);
};

export {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartQty,
  clearCart,
  CART_EVENT,
};