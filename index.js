
  // Mobile menu toggle
      const menuBtn = document.getElementById('menuBtn')
      const mobilePanel = document.getElementById('mobilePanel')
      const menuIcon = document.getElementById('menuIcon')
      let open = false
      menuBtn.addEventListener('click', () => {
        open = !open
        mobilePanel.classList.toggle('hidden', !open)
        menuIcon.innerHTML = open
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>'
      })

      
    // Smooth scroll for nav links
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href')
          if (href.startsWith('#')) {
            e.preventDefault()
            document
              .querySelector(href)
              .scrollIntoView({ behavior: 'smooth', block: 'start' })
            if (window.innerWidth < 768) {
              mobilePanel.classList.add('hidden')
              open = false
              menuIcon.innerHTML =
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>'
            }
          }
        })
      })

      
      // small enhancement: reduce header bg on scroll
      const header = document.querySelector('header')
      window.addEventListener('scroll', () => {
        if (window.scrollY > 30)
          header.classList.add('backdrop-blur', 'bg-slate-900/60', 'shadow-xl')
        else
          header.classList.remove(
            'backdrop-blur',
            'bg-slate-900/60',
            'shadow-lg'
          )
      })

      
   // Typing effect
    const typing = document.getElementById('typing');
    const phrases = ['accessible UIs', 'modern web apps', 'reusable components', 'scalable APIs','secure backend'];
    let pi = 0, ci = 0, deleting = false;
    function typeTick(){
      const current = phrases[pi];
      typing.textContent = current.slice(0, ci);
      if(!deleting && ci < current.length) { ci++; }
      else if(deleting && ci > 0) { ci--; }
      else if(!deleting && ci === current.length) { deleting = true; setTimeout(typeTick, 900); return; }
      else { deleting = false; pi = (pi+1) % phrases.length; }
      setTimeout(typeTick, deleting ? 55 : 75);
    }
    typeTick();

// form accept data login
const form = document.getElementById('contact-form');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  result.textContent = 'Please wait...';

  const formData = new FormData(form);
  const json = JSON.stringify(Object.fromEntries(formData));

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: json
    });
    const data = await res.json();
    result.textContent = data.message || (res.ok ? 'Sent!' : 'Error');
    if (res.ok) form.reset();
  } catch (err) {
    result.textContent = 'Something went wrong!';
    console.error(err);
  }
});

