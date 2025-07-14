class TechHeroSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      // Content Settings
      heroTitle: 'Build The Future',
      heroSubtitle: 'Transform your ideas into reality with cutting-edge technology solutions that scale.',
      primaryButtonText: 'Get Started',
      secondaryButtonText: 'Watch Demo',
      primaryButtonLink: '#start',
      secondaryButtonLink: '#demo',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      
      // Background & Base Colors
      backgroundColor: '#0a0a0f',
      surfaceColor: '#1a1a2e',
      overlayColor: '#16213e',
      
      // Text Colors
      titleColor: '#ffffff',
      subtitleColor: '#94a3b8',
      accentTextColor: '#06b6d4',
      
      // Gradient Colors
      gradient1Color1: '#06b6d4',
      gradient1Color2: '#3b82f6',
      gradient2Color1: '#8b5cf6',
      gradient2Color2: '#ec4899',
      gradient3Color1: '#f59e0b',
      gradient3Color2: '#ef4444',
      
      // Button Colors
      primaryButtonBg: '#06b6d4',
      primaryButtonHover: '#0891b2',
      primaryButtonText: '#ffffff',
      secondaryButtonBorder: '#3b82f6',
      secondaryButtonText: '#ffffff',
      secondaryButtonHover: '#3b82f6',
      
      // Card Colors
      cardBackground: '#1e293b',
      cardBorder: '#334155',
      cardGlow: '#06b6d4',
      
      // Particle Colors
      particleColor1: '#06b6d4',
      particleColor2: '#8b5cf6',
      particleColor3: '#f59e0b',
      
      // Typography
      titleFontFamily: 'Inter',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: 64,
      subtitleFontSize: 20,
      buttonFontSize: 16,
      
      // Layout
      heroAlignment: 'center',
      
      // Features
      feature1Title: 'AI-Powered',
      feature1Subtitle: 'Smart automation',
      feature2Title: 'Scalable',
      feature2Subtitle: 'Growth ready',
      feature3Title: 'Secure',
      feature3Subtitle: 'Enterprise grade',
      
      // Interactive Elements
      showParticles: true,
      showFloatingCards: true,
      showGlowEffect: true
    };
    this.render();
    this.initializeParticles();
  }

  static get observedAttributes() {
    return [
      'hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
      'primary-button-link', 'secondary-button-link', 'primary-button-target', 'secondary-button-target',
      'background-color', 'surface-color', 'overlay-color',
      'title-color', 'subtitle-color', 'accent-text-color',
      'gradient1-color1', 'gradient1-color2', 'gradient2-color1', 'gradient2-color2', 'gradient3-color1', 'gradient3-color2',
      'primary-button-bg', 'primary-button-hover', 'primary-button-text',
      'secondary-button-border', 'secondary-button-text', 'secondary-button-hover',
      'card-background', 'card-border', 'card-glow',
      'particle-color1', 'particle-color2', 'particle-color3',
      'title-font-family', 'subtitle-font-family', 'button-font-family',
      'title-font-size', 'subtitle-font-size', 'button-font-size', 'hero-alignment',
      'feature1-title', 'feature1-subtitle', 'feature2-title', 'feature2-subtitle', 'feature3-title', 'feature3-subtitle',
      'show-particles', 'show-floating-cards', 'show-glow-effect'
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
    let textAlign, justifyContent, alignItems;
    
    if (alignment === 'center') {
      textAlign = 'center';
      justifyContent = 'center';
      alignItems = 'center';
    } else if (alignment === 'right') {
      textAlign = 'right';
      justifyContent = 'flex-end';
      alignItems = 'flex-end';
    } else {
      textAlign = 'left';
      justifyContent = 'flex-start';
      alignItems = 'flex-start';
    }

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :host {
          --background-color: ${this.settings.backgroundColor};
          --surface-color: ${this.settings.surfaceColor};
          --overlay-color: ${this.settings.overlayColor};
          --title-color: ${this.settings.titleColor};
          --subtitle-color: ${this.settings.subtitleColor};
          --accent-text-color: ${this.settings.accentTextColor};
          --gradient1: linear-gradient(135deg, ${this.settings.gradient1Color1}, ${this.settings.gradient1Color2});
          --gradient2: linear-gradient(135deg, ${this.settings.gradient2Color1}, ${this.settings.gradient2Color2});
          --gradient3: linear-gradient(135deg, ${this.settings.gradient3Color1}, ${this.settings.gradient3Color2});
          --primary-button-bg: ${this.settings.primaryButtonBg};
          --primary-button-hover: ${this.settings.primaryButtonHover};
          --primary-button-text: ${this.settings.primaryButtonText};
          --secondary-button-border: ${this.settings.secondaryButtonBorder};
          --secondary-button-text: ${this.settings.secondaryButtonText};
          --secondary-button-hover: ${this.settings.secondaryButtonHover};
          --card-background: ${this.settings.cardBackground};
          --card-border: ${this.settings.cardBorder};
          --card-glow: ${this.settings.cardGlow};
          --particle-color1: ${this.settings.particleColor1};
          --particle-color2: ${this.settings.particleColor2};
          --particle-color3: ${this.settings.particleColor3};
          
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
          background: var(--background-color);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .background-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, var(--gradient1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, var(--gradient2) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, var(--gradient3) 0%, transparent 50%);
          opacity: 0.1;
          animation: patternMove 20s ease-in-out infinite;
        }

        @keyframes patternMove {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-10px, -10px) rotate(1deg); }
          66% { transform: translate(10px, 10px) rotate(-1deg); }
        }

        .geometric-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          opacity: 0.5;
          animation: geometricMove 30s linear infinite;
        }

        @keyframes geometricMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          display: ${this.settings.showParticles ? 'block' : 'none'};
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--particle-color1);
          border-radius: 50%;
          animation: particleFloat 8s ease-in-out infinite;
        }

        .particle:nth-child(2n) { background: var(--particle-color2); animation-delay: 2s; }
        .particle:nth-child(3n) { background: var(--particle-color3); animation-delay: 4s; }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { transform: translateY(-100px) translateX(20px); }
        }

        .main-content {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          width: 100%;
          padding: 0 2rem;
          text-align: ${textAlign};
        }

        .hero-text {
          animation: fadeInUp 1s ease-out;
        }

        .hero-title {
          font-family: '${this.settings.titleFontFamily}', sans-serif;
          font-size: ${this.settings.titleFontSize}px;
          font-weight: 800;
          color: var(--title-color);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: var(--gradient1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .hero-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: ${alignment === 'center' ? '50%' : alignment === 'right' ? '100%' : '0'};
          transform: translateX(${alignment === 'center' ? '-50%' : alignment === 'right' ? '-100%' : '0'});
          width: 100px;
          height: 4px;
          background: var(--gradient2);
          border-radius: 2px;
          display: ${this.settings.showGlowEffect ? 'block' : 'none'};
        }

        .hero-subtitle {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: ${this.settings.subtitleFontSize}px;
          color: var(--subtitle-color);
          line-height: 1.6;
          margin-bottom: 3rem;
          max-width: 600px;
          ${alignment === 'center' ? 'margin-left: auto; margin-right: auto;' : ''}
          ${alignment === 'right' ? 'margin-left: auto;' : ''}
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: ${justifyContent};
          margin-bottom: 4rem;
        }

        .btn {
          font-family: '${this.settings.buttonFontFamily}', sans-serif;
          font-size: ${this.settings.buttonFontSize}px;
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          backdrop-filter: blur(10px);
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: var(--primary-button-bg);
          color: var(--primary-button-text);
          border: 2px solid var(--primary-button-bg);
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
        }

        .btn-primary:hover {
          background: var(--primary-button-hover);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(6, 182, 212, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--secondary-button-text);
          border: 2px solid var(--secondary-button-border);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
        }

        .btn-secondary:hover {
          background: var(--secondary-button-hover);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
          display: ${this.settings.showFloatingCards ? 'grid' : 'none'};
        }

        .feature-card {
          background: var(--card-background);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          position: relative;
          backdrop-filter: blur(10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: cardFloat 6s ease-in-out infinite;
        }

        .feature-card:nth-child(2) { animation-delay: 2s; }
        .feature-card:nth-child(3) { animation-delay: 4s; }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient1);
          opacity: 0;
          border-radius: 20px;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .feature-card:hover::before {
          opacity: 0.1;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: var(--card-glow);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: var(--gradient2);
          border-radius: 50%;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: white;
        }

        .feature-title {
          font-family: '${this.settings.titleFontFamily}', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--title-color);
          margin-bottom: 0.5rem;
        }

        .feature-subtitle {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          color: var(--subtitle-color);
          font-size: 0.9rem;
        }

        .glow-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, var(--card-glow) 0%, transparent 70%);
          opacity: 0.1;
          animation: glowPulse 4s ease-in-out infinite;
          display: ${this.settings.showGlowEffect ? 'block' : 'none'};
          pointer-events: none;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); }
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

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .hero-container {
            min-height: 100vh;
            padding: 2rem 0;
          }

          .main-content {
            padding: 0 1rem;
            text-align: center;
          }

          .hero-title {
            font-size: ${Math.round(this.settings.titleFontSize * 0.6)}px;
            margin-bottom: 1rem;
          }

          .hero-subtitle {
            font-size: ${Math.round(this.settings.subtitleFontSize * 0.9)}px;
            margin-bottom: 2rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            margin-bottom: 3rem;
          }

          .btn {
            width: 100%;
            max-width: 300px;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: 2rem;
          }

          .feature-card {
            padding: 1.5rem;
          }

          .glow-effect {
            width: 400px;
            height: 400px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: ${Math.round(this.settings.titleFontSize * 0.5)}px;
          }

          .hero-subtitle {
            font-size: ${Math.round(this.settings.subtitleFontSize * 0.8)}px;
          }

          .btn {
            padding: 0.8rem 1.5rem;
            font-size: ${Math.round(this.settings.buttonFontSize * 0.9)}px;
          }

          .feature-card {
            padding: 1rem;
          }

          .feature-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
        }
      </style>

      <main class="hero-container" role="main">
        <div class="background-pattern"></div>
        <div class="geometric-bg"></div>
        <div class="particles-container"></div>
        <div class="glow-effect"></div>

        <div class="main-content">
          <div class="hero-text">
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

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🤖</div>
              <h3 class="feature-title">${this.settings.feature1Title}</h3>
              <p class="feature-subtitle">${this.settings.feature1Subtitle}</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📈</div>
              <h3 class="feature-title">${this.settings.feature2Title}</h3>
              <p class="feature-subtitle">${this.settings.feature2Subtitle}</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔒</div>
              <h3 class="feature-title">${this.settings.feature3Title}</h3>
              <p class="feature-subtitle">${this.settings.feature3Subtitle}</p>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  initializeParticles() {
    if (!this.settings.showParticles) return;
    
    setTimeout(() => {
      const container = this.shadowRoot.querySelector('.particles-container');
      if (!container) return;

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        container.appendChild(particle);
      }
    }, 100);
  }

  updateElement(name) {
    if (!this.shadowRoot) return;
    
    // Re-render for major changes
    if (['hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
         'feature1-title', 'feature1-subtitle', 'feature2-title', 'feature2-subtitle',
         'feature3-title', 'feature3-subtitle', 'hero-alignment', 'show-particles',
         'show-floating-cards', 'show-glow-effect'].includes(name)) {
      this.render();
      if (name === 'show-particles') {
        this.initializeParticles();
      }
    }
  }
}

customElements.define('tech-hero-section', TechHeroSection);
