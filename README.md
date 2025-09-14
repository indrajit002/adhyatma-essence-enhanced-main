# Adhyatma Crystal Store

A modern, responsive e-commerce website for a premium crystal store specializing in ethically sourced, energetically charged crystals for healing, mindfulness, and spiritual growth.

## 🌟 Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, elegant design with smooth animations
- **Product Showcase**: Featured products, categories, and detailed product pages
- **Shopping Cart**: Full cart functionality with add/remove items
- **Payment Integration**: Multiple payment methods including Stripe, UPI, PhonePe, Paytm
- **SEO Optimized**: Comprehensive SEO with meta tags, structured data, and performance optimization
- **Accessibility**: WCAG compliant with proper semantic HTML
- **Performance**: Optimized for Core Web Vitals and fast loading times

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Payment**: Stripe, UPI, PhonePe, Paytm integration
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Animations**: Tailwind CSS animations and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/adhyatma-crystal-store.git
cd adhyatma-crystal-store
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── HeroSection.tsx # Landing hero section
│   ├── ProductCard.tsx # Product display component
│   └── ...
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── assets/             # Static assets (images, etc.)
└── main.tsx           # Application entry point
```

## 🎨 Design System

The project uses a carefully crafted design system with:
- **Color Palette**: Soft lavender and blush tones for a calming, spiritual feel
- **Typography**: Playfair Display for headings, Inter for body text
- **Spacing**: Consistent spacing scale using Tailwind CSS
- **Components**: Reusable UI components built with shadcn/ui

## 🔍 SEO Features

- **Meta Tags**: Comprehensive meta tags for search engines
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD schema markup for rich snippets
- **Performance**: Optimized images, lazy loading, and code splitting
- **Accessibility**: Semantic HTML and ARIA labels

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

The project is configured for easy deployment to various platforms:

### Vercel
```bash
npm run build
# Deploy the dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist folder to Netlify
```

### Custom Server
```bash
npm run build
# Serve the dist folder with your preferred server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Website**: https://www.adhyatma.store
- **Email**: Info@mysite.com
- **Phone**: +91 9395913538

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Icons by [Lucide](https://lucide.dev/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Images from Unsplash and other free sources
