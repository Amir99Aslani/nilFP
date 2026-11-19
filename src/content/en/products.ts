// English copy translated from the Persian Products frames (drafts: please review).
// Only six areas of activity exist so far (no product detail data). When real products and
// photos arrive, add `image: '/images/products/xxx.jpg'` to an item and the grey placeholder disappears.
export const products = {
  meta: { title: 'Products & Services | NIL FARASOYE PARS', description: 'Our areas of activity: food export, vehicle and machinery imports, solar equipment, logistics and specialized trade services.' },
  hero: {
    title: 'Solutions and Collaboration Opportunities at a Glance',
    text: 'Browse our areas of activity, or submit a request for the product or service you need.',
    quote: 'Request a Quote',
    collab: 'Collaboration Opportunities',
  },
  areas: {
    title: 'Our Areas of Activity',
    search: 'Search areas of activity…',
    empty: 'No area matches your search.',
    showAll: 'Show all',
    showLess: 'Show less',
    request: 'View details',
    categories: [
      { id: 'all', label: 'All Areas' },
      { id: 'food', label: 'Food' },
      { id: 'vehicles', label: 'Vehicles' },
      { id: 'machinery', label: 'Machinery & Parts' },
      { id: 'energy', label: 'Energy' },
      { id: 'logistics', label: 'Logistics' },
    ],
    items: [
      { slug: 'food-products-export', icon: 'food', category: 'food', title: 'Food Products Export', text: 'Developing supply routes for food and agricultural products in target markets.' },
      { slug: 'passenger-car-imports', icon: 'car', category: 'vehicles', title: 'Passenger Car Imports', text: 'Exploring and following up on vehicle sourcing opportunities that fit market demand.' },
      { slug: 'heavy-machinery-road-construction', icon: 'machinery', category: 'machinery', title: 'Heavy Machinery & Road Construction', text: 'Supplying and importing machinery needed for construction and infrastructure projects.' },
      { slug: 'solar-panel-imports', icon: 'solar', category: 'energy', title: 'Solar Panel Imports', text: 'Following up on the supply of solar equipment and clean-energy solutions.' },
      { slug: 'logistics-transportation', icon: 'truck', category: 'logistics', title: 'Logistics & Transportation', text: 'Coordinating transport solutions and supporting the flow of goods.' },
      { slug: 'heavy-machinery-parts', icon: 'parts', category: 'machinery', title: 'Heavy Machinery Parts', text: 'Supplying technical parts and components required by machinery and equipment.' },
    ],
  },
  services: {
    title: 'Specialized Services for Your Business Growth',
    text: 'From planning to execution, a set of specialized services that respond to business needs, ease collaboration and create new opportunities.',
    consult: 'Get a Consultation',
    start: 'Start Collaboration',
    items: [
      { title: 'Identifying and Sourcing Goods', text: 'Registering the need, reviewing specifications and assessing the possibility of sourcing through available trade routes.' },
      { title: 'Coordinating Trade Processes', text: 'Reviewing international buying and selling needs and coordinating the stages of collaboration with the relevant parties.' },
      { title: 'Reviewing Transport Solutions', text: 'Reviewing transport routes and the logistical requirements that fit the type of goods and the destination of the request.' },
    ],
  },
  faqTitle: 'Frequently Asked Questions',
};
