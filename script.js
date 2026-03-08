const LETTER = `
<div style="text-align:center;margin:8px 0 16px;">
  <span style="font-size:26px;color:#b71c1c;font-family:'Dancing Script',cursive;letter-spacing:1px;text-shadow:0 2px 4px rgba(0,0,0,0.1);line-height:1.2">
    Gửi cậu,
  </span>
  <div style="width:70%;margin:8px auto 0;height:2px;background:linear-gradient(to right,transparent,#b71c1c,transparent);border-radius:2px"></div>
</div>

<div style="background:linear-gradient(145deg,rgba(255,255,255,0.8),rgba(252,228,236,0.6));border-radius:12px;padding:16px 18px;margin-bottom:16px;box-shadow:inset 0 0 10px rgba(255,255,255,0.5), 0 4px 15px rgba(0,0,0,0.05)">
  <p style="font-size:16px;line-height:1.9;color:#4a4a4a;margin:0;font-family:'Comic Neue',cursive;text-align:left;white-space:pre-wrap">
Nhân ngày 8/3, tớ chúc cậu luôn vui vẻ, xinh xắn và lúc nào cũng cười thật nhiều. 
Mong là những điều tốt đẹp nhất sẽ đến với cậu trong thời gian tới. 
Và đặc biệt là thi thật tốt để đỗ nguyện vọng 1 cậu mong muốn nhé.
Chúc cậu một ngày 8/3 thật vui và đáng nhớ.
  </p>
</div>`;

window.UNIVERSE_MSGS = [
  "Chúc Mừng 8/3",
  "Luôn xinh đẹp nhé",
  "Cười thật nhiều nha",
  "Đỗ nguyện vọng 1",
  "Mọi điều tốt đẹp"
];

