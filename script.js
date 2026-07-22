/* ============================================
   DUCHESSE COLLECTION — Logique Globale
   ============================================ */

// --- PANIER (localStorage) ---
const CART_KEY = 'duchesse_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showCartSidebar();
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCartItems();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <p>Votre panier est vide</p>
      </div>`;
    document.getElementById('cart-total').textContent = '0 FCFA';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.nom}">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nom}</div>
        <div class="cart-item-detail">${item.badge} &bull; Qty: ${item.qty || 1}</div>
        <button class="cart-item-remove" data-remove-id="${item.id}">Retirer</button>
      </div>
    </div>
  `).join('');

  document.getElementById('cart-total').textContent = `${cart.length} article(s)`;
}

function showCartSidebar() {
  renderCartItems();
  document.getElementById('cart-overlay').classList.add('active');
  document.getElementById('cart-sidebar').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
  document.getElementById('cart-overlay').classList.remove('active');
  document.getElementById('cart-sidebar').classList.remove('active');
  document.body.style.overflow = '';
}

function sendWhatsAppOrder() {
  const cart = getCart();
  if (cart.length === 0) return;

  const phone = "237681280823";
  let message = "🌸 *Commande Duchesse Collection* 🌸\n\n";
  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.nom} (${item.badge}) x${item.qty || 1}\n`;
  });
  message += "\nMerci de me confirmer la disponibilité et les tarifs.";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function sendWhatsAppSingle(product) {
  const phone = "237681280823";
  const message = `Bonjour, je suis intéressé(e) par *${product.nom}* (${product.badge}).\n\nMerci de me donner plus d'informations.`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// --- Lookup produit par id (évite d'injecter du JSON dans les attributs HTML) ---
function findProduitById(id) {
  if (typeof produitsData === 'undefined') return null;
  return produitsData.find(p => String(p.id) === String(id));
}

