import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 9395913538',
      description: 'Mon-Fri 9AM-6PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'Info@mysite.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Crystal Street, Melbourne VIC 3000',
      description: 'Visit our showroom'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 9AM-6PM',
      description: 'Sat: 10AM-4PM, Sun: Closed'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-lobster font-normal mb-4 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 font-lobster">
            We're here to help you on your crystal journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactDetails.map((contact, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <contact.icon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-lobster text-gray-800 mb-2">
                {contact.title}
              </h3>
              <p className="text-gray-700 font-lobster mb-1">
                {contact.details}
              </p>
              <p className="text-sm text-gray-600">
                {contact.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-lobster text-gray-800 mb-4">
              Have a Question?
            </h3>
            <p className="text-gray-600 mb-6">
              Our crystal experts are here to help you find the perfect stones for your needs. 
              Whether you're new to crystals or a seasoned collector, we're happy to guide you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+919395913538" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300 rounded-none font-lobster"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
              <a 
                href="mailto:Info@mysite.com" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-300 rounded-none font-lobster"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
