import { addOnIds, menu, sections } from './menu.js';
import { posterHeight, posterPath, posters, posterWidth } from './posters.js';

const glyphs = {
  bag: '<path d="M6 7h12l2 14H4L6 7Z"/><path d="M9 10V6a3 3 0 1 1 6 0v4"/>',
  pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  menu: '<path d="M5 4h13a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M8 8h8m-8 4h8m-8 4h5"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 4 4"/>',
  'chevron-right': '<path d="m9 5 7 7-7 7"/>',
  'chevron-left': '<path d="m15 5-7 7 7 7"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  grid: '<rect x="3.5" y="3.5" width="6" height="6" rx="1"/><rect x="14.5" y="3.5" width="6" height="6" rx="1"/><rect x="3.5" y="14.5" width="6" height="6" rx="1"/><rect x="14.5" y="14.5" width="6" height="6" rx="1"/>',
  drumstick: '<path d="m9 13-3 3a2 2 0 1 0-2 3 2 2 0 1 0 3 2l4-4m0 0c-2-1-3-3-2-5l2-4c1-3 4-5 7-4s4 5 2 8c-2 3-6 7-9 5Z"/>',
  meat: '<path d="M20 8c-2-5-7-6-11-3S4 9 3 12s2 7 7 7c3 0 3-4 7-4 3 0 4-3 3-7Z"/><path d="M8 11c1-2 4-2 5-1s-1 4-3 4-3-1-2-3Z"/>',
  flame: '<path d="M12 22c-4 0-7-3-7-7 0-4 4-6 4-10 3 1 4 5 4 6 2-2 3-4 3-7 3 3 4 7 4 11s-3 7-8 7Z"/><path d="M12 22c-2 0-3-2-3-4s2-3 3-5c1 2 3 3 3 5s-1 4-3 4Z"/>',
  pot: '<path d="M5 10h14l-1 9H6l-1-9ZM3 10h18M8 7h8M12 7V4M3 13h2m14 0h2"/>',
  bowl: '<path d="M3 12h18a9 9 0 0 1-18 0Zm5 9h8M9 8c-1-2 1-2 1-4m4 4c-1-2 1-2 1-4"/>',
  leaf: '<path d="M20 4c0 9-2 15-9 15-4 0-6-3-6-6 0-7 9-7 15-9ZM4 21l10-10"/>',
  pan: '<circle cx="9" cy="12" r="6"/><path d="M15 12h6m-15 0a3 3 0 0 1 3-3"/>',
  bread: '<path d="M5 17v-4c-2-1-3-2-3-4 0-3 3-5 10-5s10 2 10 5c0 2-1 3-3 4v4c0 2-1 3-3 3H8c-2 0-3-1-3-3Zm4-6 1 2m4-3 1 2"/>',
  cake: '<path d="M4 14l9-7 7 7v6H4v-6Zm0 1h16m-16 3h16m-7-11V4"/>',
  cup: '<path d="M5 8h14l-2 13H7L5 8ZM4 8h16M14 8l2-5h3"/>',
  juice: '<path d="M10 9h10l-1 12h-8L10 9Zm6 0 2-6h3m-12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>',
  tea: '<path d="M4 8h13v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V8Zm13 1h2a2 2 0 0 1 0 4h-2M3 21h17M9 5V3m4 2V3"/>',
  phone: '<path d="M6 3h4l1 5-3 2a13 13 0 0 0 6 6l2-3 5 1v4c0 2-2 3-4 3A16 16 0 0 1 3 7c0-2 1-4 3-4Z"/>',
  whatsapp: '<path d="M20.7 11.7a8.7 8.7 0 0 1-12.6 7.8L4 20.5l1.1-4a8.7 8.7 0 1 1 15.6-4.8Z"/><path d="M9 8h1l1 2-1 1c.7 1.4 1.6 2.3 3 3l1-1 2 1v1c-.3 1.5-3.6 1-6-1.5C7.7 11.2 7.4 8.3 9 8Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  trash: '<path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5"/>',
};

