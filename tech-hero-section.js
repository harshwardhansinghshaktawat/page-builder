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
      
      // Simplified Color System (6 colors only)
      primaryBackground: '#0a0a0f',
      secondaryBackground: '#1a1a2e',
      borderColor: '#334155',
      vectorArtColor: '#06b6d4',
      primaryAccent: '#3b82f6',
      secondaryAccent: '#8b5cf6',
      
      // Gradient Preset
      gradientPreset: 'cyan-blue',
      
      // Typography
      titleFontFamily: 'Inter',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: 64,
      subtitleFontSize: 20,
      buttonFontSize: 16,
      
      // Layout
      heroAlignment: 'center',
      
      // Features with custom icons
      feature1Title: 'AI-Powered',
      feature1Subtitle: 'Smart automation',
      feature1Icon: '🤖',
      feature2Title: 'Scalable',
      feature2Subtitle: 'Growth ready',
      feature2Icon: '📈',
      feature3Title: 'Secure',
      feature3Subtitle: 'Enterprise grade',
      feature3Icon: '🔒',
      
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
      'primary-background', 'secondary-background', 'border-color', 'vector-art-color', 'primary-accent', 'secondary-accent',
      'gradient-preset', 'title-font-family', 'subtitle-font-family', 'button-font-family',
      'title-font-size', 'subtitle-font-size', 'button-font-size', 'hero-alignment',
      'feature1-title', 'feature1-subtitle', 'feature1-icon',
      'feature2-title', 'feature2-subtitle', 'feature2-icon',
      'feature3-title', 'feature3-subtitle', 'feature3-icon',
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

  getGradientColors(preset) {
    const gradients = {
      'cyan-blue': ['#06b6d4', '#3b82f6'],
      'purple-pink': ['#8b5cf6', '#ec4899'],
      'orange-red': ['#f59e0b', '#ef4444'],
      'green-teal': ['#10b981', '#14b8a6'],
      'blue-indigo': ['#3b82f6', '#6366f1'],
      'pink-rose': ['#ec4899', '#f43f5e'],
      'yellow-orange': ['#eab308', '#f97316'],
      'teal-cyan': ['#14b8a6', '#06b6d4'],
      'indigo-purple': ['#6366f1', '#8b5cf6'],
      'rose-pink': ['#f43f5e', '#ec4899'],
      'lime-green': ['#84cc16', '#22c55e'],
      'amber-yellow': ['#f59e0b', '#eab308'],
      'sky-blue': ['#0ea5e9', '#3b82f6'],
      'violet-purple': ['#8b5cf6', '#7c3aed'],
      'emerald-green': ['#10b981', '#059669'],
      'red-orange': ['#ef4444', '#f97316'],
      'slate-gray': ['#64748b', '#475569'],
      'zinc-gray': ['#71717a', '#52525b'],
      'stone-brown': ['#78716c', '#57534e'],
      'neutral-gray': ['#737373', '#525252'],
      'warm-gray': ['#8b7355', '#6b5b47'],
      'cool-gray': ['#6b7280', '#4b5563'],
      'blue-gray': ['#64748b', '#475569'],
      'dark-blue': ['#1e40af', '#1e3a8a'],
      'dark-purple': ['#7c2d12', '#581c87'],
      'dark-green': ['#14532d', '#166534'],
      'dark-red': ['#7f1d1d', '#991b1b'],
      'light-blue': ['#bfdbfe', '#93c5fd'],
      'light-purple': ['#e9d5ff', '#c4b5fd'],
      'light-green': ['#bbf7d0', '#86efac'],
      'light-red': ['#fecaca', '#fca5a5'],
      'neon-cyan': ['#00ffff', '#00bfff'],
      'neon-pink': ['#ff1493', '#ff69b4'],
      'neon-green': ['#00ff00', '#32cd32'],
      'neon-purple': ['#9400d3', '#8a2be2'],
      'sunset': ['#ff7e5f', '#feb47b'],
      'ocean': ['#667eea', '#764ba2'],
      'forest': ['#11998e', '#38ef7d'],
      'galaxy': ['#667db6', '#0082c8'],
      'aurora': ['#a8edea', '#fed6e3'],
      'fire': ['#ff512f', '#dd2476'],
      'ice': ['#74b9ff', '#0984e3'],
      'gold': ['#f7971e', '#ffd200'],
      'silver': ['#bdc3c7', '#2c3e50'],
      'bronze': ['#cd7f32', '#8b4513'],
      'rainbow': ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'],
      'midnight': ['#0f0f23', '#1a1a2e'],
      'dawn': ['#ff9a9e', '#fecfef'],
      'dusk': ['#4568dc', '#b06ab3'],
      'spring': ['#a8e6cf', '#88d8a3'],
      'summer': ['#ffd89b', '#19547b'],
      'autumn': ['#d66d75', '#e29587'],
      'winter': ['#eef2f3', '#8e9eab'],
      'cosmic': ['#667eea', '#764ba2'],
      'nebula': ['#ff9a9e', '#fecfef'],
      'solar': ['#f093fb', '#f5576c'],
      'lunar': ['#4facfe', '#00f2fe'],
      'stellar': ['#43e97b', '#38f9d7'],
      'galactic': ['#fa709a', '#fee140'],
      'quantum': ['#a8edea', '#fed6e3'],
      'matrix': ['#00ff41', '#008f11'],
      'cyber': ['#00d4ff', '#090979'],
      'digital': ['#667eea', '#764ba2'],
      'virtual': ['#f093fb', '#f5576c'],
      'hologram': ['#4facfe', '#00f2fe'],
      'neon': ['#08fdd8', '#09fbd3'],
      'plasma': ['#f093fb', '#f5576c'],
      'laser': ['#ff0844', '#ffb199'],
      'electric': ['#667eea', '#764ba2'],
      'magnetic': ['#f093fb', '#f5576c'],
      'atomic': ['#4facfe', '#00f2fe'],
      'molecular': ['#43e97b', '#38f9d7'],
      'quantum-blue': ['#667eea', '#764ba2'],
      'quantum-purple': ['#f093fb', '#f5576c'],
      'quantum-green': ['#43e97b', '#38f9d7'],
      'quantum-orange': ['#fa709a', '#fee140'],
      'deep-sea': ['#2b5876', '#4e4376'],
      'mountain': ['#870000', '#190a05'],
      'desert': ['#f7931e', '#c471f5'],
      'tundra': ['#a8e6cf', '#88d8a3'],
      'tropical': ['#ff9a9e', '#fecfef'],
      'arctic': ['#eef2f3', '#8e9eab'],
      'volcanic': ['#ff512f', '#dd2476'],
      'crystal': ['#667eea', '#764ba2'],
      'diamond': ['#f093fb', '#f5576c'],
      'emerald': ['#11998e', '#38ef7d'],
      'ruby': ['#ff0844', '#ffb199'],
      'sapphire': ['#667eea', '#764ba2'],
      'amethyst': ['#f093fb', '#f5576c']
    };
    return gradients[preset] || gradients['cyan-blue'];
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

    const gradientColors = this.getGradientColors(this.settings.gradientPreset);
    const gradient1 = `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1] || gradientColors[0]})`;
    const gradient2 = `linear-gradient(135deg, ${this.settings.primaryAccent}, ${this.settings.secondaryAccent})`;

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&family=Poppins:wght@300;400;500;600;700&display=swap');
        
        :host {
          --primary-background: ${this.settings.primaryBackground};
          --secondary-background: ${this.settings.secondaryBackground};
          --border-color: ${this.settings.borderColor};
          --vector-art-color: ${this.settings.vectorArtColor};
          --primary-accent: ${this.settings.primaryAccent};
          --secondary-accent: ${this.settings.secondaryAccent};
          --gradient1: ${gradient1};
          --gradient2: ${gradient2};
          
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
          background: var(--primary-background);
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
            radial-gradient(circle at 20% 20%, var(--primary-accent) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, var(--secondary-accent) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, var(--vector-art-color) 0%, transparent 50%);
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
          background: var(--vector-art-color);
          border-radius: 50%;
          animation: particleFloat 8s ease-in-out infinite;
        }

        .particle:nth-child(2n) { 
          background: var(--primary-accent); 
          animation-delay: 2s; 
        }
        
        .particle:nth-child(3n) { 
          background: var(--secondary-accent); 
          animation-delay: 4s; 
        }

        @keyframes particleFloat {
          0% { 
            transform: translateY(100vh) translateX(0px); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
          }
          90% { 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-100px) translateX(50px); 
            opacity: 0; 
          }
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
          color: #ffffff;
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
          color: #94a3b8;
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
          background: var(--primary-accent);
          color: #ffffff;
          border: 2px solid var(--primary-accent);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover {
          background: var(--vector-art-color);
          border-color: var(--vector-art-color);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 2px solid var(--border-color);
          box-shadow: 0 0 20px rgba(51, 65, 85, 0.2);
        }

        .btn-secondary:hover {
          background: var(--secondary-accent);
          border-color: var(--secondary-accent);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
          display: ${this.settings.showFloatingCards ? 'grid' : 'none'};
        }

        .feature-card {
          background: var(--secondary-background);
          border: 1px solid var(--border-color);
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
          border-color: var(--vector-art-color);
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
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .feature-subtitle {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .glow-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, var(--vector-art-color) 0%, transparent 70%);
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
              <div class="feature-icon">${this.settings.feature1Icon}</div>
              <h3 class="feature-title">${this.settings.feature1Title}</h3>
              <p class="feature-subtitle">${this.settings.feature1Subtitle}</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">${this.settings.feature2Icon}</div>
              <h3 class="feature-title">${this.settings.feature2Title}</h3>
              <p class="feature-subtitle">${this.settings.feature2Subtitle}</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">${this.settings.feature3Icon}</div>
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

      // Clear existing particles
      container.innerHTML = '';

      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Start from bottom of screen
        particle.style.bottom = '-10px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 8 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        container.appendChild(particle);
      }
    }, 100);
  }

  updateElement(name) {
    if (!this.shadowRoot) return;
    
    // Re-render for major changes
    if (['hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
         'feature1-title', 'feature1-subtitle', 'feature1-icon',
         'feature2-title', 'feature2-subtitle', 'feature2-icon',
         'feature3-title', 'feature3-subtitle', 'feature3-icon',
         'hero-alignment', 'show-particles', 'show-floating-cards', 'show-glow-effect',
         'gradient-preset', 'primary-background', 'secondary-background', 'border-color',
         'vector-art-color', 'primary-accent', 'secondary-accent'].includes(name)) {
      this.render();
      if (name === 'show-particles') {
        this.initializeParticles();
      }
    }
  }
}

customElements.define('tech-hero-section', TechHeroSection);
