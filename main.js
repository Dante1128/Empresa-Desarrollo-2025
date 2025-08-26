// Preloader con animación extravagante
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    // Animación de partículas en el preloader
    createPreloaderParticles();
    
    setTimeout(function() {
        // Animación de salida con efecto
        preloader.style.opacity = '0';
        preloader.style.transform = 'scale(1.2)';
        preloader.style.filter = 'blur(20px)';
        
        setTimeout(function() {
            preloader.style.display = 'none';
            
            // Animación de entrada para el contenido principal
            document.querySelectorAll('.main-content > *').forEach((el, i) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 150);
            });
        }, 800);
    }, 1500);
});

// Crear partículas para el preloader
function createPreloaderParticles() {
    const preloader = document.querySelector('.preloader');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('preloader-particle');
        
        // Posición y tamaño aleatorio
        const size = Math.random() * 12 + 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const duration = Math.random() * 2 + 1.5;
        const colors = ['#ff0066', '#00ffcc', '#ffcc00', '#6600ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            top: ${posY}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            background: ${randomColor};
            box-shadow: 0 0 15px ${randomColor}, 0 0 30px ${randomColor};
            border-radius: 50%;
            position: absolute;
        `;
        
        preloader.appendChild(particle);
    }
}

// Sticky Header con efecto de profundidad y paralax
let lastScrollY = window.scrollY;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backToTop.classList.add('active');
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('active');
        header.style.boxShadow = 'none';
        header.style.backdropFilter = 'none';
    }
    
    // Efecto de aparición al hacer scroll hacia arriba
    if (window.scrollY < lastScrollY && window.scrollY > 200) {
        header.style.transform = 'translateY(0)';
    } else if (window.scrollY > 200) {
        header.style.transform = 'translateY(-100%)';
    }
    
    // Efecto de paralax en elementos con atributo data-parallax
    document.querySelectorAll('[data-parallax]').forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
        const yPos = -(window.scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
    
    lastScrollY = window.scrollY;
});

// Mobile Menu Toggle con animación extravagante
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

if (menuToggle && navbar) {
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        
        // Animación de icono de hamburguesa a X
        if (navbar.classList.contains('active')) {
            menuToggle.style.transform = 'rotate(180deg)';
            menuToggle.querySelector('i').className = 'fas fa-times';
            
            // Animación de entrada para los enlaces del menú
            document.querySelectorAll('.nav-link').forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(50px)';
                setTimeout(() => {
                    link.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0)';
                }, index * 100);
            });
        } else {
            menuToggle.style.transform = 'rotate(0deg)';
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        if (navbar) navbar.classList.remove('active');
        if (menuToggle) {
            menuToggle.style.transform = 'rotate(0deg)';
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
});

// Smooth scrolling for anchor links con efecto de partículas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Efecto de partículas al hacer clic
            createClickParticles(e);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Crear partículas al hacer clic
function createClickParticles(event) {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        z-index: 10000;
        pointer-events: none;
    `;
    
    document.body.appendChild(particlesContainer);
    
    const particleCount = 12;
    const colors = ['#ff0066', '#00ffcc', '#ffcc00', '#6600ff'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            position: absolute;
            opacity: 0;
        `;
        
        // Animación
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 30;
        const duration = Math.random() * 0.8 + 0.5;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(0)', 
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`, 
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        particlesContainer.appendChild(particle);
    }
    
    // Eliminar contenedor después de la animación
    setTimeout(() => {
        document.body.removeChild(particlesContainer);
    }, 1000);
}

// Portfolio Filter with animación extravagante
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Animación de clic
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = '';
            btn.style.color = '';
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        this.style.background = 'linear-gradient(45deg, var(--primary-color), var(--accent-color))';
        this.style.color = 'white';
        
        const filterValue = this.getAttribute('data-filter');
        
        // Animación de salida
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8) rotateY(180deg)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8) rotateY(180deg)';
            }
        });
        
        // Animación de entrada después de la salida
        setTimeout(() => {
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) rotateY(0deg)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        }, 300);
    });
});

// Counter Animation con efectos extravagantes
const counterItems = document.querySelectorAll('.stat-number');

