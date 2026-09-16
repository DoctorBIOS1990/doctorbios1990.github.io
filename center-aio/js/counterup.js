(function () {
  function formatNumber(value, decimals, useGrouping) {
    const rounded = decimals > 0
      ? Number(value).toFixed(decimals)
      : String(Math.round(value));

    const [whole, fraction = ""] = rounded.split(".");
    const formattedWhole = useGrouping
      ? whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : whole;

    return decimals > 0 ? `${formattedWhole}.${fraction}` : formattedWhole;
  }

  function startCounter(el, options) {
    const text = el.textContent.trim();
    if (!/[0-9]/.test(text)) return;

    const useGrouping = /[0-9]+,[0-9]+/.test(text);
    const cleanText = text.replace(/,/g, "");
    const isFloat = /^[0-9]+\.[0-9]+$/.test(cleanText);
    const decimals = isFloat ? (cleanText.split(".")[1] || "").length : 0;
    const targetValue = parseFloat(cleanText);

    const steps = Math.max(1, Math.round(options.time / options.delay));
    const values = [];

    for (let i = steps; i >= 1; i--) {
      let current = (targetValue / steps) * i;

      if (isFloat) {
        current = Number(current.toFixed(decimals));
      }

      values.unshift(formatNumber(current, decimals, useGrouping));
    }

    el.textContent = "0";

    let index = 0;
    const tick = () => {
      el.textContent = values[index];

      index++;

      if (index < values.length) {
        setTimeout(tick, options.delay);
      }
    };

    setTimeout(tick, options.delay);
  }

  function counterUp(selector, options = {}) {
    const settings = {
      time: 400,
      delay: 10,
      ...options
    };

    const elements = typeof selector === "string"
      ? document.querySelectorAll(selector)
      : selector;

    elements.forEach((el) => {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounter(entry.target, settings);
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2
      });

      observer.observe(el);
    });
  }

  window.counterUp = counterUp;
})();

// RUNNING
counterUp(".counter", {
    time: 500,
    delay: 10
});