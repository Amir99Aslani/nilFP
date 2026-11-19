import { home, nav, footer } from './home';
import { about } from './about';
import { contact } from './contact';
import { products } from './products';
import { productDetails, productPage } from './product-details';

export const en = { home, nav, footer, about, contact, products, productDetails, productPage };
export type Content = typeof en;
