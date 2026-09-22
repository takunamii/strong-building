// данные проектов для карточек и лайтбокса
const projects = [
  {
    title: 'Камера проращивания',
    photos: ['images/p1-1.jpg', 'images/p1-2.jpg', 'images/p1-3.jpg', 'images/p1-4.jpg'],
    length: '23,8 м',
    width: '11,8 м',
    height: '4 м',
    area: '280 м²',
    loc: 'Россия, Московская обл., д. Непейно',
    purpose: 'Сельскохозяйственные здания',
    details: ['Наличие кранов: нет', 'Наличие антресолей: нет']
  },
  {
    title: 'Производственное здание',
    photos: ['images/p2-1.jpg', 'images/p2-2.jpg', 'images/p2-3.jpg'],
    length: '24 м',
    width: '18 м',
    height: '6 м',
    area: '432 м²',
    loc: 'Россия, Московская обл., г. Одинцово',
    purpose: 'Производственные и промышленные здания',
    details: ['Наличие кранов: нет', 'Наличие антресолей: нет']
  },
  {
    title: 'Производственно-складское здание',
    photos: ['images/p3-1.jpg', 'images/p3-2.jpg', 'images/p3-3.jpg', 'images/p3-4.jpg', 'images/p3-5.jpg'],
    length: '60 м',
    width: '24 м',
    height: '6 м',
    area: '1440 м²',
    loc: 'Россия, Московская обл., д. Селевкино',
    purpose: 'Производственные и промышленные здания',
    details: ['Наличие кранов: нет', 'Наличие антресолей: нет']
  },
  {
    title: 'Склад',
    photos: ['images/p4-1.jpg', 'images/p4-2.jpg', 'images/p4-3.jpg', 'images/p4-4.jpg', 'images/p4-5.jpg', 'images/p4-6.jpg'],
    length: '60 м',
    width: '24 м',
    height: '7,5 м',
    area: '1440 м²',
    loc: 'Россия, Московская обл., г. Химки',
    purpose: 'Склады и Ангары',
    details: ['Наличие кранов: да, 3.2т', 'Наличие антресолей: нет']
  }
];

// смена слов в заголовке
const words = ['здания', 'склады', 'ангары', 'цеха', 'офисы', 'магазины', 'автосервисы', 'сельхоз здания', 'здания для транспорта'];
const flip = document.getElementById('word-flip');
let wordIndex = 3;

function setWord(word) {
  const old = flip.querySelector('.w');
  const span = document.createElement('span');
  span.className = 'w enter-below';
  span.textContent = word;
  flip.appendChild(span);

  // если слово длинное, уменьшаем шрифт чтобы влезло в строку
  flip.style.fontSize = '';
  let w = span.offsetWidth;
  const line = flip.closest('.line');
  const plain = line.querySelector('.hl-plain');
  const free = line.clientWidth - plain.offsetWidth - 20;
  if (w > free) {
    flip.style.fontSize = Math.floor(free / w * 100) + '%';
    w = span.offsetWidth;
  }
  flip.style.width = w + 'px';

  setTimeout(function () {
    span.classList.add('in');
    if (old) {
      old.classList.remove('in');
      old.classList.add('exit-above');
      setTimeout(function () { old.remove(); }, 550);
    }
  }, 20);
}

setWord(words[wordIndex]);
setInterval(function () {
  wordIndex++;
  if (wordIndex == words.length) wordIndex = 0;
  setWord(words[wordIndex]);
}, 2600);

// точки с фото на карточках проектов
const cards = document.querySelectorAll('.pcard');

cards.forEach(function (card, i) {
  const p = projects[i];
  const img = card.querySelector('img');
  const dots = card.querySelector('.pcard-dots');

  p.photos.forEach(function (src, k) {
    const dot = document.createElement('button');
    dot.className = 'pcard-dot' + (k == 0 ? ' active' : '');
    dot.addEventListener('click', function (e) {
      e.stopPropagation();
      img.src = src;
      img.alt = p.title + ' — фото ' + (k + 1);
      dots.querySelectorAll('.pcard-dot').forEach(function (d, j) {
        d.classList.toggle('active', j == k);
      });
    });
    dots.appendChild(dot);
  });
});

// лайтбокс
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
let lbProject = 0;
let lbIndex = 0;

