import { tobaccoData } from './tobaccoData.js';

class TobaccoStrip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.tobaccoData = tobaccoData;
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
          <style>
            :host {
              --navy-dark: #051421;
              --navy-light: rgb(3, 32, 46);
              --gold: #caa03a;
              --gold-muted: #b38f46;
              --offwhite: #f8f8f6;
            }
            .tobacco-strip {
              display: flex;
              gap: 8px;
              padding: 14px;
              border-radius: 12px;
              background: rgba(5, 20, 33, 0.72);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border: 1px solid rgba(179, 143, 70, 0.15);
              min-height: 420px;
              overflow: hidden;
            }
            .type-panel {
              flex: 1;
              background: rgba(11, 43, 58, 0.7);
              border: 1px solid rgba(179, 143, 70, 0.15);
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              transition: flex-grow 300ms ease;
              cursor: pointer;
              border-radius: 8px;
            }
            .type-panel .rotated {
              transform: rotate(-90deg);
              letter-spacing: 0.1em;
              color: var(--gold);
              font-weight: 700;
              transition: opacity 200ms ease;
            }
            .type-panel .content {
              box-sizing: border-box;
              position: absolute;
              z-index: 2;
              padding: 32px;
              color: var(--offwhite);
              height: 100%;
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              opacity: 0;
              transition: opacity 200ms ease 100ms;
              pointer-events: none;
            }
            .type-panel.expanded-hover {
              flex-grow: 4;
            }
            .type-panel.expanded-hover .content {
              opacity: 1;
            }
            .type-panel.expanded-hover .rotated {
              opacity: 0;
            }
            .type-panel .overlay {
              position: absolute;
              inset: 0;
              background: rgba(5, 20, 33, 0.95);
              opacity: 0;
              transition: opacity 200ms ease;
              border-radius: 8px;
            }
            .type-panel.expanded-hover .overlay {
              opacity: 1;
            }
            .type-panel .abbrev {
              font-size: 20px;
            }
            .type-panel h3 {
              font-size: 20px;
              margin: 0 0 8px 0;
            }
            .type-panel p {
              font-size: 14px;
              max-width: 400px;
              margin: 0;
              font-weight: 300;
            }
            .details {
              display: flex;
              gap: 32px;
              margin-top: 24px;
            }
            .details > div {
              flex: 1;
            }
            .details h4 {
              color: var(--gold-muted);
              font-size: 12px;
              font-weight: 700;
              margin-bottom: 8px;
              letter-spacing: 0.05em;
            }
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            li {
                font-size: 14px;
            }

            /* Mobile accordion styles */
            @media (max-width: 768px) {
              .tobacco-strip {
                flex-direction: column;
                min-height: 0;
              }
              .type-panel {
                flex-direction: column;
                justify-content: center;
                min-height: 58px;
                flex-grow: 0 !important;
              }
              .type-panel .rotated.abbrev {
                transform: none;
                letter-spacing: normal;
                width: 100%;
                text-align: center;
                padding: 18px 0;
              }
              .type-panel .content {
                display: none;
                position: relative;
                opacity: 1;
                height: auto;
                width: 100%;
                pointer-events: auto; 
                padding: 0 24px 24px 24px;
              }
              .type-panel .overlay { display: none; } 
              .type-panel.active .content {
                display: block;
              }
              .details {
                flex-direction: column;
                gap: 20px;
                margin-top: 20px;
              }
            }
          </style>
          <div class="tobacco-strip">
            ${this.tobaccoData.map(item => `
              <div class="type-panel" data-id="${item.id}">
                <div class="rotated abbrev">${item.abbrev}</div>
                <div class="overlay"></div>
                <div class="content">
                  <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                  </div>
                  <div class="details">
                    <div class="sourcing">
                      <h4>SOURCING REGIONS</h4>
                      <ul>${item.sourcingRegions.map(r => `<li>${r}</li>`).join('')}</ul>
                    </div>
                    <div class="use-cases">
                      <h4>USE CASES</h4>
                      <ul>${item.useCases.map(u => `<li>${u}</li>`).join('')}</ul>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
    }

    attachEventListeners() {
      const panels = this.shadowRoot.querySelectorAll('.type-panel');
      const isMobile = window.matchMedia("(max-width: 768px)");

      panels.forEach(panel => {
        // --- Logic for Desktop Hover --- //
        panel.addEventListener('mouseenter', () => {
          if (!isMobile.matches) {
            panels.forEach(p => p.classList.remove('expanded-hover'));
            panel.classList.add('expanded-hover');
          }
        });

        // --- Logic for Mobile Accordion Click --- //
        panel.addEventListener('click', () => {
          if (isMobile.matches) {
            const isActive = panel.classList.contains('active');
            panels.forEach(p => p.classList.remove('active'));
            if (!isActive) {
              panel.classList.add('active');
            }
          }
        });
      });

      // --- Logic to reset hover on mouse leave --- //
      this.shadowRoot.querySelector('.tobacco-strip').addEventListener('mouseleave', () => {
        if (!isMobile.matches) {
          panels.forEach(p => p.classList.remove('expanded-hover'));
        }
      });
    }
}

customElements.define('tobacco-strip', TobaccoStrip);
