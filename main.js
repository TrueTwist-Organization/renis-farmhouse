// Rezza Premium Website Core Engine
let lenis;

// Ensure page always starts at top on refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', async () => {
    window.scrollTo(0, 0); // Force top
    // 1. Initial State
    gsap.set('main', { opacity: 0 });

    // 2. Preloader & Sequential Init
    await initPreloader();
    
    // 3. Initialize Core Systems
    initLenis();
    initThreeJS();
    initCustomCursor();
    initEntryReveal();
    initCircularShowcase();
    initHorizontalScroll();
    initMapInteraction();
    initGeneralAnimations();
    initPremium3DEngine();
    initImpressiveNavbar();
    initFormHandling();
    initAmenitiesSlider();
    initViewMoreAmenities();
    initViewMoreGallery();
    initHomeAnimation();

    // 4. Force global refresh to sync all pinning
    ScrollTrigger.refresh();
});

// --- Home Animation (Sequence 2) ---
function initHomeAnimation() {
    const canvas = document.querySelector('#home-anim-canvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    const setCanvasSize = () => {
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const imgRatio = 1280 / 720;
        const winRatio = winW / winH;

        if (winRatio > imgRatio) {
            canvas.width = winW;
            canvas.height = winW / imgRatio;
        } else {
            canvas.height = winH;
            canvas.width = winH * imgRatio;
        }
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const frameCount = 80;
    const currentFrame = index => (
        `home animation/Whisk_lldnwemnxmmyxqwmtytzkjwl3ywy00szlvgztyt_${index.toString().padStart(3, '0')}.jpg`
    );

    const images = [];
    const scrollObj = { frame: 0 };
    let loadedImages = 0;

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            if (loadedImages === 1) render(); 
        };
        img.src = currentFrame(i);
        images.push(img);
    }

    gsap.to(scrollObj, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: "#home-animation",
            start: "top top",
            end: "+=100%",
            scrub: 0.8,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: render 
        }
    });

    // Text Animation
    gsap.to(".home-anim-text > *", {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: "#home-animation",
            start: "top -10%",
            end: "top -50%",
            scrub: true
        }
    });

    function render() {
        if (!images[scrollObj.frame]) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[scrollObj.frame], 0, 0, canvas.width, canvas.height);
    }
}

// --- Gallery Toggle ---
function initViewMoreGallery() {
    const btn = document.querySelector('#view-all-gallery');
    const track = document.querySelector('.gallery-track');
    if (!btn || !track) return;

    btn.addEventListener('click', () => {
        track.classList.toggle('show-all-gallery');
        if (track.classList.contains('show-all-gallery')) {
            btn.textContent = 'Show Less';
        } else {
            btn.textContent = 'View Full Gallery';
            // Scroll back to the top of the gallery section
            const section = document.querySelector('#gallery');
            if (section) {
                lenis.scrollTo(section, { offset: -100, duration: 1 });
            }
        }
    });
}
// --- Amenities Toggle ---
function initViewMoreAmenities() {
    const btn = document.querySelector('#view-all-amenities');
    const grid = document.querySelector('.am-grid');
    if (!btn || !grid) return;

    btn.addEventListener('click', () => {
        grid.classList.toggle('show-all');
        if (grid.classList.contains('show-all')) {
            btn.textContent = 'Show Less';
            btn.style.borderColor = 'rgba(197, 160, 89, 0.3)';
        } else {
            btn.textContent = 'View All Amenities';
            btn.style.borderColor = 'var(--accent)';
            // Scroll back to the top of the amenities section when closing
            const section = document.querySelector('#amenities-3d');
            if (section) {
                lenis.scrollTo(section, { offset: -100, duration: 1 });
            }
        }
    });
}

// --- Entry Reveal Image Sequence ---
function initEntryReveal() {
    const canvas = document.querySelector('#entry-canvas');
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    const setCanvasSize = () => {
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const imgRatio = 1280 / 720;
        const winRatio = winW / winH;

        if (winRatio > imgRatio) {
            canvas.width = winW;
            canvas.height = winW / imgRatio;
        } else {
            canvas.height = winH;
            canvas.width = winH * imgRatio;
        }
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const frameCount = 100;
    const currentFrame = index => (
        `entry/Flow_202604171522 (online-video-cutter.com) (2)_${index.toString().padStart(3, '0')}.jpg`
    );

    const images = [];
    const airship = { frame: 0 };
    let loadedImages = 0;

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            if (loadedImages === 1) render(); 
        };
        img.src = currentFrame(i);
        images.push(img);
    }

    gsap.to(airship, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: "#entry-reveal",
            start: "top top",
            end: "+=200%",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: render 
        }
    });

    function render() {
        if (!images[airship.frame]) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[airship.frame], 0, 0, canvas.width, canvas.height);
    }
}