function showPhoto(k) {
  const p = projects[lbProject];
  lbIndex = k;
  if (lbIndex < 0) lbIndex = p.photos.length - 1;
  if (lbIndex == p.photos.length) lbIndex = 0;
  lbImg.src = p.photos[lbIndex];
  lbImg.alt = p.title + ' — фото ' + (lbIndex + 1);
  document.querySelectorAll('#lb-dots .pcard-dot').forEach(function (d, j) {
    d.classList.toggle('active', j == lbIndex);
  });
}

function openLb(i) {
  const p = projects[i];
  lbProject = i;
  lbIndex = 0;

  const dots = document.getElementById('lb-dots');
  dots.innerHTML = '';
  p.photos.forEach(function (src, k) {
    const dot = document.createElement('button');
    dot.className = 'pcard-dot' + (k == 0 ? ' active' : '');
    dot.addEventListener('click', function () { showPhoto(k); });
    dots.appendChild(dot);
  });

  document.getElementById('lb-title').textContent = p.title;
  document.getElementById('lb-length').textContent = p.length;
  document.getElementById('lb-width').textContent = p.width;
  document.getElementById('lb-height').textContent = p.height;
  document.getElementById('lb-area').textContent = p.area;
  document.getElementById('lb-purpose').textContent = p.purpose;
  document.getElementById('lb-loc').textContent = p.loc;
  document.getElementById('lb-details').innerHTML = p.details.map(function (d) {
    return '<li>' + d + '</li>';
  }).join('');

  showPhoto(0);
  lb.classList.add('open');
  document.body.classList.add('no-scroll');
}

function closeLb() {
  lb.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

cards.forEach(function (card) {
  card.addEventListener('click', function () {
    openLb(+card.dataset.project);
  });
});
document.querySelector('[data-lb-prev]').addEventListener('click', function () { showPhoto(lbIndex - 1); });
document.querySelector('[data-lb-next]').addEventListener('click', function () { showPhoto(lbIndex + 1); });
document.querySelector('[data-lb-close]').addEventListener('click', closeLb);
lb.addEventListener('click', function (e) {
  if (e.target == lb) closeLb();
});

// модалки
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.classList.add('no-scroll');
}
function closeModal(modal) {
  modal.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

document.querySelectorAll('[data-modal]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (lb.classList.contains('open')) closeLb();
    openModal('modal-' + btn.dataset.modal);
  });
});

document.querySelectorAll('.modal-backdrop').forEach(function (modal) {
  modal.addEventListener('click', function (e) {
    if (e.target == modal) closeModal(modal);
  });
  modal.querySelectorAll('[data-modal-close]').forEach(function (btn) {
    btn.addEventListener('click', function () { closeModal(modal); });
  });
});

// бургер меню
const burger = document.querySelector('.burger');
const drawer = document.getElementById('drawer');
const drawerBackdrop = document.querySelector('.drawer-backdrop');

function closeDrawer() {
  drawer.classList.remove('open');
  drawerBackdrop.classList.remove('open');
  document.body.classList.remove('no-scroll');
  burger.setAttribute('aria-expanded', 'false');
}

burger.addEventListener('click', function () {
  const isOpen = drawer.classList.contains('open');
  if (isOpen) {
    closeDrawer();
  } else {
    drawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    document.body.classList.add('no-scroll');
    burger.setAttribute('aria-expanded', 'true');
  }
});
drawerBackdrop.addEventListener('click', closeDrawer);
document.querySelectorAll('[data-drawer-close]').forEach(function (btn) {
  btn.addEventListener('click', closeDrawer);
});

// закрытие по эскейпу
document.addEventListener('keydown', function (e) {
  if (e.key != 'Escape') return;
  closeDrawer();
  closeLb();
  document.querySelectorAll('.modal-backdrop.open').forEach(function (m) { closeModal(m); });
});

// маска телефона
document.querySelectorAll('[data-mask]').forEach(function (inp) {
  inp.addEventListener('input', function () {
    let d = inp.value.replace(/\D/g, '');
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (d && !d.startsWith('7')) d = '7' + d;
    d = d.slice(0, 11);
    let r = '+7';
    if (d.length > 1) r += ' (' + d.slice(1, 4);
    if (d.length >= 4) r += ') ' + d.slice(4, 7);
    if (d.length >= 7) r += '-' + d.slice(7, 9);
    if (d.length >= 9) r += '-' + d.slice(9, 11);
    inp.value = r;
  });
});

