class CountDown extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.targetDate = this.getAttribute('target-date');
    this.countdownElement = document.createElement('div');
    this.countdownElement.textContent = 'Countdown:';

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
      this.countdownElement.textContent = 'Target date has already passed.';
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    this.countdownElement.textContent = `Countdown: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }
}

customElements.define('count-down', CountDown);
