/**
 * CRIART 3D - Impressão 3D & Comunicação Visual
 * Arquivo JavaScript Puro (script.js) para GitHub Pages
 * Sem dependências externas, pronto para execução em qualquer navegador
 */

/**
 * Função para exibir mensagem temporária (Toast)
 * @param {string} message Mensagem a ser exibida
 * @param {number} duration Duração em milissegundos
 */
function showToast(message, duration = 3500) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');

  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
}

/**
 * Monta e dispara a mensagem formatada para o WhatsApp da Criart 3D
 * @param {Event} [event] Evento de envio do formulário
 */
function sendToWhatsApp(event) {
  if (event) {
    event.preventDefault();
  }

  const serviceEl = document.getElementById('calcService');
  const purposeEl = document.getElementById('calcPurpose');
  const urgencyEl = document.getElementById('calcUrgency');
  const cityEl = document.getElementById('calcCity');
  const detailsEl = document.getElementById('calcDetails');

  const service = serviceEl ? serviceEl.value : 'Impressão 3D Personalizada';
  const purpose = purposeEl ? purposeEl.value : 'Uso Pessoal / Presente Exclusivo';
  const urgency = urgencyEl ? urgencyEl.value : 'Prazo Normal (3 a 5 dias úteis)';
  const city = cityEl && cityEl.value.trim() ? cityEl.value.trim() : 'Governador Valadares - MG';
  const details = detailsEl && detailsEl.value.trim() ? detailsEl.value.trim() : 'Gostaria de avaliar opções e valores.';

  const messageText = 
    `Olá, equipe Criart 3D! Gostaria de um orçamento:%0A%0A` +
    `🛠️ *Serviço:* ${encodeURIComponent(service)}%0A` +
    `🎯 *Finalidade:* ${encodeURIComponent(purpose)}%0A` +
    `⏱️ *Prazo Desejado:* ${encodeURIComponent(urgency)}%0A` +
    `📍 *Local de Entrega:* ${encodeURIComponent(city)}%0A` +
    `📝 *Detalhes:* ${encodeURIComponent(details)}%0A%0A` +
    `Aguardo orientações para darmos início!`;

  const whatsappURL = `https://wa.me/5533991449728?text=${messageText}`;

  showToast('Abrindo WhatsApp com as especificações do seu projeto...');
  window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}

/**
 * Inicialização do Menu Mobile Drawer
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const drawer = document.getElementById('mobileMenuDrawer');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    if (drawer && backdrop) {
      drawer.classList.remove('translate-x-full');
      backdrop.classList.remove('pointer-events-none', 'opacity-0');
      backdrop.classList.add('opacity-100');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (drawer && backdrop) {
      drawer.classList.add('translate-x-full');
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/**
 * Inicialização do FAQ Interativo (Sanfona fluida)
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((other) => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/**
 * Filtro do Catálogo de Soluções com transição suave
 */
function initCatalogFilter() {
  const filterButtons = document.querySelectorAll('.catalog-filter-btn');
  const sectionImpressao = document.getElementById('segmento-impressao');
  const sectionComunicacao = document.getElementById('segmento-comunicacao');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        b.classList.remove('bg-primary-container', 'text-on-primary', 'shadow-md');
        b.classList.add('bg-surface-container', 'text-on-surface-variant');
      });

      btn.classList.add('bg-primary-container', 'text-on-primary', 'shadow-md');
      btn.classList.remove('bg-surface-container', 'text-on-surface-variant');

      const filter = btn.getAttribute('data-filter');

      const applyTransition = (el, show) => {
        if (!el) return;
        if (show) {
          el.style.display = 'flex';
          requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
        } else {
          el.style.opacity = '0';
          el.style.transform = 'translateY(10px)';
          setTimeout(() => {
            el.style.display = 'none';
          }, 200);
        }
      };

      if (sectionImpressao && sectionComunicacao) {
        sectionImpressao.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        sectionComunicacao.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

        if (filter === 'all') {
          applyTransition(sectionImpressao, true);
          applyTransition(sectionComunicacao, true);
        } else if (filter === '3d') {
          applyTransition(sectionImpressao, true);
          applyTransition(sectionComunicacao, false);
        } else if (filter === 'visual') {
          applyTransition(sectionImpressao, false);
          applyTransition(sectionComunicacao, true);
        }
      }
    });
  });
}

/**
 * Animação de Scroll Reveal (Revelação ao rolar)
 */
function initScrollReveal() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      el.classList.add('revealed');
    });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      el.classList.add('revealed');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach((target) => observer.observe(target));
}

/**
 * Elevação sutil do cabeçalho ao rolar a página
 */
function initHeaderScrollState() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Torna global para chamadas inline se necessário
  window.sendToWhatsApp = sendToWhatsApp;

  const form = document.getElementById('calculatorForm');
  if (form) {
    form.addEventListener('submit', sendToWhatsApp);
  }

  initMobileMenu();
  initFaqAccordion();
  initCatalogFilter();
  initScrollReveal();
  initHeaderScrollState();
});