/* ============ GARDEN ============ */
(function () {
    const g = document.getElementById('garden');
    const gc = ['#1a6b30', '#2d8a4e', '#145224', '#0d4520', '#1e7b38', '#0b3a18'];
    for (let i = 0; i < 150; i++) { const b = document.createElement('div'); b.className = 'grass-blade'; const h = 30 + Math.random() * 130; b.style.cssText = `left:${Math.random() * 100}%;height:${h}px;width:${4 + Math.random() * 6}px;background:linear-gradient(to top,${gc[Math.random() * gc.length | 0]},${gc[Math.random() * gc.length | 0]});transform:rotate(${Math.random() * 16 - 8}deg);border-radius:80% 80% 0 0;z-index:${h > 80 ? 3 : 1};animation:sw ${2 + Math.random() * 3}s ${Math.random() * 2}s ease-in-out infinite`; g.appendChild(b) }
    for (let i = 0; i < 8; i++) { const l = document.createElement('div'); l.className = 'leaf'; l.style.cssText = `width:${30 + Math.random() * 30}px;height:${20 + Math.random() * 12}px;bottom:${Math.random() * 8}%;left:${30 + Math.random() * 40}%;transform:rotate(${Math.random() * 60 - 30}deg);z-index:2`; g.appendChild(l) }

    // Flower types: original, tulip, rose, daisy
    const flowerTypes = ['original', 'tulip', 'rose', 'daisy', 'original', 'tulip', 'rose', 'daisy'];
    const tulipColors = [
        ['#ff5252', '#d32f2f'], ['#ff4081', '#c2185b'], ['#e040fb', '#9c27b0'],
        ['#ff6e40', '#e64a19'], ['#ffab40', '#ff6d00']
    ];
    const roseColors = [
        ['#f44336', '#c62828'], ['#e91e63', '#ad1457'], ['#ff8a80', '#ff5252'],
        ['#f48fb1', '#e91e63'], ['#ce93d8', '#9c27b0']
    ];

    const fd = [
        { l: '3%', h: 110, type: 'rose' },
        { l: '5%', h: 100, type: 'daisy' },
        { l: '9%', h: 150, type: 'original' },
        { l: '12%', h: 140, type: 'tulip' },
        { l: '16%', h: 180, type: 'daisy' },
        { l: '20%', h: 170, type: 'original' },
        { l: '24%', h: 160, type: 'tulip' },
        { l: '28%', h: 190, type: 'rose' },
        { l: '32%', h: 150, type: 'daisy' },
        { l: '36%', h: 160, type: 'tulip' },
        { l: '40%', h: 180, type: 'rose' },
        { l: '44%', h: 210, type: 'original' },
        { l: '48%', h: 170, type: 'tulip' },
        { l: '52%', h: 180, type: 'daisy' },
        { l: '56%', h: 160, type: 'original' },
        { l: '60%', h: 200, type: 'tulip' },
        { l: '64%', h: 140, type: 'daisy' },
        { l: '68%', h: 170, type: 'rose' },
        { l: '72%', h: 190, type: 'tulip' },
        { l: '76%', h: 150, type: 'original' },
        { l: '80%', h: 170, type: 'rose' },
        { l: '85%', h: 130, type: 'tulip' },
        { l: '89%', h: 150, type: 'daisy' },
        { l: '93%', h: 120, type: 'rose' },
        { l: '97%', h: 140, type: 'original' },
    ];

    fd.forEach((f, i) => {
        const fw = document.createElement('div');
        fw.className = 'flower';
        fw.style.cssText = `left:${f.l};transform:translateX(-50%);z-index:4`;

        const st = document.createElement('div');
        st.className = 'f-stem';
        st.style.cssText = `height:0;animation:gs 1.5s ${i * .2}s forwards;--sh:${Math.min(f.h, innerHeight * .35)}px`;

        if (f.type === 'original') {
            // Original pink flower
            const hd = document.createElement('div');
            hd.className = 'f-head';
            for (let p = 0; p < 7; p++) {
                const pt = document.createElement('div');
                pt.className = 'f-petal';
                pt.style.opacity = '0';
                pt.style.animation = `pi .6s ${i * .2 + 1.5 + p * .1}s forwards`;
                hd.appendChild(pt);
            }
            const ct = document.createElement('div');
            ct.className = 'f-center';
            ct.style.opacity = '0';
            ct.style.animation = `pi .4s ${i * .2 + 2.2}s forwards`;
            hd.appendChild(ct);
            st.appendChild(hd);

        } else if (f.type === 'tulip') {
            const tc = tulipColors[Math.random() * tulipColors.length | 0];
            const hd = document.createElement('div');
            hd.className = 'tulip-head';
            for (let p = 0; p < 3; p++) {
                const pt = document.createElement('div');
                pt.className = 'tulip-petal';
                pt.style.background = `linear-gradient(180deg, ${tc[0]}, ${tc[1]})`;
                pt.style.boxShadow = `inset 0 -4px 8px rgba(0,0,0,.15)`;
                pt.style.opacity = '0';
                pt.style.animation = `pi .5s ${i * .2 + 1.5 + p * .12}s forwards`;
                hd.appendChild(pt);
            }
            st.appendChild(hd);

        } else if (f.type === 'rose') {
            const rc = roseColors[Math.random() * roseColors.length | 0];
            const hd = document.createElement('div');
            hd.className = 'rose-head';
            for (let p = 0; p < 4; p++) {
                const pt = document.createElement('div');
                pt.className = 'rose-petal';
                const shade = p < 2 ? rc[0] : rc[1];
                pt.style.background = `radial-gradient(circle at 40% 40%, ${shade}, ${rc[1]})`;
                pt.style.boxShadow = `inset 0 -2px 4px rgba(0,0,0,.15), 0 0 6px ${rc[0]}44`;
                pt.style.opacity = '0';
                pt.style.animation = `pi .5s ${i * .2 + 1.5 + p * .12}s forwards`;
                hd.appendChild(pt);
            }
            const ct = document.createElement('div');
            ct.className = 'rose-center';
            ct.style.opacity = '0';
            ct.style.animation = `pi .4s ${i * .2 + 2.2}s forwards`;
            hd.appendChild(ct);
            st.appendChild(hd);

        } else if (f.type === 'daisy') {
            const hd = document.createElement('div');
            hd.className = 'daisy-head';
            const petalCount = 8;
            for (let p = 0; p < petalCount; p++) {
                const pt = document.createElement('div');
                pt.className = 'daisy-petal';
                const angle = (360 / petalCount) * p;
                pt.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
                pt.style.transformOrigin = 'center bottom';
                pt.style.opacity = '0';
                pt.style.animation = `pi .4s ${i * .2 + 1.5 + p * .06}s forwards`;
                hd.appendChild(pt);
            }
            const ct = document.createElement('div');
            ct.className = 'daisy-center';
            ct.style.opacity = '0';
            ct.style.animation = `pi .4s ${i * .2 + 2.2}s forwards`;
            hd.appendChild(ct);
            st.appendChild(hd);
        }

        fw.appendChild(st);
        g.appendChild(fw);
    });

    const s = document.createElement('style');
    s.textContent = '@keyframes sw{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}@keyframes gs{to{height:var(--sh)}}@keyframes pi{to{opacity:1}}';
    document.head.appendChild(s);
})();

