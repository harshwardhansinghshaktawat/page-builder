class VisualPortfolioHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      // Content Settings
      heroTitle: 'Visual Storytelling',
      heroSubtitle: 'Where creativity meets innovation. We craft immersive visual experiences that captivate, inspire, and transform brands into unforgettable stories.',
      primaryButtonText: 'View Portfolio',
      secondaryButtonText: 'Get In Touch',
      primaryButtonLink: '#portfolio',
      secondaryButtonLink: '#contact',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      
      // Creative Elements
      tagline: 'Creative Studio',
      statsNumber: '150+',
      statsLabel: 'Projects Delivered',
      
      // Portfolio Images (6 floating image cards)
      image1: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      image2: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      image3: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      image4: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      image5: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      image6: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      
      // Background Image
      backgroundImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      
      // Simplified Color System (6 colors + 4 text colors)
      primaryBackground: '#0f0f0f',
      secondaryBackground: '#1a1a1a',
      borderColor: '#333333',
      vectorArtColor: '#ff6b35',
      primaryAccent: '#4facfe',
      secondaryAccent: '#00f2fe',
      
      // Text Colors
      titleTextColor: '#ffffff',
      subtitleTextColor: '#cccccc',
      primaryButtonTextColor: '#ffffff',
      secondaryButtonTextColor: '#ffffff',
      
      // Gradient Preset
      gradientPreset: 'sunset',
      
      // Typography
      titleFontFamily: 'Inter',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: 72,
      subtitleFontSize: 18,
      buttonFontSize: 16,
      
      // Layout
      heroAlignment: 'left'
    };
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mouse = { x: 0, y: 0 };
    this.imageCards = [];
    this.backgroundMesh = null;
    this.animationId = null;
    this.raycaster = null;
    this.clock = null;
    this.currentActiveIndex = 0;
    
    this.render();
    this.initWebGL();
  }

  static get observedAttributes() {
    return [
      'hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
      'primary-button-link', 'secondary-button-link', 'primary-button-target', 'secondary-button-target',
      'tagline', 'stats-number', 'stats-label', 'background-image',
      'image1', 'image2', 'image3', 'image4', 'image5', 'image6',
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
      
      // Nature & Visual Gradients (Perfect for portfolio)
      'sunset': ['#ff7e5f', '#feb47b'],
      'ocean': ['#667eea', '#764ba2'],
      'forest': ['#11998e', '#38ef7d'],
      'galaxy': ['#667db6', '#0082c8'],
      'aurora': ['#a8edea', '#fed6e3'],
      'fire': ['#ff512f', '#dd2476'],
      'ice': ['#74b9ff', '#0984e3'],
      'dawn': ['#ff9a9e', '#fecfef'],
      'dusk': ['#4568dc', '#b06ab3'],
      'spring': ['#a8e6cf', '#88d8a3'],
      'summer': ['#ffd89b', '#19547b'],
      'autumn': ['#d66d75', '#e29587'],
      'winter': ['#eef2f3', '#8e9eab'],
      'desert': ['#f7931e', '#c471f5'],
      'tropical': ['#ff9a9e', '#fecfef'],
      'volcanic': ['#ff512f', '#dd2476'],
      'deep-sea': ['#2b5876', '#4e4376'],
      'mountain': ['#870000', '#190a05'],
      
      // Artistic & Creative Gradients
      'vintage': ['#d2691e', '#cd853f'],
      'sepia': ['#704214', '#a0522d'],
      'retro': ['#ff6b35', '#f7931e'],
      'classic': ['#8b4513', '#daa520'],
      'modern': ['#667eea', '#764ba2'],
      'minimalist': ['#64748b', '#475569'],
      'bold': ['#ff006e', '#8338ec'],
      'elegant': ['#f093fb', '#f5576c'],
      'dynamic': ['#43e97b', '#38f9d7'],
      'creative': ['#fa709a', '#fee140'],
      
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
      'dark-ocean': ['#0c4a6e', '#075985'],
      
      // Metallic & Luxury Gradients
      'gold': ['#f7971e', '#ffd200'],
      'silver': ['#bdc3c7', '#2c3e50'],
      'bronze': ['#cd7f32', '#8b4513'],
      'platinum': ['#e5e4e2', '#a8a8a8'],
      'rose-gold': ['#f4c2c2', '#ff6b6b'],
      'copper': ['#b87333', '#da8a67']
    };
    return gradients[preset] || gradients['sunset'];
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
          background: var(--primary-background);
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('${this.settings.backgroundImage}');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          opacity: 0.15;
          z-index: 1;
        }

        .webgl-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 0 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 100vh;
        }

        .content-left {
          animation: slideInFromLeft 1.2s ease-out;
        }

        .content-right {
          position: relative;
          height: 600px;
          animation: slideInFromRight 1.2s ease-out;
        }

        .tagline {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: 0.875rem;
          color: var(--vector-art-color);
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 1rem;
          font-weight: 600;
          animation: fadeInUp 1s ease-out 0.3s both;
        }

        .hero-title {
          font-family: '${this.settings.titleFontFamily}', sans-serif;
          font-size: ${this.settings.titleFontSize}px;
          font-weight: 800;
          color: var(--title-text-color);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          position: relative;
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .hero-title .gradient-word {
          background: var(--gradient1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        .hero-subtitle {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: ${this.settings.subtitleFontSize}px;
          color: var(--subtitle-text-color);
          line-height: 1.7;
          margin-bottom: 2.5rem;
          max-width: 500px;
          animation: fadeInUp 1s ease-out 0.7s both;
        }

        .stats-container {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
          animation: fadeInUp 1s ease-out 0.9s both;
        }

        .stats-number {
          font-family: '${this.settings.titleFontFamily}', sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--vector-art-color);
          line-height: 1;
        }

        .stats-label {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          color: var(--subtitle-text-color);
          font-size: 1rem;
          font-weight: 500;
        }

        .stats-divider {
          width: 2px;
          height: 60px;
          background: var(--gradient1);
          border-radius: 1px;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out 1.1s both;
        }

        .btn {
          font-family: '${this.settings.buttonFontFamily}', sans-serif;
          font-size: ${this.settings.buttonFontSize}px;
          font-weight: 600;
          padding: 1.2rem 2.5rem;
          border-radius: 60px;
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s ease;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: var(--gradient1);
          color: var(--primary-button-text-color);
          box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 25px 50px rgba(255, 107, 53, 0.6);
        }

        .btn-secondary {
          background: rgba(79, 172, 254, 0.1);
          color: var(--secondary-button-text-color);
          border: 2px solid var(--primary-accent);
          box-shadow: 0 15px 35px rgba(79, 172, 254, 0.2);
        }

        .btn-secondary:hover {
          background: var(--primary-accent);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 25px 50px rgba(79, 172, 254, 0.4);
        }

        .floating-ui {
          position: absolute;
          bottom: 2rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 1rem;
          z-index: 15;
          animation: fadeInUp 1s ease-out 1.3s both;
        }

        .ui-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--vector-art-color);
          opacity: 0.6;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .ui-indicator.active {
          opacity: 1;
          transform: scale(1.3);
          background: var(--gradient1);
        }

        .ui-indicator:hover {
          opacity: 1;
          transform: scale(1.2);
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 2rem;
            text-align: center;
          }

          .content-right {
            order: -1;
            height: 400px;
          }

          .hero-title {
            font-size: ${Math.round(this.settings.titleFontSize * 0.7)}px;
          }

          .hero-subtitle {
            max-width: 100%;
          }

          .stats-container {
            justify-content: center;
          }

          .hero-buttons {
            justify-content: center;
          }

          .tagline {
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 1.5rem;
            gap: 2rem;
          }

          .content-right {
            height: 300px;
          }

          .hero-title {
            font-size: ${Math.round(this.settings.titleFontSize * 0.5)}px;
            margin-bottom: 1rem;
          }

          .hero-subtitle {
            font-size: ${Math.round(this.settings.subtitleFontSize * 0.9)}px;
            margin-bottom: 2rem;
          }

          .stats-container {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .stats-divider {
            width: 60px;
            height: 2px;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .btn {
            width: 100%;
            max-width: 300px;
            text-align: center;
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

          .stats-number {
            font-size: 2.5rem;
          }

          .tagline {
            font-size: 0.75rem;
            letter-spacing: 3px;
          }
        }
      </style>

      <main class="hero-container" role="main">
        <div class="background-overlay"></div>
        <canvas class="webgl-canvas"></canvas>
        
        <div class="hero-content">
          <div class="content-left">
            <div class="tagline">${this.settings.tagline}</div>
            <h1 class="hero-title">
              <span class="gradient-word">Visual</span> ${this.settings.heroTitle.replace('Visual', '')}
            </h1>
            <p class="hero-subtitle">${this.settings.heroSubtitle}</p>
            
            <div class="stats-container">
              <div>
                <div class="stats-number">${this.settings.statsNumber}</div>
                <div class="stats-label">${this.settings.statsLabel}</div>
              </div>
              <div class="stats-divider"></div>
              <div class="stats-label">Creating visual<br>experiences since 2018</div>
            </div>

            <div class="hero-buttons">
              <a href="${this.settings.primaryButtonLink}" target="${this.settings.primaryButtonTarget}" class="btn btn-primary">
                ${this.settings.primaryButtonText}
              </a>
              <a href="${this.settings.secondaryButtonLink}" target="${this.settings.secondaryButtonTarget}" class="btn btn-secondary">
                ${this.settings.secondaryButtonText}
              </a>
            </div>
          </div>

          <div class="content-right">
            <!-- WebGL Image Gallery will render here -->
          </div>
        </div>

        <div class="floating-ui">
          <div class="ui-indicator active"></div>
          <div class="ui-indicator"></div>
          <div class="ui-indicator"></div>
          <div class="ui-indicator"></div>
          <div class="ui-indicator"></div>
          <div class="ui-indicator"></div>
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
      this.createImageCards();
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
    this.camera.position.z = 8;
    this.camera.position.x = 2;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5);
    this.scene.add(directionalLight);

    // Raycaster for interaction
    this.raycaster = new THREE.Raycaster();
    this.clock = new THREE.Clock();
  }

  createImageCards() {
    if (!window.THREE) return;

    const loader = new THREE.TextureLoader();
    const images = [
      this.settings.image1,
      this.settings.image2,
      this.settings.image3,
      this.settings.image4,
      this.settings.image5,
      this.settings.image6
    ];

    // Circular arrangement for elegant showcase
    const radius = 4;
    const angleStep = (Math.PI * 2) / images.length;

    images.forEach((imageUrl, index) => {
      const texture = loader.load(imageUrl, (loadedTexture) => {
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
      });

      // Larger, more prominent images
      const geometry = new THREE.PlaneGeometry(2.5, 3.2);
      const material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        opacity: index === 0 ? 1.0 : 0.6
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      // Circular positioning
      const angle = angleStep * index;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      mesh.position.set(x, 0, z);
      mesh.rotation.y = -angle + Math.PI; // Face towards center
      mesh.rotation.x = 0.05; // Slight tilt for elegance

      // Store values for animation
      mesh.userData = {
        initialPosition: mesh.position.clone(),
        initialRotation: mesh.rotation.clone(),
        index: index,
        targetOpacity: index === 0 ? 1.0 : 0.6,
        currentOpacity: index === 0 ? 1.0 : 0.6,
        isActive: index === 0,
        angle: angle,
        baseScale: index === 0 ? 1.1 : 0.9
      };

      // Add elegant shadow/glow effect
      const shadowGeometry = new THREE.PlaneGeometry(2.7, 3.4);
      const gradientColors = this.getGradientColors(this.settings.gradientPreset);
      const shadowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(gradientColors[0]),
        transparent: true,
        opacity: index === 0 ? 0.3 : 0.1
      });
      const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
      shadow.position.copy(mesh.position);
      shadow.position.z -= 0.02;
      shadow.rotation.copy(mesh.rotation);
      
      mesh.userData.shadow = shadow;

      this.scene.add(shadow);
      this.scene.add(mesh);
      this.imageCards.push(mesh);
    });

    this.currentActiveIndex = 0;
  }

  setupEventListeners() {
    // Mouse movement for subtle camera interaction
    const updateMouse = (event) => {
      const rect = this.shadowRoot.querySelector('.webgl-canvas').getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('touchmove', (event) => {
      if (event.touches.length > 0) {
        updateMouse(event.touches[0]);
      }
    });

    // Hover detection for individual images
    const handleMouseMove = (event) => {
      updateMouse(event);
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.imageCards);
      
      // Reset all cards hover state
      this.imageCards.forEach(card => {
        card.userData.hovered = false;
      });
      
      // Set hovered card
      if (intersects.length > 0) {
        const hoveredCard = intersects[0].object;
        hoveredCard.userData.hovered = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    window.addEventListener('resize', () => {
      if (this.camera && this.renderer) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    });

    // UI indicator interaction with elegant transitions
    const indicators = this.shadowRoot.querySelectorAll('.ui-indicator');
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        // Remove active class from all indicators
        indicators.forEach(ind => ind.classList.remove('active'));
        // Add active class to clicked indicator
        indicator.classList.add('active');
        
        // Smooth transition to selected image
        this.transitionToImage(index);
      });
    });
  }

  transitionToImage(targetIndex) {
    if (targetIndex === this.currentActiveIndex) return;
    
    const duration = 1200; // 1.2 seconds for elegant transition
    const startTime = Date.now();
    
    // Calculate rotation needed to bring target image to front
    const currentAngle = this.imageCards[this.currentActiveIndex].userData.angle;
    const targetAngle = this.imageCards[targetIndex].userData.angle;
    let rotationDiff = targetAngle - currentAngle;
    
    // Choose shortest rotation path
    if (rotationDiff > Math.PI) rotationDiff -= Math.PI * 2;
    if (rotationDiff < -Math.PI) rotationDiff += Math.PI * 2;
    
    const startRotation = 0;
    const targetRotation = -rotationDiff;
    
    // Store initial states
    this.imageCards.forEach((card, index) => {
      card.userData.startOpacity = card.userData.currentOpacity;
      card.userData.startScale = card.userData.baseScale;
      card.userData.targetOpacityNew = index === targetIndex ? 1.0 : 0.6;
      card.userData.targetScaleNew = index === targetIndex ? 1.1 : 0.9;
      card.userData.isActive = index === targetIndex;
    });
    
    const animateTransition = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Elegant easing function (ease-in-out-cubic)
      const eased = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      // Rotate the entire gallery
      const currentRotation = startRotation + (targetRotation - startRotation) * eased;
      this.imageCards.forEach((card) => {
        const baseAngle = card.userData.angle;
        const newAngle = baseAngle + currentRotation;
        const radius = 4;
        
        card.position.x = Math.cos(newAngle) * radius;
        card.position.z = Math.sin(newAngle) * radius;
        card.rotation.y = -newAngle + Math.PI;
        
        // Smooth opacity transition
        card.userData.currentOpacity = card.userData.startOpacity + 
          (card.userData.targetOpacityNew - card.userData.startOpacity) * eased;
        card.material.opacity = card.userData.currentOpacity;
        
        // Smooth scale transition
        card.userData.baseScale = card.userData.startScale + 
          (card.userData.targetScaleNew - card.userData.startScale) * eased;
        card.scale.setScalar(card.userData.baseScale);
        
        // Update shadow opacity
        if (card.userData.shadow) {
          card.userData.shadow.material.opacity = card.userData.currentOpacity * 0.3;
        }
      });
      
      if (progress < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        this.currentActiveIndex = targetIndex;
      }
    };
    
    animateTransition();
  }

  animate() {
    if (!this.scene || !this.camera || !this.renderer) return;

    const time = this.clock.getElapsedTime();

    // Animate image cards with elegant floating motion
    this.imageCards.forEach((card, index) => {
      if (card.userData) {
        // Subtle floating animation
        const floatOffset = Math.sin(time * 0.8 + index * 0.5) * 0.02;
        card.position.y = floatOffset;
        
        // Gentle breathing scale for active image
        if (card.userData.isActive) {
          const breathe = 1 + Math.sin(time * 1.2) * 0.01;
          card.scale.setScalar(card.userData.baseScale * breathe);
        }
        
        // Hover effect - elegant glow and slight scale
        if (card.userData.hovered && !card.userData.isActive) {
          card.userData.targetOpacity = Math.min(card.userData.currentOpacity + 0.02, 0.85);
          const hoverScale = 1.03;
          card.scale.setScalar(card.userData.baseScale * hoverScale);
          
          // Enhanced shadow glow on hover
          if (card.userData.shadow) {
            card.userData.shadow.material.opacity = Math.min(card.userData.shadow.material.opacity + 0.01, 0.4);
          }
        } else if (!card.userData.isActive) {
          card.userData.targetOpacity = Math.max(card.userData.currentOpacity - 0.01, 0.6);
          card.scale.setScalar(card.userData.baseScale);
          
          // Reset shadow glow
          if (card.userData.shadow) {
            card.userData.shadow.material.opacity = Math.max(card.userData.shadow.material.opacity - 0.005, 0.1);
          }
        }
        
        // Smooth opacity transitions
        card.userData.currentOpacity += (card.userData.targetOpacity - card.userData.currentOpacity) * 0.1;
        card.material.opacity = card.userData.currentOpacity;
      }
    });

    // Subtle camera movement based on mouse (much more gentle)
    const targetX = this.mouse.x * 0.3 + 2;
    const targetY = -this.mouse.y * 0.2;
    
    this.camera.position.x += (targetX - this.camera.position.x) * 0.01;
    this.camera.position.y += (targetY - this.camera.position.y) * 0.01;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

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
         'tagline', 'stats-number', 'stats-label', 'background-image',
         'hero-alignment', 'gradient-preset', 'primary-background', 'secondary-background',
         'border-color', 'vector-art-color', 'primary-accent', 'secondary-accent',
         'title-text-color', 'subtitle-text-color', 'primary-button-text-color', 'secondary-button-text-color'].includes(name)) {
      this.render();
      
      // Reinitialize WebGL if images or gradient changes
      if (name.includes('image') || name === 'gradient-preset') {
        setTimeout(() => {
          this.initWebGL();
        }, 100);
      }
    }
  }
}

customElements.define('visual-portfolio-hero', VisualPortfolioHero);