const icon = name => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + glyphs[name] + '</svg>';
document.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = icon(node.dataset.icon); });

const byId = id => document.getElementById(id);
const entries = new Map(menu.map(dish => [dish.id, dish]));
const categories = new Map(sections.map(([key, name, symbol]) => [key, { name, symbol }]));
const numberFormat = new Intl.NumberFormat('ar-SA-u-nu-latn');
const money = value => numberFormat.format(value) + ' ر.س';
const storageKey = 'amjad.shawqiyah.cart.v1';
const branchNumber = '966547050244';
const grid = byId('dish-grid');
const rail = byId('categories');
const search = byId('search-input');
const dishDialog = byId('dish-dialog');
const cartDialog = byId('cart-dialog');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const lineLimit = 99;

let category = 'all';
let selection;
let toastTimer;
let basket = readCart();

function availableExtras(dish) {
  return (addOnIds[dish.section] ?? []).map(id => entries.get(id)).filter(extra => extra.id !== dish.id);
}

function readCart() {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (!Array.isArray(data)) return [];
    return data.flatMap(line => {
      const dish = entries.get(line?.id);
      if (!dish?.options[line.variant] || !Number.isInteger(line.quantity) || line.quantity < 1) return [];
      const ids = Array.isArray(line.extras) ? line.extras : [];
      const extras = availableExtras(dish).map(extra => extra.id).filter(id => ids.includes(id));
      return [{ id: dish.id, variant: line.variant, extras, quantity: Math.min(lineLimit, line.quantity) }];
    });
  } catch {
    return [];
  }
}

function persistCart() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(basket));
  } catch {
    // Keep the current cart usable when storage is unavailable.
  }
  updateCartBadge();
  if (!reducedMotion.matches) {
    byId('cart-count').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.22)' }, { transform: 'scale(1)' }], 330);
  }
}

function updateCartBadge() {
  const count = basket.reduce((total, line) => total + line.quantity, 0);
  byId('cart-count').textContent = numberFormat.format(count);
  byId('open-cart').setAttribute('aria-label', count ? 'فتح سلة الطلب، الكمية ' + count : 'فتح سلة الطلب');
}

function linePrice(line) {
  const base = entries.get(line.id).options[line.variant][1];
  return base + line.extras.reduce((total, id) => total + entries.get(id).options[0][1], 0);
}

function dishVisual(dish, eager = false) {
  if (!dish.photo) return '<span class="dish-placeholder">' + icon(categories.get(dish.section).symbol) + '</span>';
  return '<img src="' + dish.photo + '" alt="" width="320" height="320" ' +
    (eager ? '' : 'loading="lazy" ') + 'decoding="async">';
}

function normalize(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').trim();
}

function cardLabel(dish) {
  const from = Math.min(...dish.options.map(([, price]) => price));
  const varies = dish.options.some(([, price]) => price !== from);
  return dish.name + (varies ? '، ابتداءً من ' : '، ') + money(from);
}

function artwork(page, bounds, eager = false) {
  const [left, top, right, bottom] = bounds;
  const width = right - left;
  const height = bottom - top;
  return '<img class="original-artwork" src="' + posterPath(page) + '" alt="" width="1194" height="1600" ' +
    (eager ? '' : 'loading="lazy" ') + 'decoding="async" draggable="false" style="width:' +
    (posterWidth / width) * 100 + '%;max-width:none;height:' + (posterHeight / height) * 100 +
    '%;left:' + (-left / width) * 100 + '%;top:' + (-top / height) * 100 + '%">';
}