// --- Circular Showcase ---
function initCircularShowcase() {
    const section = document.querySelector('#circular-showcase');
    const dot = document.querySelector('.draggable-dot');
    const imgLayers = gsap.utils.toArray('.img-layer');
    const textLayers = gsap.utils.toArray('.text-layer');
    const bgLayers = gsap.utils.toArray('.bg-layer');
    const ringProgress = document.querySelector('.ring-progress');
    const indicators = gsap.utils.toArray('.ind');
    
    if (!section || !dot) return;

    let currentIdx = 0;
    const totalLength = 301.6;

    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=250%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            const rotation = self.progress * 360;
            gsap.set(dot, { rotation: rotation });
            const offset = (1 - self.progress) * totalLength;
            gsap.set(ringProgress, { strokeDashoffset: offset });

            let index = Math.floor(self.progress * 7);
            if (index > 6) index = 6;
            if (index !== currentIdx) {
                updateExperience(index);
                currentIdx = index;
            }
        }
    });

    function updateExperience(index) {
        textLayers.forEach((layer, i) => {
            if (i === index) {
                layer.classList.add('active');
                gsap.fromTo(layer, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
            } else {
                layer.classList.remove('active');
                gsap.to(layer, { opacity: 0, duration: 0.4 });
            }
        });

        imgLayers.forEach((layer, i) => {
            if (i === index) {
                layer.classList.add('active');
                gsap.fromTo(layer, 
                    { clipPath: 'circle(0% at center)' }, 
                    { clipPath: 'circle(100% at center)', duration: 0.8, ease: 'power2.inOut' }
                );
            } else {
                layer.classList.remove('active');
            }
        });

        bgLayers.forEach((layer, i) => {
            if (i === index) {
                layer.classList.add('active');
                gsap.to(layer, { opacity: 1, duration: 1 });
            } else {
                layer.classList.remove('active');
                gsap.to(layer, { opacity: 0, duration: 1 });
            }
        });

        indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
    }

    updateExperience(0);
}

// --- Horizontal Scroll ---
function initHorizontalScroll() {
    const section = document.querySelector('#experience');
    const content = document.querySelector('.h-scroll-content');
    
    if (!section || !content) return;

    gsap.to(content, {
        x: () => -(content.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + (content.scrollWidth - window.innerWidth), 
            scrub: 1, 
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });
}

// --- Smooth Scroll (Lenis) ---
function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
}

// --- Preloader ---
function initPreloader() {
    return new Promise((resolve) => {
        const showcaseImages = [
            'wooden-villa-1.png',
            'pool.png',
            'interior.png',
            'hero.png',
            'wooden-villa-2.png',
            'family_legacy.png',
            'Whisk_56fa795bfeae0c0b07545f4dc143f6a8eg.png'
        ];

        let loadedCount = 0;
        let revealStarted = false;

        const startReveal = () => {
            if (revealStarted) return;
            revealStarted = true;
            gsap.set('main', { opacity: 1, visibility: 'visible' });

            const tl = gsap.timeline({
                onComplete: () => {
                    const pl = document.getElementById('preloader');
                    if(pl) pl.style.display = 'none';
                    resolve();
                }
            });
            
            tl.to('.logo-text', { opacity: 1, y: 0, duration: 0.4 })
              .to('.loader-bar', { width: '100%', duration: 0.3 }, "-=0.2")
              .to('#preloader', { yPercent: -100, duration: 0.8, ease: 'expo.inOut' })
              .from('main', { opacity: 0, duration: 0.5 }, "-=0.4");
        };

        const safetyTimeout = setTimeout(startReveal, 2000);

        showcaseImages.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loadedCount++;
                if (loadedCount === showcaseImages.length) {
                    clearTimeout(safetyTimeout);
                    startReveal();
                }
            };
            img.src = src;
        });
    });
}

