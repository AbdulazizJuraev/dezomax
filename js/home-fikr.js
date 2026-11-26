/* Bosh sahifa: «Fikr bildirish» bloki (index.html #v4Fb) — qisqa shakl, to'liq shakl fikr.html'da.
   Yuboriladi: pay.dezomax.uz/feedback (server/server.js) → admin «Sharhlar → DezoMax haqida fikrlar». Saytda ko'rinmaydi. */
(function () {
  var form = document.getElementById('v4FbForm');
  if (!form) return;
  var ru = document.documentElement.lang === 'ru';
  var T = function (uz, r) { return ru ? r : uz; };
  var API = 'https://pay.dezomax.uz';
  var kind = 'taklif';
  var kinds = form.querySelector('.v4-fb-kinds');
  var text = form.querySelector('textarea'), contact = form.querySelector('input'), btn = form.querySelector('button[type=submit]');
  var msg = document.getElementById('v4FbMsg');
  var say = function (m, ok) { msg.textContent = m; msg.hidden = !m; msg.classList.toggle('is-ok', !!ok); };
  kinds.addEventListener('click', function (e) {
    var b = e.target.closest('[data-k]'); if (!b) return;
    kind = b.dataset.k;
    [].forEach.call(kinds.children, function (x) { x.classList.toggle('is-on', x === b); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var t = text.value.trim();
    if (t.length < 5) { say(T('Fikringizni biroz batafsilroq yozing', 'Напишите отзыв чуть подробнее')); text.focus(); return; }
    say(''); btn.disabled = true;
    var tok = ''; try { tok = localStorage.getItem('dezomax_pay_token') || ''; } catch (er) {}
    var user = null; try { user = JSON.parse(localStorage.getItem('dezomax_user') || 'null'); } catch (er) {}
    var headers = { 'content-type': 'application/json' };
    if (tok) headers.authorization = 'Bearer ' + tok;
    var app = !!window.Capacitor || /DezoMaxApp|; wv\)/.test(navigator.userAgent);
    fetch(API + '/feedback', { method: 'POST', headers: headers, body: JSON.stringify({ text: t, kind: kind, name: user && user.name ? user.name : '', contact: contact.value.trim(), src: app ? 'app' : 'web' }) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok) throw new Error(j.error || T('Yuborib bo‘lmadi', 'Не удалось отправить')); return j; }); })
      .then(function () {
        text.value = ''; contact.value = '';
        say(T('Rahmat! Fikringiz yuborildi 🙌', 'Спасибо! Отзыв отправлен 🙌'), true);
        if (window.ym) try { ym(113203097, 'reachGoal', 'feedback'); } catch (er) {}
      })
      .catch(function (er) { say(er.message === 'Failed to fetch' ? T('Internet yoki server bilan aloqa yo‘q. Birozdan keyin qayta urinib ko‘ring.', 'Нет связи с сервером. Попробуйте чуть позже.') : er.message); })
      .then(function () { btn.disabled = false; });
  });
})();
