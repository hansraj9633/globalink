# Global Ink - News Website

A modern, responsive news website built with HTML, CSS, JavaScript, and Alpine.js.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful design with smooth animations and transitions
- **Interactive Components**: 
  - News carousel with auto-slide functionality
  - Dark mode toggle
  - Language switcher (English/Hindi)
  - Text size controls
  - Search functionality
  - Back to top button
- **Category Pages**: Dedicated pages for different news categories
- **Alpine.js Integration**: Reactive components and smooth interactions

## 📁 File Structure

```
├── index.html          # Homepage with news carousel and featured articles
├── international.html  # International news category page
├── national.html       # National news category page
├── sports.html         # Sports news category page
├── styles.css          # Custom CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🔧 Corrections Made

### 1. **Alpine.js CDN URL Fix**
- **Before**: `https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js`
- **After**: `https://cdn.jsdelivr.net/npm/alpinejs@3.13.0/dist/cdn.min.js`
- **Issue**: Wildcard version could cause compatibility issues
- **Fix**: Updated to stable version 3.13.0

### 2. **JavaScript Syntax Error Fix**
- **Before**: `script.js: document.addEventListener('alpine:init', () => {`
- **After**: `document.addEventListener('alpine:init', () => {`
- **Issue**: Incorrect syntax with file name prefix
- **Fix**: Removed the file name prefix

### 3. **Enhanced JavaScript Functionality**
- Added proper event listener initialization for back-to-top button
- Added auto-slide carousel functionality
- Added search functionality
- Improved error handling

### 4. **Complete Footer Content**
- Added full footer content to all category pages
- Included proper links and social media icons
- Added newsletter subscription form

### 5. **Improved CSS Organization**
- Better organized CSS with clear sections
- Added comments for better maintainability
- Consistent color scheme throughout

## 🎨 Color Scheme

- **Primary**: `#386641` (Forest Green)
- **Secondary**: `#F97A00` (Orange)
- **Accent**: `#FED16A` (Light Yellow)
- **Background**: `#FFF4A4` (Light Cream)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Tailwind CSS**: Utility-first CSS framework
- **Alpine.js**: Lightweight JavaScript framework
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins font family

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Navigate** through different pages using the navigation menu
4. **Test** the interactive features like dark mode, search, and carousel

## 📱 Responsive Features

- **Mobile-first** design approach
- **Hamburger menu** for mobile devices
- **Flexible grid** layouts that adapt to screen size
- **Touch-friendly** buttons and interactions

## 🔍 Interactive Features

### Homepage
- Auto-sliding news carousel
- Category dropdown menu
- Dark mode toggle
- Language switcher
- Text size controls
- Live clock and date display

### Category Pages
- Search functionality
- News cards with hover effects
- Back to home navigation
- Complete footer with links

### Global Features
- Back to top button
- Smooth scrolling
- Hover animations
- Loading states

## 🎯 Future Enhancements

- [ ] Add more category pages (Technology, Business, etc.)
- [ ] Implement actual news API integration
- [ ] Add user authentication system
- [ ] Create article detail pages
- [ ] Add comment system
- [ ] Implement newsletter functionality
- [ ] Add admin panel for content management

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Improving documentation
- Adding new category pages

---

**Note**: This is a static website template. To make it a fully functional news website, you'll need to integrate with a backend service and news API.
