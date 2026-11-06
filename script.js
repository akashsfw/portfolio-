/* =========================================================
   1. BIOMETRIC SCANNER DATA NODES (CUSTOMIZE EASILY HERE)
   ========================================================= */
const SCAN_NODES = {
  identity: {
    tag: "// NODE_01 : CORE BIOMETRIC DOSSIER",
    title: "1st-Year Undergrad Explorer & Builder",
    desc: "First-year Mechanical Engineering student at Netaji Subhas University of Technology (NSUT), Dwarka, New Delhi. Driven by hands-on experimentation across technology, 3D spatial design, student societies, and real-world campus execution.",
    specs: [
      { label: "INSTITUTION", val: "NSUT Dwarka, Delhi" },
      { label: "ACADEMIC TRACK", val: "B.Tech Mechanical (1st Yr)" },
      { label: "SOCIETIES & OPS", val: "TDS // NSS // Moksha" },
      { label: "EXPLORING", val: "Blender 3D & Tech" }
    ]
  },
  affiliations: {
    tag: "// NODE_02 : CAMPUS SOCIETIES & OPERATIONS",
    title: "TDS, Moksha Fest Logistics & NSS Cell NSUT",
    desc: "Actively involved in NSUT's ecosystem—exploring tech and problem-solving with The Debugging Society (TDS), contributing to community initiatives with NSS Cell NSUT, and executing on-ground event operations as a Logistics Volunteer for Moksha.",
    specs: [
      { label: "TECH SOCIETY", val: "The Debugging Society (TDS)" },
      { label: "CULTURAL FEST", val: "Moksha (Logistics Volunteer)" },
      { label: "SOCIAL OUTREACH", val: "NSS Cell NSUT Member" },
      { label: "CAMPUS SECTOR", val: "Dwarka Sector-3, Delhi" }
    ]
  },
  venture: {
    tag: "// NODE_03 : EMC STARTUP ARCHIVE",
    title: "Sound Blasters — Bamboo Sound Amplifier",
    desc: "Founded during Class 12th under the Entrepreneurship Mindset Curriculum (EMC). Engineered an eco-friendly, passive acoustic sound amplifier crafted from bamboo that boosts smartphone audio naturally without electricity.",
    specs: [
      { label: "PROJECT NAME", val: "Sound Blasters" },
      { label: "PROGRAM", val: "Class 12th EMC Venture" },
      { label: "MATERIAL TECH", val: "Natural Bamboo Acoustics" },
      { label: "REPOSITORY", val: "github.com/akashsfw/Soundblasters" }
    ]
  },
  creative: {
    tag: "// NODE_04 : CREATIVE SUBROUTINES",
    title: "Blender 3D, Notes Storytelling & Visual Culture",
    desc: "Exploring 3D modelling and visual design inside Blender, documenting everyday life experiences as narrative stories in the Notes app, and drawing creative inspiration from cinema, anime, and manga.",
    specs: [
      { label: "3D & DESIGN", val: "Exploring Blender 3D" },
      { label: "WRITING HABIT", val: "Daily Notes App Stories" },
      { label: "MEDIA ARCHIVE", val: "Cinema, Anime & Manga" },
      { label: "MINDSET", val: "Learn From Every Experience" }
    ]
  }
};

/* =========================================================
   2. BIOMETRIC NODE SWITCHING & SCAN SWEEP
   ========================================================= */
const nodeBtns = document.querySelectorAll('.node-btn');
const scanBox = document.getElementById('scan-box');
const rTag = document.getElementById('readout-tag');
const rTitle = document.getElementById('readout-title');
const rDesc = document.getElementById('readout-desc');
const rSpecs = document.getElementById('readout-specs');
const scanBadge = document.getElementById('scan-badge');

function renderNode(key) {
  const data = SCAN_NODES[key];
  if (!data) return;

  scanBox.style.opacity = '0.25';
  scanBadge.textContent = 'SCANNING_NODE...';

  setTimeout(() => {
    rTag.textContent = data.tag;
    rTitle.textContent = data.title;
    rDesc.textContent = data.desc;
    rSpecs.innerHTML = data.specs.map(s => `
      <div class="spec-cell">
        <span class="spec-label">${s.label}</span>
        <span class="spec-val">${s.val}</span>
      </div>
    `).join('');
    scanBox.style.opacity = '1';
    scanBadge.textContent = 'LOCKED // VERIFIED';
  }, 160);
}

nodeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    nodeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderNode(btn.getAttribute('data-node'));
  });
});