// --- Impressive Navbar System ---
function initImpressiveNavbar() {
    const nav = document.querySelector('#main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navPill = document.querySelector('.nav-pill');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    if (!nav) return;

    // 1. Pill Movement & Magnetic Effect
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const rect = link.getBoundingClientRect();
            const parentRect = link.parentElement.getBoundingClientRect();
            
            gsap.to(navPill, {
                opacity: 1,
                left: rect.left - parentRect.left,
                width: rect.width,
                duration: 0.4,
                ease: "power3.out"
            });
        });

        // Magnetic effect
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            gsap.to(link, {
                x: x * 15,
                y: y * 10,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, { x: 0, y: 0, duration: 0.4 });
        });
    });

    const navContainer = nav.querySelector('.nav-container');
    navContainer.addEventListener('mouseleave', () => {
        gsap.to(navPill, { opacity: 0, duration: 0.4 });
    });

    // 2. Scroll Logic: Hide on scroll down, show on up
    let lastScroll = 0;
    lenis.on('scroll', ({ scroll }) => {
        if (scroll > 100) {
            nav.classList.add('scrolled');
            if (scroll > lastScroll && scroll > 400) {
                // Scroll Down
                gsap.to(nav, { y: -150, duration: 0.6, ease: "power3.inOut" });
            } else {
                // Scroll Up
                gsap.to(nav, { y: 0, duration: 0.6, ease: "power3.out" });
            }
        } else {
            nav.classList.remove('scrolled');
            gsap.to(nav, { y: 0, duration: 0.6 });
        }
        lastScroll = scroll;

        // Active State Tracking
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            if (!targetId.startsWith('#')) return;
            const target = document.querySelector(targetId);
            if (target) {
                const rect = target.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    });

    // 3. Smooth Interactions
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    navMenu.classList.remove('active');
                    if(menuToggle) menuToggle.classList.remove('active');
                    lenis.scrollTo(target, { offset: -50, duration: 1.5 });
                }
            }
        });
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'admin.html';
        });
        
        // Logo Magnetic
        logo.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(logo, { x: x * 20, y: y * 10, rotationZ: x * 5, duration: 0.4 });
        });
        logo.addEventListener('mouseleave', () => {
            gsap.to(logo, { x: 0, y: 0, rotationZ: 0, duration: 0.4 });
        });
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// --- Three.js Background ---
function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0xC5A059,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- Map Interaction ---
function initMapInteraction() {
    const box = document.querySelector('.location-box');
    const map = document.querySelector('#map-3d');
    if (box && map) {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(map, { rotationY: x * 5, rotationX: -y * 5, duration: 0.5, ease: "power2.out" });
        });
    }
}

// --- General Animations ---
function initGeneralAnimations() {
    gsap.utils.toArray('.reveal-up, .reveal-text').forEach((elem) => {
        gsap.to(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out"
        });
    });

    // Antigravity Privacy Specific
    const antiLink = document.querySelector('.antigravity-link');
    if (antiLink) {
        gsap.to(antiLink, {
            scrollTrigger: {
                trigger: '#antigravity-privacy',
                start: "top 80%",
                onEnter: () => {
                    gsap.to(antiLink, {
                        opacity: 1,
                        y: 0,
                        duration: 2,
                        ease: "power2.out",
                        onComplete: () => {
                            const wrap = document.querySelector('.antigravity-float-wrap');
                            if(wrap) wrap.classList.add('antigravity-active');
                        }
                    });
                }
            },
            y: 0 
        });
        // Initial state via GSAP
        gsap.set(antiLink, { opacity: 0, y: 40 });
    }
}

// --- Premium 3D Interaction Engine ---
function initPremium3DEngine() {
    document.querySelectorAll('[data-3d-tilt-subtle], .premium-card').forEach(card => {
        const content = card.querySelector('.card-content-3d') || card;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(content, { rotationY: x * 5, rotationX: -y * 5, duration: 0.8, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(content, { rotationY: 0, rotationX: 0, duration: 1 });
        });
    });
}
// --- Amenities Slider Logic ---
function initAmenitiesSlider() {
    const grid = document.querySelector('.am-grid');
    const prevBtn = document.querySelector('.am-prev');
    const nextBtn = document.querySelector('.am-next');
    
    if (!grid || !prevBtn || !nextBtn) return;

    const scrollAmount = 350; // Amount to scroll per click

    nextBtn.addEventListener('click', () => {
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    // Check visibility of buttons (optional but premium)
    grid.addEventListener('scroll', () => {
        prevBtn.style.opacity = grid.scrollLeft <= 0 ? '0.3' : '1';
        const atEnd = grid.scrollLeft + grid.offsetWidth >= grid.scrollWidth - 10;
        nextBtn.style.opacity = atEnd ? '0.3' : '1';
    });
}

// --- Custom Cursor ---
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<span class="cursor-text">EXPLORE</span>';
    document.body.appendChild(cursor);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15;

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;
        gsap.set(cursor, { x: pos.x, y: pos.y });
    });

    // Hover states
    document.querySelectorAll('a, button, .menu-toggle, .logo, .draggable-dot, .am-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            if (el.classList.contains('img-layer') || el.closest('.showcase-visual')) {
                const text = cursor.querySelector('.cursor-text');
                if(text) {
                    text.style.opacity = '1';
                    text.style.transform = 'scale(1)';
                }
            }
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            const text = cursor.querySelector('.cursor-text');
            if(text) {
                text.style.opacity = '0';
                text.style.transform = 'scale(0)';
            }
        });
    });
}

