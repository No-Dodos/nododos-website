class ThemeSelector extends HTMLElement {
  #defaultTheme = '';
  #selector: HTMLSelectElement;
  #target: HTMLElement;
  #theme?: string;
  constructor() {
    super();
    this.#selector = this.querySelector('select') as HTMLSelectElement;
    const targetSelector = this.dataset.target;
    if (!targetSelector) {
      throw new Error('ThemeSelector must have a `data-target` attribute');
    }
    this.#target = document.querySelector(targetSelector) as HTMLElement;
    if (!this.#target) {
      throw new Error(`No element found with selector: ${targetSelector}`);
    }
    const themeClass = [...this.#target.classList].find((className) =>
      className.startsWith('theme--')
    );
    if (!themeClass) return;
    const theme = themeClass.replace('theme--', '');
    this.#defaultTheme = theme;
    this.#theme = theme;
  }

  connectedCallback() {
    this.#selector.addEventListener('change', (event) => {
      const theme = (event.target as HTMLSelectElement).value;
      this.setTheme(theme);
    });
  }

  setTheme(theme: string) {
    this.#target.classList.remove(`theme--${this.#theme}`);
    if (theme === 'auto') {
      this.#target.classList.add(`theme--${this.#defaultTheme}`);
    } else {
      this.#target.classList.add(`theme--${theme}`);
    }
    this.#theme = theme;
    this.#selector.value = theme;
  }
}

customElements.define('theme-selector', ThemeSelector);
