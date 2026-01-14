const processSteps = [
  {title:'Sourcing',description:'We maintain direct relationships with suppliers across key tobacco-producing regions. Our network spans Brazil, India, Zimbabwe, Malawi, and other established markets. We prioritize quality, consistency, and ethical sourcing practices.'},
  {title:'Quality Control',description:'Every batch undergoes rigorous quality assessment. We evaluate moisture content, color, texture, and grade classification. Our quality standards align with international specifications. Samples are tested before shipment approval.'},
  {title:'Logistics',description:'Efficient supply chain management from origin to destination. We handle documentation, compliance, and shipping coordination. Flexible shipment sizes and reliable delivery schedules.'}
];

class ProcessSteps extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .process-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .process-item {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .process-item h3 {
          color: var(--gold);
          font-size: 20px;
        }
        .left {
            width: 33%;
        }
        .right {
            width: 67%;
        }
        .line {
            height: 1px;
            background-color: rgba(179,143,70,0.15);
            margin-top: 8px;
        }
        @media(min-width:768px){
          .process-item{
            flex-direction:row
          }
        }
      </style>
      <div class="process-list">
        ${processSteps.map(step => `
          <div class="process-item">
            <div class="left">
              <h3>${step.title}</h3>
              <div class="line"></div>
            </div>
            <div class="right">
              <p>${step.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

customElements.define('process-steps', ProcessSteps);
