class CountDown extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Set the target date (YYYY-MM-DD format)
    this.targetDate = '2023-07-29';

    const container = document.createElement('div');

    // Style the container
    container.style.width = '60vw';
    container.style.height = '15vh';
    container.style.background = 'linear-gradient(to left, #f70068 0%,#441066 100%)';
    container.style.borderRadius = '10px';
    container.style.padding = '10px';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';

    this.countdownElement = document.createElement('div');

    // Style the countdown text
    this.countdownElement.style.fontFamily = "'Montserrat', 'Arial', sans-serif";
    this.countdownElement.style.color = 'white';
    this.countdownElement.style.fontSize = '36px';
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

    this.countdownElement.textContent = `${days} days : ${hours} hours : ${minutes} minutes : ${seconds} seconds`;
  }

  updateResponsiveStyles() {
    const container = this.shadowRoot.querySelector('div');
  
    // Reset the styles to the default values
    container.style.width = '60vw';
    container.style.height = '15vh';
    container.style.marginLeft = 'auto';
    container.style.marginRight = 'auto';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
  
    const countdownText = this.shadowRoot.querySelector('div > div');
  
    countdownText.style.fontSize = '36px';
  
    // Adjust styles based on the screen width
    const screenWidth = window.innerWidth;
  
    if (screenWidth <= 768) {
      container.style.width = '80vw';
      container.style.height = '10vh';
      countdownText.style.fontSize = '22px';
    }

    if (screenWidth <= 570) {
      container.style.width = '80vw';
      container.style.height = '8vh';
      countdownText.style.fontSize = '16px';
    }
  
    if (screenWidth <= 425) {
      container.style.width = '80vw';
      container.style.height = '8vh';
      countdownText.style.fontSize = '15px';
    }

    if (screenWidth <= 375) {
      container.style.width = '80vw';
      container.style.height = '8vh';
      countdownText.style.fontSize = '14px';
    }

    if (screenWidth <= 320) {
      container.style.width = '80vw';
      container.style.height = '8vh';
      countdownText.style.fontSize = '10px';
    }
  }
  
}

customElements.define('count-down', CountDown);