function startCounter() {
    counterItems.forEach(item => {
        const target = +item.getAttribute('data-count');
        const duration = 2000;
        const startTime = Date.now();
        
        // Efecto visual durante el conteo
        item.style.textShadow = '0 0 10px var(--primary-color)';
        item.style.color = 'var(--accent-color)';
        
        function updateCounter() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            
            if (elapsed < duration) {
                const progress = elapsed / duration;
                const value = Math.floor(progress * target);
                item.textContent = value;
                
                // Efecto de vibración durante el conteo
                item.style.transform = `scale(${1 + Math.sin(elapsed/50) * 0.05})`;
                
                requestAnimationFrame(updateCounter);
            } else {
                item.textContent = target;
                item.style.transform = 'scale(1)';
                
                // Efecto final
                setTimeout(() => {
                    item.style.textShadow = '0 0 20px var(--primary-color)';
                    setTimeout(() => {
                        item.style.textShadow = 'none';
                        item.style.color = '';
                    }, 1000);
                }, 500);
            }
        }
        
        updateCounter();
    });
}

// Intersection Observer for animations con efectos extravagantes
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-stats')) {
                startCounter();
            }
            
            // Animaciones diferentes según el tipo de elemento
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.animation = 'float 6s ease-in-out infinite';
                entry.target.style.transform = 'perspective(1000px) rotateX(5deg)';
            } else if (entry.target.classList.contains('portfolio-item')) {
                entry.target.style.animation = 'pulseGlow 4s ease-in-out infinite';
            } else if (entry.target.classList.contains('testimonial')) {
                entry.target.style.animation = 'fadeInLeft 1s ease forwards';
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0)';
                entry.target.style.filter = 'blur(0)';
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos con animaciones extravagantes
document.querySelectorAll('.section, .service-card, .portfolio-item, .testimonial').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px) rotateX(10deg)';
    section.style.filter = 'blur(5px)';
    section.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(section);
});

// Form Submission con efectos visuales extravagantes
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const originalBg = submitBtn.style.background;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Efecto de carga
        submitBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--accent-color))';
        submitBtn.style.animation = 'pulse 1.5s infinite';
        
        // Simular envío
        setTimeout(() => {
            submitBtn.style.animation = 'none';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
            submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #2E7D32)';
            
            // Efecto de confeti extravagante
            createExtravagantConfetti();
            
            setTimeout(() => {
                alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = originalBg;
            }, 2000);
        }, 2000);
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const originalBg = submitBtn.style.background;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(45deg, var(--primary-color), var(--accent-color))';
        
        // Simular envío
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #2E7D32)';
            
            // Efecto de explosión
            createNewsletterEffect(submitBtn);
            
            setTimeout(() => {
                alert('Gracias por suscribirte a nuestro newsletter!');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = originalBg;
            }, 1500);
        }, 1500);
    });
}

// Confeti extravagante
function createExtravagantConfetti() {
    const confettiCount = 100;
    const colors = ['#ff0066', '#00ffcc', '#ffcc00', '#6600ff', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const size = Math.random() * 12 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = Math.random() > 0.5 ? 'rect' : 'circle';
        
        confetti.style.cssText = `
            width: ${size}px;
            height: ${shape === 'rect' ? size/3 : size}px;
            background: ${color};
            border-radius: ${shape === 'circle' ? '50%' : '2px'};
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}%;
            z-index: 1000;
            pointer-events: none;
            transform: rotate(${Math.random() * 360}deg);
            box-shadow: 0 0 10px ${color};
        `;
        
        document.body.appendChild(confetti);
        
        // Animación
        const animationDuration = Math.random() * 3000 + 2000;
        const horizontalMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { 
                transform: `translate(0, 0) rotate(0deg)`, 
                opacity: 1 
            },
            { 
                transform: `translate(${horizontalMovement}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`, 
                opacity: 0 
            }
        ], {
            duration: animationDuration,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
            fill: 'forwards'
        });
        
        // Eliminar confeti después de la animación
        setTimeout(() => {
            if (document.body.contains(confetti)) {
                document.body.removeChild(confetti);
            }
        }, animationDuration);
    }
}

// Efecto para newsletter
function createNewsletterEffect(button) {
    const rect = button.getBoundingClientRect();
    const effectContainer = document.createElement('div');
    effectContainer.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        pointer-events: none;
        z-index: 1000;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(effectContainer);
    
    const particleCount = 20;
    const colors = ['#ff0066', '#00ffcc', '#ffcc00', '#6600ff'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            position: absolute;
            opacity: 0;
            box-shadow: 0 0 15px ${color};
        `;
        
        // Animación
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 1000 + 500;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(0)', 
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`, 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        effectContainer.appendChild(particle);
    }
    
    // Eliminar efecto después de la animación
    setTimeout(() => {
        document.body.removeChild(effectContainer);
    }, 1500);
}

