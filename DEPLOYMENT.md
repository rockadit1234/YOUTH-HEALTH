# 🚀 Aura Mental Health App - Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy your project:**
   ```bash
   vercel
   ```

4. **Your app will be live at:** `https://your-project-name.vercel.app`

### Option 2: Railway (Full-Stack)

1. **Go to:** [railway.app](https://railway.app)
2. **Connect your GitHub repository**
3. **Set environment variable:** `GEMINI_API_KEY=your_api_key`
4. **Deploy automatically**

### Option 3: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod --dir=build
   ```

### Option 4: Heroku

1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variable:**
   ```bash
   heroku config:set GEMINI_API_KEY=your_api_key
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

## Environment Variables

Make sure to set these environment variables in your deployment platform:

- `GEMINI_API_KEY`: Your Gemini API key
- `PORT`: Server port (usually set automatically)

## Local Testing

To test your production build locally:

```bash
npm run build
npm run start:prod
```

Your app will be available at `http://localhost:5000`

## Important Notes

- ✅ Your project is already configured for production
- ✅ CORS is enabled for all origins
- ✅ Static files are served correctly
- ✅ API routes are properly configured
- ✅ Environment variables are set up

## Troubleshooting

If you encounter issues:

1. **Check environment variables** are set correctly
2. **Verify API key** is valid and has proper permissions
3. **Check CORS settings** if frontend can't connect to backend
4. **Ensure all dependencies** are installed

## Support

For deployment issues, check:
- Platform-specific documentation
- Environment variable configuration
- Network connectivity
- API key permissions
