# Mitasha Mehta - Portfolio Website

A professional single-page portfolio website for Mitasha Mehta, an advertising creative. This portfolio is structured like a creative brief, showcasing work through strategic thinking rather than just visual output.

## 🎨 Design Philosophy

This website follows the structure of a creative brief, with each section answering clear questions:
- **Who am I?** (Hero)
- **How did I get here?** (About)
- **What have I done?** (Work)
- **How can we connect?** (Contact)

## 🚀 Features

- **Single Page Application** - Smooth scrolling experience
- **GSAP Animations** - Professional scroll-triggered animations
- **Custom Cursor** - Interactive cursor that responds to elements
- **Responsive Design** - Works beautifully on all devices
- **Project Modals** - Each project presented as a creative brief
- **Mobile Navigation** - Hamburger menu for mobile devices
- **Performance Optimized** - Fast loading and smooth interactions

## 📁 File Structure
```
mitasha-portfolio/
│
├── index.html              # Main HTML file
│
├── css/
│   ├── style.css          # Main styles
│   ├── animation.css      # Animation styles
│   └── responsive.css     # Media queries
│
├── js/
│   ├── cursor.js          # Custom cursor
│   ├── scroll.js          # Scroll animations
│   └── main.js            # Core functionality
│
├── assets/
│   ├── images/
│   │   └── projects/      # Project images
│   └── icons/
│
└── README.md              # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Modern JavaScript
- **GSAP 3.12** - Animation library
- **ScrollTrigger** - Scroll-based animations
- **Google Fonts** - Space Grotesk & Inter
## 📦 Installation & Setup

### 1. Clone or Download
Download this project to your local machine.

### 2. Open in Browser
Simply open `index.html` in your browser. No build process required!

### 3. For Development
If you want to use a local server (recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 🎯 Customization Guide

### Adding Your Projects

1. **Replace Project Images**
   - Add your images to `assets/images/projects/`
   - Name them: `project-1.jpg`, `project-2.jpg`, etc.

2. **Update Project Data**
   - Open `js/main.js`
   - Find the `projectData` object (around line 50)
   - Update the content for each project:
     - title
     - objective
     - problem
     - audience
     - insight
     - idea
     - execution

3. **Add More Projects**
   - In `index.html`, duplicate a project card
   - Change `data-project="X"` to next number
   - Add corresponding data in `main.js`

### Changing Colors

Open `css/style.css` and modify the CSS variables:
```css
:root {
    --primary: #2C666E;      /* Main brand color */
    --secondary: #B7C4C2;    /* Secondary color */
    --accent: #D4A574;       /* Accent color */
    --bg-primary: #F7F5F2;   /* Background */
    --text-primary: #333333; /* Main text */
}
```

### Updating Contact Information

In `index.html`, find the Contact Section and update:
- Email address
- LinkedIn URL
- Resume file path

### Modifying Typography

Change fonts in `css/style.css`:
```css
:root {
    --font-display: 'Your Display Font', sans-serif;
    --font-body: 'Your Body Font', sans-serif;
}
```

Don't forget to update the Google Fonts link in `index.html`.

## 📱 Responsive Breakpoints

- **Desktop**: 1400px+
- **Laptop**: 1200px - 1399px
- **Tablet Landscape**: 1024px - 1199px
- **Tablet Portrait**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## ⚡ Performance Tips

1. **Optimize Images**
   - Use WebP format when possible
   - Compress images (keep under 200KB)
   - Recommended size: 1920px × 1280px

2. **Lazy Loading**
   - Images load as you scroll
   - Already implemented in the code

3. **Minimize External Resources**
   - Only GSAP library is loaded externally
   - Fonts are loaded from Google Fonts CDN

## 🎨 Animation Control

### Adjust Animation Speed
In `css/style.css`:
```css
:root {
    --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Disable Animations
For accessibility or preference, animations respect `prefers-reduced-motion`.

## 🐛 Troubleshooting

### Animations Not Working
- Check browser console for errors
- Ensure GSAP CDN is loading
- Clear browser cache

### Images Not Showing
- Check file paths in `index.html`
- Ensure images are in `assets/images/projects/`
- Check image file extensions match HTML

### Mobile Menu Not Working
- Check that `main.js` is loading
- Open browser console for errors
- Try clearing cache

### Custom Cursor Issues
- Cursor is hidden on touch devices (intended)
- Check `cursor.js` is loading
- Only works on devices with mouse/trackpad

## 🌐 Browser Support

- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Opera (76+)

## 📄 License

This project is free to use for personal portfolios.

## 🙏 Credits

- **Fonts**: [Google Fonts](https://fonts.google.com)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Design Inspiration**: follow.art
- **Built for**: Mitasha Mehta

## 📧 Support

For questions or issues:
- Check browser console for errors
- Verify all files are in correct folders
- Ensure file paths are correct

## 🚀 Deployment

### GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Go to Settings > Pages
4. Select main branch
5. Your site will be live at `username.github.io/repo-name`

### Netlify
1. Drag & drop your folder to [Netlify Drop](https://app.netlify.com/drop)
2. Your site is live instantly!

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project folder
3. Follow prompts

## 📝 To-Do / Future Enhancements

- [ ] Add more project case studies
- [ ] Replace placeholder images
- [ ] Add resume PDF
- [ ] Test on all browsers
- [ ] Add Google Analytics (optional)
- [ ] Add contact form functionality
- [ ] Add meta tags for social sharing
- [ ] Add favicon

## 🎉 You're All Set!

Your portfolio is ready to go. Just add your content and deploy!

**Good luck with your creative journey!** 🚀

---

**Built with intention. Designed with care.**