// Auto-cycle all nodes when clicking "RUN BIOMETRIC SCAN"
const triggerScanBtn = document.getElementById('trigger-scan-btn');
const keys = Object.keys(SCAN_NODES);
let scanIndex = 0;

triggerScanBtn.addEventListener('click', () => {
  triggerScanBtn.textContent = 'SCANNING BIOMETRICS...';
  let step = 0;
  const interval = setInterval(() => {
    scanIndex = (scanIndex + 1) % keys.length;
    const k = keys[scanIndex];
    nodeBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-node') === k));
    renderNode(k);
    step++;
    if (step >= keys.length) {
      clearInterval(interval);
      triggerScanBtn.textContent = 'RUN BIOMETRIC SCAN';
    }
  }, 650);
});

/* =========================================================
   3. HUD CONTROLS (CLOCK, PALETTE, CRT, TELEMETRY BARS)
   ========================================================= */
function updateClock() {
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  document.getElementById('scan-clock').textContent = 'IST_TIME: ' + timeStr;
}
setInterval(updateClock, 1000);
updateClock();

const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('amber-mode');
  const isAmber = document.body.classList.contains('amber-mode');
  themeBtn.textContent = isAmber ? 'PALETTE: AMBER' : 'PALETTE: CYAN';
});

const crtBtn = document.getElementById('crt-btn');
const crtOverlay = document.getElementById('crt-overlay');
crtBtn.addEventListener('click', () => {
  crtOverlay.classList.toggle('off');
  const isOff = crtOverlay.classList.contains('off');
  crtBtn.textContent = isOff ? 'CRT: OFF' : 'CRT: ON';
  crtBtn.classList.toggle('active', !isOff);
});

// Re-animate telemetry progress bars on click
document.getElementById('recalibrate-btn').addEventListener('click', () => {
  const fills = document.querySelectorAll('.stat-fill');
  fills.forEach(f => {
    f.style.width = '0%';
    setTimeout(() => {
      f.style.width = f.getAttribute('data-width');
    }, 120);
  });
});

/* =========================================================
   4. SOUNDBLASTERS EMBED VIEWPORT & ACOUSTIC SIMULATOR
   ========================================================= */
const modeWebBtn = document.getElementById('mode-web-btn');
const modeSimBtn = document.getElementById('mode-sim-btn');
const sizeMobBtn = document.getElementById('size-mob-btn');
const reloadBtn = document.getElementById('reload-iframe-btn');
const sbIframe = document.getElementById('sb-iframe');
const simOverlay = document.getElementById('sim-overlay');

modeWebBtn.addEventListener('click', () => {
  simOverlay.classList.remove('active');
  modeWebBtn.classList.add('active');
  modeSimBtn.classList.remove('active');
});

modeSimBtn.addEventListener('click', () => {
  simOverlay.classList.add('active');
  modeSimBtn.classList.add('active');
  modeWebBtn.classList.remove('active');
  resizeWaveCanvas();
});

sizeMobBtn.addEventListener('click', () => {
  sbIframe.classList.toggle('mobile-view');
  sizeMobBtn.classList.toggle('active');
});

reloadBtn.addEventListener('click', () => {
  sbIframe.src = sbIframe.src;
});

// Interactive Bamboo Acoustic Resonance Wave Canvas
const waveCanvas = document.getElementById('wave-canvas');
const wCtx = waveCanvas.getContext('2d');
const freqSlider = document.getElementById('freq-slider');
const chamberSlider = document.getElementById('chamber-slider');
const freqVal = document.getElementById('freq-val');
const chamberVal = document.getElementById('chamber-val');
const gainReadout = document.getElementById('gain-readout');

function resizeWaveCanvas() {
  waveCanvas.width = waveCanvas.clientWidth || 600;
  waveCanvas.height = waveCanvas.clientHeight || 220;
}
window.addEventListener('resize', resizeWaveCanvas);
resizeWaveCanvas();