function renderPoster(poster, index) {
  const scoped = category !== 'all' && poster.split;
  const top = scoped && category === 'bread' ? poster.split : 0;
  const bottom = scoped && category === 'tea' ? poster.split : posterHeight;
  const height = bottom - top;
  const title = (scoped ? [category] : poster.sections).map(id => categories.get(id).name).join(' و');
  const cards = poster.cards.filter(([id]) => category === 'all' || entries.get(id).section === category);
  return '<section class="poster" aria-label="' + title + '" style="--delay:' + Math.min(index, 7) * 45 +
    'ms;aspect-ratio:' + posterWidth + '/' + height + '">' +
    artwork(poster.page, [0, top, posterWidth, bottom], index < 2) +
    cards.map(([id, left, y, right, endY]) =>
      '<button class="poster-card" type="button" data-dish="' + id + '" aria-haspopup="dialog" aria-label="' +
      cardLabel(entries.get(id)) + '" style="left:' + (left / posterWidth) * 100 +
      '%;top:' + ((y - top) / height) * 100 + '%;width:' + ((right - left) / posterWidth) * 100 +
      '%;height:' + ((endY - y) / height) * 100 + '%"></button>').join('') + '</section>';
}

function renderSearchResult({ page, card }, index) {
  const [id, left, top, right, bottom] = card;
  return '<button class="search-result" type="button" data-dish="' + id + '" aria-haspopup="dialog" aria-label="' +
    cardLabel(entries.get(id)) + '" style="--delay:' + Math.min(index, 7) * 40 + 'ms">' +
    '<span class="search-artwork" style="--ratio:' + (right - left) / (bottom - top) + '">' +
    artwork(page, [left, top, right, bottom], index < 3) + '</span></button>';
}

function renderMenu() {
  const query = normalize(search.value).split(/\s+/).filter(Boolean);
  const activeSection = categories.get(category).name;
  const pages = posters.filter(poster => category === 'all' || poster.sections.includes(category));
  const count = category === 'all' ? menu.length : menu.filter(dish => dish.section === category).length;
  if (!query.length) {
    grid.className = 'poster-gallery' + (pages.length === 1 ? ' single-poster' : '');
    grid.innerHTML = pages.map(renderPoster).join('');
    byId('results-status').textContent = numberFormat.format(count) + ' طبقاً في ' + activeSection;
    return;
  }

  const resultIds = new Set();
  const results = pages.flatMap(({ page, cards }) => cards.flatMap(card => {
    const [id] = card;
    const dish = entries.get(id);
    if (resultIds.has(id) || (category !== 'all' && dish.section !== category)) return [];
    const searchable = normalize(dish.name + ' ' + categories.get(dish.section).name);
    if (!query.every(word => searchable.includes(word))) return [];
    resultIds.add(id);
    return [{ page, card }];
  }));
  grid.className = 'search-results';
  byId('results-status').textContent = results.length ? numberFormat.format(results.length) + ' نتيجة' : 'لا توجد نتائج';
  if (results.length) {
    grid.innerHTML = results.map(renderSearchResult).join('');
    return;
  }
  grid.innerHTML = '<div class="empty-results">' + icon('search') + '<h3>ما لقينا أطباق بهذا الاسم</h3><p>جرّب كلمة ثانية أو اعرض كل الأطباق.</p><button class="button button-secondary" type="button" id="clear-filters">عرض كل الأطباق</button></div>';
  byId('clear-filters').addEventListener('click', () => {
    search.value = '';
    selectCategory('all');
    search.focus();
  });
}

