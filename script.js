// ===== INSTRUÇÕES DE CONFIGURAÇÃO =====
// 1. Substitua o número do WhatsApp no botão flutuante (linha 12)
// 2. Substitua as informações de contato no HTML (telefone, email, endereço)
// 3. Substitua as URLs das imagens pelas reais
// 4. Substitua as meta tags no <head> pelas informações reais

// ===== CONFIGURAÇÕES =====
const CONFIG = {
    // INSTRUÇÃO: Substitua pelo número real do WhatsApp (apenas números, com código do país)
    WHATSAPP_NUMBER: '5584999895639',

    // Mensagem padrão para o WhatsApp
    WHATSAPP_MESSAGE: 'Olá, gostaria de agendar uma consulta com o Dr. Leonardo Castro'
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initScrollAnimations();
    initTestimonialSlider();
    initAreaModals();
    initContactForm();
    initSmoothScroll();
    updateWhatsAppLinks();
});

// ===== MENU MOBILE =====
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// ===== ANIMAÇÕES DE SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elementos para animar
    const elementsToAnimate = document.querySelectorAll('.area-card, .diferencial-card, .sobre-content, .contato-content');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Adicionar CSS para animações
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .area-card, .diferencial-card {
            transition-delay: calc(var(--i, 0) * 0.1s);
        }
    `;
    document.head.appendChild(style);

    // Adicionar índice para stagger animation
    document.querySelectorAll('.area-card, .diferencial-card').forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
}

// ===== SLIDER DE DEPOIMENTOS =====
function initTestimonialSlider() {
    const track = document.querySelector('.depoimentos-track');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (!track) return;

    let currentSlide = 0;
    const slideCount = document.querySelectorAll('.depoimento-card').length;

    // Configurar autoplay
    let autoplayInterval = setInterval(nextSlide, 5000);

    function goToSlide(index) {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;

        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Atualizar dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });

        // Reiniciar autoplay
        resetAutoplay();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Pausar autoplay ao interagir
    const slider = document.querySelector('.depoimentos-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        slider.addEventListener('mouseleave', () => autoplayInterval = setInterval(nextSlide, 5000));
    }
}

// ===== MODAIS DAS ÁREAS DE ATUAÇÃO =====
function initAreaModals() {
    const modal = document.getElementById('modal-area');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');
    const saibaMaisBtns = document.querySelectorAll('.saiba-mais');

    // Conteúdo dos modais
    const areasContent = {
        civil: {
            title: 'Direito Civil',
            content: `
                <h3>Direito Civil</h3>
                <p>Atuação completa em questões do Direito Civil, com expertise em:</p>
                <ul>
                    <li>Contratos em geral (compra e venda, locação, prestação de serviços)</li>
                    <li>Responsabilidade civil</li>
                    <li>Direitos do consumidor</li>
                    <li>Propriedade e posse</li>
                    <li>Obrigações e deveres</li>
                    <li>Direitos reais</li>
                </ul>
                <p>Oferecemos assessoria preventiva para evitar litígios e atuação contenciosa quando necessário, sempre com foco na melhor solução para o cliente.</p>
            `
        },
        empresarial: {
            title: 'Direito Empresarial',
            content: `
                <h3>Direito Empresarial</h3>
                <p>Assessoria jurídica especializada para empresas de todos os portes:</p>
                <ul>
                    <li>Constituição e formalização de empresas</li>
                    <li>Contratos societários</li>
                    <li>Compliance e governança corporativa</li>
                    <li>Fusões e aquisições</li>
                    <li>Recuperação judicial e extrajudicial</li>
                    <li>Direito concorrencial</li>
                </ul>
                <p>Trabalhamos para garantir a segurança jurídica das operações empresariais e o crescimento sustentável dos negócios.</p>
            `
        },
        familia: {
            title: 'Direito de Família',
            content: `
                <h3>Direito de Família</h3>
                <p>Atuação sensível e técnica em questões familiares:</p>
                <ul>
                    <li>Divórcio e separação</li>
                    <li>Guarda de filhos e regulamentação de visitas</li>
                    <li>Pensão alimentícia</li>
                    <li>Inventário e partilha de bens</li>
                    <li>Reconhecimento e dissolução de união estável</li>
                    <li>Planejamento patrimonial familiar</li>
                </ul>
                <p>Buscamos soluções que preservem as relações familiares e protejam os interesses de todos os envolvidos.</p>
            `
        },
        trabalhista: {
            title: 'Direito Trabalhista',
            content: `
                <h3>Direito Trabalhista</h3>
                <p>Assessoria para empregadores e trabalhadores:</p>
                <ul>
                    <li>Contratos de trabalho</li>
                    <li>Rescisões trabalhistas</li>
                    <li>Reclamações trabalhistas</li>
                    <li>Assessoria em negociações coletivas</li>
                    <li>Compliance trabalhista</li>
                    <li>Auditorias trabalhistas</li>
                </ul>
                <p>Atuamos na prevenção de conflitos e na defesa dos direitos trabalhistas, sempre com base na legislação vigente.</p>
            `
        },
        contratual: {
            title: 'Direito Contratual',
            content: `
                <h3>Direito Contratual</h3>
                <p>Especialização em toda a gama contratual:</p>
                <ul>
                    <li>Elaboração e revisão de contratos</li>
                    <li>Análise de riscos contratuais</li>
                    <li>Negociação de cláusulas</li>
                    <li>Resolução de conflitos contratuais</li>
                    <li>Contratos internacionais</li>
                    <li>Contratos digitais e de tecnologia</li>
                </ul>
                <p>Garantimos a segurança jurídica nas relações contratuais e a proteção dos interesses dos clientes.</p>
            `
        },
        imobiliario: {
            title: 'Direito Imobiliário',
            content: `
                <h3>Direito Imobiliário</h3>
                <p>Atuação completa no segmento imobiliário:</p>
                <ul>
                    <li>Compra e venda de imóveis</li>
                    <li>Contratos de locação</li>
                    <li>Regularização de imóveis</li>
                    <li>Direito condominial</li>
                    <li>Incorporação imobiliária</li>
                    <li>Usucapião</li>
                </ul>
                <p>Oferecemos segurança em todas as etapas das transações imobiliárias, da negociação ao registro.</p>
            `
        }
    };

    // Abrir modal
    saibaMaisBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const area = this.getAttribute('data-area');
            if (areasContent[area]) {
                modalBody.innerHTML = areasContent[area].content;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Fechar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });

    // Fechar com ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ===== FORMULÁRIO DE CONTATO =====
function initContactForm() {
    const form = document.getElementById('form-contato');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validação básica
        if (validateForm()) {
            // Preparar mensagem para WhatsApp
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            sendToWhatsApp(data);
        }
    });

    // Validação em tempo real
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });
    });
}

function validateForm() {
    const form = document.getElementById('form-contato');
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remover mensagens de erro anteriores
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    field.classList.remove('error');

    // Validações específicas
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um e-mail válido.';
        }
    }

    if (field.type === 'tel' && value) {
        // Remover caracteres não numéricos para validação
        const phone = value.replace(/\D/g, '');
        if (phone.length < 10 || phone.length > 11) {
            isValid = false;
            errorMessage = 'Por favor, insira um telefone válido.';
        }
    }

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório.';
    }

    if (!isValid) {
        field.classList.add('error');
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        errorElement.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.25rem; display: block;';
        field.parentNode.appendChild(errorElement);
    }

    return isValid;
}

function sendToWhatsApp(data) {
    // Formatar mensagem
    const message = `Olá, sou ${data.nome} e gostaria de agendar uma consulta sobre ${getAreaName(data.assunto)}.
    
