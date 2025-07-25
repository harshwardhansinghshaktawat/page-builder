class LuxeHeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      heroTitle: 'Redefine Your Style',
      heroSubtitle: 'Discover premium fashion pieces that blend contemporary design with timeless elegance. Curated collections for the modern lifestyle.',
      heroBadge: 'New Collection 2025',
      primaryButtonText: 'Shop Now',
      secondaryButtonText: 'View Collections',
      primaryButtonLink: '#shop',
      secondaryButtonLink: '#collections',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      stat1Number: '50K+',
      stat1Label: 'Happy Customers',
      stat2Number: '1000+',
      stat2Label: 'Premium Products',
      stat3Number: '4.9★',
      stat3Label: 'Customer Rating',
      product1Title: 'Premium Product',
      product1Price: '$299',
      product1Description: 'Crafted with the finest materials and attention to detail, this premium piece represents the pinnacle of modern design and functionality.',
      product1Image: 'https://static.wixstatic.com/media/8874a0_4c42e10ba1284f969298058c350dcde4~mv2.png',
      product1Link: '#product1',
      product1Target: '_self',
      product2Title: 'Designer Item',
      product2Price: '$189',
      product2Description: 'Contemporary style meets everyday comfort in this versatile piece.',
      product2Image: 'https://static.wixstatic.com/media/8874a0_4c42e10ba1284f969298058c350dcde4~mv2.png',
      product2Link: '#product2',
      product2Target: '_self',
      product3Title: 'Luxury Collection',
      product3Price: '$599',
      product3Description: 'Exclusive limited edition piece from our luxury collection.',
      product3Image: 'https://static.wixstatic.com/media/8874a0_4c42e10ba1284f969298058c350dcde4~mv2.png',
      product3Link: '#product3',
      product3Target: '_self',
      backgroundColor: '#0c0c0c',
      gradientColor1: '#1a1a2e',
      gradientColor2: '#16213e',
      textColor: '#ffffff',
      subtitleTextColor: 'rgba(255, 255, 255, 0.8)',
      primaryButtonColor: '#667eea',
      secondaryButtonColor: 'transparent',
      accentColor: '#4facfe',
      cardBackgroundColor: 'rgba(255, 255, 255, 0.1)',
      cardBorderColor: 'rgba(255, 255, 255, 0.2)',
      descriptionTextColor: 'rgba(255, 255, 255, 0.7)',
      priceGradientColor1: '#f093fb',
      priceGradientColor2: '#f5576c',
      titleFontFamily: 'Inter',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: '64px',
      subtitleFontSize: '20px',
      buttonFontSize: '16px'
    };
    this.render();
  }

  static get observedAttributes() {
    return [
      'hero-title', 'hero-subtitle', 'hero-badge', 'primary-button-text', 'secondary-button-text',
      'primary-button-link', 'secondary-button-link', 'primary-button-target', 'secondary-button-target',
      'stat1-number', 'stat1-label', 'stat2-number', 'stat2-label', 'stat3-number', 'stat3-label',
      'product1-title', 'product1-price', 'product1-description', 'product1-image', 'product1-link', 'product1-target',
      'product2-title', 'product2-price', 'product2-description', 'product2-image', 'product2-link', 'product2-target',
      'product3-title', 'product3-price', 'product3-description', 'product3-image', 'product3-link', 'product3-target',
      'background-color', 'gradient-color1', 'gradient-color2', 'text-color', 'subtitle-text-color',
      'primary-button-color', 'secondary-button-color', 'accent-color', 'card-background-color',
      'card-border-color', 'description-text-color', 'price-gradient-color1', 'price-gradient-color2',
      'title-font-family', 'subtitle-font-family', 'button-font-family',
      'title-font-size', 'subtitle-font-size', 'button-font-size'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot) {
      const key = name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      this.settings[key] = newValue || this.settings[key];
      this.updateElement(name);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --bg-color: ${this.settings.backgroundColor};
          --gradient-color1: ${this.settings.gradientColor1};
          --gradient-color2: ${this.settings.gradientColor2};
          --text-color: ${this.settings.textColor};
          --subtitle-text-color: ${this.settings.subtitleTextColor};
          --primary-btn: ${this.settings.primaryButtonColor};
          --secondary-btn: ${this.settings.secondaryButtonColor};
          --accent: ${this.settings.accentColor};
          --card-bg: ${this.settings.cardBackgroundColor};
          --card-border: ${this.settings.cardBorderColor};
          --description-color: ${this.settings.descriptionTextColor};
          --price-gradient1: ${this.settings.priceGradientColor1};
          --price-gradient2: ${this.settings.priceGradientColor2};
          --title-font: ${this.settings.titleFontFamily};
          --subtitle-font: ${this.settings.subtitleFontFamily};
          --button-font: ${this.settings.buttonFontFamily};
          display: block;
          width: 100%;
          min-height: 100vh;
          position: relative;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hero {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, var(--bg-color) 0%, var(--gradient-color1) 50%, var(--gradient-color2) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: var(--text-color);
          font-family: var(--title-font), -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="g" cx="50%" cy="50%"><stop offset="0%" stop-color="%23667eea" stop-opacity="0.1"/><stop offset="100%" stop-color="%23667eea" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="150" fill="url(%23g)"><animate attributeName="r" values="150;200;150" dur="8s" repeatCount="indefinite"/></circle><circle cx="800" cy="300" r="120" fill="url(%23g)"><animate attributeName="r" values="120;180;120" dur="10s" repeatCount="indefinite"/></circle><circle cx="600" cy="700" r="100" fill="url(%23g)"><animate attributeName="r" values="100;160;100" dur="12s" repeatCount="indefinite"/></circle></svg>');
          animation: float 20s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .hero-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .hero-content {
          animation: slideInLeft 1s ease-out;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
          to { box-shadow: 0 0 20px rgba(102, 126, 234, 0.8); }
        }

        .hero-title {
          font-family: var(--title-font), sans-serif;
          font-size: ${this.settings.titleFontSize};
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, var(--text-color) 0%, var(--primary-btn) 50%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-family: var(--subtitle-font), sans-serif;
          font-size: ${this.settings.subtitleFontSize};
          color: var(--subtitle-text-color);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 500px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .cta-primary, .cta-secondary {
          font-family: var(--button-font), sans-serif;
          font-size: ${this.settings.buttonFontSize};
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .cta-primary {
          background: linear-gradient(135deg, var(--primary-btn) 0%, var(--accent) 100%);
          color: white;
          border: none;
        }

        .cta-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .cta-primary:hover::before {
          left: 100%;
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .cta-secondary {
          background: var(--secondary-btn);
          color: var(--text-color);
          border: 2px solid var(--card-border);
          backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
          background: var(--card-bg);
          transform: translateY(-3px);
          border-color: var(--card-border);
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--accent) 0%, var(--primary-btn) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--subtitle-text-color);
        }

        .hero-visual {
          position: relative;
          animation: slideInRight 1s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .product-showcase {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .product-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 1.5rem;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
          background: var(--card-bg);
          opacity: 0.9;
        }

        .product-card:nth-child(1) {
          grid-row: span 2;
        }

        .product-image {
          width: 100%;
          height: 150px;
          object-fit: contain;
          object-position: center;
          border-radius: 12px;
          margin-bottom: 1rem;
          background: var(--card-bg);
        }

        .product-card:nth-child(1) .product-image {
          height: 200px;
        }

        .product-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }

        .product-description {
          font-size: 0.9rem;
          color: var(--description-color);
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .product-price {
          font-size: 1.3rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--price-gradient1) 0%, var(--price-gradient2) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .hero-actions {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: calc(${this.settings.titleFontSize} * 0.7);
          }

          .hero-subtitle {
            font-size: calc(${this.settings.subtitleFontSize} * 0.9);
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-primary, .cta-secondary {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }

          .product-showcase {
            grid-template-columns: 1fr;
          }

          .product-card:nth-child(1) {
            grid-row: span 1;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: calc(${this.settings.titleFontSize} * 0.5);
          }

          .hero-subtitle {
            font-size: calc(${this.settings.subtitleFontSize} * 0.8);
          }

          .hero-container {
            padding: 1rem;
          }
        }
      </style>

      <section class="hero">
        <div class="hero-container">
          <div class="hero-content">
            <div class="hero-badge">${this.settings.heroBadge}</div>
            <h1 class="hero-title">${this.settings.heroTitle}</h1>
            <p class="hero-subtitle">${this.settings.heroSubtitle}</p>
            <div class="hero-actions">
              <a href="${this.settings.primaryButtonLink}" target="${this.settings.primaryButtonTarget}" class="cta-primary">
                ${this.settings.primaryButtonText}
              </a>
              <a href="${this.settings.secondaryButtonLink}" target="${this.settings.secondaryButtonTarget}" class="cta-secondary">
                ${this.settings.secondaryButtonText}
              </a>
            </div>
            <div class="hero-stats">
              <div class="stat">
                <div class="stat-number">${this.settings.stat1Number}</div>
                <div class="stat-label">${this.settings.stat1Label}</div>
              </div>
              <div class="stat">
                <div class="stat-number">${this.settings.stat2Number}</div>
                <div class="stat-label">${this.settings.stat2Label}</div>
              </div>
              <div class="stat">
                <div class="stat-number">${this.settings.stat3Number}</div>
                <div class="stat-label">${this.settings.stat3Label}</div>
              </div>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="product-showcase">
              <a href="${this.settings.product1Link}" target="${this.settings.product1Target}" class="product-card">
                <img src="${this.settings.product1Image}" alt="${this.settings.product1Title}" class="product-image">
                <h3 class="product-title">${this.settings.product1Title}</h3>
                <p class="product-description">${this.settings.product1Description}</p>
                <div class="product-price">${this.settings.product1Price}</div>
              </a>
              <a href="${this.settings.product2Link}" target="${this.settings.product2Target}" class="product-card">
                <img src="${this.settings.product2Image}" alt="${this.settings.product2Title}" class="product-image">
                <h3 class="product-title">${this.settings.product2Title}</h3>
                <p class="product-description">${this.settings.product2Description}</p>
                <div class="product-price">${this.settings.product2Price}</div>
              </a>
              <a href="${this.settings.product3Link}" target="${this.settings.product3Target}" class="product-card">
                <img src="${this.settings.product3Image}" alt="${this.settings.product3Title}" class="product-image">
                <h3 class="product-title">${this.settings.product3Title}</h3>
                <p class="product-description">${this.settings.product3Description}</p>
                <div class="product-price">${this.settings.product3Price}</div>
              </a>
            </div>
          </div>
        </div>
      </section>
    `;

    this.initializeAnimations();
  }

  updateElement(name) {
    const rootStyle = this.shadowRoot.querySelector('style');
    if (rootStyle) {
      rootStyle.textContent = rootStyle.textContent.replace(
        /:host\s*{[^}]*}/,
        `:host {
          --bg-color: ${this.settings.backgroundColor};
          --gradient-color1: ${this.settings.gradientColor1};
          --gradient-color2: ${this.settings.gradientColor2};
          --text-color: ${this.settings.textColor};
          --subtitle-text-color: ${this.settings.subtitleTextColor};
          --primary-btn: ${this.settings.primaryButtonColor};
          --secondary-btn: ${this.settings.secondaryButtonColor};
          --accent: ${this.settings.accentColor};
          --card-bg: ${this.settings.cardBackgroundColor};
          --card-border: ${this.settings.cardBorderColor};
          --description-color: ${this.settings.descriptionTextColor};
          --price-gradient1: ${this.settings.priceGradientColor1};
          --price-gradient2: ${this.settings.priceGradientColor2};
          --title-font: ${this.settings.titleFontFamily};
          --subtitle-font: ${this.settings.subtitleFontFamily};
          --button-font: ${this.settings.buttonFontFamily};
          display: block;
          width: 100%;
          min-height: 100vh;
          position: relative;
        }`
      );
    }

    switch (name) {
      case 'hero-title':
        this.shadowRoot.querySelector('.hero-title').textContent = this.settings.heroTitle;
        break;
      case 'hero-subtitle':
        this.shadowRoot.querySelector('.hero-subtitle').textContent = this.settings.heroSubtitle;
        break;
      case 'hero-badge':
        this.shadowRoot.querySelector('.hero-badge').textContent = this.settings.heroBadge;
        break;
      case 'primary-button-text':
        this.shadowRoot.querySelector('.cta-primary').textContent = this.settings.primaryButtonText;
        break;
      case 'secondary-button-text':
        this.shadowRoot.querySelector('.cta-secondary').textContent = this.settings.secondaryButtonText;
        break;
      case 'primary-button-link':
        this.shadowRoot.querySelector('.cta-primary').href = this.settings.primaryButtonLink;
        break;
      case 'secondary-button-link':
        this.shadowRoot.querySelector('.cta-secondary').href = this.settings.secondaryButtonLink;
        break;
      case 'primary-button-target':
        this.shadowRoot.querySelector('.cta-primary').target = this.settings.primaryButtonTarget;
        break;
      case 'secondary-button-target':
        this.shadowRoot.querySelector('.cta-secondary').target = this.settings.secondaryButtonTarget;
        break;
      case 'stat1-number':
        this.shadowRoot.querySelector('.stat:nth-child(1) .stat-number').textContent = this.settings.stat1Number;
        break;
      case 'stat1-label':
        this.shadowRoot.querySelector('.stat:nth-child(1) .stat-label').textContent = this.settings.stat1Label;
        break;
      case 'stat2-number':
        this.shadowRoot.querySelector('.stat:nth-child(2) .stat-number').textContent = this.settings.stat2Number;
        break;
      case 'stat2-label':
        this.shadowRoot.querySelector('.stat:nth-child(2) .stat-label').textContent = this.settings.stat2Label;
        break;
      case 'stat3-number':
        this.shadowRoot.querySelector('.stat:nth-child(3) .stat-number').textContent = this.settings.stat3Number;
        break;
      case 'stat3-label':
        this.shadowRoot.querySelector('.stat:nth-child(3) .stat-label').textContent = this.settings.stat3Label;
        break;
      case 'product1-title':
        this.shadowRoot.querySelector('.product-card:nth-child(1) .product-title').textContent = this.settings.product1Title;
        break;
      case 'product1-price':
        this.shadowRoot.querySelector('.product-card:nth-child(1) .product-price').textContent = this.settings.product1Price;
        break;
      case 'product1-description':
        this.shadowRoot.querySelector('.product-card:nth-child(1) .product-description').textContent = this.settings.product1Description;
        break;
      case 'product1-image':
        this.shadowRoot.querySelector('.product-card:nth-child(1) .product-image').src = this.settings.product1Image;
        break;
      case 'product1-link':
        this.shadowRoot.querySelector('.product-card:nth-child(1)').href = this.settings.product1Link;
        break;
      case 'product1-target':
        this.shadowRoot.querySelector('.product-card:nth-child(1)').target = this.settings.product1Target;
        break;
      case 'product2-title':
        this.shadowRoot.querySelector('.product-card:nth-child(2) .product-title').textContent = this.settings.product2Title;
        break;
      case 'product2-price':
        this.shadowRoot.querySelector('.product-card:nth-child(2) .product-price').textContent = this.settings.product2Price;
        break;
      case 'product2-description':
        this.shadowRoot.querySelector('.product-card:nth-child(2) .product-description').textContent = this.settings.product2Description;
        break;
      case 'product2-image':
        this.shadowRoot.querySelector('.product-card:nth-child(2) .product-image').src = this.settings.product2Image;
        break;
      case 'product2-link':
        this.shadowRoot.querySelector('.product-card:nth-child(2)').href = this.settings.product2Link;
        break;
      case 'product2-target':
        this.shadowRoot.querySelector('.product-card:nth-child(2)').target = this.settings.product2Target;
        break;
      case 'product3-title':
        this.shadowRoot.querySelector('.product-card:nth-child(3) .product-title').textContent = this.settings.product3Title;
        break;
      case 'product3-price':
        this.shadowRoot.querySelector('.product-card:nth-child(3) .product-price').textContent = this.settings.product3Price;
        break;
      case 'product3-description':
        this.shadowRoot.querySelector('.product-card:nth-child(3) .product-description').textContent = this.settings.product3Description;
        break;
      case 'product3-image':
        this.shadowRoot.querySelector('.product-card:nth-child(3) .product-image').src = this.settings.product3Image;
        break;
      case 'product3-link':
        this.shadowRoot.querySelector('.product-card:nth-child(3)').href = this.settings.product3Link;
        break;
      case 'product3-target':
        this.shadowRoot.querySelector('.product-card:nth-child(3)').target = this.settings.product3Target;
        break;
      case 'title-font-size':
        this.shadowRoot.querySelector('.hero-title').style.fontSize = this.settings.titleFontSize;
        break;
      case 'subtitle-font-size':
        this.shadowRoot.querySelector('.hero-subtitle').style.fontSize = this.settings.subtitleFontSize;
        break;
      case 'button-font-size':
        const buttons = this.shadowRoot.querySelectorAll('.cta-primary, .cta-secondary');
        buttons.forEach(btn => btn.style.fontSize = this.settings.buttonFontSize);
        break;
      case 'title-font-family':
        this.shadowRoot.querySelector('.hero-title').style.fontFamily = this.settings.titleFontFamily;
        break;
      case 'subtitle-font-family':
        this.shadowRoot.querySelector('.hero-subtitle').style.fontFamily = this.settings.subtitleFontFamily;
        break;
      case 'button-font-family':
        const btns = this.shadowRoot.querySelectorAll('.cta-primary, .cta-secondary');
        btns.forEach(btn => btn.style.fontFamily = this.settings.buttonFontFamily);
        break;
    }
  }

  initializeAnimations() {
    // Animate stats counter
    setTimeout(() => {
      const stats = this.shadowRoot.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        if (numericValue > 0) {
          const suffix = finalValue.replace(/[0-9]/g, '');
          let currentValue = 0;
          const increment = numericValue / 50;
          const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
              stat.textContent = finalValue;
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(currentValue) + suffix;
            }
          }, 30);
        }
      });
    }, 1000);
  }
}

customElements.define('luxe-hero-section', LuxeHeroSection);
