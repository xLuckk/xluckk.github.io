const projectsData = {
    "es": [
        {
            "title": "E-commerce Moderno",
            "description": "Plataforma de comercio electrónico con diseño responsive y sistema de pago integrado.",
            "image": "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            "link": "#"
        },
        {
            "title": "Dashboard Analítico",
            "description": "Panel de control con visualización de datos en tiempo real para empresas.",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "link": "#"
        },
        {
            "title": "Aplicación de Tareas",
            "description": "Gestor de tareas personal con recordatorios y sincronización en la nube.",
            "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80",
            "link": "#"
        }
    ],
    "en": [
        {
            "title": "Modern E-commerce",
            "description": "E-commerce platform with responsive design and integrated payment system.",
            "image": "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
            "link": "#"
        },
        {
            "title": "Analytics Dashboard",
            "description": "Control panel with real-time data visualization for businesses.",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            "link": "#"
        },
        {
            "title": "Task Management App",
            "description": "Personal task manager with reminders and cloud synchronization.",
            "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80",
            "link": "#"
        }
    ]
};

// Variable global para almacenar el idioma actual
let currentLanguage = 'es';

// Función para bloquear extensiones de tema oscuro/claro
function blockThemeExtensions() {
    // Bloquear DarkReader
    const darkReaderStyles = document.querySelectorAll('style[class*="darkreader"], link[href*="darkreader"]');
    darkReaderStyles.forEach(style => style.remove());
    
    // Crear un observer para eliminar estilos inyectados por extensiones
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Eliminar estilos de DarkReader y similares
                    if (node.tagName === 'STYLE' && 
                        (node.className && (node.className.includes('darkreader') || 
                         node.className.includes('dark-reader') ||
                         node.className.includes('night-eye') ||
                         node.className.includes('dark-mode')))) {
                        node.remove();
                    }
                    
                    // También revisar links de CSS inyectados
                    if (node.tagName === 'LINK' && 
                        node.href && 
                        (node.href.includes('darkreader') || 
                         node.href.includes('dark-reader') ||
                         node.href.includes('night-eye'))) {
                        node.remove();
                    }
                }
            });
        });
    });

    observer.observe(document.head, {
        childList: true,
        subtree: true
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Forzar colores originales cada cierto tiempo
    setInterval(() => {
        // Eliminar filtros CSS aplicados por extensiones
        document.documentElement.style.filter = '';
        document.body.style.filter = '';
        
        // Restaurar variables CSS originales si fueron modificadas
        document.documentElement.style.setProperty('--primary-blue', '#0d6efd');
        document.documentElement.style.setProperty('--light-blue', '#3bb4f2');
        document.documentElement.style.setProperty('--dark-gray', '#121212');
        document.documentElement.style.setProperty('--neon-blue', '#00f3ff');
        document.documentElement.style.setProperty('--neon-purple', '#bd00ff');
        document.documentElement.style.setProperty('--neon-light-blue', '#40e0d0');
    }, 1000);
}

// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Bloquear extensiones de tema
    blockThemeExtensions();
    
    // Initialize language switcher - CORREGIDO
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            
            // Solo cambiar si es diferente al idioma actual
            if (selectedLang !== currentLanguage) {
                currentLanguage = selectedLang;
                
                // Update active button - CORREGIDO: mantener ambos botones visibles
                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.display = 'inline-block'; // Asegurar que ambos botones estén visibles
                });
                this.classList.add('active');
                
                // Update content based on selected language
                updateContent(selectedLang);
            }
        });
    });

    // Load initial content
    loadProjects('es');
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Prevenir que el formulario se envíe (es solo demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar mensaje de confirmación (simulado)
            const submitBtn = this.querySelector('.btn-neon');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = currentLanguage === 'es' ? 'Enviado ✓' : 'Sent ✓';
            submitBtn.style.background = 'rgba(0, 255, 0, 0.2)';
            submitBtn.style.borderColor = '#00ff00';
            submitBtn.style.color = '#00ff00';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
                this.reset();
            }, 2000);
        });
    }
});

// Function to update content based on language - MEJORADA
function updateContent(lang) {
    // Update text content
    document.querySelectorAll('[data-lang]').forEach(element => {
        const langAttr = element.getAttribute('data-lang');
        if (langAttr === lang) {
            element.style.display = element.tagName.toLowerCase() === 'span' ? 'inline' : 'block';
        } else if (langAttr === 'es' || langAttr === 'en') {
            element.style.display = 'none';
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-lang-placeholder-es], [data-lang-placeholder-en]').forEach(element => {
        if (lang === 'es') {
            element.placeholder = element.getAttribute('data-lang-placeholder-es') || element.placeholder;
        } else {
            element.placeholder = element.getAttribute('data-lang-placeholder-en') || element.placeholder;
        }
    });
    
    // Update projects
    loadProjects(lang);
    
    // Asegurar que ambos botones de idioma permanezcan visibles
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.style.display = 'inline-block';
    });
}

// Function to load projects with proper spacing
function loadProjects(lang) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    container.innerHTML = '';
    container.classList.add('projects-container');
    
    const projects = projectsData[lang] || projectsData['es'];
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'col-md-6 col-lg-4 mb-4';
        projectCard.innerHTML = `
            <div class="project-card h-100">
                <img src="${project.image}" class="img-fluid project-img" alt="${project.title}" loading="lazy">
                <div class="p-3 d-flex flex-column">
                    <h3 class="mb-3">${project.title}</h3>
                    <p class="flex-grow-1">${project.description}</p>
                    <a href="${project.link}" class="btn-neon btn-sm mt-auto align-self-start">
                        ${lang === 'es' ? 'Ver Detalles' : 'View Details'}
                    </a>
                </div>
            </div>
        `;
        container.appendChild(projectCard);
    });
}