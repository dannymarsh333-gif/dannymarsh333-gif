const TIER_FILL = { beginner: 0.3, intermediate: 0.55, advanced: 0.8, expert: 0.95 };

function initSkillMeters() {
  const meters = document.querySelectorAll('.skill-meter');
  if (!meters.length) return;

  meters.forEach(meter => {
    const circle = meter.querySelector('.fill');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const meter = entry.target;
      const circle = meter.querySelector('.fill');
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const tier = meter.dataset.tier;
      const fraction = TIER_FILL[tier] ?? 0.5;
      circle.style.strokeDashoffset = `${circumference * (1 - fraction)}`;
      observer.unobserve(meter);
    });
  }, { threshold: 0.4 });

  meters.forEach(meter => observer.observe(meter));
}

function initExperienceFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.cards .card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const matches = filter === 'all' || card.dataset.category === filter;
        if (matches) {
          card.classList.remove('card-hidden');
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = '';
        } else {
          card.classList.add('card-hidden');
        }
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSkillMeters();
  initExperienceFilter();
});
