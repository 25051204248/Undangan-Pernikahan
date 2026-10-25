// 1. Nama tamu dari URL: index.html?to=Budi
const to = new URLSearchParams(location.search).get('to');
if (to) document.getElementById('guest').textContent = to;

// 2. Buka undangan
document.getElementById('openBtn').addEventListener('click', () => {
  document.getElementById('cover').classList.add('open');
  document.body.classList.remove('locked');
  document.getElementById('bgm').play().catch(() => {});
});

// 3. Tombol musik
const bgm = document.getElementById('bgm');
document.getElementById('music').addEventListener('click', () => bgm.paused ? bgm.play() : bgm.pause());

// 4. Countdown
const target = new Date('2026-12-20T08:00:00+07:00').getTime();
function tick() {
  let diff = Math.max(0, target - Date.now());
  const set = (id, v) => document.getElementById(id).textContent = v;
  set('d', Math.floor(diff / 864e5));
  set('h', Math.floor(diff % 864e5 / 36e5));
  set('m', Math.floor(diff % 36e5 / 6e4));
  set('s', Math.floor(diff % 6e4 / 1e3));
}
tick(); setInterval(tick, 1000);

// 5. Kelopak jatuh
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = 8 + Math.random() * 10 + 's';
  p.style.animationDelay = -Math.random() * 15 + 's';
  p.style.transform = 'scale(' + (0.6 + Math.random()) + ')';
  document.body.appendChild(p);
}

// 6. Animasi muncul saat scroll
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('show')), {threshold: .15});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 7. RSVP (tampil di halaman)
document.getElementById('rsvp').addEventListener('submit', e => {
  e.preventDefault();
  const div = document.createElement('div');
  div.className = 'wish';
  const b = document.createElement('b'); b.textContent = document.getElementById('name').value;
  const s = document.createElement('small'); s.textContent = ' · ' + document.getElementById('status').value;
  const p = document.createElement('p'); p.textContent = document.getElementById('msg').value;
  div.append(b, s, p);
  document.getElementById('wishes').prepend(div);
  e.target.reset();
});