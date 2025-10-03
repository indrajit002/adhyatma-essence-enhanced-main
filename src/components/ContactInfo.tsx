import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 93959-13538',
      description: 'Mon-Fri 9AM-6PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'adhyatmastore1@gmail.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'Bongaigaon, Assam, India',
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cormorant-light mb-4 bg-gradient-to-r from-[#8a6b8d] via-[#a085a3] to-[#8a6b8d] bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-madefor-medium px-4">
            We're here to help you on your crystal journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {contactDetails.map((contact, index) => (
            <div key={index} className="text-center p-4 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <contact.icon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-base md:text-lg font-cormorant-light text-gray-800 mb-2">
                {contact.title}
              </h3>
              <p className="text-sm md:text-base text-gray-700 font-madefor-medium mb-1">
                {contact.details}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                {contact.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm max-w-2xl mx-auto border border-gray-200">
            <h3 className="text-xl md:text-2xl font-cormorant-light text-gray-800 mb-4">
              Have a Question?
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6 px-4">
              Our crystal experts are here to help you find the perfect stones for your needs. 
              Whether you're new to crystals or a seasoned collector, we're happy to guide you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              {/* <a  */}
                {/* href="tel:+919395913538"  */}
                {/* className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300 rounded-none font-arial" */}
              {/* > */}
                {/* <Phone className="w-4 h-4 mr-2" //> */}
                {/* Call Now */}
              {/* </a> */}
              <a 
                href="mailto:adhyatmastore1@gmail.com" 
                className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-300 rounded-none font-arial text-sm md:text-base"
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
