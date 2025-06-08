class TravelHeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      heroTitle: 'ENJOY',
      heroSubtitle: 'Travelling moment',
      leftTitle: 'Best guide for you',
      leftSubtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum feugiat purus, vitae finibus eros convallis id.',
      primaryButtonText: 'Explore',
      secondaryButtonText: 'See more',
      primaryButtonLink: '#explore',
      secondaryButtonLink: '#see-more',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      imageUrl: 'https://static.wixstatic.com/media/8874a0_4c42e10ba1284f969298058c350dcde4~mv2.png',
      imageAlt: 'Traveler with arms raised',
      backgroundColor: '#1a3b3a',
      textColor: '#ffffff',
      primaryButtonColor: '#d4875c',
      secondaryButtonColor: 'transparent',
      accentColor: '#d4875c',
      titleFontFamily: 'Montserrat',
      subtitleFontFamily: 'Open Sans',
      buttonFontFamily: 'Montserrat',
      titleFontSize: '64px',
      subtitleFontSize: '18px',
      buttonFontSize: '16px'
    };
    this.render();
  }

  static get observedAttributes() {
    return [
      'hero-title', 'hero-subtitle', 'left-title', 'left-subtitle',
      'primary-button-text', 'secondary-button-text', 'primary-button-link', 'secondary-button-link',
      'primary-button-target', 'secondary-button-target', 'image-url', 'image-alt',
      'background-color', 'text-color', 'primary-button-color', 'secondary-button-color', 'accent-color',
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
          --text-color: ${this.settings.textColor};
          --primary-btn: ${this.settings.primaryButtonColor};
          --secondary-btn: ${this.settings.secondaryButtonColor};
          --accent: ${this.settings.accentColor};
          --title-font: ${this.settings.titleFontFamily};
          --subtitle-font: ${this.settings.subtitleFontFamily};
          --button-font: ${this.settings.buttonFontFamily};
          display: block;
          width: 100%;
          height: 100vh;
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
          height: 100vh;
          background: linear-gradient(135deg, var(--bg-color) 0%, #2d5a4f 50%, #1a3b3a 100%);
          position: relative;
          display: flex;
          align-items: center;
          color: var(--text-color);
          overflow: hidden;
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 70%, rgba(212, 135, 92, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 30%, rgba(45, 90, 79, 0.3) 0%, transparent 50%);
          z-index: 1;
        }

        .content-wrapper {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 3rem;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 4rem;
          align-items: center;
          z-index: 10;
          position: relative;
        }

        .left-content {
          text-align: left;
          opacity: 0;
          transform: translateX(-50px);
          animation: slideInLeft 1s ease-out 0.3s forwards;
        }

        .left-title {
          font-family: var(--title-font), sans-serif;
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--accent);
          position: relative;
        }

        .left-title::after {
          content: '+';
          margin-left: 0.5rem;
          font-size: 24px;
          color: var(--accent);
        }

        .left-subtitle {
          font-family: var(--subtitle-font), sans-serif;
          font-size: ${this.settings.subtitleFontSize};
          line-height: 1.6;
          opacity: 0.9;
          max-width: 350px;
        }

        .center-image {
          position: relative;
          opacity: 0;
          transform: scale(0.8);
          animation: scaleIn 1s ease-out 0.5s forwards;
        }

        .hero-image {
          width: auto;
          height: 400px;
          max-width: 300px;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
        }

        .right-content {
          text-align: right;
          opacity: 0;
          transform: translateX(50px);
          animation: slideInRight 1s ease-out 0.7s forwards;
        }

        .hero-title {
          font-family: var(--title-font), sans-serif;
          font-size: ${this.settings.titleFontSize};
          font-weight: 900;
          color: var(--accent);
          margin-bottom: 0.5rem;
          letter-spacing: 2px;
        }

        .hero-subtitle {
          font-family: var(--title-font), sans-serif;
          font-size: 32px;
          font-weight: 400;
          margin-bottom: 2rem;
          color: var(--text-color);
        }

        .hero-description {
          font-family: var(--subtitle-font), sans-serif;
          font-size: ${this.settings.subtitleFontSize};
          line-height: 1.6;
          margin-bottom: 2.5rem;
          opacity: 0.9;
          max-width: 350px;
          margin-left: auto;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: flex-end;
          flex-wrap: wrap;
        }

        .btn {
          font-family: var(--button-font), sans-serif;
          font-size: ${this.settings.buttonFontSize};
          font-weight: 500;
          padding: 1rem 2rem;
          text-decoration: none;
          cursor: pointer;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          min-width: 120px;
        }

        .btn-primary {
          background: var(--primary-btn);
          color: white;
          border: 2px solid var(--primary-btn);
        }

        .btn-primary:hover {
          background: transparent;
          color: var(--primary-btn);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-color);
          border: 2px solid var(--text-color);
        }

        .btn-secondary:hover {
          background: var(--text-color);
          color: var(--bg-color);
          transform: translateY(-2px);
        }

        .decorative-dots {
          position: absolute;
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 20;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }

        .dot.active {
          background: var(--accent);
          border-color: var(--accent);
        }

        .social-icons {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          gap: 1rem;
          z-index: 20;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-color);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 18px;
        }

        .social-icon:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 1200px) {
          .content-wrapper {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            text-align: center;
            gap: 3rem;
            padding: 2rem;
          }

          .left-content,
          .right-content {
            text-align: center;
          }

          .hero-description {
            margin: 0 auto 2.5rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .decorative-dots {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: calc(${this.settings.titleFontSize} * 0.7);
          }

          .hero-subtitle {
            font-size: 24px;
          }

          .left-title {
            font-size: 24px;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 250px;
          }

          .content-wrapper {
            padding: 1rem;
            gap: 2rem;
          }

          .hero-image {
            height: 300px;
          }

          .social-icons {
            bottom: 1rem;
            right: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: calc(${this.settings.titleFontSize} * 0.5);
          }

          .hero-subtitle {
            font-size: 20px;
          }

          .left-title {
            font-size: 20px;
          }

          .hero-image {
            height: 250px;
          }
        }
      </style>

      <div class="hero-container">
        <div class="background-overlay"></div>
        
        <div class="decorative-dots">
          <div class="dot active"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>

        <div class="content-wrapper">
          <div class="left-content">
            <h3 class="left-title">${this.settings.leftTitle}</h3>
            <p class="left-subtitle">${this.settings.leftSubtitle}</p>
          </div>

          <div class="center-image">
            <img src="${this.settings.imageUrl}" alt="${this.settings.imageAlt}" class="hero-image" loading="lazy">
          </div>

          <div class="right-content">
            <h1 class="hero-title">${this.settings.heroTitle}</h1>
            <h2 class="hero-subtitle">${this.settings.heroSubtitle}</h2>
            <p class="hero-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum feugiat purus, vitae finibus eros convallis id. Quisque tristique dui sed vulputate fringilla.</p>
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

        <div class="social-icons">
          <a href="#" class="social-icon">📷</a>
          <a href="#" class="social-icon">🐦</a>
          <a href="#" class="social-icon">📘</a>
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
      case 'left-title':
        const leftTitle = this.shadowRoot.querySelector('.left-title');
        if (leftTitle) leftTitle.textContent = this.settings.leftTitle;
        break;
      case 'left-subtitle':
        const leftSubtitle = this.shadowRoot.querySelector('.left-subtitle');
        if (leftSubtitle) leftSubtitle.textContent = this.settings.leftSubtitle;
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
        const titleEls = this.shadowRoot.querySelectorAll('.hero-title, .left-title');
        titleEls.forEach(el => el.style.fontFamily = `${this.settings.titleFontFamily}, sans-serif`);
        break;
      case 'subtitle-font-family':
        const subtitleEls = this.shadowRoot.querySelectorAll('.hero-subtitle, .left-subtitle, .hero-description');
        subtitleEls.forEach(el => el.style.fontFamily = `${this.settings.subtitleFontFamily}, sans-serif`);
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
        const subtitleSize = this.shadowRoot.querySelectorAll('.left-subtitle, .hero-description');
        subtitleSize.forEach(el => el.style.fontSize = this.settings.subtitleFontSize);
        break;
      case 'button-font-size':
        const btnSize = this.shadowRoot.querySelectorAll('.btn');
        btnSize.forEach(btn => btn.style.fontSize = this.settings.buttonFontSize);
        break;
    }
  }
}

customElements.define('travel-hero-section', TravelHeroSection);
