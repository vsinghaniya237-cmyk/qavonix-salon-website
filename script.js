document.addEventListener('DOMContentLoaded', () => {
    
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="ph ph-x"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="ph ph-list"></i>';
            }
        });
    }

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Reviews Carousel ---
    const track = document.getElementById('reviewTrack');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    const dotsContainer = document.getElementById('reviewDots');
    
    // Check if carousel elements exist
    if (track && prevBtn && nextBtn && dotsContainer) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel();
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        };

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto play carousel
        setInterval(nextSlide, 5000);
    }

    // --- Form Submission Simulation ---
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = appointmentForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Show loading state
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Booking...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="ph ph-check-circle"></i> Confirmed!';
                btn.style.backgroundColor = '#25D366'; // WhatsApp Green for success
                btn.style.color = 'white';
                
                // Reset form
                appointmentForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'all';
                }, 3000);
            }, 1500);
        });
    }

    // --- Before/After Slider ---
    const baSlider = document.getElementById('baSlider');
    const baBefore = document.getElementById('baBefore');
    const baHandle = document.getElementById('baHandle');

    if (baSlider && baBefore && baHandle) {
        let isSliding = false;

        const slide = (e) => {
            if (!isSliding) return;
            const rect = baSlider.getBoundingClientRect();
            
            let clientX;
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percent = (x / rect.width) * 100;
            
            baBefore.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
            baHandle.style.left = `${percent}%`;
        };

        baSlider.addEventListener('mousedown', (e) => {
            isSliding = true;
            slide(e);
        });
        baSlider.addEventListener('touchstart', (e) => {
            isSliding = true;
            slide(e);
        }, { passive: true });

        window.addEventListener('mouseup', () => { isSliding = false; });
        window.addEventListener('touchend', () => { isSliding = false; });
        
        window.addEventListener('mousemove', slide);
        window.addEventListener('touchmove', slide, { passive: true });
    }

    // --- Background Music Toggle ---
    const bgMusicToggle = document.getElementById('bgMusicToggle');
    const bgMusic = document.getElementById('bgMusic');

    if (bgMusicToggle && bgMusic) {
        // We set volume low so it's subtle and premium
        bgMusic.volume = 0.3;
        
        bgMusicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
                bgMusicToggle.innerHTML = '<i class="ph ph-speaker-high"></i>';
                bgMusicToggle.style.backgroundColor = 'var(--gold)';
                bgMusicToggle.style.color = 'var(--primary-bg)';
            } else {
                bgMusic.pause();
                bgMusicToggle.innerHTML = '<i class="ph ph-speaker-slash"></i>';
                bgMusicToggle.style.backgroundColor = 'transparent';
                bgMusicToggle.style.color = 'var(--white)';
            }
        });
    }
});
