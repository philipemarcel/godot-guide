// ============================================================================
// ACADEMIA AETHER & GODOT — CONTROLADOR PRINCIPAL DA APLICAÇÃO
// Gerencia trilhas 2D/3D, Níveis (Introdução -> Profissional), Abas, Quizzes e Áudio
// ============================================================================

(function () {
  const STORAGE_KEY = "academia_aether_godot_progress_v1";

  const LEVEL_ORDER = [
    { key: "introducao", roman: "I", name: "Nível I — Introdução", rank: "Aprendiz de Caldeira" },
    { key: "iniciante", roman: "II", name: "Nível II — Iniciante", rank: "Mecânico de Bancada" },
    { key: "intermediario", roman: "III", name: "Nível III — Intermediário", rank: "Engenheiro a Vapor" },
    { key: "avancado", roman: "IV", name: "Nível IV — Avançado", rank: "Mestre Relojoeiro" },
    { key: "profissional", roman: "V", name: "Nível V — Profissional", rank: "Arquiteto do Éter" }
  ];

  const PREFERENCES_KEY = "academia_aether_godot_preferences_v1";
  const BACKUP_KEY = "academia_aether_godot_reset_backup_v1";
  let storageAvailable = true;
  const preferences = readStored(PREFERENCES_KEY);
  const lastLessons = {};
  ["2d", "3d"].forEach(area => {
    const lessons = getAreaLessons(area);
    lastLessons[area] = lessons.find(l => l.id === preferences.lastLessons?.[area])?.id || lessons[0].id;
  });
  const state = {
    area: preferences.area === "3d" ? "3d" : "2d",
    level: "all",
    statusFilter: "all",
    search: "",
    activeLessonId: lastLessons[preferences.area === "3d" ? "3d" : "2d"],
    activeApproachIndex: 0,
    completed: validateCompleted(readStored(STORAGE_KEY)),
    soundOn: preferences.soundOn === true,
    lastLessons,
    approaches: preferences.approaches && typeof preferences.approaches === "object" ? preferences.approaches : {},
    mapOpen: preferences.mapOpen === true,
    quizAnswers: {}
  };
  let resetBackup = validateCompleted(readStored(BACKUP_KEY));

  function readStored(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "{}");
      return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    } catch (_e) { return {}; }
  }

  function validateCompleted(value) {
    return Object.fromEntries(getAllLessons().filter(l => value[l.id] === true).map(l => [l.id, true]));
  }

  function writeStored(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      storageAvailable = true;
    } catch (_e) { storageAvailable = false; }
    const note = document.getElementById("storage-note");
    if (note) note.textContent = storageAvailable
      ? "Seu progresso fica salvo neste navegador."
      : "Armazenamento indisponível. O progresso vale apenas nesta sessão.";
    return storageAvailable;
  }

  function saveCompleted() { return writeStored(STORAGE_KEY, state.completed); }

  function savePreferences() {
    return writeStored(PREFERENCES_KEY, {
      area: ["2d", "3d"].includes(state.area) ? state.area : preferences.area,
      lastLessons: state.lastLessons, approaches: state.approaches, soundOn: state.soundOn,
      mapOpen: state.mapOpen
    });
  }

  function normalize(value) {
    return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function showToast(message, actionLabel, action) {
    const toast = document.getElementById("app-toast");
    toast.hidden = false;
    toast.classList.add("show");
    document.getElementById("toast-message").textContent = message;
    const actionButton = document.getElementById("toast-action");
    actionButton.hidden = !action;
    actionButton.textContent = actionLabel || "";
    actionButton.onclick = action || null;
  }

  function syncControls() {
    [[".area-btn", "area", state.area], [".level-tab", "level", state.level], [".filter-pill", "status", state.statusFilter]].forEach(([selector, key, value]) => {
      document.querySelectorAll(selector).forEach(button => {
        const selected = button.dataset[key] === value;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
    });
    const sound = document.getElementById("btn-sound-toggle");
    sound.setAttribute("aria-pressed", String(state.soundOn));
    sound.setAttribute("aria-label", "Sons mecânicos");
    document.getElementById("sound-toggle-label").textContent = state.soundOn ? "Som ligado" : "Som desligado";
  }

  // Interruptible disclosure transitions: state and keyboard access update immediately.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const disclosureStates = new WeakMap();
  const runningMotion = new Set();
  const motionEase = "cubic-bezier(.22, 1, .36, 1)";

  function setPanelVisible(element, visible, kind) {
    const previous = disclosureStates.get(element);
    if (previous?.visible === visible) return;
    const current = previous?.animation ? getComputedStyle(element) : null;
    const from = current ? {opacity: current.opacity, transform: current.transform} : null;
    previous?.animation?.cancel();
    const entry = {visible, animation: null};
    disclosureStates.set(element, entry);
    element.inert = !visible;
    element.setAttribute("aria-hidden", String(!visible));
    const finish = () => {
      element.hidden = !visible;
      if (!visible) element.classList.remove("is-open");
    };
    // Initial layout is immediate; subsequent interactions animate in both directions.
    if (!previous || reducedMotion.matches || !element.animate) { finish(); return; }
    element.hidden = false;
    if (kind === "map") element.classList.add("is-open");
    const closed = {opacity: 0, transform: kind === "map" ? "translateX(calc(-100% - 14px))" : "translateY(-8px)"};
    const opened = {opacity: 1, transform: "translate(0, 0)"};
    const animation = element.animate([from || (visible ? closed : opened), visible ? opened : closed], {
      duration: kind === "map" ? 260 : 190, easing: motionEase
    });
    entry.animation = animation;
    runningMotion.add(animation);
    animation.oncancel = () => runningMotion.delete(animation);
    animation.onfinish = () => {
      runningMotion.delete(animation);
      if (disclosureStates.get(element) !== entry) return;
      entry.animation = null;
      finish();
    };
  }

  const contentMotion = new WeakMap();
  function revealContent(element, key) {
    const previous = contentMotion.get(element);
    if (previous?.key === key) return;
    previous?.animation?.cancel();
    const entry = {key, animation: null};
    contentMotion.set(element, entry);
    if (!previous || reducedMotion.matches || !element.animate) return;
    const animation = element.animate([
      {opacity: .35, transform: "translateY(8px)"},
      {opacity: 1, transform: "translateY(0)"}
    ], {duration: 240, easing: motionEase});
    entry.animation = animation;
    runningMotion.add(animation);
    animation.oncancel = animation.onfinish = () => {runningMotion.delete(animation); entry.animation = null;};
  }

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) [...runningMotion].forEach(animation => animation.finish());
  });

  function syncReadingLayout() {
    const reference = state.area === "compare" || state.area === "glossary";
    const mapVisible = state.mapOpen;
    document.body.classList.toggle("map-collapsed", !mapVisible);
    const sidebar = document.getElementById("curriculum-sidebar");
    setPanelVisible(sidebar, mapVisible, "map");
    if (mapVisible) sidebar.classList.add("is-open");
    const mapButton = document.getElementById("btn-curriculum-toggle");
    mapButton.disabled = false;
    mapButton.setAttribute("aria-expanded", String(mapVisible));
    const mapLabel = mapVisible ? "Recolher mapa" : "Abrir mapa";
    mapButton.setAttribute("aria-label", mapLabel);
    mapButton.title = mapLabel;
    if (!mapButton.querySelector("svg")) mapButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 5 7 7-7 7"/></svg><span aria-hidden="true" class="edge-caption">Mapa</span>';
    document.getElementById("navigation-panels").hidden = true;
    syncTopNavigation();
    const mapArea = ["2d", "3d"].includes(state.area) ? state.area : preferences.area;
    document.getElementById("map-track-context").textContent = (mapArea === "3d" ? "Forja 3D" : "Oficina 2D") + " · " + (state.level === "all" ? "Todos os níveis" : LEVEL_ORDER.find(item => item.key === state.level).name);
    const lesson = getAllLessons().find(item => item.id === state.activeLessonId);
    const context = document.getElementById("dock-context");
    context.textContent = reference ? (state.area === "compare" ? "Tradutor 2D → 3D" : "Dicionário de conceitos") : lesson?.title || "Bancada de estudos";
    context.title = context.textContent;
  }

  function setCurriculumOpen(open, manual = false) {
    if (!open && document.getElementById("curriculum-sidebar").contains(document.activeElement)) document.getElementById("btn-curriculum-toggle").focus({preventScroll:true});
    state.mapOpen = open;
    syncReadingLayout();
    savePreferences();
  }

  let openTopPanel = null;
  function syncTopNavigation() {
    document.querySelectorAll("[data-top-panel]").forEach(button => {
      const key = button.dataset.topPanel;
      const selected = key === state.area || (key === "reference" && ["compare", "glossary"].includes(state.area));
      button.classList.toggle("is-current", selected);
      button.setAttribute("aria-expanded", String(key === openTopPanel));
      setPanelVisible(document.getElementById(`top-panel-${key}`), key === openTopPanel, "menu");
    });
    document.querySelectorAll("[data-track]").forEach(button => {
      const selected = button.dataset.track === state.area && button.dataset.trackLevel === state.level;
      if (selected) button.setAttribute("aria-current", "true"); else button.removeAttribute("aria-current");
    });
  }

  function closeTopNavigation(returnFocus = false) {
    const previous = openTopPanel;
    openTopPanel = null;
    syncTopNavigation();
    if (returnFocus && previous) document.getElementById(`topnav-${previous}`).focus({preventScroll:true});
  }

  function toggleTopNavigation(key, focusFirst = false) {
    openTopPanel = openTopPanel === key && !focusFirst ? null : key;
    syncTopNavigation();
    if (focusFirst && openTopPanel) document.querySelector(`#top-panel-${key} button`)?.focus({preventScroll:true});
  }

  function chooseTrack(area, level) {
    state.area = area;
    state.level = level;
    state.search = "";
    state.statusFilter = "all";
    state.activeApproachIndex = 0;
    document.getElementById("lesson-search").value = "";
    const available = getFilteredLessons();
    const remembered = state.lastLessons[area];
    state.activeLessonId = available.some(item => item.id === remembered) ? remembered : available[0].id;
    state.lastLessons[area] = state.activeLessonId;
    preferences.area = area;
    closeTopNavigation();
    savePreferences();
    syncControls();
    renderSidebar();
    renderStage();
    setCurriculumOpen(true, true);
    if (window.matchMedia("(max-width: 1060px)").matches) document.getElementById("lesson-search").focus({preventScroll:true});
    else focusLesson();
  }

  function initTopNavigation() {
    const reference = document.getElementById("reference-options");
    ["compare", "glossary"].forEach(area => reference.appendChild(document.getElementById(`btn-area-${area}`)));
    document.getElementById("settings-options").appendChild(document.querySelector(".telemetry-panel"));
    document.querySelectorAll("[data-top-panel]").forEach(button => {
      button.addEventListener("click", () => toggleTopNavigation(button.dataset.topPanel));
      button.addEventListener("keydown", event => {
        if (event.key === "ArrowDown") {event.preventDefault();toggleTopNavigation(button.dataset.topPanel,true);}
      });
    });
    document.querySelectorAll("[data-track]").forEach(button => button.addEventListener("click", () => chooseTrack(button.dataset.track,button.dataset.trackLevel)));
    reference.addEventListener("click", () => closeTopNavigation());
    document.addEventListener("pointerdown", event => {
      if(openTopPanel && !document.getElementById("topnav").contains(event.target))closeTopNavigation();
      if(state.mapOpen && !document.getElementById("curriculum-sidebar").contains(event.target) && !document.getElementById("btn-curriculum-toggle").contains(event.target))setCurriculumOpen(false);
    });
    document.addEventListener("focusin", event => {if(openTopPanel && !document.getElementById("topnav").contains(event.target))closeTopNavigation();});
  }

  function focusLesson() {
    const title = document.querySelector(".lesson-title");
    if (!title) return;
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
    title.scrollIntoView({ block: "start", behavior: "instant" });
  }

  function clearFilters() {
    state.level = "all";
    state.statusFilter = "all";
    state.search = "";
    document.getElementById("lesson-search").value = "";
    syncControls();
    renderSidebar();
    setCurriculumOpen(true);
    document.getElementById("lesson-search").focus();
  }

  // Sintetizador Web Audio Steampunk (cliques mecânicos e acordes de vapor)
  let audioCtx = null;
  window.playSteamClick = function (freq = 480, duration = 0.04) {
    if (!state.soundOn) return;
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === "suspended") audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.45, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (_e) {
      // ignore audio restriction
    }
  };

  function getAllLessons() {
    return [...window.GODOT_LESSONS_2D, ...window.GODOT_LESSONS_3D];
  }

  function getAreaLessons(area) {
    const track = ["2d", "3d"].includes(area) ? area : preferences.area;
    return track === "3d" ? window.GODOT_LESSONS_3D : window.GODOT_LESSONS_2D;
  }

  function getFilteredLessons() {
    const list = getAreaLessons(state.area);
    const q = normalize(state.search.trim());

    return list.filter((lesson) => {
      if (state.level !== "all" && lesson.level !== state.level) return false;
      const isDone = !!state.completed[lesson.id];
      if (state.statusFilter === "done" && !isDone) return false;
      if (state.statusFilter === "pending" && isDone) return false;

      if (q) {
        const hay = normalize([lesson.title, lesson.subtitle, lesson.levelLabel,
          lesson.nodesUsed.join(" "), JSON.stringify(lesson.feynman),
          JSON.stringify(lesson.howItWorks), JSON.stringify(lesson.approaches), JSON.stringify(lesson.teaching || {})].join(" "));
        return hay.includes(q);
      }
      return true;
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function updateTelemetry() {
    const all = getAllLessons();
    const total = all.length;
    const doneCount = all.filter((l) => !!state.completed[l.id]).length;
    const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
    const gears = doneCount * 25;

    const pctEl = document.getElementById("progress-percentage");
    const barEl = document.getElementById("pressure-bar");
    const countEl = document.getElementById("completed-count");
    const gearsEl = document.getElementById("gears-earned");

    if (pctEl) pctEl.textContent = `${pct}%`;
    if (barEl) barEl.style.width = `${pct}%`;
    const gauge = document.querySelector(".pressure-tube");
    gauge.setAttribute("aria-valuenow", String(pct));
    gauge.setAttribute("aria-valuetext", `${doneCount} de ${total} aulas concluídas`);
    document.getElementById("btn-reset-progress").disabled = doneCount === 0;
    document.getElementById("btn-undo-reset").hidden = Object.keys(resetBackup).length === 0;
    updateStudyContext();
    if (countEl) countEl.textContent = `${doneCount}/${total} Aulas`;
    if (gearsEl) {
      gearsEl.innerHTML = `${window.STEAMPUNK_ICONS.gear} <span>${gears} Engrenagens</span>`;
    }
  }

  function renderSidebar() {
    const listContainer = document.getElementById("curriculum-list");
    if (!listContainer) return;

    const filtered = getFilteredLessons();
    const total = getAreaLessons(state.area).length;
    document.getElementById("search-results-count").textContent = `${filtered.length} de ${total} aulas`;
    document.getElementById("btn-clear-filters").hidden = !state.search && state.level === "all" && state.statusFilter === "all";
    updateFilterNote(filtered);
    if (filtered.length === 0) {
      listContainer.innerHTML = `<div class="empty-state"><strong>Nenhuma aula encontrada</strong><p>Tente outro termo ou limpe os filtros para explorar a trilha.</p><button class="brass-btn secondary" id="empty-clear-filters">Ver todas as aulas</button></div>`;
      document.getElementById("empty-clear-filters").addEventListener("click", clearFilters);
      return;
    }

    let html = "";
    LEVEL_ORDER.forEach((lvl) => {
      const lessonsInLevel = filtered.filter((l) => l.level === lvl.key);
      if (lessonsInLevel.length === 0) return;

      const fullLevel = getAreaLessons(state.area).filter(l => l.level === lvl.key);
      const doneInLvl = fullLevel.filter(l => !!state.completed[l.id]).length;
      html += `
        <div class="level-group">
          <div class="level-group-header">
            <span>${lvl.name}</span>
            <span>${doneInLvl}/${fullLevel.length} concluídas</span>
          </div>
      `;

      lessonsInLevel.forEach((lesson) => {
        const isDone = !!state.completed[lesson.id];
        const isActive = lesson.id === state.activeLessonId;
        html += `
          <button
            class="lesson-nav-item ${isActive ? "active" : ""} ${isDone ? "completed" : ""}"
            data-lesson-id="${lesson.id}"
            ${isActive ? 'aria-current="page"' : ""}
            aria-label="${escapeHtml(lesson.title)}${isDone ? ", concluída" : ""}"
          >
            <span class="lesson-status-dot">
              ${isDone ? window.STEAMPUNK_ICONS.check : lvl.roman}
            </span>
            <div class="lesson-nav-info">
              <span class="lesson-nav-title">${escapeHtml(lesson.title)}</span>
              <div class="lesson-nav-meta">
                <span>${escapeHtml(lesson.nodesUsed.slice(0, 2).join(" • "))}</span>
              </div>
            </div>
          </button>
        `;
      });

      html += `</div>`;
    });

    listContainer.innerHTML = html;

    listContainer.querySelectorAll(".lesson-nav-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-lesson-id");
        selectLesson(id);
      });
    });
  }

  function selectLesson(lessonId) {
    window.playSteamClick(540, 0.04);
    const lesson = getAllLessons().find(l => l.id === lessonId);
    if (!lesson) return;
    state.area = lesson.area;
    state.activeLessonId = lessonId;
    state.lastLessons[state.area] = lessonId;
    state.activeApproachIndex = 0;
    savePreferences();
    syncControls();
    setCurriculumOpen(false);
    renderSidebar();
    renderStage();
    focusLesson();
  }

  function renderStage() {
    const stage = document.getElementById("lesson-stage");
    revealContent(stage, `${state.area}:${state.activeLessonId}`);
    const sidebar = document.getElementById("curriculum-sidebar");
    const levelBar = document.getElementById("level-bar-container");

    const isReference = state.area === "compare" || state.area === "glossary";
    syncReadingLayout();
    levelBar.hidden = isReference;
    document.getElementById("study-toolbar").hidden = isReference;
    stage.classList.toggle("full-width-stage", isReference);
    if (isReference) {
      window.SimulatorEngine.stopCurrent();
      if (state.area === "compare") renderComparisonView(stage);
      else renderGlossaryView(stage);
      return;
    }
    updateStudyContext();

    const areaLessons = getAreaLessons(state.area);
    let lesson = areaLessons.find((l) => l.id === state.activeLessonId);
    if (!lesson) {
      lesson = areaLessons[0];
      state.activeLessonId = lesson.id;
    }

    const idx = areaLessons.indexOf(lesson);
    const prevLesson = idx > 0 ? areaLessons[idx - 1] : null;
    const nextLesson = idx < areaLessons.length - 1 ? areaLessons[idx + 1] : null;
    const isCompleted = !!state.completed[lesson.id];

    const rememberedApproach = Number(state.approaches[lesson.id]);
    state.activeApproachIndex = Number.isInteger(rememberedApproach) && lesson.approaches[rememberedApproach] ? rememberedApproach : 0;
    const activeApproach = lesson.approaches[state.activeApproachIndex];

    stage.innerHTML = `
      <article class="steampunk-plate">
        <!-- Cabeçalho Hero da Aula -->
        <header class="lesson-hero">
          <div class="lesson-badges">
            <span class="badge-pill ${lesson.area === "2d" ? "badge-area-2d" : "badge-area-3d"}">
              ${lesson.area === "2d" ? "OFICINA 2D" : "FORJA 3D"}
            </span>
            <span class="badge-pill badge-level">Nível: ${escapeHtml(lesson.levelLabel)}</span>
            <span class="badge-pill badge-node">25 engrenagens por aula</span>
          </div>

          <p class="lesson-position">AULA ${idx + 1} DE ${areaLessons.length} <span>•</span> GODOT 4.x</p>
          <h1 class="lesson-title" tabindex="-1">${escapeHtml(lesson.title)}</h1>
          <p class="lesson-subtitle">${escapeHtml(lesson.subtitle)}</p>

          <div class="lesson-hero-actions">
            <div class="nodes-used-list">
              <span class="nodes-used-label">PEÇAS &amp; NÓS DA AULA:</span>
              ${lesson.nodesUsed
                .map((n) => `<span class="godot-node-tag">${escapeHtml(n)}</span>`)
                .join("")}
            </div>

            <button class="brass-btn ${isCompleted ? "completed-state" : ""}" id="btn-toggle-complete" data-complete-lesson aria-pressed="${isCompleted}">
              ${isCompleted ? window.STEAMPUNK_ICONS.check : window.STEAMPUNK_ICONS.gear}
              <span>${isCompleted ? "Concluída · Desmarcar" : "Concluir aula"}</span>
            </button>
          </div>
        </header>

        <nav class="lesson-jump-nav" aria-label="Nesta aula">
          <span>NESTA AULA</span><a href="#lesson-concept">01 · Conceito</a><a href="#lesson-anatomy">02 · Como funciona</a>${lesson.teaching?.practice ? '<a href="#lesson-practice">03 · Prática guiada</a>' : ''}<a href="#lesson-code">${lesson.teaching ? ((lesson.id === "2d-intro-gdscript-lifecycle" || lesson.teaching?.codeRequired) ? "04 · Código da prática" : "04 · Código opcional") : '03 · Código'}</a><a href="#lesson-lab">${lesson.teaching ? '05 · Laboratório' : '04 · Laboratório'}</a><a href="#lesson-quiz">${lesson.teaching ? '06 · Desafio' : '05 · Desafio'}</a>
        </nav>
        <p class="lesson-filter-note" id="lesson-filter-note" hidden>A aula aberta está fora dos filtros. Escolha um resultado no mapa de estudos ou <button class="text-btn" id="lesson-clear-filters">limpe os filtros</button>.</p>
        <div class="lesson-body">
          ${renderLessonIntro(lesson)}
          <!-- 1. Cartão de explicação -->
          <section id="lesson-concept" tabindex="-1">
            <div class="feynman-parchment">
  <h2 class="feynman-title">${escapeHtml(lesson.feynman.title.replace(/^Explicação Feynman:\s*/i, ""))}</h2>
              <div class="feynman-text">${renderParagraphs(lesson.feynman.explanation)}</div>

              <div class="feynman-analogy-grid">
                ${lesson.feynman.analogies
                  .map(
                    (a) => `
                  <div class="analogy-item">
                    <strong>${escapeHtml(a.term)}</strong>
                    <span>${formatInline(a.analogy)}</span>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </section>

          <!-- 2. Como Funciona na Prática & Anatomia -->
          <section id="lesson-anatomy" tabindex="-1">
            <div class="section-header-bar">
              <span class="section-icon">${window.STEAMPUNK_ICONS.compass}</span>
              <h2>Como Funciona por Dentro da Engrenagem (Anatomia Técnica)</h2>
            </div>
            <div class="concept-explanation">
              ${renderParagraphs(lesson.howItWorks.overview)}
            </div>
            <div class="anatomy-grid">
              ${lesson.howItWorks.anatomy
                .map(
                  (item) => `
                <div class="anatomy-card">
                  <code>${escapeHtml(item.prop)}</code>
                  <p>${formatInline(item.desc)}</p>
                </div>
              `
                )
                .join("")}
            </div>
          </section>

          ${renderGuidedPractice(lesson)}
          <!-- 3. Diferentes Formas de Aplicar -->
          <section id="lesson-code" tabindex="-1">
            <div class="section-header-bar">
              <span class="section-icon">${window.STEAMPUNK_ICONS.wrench}</span>
              <h2>${(lesson.id === "2d-intro-gdscript-lifecycle" || lesson.teaching?.codeRequired) ? "Código da prática e extensões" : lesson.teaching ? "Consulta opcional: o mesmo conceito em código" : "Diferentes Formas de Aplicar na Prática"}</h2>
            </div>

            ${lesson.teaching ? '<p class="study-note">' + (lesson.teaching.codeIntro ? escapeHtml(lesson.teaching.codeIntro) : (lesson.id === "2d-intro-gdscript-lifecycle" || lesson.teaching?.codeRequired) ? "Use o exemplo 1 na prática guiada. Os exemplos 2 e 3 são extensões para depois." : "Estes exemplos antecipam sintaxe da aula 3 e não são pré-requisito para avançar.") + '</p><details class="optional-study"><summary>' + ((lesson.id === "2d-intro-gdscript-lifecycle" || lesson.teaching?.codeRequired) ? "Abrir o código da prática e as extensões" : "Abrir os exemplos opcionais de GDScript") + '</summary>' : ""}
            <div class="approaches-container">
              <div class="approach-tabs" role="tablist" aria-label="Formas de implementar">
                ${lesson.approaches
                  .map(
                    (ap, i) => `
                  <button
                    class="approach-tab-btn ${i === state.activeApproachIndex ? "active" : ""}"
                    data-approach-idx="${i}"
                    role="tab" id="approach-tab-${i}"
                    aria-selected="${i === state.activeApproachIndex}"
                    aria-controls="approach-content-panel" tabindex="${i === state.activeApproachIndex ? 0 : -1}"
                  >
                    ${escapeHtml(ap.title)}
                  </button>
                `
                  )
                  .join("")}
              </div>

              <div class="approach-content" id="approach-content-panel" role="tabpanel" aria-labelledby="approach-tab-${state.activeApproachIndex}" tabindex="0">
                ${renderApproachContent(activeApproach)}
              </div>
            </div>
            ${lesson.teaching ? "</details>" : ""}
          </section>

          <!-- 4. Laboratório Mecânico Ao Vivo (Simulador Interativo) -->
          <section id="lesson-lab" tabindex="-1">
            <div class="section-header-bar">
              <span class="section-icon">${window.STEAMPUNK_ICONS.lab}</span>
              <h2>Bancada de Testes ao Vivo (Simulador Mecânico Interativo)</h2>
            </div>

            <div class="simulator-box">
              <div class="simulator-top-bar">
                <div class="simulator-title">
                  ${window.STEAMPUNK_ICONS.gear}
                  <span>${escapeHtml(lesson.simulator.title)}</span>
                </div>
              </div>
              <button class="brass-btn secondary simulator-pause" id="btn-sim-pause" aria-pressed="false" ${["vectors_2d", "layers_masks", "resource_forge", "curriculum_data", "curriculum_debug", "curriculum_audio", "curriculum_access", "curriculum_capstone"].includes(lesson.simulator.type) ? 'hidden style="display:none"' : ''}>Pausar simulação</button>
              <p id="sim-description" style="color: var(--text-sand); margin-bottom: 14px; font-size: 0.98rem;">
                ${formatInline(lesson.simulator.description)}
              </p>

              ${renderSimulationGuide(lesson)}
              <div class="simulator-layout">
                <div class="sim-controls-panel">
                  <div id="sim-controls-mount" style="display:flex; flex-direction:column; gap:10px;"></div>
                  <div class="sim-telemetry-readout" id="sim-telemetry"></div>
                </div>
                <div class="sim-canvas-wrap">
                  <canvas id="sim-canvas" role="img" aria-label="${escapeHtml(lesson.simulator.title)}" aria-describedby="sim-description">Simulação visual. Use os controles e consulte os valores do painel para acompanhar as alterações.</canvas>
                </div>
              </div>
            </div>
          </section>

          ${renderLessonChecks(lesson)}
          <!-- 5. Desafio da Oficina (Quiz de Fixação) -->
          <section id="lesson-quiz" tabindex="-1">
            <div class="section-header-bar">
              <span class="section-icon">${window.STEAMPUNK_ICONS.trophy}</span>
              <h2>Desafio de Fixação da Oficina</h2>
            </div>

            <div class="quiz-box">
              <p class="quiz-question">${formatInline(lesson.quiz.question)}</p>
              <div class="quiz-options">
                ${lesson.quiz.options
                  .map(
                    (opt, i) => `
                  <button class="quiz-option-btn" data-opt-idx="${i}">
                    <strong>Alternativa ${String.fromCharCode(65 + i)}:</strong> ${formatInline(opt)}
                  </button>
                `
                  )
                  .join("")}
              </div>
              <div class="quiz-feedback" id="quiz-feedback" role="status" aria-live="polite" aria-atomic="true"></div>
            </div>
          </section>
          ${renderLessonSources(lesson)}
        </div>

        <!-- Rodapé de Navegação Entre Aulas -->
        <footer class="lesson-footer-nav">
          <div class="lesson-finish-actions"><span>Terminou de estudar?</span><button class="brass-btn ${isCompleted ? "completed-state" : ""}" data-complete-lesson aria-pressed="${isCompleted}">${isCompleted ? "Concluída · Desmarcar" : "Concluir aula"}</button></div>
          ${
            prevLesson
              ? `<button class="brass-btn secondary" id="btn-prev-lesson">
                  ${window.STEAMPUNK_ICONS.arrowLeft}
                  <span>Anterior: ${escapeHtml(prevLesson.title)}</span>
                </button>`
              : `<div></div>`
          }

          ${
            nextLesson
              ? `<button class="brass-btn" id="btn-next-lesson">
                  <span>Próxima Aula: ${escapeHtml(nextLesson.title)}</span>
                  ${window.STEAMPUNK_ICONS.arrowRight}
                </button>`
              : `<div></div>`
          }
        </footer>
      </article>
    `;

    stage.querySelectorAll("[data-complete-lesson]").forEach(button => {
      button.addEventListener("click", () => {
        setLessonCompleted(lesson.id, !state.completed[lesson.id]);
        showToast(state.completed[lesson.id] ? "Aula concluída. +25 engrenagens!" : "Aula marcada como pendente.");
      });
    });
    document.getElementById("lesson-clear-filters").addEventListener("click", clearFilters);
    updateFilterNote(getFilteredLessons());
    stage.querySelectorAll(".lesson-jump-nav a").forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        const section = document.querySelector(link.getAttribute("href"));
        section.focus({ preventScroll: true });
        section.scrollIntoView({ behavior: "instant", block: "start" });
      });
    });

    const approachButtons = [...stage.querySelectorAll(".approach-tab-btn")];
    contentMotion.set(document.getElementById("approach-content-panel"), {key: state.activeApproachIndex, animation: null});
    approachButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        window.playSteamClick(560, 0.03);
        state.activeApproachIndex = index;
        state.approaches[lesson.id] = index;
        savePreferences();
        approachButtons.forEach((button, i) => {
          button.classList.toggle("active", i === index);
          button.setAttribute("aria-selected", String(i === index));
          button.tabIndex = i === index ? 0 : -1;
        });
        const panel = document.getElementById("approach-content-panel");
        panel.setAttribute("aria-labelledby", btn.id);
        panel.innerHTML = renderApproachContent(lesson.approaches[index]);
        revealContent(panel, index);
        bindCopyCodeButton(panel);
      });
      btn.addEventListener("keydown", event => {
        let target;
        if (event.key === "ArrowRight") target = (index + 1) % approachButtons.length;
        else if (event.key === "ArrowLeft") target = (index - 1 + approachButtons.length) % approachButtons.length;
        else if (event.key === "Home") target = 0;
        else if (event.key === "End") target = approachButtons.length - 1;
        else return;
        event.preventDefault();
        approachButtons[target].focus();
        approachButtons[target].click();
      });
    });

    bindCopyCodeButton(stage);

    const showQuizAnswer = chosen => {
      const correct = chosen === lesson.quiz.correctIndex;
      stage.querySelectorAll(".quiz-option-btn").forEach((button, index) => {
        button.classList.toggle("correct", index === chosen && correct);
        button.classList.toggle("wrong", index === chosen && !correct);
        button.setAttribute("aria-pressed", String(index === chosen));
      });
      const feedback = document.getElementById("quiz-feedback");
      feedback.className = `quiz-feedback show ${correct ? "correct" : "wrong"}`;
      feedback.style.background = correct ? "rgba(76,217,123,.14)" : "rgba(224,83,71,.14)";
      feedback.style.border = `1px solid ${correct ? "var(--emerald-steam)" : "var(--crimson-valve)"}`;
      feedback.style.color = correct ? "#d6ffe4" : "#ffd4d0";
      feedback.innerHTML = correct
        ? `<strong>Resposta correta!</strong> ${formatInline(lesson.quiz.explanation)}`
        : `<strong>Ainda não. Você pode tentar novamente.</strong> ${formatInline(lesson.quiz.feedback?.[chosen] || "Reveja o conceito e escolha outra alternativa.")}`;
    };
    stage.querySelectorAll(".quiz-option-btn").forEach((btn, chosen) => {
      btn.setAttribute("aria-pressed", "false");
      btn.addEventListener("click", () => {
        state.quizAnswers[lesson.id] = chosen;
        showQuizAnswer(chosen);
        window.playSteamClick(chosen === lesson.quiz.correctIndex ? 740 : 220, 0.08);
        if (chosen === lesson.quiz.correctIndex && !state.completed[lesson.id]) {
          setLessonCompleted(lesson.id, true);
          showToast("Desafio resolvido! Aula concluída: +25 engrenagens.");
        }
      });
    });
    if (Number.isInteger(state.quizAnswers[lesson.id])) showQuizAnswer(state.quizAnswers[lesson.id]);

    // Bind Anterior / Próxima
    const btnPrev = document.getElementById("btn-prev-lesson");
    if (btnPrev && prevLesson) {
      btnPrev.addEventListener("click", () => selectLesson(prevLesson.id));
    }
    const btnNext = document.getElementById("btn-next-lesson");
    if (btnNext && nextLesson) {
      btnNext.addEventListener("click", () => selectLesson(nextLesson.id));
    }

    // Monta o Simulador Interativo em Canvas
    const simCanvas = document.getElementById("sim-canvas");
    const simControls = document.getElementById("sim-controls-mount");
    const simTelemetry = document.getElementById("sim-telemetry");

    const pauseButton = document.getElementById("btn-sim-pause");
    const updatePauseButton = () => {
      const paused = window.SimulatorEngine.isPaused();
      pauseButton.textContent = paused ? "Retomar simulação" : "Pausar simulação";
      pauseButton.setAttribute("aria-pressed", String(paused));
    };
    window.SimulatorEngine.mount(lesson.simulator.type, simCanvas, simControls, simTelemetry, updatePauseButton);
    pauseButton.addEventListener("click", () => {
      if (window.SimulatorEngine.isPaused()) window.SimulatorEngine.resume();
      else window.SimulatorEngine.pause();
      updatePauseButton();
    });
    updatePauseButton();
  }

  // Formatação limitada e escapada: conteúdo editorial não injeta HTML.
  function formatInline(value) {
    const text=String(value ?? "");
    const pattern=/\*\*([^\n]+?)\*\*(?!\*)|`([^`\n]+)`|\*([^*\n]+)\*/g;
    let result="",last=0,match;
    while((match=pattern.exec(text))) {
      result+=escapeHtml(text.slice(last,match.index));
      result+=match[1]!==undefined ? `<strong>${formatInline(match[1])}</strong>` : match[2]!==undefined ? `<code class="inline-code">${escapeHtml(match[2])}</code>` : `<em>${formatInline(match[3])}</em>`;
      last=pattern.lastIndex;
    }
    return result+escapeHtml(text.slice(last));
  }

  function renderParagraphs(value) {
    return String(value ?? "").split(/\n\s*\n/).filter(Boolean).map(p=>`<p>${formatInline(p).replace(/\n/g,"<br>")}</p>`).join("");
  }

  function renderLessonIntro(lesson) {
    const t=lesson.teaching;if(!t)return "";
    return `<section class="study-brief" aria-labelledby="study-goals-heading"><div class="study-brief-heading"><h2 id="study-goals-heading">O que você vai conseguir fazer</h2><span>${escapeHtml(t.duration)}</span></div><ul>${t.objectives.map(o=>`<li>${formatInline(o)}</li>`).join("")}</ul><p class="study-note"><strong>Antes de começar:</strong> ${formatInline(t.prerequisite)}</p></section>`;
  }

  function renderGuidedPractice(lesson) {
    const p=lesson.teaching?.practice;if(!p)return "";
    const download=p.download && /^assets\/[\w/-]+\.zip$/.test(p.download.url) ? `<a class="brass-btn" href="${escapeHtml(p.download.url)}" download>${escapeHtml(p.download.label)}</a><p class="study-note">${formatInline(p.downloadNote)}</p>`:"";
    return `<section class="guided-practice" id="lesson-practice" tabindex="-1"><div class="section-header-bar"><span class="section-icon">${window.STEAMPUNK_ICONS.wrench}</span><h2>${escapeHtml(p.title)}</h2></div>${renderParagraphs(p.intro)}${download}<div class="scene-blueprint"><span class="study-kicker">ESTRUTURA QUE VOCÊ VAI MONTAR</span><pre tabindex="0" aria-label="Hierarquia do exemplo">${escapeHtml(p.tree)}</pre></div><ol class="practice-steps">${p.steps.map(step=>`<li><h3>${escapeHtml(step.title)}</h3>${renderParagraphs(step.text)}<p class="expected-result"><strong>Confira:</strong> ${formatInline(step.expect)}</p></li>`).join("")}</ol></section>`;
  }

  function renderSimulationGuide(lesson) {
    const guide=lesson.simulator.guide;if(!guide)return "";
    return `<div class="simulation-guide">${guide.map(g=>`<div><h3>${escapeHtml(g.title)}</h3><p>${formatInline(g.text)}</p></div>`).join("")}</div>`;
  }

  function renderLessonChecks(lesson) {
    const t=lesson.teaching;if(!t)return "";
    return `<section class="lesson-recap"><div class="section-header-bar"><h2>Explique com suas palavras</h2></div><p>Responda antes de abrir a conferência. Não precisa repetir a analogia: descreva o que acontece no editor.</p>${t.checks.map(c=>`<details class="knowledge-check"><summary>${escapeHtml(c.question)}</summary>${renderParagraphs(c.answer)}</details>`).join("")}<div class="common-pitfalls"><h3>Se o resultado não for o esperado</h3>${t.pitfalls.map(p=>`<details class="knowledge-check"><summary>${escapeHtml(p.title)}</summary>${renderParagraphs(p.text)}</details>`).join("")}</div></section>`;
  }

  function renderLessonSources(lesson) {
    const t=lesson.teaching;if(!t)return "";
    return `<section class="lesson-takeaway"><h2>O que levar para a próxima aula</h2>${renderParagraphs(t.summary)}<p class="study-note">${formatInline(t.next)}</p><details class="lesson-sources"><summary>Documentação usada nesta revisão</summary><ul>${t.sources.filter(s=>/^https:\/\/(docs\.godotengine\.org|git-scm\.com)\//.test(s.url)).map(s=>`<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`).join("")}</ul></details></section>`;
  }

  function renderApproachContent(ap) {
    return `
      <div class="approach-header">
        <h3>${escapeHtml(ap.title)}</h3>
        <span class="approach-when-badge">Quando usar: ${formatInline(ap.whenToUse)}</span>
      </div>
      <div class="approach-desc">${renderParagraphs(ap.description)}</div>

      <div class="code-block-wrapper">
        <div class="code-block-topbar">
          <span>${escapeHtml(ap.language || "GDScript 2.0 (Godot 4.x)")}</span>
          <button class="copy-code-btn" data-code="${encodeURIComponent(ap.code)}">
            ${window.STEAMPUNK_ICONS.copy} Copiar Código
          </button>
        </div>
        <pre class="gdscript-code" tabindex="0" aria-label="${escapeHtml(ap.language ? "Exemplo de código: " + ap.language : "Exemplo de código GDScript")}"><code>${escapeHtml(ap.code)}</code></pre>
      </div>

      <div class="pros-cons-row">
        <div class="pro-box">
          <strong>${window.STEAMPUNK_ICONS.plus} Vantagem Mecânica:</strong><br/>
          ${formatInline(ap.pros)}
        </div>
        <div class="con-box">
          <strong>${window.STEAMPUNK_ICONS.warning} Atenção de Oficina:</strong><br/>
          ${formatInline(ap.cons)}
        </div>
      </div>
    `;
  }

  function bindCopyCodeButton(container) {
    const btn = container.querySelector(".copy-code-btn");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      const code = decodeURIComponent(btn.getAttribute("data-code"));
      try {
        await navigator.clipboard.writeText(code);
        btn.innerHTML = `${window.STEAMPUNK_ICONS.check} Copiado!`;
        showToast("Código copiado para a área de transferência.");
        setTimeout(() => { if (btn.isConnected) btn.innerHTML = `${window.STEAMPUNK_ICONS.copy} Copiar Código`; }, 1800);
      } catch (_e) {
        const codeElement = container.querySelector("pre code");
        const range = document.createRange();
        range.selectNodeContents(codeElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        codeElement.closest("pre").focus();
        showToast("Cópia automática indisponível. Código selecionado: use Ctrl+C ou ⌘C.");
      }
    });
  }

  function renderComparisonView(stage) {
    const entries = window.GODOT_2D_3D_COMPARE;
    const categories = [...new Set(entries.map(r => r.category))].sort((a, b) => a.localeCompare(b, "pt-BR"));
    stage.innerHTML = `
      <article class="steampunk-plate comparison-view">
        <header class="lesson-hero">
          <div class="lesson-badges"><span class="badge-pill badge-level">GUIA DE CORRESPONDÊNCIAS · GODOT 4.5</span></div>
          <h1 class="lesson-title">Tradutor 2D → 3D da Godot</h1>
          <p class="lesson-subtitle">${entries.length} comparações para levar o que você aprendeu em 2D para um projeto 3D: o que reaproveitar, o que adaptar e o que conferir.</p>
        </header>
        <div class="lesson-body">
          <details class="comparison-intro">
            <summary>Como usar e interpretar as correspondências</summary>
            <p><strong>Comece pela intenção:</strong> busque uma tarefa ou nó, compare os dois lados e faça o teste sugerido. Este guia compara conceitos; ele não converte cenas, modelos ou scripts automaticamente.</p>
            <p><strong>Leia o tipo de correspondência:</strong> <em>API semelhante</em> mantém parte da interface; <em>Exige adaptação</em> muda o fluxo ou a representação; <em>Compartilhado</em> pode manter a mesma base. Nenhum rótulo dispensa testes.</p>
          </details>
          <div class="reference-search glossary-filters comparison-filters">
            <div class="glossary-search-field"><label for="reference-query">Buscar tarefa, nó ou conceito</label><input type="search" id="reference-query" placeholder="Ex.: câmera, RayCast, salto, HUD…" autocomplete="off"></div>
            <div class="glossary-category-field"><label for="comparison-category">Categoria</label><select id="comparison-category"><option value="">Todas as categorias</option>${categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("")}</select></div>
            <button type="button" class="comparison-clear" id="comparison-clear" hidden>Limpar filtros</button>
            <span id="reference-count" role="status" aria-live="polite" aria-atomic="true"></span>
          </div>
          <p class="empty-state" id="comparison-empty" hidden>Nenhuma comparação encontrada. Tente outro termo, mude a categoria ou limpe os filtros.</p>
          <div class="comparison-grid">
            ${entries.map(row => `
              <article class="comparison-card" aria-labelledby="${escapeHtml(row.id)}">
                <div class="comparison-badges"><span class="badge-pill badge-node">${escapeHtml(row.category)}</span><span class="comparison-relation">${escapeHtml(row.relation)}</span></div>
                <h2 id="${escapeHtml(row.id)}">${escapeHtml(row.title)}</h2>
                <dl class="comparison-pair">
                  <div><dt>Em 2D</dt><dd>${escapeHtml(row.node2d)}</dd></div>
                  <div><dt>No projeto 3D</dt><dd>${escapeHtml(row.node3d)}</dd></div>
                </dl>
                <p class="comparison-difference">${formatInline(row.difference)}</p>
                <div class="comparison-example"><strong>Ao migrar:</strong> ${formatInline(row.example)}</div>
                <p class="comparison-check"><strong>Confira:</strong> ${formatInline(row.check)}</p>
                <details class="comparison-sources"><summary>Consultar documentação oficial</summary><ul>${row.sources.filter(url => /^https:\/\/docs\.godotengine\.org\//.test(url)).map(url => `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(decodeURIComponent(url.split("/").pop().replace(/\.html$/, "").replace(/^class_/, "")))} <span class="sr-only">(abre em nova aba)</span><span aria-hidden="true">↗</span></a></li>`).join("")}</ul></details>
              </article>`).join("")}
          </div>
          <p class="comparison-version">Referência: documentação Godot 4.5. Ao usar outra versão, confira as APIs e os recursos disponíveis no seu renderizador.</p>
        </div>
      </article>`;
    const input = stage.querySelector("#reference-query");
    const category = stage.querySelector("#comparison-category");
    const clear = stage.querySelector("#comparison-clear");
    const cards = [...stage.querySelectorAll(".comparison-card")];
    const searchable = entries.map(r => normalize([r.title, r.category, r.node2d, r.node3d, r.relation, r.difference, r.example, r.check, ...r.aliases].join(" ")));
    const filter = () => {
      const words = normalize(input.value).trim().split(/\s+/).filter(Boolean);
      let count = 0;
      cards.forEach((card, i) => {
        card.hidden = (category.value !== "" && entries[i].category !== category.value) || !words.every(word => searchable[i].includes(word));
        if (!card.hidden) count++;
      });
      stage.querySelector("#reference-count").textContent = `${count} de ${entries.length} comparações`;
      stage.querySelector("#comparison-empty").hidden = count > 0;
      clear.hidden = !input.value && !category.value;
    };
    input.addEventListener("input", filter);
    category.addEventListener("change", filter);
    clear.addEventListener("click", () => { input.value = ""; category.value = ""; filter(); input.focus(); });
    filter();
  }

  function renderGlossaryView(stage) {
    const entries = [...window.GODOT_FEYNMAN_GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "pt-BR"));
    const categories = [...new Set(entries.map(g => g.category))].sort((a, b) => a.localeCompare(b, "pt-BR"));
    const lessons = new Map(getAllLessons().map(l => [l.id, l]));
    stage.innerHTML = `
      <article class="steampunk-plate glossary-view">
        <header class="lesson-hero">
          <div class="lesson-badges"><span class="badge-pill badge-level">DICIONÁRIO DE CONCEITOS</span></div>
          <h1 class="lesson-title">Dicionário de conceitos da Godot</h1>
          <p class="lesson-subtitle">${entries.length} conceitos das trilhas 2D, 3D e aulas extras. Consulte definições, exemplos e cuidados de uso, ou abra a aula para praticar.</p>
        </header>
        <div class="lesson-body">
          <div class="reference-search glossary-filters">
            <div class="glossary-search-field"><label for="reference-query">Buscar conceito ou sinônimo</label><input type="search" id="reference-query" placeholder="Ex.: normalização, sinal, iluminação global…" autocomplete="off"></div>
            <div class="glossary-category-field"><label for="glossary-category">Categoria</label><select id="glossary-category"><option value="">Todas as categorias</option>${categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("")}</select></div>
            <button type="button" id="glossary-clear" class="steampunk-btn" hidden>Limpar filtros</button>
            <span id="reference-count" role="status" aria-live="polite" aria-atomic="true"></span>
          </div>
          <p id="glossary-empty" class="empty-state" hidden>Nenhum conceito encontrado. Tente um termo mais curto, outra categoria ou limpe os filtros.</p>
          <div class="glossary-grid">
            ${entries.map(g => `
              <article class="glossary-card" aria-labelledby="${escapeHtml(g.id)}">
                <span class="badge-pill badge-node">${escapeHtml(g.category)}</span>
                <h2 id="${escapeHtml(g.id)}">${escapeHtml(g.term)}</h2>
                <div class="glossary-definition">${formatInline(g.definition)}</div>
                <p><strong>Na prática e cuidados:</strong> ${formatInline(g.detail)}</p>
                <p class="glossary-example"><strong>Exemplo:</strong> ${formatInline(g.example)}</p>
                <div class="glossary-links">
                  ${lessons.has(g.lesson) ? `<button type="button" class="glossary-lesson-link" data-glossary-lesson="${escapeHtml(g.lesson)}">Estudar na aula ${escapeHtml(lessons.get(g.lesson).title)}</button>` : ""}
                  ${/^https:\/\/(docs\.godotengine\.org|git-scm\.com)\//.test(g.source) ? `<a href="${escapeHtml(g.source)}" target="_blank" rel="noopener noreferrer">Documentação oficial <span class="sr-only">sobre ${escapeHtml(g.term)} (abre em nova aba)</span><span aria-hidden="true">↗</span></a>` : ""}
                </div>
              </article>`).join("")}
          </div>
        </div>
      </article>`;
    const input = stage.querySelector("#reference-query");
    const category = stage.querySelector("#glossary-category");
    const clear = stage.querySelector("#glossary-clear");
    const cards = [...stage.querySelectorAll(".glossary-card")];
    const searchable = entries.map(g => normalize([g.term, g.category, g.definition, g.detail, g.example, ...g.aliases].join(" ")));
    const filter = () => {
      const words = normalize(input.value).trim().split(/\s+/).filter(Boolean);
      let count = 0;
      cards.forEach((card, i) => {
        card.hidden = (category.value !== "" && entries[i].category !== category.value) || !words.every(word => searchable[i].includes(word));
        if (!card.hidden) count++;
      });
      stage.querySelector("#reference-count").textContent = `${count} de ${entries.length} conceitos`;
      stage.querySelector("#glossary-empty").hidden = count > 0;
      clear.hidden = !input.value && !category.value;
    };
    input.addEventListener("input", filter);
    category.addEventListener("change", filter);
    clear.addEventListener("click", () => { input.value = ""; category.value = ""; filter(); input.focus(); });
    stage.querySelectorAll("[data-glossary-lesson]").forEach(button => button.addEventListener("click", () => selectLesson(button.dataset.glossaryLesson)));
    filter();
  }

  function bindReferenceSearch(stage, selector, noun) {
    const input = stage.querySelector("#reference-query");
    const items = [...stage.querySelectorAll(selector)];
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Nenhum resultado. Tente outro termo ou apague a busca.";
    input.closest(".reference-search").after(empty);
    const filter = () => {
      const query = normalize(input.value.trim());
      let count = 0;
      items.forEach(item => {
        item.hidden = !normalize(item.textContent).includes(query);
        if (!item.hidden) count++;
      });
      stage.querySelector("#reference-count").textContent = `${count} de ${items.length} ${noun}`;
      empty.hidden = count > 0;
    };
    input.addEventListener("input", filter);
    filter();
  }

  function updateStudyContext() {
    const area = ["2d", "3d"].includes(state.area) ? state.area : "2d";
    const lessons = getAreaLessons(area);
    const done = lessons.filter(l => state.completed[l.id]).length;
    document.getElementById("study-area-title").textContent = area === "3d" ? "Forja 3D" : "Oficina 2D";
    document.getElementById("study-progress-text").textContent = `${done} de ${lessons.length} aulas concluídas nesta trilha`;
  }

  function updateFilterNote(filtered) {
    const note = document.getElementById("lesson-filter-note");
    if (note) note.hidden = filtered.some(l => l.id === state.activeLessonId);
  }

  function updateCompletionButtons() {
    const done = !!state.completed[state.activeLessonId];
    document.querySelectorAll("[data-complete-lesson]").forEach(button => {
      button.classList.toggle("completed-state", done);
      button.setAttribute("aria-pressed", String(done));
      button.innerHTML = `${done ? window.STEAMPUNK_ICONS.check : window.STEAMPUNK_ICONS.gear}<span>${done ? "Concluída · Desmarcar" : "Concluir aula"}</span>`;
    });
  }

  function setLessonCompleted(id, completed) {
    if (completed) state.completed[id] = true;
    else delete state.completed[id];
    saveCompleted();
    updateTelemetry();
    renderSidebar();
    updateCompletionButtons();
  }

  function restoreProgress() {
    state.completed = { ...resetBackup, ...state.completed };
    const saved = saveCompleted();
    if (saved) {
      resetBackup = {};
      writeStored(BACKUP_KEY, {});
    }
    updateTelemetry();
    renderSidebar();
    updateCompletionButtons();
    showToast(saved ? "Progresso anterior restaurado." : "Progresso restaurado nesta sessão. A cópia anterior foi mantida para tentar salvar novamente.");
    document.getElementById("btn-reset-progress").focus();
  }

  function initEvents() {
    document.querySelectorAll(".area-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        window.playSteamClick(500, 0.05);
        state.area = btn.dataset.area;
        if (["2d", "3d"].includes(state.area)) {
          state.activeLessonId = state.lastLessons[state.area];
          preferences.area = state.area;
          savePreferences();
        }
        syncControls();
        renderSidebar();
        renderStage();
        setCurriculumOpen(false);
        focusLesson();
      });
    });
    document.querySelectorAll(".level-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        state.level = tab.dataset.level;
        const filtered = getFilteredLessons();
        if (filtered.length && !filtered.some(l => l.id === state.activeLessonId)) {
          state.activeLessonId = filtered[0].id;
          state.lastLessons[state.area] = state.activeLessonId;
          savePreferences();
          renderStage();
        }
        syncControls();
        renderSidebar();
        if (!filtered.length) setCurriculumOpen(true);
      });
    });
    document.getElementById("lesson-search").addEventListener("input", event => {
      state.search = event.target.value;
      renderSidebar();
    });
    document.querySelectorAll(".filter-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        state.statusFilter = pill.dataset.status;
        syncControls();
        renderSidebar();
      });
    });
    document.getElementById("btn-clear-filters").addEventListener("click", clearFilters);
    document.getElementById("btn-curriculum-toggle").addEventListener("click", event => {
      setCurriculumOpen(event.currentTarget.getAttribute("aria-expanded") !== "true", true);
    });
    document.getElementById("btn-sound-toggle").addEventListener("click", () => {
      state.soundOn = !state.soundOn;
      savePreferences();
      syncControls();
      if (state.soundOn) window.playSteamClick(660, 0.05);
    });
    const dialog = document.getElementById("reset-dialog");
    document.getElementById("btn-reset-progress").addEventListener("click", () => {
      const count = Object.keys(state.completed).length;
      document.getElementById("reset-description").textContent = `Isso vai reiniciar ${count} aula(s) concluída(s) e ${count * 25} engrenagens nas trilhas 2D e 3D. Você poderá restaurar o progresso anterior pelo rodapé.`;
      dialog.showModal();
    });
    document.getElementById("reset-cancel").addEventListener("click", () => dialog.close());
    document.getElementById("reset-confirm").addEventListener("click", () => {
      const backup = { ...state.completed };
      if (!writeStored(BACKUP_KEY, backup)) {
        dialog.close();
        showToast("Não foi possível guardar uma cópia de segurança. Seu progresso foi mantido.");
        return;
      }
      resetBackup = backup;
      state.completed = {};
      state.quizAnswers = {};
      saveCompleted();
      dialog.close();
      updateTelemetry();
      renderSidebar();
      updateCompletionButtons();
      const feedback = document.getElementById("quiz-feedback");
      if (feedback) { feedback.className = "quiz-feedback"; feedback.textContent = ""; }
      document.querySelectorAll(".quiz-option-btn").forEach(button => {
        button.classList.remove("correct", "wrong");
        button.setAttribute("aria-pressed", "false");
      });
      showToast("Progresso reiniciado. Você pode desfazer esta ação.", "Desfazer", restoreProgress);
      document.getElementById("btn-undo-reset").focus();
    });
    document.getElementById("btn-undo-reset").addEventListener("click", restoreProgress);
    document.getElementById("toast-close").addEventListener("click", () => {
      document.getElementById("app-toast").hidden = true;
      document.getElementById("lesson-stage").focus({ preventScroll: true });
    });
    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      if (openTopPanel) { closeTopNavigation(true); event.preventDefault(); }
      else if (state.mapOpen) { setCurriculumOpen(false, true); document.getElementById("btn-curriculum-toggle").focus(); }
    });
    if ("ResizeObserver" in window) {
      new ResizeObserver(entries => {
        document.documentElement.style.setProperty("--header-height", `${entries[0].target.getBoundingClientRect().height}px`);
      }).observe(document.getElementById("reading-dock"));
    }
  }

  initTopNavigation();
  initEvents();
  syncControls();
  savePreferences();
  updateTelemetry();
  renderSidebar();
  renderStage();
})();
