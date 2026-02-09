// Placeholder Image Generator for Vintage Camera Store
// This script creates simple SVG placeholder images for testing

const fs = require('fs');
const path = require('path');

// List of required images
const images = [
    'hero-1.jpg', 'hero-2.jpg', 'cameras-hero.jpg', 'lenses-hero.jpg',
    'services-hero.jpg', 'story-hero.jpg', 'gallery-hero.jpg', 'contact-hero.jpg',
    'camera-1.jpg', 'camera-2.jpg', 'camera-3.jpg', 'camera-4.jpg',
    'film-camera-1.jpg', 'film-camera-2.jpg', 'film-camera-3.jpg', 'film-camera-4.jpg',
    'collector-1.jpg', 'collector-2.jpg', 'collector-3.jpg', 'collector-4.jpg',
    'bestseller-1.jpg', 'bestseller-2.jpg', 'bestseller-3.jpg', 'bestseller-4.jpg',
    'lens-1.jpg', 'lens-2.jpg', 'lens-3.jpg', 'lens-4.jpg',
    'wide-1.jpg', 'wide-2.jpg', 'wide-3.jpg', 'wide-4.jpg',
    'portrait-1.jpg', 'portrait-2.jpg', 'portrait-3.jpg', 'portrait-4.jpg',
    'telephoto-1.jpg', 'telephoto-2.jpg', 'telephoto-3.jpg', 'telephoto-4.jpg',
    'specialty-1.jpg', 'specialty-2.jpg', 'specialty-3.jpg', 'specialty-4.jpg',
    'repair-1.jpg', 'repair-2.jpg', 'repair-3.jpg',
    'restoration-1.jpg', 'restoration-2.jpg', 'restoration-3.jpg',
    'rental-1.jpg', 'rental-2.jpg', 'rental-3.jpg',
    'appraisal-1.jpg', 'appraisal-2.jpg', 'appraisal-3.jpg',
    'consultation-1.jpg', 'consultation-2.jpg', 'consultation-3.jpg',
    'leica-brand.jpg', 'canon-brand.jpg', 'nikon-brand.jpg', 'olympus-brand.jpg',
    'heritage-1.jpg', 'heritage-2.jpg', 'heritage-3.jpg', 'heritage-4.jpg',
    'street-photography.jpg', 'portrait-photography.jpg', 'landscape-photography.jpg', 'documentary-photography.jpg',
    'expert-pick-1.jpg', 'expert-pick-2.jpg', 'expert-pick-3.jpg',
    'film-photography-guide.jpg', 'camera-maintenance.jpg', 'photography-workshops.jpg',
    'gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg',
    'gallery-5.jpg', 'gallery-6.jpg', 'gallery-7.jpg', 'gallery-8.jpg',
    'team-1.jpg', 'team-2.jpg', 'team-3.jpg', 'team-4.jpg',
    'workshop.jpg', 'community.jpg', 'map-placeholder.jpg',
    'vintage-cameras.jpg', 'vintage-lenses.jpg', 'collector-editions.jpg', 'camera-accessories.jpg',
    'featured-cameras.jpg', 'canon-ae1.jpg', 'leica-m3.jpg', 'nikon-f2.jpg',
    'olympus-om1.jpg', 'canon-fd-50mm.jpg', 'zeiss-50mm.jpg', 'nikon-fm2.jpg'
];

// Create SVG placeholder
function createSVGPlaceholder(filename, width = 600, height = 400) {
    const colors = [
        '#5A3E2B', '#B08D57', '#F6F2ED', '#2B2B2B', '#6B6B6B'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="${color}"/>
    <text x="${width/2}" y="${height/2}" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle">
        ${filename.replace('.jpg', '').replace(/-/g, ' ').toUpperCase()}
    </text>
    <text x="${width/2}" y="${height/2 + 20}" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">
        ${width} x ${height}
    </text>
</svg>`;
    
    return svg;
}

// Create placeholder images
const imagesDir = path.join(__dirname, 'assets', 'images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

images.forEach(image => {
    const svgContent = createSVGPlaceholder(image);
    const filename = image.replace('.jpg', '.svg');
    const filepath = path.join(imagesDir, filename);
    
    fs.writeFileSync(filepath, svgContent);
    console.log(`Created placeholder: ${filename}`);
});

console.log('All placeholder images created successfully!');
console.log('Note: These are SVG placeholders. Replace with actual JPG images for production.');
