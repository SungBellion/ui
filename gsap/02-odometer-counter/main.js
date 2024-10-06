let currentValue = "20000";

function animateOdometer(target, start, end, duration) {
  const startY = -(1 * start) + "em";
  const endY = -(1 * end) + "em";
  gsap.fromTo(target, { y: startY }, { y: endY, duration: duration, ease: "power2.out" });
}

function startOdometerAnimation(newValue) {
  const currentDigits = currentValue.padStart(5, "0").split("");
  const newDigits = newValue.padStart(5, "0").split("");

  for (let i = 0; i < 5; i++) {
    const currentDigit = parseInt(currentDigits[i], 10);
    const newDigit = parseInt(newDigits[i], 10);

    if (currentDigit !== newDigit) {
      const target = `#digit-${5 - i}`;
      animateOdometer(target, currentDigit, newDigit, 0.5);
    }
  }

  currentValue = newValue;
}

document.querySelectorAll('button[data-number]').forEach(button => {
  button.addEventListener('click', function () {
    const newValue = this.getAttribute('data-number');
    if (newValue !== currentValue) {
      startOdometerAnimation(newValue);
    }
  });
});
