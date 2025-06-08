class HeroImageSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      heroTitle: 'Discover Your Potential',
      heroSubtitle: 'Join thousands of professionals who have transformed their careers with our innovative platform.',
      primaryButtonText: 'Start Your Journey',
      secondaryButtonText: 'Watch Demo',
      primaryButtonLink: '#start',
      secondaryButtonLink: '#demo',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      imageUrl: 'https://static.wixstatic.com/media/8874a0_4c42e10ba1284f969298058c350dcde4~mv2.png',
      imageAlt: 'Professional person',
      backgroundColor: '#0a0a23',
      textColor: '#ffffff',
      primaryButtonColor: '#ff6b6b',
      secondaryButtonColor: 'transparent',
      accentColor: '#4ecdc4',
      titleFontFamily: 'Montserrat',
      subtitleFontFamily: 'Open Sans',
      buttonFontFamily: 'Roboto',
      titleFontSize: '52px',
      subtitleFontSize: '20px',
      buttonFontSize: '18px'
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
            linear-gradient(135deg, var(--bg-color) 0%, rgba(78, 205, 196, 0.1) 100%),
            radial-gradient(circle at 80% 20%, var(--accent) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, var(--primary-btn) 0%, transparent 50%);
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
        }

        .hero-title {
          font-family: var(--title-font), sans-serif;
          font-size: ${this.settings.titleFontSize};
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, var(--text-color), var(--accent));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          transform: translateX(-50px);
          opacity: 0;
          animation: slideInLeft 1s ease-out 0.3s forwards;
        }

        .hero-subtitle {
          font-family: var(--subtitle-font), sans-serif;
          font-size: ${this.settings.subtitleFontSize};
          font-weight: 400;
          line-height: 1.7;
          margin-bottom: 3rem;
          opacity: 0.9;
          transform: translateX(-50px);
          opacity: 0;
          animation: slideInLeft 1s ease-out 0.6s forwards;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          transform: translateX(-50px);
          opacity: 0;
          animation: slideInLeft 1s ease-out 0.9s forwards;
        }

        .btn {
          font-family: var(--button-font), sans-serif;
          font-size: ${this.settings.buttonFontSize};
          font-weight: 600;
          padding: 1.2rem 2.5rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.4s ease;
          cursor: pointer;
          border: 2px solid transparent;
          display: inline-block;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-primary {
          background: var(--primary-btn);
          color: white;
          box-shadow: 0 8px 30px rgba(255, 107, 107, 0.3);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-primary:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
        }

        .btn-secondary {
          background: var(--secondary-btn);
          color: var(--text-color);
          border-color: var(--accent);
          box-shadow: 0 8px 30px rgba(78, 205, 196, 0.2);
        }

        .btn-secondary:hover {
          background: var(--accent);
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(78, 205, 196, 0.4);
        }

        .image-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero-image {
          max-width: 80%;
          max-height: 90%;
          object-fit: contain;
          transform: translateX(50px) scale(0.8);
          opacity: 0;
          animation: slideInRight 1.2s ease-out 0.5s forwards;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
        }

        .decorative-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--accent), var(--primary-btn));
          opacity: 0.6;
          animation: float 4s ease-in-out infinite;
        }

        .orb-1 {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 60px;
          height: 60px;
          top: 70%;
          right: 20%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 80px;
          height: 80px;
          bottom: 30%;
          left: 70%;
          animation-delay: 1s;
        }

        .geometric-shape {
          position: absolute;
          border: 3px solid var(--accent);
          opacity: 0.3;
          animation: rotate 8s linear infinite;
        }

        .triangle {
          width: 0;
          height: 0;
          border-left: 25px solid transparent;
          border-right: 25px solid transparent;
          border-bottom: 43px solid var(--accent);
          top: 15%;
          right: 15%;
          opacity: 0.4;
        }

        .square {
          width: 40px;
          height: 40px;
          background: transparent;
          border: 2px solid var(--primary-btn);
          top: 60%;
          left: 5%;
          opacity: 0.5;
          animation: rotate 6s linear infinite reverse;
        }

        @keyframes slideInLeft {
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          to {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }
          
          .content-section {
            padding: 3rem 2rem;
            text-align: center;
          }
          
          .image-section {
            height: 60vh;
            order: -1;
          }
          
          .hero-image {
            max-width: 60%;
            max-height: 80%;
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
            max-width: 300px;
            text-align: center;
          }
          
          .content-section {
            padding: 2rem 1rem;
          }
          
          .floating-orb, .geometric-shape, .triangle, .square {
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
        }
      </style>

      <div class="hero-container">
        <div class="decorative-elements">
          <div class="floating-orb orb-1"></div>
          <div class="floating-orb orb-2"></div>
          <div class="floating-orb orb-3"></div>
          <div class="geometric-shape triangle"></div>
          <div class="geometric-shape square"></div>
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
        
        <div class="image-section">
          <img src="${this.settings.imageUrl}" alt="${this.settings.imageAlt}" class="hero-image">
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

customElements.define('hero-image-section', HeroImageSection);
