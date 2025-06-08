class HeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      heroTitle: 'Create Something Beautiful',
      heroSubtitle: 'Transform your ideas into stunning digital experiences with our powerful platform.',
      primaryButtonText: 'Get Started',
      secondaryButtonText: 'Learn More',
      primaryButtonLink: '#get-started',
      secondaryButtonLink: '#learn-more',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      backgroundColor: '#1a1a2e',
      textColor: '#ffffff',
      primaryButtonColor: '#0f4c75',
      secondaryButtonColor: 'transparent',
      accentColor: '#3282b8',
      titleFontFamily: 'Poppins',
      subtitleFontFamily: 'Roboto',
      buttonFontFamily: 'Montserrat',
      titleFontSize: '48px',
      subtitleFontSize: '18px',
      buttonFontSize: '16px',
      heroAlignment: 'center'
    };
    this.render();
  }

  static get observedAttributes() {
    return [
      'hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
      'primary-button-link', 'secondary-button-link', 'primary-button-target', 'secondary-button-target',
      'background-color', 'text-color', 'primary-button-color', 'secondary-button-color', 'accent-color',
      'title-font-family', 'subtitle-font-family', 'button-font-family',
      'title-font-size', 'subtitle-font-size', 'button-font-size', 'hero-alignment'
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
          overflow: hidden;
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
          background-image: 
            radial-gradient(circle at 25% 25%, var(--accent) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, var(--primary-btn) 0%, transparent 50%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: var(--text-color);
        }

        .hero-content {
          max-width: 1200px;
          width: 90%;
          padding: 2rem;
          text-align: ${this.settings.heroAlignment};
          z-index: 10;
          position: relative;
        }

        .hero-title {
          font-family: var(--title-font), sans-serif;
          font-size: ${this.settings.titleFontSize};
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, var(--text-color), var(--accent));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 1s ease-out;
        }

        .hero-subtitle {
          font-family: var(--subtitle-font), sans-serif;
          font-size: ${this.settings.subtitleFontSize};
          font-weight: 400;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: ${this.settings.heroAlignment === 'center' ? 'auto' : '0'};
          margin-right: ${this.settings.heroAlignment === 'center' ? 'auto' : '0'};
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: ${this.settings.heroAlignment === 'center' ? 'center' : this.settings.heroAlignment === 'right' ? 'flex-end' : 'flex-start'};
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        .btn {
          font-family: var(--button-font), sans-serif;
          font-size: ${this.settings.buttonFontSize};
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
          display: inline-block;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: var(--primary-btn);
          color: white;
          border-color: var(--primary-btn);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .btn-secondary {
          background: var(--secondary-btn);
          color: var(--text-color);
          border-color: var(--accent);
        }

        .btn-secondary:hover {
          background: var(--accent);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
          pointer-events: none;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 80%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          left: 10%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          top: 30%;
          left: 15%;
          animation-delay: 4s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
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
            align-items: ${this.settings.heroAlignment === 'center' ? 'center' : this.settings.heroAlignment === 'right' ? 'flex-end' : 'flex-start'};
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
            text-align: center;
          }
          
          .shape-1, .shape-2, .shape-3 {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            padding: 1rem;
          }
          
          .hero-title {
            font-size: calc(${this.settings.titleFontSize} * 0.5);
          }
          
          .hero-subtitle {
            font-size: calc(${this.settings.subtitleFontSize} * 0.8);
          }
        }
      </style>

      <div class="hero-container">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
        
        <div class="hero-content">
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
      case 'hero-alignment':
        this.render(); // Re-render for alignment changes
        break;
    }
  }
}

customElements.define('hero-section', HeroSection);
