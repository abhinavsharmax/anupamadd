# Social Media Share Setup

## Meta Tags Implementation ✅

Your wedding website now has comprehensive social media meta tags for beautiful share previews on:
- **WhatsApp** ✓
- **Facebook** ✓
- **Twitter/X** ✓
- **LinkedIn** ✓
- **iMessage** ✓
- **Telegram** ✓

## What's Included

### 1. **Open Graph Tags** (Facebook, WhatsApp, LinkedIn)
- Title, description, and image
- Optimized for 1200x630px images
- Automatic updates from `wedding-data.json`

### 2. **Twitter Cards**
- Large image card format
- Separate title and description
- Dynamic content from JSON

### 3. **SEO Meta Tags**
- Page description
- Keywords
- Author information

## 📸 Social Share Image Setup

### Required Image
Create a social share image at:
```
assets/images/social-share.jpg
```

### Recommended Specifications:
- **Dimensions**: 1200 x 630 pixels (Facebook/WhatsApp standard)
- **Format**: JPG or PNG
- **File Size**: Under 1MB
- **Content**: Include couple names, wedding date, and a beautiful photo

### Design Tips:
1. **Text should be readable** - Use large, clear fonts
2. **Center important info** - Some platforms crop edges
3. **High contrast** - Ensure text stands out from background
4. **Include**:
   - Couple names
   - Wedding date
   - Beautiful couple photo or palace image
   - Optional: Hashtag

### Tools to Create:
- **Canva** (easiest): Use "Facebook Post" template (1200x630)
- **Figma**: Create custom design
- **Photoshop**: Professional editing

## 🔧 Configuration

### Update Your Website URL
In `index.html`, replace `https://yourwebsite.com/` with your actual domain:

```html
<meta property="og:url" content="https://yourwebsite.com/">
<meta property="og:image" content="https://yourwebsite.com/assets/images/social-share.jpg">
```

### Dynamic Updates
The following meta tags are **automatically updated** from `wedding-data.json`:
- Page title (couple names)
- Description (invite message + date)
- Keywords (couple names)
- All social media titles and descriptions

## 🧪 Testing Your Share Preview

### WhatsApp
1. Share your website link in a chat
2. Preview should appear automatically

### Facebook
Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/):
1. Enter your URL
2. Click "Debug"
3. Click "Scrape Again" to refresh cache

### Twitter
Use the [Twitter Card Validator](https://cards-dev.twitter.com/validator):
1. Enter your URL
2. Preview will show

### LinkedIn
Use the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/):
1. Enter your URL
2. Check preview

## 📱 Additional Features

### Favicon
Add these files to `assets/images/`:
- `favicon.png` (32x32 or 64x64)
- `apple-touch-icon.png` (180x180)

### Theme Color
The mobile browser theme color is set to `#1a0f0f` (dark maroon) to match your design.

## ✨ Result

When someone shares your wedding website link, they'll see:
- **Beautiful preview card** with your couple photo
- **Couple names** as the title
- **Wedding date and invitation message** as description
- **Professional, elegant presentation**

This makes sharing your wedding invitation much more engaging and increases the likelihood that guests will click through!
