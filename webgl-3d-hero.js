class WebGL3DHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      // Content Settings
      heroTitle: 'Create Beyond Limits',
      heroSubtitle: 'We bring impossible ideas to life through cutting-edge design, immersive experiences, and breakthrough technology solutions.',
      primaryButtonText: 'Start Creating',
      secondaryButtonText: 'View Showcase',
      primaryButtonLink: '#create',
      secondaryButtonLink: '#showcase',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      
      // Creative Elements
      tagline: 'Innovation Meets Design',
      feature1Text: 'Interactive Experiences',
      feature2Text: 'Immersive Technology',
      feature3Text: 'Creative Excellence',
      
      // Simplified Color System (6 colors + 4 text colors)
      primaryBackground: '#0a0a0f',
      secondaryBackground: '#1a1a2e',
      borderColor: '#333458',
      vectorArtColor: '#ff6b6b',
      primaryAccent: '#4ecdc4',
      secondaryAccent: '#45b7d1',
      
      // Text Colors
      titleTextColor: '#ffffff',
      subtitleTextColor: '#b8c5d1',
      primaryButtonTextColor: '#ffffff',
      secondaryButtonTextColor: '#ffffff',
      
      // Gradient Preset
      gradientPreset: 'neon-purple',
      
      // Typography
      titleFontFamily: 'Inter',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: 64,
      subtitleFontSize: 20,
      buttonFontSize: 16,
      
      // Layout
      heroAlignment: 'center'
    };
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mouse = { x: 0, y: 0 };
    this.geometryObjects = [];
    this.particles = null;
    this.animationId = null;
    
    this.render();
    this.initWebGL();
  }

  static get observedAttributes() {
    return [
      'hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
      'primary-button-link', 'secondary-button-link', 'primary-button-target', 'secondary-button-target',
      'tagline', 'feature1-text', 'feature2-text', 'feature3-text',
      'primary-background', 'secondary-background', 'border-color', 'vector-art-color', 'primary-accent', 'secondary-accent',
      'title-text-color', 'subtitle-text-color', 'primary-button-text-color', 'secondary-button-text-color',
      'gradient-preset', 'title-font-family', 'subtitle-font-family', 'button-font-family',
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

  getGradientColors(preset) {
    const gradients = {
      // Popular & Basic Gradients
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
      
      // Dark & Moody Gradients
      'dark-slate': ['#0f172a', '#1e293b'],
      'midnight-black': ['#000000', '#1a1a1a'],
      'dark-navy': ['#0c1a2e', '#1a365d'],
      'black-gray': ['#000000', '#374151'],
      'dark-purple': ['#1e1b4b', '#581c87'],
      'dark-green': ['#14532d', '#166534'],
      'dark-red': ['#7f1d1d', '#991b1b'],
      'dark-blue': ['#1e40af', '#1e3a8a'],
      'charcoal': ['#1f2937', '#374151'],
      'dark-teal': ['#134e4a', '#0f766e'],
      'dark-violet': ['#4c1d95', '#6b21a8'],
      'dark-crimson': ['#7f1d1d', '#b91c1c'],
      'dark-forest': ['#14532d', '#15803d'],
      'dark-ocean': ['#0c4a6e', '#075985'],
      'dark-storm': ['#1e293b', '#334155'],
      'dark-ember': ['#7c2d12', '#dc2626'],
      'dark-twilight': ['#312e81', '#4338ca'],
      'dark-abyss': ['#0c0a09', '#292524'],
      'dark-void': ['#000000', '#0f172a'],
      'dark-matter': ['#111827', '#1f2937'],
      
      // Brand & Social Media Gradients
      'instagram': ['#833ab4', '#fd1d1d', '#fcb045'],
      'facebook': ['#3b5998', '#8b9dc3'],
      'twitter': ['#1da1f2', '#0d8bd9'],
      'spotify': ['#1db954', '#191414'],
      'netflix': ['#e50914', '#221f1f'],
      'discord': ['#7289da', '#5865f2'],
      'slack': ['#4a154b', '#36c5f0'],
      'zoom': ['#2d8cff', '#0080ff'],
      'figma': ['#f24e1e', '#a259ff'],
      'dribbble': ['#ea4c89', '#0d7377'],
      'behance': ['#1769ff', '#0057ff'],
      'youtube': ['#ff0000', '#cc0000'],
      'tiktok': ['#fe2c55', '#25f4ee'],
      'twitch': ['#9146ff', '#6441a5'],
      'whatsapp': ['#25d366', '#128c7e'],
      'telegram': ['#0088cc', '#00a0e9'],
      
      // Neon & Vibrant Gradients
      'neon-cyan': ['#00ffff', '#00bfff'],
      'neon-pink': ['#ff1493', '#ff69b4'],
      'neon-green': ['#00ff00', '#32cd32'],
      'neon-purple': ['#9400d3', '#8a2be2'],
      'neon-orange': ['#ff6600', '#ff4500'],
      'neon-blue': ['#0080ff', '#0066cc'],
      'neon-yellow': ['#ffff00', '#cccc00'],
      'electric-blue': ['#7df9ff', '#0080ff'],
      'electric-purple': ['#bf00ff', '#8b00ff'],
      'electric-green': ['#00ff7f', '#00cc66'],
      
      // Space & Cosmic Gradients
      'cosmic': ['#667eea', '#764ba2'],
      'nebula': ['#ff9a9e', '#fecfef'],
      'solar': ['#f093fb', '#f5576c'],
      'lunar': ['#4facfe', '#00f2fe'],
      'stellar': ['#43e97b', '#38f9d7'],
      'galactic': ['#fa709a', '#fee140'],
      'quantum': ['#a8edea', '#fed6e3'],
      'black-hole': ['#000000', '#434343'],
      'supernova': ['#ff6b6b', '#ffd93d'],
      'comet': ['#74b9ff', '#0984e3'],
      'meteor': ['#ff7675', '#fd79a8'],
      'asteroid': ['#636e72', '#2d3436'],
      
      // Tech & Digital Gradients
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
      'binary': ['#00ff00', '#000000'],
      'circuit': ['#00ffff', '#0080ff'],
      'code': ['#00c851', '#007e33'],
      'data': ['#007bff', '#0056b3']
    };
    return gradients[preset] || gradients['neon-purple'];
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
          --title-text-color: ${this.settings.titleTextColor};
          --subtitle-text-color: ${this.settings.subtitleTextColor};
          --primary-button-text-color: ${this.settings.primaryButtonTextColor};
          --secondary-button-text-color: ${this.settings.secondaryButtonTextColor};
          --gradient1: ${gradient1};
          
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
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary-background);
        }

        .webgl-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          width: 100%;
          padding: 0 2rem;
          text-align: ${textAlign};
          background: rgba(10, 10, 15, 0.3);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid var(--border-color);
          margin: 2rem;
          padding: 4rem 3rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          animation: heroContentFade 2s ease-out;
        }

        @keyframes heroContentFade {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .tagline {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: 0.9rem;
          color: var(--vector-art-color);
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 1rem;
          font-weight: 600;
          animation: slideInFromTop 1s ease-out 0.5s both;
        }

        .hero-title {
          font-family: '${this.settings.titleFontFamily}', sans-serif;
          font-size: ${this.settings.titleFontSize}px;
          font-weight: 800;
          color: var(--title-text-color);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: var(--gradient1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: slideInFromLeft 1s ease-out 0.7s both;
        }

        .hero-subtitle {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: ${this.settings.subtitleFontSize}px;
          color: var(--subtitle-text-color);
          line-height: 1.6;
          margin-bottom: 3rem;
          max-width: 600px;
          ${alignment === 'center' ? 'margin-left: auto; margin-right: auto; margin-bottom: 3rem;' : ''}
          ${alignment === 'right' ? 'margin-left: auto; margin-bottom: 3rem;' : ''}
          animation: slideInFromRight 1s ease-out 0.9s both;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
          justify-content: ${justifyContent};
          animation: slideInFromBottom 1s ease-out 1.1s both;
        }

        .btn {
          font-family: '${this.settings.buttonFontFamily}', sans-serif;
          font-size: ${this.settings.buttonFontSize}px;
          font-weight: 600;
          padding: 1.2rem 2.5rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          backdrop-filter: blur(10px);
          border: 2px solid transparent;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s ease;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: var(--gradient1);
          color: var(--primary-button-text-color);
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 40px rgba(255, 107, 107, 0.6);
        }

        .btn-secondary {
          background: rgba(78, 205, 196, 0.1);
          color: var(--secondary-button-text-color);
          border: 2px solid var(--primary-accent);
          box-shadow: 0 10px 30px rgba(78, 205, 196, 0.2);
        }

        .btn-secondary:hover {
          background: var(--primary-accent);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 20px 40px rgba(78, 205, 196, 0.4);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          animation: slideInFromBottom 1s ease-out 1.3s both;
        }

        .feature-item {
          text-align: ${textAlign};
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          border: 1px solid var(--border-color);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient1);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .feature-item:hover::before {
          opacity: 0.1;
        }

        .feature-item:hover {
          transform: translateY(-5px);
          border-color: var(--vector-art-color);
          box-shadow: 0 15px 35px rgba(255, 107, 107, 0.2);
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          background: var(--gradient1);
          border-radius: 50%;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          ${alignment === 'left' ? 'margin-left: 0;' : ''}
          ${alignment === 'right' ? 'margin-right: 0;' : ''}
        }

        .feature-text {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          color: var(--subtitle-text-color);
          font-size: 1rem;
          font-weight: 500;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: var(--vector-art-color);
          font-size: 2rem;
          animation: float 3s ease-in-out infinite;
          cursor: pointer;
          z-index: 10;
        }

        .scroll-indicator::after {
          content: '↓';
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-15px);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .hero-content {
            margin: 1rem;
            padding: 3rem 2rem;
          }

          .hero-title {
            font-size: ${Math.round(this.settings.titleFontSize * 0.7)}px;
            text-align: center;
          }

          .hero-subtitle {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 2.5rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .feature-item {
            text-align: center;
          }

          .feature-icon {
            margin-left: auto;
            margin-right: auto;
          }

          .tagline {
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            margin: 0.5rem;
            padding: 2rem 1.5rem;
          }

          .hero-title {
            font-size: ${Math.round(this.settings.titleFontSize * 0.5)}px;
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
            text-align: center;
          }

          .features-grid {
            gap: 1rem;
          }

          .feature-item {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: ${Math.round(this.settings.titleFontSize * 0.4)}px;
          }

          .hero-subtitle {
            font-size: ${Math.round(this.settings.subtitleFontSize * 0.8)}px;
          }

          .btn {
            padding: 1rem 2rem;
            font-size: ${Math.round(this.settings.buttonFontSize * 0.9)}px;
          }

          .tagline {
            font-size: 0.8rem;
            letter-spacing: 2px;
          }
        }
      </style>

      <main class="hero-container" role="main">
        <canvas class="webgl-canvas"></canvas>
        
        <div class="hero-content">
          <div class="tagline">${this.settings.tagline}</div>
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

          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">✨</div>
              <div class="feature-text">${this.settings.feature1Text}</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🚀</div>
              <div class="feature-text">${this.settings.feature2Text}</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">💎</div>
              <div class="feature-text">${this.settings.feature3Text}</div>
            </div>
          </div>
        </div>

        <div class="scroll-indicator"></div>
      </main>
    `;
  }

  async initWebGL() {
    // Wait for Three.js to load from CDN
    await this.loadThreeJS();
    
    setTimeout(() => {
      this.setupScene();
      this.createGeometry();
      this.createParticles();
      this.setupEventListeners();
      this.animate();
    }, 100);
  }

  loadThreeJS() {
    return new Promise((resolve, reject) => {
      if (window.THREE) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  setupScene() {
    const canvas = this.shadowRoot.querySelector('.webgl-canvas');
    if (!canvas || !window.THREE) return;

    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    // Camera position
    this.camera.position.z = 5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
  }

  createGeometry() {
    if (!window.THREE) return;

    const gradientColors = this.getGradientColors(this.settings.gradientPreset);
    const color1 = new THREE.Color(gradientColors[0]);
    const color2 = new THREE.Color(gradientColors[1] || gradientColors[0]);

    // Create various geometric shapes
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32),
      new THREE.ConeGeometry(0.7, 1.5, 32),
      new THREE.TorusGeometry(0.7, 0.2, 16, 100),
      new THREE.IcosahedronGeometry(0.8, 0)
    ];

    for (let i = 0; i < 8; i++) {
      const geometry = geometries[i % geometries.length];
      const material = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? color1 : color2,
        transparent: true,
        opacity: 0.8,
        shininess: 100
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      // Random positioning
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 5;
      
      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      // Store initial position and rotation for animation
      mesh.userData = {
        initialX: mesh.position.x,
        initialY: mesh.position.y,
        initialZ: mesh.position.z,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        floatSpeed: (Math.random() - 0.5) * 0.01
      };

      this.geometryObjects.push(mesh);
      this.scene.add(mesh);
    }
  }

  createParticles() {
    if (!window.THREE) return;

    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const gradientColors = this.getGradientColors(this.settings.gradientPreset);
    const color1 = new THREE.Color(gradientColors[0]);
    const color2 = new THREE.Color(gradientColors[1] || gradientColors[0]);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Positions
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      // Colors
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }

  setupEventListeners() {
    // Mouse movement for camera interaction
    const updateMouse = (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('touchmove', (event) => {
      if (event.touches.length > 0) {
        updateMouse(event.touches[0]);
      }
    });

    // Resize handler
    window.addEventListener('resize', () => {
      if (this.camera && this.renderer) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    });
  }

  animate() {
    if (!this.scene || !this.camera || !this.renderer) return;

    const time = Date.now() * 0.001;

    // Animate geometric objects
    this.geometryObjects.forEach((mesh, index) => {
      if (mesh.userData) {
        // Rotation
        mesh.rotation.x += mesh.userData.rotationSpeed;
        mesh.rotation.y += mesh.userData.rotationSpeed * 0.7;
        
        // Floating motion
        mesh.position.y = mesh.userData.initialY + Math.sin(time + index) * 0.5;
        mesh.position.x = mesh.userData.initialX + Math.cos(time * 0.5 + index) * 0.3;
      }
    });

    // Animate particles
    if (this.particles) {
      this.particles.rotation.y = time * 0.1;
      this.particles.rotation.x = time * 0.05;
    }

    // Camera mouse interaction
    this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouse.y * 0.5 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  disconnectedCallback() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    // Clean up Three.js objects
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  updateElement(name) {
    if (!this.shadowRoot) return;
    
    // Re-render for major changes
    if (['hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
         'tagline', 'feature1-text', 'feature2-text', 'feature3-text',
         'hero-alignment', 'gradient-preset', 'primary-background', 'secondary-background',
         'border-color', 'vector-art-color', 'primary-accent', 'secondary-accent',
         'title-text-color', 'subtitle-text-color', 'primary-button-text-color', 'secondary-button-text-color'].includes(name)) {
      this.render();
      
      // Reinitialize WebGL if gradient changes (affects 3D colors)
      if (name === 'gradient-preset') {
        setTimeout(() => {
          this.initWebGL();
        }, 100);
      }
    }
  }
}

customElements.define('webgl-3d-hero', WebGL3DHero);
