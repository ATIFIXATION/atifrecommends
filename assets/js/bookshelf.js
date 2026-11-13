/**
 * ATIF RECOMMENDS — INTERACTIVE 3D BOOKSHELF & ARCHIVE LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.ATIF_CONFIG;
  if (!config) return;

  // Initialize Elements
  initShelfBooks(config.books);
  initArchiveCarousel(config.books);
  initEditorialGrid(config.books);
  initViewSwitcher();
  initCategoryFilters();
  initInspectorModal(config.books);
  initNavScroll();
  initMobileNav();
  initPortfolioLinks(config.portfolioUrl);
});

/**
 * Render the 3D Bookshelf (Reference 01)
 */
function initShelfBooks(books) {
  const shelfRow = document.getElementById('shelfBooksRow');
  if (!shelfRow) return;

  shelfRow.innerHTML = '';

  books.forEach((book, index) => {
    const bookEl = document.createElement('div');
    bookEl.className = 'book-3d';
    bookEl.setAttribute('tabindex', '0');
    bookEl.setAttribute('role', 'button');
    bookEl.setAttribute('aria-label', `${book.title} by ${book.author}`);
    bookEl.dataset.bookId = book.id;

    // Dimensions and 3D positioning
    const height = book.height || '340px';
    const width = book.width || '44px';
    const tilt = book.tilt || '0deg';

    bookEl.style.width = width;
    bookEl.style.height = height;
    bookEl.style.transform = `rotateZ(${tilt})`;

    bookEl.innerHTML = `
      <div class="book-spine-face" style="background: ${book.spineBg}; color: ${book.spineTextColor};">
        <div class="spine-headband-top"></div>
        <div class="spine-header-mark" style="color: ${book.spineAccentColor};">A.K.</div>
        <div class="spine-title-vertical" style="color: ${book.spineTextColor};">${book.spineTitle}</div>
        <div class="spine-author-mark" style="color: ${book.spineAccentColor};">${book.spineAuthor}</div>
        <div class="spine-headband-bottom"></div>
      </div>
      <div class="book-top-face"></div>
      <div class="book-side-face"></div>
      <div class="book-shelf-shadow"></div>
    `;

    // Interaction: Click to inspect
    bookEl.addEventListener('click', () => {
      openBookInspector(book);
    });

    bookEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openBookInspector(book);
      }
    });

    shelfRow.appendChild(bookEl);
  });
}

/**
 * Render the 3D Perspective Archive Carousel (Reference 02)
 */
let currentCarouselIndex = 0;

function initArchiveCarousel(books) {
  const track = document.getElementById('carousel3dTrack');
  if (!track) return;

  track.innerHTML = '';

  books.forEach((book, index) => {
    const card = document.createElement('div');
    card.className = 'carousel-card-item';
    card.dataset.index = index;
    card.style.background = `linear-gradient(165deg, ${book.accent}22 0%, #171513 100%)`;

    card.innerHTML = `
      <div class="card-top-meta">
        <span class="card-numeral">VOL. 0${index + 1}</span>
        <span style="color: ${book.accent};">${book.category}</span>
      </div>
      <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
        <h4 style="font-family: var(--font-display); font-size: 1.8rem; line-height: 1.15; color: var(--warm-paper); margin-bottom: 0.4rem;">${book.title}</h4>
        <span style="font-family: var(--font-classic); font-size: 0.75rem; letter-spacing: 2px; color: ${book.accent}; text-transform: uppercase;">${book.author}</span>
        <p style="font-family: var(--font-editorial); font-style: italic; font-size: 0.95rem; color: rgba(241, 235, 221, 0.7); margin-top: 1.2rem; line-height: 1.6;">"${book.quote}"</p>
      </div>
      <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 0.65rem; color: var(--warm-paper); letter-spacing: 1.5px; text-transform: uppercase;">
        <span>Read World</span>
        <i class="bi bi-arrow-right"></i>
      </div>
    `;

    card.addEventListener('click', () => {
      if (index === currentCarouselIndex) {
        window.location.href = book.url;
      } else {
        setCarouselIndex(index, books);
      }
    });

    track.appendChild(card);
  });

  updateCarouselLayout(books);

  // Setup Carousel Controls
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const infoBtn = document.getElementById('carouselInfoBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentCarouselIndex = (currentCarouselIndex - 1 + books.length) % books.length;
      updateCarouselLayout(books);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentCarouselIndex = (currentCarouselIndex + 1) % books.length;
      updateCarouselLayout(books);
    });
  }

  if (infoBtn) {
    infoBtn.addEventListener('click', () => {
      openBookInspector(books[currentCarouselIndex]);
    });
  }
}

function setCarouselIndex(index, books) {
  currentCarouselIndex = index;
  updateCarouselLayout(books);
}

