// SAMPLE CONTENT. The design had no product data, so everything below is generic copy that
// describes how NFP works, not facts about specific stock, brands, prices or certificates.
// Replace it with the company's real data (one object per product area).
// Optional per product: images: ['/images/products/xxx.jpg', ...] (first one is the main picture).

export type RequestKind = 'purchasing' | 'supply' | 'import' | 'export' | 'partnership' | 'other';

export type ProductDetail = {
  slug: string;
  icon: 'car' | 'food' | 'machinery' | 'solar' | 'truck' | 'parts';
  category: string;
  name: string;
  summary: string;
  intro: string;
  specs: { label: string; value: string }[];
  details: { title: string; text: string }[];
  quoteType: RequestKind;
  images?: string[];
};

export const productDetails: ProductDetail[] = [
  {
    slug: 'food-products-export',
    icon: 'food',
    category: 'Food',
    name: 'Food & Agricultural Products',
    summary: 'Supply routes for food and agricultural products in target markets.',
    intro:
      'We help buyers source food and agricultural products and connect producers with markets abroad. Each request starts with the product, the grade and the destination, so the offer you receive fits the market you sell in.',
    specs: [
      { label: 'Product range', value: 'Dried fruit, nuts, spices, grains' },
      { label: 'Product group', value: 'Food & agriculture' },
      { label: 'Grade / standard', value: 'Per order specification' },
      { label: 'Packaging / unit', value: 'Bulk, cartons, pallets' },
      { label: 'Minimum order', value: 'On request' },
    ],
    details: [
      { title: 'Quality & specification', text: 'Grade, moisture, origin and shelf life are agreed with the buyer before an offer is prepared.' },
      { title: 'Packaging & labelling', text: 'Packaging, labelling language and palletising follow the requirements of the target market.' },
      { title: 'Documents & compliance', text: 'Commercial invoice, packing list, certificate of origin and any market-specific certificates are prepared per order.' },
    ],
    quoteType: 'export',
  },
  {
    slug: 'passenger-car-imports',
    icon: 'car',
    category: 'Vehicles',
    name: 'Passenger Vehicles',
    summary: 'Vehicle sourcing opportunities that fit market demand.',
    intro:
      'We explore and follow up on vehicle sourcing opportunities based on what your market needs. Tell us the model, specification and quantity you are looking for, and we will review what can be supplied and how it can be shipped.',
    specs: [
      { label: 'Brand / model', value: 'By request' },
      { label: 'Product group', value: 'Passenger vehicles' },
      { label: 'Regulations', value: 'Destination market rules' },
      { label: 'Unit', value: 'Per vehicle' },
      { label: 'Order size', value: 'Single units or lots' },
    ],
    details: [
      { title: 'Model & specification matching', text: 'Trim, engine, options and condition are matched to the requirements of your market and customers.' },
      { title: 'Inspection & documentation', text: 'Condition reports and vehicle documents are reviewed before any shipment is arranged.' },
      { title: 'Shipping & delivery', text: 'Roll-on/roll-off and container shipping options are compared for your destination port.' },
    ],
    quoteType: 'import',
  },
  {
    slug: 'heavy-machinery-road-construction',
    icon: 'machinery',
    category: 'Machinery & Parts',
    name: 'Heavy Machinery & Road Construction Equipment',
    summary: 'Machinery for construction and infrastructure projects.',
    intro:
      'We source and import machinery for construction and infrastructure projects. Share the type of equipment, capacity and project timeline, and we will review suitable options and how to move them to site.',
    specs: [
      { label: 'Equipment', value: 'Excavators, loaders, graders, rollers' },
      { label: 'Product group', value: 'Construction machinery' },
      { label: 'Specification', value: 'Manufacturer datasheet' },
      { label: 'Condition', value: 'New or used, on request' },
      { label: 'Order size', value: 'Single units or fleets' },
    ],
    details: [
      { title: 'Equipment selection', text: 'Capacity, attachments and operating conditions are reviewed against what the project actually needs.' },
      { title: 'Condition & inspection', text: 'For used equipment, inspection reports and service history are requested and shared before a decision.' },
      { title: 'Transport & delivery', text: 'Oversized cargo is planned in advance: loading, route and unloading at the destination.' },
    ],
    quoteType: 'import',
  },
  {
    slug: 'solar-panel-imports',
    icon: 'solar',
    category: 'Energy',
    name: 'Solar Panels & Equipment',
    summary: 'Solar equipment and clean-energy solutions.',
    intro:
      'We follow up on the supply of solar panels and related equipment for clean-energy projects. Send us the capacity you are planning and the destination, and we will review the options that can be supplied.',
    specs: [
      { label: 'Product type', value: 'Solar panels & accessories' },
      { label: 'Product group', value: 'Clean-energy equipment' },
      { label: 'Specification', value: 'Manufacturer datasheet' },
      { label: 'Packaging / unit', value: 'Pallet or container' },
      { label: 'Minimum order', value: 'On request' },
    ],
    details: [
      { title: 'Technical datasheets', text: 'Power rating, efficiency and dimensions are confirmed against the manufacturer’s datasheet before ordering.' },
      { title: 'Packing & transport', text: 'Panels ship on pallets inside containers, and handling is planned to prevent damage in transit.' },
      { title: 'Project support', text: 'Mounting systems, cabling and other balance-of-system items can be sourced together with the panels.' },
    ],
    quoteType: 'import',
  },
  {
    slug: 'logistics-transportation',
    icon: 'truck',
    category: 'Logistics',
    name: 'Logistics & Transport Coordination',
    summary: 'Transport solutions that support the movement of goods.',
    intro:
      'We coordinate transport solutions and support the movement of goods between markets. Tell us what you ship, where from and where to, and we will review the routes and the paperwork behind them.',
    specs: [
      { label: 'Service', value: 'Sea, road, multimodal' },
      { label: 'Service group', value: 'Logistics' },
      { label: 'Shipping terms', value: 'Incoterms as agreed' },
      { label: 'Unit', value: 'Per shipment' },
      { label: 'Minimum order', value: 'None' },
    ],
    details: [
      { title: 'Route planning', text: 'Routes and transport modes are compared by transit time, cost and the nature of the goods.' },
      { title: 'Documentation & customs', text: 'Shipping documents are prepared and customs steps coordinated with the parties involved.' },
      { title: 'Tracking & follow-up', text: 'One contact follows the shipment and keeps you informed until it is delivered.' },
    ],
    quoteType: 'partnership',
  },
  {
    slug: 'heavy-machinery-parts',
    icon: 'parts',
    category: 'Machinery & Parts',
    name: 'Machinery Spare Parts & Components',
    summary: 'Spare parts and technical components for machinery and equipment.',
    intro:
      'We source spare parts and technical components for machinery and equipment. A part number, or the machine model and serial number, is usually enough for us to start matching the right component.',
    specs: [
      { label: 'Parts', value: 'Filters, hydraulics, undercarriage' },
      { label: 'Product group', value: 'Machinery parts' },
      { label: 'Quality', value: 'OEM or equivalent' },
      { label: 'Unit', value: 'Per part or kit' },
      { label: 'Order size', value: 'Single parts or stock' },
    ],
    details: [
      { title: 'Part identification', text: 'Part numbers, or the machine model and serial number, help us match the correct component.' },
      { title: 'Quality options', text: 'OEM and equivalent options are compared on request so you can choose by quality and budget.' },
      { title: 'Consolidated delivery', text: 'Several parts can be shipped together to reduce handling and freight cost.' },
    ],
    quoteType: 'supply',
  },
];

