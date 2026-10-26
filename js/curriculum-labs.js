// Laboratórios discretos: sem loop, autoplay ou captura global de teclado.
(function () {
  const engine = window.SimulatorEngine;
  const originalMount = engine.mount, originalStop = engine.stopCurrent;
  let release = null;
  engine.stopCurrent = function () { if (release) { release(); release = null; } originalStop(); };
  engine.mount = function (type, canvas, controls, telemetry, onPauseChange) {
    engine.stopCurrent();
    if (!type.startsWith("curriculum_")) return originalMount(type, canvas, controls, telemetry, onPauseChange);
    if (!canvas || !controls || !telemetry) return;
    const modelFactory = () => window.CurriculumModels.create(type);
    let model = modelFactory(), disposed = false;
    const ctx = canvas.getContext("2d");
    const listeners = [], fields = [];
    const listen = (node, event, handler) => { node.addEventListener(event, handler); listeners.push(() => node.removeEventListener(event, handler)); };
    controls.innerHTML = "";
    controls.closest(".simulator-layout")?.classList.add("controls-above");
    telemetry.setAttribute("role", "status");
    telemetry.setAttribute("aria-live", "polite");
    const notice = document.createElement("p");
    notice.className = "study-note";
    controls.appendChild(notice);
    function action(key, value) { model.dispatch(key, value); render(); }
    function button(label, callback) {
      const node = document.createElement("button"); node.type = "button"; node.textContent = label; node.className = "brass-btn secondary";
      listen(node, "click", callback); controls.appendChild(node); return node;
    }
    function field(label, key, options, getter, setter) {
      const wrap = document.createElement("div"); wrap.className = "sim-control-group";
      const text = document.createElement("label"); text.textContent = label; text.htmlFor = "curriculum-" + key;
      const input = document.createElement(options ? "select" : "input"); input.id = text.htmlFor;
      if (options) for (const [value, label] of options) { const opt = document.createElement("option"); opt.value = value; opt.textContent = label; input.appendChild(opt); }
      else { input.type = "range"; input.min = "0"; input.max = "1"; input.step = ".01"; }
      wrap.appendChild(text); wrap.appendChild(input); controls.appendChild(wrap);
      listen(input, options ? "change" : "input", () => { setter(input.value); render(); });
      fields.push(() => { input.value = String(getter()); });
    }
    if (type === "curriculum_data") {
      field("ID da peça", "id", [["engrenagem", "Engrenagem"], ["valvula", "Válvula"], ["mola", "Mola"], ["ausente", "ID inexistente"]], () => model.state.id, v => model.state.id = v);
      field("Quantidade", "quantity", [-1,0,1,2,3,4].map(v => [String(v), String(v)]), () => model.state.quantity, v => model.state.quantity = Number(v));
      button("Consumir peça", () => action("consume"));
    } else if (type === "curriculum_debug") {
      button("Acionar contador", () => action("count")); button("Aplicar correção e zerar", () => action("fix"));
    } else if (type === "curriculum_audio") {
      for (const name of ["Master", "Music", "SFX"]) field("Ganho linear · " + name, name, null, () => model.state.volumes[name], v => model.state.volumes[name] = Number(v));
      button("Alternar mute Master", () => { model.state.mute = !model.state.mute; render(); });
      button("Disparar ação visual", () => action("shot"));
    } else if (type === "curriculum_access") {
      const capture = button("Remapear esquerda · capturar tecla", () => { action("capture"); capture.focus(); });
      listen(capture, "keydown", event => {
        if (!model.state.capture) return;
        event.preventDefault(); event.stopPropagation();
        if (!event.repeat && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) action("key", event.code);
      });
      listen(capture, "blur", () => { if (model.state.capture) action("key", "Escape"); });
      button("Alternar texto ampliado", () => { model.state.large = !model.state.large; render(); });
      button("Alternar movimento reduzido", () => { model.state.reduced = !model.state.reduced; render(); });
      button("Restaurar padrões", () => action("restore"));
    } else if (type === "curriculum_capstone") {
      canvas.tabIndex = 0; canvas.setAttribute("role", "group"); canvas.setAttribute("aria-label", "Tabuleiro. WASD ou setas movem um passo; Escape pausa; Tab sai.");
      button("Iniciar / reiniciar partida", () => { action("start"); canvas.focus(); });
      for (const [label, d] of [["← Esquerda", [-1,0]], ["↑ Cima", [0,-1]], ["↓ Baixo", [0,1]], ["→ Direita", [1,0]]]) button(label, () => action("move", d));
      button("Pausar / retomar partida", () => action("pause")); button("Voltar ao início", () => action("menu"));
      listen(canvas, "keydown", event => {
        if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        const keys = { KeyA: [-1,0], ArrowLeft: [-1,0], KeyD: [1,0], ArrowRight: [1,0], KeyW: [0,-1], ArrowUp: [0,-1], KeyS: [0,1], ArrowDown: [0,1] };
        if (keys[event.code]) { event.preventDefault(); action("move", keys[event.code]); }
        else if (event.code === "Escape") { event.preventDefault(); action("pause"); }
      });
      listen(window, "blur", () => { if (model.state.phase === "jogando" && !model.state.paused) action("pause"); });
    }
    if (["curriculum_audio", "curriculum_access", "curriculum_capstone"].includes(type)) {
      button("Salvar snapshot em memória", () => action("save")); button("Reabrir snapshot", () => action("load"));
    }
    button("Reiniciar laboratório", () => { model = modelFactory(); render(); });
    function render() {
      if (disposed) return;
      const s = model.state;
      for (const update of fields) update();
      notice.textContent = s.notice;
      telemetry.style.fontSize = s.large ? "1.2rem" : "";
      for (const node of controls.querySelectorAll("button, label, .study-note")) node.style.fontSize = s.large ? "1.15rem" : "";
      const lines = [];
      if (type === "curriculum_data") lines.push(...Object.entries(s.stock).map(([k,v]) => `${k}: ${v}`), "Falhas preservam todos os saldos.");
      if (type === "curriculum_debug") lines.push(`Total: ${s.total} · defeito ${s.faulty ? "ativo (+2)" : "corrigido (+1)"}`, s.checkpoint, "Não executa debugger ou Git; compare no projeto.");
      if (type === "curriculum_audio") {
        for (const [name, v] of Object.entries(s.volumes)) lines.push(`${name}: ${v.toFixed(2)} linear · ${v === 0 ? "mute" : (20 * Math.log10(v)).toFixed(2) + " dB"}${s.mute && name === "Master" ? " · MUDO" : ""}`);
        for (const name of ["Music", "SFX"]) { const gain = window.CurriculumModels.audioGain(s,name); lines.push(`${name} × Master: ${gain.toFixed(3)} efetivo · ${gain === 0 ? "silenciado" : (20*Math.log10(gain)).toFixed(2)+" dB"}`); }
        lines.push(`Disparos: ${s.shots}. Sem reprodução de som neste modelo.`);
      }
      if (type === "curriculum_access") lines.push(...Object.entries(s.keys).map(([a,k]) => `${({left:"Esquerda",right:"Direita",up:"Cima",down:"Baixo"})[a]}: ${k}`), `Texto ampliado: ${s.large ? "sim" : "não"} · movimento reduzido: ${s.reduced ? "sim" : "não"}`, `Captura: ${s.capture ? "aguardando" : "inativa"}. Modelo estático, sem animações.`);
      if (type === "curriculum_capstone") lines.push(`Fase: ${s.phase}${s.paused ? " · PAUSADA" : ""}`, `Posição: ${s.position} (coluna ${s.position % 6}, linha ${Math.floor(s.position / 6)})`, `Peças: ${s.collected.length}/3 · passos ${s.turns}/32`, "P: peça · #: parede · saída: célula 23. Teclado só com foco na vista.");
      lines.push(`Snapshot: ${s.saved ? "disponível nesta sessão" : "nenhum"}.`);
      telemetry.textContent = lines.join("\n"); telemetry.style.whiteSpace = "pre-line";
      if (!ctx) return;
      canvas.width = Math.max(200, Math.floor(canvas.parentElement.getBoundingClientRect().width)); canvas.height = type === "curriculum_capstone" ? 300 : 240;
      canvas.style.width = "100%"; canvas.style.height = "auto";
      ctx.fillStyle = "#100b06"; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle = "#6d502b"; ctx.strokeRect(8,8,canvas.width-16,canvas.height-16);
      if (type === "curriculum_capstone") {
        const cell = Math.min(62, (canvas.width-24)/6), ox = (canvas.width-6*cell)/2;
        for (let i=0;i<24;i++) {
          const x=ox+(i%6)*cell,y=15+Math.floor(i/6)*cell;
          ctx.fillStyle = window.CurriculumModels.walls.includes(i) ? "#55483a" : "#1d150c"; ctx.fillRect(x+2,y+2,cell-4,cell-4);
          ctx.fillStyle = i===s.position ? "#5ce1e6" : "#f4d088"; ctx.font=`bold ${Math.max(10,Math.min(15,cell*.3))}px monospace`;
          const text = i===s.position ? "VOCÊ" : window.CurriculumModels.walls.includes(i) ? "#" : window.CurriculumModels.pieces.includes(i)&&!s.collected.includes(i) ? "P" : i===23 ? "FIM" : String(i);
          ctx.fillText(text,x+5,y+cell*.6);
        }
      } else {
        ctx.fillStyle = "#f4d088"; ctx.font = "bold 15px monospace";
        const summary = type === "curriculum_access" ? ["ESQUERDA",s.keys.left,s.capture?"CAPTURANDO…":"Configuração pronta"] : lines.slice(0,3);
        summary.forEach((line,i)=>ctx.fillText(line,20,50+i*52,canvas.width-40));
      }
    }
    listen(window, "resize", render);
    release = () => { disposed = true; for (const cleanup of listeners) cleanup(); controls.closest(".simulator-layout")?.classList.remove("controls-above"); };
    render();
    onPauseChange?.(false);
  };
})();