function updateCarouselLayout(books) {
  const cards = document.querySelectorAll('.carousel-card-item');
  const total = books.length;

  cards.forEach((card, idx) => {
    card.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'hidden');

    const diff = (idx - currentCarouselIndex + total) % total;

    if (diff === 0) {
      card.classList.add('active');
    } else if (diff === 1) {
      card.classList.add('next-1');
    } else if (diff === 2) {
      card.classList.add('next-2');
    } else if (diff === total - 1) {
      card.classList.add('prev-1');
    } else if (diff === total - 2) {
      card.classList.add('prev-2');
    } else {
      card.classList.add('hidden');
    }
  });

  const yearBadge = document.getElementById('carouselActiveBadge');
  if (yearBadge && books[currentCarouselIndex]) {
    yearBadge.textContent = books[currentCarouselIndex].title;
  }
}

/**
 * View Switcher between 3D Shelf and 3D Archive Carousel
 */
function initViewSwitcher() {
  const shelfToggle = document.getElementById('viewToggleShelf');
  const archiveToggle = document.getElementById('viewToggleArchive');
  const shelfView = document.getElementById('bookshelfViewSection');
  const archiveView = document.getElementById('archiveCarouselSection');
  const stage = document.querySelector('.bookshelf-editorial-stage');

  if (!shelfToggle || !archiveToggle || !shelfView || !archiveView) return;

  shelfToggle.addEventListener('click', () => {
    shelfToggle.classList.add('active');
    archiveToggle.classList.remove('active');
    shelfView.style.display = 'block';
    archiveView.classList.remove('active');
    if (stage) stage.style.background = 'var(--warm-paper)';
  });

  archiveToggle.addEventListener('click', () => {
    archiveToggle.classList.add('active');
    shelfToggle.classList.remove('active');
    shelfView.style.display = 'none';
    archiveView.classList.add('active');
    if (stage) stage.style.background = 'var(--deep-navy)';
  });
}

/**
 * Render Editorial Book Grid (Section 06)
 */
function initEditorialGrid(books) {
  const grid = document.getElementById('editorialBooksGrid');
  if (!grid) return;

  grid.innerHTML = '';

  // Asymmetrical span pattern
  const spans = ['span-6', 'span-6', 'span-4', 'span-4', 'span-4', 'span-8', 'span-4', 'span-6', 'span-6'];

  books.forEach((book, idx) => {
    const spanClass = spans[idx % spans.length];
    const card = document.createElement('a');
    card.href = book.url;
    card.className = `editorial-card ${spanClass}`;
    card.dataset.category = book.category;

    const tagsHtml = (book.tags || []).map(t => `<span class="card-tag-pill">${t}</span>`).join('');

    card.innerHTML = `
      <div>
        <div class="card-top-meta">
          <span class="card-numeral">0${idx + 1} — ARCHIVE</span>
          <span style="color: ${book.accent};">${book.category}</span>
        </div>
        <div class="card-title-group">
          <h3>${book.title}</h3>
          <span class="card-author">${book.author}</span>
        </div>
        <p class="card-note">${book.note}</p>
        <div class="card-quote-snip">"${book.quote}"</div>
      </div>
      <div>
        <div class="card-tags">${tagsHtml}</div>
        <div class="card-footer-cta">
          <span>Enter Literary World</span>
          <i class="bi bi-arrow-right"></i>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/**
 * Filter Editorial Cards by Category
 */
function initCategoryFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.editorial-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Book Inspector Drawer / Modal
 */
let currentInspectorBook = null;

function initInspectorModal(books) {
  const modal = document.getElementById('bookInspectorModal');
  const closeBtn = document.getElementById('inspectorCloseBtn');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeBookInspector);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBookInspector();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeBookInspector();
    }
  });
}

function openBookInspector(book) {
  currentInspectorBook = book;
  const modal = document.getElementById('bookInspectorModal');
  if (!modal) return;

  document.getElementById('inspectorCategory').textContent = book.category;
  document.getElementById('inspectorTitle').textContent = book.title;
  document.getElementById('inspectorAuthor').textContent = book.author;
  document.getElementById('inspectorQuote').textContent = `"${book.quote}"`;
  document.getElementById('inspectorNote').textContent = book.note;
  
  const enterBtn = document.getElementById('inspectorEnterBtn');
  if (enterBtn) {
    enterBtn.href = book.url;
  }

  const preview = document.getElementById('inspectorBookPreview');
  if (preview) {
    preview.style.background = `linear-gradient(160deg, ${book.accent} 0%, #171513 100%)`;
    preview.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.6rem; color: #fff; letter-spacing: 2px;">ATIF RECOMMENDS</div>
      <div>
        <h4 style="font-family: var(--font-display); font-size: 1.4rem; color: #fff; line-height: 1.2;">${book.title}</h4>
        <div style="font-family: var(--font-classic); font-size: 0.7rem; color: ${book.secondaryAccent || '#d4b07a'}; letter-spacing: 1.5px; margin-top: 6px;">${book.author}</div>
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.55rem; color: rgba(255,255,255,0.6); letter-spacing: 2px;">ORIGINAL EDITION</div>
    `;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookInspector() {
  const modal = document.getElementById('bookInspectorModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Sticky Navigation Blur and Shadow
 */
function initNavScroll() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/**
 * Portfolio Links configuration
 */
function initPortfolioLinks(portfolioUrl) {
  if (!portfolioUrl) return;

  const links = document.querySelectorAll('.dynamic-portfolio-link');
  links.forEach(link => {
    link.href = portfolioUrl;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}
