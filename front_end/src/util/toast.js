const showToast = (type, message) => {
  if (typeof window === "undefined") return;

  const normalizedMessage = message || "";
  if (!normalizedMessage) return;

  const toastContainer = document.createElement("div");
  toastContainer.style.position = "fixed";
  toastContainer.style.top = "20px";
  toastContainer.style.right = "20px";
  toastContainer.style.zIndex = "99999";
  toastContainer.style.display = "flex";
  toastContainer.style.flexDirection = "column";
  toastContainer.style.gap = "10px";

  const toastEl = document.createElement("div");
  toastEl.style.padding = "12px 16px";
  toastEl.style.borderRadius = "8px";
  toastEl.style.color = "#fff";
  toastEl.style.fontWeight = "600";
  toastEl.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
  toastEl.style.minWidth = "220px";
  toastEl.style.maxWidth = "320px";
  toastEl.style.background = type === "error" ? "#ef4444" : type === "success" ? "#10b981" : "#2563eb";
  toastEl.textContent = normalizedMessage;

  toastContainer.appendChild(toastEl);
  document.body.appendChild(toastContainer);

  setTimeout(() => {
    toastEl.style.opacity = "0";
    toastEl.style.transition = "opacity 0.3s ease";
    setTimeout(() => toastContainer.remove(), 300);
  }, 2500);
};

export const toast = {
  success: (message) => showToast("success", message),
  error: (message) => showToast("error", message),
  info: (message) => showToast("info", message),
  warn: (message) => showToast("warn", message),
};

export default toast;