export const productPage = {
  crumbs: { home: 'Home', products: 'Products' },
  breadcrumb: 'Breadcrumb',
  gallery: 'Product pictures',
  pictureOf: 'Picture {i} of {n}',
  quote: 'Request a Quote',
  ask: 'Ask a Question',
  introLabel: 'Product Overview',
  facts: [
    { icon: 'clipboard', title: 'Request-based offers', text: 'Every offer is prepared for your request, not copied from a list.' },
    { icon: 'ship', title: 'Flexible shipping terms', text: 'FOB, CIF or EXW options are discussed per order.' },
    { icon: 'file', title: 'Clear documentation', text: 'Invoice, packing list and certificates are prepared per order.' },
    { icon: 'headset', title: 'One point of contact', text: 'A single contact follows your request from start to delivery.' },
  ],
  specsTitle: 'Specifications & Features',
  specsText:
    'Technical information should come with units, a reference standard and a clear range, so buyers can compare and decide. The points below show how we handle it for this product.',
  howTitle: 'How a Request Works',
  howText: 'Four clear steps from your first message to follow-up after delivery.',
  steps: [
    { title: 'Send your request', text: 'Tell us the product, quantity, destination and timeline.' },
    { title: 'Review & matching', text: 'We review the details and match them with suitable options.' },
    { title: 'Proposal', text: 'You receive a clear offer with the terms and next steps.' },
    { title: 'Follow-up', text: 'We follow the order through delivery and stay in touch afterwards.' },
  ],
  quoteTitle: (name: string) => `Request a quote for ${name}`,
  quoteText: 'Send us a few details and we will review your request and get back to you as soon as possible.',
  include: [
    'The product or specification you need',
    'Quantity and preferred packaging',
    'Destination country or port',
    'Preferred shipping terms and timeline',
  ],
  relatedTitle: 'Other Areas of Activity',
  viewDetails: 'View details',
  faqTitle: 'Frequently Asked Questions',
};
