const CART_STORAGE_KEY = "learnova_cart_items";
export const CART_UPDATED_EVENT = "learnova-cart-updated";

const normalizeQuantity = () => {
  return 1;
};

export const getStoredCartItems = () => {
  if (typeof window === "undefined") return [];

  try {
    const rawItems = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedItems = rawItems ? JSON.parse(rawItems) : [];
    if (!Array.isArray(parsedItems)) return [];

    const normalizedItems = parsedItems.map((item) => ({
      ...item,
      qty: normalizeQuantity(item.qty),
    }));
    if (JSON.stringify(parsedItems) !== JSON.stringify(normalizedItems)) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizedItems));
    }

    return normalizedItems;
  } catch {
    return [];
  }
};

export const setStoredCartItems = (items) => {
  if (typeof window === "undefined") return [];

  const normalizedItems = Array.isArray(items)
    ? items.map((item) => ({ ...item, qty: normalizeQuantity(item.qty) }))
    : [];

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizedItems));
  window.dispatchEvent(
    new CustomEvent(CART_UPDATED_EVENT, {
      detail: { items: normalizedItems },
    }),
  );

  return normalizedItems;
};

export const addStoredCartItem = (course) => {
  const currentItems = getStoredCartItems();
  const existingItem = currentItems.find((item) => String(item.id) === String(course.id));

  if (existingItem) {
    const nextItems = currentItems.map((item) => ({ ...item, qty: 1 }));
    setStoredCartItems(nextItems);

    return { items: nextItems, alreadyInCart: true };
  }

  const nextItems = [...currentItems, { ...course, qty: normalizeQuantity(course.qty) }];
  setStoredCartItems(nextItems);

  return { items: nextItems, alreadyInCart: false };
};

export const removeStoredCartItem = (courseId) => {
  const nextItems = getStoredCartItems().filter((item) => String(item.id) !== String(courseId));
  return setStoredCartItems(nextItems);
};
