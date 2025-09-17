import { Facebook, Instagram, Twitter, Heart } from 'lucide-react';
import logoImage from '@/assets/logo.png';

const Footer = () => {
  const footerLinks = {
    Shop: ['Natural Crystals', 'Healing Crystals', 'Crystal Kits', 'Bracelets'],
    About: ['Our Story', 'Mission', 'Core Values', 'Blog'],
    Support: ['Contact Us', 'Shipping Info', 'Returns', 'FAQ'],
  };

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
  ];

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logoImage} 
                alt="Adhyatma Logo" 
                className="w-8 h-8 object-contain" 
              />
              <span className="text-xl font-lobster font-normal bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                Adhyatma
              </span>
            </div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Sacred stones for modern souls. Ethically sourced crystals for healing, 
              mindfulness, and spiritual growth.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-300"
                >
                  <social.icon className="w-4 h-4 text-gray-600" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-gray-800 text-sm">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-gray-800 transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2035 by Vesii. Build on Wix Studio</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-800">Terms & Conditions</a>
              <a href="#" className="hover:text-gray-800">Privacy Policy</a>
              <a href="#" className="hover:text-gray-800">Shipping Policy</a>
              <a href="#" className="hover:text-gray-800">Refund Policy</a>
              <a href="#" className="hover:text-gray-800">FAQ</a>
              <a href="#" className="hover:text-gray-800">Accessibility Statement</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;