/* ============ FIREFLIES ============ */
const fc = document.getElementById('fireflies'), fx = fc.getContext('2d');
let FW, FH; function rF() { FW = fc.width = innerWidth; FH = fc.height = innerHeight } rF(); addEventListener('resize', rF);
class Fly { constructor() { this.x = Math.random() * FW; this.y = Math.random() * FH * .6; this.vx = (Math.random() - .5) * .3; this.vy = (Math.random() - .5) * .2; this.r = Math.random() * 2 + .8; this.a = 0; this.ta = Math.random() * .5 + .15; this.fs = Math.random() * .01 + .004; this.fd = 1; this.h = [50, 330, 45][Math.random() * 3 | 0] } update() { this.x += this.vx + Math.sin(Date.now() * .0007 + this.y * .01) * .2; this.y += this.vy + Math.cos(Date.now() * .0007 + this.x * .01) * .15; if (this.x < 0 || this.x > FW) this.vx *= -1; if (this.y < 0 || this.y > FH * .7) this.vy *= -1; this.a += this.fs * this.fd; if (this.a >= this.ta) this.fd = -1; if (this.a <= 0) { this.fd = 1; this.x = Math.random() * FW; this.y = Math.random() * FH * .5 } } draw() { fx.save(); fx.globalAlpha = this.a; fx.shadowBlur = 10; fx.shadowColor = `hsla(${this.h},100%,70%,.8)`; fx.fillStyle = `hsla(${this.h},100%,80%,1)`; fx.beginPath(); fx.arc(this.x, this.y, this.r, 0, Math.PI * 2); fx.fill(); fx.restore() } }
const flies = Array.from({ length: 20 }, () => new Fly());
(function aF() { fx.clearRect(0, 0, FW, FH); flies.forEach(f => { f.update(); f.draw() }); requestAnimationFrame(aF) })();

/* ============ PETALS ============ */
const pc = document.getElementById('petals'), px = pc.getContext('2d');
let PW, PH; function rP() { PW = pc.width = innerWidth; PH = pc.height = innerHeight } rP(); addEventListener('resize', rP);
const pC = ['#f8bbd0', '#f48fb1', '#f06292', '#fce4ec', '#fff'];
class Pt { constructor() { this.reset(true) } reset(i) { this.x = Math.random() * PW; this.y = i ? Math.random() * PH : -12; this.s = Math.random() * 5 + 2; this.vy = Math.random() * 1 + .3; this.vx = Math.random() - .5; this.r = Math.random() * 360; this.rs = Math.random() * 2 - 1; this.o = Math.random() * .35 + .15; this.c = pC[Math.random() * pC.length | 0]; this.w = Math.random() * Math.PI * 2; this.ws = Math.random() * .02 + .006 } update() { this.y += this.vy; this.w += this.ws; this.x += this.vx + Math.sin(this.w) * .35; this.r += this.rs; if (this.y > PH + 12) this.reset(false) } draw() { px.save(); px.translate(this.x, this.y); px.rotate(this.r * Math.PI / 180); px.globalAlpha = this.o; px.fillStyle = this.c; px.beginPath(); px.ellipse(0, 0, this.s, this.s * .5, 0, 0, Math.PI * 2); px.fill(); px.restore() } }
const pts = Array.from({ length: 30 }, () => new Pt());
(function aP() { px.clearRect(0, 0, PW, PH); pts.forEach(p => { p.update(); p.draw() }); requestAnimationFrame(aP) })();