Telefone: ${data.telefone}
E-mail: ${data.email}

Mensagem:
${data.mensagem}

Aguardo seu retorno!`;

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // INSTRUÇÃO: Certifique-se de que CONFIG.WHATSAPP_NUMBER está correto
    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Mostrar mensagem de sucesso
    showNotification('Mensagem preparada para envio pelo WhatsApp!', 'success');

    // Limpar formulário
    document.getElementById('form-contato').reset();
}

function getAreaName(areaKey) {
    const areas = {
        'consultoria': 'Consultoria Jurídica',
        'contratos': 'Contratos',
        'empresarial': 'Direito Empresarial',
        'civil': 'Direito Civil',
        'familia': 'Direito de Família',
        'trabalhista': 'Direito Trabalhista',
        'outro': 'Outro assunto'
    };

    return areas[areaKey] || 'Assunto não especificado';
}

function showNotification(message, type) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ATUALIZAR LINKS DO WHATSAPP =====
function updateWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

    whatsappLinks.forEach(link => {
        // INSTRUÇÃO: Certifique-se de que CONFIG.WHATSAPP_NUMBER está correto
        link.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_MESSAGE)}`;
    });
}

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--secondary)';
        header.style.backdropFilter = 'none';
    }
});

// ===== INICIALIZAÇÃO DA LOCALIZAÇÃO =====
// Adicione esta linha na função init() principal:
// initMapaInterativo();

function initMapaInterativo() {
    // Adicionar interatividade ao mapa
    const mapaIframe = document.querySelector('.mapa-container iframe');
    const abrirMapsBtn = document.querySelector('.localizacao-cta .btn-primary');

    if (mapaIframe && abrirMapsBtn) {
        // Adicionar loading state
        mapaIframe.addEventListener('load', function () {
            this.style.opacity = '1';
        });

        mapaIframe.style.opacity = '0';
        mapaIframe.style.transition = 'opacity 0.3s ease';
    }

    // Animação dos itens de informação
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        item.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });
}

// ===== FUNÇÃO PARA SOLICITAR DIREÇÕES =====
function solicitarDirecoes() {
    const endereco = "Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100";
    const mensagem = `Olá, gostaria de solicitar direções para o escritório do Dr. Leonardo Castro. Meu endereço de partida é: [MEU ENDEREÇO]`;

    // INSTRUÇÃO: Substitua pelo número real do WhatsApp
    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

    window.open(whatsappUrl, '_blank');
}

// Adicione este evento listener no DOMContentLoaded:
document.addEventListener('DOMContentLoaded', function () {
    // ... código existente ...

    // Adicionar evento para o botão "Solicitar Direções"
    const solicitarDirBtn = document.querySelector('.localizacao-cta .btn-outline');
    if (solicitarDirBtn) {
        solicitarDirBtn.addEventListener('click', function (e) {
            e.preventDefault();
            solicitarDirecoes();
        });
    }

    initMapaInterativo();
});