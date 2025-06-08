// ============================================================================
// CUSTOM ELEMENT CODE (school-hero-section.js)
// ============================================================================

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
      
      // Simplified Color System
      textColor: '#ffffff',
      backgroundColor: '#1e3a8a',
      borderColor: '#3b82f6',
      gradient1: '#1e40af',
      gradient2: '#dc2626',
      gradient3: '#f59e0b',
      accentColor: '#fbbf24',
      
      // Typography
      titleFontFamily: 'Playfair Display',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: 56,
      subtitleFontSize: 19,
      buttonFontSize: 16,
      
      // Layout
      heroAlignment: 'left',
      
      // Image Settings
      heroImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1932&q=80',
      imageAltText: 'Students collaborating in modern classroom environment',
      
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
      'text-color', 'background-color', 'border-color', 'gradient1', 'gradient2', 'gradient3', 'accent-color',
      'title-font-family', 'subtitle-font-family', 'button-font-family',
      'title-font-size', 'subtitle-font-size', 'button-font-size', 'hero-alignment',
      'hero-image', 'image-alt-text', 'stat1-number', 'stat1-label', 'stat2-number', 'stat2-label',
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
          --text-color: ${this.settings.textColor};
          --background-color: ${this.settings.backgroundColor};
          --border-color: ${this.settings.borderColor};
          --gradient1: ${this.settings.gradient1};
          --gradient2: ${this.settings.gradient2};
          --gradient3: ${this.settings.gradient3};
          --accent-color: ${this.settings.accentColor};
          
          --primary-gradient: linear-gradient(135deg, var(--gradient1) 0%, var(--background-color) 100%);
          --button-gradient: linear-gradient(45deg, var(--gradient2) 0%, var(--gradient3) 100%);
          --highlight-gradient: linear-gradient(45deg, var(--gradient3) 0%, var(--accent-color) 100%);
          
          --shadow-color: rgba(0, 0, 0, 0.2);
          --hover-overlay: rgba(255, 255, 255, 0.1);
          
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
          background: var(--primary-gradient);
          position: relative;
          display: flex;
          flex-direction: column;
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
          color: var(--text-color);
          line-height: 1.2;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px var(--shadow-color);
        }

        .hero-text .highlight {
          background: var(--highlight-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
        }

        .hero-text p {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: ${this.settings.subtitleFontSize}px;
          color: var(--text-color);
          opacity: 0.9;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 500px;
          text-shadow: 1px 1px 2px var(--shadow-color);
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, var(--hover-overlay), transparent);
          transition: left 0.5s ease;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: var(--button-gradient);
          border: none;
          color: var(--text-color);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 35px rgba(220, 38, 38, 0.4);
        }

        .btn-primary:focus {
          outline: 3px solid var(--accent-color);
          outline-offset: 2px;
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid var(--border-color);
          color: var(--text-color);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: var(--border-color);
          color: var(--background-color);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 25px var(--shadow-color);
        }

        .btn-secondary:focus {
          outline: 3px solid var(--accent-color);
          outline-offset: 2px;
        }

        .hero-image {
          position: relative;
          animation: elegantEntrance 1.5s ease-out;
        }

        .image-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px var(--shadow-color);
          border: 2px solid var(--border-color);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform: perspective(1000px) rotateY(-8deg) rotateX(3deg);
        }

        .image-container:hover {
          transform: perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-10px);
          box-shadow: 0 35px 70px var(--shadow-color);
          border-color: var(--accent-color);
        }

        .hero-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          filter: brightness(1) contrast(1.05);
        }

        .image-container:hover img {
          transform: scale(1.05);
          filter: brightness(1.1) contrast(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            var(--gradient1) 0%, 
            transparent 30%, 
            transparent 70%, 
            var(--gradient2) 100%);
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .image-container:hover .image-overlay {
          opacity: 0.2;
        }

        .stats-bar {
          position: absolute;
          bottom: 5%;
          left: 5%;
          right: 5%;
          background: rgba(30, 58, 138, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 15px;
          padding: 20px;
          display: ${this.settings.showStats === 'true' ? 'flex' : 'none'};
          justify-content: space-around;
          z-index: 6;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 30px var(--shadow-color);
        }

        .stat-item {
          text-align: center;
          color: var(--text-color);
          transition: transform 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-2px);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          display: block;
          margin-bottom: 5px;
          color: var(--accent-color);
          text-shadow: 1px 1px 2px var(--shadow-color);
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-color);
          font-weight: 500;
          opacity: 0.9;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          animation: bounce 2s infinite;
          display: ${this.settings.showScrollIndicator === 'true' ? 'block' : 'none'};
          color: var(--accent-color);
          font-size: 1.5rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .scroll-indicator:hover {
          color: var(--text-color);
        }

        .scroll-indicator::after {
          content: '↓';
          text-shadow: 1px 1px 2px var(--shadow-color);
        }

        @keyframes elegantEntrance {
          0% {
            opacity: 0;
            transform: perspective(1000px) rotateY(-15deg) rotateX(8deg) translateX(50px) translateY(30px);
          }
          50% {
            opacity: 0.7;
            transform: perspective(1000px) rotateY(-10deg) rotateX(5deg) translateX(20px) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: perspective(1000px) rotateY(-8deg) rotateX(3deg) translateX(0) translateY(0);
          }
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

          .image-container:hover {
            transform: translateY(-5px);
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
                <img src="${this.settings.heroImage}" alt="${this.settings.imageAltText}">
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
      case 'hero-image':
      case 'image-alt-text':
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