// --- Form Handling & Lead Generation ---
function initFormHandling() {
    const form = document.querySelector('#booking-form');
    if (!form) return;

    const btn = form.querySelector('#submit-booking');
    const inputs = form.querySelectorAll('input, textarea');
    const phoneInput = form.querySelector('#phone-number');
    const nameInput = form.querySelector('#full-name');
    const emailInput = form.querySelector('#email-address');
    const visitDateInput = form.querySelector('#visit-date');
    const messageInput = form.querySelector('#message');
    const charCount = form.querySelector('.char-count');

    // 1. Set Min Date
    const today = new Date().toISOString().split('T')[0];
    if(visitDateInput) visitDateInput.min = today;

    // 2. Real-time Validation Listeners
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
            validateAll();
        });
        input.addEventListener('blur', () => validateField(input));
    });

    // 3. Numeric-only phone
    phoneInput.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) e.preventDefault();
    });

    // 4. Character counter
    messageInput.addEventListener('input', () => {
        charCount.textContent = `${messageInput.value.length} / 300`;
    });

    function validateField(input) {
        let isValid = true;
        let msg = "";

        if (input.required && !input.value.trim()) {
            isValid = false;
            msg = "This field is required";
        } else {
            if (input.id === 'full-name') {
                if (input.value.length < 2) {
                    isValid = false;
                    msg = "Minimum 2 characters required";
                } else if (!/^[a-zA-Z\s]*$/.test(input.value)) {
                    isValid = false;
                    msg = "Only alphabets allowed";
                }
            }

            if (input.id === 'email-address') {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                    isValid = false;
                    msg = "Please enter a valid email address";
                }
            }

            if (input.id === 'phone-number') {
                if (!/^\d{10}$/.test(input.value)) {
                    isValid = false;
                    msg = "Please enter a valid 10-digit phone number";
                }
            }
        }

        const errorSpan = input.parentElement.querySelector('.error-msg');
        if (!isValid) {
            input.classList.add('invalid');
            if (errorSpan) {
                errorSpan.textContent = msg;
                errorSpan.classList.add('visible');
            }
        } else {
            input.classList.remove('invalid');
            if (errorSpan) errorSpan.classList.remove('visible');
        }

        return isValid;
    }

    function validateAll() {
        let formIsValid = true;
        form.querySelectorAll('[required]').forEach(el => {
            if (!el.value.trim() || !validateField(el)) formIsValid = false;
        });
        if (!/^\d{10}$/.test(phoneInput.value)) formIsValid = false;
        btn.disabled = !formIsValid;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        submitLead(form);
    });

    async function submitLead(form) {
        btn.disabled = true;
        btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Processing...';

        const data = Object.fromEntries(new FormData(form).entries());
        data.id = 'REQ-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        data.timestamp = new Date().toISOString();
        data.status = 'New Lead';

        const leads = JSON.parse(localStorage.getItem('rezza_leads') || '[]');
        leads.push(data);
        localStorage.setItem('rezza_leads', JSON.stringify(leads));

        await new Promise(r => setTimeout(r, 1500));

        const formSide = form.parentElement;
        formSide.innerHTML = `
            <div class="form-success">
                <i class="ri-checkbox-circle-fill"></i>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--accent); margin-bottom: 1rem;">Sanctuary Booked</h3>
                <p style="opacity: 0.8; line-height: 1.6;">Your journey begins. Our lead curator will contact you on <strong>${phoneInput.value}</strong> shortly.</p>
                <button onclick="location.reload()" class="btn-submit" style="margin-top: 2rem;">Back to Reservations</button>
            </div>
        `;
    }
}
