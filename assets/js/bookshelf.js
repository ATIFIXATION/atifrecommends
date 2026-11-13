/**
 * ATIF RECOMMENDS — V2 BOOKSHELF ENGINE (REFERENCE: JZA "THE PERSONAL CURATION")
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.ATIF_CONFIG;
  if (!config) return;

  initBookshelf(config.books);
  initEditorialArchive(config.books);
  initCategoryFilters();
  initMobileNav();
  centerShelfOnFeatured();
  initBackgroundSwitcher();
});

/**
 * Bespoke Vector Artworks for the Central Featured Front Cover (Reference: JZA Sculpture Artwork)
 */
const FEATURED_ARTWORKS = {
  // Classical seated contemplative sculpture / muse (Direct reference to JZA)
  "the-art-of-storytelling": `
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <rect width="120" height="140" fill="#0D1117"/>
      <!-- Classical Sculpture Figure Silhouette -->
      <path d="M60 28C54 28 50 32 50 38C50 43 53 47 57 48C51 52 47 60 47 70C47 74 48 82 50 86L46 95C44 100 48 106 54 106H68C74 106 78 100 76 95L72 86C74 82 75 74 75 70C75 60 71 52 65 48C69 47 72 43 72 38C72 32 68 28 62 28H60Z" fill="#FAF8F5" fill-opacity="0.95"/>
      <path d="M54 52C50 56 42 66 40 78C38 86 42 94 48 95L52 78L54 52Z" fill="#FAF8F5" fill-opacity="0.75"/>
      <path d="M68 52C72 56 80 66 82 78C84 86 80 94 74 95L70 78L68 52Z" fill="#FAF8F5" fill-opacity="0.75"/>
      <circle cx="61" cy="38" r="6" fill="#0D1117"/>
      <!-- Classical Pedestal -->
      <rect x="36" y="106" width="50" height="6" fill="#FAF8F5" fill-opacity="0.85"/>
      <line x1="28" y1="118" x2="94" y2="118" stroke="#FAF8F5" stroke-opacity="0.3" stroke-width="1"/>
      <text x="61" y="128" text-anchor="middle" fill="#FAF8F5" font-family="'Space Grotesk', sans-serif" font-size="6" letter-spacing="1.5">VISIBLE SIGNS</text>
    </svg>
  `,

  "crime-and-punishment": `
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <rect width="120" height="140" fill="#140E0E"/>
      <path d="M30 115V55C30 38 90 38 90 55V115" stroke="#FAF8F5" stroke-width="1.5"/>
      <circle cx="60" cy="55" r="16" stroke="#B32626" stroke-width="2"/>
      <line x1="60" y1="35" x2="60" y2="115" stroke="#FAF8F5" stroke-opacity="0.4" stroke-width="1"/>
      <line x1="42" y1="85" x2="78" y2="85" stroke="#FAF8F5" stroke-opacity="0.4" stroke-width="1"/>
      <text x="60" y="128" text-anchor="middle" fill="#FAF8F5" font-family="'Cormorant Garamond', serif" font-size="7" letter-spacing="2">PETERSBURG &middot; 1866</text>
    </svg>
  `,

  "the-alchemist": `
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <rect width="120" height="140" fill="#1C140C"/>
      <circle cx="60" cy="55" r="22" stroke="#E0A436" stroke-width="1.5"/>
      <path d="M25 110C45 92 75 92 95 110" stroke="#FAF8F5" stroke-width="1.5"/>
      <path d="M60 33V77M38 55H82" stroke="#E0A436" stroke-opacity="0.6" stroke-width="1"/>
      <text x="60" y="128" text-anchor="middle" fill="#FAF8F5" font-family="'Cormorant Garamond', serif" font-size="7" letter-spacing="2">MAKTUB &middot; DESERT</text>
    </svg>
  `,

  "animal-farm": `
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <rect width="120" height="140" fill="#1A1F24"/>
      <polygon points="60,35 68,52 86,52 72,63 77,80 60,70 43,80 48,63 34,52 52,52" fill="#C82D30"/>
      <line x1="28" y1="105" x2="92" y2="105" stroke="#FAF8F5" stroke-width="2"/>
      <text x="60" y="124" text-anchor="middle" fill="#FAF8F5" font-family="'Space Grotesk', sans-serif" font-size="6.5" letter-spacing="1">ORWELL &middot; 1945</text>
    </svg>
  `,

  "never-split-the-difference": `
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <rect width="120" height="140" fill="#120E0C"/>
      <circle cx="60" cy="65" r="28" stroke="#E8572A" stroke-width="1.5"/>
      <circle cx="60" cy="65" r="14" stroke="#FAF8F5" stroke-width="1.5"/>
      <line x1="25" y1="65" x2="95" y2="65" stroke="#E8572A" stroke-width="1.2"/>
      <line x1="60" y1="30" x2="60" y2="100" stroke="#E8572A" stroke-width="1.2"/>
      <text x="60" y="126" text-anchor="middle" fill="#FAF8F5" font-family="'Space Grotesk', sans-serif" font-size="6.5" letter-spacing="1.5">TACTICAL EMPATHY</text>
    </svg>
  `,

  "the-canterville-ghost": `
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <rect width="120" height="140" fill="#1F1015"/>
      <path d="M40 105C40 70 45 45 60 45C75 45 80 70 80 105C72 100 68 106 60 100C52 106 48 100 40 105Z" stroke="#DE9DA6" stroke-width="1.5"/>
      <circle cx="54" cy="65" r="2.5" fill="#DE9DA6"/>
      <circle cx="66" cy="65" r="2.5" fill="#DE9DA6"/>
      <text x="60" y="126" text-anchor="middle" fill="#FAF8F5" font-family="'Cormorant Garamond', serif" font-size="7" letter-spacing="1.5">CANTERVILLE CHASE</text>
    </svg>
  `,

  "many-lives-many-masters": `
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <rect width="120" height="140" fill="#0E1420"/>
      <ellipse cx="60" cy="65" rx="30" ry="12" stroke="#FAF8F5" stroke-opacity="0.5" stroke-width="1" transform="rotate(-25 60 65)"/>
      <ellipse cx="60" cy="65" rx="30" ry="12" stroke="#FAF8F5" stroke-opacity="0.5" stroke-width="1" transform="rotate(25 60 65)"/>
      <circle cx="60" cy="65" r="7" fill="#D4AF37"/>
      <text x="60" y="126" text-anchor="middle" fill="#FAF8F5" font-family="'Cormorant Garamond', serif" font-size="7" letter-spacing="2">TIME &middot; CONSCIOUSNESS</text>
    </svg>
  `,

  "ohh-yes-i-am-single": `
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <rect width="120" height="140" fill="#F4EFEA"/>
      <line x1="30" y1="45" x2="90" y2="45" stroke="#171513" stroke-width="2"/>
      <line x1="30" y1="60" x2="75" y2="60" stroke="#171513" stroke-width="2"/>
      <line x1="30" y1="75" x2="85" y2="75" stroke="#171513" stroke-width="2"/>
      <rect x="30" y="90" width="18" height="6" fill="#D32F2F"/>
      <text x="60" y="126" text-anchor="middle" fill="#171513" font-family="'Space Grotesk', sans-serif" font-size="6.5" letter-spacing="1">DURJOY DATTA</text>
    </svg>
  `,

  "cinematic-notes": `
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
      <rect width="120" height="140" fill="#100E0D"/>
      <rect x="35" y="45" width="50" height="40" stroke="#FAF8F5" stroke-width="1.5"/>
      <line x1="45" y1="45" x2="45" y2="85" stroke="#FAF8F5" stroke-opacity="0.5" stroke-width="1"/>
      <line x1="75" y1="45" x2="75" y2="85" stroke="#FAF8F5" stroke-opacity="0.5" stroke-width="1"/>
      <text x="60" y="124" text-anchor="middle" fill="#FAF8F5" font-family="'Space Grotesk', sans-serif" font-size="6" letter-spacing="1.5">35MM &middot; SCENE</text>
    </svg>
  `
};

