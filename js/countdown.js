class CountDown extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Set the target date (YYYY-MM-DD format)
    this.targetDate = '2023-07-29';

    this.countdownElement = document.createElement('div');

   
    this.countdownElement.style.fontFamily = "'Montserrat', 'Arial', sans-serif"; // Change the font family
    this.countdownElement.style.color = 'White'; 
    this.countdownElement.style.fontSize = '36px'; 
    this.countdownElement.style.margin = '10px'; // Add margin

    shadowRoot.appendChild(this.countdownElement);


  }

  connectedCallback() {
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

    this.countdownElement.textContent = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }
}

customElements.define('count-down', CountDown);
