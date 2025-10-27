# GreenGlow Plants

A responsive e-commerce website for a fictional plant shop, built with vanilla HTML, CSS, and JavaScript. This project demonstrates modern front-end development practices without relying on frameworks or libraries.

## Features

- **Landing Page**
  - Attractive hero section with background image
  - Company information and call-to-action button
  - Responsive design for all device sizes

- **Product Listing Page**
  - Display of 6 unique houseplants organized in 3 categories (Indoor Plants, Succulents, Flowering Plants)
  - Add to Cart functionality with localStorage integration
  - Responsive grid layout for different screen sizes

- **Shopping Cart Page**
  - Dynamic cart management (add, remove, increase/decrease quantity)
  - Cart summary with total items and cost
  - Persistent cart data using localStorage
  - Payment method selection (UPI and International payment options)

## Tech Stack

- **HTML5** - Semantic markup for structure
- **CSS3** - Modern styling with:
  - CSS Variables for theming
  - Flexbox for layout
  - CSS Grid for product displays
  - Media queries for responsiveness
  - Transitions for UI interactions
- **JavaScript (ES6+)** - Client-side functionality:
  - DOM manipulation
  - Event handling
  - localStorage for data persistence
  - Array methods for data processing
- **Font Awesome** - Icon library for UI elements
- **Custom SVG** - Hand-crafted plant illustrations

## Project Structure

```
plant-shop/
├── index.html        # Landing page with hero section and intro
├── products.html     # Product listing page with categories and items
├── cart.html         # Shopping cart with payment options
├── style.css         # Global styles and responsive design
├── script.js         # JavaScript functionality for all pages
├── README.md         # Project documentation
└── /images/          # SVG plant illustrations
    ├── plant1.svg    # Monstera plant illustration
    ├── plant2.svg    # Flowering plant illustration
    ├── plant3.svg    # Echeveria succulent illustration
    ├── plant4.svg    # Aloe Vera plant illustration
    ├── plant5.svg    # Orchid plant illustration
    └── plant6.svg    # Anthurium plant illustration
```

## Code Architecture

- **HTML Structure**: Semantic HTML5 with proper accessibility attributes
- **CSS Organization**: 
  - Global variables for consistent theming
  - Component-based styling (header, products, cart items)
  - Mobile-first responsive design
- **JavaScript Architecture**:
  - Data-driven product rendering
  - Event delegation for efficient event handling
  - Modular functions for cart operations
  - Persistent storage with localStorage

## Payment Integration

The cart includes two payment method categories:
1. **UPI Options**:
   - Google Pay
   - PhonePe
   - Paytm
   - Custom UPI ID

2. **International Payment Methods**:
   - Visa
   - Mastercard
   - American Express
   - PayPal

## How to Run Locally

1. Clone or download this repository
2. Navigate to the project directory
3. Start a local server:
   ```
   # Using Python (Python 3)
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```
4. Open your browser and navigate to `http://localhost:8000`

## Development Guidelines

For new developers working on this project:

1. **Adding New Products**:
   - Add new plant data to the `plantsData` array in `script.js`
   - Create corresponding SVG illustrations in the `/images` folder

2. **Styling Changes**:
   - Update color variables in `:root` in `style.css` for theme changes
   - Follow the existing component structure for new UI elements

3. **Adding New Features**:
   - Maintain the vanilla JS approach (no frameworks)
   - Follow the existing pattern for DOM manipulation and event handling

## Browser Compatibility

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential areas for improvement:
- User authentication system
- Product filtering and search
- Order history tracking
- Admin dashboard for inventory management
- Firefox
- Edge
- Safari