class ECommerceHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      // Content Settings
      heroTitle: 'Discover Amazing Products',
      heroSubtitle: 'Shop the latest trends with exclusive deals, fast shipping, and hassle-free returns. Your dream shopping experience starts here.',
      primaryButtonText: 'Shop Now',
      secondaryButtonText: 'View Collections',
      primaryButtonLink: '/shop',
      secondaryButtonLink: '/collections',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      
      // Promotional Settings
      promoText: 'FREE SHIPPING',
      promoSubtext: 'On orders over $50',
      discountText: '50% OFF',
      discountSubtext: 'Summer Sale',
      
      // Product Settings
      productImage1: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productImage2: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productImage3: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      productName1: 'Premium Watch',
      productName2: 'Wireless Headphones',
      productName3: 'Smart Speaker',
      productPrice1: '$299',
      productPrice2: '$199',
      productPrice3: '$149',
      productRating: '4.8',
      
      // Trust Indicators
      customerCount: '50,000+',
      customerLabel: 'Happy Customers',
      reviewCount: '25,000+',
      reviewLabel: '5-Star Reviews',
      brandCount: '500+',
      brandLabel: 'Top Brands',
      
      // Testimonial
      testimonialText: 'Absolutely love shopping here! Fast delivery, quality products, and amazing customer service. Highly recommended!',
      testimonialAuthor: 'Emma Thompson',
      testimonialRole: 'Verified Customer',
      testimonialAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b69b8996?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      
      // WebGL Settings
      enableWebGL: true,
      particleCount: 200,
      animationSpeed: 1.0,
      cameraRotation: true,
      productRotation: true,
      
      // Color System
      primaryBackground: '#ffffff',
      secondaryBackground: '#f8fafc',
      borderColor: '#e2e8f0',
      accentColor: '#3b82f6',
      primaryAccent: '#1e40af',
      secondaryAccent: '#f59e0b',
      successColor: '#10b981',
      warningColor: '#f59e0b',
      
      // Text Colors
      titleTextColor: '#1e293b',
      subtitleTextColor: '#64748b',
      primaryButtonTextColor: '#ffffff',
      secondaryButtonTextColor: '#1e40af',
      priceTextColor: '#059669',
      promoTextColor: '#dc2626',
      
      // Gradient Preset
      gradientPreset: 'ecommerce-primary',
      
      // Typography
      titleFontFamily: 'Inter',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: 52,
      subtitleFontSize: 18,
      buttonFontSize: 16,
      
      // Layout
      heroAlignment: 'left',
      showPromo: true,
      showProducts: true,
      showStats: true
    };
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.products = [];
    this.particles = [];
    this.animationId = null;
    
    this.render();
    this.initializeWebGL();
    this.initializeAnimations();
  }

  static get observedAttributes() {
    return [
      'hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
      'primary-button-link', 'secondary-button-link', 'primary-button-target', 'secondary-button-target',
      'promo-text', 'promo-subtext', 'discount-text', 'discount-subtext',
      'product-image1', 'product-image2', 'product-image3', 'product-name1', 'product-name2', 'product-name3',
      'product-price1', 'product-price2', 'product-price3', 'product-rating',
      'customer-count', 'customer-label', 'review-count', 'review-label', 'brand-count', 'brand-label',
      'testimonial-text', 'testimonial-author', 'testimonial-role', 'testimonial-avatar',
      'enable-webgl', 'particle-count', 'animation-speed', 'camera-rotation', 'product-rotation',
      'primary-background', 'secondary-background', 'border-color', 'accent-color', 'primary-accent', 'secondary-accent',
      'success-color', 'warning-color', 'title-text-color', 'subtitle-text-color', 'primary-button-text-color',
      'secondary-button-text-color', 'price-text-color', 'promo-text-color', 'gradient-preset',
      'title-font-family', 'subtitle-font-family', 'button-font-family',
      'title-font-size', 'subtitle-font-size', 'button-font-size', 'hero-alignment',
      'show-promo', 'show-products', 'show-stats'
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
      'ecommerce-primary': ['#667eea', '#764ba2'],
      'shopping-cart': ['#f093fb', '#f5576c'],
      'sale-red': ['#ff416c', '#ff4b2b'],
      'premium-gold': ['#ffd700', '#ffb347'],
      'tech-blue': ['#4facfe', '#00f2fe'],
      'fashion-pink': ['#ff9a9e', '#fecfef'],
      'green-success': ['#11998e', '#38ef7d'],
      'purple-luxury': ['#a8edea', '#fed6e3'],
      'orange-energy': ['#fa709a', '#fee140'],
      'cyber-neon': ['#08fdd8', '#09fbd3'],
      'sunset-orange': ['#ff7e5f', '#feb47b'],
      'ocean-blue': ['#2196f3', '#21cbf3'],
      'forest-green': ['#134e5e', '#71b280'],
      'royal-purple': ['#667eea', '#764ba2'],
      'fire-red': ['#ff512f', '#dd2476'],
      'ice-blue': ['#74b9ff', '#0984e3'],
      'golden-hour': ['#f7971e', '#ffd200'],
      'midnight-blue': ['#2c3e50', '#3498db'],
      'rose-gold': ['#f4c2c2', '#ff6b6b'],
      'electric-blue': ['#667eea', '#764ba2']
    };
    return gradients[preset] || gradients['ecommerce-primary'];
  }

  initializeWebGL() {
    if (!this.settings.enableWebGL) return;
    
    try {
      const container = this.shadowRoot.querySelector('.webgl-container');
      if (!container) return;

      // Scene setup
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor(0x000000, 0);
      container.appendChild(this.renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 5);
      this.scene.add(directionalLight);

      // Create 3D products
      this.createProducts();
      
      // Create particles
      this.createParticles();
      
      // Position camera
      this.camera.position.z = 15;
      
      // Start animation
      this.animate();
      
      // Handle resize
      window.addEventListener('resize', () => this.handleResize());
      
    } catch (error) {
      console.log('WebGL not supported, fallback to CSS animations');
    }
  }

  createProducts() {
    // Create 3D product boxes
    const geometry = new THREE.BoxGeometry(2, 2.5, 0.5);
    
    for (let i = 0; i < 3; i++) {
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.8 
      });
      
      const product = new THREE.Mesh(geometry, material);
      product.position.x = (i - 1) * 4;
      product.position.y = Math.sin(i) * 2;
      product.rotation.y = i * 0.5;
      
      this.scene.add(product);
      this.products.push(product);
    }
  }

  createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < this.settings.particleCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
      
      colors.push(
        Math.random(),
        Math.random() * 0.5 + 0.5,
        1
      );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);
    this.particles.push(particles);
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    
    const time = Date.now() * 0.001 * this.settings.animationSpeed;
    
    // Rotate products
    if (this.settings.productRotation) {
      this.products.forEach((product, index) => {
        product.rotation.y += 0.01;
        product.position.y = Math.sin(time + index) * 0.5;
      });
    }
    
    // Animate particles
    this.particles.forEach(particle => {
      particle.rotation.y += 0.002;
    });
    
    // Camera rotation
    if (this.settings.cameraRotation) {
      this.camera.position.x = Math.cos(time * 0.2) * 2;
    }
    
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  handleResize() {
    if (!this.renderer || !this.camera) return;
    
    const container = this.shadowRoot.querySelector('.webgl-container');
    if (!container) return;
    
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  render() {
    const alignment = this.settings.heroAlignment;
    let textAlign, justifyContent;
    
    if (alignment === 'center') {
      textAlign = 'center';
      justifyContent = 'center';
    } else if (alignment === 'right') {
      textAlign = 'right';
      justifyContent = 'flex-end';
    } else {
      textAlign = 'left';
      justifyContent = 'flex-start';
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
          --accent-color: ${this.settings.accentColor};
          --primary-accent: ${this.settings.primaryAccent};
          --secondary-accent: ${this.settings.secondaryAccent};
          --success-color: ${this.settings.successColor};
          --warning-color: ${this.settings.warningColor};
          --title-text-color: ${this.settings.titleTextColor};
          --subtitle-text-color: ${this.settings.subtitleTextColor};
          --primary-button-text-color: ${this.settings.primaryButtonTextColor};
          --secondary-button-text-color: ${this.settings.secondaryButtonTextColor};
          --price-text-color: ${this.settings.priceTextColor};
          --promo-text-color: ${this.settings.promoTextColor};
          --gradient1: ${gradient1};
          
          display: block;
          width: 100%;
          min-height: 100vh;
          position: relative;
          background: var(--primary-background);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hero-container {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          padding: 4rem 3rem;
          position: relative;
          z-index: 10;
          animation: slideInLeft 1s ease-out;
        }

        .hero-visual {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .webgl-container {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .webgl-container canvas {
          width: 100% !important;
          height: 100% !important;
        }

        .visual-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient1);
          opacity: 0.1;
          pointer-events: none;
        }

        .promo-banner {
          display: ${this.settings.showPromo ? 'flex' : 'none'};
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 0.75rem 1.5rem;
          background: var(--gradient1);
          border-radius: 50px;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          animation: pulseGlow 2s infinite;
          width: fit-content;
        }

        .promo-icon {
          font-size: 1.2rem;
          animation: bounce 1s infinite;
        }

        .hero-title {
          font-family: '${this.settings.titleFontFamily}', sans-serif;
          font-size: ${this.settings.titleFontSize}px;
          font-weight: 700;
          color: var(--title-text-color);
          line-height: 1.2;
          margin-bottom: 1.5rem;
          text-align: ${textAlign};
        }

        .hero-title .gradient-text {
          background: var(--gradient1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: ${this.settings.subtitleFontSize}px;
          color: var(--subtitle-text-color);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          text-align: ${textAlign};
          max-width: ${alignment === 'center' ? '100%' : '500px'};
          ${alignment === 'center' ? 'margin-left: auto; margin-right: auto;' : ''}
          ${alignment === 'right' ? 'margin-left: auto;' : ''}
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          justify-content: ${justifyContent};
        }

        .btn {
          font-family: '${this.settings.buttonFontFamily}', sans-serif;
          font-size: ${this.settings.buttonFontSize}px;
          font-weight: 600;
          padding: 1rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
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
          color: var(--primary-button-text-color);
          border: 2px solid var(--primary-accent);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover {
          background: var(--accent-color);
          border-color: var(--accent-color);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--secondary-button-text-color);
          border: 2px solid var(--border-color);
        }

        .btn-secondary:hover {
          background: var(--secondary-background);
          border-color: var(--primary-accent);
          color: var(--primary-accent);
          transform: translateY(-2px);
        }

        .btn-icon {
          font-size: 1.1rem;
        }

        .discount-badge {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: var(--promo-text-color);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 50%;
          font-weight: 700;
          font-size: 1.2rem;
          text-align: center;
          animation: rotateBounce 3s infinite;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
        }

        .discount-text {
          display: block;
          font-size: 1.5rem;
          line-height: 1;
        }

        .discount-subtext {
          display: block;
          font-size: 0.8rem;
          opacity: 0.9;
        }

        .stats-grid {
          display: ${this.settings.showStats ? 'grid' : 'none'};
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .stat-item {
          text-align: ${textAlign};
          animation: fadeInUp 1s ease-out;
          position: relative;
        }

        .stat-item::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 3px;
          background: var(--gradient1);
          border-radius: 2px;
        }

        .stat-item:nth-child(2) { animation-delay: 0.2s; }
        .stat-item:nth-child(3) { animation-delay: 0.4s; }

        .stat-number {
          font-family: '${this.settings.titleFontFamily}', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-accent);
          display: block;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .stat-label {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: 0.9rem;
          color: var(--subtitle-text-color);
          font-weight: 500;
        }

        .products-showcase {
          display: ${this.settings.showProducts ? 'grid' : 'none'};
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .product-card {
          background: var(--secondary-background);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeInUp 1s ease-out;
        }

        .product-card:nth-child(2) { animation-delay: 0.2s; }
        .product-card:nth-child(3) { animation-delay: 0.4s; }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .product-image {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          object-fit: cover;
          margin-bottom: 1rem;
        }

        .product-name {
          font-weight: 600;
          color: var(--title-text-color);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .product-price {
          font-weight: 700;
          color: var(--price-text-color);
          font-size: 1.1rem;
        }

        .product-rating {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          margin-top: 0.5rem;
          color: var(--warning-color);
        }

        .testimonial-card {
          background: var(--secondary-background);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          animation: fadeInUp 1s ease-out 0.6s both;
        }

        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 20px;
          font-size: 4rem;
          color: var(--accent-color);
          opacity: 0.3;
          font-family: serif;
        }

        .testimonial-text {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: 1rem;
          color: var(--subtitle-text-color);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: ${justifyContent};
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--accent-color);
        }

        .author-info {
          text-align: left;
        }

        .author-name {
          font-family: '${this.settings.titleFontFamily}', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--title-text-color);
          margin-bottom: 0.25rem;
        }

        .author-role {
          font-family: '${this.settings.subtitleFontFamily}', sans-serif;
          font-size: 0.875rem;
          color: var(--subtitle-text-color);
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: var(--accent-color);
          opacity: 0.1;
          animation: floatUp 8s ease-in-out infinite;
        }

        .floating-shape:nth-child(1) {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-shape:nth-child(2) {
          width: 60px;
          height: 60px;
          top: 60%;
          right: 20%;
          animation-delay: 2s;
        }

        .floating-shape:nth-child(3) {
          width: 80px;
          height: 80px;
          bottom: 20%;
          left: 80%;
          animation-delay: 4s;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: var(--accent-color);
          font-size: 1.5rem;
          animation: bounce 2s infinite;
          cursor: pointer;
        }

        .scroll-indicator::after {
          content: '🛒';
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

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
          }
        }

        @keyframes rotateBounce {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(5deg) scale(1.05);
          }
          75% {
            transform: rotate(-5deg) scale(0.95);
          }
        }

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
          }

          .hero-visual {
            order: -1;
            height: 50vh;
          }

          .hero-content {
            padding: 2rem;
            text-align: center;
          }

          .hero-title {
            font-size: ${Math.round(this.settings.titleFontSize * 0.8)}px;
            text-align: center;
          }

          .hero-subtitle {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons {
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .stat-item {
            text-align: center;
          }

          .products-showcase {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .testimonial-author {
            justify-content: center;
          }

          .discount-badge {
            top: 1rem;
            right: 1rem;
            padding: 0.75rem 1rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 1.5rem;
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
          }

          .btn {
            width: 100%;
            max-width: 300px;
            text-align: center;
            justify-content: center;
          }

          .promo-banner {
            font-size: 0.8rem;
            padding: 0.5rem 1rem;
          }

          .products-showcase {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
          }

          .product-card {
            padding: 1rem;
          }

          .product-image {
            width: 60px;
            height: 60px;
          }

          .testimonial-card {
            padding: 1.5rem;
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
            padding: 0.875rem 1.5rem;
            font-size: ${Math.round(this.settings.buttonFontSize * 0.9)}px;
          }

          .stat-number {
            font-size: 2rem;
          }

          .products-showcase {
            grid-template-columns: 1fr;
          }

          .testimonial-card {
            padding: 1rem;
          }
        }
      </style>

      <main class="hero-container" role="main">
        <div class="hero-content">
          ${this.settings.showPromo ? `
          <div class="promo-banner">
            <span class="promo-icon">🚚</span>
            <span>${this.settings.promoText}</span>
            <span style="opacity: 0.8;">${this.settings.promoSubtext}</span>
          </div>
          ` : ''}
          
          <h1 class="hero-title">
            <span class="gradient-text">Discover</span> ${this.settings.heroTitle.replace('Discover', '')}
          </h1>
          <p class="hero-subtitle">${this.settings.heroSubtitle}</p>
          
          <div class="hero-buttons">
            <a href="${this.settings.primaryButtonLink}" target="${this.settings.primaryButtonTarget}" class="btn btn-primary">
              <span class="btn-icon">🛒</span>
              ${this.settings.primaryButtonText}
            </a>
            <a href="${this.settings.secondaryButtonLink}" target="${this.settings.secondaryButtonTarget}" class="btn btn-secondary">
              <span class="btn-icon">👁️</span>
              ${this.settings.secondaryButtonText}
            </a>
          </div>

          ${this.settings.showStats ? `
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">${this.settings.customerCount}</span>
              <span class="stat-label">${this.settings.customerLabel}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${this.settings.reviewCount}</span>
              <span class="stat-label">${this.settings.reviewLabel}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">${this.settings.brandCount}</span>
              <span class="stat-label">${this.settings.brandLabel}</span>
            </div>
          </div>
          ` : ''}

          ${this.settings.showProducts ? `
          <div class="products-showcase">
            <div class="product-card">
              <img src="${this.settings.productImage1}" alt="${this.settings.productName1}" class="product-image">
              <div class="product-name">${this.settings.productName1}</div>
              <div class="product-price">${this.settings.productPrice1}</div>
              <div class="product-rating">
                <span>⭐</span>
                <span>${this.settings.productRating}</span>
              </div>
            </div>
            <div class="product-card">
              <img src="${this.settings.productImage2}" alt="${this.settings.productName2}" class="product-image">
              <div class="product-name">${this.settings.productName2}</div>
              <div class="product-price">${this.settings.productPrice2}</div>
              <div class="product-rating">
                <span>⭐</span>
                <span>${this.settings.productRating}</span>
              </div>
            </div>
            <div class="product-card">
              <img src="${this.settings.productImage3}" alt="${this.settings.productName3}" class="product-image">
              <div class="product-name">${this.settings.productName3}</div>
              <div class="product-price">${this.settings.productPrice3}</div>
              <div class="product-rating">
                <span>⭐</span>
                <span>${this.settings.productRating}</span>
              </div>
            </div>
          </div>
          ` : ''}

          <div class="testimonial-card">
            <p class="testimonial-text">${this.settings.testimonialText}</p>
            <div class="testimonial-author">
              <img src="${this.settings.testimonialAvatar}" alt="${this.settings.testimonialAuthor}" class="author-avatar">
              <div class="author-info">
                <div class="author-name">${this.settings.testimonialAuthor}</div>
                <div class="author-role">${this.settings.testimonialRole}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="webgl-container"></div>
          <div class="visual-overlay"></div>
          <div class="discount-badge">
            <span class="discount-text">${this.settings.discountText}</span>
            <span class="discount-subtext">${this.settings.discountSubtext}</span>
          </div>
          <div class="floating-elements">
            <div class="floating-shape"></div>
            <div class="floating-shape"></div>
            <div class="floating-shape"></div>
          </div>
        </div>

        <div class="scroll-indicator"></div>
      </main>
    `;
  }

  initializeAnimations() {
    setTimeout(() => {
      // Initialize stat number animations
      const statNumbers = this.shadowRoot.querySelectorAll('.stat-number');
      statNumbers.forEach((stat, index) => {
        setTimeout(() => {
          stat.style.transform = 'scale(1.1)';
          setTimeout(() => {
            stat.style.transform = 'scale(1)';
          }, 200);
        }, index * 200);
      });

      // Initialize product card hover effects
      const productCards = this.shadowRoot.querySelectorAll('.product-card');
      productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0) scale(1)';
        });
      });
    }, 1000);
  }

  updateElement(name) {
    if (!this.shadowRoot) return;
    
    // Re-render for major changes
    if (['hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
         'product-image1', 'product-image2', 'product-image3', 'enable-webgl',
         'show-promo', 'show-products', 'show-stats', 'gradient-preset'].includes(name)) {
      this.render();
      this.initializeWebGL();
      this.initializeAnimations();
    }
    
    // Update WebGL settings
    if (['particle-count', 'animation-speed', 'camera-rotation', 'product-rotation'].includes(name)) {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      this.initializeWebGL();
    }
  }

  disconnectedCallback() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

customElements.define('ecommerce-hero', ECommerceHero);
