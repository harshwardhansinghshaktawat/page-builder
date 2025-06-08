class TravelHeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      heroTitle: 'Discover Amazing Places',
      heroSubtitle: 'Create unforgettable memories with our carefully curated travel experiences designed for modern explorers.',
      primaryButtonText: 'Start Exploring',
      secondaryButtonText: 'Learn More',
      primaryButtonLink: '#explore',
      secondaryButtonLink: '#learn',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      imageUrl: 'https://static.wixstatic.com/media/8874a0_4c42e10ba1284f969298058c350dcde4~mv2.png',
      imageAlt: 'Travel explorer',
      backgroundColor: '#1a3b3a',
      textColor: '#ffffff',
      primaryButtonColor: '#d4875c',
      secondaryButtonColor: 'transparent',
      accentColor: '#d4875c',
      titleFontFamily: 'Montserrat',
      subtitleFontFamily: 'Open Sans',
      buttonFontFamily: 'Montserrat',
      titleFontSize: '56px',
      subtitleFontSize: '20px',
      buttonFontSize: '16px'
    };
    this.render();
  }

  static get observedAttributes() {
    return [
      'hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
      'primary-button-link', 'secondary-button-link', 'primary-button-target', 'secondary-button-target',
      'image-url', 'image-alt', 'background-color', 'text-color', 'primary-button-color', 
      'secondary-button-color', 'accent-color', 'title-font-family', 'subtitle-font-family', 
      'button-font-family', 'title-font-size', 'subtitle-font-size', 'button-font-size'
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
          --text-color: ${this.settings.textColor};
          --primary-btn: ${this.settings.primaryButtonColor};
          --secondary-btn: ${this.settings.secondaryButtonColor};
          --accent: ${this.settings.accentColor};
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

        .hero-container {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(135deg, var(--bg-color) 0%, #2d5a4f 100%);
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          position: relative;
          color: var(--text-color);
          overflow: hidden;
        }

        .content-section {
          padding: 4rem;
          z-index: 10;
          position: relative;
          max-width: 600px;
        }

        .hero-title {
          font-family: var(--title-font), sans-serif;
          font-size: ${this.settings.titleFontSize};
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: var(--text-color);
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
        }

        .hero-subtitle {
          font-family: var(--subtitle-font), sans-serif;
          font-size: ${this.settings.subtitleFontSize};
          font-weight: 400;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          opacity: 0.9;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }

        .btn {
          font-family: var(--button-font), sans-serif;
          font-size: ${this.settings.buttonFontSize};
          font-weight: 600;
          padding: 1rem 2rem;
          text-decoration: none;
          cursor: pointer;
          border: none;
          border-radius: 50px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 1px;
          min-width: 160px;
        }

        .btn-primary {
          background: var(--primary-btn);
          color: white;
          box-shadow: 0 8px 25px rgba(212, 135, 92, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(212, 135, 92, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-color);
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          border-color: var(--accent);
          background: rgba(212, 135, 92, 0.1);
          transform: translateY(-3px);
        }

        .image-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: linear-gradient(45deg, rgba(45, 90, 79, 0.3) 0%, rgba(212, 135, 92, 0.1) 100%);
        }

        .hero-image {
          width: auto;
          height: 70vh;
          max-width: 80%;
          object-fit: contain;
          object-position: center;
          opacity: 0;
          transform: scale(0.9);
          animation: scaleIn 1s ease-out 0.3s forwards;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.2));
        }

        .background-accent {
          position: absolute;
          top: -10%;
          right: -10%;
          width: 40%;
          height: 120%;
          background: linear-gradient(45deg, var(--accent), transparent);
          opacity: 0.1;
          border-radius: 50%;
          z-index: 1;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }
          
          .content-section {
            padding: 3rem 2rem;
            text-align: center;
            order: 2;
          }
          
          .image-section {
            height: 60vh;
            order: 1;
          }
          
          .hero-image {
            height: 50vh;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: calc(${this.settings.titleFontSize} * 0.7);
          }
          
          .hero-subtitle {
            font-size: calc(${this.settings.subtitleFontSize} * 0.9);
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 280px;
          }
          
          .content-section {
            padding: 2rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: calc(${this.settings.titleFontSize} * 0.5);
          }
          
          .hero-subtitle {
            font-size: calc(${this.settings.subtitleFontSize} * 0.8);
          }
          
          .image-section {
            height: 50vh;
          }
          
          .hero-image {
            height: 40vh;
          }
          
          .content-section {
            padding: 2rem 1rem;
          }
        }
      </style>

      <div class="hero-container">
        <div class="content-section">
          <h1 class="hero-title">${this.settings.heroTitle}</h1>
          <p class="hero-subtitle">${this.settings.heroSubtitle}</p>
          <div class="hero-buttons">
            <a href="${this.settings.primaryButtonLink}" target="${this.settings.primaryButtonTarget}" class="btn btn-primary">
              ${this.settings.primaryButtonText}
            </a>
            <a href="${this.settings.secondaryButtonLink}" target="${this.settings.secondaryButtonTarget}" class="btn btn-secondary">
              ${this.settings.secondaryButtonText}
            </a>
          </div>
        </div>
        
        <div class="image-section">
          <div class="background-accent"></div>
          <img src="${this.settings.imageUrl}" alt="${this.settings.imageAlt}" class="hero-image" loading="lazy">
        </div>
      </div>
    `;
  }

  updateElement(name) {
    if (!this.shadowRoot) return;

    switch (name) {
      case 'hero-title':
        const title = this.shadowRoot.querySelector('.hero-title');
        if (title) title.textContent = this.settings.heroTitle;
        break;
      case 'hero-subtitle':
        const subtitle = this.shadowRoot.querySelector('.hero-subtitle');
        if (subtitle) subtitle.textContent = this.settings.heroSubtitle;
        break;
      case 'primary-button-text':
        const primaryBtn = this.shadowRoot.querySelector('.btn-primary');
        if (primaryBtn) primaryBtn.textContent = this.settings.primaryButtonText;
        break;
      case 'secondary-button-text':
        const secondaryBtn = this.shadowRoot.querySelector('.btn-secondary');
        if (secondaryBtn) secondaryBtn.textContent = this.settings.secondaryButtonText;
        break;
      case 'primary-button-link':
        const primaryLink = this.shadowRoot.querySelector('.btn-primary');
        if (primaryLink) primaryLink.href = this.settings.primaryButtonLink;
        break;
      case 'secondary-button-link':
        const secondaryLink = this.shadowRoot.querySelector('.btn-secondary');
        if (secondaryLink) secondaryLink.href = this.settings.secondaryButtonLink;
        break;
      case 'primary-button-target':
        const primaryTarget = this.shadowRoot.querySelector('.btn-primary');
        if (primaryTarget) primaryTarget.target = this.settings.primaryButtonTarget;
        break;
      case 'secondary-button-target':
        const secondaryTarget = this.shadowRoot.querySelector('.btn-secondary');
        if (secondaryTarget) secondaryTarget.target = this.settings.secondaryButtonTarget;
        break;
      case 'image-url':
        const image = this.shadowRoot.querySelector('.hero-image');
        if (image) image.src = this.settings.imageUrl;
        break;
      case 'image-alt':
        const imageAlt = this.shadowRoot.querySelector('.hero-image');
        if (imageAlt) imageAlt.alt = this.settings.imageAlt;
        break;
      case 'title-font-family':
        const titleEl = this.shadowRoot.querySelector('.hero-title');
        if (titleEl) titleEl.style.fontFamily = `${this.settings.titleFontFamily}, sans-serif`;
        break;
      case 'subtitle-font-family':
        const subtitleEl = this.shadowRoot.querySelector('.hero-subtitle');
        if (subtitleEl) subtitleEl.style.fontFamily = `${this.settings.subtitleFontFamily}, sans-serif`;
        break;
      case 'button-font-family':
        const buttons = this.shadowRoot.querySelectorAll('.btn');
        buttons.forEach(btn => btn.style.fontFamily = `${this.settings.buttonFontFamily}, sans-serif`);
        break;
      case 'title-font-size':
        const titleSize = this.shadowRoot.querySelector('.hero-title');
        if (titleSize) titleSize.style.fontSize = this.settings.titleFontSize;
        break;
      case 'subtitle-font-size':
        const subtitleSize = this.shadowRoot.querySelector('.hero-subtitle');
        if (subtitleSize) subtitleSize.style.fontSize = this.settings.subtitleFontSize;
        break;
      case 'button-font-size':
        const btnSize = this.shadowRoot.querySelectorAll('.btn');
        btnSize.forEach(btn => btn.style.fontSize = this.settings.buttonFontSize);
        break;
    }
  }
}

customElements.define('travel-hero-section', TravelHeroSection);
