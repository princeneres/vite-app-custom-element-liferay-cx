import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Optional: pass attributes on the element down as props

function getProps(el) {
  if (!el) return {};
  const attrs = {};
  for (const attr of el.attributes) {
    const name = attr.name;
    const value = attr.value;
    if (name.startsWith("data-")) {
      attrs[name.slice(5)] = value;
    }
  }

  // Liferay globals are available on window.Liferay if you need them
  // Example:
  // attrs.locale = window.Liferay?.ThemeDisplay?.getLanguageId?.();

  return attrs;
}

class ReactCustomElement extends HTMLElement {
  connectedCallback() {
    this._container = document.createElement("div");
    this.appendChild(this._container);

    this._root = createRoot(this._container);
    this._root.render(
      <React.StrictMode>
        <App {...getProps(this)} />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    this._root?.unmount();
    this._root = null;
    this._container?.remove();
  }
}

const TAG = "vite-app-custom-element-liferay-cx";

if (!customElements.get(TAG)) {
  customElements.define(TAG, ReactCustomElement);
}
