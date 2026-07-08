  // CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx-6+'px'; cursor.style.top=my-6+'px'; });
  setInterval(()=>{ rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ring.style.left=rx-18+'px'; ring.style.top=ry-18+'px'; },10);
  document.querySelectorAll('a,button,.skill-card,.hobby-card,.like-card,.project-card,.stat-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cursor.style.transform='scale(2)'; ring.style.transform='scale(1.5)'; ring.style.borderColor='rgba(224,92,75,0.8)'; });
    el.addEventListener('mouseleave',()=>{ cursor.style.transform='scale(1)'; ring.style.transform='scale(1)'; ring.style.borderColor='rgba(224,92,75,0.5)'; });
  });

  // NAVBAR SCROLL
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-links a');
    sections.forEach((s,i) => {
      const top = s.offsetTop - 100;
      if(window.scrollY >= top) links.forEach(l=>l.classList.remove('active')), links[i] && links[i].classList.add('active');
    });
  });

  // HAMBURGER
  document.getElementById('hamburger').addEventListener('click',()=>{
    document.getElementById('navLinks').classList.toggle('open');
  });

  // TYPED EFFECT
  const roles = ['Final Year IT Student 🎓','Software Engineer 💻','Coding Enthusiast 🤖','Cat Lover'];
  let ri=0,ci=0,del=false;
  const el = document.getElementById('typed');
  setInterval(()=>{
    const r = roles[ri];
    if(!del){ el.textContent=r.slice(0,++ci); if(ci===r.length){del=true;setTimeout(()=>{},1500);} }
    else { el.textContent=r.slice(0,--ci); if(ci===0){del=false;ri=(ri+1)%roles.length;} }
  },80);

  // SCROLL REVEAL
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // SKILL BAR FILL
  const skillObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ const fill=e.target.querySelector('.skill-fill'); if(fill) fill.style.width=fill.dataset.width+'%'; }
    });
  },{threshold:0.5});
  document.querySelectorAll('.skill-card').forEach(c=>skillObs.observe(c));

  // COUNT UP
  const countObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ const el=e.target; const target=+el.dataset.target; let c=0; const step=target/50; const t=setInterval(()=>{ c=Math.min(c+step,target); el.textContent=Math.floor(c); if(c>=target)clearInterval(t); },30); countObs.unobserve(el); }
    });
  },{threshold:0.5});
  document.querySelectorAll('.count').forEach(c=>countObs.observe(c));

  // FORM SUBMIT
  function handleSubmit(e){
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const form = document.getElementById('contactForm');

    btn.disabled = true;
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" style="margin-left:0.5rem"></i>';

    emailjs.sendForm('service_3ldhewk', 'template_vqw0b7n', form)
      .then(() => {
        btn.innerHTML = 'Sent! ✓';
        btn.style.background = '#2ecc71';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = 'Send Message <i class="fas fa-paper-plane" style="margin-left:0.5rem"></i>';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        btn.innerHTML = 'Failed — Try Again';
        btn.style.background = '#e74c3c';
        setTimeout(() => {
          btn.innerHTML = 'Send Message <i class="fas fa-paper-plane" style="margin-left:0.5rem"></i>';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      });
  }

  // THEME TOGGLE
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if(savedTheme === 'light'){ document.body.classList.add('light'); themeBtn.textContent = '☀️'; }
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // LUCY GALLERY
  const lucyImg = document.getElementById('lucyImg');
  const prevLucy = document.getElementById('prevLucy');
  const nextLucy = document.getElementById('nextLucy');
  let currentLucyIndex = 1;
  const totalLucyImages = 10;

  if (lucyImg && prevLucy && nextLucy) {
    const updateLucyImage = () => {
      lucyImg.style.opacity = '0.5';
      setTimeout(() => {
        lucyImg.src = `img/lucy/lucy${currentLucyIndex}.jpg`;
        lucyImg.style.opacity = '1';
      }, 150);
    };

    prevLucy.addEventListener('click', () => {
      currentLucyIndex = currentLucyIndex > 1 ? currentLucyIndex - 1 : totalLucyImages;
      updateLucyImage();
    });

    nextLucy.addEventListener('click', () => {
      currentLucyIndex = currentLucyIndex < totalLucyImages ? currentLucyIndex + 1 : 1;
      updateLucyImage();
    });
  }


  // PROJECT CAROUSEL
  function moveCarousel(id, step) {
    const carousel = document.getElementById(id);
    if (!carousel) return;
    const images = carousel.querySelectorAll('img');
    if (images.length === 0) return;
    let currentIndex = parseInt(carousel.dataset.index || '0');
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + step + images.length) % images.length;
    images[currentIndex].classList.add('active');
    carousel.dataset.index = currentIndex;
  }
