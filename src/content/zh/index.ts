import { en, type Content } from '../en';
import { home, nav, footer } from './home';

// Home, navigation and footer are translated (designer copy from Figma).
// About / Contact / Products / Product details still fall back to English: replace each line below
// with the translated import (./about, ./contact ...) as soon as that file exists.
export const zh: Content = {
  ...en,
  home,
  nav,
  footer,
};