function selectCategory(id) {
  category = id;
  [...rail.children].forEach(button => button.setAttribute('aria-pressed', button.dataset.category === id));
  if (id === 'all') rail.scrollTo({ left: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  renderMenu();
}

rail.innerHTML = sections.map(([key, name, symbol]) =>
  '<button type="button" class="category" aria-pressed="' + (key === 'all') + '" data-category="' + key + '">' +
  icon(symbol) + '<span>' + name + '</span></button>').join('');

function updateRail() {
  const position = Math.abs(rail.scrollLeft);
  const range = rail.scrollWidth - rail.clientWidth;
  byId('category-prev').disabled = position < 4;
  byId('category-next').disabled = position >= range - 4;
  rail.parentElement.classList.toggle('has-overflow', range > 4);
}

function scrollCategories(direction) {
  rail.scrollBy({ left: direction * Math.min(rail.clientWidth * .72, 450), behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}

rail.addEventListener('scroll', updateRail, { passive: true });
new ResizeObserver(updateRail).observe(rail);
document.fonts.ready.then(updateRail);
rail.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (button) selectCategory(button.dataset.category);
});
byId('category-next').addEventListener('click', () => scrollCategories(-1));
byId('category-prev').addEventListener('click', () => scrollCategories(1));
search.addEventListener('input', renderMenu);
grid.addEventListener('click', event => {
  const button = event.target.closest('[data-dish]');
  if (button) openDish(entries.get(button.dataset.dish));
});

function openDish(dish) {
  selection = { id: dish.id, variant: 0, extras: [], quantity: 1 };
  const options = dish.options;
  const extras = availableExtras(dish);
  const choices = options[0][0] ? '<fieldset class="options"><legend>اختر الحجم أو التقديم</legend><div class="option-grid">' +
    options.map(([name, cost], index) =>
      '<label class="size-option"><input type="radio" name="size" value="' + index + '"' + (index === 0 ? ' checked' : '') + '>' +
      '<span>' + name + '</span><strong>' + money(cost) + '</strong></label>').join('') +
    '</div></fieldset>' : '';
  const extrasSection = extras.length ? '<fieldset class="options"><legend>إضافات <small>اختياري</small></legend>' + extras.map(extra =>
    '<label class="extra-option"><input type="checkbox" value="' + extra.id + '"><span>' + extra.name + ' ' +
    (extra.options[0][0] ? '<small>· ' + extra.options[0][0] + '</small>' : '') +
    '</span><strong>+ ' + money(extra.options[0][1]) + '</strong></label>').join('') + '</fieldset>' : '';
  byId('dish-content').innerHTML =
    '<div class="detail-visual visual-' + dish.section + '">' + dishVisual(dish, true) + '</div>' +
    '<div class="detail-copy"><div class="detail-category">' + categories.get(dish.section).name + '</div>' +
    '<h2 id="dish-title">' + dish.name + '</h2><p>' + dish.description + '</p>' +
    (dish.calories ? '<p class="calories">' + icon('flame') + ' <bdi>' + dish.calories + '</bdi> سعرة حرارية بحسب المنيو</p>' : '') +
    choices + extrasSection + '</div>';
  byId('dish-content').scrollTop = 0;
  updateSelection();
  dishDialog.showModal();
  byId('dish-content').scrollTop = 0;
}

function updateSelection() {
  byId('dish-quantity').textContent = numberFormat.format(selection.quantity);
  byId('dish-decrease').disabled = selection.quantity <= 1;
  byId('dish-increase').disabled = selection.quantity >= lineLimit;
  byId('dish-total').textContent = money(linePrice(selection) * selection.quantity);
}

byId('dish-content').addEventListener('change', event => {
  if (event.target.name === 'size') selection.variant = Number(event.target.value);
  selection.extras = [...dishDialog.querySelectorAll('input[type="checkbox"]:checked')].map(input => input.value);
  updateSelection();
});
byId('dish-increase').addEventListener('click', () => { selection.quantity++; updateSelection(); });
byId('dish-decrease').addEventListener('click', () => { selection.quantity--; updateSelection(); });

byId('add-dish').addEventListener('click', () => {
  const same = basket.find(line => line.id === selection.id && line.variant === selection.variant &&
    line.extras.join() === selection.extras.join());
  if (same && same.quantity + selection.quantity > lineLimit) {
    dishDialog.close();
    showToast('الحد الأقصى لهذا الاختيار في السلة هو 99.');
    return;
  }
  if (same) same.quantity += selection.quantity;
  else basket.push(selection);
  persistCart();
  dishDialog.close();
  showToast('أضفنا ' + entries.get(selection.id).name + ' إلى سلّتك');
});

function showToast(message) {
  clearTimeout(toastTimer);
  const toast = byId('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
}

function stepper(line, index) {
  return '<div class="stepper"><button type="button" data-line="' + index + '" data-action="minus" aria-label="تقليل كمية ' +
    entries.get(line.id).name + '"' + (line.quantity <= 1 ? ' disabled' : '') + '>' + icon('minus') +
    '</button><span>' + numberFormat.format(line.quantity) + '</span><button type="button" data-line="' + index +
    '" data-action="plus" aria-label="زيادة كمية ' + entries.get(line.id).name + '"' + (line.quantity >= lineLimit ? ' disabled' : '') +
    '>' + icon('plus') + '</button></div>';
}

function renderCart() {
  byId('cart-footer').hidden = !basket.length;
  if (!basket.length) {
    byId('cart-content').innerHTML = '<div class="empty-cart">' + icon('bag') +
      '<h3>سلّتك فاضية</h3><p>اختر طبقك المفضّل من المنيو.</p><button type="button" class="button button-primary" data-browse>تصفّح المنيو</button></div>';
    return;
  }
  byId('cart-content').innerHTML = basket.map((line, index) => {
    const dish = entries.get(line.id);
    return '<article class="cart-line"><div class="cart-image visual-' + dish.section + '">' + dishVisual(dish) + '</div>' +
      '<div class="cart-line-copy"><h3>' + dish.name + '</h3><p>' + dish.options[line.variant][0] + '</p>' +
      (line.extras.length ? '<p>إضافات: ' + line.extras.map(id => entries.get(id).name).join('، ') + '</p>' : '') + '</div>' +
      '<button type="button" class="icon-button remove" data-line="' + index + '" data-action="remove" aria-label="حذف ' +
      dish.name + '">' + icon('trash') + '</button><div class="line-bottom">' + stepper(line, index) +
      '<strong>' + money(linePrice(line) * line.quantity) + '</strong></div></article>';
  }).join('');
  updateCheckout();
}

function updateCheckout() {
  const total = basket.reduce((sum, line) => sum + linePrice(line) * line.quantity, 0);
  byId('cart-total').textContent = money(total);
  const lines = basket.map(line => {
    const dish = entries.get(line.id);
    const [size] = dish.options[line.variant];
    const extras = line.extras.map(id => {
      const extra = entries.get(id);
      return extra.name + (extra.options[0][0] ? ' (' + extra.options[0][0] + ')' : '');
    });
    return '• ' + line.quantity + ' × ' + dish.name + (size ? ' (' + size + ')' : '') +
      (extras.length ? ' — إضافات لكل حصة: ' + extras.join('، ') : '') +
      ' — ' + money(linePrice(line) * line.quantity);
  });
  const note = byId('order-note').value.trim();
  const message = ['السلام عليكم، أرغب بالطلب من أمجاد السدة - فرع الشوقية.', '', ...lines, '',
    'مجموع الأطباق: ' + money(total), ...(note ? ['ملاحظات: ' + note] : []), '', 'فضلاً أكّدوا التوفر والتوصيل.'].join('\n');
  byId('checkout').href = 'https://wa.me/' + branchNumber + '?text=' + encodeURIComponent(message);
}

byId('open-cart').addEventListener('click', () => {
  renderCart();
  cartDialog.showModal();
});
byId('order-note').addEventListener('input', updateCheckout);
byId('cart-content').addEventListener('click', event => {
  if (event.target.closest('[data-browse]')) {
    cartDialog.close();
    byId('menu').scrollIntoView();
    return;
  }
  const button = event.target.closest('[data-line]');
  if (!button) return;
  const index = Number(button.dataset.line);
  const action = button.dataset.action;
  const line = basket[index];
  if (action === 'remove') basket.splice(index, 1);
  else line.quantity += action === 'plus' ? 1 : -1;
  persistCart();
  renderCart();
  const focus = cartDialog.querySelector('[data-line="' + index + '"][data-action="' + action + '"]:enabled') ||
    cartDialog.querySelector('[data-line="' + index + '"][data-action="remove"]') ||
    cartDialog.querySelector('[data-close]');
  focus.focus();
});

for (const dialog of [dishDialog, cartDialog]) {
  const close = dialog.querySelector('[data-close]');
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}

updateCartBadge();
renderMenu();
