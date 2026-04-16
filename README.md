# Tam Mai Portfolio

Personal portfolio website showcasing my work as a Business Analytics student and aspiring Analytics Engineer.

## 🚀 Quick Start

### Before You Deploy:

1. **Add your photo**: Place your professional photo as `profile-photo.jpg` in the `public/` folder
2. **Update your links**: Open `src/Portfolio.jsx` and update the `LINKS` object (around line 68):
   ```javascript
   const LINKS = {
     email: 'mailto:your.email@usf.edu',
     resume: '/resume.pdf',
     linkedin: 'https://linkedin.com/in/yourprofile',
     github: 'https://github.com/yourusername'
   };
   ```
3. **Add your resume**: Place your resume PDF as `resume.pdf` in the `public/` folder

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 File Structure

```
portfolio/
├── public/
│   ├── profile-photo.jpg    ← Add your photo here
│   └── resume.pdf           ← Add your resume here
├── src/
│   ├── Portfolio.jsx        ← Main component (update LINKS here)
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🌐 Deployment

This project is configured to deploy easily to Vercel. See deployment guide below.

## 🛠️ Built With

- React
- Vite
- Tailwind CSS
- Lucide React (icons)
