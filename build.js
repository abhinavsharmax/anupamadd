const fs = require('fs');
const path = require('path');

// Read config
const configPath = path.join(__dirname, 'wedding-data.json');
const weddingData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Read HTML template
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Extract data
const groomFirst = weddingData.couple.groom.name.split(' ')[0];
const brideFirst = weddingData.couple.bride.name.split(' ')[0];
const date = weddingData.wedding.displayDate;
const inviteText = weddingData.messages.inviteText;

// 1. Update Title
const title = `${groomFirst} Weds ${brideFirst} | A Royal Wedding Invite`;
html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

// 2. Update Meta Description
const desc = `Join us in celebrating the royal wedding of ${groomFirst} & ${brideFirst} on ${date}. Save the date for our special day!`;
html = html.replace(
    /<meta name="description"\s+content="[^"]*">/,
    `<meta name="description" content="${desc}">`
);

// 3. Update OG Tags
// Helper to replace content of a meta tag
function replaceMeta(property, content) {
    const regex = new RegExp(`<meta property="${property}" content="[^"]*"`, 'g');
    html = html.replace(regex, `<meta property="${property}" content="${content}"`);
}

function replaceNameMeta(name, content) {
    const regex = new RegExp(`<meta name="${name}" content="[^"]*"`, 'g');
    html = html.replace(regex, `<meta name="${name}" content="${content}"`);
}

const websiteUrl = weddingData.websiteUrl || 'https://anupmaavanish.netlify.app';
const imageUrl = `${websiteUrl.replace(/\/$/, '')}/assets/images/social-share.jpg`;

replaceMeta('og:url', websiteUrl);
replaceMeta('og:title', `${groomFirst} Weds ${brideFirst} | Royal Wedding Invitation`);
replaceMeta('og:description', `${inviteText} Join us on ${date}.`);
replaceMeta('og:image', imageUrl);
replaceMeta('og:image:alt', `${groomFirst} & ${brideFirst} Wedding Invitation`);
replaceMeta('og:site_name', `${groomFirst} & ${brideFirst} Wedding`);

replaceNameMeta('twitter:url', websiteUrl);
replaceNameMeta('twitter:title', `${groomFirst} Weds ${brideFirst} | Royal Wedding Invitation`);
replaceNameMeta('twitter:description', `Join us in celebrating our special day on ${date}. Save the date!`);
replaceNameMeta('twitter:image', imageUrl);

// 4. Clear Static Text (FOUC Prevention) - But keep structure for JS to fill
// We replace the inner text of specific elements with empty string, 
// but ONLY if they are placeholder values we want to hide.
// Actually, for SEO it is better to have values, but user specifically asked to remove them
// to avoid "static data shows especially in the bride and groom name".

// We will empty these specific text nodes in the HTML strings.
// Note: This regex approach is simple and assumes standard formatting from the file view.

// Groom Name
html = html.replace(/<h1 class="groom-name">.*?<\/h1>/, '<h1 class="groom-name"></h1>');
// Bride Name
html = html.replace(/<h1 class="bride-name">.*?<\/h1>/, '<h1 class="bride-name"></h1>');
// Wedding Date
html = html.replace(/<p class="date-text">.*?<\/p>/, '<p class="date-text"></p>');
// Weds Text (Middle) - Keep this as it's static usually, or clear if desired? 
// User said "especially in the bride and groom name". Let's clear names and date.

// Grooms Parents Names
html = html.replace(/<p class="grooms-parents-name">.*?<\/p>/s, '<p class="grooms-parents-name"></p>');
// Brides Parents Names
html = html.replace(/<p class="brides-parents-name">.*?<\/p>/s, '<p class="brides-parents-name"></p>');

// Invite Text
html = html.replace(/<p class="invite-text">.*?<\/p>/s, '<p class="invite-text"></p>');

// Couple Quote
html = html.replace(/<p class="couple-quote">.*?<\/p>/, '<p class="couple-quote"></p>');

// Footer Names
html = html.replace(/<h2 class="end-title">.*?<\/h2>/, '<h2 class="end-title"></h2>');

// Write back
fs.writeFileSync(htmlPath, html);

console.log('Build complete: index.html updated with dynamic data and placeholders cleared.');
