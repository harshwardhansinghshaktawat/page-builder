class HeroImageSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      heroTitle: 'Elevate Your Vision',
      heroSubtitle: 'Transform ideas into extraordinary experiences with our sophisticated platform designed for modern professionals.',
      primaryButtonText: 'Get Started',
      secondaryButtonText: 'Learn More',
      primaryButtonLink: '#start',
      secondaryButtonLink: '#demo',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      imageUrl: 'https://static.wixstatic.com/media/8874a0_4c42e10ba1284f969298058c350dcde4~mv2.png',
      imageAlt: 'Professional person',
      backgroundColor: '#fafafa',
      textColor: '#1a1a1a',
      primaryButtonColor: '#2563eb',
      secondaryButtonColor: 'transparent',
      accentColor: '#7c3aed',
      titleFontFamily: 'Playfair Display',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: '64px',
      subtitleFontSize: '22px',
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
          background: var(--bg-color);
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          position: relative;
          color: var(--text-color);
        }

        .content-section {
          padding: 4rem;
          z-index: 10;
          position: relative;
          max-width: 600px;
          justify-self: end;
          margin-right: 2rem;
        }

        .hero-title {
          font-family: var(--title-font), serif;
          font-size: ${this.settings.titleFontSize};
          font-weight: 400;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--text-color);
          letter-spacing: -0.02em;
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
          color: var(--text-color);
          opacity: 0.8;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }

        .btn {
          font-family: var(--button-font), sans-serif;
          font-size: ${this.settings.buttonFontSize};
          font-weight: 500;
          padding: 0.875rem 2rem;
          text-decoration: none;
          cursor: pointer;
          border: none;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.025em;
        }

        .btn-primary {
          background: var(--primary-btn);
          color: white;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }

        .btn-primary:hover {
          background: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-color);
          border: 1.5px solid rgba(26, 26, 26, 0.2);
          position: relative;
          overflow: hidden;
        }

        .btn-secondary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: var(--text-color);
          transition: left 0.3s ease;
          z-index: -1;
        }

        .btn-secondary:hover::before {
          left: 0;
        }

        .btn-secondary:hover {
          color: var(--bg-color);
          border-color: var(--text-color);
        }

        .image-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .hero-image {
          width: auto;
          height: 80vh;
          max-width: 90%;
          object-fit: contain;
          object-position: center;
          opacity: 0;
          transform: translateX(30px);
          animation: fadeInRight 1s ease-out 0.3s forwards;
        }

        .decorative-accent {
          position: absolute;
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, var(--primary-btn), var(--accent));
          border-radius: 50%;
          opacity: 0.1;
          top: 15%;
          left: 10%;
          z-index: 1;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          to {
            opacity: 1;
            transform: translateX(0);
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
            justify-self: center;
            margin: 0;
            max-width: none;
            order: 2;
          }
          
          .image-section {
            height: 60vh;
            order: 1;
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          }
          
          .hero-image {
            height: 50vh;
            max-height: 400px;
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
            gap: 1rem;
          }
          
          .btn {
            width: 100%;
            max-width: 280px;
          }
          
          .content-section {
            padding: 2rem 1.5rem;
          }
          
          .decorative-accent {
            display: none;
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
        <div class="image-section">
          <div class="decorative-accent"></div>
          <img src="${this.settings.imageUrl}" alt="${this.settings.imageAlt}" class="hero-image" loading="lazy">
        </div>
        
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
      </div>
    `;
  }

  updateElement(name) {
    if (!this.shadowRoot) return;

    // Update CSS variables
    const hostStyle = this.shadowRoot.host.style;
    hostStyle.setProperty('--bg-color', this.settings.backgroundColor);
    hostStyle.setProperty('--text-color', this.settings.textColor);
    hostStyle.setProperty('--primary-btn', this.settings.primaryButtonColor);
    hostStyle.setProperty('--secondary-btn', this.settings.secondaryButtonColor);
    hostStyle.setProperty('--accent', this.settings.accentColor);

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
        if (titleEl) titleEl.style.fontFamily = `${this.settings.titleFontFamily}, serif`;
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

customElements.define('hero-image-section', HeroImageSection);
