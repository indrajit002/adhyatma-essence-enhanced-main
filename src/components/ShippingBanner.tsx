import { Truck, Shield, RotateCcw, Headphones } from 'lucide-react';

const ShippingBanner = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Standard Delivery',
      description: 'India wide on orders over ₹500',
      highlight: true
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure checkout process',
      highlight: false
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return policy',
      highlight: false
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Always here to help',
      highlight: false
    }
  ];

  return (
    <section className="py-12 bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`flex items-center space-x-4 ${feature.highlight ? 'bg-green-50 p-4 rounded-lg border border-green-200' : ''}`}>
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                feature.highlight ? 'bg-green-100' : 'bg-gray-200'
              }`}>
                <feature.icon className={`w-6 h-6 ${
                  feature.highlight ? 'text-green-600' : 'text-gray-600'
                }`} />
              </div>
              <div>
                <h3 className={`font-semibold text-sm ${
                  feature.highlight ? 'text-green-800' : 'text-gray-800'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-xs ${
                  feature.highlight ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShippingBanner;
