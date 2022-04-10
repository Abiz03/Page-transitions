const tlLeave = gsap.timeline({
  defaults: {duration: 0.75, ease: 'Power2.easeOut'}
})
const tlEnter = gsap.timeline({
  defaults: {duration: 0.75, ease: 'Power2.easeOut'}
})

// Make the functions for the leave and enter animations
const leaveAnimation = (current, done) => {
  const product = current.querySelector('.image-container');
  const text = current.querySelector('.showcase-text');
  const circles = current.querySelectorAll('.circle');
  const arrow = current.querySelector('.showcase-arrow');
  return (
    tlLeave.fromTo(arrow, {opacity: 1, y: 0}, {opacity: 0, y: 50}),
    tlLeave.fromTo(product, {y: 0, opacity: 1}, {y: 100, opacity: 0, onComplete: done}, '<'),
    tlLeave.fromTo(text, {y: 0, opacity: 1}, {opacity: 0, y: 100}, '<'),
    tlLeave.fromTo(circles, {y: 0, opacity: 1}, {y: -200, opacity: 0, stagger: 0.15, ease: 'back.out(1.7)', duration: 1}, '<')
  );
}
const enterAnimation = (current, done, gradient) => {
  const product = current.querySelector('.image-container');
  const text = current.querySelector('.showcase-text');
  const circles = current.querySelectorAll('.circle');
  const arrow = current.querySelector('.showcase-arrow');
  return (
    tlEnter.fromTo(arrow, {opacity: 0, y: 50}, {opacity: 1, y: 0}),
    tlEnter.to('body', {background: gradient}, '<'),
    tlEnter.fromTo(product, {y: -100, opacity: 0}, {y: 0, opacity: 1, onComplete: done}, '<'),
    tlEnter.fromTo(text, {y: 100, opacity: 0}, {opacity: 1, y: 0}, '<'),
    tlEnter.fromTo(
      circles, 
      {y: -200, opacity: 0}, 
      {y: 0, opacity: 1, stagger: 0.15, ease: 'back.out(1.7)', duration: 1}, 
      '<'
    )
  );
}

// Run animations
barba.init({
  preventRunning: true,
  transitions: [
    // Showcase transitions
    {
      name: "default",
      once(data) {
        const done = this.async()
        let next = data.next.container
        let gradient = getGradient(data.next.namespace);
        gsap.set('body', {background: gradient}),
        enterAnimation(next, done, gradient)
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        leaveAnimation(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        enterAnimation(next, done, gradient);
      },
    },
    // product page animation
    {
      name: 'product-transition',
      sync: true,
      from: {namespace: ['handbag', 'product']},
      to: {namespace: ['product', 'handbag']},
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        productEnterAnimation(next, done)
      },
      leave(data) {
        const done = this.async();
        let current = data.current.container;
        productLeaveAnimation(current, done)
      }
    }
  ],
});


function productEnterAnimation(next, done) {
  tlEnter.fromTo(next, {y: '100%'}, {y: '0%'})
  tlEnter.fromTo('.card', {opacity: 0, y: 50}, {opacity: 1, y: 0, stagger: 0.1, onComplete: done})
}
function productLeaveAnimation(current, done) {
  tlLeave.fromTo(current, {y: '0%'}, {y: '100%', onComplete: done})
}
// changing gradient on showcase
function getGradient(name) {
  switch (name) {
    case 'handbag':
      return "linear-gradient(260deg, #b75d62, #754d4f)";
    case "boot":
      return "linear-gradient(260deg, #5b8cb7, #4c4f70)";
    case "hat":
      return "linear-gradient(260deg, #b27a5c, #7f5450)";
  }
}













