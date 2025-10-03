# Image Preview Components

This directory contains a set of reusable image preview components for the application.

## Components

### 1. ImagePreview (Basic)
**File:** `ImagePreview.tsx`

A simple, lightweight image preview component with different sizes.

**Props:**
- `src: string` - Image URL
- `alt: string` - Alt text for accessibility
- `size?: 'sm' | 'md' | 'lg'` - Size variant (default: 'md')

**Usage:**
```tsx
<ImagePreview src="image.jpg" alt="Product" size="lg" />
```

### 2. ImagePreviewCard (Interactive)
**File:** `ImagePreviewCard.tsx`

An interactive image preview card with hover actions and modal preview.

**Props:**
- `imageUrl: string` - Image URL
- `alt?: string` - Alt text (default: "Image preview")
- `size?: 'sm' | 'md' | 'lg'` - Size variant (default: 'md')
- `onRemove?: () => void` - Callback for remove action
- `showActions?: boolean` - Show hover actions (default: true)
- `className?: string` - Additional CSS classes

**Features:**
- Hover overlay with action buttons
- Preview, copy, download, and remove actions
- Automatic modal preview integration
- No image state handling

**Usage:**
```tsx
<ImagePreviewCard
  imageUrl={product.image_url}
  alt={product.name}
  size="md"
  onRemove={() => removeProduct(product.id)}
  showActions={true}
/>
```

### 3. ImagePreviewModal (Full-Screen)
**File:** `ImagePreviewModal.tsx`

A full-screen modal for detailed image viewing with advanced controls.

**Props:**
- `isOpen: boolean` - Modal visibility state
- `onClose: () => void` - Close callback
- `imageUrl: string` - Image URL
- `onCopyUrl: () => void` - Copy URL callback
- `onDownload: () => void` - Download callback
- `onOpenInNewTab: () => void` - Open in new tab callback
- `isZoomed: boolean` - Zoom state
- `onToggleZoom: () => void` - Toggle zoom callback

**Features:**
- Full-screen image viewing
- Zoom in/out functionality
- Click image to toggle zoom
- Copy URL to clipboard
- Download image
- Open in new tab
- Image information display

**Usage:**
```tsx
<ImagePreviewModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  imageUrl={selectedImage}
  onCopyUrl={() => copyToClipboard(selectedImage)}
  onDownload={() => downloadImage(selectedImage)}
  onOpenInNewTab={() => window.open(selectedImage, '_blank')}
  isZoomed={isZoomed}
  onToggleZoom={() => setIsZoomed(!isZoomed)}
/>
```

## Integration Examples

### In Product Forms
```tsx
const [imageUrl, setImageUrl] = useState('');

return (
  <div>
    {imageUrl ? (
      <ImagePreviewCard
        imageUrl={imageUrl}
        alt="Product preview"
        size="lg"
        onRemove={() => setImageUrl('')}
        showActions={true}
      />
    ) : (
      <UploadDropzone onUploadComplete={(res) => setImageUrl(res[0].url)} />
    )}
  </div>
);
```

### In Product Lists
```tsx
{products.map(product => (
  <div key={product.id} className="product-item">
    <ImagePreviewCard
      imageUrl={product.image_url}
      alt={product.name}
      size="md"
      onRemove={() => deleteProduct(product.id)}
    />
    <h3>{product.name}</h3>
  </div>
))}
```

### With Modal Preview
```tsx
const [showModal, setShowModal] = useState(false);
const [selectedImage, setSelectedImage] = useState('');
const [isZoomed, setIsZoomed] = useState(false);

const handleImageClick = (imageUrl: string) => {
  setSelectedImage(imageUrl);
  setShowModal(true);
};

return (
  <>
    <ImagePreviewCard
      imageUrl={imageUrl}
      onPreview={() => handleImageClick(imageUrl)}
    />
    
    <ImagePreviewModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      imageUrl={selectedImage}
      onCopyUrl={() => navigator.clipboard.writeText(selectedImage)}
      onDownload={() => downloadImage(selectedImage)}
      onOpenInNewTab={() => window.open(selectedImage, '_blank')}
      isZoomed={isZoomed}
      onToggleZoom={() => setIsZoomed(!isZoomed)}
    />
  </>
);
```

## Styling

All components use Tailwind CSS classes and are fully responsive. They integrate seamlessly with the existing design system.

## Accessibility

- Proper alt text support
- Keyboard navigation
- Screen reader friendly
- Focus management in modals

## Browser Support

- Modern browsers with ES6+ support
- Clipboard API support for copy functionality
- File download support