// --- COMPTE À REBOURS ---
const EVENT_DATE = new Date("2026-08-08T14:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = EVENT_DATE - now;

  document.querySelectorAll('.countdown-timer').forEach(timer => {
    if (distance < 0) {
      timer.innerHTML = `<div class="countdown-box" style="grid-column: span 4;"><div class="countdown-number" style="font-size:1.5rem;">L'événement a commencé !</div></div>`;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const boxes = timer.querySelectorAll('.countdown-number');
    if (boxes.length >= 4) {
      boxes[0].textContent = String(days).padStart(2, '0');
      boxes[1].textContent = String(hours).padStart(2, '0');
      boxes[2].textContent = String(minutes).padStart(2, '0');
      boxes[3].textContent = String(seconds).padStart(2, '0');
    }
  });

  // Mise à jour des compteurs dans les cartes produits (vente privée)
  document.querySelectorAll('.product-countdown').forEach(el => {
    if (distance < 0) {
      el.innerHTML = '<span style="color:#25D366;font-weight:600;">🎉 Événement en cours !</span>';
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    el.innerHTML = `<span style="color:var(--gold);font-weight:600;">⏱ ${days}j ${hours}h ${minutes}m</span>`;
  });
}

// --- RENDU PRODUITS ---
function renderProductCard(produit, showCountdown = false) {
  const countdownHtml = produit.ventePrivee ? `
    <div class="product-countdown" style="margin-bottom:12px;font-size:0.85rem;"></div>
  ` : '';

  const priceHtml = produit.ventePrivee && showCountdown
    ? countdownHtml
    : `<div class="product-price">Sur demande</div>`;

  return `
    <div class="product-card" data-id="${produit.id}" data-genre="${produit.genre}" data-contenance="${produit.contenance}">
      <div class="product-image">
        <img src="${produit.image}" alt="${produit.nom}" loading="lazy">
        <span class="product-badge">${produit.badge}</span>
      </div>
      <div class="product-info">
        <div class="product-genre">${produit.genre === 'femme' ? 'Pour Elle' : 'Pour Lui'}</div>
        <h3 class="product-name">${produit.nom}</h3>
        <p class="product-desc">${produit.description}</p>
        ${priceHtml}
        <div class="product-actions">
          <button class="btn btn-primary btn-small" data-action="add-to-cart" data-product-id="${produit.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            Ajouter
          </button>
          <button class="btn btn-whatsapp btn-small" data-action="whatsapp-single" data-product-id="${produit.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(containerId, filterFn = null, showCountdown = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let products = filterFn ? produitsData.filter(filterFn) : [...produitsData];

  if (products.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px;">Aucun produit ne correspond à vos critères.</p>';
    return;
  }

  container.innerHTML = products.map(p => renderProductCard(p, showCountdown)).join('');
  updateCountdown();
}

// --- FILTRES BOUTIQUE ---
function initBoutiqueFilters() {
  const searchInput = document.getElementById('filter-search');
  const genreSelect = document.getElementById('filter-genre');
  const prixSelect = document.getElementById('filter-prix');
  const categorieSelect = document.getElementById('filter-categorie');
  const resultsCount = document.getElementById('results-count');
  const container = document.getElementById('boutique-grid');

  if (!container) return;

  function applyFilters() {
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const genre = genreSelect ? genreSelect.value : '';
    const prix = prixSelect ? prixSelect.value : '';
    const categorie = categorieSelect ? categorieSelect.value : '';

    const filtered = produitsData.filter(p => {
      const matchSearch = !search || p.nom.toLowerCase().includes(search) || p.description.toLowerCase().includes(search);
      const matchGenre = !genre || p.genre === genre;
      const matchCategorie = !categorie || p.categorie === categorie;
      let matchPrix = true;
      if (prix === '50') matchPrix = p.contenance === '50 ml';
      if (prix === '100') matchPrix = p.contenance === '100 ml';
      return matchSearch && matchGenre && matchCategorie && matchPrix;
    });

    if (resultsCount) resultsCount.textContent = `${filtered.length} résultat(s)`;
    container.innerHTML = filtered.map(p => renderProductCard(p, true)).join('');
    updateCountdown();
  }

  [searchInput, genreSelect, prixSelect, categorieSelect].forEach(el => {
    if (el) el.addEventListener('input', applyFilters);
  });

  applyFilters();
}

// --- FILTRES COLLECTION ---
function initCollectionFilters() {
  const genreSelect = document.getElementById('collection-genre');
  const contenanceSelect = document.getElementById('collection-contenance');
  const container = document.getElementById('collection-grid');

  if (!container) return;

  function applyFilters() {
    const genre = genreSelect ? genreSelect.value : '';
    const contenance = contenanceSelect ? contenanceSelect.value : '';

    const filtered = produitsData.filter(p => {
      const matchGenre = !genre || p.genre === genre;
      const matchContenance = !contenance || p.contenance === contenance;
      return matchGenre && matchContenance;
    });

    container.innerHTML = filtered.map(p => renderProductCard(p, true)).join('');
    updateCountdown();
  }

  [genreSelect, contenanceSelect].forEach(el => {
    if (el) el.addEventListener('change', applyFilters);
  });

  applyFilters();
}

// --- FAQ ACCORDÉON ---
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

// --- MENU MOBILE ---
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-links');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('active');
    const isOpen = nav.classList.contains('active');
    btn.innerHTML = isOpen
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  });
}

// --- BACK TO TOP ---
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) btn.classList.add('visible');
    else btn.classList.remove('visible');
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- ANIMATIONS AU SCROLL ---
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.why-card, .testimonial-card, .category-card, .commitment-card, .contact-card').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});
}

// --- STATS ANIMÉES ---
function initAnimatedStats() {
  const stats = document.querySelectorAll('.stat-number[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const increment = target / 60;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + suffix;
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

// --- DÉLÉGATION D'ÉVÉNEMENTS POUR LES ACTIONS PRODUIT ET PANIER ---
function initProductActions() {
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-action="add-to-cart"]');
    if (addBtn) {
      const produit = findProduitById(addBtn.dataset.productId);
      if (produit) addToCart(produit);
      return;
    }

    const waBtn = e.target.closest('[data-action="whatsapp-single"]');
    if (waBtn) {
      const produit = findProduitById(waBtn.dataset.productId);
      if (produit) sendWhatsAppSingle(produit);
      return;
    }

    const removeBtn = e.target.closest('[data-remove-id]');
    if (removeBtn) {
      removeFromCart(removeBtn.dataset.removeId);
      return;
    }
  });
}

// --- INITIALISATION GLOBALE ---
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initMobileMenu();
  initBackToTop();
  initFAQ();
  initScrollAnimations();
  initAnimatedStats();
  initBoutiqueFilters();
  initCollectionFilters();
  initProductActions();

  // Lancer le compte à rebours global
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Fermer le panier
  document.getElementById('cart-overlay')?.addEventListener('click', closeCartSidebar);
  document.getElementById('cart-close')?.addEventListener('click', closeCartSidebar);

  // Ouvrir le panier
  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', showCartSidebar);
  });
});