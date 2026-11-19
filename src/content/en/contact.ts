// English copy translated from the Persian Contact frame (drafts: please review).
// Phone and hours differ from the footer in the design: confirm the real ones before launch.
export const contact = {
  meta: { title: 'Contact Us | NIL FARASOYE PARS', description: 'Get in touch with Nil Farasoye Pars: send a business request, or find our phone, working hours and address.' },
  title: 'Contact Us',
  subtitle: 'A professional connection, the start of a business opportunity',
  mapLabel: 'Nil Farasoye Pars',
  cards: [
    { title: 'Phone', text: '05135012345' },
    { title: 'Working Hours', text: 'Saturday to Thursday, 8 am to 5 pm' },
    { title: 'Address', text: 'Mashhad, Iran – Moallem 73, No. 6' },
  ],
  form: {
    title: 'Business Request Form',
    text: 'To start a collaboration with NFP, submit your details in the form below and your request will be reviewed as soon as possible.',
    fields: {
      name: { label: 'Full Name', placeholder: 'Your name' },
      type: { label: 'Request Type', placeholder: 'Select' },
      email: { label: 'Email', placeholder: 'name@company.com' },
      phone: { label: 'Phone Number', placeholder: 'Include the country code' },
      country: { label: 'Country / Destination', placeholder: 'Target destination' },
      company: { label: 'Company Name', placeholder: 'Company or organization' },
      message: { label: 'Request Details', placeholder: 'Write the specifications, needs and details of your request…' },
    },
    types: {
      purchasing: 'Product Purchasing',
      supply: 'Product Supply',
      import: 'Import',
      export: 'Export',
      partnership: 'Business Partnership',
      other: 'Other Inquiries',
    },
    errors: {
      name: 'Please enter your full name.',
      type: 'Please choose a request type.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      contactRequired: 'Please give an email or a phone number so we can reply.',
      message: 'Please keep the details under 2000 characters.',
    },
    submit: 'Send Request',
    sending: 'Sending…',
    success: 'Thank you. Your request has been sent, and we will get back to you as soon as possible.',
    error: 'Something went wrong. Please try again in a moment.',
  },
  faqTitle: 'Frequently Asked Questions',
};
