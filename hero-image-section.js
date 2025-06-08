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
      backgroundColor: '#0f0f23',
      textColor: '#ffffff',
      primaryButtonColor: '#6366f1',
      secondaryButtonColor: 'transparent',
      accentColor: '#22d3ee',
      titleFontFamily: 'Inter',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: '72px',
      subtitleFontSize: '24px',
      buttonFontSize: '18px'
    };
    this.render();
    this.loadGSAP();
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

  loadGSAP() {
    if (window.gsap) {
      this.initAnimations();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      this.initAnimations();
    };
    document.head.appendChild(script);
  }

  initAnimations() {
    if (!window.gsap) return;

    const tl = window.gsap.timeline();
    
    // Set initial states
    window.gsap.set(this.shadowRoot.querySelector('.hero-title'), { 
      opacity: 0, 
      y: 100, 
      scale: 0.8 
    });
    
    window.gsap.set(this.shadowRoot.querySelector('.hero-subtitle'), { 
      opacity: 0, 
      y: 50 
    });
    
    window.gsap.set(this.shadowRoot.querySelectorAll('.btn'), { 
      opacity: 0, 
      y: 30, 
      scale: 0.9 
    });
    
    window.gsap.set(this.shadowRoot.querySelector('.hero-image'), { 
      opacity: 0, 
      x: 100, 
      scale: 0.8 
    });

    // Animate elements in sequence
    tl.to(this.shadowRoot.querySelector('.hero-title'), { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      duration: 1.2, 
      ease: "back.out(1.7)" 
    })
    .to(this.shadowRoot.querySelector('.hero-subtitle'), { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: "power2.out" 
    }, "-=0.6")
    .to(this.shadowRoot.querySelectorAll('.btn'), { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      duration: 0.6, 
      stagger: 0.2, 
      ease: "power2.out" 
    }, "-=0.4")
    .to(this.shadowRoot.querySelector('.hero-image'), { 
      opacity: 1, 
      x: 0, 
      scale: 1, 
      duration: 1, 
      ease: "power2.out" 
    }, "-=0.8");

    // Add button hover animations
    const primaryBtn = this.shadowRoot.querySelector('.btn-primary');
    const secondaryBtn = this.shadowRoot.querySelector('.btn-secondary');

    if (primaryBtn) {
      primaryBtn.addEventListener('mouseenter', () => {
        window.gsap.to(primaryBtn, { 
          scale: 1.05, 
          y: -5, 
          duration: 0.3, 
          ease: "power2.out" 
        });
        window.gsap.to(primaryBtn.querySelector('.btn-glow'), { 
          scale: 1.2, 
          opacity: 0.8, 
          duration: 0.3 
        });
      });

      primaryBtn.addEventListener('mouseleave', () => {
        window.gsap.to(primaryBtn, { 
          scale: 1, 
          y: 0, 
          duration: 0.3, 
          ease: "power2.out" 
        });
        window.gsap.to(primaryBtn.querySelector('.btn-glow'), { 
          scale: 1, 
          opacity: 0.6, 
          duration: 0.3 
        });
      });
    }

    if (secondaryBtn) {
      secondaryBtn.addEventListener('mouseenter', () => {
        window.gsap.to(secondaryBtn, { 
          scale: 1.05, 
          y: -5, 
          duration: 0.3, 
          ease: "power2.out" 
        });
      });

      secondaryBtn.addEventListener('mouseleave', () => {
        window.gsap.to(secondaryBtn, { 
          scale: 1, 
          y: 0, 
          duration: 0.3, 
          ease: "power2.out" 
        });
      });
    }

    // Image float animation
    window.gsap.to(this.shadowRoot.querySelector('.hero-image'), {
      y: -20,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
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
            linear-gradient(135deg, var(--bg-color) 0%, #1a1a3a 100%);
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          position: relative;
          color: var(--text-color);
        }

        .content-section {
          padding: 5rem;
          z-index: 10;
          position: relative;
        }

        .hero-title {
          font-family: var(--title-font), -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: ${this.settings.titleFontSize};
          font-weight: 900;
          line-height: 0.9;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, var(--text-color) 0%, var(--accent) 50%, var(--primary-btn) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-family: var(--subtitle-font), -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: ${this.settings.subtitleFontSize};
          font-weight: 400;
          line-height: 1.5;
          margin-bottom: 3rem;
          opacity: 0.85;
          letter-spacing: -0.01em;
        }

        .hero-buttons {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .btn {
          font-family: var(--button-font), -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: ${this.settings.buttonFontSize};
          font-weight: 600;
          padding: 1.25rem 2.5rem;
          border-radius: 12px;
          text-decoration: none;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.5px;
          min-width: 180px;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--primary-btn) 0%, #8b5cf6 100%);
          color: white;
          box-shadow: 0 10px 40px rgba(99, 102, 241, 0.3);
          position: relative;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, var(--primary-btn), var(--accent));
          border-radius: 14px;
          z-index: -1;
          filter: blur(10px);
          opacity: 0.6;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-color);
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent);
          box-shadow: 0 12px 40px rgba(34, 211, 238, 0.2);
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
          max-width: 85%;
          max-height: 85%;
          object-fit: contain;
          filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4));
        }

        .background-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 30% 70%, rgba(34, 211, 238, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }

        @media (max-width: 1200px) {
          .hero-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }
          
          .content-section {
            padding: 4rem 3rem;
            text-align: center;
          }
          
          .image-section {
            height: 70vh;
            order: -1;
          }
          
          .hero-image {
            max-width: 70%;
            max-height: 80%;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: calc(${this.settings.titleFontSize} * 0.6);
            line-height: 1;
          }
          
          .hero-subtitle {
            font-size: calc(${this.settings.subtitleFontSize} * 0.85);
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
          
          .btn {
            width: 100%;
            max-width: 280px;
          }
          
          .content-section {
            padding: 3rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: calc(${this.settings.titleFontSize} * 0.4);
          }
          
          .hero-subtitle {
            font-size: calc(${this.settings.subtitleFontSize} * 0.75);
          }
          
          .image-section {
            height: 60vh;
          }
          
          .content-section {
            padding: 2rem 1rem;
          }
        }
      </style>

      <div class="hero-container">
        <div class="background-gradient"></div>
        
        <div class="content-section">
          <h1 class="hero-title">${this.settings.heroTitle}</h1>
          <p class="hero-subtitle">${this.settings.heroSubtitle}</p>
          <div class="hero-buttons">
            <a href="${this.settings.primaryButtonLink}" target="${this.settings.primaryButtonTarget}" class="btn btn-primary">
              <div class="btn-glow"></div>
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

    // Initialize animations after render
    setTimeout(() => this.initAnimations(), 100);
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
        if (primaryBtn) {
          primaryBtn.innerHTML = `<div class="btn-glow"></div>${this.settings.primaryButtonText}`;
        }
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
        if (titleEl) titleEl.style.fontFamily = `${this.settings.titleFontFamily}, -apple-system, BlinkMacSystemFont, sans-serif`;
        break;
      case 'subtitle-font-family':
        const subtitleEl = this.shadowRoot.querySelector('.hero-subtitle');
        if (subtitleEl) subtitleEl.style.fontFamily = `${this.settings.subtitleFontFamily}, -apple-system, BlinkMacSystemFont, sans-serif`;
        break;
      case 'button-font-family':
        const buttons = this.shadowRoot.querySelectorAll('.btn');
        buttons.forEach(btn => btn.style.fontFamily = `${this.settings.buttonFontFamily}, -apple-system, BlinkMacSystemFont, sans-serif`);
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