/* ============ PHASE 1 → 2 ============ */
document.getElementById('phase1').addEventListener('click', () => {
    document.getElementById('phase1').classList.add('out');
    playMusic(); // Attempt to play music
    setTimeout(() => document.getElementById('phase2').classList.add('show'), 800); // Overlay disappears regardless
});

/* ============ ENVELOPE (gift_letterv2 style) ============ */
let typingStarted = false;
document.getElementById('seal').addEventListener('click', () => {
    const ew = document.getElementById('envWrap');
    ew.classList.toggle('flap');
    if (ew.classList.contains('flap') && !typingStarted) {
        typingStarted = true;
        setTimeout(startTyping, 2000);
    }
});

let isTyping = false;
function startTyping() {
    if (isTyping) return;
    isTyping = true;

    const el = document.getElementById('text');
    const raw = LETTER;
    let i = 0;
    let html = '';
    const CURSOR = '<span class="typing-cursor">|</span>';

    function type() {
        if (i < raw.length) {
            const ch = raw.charAt(i);
            if (ch === '<') {
                // Find end of tag, add entire tag at once
                const tagEnd = raw.indexOf('>', i);
                if (tagEnd !== -1) {
                    html += raw.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                } else {
                    html += ch;
                    i++;
                }
                setTimeout(type, 0);
            } else {
                html += ch;
                el.innerHTML = html + CURSOR; // Cursor sits right after last typed char
                const letterEl = document.querySelector('.env-letter');
                letterEl.scrollTop = letterEl.scrollHeight;
                i++;
                setTimeout(type, 25);
            }
        } else {
            el.innerHTML = html; // Final render without cursor
            document.body.classList.add('typing-done');
            setTimeout(() => {
                const letterNode = document.querySelector('.env-letter');
                letterNode.classList.add('expanded');
                setTimeout(() => {
                    const giftSec = document.getElementById('giftSection');
                    if(giftSec){
                        giftSec.style.opacity = '1';
                        giftSec.style.visibility = 'visible';
                    }
                    letterNode.scrollTop = 0;
                }, 1000);
            }, 500);
        }
    }
    type();
}

document.getElementById('giftBtn').addEventListener('click', () => {
    if (typeof window.initUniverse === 'function') window.initUniverse();
    playMusic();
});

/* ============ MUSIC ============ */
const bgM = document.getElementById('bgMusic'), mBtn = document.getElementById('musicBtn');
let mP = false;

function playMusic() {
    if (!mP) {
        bgM.volume = .35;
        let playPromise = bgM.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                mP = true;
                mBtn.textContent = '🎵';
                mBtn.classList.add('playing');
            }).catch(error => {
                console.log("Audio play failed, user interaction may be required or source is broken:", error);
            });
        }
    }
}
mBtn.addEventListener('click', () => { if (mP) { bgM.pause(); mP = false; mBtn.textContent = '🔇'; mBtn.classList.remove('playing') } else playMusic() });

/* ============ FINAL PHASE 3 & FIREWORKS ============ */
window.transitionToPhase3 = function() {
    const uni = document.getElementById("universe");
    uni.style.opacity = '0';
    uni.style.transition = 'opacity 2s ease';
    
    setTimeout(() => {
        uni.style.display = 'none';
        const p3 = document.getElementById('phase3');
        p3.classList.remove('hidden');
        
        // Generate QR Code
        const qrContainer = document.getElementById('resultQR');
        if(qrContainer) {
            qrContainer.innerHTML = '';
            new QRCode(qrContainer, {
                text: window.location.href, // This will automatically use the Vercel URL after deployment
                width: 130,
                height: 130,
                colorDark: "#d81b60",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
        
        startFireworks();
    }, 2000);
};

// Simple fireworks implementation for phase 3
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.friction = 0.95;
            this.gravity = 0.05;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }
        update() {
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    let particles = [];
    const colors = ['#ff5252', '#ff4081', '#e040fb', '#f48fb1', '#fff'];

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        if(Math.random() < 0.05) {
            const x = Math.random() * width;
            const y = Math.random() * (height / 2);
            const color = colors[Math.floor(Math.random() * colors.length)];
            for(let i = 0; i < 50; i++) {
                particles.push(new Particle(x, y, color));
            }
        }
        
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            if(p.alpha <= 0) {
                particles.splice(index, 1);
            }
        });
    }
    animate();
}