// валидация формы (контакты и модалка звонка)
function bindForm(form) {
  const success = form.parentElement.querySelector('[data-form-success]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let ok = true;

    const name = form.querySelector('[name="name"]');
    const phone = form.querySelector('[name="phone"]');
    const email = form.querySelector('[name="email"]');
    const consent = form.parentElement.querySelector('.consent[data-consent="required"]');

    function mark(input, bad) {
      input.closest('.field').classList.toggle('invalid', bad);
      if (bad) ok = false;
    }

    mark(name, name.value.trim().length < 2);
    mark(phone, phone.value.replace(/\D/g, '').length != 11);
    mark(email, !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()));

    const consOk = consent.classList.contains('checked');
    consent.classList.toggle('error', !consOk);
    if (!consOk) ok = false;

    const errEl = form.querySelector('.form-error') || form.parentElement.querySelector('.form-error');
    if (errEl) errEl.classList.toggle('show', !ok);

    if (!ok) return;

    form.style.display = 'none';
    const h = form.parentElement.querySelector('h3');
    if (h) h.style.display = 'none';
    const sub = form.parentElement.querySelector('.modal-sub');
    if (sub) sub.style.display = 'none';
    success.classList.add('show');
  });

  // клики по галочкам согласия
  form.parentElement.querySelectorAll('.consent').forEach(function (c) {
    c.addEventListener('click', function (e) {
      if (e.target.tagName == 'A') return;
      c.classList.toggle('checked');
      c.classList.remove('error');
    });
  });

  // убираем ошибку когда снова печатают
  form.querySelectorAll('input, textarea').forEach(function (i) {
    i.addEventListener('input', function () {
      i.closest('.field').classList.remove('invalid');
    });
  });
}

document.querySelectorAll('[data-form], [data-form-modal]').forEach(bindForm);

// квиз
const quizSteps = document.querySelectorAll('.quiz-step');
const quizBarFill = document.getElementById('quiz-bar-fill');
const quizStepLabel = document.getElementById('quiz-step-label');
const qLen = document.getElementById('q-len');
const qWid = document.getElementById('q-wid');
const qHei = document.getElementById('q-hei');
const quizResult = document.getElementById('quiz-result');
const quizArea = document.getElementById('quiz-area');
const quizBudget = document.getElementById('quiz-budget');
const quizNote = document.getElementById('quiz-note');
const quizAnswers = { len: 0, wid: 0, hei: 0, area: 0, mat: '', services: [] };

function fmtRu(n) {
  return n.toLocaleString('ru-RU');
}

function money(v) {
  if (v >= 1000000) return (Math.round(v / 100000) / 10).toLocaleString('ru-RU') + ' млн ₽';
  return fmtRu(Math.round(v)) + ' ₽';
}

// шаг 1 — размеры здания
function checkSizes() {
  const btn = document.querySelector('[data-quiz-next="2"]');
  const l = parseFloat(qLen.value);
  const w = parseFloat(qWid.value);
  const h = parseFloat(qHei.value);

  const ok = !isNaN(l) && !isNaN(w) && !isNaN(h) &&
    l >= 3 && l <= 200 && w >= 3 && w <= 120 && h >= 2.5 && h <= 20;

  if (!ok) {
    quizResult.hidden = true;
    btn.disabled = true;
    return;
  }

  quizAnswers.len = l;
  quizAnswers.wid = w;
  quizAnswers.hei = h;
  quizAnswers.area = l * w;
  quizArea.textContent = fmtRu(Math.round(l * w)) + ' м²';
  quizBudget.innerHTML = 'Предварительный бюджет: <b>' + money(l * w * 10300) + ' – ' + money(l * w * 17000) + '</b>';
  if (l * w < 500) {
    quizNote.textContent = 'Ваш проект меньше 500 м² — уточните у менеджера возможность изготовления.';
  } else {
    quizNote.textContent = 'Расчёт по опубликованным ценам «СТРОНГ»: 10 300–17 000 ₽/м². Завод производит здания от 500 м².';
  }
  quizResult.hidden = false;
  btn.disabled = false;
}

