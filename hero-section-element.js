class HeroSectionElement extends HTMLElement {
    constructor() {
        super();
        this.settings = {
            // Content
            heroTitle: 'Transform Your Business Today',
            heroSubtitle: 'Discover innovative solutions that drive growth and success. Join thousands of satisfied customers who trust our platform.',
            buttonText: 'Get Started Now',
            buttonLink: '#contact',
            buttonSecondaryText: 'Learn More',
            buttonSecondaryLink: '#about',
            
            // SEO & Accessibility
            titleTag: 'h1', // h1, h2, h3
            altText: 'Hero background showcasing our innovative solutions',
            
            // Color System
            primaryColor: '#3498db',
            secondaryColor: '#2ecc71',
            accentColor: '#e74c3c',
            textPrimaryColor: '#2c3e50',
            textSecondaryColor: '#7f8c8d',
            backgroundColor: '#ffffff',
            
            // Typography System
            fontFamily: 'Arial',
            titleFontSize: 48,
            subtitleFontSize: 20,
            
            // Background
            backgroundType: 'solid', // 'solid', 'gradient', 'image'
            backgroundImage: '',
            gradientDirection: 'to right',
            showOverlay: false,
            overlayOpacity: 40,
            
            // Layout
            heroHeight: 600,
            textAlignment: 'center',
            contentWidth: 800,
            verticalPosition: 'center',
            showSecondaryButton: true,
            
            // Spacing
            titleSpacing: 24,
            subtitleSpacing: 32,
            buttonSpacing: 16,
            
            // Button Style
            buttonStyle: 'solid', // 'solid', 'outline', 'gradient'
            buttonSize: 'medium', // 'small', 'medium', 'large'
            buttonRounded: 'medium' // 'none', 'small', 'medium', 'large', 'full'
        };
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['options'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue && newValue !== oldValue && name === 'options') {
            const newOptions = JSON.parse(newValue);
            Object.assign(this.settings, newOptions);
            this.render();
        }
    }

    render() {
        this.innerHTML = '';

        // Create structured HTML for SEO
        const heroSection = document.createElement('section');
        heroSection.className = 'hero-section';
        heroSection.setAttribute('role', 'banner');
        heroSection.setAttribute('aria-label', 'Main hero section');

        // Background container
        const backgroundContainer = document.createElement('div');
        backgroundContainer.className = 'hero-background';
        if (this.settings.backgroundImage) {
            backgroundContainer.setAttribute('aria-label', this.settings.altText);
        }

        // Overlay
        if (this.settings.showOverlay) {
            const overlay = document.createElement('div');
            overlay.className = 'hero-overlay';
            backgroundContainer.appendChild(overlay);
        }

        // Content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'hero-content';

        // Main heading (SEO important)
        const heading = document.createElement(this.settings.titleTag);
        heading.className = 'hero-title';
        heading.textContent = this.settings.heroTitle;

        // Subtitle
        const subtitle = document.createElement('p');
        subtitle.className = 'hero-subtitle';
        subtitle.textContent = this.settings.heroSubtitle;

        // CTA container
        const ctaContainer = document.createElement('div');
        ctaContainer.className = 'hero-cta';

        // Primary button
        const primaryButton = document.createElement('a');
        primaryButton.className = 'hero-button hero-button--primary';
        primaryButton.textContent = this.settings.buttonText;
        primaryButton.href = this.settings.buttonLink;
        primaryButton.setAttribute('role', 'button');

        ctaContainer.appendChild(primaryButton);

        // Secondary button (optional)
        if (this.settings.showSecondaryButton) {
            const secondaryButton = document.createElement('a');
            secondaryButton.className = 'hero-button hero-button--secondary';
            secondaryButton.textContent = this.settings.buttonSecondaryText;
            secondaryButton.href = this.settings.buttonSecondaryLink;
            secondaryButton.setAttribute('role', 'button');
            ctaContainer.appendChild(secondaryButton);
        }

        // Assemble structure
        contentContainer.appendChild(heading);
        contentContainer.appendChild(subtitle);
        contentContainer.appendChild(ctaContainer);
        
        heroSection.appendChild(backgroundContainer);
        heroSection.appendChild(contentContainer);
        
        this.appendChild(heroSection);
        this.applyStyles();
    }

    applyStyles() {
        const style = document.createElement('style');
        
        // Generate background based on type
        let backgroundStyle = '';
        switch (this.settings.backgroundType) {
            case 'solid':
                backgroundStyle = `background: ${this.settings.backgroundColor};`;
                break;
            case 'gradient':
                backgroundStyle = `background: linear-gradient(${this.settings.gradientDirection}, ${this.settings.primaryColor}, ${this.settings.secondaryColor});`;
                break;
            case 'image':
                backgroundStyle = this.settings.backgroundImage 
                    ? `background: url('${this.settings.backgroundImage}') center center/cover no-repeat;`
                    : `background: ${this.settings.backgroundColor};`;
                break;
        }

        // Button size configurations
        const buttonSizes = {
            small: { padding: '12px 24px', fontSize: '14px' },
            medium: { padding: '16px 32px', fontSize: '16px' },
            large: { padding: '20px 40px', fontSize: '18px' }
        };

        // Border radius configurations
        const borderRadius = {
            none: '0px',
            small: '4px',
            medium: '8px',
            large: '16px',
            full: '50px'
        };

        const currentButtonSize = buttonSizes[this.settings.buttonSize];
        const currentBorderRadius = borderRadius[this.settings.buttonRounded];

        style.textContent = `
            .hero-section {
                position: relative;
                width: 100%;
                height: ${this.settings.heroHeight}px;
                display: flex;
                align-items: ${this.settings.verticalPosition === 'top' ? 'flex-start' : this.settings.verticalPosition === 'bottom' ? 'flex-end' : 'center'};
                justify-content: center;
                overflow: hidden;
                text-align: ${this.settings.textAlignment};
            }

            .hero-background {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                ${backgroundStyle}
            }

            .hero-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${this.settings.textPrimaryColor};
                opacity: ${this.settings.overlayOpacity / 100};
                z-index: 1;
            }

            .hero-content {
                position: relative;
                z-index: 2;
                max-width: ${this.settings.contentWidth}px;
                width: 100%;
                padding: 40px 20px;
            }

            .hero-title {
                font-family: ${this.settings.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: ${this.settings.titleFontSize}px;
                font-weight: 700;
                color: ${this.settings.textPrimaryColor};
                margin: 0 0 ${this.settings.titleSpacing}px 0;
                line-height: 1.2;
                letter-spacing: -0.02em;
            }

            .hero-subtitle {
                font-family: ${this.settings.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: ${this.settings.subtitleFontSize}px;
                font-weight: 400;
                color: ${this.settings.textSecondaryColor};
                margin: 0 0 ${this.settings.subtitleSpacing}px 0;
                line-height: 1.6;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .hero-cta {
                display: flex;
                gap: ${this.settings.buttonSpacing}px;
                justify-content: ${this.settings.textAlignment === 'left' ? 'flex-start' : this.settings.textAlignment === 'right' ? 'flex-end' : 'center'};
                flex-wrap: wrap;
            }

            .hero-button {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-family: ${this.settings.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-weight: 600;
                text-decoration: none;
                border-radius: ${currentBorderRadius};
                padding: ${currentButtonSize.padding};
                font-size: ${currentButtonSize.fontSize};
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
                border: 2px solid transparent;
                min-width: 140px;
            }

            .hero-button--primary {
                ${this.settings.buttonStyle === 'solid' ? `
                    background: ${this.settings.primaryColor};
                    color: white;
                    border-color: ${this.settings.primaryColor};
                ` : this.settings.buttonStyle === 'outline' ? `
                    background: transparent;
                    color: ${this.settings.primaryColor};
                    border-color: ${this.settings.primaryColor};
                ` : `
                    background: linear-gradient(135deg, ${this.settings.primaryColor}, ${this.settings.secondaryColor});
                    color: white;
                    border-color: transparent;
                `}
            }

            .hero-button--secondary {
                background: transparent;
                color: ${this.settings.textPrimaryColor};
                border-color: ${this.settings.textSecondaryColor};
            }

            .hero-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            .hero-button--primary:hover {
                ${this.settings.buttonStyle === 'solid' ? `
                    background: ${this.settings.secondaryColor};
                    border-color: ${this.settings.secondaryColor};
                ` : this.settings.buttonStyle === 'outline' ? `
                    background: ${this.settings.primaryColor};
                    color: white;
                ` : `
                    background: linear-gradient(135deg, ${this.settings.secondaryColor}, ${this.settings.primaryColor});
                `}
            }

            .hero-button--secondary:hover {
                background: ${this.settings.textSecondaryColor};
                color: white;
                border-color: ${this.settings.textSecondaryColor};
            }

            .hero-button:active {
                transform: translateY(0);
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .hero-section {
                    height: ${Math.max(this.settings.heroHeight * 0.75, 400)}px;
                    text-align: center;
                }

                .hero-title {
                    font-size: ${Math.max(this.settings.titleFontSize * 0.7, 28)}px;
                }

                .hero-subtitle {
                    font-size: ${Math.max(this.settings.subtitleFontSize * 0.85, 16)}px;
                }

                .hero-content {
                    padding: 20px 15px;
                }

                .hero-cta {
                    flex-direction: column;
                    align-items: center;
                }

                .hero-button {
                    width: 100%;
                    max-width: 280px;
                }
            }

            @media (max-width: 480px) {
                .hero-title {
                    font-size: ${Math.max(this.settings.titleFontSize * 0.6, 24)}px;
                }

                .hero-subtitle {
                    font-size: ${Math.max(this.settings.subtitleFontSize * 0.8, 14)}px;
                }
            }

            /* Accessibility improvements */
            @media (prefers-reduced-motion: reduce) {
                .hero-button {
                    transition: none;
                }
                
                .hero-button:hover {
                    transform: none;
                }
            }

            /* High contrast mode support */
            @media (prefers-contrast: high) {
                .hero-title, .hero-subtitle {
                    text-shadow: none;
                }
                
                .hero-button {
                    border-width: 3px;
                }
            }
        `;

        // Remove existing style
        const existingStyle = this.querySelector('style');
        if (existingStyle) {
            existingStyle.remove();
        }

        this.appendChild(style);
    }
}

customElements.define('hero-section', HeroSectionElement);

export const STYLE = `
    :host {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0;
    }
`;