let featuredIndex = 0; // The Art of Storytelling

function initBookshelf(books) {
  const featuredCover = document.getElementById('featuredBookCover');
  if (!featuredCover) return;

  // Render initial featured book
  renderFeaturedBook(books[featuredIndex]);

  // Click on featured book opens its page
  featuredCover.addEventListener('click', () => {
    window.location.href = books[featuredIndex].url;
  });

  featuredCover.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      window.location.href = books[featuredIndex].url;
    }
  });

  // Attach listeners to all shelf spines
  const spines = document.querySelectorAll('.spine-book');
  spines.forEach((spine, idx) => {
    const bookIndex = parseInt(spine.dataset.bookIndex, 10);
    const book = books[bookIndex];

    spine.addEventListener('click', () => {
      featuredIndex = bookIndex;
      renderFeaturedBook(book);
    });

    spine.addEventListener('dblclick', () => {
      window.location.href = book.url;
    });

    spine.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        window.location.href = book.url;
      } else if (e.key === ' ') {
        e.preventDefault();
        featuredIndex = bookIndex;
        renderFeaturedBook(book);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = spines[idx + 1] || spines[0];
        next.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = spines[idx - 1] || spines[spines.length - 1];
        prev.focus();
      }
    });
  });
}

function renderFeaturedBook(book) {
  const featuredCover = document.getElementById('featuredBookCover');
  const innerFrame = document.getElementById('featuredInnerFrame');
  const titleEl = document.getElementById('featuredCoverTitle');
  const authorEl = document.getElementById('featuredCoverAuthor');

  if (!featuredCover || !book) return;

  featuredCover.setAttribute('aria-label', `Featured Book: ${book.title} by ${book.author}. Click to open.`);

  if (titleEl) titleEl.textContent = book.title;
  if (authorEl) authorEl.textContent = book.author;

  // Distinct background color for featured card
  if (book.bgCover) {
    featuredCover.querySelector('.featured-cover-surface').style.backgroundColor = book.bgCover;
  }

  // Insert crisp inline SVG artwork
  if (innerFrame) {
    const artwork = FEATURED_ARTWORKS[book.id] || FEATURED_ARTWORKS["the-art-of-storytelling"];
    innerFrame.innerHTML = artwork;
  }

  // Visual lift on active spine
  document.querySelectorAll('.spine-book').forEach(s => {
    if (parseInt(s.dataset.bookIndex, 10) === featuredIndex) {
      s.style.transform = 'translateY(-8px)';
    } else {
      s.style.transform = '';
    }
  });
}