let phase = 0;
function drawAcousticWave() {
  const freq = parseFloat(freqSlider.value);
  const chamber = parseFloat(chamberSlider.value);
  freqVal.textContent = freq + ' Hz';
  chamberVal.textContent = chamber + ' cm';

  // Resonance gain calculation
  const optimalFreq = 17000 / (4 * chamber);
  const detune = Math.abs(freq - optimalFreq);
  const resonanceBoost = Math.max(1.3, 3.2 - (detune / 350));
  const dbGain = (20 * Math.log10(resonanceBoost)).toFixed(1);
  gainReadout.textContent = 'PASSIVE GAIN: +' + dbGain + ' dB';

  const w = waveCanvas.width;
  const h = waveCanvas.height;
  wCtx.clearRect(0, 0, w, h);

  // Subtle Grid
  wCtx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
  wCtx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    wCtx.beginPath();
    wCtx.moveTo(x, 0);
    wCtx.lineTo(x, h);
    wCtx.stroke();
  }

  // Raw Smartphone Input Wave (Dim)
  wCtx.beginPath();
  wCtx.strokeStyle = 'rgba(255, 0, 85, 0.55)';
  wCtx.lineWidth = 1.5;
  for (let x = 0; x < w; x++) {
    const y = h / 2 + Math.sin((x * freq * 0.00018) + phase) * 22;
    if (x === 0) wCtx.moveTo(x, y);
    else wCtx.lineTo(x, y);
  }
  wCtx.stroke();

  // Amplified Bamboo Chamber Output Wave (Bright Cyan)
  wCtx.beginPath();
  wCtx.strokeStyle = '#00f0ff';
  wCtx.lineWidth = 2.5;
  for (let x = 0; x < w; x++) {
    const amp = 22 * resonanceBoost;
    const y = h / 2 + Math.sin((x * freq * 0.00018) + phase) * amp;
    if (x === 0) wCtx.moveTo(x, y);
    else wCtx.lineTo(x, y);
  }
  wCtx.stroke();

  phase += 0.08;
  requestAnimationFrame(drawAcousticWave);
}
drawAcousticWave();

// Locked project slots interaction
document.querySelectorAll('.locked-slot').forEach(slot => {
  slot.addEventListener('click', () => {
    const tag = slot.querySelector('.slot-lock-tag');
    tag.textContent = '[PINGING_SECTOR... AWAITING BUILD]';
    tag.style.color = 'var(--cyan)';
    setTimeout(() => {
      tag.textContent = '[LOCKED_SLOT]';
      tag.style.color = 'var(--yellow)';
    }, 1400);
  });
});

/* =========================================================
   5. CYBERPUNK CITY SKYLINE & NEON RAIN CANVAS BACKGROUND
   ========================================================= */
const cityCanvas = document.getElementById('city-canvas');
const ctx = cityCanvas.getContext('2d');
let cw, ch;
let buildings = [];
let raindrops = [];

function initCity() {
  cw = cityCanvas.width = window.innerWidth;
  ch = cityCanvas.height = window.innerHeight;
  buildings = [];
  raindrops = [];

  let x = 0;
  while (x < cw) {
    const bw = 45 + Math.random() * 75;
    const bh = 90 + Math.random() * (ch * 0.42);
    buildings.push({
      x,
      w: bw,
      h: bh,
      lit: Math.random() > 0.45
    });
    x += bw + 4;
  }

  for (let i = 0; i < 85; i++) {
    raindrops.push({
      x: Math.random() * cw,
      y: Math.random() * ch,
      len: 12 + Math.random() * 20,
      speed: 6 + Math.random() * 7
    });
  }
}

window.addEventListener('resize', initCity);
initCity();

function animateCity() {
  ctx.clearRect(0, 0, cw, ch);

  // Subtle perspective horizon glow
  const grad = ctx.createLinearGradient(0, ch * 0.4, 0, ch);
  grad.addColorStop(0, 'rgba(5, 7, 13, 0)');
  grad.addColorStop(1, 'rgba(0, 240, 255, 0.07)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, cw, ch);

  // Silhouette Cyberpunk Skyline
  buildings.forEach(b => {
    ctx.fillStyle = 'rgba(7, 12, 22, 0.85)';
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.fillRect(b.x, ch - b.h, b.w, b.h);
    ctx.strokeRect(b.x, ch - b.h, b.w, b.h);

    if (b.lit) {
      ctx.fillStyle = 'rgba(252, 238, 10, 0.35)';
      ctx.fillRect(b.x + 8, ch - b.h + 12, b.w - 16, 3);
    }
  });

  // Neon Rain
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.22)';
  ctx.lineWidth = 1;
  raindrops.forEach(r => {
    ctx.beginPath();
    ctx.moveTo(r.x, r.y);
    ctx.lineTo(r.x - 1, r.y + r.len);
    ctx.stroke();

    r.y += r.speed;
    if (r.y > ch) {
      r.y = -20;
      r.x = Math.random() * cw;
    }
  });

  requestAnimationFrame(animateCity);
}
animateCity();