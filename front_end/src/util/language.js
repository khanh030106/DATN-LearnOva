const LANG_KEY = "learnova_lang";
const LANG_EVENT = "learnova-language-changed";

export function getLanguage() {
  if (typeof window === "undefined") return "en";
  try {
    return window.localStorage.getItem(LANG_KEY) || "vi";
  } catch (e) {
    return "vi";
  }
}

export function setLanguage(lang) {
  if (typeof window === "undefined") return;
  try {
    console.log("setLanguage called with:", lang);
    window.localStorage.setItem(LANG_KEY, lang);
    console.log("localStorage updated:", window.localStorage.getItem(LANG_KEY));
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: { lang } }));
    console.log("Event dispatched:", LANG_EVENT);
  } catch (e) {
    /* ignore */
  }
}

export function toggleLanguage() {
  const next = getLanguage() === "en" ? "vi" : "en";
  setLanguage(next);
  return next;
}

export { LANG_EVENT };