/**
 * Center Shelf on Featured Book on Load / Resize
 */
function centerShelfOnFeatured() {
  const track = document.querySelector('.shelf-scroll-track');
  const featured = document.getElementById('featuredBookCover');
  if (track && featured) {
    setTimeout(() => {
      const scrollPos = featured.offsetLeft - (track.clientWidth / 2) + (featured.clientWidth / 2);
      track.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }, 150);
  }
}

/**
 * Build Asymmetrical Editorial Library Grid
 */
function initEditorialArchive(books) {
  const grid = document.getElementById('editorialLibraryGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const colSpans = ['col-span-6', 'col-span-6', 'col-span-4', 'col-span-4', 'col-span-4', 'col-span-8', 'col-span-4', 'col-span-6', 'col-span-6'];

  books.forEach((book, idx) => {
    const spanClass = colSpans[idx % colSpans.length];
    const card = document.createElement('a');
    card.href = book.url;
    card.className = `book-editorial-card ${spanClass}`;
    card.dataset.category = book.category;

    const tagsHtml = (book.tags || []).map(t => `<span class="card-tag-item">${t}</span>`).join('');

    card.innerHTML = `
      <div>
        <div class="card-meta-row">
          <span class="card-category-label">${book.category}</span>
          <span>Vol. 0${idx + 1}</span>
        </div>
        <h3 class="card-title">${book.title}</h3>
        <span class="card-author-name">${book.author}</span>
        <p class="card-summary-text">${book.note}</p>
        <blockquote class="card-quote-snippet">&ldquo;${book.quote}&rdquo;</blockquote>
      </div>
      <div>
        <div class="card-tags-group">${tagsHtml}</div>
        <div class="card-read-action">
          <span>Read Book Page</span>
          <i class="bi bi-arrow-right"></i>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/**
 * Filter Tabs
 */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-item-btn');
  const cards = document.querySelectorAll('.book-editorial-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

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
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggle = document.querySelector('.canvas-nav-toggle');
  const navLinks = document.querySelector('.nav-links-quiet');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/**
 * Dynamic Section & Page Background Switcher
 * Mappings:
 * - Home: sky-sun.webp (bg-home)
 * - The Bookshelf: checker.webp (bg-bookshelf)
 * - Reading Archive: swirl.webp (bg-archive)
 * - About: halftone.webp (bg-about)
 * - Portfolio: sky-cat.webp (bg-portfolio)
 */
function initBackgroundSwitcher() {
  const sections = [
    { id: 'home', bg: 'bg-home' },
    { id: 'bookshelf', bg: 'bg-bookshelf' },
    { id: 'archive', bg: 'bg-archive' },
    { id: 'portfolio', bg: 'bg-portfolio' },
    { id: 'about', bg: 'bg-about' }
  ];

  const setBg = (bgClass) => {
    sections.forEach(s => {
      document.body.classList.remove(s.bg, `page-${s.id}`);
    });
    document.body.classList.add(bgClass, `page-${bgClass.replace('bg-', '')}`);
  };

  // If a hash exists on initial load
  const hash = (window.location.hash || '').replace('#', '');
  const initial = sections.find(s => s.id === hash);
  if (initial) {
    setBg(initial.bg);
  } else {
    setBg('bg-home');
  }

  // IntersectionObserver for seamless background transitions while scrolling
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      let bestEntry = null;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }
      });

      if (bestEntry && window.scrollY >= 150) {
        const target = sections.find(s => s.id === bestEntry.target.id);
        if (target) setBg(target.bg);
      }
    }, {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: [0.1, 0.25, 0.5]
    });

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
  }

  // When scrolled to top (home hero)
  window.addEventListener('scroll', () => {
    if (window.scrollY < 150) {
      setBg('bg-home');
    }
  }, { passive: true });

  // Hash navigation listener
  window.addEventListener('hashchange', () => {
    const currentHash = (window.location.hash || '').replace('#', '');
    const current = sections.find(s => s.id === currentHash);
    if (current) setBg(current.bg);
  });
}