[qLen, qWid, qHei].forEach(function (inp) {
  inp.addEventListener('input', checkSizes);
});

function showStep(n) {
  quizSteps.forEach(function (s) {
    s.classList.toggle('active', +s.dataset.step == n);
  });
  quizBarFill.style.width = (n * 25) + '%';
  quizStepLabel.textContent = 'Шаг ' + n + ' из 4';
}

document.querySelectorAll('[data-quiz-next]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (!btn.disabled) showStep(+btn.dataset.quizNext);
  });
});
document.querySelectorAll('[data-quiz-back]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    showStep(+btn.dataset.quizBack);
  });
});

// шаг 2 — ограждение
document.querySelectorAll('[data-quiz-radio="mat"] .opt').forEach(function (o) {
  o.addEventListener('click', function () {
    document.querySelectorAll('[data-quiz-radio="mat"] .opt').forEach(function (x) {
      x.classList.remove('selected');
    });
    o.classList.add('selected');
    quizAnswers.mat = o.dataset.value;
    document.querySelector('[data-quiz-next="3"]').disabled = false;
  });
});

// шаг 3 — услуги, можно выбрать несколько
document.querySelectorAll('[data-quiz-multi] .opt').forEach(function (o) {
  o.addEventListener('click', function () {
    o.classList.toggle('selected');
    const v = o.dataset.value;
    if (o.classList.contains('selected')) {
      quizAnswers.services.push(v);
    } else {
      quizAnswers.services = quizAnswers.services.filter(function (s) { return s != v; });
    }
  });
});

// шаг 4 — контакты и итог
const quizForm = document.querySelector('[data-quiz-form]');

quizForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let ok = true;

  const name = quizForm.querySelector('[name="name"]');
  const phone = quizForm.querySelector('[name="phone"]');
  const email = quizForm.querySelector('[name="email"]');
  const consent = quizForm.parentElement.querySelector('.consent[data-consent="required"]');

  function mark(input, bad) {
    input.closest('.field').classList.toggle('invalid', bad);
    if (bad) ok = false;
  }

  mark(name, name.value.trim().length < 2);
  mark(phone, phone.value.replace(/\D/g, '').length != 11);
  mark(email, !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim()));

  const consOk = consent.classList.contains('checked');
  consent.classList.toggle('error', !consOk);
  if (!consOk) ok = false;

  if (!ok) return;

  let svc = 'не выбраны';
  if (quizAnswers.services.length) svc = quizAnswers.services.join(', ');

  document.getElementById('quiz-summary').innerHTML =
    'Здание ' + fmtRu(quizAnswers.len) + '×' + fmtRu(quizAnswers.wid) + '×' + fmtRu(quizAnswers.hei) + ' м — ' + fmtRu(Math.round(quizAnswers.area)) + ' м²<br>' +
    'Ограждение: ' + quizAnswers.mat + '<br>Услуги: ' + svc;

  quizSteps.forEach(function (s) { s.style.display = 'none'; });
  document.querySelector('.quiz-progress').style.display = 'none';
  document.querySelector('[data-quiz-success]').classList.add('show');
});

// галочки в квизе
quizForm.parentElement.querySelectorAll('.consent').forEach(function (c) {
  c.addEventListener('click', function (e) {
    if (e.target.tagName == 'A') return;
    c.classList.toggle('checked');
    c.classList.remove('error');
  });
});
quizForm.querySelectorAll('input').forEach(function (i) {
  i.addEventListener('input', function () {
    i.closest('.field').classList.remove('invalid');
  });
});

// анимация цифр в статистике
function animateCount(el) {
  const target = +el.dataset.count;
  let start = null;
  const dur = 1200;

  function step(t) {
    if (!start) start = t;
    const k = Math.min((t - start) / dur, 1);
    el.textContent = Math.round(target * k);
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// появление блоков при скролле
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (en) {
    if (!en.isIntersecting) return;
    const delay = +en.target.dataset.revealDelay || 0;
    setTimeout(function () {
      en.target.classList.add('in');
      en.target.querySelectorAll('[data-count]').forEach(animateCount);
    }, delay);
    io.unobserve(en.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(function (el) {
  io.observe(el);
});

// год в подвале
document.querySelectorAll('[data-year]').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// TODO: отправка заявок на сервер, пока просто показываем что всё ок
