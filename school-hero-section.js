class SchoolHeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      // Content Settings
      heroTitle: 'Shaping Tomorrow\'s Leaders Today',
      heroSubtitle: 'Experience education that goes beyond textbooks. At Innovate Academy, we nurture critical thinking, creativity, and character in a supportive environment designed for academic excellence.',
      primaryButtonText: 'Schedule a Tour',
      secondaryButtonText: 'Learn More',
      primaryButtonLink: '#tour',
      secondaryButtonLink: '#learn-more',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      
      // Color Palette
      primaryColor: '#1e40af',
      primaryLight: '#3b82f6',
      primaryDark: '#1e3a8a',
      secondaryColor: '#f59e0b',
      secondaryLight: '#fbbf24',
      secondaryDark: '#d97706',
      accentColor: '#dc2626',
      accentLight: '#ef4444',
      accentDark: '#b91c1c',
      neutralWhite: '#ffffff',
      neutralLight: '#f8fafc',
      neutralDark: '#1e293b',
      neutralBlack: '#0f172a',
      
      // Typography
      titleFontFamily: 'Playfair Display',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: 56,
      subtitleFontSize: 19,
      buttonFontSize: 16,
      
      // Layout
      heroAlignment: 'left',
      
      // Background
      backgroundImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      backgroundOpacity: 10,
      
      // Stats
      stat1Number: '95%',
      stat1Label: 'College Acceptance Rate',
      stat2Number: '1,200+',
      stat2Label: 'Students Enrolled',
      stat3Number: '40+',
      stat3Label: 'Academic Programs',
      stat4Number: '25',
      stat4Label: 'Years of Excellence',
      showStats: true,
      
      // Interactive Elements
      showFloatingShapes: true,
      showScrollIndicator: true
    };
    this.render();
  }

  static get observedAttributes() {
    return [
      'hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
      'primary-button-link', 'secondary-button-link', 'primary-button-target', 'secondary-button-target',
      'primary-color', 'primary-light', 'primary-dark', 'secondary-color', 'secondary-light', 'secondary-dark',
      'accent-color', 'accent-light', 'accent-dark', 'neutral-white', 'neutral-light', 'neutral-dark', 'neutral-black',
      'title-font-family', 'subtitle-font-family', 'button-font-family',
      'title-font-size', 'subtitle-font-size', 'button-font-size', 'hero-alignment',
      'background-image', 'background-opacity', 'stat1-number', 'stat1-label', 'stat2-number', 'stat2-label',
      'stat3-number', 'stat3-label', 'stat4-number', 'stat4-label', 'show-stats', 'show-floating-shapes', 'show-scroll-indicator'
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
    const alignment = this.settings.heroAlignment;
    let textAlign, justifyContent, itemsAlign;
    
    if (alignment === 'center') {
      textAlign = 'center';
      justifyContent = 'center';
      itemsAlign = 'center';
    } else if (alignment === 'right') {
      textAlign = 'right';
      justifyContent = 'flex-end';
      itemsAlign = 'flex-end';
    } else {
      textAlign = 'left';
      justifyContent = 'flex-start';
      itemsAlign = 'flex-start';
    }

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap');
        
        :host {
          --primary-color: ${this.settings.primaryColor};
          --primary-light: ${this.settings.primaryLight};
          --primary-dark: ${this.settings.primaryDark};
          --secondary-color: ${this.settings.secondaryColor};
          --secondary-light: ${this.settings.secondaryLight};
          --secondary-dark: ${this.settings.secondaryDark};
          --accent-color: ${this.settings.accentColor};
          --accent-light: ${this.settings.accentLight};
          --accent-dark: ${this.settings.accentDark};
          --neutral-white: ${this.settings.neutralWhite};
          --neutral-light: ${this.settings.neutralLight};
          --neutral-dark: ${this.settings.neutralDark};
          --neutral-black: ${this.settings.neutralBlack};
          
          --gradient-1: linear-gradient(135deg, var(--primary-dark) 0%, var(--neutral-black) 100%);
          --gradient-2: linear-gradient(45deg, var(--accent-color) 0%, var(--secondary-color) 100%);
          --gradient-3: linear-gradient(45deg, var(--secondary-color) 0%, var(--secondary-light) 100%);
          --overlay-gradient: linear-gradient(45deg, rgba(30, 64, 175, 0.3), rgba(15, 23, 42, 0.3));
          
          --shadow-primary: rgba(30, 64, 175, 0.3);
          --shadow-accent: rgba(220, 38, 38, 0.3);
          --shadow-dark: rgba(0, 0, 0, 0.2);
          --hover-overlay: rgba(255, 255, 255, 0.1);
          --focus-color: var(--secondary-light);
          
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
          min-height: 100vh;
          background: var(--gradient-1);
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .hero-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('${this.settings.backgroundImage}') center/cover;
          opacity: ${this.settings.backgroundOpacity / 100};
          z-index: 1;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          z-index: 2;
          display: ${this.settings.showFloatingShapes === 'true' ? 'block' : 'none'};
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: var(--hover-overlay);
          backdrop-filter: blur(10px);
          animation: float 6s ease-in-out infinite;
        }

        .floating-shape:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-shape:nth-child(2) {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .floating-shape:nth-child(3) {
          width: 60px;
          height: 60px;
          top: 80%;
          left: 80%;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .hero-content {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 5%;
          position: relative;
          z-index: 5;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          width: 100%;
          align-items: center;
        }

        .hero-text {
          animation: slideInLeft 1s ease-out;
          text-align: ${textAlign};
        }

        .hero-text h1 {
          font-family: '${this.settings.titleFontFamily}', serif;
          font-size: ${this.settings.titleFontSize}px;
          font-weight: 600;
          color: var(--neutral-white);
          line-height: 1.2;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px var(--shadow-dark);
        }

        .hero-text .highlight {
          background: var(--gradient-3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
        }

        .hero-text p {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: ${this.settings.subtitleFontSize}px;
          color: var(--neutral-light);
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 500px;
          text-shadow: 1px 1px 2px var(--shadow-dark);
          ${alignment === 'center' ? 'margin-left: auto; margin-right: auto;' : ''}
          ${alignment === 'right' ? 'margin-left: auto;' : ''}
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: ${justifyContent};
        }

        .btn {
          font-family: '${this.settings.buttonFontFamily}', sans-serif;
          font-size: ${this.settings.buttonFontSize}px;
          font-weight: 600;
          padding: 16px 32px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          cursor: pointer;
        }

        .btn-primary {
          background: var(--gradient-2);
          border: none;
          color: var(--neutral-white);
          box-shadow: 0 8px 25px var(--shadow-accent);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px var(--shadow-accent);
          background: linear-gradient(45deg, var(--accent-dark) 0%, var(--secondary-dark) 100%);
        }

        .btn-primary:focus {
          outline: 3px solid var(--focus-color);
          outline-offset: 2px;
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid var(--neutral-white);
          color: var(--neutral-white);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: var(--neutral-white);
          color: var(--primary-dark);
          transform: translateY(-3px);
        }

        .btn-secondary:focus {
          outline: 3px solid var(--focus-color);
          outline-offset: 2px;
        }

        .hero-image {
          position: relative;
          animation: slideInRight 1s ease-out;
        }

        .image-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px var(--shadow-dark);
          transform: perspective(1000px) rotateY(-5deg);
          transition: all 0.3s ease;
        }

        .image-container:hover {
          transform: perspective(1000px) rotateY(0deg) scale(1.02);
        }

        .hero-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--overlay-gradient);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-container:hover .image-overlay {
          opacity: 1;
        }

        .stats-bar {
          position: absolute;
          bottom: 5%;
          left: 5%;
          right: 5%;
          background: rgba(30, 41, 91, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 15px;
          padding: 20px;
          display: ${this.settings.showStats === 'true' ? 'flex' : 'none'};
          justify-content: space-around;
          z-index: 6;
          border: 1px solid var(--hover-overlay);
        }

        .stat-item {
          text-align: center;
          color: var(--neutral-white);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          display: block;
          margin-bottom: 5px;
          color: var(--secondary-light);
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--neutral-light);
          font-weight: 500;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          animation: bounce 2s infinite;
          display: ${this.settings.showScrollIndicator === 'true' ? 'block' : 'none'};
        }

        .scroll-indicator::after {
          content: '↓';
          color: var(--neutral-light);
          font-size: 1.5rem;
          text-shadow: 1px 1px 2px var(--shadow-dark);
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

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
            padding: 0 1rem;
          }

          .hero-text {
            text-align: center;
          }

          .hero-text h1 {
            font-size: ${Math.round(this.settings.titleFontSize * 0.7)}px;
            line-height: 1.1;
          }

          .hero-text p {
            max-width: 100%;
            font-size: ${Math.round(this.settings.subtitleFontSize * 0.9)}px;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons {
            justify-content: center;
            gap: 1rem;
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 280px;
            text-align: center;
          }

          .stats-bar {
            position: relative;
            bottom: auto;
            margin: 2rem 1rem 0;
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .image-container {
            transform: none;
            margin: 0 1rem;
          }

          .hero-content {
            padding: 2rem 0;
          }
        }

        @media (max-width: 480px) {
          .hero-text h1 {
            font-size: ${Math.round(this.settings.titleFontSize * 0.5)}px;
          }

          .hero-text p {
            font-size: ${Math.round(this.settings.subtitleFontSize * 0.8)}px;
          }

          .btn {
            padding: 14px 24px;
            font-size: ${Math.round(this.settings.buttonFontSize * 0.9)}px;
          }

          .stat-number {
            font-size: 1.5rem;
          }

          .stat-label {
            font-size: 0.8rem;
          }
        }
      </style>

      <main class="hero-container" role="main" aria-label="School hero section">
        <div class="floating-elements" aria-hidden="true">
          <div class="floating-shape"></div>
          <div class="floating-shape"></div>
          <div class="floating-shape"></div>
        </div>

        <section class="hero-content">
          <div class="content-grid">
            <div class="hero-text">
              <h1><span class="highlight">Tomorrow's</span> ${this.settings.heroTitle}</h1>
              <p>${this.settings.heroSubtitle}</p>
              <div class="hero-buttons">
                <a href="${this.settings.primaryButtonLink}" target="${this.settings.primaryButtonTarget}" class="btn btn-primary" role="button">
                  ${this.settings.primaryButtonText}
                </a>
                <a href="${this.settings.secondaryButtonLink}" target="${this.settings.secondaryButtonTarget}" class="btn btn-secondary" role="button">
                  ${this.settings.secondaryButtonText}
                </a>
              </div>
            </div>
            <div class="hero-image">
              <div class="image-container">
                <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80" alt="Students collaborating in modern classroom environment">
                <div class="image-overlay" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="stats-bar" aria-label="School statistics and achievements">
          <div class="stat-item">
            <span class="stat-number">${this.settings.stat1Number}</span>
            <span class="stat-label">${this.settings.stat1Label}</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${this.settings.stat2Number}</span>
            <span class="stat-label">${this.settings.stat2Label}</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${this.settings.stat3Number}</span>
            <span class="stat-label">${this.settings.stat3Label}</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${this.settings.stat4Number}</span>
            <span class="stat-label">${this.settings.stat4Label}</span>
          </div>
        </section>

        <div class="scroll-indicator" aria-hidden="true"></div>
      </main>
    `;
  }

  updateElement(name) {
    if (!this.shadowRoot) return;

    switch (name) {
      case 'hero-title':
      case 'hero-subtitle':
      case 'primary-button-text':
      case 'secondary-button-text':
      case 'primary-button-link':
      case 'secondary-button-link':
      case 'stat1-number':
      case 'stat1-label':
      case 'stat2-number':
      case 'stat2-label':
      case 'stat3-number':
      case 'stat3-label':
      case 'stat4-number':
      case 'stat4-label':
      case 'hero-alignment':
      case 'show-stats':
      case 'show-floating-shapes':
      case 'show-scroll-indicator':
        this.render();
        break;
    }
  }
}

customElements.define('school-hero-section', SchoolHeroSection);
