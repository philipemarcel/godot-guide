// Regras dos laboratórios: modelos em memória, separados da execução Godot.
(function () {
  const defaults = { left: "KeyA", right: "KeyD", up: "KeyW", down: "KeyS" };
  const pieces = [2, 12, 22], walls = [8, 9, 15];
  function create(type) {
    const s = { type, notice: "Pronto. Preveja um resultado e acione o controle.", stock: { engrenagem: 3, valvula: 2, mola: 1 }, id: "engrenagem", quantity: 1,
      total: 0, faulty: true, checkpoint: "Ainda não executado", volumes: { Master: .6, Music: .4, SFX: .6 }, mute: false, shots: 0,
      keys: { ...defaults }, capture: false, reduced: false, large: false, saved: null, phase: "menu", position: 0, turns: 0, collected: [], paused: false };
    const initial = () => { s.phase = "jogando"; s.position = 0; s.turns = 0; s.collected = []; s.paused = false; };
    function dispatch(action, value) {
      switch (action) {
        case "consume": {
          const q = Number(s.quantity);
          if (!(s.id in s.stock)) s.notice = "Rejeitado: ID desconhecido; estoque preservado.";
          else if (!Number.isInteger(q) || q <= 0 || q > s.stock[s.id]) s.notice = "Rejeitado: quantidade inválida; estoque preservado.";
          else { s.stock[s.id] -= q; s.notice = `Sucesso: ${s.id}, saldo ${s.stock[s.id]}.`; }
          break;
        }
        case "count": s.checkpoint = `antes ${s.total} → primeira soma ${s.total + 1}${s.faulty ? " → segunda soma " + (s.total + 2) : " → retorno"}`; s.total += s.faulty ? 2 : 1; s.notice = `Total: ${s.total}. Esperado por clique: +1.`; break;
        case "fix": s.faulty = false; s.total = 0; s.checkpoint = "Correção aplicada; contador zerado"; s.notice = "Teste novamente: dois cliques devem dar 1 e 2."; break;
        case "shot": s.shots++; s.notice = `AÇÃO confirmada visualmente · disparos ${s.shots}; o modelo não reproduz som.`; break;
        case "capture": s.capture = true; s.notice = "Pressione letra/seta para esquerda. Escape cancela; D está ocupado por direita."; break;
        case "key":
          if (!s.capture) break;
          if (value === "Escape") { s.capture = false; s.notice = "Captura cancelada; mapa preservado."; }
          else if (!/^(Key[A-Z]|Arrow(Left|Right|Up|Down))$/.test(value)) { s.notice = "Tecla reservada ou não suportada. Use letra/seta; Escape cancela."; }
          else {
            s.capture = false;
            if (Object.entries(s.keys).some(([key, code]) => key !== "left" && code === value)) s.notice = "Conflito: tecla já usada; mapa preservado.";
            else { s.keys.left = value; s.notice = `Esquerda: ${value}.`; }
          }
          break;
        case "restore": s.keys = { ...defaults }; s.capture = false; s.reduced = false; s.large = false; s.notice = "Padrões restaurados nesta sessão. Salve para substituir o snapshot."; break;
        case "start": initial(); s.notice = "Nova partida. Recolha 3 peças e chegue à saída em até 32 passos."; break;
        case "pause": if (s.phase === "jogando") s.paused = !s.paused; s.notice = s.paused ? "Partida pausada; movimento bloqueado." : "Partida retomada."; break;
        case "menu": s.phase = "menu"; s.paused = false; s.notice = "Início: inicie outra partida ou reabra um snapshot."; break;
        case "move": {
          if (s.phase !== "jogando" || s.paused) { s.notice = "Movimento bloqueado nesta fase/pausa."; break; }
          if (!Array.isArray(value) || value.length !== 2 || !value.every(Number.isInteger) || Math.abs(value[0]) + Math.abs(value[1]) !== 1) break;
          const x = s.position % 6 + value[0], y = Math.floor(s.position / 6) + value[1], p = y * 6 + x;
          if (x < 0 || x >= 6 || y < 0 || y >= 4 || walls.includes(p)) { s.notice = "Parede/limite: nenhum passo gasto."; break; }
          s.position = p; s.turns++;
          if (pieces.includes(p) && !s.collected.includes(p)) s.collected.push(p);
          if (p === 23 && s.collected.length === 3) s.phase = "vitoria";
          else if (s.turns >= 32) s.phase = "derrota";
          s.notice = `Peças ${s.collected.length}/3 · passos ${s.turns}/32 · ${s.phase}.`;
          break;
        }
        case "save":
          if (type === "curriculum_audio") s.saved = { volumes: { ...s.volumes }, mute: s.mute };
          else if (type === "curriculum_access") s.saved = { keys: { ...s.keys }, reduced: s.reduced, large: s.large };
          else if (s.phase === "jogando") s.saved = { position: s.position, turns: s.turns, collected: [...s.collected] };
          else { s.notice = "Só é possível salvar uma partida em andamento."; break; }
          s.notice = "Snapshot salvo em memória; não grava disco nem user://."; break;
        case "load":
          if (!s.saved) { s.notice = "Nenhum snapshot; estado preservado."; break; }
          if (type === "curriculum_audio") { s.volumes = { ...s.saved.volumes }; s.mute = s.saved.mute; }
          else if (type === "curriculum_access") { s.keys = { ...s.saved.keys }; s.reduced = s.saved.reduced; s.large = s.saved.large; s.capture = false; }
          else { s.position = s.saved.position; s.turns = s.saved.turns; s.collected = [...s.saved.collected]; s.phase = "jogando"; s.paused = false; }
          s.notice = "Snapshot reaberto em memória."; break;
      }
      return s;
    }
    return { state: s, dispatch };
  }
  function audioGain(state, bus) {
    if (state.mute) return 0;
    return state.volumes.Master * (bus === "Master" ? 1 : state.volumes[bus]);
  }
  window.CurriculumModels = { create, pieces, walls, audioGain };
})();
