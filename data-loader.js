// Data loader - fetches wedding configuration
let weddingData = null;

async function loadWeddingData() {
    try {
        const response = await fetch('wedding-data.json');
        weddingData = await response.json();
        return weddingData;
    } catch (error) {
        console.error('Failed to load wedding data:', error);
        return null;
    }
}

// Initialize data and populate the page
async function initializePage() {
    await loadWeddingData();

    if (!weddingData) {
        console.error('Wedding data not loaded');
        return;
    }

    populatePageContent();
}

function populatePageContent() {
    const { couple, wedding, celebrations, contact, messages } = weddingData;

    // Hero section
    document.querySelector('.groom-name').textContent = couple.groom.name;
    document.querySelector('.bride-name').textContent = couple.bride.name;
    document.querySelector('.date-text').textContent = wedding.displayDate;

    // Invite section
    document.querySelector('.invite-text').textContent = messages.inviteText;

    // Groom's parents
    document.querySelector('.grooms-parents-name').innerHTML =
        `${couple.groom.parents.mother}<br>&<br>${couple.groom.parents.father}`;

    // Bride's parents
    document.querySelector('.brides-parents-name').innerHTML =
        `${couple.bride.parents.mother}<br>&<br>${couple.bride.parents.father}`;

    // Bride & Groom title in invite
    document.querySelector('.bride-groom-title').innerHTML =
        `${couple.groom.name}<br>&<br>${couple.bride.name}`;

    // Events/Celebrations
    const cardsGrid = document.querySelector('.cards-grid');
    cardsGrid.innerHTML = ''; // Clear existing

    celebrations.forEach(event => {
        const card = document.createElement('div');
        card.className = `event-card${event.highlight ? ' highlight-card' : ''}`;
        card.innerHTML = `
      <div class="card-inner">
        <h3>${event.name}</h3>
        <p class="date">${event.date}</p>
        <p class="time">${event.time}</p>
        <p class="venue">${event.venue}</p>
      </div>
    `;
        cardsGrid.appendChild(card);
    });

    // Route/Map button
    document.querySelector('.btn-primary[href="#"]').href = wedding.venue.googleMapsUrl;

    // Couple quote
    document.querySelector('.couple-quote').textContent = messages.coupleQuote;

    // Footer
    document.querySelector('.end-title').textContent = `${couple.groom.name} & ${couple.bride.name}`;
    document.querySelector('.footer-thank-you').textContent = messages.thankYou;
    document.querySelector('.footer-hashtag').textContent = couple.hashtag;

    // Footer links
    document.querySelector('.footer-link[href="#"]').href = contact.instagram;

    // Update meta tags for social sharing
    updateMetaTags();
}

function updateMetaTags() {
    const { couple, wedding, messages } = weddingData;
    const groomName = couple.groom.name;
    const brideName = couple.bride.name;
    const displayDate = wedding.displayDate;

    // Update page title
    document.title = `${groomName} Weds ${brideName} | A Royal Wedding Invite`;

    // Update meta description
    updateMeta('name', 'description', `Join us in celebrating the royal wedding of ${groomName} & ${brideName} on ${displayDate}. Save the date for our special day!`);
    updateMeta('name', 'keywords', `wedding invitation, ${groomName}, ${brideName}, royal wedding, wedding celebration`);
    updateMeta('name', 'author', `${groomName} & ${brideName}`);

    // Update Open Graph tags
    updateMeta('property', 'og:title', `${groomName} Weds ${brideName} | Royal Wedding Invitation`);
    updateMeta('property', 'og:description', `${messages.inviteText} Join us on ${displayDate}.`);
    updateMeta('property', 'og:image:alt', `${groomName} & ${brideName} Wedding Invitation`);
    updateMeta('property', 'og:site_name', `${groomName} & ${brideName} Wedding`);

    // Update Twitter Card tags
    updateMeta('name', 'twitter:title', `${groomName} Weds ${brideName} | Royal Wedding Invitation`);
    updateMeta('name', 'twitter:description', `Join us in celebrating our special day on ${displayDate}. Save the date!`);
    updateMeta('name', 'twitter:image:alt', `${groomName} & ${brideName} Wedding Invitation`);
}

function updateMeta(attr, key, value) {
    let element = document.querySelector(`meta[${attr}="${key}"]`);
    if (element) {
        element.setAttribute('content', value);
    }
}

// Export for use in other scripts
window.getWeddingData = () => weddingData;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
