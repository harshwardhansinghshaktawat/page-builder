class ModernAgencyHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.settings = {
      // Content Settings
      heroTitle: 'Transform Your Business',
      heroSubtitle: 'We help ambitious companies accelerate growth through strategic design, innovative technology, and data-driven marketing solutions.',
      primaryButtonText: 'Start Your Project',
      secondaryButtonText: 'View Our Work',
      primaryButtonLink: '#contact',
      secondaryButtonLink: '#portfolio',
      primaryButtonTarget: '_self',
      secondaryButtonTarget: '_self',
      
      // Image/Video Settings
      heroImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      imageAltText: 'Professional business team collaborating',
      
      // Statistics
      stat1Number: '500+',
      stat1Label: 'Projects Completed',
      stat2Number: '98%',
      stat2Label: 'Client Satisfaction',
      stat3Number: '24/7',
      stat3Label: 'Support Available',
      
      // Testimonial
      testimonialText: 'Working with this team transformed our business. Their strategic approach and attention to detail exceeded all expectations.',
      testimonialAuthor: 'Sarah Johnson',
      testimonialRole: 'CEO, TechStart Inc.',
      testimonialAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b69b8996?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      
      // Simplified Color System (6 colors + 4 text colors)
      primaryBackground: '#ffffff',
      secondaryBackground: '#f8fafc',
      borderColor: '#e2e8f0',
      vectorArtColor: '#3b82f6',
      primaryAccent: '#1e40af',
      secondaryAccent: '#8b5cf6',
      
      // Text Colors
      titleTextColor: '#1e293b',
      subtitleTextColor: '#64748b',
      primaryButtonTextColor: '#ffffff',
      secondaryButtonTextColor: '#1e40af',
      
      // Gradient Preset
      gradientPreset: 'blue-indigo',
      
      // Typography
      titleFontFamily: 'Inter',
      subtitleFontFamily: 'Inter',
      buttonFontFamily: 'Inter',
      titleFontSize: 56,
      subtitleFontSize: 18,
      buttonFontSize: 16,
      
      // Layout
      heroAlignment: 'left'
    };
    this.render();
    this.initializeAnimations();
  }

  static get observedAttributes() {
    return [
      'hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
      'primary-button-link', 'secondary-button-link', 'primary-button-target', 'secondary-button-target',
      'hero-image', 'image-alt-text', 'stat1-number', 'stat1-label', 'stat2-number', 'stat2-label',
      'stat3-number', 'stat3-label', 'testimonial-text', 'testimonial-author', 'testimonial-role', 'testimonial-avatar',
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
      
      // Nature & Organic Gradients
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
      'tundra': ['#a8e6cf', '#88d8a3'],
      'tropical': ['#ff9a9e', '#fecfef'],
      'arctic': ['#eef2f3', '#8e9eab'],
      'volcanic': ['#ff512f', '#dd2476'],
      'deep-sea': ['#2b5876', '#4e4376'],
      'mountain': ['#870000', '#190a05'],
      
      // Metallic & Luxury Gradients
      'gold': ['#f7971e', '#ffd200'],
      'silver': ['#bdc3c7', '#2c3e50'],
      'bronze': ['#cd7f32', '#8b4513'],
      'platinum': ['#e5e4e2', '#a8a8a8'],
      'rose-gold': ['#f4c2c2', '#ff6b6b'],
      'copper': ['#b87333', '#da8a67'],
      'titanium': ['#878681', '#565853'],
      'chrome': ['#c0c0c0', '#8a8a8a'],
      'brass': ['#b5651d', '#856d4d'],
      'pewter': ['#96a8a1', '#788a85'],
      
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
      'data': ['#007bff', '#0056b3'],
      
      // Gemstone & Crystal Gradients
      'crystal': ['#667eea', '#764ba2'],
      'diamond': ['#f093fb', '#f5576c'],
      'emerald': ['#11998e', '#38ef7d'],
      'ruby': ['#ff0844', '#ffb199'],
      'sapphire': ['#667eea', '#764ba2'],
      'amethyst': ['#f093fb', '#f5576c'],
      'topaz': ['#ffd700', '#ff8c00'],
      'opal': ['#a8edea', '#fed6e3'],
      'garnet': ['#b22222', '#dc143c'],
      'onyx': ['#000000', '#36454f'],
      'jade': ['#00a86b', '#29ab87'],
      'turquoise': ['#40e0d0', '#00ced1'],
      
      // Pastel & Soft Gradients
      'soft-pink': ['#ffc0cb', '#ffb6c1'],
      'soft-blue': ['#b0e0e6', '#87ceeb'],
      'soft-purple': ['#dda0dd', '#dbb2ff'],
      'soft-green': ['#98fb98', '#90ee90'],
      'soft-yellow': ['#fff8dc', '#ffffe0'],
      'soft-orange': ['#ffd4a3', '#ffb347'],
      'soft-teal': ['#afeeee', '#b0f2b4'],
      'soft-lavender': ['#e6e6fa', '#dcd0ff'],
      'soft-mint': ['#98ff98', '#90ee90'],
      'soft-peach': ['#ffdab9', '#ffcba4'],
      
      // Retro & Vintage Gradients
      'retro-wave': ['#ff006e', '#8338ec'],
      'synthwave': ['#ff0080', '#7928ca'],
      'vaporwave': ['#ff6ec7', '#a8e6cf'],
      'outrun': ['#ff0080', '#ffff00'],
      '80s-neon': ['#ff1493', '#00ffff'],
      '90s-gradient': ['#ff6b6b', '#4ecdc4'],
      'vintage': ['#d2691e', '#cd853f'],
      'sepia': ['#704214', '#a0522d'],
      'retro': ['#ff6b35', '#f7931e'],
      'classic': ['#8b4513', '#daa520'],
      
      // Monochrome & Grayscale Gradients
      'slate-gray': ['#64748b', '#475569'],
      'zinc-gray': ['#71717a', '#52525b'],
      'stone-brown': ['#78716c', '#57534e'],
      'neutral-gray': ['#737373', '#525252'],
      'warm-gray': ['#8b7355', '#6b5b47'],
      'cool-gray': ['#6b7280', '#4b5563'],
      'blue-gray': ['#64748b', '#475569'],
      'light-gray': ['#e5e7eb', '#d1d5db'],
      'dark-gray': ['#374151', '#1f2937'],
      'charcoal-gray': ['#36454f', '#2f4f4f'],
      
      // Light & Bright Gradients
      'light-blue': ['#bfdbfe', '#93c5fd'],
      'light-purple': ['#e9d5ff', '#c4b5fd'],
      'light-green': ['#bbf7d0', '#86efac'],
      'light-red': ['#fecaca', '#fca5a5'],
      'light-pink': ['#fce7f3', '#f9a8d4'],
      'light-yellow': ['#fef3c7', '#fed7aa'],
      'light-orange': ['#fed7aa', '#fdba74'],
      'light-teal': ['#ccfbf1', '#99f6e4'],
      'light-violet': ['#ede9fe', '#c4b5fd'],
      'light-cyan': ['#cffafe', '#a5f3fc'],
      
      // Special & Unique Gradients
      'rainbow': ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'],
      'pride': ['#e40303', '#ff8c00', '#ffed00', '#008018', '#0080ff', '#732982'],
      'midnight': ['#0f0f23', '#1a1a2e'],
      'horizon': ['#ff7e5f', '#feb47b'],
      'gradient': ['#667eea', '#764ba2'],
      'spectrum': ['#ff006e', '#8338ec', '#3a86ff'],
      'prism': ['#ff0080', '#ff8000', '#ffff00', '#80ff00', '#00ff80', '#0080ff', '#8000ff'],
      'kaleidoscope': ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'],
      'iridescent': ['#ff6ec7', '#a8e6cf', '#ffd93d', '#6c5ce7'],
      'holographic': ['#00d4ff', '#ff00ff', '#00ff00', '#ff0080'],
      
      // Quantum & Futuristic Gradients
      'quantum-blue': ['#667eea', '#764ba2'],
      'quantum-purple': ['#f093fb', '#f5576c'],
      'quantum-green': ['#43e97b', '#38f9d7'],
      'quantum-orange': ['#fa709a', '#fee140'],
      'quantum-red': ['#ff6b6b', '#ffd93d'],
      'quantum-pink': ['#ff9a9e', '#fecfef'],
      'quantum-teal': ['#4facfe', '#00f2fe'],
      'quantum-yellow': ['#f6d55c', '#ed4264'],
      'future-tech': ['#00d4ff', '#090979'],
      'sci-fi': ['#667eea', '#764ba2']
    };
    return gradients[preset] || gradients['blue-indigo'];
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
          animation: slideInRight 1s ease-out;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .hero-image:hover {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient1);
          opacity: 0.1;
          transition: opacity 0.3s ease;
        }

        .hero-visual:hover .image-overlay {
          opacity: 0.2;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: var(--vector-art-color);
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

        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
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
          background: var(--vector-art-color);
          border-color: var(--vector-art-color);
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .stat-item {
          text-align: ${textAlign};
          animation: fadeInUp 1s ease-out;
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
          color: var(--vector-art-color);
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
          border: 2px solid var(--vector-art-color);
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

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: var(--vector-art-color);
          font-size: 1.5rem;
          animation: bounce 2s infinite;
          cursor: pointer;
        }

        .scroll-indicator::after {
          content: '↓';
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
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
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

          .testimonial-author {
            justify-content: center;
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
          }

          .stats-grid {
            gap: 1rem;
          }

          .stat-number {
            font-size: 2rem;
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
            font-size: 1.75rem;
          }

          .testimonial-card {
            padding: 1rem;
          }
        }
      </style>

      <main class="hero-container" role="main">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="gradient-text">Transform</span> ${this.settings.heroTitle.replace('Transform', '')}
          </h1>
          <p class="hero-subtitle">${this.settings.heroSubtitle}</p>
          
          <div class="hero-buttons">
            <a href="${this.settings.primaryButtonLink}" target="${this.settings.primaryButtonTarget}" class="btn btn-primary">
              ${this.settings.primaryButtonText}
            </a>
            <a href="${this.settings.secondaryButtonLink}" target="${this.settings.secondaryButtonTarget}" class="btn btn-secondary">
              ${this.settings.secondaryButtonText}
            </a>
          </div>

          <div class="stats-grid">
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
          </div>

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
          <img src="${this.settings.heroImage}" alt="${this.settings.imageAltText}" class="hero-image">
          <div class="image-overlay"></div>
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
      // Initialize any JavaScript animations here
      const statNumbers = this.shadowRoot.querySelectorAll('.stat-number');
      statNumbers.forEach((stat, index) => {
        setTimeout(() => {
          stat.style.transform = 'scale(1.1)';
          setTimeout(() => {
            stat.style.transform = 'scale(1)';
          }, 200);
        }, index * 200);
      });
    }, 1000);
  }

  updateElement(name) {
    if (!this.shadowRoot) return;
    
    // Re-render for major changes
    if (['hero-title', 'hero-subtitle', 'primary-button-text', 'secondary-button-text',
         'hero-image', 'image-alt-text', 'stat1-number', 'stat1-label', 'stat2-number', 'stat2-label',
         'stat3-number', 'stat3-label', 'testimonial-text', 'testimonial-author', 'testimonial-role',
         'testimonial-avatar', 'hero-alignment', 'gradient-preset', 'primary-background', 'secondary-background',
         'border-color', 'vector-art-color', 'primary-accent', 'secondary-accent',
         'title-text-color', 'subtitle-text-color', 'primary-button-text-color', 'secondary-button-text-color'].includes(name)) {
      this.render();
      this.initializeAnimations();
    }
  }
}

customElements.define('modern-agency-hero', ModernAgencyHero);
