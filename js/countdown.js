class CountDown extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Set the target date (YYYY-MM-DD format)
    this.targetDate = '2023-07-29';

    const container = document.createElement('div');
    container.style.width = '60vw';
    container.style.height = '15vh';
    container.style.background = 'linear-gradient(to left, #f70068 0%,#441066 100%)';
    container.style.borderRadius = '10px';
    container.style.padding = '10px';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';

    this.countdownElement = document.createElement('div');
    this.countdownElement.style.fontFamily = "'Montserrat', 'Arial', sans-serif";
    this.countdownElement.style.color = 'white';
    this.countdownElement.style.fontSize = '60px';
    this.countdownElement.style.margin = '10px';

    container.appendChild(this.countdownElement);
    shadowRoot.appendChild(container);

    // Add event listener for window resize
    window.addEventListener('resize', () => {
      this.updateResponsiveStyles();
    });

    // Call the initial responsive styles update
    this.updateResponsiveStyles();

    this.startCountdown();
  }

  startCountdown() {
    this.updateCountdown();
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const currentDate = new Date();
    const target = new Date(this.targetDate);
    const timeDifference = target - currentDate;

    if (timeDifference < 0) {
      this.countdownElement.textContent = '';
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    // Format the countdown text with the desired structure
    const formattedCountdown = `
      <div style="display: flex; flex-direction: row;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="font-weight: bold; margin-bottom: 5px;">${this.padZero(days)}</div>
          <div style="font-size: 14px;">Days</div>
        </div>
        <span style="font-weight: bold; margin: 0 5px;">:</span>
        <div style="display: flex; flex-direction: column; align-items: center; margin-left: 10px;">
          <div style="font-weight: bold; margin-bottom: 5px;">${this.padZero(hours)}</div>
          <div style="font-size: 14px;">Hours</div>
        </div>
        <span style="font-weight: bold; margin: 0 5px;">:</span>
        <div style="display: flex; flex-direction: column; align-items: center; margin-left: 10px;">
          <div style="font-weight: bold; margin-bottom: 5px;">${this.padZero(minutes)}</div>
          <div style="font-size: 14px;">Mins</div>
        </div>
        <span style="font-weight: bold; margin: 0 5px;">:</span>
        <div style="display: flex; flex-direction: column; align-items: center; margin-left: 10px;">
          <div style="font-weight: bold; margin-bottom: 5px;">${this.padZero(seconds)}</div>
          <div style="font-size: 14px;">Seconds</div>
        </div>
      </div>
    `;

    this.countdownElement.innerHTML = formattedCountdown;
  }

  padZero(number) {
    // Pad single-digit numbers with leading zero
    return number.toString().padStart(2, '0');
  }

  updateResponsiveStyles() {
    const container = this.shadowRoot.querySelector('div');
    const countdownDays = this.shadowRoot.querySelector('div > div:nth-child(1)');
    const countdownLabels = this.shadowRoot.querySelectorAll('div > div:not(:nth-child(1))');
  
    // Reset the styles to the default values
    container.style.width = '60vw';
    container.style.height = '15vh';
    container.style.marginLeft = 'auto';
    container.style.marginRight = 'auto';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.flexDirection = 'row'; // Reset the flex direction
  
    countdownDays.style.fontSize = '60px';
  
    countdownLabels.forEach((label) => {
      label.style.fontSize = '14px';
    });
  
    // Adjust styles based on the screen width
    const screenWidth = window.innerWidth;
  
    if (screenWidth <= 768) {
      container.style.width = '614px';
      container.style.height = '100px';
      countdownDays.style.fontSize = '28px';
  
      countdownLabels.forEach((label) => {
        label.style.fontSize = '10px';
      });
    }
  
    if (screenWidth <= 480) {
      container.style.width = '384px';
      container.style.height = '80px';
      countdownDays.style.fontSize = '18px';
  
      countdownLabels.forEach((label) => {
        label.style.fontSize = '10px';
      });
  
      container.style.flexDirection = 'column'; // Adjust flex direction to display vertically
      container.style.alignItems = 'center'; // Align items to the start
      container.style.paddingLeft = '20px'; // Add left padding for better alignment
    }
  
  }
  
}

customElements.define('count-down', CountDown);
