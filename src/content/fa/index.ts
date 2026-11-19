import type { Content } from '../en';
import { home, nav, footer } from './home';
import { about } from './about';
import { contact } from './contact';
import { products } from './products';
import { productDetails, productPage } from './product-details';

// Typed as Content: TypeScript reports any key that is missing compared with English.
export const fa: Content = { home, nav, footer, about, contact, products, productDetails, productPage };
