// ============================================================================
// ACADEMIA AETHER & GODOT — MOTOR DE LABORATÓRIOS MECÂNICOS INTERATIVOS (2D & 3D)
// Simulações visuais em Canvas HTML5 a 60 FPS para todas as 31 aulas do guia
// ============================================================================

window.SimulatorEngine = (function () {
  let activeLoopId = null;
  let currentCleanup = null;
  let currentController = null;
  let pausePreference = null;

  function pause() {
    pausePreference = true;
    if (currentController) currentController.setPaused(true);
    return true;
  }

  function resume() {
    pausePreference = false;
    if (currentController) currentController.setPaused(false);
    return false;
  }

  function isPaused() {
    return currentController ? currentController.isPaused() : pausePreference === true;
  }

  function togglePause() {
    return isPaused() ? resume() : pause();
  }

  function stopCurrent() {
    if (activeLoopId !== null) {
      cancelAnimationFrame(activeLoopId);
      activeLoopId = null;
    }
    if (typeof currentCleanup === "function") {
      currentCleanup();
      currentCleanup = null;
    }
    currentController = null;
  }

  // Helper para desenhar grade Steampunk de fundo
  function drawBlueprintGrid(ctx, w, h, step = 32, color = "rgba(212, 163, 89, 0.08)") {
    ctx.fillStyle = "#090604";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = 0; y < h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
  }

  // Helper para desenhar engrenagem vetorial no Canvas
  function drawGear(ctx, x, y, radius, teeth, angle, fill, stroke) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    const outer = radius;
    const inner = radius * 0.78;
    const step = (Math.PI * 2) / (teeth * 2);
    for (let i = 0; i < teeth * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = i * step;
      if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fillStyle = fill || "#c87d32";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke || "#f4d088";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.32, 0, Math.PI * 2);
    ctx.fillStyle = "#120c07";
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // Projeção isométrica simples para os laboratórios 3D
  function project3D(x, y, z, cx, cy, scale = 28, yaw = 0.65, pitch = 0.45) {
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const rx = x * cosY - z * sinY;
    const rz = x * sinY + z * cosY;
    const sx = cx + rx * scale;
    const sy = cy - y * scale + rz * scale * Math.sin(pitch);
    return { x: sx, y: sy, depth: rz };
  }

  // Measure the natural sidebar at its candidate width, independently of the
  // selected layout, so switching to the top cannot make the decision oscillate.
  function watchControlsLayout(type, canvas, controlsContainer, telemetryBox, resize) {
    if (typeof ResizeObserver !== "function" || !canvas.parentElement.closest) return () => {};
    const layout = canvas.parentElement.closest(".simulator-layout");
    const panel = controlsContainer.parentElement;
    if (!layout || !panel) return () => {};
    let stopped = false, measuring = false, previousWidth = -1, pending = null;
    const update = () => {
      if (stopped || measuring || !layout.isConnected) return;
      measuring = true;
      try {
        const width = layout.getBoundingClientRect().width;
        let above = true;
        if (width >= 740) {
          const probe = panel.cloneNode(true);
          probe.setAttribute("aria-hidden", "true");
          probe.setAttribute("inert", "");
          probe.removeAttribute("id");
          probe.querySelectorAll("[id], [for]").forEach(node => {
            node.removeAttribute("id"); node.removeAttribute("for");
          });
          Object.assign(probe.style, {position:"fixed",left:"-10000px",top:"0",width:"260px",maxWidth:"none",visibility:"hidden",pointerEvents:"none",boxSizing:"border-box"});
          document.body.appendChild(probe);
          let panelHeight;
          try { panelHeight = probe.getBoundingClientRect().height; }
          finally { probe.remove(); }
          const sideWidth = Math.max(1, width - 260 - 16);
          const minimumWidth = ["vectors_2d", "signals_bus", "tilemap_grid", "tween_raycast_2d", "lighting_2d", "fsm_state_machine"].includes(type) ? 320 : 480;
          const viewHeight = canvas.height * sideWidth / Math.max(minimumWidth, Math.floor(sideWidth));
          const tolerance = layout.classList.contains("controls-above") ? -8 : 8;
          above = panelHeight > viewHeight + tolerance;
        }
        const changed = layout.classList.contains("controls-above") !== above;
        layout.classList.toggle("controls-above", above);
        if (changed || Math.abs(width - previousWidth) > 1) {
          previousWidth = width;
          resize();
        }
      } finally { measuring = false; }
    };
    const observer = new ResizeObserver(() => {
      if (stopped || pending !== null) return;
      pending = requestAnimationFrame(() => { pending = null; update(); });
    });
    observer.observe(layout);
    observer.observe(panel);
    observer.observe(controlsContainer);
    observer.observe(telemetryBox);
    update();
    return () => { stopped = true; observer.disconnect(); if (pending !== null) cancelAnimationFrame(pending); };
  }

  function mount(type, canvas, controlsContainer, telemetryBox, onPauseChange = () => {}) {
    let releaseInput = () => {};
    stopCurrent();
    if (!canvas || !controlsContainer || !telemetryBox) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      telemetryBox.textContent = "Este navegador não disponibilizou o laboratório visual. O conteúdo e os exemplos da aula continuam disponíveis.";
      return;
    }
    let refresh = () => {};
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = Math.max(["fsm_state_machine","pathfinding_astar","resource_forge","shader_particles_2d"].includes(type) ? 200 : ["vectors_2d", "signals_bus", "tilemap_grid", "tween_raycast_2d", "lighting_2d"].includes(type) ? 320 : 480, Math.floor(rect.width));
      canvas.height = type === "shader_particles_2d" ? (canvas.width < 500 ? 680 : 340) : type === "resource_forge" ? (canvas.width < 500 ? 620 : 320) : type === "pathfinding_astar" ? Math.min(360, Math.max(180, Math.floor(rect.width * 7 / 12 + 48))) : type === "fsm_state_machine" ? Math.max(150, Math.min(300, Math.floor(rect.width * 300 / 640))) : ["camera_parallax_2d", "tween_raycast_2d", "lighting_2d"].includes(type) ? 360 : type === "scene_tree" ? 385 : type === "vectors_2d" ? 450 : type === "gi_reflection_3d" ? 420 : 290;
      canvas.parentElement.style.alignSelf = ["gi_reflection_3d", "vectors_2d", "layers_masks", "camera_parallax_2d", "tween_raycast_2d"].includes(type) ? "start" : "stretch";
      canvas.style.height = "auto";
      canvas.style.aspectRatio = `${canvas.width} / ${canvas.height}`;
      refresh();
    };
    resize();
    window.addEventListener("resize", resize);
    currentCleanup = () => window.removeEventListener("resize", resize);

    controlsContainer.innerHTML = "";
    const state = { t: 0 };

    // Helper para criar controles rápidamente
    function addSlider(label, min, max, step, val, key, unit = "") {
      state[key] = val;
      const wrap = document.createElement("div");
      wrap.className = "sim-control-group";
      wrap.innerHTML = `
        <label for="sim-input-${key}"><span>${label}</span><strong id="val-${key}" aria-hidden="true">${val}${unit}</strong></label>
        <input id="sim-input-${key}" type="range" min="${min}" max="${max}" step="${step}" value="${val}" aria-valuetext="${val}${unit}" />
      `;
      const input = wrap.querySelector("input");
      const valEl = wrap.querySelector(`#val-${key}`);
      state[key] = parseFloat(input.value);
      valEl.textContent = `${state[key]}${unit}`;
      input.setAttribute("aria-valuetext", `${state[key]}${unit}`);
      input.addEventListener("input", () => {
        if (type === "fsm_state_machine" && key === "actorX" && state.fsm === "ATACANDO") {
          input.value=String(state.actorX);state.notice="Posição bloqueada durante o ataque; interrompa ou termine o golpe.";refresh();return;
        }
        state[key] = parseFloat(input.value);
        if (type === "transform_basis_3d") state.slerpToZero = false;
        if (type === "camera_parallax_2d" && key === "playerX" && state.follow === "instant") state.camX = state.playerX;
        valEl.textContent = `${state[key]}${unit}`;
        input.setAttribute("aria-valuetext", `${state[key]}${unit}`);
        if (window.playSteamClick) window.playSteamClick(520, 0.02);
        refresh();
      });
      controlsContainer.appendChild(wrap);
    }

    function addSelect(label, options, key) {
      state[key] = options[0].value;
      const wrap = document.createElement("div");
      wrap.className = "sim-control-group";
      wrap.innerHTML = `<label for="sim-input-${key}"><span>${label}</span></label><select id="sim-input-${key}"></select>`;
      const sel = wrap.querySelector("select");
      options.forEach((o) => {
        const opt = document.createElement("option");
        opt.value = o.value;
        opt.textContent = o.label;
        sel.appendChild(opt);
      });
      sel.addEventListener("change", () => {
        state[key] = sel.value;
        if (type === "delta_fps" && key === "fps") state.accum = 0;
        if (type === "camera_parallax_2d") {
          if (key === "follow" && state.follow === "instant") state.camX = state.playerX;
          if (key === "shakeMode" && state.shakeMode === "off") state.shake = 0;
        }
        if (window.playSteamClick) window.playSteamClick(440, 0.04);
        refresh();
      });
      controlsContainer.appendChild(wrap);
    }

    function addButton(label, onClick) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "brass-btn secondary";
      btn.style.width = "100%";
      btn.style.justifyContent = "center";
      btn.style.padding = "7px 12px";
      btn.style.fontSize = "0.8rem";
      btn.textContent = label;
      btn.addEventListener("click", () => {
        if (window.playSteamClick) window.playSteamClick(620, 0.05);
        onClick();
        refresh();
      });
      controlsContainer.appendChild(btn);
    }

    // Configuração específica de cada um dos 31 simuladores
    switch (type) {
      case "scene_tree": {
        addSlider("Posição Pai X", 100, 420, 1, 240, "px", "px");
        addSlider("Posição Pai Y", 70, 220, 1, 145, "py", "px");
        addSlider("Rotação Pai", -180, 180, 1, 0, "prot", "°");
        addSlider("Distância Local Filho", 30, 110, 1, 68, "cdist", "px");
        state.childrenCount = 2;
        addButton("Adicionar / Alternar Nós Filhos", () => {
          state.childrenCount = (state.childrenCount % 4) + 1;
        });
        break;
      }

      case "vectors_2d": {
        addSlider("Entrada X (+direita)", -1, 1, 0.1, 1, "ix", "");
        addSlider("Entrada Y (+baixo)", -1, 1, 0.1, 1, "iy", "");
        addSelect("Tratamento do vetor", [
          { value: "norm", label: "Normalizar" },
          { value: "raw", label: "Sem tratamento" },
          { value: "limit", label: "Limitar a 1" }
        ], "mode");
        addSlider("Intervalo calculado", 0, 1, 0.1, 1, "elapsed", " s");
        break;
      }

      case "delta_fps": {
        addSelect("Taxa de Quadros Simulada (FPS)", [
          { value: "60", label: "60 FPS (delta = 0.016s)" },
          { value: "15", label: "15 FPS PC Lento (delta = 0.066s)" },
          { value: "120", label: "120 FPS Monitor Gamer (delta = 0.008s)" }
        ], "fps");
        state.xWithDelta = 40;
        state.totalWith = 0; state.totalWithout = 0; state.elapsedSim = 0;
        state.xNoDelta = 40;
        state.accum = 0;
        addButton("Reiniciar Corrida das Locomotivas", () => {
          state.xWithDelta = 40;
        state.totalWith = 0; state.totalWithout = 0; state.elapsedSim = 0;
          state.xNoDelta = 40;
          state.accum = 0;
        });
        break;
      }

      case "physics_bodies_2d": {
        addSlider("Gravidade do modelo (+Y)", 200, 1200, 20, 680, "grav", " unidades/s²");
        addSlider("Velocidade horizontal", 80, 320, 10, 180, "speed", " unidades/s");
        state.charX = 110;
        state.charY = 180;
        state.charVy = 0;
        state.charDir = 1;
        state.rigids = [
          { x: 260, y: 60, vx: 60, vy: 0, r: 16, a: 0 },
          { x: 340, y: 40, vx: -50, vy: -20, r: 14, a: 0 }
        ];
        addButton("Pular (somente no chão)", () => {
          if (state.charY >= canvas.height - 64 - 1e-6 && state.charVy >= 0) state.charVy = -320;
        });
        addButton("Lançar círculo (velocidade inicial)", () => {
          state.rigids.push({
            x: 160 + Math.random() * 180,
            y: 45,
            vx: (Math.random() - 0.5) * 220,
            vy: -120,
            r: 15,
            a: 0
          });
          if (state.rigids.length > 5) state.rigids.shift();
        });
        addButton("Reiniciar laboratório", () => {
          state.charX = 110; state.charY = 180; state.charVy = 0; state.charDir = 1;
          state.rigids = [{x:260,y:60,vx:60,vy:0,r:16,a:0},{x:340,y:40,vx:-50,vy:-20,r:14,a:0}];
        });
        break;
      }

      case "layers_masks": {
        addSlider("Posição X do corpo", 20, 460, 10, 80, "bodyX", " unidades");
        addSelect("Layer do corpo", [
          {value:"2",label:"Camada 2 · jogador"}, {value:"1",label:"Camada 1 · mundo"}, {value:"4",label:"Camada 3 · outro"}
        ], "bodyLayer");
        addSelect("Mask do sensor", [
          {value:"2",label:"Somente camada 2"}, {value:"1",label:"Somente camada 1"},
          {value:"3",label:"Camadas 1 e 2"}, {value:"0",label:"Nenhuma camada"}
        ], "sensorMask");
        addSelect("Monitoring do sensor", [{value:"on",label:"Ligado"},{value:"off",label:"Desligado"}], "monitoring");
        state.sensorDetected = false; state.enters = 0; state.exits = 0; state.lastEvent = "Nenhum";
        addButton("Reiniciar posição e contadores", () => {
          state.bodyX = 80; state.sensorDetected = false; state.enters = 0; state.exits = 0; state.lastEvent = "Nenhum";
          const input = document.getElementById ? document.getElementById("sim-input-bodyX") : null;
          if (input) { input.value = "80"; input.setAttribute("aria-valuetext", "80 unidades"); }
          const display = document.getElementById ? document.getElementById("val-bodyX") : null;
          if (display) display.textContent = "80 unidades";
        });
        break;
      }

      case "camera_parallax_2d": {
        addSlider("Posição do alvo X", 0, 800, 5, 220, "playerX", " unidades");
        addSelect("Acompanhamento", [{value:"smooth",label:"Suave (exponencial)"},{value:"instant",label:"Imediato"}], "follow");
        addSlider("Taxa de aproximação do modelo", 1, 15, 1, 5, "smooth", " /s");
        addSelect("Animação visual", [{value:"run",label:"Corrida · quatro quadros"},{value:"idle",label:"Parado · quadro 0"}], "anim");
        addSlider("Quadros da animação por segundo", 2, 12, 1, 8, "animFPS", " FPS");
        addSelect("Orientação visual", [{value:"right",label:"Direita"},{value:"left",label:"Esquerda (espelhar arte)"}], "facing");
        addSelect("Permitir tremor", [{value:"off",label:"Desligado"},{value:"on",label:"Ligado"}], "shakeMode");
        state.camX = 220; state.shake = 0; state.shakeTime = 0; state.animTime = 0;
        addButton("Disparar tremor (se permitido)", () => {
          if (state.shakeMode === "on") { state.shake = 18; state.shakeTime = 0; }
        });
        addButton("Reiniciar laboratório", () => {
          const values = {playerX:220,follow:"smooth",smooth:5,anim:"run",animFPS:8,facing:"right",shakeMode:"off"};
          Object.assign(state, values, {camX:220,shake:0,shakeTime:0,animTime:0});
          for (const [key,value] of Object.entries(values)) {
            const input = document.getElementById ? document.getElementById(`sim-input-${key}`) : null;
            if (input) { input.value = String(value); if (input.type === "range") input.setAttribute("aria-valuetext",`${value}${key === "playerX" ? " unidades" : key === "smooth" ? " /s" : " FPS"}`); }
            const display = document.getElementById ? document.getElementById(`val-${key}`) : null;
            if (display) display.textContent = `${value}${key === "playerX" ? " unidades" : key === "smooth" ? " /s" : " FPS"}`;
          }
        });
        break;
      }

      case "signals_bus": {
        addSlider("Valor da próxima emissão", 0, 100, 10, 50, "pressure");
        for (const [key, label] of [["connDoor", "Porta de bronze"], ["connLight", "Luz de alerta"], ["connHud", "Manômetro HUD"]]) {
          addSelect(label, [{ value: "on", label: "Conectado" }, { value: "off", label: "Desconectado" }], key);
        }
        state.pulse = 0;
        state.emissions = 0;
        state.lastEmission = null;
        state.receivers = { connDoor: { count: 0, value: null }, connLight: { count: 0, value: null }, connHud: { count: 0, value: null } };
        addButton("Emitir pressao_alterada", () => {
          const recipients = Object.keys(state.receivers).filter(key => state[key] === "on");
          state.emissions += 1;
          state.lastEmission = { id: state.emissions, value: state.pressure, recipients };
          // Delivery is synchronous. The drawing only highlights this completed event.
          recipients.forEach(key => { state.receivers[key].count += 1; state.receivers[key].value = state.pressure; });
          state.pulse = 1;
        });
        addButton("Limpar histórico", () => {
          state.emissions = 0;
          state.lastEmission = null;
          state.pulse = 0;
          Object.values(state.receivers).forEach(receiver => { receiver.count = 0; receiver.value = null; });
        });
        break;
      }

      case "tilemap_grid": {
        addSelect("Ação no mapa", [{ value: "inspect", label: "Inspecionar" }, { value: "paint", label: "Pintar" }], "mapMode");
        addSelect("Pincel · fonte 0", [{ value: "1", label: "Bronze · atlas (0, 0)" }, { value: "2", label: "Óleo · atlas (1, 0)" }, { value: "3", label: "Vapor · atlas (2, 0)" }, { value: "0", label: "Apagar · source_id -1" }], "brush");
        addSlider("Ponto local X", -32, 384, 1, 80, "sampleX", " u");
        addSlider("Ponto local Y", -32, 224, 1, 80, "sampleY", " u");
        addSlider("Origem global X da camada", -128, 128, 32, 64, "mapX", " u");
        addSlider("Origem global Y da camada", -128, 128, 32, 96, "mapY", " u");
        const makeGrid = () => Array.from({ length: 7 }, (_, r) => Array.from({ length: 12 }, (_, c) => r === 5 ? 1 : r === 4 && c >= 4 && c < 8 ? 2 : r === 3 && c === 9 ? 3 : 0));
        state.grid = makeGrid();
        const help = document.createElement("p");
        help.id = "sim-grid-help";
        help.style.gridColumn = "1 / -1";
        help.className = "sim-keyboard-help";
        help.textContent = "Clique ou toque para selecionar; no modo Pintar também aplica o pincel. No mapa focado, setas selecionam e Enter/Espaço aplica no modo Pintar. Índices começam em zero. Fora da grade visível, a consulta é vazia e a pintura fica desabilitada.";
        controlsContainer.appendChild(help);
        const cellStatus = document.createElement("p");
        cellStatus.className = "sim-grid-status";
        cellStatus.style.gridColumn = "1 / -1";
        cellStatus.setAttribute("role", "status");
        cellStatus.setAttribute("aria-live", "polite");
        controlsContainer.appendChild(cellStatus);
        canvas.tabIndex = 0;
        canvas.setAttribute("role", "group");
        canvas.setAttribute("aria-label", "Mapa de células interativo, 12 colunas e 7 linhas");
        canvas.setAttribute("aria-describedby", [canvas.getAttribute("aria-describedby"), help.id].filter(Boolean).join(" "));
        canvas.setAttribute("aria-keyshortcuts", "ArrowUp ArrowDown ArrowLeft ArrowRight Enter Space");
        const selected = () => ({ c: Math.floor(state.sampleX / 32), r: Math.floor(state.sampleY / 32) });
        const inside = ({c, r}) => c >= 0 && c < 12 && r >= 0 && r < 7;
        const syncPointControls = () => {
          for (const key of ["sampleX", "sampleY"]) {
            const group = [...controlsContainer.children].find(el => el.querySelector?.(`#sim-input-${key}`));
            group.querySelector("input").value = state[key];
            group.querySelector("input").setAttribute("aria-valuetext", `${state[key]} u`);
            group.querySelector(`#val-${key}`).textContent = `${state[key]} u`;
          }
        };
        const apply = () => {
          const cell = selected();
          if (state.mapMode === "paint" && inside(cell)) state.grid[cell.r][cell.c] = Number(state.brush);
          cellStatus.textContent = `${state.mapMode === "paint" && inside(cell) ? "Pincel aplicado. " : "Consulta. "}Célula (${cell.c}, ${cell.r}).`;
          refresh();
        };
        addButton("Aplicar ação na célula", apply);
        addButton("Restaurar grade", () => { state.grid = makeGrid(); cellStatus.textContent = "Grade restaurada. Coordenadas, modo e pincel mantidos."; });
        const onPointer = (event) => {
          const rect = canvas.getBoundingClientRect();
          const x = (event.clientX - rect.left) * canvas.width / rect.width;
          const y = (event.clientY - rect.top) * canvas.height / rect.height;
          const grid = tileGridGeometry(canvas.width, canvas.height);
          const c = Math.floor((x - grid.x) / grid.cell), r = Math.floor((y - grid.y) / grid.cell);
          if (!inside({c, r})) return;
          state.sampleX = c * 32 + 16; state.sampleY = r * 32 + 16;
          syncPointControls();
          canvas.focus({preventScroll: true});
          apply();
        };
        const onKeyDown = event => {
          const deltas = {ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1]};
          if (event.key === "Enter" || event.key === " ") { event.preventDefault(); apply(); }
          else if (deltas[event.key]) {
            event.preventDefault();
            const {c, r} = selected(), [dc, dr] = deltas[event.key];
            state.sampleX = Math.max(0, Math.min(11, c + dc)) * 32 + 16;
            state.sampleY = Math.max(0, Math.min(6, r + dr)) * 32 + 16;
            syncPointControls();
            const next = selected();
            cellStatus.textContent = `Célula (${next.c}, ${next.r}) selecionada. Use Enter para aplicar a ação.`;
            refresh();
          }
        };
        canvas.addEventListener("click", onPointer);
        canvas.addEventListener("keydown", onKeyDown);
        const prevClean = currentCleanup;
        currentCleanup = () => { prevClean(); canvas.removeEventListener("click", onPointer); canvas.removeEventListener("keydown", onKeyDown); };
        break;
      }

      case "tween_raycast_2d": {
        addSelect("Transição · EASE_OUT fixo", [{value:"linear",label:"TRANS_LINEAR"},{value:"quad",label:"TRANS_QUAD"},{value:"sine",label:"TRANS_SINE"},{value:"back",label:"TRANS_BACK"}], "curve");
        addSlider("Duração do próximo Tween", 0.2, 2, 0.1, 1, "duration", " s");
        addSlider("Ângulo do segmento", -45, 15, 1, 0, "rayAngle", "°");
        addSlider("Alcance do segmento", 20, 320, 10, 280, "rayLength", " u");
        addSelect("Máscara do raio · parede na camada 1", [{value:"1",label:"Camada 1 ligada"},{value:"0",label:"Nenhuma camada"}], "rayMask");
        state.tweenElapsed = 0;
        state.tweenRunning = false;
        state.activeCurve = "linear";
        state.activeDuration = 1;
        state.tweenStarted = false;
        addButton("Iniciar Tween", () => {
          state.tweenElapsed = 0; state.tweenRunning = true; state.tweenStarted = true;
          state.activeCurve = state.curve; state.activeDuration = state.duration;
        });
        addButton("Voltar ao início", () => { state.tweenElapsed = 0; state.tweenRunning = false; state.tweenStarted = false; });
        break;
      }

      case "lighting_2d": {
        addSlider("Luz · posição X no mundo", 40, 440, 10, 80, "lx", " u");
        addSlider("Luz · posição Y no mundo", 50, 270, 10, 170, "ly", " u");
        addSlider("Energia base", 0, 2, 0.1, 1, "energy", "×");
        addSlider("Raio de cobertura do modelo", 80, 360, 20, 280, "lightRadius", " u");
        addSlider("Contribuição ambiente", 0, 1, 0.1, 0.2, "ambient", "×");
        addSelect("Oclusão da luz direta", [{value:"on",label:"Sombras ligadas"},{value:"off",label:"Sombras desligadas"}], "lightShadows");
        addSelect("Oscilação opcional", [{value:"off",label:"Desligada"},{value:"on",label:"Ligada · ±10% a 1.5 Hz"}], "lightFlicker");
        addSlider("Câmera X · mundo desloca no sentido oposto", -80, 80, 10, 0, "lightCamera", " u");
        addButton("Restaurar ajustes", () => {
          const defaults = {lx:[80," u"],ly:[170," u"],energy:[1,"×"],lightRadius:[280," u"],ambient:[0.2,"×"],lightCamera:[0," u"],lightShadows:["on",""],lightFlicker:["off",""]};
          for (const [key,[value,unit]] of Object.entries(defaults)) {
            state[key]=value;
            const group=[...controlsContainer.children].find(el=>el.querySelector?.(`#sim-input-${key}`));
            const input=group.querySelector(`#sim-input-${key}`);input.value=String(value);
            const label=group.querySelector(`#val-${key}`);
            if(label){label.textContent=`${value}${unit}`;input.setAttribute("aria-valuetext",`${value}${unit}`);}
          }
          state.t=0;
        });
        break;
      }

      case "fsm_state_machine": {
        addSlider("Posição de teste · X do autômato", 48, 560, 1, 120, "actorX", " u");
        addSelect("Máscara da Hurtbox · procura camada 3", [{value:"on",label:"Inclui o bit 4"},{value:"off",label:"Vazia · não detecta"}], "fsmMask");
        addSelect("Relação simulada do alvo com o atacante", [{value:"enemy",label:"Outro autor · equipe 2"},{value:"ally",label:"Outro autor · equipe 1"},{value:"self",label:"Mesmo autor · equipe 2"}], "fsmReceiver");
        Object.assign(state, {fsm:"PARADO", elapsed:0, direction:0, targetHp:100, hits:0, deaths:0, attacks:0, hitThisAttack:false, active:false, transitions:0, lastTransition:"Inicial: enter PARADO", notice:"Escolha uma direção ou ataque."});
        const move = direction => {
          if(state.fsm === "ATACANDO") {state.notice="Movimento ignorado durante ataque.";return;}
          state.direction=direction;
          fsm11Transition(state, direction ? "ANDANDO" : "PARADO");
        };
        const held = new Set();
        const stopKeys = () => {held.clear();if(state.fsm === "ANDANDO")move(0);};
        releaseInput = stopKeys;
        const nudge = direction => {
          if(state.fsm === "ATACANDO") {state.notice="Posição bloqueada durante o ataque.";return;}
          stopKeys();state.actorX=Math.max(48,Math.min(560,state.actorX+direction*16));
          state.notice="Passo de 16 unidades; posição mantida para atacar.";
        };
        addButton("Passo à esquerda · 16 u", () => nudge(-1));
        addButton("Passo à direita · 16 u", () => nudge(1));
        addButton("Parar movimento", () => {stopKeys();move(0);});
        const attack = () => {
          if(state.fsm === "ATACANDO") {state.notice="Ataque repetido ignorado; relógio preservado.";return;}
          held.clear();fsm11Transition(state,"ATACANDO");
        };
        addButton("Iniciar ataque", attack);
        addButton("Interromper ataque", () => {
          if(state.fsm !== "ATACANDO"){state.notice="Nenhum ataque em andamento; movimento preservado.";return;}
          state.direction=0;fsm11Transition(state,"PARADO");
        });
        addButton("Avançar 0,05 s", () => {if(isPaused())fsm11Advance(state,0.05);});
        controlsContainer.children[controlsContainer.children.length-1].setAttribute("data-lab-step","fsm");
        addButton("Restaurar laboratório", () => {
          held.clear();
          Object.assign(state,{actorX:120,fsmMask:"on",fsmReceiver:"enemy",fsm:"PARADO",elapsed:0,direction:0,targetHp:100,hits:0,deaths:0,attacks:0,hitThisAttack:false,active:false,transitions:0,lastTransition:"Restaurado: enter PARADO",notice:"Posição, filtros, vida e contadores restaurados."});
          for(const key of ["actorX","fsmMask","fsmReceiver"]) {
            const group=[...controlsContainer.children].find(el=>el.querySelector?.(`#sim-input-${key}`));
            const input=group.querySelector(`#sim-input-${key}`);input.value=String(state[key]);
            if(key === "actorX") {group.querySelector("#val-actorX").textContent="120 u";input.setAttribute("aria-valuetext","120 u");}
          }
        });
        const help=document.createElement("p");help.className="study-note";help.style.gridColumn="1 / -1";
        help.textContent="Clique na cena ou use Tab para focá-la. Segure A/D ou ←/→ para andar; solte para parar. Espaço ou J ataca para a direita. Após atacar, solte e pressione a direção de novo. Os botões deslocam 16 u por clique. Retome a simulação para jogar; em pausa, use o avanço manual.";
        controlsContainer.appendChild(help);
        canvas.tabIndex=0;canvas.setAttribute("role","group");
        canvas.setAttribute("aria-label","Controle do autômato: A/D ou setas esquerda/direita para andar, Espaço ou J para atacar. Solte a direção para parar.");
        const onKeyDown=event=>{
          const key=event.key.toLowerCase();
          if(!["a","d","arrowleft","arrowright"," ","j"].includes(key) || event.ctrlKey || event.metaKey || event.altKey)return;
          event.preventDefault();
          if(key === " " || key === "j") {if(!event.repeat)attack();refresh();return;}
          if(isPaused()){state.notice="Retome a simulação para andar pelo teclado.";refresh();return;}
          if(event.repeat && !held.has(key))return;
          if(state.fsm === "ATACANDO")return;
          held.add(key);
          move(Number(held.has("d")||held.has("arrowright"))-Number(held.has("a")||held.has("arrowleft")));refresh();
        };
        const onKeyUp=event=>{
          const key=event.key.toLowerCase();if(!held.has(key))return;
          event.preventDefault();held.delete(key);
          move(Number(held.has("d")||held.has("arrowright"))-Number(held.has("a")||held.has("arrowleft")));refresh();
        };
        const onBlur=()=>{stopKeys();refresh();};
        const onClick=()=>canvas.focus();
        canvas.addEventListener("keydown",onKeyDown);canvas.addEventListener("keyup",onKeyUp);
        canvas.addEventListener("blur",onBlur);canvas.addEventListener("click",onClick);window.addEventListener("blur",onBlur);
        const previousCleanup=currentCleanup;
        currentCleanup=()=>{previousCleanup?.();stopKeys();canvas.removeEventListener("keydown",onKeyDown);canvas.removeEventListener("keyup",onKeyUp);canvas.removeEventListener("blur",onBlur);canvas.removeEventListener("click",onClick);window.removeEventListener("blur",onBlur);};
        break;
      }

      case "pathfinding_astar": {
        addSelect("Visualização · mesmo A* em grade", [{value:"cells",label:"Células e custo da rota"},{value:"follow",label:"Seguir os pontos da rota"}], "navView");
        addSelect("Ferramenta de edição", [{value:"wall",label:"Alternar parede"},{value:"goal",label:"Mover destino"},{value:"start",label:"Mover origem"}], "navTool");
        addSlider("Célula selecionada · coluna",0,11,1,5,"navCol");
        addSlider("Célula selecionada · linha",0,6,1,3,"navRow");
        addSlider("Velocidade · usada em Seguir rota",16,128,16,64,"navSpeed"," u/s");
        Object.assign(state,{sx:1,sy:3,tx:10,ty:3,walls:{},plans:0,notice:"Edite pelo mapa ou pelos controles. Toda edição válida reinicia na origem."});
        for(let y=1;y<=5;y++)state.walls[`5,${y}`]=true;
        nav12Plan(state);
        const feedback=document.createElement("p");feedback.className="study-note";feedback.setAttribute("role","status");
        const announce=message=>{state.notice=message;feedback.textContent=message;};
        const syncSelection=()=>{
          for(const [key,max] of [["navCol",11],["navRow",6]]) {
            state[key]=Math.max(0,Math.min(max,Math.round(state[key])));
            const group=[...controlsContainer.children].find(el=>el.querySelector?.(`#sim-input-${key}`));
            const input=group.querySelector(`#sim-input-${key}`);input.value=String(state[key]);input.setAttribute("aria-valuetext",String(state[key]));group.querySelector(`#val-${key}`).textContent=String(state[key]);
          }
        };
        const apply=()=>{
          const x=state.navCol,y=state.navRow,key=`${x},${y}`;
          if(state.navTool==="wall") {
            if((x===state.sx&&y===state.sy)||(x===state.tx&&y===state.ty)){announce("Origem e destino são protegidos; mova-os antes de criar uma parede.");return;}
            if(state.walls[key])delete state.walls[key];else state.walls[key]=true;
          } else {
            if(state.walls[key]){announce("Célula bloqueada; remova a parede antes de mover o ponto.");return;}
            if(state.navTool==="goal"){state.tx=x;state.ty=y;}else{state.sx=x;state.sy=y;}
          }
          nav12Plan(state);announce("Mapa atualizado; seguidor reiniciado na origem.");
        };
        addButton("Aplicar ferramenta à célula",apply);
        addButton("Mapa aberto · 9 passos",()=>{state.walls={};state.sx=1;state.sy=3;state.tx=10;state.ty=3;nav12Plan(state);announce("Mapa aberto: 9 passos, 10 pontos.");});
        addButton("Barreira parcial · 15 passos",()=>{state.walls={};for(let y=1;y<=5;y++)state.walls[`5,${y}`]=true;state.sx=1;state.sy=3;state.tx=10;state.ty=3;nav12Plan(state);announce("Barreira parcial: 15 passos; dois lados empatados.");});
        addButton("Bloqueio completo · sem rota",()=>{state.walls={};for(let y=0;y<7;y++)state.walls[`5,${y}`]=true;state.sx=1;state.sy=3;state.tx=10;state.ty=3;nav12Plan(state);announce("Barreira completa: destino separado da origem.");});
        addButton("Destino igual à origem",()=>{state.tx=state.sx;state.ty=state.sy;nav12Plan(state);announce("Origem igual ao destino: zero passos, um ponto.");});
        const replay = () => {
          state.navView="follow";
          const group=[...controlsContainer.children].find(el=>el.querySelector?.("#sim-input-navView"));
          group.querySelector("#sim-input-navView").value="follow";
          nav12Plan(state);resume();announce(state.route.length>1 ? "Percurso reiniciado e em movimento. Use novamente para repetir." : "Sem percurso a executar; confira origem, destino e paredes.");
        };
        addButton("Iniciar / repetir percurso",replay);
        addButton("Reiniciar seguidor",()=>{nav12Plan(state);announce("Seguidor na origem; pausa e visualização preservadas. Use Iniciar / repetir percurso para animar.");});
        addButton("Avançar 0,25 s",()=>{if(isPaused() && state.navView === "follow")nav12Step(state,0.25);});
        controlsContainer.children[controlsContainer.children.length-1].setAttribute("data-lab-step","nav");
        addButton("Restaurar laboratório",()=>{
          Object.assign(state,{sx:1,sy:3,tx:10,ty:3,walls:{},navView:"cells",navTool:"wall",navCol:5,navRow:3,navSpeed:64,plans:0});for(let y=1;y<=5;y++)state.walls[`5,${y}`]=true;
          for(const key of ["navView","navTool","navSpeed"]) {
            const group=[...controlsContainer.children].find(el=>el.querySelector?.(`#sim-input-${key}`));const input=group.querySelector(`#sim-input-${key}`);input.value=String(state[key]);
            if(key==="navSpeed"){group.querySelector("#val-navSpeed").textContent="64 u/s";input.setAttribute("aria-valuetext","64 u/s");}
          }
          syncSelection();nav12Plan(state);announce("Laboratório restaurado: mapa, origem, destino, opções e movimento.");
        });
        controlsContainer.appendChild(feedback);announce(state.notice);
        canvas.tabIndex=0;canvas.setAttribute("role","group");canvas.setAttribute("aria-label","Grade interativa: setas selecionam célula; Enter ou Espaço aplica a ferramenta; R inicia ou repete o percurso.");
        const onClick=event=>{
          const rect=canvas.getBoundingClientRect(),layout=nav12Layout(canvas.width,canvas.height);
          const x=(event.clientX-rect.left)*canvas.width/rect.width,y=(event.clientY-rect.top)*canvas.height/rect.height;
          const col=Math.floor((x-layout.x)/layout.cell),row=Math.floor((y-layout.y)/layout.cell);
          if(col<0||col>=12||row<0||row>=7)return;
          state.navCol=col;state.navRow=row;syncSelection();apply();canvas.focus();refresh();
        };
        const onKey=event=>{
          if(event.key.toLowerCase()==="r" && !event.ctrlKey && !event.metaKey && !event.altKey){event.preventDefault();if(!event.repeat)replay();refresh();return;}
          if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," "].includes(event.key))return;
          event.preventDefault();
          if(event.repeat && (event.key === "Enter" || event.key === " ")) return;
          if(event.key==="ArrowLeft")state.navCol--;if(event.key==="ArrowRight")state.navCol++;
          if(event.key==="ArrowUp")state.navRow--;if(event.key==="ArrowDown")state.navRow++;
          syncSelection();if(event.key==="Enter"||event.key===" ")apply();refresh();
        };
        canvas.addEventListener("click",onClick);canvas.addEventListener("keydown",onKey);
        const previousCleanup=currentCleanup;
        currentCleanup=()=>{previousCleanup?.();canvas.removeEventListener("click",onClick);canvas.removeEventListener("keydown",onKey);};
        break;
      }

      case "resource_forge": {
        addSelect("Item do catálogo",Object.entries(RESOURCE13_ITEMS).map(([value,item])=>({value,label:item.name})),"resType");
        Object.assign(state,{gold:50,inventory:[],savedText:"",saves:0,loads:0,rejections:0,notice:"Adicione um item. O snapshot só muda ao salvar ou editar o texto."});
        const feedback=document.createElement("p");feedback.className="study-note";feedback.style.gridColumn="1 / -1";feedback.setAttribute("role","status");
        const announce=text=>{state.notice=text;feedback.textContent=text;};
        const selected=()=>state.inventory.find(entry=>entry.id===state.resType);
        addButton("Adicionar unidade",()=>{
          const item=selected();
          if(item && item.quantity>=99){announce("Limite: 99 unidades por pilha.");return;}
          if(item)item.quantity++;else state.inventory.push({id:state.resType,quantity:1,level:1});
          announce("Unidade adicionada. O snapshot anterior foi preservado.");
        });
        addButton("Melhorar pilha",()=>{
          const item=selected();if(!item){announce("Adicione o item antes de melhorar.");return;}
          if(item.level>=10){announce("Nível máximo: 10.");return;}
          item.level++;announce("Nível da pilha aumentado; catálogo e snapshot preservados.");
        });
        addButton("Remover unidade",()=>{
          const item=selected();if(!item){announce("Item ausente.");return;}
          if(--item.quantity===0)state.inventory=state.inventory.filter(entry=>entry!==item);
          announce("Unidade removida. Uma pilha vazia sai do inventário.");
        });
        addButton("Ganhar 10 de ouro",()=>{state.gold=Math.min(999,state.gold+10);announce("Ouro atualizado; limite 999.");});
        const editorGroup=document.createElement("div");editorGroup.className="control-group";editorGroup.style.gridColumn="1 / -1";
        const label=document.createElement("label");label.setAttribute("for","sim-save-json");label.textContent="Snapshot JSON em memória · editável; não é um arquivo no disco";
        const editor=document.createElement("textarea");editor.id="sim-save-json";editor.setAttribute("id","sim-save-json");editor.rows=9;editor.maxLength=16384;editor.spellcheck=false;
        editor.style.cssText="width:100%;box-sizing:border-box;min-height:180px;padding:12px;background:#090604;color:#adffdf;border:1px solid #8d6735;border-radius:6px;font:13px/1.6 'JetBrains Mono',monospace;resize:vertical";
        editor.setAttribute("aria-label","Snapshot JSON em memória, editável");
        const onEdit=()=>{state.savedText=editor.value;announce("Texto do snapshot editado; use Carregar para validar e aplicar.");refresh();};
        editor.addEventListener("input",onEdit);editorGroup.appendChild(label);editorGroup.appendChild(editor);
        const save=()=>{const result=resource13Validate({version:1,gold:state.gold,inventory:state.inventory});
          if(!result.ok){announce(result.message);return;}
          state.savedText=JSON.stringify(result.state,null,2);editor.value=state.savedText;state.saves++;announce("Snapshot salvo em memória. Altere o inventário e carregue para comparar.");};
        const load=()=>{const result=resource13Parse(editor.value);
          if(!result.ok){state.rejections++;announce(result.message+" Estado atual preservado.");return;}
          state.gold=result.state.gold;state.inventory=result.state.inventory;state.loads++;announce("Snapshot validado e carregado. IDs resolvidos pelo catálogo.");};
        const reset=()=>{state.gold=50;state.inventory=[];announce("Inventário reiniciado; snapshot preservado. Carregue para recuperá-lo.");};
        addButton("Salvar snapshot · S",save);addButton("Carregar snapshot · L",load);addButton("Reiniciar inventário · R",reset);
        addButton("Exemplo: JSON inválido",()=>{editor.value='{ "version": 1,';state.savedText=editor.value;announce("Exemplo inválido preparado. Carregue e confira se o inventário é preservado.");});
        addButton("Exemplo: ID desconhecido",()=>{editor.value=JSON.stringify({version:1,gold:50,inventory:[{id:"desconhecido",quantity:1,level:1}]},null,2);state.savedText=editor.value;announce("JSON legível com ID desconhecido. Carregue para testar a validação.");});
        addButton("Restaurar laboratório",()=>{Object.assign(state,{gold:50,inventory:[],resType:"martelo",savedText:"",saves:0,loads:0,rejections:0});editor.value="";
          const group=[...controlsContainer.children].find(el=>el.querySelector?.("#sim-input-resType"));group.querySelector("#sim-input-resType").value="martelo";
          announce("Laboratório restaurado; inventário e snapshot esvaziados.");});
        controlsContainer.appendChild(editorGroup);controlsContainer.appendChild(feedback);announce(state.notice);
        canvas.tabIndex=0;canvas.setAttribute("role","group");canvas.setAttribute("aria-label","Inventário: S salva snapshot, L carrega, R reinicia inventário. Atalhos apenas com foco nesta cena.");
        const onKey=event=>{const key=event.key.toLowerCase();if(!["s","l","r"].includes(key)||event.ctrlKey||event.metaKey||event.altKey)return;
          event.preventDefault();if(event.repeat)return;({s:save,l:load,r:reset})[key]();refresh();};
        const onClick=()=>canvas.focus();canvas.addEventListener("keydown",onKey);canvas.addEventListener("click",onClick);
        const previousCleanup=currentCleanup;currentCleanup=()=>{previousCleanup?.();canvas.removeEventListener("keydown",onKey);canvas.removeEventListener("click",onClick);editor.removeEventListener("input",onEdit);};
        break;
      }

      case "shader_particles_2d": {
        addSlider("Flash manual · mistura com branco",0,1,.05,0,"flash");
        addSlider("Amplitude UV · fração da largura",0,.1,.01,0,"wave");
        addSlider("Frequência · radianos por altura UV",0,12.566370614359172,1.5707963267948966,6.283185307179586,"frequency");
        addSlider("Velocidade de fase · rad/s",0,4,.5,2,"speed");
        addSelect("Materiais de A e B",[{value:"separate",label:"Independentes"},{value:"shared",label:"Compartilhados"}],"materialMode");
        addSelect("Emissor",[{value:"burst",label:"Rajada única"},{value:"continuous",label:"Emissão contínua"}],"emitterMode");
        addSlider("Quantidade por ciclo · N",8,64,8,24,"amount");
        addSlider("Vida de cada partícula · T",.5,3,.5,1.5,"lifetime"," s");
        Object.assign(state,{shaderTime:0,flashAge:.4,particles:[],emitting:false,nextBirth:0,emitted:0,burstActive:false,bursts:0,finished:0});
        const feedback=document.createElement("p");feedback.className="study-note";feedback.style.gridColumn="1 / -1";feedback.setAttribute("role","status");
        const say=text=>{feedback.textContent=text;};
        const flash=()=>{state.flashAge=0;say("Pulso de 0,40 s até voltar ao valor manual. Durante a pausa, use o avanço manual.");};
        const burst=()=>{if(state.emitterMode!=="burst")return;shader14Burst(state);say("Rajada reiniciada: partículas anteriores limpas. Repita mesmo após terminar.");};
        const emission=()=>{if(state.emitterMode!=="continuous")return;state.emitting=!state.emitting;if(state.emitting)state.nextBirth=state.shaderTime+state.lifetime/state.amount;say(state.emitting?"Emissão ligada. N/T determina a taxa do modelo.":"Emissão desligada; partículas existentes terminam sua vida.");};
        addButton("Disparar flash · F",flash);
        addButton("Disparar / repetir rajada · P",burst);controlsContainer.children[controlsContainer.children.length-1].setAttribute("data-shader-action","burst");
        addButton("Ligar / desligar emissão · E",emission);controlsContainer.children[controlsContainer.children.length-1].setAttribute("data-shader-action","continuous");
        addButton("Avançar 0,25 s",()=>{if(isPaused())shader14Advance(state,.25);});controlsContainer.children[controlsContainer.children.length-1].setAttribute("data-lab-step","shader");
        const restore=()=>{
          Object.assign(state,{flash:0,wave:0,frequency:Math.PI*2,speed:2,materialMode:"separate",emitterMode:"burst",amount:24,lifetime:1.5,shaderTime:0,flashAge:.4,particles:[],emitting:false,nextBirth:0,emitted:0,burstActive:false,bursts:0,finished:0});
          for(const key of ["flash","wave","frequency","speed","materialMode","emitterMode","amount","lifetime"]){const group=[...controlsContainer.children].find(el=>el.querySelector?.(`#sim-input-${key}`));const input=group.querySelector(`#sim-input-${key}`);input.value=String(state[key]);if(group.querySelector(`#val-${key}`)){const value=String(state[key])+(key==="lifetime"?" s":"");group.querySelector(`#val-${key}`).textContent=value;input.setAttribute("aria-valuetext",value);}}
          say("Laboratório restaurado. Pause e dispare para inspecionar por passos.");
        };
        addButton("Restaurar laboratório · R",restore);
        const onParameters=()=>{shader14ResetParticles(state);say("Modo, N ou T alterado: emissor limpo e parado. Dispare a rajada ou ligue a emissão.");refresh();};
        const parameterInputs=["emitterMode","amount","lifetime"].map(key=>[...controlsContainer.children].find(el=>el.querySelector?.(`#sim-input-${key}`)).querySelector(`#sim-input-${key}`));
        parameterInputs.forEach((input,index)=>input.addEventListener(index===0?"change":"input",onParameters));
        controlsContainer.appendChild(feedback);say("Clique na cena ou use Tab para focar. F: flash; P: rajada; E: emissão contínua; R: restaurar. Botões equivalentes acima. Nenhuma partícula é emitida antes de uma ação.");
        canvas.tabIndex=0;canvas.setAttribute("role","group");canvas.setAttribute("aria-label","Efeitos: F dispara flash, P repete rajada, E alterna emissão contínua, R restaura. Atalhos só com foco na cena.");
        const onKey=event=>{const key=event.key.toLowerCase();if(!["f","p","e","r"].includes(key)||event.ctrlKey||event.altKey||event.metaKey)return;event.preventDefault();if(event.repeat)return;({f:flash,p:burst,e:emission,r:restore})[key]();refresh();};
        const onClick=()=>canvas.focus();canvas.addEventListener("keydown",onKey);canvas.addEventListener("click",onClick);
        const previousCleanup=currentCleanup;currentCleanup=()=>{previousCleanup?.();canvas.removeEventListener("keydown",onKey);canvas.removeEventListener("click",onClick);parameterInputs.forEach((input,index)=>input.removeEventListener(index===0?"change":"input",onParameters));};
        break;
      }


      case "async_loader_sim": {
        state.progress = 0;
        state.mode = "idle";
        state.freezeFrames = 0;
        addButton("Carregar Síncrono (load -> TRAVA A TELA!)", () => {
          state.mode = "sync";
          state.freezeFrames = 55;
          state.progress = 100;
        });
        addButton("Carregar Assíncrono (load_threaded_request)", () => {
          state.mode = "async";
          state.freezeFrames = 0;
          state.progress = 0;
        });
        break;
      }

      case "optimization_pool": {
        addSlider("Projéteis Disparados/Seg", 20, 300, 20, 140, "count", "");
        addSelect("Estratégia de Memória", [
          { value: "pool", label: "Object Pooling + Culling (60 FPS Estável)" },
          { value: "naive", label: "instantiate() + queue_free() Bruto (Gargalo)" }
        ], "optMode");
        state.bullets = [];
        break;
      }

      case "multiplayer_rpc_sim": {
        addSlider("Posição Host (Autoridade ID 1)", 40, 200, 2, 110, "hostX", "px");
        addSlider("Latência de Rede (Ping)", 10, 250, 10, 60, "ping", "ms");
        state.clientX = 110;
        state.rpcPackets = [];
        addButton("Chamar @rpc('atirar_vapor') na Rede!", () => {
          state.rpcPackets.push({ p: 0 });
        });
        break;
      }

      // ======================== 3D SIMULATORS ========================
      case "space_3d_axes": {
        addSlider("Rotação do Autômato (Yaw Y)", -180, 180, 5, 35, "yaw", "°");
        addSlider("Posição 3D no Eixo Z", -3, 3, 0.2, 0, "pz", "m");
        addSlider("Altura 3D no Eixo +Y", 0, 3, 0.2, 0.5, "py", "m");
        addSelect("Modo de Avanço", [
          { value: "local", label: "Frente Local (-transform.basis.z)" },
          { value: "global", label: "Frente Global (Vector3.FORWARD)" }
        ], "moveMode");
        break;
      }

      case "transform_basis_3d": {
        addSlider("Pitch (Eixo X Vermelho)", -90, 90, 2, 15, "rx", "°");
        addSlider("Yaw (Eixo Y Verde)", -180, 180, 2, 40, "ry", "°");
        addSlider("Roll (Eixo Z Azul)", -90, 90, 2, -10, "rz", "°");
        addButton("Interpolar com quaternion slerp para Zero", () => {
          state.slerpToZero = true;
        });
        break;
      }

      case "csg_boolean_3d": {
        addSelect("Operação Booleana do CSG", [
          { value: "sub", label: "OPERATION_SUBTRACTION (Escavar Buraco)" },
          { value: "union", label: "OPERATION_UNION (Fundir Formas)" },
          { value: "inter", label: "OPERATION_INTERSECTION (Apenas Cruzamento)" }
        ], "op");
        addSlider("Deslocamento do Cilindro CSG", -60, 60, 2, 0, "offset", "cm");
        break;
      }

      case "character_3d_slopes": {
        addSlider("Inclinação da Rampa 3D", 10, 65, 1, 30, "slope", "°");
        addSlider("floor_max_angle Permitido", 15, 60, 1, 45, "maxAngle", "°");
        state.charPos = 0.2;
        state.jumpY = 0;
        state.jumpVy = 0;
        addButton("Pular em 3D (velocity.y = +5.5 m/s)", () => {
          if (state.jumpY <= 0.01) state.jumpVy = 5.5;
        });
        break;
      }

      case "springarm_camera_3d": {
        addSlider("Comprimento Desejado (spring_length)", 2.0, 6.0, 0.2, 4.5, "springLen", "m");
        addSlider("Distância da Parede Traseira", 1.2, 6.5, 0.2, 3.0, "wallDist", "m");
        addSlider("Abertura da Lente (Camera3D FOV)", 45, 100, 1, 75, "fov", "°");
        break;
      }

      case "raycast_picking_3d": {
        addSlider("Mira Horizontal 3D", -100, 100, 2, 0, "aimX", "");
        addSlider("Inclinação da Superfície Alvo", -45, 45, 2, 22, "surfAngle", "°");
        state.sparks = [];
        addButton("Disparar Feixe & Alinhar Faíscas pela Normal", () => {
          for (let i = 0; i < 14; i++) {
            state.sparks.push({ life: 1.0, spread: (Math.random() - 0.5) * 1.1, speed: 60 + Math.random() * 80 });
          }
        });
        break;
      }

      case "pbr_material_3d": {
        addSlider("Metallic (0 = Isolante, 1 = Metal)", 0, 1, 0.05, 1.0, "metal", "");
        addSlider("Roughness (0 = Espelho, 1 = Fosco)", 0.05, 1, 0.05, 0.2, "rough", "");
        addSlider("Emission (Brilho Incandescente)", 0, 3, 0.1, 0.0, "emit", "x");
        addSelect("Cor Albedo Base", [
          { value: "#d4a359", label: "Latão Polido (#d4a359)" },
          { value: "#c86438", label: "Cobre Forjado (#c86438)" },
          { value: "#5ce1e6", label: "Cristal de Éter (#5ce1e6)" }
        ], "albedo");
        break;
      }

      case "lighting_3d_env": {
        addSelect("Tipo de Luz 3D Ativa", [
          { value: "spot", label: "SpotLight3D (Cone Focado + God Rays)" },
          { value: "omni", label: "OmniLight3D (Esfera Radial)" },
          { value: "dir", label: "DirectionalLight3D (Raios Solares Paralelos)" }
        ], "lightType");
        addSlider("Volumetric Fog (Neblina a Vapor)", 0, 1, 0.05, 0.65, "fog", "");
        addSlider("Ângulo / Posição da Luz", -60, 60, 2, -20, "lAngle", "°");
        break;
      }

      case "gridmap_decal_3d": {
        addSlider("Camada de Altura (GridMap Y)", 0, 2, 1, 1, "gy", " andar");
        addSlider("Posição do Decal Projetado X", -80, 80, 4, 0, "decalX", "");
        state.blocksCount = 9;
        addButton("Adicionar / Alternar Blocos no GridMap", () => {
          state.blocksCount = state.blocksCount >= 14 ? 6 : state.blocksCount + 2;
        });
        break;
      }

      case "blendspace_2d_3d": {
        addSlider("BlendSpace2D X (Strafe Lado)", -1, 1, 0.1, 0.0, "bx", "");
        addSlider("BlendSpace2D Y (Andar/Correr Frente)", -1, 1, 0.1, 0.7, "by", "");
        addSelect("Filtro OneShot Tronco Superior", [
          { value: "off", label: "Desligado (Apenas Locomoção)" },
          { value: "on", label: "Ativo: Acenar/Atirar da Cintura p/ Cima!" }
        ], "oneshot");
        break;
      }

      case "navmesh_3d_sim": {
        addSlider("Margem do Robô (agent_radius)", 0.2, 1.2, 0.1, 0.5, "radius", "m");
        addSelect("Ponte de Salto (NavigationLink3D)", [
          { value: "on", label: "Ativada (Permite Saltar o Fosso!)" },
          { value: "off", label: "Desativada (Sem Rota Entre as Plataformas)" }
        ], "link");
        break;
      }

      case "spatial_shader_3d": {
        addSlider("Amplitude Onda Vértice (VERTEX.y)", 0, 28, 1, 12, "amp", "");
        addSlider("Velocidade Temporal (TIME)", 1, 10, 0.5, 4, "speed", "x");
        addSlider("Potência da Borda Fresnel", 0.5, 6, 0.5, 2.5, "fresnel", "");
        break;
      }

      case "gi_reflection_3d": {
        addSelect("Luz indireta difusa (GI)", [
          { value: "gi_probe", label: "Ligada · 1 rebatimento" },
          { value: "direct", label: "Desligada · só luz direta" }
        ], "giMode");
        addSlider("Energia da luz rebatida", 0, 2, 0.1, 1, "bounce", "x");
        addSelect("Reflexo ambiente no metal", [
          { value: "on", label: "Ligado · sonda local" },
          { value: "off", label: "Desligado" }
        ], "probe");
        const note=document.createElement("p");
        note.className="sim-keyboard-help";
        note.textContent="Esquerda: referência fixa. Direita: seus ajustes. Em cada sala: esfera esquerda fosca, esfera direita metálica. A luz direta é a mesma. Modelo de 1 rebatimento na parede vermelha; não executa VoxelGI ou LightmapGI.";
        controlsContainer.appendChild(note);
        break;
      }

      case "occlusion_lod_3d": {
        addSlider("Ângulo da Camera3D (Frustum)", -80, 80, 2, 0, "camAngle", "°");
        addSelect("OccluderInstance3D na Parede", [
          { value: "on", label: "Ativado (Esconde Objetos Atrás do Muro!)" },
          { value: "off", label: "Desativado (Desenha Tudo à Toa)" }
        ], "occluder");
        addSelect("Auto-LOD por Distância", [
          { value: "on", label: "Ativado (Reduz Triângulos ao Longe)" },
          { value: "off", label: "Desativado (Malha Pesada Sempre)" }
        ], "lod");
        break;
      }
    }

    // A pausa congela o tempo; os controles ainda redesenham uma imagem estática.
    let paused = pausePreference === null
      ? !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      : pausePreference;
    let lastTime = performance.now();
    function draw(dt) {
      const w = canvas.width;
      const h = canvas.height;
      drawBlueprintGrid(ctx, w, h);
      if (type === "layers_masks") {
        state.geometricOverlap = state.bodyX + 12 > 250 && state.bodyX - 12 < 350;
        state.filterMatch = (Number(state.bodyLayer) & Number(state.sensorMask)) !== 0;
        const detected = state.geometricOverlap && state.filterMatch && state.monitoring === "on";
        if (detected !== state.sensorDetected) {
          if (detected) { state.enters++; state.lastEvent = "Entrada"; }
          else { state.exits++; state.lastEvent = "Saída"; }
        }
        state.sensorDetected = detected;
      }

      // Alguns exemplos atualizam estado durante o desenho. Uma cópia impede
      // que redimensionar ou ajustar controles avance a simulação pausada.
      const frameState = dt > 0 ? state : JSON.parse(JSON.stringify(state));
      renderSimulation(type, ctx, w, h, dt, frameState, telemetryBox);
      if (type === "fsm_state_machine") {
        const group=[...controlsContainer.children].find(el=>el.querySelector?.("#sim-input-actorX"));
        const input=group.querySelector("#sim-input-actorX");input.value=String(state.actorX);
        group.querySelector("#val-actorX").textContent=`${state.actorX.toFixed(2)} u`;input.setAttribute("aria-valuetext",`${state.actorX.toFixed(2)} u`);
        input.disabled=state.fsm === "ATACANDO";
        input.setAttribute("aria-disabled",String(input.disabled));
        input.title=input.disabled ? "A posição não muda durante o ataque. Interrompa ou termine o golpe." : "Posição de teste do autômato.";
      }
      if (["fsm_state_machine","pathfinding_astar"].includes(type)) {
        const step=[...controlsContainer.children].find(el=>el.getAttribute?.("data-lab-step") === (type === "fsm_state_machine" ? "fsm" : "nav"));
        const canStep=paused && (type === "fsm_state_machine" || (state.navView === "follow" && state.route.length>1 && state.nextPoint<state.route.length));
        step.disabled=!canStep;step.setAttribute("aria-disabled",String(step.disabled));
        step.title=canStep ? "Avança o tempo simulado uma vez, mantendo a pausa." : (paused ? "Selecione Seguir rota e um caminho ainda não percorrido." : "Pause a simulação para avançar por passos.");
      }
      if (type === "shader_particles_2d") {
        const step=[...controlsContainer.children].find(el=>el.getAttribute?.("data-lab-step")==="shader");
        step.disabled=!paused;step.setAttribute("aria-disabled",String(!paused));step.title=paused?"Avança 0,25 s mantendo a pausa.":"Pause para avançar por passos.";
        for(const button of controlsContainer.children){const mode=button.getAttribute?.("data-shader-action");if(mode){button.disabled=mode!==state.emitterMode;if(mode==="continuous")button.setAttribute("aria-pressed",String(state.emitting));button.setAttribute("aria-disabled",String(button.disabled));button.title=button.disabled?"Escolha o modo de emissor correspondente.":"Ação do emissor selecionado.";}}
        for(const key of ["frequency","speed"]){const group=[...controlsContainer.children].find(el=>el.querySelector?.("#sim-input-"+key));group.querySelector("#val-"+key).textContent=state[key].toFixed(3);group.querySelector("#sim-input-"+key).setAttribute("aria-valuetext",state[key].toFixed(3));}
      }
      if (type === "gi_reflection_3d") {
        const input=controlsContainer.querySelector("#sim-input-bounce");
        if(input) {
          input.disabled=state.giMode !== "gi_probe";
          input.setAttribute("aria-disabled", String(input.disabled));
          input.title=input.disabled ? "Ative a GI difusa para ajustar a energia da luz rebatida." : "Energia do rebatimento difuso na parede vermelha.";
        }
      }
      if (type === "transform_basis_3d" && dt > 0) {
        ["rx", "ry", "rz"].forEach(key => {
          const input = controlsContainer.querySelector(`#sim-input-${key}`);
          if (!input) return;
          input.value = String(state[key]);
          const display = controlsContainer.querySelector(`#val-${key}`);
          if (display) display.textContent = `${input.value}°`;
          input.setAttribute("aria-valuetext", `${input.value}°`);
        });
      }
    }
    refresh = () => { if (paused || ["vectors_2d", "layers_masks", "tilemap_grid", "fsm_state_machine", "pathfinding_astar", "resource_forge", "shader_particles_2d"].includes(type)) draw(0); };
    function loop(now) {
      activeLoopId = null;
      if (paused || document.hidden) return;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      state.t += dt;
      draw(dt);
      activeLoopId = requestAnimationFrame(loop);
    }
    const schedule = () => {
      if (!["vectors_2d", "layers_masks", "tilemap_grid", "resource_forge"].includes(type) && !paused && !document.hidden && activeLoopId === null) {
        lastTime = performance.now();
        activeLoopId = requestAnimationFrame(loop);
      }
    };
    currentController = {
      isPaused: () => paused,
      setPaused(value) {
        paused = value;
        if(value)releaseInput();
        onPauseChange(paused);
        if (activeLoopId !== null) {
          cancelAnimationFrame(activeLoopId);
          activeLoopId = null;
        }
        if (["fsm_state_machine","pathfinding_astar","shader_particles_2d"].includes(type)) draw(0);
        schedule();
      }
    };
    const onVisibilityChange = () => {
      if(document.hidden){releaseInput();refresh();}
      if (document.hidden && activeLoopId !== null) {
        cancelAnimationFrame(activeLoopId);
        activeLoopId = null;
      } else {
        schedule();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    const cleanupControls = currentCleanup;
    currentCleanup = () => {
      cleanupControls();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
    draw(0);
    schedule();
    const stopLayout = watchControlsLayout(type, canvas, controlsContainer, telemetryBox, resize);
    const stopSimulation = currentCleanup;
    currentCleanup = () => { stopLayout(); stopSimulation(); };
  }

  function tileGridGeometry(w, h) {
    const cell = Math.min(36, (w - 40) / 12, (h - 38) / 7);
    return {cell, x: (w - cell * 12) / 2, y: (h - cell * 7) / 2 + 6};
  }

  const light2dPillars = [{x:180,y:170,r:26},{x:330,y:200,r:28}];
  const light2dRasterCache = new WeakMap();
  function light2dSample(x, y, state, energy) {
    const dx=x-state.lx, dy=y-state.ly, length2=dx*dx+dy*dy;
    let blocked=false;
    if(state.lightShadows==="on") for(const pillar of light2dPillars) {
      const px=pillar.x-state.lx, py=pillar.y-state.ly;
      if(px*px+py*py<=pillar.r*pillar.r){blocked=true;break;}
      if(length2===0)continue;
      const u=Math.max(0,Math.min(1,(px*dx+py*dy)/length2));
      const distance2=(state.lx+u*dx-pillar.x)**2+(state.ly+u*dy-pillar.y)**2;
      if(u>0 && distance2<=pillar.r*pillar.r){blocked=true;break;}
    }
    const distance=Math.sqrt(length2),falloff=Math.max(0,1-distance/state.lightRadius)**2;
    return {blocked,distance,direct:blocked?0:energy*falloff};
  }

  function fsm11Transition(state, next) {
    if(next === state.fsm) return;
    const old=state.fsm;
    // exit happens before enter, including interruptions.
    state.active=false;
    state.fsm=next;state.elapsed=0;state.transitions++;
    state.lastTransition=`exit ${old} → enter ${next}`;
    if(next === "ATACANDO") {state.direction=0;state.attacks++;state.hitThisAttack=false;}
    state.notice=next === "ATACANDO" ? "Preparação do golpe." : "Transição aceita.";
  }

  function fsm11Geometry(state) {
    const rect={x:state.actorX+24,y:182,w:48,h:36};
    const circle={x:360,y:200,r:24};
    const qx=Math.max(rect.x,Math.min(circle.x,rect.x+rect.w));
    const qy=Math.max(rect.y,Math.min(circle.y,rect.y+rect.h));
    const distance=Math.hypot(circle.x-qx,circle.y-qy);
    return {rect,circle,distance,overlap:distance<=circle.r+1e-9};
  }

  function fsm11Advance(state, dt) {
    let remaining=dt;
    while(remaining>1e-10) {
      const step=Math.min(remaining,1/240);remaining-=step;
      if(state.fsm === "ANDANDO") state.actorX=Math.max(48,Math.min(560,state.actorX+state.direction*80*step));
      state.elapsed+=step;
      if(state.fsm !== "ATACANDO") continue;
      state.active=state.elapsed+1e-10>=0.15 && state.elapsed<0.40-1e-10;
      if(state.active && !state.hitThisAttack && state.targetHp>0 && state.fsmMask === "on" && state.fsmReceiver === "enemy" && fsm11Geometry(state).overlap) {
        state.hitThisAttack=true;
        const applied=Math.min(25,state.targetHp);
        state.targetHp-=applied;state.hits++;
        if(state.targetHp === 0) state.deaths++;
        state.notice=`Contato aceito: ${applied} pontos, uma vez neste golpe.`;
      }
      if(state.elapsed+1e-10>=0.60) fsm11Transition(state,"PARADO");
    }
  }

  function nav12Solve(walls, sx, sy, tx, ty) {
    const valid=(x,y)=>Number.isInteger(x)&&Number.isInteger(y)&&x>=0&&x<12&&y>=0&&y<7;
    const start=`${sx},${sy}`,goal=`${tx},${ty}`;
    if(!valid(sx,sy)||!valid(tx,ty)||walls[start]||walls[goal]) return {path:[],expanded:0};
    const open=[{x:sx,y:sy,g:0}],cost={[start]:0},parent={[start]:null};let expanded=0;
    while(open.length) {
      open.sort((a,b)=>(a.g+Math.abs(a.x-tx)+Math.abs(a.y-ty))-(b.g+Math.abs(b.x-tx)+Math.abs(b.y-ty)));
      const node=open.shift(),key=`${node.x},${node.y}`;
      if(node.g!==cost[key])continue;
      expanded++;
      if(key===goal) {
        const path=[];let current=goal;
        while(current!==null){path.unshift(current.split(",").map(Number));current=parent[current];}
        return {path,expanded};
      }
      for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const x=node.x+dx,y=node.y+dy,k=`${x},${y}`,g=node.g+1;
        if(valid(x,y)&&!walls[k]&&(!(k in cost)||g<cost[k])) {cost[k]=g;parent[k]=key;open.push({x,y,g});}
      }
    }
    return {path:[],expanded};
  }

  function nav12Plan(state) {
    const result=nav12Solve(state.walls,state.sx,state.sy,state.tx,state.ty);
    state.route=result.path;state.expanded=result.expanded;
    state.px=16+(state.sx+.5)*32;state.py=16+(state.sy+.5)*32;
    state.nextPoint=1;state.travelled=0;state.movingTime=0;state.plans++;
  }

  function nav12Layout(w,h) {
    const cell=Math.min(42,(w-24)/12,(h-48)/7);
    return {cell,x:(w-cell*12)/2,y:18};
  }

  function nav12Step(state,dt) {
    if(state.navView!=="follow"||state.route.length<2||state.nextPoint>=state.route.length)return;
    let budget=state.navSpeed*dt,used=0;
    while(budget>1e-9&&state.nextPoint<state.route.length) {
      const [col,row]=state.route[state.nextPoint],x=16+(col+.5)*32,y=16+(row+.5)*32;
      const distance=Math.hypot(x-state.px,y-state.py),step=Math.min(distance,budget);
      if(distance>1e-9){state.px+=(x-state.px)/distance*step;state.py+=(y-state.py)/distance*step;}
      budget-=step;used+=step;
      if(distance<=step+1e-9){state.px=x;state.py=y;state.nextPoint++;}
      else break;
    }
    state.travelled+=used;state.movingTime+=used/state.navSpeed;
  }

  const RESOURCE13_ITEMS = Object.freeze({
    martelo:Object.freeze({name:"Martelo a Vapor",base:65,vapor:25}),
    pistola:Object.freeze({name:"Pistola de Éter",base:28,vapor:8}),
    lamina:Object.freeze({name:"Lâmina de Cobre",base:42,vapor:14})
  });

  function resource13Validate(value) {
    const bad=message=>({ok:false,message});
    const record=v=>v!==null && typeof v === "object" && !Array.isArray(v);
    const integer=(v,min,max)=>Number.isInteger(v)&&v>=min&&v<=max;
    if(!record(value))return bad("Raiz precisa ser um objeto.");
    if(!integer(value.version,1,1))return bad("Versão não suportada; este modelo só lê a versão 1.");
    if(!integer(value.gold,0,999))return bad("Ouro deve ser inteiro entre 0 e 999.");
    if(!Array.isArray(value.inventory)||value.inventory.length>3)return bad("Inventário deve ser uma lista com até três tipos.");
    const seen=new Set(),inventory=[];
    for(const entry of value.inventory) {
      if(!record(entry))return bad("Entrada do inventário deve ser um objeto.");
      if(typeof entry.id!=="string"||!Object.prototype.hasOwnProperty.call(RESOURCE13_ITEMS,entry.id)||seen.has(entry.id))return bad("ID desconhecido ou repetido.");
      if(!integer(entry.quantity,1,99))return bad("Quantidade deve estar entre 1 e 99.");
      if(!integer(entry.level,1,10))return bad("Nível deve estar entre 1 e 10.");
      seen.add(entry.id);inventory.push({id:entry.id,quantity:entry.quantity,level:entry.level});
    }
    return {ok:true,message:"Dados validados.",state:{version:1,gold:value.gold,inventory}};
  }

  function resource13Parse(text) {
    let bytes=0;
    for(const char of text){const cp=char.codePointAt(0);bytes+=cp<128?1:cp<2048?2:cp<65536?3:4;if(bytes>16384)return {ok:false,message:"Texto excede 16 KiB."};}
    try{return resource13Validate(JSON.parse(text));}
    catch{return {ok:false,message:"JSON inválido; confira chaves, aspas e vírgulas."};}
  }

  function shader14Source(u,v) {
    if(u<.2||u>.8||v<.2||v>.8)return [0,0,0,0];
    if(Math.hypot(u-.5,v-.5)<.1125)return [80,180,190,.65];
    if(u<.24||u>.76||v<.24||v>.76)return [244,208,136,1];
    return [200,125,50,1];
  }
  function shader14Sample(u,v,amplitude,frequency,time,speed,flash) {
    const sampleU=u+amplitude*Math.sin(v*frequency+time*speed);
    const original=shader14Source(sampleU,v);
    return {sampleU,rgba:[...original.slice(0,3).map(c=>c+(255-c)*flash),original[3]]};
  }
  function shader14ResetParticles(state) {
    state.particles=[];state.emitting=false;state.nextBirth=state.shaderTime+state.lifetime/state.amount;
    state.emitted=0;state.burstActive=false;
  }
  function shader14Burst(state) {
    shader14ResetParticles(state);state.bursts++;
    for(let i=0;i<state.amount;i++)state.particles.push({birth:state.shaderTime,index:i});
    state.emitted=state.amount;state.burstActive=true;
  }
  function shader14Advance(state,dt) {
    state.shaderTime+=dt;state.flashAge=Math.min(.4,state.flashAge+dt);
    if(state.emitterMode==="continuous" && state.emitting) {
      const interval=state.lifetime/state.amount;
      while(state.nextBirth<=state.shaderTime+1e-9) {
        state.particles.push({birth:state.nextBirth,index:state.emitted++});state.nextBirth+=interval;
      }
    }
    state.particles=state.particles.filter(p=>state.shaderTime-p.birth<state.lifetime-1e-9);
    if(state.burstActive && !state.particles.length){state.burstActive=false;state.finished++;}
  }
  const shader14Surfaces=new WeakMap();
  function shader14DrawTile(ctx,id,state,x,y,size,flash,amplitude) {
    let cache=shader14Surfaces.get(ctx);if(!cache){cache={};shader14Surfaces.set(ctx,cache);}
    let tile=cache[id];if(!tile){const surface=document.createElement("canvas");surface.width=64;surface.height=64;tile=cache[id]={surface,context:surface.getContext("2d")};}
    const key=[flash,amplitude,state.frequency,amplitude?state.shaderTime:0,state.speed].join("/");
    if(key!==tile.key) {
      const raster=tile.context.createImageData(64,64);
      for(let row=0;row<64;row++)for(let col=0;col<64;col++){
        const value=shader14Sample((col+.5)/64,(row+.5)/64,amplitude,state.frequency,state.shaderTime,state.speed,flash).rgba;
        const offset=(row*64+col)*4;for(let c=0;c<3;c++)raster.data[offset+c]=Math.round(value[c]);raster.data[offset+3]=Math.round(value[3]*255);
      }
      tile.context.putImageData(raster,0,0);tile.key=key;
    }
    ctx.imageSmoothingEnabled=false;ctx.drawImage(tile.surface,x,y,size,size);
  }

  function renderSimulation(type, ctx, w, h, dt, state, telemetry) {
    switch (type) {
      case "scene_tree": {
        ctx.save();
        const viewScale = Math.min(w / 650, h / 520);
        ctx.translate((w - 650 * viewScale) / 2, (h - 520 * viewScale) / 2);
        ctx.scale(viewScale, viewScale);
        ctx.translate(65, 110);
        const px = state.px;
        const py = state.py;
        const rad = (state.prot * Math.PI) / 180;

        // Desenha Nó Pai
        drawGear(ctx, px, py, 34, 10, rad, "#b85d35", "#f4d088");
        ctx.fillStyle = "#f4d088";
        ctx.font = "bold 12px JetBrains Mono";
        ctx.fillText("Pai (Node2D)", px - 42, py - 44);

        let firstChildGlobal = { x: px, y: py };
        for (let i = 0; i < state.childrenCount; i++) {
          const a = rad + (i * Math.PI) / 2;
          const cx = px + Math.cos(a) * state.cdist;
          const cy = py + Math.sin(a) * state.cdist;
          if (i === 0) firstChildGlobal = { x: cx, y: cy };

          ctx.strokeStyle = "#5ce1e6";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(cx, cy);
          ctx.stroke();

          drawGear(ctx, cx, cy, 18, 8, rad, "#3a7d8c", "#5ce1e6");
          ctx.fillStyle = "#5ce1e6";
          ctx.fillText(`Filho_${i + 1}`, cx - 24, cy + 32);
        }

        ctx.restore();
        telemetry.innerHTML = `
          <div>Modelo: escala do pai (1, 1); filhos com rotação local 0°.</div>
          <div>Pai global_position: (${px}, ${py})</div>
          <div>Filho_1 position (local): (${state.cdist}, 0)</div>
          <div>Filho_1 global_position: (${Math.round(firstChildGlobal.x)}, ${Math.round(firstChildGlobal.y)})</div>
        `;
        break;
      }

      case "vectors_2d": {
        const rawLen = Math.hypot(state.ix, state.iy);
        const divisor = state.mode === "norm" && rawLen > 0 ? rawLen : state.mode === "limit" ? Math.max(1, rawLen) : 1;
        const vx = state.ix / divisor, vy = state.iy / divisor;
        const finalLen = Math.hypot(vx, vy);
        const speed = 250;
        const dx = vx * speed * state.elapsed, dy = vy * speed * state.elapsed;
        const fmt = n => (Math.abs(n) < 0.0005 ? 0 : n).toFixed(3);
        const label = (text, x, y, color = "#d4a359") => {
          ctx.fillStyle = color; ctx.font = "12px JetBrains Mono";
          ctx.textAlign = "center"; ctx.fillText(text, x, y); ctx.textAlign = "left";
        };
        const arrow = (x, y, ax, ay, scale, color) => {
          const ex = x + ax * scale, ey = y + ay * scale;
          ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 3;
          if (Math.hypot(ax, ay) < 1e-10) {
            ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
            return;
          }
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke();
          const angle = Math.atan2(ay, ax);
          ctx.beginPath(); ctx.moveTo(ex, ey);
          ctx.lineTo(ex - 9 * Math.cos(angle - 0.45), ey - 9 * Math.sin(angle - 0.45));
          ctx.lineTo(ex - 9 * Math.cos(angle + 0.45), ey - 9 * Math.sin(angle + 0.45));
          ctx.closePath(); ctx.fill();
        };
        const radius = Math.min(60, w * 0.17);
        const vectorDiagram = (cx, ax, ay, color, heading, length) => {
          const cy = 130;
          label(heading, cx, 26, color);
          label(`|v| = ${fmt(length)}`, cx, 48, color);
          ctx.strokeStyle = "rgba(212,163,89,0.5)"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(cx - radius - 8, cy); ctx.lineTo(cx + radius + 8, cy);
          ctx.moveTo(cx, cy - radius - 8); ctx.lineTo(cx, cy + radius + 8); ctx.stroke();
          ctx.setLineDash([4,4]); ctx.strokeStyle = "rgba(212,163,89,0.55)";
          ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
          arrow(cx, cy, ax, ay, radius, color);
          label("+X →   +Y ↓", cx, 218);
        };
        vectorDiagram(w * 0.27, state.ix, state.iy, "#ffaa33", "Entrada", rawLen);
        vectorDiagram(w * 0.73, vx, vy, "#5ce1e6", "Tratado", finalLen);
        label("Círculos: comprimento 1", w / 2, 244);

        const ox = w / 2, oy = 340, sceneScale = 0.25;
        label(`Posição após ${state.elapsed.toFixed(1)} s`, ox, 275, "#f4d088");
        ctx.strokeStyle = "rgba(212,163,89,0.45)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(ox - 78, oy); ctx.lineTo(ox + 78, oy);
        ctx.moveTo(ox, oy - 68); ctx.lineTo(ox, oy + 68); ctx.stroke();
        ctx.strokeStyle = "#f4d088";
        ctx.beginPath(); ctx.arc(ox, oy, 6, 0, Math.PI * 2); ctx.stroke();
        arrow(ox, oy, dx, dy, sceneScale, "#5ce1e6");
        drawGear(ctx, ox + dx * sceneScale, oy + dy * sceneScale, 10, 8, 0, "#3a7d8c", "#5ce1e6");
        label("Origem: P = (0, 0)", w / 2, 423);
        label("Desenho: 1 unidade = 0.25 px", w / 2, 443);
        telemetry.innerHTML = `
          <div>Entrada: (${fmt(state.ix)}, ${fmt(state.iy)})</div>
          <div>Comprimento bruto: ${fmt(rawLen)}</div>
          <div>Tratado: (${fmt(vx)}, ${fmt(vy)})</div>
          <div>Comprimento tratado: ${fmt(finalLen)}</div>
          <div>Fator fixo: 250 unidades/s</div>
          <div>Velocidade calculada: (${fmt(vx * speed)}, ${fmt(vy * speed)}) unidades/s</div>
          <div>Rapidez calculada: ${fmt(finalLen * speed)} unidades/s</div>
          <div>Intervalo: ${state.elapsed.toFixed(1)} s</div>
          <div>Deslocamento: (${fmt(dx)}, ${fmt(dy)}) unidades</div>
          <div>Distância: ${fmt(Math.hypot(dx, dy))} unidades</div>
          <div>Posição final: (${fmt(dx)}, ${fmt(dy)})</div>
        `;
        break;
      }

      case "delta_fps": {
        const fps = parseInt(state.fps, 10);
        const stepDelta = 1 / fps;
        state.accum += dt;
        while (state.accum + 1e-9 >= stepDelta) {
          state.accum = Math.max(0, state.accum - stepDelta);
          // Distâncias acumuladas no tempo do modelo, preservadas nas voltas.
          state.elapsedSim += stepDelta;
          state.totalWith += 120 * stepDelta;
          state.totalWithout += 2;
          // Movimento calculado por atualização simulada.
          state.xWithDelta += 120 * stepDelta;
          // Sem delta: 2 pixels por frame (depende do FPS!)
          state.xNoDelta += 2.0;

          const trackLength = w - 90;
          state.xWithDelta = 40 + state.totalWith % trackLength;
          state.xNoDelta = 40 + state.totalWithout % trackLength;
        }

        // Trilhos
        ctx.strokeStyle = "#4d351b";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(20, 105); ctx.lineTo(w - 20, 105);
        ctx.moveTo(20, 215); ctx.lineTo(w - 20, 215);
        ctx.stroke();

        ctx.font = "bold 12px JetBrains Mono";
        ctx.fillStyle = "#4cd97b";
        ctx.fillText("1. Com delta: 120 unidades/s no modelo", 30, 62);
        drawGear(ctx, state.xWithDelta, 90, 20, 8, state.xWithDelta * 0.05, "#248f48", "#a9ffca");

        ctx.fillStyle = "#ffaa33";
        ctx.fillText("2. Sem delta: 2 unidades por atualização", 30, 172);
        drawGear(ctx, state.xNoDelta, 200, 20, 8, state.xNoDelta * 0.05, "#b85d35", "#ffaa33");

        telemetry.innerHTML = `
          <div>Tempo simulado: ${state.elapsedSim.toFixed(2)} s</div>
          <div>Distância com delta: ${state.totalWith.toFixed(2)} unidades</div>
          <div>Distância sem delta: ${state.totalWithout.toFixed(2)} unidades</div>
          <div>As voltas preservam o deslocamento excedente.</div>
          <div>FPS simulado: ${fps} | delta = ${stepDelta.toFixed(4)}s</div>
          <div>Rapidez com delta: 120 unidades/s</div>
          <div>Rapidez sem delta: ${Math.round(2 * fps)} unidades/s</div>
        `;
        break;
      }

      case "physics_bodies_2d": {
        const floorY = h - 42;
        // StaticBody2D Chão
        ctx.fillStyle = "#3d2714";
        ctx.strokeStyle = "#d4a359";
        ctx.lineWidth = 2;
        ctx.fillRect(20, floorY, w - 40, 26);
        ctx.strokeRect(20, floorY, w - 40, 26);
        ctx.fillStyle = "#f4d088";
        ctx.font = "11px JetBrains Mono";
        ctx.fillText("StaticBody2D (Chão Sólido Fixo)", 32, floorY + 17);

        // Integração reduzida em subpassos; não é a engine de física da Godot.
        const steps = Math.max(1, Math.ceil(dt * 240));
        const step = dt / steps;
        for (let i = 0; i < steps; i++) {
          state.charVy += state.grav * step;
          state.charY += state.charVy * step;
          state.charX += state.charDir * state.speed * step;
          if (state.charX > 180) { state.charX = 360 - state.charX; state.charDir = -1; }
          if (state.charX < 60) { state.charX = 120 - state.charX; state.charDir = 1; }
          if (state.charY >= floorY - 22 && state.charVy >= 0) { state.charY = floorY - 22; state.charVy = 0; }
          for (const b of state.rigids) {
            b.vy += state.grav * step; b.x += b.vx * step; b.y += b.vy * step;
            if (b.y >= floorY - b.r && b.vy >= 0) { b.y = floorY - b.r; b.vy = Math.abs(b.vy) < 12 ? 0 : -Math.abs(b.vy) * 0.68; }
            if (b.x < 40 + b.r) { b.x = 40 + b.r; b.vx = Math.abs(b.vx) * 0.8; }
            if (b.x > w - 40 - b.r) { b.x = w - 40 - b.r; b.vx = -Math.abs(b.vx) * 0.8; }
          }
        }
        const onFloor = state.charY >= floorY - 22 - 1e-6 && state.charVy >= 0;

        // Desenha CharacterBody2D
        ctx.fillStyle = "#5ce1e6";
        ctx.fillRect(state.charX - 14, state.charY - 22, 28, 44);
        ctx.strokeStyle = "#ffffff";
        ctx.strokeRect(state.charX - 14, state.charY - 22, 28, 44);
        ctx.fillText("CharacterBody2D", state.charX - 42, state.charY - 30);

        // Círculos: somente contato com chão e limites; sem interação entre objetos.
        state.rigids.forEach(b => {
          ctx.fillStyle = "#b85d35"; ctx.strokeStyle = "#f4d088";
          ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        });

        telemetry.innerHTML = `
          <div>Velocidade horizontal: ${state.speed} unidades/s</div>
          <div>Apoiado no chão (modelo): <strong>${onFloor}</strong></div>
          <div>Velocidade vertical (modelo): ${Math.round(state.charVy)} unidades/s</div>
          <div>Círculos ativos: ${state.rigids.length}</div>
        `;
        break;
      }

      case "layers_masks": {
        ctx.save();
        const scale = Math.min(w / 480, h / 290);
        ctx.translate((w - 480 * scale) / 2, (h - 290 * scale) / 2);
        ctx.scale(scale, scale);
        ctx.font = "12px JetBrains Mono"; ctx.fillStyle = "#f4d088";
        ctx.fillText("Corpo atravessa; sensor apenas observa", 25, 30);
        ctx.fillStyle = state.sensorDetected ? "rgba(92,225,230,.22)" : "rgba(212,163,89,.12)";
        ctx.fillRect(250,85,100,120);
        ctx.strokeStyle = state.sensorDetected ? "#5ce1e6" : "#d4a359";
        ctx.setLineDash([6,4]);ctx.strokeRect(250,85,100,120);ctx.setLineDash([]);
        ctx.fillStyle = "#f4d088";ctx.fillText("Sensor Area2D",250,65);
        ctx.fillText("X: 250 a 350",250,228);
        ctx.strokeStyle = "#6e4720"; ctx.beginPath();ctx.moveTo(20,145);ctx.lineTo(460,145);ctx.stroke();
        ctx.fillStyle = "#5ce1e6";ctx.beginPath();ctx.arc(state.bodyX,145,12,0,Math.PI*2);ctx.fill();
        ctx.fillText(`Centro X = ${state.bodyX}`,25,260);
        ctx.fillText("Raio do corpo = 12",260,260);
        ctx.restore();
        const layerNumber = Math.log2(Number(state.bodyLayer)) + 1;
        telemetry.innerHTML = `
          <div>Layer do corpo: ${layerNumber} (bit ${state.bodyLayer})</div>
          <div>Mask do sensor (inteiro): ${state.sensorMask}</div>
          <div>Layer do sensor: nenhuma</div>
          <div>Sobreposição geométrica: ${state.geometricOverlap ? "SIM" : "NÃO"}</div>
          <div>Filtro permite: ${state.filterMatch ? "SIM" : "NÃO"}</div>
          <div>Monitoring: ${state.monitoring === "on" ? "ligado" : "desligado"}</div>
          <div>Detecção no modelo: <strong>${state.sensorDetected ? "SIM" : "NÃO"}</strong></div>
          <div>Entradas: ${state.enters} · Saídas: ${state.exits}</div>
          <div>Última transição: ${state.lastEvent}</div>
          <div>O contato apenas tangente não conta neste modelo.</div>
        `;
        break;
      }

      case "camera_parallax_2d": {
        if (state.follow === "instant") state.camX = state.playerX;
        else state.camX += (state.playerX - state.camX) * (1 - Math.exp(-state.smooth * dt));
        if (state.anim === "run") state.animTime += dt;
        if (state.shakeMode === "off") state.shake = 0;
        state.shake *= Math.exp(-8 * dt); state.shakeTime += dt;
        if (state.shake < 0.05) state.shake = 0;
        const sx = state.shake * Math.sin(state.shakeTime * 41);
        const sy = state.shake * Math.cos(state.shakeTime * 53);
        const frame = state.anim === "run" ? Math.floor(state.animTime * state.animFPS + 1e-9) % 4 : 0;
        const viewScale = Math.min(w / 480, h / 360);
        const unitScale = 0.5;
        const screenX = 240 + (state.playerX - state.camX) * unitScale;
        const drawPiece = (x,y,size,index,flip) => {
          ctx.save(); ctx.translate(x,y); ctx.scale(flip ? -size : size,size);
          ctx.fillStyle="#c88c42";ctx.strokeStyle="#f4d088";ctx.lineWidth=1;
          ctx.beginPath();ctx.moveTo(-14,-10);ctx.lineTo(10,-10);ctx.lineTo(20,0);ctx.lineTo(10,10);ctx.lineTo(-14,10);ctx.closePath();ctx.fill();ctx.stroke();
          ctx.fillStyle="#21170d";ctx.beginPath();ctx.arc(-2,0,7,0,Math.PI*2);ctx.fill();
          const angle=index*Math.PI/2;ctx.strokeStyle="#5ce1e6";ctx.lineWidth=3;
          ctx.beginPath();ctx.moveTo(-2,0);ctx.lineTo(-2+Math.sin(angle)*6,-Math.cos(angle)*6);ctx.stroke();ctx.restore();
        };
        ctx.save();ctx.translate((w-480*viewScale)/2,(h-360*viewScale)/2);ctx.scale(viewScale,viewScale);
        ctx.save();ctx.beginPath();ctx.rect(16,40,448,214);ctx.clip();ctx.translate(sx,sy);
        const layers=[{factor:.2,y:80,height:145,color:"#483623",period:170},{factor:.5,y:145,height:90,color:"#785133",period:140},{factor:1,y:240,height:14,color:"#b07a40",period:80}];
        for (const layer of layers) {
          ctx.fillStyle=layer.color;
          for(let i=-12;i<20;i++) {
            const x=240+(i*layer.period-state.camX*layer.factor)*unitScale;
            ctx.fillRect(x,layer.y,layer.factor===1?26:42,layer.height);
          }
        }
        drawPiece(screenX,220,1,frame,state.facing==="left");ctx.restore();
        ctx.strokeStyle="#5ce1e6";ctx.lineWidth=2;ctx.strokeRect(16,40,448,214);
        ctx.fillStyle="#f4d088";ctx.font="12px JetBrains Mono";ctx.fillText("Vista: mesma escala para alvo e camadas",18,24);
        ctx.fillText("Quadros vetoriais (modelo)",18,282);
        for(let i=0;i<4;i++) {drawPiece(110+i*90,314,.7,i,state.facing==="left");ctx.fillStyle=i===frame?"#5ce1e6":"#b79c75";ctx.fillText(`${i===frame?">":" "}${i}`,100+i*90,345);}
        ctx.restore();
        const shift=state.camX-220;
        telemetry.innerHTML=`
          <div>Alvo no mundo X: ${state.playerX.toFixed(2)}</div>
          <div>Centro da vista X: ${state.camX.toFixed(2)}</div>
          <div>Alvo na vista X: ${screenX.toFixed(2)} px (antes do tremor)</div>
          <div>Escala interna: 0.5 px/unidade</div>
          <div>Deslocamentos desde câmera X = 220:</div>
          <div>Fundo 0.2: ${(-shift*.2).toFixed(2)} unidades</div>
          <div>Meio 0.5: ${(-shift*.5).toFixed(2)} unidades</div>
          <div>Frente 1.0: ${(-shift).toFixed(2)} unidades</div>
          <div>Quadro: ${frame} de 0–3 · ${state.animFPS} FPS</div>
          <div>Amplitude de tremor: ${state.shake.toFixed(3)} px</div>
          <div>Offset da vista: (${sx.toFixed(3)}, ${sy.toFixed(3)}) px</div>`;
        break;
      }

      case "signals_bus": {
        state.pulse = Math.max(0, state.pulse - dt * 1.4);
        const srcX = 60, srcY = 145, boxX = w - 180;
        const targets = [
          { key: "connDoor", name: "Porta de bronze", y: 65 },
          { key: "connLight", name: "Luz de alerta", y: 145 },
          { key: "connHud", name: "Manômetro HUD", y: 225 }
        ];
        ctx.font = "12px JetBrains Mono";
        targets.forEach(target => {
          const connected = state[target.key] === "on";
          const received = state.receivers[target.key];
          const highlighted = state.pulse > 0 && state.lastEmission?.recipients.includes(target.key);
          ctx.strokeStyle = connected ? "#d4a359" : "#655440";
          ctx.lineWidth = connected ? 3 : 1;
          ctx.setLineDash(connected ? [] : [5, 5]);
          ctx.beginPath(); ctx.moveTo(srcX + 32, srcY); ctx.lineTo(boxX, target.y); ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = "#1c140d";
          ctx.fillRect(boxX, target.y - 30, 160, 60);
          ctx.strokeStyle = highlighted ? "#5ce1e6" : "#d4a359";
          ctx.lineWidth = highlighted ? 3 : 1;
          ctx.strokeRect(boxX, target.y - 30, 160, 60);
          ctx.fillStyle = "#f4d088";
          ctx.fillText(target.name, boxX + 10, target.y - 10);
          const result = received.value === null ? "Sem recebimento" : target.key === "connDoor" ? (received.value >= 70 ? "Aberta" : "Fechada") : target.key === "connLight" ? (received.value >= 70 ? "Acesa" : "Apagada") : `Valor: ${received.value}`;
          ctx.fillStyle = "#5ce1e6";
          ctx.fillText(result, boxX + 10, target.y + 12);
        });
        drawGear(ctx, srcX, srcY, 32, 9, state.pulse * 3, "#b85d35", "#5ce1e6");
        ctx.fillStyle = "#5ce1e6";
        ctx.fillText("Emissor", srcX - 28, srcY + 55);
        ctx.fillStyle = "#f4d088";
        ctx.fillText(`Próximo: ${state.pressure}`, 20, 28);
        const last = state.lastEmission;
        telemetry.innerHTML = `
          <div>Emissões: <strong>${state.emissions}</strong> · Conectados agora: ${targets.filter(target => state[target.key] === "on").length}/3</div>
          <div>Última emissão: <strong>${last ? `#${last.id} · valor ${last.value} · ${last.recipients.length} receptor(es)` : "nenhuma"}</strong></div>
          ${targets.map(target => `<div>${target.name}: <strong>${state.receivers[target.key].count} recebimento(s) · último valor ${state.receivers[target.key].value ?? "—"}</strong></div>`).join("")}
        `;
        break;
      }

      case "tilemap_grid": {
        const grid = tileGridGeometry(w, h);
        const colors = ["#17130f", "#8c6229", "#296e73", "#a43d2c"];
        const names = ["Vazio", "bronze", "oleo", "vapor"];
        const c = Math.floor(state.sampleX / 32), r = Math.floor(state.sampleY / 32);
        const inside = c >= 0 && c < 12 && r >= 0 && r < 7;
        for (let row = 0; row < 7; row++) for (let col = 0; col < 12; col++) {
          const value = state.grid[row][col], x = grid.x + col * grid.cell, y = grid.y + row * grid.cell;
          ctx.fillStyle = colors[value]; ctx.fillRect(x, y, grid.cell - 2, grid.cell - 2);
          ctx.strokeStyle = c === col && r === row ? "#5ce1e6" : "#775a35";
          ctx.lineWidth = c === col && r === row ? 3 : 1;
          ctx.strokeRect(x, y, grid.cell - 2, grid.cell - 2);
          ctx.font = "12px JetBrains Mono"; ctx.fillStyle = value ? "#fff1d0" : "#77654d";
          ctx.fillText(value ? ["", "B", "O", "V"][value] : "·", x + grid.cell / 2 - 4, y + grid.cell / 2 + 4);
        }
        ctx.font = "11px JetBrains Mono"; ctx.fillStyle = "#f4d088";
        for (let col = 0; col < 12; col++) ctx.fillText(String(col), grid.x + grid.cell * (col + 0.5) - 4, grid.y - 7);
        for (let row = 0; row < 7; row++) ctx.fillText(String(row), grid.x - 16, grid.y + grid.cell * (row + 0.5) + 4);
        const value = inside ? state.grid[r][c] : 0;
        telemetry.innerHTML = `
          <div>Ponto local: <strong>(${state.sampleX}, ${state.sampleY})</strong> · ponto global: (${state.sampleX + state.mapX}, ${state.sampleY + state.mapY})</div>
          <div>local_to_map: <strong>Vector2i(${c}, ${r})</strong>${inside ? "" : " · fora da grade visível"}</div>
          <div>map_to_local · centro: <strong>(${c * 32 + 16}, ${r * 32 + 16})</strong> · centro global: (${c * 32 + 16 + state.mapX}, ${r * 32 + 16 + state.mapY})</div>
          <div>Tile: <strong>${names[value]}</strong> · source_id: ${value ? 0 : -1} · atlas: ${value ? `(${value - 1}, 0)` : "—"} · alternativa: ${value ? 0 : "—"}</div>
          <div>TileData: <strong>${value ? `tipo_piso = ${names[value]}; dano = ${value === 3 ? 15 : 0}` : "null · sem dados"}</strong></div>
        `;
        break;
      }

      case "tween_raycast_2d": {
        if (state.tweenRunning) {
          state.tweenElapsed = Math.min(state.activeDuration, state.tweenElapsed + dt);
          if (state.tweenElapsed >= state.activeDuration - 1e-9) { state.tweenElapsed = state.activeDuration; state.tweenRunning = false; }
        }
        const p = state.tweenStarted ? Math.min(1, state.tweenElapsed / state.activeDuration) : 0;
        // Normalized EASE_OUT equations; endpoints are explicit to avoid roundoff.
        let eased = p;
        if (p > 0 && p < 1) {
          if (state.activeCurve === "quad") eased = 1 - (1 - p) ** 2;
          else if (state.activeCurve === "sine") eased = Math.sin(p * Math.PI / 2);
          else if (state.activeCurve === "back") { const q = p - 1; eased = 1 + 2.70158 * q ** 3 + 1.70158 * q ** 2; }
        }
        const tweenX = 70 + 280 * eased;
        const rad = state.rayAngle * Math.PI / 180, dx = Math.cos(rad), dy = Math.sin(rad);
        const distanceToFace = 230 / dx, faceY = 250 + distanceToFace * dy;
        const hitsWall = state.rayMask === "1" && distanceToFace <= state.rayLength + 1e-9 && faceY >= 190 - 1e-9 && faceY <= 320 + 1e-9;
        const endX = hitsWall ? 300 : 70 + dx * state.rayLength;
        const endY = hitsWall ? faceY : 250 + dy * state.rayLength;
        const scale = Math.min(w / 480, h / 360);
        ctx.save(); ctx.translate((w - 480 * scale) / 2, (h - 360 * scale) / 2); ctx.scale(scale, scale);
        ctx.font = `${Math.min(18, 12 / scale)}px JetBrains Mono`; ctx.fillStyle = "#f4d088";
        ctx.fillText("Tween · EASE_OUT", 30, 25);
        ctx.strokeStyle = "#806339"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(70, 80); ctx.lineTo(350, 80); ctx.stroke();
        for (const x of [70,350]) {ctx.beginPath();ctx.moveTo(x,65);ctx.lineTo(x,95);ctx.stroke();ctx.fillText(String(x),x-12,115);}
        drawGear(ctx, tweenX, 80, 18, 8, 0, "#c87d32", "#5ce1e6");
        ctx.fillStyle = "#f4d088"; ctx.fillText("Raio · parede na camada 1", 25, 160);
        ctx.fillStyle = "#593d20"; ctx.fillRect(300,190,28,130);
        ctx.strokeStyle = "#f4d088"; ctx.strokeRect(300,190,28,130);
        ctx.strokeStyle = hitsWall ? "#ff795d" : "#5ce1e6"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(70,250);ctx.lineTo(endX,endY);ctx.stroke();
        drawGear(ctx,70,250,14,6,rad,"#2b1d12","#5ce1e6");
        if (hitsWall) {
          ctx.fillStyle="#ffaa33";ctx.beginPath();ctx.arc(endX,endY,5,0,Math.PI*2);ctx.fill();
          ctx.strokeStyle="#5ce1e6";ctx.beginPath();ctx.moveTo(endX,endY);ctx.lineTo(endX-30,endY);ctx.lineTo(endX-23,endY-5);ctx.moveTo(endX-30,endY);ctx.lineTo(endX-23,endY+5);ctx.stroke();
        }
        ctx.restore();
        telemetry.innerHTML = `
          <div>Tween: <strong>${!state.tweenStarted ? "aguardando disparo" : state.tweenRunning ? "em execução" : "concluído"}</strong> · ${state.activeCurve} / EASE_OUT</div>
          <div>Tempo simulado: <strong>${state.tweenElapsed.toFixed(3)} / ${state.activeDuration.toFixed(1)} s</strong> · progresso: ${(p * 100).toFixed(1)}%</div>
          <div>Posição X: <strong>${tweenX.toFixed(3)}</strong> · interpolação: ${eased.toFixed(4)}</div>
          <div>Impacto aceito: <strong>${hitsWall}</strong> · alcance: ${state.rayLength} · máscara: ${state.rayMask}</div>
          <div>Ponto do modelo: <strong>${hitsWall ? `(${endX.toFixed(2)}, ${endY.toFixed(2)})` : "sem impacto"}</strong> · distância: ${hitsWall ? distanceToFace.toFixed(2) : "—"}</div>
          <div>Normal: <strong>${hitsWall ? "Vector2(-1, 0)" : "sem impacto"}</strong></div>
        `;
        break;
      }

      case "lighting_2d": {
        const energy=state.energy*(state.lightFlicker==="on"?1+0.1*Math.sin(2*Math.PI*1.5*state.t):1);
        const probe=light2dSample(280,170,state,energy);
        let cache=light2dRasterCache.get(ctx);
        if(!cache){const surface=document.createElement("canvas");surface.width=240;surface.height=160;cache={surface,context:surface.getContext("2d"),key:null};light2dRasterCache.set(ctx,cache);}
        const key=[state.lx,state.ly,energy,state.lightRadius,state.ambient,state.lightShadows,state.lightCamera].join("|");
        if(cache.key!==key){
          const image=cache.context.createImageData(240,160);
          for(let row=0;row<160;row++)for(let col=0;col<240;col++){
            const x=(col+0.5)*2+state.lightCamera,y=(row+0.5)*2;
            const light=light2dSample(x,y,state,energy);
            const grid=((x%32+32)%32<1.5 || y%32<1.5)?0.65:1;
            const index=(row*240+col)*4;
            for(let channel=0;channel<3;channel++)image.data[index+channel]=Math.round(Math.min(255,[118,89,57][channel]*grid*(state.ambient+light.direct*1.8*[1,0.86,0.6][channel])));
            image.data[index+3]=255;
          }
          cache.context.putImageData(image,0,0);cache.key=key;
        }
        const scale=Math.min(w/480,h/360);
        ctx.save();ctx.translate((w-480*scale)/2,(h-360*scale)/2);ctx.scale(scale,scale);
        ctx.save();ctx.beginPath();ctx.rect(0,0,480,320);ctx.clip();
        ctx.drawImage(cache.surface,0,0,480,320);
        for(const pillar of light2dPillars){
          ctx.fillStyle="#382b1b";ctx.strokeStyle="#c69951";ctx.lineWidth=2;ctx.beginPath();ctx.arc(pillar.x-state.lightCamera,pillar.y,pillar.r,0,Math.PI*2);ctx.fill();ctx.stroke();
        }
        const lx=state.lx-state.lightCamera;
        ctx.fillStyle="#fff2b3";ctx.beginPath();ctx.arc(lx,state.ly,6,0,Math.PI*2);ctx.fill();
        const probeX=280-state.lightCamera;
        ctx.strokeStyle=probe.blocked?"#ff8c6b":"#5ce1e6";ctx.lineWidth=2;ctx.beginPath();ctx.arc(probeX,170,6,0,Math.PI*2);ctx.stroke();
        ctx.font=`${Math.min(18,12/scale)}px JetBrains Mono`;ctx.fillStyle="#f1d6a4";ctx.fillText("Sonda",probeX-20,150);
        // This overlay is deliberately drawn after the world, in fixed view coordinates.
        ctx.fillStyle="#11100d";ctx.fillRect(12,12,235,46);ctx.strokeStyle="#5ce1e6";ctx.strokeRect(12,12,235,46);
        ctx.fillStyle="#5ce1e6";ctx.fillText("HUD · fixo na vista",22,40);
        ctx.restore();
        ctx.fillStyle="#f4d088";ctx.font=`${Math.min(18,12/scale)}px JetBrains Mono`;ctx.fillText("Obstáculos opacos · modelo 2D",15,345);
        ctx.restore();
        telemetry.innerHTML=`
          <div>Energia efetiva: <strong>${energy.toFixed(3)}</strong> · raio: ${state.lightRadius} u</div>
          <div>Sonda (280, 170): <strong>${probe.blocked?"caminho bloqueado":"caminho livre"}</strong> · distância: ${probe.distance.toFixed(2)}</div>
          <div>Contribuição direta na sonda: <strong>${probe.direct.toFixed(4)}</strong> · ambiente: <strong>${state.ambient.toFixed(1)}</strong></div>
          <div>Sonda na vista X: <strong>${280-state.lightCamera}</strong> · HUD na vista: <strong>(12, 12)</strong></div>
          <div>${state.lightShadows==="on" && light2dPillars.some(p=>(state.lx-p.x)**2+(state.ly-p.y)**2<=p.r*p.r)?"Luz dentro de obstáculo: contribuição bloqueada para fora. Reposicione a luz.":"Sombras removem só a contribuição direta; o ambiente permanece."}</div>
        `;
        break;
      }

      case "fsm_state_machine": {
        if(dt>0) fsm11Advance(state,dt);
        const geometry=fsm11Geometry(state);
        const filter=state.fsmMask !== "on" ? "máscara vazia" : state.fsmReceiver === "self" ? "próprio autor" : state.fsmReceiver === "ally" ? "mesma equipe" : "filtros aceitos";
        const scale=Math.min(w/640,h/300);
        ctx.save();ctx.translate((w-640*scale)/2,0);ctx.scale(scale,scale);
        ctx.fillStyle="#130d08";ctx.fillRect(0,0,640,300);
        const font = size => `${Math.max(size, 11 / scale)}px monospace`;
        ctx.font=font(14);ctx.textAlign="center";
        const nodes=[{id:"PARADO",x:110},{id:"ANDANDO",x:320},{id:"ATACANDO",x:530}];
        ctx.strokeStyle="#79572e";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(180,40);ctx.lineTo(250,40);ctx.moveTo(390,40);ctx.lineTo(460,40);ctx.stroke();
        ctx.fillStyle="#d4a359";ctx.fillText("↔",215,34);ctx.fillText("→",425,34);
        nodes.forEach(node=>{const active=state.fsm===node.id;ctx.fillStyle=active?"#193c37":"#25190e";ctx.strokeStyle=active?"#5ce1e6":"#79572e";ctx.fillRect(node.x-68,18,136,44);ctx.strokeRect(node.x-68,18,136,44);ctx.fillStyle=active?"#adffeb":"#e8ce9f";ctx.fillText(scale < .8 ? ({PARADO:"PARADO",ANDANDO:"ANDAR",ATACANDO:"ATAQUE"})[node.id] : node.id,node.x,45);});
        ctx.fillStyle="#bda476";ctx.font=font(12);ctx.fillText(scale < .8 ? "Ataque → PARADO" : "Ataque termina ou é interrompido → PARADO",320,84);
        // World units are shared by the visual and the circle/rectangle test.
        ctx.strokeStyle="#76512b";ctx.beginPath();ctx.moveTo(28,240);ctx.lineTo(612,240);ctx.stroke();
        ctx.fillStyle="#79512a";ctx.fillRect(state.actorX-13,177,26,46);ctx.strokeStyle="#e5bb77";ctx.strokeRect(state.actorX-13,177,26,46);
        ctx.fillStyle="#5ce1e6";ctx.beginPath();ctx.arc(state.actorX+4,189,4,0,Math.PI*2);ctx.fill();
        const rect=geometry.rect,circle=geometry.circle;
        ctx.fillStyle=state.active?"#e293384d":"#a2722922";ctx.strokeStyle=state.active?"#ffae55":"#75552f";
        ctx.fillRect(rect.x,rect.y,rect.w,rect.h);ctx.setLineDash(state.active?[]:[4,4]);ctx.strokeRect(rect.x,rect.y,rect.w,rect.h);ctx.setLineDash([]);
        ctx.fillStyle="#31271a";ctx.strokeStyle="#5ce1e6";ctx.beginPath();ctx.arc(circle.x,circle.y,circle.r,0,Math.PI*2);ctx.fill();ctx.stroke();
        ctx.fillStyle="#1b120a";ctx.fillRect(324,144,72,8);ctx.fillStyle="#75db9b";ctx.fillRect(324,144,72*state.targetHp/100,8);
        ctx.fillStyle="#ead4af";ctx.font=font(14);ctx.fillText(`${state.targetHp}/100`,360,136);
        ctx.fillText(`X ${state.actorX.toFixed(0)}`,state.actorX,289);
        ctx.font=font(12);ctx.fillText(scale < .8 ? "Alvo · r24" : "Alvo X 360 · r 24",360,263);
        ctx.fillStyle="#bd935a";ctx.fillRect(40,100,180,9);ctx.fillStyle="#5ce1e6";ctx.fillRect(40+180*.15/.6,100,180*(.40-.15)/.6,9);
        ctx.strokeStyle="#fff1c5";const tick=40+(state.fsm === "ATACANDO" ? Math.min(.6,state.elapsed) : 0)/.6*180;ctx.beginPath();ctx.moveTo(tick,96);ctx.lineTo(tick,114);ctx.stroke();
        ctx.textAlign="left";ctx.fillStyle="#d1bd96";ctx.font=font(11);ctx.fillText(scale < .8 ? "0 → 0.6 s" : "0 s   janela ativa   0.60 s",40,128);
        ctx.restore();
        telemetry.innerHTML=`<div>Estado: <strong>${state.fsm}</strong> · tempo ${state.elapsed.toFixed(3)} s · janela: <strong>${state.active?"ATIVA":"fechada"}</strong></div>
          <div>Posição X: <strong>${state.actorX.toFixed(2)}</strong> u · distância ao retângulo: <strong>${geometry.distance.toFixed(2)}</strong> u · contato: <strong>${geometry.overlap?"sim":"não"}</strong></div>
          <div>Filtro: <strong>${filter}</strong> · vida: <strong>${state.targetHp}/100</strong> · acertos: <strong>${state.hits}</strong> · mortes: <strong>${state.deaths}</strong></div>
          <div>Ataques iniciados: <strong>${state.attacks}</strong> · transições: <strong>${state.transitions}</strong> · ${state.lastTransition}</div>
          <div>${state.notice}</div>`;
        break;
      }

      case "pathfinding_astar": {
        if(dt>0)nav12Step(state,dt);
        const layout=nav12Layout(w,h),{cell,x,y}=layout;
        const routeKeys=new Set(state.route.map(p=>p.join(",")));
        const screen=point=>({x:x+point[0]*cell,y:y+point[1]*cell});
        ctx.font=`${Math.min(13,Math.max(11,cell*.45))}px monospace`;ctx.textAlign="center";
        for(let row=0;row<7;row++)for(let col=0;col<12;col++) {
          const key=`${col},${row}`,point=screen([col,row]);
          ctx.fillStyle=state.walls[key]?"#79502e":routeKeys.has(key)?"#1c4b46":"#1b140d";
          ctx.fillRect(point.x,point.y,cell-1,cell-1);ctx.strokeStyle="#674623";ctx.lineWidth=1;ctx.strokeRect(point.x,point.y,cell-1,cell-1);
          if(state.walls[key]){ctx.strokeStyle="#d0a163";ctx.beginPath();ctx.moveTo(point.x+3,point.y+3);ctx.lineTo(point.x+cell-4,point.y+cell-4);ctx.stroke();}
        }
        if(state.route.length>1) {
          ctx.strokeStyle="#dbb773";ctx.lineWidth=2;ctx.beginPath();
          state.route.forEach(([col,row],i)=>{const p=screen([col+.5,row+.5]);if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);});ctx.stroke();
        }
        if(state.navView==="cells")state.route.forEach(([col,row],i)=>{const p=screen([col+.5,row+.5]);ctx.fillStyle="#def6ee";ctx.fillText(String(i),p.x,p.y+4);});
        for(const marker of [{col:state.sx,row:state.sy,text:"O",color:"#ebbc72"},{col:state.tx,row:state.ty,text:"D",color:"#5ce1e6"}]){
          const p=screen([marker.col+.5,marker.row+.5]);ctx.fillStyle="#17110a";ctx.fillRect(p.x-cell*.32,p.y-cell*.32,cell*.64,cell*.64);ctx.fillStyle=marker.color;ctx.fillText(marker.text,p.x,p.y+4);
        }
        if(state.navView==="follow") {const p=screen([(state.px-16)/32,(state.py-16)/32]);ctx.fillStyle="#fff4d1";ctx.beginPath();ctx.arc(p.x,p.y,Math.max(3,cell*.15),0,Math.PI*2);ctx.fill();}
        const selected=screen([state.navCol,state.navRow]);ctx.strokeStyle="#fff0bf";ctx.lineWidth=2;ctx.strokeRect(selected.x+1,selected.y+1,cell-3,cell-3);
        ctx.fillStyle="#e3cda7";ctx.font="12px monospace";ctx.fillText("O: origem · D: destino",w/2,y+cell*7+20);
        const steps=state.route.length?state.route.length-1:null,total=steps===null?null:steps*32;
        const arrived=state.route.length>0&&state.nextPoint>=state.route.length;
        const status=steps===null?"SEM ROTA":arrived?"DESTINO ALCANÇADO":state.navView==="follow"?"SEGUINDO ROTA":"ROTA PLANEJADA";
        telemetry.innerHTML=`<div>Estado: <strong>${status}</strong> · origem (${state.sx},${state.sy}) → destino (${state.tx},${state.ty})</div>
          <div>Rota: <strong>${steps===null?"sem caminho":steps+" passos"}</strong> · pontos: <strong>${state.route.length}</strong> · comprimento: <strong>${total===null?"—":total+" u"}</strong></div>
          <div>Percorrido: <strong>${state.travelled.toFixed(2)} u</strong> · restante: <strong>${total===null?"—":Math.max(0,total-state.travelled).toFixed(2)+" u"}</strong> · tempo em movimento: <strong>${state.movingTime.toFixed(3)} s</strong></div>
          <div>Marcador local: <strong>(${state.px.toFixed(2)}, ${state.py.toFixed(2)})</strong> · próximo índice: ${Math.min(state.nextPoint,state.route.length)} · buscas: ${state.plans} · nós expandidos: ${state.expanded}</div>
          <div>Célula selecionada: <strong>(${state.navCol},${state.navRow})</strong> · ${state.notice}</div>`;
        break;
      }

      case "resource_forge": {
        const stacked=w<500,logicalW=stacked?320:640,logicalH=stacked?620:320;
        const scale=Math.min(w/logicalW,h/logicalH);ctx.save();ctx.translate((w-logicalW*scale)/2,(h-logicalH*scale)/2);ctx.scale(scale,scale);
        ctx.fillStyle="#1e150c";ctx.strokeStyle="#b48b4c";ctx.lineWidth=2;ctx.fillRect(14,16,288,288);ctx.strokeRect(14,16,288,288);
        const item=RESOURCE13_ITEMS[state.resType];
        ctx.fillStyle="#f4d088";ctx.font="bold 16px Cinzel";ctx.fillText("CATÁLOGO · DEFINIÇÃO",30,44);
        drawGear(ctx,156,102,32,9,0,"#b85d35","#f4d088");
        ctx.font="bold 15px Cinzel";ctx.fillText(item.name,30,166);
        ctx.fillStyle="#5ce1e6";ctx.font="14px JetBrains Mono";ctx.fillText(`ID: ${state.resType}`,30,192);ctx.fillText(`Dano base: ${item.base}`,30,216);ctx.fillText(`Vapor: ${item.vapor}`,30,240);
        ctx.fillStyle="#d2bc95";ctx.font="12px JetBrains Mono";ctx.fillText("Melhorar a pilha não altera a ficha.",30,280);
        if(stacked)ctx.translate(-304,304);
        ctx.fillStyle="#1e150c";ctx.strokeStyle="#b48b4c";ctx.fillRect(318,16,stacked?288:308,288);ctx.strokeRect(318,16,stacked?288:308,288);
        ctx.fillStyle="#f4d088";ctx.font="bold 16px Cinzel";ctx.fillText("INVENTÁRIO · ESTADO",334,44);
        ctx.fillStyle="#5ce1e6";ctx.font="14px JetBrains Mono";ctx.fillText(`Ouro: ${state.gold} · tipos: ${state.inventory.length}/3`,334,76);
        if(!state.inventory.length){ctx.fillStyle="#d2bc95";ctx.fillText("Vazio · adicione uma unidade.",334,116);}
        state.inventory.forEach((entry,index)=>{
          const y=101+index*56,definition=RESOURCE13_ITEMS[entry.id];ctx.fillStyle=entry.id===state.resType?"#20413b":"#2a1c0f";ctx.fillRect(330,y,stacked?266:286,49);
          ctx.fillStyle="#ead8b7";ctx.font="13px JetBrains Mono";ctx.fillText(`${entry.id} ×${entry.quantity} · nv.${entry.level}`,340,y+18);
          ctx.fillStyle="#5ce1e6";ctx.fillText(`Dano/un.: ${definition.base+12*(entry.level-1)}`,340,y+39);
        });
        ctx.fillStyle="#d2bc95";ctx.font="12px JetBrains Mono";ctx.fillText("S salvar · L carregar · R reiniciar",334,286);ctx.restore();
        const selected=state.inventory.find(entry=>entry.id===state.resType);
        telemetry.innerHTML=`<div>Ouro: <strong>${state.gold}</strong> · tipos: <strong>${state.inventory.length}/3</strong> · unidades: <strong>${state.inventory.reduce((sum,e)=>sum+e.quantity,0)}</strong></div>
          <div>Selecionado: <strong>${state.resType}</strong> · quantidade: <strong>${selected?.quantity||0}</strong> · nível: <strong>${selected?.level||"—"}</strong> · dano/un.: <strong>${selected?item.base+12*(selected.level-1):"—"}</strong> · base preservada: <strong>${item.base}</strong></div>
          <div>Snapshots salvos: <strong>${state.saves}</strong> · cargas aceitas: <strong>${state.loads}</strong> · rejeitadas: <strong>${state.rejections}</strong></div>`;
        break;
      }



      case "shader_particles_2d": {
        if(dt>0)shader14Advance(state,dt);
        const pulse=Math.max(0,1-state.flashAge/.4),flash=state.flash+(1-state.flash)*pulse;
        const shared=state.materialMode==="shared",stacked=w<500,lw=stacked?320:640,lh=stacked?680:340;
        const scale=Math.min(w/lw,h/lh);ctx.save();ctx.translate((w-lw*scale)/2,(h-lh*scale)/2);ctx.scale(scale,scale);
        ctx.fillStyle="#1e150c";ctx.strokeStyle="#b48b4c";ctx.lineWidth=2;ctx.fillRect(10,10,300,320);ctx.strokeRect(10,10,300,320);
        ctx.fillStyle="#f4d088";ctx.font="bold 15px Cinzel";ctx.fillText("AMOSTRAGEM UV + FLASH",24,36);
        for(let row=0;row<11;row++)for(let col=0;col<22;col++){ctx.fillStyle=(row+col)%2?"#33281b":"#18140e";ctx.fillRect(28+col*12,72+row*12,12,12);}
        shader14DrawTile(ctx,"A",state,28,76,128,flash,state.wave);shader14DrawTile(ctx,"B",state,164,76,128,shared?flash:0,shared?state.wave:0);
        ctx.fillStyle="#5ce1e6";ctx.font="13px JetBrains Mono";ctx.fillText("A · alvo",48,226);ctx.fillText("B · referência",167,226);
        ctx.fillStyle="#d2bc95";ctx.font="12px JetBrains Mono";ctx.fillText(shared?"Material compartilhado":"Materiais independentes",24,260);
        ctx.fillText("Quadriculado revela a transparência.",24,286);
        if(stacked)ctx.translate(-320,340);
        ctx.fillStyle="#1e150c";ctx.strokeStyle="#b48b4c";ctx.fillRect(330,10,300,320);ctx.strokeRect(330,10,300,320);
        ctx.fillStyle="#f4d088";ctx.font="bold 15px Cinzel";ctx.fillText("PARTÍCULAS · MODELO JS",344,36);
        const originX=480,originY=250;
        ctx.save();ctx.beginPath();ctx.rect(344,50,272,225);ctx.clip();
        state.particles.forEach(p=>{const age=Math.max(0,state.shaderTime-p.birth),vx=Math.sin(p.index*2.399963)*22,vy=-50-15*(Math.cos(p.index*1.73)+1);
          ctx.beginPath();ctx.arc(originX+vx*age,originY+vy*age-10*age*age,3+age*2,0,Math.PI*2);ctx.fillStyle=`rgba(190,225,235,${Math.max(0,1-age/state.lifetime)*.75})`;ctx.fill();});
        ctx.restore();ctx.fillStyle="#ac713f";ctx.fillRect(originX-18,originY,36,20);ctx.strokeStyle="#e8be77";ctx.strokeRect(originX-18,originY,36,20);
        ctx.fillStyle="#5ce1e6";ctx.font="13px JetBrains Mono";ctx.fillText(`${state.particles.length} vivas · ${state.emitted} emitidas`,344,292);ctx.restore();
        const probe=shader14Sample(.5,.25,state.wave,state.frequency,state.shaderTime,state.speed,flash);
        const status=state.emitterMode==="burst"?(state.burstActive?"RAJADA ATIVA":state.bursts?"SEM RAJADA ATIVA":"AGUARDANDO RAJADA"):(state.emitting?"EMITINDO":state.particles.length?"PARADO · VIDA RESIDUAL":"EMISSÃO PARADA");
        telemetry.innerHTML=`<div>Tempo: <strong>${state.shaderTime.toFixed(3)} s</strong> · flash A: <strong>${flash.toFixed(3)}</strong> · flash B: <strong>${(shared?flash:0).toFixed(3)}</strong></div>
          <div>Sonda UV (0.50, 0.25) → U: <strong>${probe.sampleU.toFixed(4)}</strong> · RGB: <strong>${probe.rgba.slice(0,3).map(Math.round).join(", ")}</strong> · alfa: <strong>${probe.rgba[3].toFixed(2)}</strong></div>
          <div>Emissor: <strong>${status}</strong> · vivas: <strong>${state.particles.length}</strong> · emitidas: <strong>${state.emitted}</strong> · rajadas: <strong>${state.bursts}</strong> · concluídas: <strong>${state.finished}</strong></div>
          <div>Taxa no modo contínuo: <strong>${(state.amount/state.lifetime).toFixed(2)} partículas/s</strong> · N=${state.amount}, T=${state.lifetime.toFixed(2)} s · modelo sem custo de GPU medido.</div>`;
        break;
      }



      case "async_loader_sim": {
        if (state.freezeFrames > 0) {
          state.freezeFrames--;
        } else {
          state.gearAngle = (state.gearAngle || 0) + dt * 3.5;
        }
        if (state.mode === "async" && state.progress < 100) {
          state.progress = Math.min(100, state.progress + dt * 42);
        }

        drawGear(ctx, w * 0.28, 135, 46, 12, state.gearAngle || 0, "#b85d35", "#f4d088");
        ctx.fillStyle = state.freezeFrames > 0 ? "#e05347" : "#4cd97b";
        ctx.font = "bold 13px JetBrains Mono";
        ctx.fillText(
          state.freezeFrames > 0 ? "TRAVADO! (Main Thread Bloqueada)" : "60 FPS Fluido (Animação Rodando)",
          w * 0.12,
          225
        );

        // Barra de progresso
        ctx.fillStyle = "#17100a";
        ctx.strokeStyle = "#d4a359";
        ctx.fillRect(w * 0.52, 115, w * 0.4, 34);
        ctx.strokeRect(w * 0.52, 115, w * 0.4, 34);

        ctx.fillStyle = "#5ce1e6";
        ctx.fillRect(w * 0.52 + 3, 118, (w * 0.4 - 6) * (state.progress / 100), 28);
        ctx.fillStyle = "#f4d088";
        ctx.fillText(`Progresso: ${Math.round(state.progress)}%`, w * 0.52, 102);

        telemetry.innerHTML = `
          <div>Modo: ${state.mode.toUpperCase()}</div>
          <div>Status: ${state.progress >= 100 ? "THREAD_LOAD_LOADED" : "THREAD_LOAD_IN_PROGRESS"}</div>
        `;
        break;
      }

      case "optimization_pool": {
        const isPool = state.optMode === "pool";
        while (state.bullets.length < state.count) {
          state.bullets.push({
            x: w * 0.5,
            y: h * 0.5,
            vx: (Math.random() - 0.5) * 260,
            vy: (Math.random() - 0.5) * 260
          });
        }
        if (state.bullets.length > state.count) state.bullets.length = state.count;

        state.bullets.forEach((b) => {
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          if (b.x < 10 || b.x > w - 10 || b.y < 10 || b.y > h - 10) {
            b.x = w * 0.5;
            b.y = h * 0.5;
          }
          ctx.fillStyle = isPool ? "#5ce1e6" : "#ffaa33";
          ctx.fillRect(b.x - 3, b.y - 3, 6, 6);
        });

        drawGear(ctx, w * 0.5, h * 0.5, 24, 8, state.t * 2, "#8c6229", "#f4d088");
        const simFps = isPool ? 60 : Math.min(60, Math.max(18, Math.round(60 - (state.count - 40) * 0.14)));

        telemetry.innerHTML = `
          <div>FPS Estimado: <strong>${simFps} FPS</strong></div>
          <div>Alocações/seg: <strong>${isPool ? "0 (Reciclando do Pool!)" : state.count + " instantiate()/s"}</strong></div>
        `;
        break;
      }

      case "multiplayer_rpc_sim": {
        const lagFactor = Math.max(2, 18 - state.ping * 0.06);
        state.clientX += (state.hostX - state.clientX) * Math.min(1, lagFactor * dt);

        // Divisória Host vs Client
        ctx.strokeStyle = "#8c6229";
        ctx.beginPath(); ctx.moveTo(w * 0.5, 20); ctx.lineTo(w * 0.5, h - 20); ctx.stroke();

        ctx.fillStyle = "#f4d088";
        ctx.font = "bold 12px JetBrains Mono";
        ctx.fillText("HOST (Autoridade ID: 1)", 30, 36);
        ctx.fillText("CLIENTE (Peer Conectado)", w * 0.5 + 30, 36);

        drawGear(ctx, state.hostX, 150, 26, 8, state.hostX * 0.05, "#c87d32", "#f4d088");
        drawGear(ctx, w * 0.5 + state.clientX, 150, 26, 8, state.clientX * 0.05, "#2d6e7e", "#5ce1e6");

        // Pacotes RPC viajando
        state.rpcPackets = state.rpcPackets.filter((pkt) => pkt.p < 1);
        state.rpcPackets.forEach((pkt) => {
          pkt.p += dt * (1000 / Math.max(80, state.ping * 4));
          const px = state.hostX + (w * 0.5 + state.clientX - state.hostX) * pkt.p;
          ctx.beginPath();
          ctx.arc(px, 100, 7, 0, Math.PI * 2);
          ctx.fillStyle = "#4cd97b";
          ctx.fill();
          ctx.fillText("@rpc()", px - 18, 86);
        });

        telemetry.innerHTML = `
          <div>is_multiplayer_authority(): true no Host</div>
          <div>Ping: ${state.ping}ms | Synchronizer Ativo</div>
        `;
        break;
      }

      // ======================== 3D RENDERERS ========================
      case "space_3d_axes": {
        const cx = w * 0.5, cy = h * 0.58;
        // Desenha grade do chão 3D (X e Z)
        ctx.strokeStyle = "rgba(212, 163, 89, 0.2)";
        for (let i = -4; i <= 4; i++) {
          const a = project3D(i, 0, -4, cx, cy, 26);
          const b = project3D(i, 0, 4, cx, cy, 26);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          const c = project3D(-4, 0, i, cx, cy, 26);
          const d = project3D(4, 0, i, cx, cy, 26);
          ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.lineTo(d.x, d.y); ctx.stroke();
        }

        // Eixos Origem 3D
        const o = project3D(0, 0, 0, cx, cy, 26);
        const axX = project3D(3.5, 0, 0, cx, cy, 26);
        const axY = project3D(0, 3.2, 0, cx, cy, 26);
        const axZ = project3D(0, 0, -3.5, cx, cy, 26);

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#e05347"; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(axX.x, axX.y); ctx.stroke();
        ctx.strokeStyle = "#4cd97b"; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(axY.x, axY.y); ctx.stroke();
        ctx.strokeStyle = "#5ce1e6"; ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(axZ.x, axZ.y); ctx.stroke();

        ctx.font = "bold 12px JetBrains Mono";
        ctx.fillStyle = "#e05347"; ctx.fillText("+X", axX.x + 6, axX.y);
        ctx.fillStyle = "#4cd97b"; ctx.fillText("+Y (Cima 3D)", axY.x + 6, axY.y);
        ctx.fillStyle = "#5ce1e6"; ctx.fillText("-Z (Frente)", axZ.x + 6, axZ.y);

        // Autômato 3D
        const objPos = project3D(0, state.py, state.pz, cx, cy, 26);
        drawGear(ctx, objPos.x, objPos.y, 20, 8, (state.yaw * Math.PI) / 180, "#c87d32", "#f4d088");

        const yawRad = (state.yaw * Math.PI) / 180;
        const dirX = state.moveMode === "local" ? -Math.sin(yawRad) : 0;
        const dirZ = state.moveMode === "local" ? -Math.cos(yawRad) : -1;
        const fwd = project3D(dirX * 2.2, state.py, state.pz + dirZ * 2.2, cx, cy, 26);

        ctx.strokeStyle = "#ffaa33";
        ctx.beginPath(); ctx.moveTo(objPos.x, objPos.y); ctx.lineTo(fwd.x, fwd.y); ctx.stroke();

        telemetry.innerHTML = `
          <div>Posição 3D: Vector3(0.0, ${state.py.toFixed(1)}m, ${state.pz.toFixed(1)}m)</div>
          <div>Vetor Frente: (${dirX.toFixed(2)}, 0, ${dirZ.toFixed(2)})</div>
        `;
        break;
      }

      case "transform_basis_3d": {
        if (state.slerpToZero && dt > 0) {
          const hx = state.rx * Math.PI / 360, hy = state.ry * Math.PI / 360, hz = state.rz * Math.PI / 360;
          const sx = Math.sin(hx), cx = Math.cos(hx), sy = Math.sin(hy), cy = Math.cos(hy), sz = Math.sin(hz), cz = Math.cos(hz);
          let qx = cy * sx * cz + sy * cx * sz;
          let qy = sy * cx * cz - cy * sx * sz;
          let qz = cy * cx * sz - sy * sx * cz;
          let qw = cy * cx * cz + sy * sx * sz;
          if (qw < 0) { qx = -qx; qy = -qy; qz = -qz; qw = -qw; }
          const angle = Math.acos(Math.min(1, Math.max(-1, qw)));
          const remaining = Math.exp(-6.3 * dt);
          const factor = angle > 1e-7 ? Math.sin(angle * remaining) / Math.sin(angle) : remaining;
          qx *= factor; qy *= factor; qz *= factor;
          qw = Math.cos(angle * remaining);
          const m23 = 2 * (qy * qz - qw * qx);
          state.rx = Math.asin(Math.max(-1, Math.min(1, -m23))) * 180 / Math.PI;
          if (Math.abs(m23) < 0.9999999) {
            state.ry = Math.atan2(2 * (qx * qz + qw * qy), 1 - 2 * (qx * qx + qy * qy)) * 180 / Math.PI;
            state.rz = Math.atan2(2 * (qx * qy + qw * qz), 1 - 2 * (qx * qx + qz * qz)) * 180 / Math.PI;
          } else {
            state.ry = Math.atan2(-2 * (qx * qz - qw * qy), 1 - 2 * (qy * qy + qz * qz)) * 180 / Math.PI;
            state.rz = 0;
          }
          if (angle * remaining < 0.001) {
            state.rx = state.ry = state.rz = 0;
            state.slerpToZero = false;
          }
        }
        const cx = w * 0.5, cy = h * 0.52;
        const rx = (state.rx * Math.PI) / 180;
        const ry = (state.ry * Math.PI) / 180;
        const rz = (state.rz * Math.PI) / 180;

        // Anéis do Giroscópio Steampunk
        ctx.strokeStyle = "rgba(212, 163, 89, 0.35)";
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(cx, cy, 90, 90 * Math.abs(Math.cos(rx)) + 12, rz, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(cx, cy, 70 * Math.abs(Math.cos(ry)) + 12, 70, rx, 0, Math.PI * 2); ctx.stroke();

        // 3 Vetores da Basis
        // Colunas da matriz R_y * R_x * R_z, antes da projeção isométrica.
        const cxr = Math.cos(rx), sxr = Math.sin(rx), cyr = Math.cos(ry), syr = Math.sin(ry), czr = Math.cos(rz), szr = Math.sin(rz);
        const projectAxis = (x, y, z) => {
          const p = project3D(x, y, z, 0, 0, 1);
          return { x: p.x, y: p.y };
        };
        const bx = projectAxis(cyr * czr + syr * sxr * szr, cxr * szr, -syr * czr + cyr * sxr * szr);
        const by = projectAxis(-cyr * szr + syr * sxr * czr, cxr * czr, syr * szr + cyr * sxr * czr);
        const bz = projectAxis(-syr * cxr, sxr, -cyr * cxr);

        const drawAxis = (v, col, lbl) => {
          ctx.strokeStyle = col;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + v.x * 78, cy + v.y * 78);
          ctx.stroke();
          ctx.fillStyle = col;
          ctx.font = "bold 12px JetBrains Mono";
          ctx.fillText(lbl, cx + v.x * 86 - 16, cy + v.y * 86);
        };
        drawAxis(bx, "#e05347", "basis.x");
        drawAxis(by, "#4cd97b", "basis.y");
        drawAxis(bz, "#5ce1e6", "-basis.z");

        telemetry.innerHTML = `
          <div>Euler: Pitch ${Math.round(state.rx)}° | Yaw ${Math.round(state.ry)}° | Roll ${Math.round(state.rz)}°</div>
          <div>Status: Base ortonormal • Slerp por quaternion (Euler YXZ nos controles)</div>
        `;
        break;
      }

      case "csg_boolean_3d": {
        const cx = w * 0.5, cy = h * 0.5;
        const ox = state.offset;

        ctx.save();
        if (state.op === "union") {
          ctx.fillStyle = "#b85d35";
          ctx.strokeStyle = "#f4d088";
          ctx.lineWidth = 2.5;
          ctx.fillRect(cx - 85, cy - 60, 170, 120);
          ctx.strokeRect(cx - 85, cy - 60, 170, 120);
          ctx.beginPath();
          ctx.arc(cx + ox, cy - 50, 48, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (state.op === "sub") {
          ctx.fillStyle = "#b85d35";
          ctx.strokeStyle = "#f4d088";
          ctx.lineWidth = 2.5;
          ctx.fillRect(cx - 85, cy - 60, 170, 120);
          ctx.strokeRect(cx - 85, cy - 60, 170, 120);
          // Escava o buraco com a cor do fundo
          ctx.fillStyle = "#090604";
          ctx.beginPath();
          ctx.arc(cx + ox, cy - 20, 46, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#5ce1e6";
          ctx.stroke();
        } else {
          // Intersection
          ctx.beginPath();
          ctx.rect(cx - 85, cy - 60, 170, 120);
          ctx.clip();
          ctx.fillStyle = "#4cd97b";
          ctx.beginPath();
          ctx.arc(cx + ox, cy - 20, 56, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        telemetry.innerHTML = `
          <div>CSG Operation: <strong>${state.op.toUpperCase()}</strong></div>
          <div>use_collision: true (Colisão recalculada!)</div>
        `;
        break;
      }

      case "character_3d_slopes": {
        const canClimb = state.slope <= state.maxAngle;
        if (canClimb) {
          state.charPos = (state.charPos + dt * 0.35) % 1;
        } else {
          state.charPos = Math.max(0.1, state.charPos - dt * 0.4);
        }

        if (state.jumpY > 0 || state.jumpVy > 0) {
          state.jumpVy -= 9.8 * dt;
          state.jumpY = Math.max(0, state.jumpY + state.jumpVy * dt * 12);
        }

        const startX = 90, startY = 235;
        const rad = (state.slope * Math.PI) / 180;
        const len = 240;
        const endX = startX + Math.cos(rad) * len;
        const endY = startY - Math.sin(rad) * len;

        // Rampa 3D
        ctx.fillStyle = canClimb ? "#4d351b" : "#6e2519";
        ctx.strokeStyle = canClimb ? "#f4d088" : "#ff5544";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(endX, startY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cápsula CharacterBody3D
        const px = startX + Math.cos(rad) * (len * state.charPos);
        const py = startY - Math.sin(rad) * (len * state.charPos) - state.jumpY;

        ctx.fillStyle = "#5ce1e6";
        ctx.beginPath();
        ctx.roundRect(px - 14, py - 42, 28, 42, 14);
        ctx.fill();

        telemetry.innerHTML = `
          <div>Rampa: ${state.slope}° | floor_max_angle: ${state.maxAngle}°</div>
          <div>Status: <strong>${canClimb ? "Subindo Rampa (is_on_floor = true)" : "Íngreme Demais! Escorregando!"}</strong></div>
        `;
        break;
      }

      case "springarm_camera_3d": {
        const playerX = 130, playerY = 165;
        const actualLen = Math.min(state.springLen, state.wallDist - 0.3);
        const wallPx = playerX + state.wallDist * 48;
        const camPx = playerX + actualLen * 48;

        // Parede 3D
        ctx.fillStyle = "#593d20";
        ctx.fillRect(wallPx, 55, 24, 175);
        ctx.strokeStyle = "#f4d088";
        ctx.strokeRect(wallPx, 55, 24, 175);

        // Cone de Visão (FOV) da Camera3D até o Jogador
        const fovSpread = Math.tan(((state.fov * 0.5) * Math.PI) / 180) * 95;
        ctx.fillStyle = "rgba(92, 225, 230, 0.14)";
        ctx.beginPath();
        ctx.moveTo(camPx, playerY - 20);
        ctx.lineTo(playerX - 40, playerY - 20 - fovSpread);
        ctx.lineTo(playerX - 40, playerY - 20 + fovSpread);
        ctx.closePath();
        ctx.fill();

        // Braço SpringArm3D
        ctx.strokeStyle = actualLen < state.springLen ? "#ffaa33" : "#4cd97b";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(playerX, playerY - 20);
        ctx.lineTo(camPx, playerY - 20);
        ctx.stroke();

        drawGear(ctx, playerX, playerY, 24, 8, state.t, "#c87d32", "#f4d088");
        ctx.fillStyle = "#5ce1e6";
        ctx.fillRect(camPx - 10, playerY - 32, 20, 24);

        telemetry.innerHTML = `
          <div>spring_length deseado: ${state.springLen.toFixed(1)}m</div>
          <div>Comprimento Real: <strong>${actualLen.toFixed(1)}m</strong> ${actualLen < state.springLen ? "(Retraído pela Parede!)" : ""}</div>
          <div>Camera3D.fov: ${state.fov}°</div>
        `;
        break;
      }

      case "raycast_picking_3d": {
        const cx = w * 0.5 + state.aimX;
        const cy = 185;
        const rad = (state.surfAngle * Math.PI) / 180;

        // Superfície 3D inclinada
        ctx.strokeStyle = "#f4d088";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx - Math.cos(rad) * 110, cy - Math.sin(rad) * 110);
        ctx.lineTo(cx + Math.cos(rad) * 110, cy + Math.sin(rad) * 110);
        ctx.stroke();

        // Feixe vindo da câmera
        ctx.strokeStyle = "#5ce1e6";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(w * 0.5, 25);
        ctx.lineTo(cx, cy);
        ctx.stroke();

        // Vetor Normal perpendicular à superfície
        const nx = Math.sin(rad);
        const ny = -Math.cos(rad);
        ctx.strokeStyle = "#4cd97b";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + nx * 65, cy + ny * 65);
        ctx.stroke();

        // Faíscas alinhadas à Normal
        state.sparks = state.sparks.filter((s) => s.life > 0);
        state.sparks.forEach((s) => {
          s.life -= dt * 1.6;
          const a = Math.atan2(ny, nx) + s.spread;
          const dist = (1 - s.life) * s.speed;
          ctx.fillStyle = "#ffaa33";
          ctx.fillRect(cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, 4, 4);
        });

        telemetry.innerHTML = `
          <div>Impacto 3D: get_collision_point()</div>
          <div>get_collision_normal(): (${nx.toFixed(2)}, ${(-ny).toFixed(2)}, 0.0)</div>
        `;
        break;
      }

      case "pbr_material_3d": {
        const cx = w * 0.5, cy = h * 0.5;
        const r = 82;

        // Brilho de Emission externo
        if (state.emit > 0) {
          const glow = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * (1.2 + state.emit * 0.25));
          glow.addColorStop(0, state.albedo);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath(); ctx.arc(cx, cy, r * 1.8, 0, Math.PI * 2); ctx.fill();
        }

        // Esfera PBR 3D
        const specSize = Math.max(8, state.rough * 75);
        const grad = ctx.createRadialGradient(cx - 28, cy - 28, specSize * 0.2, cx, cy, r);
        grad.addColorStop(0, state.rough < 0.4 ? "#ffffff" : state.albedo);
        grad.addColorStop(0.35, state.albedo);
        grad.addColorStop(1, state.metal > 0.5 ? "#080503" : "#2b1d12");

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#f4d088";
        ctx.stroke();

        telemetry.innerHTML = `
          <div>Metallic: ${state.metal.toFixed(2)} | Roughness: ${state.rough.toFixed(2)}</div>
          <div>Emission Multiplier: ${state.emit.toFixed(1)}x</div>
        `;
        break;
      }

      case "lighting_3d_env": {
        const cx = w * 0.5;
        // Neblina Volumétrica de fundo
        ctx.fillStyle = `rgba(180, 145, 95, ${state.fog * 0.28})`;
        ctx.fillRect(0, 0, w, h);

        if (state.lightType === "spot") {
          const rad = (state.lAngle * Math.PI) / 180;
          ctx.fillStyle = `rgba(255, 210, 125, ${0.25 + state.fog * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(cx, 25);
          ctx.lineTo(cx + Math.sin(rad - 0.35) * 260, 265);
          ctx.lineTo(cx + Math.sin(rad + 0.35) * 260, 265);
          ctx.closePath();
          ctx.fill();
        } else if (state.lightType === "omni") {
          const ox = cx + state.lAngle * 2;
          const g = ctx.createRadialGradient(ox, 135, 10, ox, 135, 145);
          g.addColorStop(0, `rgba(92, 225, 230, ${0.5 + state.fog * 0.4})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(ox, 135, 145, 0, Math.PI * 2); ctx.fill();
        } else {
          // DirectionalLight3D
          ctx.strokeStyle = "rgba(255, 215, 130, 0.45)";
          ctx.lineWidth = 2;
          for (let i = -4; i <= 4; i++) {
            ctx.beginPath();
            ctx.moveTo(cx + i * 45, 15);
            ctx.lineTo(cx + i * 45 + state.lAngle * 2, 265);
            ctx.stroke();
          }
        }

        drawGear(ctx, cx, 210, 32, 9, state.t * 0.5, "#593d20", "#f4d088");
        telemetry.innerHTML = `
          <div>Luz Ativa: <strong>${state.lightType.toUpperCase()}</strong></div>
          <div>volumetric_fog_density: ${(state.fog * 0.1).toFixed(3)}</div>
        `;
        break;
      }

      case "gridmap_decal_3d": {
        const cx = w * 0.5, cy = 190;
        for (let i = 0; i < state.blocksCount; i++) {
          const bx = (i % 4) - 1.5;
          const bz = Math.floor(i / 4) - 1;
          const by = i > 7 ? state.gy : 0;
          const p = project3D(bx * 1.3, by * 0.9, bz * 1.3, cx, cy, 28);
          ctx.fillStyle = by > 0 ? "#b85d35" : "#6e4720";
          ctx.strokeStyle = "#f4d088";
          ctx.fillRect(p.x - 18, p.y - 18, 36, 36);
          ctx.strokeRect(p.x - 18, p.y - 18, 36, 36);
        }

        // Decal Projetado
        ctx.strokeStyle = "#5ce1e6";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(cx + state.decalX, cy - 10, 48, 22, 0, 0, Math.PI * 2);
        ctx.stroke();

        telemetry.innerHTML = `
          <div>Células no GridMap: ${state.blocksCount} blocos</div>
          <div>Decal Projetado: Alinhado ao relevo 3D</div>
        `;
        break;
      }

      case "blendspace_2d_3d": {
        const padX = 135, padY = 145, padR = 95;
        ctx.strokeStyle = "#d4a359";
        ctx.strokeRect(padX - padR, padY - padR, padR * 2, padR * 2);

        const dotX = padX + state.bx * padR;
        const dotY = padY - state.by * padR;
        ctx.fillStyle = "#5ce1e6";
        ctx.beginPath(); ctx.arc(dotX, dotY, 8, 0, Math.PI * 2); ctx.fill();

        const speedFactor = Math.min(1, Math.hypot(state.bx, state.by));
        const idleWeight = Math.max(0, 1 - speedFactor);

        // Boneco articulado 3D ao lado
        const sx = w * 0.72, sy = 145;
        const legSwing = Math.sin(state.t * (4 + speedFactor * 8)) * 28 * speedFactor;
        ctx.strokeStyle = "#f4d088";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(sx, sy - 50, 14, 0, Math.PI * 2); // Cabeça
        ctx.moveTo(sx, sy - 36); ctx.lineTo(sx, sy + 15); // Tronco
        ctx.moveTo(sx, sy + 15); ctx.lineTo(sx - legSwing, sy + 68); // Perna E
        ctx.moveTo(sx, sy + 15); ctx.lineTo(sx + legSwing, sy + 68); // Perna D
        // Braços (OneShot no tronco superior)
        const armY = state.oneshot === "on" ? sy - 48 + Math.sin(state.t * 12) * 15 : sy - 5;
        ctx.moveTo(sx - 28, sy - 10); ctx.lineTo(sx, sy - 28); ctx.lineTo(sx + 32, armY);
        ctx.stroke();

        telemetry.innerHTML = `
          <div>Blend Position: Vector2(${state.bx.toFixed(1)}, ${state.by.toFixed(1)})</div>
          <div>Peso Parado: ${(idleWeight * 100).toFixed(0)}% | Locomoção: ${(speedFactor * 100).toFixed(0)}%</div>
        `;
        break;
      }

      case "navmesh_3d_sim": {
        const margin = state.radius * 18;
        // Duas plataformas separadas por um fosso
        ctx.fillStyle = "rgba(92, 225, 230, 0.22)";
        ctx.strokeStyle = "#5ce1e6";
        ctx.fillRect(40 + margin, 70 + margin, 150 - margin * 2, 150 - margin * 2);
        ctx.strokeRect(40 + margin, 70 + margin, 150 - margin * 2, 150 - margin * 2);

        ctx.fillRect(280 + margin, 70 + margin, 150 - margin * 2, 150 - margin * 2);
        ctx.strokeRect(280 + margin, 70 + margin, 150 - margin * 2, 150 - margin * 2);

        if (state.link === "on") {
          ctx.strokeStyle = "#4cd97b";
          ctx.lineWidth = 4;
          ctx.setLineDash([6, 4]);
          ctx.beginPath(); ctx.moveTo(160, 145); ctx.lineTo(310, 145); ctx.stroke();
          ctx.setLineDash([]);
        }

        const p = (Math.sin(state.t * 2) + 1) * 0.5;
        // Sem link não há rota que conecte as duas plataformas deste exemplo.
        const ax = state.link === "on" ? 115 + p * 240 : 115 + p * Math.max(0, 59 - margin);
        const ay = state.link === "on" ? 145 - Math.sin(p * Math.PI) * 48 : 145;
        drawGear(ctx, ax, ay, 16, 7, state.t * 3, "#c87d32", "#f4d088");

        telemetry.innerHTML = `
          <div>NavMesh agent_radius: ${state.radius.toFixed(1)}m</div>
          <div>NavigationLink3D: <strong>${state.link === "on" ? "Salto Ativo (link_reached)" : "Desconectado — sem rota até a outra plataforma"}</strong></div>
        `;
        break;
      }

      case "spatial_shader_3d": {
        const cx = w * 0.5, cy = 155;
        ctx.strokeStyle = `rgba(92, 225, 230, ${Math.min(1, state.fresnel / 4)})`;
        ctx.lineWidth = 2;

        for (let r = -3; r <= 3; r++) {
          ctx.beginPath();
          for (let c = -5; c <= 5; c++) {
            const waveY = Math.sin(c * 0.7 + state.t * state.speed) * Math.cos(r * 0.7 + state.t * state.speed) * (state.amp * 0.08);
            const pt = project3D(c * 0.9, waveY, r * 0.9, cx, cy, 24);
            if (c === -5) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          }
          ctx.stroke();
        }

        telemetry.innerHTML = `
          <div>shader_type spatial | vertex() onda: ${state.amp}</div>
          <div>Fresnel Rim Power: ${state.fresnel.toFixed(1)}</div>
        `;
        break;
      }

      case "gi_reflection_3d": {
        const isGI=state.giMode === "gi_probe";
        window.GILightingLab.render(ctx,w,h,state);
        telemetry.innerHTML=`<div>Luz direta: fixa nos dois painéis.</div>
          <div>GI difusa: <strong>${isGI ? Number(state.bounce).toFixed(1)+"x · parede → superfície" : "desligada · energia do rebatimento não se aplica"}</strong></div>
          <div>Reflexo ambiente: <strong>${state.probe === "on" ? "ligado no metal" : "desligado"}</strong></div>
          <div>Ambiente difuso da sonda: desativado neste exemplo.</div>`;
        break;
      }

      case "occlusion_lod_3d": {
        const camX = 75, camY = 145;
        const rad = (state.camAngle * Math.PI) / 180;

        // Cone de visão Frustum
        ctx.fillStyle = "rgba(92, 225, 230, 0.12)";
        ctx.beginPath();
        ctx.moveTo(camX, camY);
        ctx.lineTo(camX + Math.cos(rad - 0.45) * 380, camY + Math.sin(rad - 0.45) * 380);
        ctx.lineTo(camX + Math.cos(rad + 0.45) * 380, camY + Math.sin(rad + 0.45) * 380);
        ctx.closePath();
        ctx.fill();

        // Parede OccluderInstance3D
        const wallX = 220;
        ctx.fillStyle = "#8c6229";
        ctx.fillRect(wallX, 90, 18, 110);

        // Objetos atrás da parede
        const occluded = state.occluder === "on" && Math.abs(state.camAngle) < 24;
        for (let i = 0; i < 4; i++) {
          const ox = 320 + (i % 2) * 55;
          const oy = 105 + Math.floor(i / 2) * 75;
          if (!occluded) {
            const teeth = state.lod === "on" ? 5 : 12;
            drawGear(ctx, ox, oy, 20, teeth, state.t, "#b85d35", "#f4d088");
          } else {
            ctx.strokeStyle = "rgba(255, 85, 68, 0.35)";
            ctx.strokeRect(ox - 16, oy - 16, 32, 32);
          }
        }

        const tris = occluded ? 120 : state.lod === "on" ? 650 : 4800;
        telemetry.innerHTML = `
          <div>Objetos Atrás do Muro: <strong>${occluded ? "OCULTADOS (0 Draw Calls!)" : "Sendo Renderizados"}</strong></div>
          <div>Triângulos na GPU: <strong>${tris} tris</strong></div>
        `;
        break;
      }
    }
  }

  return { mount, stopCurrent, pause, resume, togglePause, isPaused };
})();