// Detectar y manejar el botón "Más Información" para redirigir a nosotros-detalle.html
document.addEventListener('DOMContentLoaded', function() {
    // Detectar si estamos en la página "nosotros.html"
    if (window.location.pathname.includes('nosotros.html') || 
        document.body.classList.contains('nosotros-page')) {
        
        // Encontrar todos los botones de "Más Información"
        const infoButtons = document.querySelectorAll('.btn-mas-info, [href*="nosotros-detalle"]');
        
        infoButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Prevenir comportamiento por defecto solo si es un enlace
                if (this.tagName === 'A') {
                    e.preventDefault();
                }
                
                // Efecto de clic
                this.style.transform = 'scale(0.95)';
                this.style.boxShadow = '0 0 20px var(--primary-color)';
                
                // Redirigir después de un breve delay para que se vea la animación
                setTimeout(() => {
                    window.location.href = 'nosotros-detalle.html';
                }, 300);
            });
        });
        
        // Si no hay botones específicos, buscar cualquier enlace que pueda llevar a nosotros-detalle.html
        const allLinks = document.querySelectorAll('a');
        allLinks.forEach(link => {
            if (link.href.includes('nosotros-detalle.html')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Efecto de clic
                    this.style.transform = 'scale(0.95)';
                    this.style.boxShadow = '0 0 20px var(--primary-color)';
                    
                    // Redirigir después de un breve delay
                    setTimeout(() => {
                        window.location.href = 'nosotros-detalle.html';
                    }, 300);
                });
            }
        });
    }
});

// Theme Switcher con efectos extravagantes
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    if (!themeToggle) return;
    
    // Verificar tema guardado
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.checked = currentTheme === 'light';
    updateThemeIcon(currentTheme);
    
    // Aplicar transición suave para cambios de tema
    setTimeout(() => {
        document.documentElement.classList.add('theme-transition');
    }, 100);
    
    // Manejar cambio de tema
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'light' : 'dark';
        
        // Efecto de transición
        document.documentElement.style.opacity = '0.8';
        document.documentElement.style.filter = 'blur(10px)';
        
        setTimeout(() => {
            changeTheme(newTheme);
            document.documentElement.style.opacity = '1';
            document.documentElement.style.filter = 'blur(0)';
        }, 300);
    });
    
    function changeTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
        themeToggle.checked = theme === 'light';
        
        // Efecto de partículas para cambio de tema
        createThemeChangeEffect(theme);
    }
    
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.textShadow = '0 0 15px #000';
        } else {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.textShadow = '0 0 15px #ff0';
        }
        
        // Efecto de animación en el icono
        themeIcon.style.transform = 'scale(1.5)';
        setTimeout(() => {
            themeIcon.style.transform = 'scale(1)';
        }, 300);
    }
    
    function createThemeChangeEffect(theme) {
        const effectOverlay = document.createElement('div');
        effectOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${theme === 'light' ? 'white' : 'black'};
            opacity: 0.8;
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(effectOverlay);
        
        // Animación de desvanecimiento
        effectOverlay.animate([
            { opacity: 0.8 },
            { opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        // Eliminar overlay después de la animación
        setTimeout(() => {
            document.body.removeChild(effectOverlay);
        }, 800);
    }
});

// Efecto de cursor personalizado extravagante
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        background: rgba(255, 0, 102, 0.5);
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease, background 0.3s ease, border-color 0.3s ease;
        mix-blend-mode: difference;
    `;
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    cursorFollower.style.cssText = `
        width: 8px;
        height: 8px;
        background: var(--accent-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: transform 0.2s ease, width 0.3s ease, height 0.3s ease;
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });
    
    // Animación suave para el seguidor
    function animateCursor() {
        followerX += (mouseX - followerX) / 8;
        followerY += (mouseY - followerY) / 8;
        
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Efectos al pasar sobre elementos interactivos
    document.querySelectorAll('a, button, .clickable, .portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
            cursor.style.background = 'var(--primary-color)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(2.5)';
            cursorFollower.style.background = 'var(--accent-color)';
        });
        
        item.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'rgba(255, 0, 102, 0.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.background = 'var(--accent-color)';
        });
    });
});

// Inicializar efectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Añadir estilos CSS para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) rotateX(5deg); }
            50% { transform: translateY(-15px) rotateX(5deg); }
        }
        
        @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(255, 0, 102, 0.3); }
            50% { box-shadow: 0 0 40px rgba(255, 0, 102, 0.6); }
        }
        
        @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        .preloader-particle {
            animation: float 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
});