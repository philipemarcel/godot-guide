// ============================================================================
// ACADEMIA AETHER & GODOT — CURRÍCULO COMPLETO DA FORJA 3D
// Níveis: Introdução, Iniciante, Intermediário, Avançado, Profissional
// Pedagogia: Técnica Feynman ("Aprenda como se tivesse 10 anos") + Múltiplas Abordagens
// ============================================================================

window.GODOT_LESSONS_3D = [
  // ==========================================================================
  // NÍVEL I — INTRODUÇÃO (Aprendiz de Caldeira)
  // ==========================================================================
{
  "id": "3d-intro-space-axes",
  "area": "3d",
  "level": "introducao",
  "levelLabel": "Introdução",
  "title": "1. Espaço 3D: eixos, unidades e coordenadas de Node3D",
  "subtitle": "Localize uma peça no mundo, compare sua posição no pai e descubra por que girar a câmera não muda suas coordenadas.",
  "nodesUsed": [
    "Node3D",
    "Vector3",
    "Marker3D",
    "MeshInstance3D"
  ],
  "feynman": {
    "title": "Uma peça, três coordenadas e um ponto de referência",
    "explanation": "No plano 2D usamos duas coordenadas; no espaço 3D precisamos de três. Neste curso, X representa um eixo horizontal, Y a altura e Z o outro eixo do chão. Os sinais indicam sentidos em relação a uma referência, não posições fixas na tela. Uma peça pode estar dois passos à frente de sua base e, ao mesmo tempo, ocupar outra posição em relação à origem do mundo. Girar a vista muda o desenho que você vê; mover ou girar a base muda a transformação da peça. Node3D guarda essa transformação, mas sozinho não cria uma forma visível nem aplica gravidade.",
    "analogies": [
      {
        "term": "Mundo e pai",
        "analogy": "O endereço de uma peça pode ser descrito a partir da entrada da oficina ou da bancada que a sustenta. position usa o sistema do pai; global_position usa o mundo."
      },
      {
        "term": "Unidades",
        "analogy": "Escolher 1 unidade como 1 metro é uma convenção de escala útil para montar o projeto e usar parâmetros físicos coerentes. A coordenada numérica não mede um objeto real nem representa pixels."
      },
      {
        "term": "Frente escolhida",
        "analogy": "Um sinal pintado na peça marca qual lado chamaremos de frente. Nesta prática ele aponta para o −Z da peça; modelos importados podem adotar outra convenção."
      }
    ]
  },
  "howItWorks": {
    "overview": "Godot usa um sistema 3D de mão direita: X × Y aponta para Z. No mundo convencional do editor, +Y aponta para cima; o chão costuma ser XZ. Vector3.FORWARD vale (0, 0, −1) e Vector3.UP vale (0, 1, 0). Câmeras e várias APIs usam −Z como frente, mas assets 3D podem usar +Z como frente de modelo, representada por Vector3.MODEL_FRONT. Não conclua a direção apenas pela aparência de uma malha. Nesta aula limitamos as transformações a rotações em Y e escala uniforme positiva; a próxima amplia o estudo de Basis e Transform3D.",
    "anatomy": [
      {
        "prop": "Node3D, MeshInstance3D e Marker3D",
        "desc": "Node3D organiza posição, rotação e escala. MeshInstance3D desenha uma malha, como um cubo. Marker3D marca uma referência com gizmo no editor; não é, por si só, uma peça visível durante o jogo."
      },
      {
        "prop": "position, global_position e top_level",
        "desc": "Com um pai Node3D, top_level=false e as condições desta prática, position é expresso no sistema do pai. A transformação do pai leva esse ponto ao mundo. Mudar a rotação da própria peça não muda sua origem; girar o pai pode mover a origem do filho em torno dele."
      },
      {
        "prop": "Eixos do pai versus frente da própria peça",
        "desc": "Somar (0, 0, −0,5) em position muda a coordenada Z no pai. Isso não significa necessariamente avançar no sentido do nariz da peça. A frente da peça expressa no mundo depende da orientação herdada e da rotação da própria peça."
      },
      {
        "prop": "Escala, unidade e distância",
        "desc": "Na bancada adotamos 1 unidade = 1 metro. O cubo de tamanho (1,1,1) tem aresta de 1 unidade com escala global 1. Escalar o pai em 2 também escala a distância do filho ao pai. Isso não faz um Node3D cair; física e colisão serão assuntos posteriores."
      }
    ]
  },
  "teaching": {
    "codeRequired": false,
    "codeIntro": "A prática principal pode ser feita pelo Inspector, usando a cena pronta. Os exemplos abaixo são consulta opcional: leitura de coordenadas, controlador dos botões da bancada e cálculo do passo de uma unidade. Não é necessário dominar matrizes nesta aula.",
    "duration": "45–70 min, incluindo previsões e variações (estimativa)",
    "prerequisite": "Saber selecionar nós, editar Transform no Inspector e distinguir pai/filho; aulas 2D 1–3 ajudam, sem exigir completar as 17 aulas 2D. Referência: Godot 4.5, desktop, Compatibility. Projeto de apoio revisado documentalmente; ainda não executado no motor neste ambiente.",
    "objectives": [
      "Identificar os sentidos de X/Y/Z e distinguir coordenadas do mundo, do pai e orientação da própria peça.",
      "Prever e conferir posições globais em exemplos simples com translação, rotação Y e escala uniforme do pai.",
      "Comparar um passo em −Z do mundo com um passo na frente da peça, mantendo distância global de uma unidade."
    ],
    "practice": {
      "title": "Prática guiada: a peça sobre uma base",
      "intro": "Use uma cena com cubo, nariz ciano, piso, eixos nomeados, câmera e luz já instalados. Primeiro observe e altere Transform no editor, sem código. Depois execute os botões para comparar os passos. O projeto não contém corpo físico ou colisão.",
      "tree": "Oficina (Node3D) — oficina.gd, controlador opcional da bancada em runtime\n├── Piso (MeshInstance3D / PlaneMesh)\n├── Eixos (Node3D / formas e rótulos +X, +Y, +Z)\n├── Base (Node3D) — position=(2,0,1)\n│   └── Peca (Node3D) — position=(0,0.5,−2)\n│       ├── Corpo (MeshInstance3D / BoxMesh de 1×1×1)\n│       ├── Nariz (MeshInstance3D) — aponta para −Z da peça\n│       └── Frente (Marker3D) — referência em (0,0,−1)\n├── Camera3D — ortográfica, current\n└── DirectionalLight3D\n\nCanvasLayer / botões / leituras são criados ao executar oficina.gd.\nconsulta.gd é opcional: adicionar a um Node extra e atribuir Peca.\npasso.gd é usado pelo controlador para obter um deslocamento unitário.",
      "download": {
        "url": "assets/aula-3d-01-espaco-eixos.zip",
        "label": "Baixar projeto de apoio: espaço e eixos 3D"
      },
      "downloadNote": "Godot 4.5. Inclui cena completa, malhas primitivas, câmera/luz e scripts opcionais. Ainda não executado no motor; os resultados previstos precisam ser confirmados na Godot.",
      "steps": [
        {
          "title": "Reconheça os eixos e a escala",
          "text": "Extraia o ZIP, importe project.godot e abra oficina.tscn no editor 3D. Selecione Base/Peca/Corpo: o BoxMesh tem Size=(1,1,1). A escala da peça e da base começa em (1,1,1). Identifique +X, +Y e +Z pelos rótulos e pelo gizmo, não apenas pelas cores. O projeto adota uma unidade como um metro; isso faz a aresta inicial do cubo representar 1 m.",
          "expect": "Node3D organiza a peça; Corpo fornece o desenho. O gizmo de Frente é referência de editor. O nariz ciano é uma malha visível, criada para mostrar a frente escolhida como −Z."
        },
        {
          "title": "Leia a posição no pai e no mundo",
          "text": "Selecione Base e confira position=(2,0,1), rotação zero e escala 1. Selecione Peca e confira position=(0,0.5,−2). Preveja a soma neste caso sem rotação/escala: (2,0,1)+(0,0.5,−2)=(2,0.5,−1). Execute a cena com F6 e compare a leitura de global_position. R ou Restaurar repõe a bancada inicial.",
          "expect": "A posição local não é (2,0.5,−1): esse é o resultado no mundo. Só se pode fazer essa soma simples porque o pai está sem rotação e com escala 1. Sem um pai transformado, os números poderiam coincidir, mas os conceitos continuariam distintos."
        },
        {
          "title": "Mude uma coordenada sem confundir com a tela",
          "text": "No editor, varie um componente de position de Peca por vez e desfaça/restaure antes do próximo teste. Em runtime há botões: A/D mudam X no pai; W/S mudam Z; Q/E mudam Y, em passos de 0,5 unidade. As setas também controlam X/Z. Use C para girar a câmera da bancada e confira novamente as leituras.",
          "expect": "Y global aumenta para cima no mundo, mas pode se projetar em outra direção na tela se a câmera mudar. A câmera não muda position/global_position da peça. X/Z não significam obrigatoriamente “direita/baixo da tela”. O laboratório do navegador também permite variar o azimute da vista."
        },
        {
          "title": "Gire o pai e faça uma previsão",
          "text": "Restaure a bancada. No editor, deixe Peca em (0,0.5,−2) e altere Rotation Y de Base para +90°; no Inspector o valor é mostrado em graus. Em runtime, P instala esse mesmo exemplo. A contribuição (0,0,−2) do filho passa a apontar para −X global. Somando a posição do pai, preveja (0,0.5,1).",
          "expect": "position de Peca continua (0,0.5,−2), mas global_position passa a (0,0.5,1), salvo arredondamento. Girar o pai move o filho ao redor do pai. Girar só a peça com O muda seu nariz, mas mantém a posição de sua origem."
        },
        {
          "title": "Compare frente da peça e −Z global",
          "text": "Partindo do exemplo P, selecione Frente −Z da peça e use F: a peça avança uma unidade no mundo na direção (−1,0,0), chegando a (−1,0.5,1). Restaure o exemplo P, escolha −Z fixo do mundo e use F novamente: o destino é (0,0.5,0). O selector afeta F, não os botões que mudam coordenadas nos eixos do pai.",
          "expect": "A frente da peça é expressa no mundo antes do deslocamento. A câmera não decide essa direção. O objeto fica parado sem comando e cada toque aplica apenas um passo; não há movimento automático nem colisão neste exercício."
        },
        {
          "title": "Altere a escala e confira a distância",
          "text": "Use P e depois T para alternar a escala da base para (2,2,2). A posição local do filho não muda: a distância ao pai e a altura são multiplicadas por 2. O resultado global previsto é (−2,1,1). A aresta do Corpo agora mede 2 unidades no mundo. Use F e confira Último delta/distância: o controlador normaliza a direção global e converte o destino de volta para o pai.",
          "expect": "F ainda desloca exatamente 1 unidade global quando o passo cabe nos limites. A mudança local correspondente pode ser 0,5 unidade sob escala 2. Usar a coluna da Basis com escala sem normalizar pode multiplicar o deslocamento. Escala zero, negativa e não uniforme ficam fora desta prática."
        },
        {
          "title": "Explique as referências e restaure",
          "text": "Use R; no navegador, ajuste a câmera e os valores sem iniciar animação. Explique com suas palavras por que position é uma coordenada no pai e não uma ordem para mover na frente da própria peça. Compare as vistas ortográfica e de planta. O projeto limita coordenadas locais a X/Z entre −4 e 4 e Y entre 0,5 e 3; se um passo exceder esse espaço didático, ele é recusado inteiro. Restaure e tente novamente.",
          "expect": "As duas vistas representam os mesmos números; a planta omite altura no desenho e mostra Y na leitura. Não trate o desenho da câmera como prova da física. Para consultar os valores por código, use os exemplos opcionais depois de fazer a previsão no Inspector."
        }
      ]
    },
    "checks": [
      {
        "question": "Com pai em (2,0,1), sem rotação/escala, e filho em (0,0.5,−2), qual é a posição global?",
        "answer": "(2,0.5,−1). É a soma neste caso específico. Com rotação ou escala do pai, é preciso aplicar a transformação antes da translação."
      },
      {
        "question": "Girar a câmera muda os números de position da peça?",
        "answer": "Não. Muda a projeção e a aparência na tela. Mover ou transformar o pai é que muda a relação entre as coordenadas locais e o mundo."
      },
      {
        "question": "position += Vector3.FORWARD sempre avança no nariz da peça?",
        "answer": "Não. position está no espaço do pai. A frente própria pode ter outra orientação; para avançar nela e escrever uma posição global, use a direção da peça expressa no mundo, com o comprimento definido pelo seu contrato."
      },
      {
        "question": "Um Node3D com y=3 cai automaticamente e toda malha importada aponta para −Z?",
        "answer": "Não. Node3D não aplica física sozinho; a aula de corpos físicos tratará gravidade/colisão. −Z é frente de câmeras/várias APIs; assets podem seguir +Z como frente de modelo ou ter sido preparados de outro modo."
      }
    ],
    "pitfalls": [
      {
        "title": "O cubo não aparece ao executar",
        "text": "Confira MeshInstance3D, malha, câmera current, posição e luz/material. O gizmo de Marker3D do editor não substitui uma malha visível no jogo. O projeto já fornece esses elementos."
      },
      {
        "title": "Local e global parecem iguais",
        "text": "Confira se existe um pai Node3D transformado e top_level está false. Igualdade numérica em um caso não torna os dois espaços equivalentes."
      },
      {
        "title": "A direção mudou quando girei o pai",
        "text": "A posição do filho usa o sistema do pai. Diferencie esse sistema da orientação da própria peça e da vista da câmera. Na bancada, os botões de coordenada e F têm funções diferentes."
      },
      {
        "title": "Escala alterou a velocidade ou a distância",
        "text": "Uma coluna da Basis pode carregar escala. O passo global desta prática usa uma direção normalizada. Não generalize o exemplo para escala não uniforme/negativa ou corpo físico sem estudar as condições."
      }
    ],
    "summary": "Uma posição só faz sentido com sua referência. O mundo, o sistema do pai, a orientação da peça e a câmera têm papéis distintos. A convenção de unidades dá coerência à escala do projeto, mas não cria física nem garante o funcionamento de luz, áudio ou colisão.",
    "next": "Na aula 3D 2, aprofunde Transform3D e Basis para representar orientação e escala; as rotações usadas aqui ficaram limitadas ao eixo Y.",
    "sources": [
      {
        "label": "Godot 4.5 — Introdução ao 3D",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/introduction_to_3d.html"
      },
      {
        "label": "Godot 4.5 — Node3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_node3d.html"
      },
      {
        "label": "Godot 4.5 — Vector3 e convenções de frente",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_vector3.html"
      },
      {
        "label": "Godot 4.5 — Transformações 3D",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/using_transforms.html"
      },
      {
        "label": "Godot 4.5 — Camera3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_camera3d.html"
      },
      {
        "label": "Godot 4.5 — Marker3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_marker3d.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Consulta opcional: ler e converter um ponto",
      "whenToUse": "Depois de prever e conferir local/global no Inspector e na bancada.",
      "description": "consulta.gd é uma extensão: crie um Node adicional sob Oficina, anexe esse script e arraste Base/Peca para o campo peca no Inspector. O exemplo escreve no Output ao executar. Não substitua oficina.gd por ele. pai.to_global recebe a posição do filho no sistema do pai; peca.to_global(peca.position) misturaria referências.",
      "code": "extends Node\n\n@export var peca: Node3D\n\nfunc _ready() -> void:\n    if not is_instance_valid(peca):\n        push_warning(\"Arraste Base/Peca para o campo peca deste exemplo opcional.\")\n        return\n    var pai := peca.get_parent_node_3d()\n    if pai == null:\n        push_warning(\"Esta consulta pressupõe um pai Node3D.\")\n        return\n    print(\"No pai: \", peca.position)\n    print(\"No mundo: \", peca.global_position)\n    print(\"Convertido pelo pai: \", pai.to_global(peca.position))\n    print(\"Retorno ao pai: \", pai.to_local(peca.global_position))\n\n# Node3D guarda transformação; MeshInstance3D fornece a forma visível.\n",
      "pros": "Relaciona as leituras visuais à conversão de um ponto e à operação inversa.",
      "cons": "Pressupõe pai Node3D e cena instalada; leitura no Output não faz movimento nem aplica física."
    },
    {
      "title": "2. Controlador opcional da bancada pronta",
      "whenToUse": "Para estudar os botões e atalhos já instalados no projeto de apoio.",
      "description": "oficina.gd fica na raiz Oficina e usa os caminhos da cena fornecida e passo.gd. As alterações pelo Inspector no editor são a prática principal; este controlador cria a interface de runtime e facilita repetir os exemplos. A câmera ortográfica é reposicionada sem alterar a peça.",
      "code": "extends Node3D\n\nconst PASSO = preload(\"res://passo.gd\")\n@onready var base: Node3D = $Base\n@onready var peca: Node3D = $Base/Peca\n@onready var camera: Camera3D = $Camera3D\nvar modo: OptionButton\nvar leitura: Label\nvar mensagem: Label\nvar ultimo_delta := Vector3.ZERO\nvar azimute: float = 45.0\n\nfunc _ready() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var box := VBoxContainer.new()\n    box.position = Vector2(16, 405)\n    box.custom_minimum_size.x = 928\n    layer.add_child(box)\n    var row := HBoxContainer.new()\n    box.add_child(row)\n    botao(row, \"A · X −0,5\", func(): coordenada(Vector3(-0.5, 0, 0)))\n    botao(row, \"D · X +0,5\", func(): coordenada(Vector3(0.5, 0, 0)))\n    botao(row, \"E · Y +0,5\", func(): coordenada(Vector3(0, 0.5, 0)))\n    botao(row, \"Q · Y −0,5\", func(): coordenada(Vector3(0, -0.5, 0)))\n    botao(row, \"W · Z −0,5\", func(): coordenada(Vector3(0, 0, -0.5)))\n    botao(row, \"S · Z +0,5\", func(): coordenada(Vector3(0, 0, 0.5)))\n    modo = OptionButton.new()\n    modo.add_item(\"F: frente −Z da peça, 1 unidade global\")\n    modo.add_item(\"F: −Z fixo do mundo, 1 unidade global\")\n    box.add_child(modo)\n    row = HBoxContainer.new()\n    box.add_child(row)\n    botao(row, \"F · Avançar\", avancar)\n    botao(row, \"P · Exemplo pai 90°\", exemplo)\n    botao(row, \"O · Peça +45°\", girar_peca)\n    botao(row, \"T · Escala 1/2\", escalar_pai)\n    botao(row, \"C · Girar vista\", girar_camera)\n    botao(row, \"R · Restaurar\", restaurar)\n    leitura = Label.new()\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(leitura)\n    mensagem = Label.new()\n    mensagem.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(mensagem)\n    atualizar_camera()\n    mensagem.text = \"Valores da cena preservados. R restaura a bancada de referência.\"\n\nfunc botao(parent: Node, text: String, action: Callable) -> void:\n    var button := Button.new()\n    button.text = text\n    button.pressed.connect(action)\n    parent.add_child(button)\n\nfunc restaurar() -> void:\n    base.position = Vector3(2, 0, 1)\n    base.rotation_degrees = Vector3.ZERO\n    base.scale = Vector3.ONE\n    peca.position = Vector3(0, 0.5, -2)\n    peca.rotation_degrees = Vector3.ZERO\n    peca.scale = Vector3.ONE\n    ultimo_delta = Vector3.ZERO\n    azimute = 45\n    modo.select(0)\n    atualizar_camera()\n    mensagem.text = \"Coordenadas nos eixos do pai; frente da peça é outra direção. Sem física ou colisão.\"\n\nfunc aplicar(no_pai: Vector3) -> void:\n    if absf(no_pai.x) > 4.000001 or absf(no_pai.z) > 4.000001 or no_pai.y < 0.499999 or no_pai.y > 3.000001:\n        ultimo_delta = Vector3.ZERO\n        mensagem.text = \"Limite didático local: X/Z entre −4 e 4; Y entre 0,5 e 3. R restaura.\"\n        return\n    var antes := peca.global_position\n    peca.position = no_pai\n    ultimo_delta = peca.global_position - antes\n    mensagem.text = \"Passo aplicado. Compare posição no pai, no mundo e distância percorrida.\"\n\nfunc coordenada(offset: Vector3) -> void:\n    aplicar(peca.position + offset)\n\nfunc avancar() -> void:\n    var delta_global: Vector3 = PASSO.deslocamento(peca, modo.selected == 0)\n    var destino := peca.global_position + delta_global\n    aplicar(base.to_local(destino))\n\nfunc exemplo() -> void:\n    restaurar()\n    base.rotation_degrees.y = 90\n    mensagem.text = \"Pai Y=90°: local (0, 0.5, −2) → global (0, 0.5, 1).\"\n\nfunc girar_peca() -> void:\n    peca.rotation_degrees.y = wrapf(peca.rotation_degrees.y + 45, -180, 180)\n    ultimo_delta = Vector3.ZERO\n\nfunc escalar_pai() -> void:\n    base.scale = Vector3.ONE * (2.0 if base.scale.x < 1.5 else 1.0)\n    ultimo_delta = Vector3.ZERO\n\nfunc girar_camera() -> void:\n    azimute = fmod(azimute + 90.0, 360.0)\n    atualizar_camera()\n\nfunc atualizar_camera() -> void:\n    var a := deg_to_rad(azimute)\n    var b := deg_to_rad(35)\n    var centro := Vector3(0, -3, 0)\n    camera.position = centro + Vector3(sin(a) * cos(b), sin(b), cos(a) * cos(b)) * 18\n    camera.look_at(centro, Vector3.UP)\n    camera.make_current()\n\nfunc _process(_delta: float) -> void:\n    if leitura == null:\n        return\n    var frente := (-peca.global_transform.basis.z).normalized()\n    leitura.text = (\"Position (no pai): %s | global_position: %s\\n\" +\n        \"Pai: %s | Y do pai: %.0f° | Y da peça: %.0f° | escala do pai: %.1f\\n\" +\n        \"Frente da peça no mundo: %s\\n\" +\n        \"Último delta global: %s | distância: %.3f u\\n\" +\n        \"Convenção do projeto: 1 u = 1 m. Node3D não aplica gravidade.\") % [\n        str(peca.position), str(peca.global_position), str(base.position),\n        base.rotation_degrees.y, peca.rotation_degrees.y, base.scale.x,\n        str(frente), str(ultimo_delta), ultimo_delta.length()]\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo:\n        return\n    if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n        return\n    match event.keycode:\n        KEY_A, KEY_LEFT: coordenada(Vector3(-0.5, 0, 0))\n        KEY_D, KEY_RIGHT: coordenada(Vector3(0.5, 0, 0))\n        KEY_W, KEY_UP: coordenada(Vector3(0, 0, -0.5))\n        KEY_S, KEY_DOWN: coordenada(Vector3(0, 0, 0.5))\n        KEY_Q: coordenada(Vector3(0, -0.5, 0))\n        KEY_E: coordenada(Vector3(0, 0.5, 0))\n        KEY_F: avancar()\n        KEY_P: exemplo()\n        KEY_O: girar_peca()\n        KEY_T: escalar_pai()\n        KEY_C: girar_camera()\n        KEY_R: restaurar()\n",
      "pros": "Restaura valores conhecidos, compara direção e mostra deslocamento medido em unidades globais.",
      "cons": "É manipulação de Node3D sem colisão. Limites são didáticos; não é um controlador de CharacterBody3D."
    },
    {
      "title": "3. Um deslocamento global de uma unidade",
      "whenToUse": "Como função usada por F no controlador, após distinguir orientação de escala.",
      "description": "passo.gd é um RefCounted com função estática; o controlador fornece uma peça válida na árvore e escala uniforme positiva. Para a frente da peça, usa −global_transform.basis.z normalizado; para o mundo, Vector3.FORWARD. O controlador depois converte o destino com base.to_local e aplica os limites. A aula seguinte detalha a Basis.",
      "code": "extends RefCounted\n\n# Pré-condição da bancada: peça válida na árvore, escala uniforme positiva.\nstatic func deslocamento(peca: Node3D, pela_frente: bool) -> Vector3:\n    if pela_frente:\n        # A coluna contém escala; normalize para o passo medir 1 unidade global.\n        return (-peca.global_transform.basis.z).normalized()\n    return Vector3.FORWARD\n",
      "pros": "Define explicitamente o comprimento do passo e evita multiplicá-lo pela escala herdada.",
      "cons": "Não recebe input, não mede tempo e não resolve colisão. Normalizar um vetor não corrige toda transformação arbitrária ou escala singular."
    }
  ],
  "simulator": {
    "type": "space_3d_axes",
    "title": "Laboratório: onde a peça está e para onde avança",
    "description": "Diagrama estático Canvas/JavaScript com uma vista ortográfica matemática e uma planta XZ. Não executa Godot, WebGL ou física. Pai em (2,0,1); rotação só em Y e escala uniforme positiva. Grade de 1 unidade, com enquadramento automático para caber nos limites do painel. A planta ignora Y visualmente, mas mostra a altura numérica. Ajustes funcionam também com a simulação pausada.",
    "guide": [
      {
        "title": "Preveja antes de girar",
        "text": "Restaure: local (0,0.5,−2), global (2,0.5,−1). P aplica pai Y=90°: global (0,0.5,1). Mude azimute da câmera: as coordenadas e os vetores não devem mudar."
      },
      {
        "title": "Mova por comando",
        "text": "Com foco na cena: WASD/setas alteram X/Z no pai por 0,5; Q/E alteram Y; F dá 1 unidade global na direção escolhida; P instala exemplo; R restaura. Há botões equivalentes. F pode produzir coordenadas locais fracionárias; as leituras são arredondadas para três casas."
      },
      {
        "title": "Compare escala e direção",
        "text": "Com P e escala 2, o global é (−2,1,1). F pela frente da peça desloca (−1,0,0) no mundo, com comprimento 1. Não confunda os passos nos eixos do pai com a frente própria. Não há gravidade nem promessa de perspectiva/oclusão idêntica ao renderizador da Godot."
      }
    ]
  },
  "quiz": {
    "question": "A base está em (2,0,1), gira +90° em Y e tem escala 1. A peça mantém position=(0,0.5,−2). Qual previsão está correta?",
    "options": [
      "A peça fica em global_position=(0,0.5,1); girar apenas a câmera depois não muda esse valor.",
      "A peça continua em global_position=(2,0.5,−1), porque rotação do pai nunca afeta a origem de um filho.",
      "position passa automaticamente a ser (0,0.5,1), pois sempre guarda coordenadas globais.",
      "A peça cai automaticamente em −Y, porque todo Node3D já tem gravidade."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. O deslocamento local em −Z é girado para −X global antes de somar a posição da base.",
      "A rotação do pai transforma o deslocamento do filho em torno do pai.",
      "position continua no sistema do pai; global_position expressa o resultado no mundo.",
      "Node3D guarda transformação, sem simular gravidade sozinho."
    ],
    "explanation": "A contribuição horizontal (0,0,−2) vira (−2,0,0) com Y=+90°. Somando (2,0,1) e a altura 0,5, o resultado é (0,0.5,1). A câmera só muda a projeção desse estado na tela."
  }
},

{
  "id": "3d-intro-transforms-basis",
  "area": "3d",
  "level": "introducao",
  "levelLabel": "Introdução",
  "title": "2. Transform3D e Basis: posição, eixos e interpolação",
  "subtitle": "Leia uma transformação, compare ordens de rotação e interpole orientações preservando a escala à parte.",
  "nodesUsed": [
    "Node3D",
    "Transform3D",
    "Basis",
    "Quaternion"
  ],
  "feynman": {
    "title": "Uma origem e três eixos que acompanham a peça",
    "explanation": "Imagine uma pequena régua em cada direção da peça. Transform3D reúne a origem desse sistema e uma Basis com três vetores: x, y e z. Eles descrevem como coordenadas da peça se transformam na referência de destino. No transform do nó, o destino é o pai; em global_transform, é o mundo. As réguas podem girar e mudar de comprimento. A câmera apenas muda como você enxerga o resultado. Para interpolar uma orientação, podemos usar um quaternion unitário; ele representa rotação, sem carregar posição ou escala.",
    "analogies": [
      {
        "term": "Ponto e vetor",
        "analogy": "Um ponto tem endereço: recebe a contribuição da origem. Um vetor de deslocamento não tem endereço: a Basis o gira e escala, sem translação."
      },
      {
        "term": "Colunas da Basis",
        "analogy": "As colunas x/y/z são as imagens dos vetores unitários locais. A posição da origem não fica nessas colunas; é a quarta coluna do Transform3D."
      },
      {
        "term": "Orientação e ângulos",
        "analogy": "Uma mesma orientação pode ter diferentes descrições em Euler. Os ângulos são uma forma de controlar ou ler a pose; não são três rotações independentes do contexto."
      }
    ]
  },
  "howItWorks": {
    "overview": "Um ponto local p chega ao pai por transform × p = basis × p + origin. Com top_level=false, global_transform compõe as transformações dos ancestrais. Basis é uma matriz 3×3: pode representar rotação, escala e cisalhamento. Nossa prática usa apenas rotações próprias e escala uniforme positiva. O Inspector mostra graus; funções de rotação normalmente recebem radianos. Não é preciso decorar a álgebra: acompanhe primeiro as colunas e as previsões numéricas.",
    "anatomy": [
      {
        "prop": "transform.origin e transform.basis",
        "desc": "origin coincide com position e usa o pai. As colunas basis.x/y/z também estão no pai. Em global_transform, origem e colunas são expressas no mundo. +basis.z é a imagem de +Z; só use −z como frente quando essa for a convenção escolhida."
      },
      {
        "prop": "Comprimento, perpendicularidade e escala",
        "desc": "Eixos perpendiculares formam uma base ortogonal; com comprimento 1, ela é ortonormal. A escala 2 desta prática deixa cada eixo com comprimento 2. orthonormalized() devolve outra base, removendo escala/cisalhamento; não é uma limpeza que preserve qualquer Transform. Trabalhamos com determinante positivo; reflexões e escalas singulares ficam fora."
      },
      {
        "prop": "Euler YXZ, XYZ e singularidade",
        "desc": "A ordem padrão é YXZ. Aqui explicitamos a construção RY × RX × RZ; aplicada a um vetor-coluna, a matriz mais à direita age primeiro. Em XYZ usamos RX × RY × RZ. Trocar a ordem pode mudar a pose. Em YXZ com pitch ±90°, duas liberdades dos parâmetros se tornam dependentes: é gimbal lock da representação, não bloqueio físico do objeto."
      },
      {
        "prop": "Quaternion unitário e SLERP",
        "desc": "Quaternion guarda só rotação e deve ser normalizado. SLERP interpola entre orientações; o peso 0 escolhe a inicial e 1 a final. Não interpolamos Euler componente a componente. Nesta prática a final é a identidade no pai, e escala/origem são recompostas separadamente. Retornar a Euler para comandar tudo de novo pode reintroduzir singularidades."
      },
      {
        "prop": "rotate_y versus rotate_object_local",
        "desc": "rotate_y gira a Basis em torno do eixo Y do pai. rotate_object_local(Vector3.UP, ângulo) usa Y da própria peça. Ambos mantêm a origem. Pai e mundo só coincidem sob condições apropriadas. Já transform.rotated() também pode girar origin em torno da origem da referência: não confunda essas operações."
      }
    ]
  },
  "teaching": {
    "codeRequired": false,
    "codeIntro": "Use primeiro a bancada pronta e faça as previsões. Os scripts são consultas opcionais: leitura de um ponto, cálculo da transformação e controlador da interface. Nesta introdução não é necessário implementar quaternions manualmente.",
    "duration": "60–85 min com previsões e comparações (estimativa)",
    "prerequisite": "Aula 3D 1: eixos, convenção de frente, position/global_position e escala herdada. Referência Godot 4.5, GDScript, Compatibility, desktop. Projeto revisado documentalmente; execução no motor ainda pendente.",
    "objectives": [
      "Ler origin e as colunas da Basis, distinguindo transformar um ponto de transformar um vetor.",
      "Comparar referências, ordem de rotação e exemplos de uma mesma orientação descrita por ângulos diferentes.",
      "Interpolar rotação com peso explícito, mantendo escala e origem separadas."
    ],
    "practice": {
      "title": "Prática guiada: a bancada de transformações",
      "intro": "A cena pronta tem cubo, nariz em −Z, ponto ciano p=(1,0,0), eixos mundiais, câmera e luz. A bancada cria controles em runtime. Ela inicia pelos parâmetros da interface, substituindo o Transform salvo de Base/Peca; para restaurar, use R. Não há física, movimento automático nem alvo de perseguição.",
      "tree": "Oficina (Node3D / oficina.gd)\n├── Eixos (malhas e rótulos mundiais +X/+Y/+Z)\n├── Piso (MeshInstance3D, abaixo da bancada)\n├── Base (Node3D) — origem zero, escala 1, rotação Y controlada\n│   └── Peca (Node3D)\n│       ├── Corpo (BoxMesh de 1×1×1)\n│       ├── Nariz (malha ciana em −Z)\n│       └── Frente (Marker3D, gizmo de editor)\n├── Camera3D (ortográfica, atual)\n└── DirectionalLight3D\n\nRuntime: CanvasLayer/controles e uma esfera ciana no ponto transformado.\ncalculo.gd é RefCounted, chamado pelo controlador; não anexar a Node3D.\nconsulta.gd: opcional, em Node extra, com Peca atribuída.",
      "download": {
        "url": "assets/aula-3d-02-transform-basis.zip",
        "label": "Baixar projeto de apoio: Transform3D e Basis"
      },
      "downloadNote": "Sete arquivos locais, sem plugins ou arte externa. Referência Godot 4.5; importar/compilar e executar no motor continua pendente.",
      "steps": [
        {
          "title": "Reconheça o que é posição e o que é eixo",
          "text": "Extraia o ZIP, importe project.godot e abra oficina.tscn. Os rótulos da cena marcam eixos do mundo, não os eixos rotacionados da peça. Execute F6: a interface cria a pose inicial (20°,40°,−10°), YXZ, escala 1 e origin=(2,0,1). Leia as colunas numéricas. No navegador as setas x/y/z mostram as colunas globais.",
          "expect": "A origem é a posição do sistema da peça, não a ponta de uma seta. A esfera ciana é um ponto local transformado; o nariz é outra malha e não representa esse ponto."
        },
        {
          "title": "Faça uma transformação que cabe na conta",
          "text": "Use P ou Exemplo Y=90°. Com peso 0, escala 1 e pai Y=0, preveja: x=(0,0,−1), y=(0,1,0), z=(1,0,0). O ponto p=(1,0,0) recebe basis×p=(0,0,−1). Somando origin=(2,0,1), chega ao pai em (2,0,0).",
          "expect": "Ponto no pai e no mundo coincidem porque Base tem transformação identidade. O vetor transformado não inclui origin. Não some posição duas vezes."
        },
        {
          "title": "Varie escala, origem e pai separadamente",
          "text": "Partindo de P, mude escala para 2: p no pai vira (2,0,−1), e os comprimentos das três colunas viram 2. Mude só origin.x: as colunas permanecem iguais, mas o ponto muda. Restaure P e ajuste pai Y=90°: p no pai continua (2,0,0), enquanto no mundo vira (0,0,−2).",
          "expect": "A transformação do pai altera a expressão mundial. Os rótulos da matriz do laboratório dizem “no pai”; não compare seus números diretamente com a orientação mundial das setas sem considerar Base."
        },
        {
          "title": "Compare a ordem de composição",
          "text": "Clique Comparar ordens / X=Y=90°. Mantenha peso 0, escala 1 e roll 0. Em YXZ, o +Z local vira −Y: z=(0,−1,0). Troque para XYZ, sem mudar os ângulos: +Z vira +X, z=(1,0,0). Volte para YXZ antes da comparação seguinte.",
          "expect": "Os ângulos iguais não garantem orientação igual se a ordem mudar. RY×RX e RX×RY são operações diferentes; os exemplos não simulam anéis físicos de um giroscópio."
        },
        {
          "title": "Observe a singularidade sem tentar travar o objeto",
          "text": "Selecione Singular A: YXZ, pitch=90°, yaw=30°, roll=0°. Anote as colunas. Selecione Singular B: pitch=90°, yaw=60°, roll=30°. As colunas e o ponto são os mesmos, salvo arredondamento. Ambos os presets restauram o restante dos parâmetros, inclusive peso 0.",
          "expect": "Nesse pitch, yaw e roll deixam de descrever graus de liberdade independentes; manter yaw−roll preserva a orientação neste exemplo. O objeto ainda pode ser orientado usando outra representação. Quaternions não corrigem automaticamente código que volta a integrar ângulos Euler."
        },
        {
          "title": "Interpole somente a rotação",
          "text": "Use P e ajuste peso para 0,5. A pose aplicada fica em Y=45°; a inicial continua Y=90°. Para escala 1, x≈(0.707,0,−0.707) e p no pai≈(2.707,0,0.293). Em peso 1, Basis de rotação é identidade e p=(3,0,1). Repita com escala 2: em peso 1 o ponto é (4,0,1), e os eixos continuam medindo 2.",
          "expect": "Peso não é tempo decorrido. Você pode voltar a qualquer valor e repetir sem recarregar. Identidade é relativa ao pai: se o pai girar, o objeto ainda gira no mundo. Escala e origem não são carregadas pelo quaternion."
        },
        {
          "title": "Explique os limites e restaure",
          "text": "Use R. Compare um ponto (Transform3D×p) com um vetor (Basis×v). No navegador, A/D ou setas horizontais alteram yaw; Q/E ou setas verticais, pitch; Z/C, roll; cada toque vale 5°. P instala o exemplo e R restaura. No projeto, use A/D/Q/E/Z/C/P/R ou os controles; teclas são tratadas quando a interface não as consome.",
          "expect": "A peça fica parada sem ajuste. A bancada não demonstra cisalhamento, reflexões, colisão, look_at ou alinhamento a terrenos. Para movimento contínuo futuro, um peso como 1−exp(−taxa×delta) descreve aproximação exponencial, não duração fixa nem velocidade angular constante."
        }
      ]
    },
    "checks": [
      {
        "question": "Por que Transform3D×p e Basis×p podem dar resultados diferentes?",
        "answer": "Transform3D soma origin após aplicar a Basis. Uma Basis sozinha transforma o vetor sem translação. Um ponto local usado com global_transform chega ao mundo."
      },
      {
        "question": "Escala 2 mantém uma Basis ortonormal? orthonormalized() preserva essa escala?",
        "answer": "Não. Nesta prática os eixos continuam perpendiculares, mas medem 2. Ortonormalizar devolve eixos unitários e perde a escala; o método retorna uma cópia, que precisa ser atribuída se quiser aplicá-la."
      },
      {
        "question": "Os exemplos YXZ singulares A e B mostram que o objeto ficou fisicamente bloqueado?",
        "answer": "Não. Mostram a dependência de parâmetros Euler em pitch=90°. Ângulos diferentes podem representar a mesma orientação; um quaternion unitário representa rotação sem usar esses três parâmetros."
      },
      {
        "question": "Peso 1 no SLERP desta bancada significa identidade mundial?",
        "answer": "A identidade alvo é no pai. A escala é recomposta à parte e o pai ainda influencia global_transform. Peso 1 não zera origin nem remove a rotação do pai."
      }
    ],
    "pitfalls": [
      {
        "title": "A orientação não bate com os ângulos anotados",
        "text": "Confira ordem YXZ/XYZ e peso. Os ângulos descrevem a pose inicial, enquanto o desenho mostra a pose interpolada aplicada. R restaura parâmetros e ordem."
      },
      {
        "title": "O ponto está deslocado ou parece receber posição duas vezes",
        "text": "Use transform×p para pai ou global_transform×p para mundo; não some global_position novamente. Confira se está olhando a esfera do ponto ou o nariz da peça."
      },
      {
        "title": "A escala desapareceu ao suavizar",
        "text": "Não passe Basis com escala/cisalhamento diretamente para interpolar rotação. Separe uma rotação própria e recomponha a escala em nó visual ou operação explícita; orthonormalized não conserva a escala."
      },
      {
        "title": "Meu código de look_at ou rampa ainda falha",
        "text": "Esses algoritmos exigem direções válidas, tratamento de vetores paralelos e referências coerentes. Não são implementados aqui; não copie os antigos exemplos como solução universal."
      }
    ],
    "summary": "Transform3D leva pontos entre referências usando Basis e origin. As colunas mostram eixos transformados; sua direção e comprimento ajudam a ler orientação e escala. Euler depende da ordem e tem singularidades. Quaternion unitário representa apenas rotação; interpolá-lo não dispensa definir referência, escala e peso.",
    "next": "Na aula 3D 3, compare MeshInstance3D e CSG para construir formas. Guarde a distinção entre a geometria desenhada e a transformação que a posiciona.",
    "sources": [
      {
        "label": "Transform3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_transform3d.html"
      },
      {
        "label": "Basis 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_basis.html"
      },
      {
        "label": "Quaternion 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_quaternion.html"
      },
      {
        "label": "Node3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_node3d.html"
      },
      {
        "label": "Usando transformações 3D",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/using_transforms.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Ler e transformar um ponto",
      "whenToUse": "Depois da previsão numérica do exemplo Y=90°.",
      "description": "Adicione um Node extra sob Oficina, anexe consulta.gd e atribua Base/Peca ao campo peca. Não substitua oficina.gd. O Output mostra colunas, origem, ponto no pai/mundo e vetor sem translação.",
      "code": "extends Node\n\n@export var peca: Node3D\n\nfunc _ready() -> void:\n    # O controlador da raiz instala a pose em _ready depois dos filhos.\n    mostrar.call_deferred()\n\nfunc mostrar() -> void:\n    if not is_instance_valid(peca):\n        push_warning(\"Atribua Base/Peca no campo peca do Node extra.\")\n        return\n    var ponto := Vector3(1, 0, 0)\n    print(\"Coluna x no pai: \", peca.transform.basis.x)\n    print(\"Coluna y no pai: \", peca.transform.basis.y)\n    print(\"Coluna z no pai: \", peca.transform.basis.z)\n    print(\"Origem no pai: \", peca.transform.origin)\n    print(\"Ponto no pai: \", peca.transform * ponto)\n    print(\"Ponto no mundo: \", peca.global_transform * ponto)\n    print(\"Apenas vetor, sem translação: \", peca.transform.basis * ponto)\n    print(\"Comprimentos: \", peca.basis.x.length(), \", \", peca.basis.y.length(), \", \", peca.basis.z.length())\n",
      "pros": "Relaciona a leitura visual ao operador de transformação.",
      "cons": "A consulta imprime ao iniciar; a bancada aplica sua pose inicial em _ready. Para outro exemplo, imprima novamente após o ajuste."
    },
    {
      "title": "2. Calcular rotação, escala e origem separadas",
      "whenToUse": "Para estudar o cálculo chamado pela interface.",
      "description": "calculo.gd é RefCounted, usado com preload pelo controlador. transformar recebe graus, converte para radianos e usa ordem explícita. O segundo método é uma consulta independente para comparar eixo do pai/objeto em uma peça com escala unitária; não é um botão desta bancada.",
      "code": "extends RefCounted\n\n# Escala uniforme positiva; somente rotações próprias, sem cisalhamento.\nstatic func transformar(pitch: float, yaw: float, roll: float,\n        ordem: EulerOrder, peso: float, escala: float, origem: Vector3) -> Transform3D:\n    var angulos := Vector3(deg_to_rad(pitch), deg_to_rad(yaw), deg_to_rad(roll))\n    var inicial := Basis.from_euler(angulos, ordem)\n    var q_inicial := inicial.get_rotation_quaternion().normalized()\n    var q_final := q_inicial.slerp(Quaternion.IDENTITY, clampf(peso, 0.0, 1.0)).normalized()\n    # Interpolamos apenas rotação; escala e origem são recompostas à parte.\n    var base := Basis(q_final).scaled_local(Vector3.ONE * escala)\n    return Transform3D(base, origem)\n\nstatic func girar_no_referencial(peca: Node3D, no_objeto: bool) -> void:\n    # Usar numa peça válida da árvore com escala unitária e pai sem escala.\n    # Ambos preservam a origem; rotate_y usa o eixo Y do PAI, não necessariamente mundial.\n    if no_objeto:\n        peca.rotate_object_local(Vector3.UP, deg_to_rad(30.0))\n    else:\n        peca.rotate_y(deg_to_rad(30.0))\n",
      "pros": "Interpola quaternions normalizados e recompõe escala/origem de forma explícita.",
      "cons": "Somente escala uniforme positiva e rotações próprias. Não extrai rotação arbitrária de bases singulares, com cisalhamento ou reflexão."
    },
    {
      "title": "3. Controlador da bancada pronta",
      "whenToUse": "Para consultar como controles e leituras do projeto se conectam.",
      "description": "oficina.gd fica em Oficina; usa Base/Peca, Camera3D e calculo.gd. Cria a interface e a esfera do ponto. Não exige InputMap. Ao iniciar e restaurar, instala os valores da interface; alterações de Transform salvas na peça não são os parâmetros de entrada desta bancada.",
      "code": "extends Node3D\n\nconst CALCULO = preload(\"res://calculo.gd\")\n@onready var base: Node3D = $Base\n@onready var peca: Node3D = $Base/Peca\nvar valores := {\"rx\": 20.0, \"ry\": 40.0, \"rz\": -10.0, \"escala\": 1.0, \"ox\": 2.0, \"pai\": 0.0, \"peso\": 0.0}\nvar sliders: Dictionary = {}\nvar rotulos: Dictionary = {}\nvar ordem: OptionButton\nvar leitura: Label\nvar ponto_visual: MeshInstance3D\n\nfunc _ready() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var box := VBoxContainer.new()\n    box.position = Vector2(16, 395)\n    box.custom_minimum_size.x = 928\n    layer.add_child(box)\n    var grid := GridContainer.new()\n    grid.columns = 4\n    box.add_child(grid)\n    criar_slider(grid, \"rx\", \"Pitch X\", -90, 90, 5)\n    criar_slider(grid, \"ry\", \"Yaw Y\", -180, 180, 5)\n    criar_slider(grid, \"rz\", \"Roll Z\", -180, 180, 5)\n    criar_slider(grid, \"escala\", \"Escala uniforme\", 0.5, 2, 0.5)\n    criar_slider(grid, \"ox\", \"origin.x no pai\", -2, 3, 0.5)\n    criar_slider(grid, \"pai\", \"Pai Y\", 0, 90, 15)\n    criar_slider(grid, \"peso\", \"Peso SLERP\", 0, 1, 0.05)\n    ordem = OptionButton.new()\n    ordem.add_item(\"YXZ: Ry * Rx * Rz\")\n    ordem.add_item(\"XYZ: Rx * Ry * Rz\")\n    ordem.item_selected.connect(func(_index: int): aplicar())\n    grid.add_child(ordem)\n    var row := HBoxContainer.new()\n    box.add_child(row)\n    for i in range(5):\n        var button := Button.new()\n        button.text = [\"R: restaurar\", \"P: Y=90\", \"X=Y=90\", \"Singular A\", \"Singular B\"][i]\n        button.pressed.connect(exemplo.bind(i))\n        row.add_child(button)\n    leitura = Label.new()\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(leitura)\n    var ajuda := Label.new()\n    ajuda.text = \"A/D yaw, Q/E pitch, Z/C roll: 5 graus por toque; P exemplo; R restaura. Sem movimento automatico.\"\n    ajuda.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(ajuda)\n    ponto_visual = MeshInstance3D.new()\n    var esfera := SphereMesh.new()\n    esfera.radius = 0.09\n    esfera.height = 0.18\n    var material := StandardMaterial3D.new()\n    material.albedo_color = Color.CYAN\n    esfera.material = material\n    ponto_visual.mesh = esfera\n    add_child(ponto_visual)\n    $Camera3D.position = Vector3(10, 8, 10)\n    $Camera3D.look_at(Vector3(0, -3, 0), Vector3.UP)\n    # Esta bancada usa os parâmetros da interface ao iniciar, não Transform salvo da peça.\n    exemplo(0)\n\nfunc criar_slider(parent: Node, chave: String, texto: String, minimo: float, maximo: float, passo: float) -> void:\n    var box := VBoxContainer.new()\n    box.custom_minimum_size.x = 220\n    parent.add_child(box)\n    var label := Label.new()\n    box.add_child(label)\n    rotulos[chave] = label\n    var slider := HSlider.new()\n    slider.min_value = minimo\n    slider.max_value = maximo\n    slider.step = passo\n    slider.value = valores[chave]\n    slider.set_meta(\"titulo\", texto)\n    box.add_child(slider)\n    sliders[chave] = slider\n    slider.value_changed.connect(ajustar.bind(chave))\n\nfunc ajustar(valor: float, chave: String) -> void:\n    valores[chave] = valor\n    aplicar()\n\nfunc exemplo(tipo: int) -> void:\n    valores = {\"rx\": 20.0, \"ry\": 40.0, \"rz\": -10.0, \"escala\": 1.0, \"ox\": 2.0, \"pai\": 0.0, \"peso\": 0.0}\n    ordem.select(0)\n    if tipo == 1:\n        valores.rx = 0.0\n        valores.ry = 90.0\n        valores.rz = 0.0\n    elif tipo == 2:\n        valores.rx = 90.0\n        valores.ry = 90.0\n        valores.rz = 0.0\n    elif tipo == 3 or tipo == 4:\n        valores.rx = 90.0\n        valores.ry = 30.0 if tipo == 3 else 60.0\n        valores.rz = 0.0 if tipo == 3 else 30.0\n    aplicar()\n\nfunc aplicar() -> void:\n    for chave in sliders:\n        sliders[chave].set_value_no_signal(valores[chave])\n        rotulos[chave].text = \"%s: %.2f\" % [sliders[chave].get_meta(\"titulo\"), valores[chave]]\n    base.transform = Transform3D(Basis(Vector3.UP, deg_to_rad(valores.pai)), Vector3.ZERO)\n    var ordem_euler := EULER_ORDER_YXZ if ordem.selected == 0 else EULER_ORDER_XYZ\n    peca.transform = CALCULO.transformar(valores.rx, valores.ry, valores.rz, ordem_euler, valores.peso, valores.escala, Vector3(valores.ox, 0, 1))\n    ponto_visual.global_position = peca.global_transform * Vector3(1, 0, 0)\n    var b := peca.basis\n    leitura.text = \"Basis no pai: x=%s | y=%s | z=%s\\norigin=%s | p=(1,0,0) no pai=%s | no mundo=%s\\nComprimentos=(%.2f, %.2f, %.2f); peso=%.2f. Escala e origem fora do SLERP.\" % [b.x, b.y, b.z, peca.position, peca.transform * Vector3(1,0,0), ponto_visual.global_position, b.x.length(), b.y.length(), b.z.length(), valores.peso]\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo:\n        return\n    if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n        return\n    var teclas := {KEY_A: [\"ry\", -5], KEY_D: [\"ry\", 5], KEY_Q: [\"rx\", -5], KEY_E: [\"rx\", 5], KEY_Z: [\"rz\", -5], KEY_C: [\"rz\", 5]}\n    if event.keycode == KEY_R:\n        exemplo(0)\n    elif event.keycode == KEY_P:\n        exemplo(1)\n    elif teclas.has(event.keycode):\n        var acao: Array = teclas[event.keycode]\n        var chave: String = acao[0]\n        valores[chave] = clampf(valores[chave] + acao[1], sliders[chave].min_value, sliders[chave].max_value)\n        aplicar()\n    else:\n        return\n    get_viewport().set_input_as_handled()\n",
      "pros": "Reproduz as comparações sem movimento automático e sem recarregar.",
      "cons": "Interface e enquadramento precisam de conferência real no motor. Não representa física, giroscópio mecânico ou alinhamento a terrenos."
    }
  ],
  "simulator": {
    "type": "transform_basis_3d",
    "title": "Laboratório: colunas, ponto e orientação interpolada",
    "description": "Modelo estático Canvas/JavaScript. Exibe Transform3D no pai, eixos no mundo e o ponto p=(1,0,0). A pose inicial usa Euler YXZ ou XYZ; um quaternion unitário interpola até a identidade NO PAI pelo peso manual. Escala uniforme positiva e origin são recompostas fora do SLERP. Sem Godot/WebGL/física, cisalhamento ou movimento automático.",
    "guide": [
      {
        "title": "Comece por uma conta",
        "text": "P: Y=90°, escala 1, peso 0, origin=(2,0,1). x=(0,0,−1), p no pai=(2,0,0). Escala 2 dá p=(2,0,−1). Com pai Y=90°, o ponto mundial muda, mas a matriz local não."
      },
      {
        "title": "Compare ordem e singularidade",
        "text": "Preset X=Y=90°, peso 0: troque YXZ/XYZ e observe a coluna z. Singular A/B usam YXZ com pitch=90° e mostram a mesma orientação para ângulos diferentes. Não são anéis mecânicos nem uma trava física."
      },
      {
        "title": "Repita a interpolação",
        "text": "P e peso 0,5 dão Y=45°. Peso 1 chega à identidade no pai, preservando escala e origem. Com foco no desenho: A/D ou setas yaw; Q/E ou setas pitch; Z/C roll; P exemplo; R restaura. Pausa não impede ajustes deste modelo estático."
      }
    ]
  },
  "quiz": {
    "question": "No exemplo Y=90°, escala 2, origin=(2,0,1) e pai identidade, o que ocorre ao levar o peso SLERP a 1?",
    "options": [
      "O ponto local (1,0,0) chega a (4,0,1) no pai; rotação vira identidade, mas escala 2 e origem permanecem.",
      "O ponto chega a (1,0,0), pois Quaternion também zera posição e escala.",
      "A escala desaparece porque toda interpolação exige modificar a peça para escala 1.",
      "Nada muda: SLERP só interpola os três ângulos Euler separadamente."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Rotação identidade com escala 2 leva o vetor a (2,0,0), e a origem soma (2,0,1).",
      "Quaternion só representa rotação; origem e escala são recompostas fora dele.",
      "As rotações interpoladas são unitárias; a escala desejada é recomposta explicitamente no resultado.",
      "SLERP usa quaternions de orientação, não lerp componente a componente dos ângulos."
    ],
    "explanation": "O resultado é Basis.IDENTITY com escala uniforme 2 e origin=(2,0,1). Para o ponto (1,0,0), o resultado é (2,0,0)+(2,0,1)=(4,0,1). Esta conclusão usa o pai identidade do enunciado."
  }
},

{
  "id": "3d-intro-meshes-csg",
  "area": "3d",
  "level": "introducao",
  "levelLabel": "Introdução",
  "title": "3. Malhas, CSG e importação: do protótipo à cena",
  "subtitle": "Separe geometria visual e colisão, combine formas com CSG e confira o que um arquivo glTF realmente traz.",
  "nodesUsed": [
    "MeshInstance3D",
    "BoxMesh",
    "CSGBox3D",
    "CSGCombiner3D",
    "glTF 2.0 / .glb"
  ],
  "feynman": {
    "title": "A forma desenhada e a forma que bloqueia passagem",
    "explanation": "Uma malha descreve uma superfície por vértices e faces. MeshInstance3D coloca um recurso Mesh na cena para desenhá-lo, mas esse desenho sozinho não vira uma parede física. CSG combina volumes simples para esboçar o cenário: unir conserva material de ambas as formas, subtrair remove de A o que B ocupa, e intersectar conserva só o que elas compartilham. Depois, importar uma cena glTF traz uma hierarquia e seus recursos suportados; ainda precisamos conferir escala, materiais e colisões.",
    "analogies": [
      {
        "term": "Mesh e MeshInstance3D",
        "analogy": "A receita geométrica é um recurso; cada nó é uma colocação dessa forma na oficina. Mais de um nó pode usar a mesma malha."
      },
      {
        "term": "CSG e ordem",
        "analogy": "Uma primeira peça fornece material, e a seguinte executa uma operação sobre o resultado anterior. A ordem e a hierarquia fazem parte da construção."
      },
      {
        "term": "Visual e física",
        "analogy": "Ver uma parede e encontrar uma barreira são verificações diferentes. É possível desenhar sem colisão ou manter uma colisão mesmo sem desenho visível."
      }
    ]
  },
  "howItWorks": {
    "overview": "Comece com PrimitiveMesh para reconhecer a diferença entre recurso e instância. Depois combine duas CSGBox3D sob uma CSGCombiner3D e faça previsões. A deve vir antes de B: no nosso exemplo A fornece o primeiro sólido; a operação de B age sobre ele. Por fim, compare o protótipo com uma malha convertida e com um .glb de teste. A prática principal usa o editor e uma bancada pronta; os scripts são consulta opcional.",
    "anatomy": [
      {
        "prop": "MeshInstance3D.mesh e PrimitiveMesh",
        "desc": "BoxMesh e outras primitivas são recursos de geometria, não corpos físicos. O Transform do nó posiciona a instância. Se dois nós compartilham o mesmo recurso, editar suas propriedades pode afetar ambos; torne o recurso único quando quiser uma variante independente."
      },
      {
        "prop": "CSGCombiner3D → A → B na ordem da árvore",
        "desc": "O combiner organiza a combinação. Cada nó processa seus filhos e as operações são aplicadas na ordem da árvore. Aqui A e B são irmãos diretos, A primeiro, B depois. A operação do primeiro filho não fornece um sólido anterior para recortar. Duas raízes CSG separadas não fazem automaticamente uma booleana entre si."
      },
      {
        "prop": "use_collision na raiz CSG",
        "desc": "Começa desligado. Quando habilitado, adiciona colisão que se comporta como corpo estático; ainda é preciso testar consulta física, dimensões e filtros. Esconder o CSG não desliga essa colisão. Não há personagem nem garantia de passagem só por ativar uma opção."
      },
      {
        "prop": "Bake de malha e bake de colisão",
        "desc": "Converter o resultado visual cria recursos estáticos e evita manter a reconstrução CSG para essa versão. O bake visual e o de colisão são ações distintas. O original pode continuar na árvore: desative use_collision e esconda-o para não duplicar a versão ativa. Um CollisionShape3D precisa estar sob um corpo adequado; uma forma isolada não bloqueia passagem."
      },
      {
        "prop": ".glb, .gltf e .blend",
        "desc": "glTF 2.0 é recomendado pela documentação: .glb é binário, enquanto .gltf pode depender de .bin e imagens separados. .blend é convertido via Blender e requer instalação/configuração dele. Materiais, rig e animações precisam de conferência; importar não promete equivalência perfeita."
      },
      {
        "prop": "Sufixos de importação",
        "desc": "Com reconhecimento de sufixos ativo, -col mantém a malha e cria colisão estática triangular; -convcol usa forma convexa e não cria um RigidBody3D por si só. -colonly remove a malha visual e mantém colisão. Um casco convexo não preserva furos. -navmesh converte a malha para navegação e remove o visual original; não cria uma IA pronta."
      }
    ]
  },
  "teaching": {
    "codeRequired": false,
    "codeIntro": "A prática principal usa as cenas e o arquivo .glb fornecidos. Consulte o controlador se quiser estudar a consulta física; os nomes de importação são texto de referência, e SurfaceTool é uma extensão separada.",
    "duration": "65–90 min com importação e comparações (estimativa)",
    "prerequisite": "Aulas 3D 1–2: cena, recursos, Transform e referências; noções de colisão serão aprofundadas na próxima aula. Referência Godot 4.5, GDScript, Compatibility, desktop. Projeto revisado documentalmente; ainda não executado no motor.",
    "objectives": [
      "Distinguir recurso Mesh, instância visual e colisão física.",
      "Construir e prever operações CSG em uma hierarquia simples e converter o protótipo sem duplicar visual/física.",
      "Importar o .glb de teste e inspecionar hierarquia, escala, materiais e efeitos dos sufixos."
    ],
    "practice": {
      "title": "Prática guiada: uma janela no bloco de bronze",
      "intro": "Use duas caixas: A mede (4,3,1), B mede (2,2,1.4), ambas centradas inicialmente na origem. B atravessa A em Z para abrir a janela. O laboratório do navegador representa somente a seção XY em Z=0; a cena Godot mostra os sólidos completos. Sem corpo de jogador ou movimento automático.",
      "tree": "oficina.tscn — Oficina (Node3D / oficina.gd)\n├── Combinacao (CSGCombiner3D) — raiz, use_collision inicialmente false\n│   ├── A (CSGBox3D) — primeiro filho, size=(4,3,1)\n│   └── B (CSGBox3D) — segundo filho, size=(2,2,1.4), operação ajustável\n├── VisualSemColisao (MeshInstance3D / BoxMesh de 1 u, X=−5)\n├── Piso (malha visual, sem corpo)\n├── Camera3D (ortográfica, atual)\n└── DirectionalLight3D\n\nRuntime: CanvasLayer/controles e consulta de raio em Z.\nexemplos.glb: quatro instâncias de cubo com nomes/sufixos diferentes.\ntriangulo.tscn: extensão separada, MeshInstance3D / triangulo.gd.",
      "download": {
        "url": "assets/aula-3d-03-malhas-csg-importacao.zip",
        "label": "Baixar projeto de apoio: malhas, CSG e importação"
      },
      "downloadNote": "Nove arquivos locais, incluindo duas cenas e um .glb de teste gerado para a aula. Sem Blender obrigatório para importar esse arquivo. Execução/importação/bake reais na Godot ainda pendentes.",
      "steps": [
        {
          "title": "Separe recurso e instância",
          "text": "Extraia o ZIP, importe project.godot e abra oficina.tscn. Selecione VisualSemColisao: é um MeshInstance3D em X=−5; seu campo mesh aponta para BoxMesh de tamanho (1,1,1). Duplicar o nó duplica a instância, não garante um recurso independente. Desfaça a duplicação antes de continuar.",
          "expect": "O cubo é visível com câmera/luz, mas a cena não lhe atribuiu corpo físico. Para uma variante de recurso, use Make Unique / Tornar único no recurso antes de alterar seu tamanho. Transform do nó e tamanho do recurso são escolhas diferentes."
        },
        {
          "title": "Confira a árvore CSG e preveja a seção",
          "text": "Selecione Combinacao: A e B são filhos diretos, nessa ordem. A mede (4,3,1); B mede (2,2,1.4), centralizada, em Subtraction. Execute F6 para a bancada; ela instala subtração, B.x=0 e colisão desligada. No navegador use R. Na seção Z=0, A tem área 12, B tem 4 e A menos B tem 8 unidades quadradas.",
          "expect": "Uma janela atravessa a profundidade de A, pois B é mais profunda. As dimensões de B não mudam ao trocar a operação. Não compare a área desta seção com o volume do sólido 3D."
        },
        {
          "title": "Compare operações com as mesmas entradas",
          "text": "Com B.x=0, alterne subtração, união e interseção: as áreas da seção são 8, 12 e 4. Mude B.x para 1,5: sobreposição=3; áreas 9, 13 e 3. Separe B com P (X=4): sobreposição zero; interseção vazia, subtração conserva A e união contém duas partes separadas.",
          "expect": "Na união, B continua existindo fora de A. Na subtração, material só pode permanecer onde havia A. Interseção não é apenas desenhar B inteiro. A/D e setas no navegador movem B por 0,25; 1/2/3 escolhem operação, C centraliza, P separa e R restaura."
        },
        {
          "title": "Teste física na Godot, separadamente do desenho",
          "text": "Na bancada Godot restaure, escolha subtração e deixe consulta XY=(0,0). Use V: com use_collision desligado, espere sem contato. Habilite Gerar colisão e consulte novamente: o raio central atravessa a janela. Mude Consulta X para 1,5 e mantenha Y=0: o raio deve atingir a faixa sólida de A. Mude X para −5: o cubo visual sem corpo não deve gerar contato.",
          "expect": "O raio vai de Z=+4 a −4 e consulta corpos na camada 1. Aguarda atualização visual/física; se os parâmetros mudarem durante a espera, pede nova consulta. Esse teste não equivale a andar com personagem. O navegador não executa esse raio nem recalcula colisões."
        },
        {
          "title": "Importe o .glb de teste e inspecione",
          "text": "Pare a execução. Abra exemplos.glb na importação avançada e confira o reconhecimento de sufixos; depois instancie-o numa nova cena de trabalho. O arquivo contém quatro cubos de aresta 1 em X=−2,0,2,4: SuporteVisual, Suporte-col, Suporte-convcol e Colisao-colonly. Inspecione os nós gerados e habilite a visualização de colisões durante execução, quando houver uma cena com câmera/luz.",
          "expect": "O primeiro nome não pede colisão; -col cria forma triangular estática; -convcol usa forma convexa sem criar um corpo dinâmico; -colonly não conserva o cubo visual. Confira os nomes já processados, escala, pivô e material simples. Este fixture não contém rig, animação ou texturas externas e não valida esses fluxos."
        },
        {
          "title": "Converta o protótipo sem duplicar o resultado",
          "text": "Em uma cópia da cena, deixe a combinação simples centralizada e selecione a raiz Combinacao. No menu CSG, use Bake Mesh Instance; a malha é criada como irmã, e o original não é escondido automaticamente. Se quiser colisão estática dessa versão, use Bake Collision Shape e coloque a forma gerada sob um StaticBody3D com Transform coerente. Neste exemplo a raiz está na identidade. Desative use_collision do CSG original e esconda-o.",
          "expect": "A nova malha visual e a nova forma física são recursos separados. Não deixe visual sobreposto nem colisão antiga invisível ativa. Teste novamente janela/faixa sólida no motor. Mudar o CSG original depois não atualiza automaticamente a versão já convertida; refaça o bake quando necessário."
        },
        {
          "title": "Faça uma extensão e registre o que conferiu",
          "text": "Opcionalmente abra triangulo.tscn e execute F6: triangulo.gd cria uma única face com SurfaceTool em _ready, usando atributos antes dos vértices e ordem horária vista de cima. Ela é visual, sem colisão. Para sua própria arte, exporte glTF 2.0 (.glb) do Blender e repita a inspeção do passo 5; importar .blend diretamente requer Blender configurado.",
          "expect": "Superfície, material e colisão são verificações distintas. CSG serve para prototipagem e pode custar CPU ao reconstruir; não use este laboratório para concluir desempenho. Registre importação, bake e testes no roteiro do projeto antes de considerá-los aprovados."
        }
      ]
    },
    "checks": [
      {
        "question": "Duplicar um MeshInstance3D significa duplicar sua malha e sua colisão?",
        "answer": "Não. Os nós podem compartilhar Mesh, e um MeshInstance3D por si só não tem corpo físico. Tornar o recurso único permite editar uma variante; criar/configurar colisão é outra tarefa."
      },
      {
        "question": "Com B separada de A, o que resta nas três operações?",
        "answer": "A menos B conserva A; união conserva ambas as partes; interseção fica vazia. Isso vale para as entradas deste exercício, sem tratar tangência como volume compartilhado."
      },
      {
        "question": "Esconder o CSG original após Bake Mesh Instance basta?",
        "answer": "Não. É preciso conferir visual duplicado e use_collision: a colisão do CSG pode continuar ativa quando oculto. O bake visual não substitui automaticamente toda configuração física."
      },
      {
        "question": "-convcol transforma o objeto em RigidBody3D e preserva uma janela?",
        "answer": "Não. O sufixo escolhe uma forma convexa para colisão, não transforma sozinho o objeto em corpo dinâmico. Um casco convexo preenche reentrâncias; escolha formas/corpo conforme a finalidade."
      }
    ],
    "pitfalls": [
      {
        "title": "A subtração não abriu o buraco",
        "text": "Confira se A e B pertencem à mesma árvore CSG, sua ordem, a operação de B e a sobreposição em 3D. B precisa atravessar a profundidade para abrir uma passagem. Evite usar coincidências exatas de superfícies como prova de robustez."
      },
      {
        "title": "Vejo o bloco, mas a consulta não encontra contato",
        "text": "Confira use_collision da raiz, camada consultada, coordenadas e atualização adiada. Um raio pela janela deve falhar mesmo com colisão ativa. MeshInstance3D visual não cria colisão por conta própria."
      },
      {
        "title": "A versão convertida ficou sobreposta ou ainda bloqueia passagem",
        "text": "O original permanece na árvore. Confira visibilidade e desligue sua colisão antes de usar apenas a nova versão. CollisionShape3D deve ficar sob o corpo adequado; preserve seu Transform."
      },
      {
        "title": "O arquivo importado mudou ou perdeu um visual",
        "text": "Confira opções de sufixos e o que cada nome pede. -colonly e -navmesh removem a malha visual original. Não edite arquivos gerados em .godot como fonte; altere o arquivo de origem/configuração e reimporte, preservando mudanças de jogo numa cena própria."
      }
    ],
    "summary": "Mesh descreve geometria; MeshInstance3D a instancia; colisão precisa de configuração e teste próprios. CSG aplica operações sobre uma hierarquia ordenada e ajuda no protótipo. Converter e importar exigem conferir o resultado visual, o físico e os recursos, sem presumir que um valida os outros.",
    "next": "Na aula 3D 4, avance para CharacterBody3D, gravidade e rampas. A distinção entre a malha desenhada e a forma física será essencial para interpretar contatos.",
    "sources": [
      {
        "label": "MeshInstance3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_meshinstance3d.html"
      },
      {
        "label": "CSGShape3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_csgshape3d.html"
      },
      {
        "label": "CSGBox3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_csgbox3d.html"
      },
      {
        "label": "Prototipagem CSG (guia com aviso de atualização)",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/csg_tools.html"
      },
      {
        "label": "Formatos de importação",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/assets_pipeline/importing_3d_scenes/available_formats.html"
      },
      {
        "label": "Sufixos de importação",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/assets_pipeline/importing_3d_scenes/node_type_customization.html"
      },
      {
        "label": "SurfaceTool",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_surfacetool.html"
      },
      {
        "label": "ConcavePolygonShape3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_concavepolygonshape3d.html"
      },
      {
        "label": "Consulta de raios: contexto de física",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/physics/ray-casting.html"
      },
      {
        "label": "Parâmetros do raio 3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_physicsrayqueryparameters3d.html"
      },
      {
        "label": "Recursos e compartilhamento",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/scripting/resources.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Controlador da bancada e consulta física",
      "whenToUse": "Para entender os controles da cena oficina.tscn depois das previsões.",
      "description": "oficina.gd fica na raiz Oficina, com Combinacao/B e Camera3D fornecidos. Cria interface e consulta o espaço físico apenas por comando. Restaura operação, valores e colisão desligada. A versão web usa outra implementação, puramente geométrica.",
      "code": "extends Node3D\n\n@onready var csg: CSGCombiner3D = $Combinacao\n@onready var recorte: CSGBox3D = $Combinacao/B\nvar operacao: OptionButton\nvar deslocamento: HSlider\nvar ponto_x: HSlider\nvar ponto_y: HSlider\nvar colisao: CheckBox\nvar leitura: Label\nvar retorno: Label\nvar ocupada := false\nvar revisao := 0\nvar raio_pendente: Dictionary = {}\n\nfunc _ready() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var box := VBoxContainer.new()\n    box.position = Vector2(16, 400)\n    box.custom_minimum_size.x = 928\n    layer.add_child(box)\n    operacao = OptionButton.new()\n    operacao.add_item(\"1: Subtracao A menos B\", CSGShape3D.OPERATION_SUBTRACTION)\n    operacao.add_item(\"2: Uniao A ou B\", CSGShape3D.OPERATION_UNION)\n    operacao.add_item(\"3: Intersecao A e B\", CSGShape3D.OPERATION_INTERSECTION)\n    operacao.item_selected.connect(func(_i: int): aplicar())\n    box.add_child(operacao)\n    var grid := GridContainer.new()\n    grid.columns = 3\n    box.add_child(grid)\n    deslocamento = slider(grid, \"Centro X de B\", -4, 4, 0)\n    ponto_x = slider(grid, \"Consulta X\", -5, 5, 0)\n    ponto_y = slider(grid, \"Consulta Y\", -2, 2, 0)\n    colisao = CheckBox.new()\n    colisao.text = \"Gerar colisao estatica na raiz CSG (use_collision)\"\n    colisao.toggled.connect(func(_on: bool): aplicar())\n    box.add_child(colisao)\n    var row := HBoxContainer.new()\n    box.add_child(row)\n    botao(row, \"C: centralizar B\", func(): deslocamento.value = 0)\n    botao(row, \"P: separar B\", func(): deslocamento.value = 4)\n    botao(row, \"R: restaurar\", restaurar)\n    botao(row, \"V: consultar raio fisico\", consultar_raio)\n    leitura = Label.new()\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(leitura)\n    retorno = Label.new()\n    retorno.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(retorno)\n    $Camera3D.position = Vector3(0, 1, 12)\n    $Camera3D.look_at(Vector3(0, -2, 0), Vector3.UP)\n    restaurar()\n\nfunc slider(parent: Node, titulo: String, minimo: float, maximo: float, inicial: float) -> HSlider:\n    var box := VBoxContainer.new()\n    box.custom_minimum_size.x = 300\n    parent.add_child(box)\n    var label := Label.new()\n    label.text = titulo\n    box.add_child(label)\n    var controle := HSlider.new()\n    controle.min_value = minimo\n    controle.max_value = maximo\n    controle.step = 0.25\n    controle.value = inicial\n    controle.value_changed.connect(func(_v: float): aplicar())\n    box.add_child(controle)\n    return controle\n\nfunc botao(parent: Node, texto: String, acao: Callable) -> void:\n    var button := Button.new()\n    button.text = texto\n    button.pressed.connect(acao)\n    parent.add_child(button)\n\nfunc restaurar() -> void:\n    operacao.select(0)\n    deslocamento.set_value_no_signal(0)\n    ponto_x.set_value_no_signal(0)\n    ponto_y.set_value_no_signal(0)\n    colisao.set_pressed_no_signal(false)\n    aplicar()\n\nfunc aplicar() -> void:\n    if not is_instance_valid(leitura):\n        return\n    revisao += 1\n    recorte.operation = operacao.get_selected_id()\n    recorte.position.x = deslocamento.value\n    csg.use_collision = colisao.button_pressed\n    leitura.text = \"A=4x3x1, B=2x2x1.4 | B.x=%.2f | consulta XY=(%.2f, %.2f) | colisao=%s\" % [deslocamento.value, ponto_x.value, ponto_y.value, csg.use_collision]\n    retorno.text = \"Valores alterados: consulte novamente. Raio em Z de +4 a -4; camada 1. Sem personagem.\"\n\nfunc consultar_raio() -> void:\n    if ocupada:\n        return\n    ocupada = true\n    var revisao_consultada := revisao\n    # CSG atualiza dados de forma adiada; consultar depois da atualização visual/física.\n    await get_tree().process_frame\n    await get_tree().physics_frame\n    if revisao_consultada != revisao:\n        retorno.text = \"Parametros mudaram durante a espera; consulte novamente.\"\n        ocupada = false\n        return\n    var de := Vector3(ponto_x.value, ponto_y.value, 4)\n    var ate := Vector3(ponto_x.value, ponto_y.value, -4)\n    raio_pendente = {\"de\": de, \"ate\": ate, \"revisao\": revisao_consultada}\n\nfunc _physics_process(_delta: float) -> void:\n    if raio_pendente.is_empty():\n        return\n    var pedido := raio_pendente\n    raio_pendente = {}\n    if pedido.revisao != revisao:\n        retorno.text = \"Parametros mudaram antes da consulta; consulte novamente.\"\n        ocupada = false\n        return\n    # Acesso ao espaço físico apenas no callback de física.\n    var query := PhysicsRayQueryParameters3D.create(pedido.de, pedido.ate, 1)\n    query.collide_with_bodies = true\n    query.collide_with_areas = false\n    var hit := get_world_3d().direct_space_state.intersect_ray(query)\n    retorno.text = \"Raio fisico: sem contato nesta consulta.\" if hit.is_empty() else \"Raio fisico atingiu: %s em %s\" % [hit.collider.name, hit.position]\n    ocupada = false\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo:\n        return\n    if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n        return\n    match event.keycode:\n        KEY_A: deslocamento.value -= 0.25\n        KEY_D: deslocamento.value += 0.25\n        KEY_1: operacao.select(0); aplicar()\n        KEY_2: operacao.select(1); aplicar()\n        KEY_3: operacao.select(2); aplicar()\n        KEY_C: deslocamento.value = 0\n        KEY_P: deslocamento.value = 4\n        KEY_R: restaurar()\n        KEY_V: consultar_raio()\n        _: return\n    get_viewport().set_input_as_handled()\n",
      "pros": "Separa alteração visual de uma consulta física real e informa quando repetir.",
      "cons": "Execução real pendente. O raio não substitui testes de personagem; não implementa bake/importação em runtime."
    },
    {
      "title": "2. Nomes de importação: o que pedir ao importador",
      "language": "text",
      "whenToUse": "Ao inspecionar exemplos.glb ou nomear sua própria malha de origem.",
      "description": "Este quadro é texto de referência, não um script GDScript. O arquivo .glb de apoio tem os quatro nomes descritos; examine a hierarquia resultante na Godot. Usar um formato suportado não garante que todo material/rig terá o mesmo resultado.",
      "code": "Exemplos de nomes de objetos de malha no arquivo de origem:\n\nSuporteVisual          -> malha visual, sem colisão por este nome.\nSuporte-col            -> visual com colisão estática triangular.\nSuporte-convcol        -> visual com forma convexa; não cria RigidBody3D por si só.\nColisao-colonly        -> colisão estática sem a malha visual original.\n\nO arquivo exemplos.glb incluído contém esses quatro cubos, com centros\nX=-2, 0, 2 e 4 e aresta 1. Não contém texturas externas, animação ou rig.\nConfira no importador da Godot 4.5, com nodes/use_node_type_suffixes ativo.\n\nObservação: -navmesh converte a malha em navegação e remove a malha visual\noriginal na importação. Não é usado neste fixture. Não gera uma IA pronta.\n\nPara um corpo dinâmico, configure o corpo e formas adequadas separadamente.\nUm casco convexo não preserva furos; formas triangulares côncavas são para\ngeometria estática, não uma escolha universal para objetos móveis.\n\nExporte .glb do Blender via glTF 2.0 para trocar a malha de teste por sua arte.\nImportar .blend diretamente requer Blender instalado/configurado. Isso não é\nnecessário para importar este .glb. Nenhum desses fluxos foi executado no\nmotor/Blender neste ambiente; ver roteiro-testes.md.\n",
      "pros": "Permite comparar casos com um arquivo pequeno, sem depender de Blender instalado.",
      "cons": "O fixture não valida exportação de Blender, materiais complexos, animação, rig ou desempenho de colisão."
    },
    {
      "title": "3. Extensão: uma face com SurfaceTool",
      "whenToUse": "Depois de distinguir recursos, nós e colisão; extensão opcional.",
      "description": "triangulo.gd está no MeshInstance3D de triangulo.tscn. O método _ready executa a construção, atributos são definidos antes dos vértices, e a ordem horária vista de cima corresponde à face superior. A cena já fornece câmera, luz e material.",
      "code": "extends MeshInstance3D\n\nfunc _ready() -> void:\n    var st := SurfaceTool.new()\n    st.begin(Mesh.PRIMITIVE_TRIANGLES)\n    st.set_normal(Vector3.UP)\n    # Ordem horária vista de cima (+Y), conforme convenção de faces da Godot.\n    st.set_uv(Vector2(0, 1))\n    st.add_vertex(Vector3(-1, 0, 0))\n    st.set_uv(Vector2(0.5, 0))\n    st.add_vertex(Vector3(0, 0, -2))\n    st.set_uv(Vector2(1, 1))\n    st.add_vertex(Vector3(1, 0, 0))\n    mesh = st.commit()\n    # Geometria visual; nenhuma colisão foi criada.\n",
      "pros": "Mostra o mínimo para criar um ArrayMesh sem um modelador externo.",
      "cons": "Uma face não é um sólido fechado nem possui colisão. Não usar como exemplo de malha manifold para booleana CSG."
    }
  ],
  "simulator": {
    "type": "csg_boolean_3d",
    "title": "Laboratório: as mesmas caixas, três operações",
    "description": "Seção XY em Z=0 de A=(4,3,1) e B=(2,2,1.4), com centros Y=Z=0. Diagrama analítico em Canvas/JavaScript, não motor CSG. Compara entradas e material resultante em escala igual. Não executa física, importação ou bake. A área da seção não é volume nem medida de desempenho.",
    "guide": [
      {
        "title": "Preveja a área",
        "text": "R: B centralizada. A tem 12 u² e B tem 4 u² nesta seção. Subtração=8, união=12 e interseção=4. B.x=1,5 dá sobreposição 3 e resultados 9/13/3. As dimensões não mudam entre operações."
      },
      {
        "title": "Separe e repita",
        "text": "Com foco no desenho: A/D ou setas movem B em X por 0,25; 1 subtração, 2 união, 3 interseção; C centraliza, P separa (X=4), R restaura. Há botões e seletor. O modelo fica parado sem ajuste e aceita controles em pausa."
      },
      {
        "title": "Consulte um ponto",
        "text": "A cruz branca usa sliders X/Y. O painel informa interior de A, B e resultado. Pontos sobre limites recebem aviso separado: o exercício não usa uma escolha de borda para afirmar tolerância/topologia real. Tangência tem área de interseção zero."
      }
    ]
  },
  "quiz": {
    "question": "Depois de Bake Mesh Instance, você escondeu o CSG original, mas ainda há contato físico inesperado. Qual verificação é adequada?",
    "options": [
      "Conferir e desligar use_collision do CSG original, verificar a nova colisão e testar novamente; ocultar o visual não basta.",
      "Apenas esconder a nova malha: toda malha gera colisão automaticamente.",
      "Trocar -col por -convcol: isso cria um RigidBody3D e resolve qualquer janela.",
      "Aumentar o brilho do material para atualizar a física."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Visual e colisão são independentes; confira qual versão continua ativa.",
      "MeshInstance3D não cria corpo físico sozinho. Procure a forma/corpo ou o CSG ainda ativo.",
      "O sufixo escolhe uma forma; não cria automaticamente um corpo dinâmico e pode preencher reentrâncias.",
      "Material não controla as formas de colisão."
    ],
    "explanation": "O CSG pode continuar com colisão ativa quando oculto. O bake visual não remove automaticamente o original nem configura toda a versão física. Verifique as duas versões e seus corpos/formas no motor."
  }
},

  // ==========================================================================
  // NÍVEL II — INICIANTE (Mecânico de Bancada)
  // ==========================================================================
{
  "id": "3d-init-character-physics",
  "area": "3d",
  "level": "iniciante",
  "levelLabel": "Iniciante",
  "title": "4. CharacterBody3D: movimento, salto e rampas",
  "subtitle": "Integre gravidade, mova com velocidade e interprete os contatos sem confundir chão, parede e degrau.",
  "nodesUsed": [
    "CharacterBody3D",
    "StaticBody3D",
    "CollisionShape3D",
    "CapsuleShape3D"
  ],
  "feynman": {
    "title": "Você pede o movimento; o corpo informa os contatos",
    "explanation": "CharacterBody3D é controlado pelo seu script. Ele não começa a cair só por existir: você integra a gravidade na velocidade e chama move_and_slide para mover e resolver contatos. A cápsula é uma forma comum para personagens, mas não garante subir escadas ou passar por qualquer quina. Uma superfície só pode ser chão quando há contato e sua orientação é compatível com up_direction e o limite de inclinação. Durante um salto, estar acima de uma rampa não significa estar apoiado nela.",
    "analogies": [
      {
        "term": "Velocidade e deslocamento",
        "analogy": "Velocidade diz quantas unidades por segundo você pede. Gravidade muda essa velocidade ao longo do tempo. move_and_slide aplica o passo de física; multiplicar velocity por delta antes da chamada mistura as duas grandezas."
      },
      {
        "term": "Chão e normal",
        "analogy": "O chão não é uma etiqueta permanente da rampa. O corpo precisa encontrar uma superfície e classificar o contato em relação ao seu “cima”."
      },
      {
        "term": "Snap e salto",
        "analogy": "Snap pode ajudar a manter o contato descendente com o chão ao alcance. Não deve prender o personagem que está subindo num salto, nem cria um algoritmo para escalar degraus."
      }
    ]
  },
  "howItWorks": {
    "overview": "Nesta prática adotamos 1 unidade como 1 metro, +Y para cima e gravidade do projeto em −Y. velocity usa unidades/s; o script acrescenta get_gravity() × delta quando precisa cair e atribui velocidade vertical ao salto. Isso não é um impulso físico de RigidBody3D. O corpo e os ancestrais ficam com escala 1, e o corpo gira somente em Y. Gravidade arbitrária exigiria adaptar movimento, salto e up_direction; não é implementada aqui.",
    "anatomy": [
      {
        "prop": "CharacterBody3D, StaticBody3D e RigidBody3D",
        "desc": "CharacterBody3D segue movimento por código; StaticBody3D fornece geometria estática; RigidBody3D tem movimento controlado pela simulação física. O projeto usa os dois primeiros. MeshInstance3D desenha, CollisionShape3D com recurso de forma participa da colisão."
      },
      {
        "prop": "_physics_process, velocity e move_and_slide()",
        "desc": "Calcule a entrada e atualize velocity no passo de física. get_gravity retorna o vetor configurado, não necessariamente (0,−9.8,0). move_and_slide usa velocity sem delta extra e pode modificá-la ao resolver contatos. Não substitua o movimento normal por mudanças diretas de position; reposicionar é reservado ao reinício desta bancada."
      },
      {
        "prop": "is_on_floor e get_floor_angle",
        "desc": "is_on_floor descreve a última chamada de move_and_slide. Antes da chamada você lê o passo anterior; depois, o resultado atualizado. get_floor_angle/get_floor_normal só são válidos após a chamada e com chão confirmado. A normal de colisão pode diferir da normal geométrica ideal."
      },
      {
        "prop": "up_direction e floor_max_angle",
        "desc": "No modo grounded, up_direction=UP define a referência de cima. floor_max_angle é em radianos; 45° vira deg_to_rad(45). Ele classifica chão/teto em relação a parede, não é um controle que por si só determina todo movimento ou escorregamento."
      },
      {
        "prop": "floor_snap_length e floor_stop_on_slope",
        "desc": "Snap define alcance na direção oposta a up_direction para manter ligação com chão; não é aplicado automaticamente quando há velocidade ascendente. floor_stop_on_slope ajuda a permanecer parado numa rampa reconhecida como chão. Margens, contatos e geometria também importam; nenhuma dessas opções é um step-up de escadas."
      },
      {
        "prop": "floor_constant_speed e leituras de movimento",
        "desc": "A prática ativa floor_constant_speed e usa snap para comparar descida no motor. velocity é a solicitação/valor ajustado; get_real_velocity informa o movimento real da última chamada, que pode incluir deslocamento vertical na rampa. get_slide_collision_count conta colisões que mudaram direção, não todos os contatos possíveis."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "jogador.gd é o controlador principal. O projeto pronto inclui InputMap registrado por oficina.gd, formas, pista, câmera e interface. Ao copiar apenas o controlador para outro projeto, configure as ações descritas no quadro de configuração. O restante da bancada é apoio para experimentar.",
    "duration": "70–95 min com testes de contato e variações (estimativa)",
    "prerequisite": "Aulas 3D 1–3: referências, Basis, malha versus forma física e cenas. Saber ler _physics_process e entrada. Referência Godot 4.5, GDScript, Compatibility, desktop. Projeto revisado documentalmente; execução no motor pendente.",
    "objectives": [
      "Mover um CharacterBody3D usando velocidade, gravidade e salto no passo de física, sem delta duplicado.",
      "Interpretar chão/parede e comparar limite de inclinação, snap e velocidade real sob condições explícitas.",
      "Reiniciar ensaios e reconhecer o que a cápsula e o controlador básico não resolvem em degraus."
    ],
    "practice": {
      "title": "Prática guiada: a pista do autômato",
      "intro": "O projeto tem pista plana, subida, patamar, descida e uma faixa separada com três degraus. O jogador usa cápsula física de raio 0,3 e altura 1,8. Escala dos corpos fica em 1. Não há RigidBody, sistema de empurrão, coyote time, jump buffer ou step-up implementados.",
      "tree": "Oficina (Node3D / oficina.gd)\n├── Inicio / Subida / Topo / Descida / Fim (StaticBody3D)\n│   ├── Visual (MeshInstance3D / BoxMesh)\n│   └── Colisao (CollisionShape3D / BoxShape3D)\n├── BaseDegraus / Degrau1–3 (StaticBody3D)\n├── Jogador (CharacterBody3D / jogador.gd; classe JogadorDaOficina3D)\n│   ├── Colisao (CollisionShape3D, Y=0.9; cápsula 0.3 × 1.8)\n│   └── Visual (MeshInstance3D / CapsuleMesh, Y=0.9)\n├── Camera3D ortográfica e atual\n└── DirectionalLight3D\n\nCenário: layer 1, mask 2; jogador: layer 2, mask 1.\nOficina registra ações e cria interface em runtime.",
      "download": {
        "url": "assets/aula-3d-04-character-rampas.zip",
        "label": "Baixar projeto de apoio: personagem, salto e rampas"
      },
      "downloadNote": "Sete arquivos locais: projeto, cena, dois scripts, configuração, leitura e roteiro. Revisados documentalmente, sem compilação/execução no motor neste ambiente.",
      "steps": [
        {
          "title": "Inspecione forma, escala e ações",
          "text": "Extraia o ZIP, importe project.godot e abra oficina.tscn. Selecione Jogador/Colisao: a origem do corpo fica nos pés, enquanto a cápsula está em Y=0,9, com altura 1,8 e raio 0,3. Confira as formas BoxShape3D da pista e camadas/máscaras. A malha visual não substitui nenhuma delas.",
          "expect": "Os corpos/ancestrais estão com escala 1; tamanho da forma é ajustado no recurso. oficina.gd registra mover_esquerda/direita/frente/tras e pular se ainda não existirem. Copiar só jogador.gd exige configurar essas ações."
        },
        {
          "title": "Mova e pare no plano",
          "text": "Execute F6. Espere o contato inicial se estabelecer. Segure WASD ou setas; solte para parar. Os botões aplicam entrada por 0,25 s. O controlador usa direção relativa ao yaw do corpo, expressa no mundo, e limita a entrada para a diagonal não ganhar velocidade. Q gira o corpo 90°. Esc libera foco dos sliders para voltar ao teclado de jogo.",
          "expect": "Sem comando horizontal não há caminhada automática. A queda inicial até a pista vem do código de gravidade. velocity horizontal não é multiplicada por delta antes de move_and_slide. A câmera é fixa e não define a direção de entrada nesta aula."
        },
        {
          "title": "Salte e leia o contato depois do movimento",
          "text": "No plano, pressione Espaço uma vez e observe a subida, a descida e o pouso. Com velocidade inicial 5 e gravidade 9,8, a estimativa contínua é altura 5²/(2×9,8)≈1,28 e retorno ao mesmo nível em 2×5/9,8≈1,02 s, sem obstáculos. O motor usa passos discretos e colisões; confira valores reais, não igualdade exata.",
          "expect": "Durante o salto, is_on_floor deve ficar falso depois do movimento; não há salto duplo. O pedido é consumido no tick, sem buffer/coyote. +Y positivo é válido para a convenção desta prática, não para todo projeto de gravidade arbitrária."
        },
        {
          "title": "Compare a rampa com o limite",
          "text": "R reposiciona no início mantendo os parâmetros. Com rampa 30° e limite 45°, avance para a subida e pare. Compare velocity, real_velocity, chão e ângulo lido apenas quando válido. Depois ajuste a rampa para 55° com limite 45°; a alteração reinicia o ensaio. Volte a aproximar e observe chão/parede e movimento efetivo.",
          "expect": "A inclinação acima do limite deixa de ser classificada como chão nesse contato; não significa “escorregar sempre da mesma forma”. A resposta depende das opções e do resolvedor. floor_stop_on_slope não resolve uma parede que não foi classificada como chão."
        },
        {
          "title": "Compare snap na descida sem colar o salto",
          "text": "Volte a 30°/45°, snap=0,1. Use P para ir ao patamar e caminhe na direção da descida, no mundo +X quando o corpo estiver sem giro. Compare com snap=0, repetindo o posicionamento. A prática ativa floor_constant_speed. Observe perda/manutenção de contato e velocidade real, sem exigir que todo frame produza uma diferença visível.",
          "expect": "Snap tem alcance e condições; não substitui colisão. No salto ascendente, ele não deve impedir desprender do chão. A comparação depende de velocidade, passos de física, margens e geometria; registre o resultado real no motor."
        },
        {
          "title": "Teste os degraus sem presumir step-up",
          "text": "Use T para a faixa de degraus em Z=6. Aproxime-se em +X e compare a face vertical com uma rampa. A cápsula pode suavizar alguns contatos, mas o controlador não contém algoritmo para elevar o corpo sobre o degrau. Tente o salto por comando e observe as leituras. R retorna à pista principal.",
          "expect": "Não há garantia de subida automática. Um sistema de step-up exigiria consultas e validações próprias; não foi implementado. Também não há infinite_inertia em CharacterBody3D na Godot 4 nem empurrão customizado de RigidBody neste projeto."
        },
        {
          "title": "Repita e registre limites",
          "text": "Use Restaurar tudo para repor rampa 30°, limite 45°, snap 0,1 e salto 5 sem recarregar. R apenas reposiciona e zera velocidade/entrada/tempo; P/T também reiniciam o contato. Pausar personagem preserva o último resultado de movimento. No navegador, pause e use Avançar 0,10 s para observar o modelo por passos.",
          "expect": "Depois de teleporte o contato é revalidado antes de permitir salto. Na pausa, leituras são do último movimento. O navegador é um modelo pontual em seção XY; não valida a cápsula, move_and_slide ou subida de escadas da Godot."
        }
      ]
    },
    "checks": [
      {
        "question": "Por que multiplicar gravidade por delta, mas não velocity antes de move_and_slide?",
        "answer": "Gravidade é aceleração e muda a velocidade ao longo do tempo. velocity já é velocidade; move_and_slide usa o passo de física internamente. Multiplicar antes mistura velocidade com deslocamento."
      },
      {
        "question": "Um ângulo de 30° com limite 45° garante is_on_floor=true durante o salto?",
        "answer": "Não. É preciso contato e classificação compatível. is_on_floor relata a última chamada de movimento; estar acima da rampa não é estar apoiado nela."
      },
      {
        "question": "Cápsula e floor_snap_length garantem subir escadas?",
        "answer": "Não. A forma e o snap ajudam em determinados contatos. Subir um degrau por step-up exige lógica própria; uma face vertical pode continuar sendo parede."
      },
      {
        "question": "get_gravity sempre aponta para −Y e salto sempre usa Y positivo?",
        "answer": "Não. O vetor depende da configuração e áreas; nossa prática fixa −Y/+Y. Gravidade arbitrária exige adaptar salto, direção horizontal e up_direction de forma coerente."
      }
    ],
    "pitfalls": [
      {
        "title": "O personagem atravessa ou não encontra a pista",
        "text": "Confira CollisionShape3D habilitado, recurso não vazio, corpo StaticBody3D, camada/máscara e escala dos ancestrais. A malha desenhada sozinha não gera contato."
      },
      {
        "title": "O salto não acontece ou repete no ar",
        "text": "Confira a ação pular e a leitura de chão. O pedido deve ser consumido uma vez e só ser aceito com contato válido. Após reset aguarde revalidação. No navegador, foco deve estar no desenho."
      },
      {
        "title": "O corpo anda enquanto altero controles",
        "text": "Na Godot, sliders com foco suspendem a leitura do teclado de jogo; Esc libera foco. No navegador, atalhos pertencem apenas à cena e cada toque gera uma caminhada curta, sem repetição automática."
      },
      {
        "title": "A rampa é chão, mas a velocidade vertical não é zero",
        "text": "Subir/descer envolve deslocamento real vertical. Compare a solicitação velocity com get_real_velocity após mover. Não use só velocity.y para decidir se há chão."
      },
      {
        "title": "O ensaio web parou em contato íngreme",
        "text": "O modelo encerra esse caso em vez de fingir escorregamento de parede. Restaure ou use um preset. Para resolver cápsula/parede/escorregamento, teste a cena no motor."
      }
    ],
    "summary": "CharacterBody3D precisa de código de movimento e gravidade. Velocidade, contato e referência de cima têm papéis diferentes. Uma rampa só é chão quando há contato e classificação adequada; snap ajuda sob condições, e cápsula não é algoritmo de escadas.",
    "next": "Na aula 3D 5, estude Camera3D e SpringArm3D. A câmera de observação desta bancada é fixa; movimento relativo à câmera e colisão do braço serão tratados separadamente.",
    "sources": [
      {
        "label": "CharacterBody3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_characterbody3d.html"
      },
      {
        "label": "Usando CharacterBody2D/3D",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/physics/using_character_body_2d.html"
      },
      {
        "label": "Movimento no primeiro jogo 3D",
        "url": "https://docs.godotengine.org/en/4.5/getting_started/first_3d_game/03.player_movement_code.html"
      },
      {
        "label": "PhysicsBody3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_physicsbody3d.html"
      },
      {
        "label": "CapsuleShape3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_capsuleshape3d.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Controlador do personagem",
      "whenToUse": "Na cena fornecida, ou em outra com a mesma configuração de ações e forma.",
      "description": "jogador.gd está em Jogador e declara a classe JogadorDaOficina3D usada pela bancada. Corpo e ancestrais com escala 1; yaw como único giro do corpo. A leitura de chão anterior decide o salto, e move_and_slide atualiza o resultado. InputMap está no script de apoio ou deve ser criado no seu projeto.",
      "code": "class_name JogadorDaOficina3D\nextends CharacterBody3D\n\n@export var velocidade: float = 2.0\n@export var velocidade_salto: float = 5.0\nvar pausado := false\nvar revalidando_contato := true\nvar salto_pedido := false\nvar entrada_virtual := Vector2.ZERO\nvar tempo_virtual := 0.0\nvar tempo := 0.0\n\nfunc restaurar(destino: Vector3) -> void:\n    global_position = destino\n    rotation = Vector3.ZERO\n    velocity = Vector3.ZERO\n    salto_pedido = false\n    entrada_virtual = Vector2.ZERO\n    tempo_virtual = 0.0\n    tempo = 0.0\n    revalidando_contato = true\n\nfunc andar_por_botao(entrada: Vector2) -> void:\n    entrada_virtual = entrada.limit_length(1.0)\n    tempo_virtual = 0.25\n\nfunc pedir_salto() -> void:\n    salto_pedido = true\n\nfunc _physics_process(delta: float) -> void:\n    if pausado:\n        return\n    tempo += delta\n    # is_on_floor descreve o Ãºltimo move_and_slide, nÃ£o uma consulta nova.\n    var apoiado := is_on_floor() and not revalidando_contato\n    var interface_em_foco := get_viewport().gui_get_focus_owner() != null\n    var entrada := Vector2.ZERO\n    if not interface_em_foco:\n        entrada = Input.get_vector(\"mover_esquerda\", \"mover_direita\", \"mover_frente\", \"mover_tras\")\n    if tempo_virtual > 0.000001:\n        entrada = entrada_virtual\n        tempo_virtual = maxf(0.0, tempo_virtual - delta)\n    # Corpo e ancestrais com escala 1; corpo gira somente em Y.\n    var direcao := global_transform.basis * Vector3(entrada.x, 0, entrada.y)\n    direcao.y = 0\n    direcao = direcao.limit_length(1.0)\n    velocity.x = direcao.x * velocidade\n    velocity.z = direcao.z * velocidade\n    if not apoiado:\n        velocity += get_gravity() * delta\n    var teclado_pediu := not interface_em_foco and Input.is_action_just_pressed(\"pular\")\n    if (salto_pedido or teclado_pediu) and apoiado:\n        velocity.y = velocidade_salto\n    # Pedido Ã© consumido no tick; sem buffer/coyote e sem salto duplo.\n    salto_pedido = false\n    # velocity estÃ¡ em unidades/s; move_and_slide aplica o passo de tempo.\n    move_and_slide()\n    revalidando_contato = false\n\n",
      "pros": "Fluxo explícito de entrada, gravidade, salto, movimento e revalidação após reset.",
      "cons": "Sem coyote/buffer, step-up, gravidade arbitrária, câmera relativa ou política de empurrão. Input virtual dura 0,25 s; teclado é sustentado no motor."
    },
    {
      "title": "2. Configuração da cena e ações",
      "language": "text",
      "whenToUse": "Para conferir dependências antes de copiar o controlador.",
      "description": "Texto de referência, não GDScript. A cena já contém malhas e formas independentes, piso estático, cápsula e filtros. A convenção de unidades desta prática é 1 u = 1 m.",
      "code": "Referência Godot 4.5 / Compatibility / desktop.\n\nJogador: CharacterBody3D, escala (1,1,1), só yaw no corpo.\nColisao: CollisionShape3D em Y=0.9, CapsuleShape3D radius=0.3 height=1.8.\nVisual: MeshInstance3D / CapsuleMesh, não substitui a forma física.\nCharacterBody3D: layer=2, mask=1, modo grounded, up_direction=UP.\nPista: StaticBody3D layer=1, mask=2, BoxShape3D sem escala não uniforme.\nfloor_max_angle: deg_to_rad(45), não o número 45 em radianos.\nfloor_snap_length=0.1; floor_stop_on_slope=true; floor_constant_speed=true.\nGravidade do projeto: 9.8 em -Y. O script integra get_gravity() * delta.\nvelocity: unidades/s. move_and_slide() sem multiplicar velocity por delta.\n\nOficina registra InputMap se a ação ainda não existir:\nmover_esquerda: A/seta esquerda; mover_direita: D/seta direita;\nmover_frente: W/seta cima; mover_tras: S/seta baixo; pular: Espaço.\nSe copiar só jogador.gd para outro projeto, configure essas ações.\n\nWASD/setas sustentadas no motor; botões andam por 0.25 s.\nR início; P topo; T pista de degraus; Q gira corpo 90 graus.\nEsc libera foco de sliders para o teclado de jogo.\nAlterar parâmetros reinicia a posição. R reposiciona sem zerar parâmetros.\nNão há step-up, jump buffer/coyote, impulso customizado ou infinite_inertia.\nRigidBody3D não é usado neste projeto; a política de empurrão é outro problema.\n",
      "pros": "Evita testar um controlador sem forma, pista ou ações configuradas.",
      "cons": "Configuração descrita não substitui execução real e inspeção de contatos."
    },
    {
      "title": "3. Interface e pista de apoio",
      "whenToUse": "Para estudar como os ensaios são configurados e reiniciados.",
      "description": "oficina.gd fica na raiz da cena; registra ações se ausentes, cria interface e ajusta rampas/parametrização. Alterar geometria reinicia o personagem. R reposiciona; Restaurar tudo repõe também parâmetros. Leituras mostram o último move_and_slide.",
      "code": "extends Node3D\n\n@onready var jogador: JogadorDaOficina3D = $Jogador\nvar leitura: Label\nvar rampa: HSlider\nvar limite: HSlider\nvar snap: HSlider\nvar salto: HSlider\nvar pausa: Button\n\nfunc _ready() -> void:\n    registrar_acao(\"mover_esquerda\", [KEY_A, KEY_LEFT])\n    registrar_acao(\"mover_direita\", [KEY_D, KEY_RIGHT])\n    registrar_acao(\"mover_frente\", [KEY_W, KEY_UP])\n    registrar_acao(\"mover_tras\", [KEY_S, KEY_DOWN])\n    registrar_acao(\"pular\", [KEY_SPACE])\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var box := VBoxContainer.new()\n    box.position = Vector2(16, 405)\n    box.custom_minimum_size.x = 1048\n    layer.add_child(box)\n    var grid := GridContainer.new()\n    grid.columns = 4\n    box.add_child(grid)\n    rampa = slider(grid, \"Rampa: graus\", 10, 60, 5, 30)\n    limite = slider(grid, \"Chao: graus\", 15, 60, 5, 45)\n    snap = slider(grid, \"Snap: unidades\", 0, 0.3, 0.05, 0.1)\n    salto = slider(grid, \"Salto: unidades/s\", 4, 7, 0.5, 5)\n    var row := HBoxContainer.new()\n    box.add_child(row)\n    botao(row, \"A: esquerda 0,25 s\", func(): jogador.andar_por_botao(Vector2.LEFT))\n    botao(row, \"D: direita 0,25 s\", func(): jogador.andar_por_botao(Vector2.RIGHT))\n    botao(row, \"W: frente 0,25 s\", func(): jogador.andar_por_botao(Vector2.UP))\n    botao(row, \"S: tras 0,25 s\", func(): jogador.andar_por_botao(Vector2.DOWN))\n    botao(row, \"Espaco: salto\", jogador.pedir_salto)\n    row = HBoxContainer.new()\n    box.add_child(row)\n    botao(row, \"R: inicio\", reiniciar)\n    botao(row, \"P: alto\", func(): posicionar(Vector3(4, altura() + 0.06, 0)))\n    botao(row, \"T: degraus\", func(): posicionar(Vector3(-2, 0.06, 6)))\n    botao(row, \"Q: girar corpo 90 graus\", func(): jogador.rotate_y(PI / 2))\n    pausa = botao(row, \"Pausar personagem\", alternar_pausa)\n    botao(row, \"Restaurar tudo\", restaurar_tudo)\n    leitura = Label.new()\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(leitura)\n    var ajuda := Label.new()\n    ajuda.text = \"WASD/setas: segure para andar. Espaco salta. Esc libera foco da interface. R/P/T/Q: presets/giro. Sem subida automatica de escadas.\"\n    ajuda.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(ajuda)\n    $Camera3D.position = Vector3(5, 9, 18)\n    $Camera3D.look_at(Vector3(3, -2, 2), Vector3.UP)\n    atualizar()\n\nfunc registrar_acao(nome: String, teclas: Array) -> void:\n    if InputMap.has_action(nome):\n        return\n    InputMap.add_action(nome)\n    for tecla in teclas:\n        var evento := InputEventKey.new()\n        evento.physical_keycode = tecla\n        InputMap.action_add_event(nome, evento)\n\nfunc slider(parent: Node, titulo: String, minimo: float, maximo: float, passo: float, inicial: float) -> HSlider:\n    var box := VBoxContainer.new()\n    box.custom_minimum_size.x = 250\n    parent.add_child(box)\n    var label := Label.new()\n    label.text = titulo\n    box.add_child(label)\n    var control := HSlider.new()\n    control.min_value = minimo\n    control.max_value = maximo\n    control.step = passo\n    control.value = inicial\n    control.value_changed.connect(func(_v: float): atualizar())\n    box.add_child(control)\n    return control\n\nfunc botao(parent: Node, texto: String, acao: Callable) -> Button:\n    var button := Button.new()\n    button.text = texto\n    button.focus_mode = Control.FOCUS_NONE\n    button.pressed.connect(acao)\n    parent.add_child(button)\n    return button\n\nfunc altura() -> float:\n    return 3.0 * tan(deg_to_rad(rampa.value))\n\nfunc caixa(nome: String, tamanho: Vector3, centro: Vector3, giro: float) -> void:\n    var corpo: StaticBody3D = get_node(nome)\n    corpo.position = centro\n    corpo.rotation.z = giro\n    var visual: MeshInstance3D = corpo.get_node(\"Visual\")\n    var colisao: CollisionShape3D = corpo.get_node(\"Colisao\")\n    var malha: BoxMesh = visual.mesh\n    var forma: BoxShape3D = colisao.shape\n    malha.size = tamanho\n    forma.size = tamanho\n\nfunc atualizar() -> void:\n    if not is_instance_valid(salto):\n        return\n    var angulo := deg_to_rad(rampa.value)\n    var h := altura()\n    caixa(\"Subida\", Vector3(3 / cos(angulo), 0.3, 4), Vector3(1.5 + sin(angulo) * 0.15, h / 2 - cos(angulo) * 0.15, 0), angulo)\n    caixa(\"Topo\", Vector3(2, 0.3, 4), Vector3(4, h - 0.15, 0), 0)\n    caixa(\"Descida\", Vector3(3 / cos(angulo), 0.3, 4), Vector3(6.5 - sin(angulo) * 0.15, h / 2 - cos(angulo) * 0.15, 0), -angulo)\n    jogador.floor_max_angle = deg_to_rad(limite.value)\n    jogador.floor_snap_length = snap.value\n    jogador.velocidade_salto = salto.value\n    # Alterar a geometria reinicia o ensaio; sem mover a rampa sob o personagem.\n    reiniciar()\n\nfunc posicionar(ponto: Vector3) -> void:\n    jogador.restaurar(ponto)\n\nfunc reiniciar() -> void:\n    posicionar(Vector3(-2, 0.06, 0))\n\nfunc restaurar_tudo() -> void:\n    rampa.set_value_no_signal(30)\n    limite.set_value_no_signal(45)\n    snap.set_value_no_signal(0.1)\n    salto.set_value_no_signal(5)\n    atualizar()\n\nfunc alternar_pausa() -> void:\n    jogador.pausado = not jogador.pausado\n    pausa.text = \"Retomar personagem\" if jogador.pausado else \"Pausar personagem\"\n\nfunc _process(_delta: float) -> void:\n    if not is_instance_valid(leitura):\n        return\n    var piso := is_instance_valid(jogador) and jogador.is_on_floor() and not jogador.revalidando_contato\n    var angulo := \"%.2f graus\" % rad_to_deg(jogador.get_floor_angle()) if piso else \"sem chao valido\"\n    leitura.text = \"Ultimo move_and_slide: chao=%s parede=%s angulo=%s colisoes com mudanca=%d\\nposition=%s | velocity=%s | real_velocity=%s\\nRampa=%.0f limite=%.0f snap=%.2f salto=%.1f | %.2f s | pausado=%s\" % [piso, jogador.is_on_wall(), angulo, jogador.get_slide_collision_count(), jogador.global_position, jogador.velocity, jogador.get_real_velocity(), rampa.value, limite.value, snap.value, salto.value, jogador.tempo, jogador.pausado]\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo or event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n        return\n    if event.keycode == KEY_ESCAPE:\n        var foco := get_viewport().gui_get_focus_owner()\n        if foco != null:\n            foco.release_focus()\n    elif get_viewport().gui_get_focus_owner() == null:\n        match event.keycode:\n            KEY_R: reiniciar()\n            KEY_P: posicionar(Vector3(4, altura() + 0.06, 0))\n            KEY_T: posicionar(Vector3(-2, 0.06, 6))\n            KEY_Q: jogador.rotate_y(PI / 2)\n            _: return\n    else:\n        return\n    get_viewport().set_input_as_handled()\n",
      "pros": "Permite repetir rampa/descida/degraus sem recarregar o projeto.",
      "cons": "Câmera, interface e extremos ainda precisam de conferência no motor. Não é sistema de câmera livre ou editor de fases."
    }
  ],
  "simulator": {
    "type": "character_3d_slopes",
    "title": "Laboratório: apoio, salto e descida por comando",
    "description": "Modelo Canvas/JS em seção XY com pés pontuais, integração fixa em 1/120 s e gravidade −9,8 u/s². Caminhada é 2 u/s em X, sem reproduzir floor_constant_speed. Não usa Godot, cápsula física ou move_and_slide. Subida íngreme é uma barreira simplificada; contato íngreme em queda encerra o ensaio. Não calcula escorregamento, tetos, step-up ou contatos reais.",
    "guide": [
      {
        "title": "Controle o ensaio",
        "text": "Com foco no desenho: A/D ou setas andam por 0,25 s por toque, S interrompe a caminhada, Espaço salta, P começa no alto, R restaura parâmetros/posição. Repetição automática da tecla é ignorada. Há botões equivalentes."
      },
      {
        "title": "Pause e preveja",
        "text": "Pause, peça um salto e avance 0,10 s: com salto 5, o modelo chega a y=0,451 e vy=4,020. No plano, altura máxima contínua≈1,28 e retorno≈1,02 s. Só aceita novo salto após apoio. Um ângulo permitido não dá chão durante o voo."
      },
      {
        "title": "Compare a descida",
        "text": "Com rampa 30°/limite 45°, P coloca os pés no patamar em X=4,8. D atravessa o início da descida. Compare snap 0,1 e zero, repetindo P após mudar parâmetro. Alterações reiniciam o ensaio. O gap do modelo é avaliado a cada passo fixo; não representa o solver de snap da Godot."
      }
    ]
  },
  "quiz": {
    "question": "Depois de move_and_slide, o personagem está no ar acima de uma rampa de 30°, com floor_max_angle=45°. Qual interpretação é correta?",
    "options": [
      "is_on_floor não fica true só pelo ângulo permitido: é preciso contato classificado como chão na última chamada de movimento.",
      "is_on_floor deve ser true porque 30° é menor que 45°, mesmo sem contato.",
      "floor_snap_length deve prender o corpo à rampa durante toda a subida do salto.",
      "A cápsula garante que a próxima face vertical será subida como degrau."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Contato e classificação são necessários; posição acima da rampa não basta.",
      "Comparar ângulos não cria contato. A leitura pertence à última chamada de movimento.",
      "Snap automático não é aplicado quando há velocidade ascendente em up_direction.",
      "A forma não implementa um algoritmo de step-up."
    ],
    "explanation": "is_on_floor relata o contato classificado pela última chamada de move_and_slide. O limite de ângulo participa da classificação, mas não é uma detecção de chão à distância."
  }
},

{
  "id": "3d-init-cameras-springarm",
  "area": "3d",
  "level": "iniciante",
  "levelLabel": "Iniciante",
  "title": "5. Camera3D e SpringArm3D: visão e colisão",
  "subtitle": "Separe rotação, distância e campo de visão; compare câmera orbital e primeira pessoa com controles que você pode repetir.",
  "nodesUsed": [
    "Camera3D",
    "SpringArm3D",
    "Node3D",
    "InputEventMouseMotion"
  ],
  "feynman": {
    "title": "Olhar, afastar e abrir o enquadramento são ações diferentes",
    "explanation": "A câmera define de onde e para onde você vê. Girar o pivot muda a direção; afastar a câmera muda sua posição e a relação aparente entre objetos próximos e distantes. Alterar o FOV abre ou fecha o campo de visão sem exigir esse deslocamento. O SpringArm3D consulta a geometria física e pode recolher a câmera orbital quando encontra um obstáculo. Ele precisa de hierarquia, formas e filtros coerentes; não é uma garantia universal contra atravessar paredes.",
    "analogies": [
      {
        "term": "Yaw e pitch",
        "analogy": "Yaw gira o suporte em torno do eixo Y; pitch inclina uma peça filha em torno de X. Separar os suportes torna mais fácil limitar a inclinação sem misturar os dois controles."
      },
      {
        "term": "Distância e FOV",
        "analogy": "Dar um passo para trás muda seu ponto de observação. Abrir mais o enquadramento a partir do mesmo ponto mostra mais da cena. Os resultados não são equivalentes para perspectiva e paralaxe."
      },
      {
        "term": "Braço e consulta",
        "analogy": "O comprimento desejado é um alcance de teste. Havendo geometria física consultada no caminho, a posição dos filhos pode ser aproximada do pivot. Uma parede ausente da máscara não participa dessa decisão."
      }
    ]
  },
  "howItWorks": {
    "overview": "Referência Godot 4.5. Camera3D olha para −Z local; o braço consulta em +Z local, colocando a orbital atrás de um pivot voltado para frente. O projeto mantém escala 1 e alvo fixo: não contém locomoção nem promete girar um modelo com o movimento. Uma Camera3D fica atual por Viewport; make_current troca a câmera desse Viewport, sem destruir a anterior.",
    "anatomy": [
      {
        "prop": "Yaw → Pitch → SpringArm3D → Camera3D",
        "desc": "Yaw gira em Y, Pitch em X. A câmera orbital é filha direta do braço, sem deslocamento local manual competindo com ele. A origem elevada do pivot é escolhida para o alvo. O limite ±65° é uma decisão deste projeto, ajustável ao jogo e ao conforto."
      },
      {
        "prop": "spring_length, margin e get_hit_length()",
        "desc": "spring_length é o comprimento solicitado; get_hit_length informa o comprimento calculado pelo braço na consulta física. margin recua em relação ao candidato de colisão. Leia após o motor atualizar e não confunda com distância de outra câmera atual. O braço funciona por passo de física; não há suavização temporal configurada nesta bancada."
      },
      {
        "prop": "Shape vazia, câmera direta ou esfera explícita",
        "desc": "Com shape vazia e Camera3D filha direta, a Godot usa uma pirâmide ligada ao near plane. Uma shape explícita substitui essa escolha. Sem shape e sem câmera direta, há fallback para raio, menos adequado à extensão da câmera. Esfera é uma alternativa; raio 0,25 não serve universalmente para toda lente/cena."
      },
      {
        "prop": "collision_mask e add_excluded_object(RID)",
        "desc": "São filtros de física. O projeto usa parede/piso na camada 1, alvo na2, máscara 3 e exclusão explícita do RID do alvo. camera.cull_mask controla visibilidade de renderização e não substitui essa máscara. Máscara errada, forma ausente e colisão inicial precisam de diagnóstico próprio."
      },
      {
        "prop": "FOV em graus, perspectiva e keep_aspect",
        "desc": "fov aplica-se à perspectiva. Com KEEP_HEIGHT, 75° é vertical; em 16:9 o horizontal é aproximadamente 107,51°. Com KEEP_WIDTH o eixo preservado muda. O FOV horizontal é 2atan(tan(FOVv/2) × aspecto). Converter graus/radianos é obrigatório ao calcular com trigonometria."
      },
      {
        "prop": "near, mouse e primeira pessoa",
        "desc": "near recorta a geometria próxima; reduzi-lo não resolve colisão e reduz precisão de profundidade. Em mouse capturado usamos screen_relative, sem escala de conteúdo, e sensibilidade em radianos/pixel. Captura é explícita; Esc e perda de foco liberam. A câmera FPS está no pivot, fora do braço, e oculta o visual do alvo."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "O controlador camera_rig.gd exige a hierarquia descrita abaixo. O ZIP fornece oficina.gd para criá-la, além de parede física, alvo, luz e interface. Ao copiar só o controlador, monte os mesmos nomes/caminhos e dependências. Não é um controlador completo de personagem.",
    "duration": "55–80 min com comparações e repetição (estimativa)",
    "prerequisite": "Aulas 3D 1–4: eixos locais, transformações, malha versus colisão e corpos. Godot 4.5, GDScript, Compatibility, desktop. Cena/scripts revisados documentalmente; execução no motor pendente.",
    "objectives": [
      "Distinguir yaw/pitch, posição e FOV, identificando o eixo preservado pela projeção.",
      "Configurar hierarquia, forma, máscara e exclusão do braço, reconhecendo seus limites.",
      "Alternar orbital/FPS e repetir testes com captura/liberação de mouse e reinício previsíveis."
    ],
    "practice": {
      "title": "Prática guiada: a oficina de enquadramento",
      "intro": "O alvo permanece fixo para isolar a câmera. A cena inicial é mínima; oficina.gd constrói a hierarquia em runtime. Não há personagem andando, tiros, gravidade ou suavização de câmera. A bancada tem botões para todas as rotações discretas, além de mouse capturado.",
      "tree": "Oficina (Node3D / oficina.gd)\n├── Rig (Node3D / camera_rig.gd; alvo fixo)\n│   ├── Alvo (StaticBody3D, camada 2; excluído por RID)\n│   │   ├── Colisao (CollisionShape3D / CapsuleShape3D)\n│   │   └── Visual (MeshInstance3D / CapsuleMesh)\n│   └── Yaw (Node3D, Y=1,3; gira em Y)\n│       └── Pitch (Node3D; gira em X)\n│           ├── Braco (SpringArm3D, +Z; máscara 3)\n│           │   └── Orbital (Camera3D; filha direta)\n│           └── FPS (Camera3D; fora do braço)\n├── Piso / Parede / ReferenciaFrontal (StaticBody3D, camada 1)\n└── Luz / Ambiente / Interface\n\nConstruída em runtime. Escala 1; perspectiva KEEP_HEIGHT.\nVeja a aba de configuração para todos os valores e controles.",
      "download": {
        "url": "assets/aula-3d-05-camera-springarm.zip",
        "label": "Baixar projeto de apoio: câmeras e braço"
      },
      "downloadNote": "Sete arquivos locais com cena, dois scripts, configuração e roteiro de homologação. Execução na Godot pendente.",
      "steps": [
        {
          "title": "Confira hierarquia e referência",
          "text": "Extraia o projeto inteiro, importe project.godot e execute oficina.tscn. Durante a execução, abra a árvore Remota: Orbital deve ser filha direta de Braco; FPS é irmã de Braco, dentro de Pitch. Alvo tem corpo físico na camada 2 e é excluído pelo RID. Piso/parede ficam na1.",
          "expect": "Uma câmera atual por Viewport. A orbital olha−Z, o braço consulta+Z. A hierarquia não depende de o pai imediato do rig ser um CollisionObject3D. Escala1 em todos os nós."
        },
        {
          "title": "Gire por comando e libere o mouse",
          "text": "Use botões de yaw/pitch ou WASD/setas por toque. M ou o botão captura o mouse; mova para girar. Esc libera mouse e foco da UI; M recaptura. Alt-tab/perda de foco também libera. Sliders em foco suspendem os atalhos de giro até Esc. O limite de pitch é ±65°.",
          "expect": "Sem entrada, o alvo e a câmera não giram automaticamente. Repetição de tecla e modificadores não geram passos adicionais. A sensibilidade 0,0025 usa radianos por pixel da tela, com screen_relative. O limite é configurável, não uma regra anatômica."
        },
        {
          "title": "Compare alcance e obstáculo",
          "text": "Restaure; comprimento 4,5 u, parede faceZ3 u, margem 0,05 u, forma vazia. Observe o comprimento calculado, afaste a parede para 7 u e aproxime de novo. Registre a leitura após atualização física. Mantenha yaw/pitch0 para comparar a mesma direção.",
          "expect": "O braço pode recolher diante da parede consultada e retornar ao alcance quando livre. A posição real depende da forma e do motor; não exija os números do modelo web. FOV também pode mudar o resultado da pirâmide automática."
        },
        {
          "title": "Faça o filtro falhar de propósito",
          "text": "Desligue Consultar parede. Compare a câmera com a parede e volte a ligar. Depois compare shape vazia com esfera explícita 0,25. Inspecione as formas físicas: a malha visual da parede, sozinha, não produz uma consulta válida.",
          "expect": "Ignorar a camada 1 permite interseção/oclusão; não é falha da câmera de renderização. Cull mask e collision_mask são filtros diferentes. Esfera substitui a pirâmide e não garante cobrir o near plane em todo enquadramento."
        },
        {
          "title": "Altere FOV sem confundir com distância",
          "text": "Alterne para FPS para isolar o centro da câmera, teste 45°,75° e 100° e redimensione a janela. KEEP_HEIGHT preserva o ângulo vertical, enquanto a largura visível muda com o aspecto. Volte à orbital e compare outra vez, registrando eventual mudança de colisão da pirâmide.",
          "expect": "FOV altera a perspectiva projetada sem solicitar um deslocamento. Em16:9,75° vertical corresponde a≈107,51° horizontal. Não há limiar universal de conforto nem custo de renderização medido aqui. Reduzir near não é correção de parede."
        },
        {
          "title": "Compare orbital e FPS e repita",
          "text": "F alterna make_current: em FPS o visual do alvo some e a câmera usa a origem elevada do pivot; em orbital o braço controla a distância. R restaura visão, filtros, forma vazia, posições, 75°,4,5 u e cursor visível. Repita três vezes sem recarregar.",
          "expect": "O valor hit ainda pertence ao braço mesmo quando a FPS está atual; não representa a posição FPS. A bancada não move o corpo. Integrar locomoção relativa à câmera da aula anterior exige um passo adicional de projeto."
        },
        {
          "title": "Preveja e confira no laboratório web",
          "text": "Com esfera 0,25, parede 3, margem 0,05 e L 4,5, preveja d=2,70 u. Desligue a máscara: d=4,50. Restaure e compare FOV 45/75 sem mudar d; troque 16:9 por1:1 para comparar FOV horizontal. A/D aproximam/afastam parede por 0,25 u, só com foco no desenho; R restaura.",
          "expect": "O Canvas usa fórmula própria de esfera contra plano perpendicular. Origem já sobreposta gera aviso de condição insegura, sem prometer solução física. A pausa permite ajustar e reiniciar; não há movimento temporal para avançar."
        }
      ]
    },
    "checks": [
      {
        "question": "Por que a Camera3D deve ser filha direta quando shape está vazia?",
        "answer": "Essa relação permite ao braço usar a pirâmide associada ao near plane. Sem câmera direta e sem shape, ele recorre a um raio. Uma shape explícita substitui a seleção automática."
      },
      {
        "question": "FOV 75° sempre significa 75° na horizontal?",
        "answer": "Não. Em perspectiva com KEEP_HEIGHT é vertical; o horizontal depende do aspecto. Com KEEP_WIDTH é preservado o eixo horizontal."
      },
      {
        "question": "Por que a parede pode ser ignorada mesmo aparecendo na imagem?",
        "answer": "Aparência depende da renderização. A consulta precisa de forma física, camada incluída na collision_mask e ausência de exclusão indevida. Cull mask da câmera não controla essa colisão."
      },
      {
        "question": "FOV menor e câmera mais próxima são o mesmo zoom?",
        "answer": "Não. FOV muda o enquadramento a partir do centro; deslocar a câmera muda o ponto de vista, a paralaxe e proporções relativas em profundidade. No braço automático, a mudança de pirâmide pode também afetar a colisão."
      }
    ],
    "pitfalls": [
      {
        "title": "A câmera orbital fica dentro do alvo",
        "text": "Confira pivot, hierarquia e exclusão do RID. Não use get_parent().get_rid sem garantir o tipo/caminho. A bancada exclui Alvo explicitamente."
      },
      {
        "title": "A parede é visível, mas o braço não reage",
        "text": "Confira StaticBody3D, CollisionShape3D, camada 1 e máscara do braço. Reative a consulta. A mesh e o cull_mask não bastam."
      },
      {
        "title": "O mouse não responde ou fica preso",
        "text": "Use M/botão para capturar; confira foco da janela. Esc libera e remove foco da UI. O script só processa mouse capturado e libera ao perder foco."
      },
      {
        "title": "O valor hit não acompanha a visão FPS",
        "text": "Ele é medido no SpringArm3D; a FPS está fora do braço e não usa esse comprimento. Leia a câmera atual e o modo exibido."
      },
      {
        "title": "Quinas ou origem sobreposta ainda dão problema",
        "text": "Não trate raio, esfera ou pirâmide como garantia universal. Confira geometria, ponto inicial e dimensões do near plane. Reposicione o pivot e teste no motor antes de adicionar suavização."
      }
    ],
    "summary": "Hierarquia separa yaw/pitch, o braço consulta física e a câmera projeta a cena. Distância, FOV e near têm funções diferentes. Filtros e exclusão importam; capture/libere a entrada explicitamente e repita ensaios antes de integrar locomoção.",
    "next": "Na aula 3D 6, separe detecção por Area3D, consultas por RayCast3D e seleção pela posição do mouse. A consulta do braço não substitui esses sistemas.",
    "sources": [
      {
        "label": "Camera3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_camera3d.html"
      },
      {
        "label": "SpringArm3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_springarm3d.html"
      },
      {
        "label": "Câmera de terceira pessoa e braço",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/spring_arm.html"
      },
      {
        "label": "InputEventMouseMotion: screen_relative",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_inputeventmousemotion.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Controlador da câmera",
      "whenToUse": "Com a hierarquia fornecida, para experimentar yaw/pitch e trocar orbital/FPS.",
      "description": "camera_rig.gd fica em Rig. A exclusão aponta para Alvo, não presume o tipo do pai. Captura explícita, Escape, foco e reinício fazem parte do exemplo. FPS não usa o braço; não há locomoção implementada.",
      "code": "extends Node3D\n## Bancada de câmera, sem controlador de locomoção.\n@export var sensibilidade: float = 0.0025 # radianos por pixel da tela\n@onready var yaw: Node3D = $Yaw\n@onready var pitch: Node3D = $Yaw/Pitch\n@onready var braco: SpringArm3D = $Yaw/Pitch/Braco\n@onready var orbital: Camera3D = $Yaw/Pitch/Braco/Orbital\n@onready var fps: Camera3D = $Yaw/Pitch/FPS\n@onready var alvo: StaticBody3D = $Alvo\nvar primeira_pessoa := false\nvar modo_anterior: Input.MouseMode\n\nfunc _ready() -> void:\n    modo_anterior = Input.mouse_mode\n    braco.add_excluded_object(alvo.get_rid())\n    restaurar()\n\nfunc girar(horizontal: float, vertical: float) -> void:\n    yaw.rotation.y = wrapf(yaw.rotation.y + horizontal, -PI, PI)\n    # Limite de design configurável, não limite anatômico universal.\n    pitch.rotation.x = clampf(pitch.rotation.x + vertical, deg_to_rad(-65), deg_to_rad(65))\n\nfunc capturar() -> void:\n    var foco := get_viewport().gui_get_focus_owner()\n    if foco != null:\n        foco.release_focus()\n    Input.mouse_mode = Input.MOUSE_MODE_CAPTURED\n\nfunc liberar() -> void:\n    Input.mouse_mode = Input.MOUSE_MODE_VISIBLE\n\nfunc alternar() -> void:\n    primeira_pessoa = not primeira_pessoa\n    aplicar_modo()\n\nfunc aplicar_modo() -> void:\n    $Alvo/Visual.visible = not primeira_pessoa\n    if primeira_pessoa:\n        fps.make_current()\n    else:\n        orbital.make_current()\n\nfunc definir_fov(valor: float) -> void:\n    orbital.fov = valor\n    fps.fov = valor\n\nfunc restaurar() -> void:\n    liberar()\n    yaw.rotation = Vector3.ZERO\n    pitch.rotation = Vector3.ZERO\n    braco.spring_length = 4.5\n    braco.margin = 0.05\n    braco.collision_mask = 3 # paredes/piso: camada 1; alvo: camada 2, excluído por RID\n    braco.shape = null # Camera filha direta: pirâmide do near plane\n    definir_fov(75)\n    primeira_pessoa = false\n    aplicar_modo()\n\nfunc _input(event: InputEvent) -> void:\n    if event is InputEventKey and event.pressed and not event.echo and event.keycode == KEY_ESCAPE:\n        liberar()\n        var foco := get_viewport().gui_get_focus_owner()\n        if foco != null:\n            foco.release_focus()\n        get_viewport().set_input_as_handled()\n\nfunc _unhandled_input(event: InputEvent) -> void:\n    if event is InputEventMouseMotion and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:\n        girar(-event.screen_relative.x * sensibilidade, -event.screen_relative.y * sensibilidade)\n        get_viewport().set_input_as_handled()\n    if event is InputEventKey and event.pressed and not event.echo:\n        if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n            return\n        # Com UI em foco, suas teclas não comandam a bancada.\n        if get_viewport().gui_get_focus_owner() != null:\n            return\n        var passo := deg_to_rad(5)\n        match event.physical_keycode:\n            KEY_A, KEY_LEFT: girar(passo, 0)\n            KEY_D, KEY_RIGHT: girar(-passo, 0)\n            KEY_W, KEY_UP: girar(0, passo)\n            KEY_S, KEY_DOWN: girar(0, -passo)\n            KEY_F: alternar()\n            KEY_M: capturar()\n            KEY_R: get_parent().restaurar_tudo()\n            _: return\n        get_viewport().set_input_as_handled()\n\nfunc _notification(what: int) -> void:\n    if what == NOTIFICATION_APPLICATION_FOCUS_OUT:\n        liberar()\n\nfunc _exit_tree() -> void:\n    Input.mouse_mode = modo_anterior\n",
      "pros": "Separação dos eixos, limite ajustável, mouse sem escala de conteúdo e recuperação da entrada.",
      "cons": "Sem suavização, colisão da câmera FPS ou integração com CharacterBody3D. A execução no motor ainda precisa ser homologada."
    },
    {
      "title": "2. Configuração e dependências",
      "language": "text",
      "whenToUse": "Antes de copiar o controlador ou interpretar as leituras.",
      "description": "Referência textual. A hierarquia é criada em runtime pelo script da oficina. O projeto usa eventos físicos discretos e não exige InputMap.",
      "code": "Godot 4.5 / GDScript / Compatibility / desktop\nAbra project.godot; F6 em oficina.tscn ou F5 no projeto.\nA cena e a UI são construídas por oficina.gd em runtime.\nOficina\n  Rig (Node3D / camera_rig.gd; alvo fixo)\n    Alvo (StaticBody3D; layer 2; cápsula raio0,3 altura1,8)\n      Colisao (Y=0,9)\n      Visual (Y=0,9)\n    Yaw (Node3D; Y=1,3; gira eixo Y)\n      Pitch (Node3D; gira eixo X; limite±65°)\n        Braco (SpringArm3D; +Z; máscara3; comprimento4,5; margem0,05)\n          Orbital (Camera3D; filha direta; olha−Z; near0,05)\n        FPS (Camera3D; mesma origem do pivot; sem braço)\n  Piso / Parede / ReferenciaFrontal (StaticBody3D; layer1)\n  DirectionalLight3D / WorldEnvironment / CanvasLayer\nEscala1 em todos os nós. Cameras KEEP_HEIGHT, perspectiva, FOV75°.\nNenhum InputMap exigido: eventos físicos discretos WASD/setas.\nNão há locomoção, gravidade, tiro ou rotação automática do alvo.\nM/botão captura mouse; Esc libera; perder foco libera; sair restaura modo anterior.\nMouse capturado: screen_relative, sensibilidade0,0025rad/pixel.\nF alterna câmera atual por make_current; visual oculto em FPS.\nW/S pitch e A/D yaw em5° por toque; echo/modificadores ignorados.\nUI com foco não gira; Esc libera foco. R/botão restaura parâmetros e visão.\nParede faceZ3, espessura0,2; piso também participa da máscara1.\nExclusão explícita do RID de Alvo. Máscara física não é cull_mask.\nForma vazia + Camera filha direta usa pirâmide near-plane; esfera explícita substitui.\nLeitura hit é resultado do braço, inclusive quando FPS está atual; não é posição FPS.\n",
      "pros": "Explicita nomes, tipos, filtros, unidades e modos de câmera.",
      "cons": "Não substitui inspeção da árvore Remota nem teste de contato real."
    },
    {
      "title": "3. Montagem da oficina",
      "whenToUse": "Para reproduzir os ensaios com parede, formas, interface e telemetria.",
      "description": "oficina.gd cria alvo fixo, duas câmeras, braço, geometria, luz e controles. As leituras diferenciam desejado/hit e mostram modo atual. A máscara desligada ignora parede e piso da camada 1.",
      "code": "extends Node3D\nvar rig\nvar parede: StaticBody3D\nvar leitura: Label\nvar controles: VBoxContainer\nvar distancia: HSlider\nvar comprimento: HSlider\nvar fov: HSlider\nvar mascara: CheckButton\nvar esfera: CheckButton\n\nfunc caixa(nome: String, centro: Vector3, tamanho: Vector3, cor: Color) -> StaticBody3D:\n    var corpo := StaticBody3D.new()\n    corpo.name = nome\n    corpo.position = centro\n    corpo.collision_layer = 1\n    corpo.collision_mask = 0\n    var forma := BoxShape3D.new()\n    forma.size = tamanho\n    var colisao := CollisionShape3D.new()\n    colisao.shape = forma\n    corpo.add_child(colisao)\n    var malha := MeshInstance3D.new()\n    var mesh := BoxMesh.new()\n    mesh.size = tamanho\n    malha.mesh = mesh\n    var material := StandardMaterial3D.new()\n    material.albedo_color = cor\n    malha.material_override = material\n    corpo.add_child(malha)\n    add_child(corpo)\n    return corpo\n\nfunc botao(texto: String, acao: Callable) -> void:\n    var b := Button.new()\n    b.text = texto\n    b.pressed.connect(acao)\n    controles.add_child(b)\n\nfunc deslizador(texto: String, minimo: float, maximo: float, passo: float, valor: float, acao: Callable) -> HSlider:\n    var l := Label.new()\n    l.text = texto\n    controles.add_child(l)\n    var s := HSlider.new()\n    s.min_value = minimo\n    s.max_value = maximo\n    s.step = passo\n    s.value = valor\n    s.value_changed.connect(acao)\n    controles.add_child(s)\n    return s\n\nfunc _ready() -> void:\n    caixa(\"Piso\", Vector3(0,-0.15,0), Vector3(20,0.3,20), Color(\"43301d\"))\n    parede = caixa(\"Parede\", Vector3(0,2,3.1), Vector3(8,4,0.2), Color(\"976237\"))\n    caixa(\"ReferenciaFrontal\", Vector3(0,1,-4), Vector3(1,2,1), Color(\"39969b\"))\n    rig = Node3D.new()\n    rig.name = \"Rig\"\n    var alvo := StaticBody3D.new()\n    alvo.name = \"Alvo\"\n    alvo.collision_layer = 2\n    alvo.collision_mask = 0\n    var col := CollisionShape3D.new()\n    var capsula := CapsuleShape3D.new()\n    capsula.radius = 0.3\n    capsula.height = 1.8\n    col.shape = capsula\n    col.position.y = 0.9\n    alvo.add_child(col)\n    var visual := MeshInstance3D.new()\n    visual.name = \"Visual\"\n    var mesh := CapsuleMesh.new()\n    mesh.radius = 0.3\n    mesh.height = 1.8\n    visual.mesh = mesh\n    visual.position.y = 0.9\n    alvo.add_child(visual)\n    rig.add_child(alvo)\n    var yaw := Node3D.new()\n    yaw.name = \"Yaw\"\n    yaw.position.y = 1.3\n    rig.add_child(yaw)\n    var pitch := Node3D.new()\n    pitch.name = \"Pitch\"\n    yaw.add_child(pitch)\n    var braco := SpringArm3D.new()\n    braco.name = \"Braco\"\n    pitch.add_child(braco)\n    var orbital := Camera3D.new()\n    orbital.name = \"Orbital\"\n    orbital.keep_aspect = Camera3D.KEEP_HEIGHT\n    braco.add_child(orbital)\n    var fps := Camera3D.new()\n    fps.name = \"FPS\"\n    fps.keep_aspect = Camera3D.KEEP_HEIGHT\n    pitch.add_child(fps)\n    rig.set_script(preload(\"res://camera_rig.gd\"))\n    add_child(rig)\n    var luz := DirectionalLight3D.new()\n    luz.rotation_degrees = Vector3(-50,-25,0)\n    add_child(luz)\n    var ambiente := WorldEnvironment.new()\n    ambiente.environment = Environment.new()\n    ambiente.environment.background_mode = Environment.BG_COLOR\n    ambiente.environment.background_color = Color(\"211b16\")\n    ambiente.environment.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR\n    ambiente.environment.ambient_light_color = Color(\"d2bd9d\")\n    ambiente.environment.ambient_light_energy = 0.6\n    add_child(ambiente)\n    var camada := CanvasLayer.new()\n    add_child(camada)\n    var painel := PanelContainer.new()\n    painel.position = Vector2(12,12)\n    painel.custom_minimum_size = Vector2(360,0)\n    camada.add_child(painel)\n    controles = VBoxContainer.new()\n    painel.add_child(controles)\n    leitura = Label.new()\n    controles.add_child(leitura)\n    botao(\"Capturar mouse · M / Esc libera\", rig.capturar)\n    botao(\"Alternar orbital / FPS · F\", rig.alternar)\n    botao(\"Yaw +5°\", func(): rig.girar(deg_to_rad(5),0))\n    botao(\"Yaw −5°\", func(): rig.girar(deg_to_rad(-5),0))\n    botao(\"Pitch +5°\", func(): rig.girar(0,deg_to_rad(5)))\n    botao(\"Pitch −5°\", func(): rig.girar(0,deg_to_rad(-5)))\n    comprimento = deslizador(\"Comprimento desejado (u)\",1,6,0.25,4.5,func(v): rig.braco.spring_length=v)\n    distancia = deslizador(\"Face da parede em +Z (u)\",1,7,0.25,3,func(v): parede.position.z=v+0.1)\n    fov = deslizador(\"FOV vertical (graus), KEEP_HEIGHT\",45,100,1,75,rig.definir_fov)\n    mascara = CheckButton.new()\n    mascara.text = \"Consultar parede (camada física 1)\"\n    mascara.button_pressed = true\n    mascara.toggled.connect(func(ativo): rig.braco.collision_mask = 3 if ativo else 2)\n    controles.add_child(mascara)\n    esfera = CheckButton.new()\n    esfera.text = \"Forma explícita: esfera raio 0,25\"\n    esfera.toggled.connect(func(ativo):\n        if ativo:\n            var forma := SphereShape3D.new()\n            forma.radius = 0.25\n            rig.braco.shape = forma\n        else:\n            rig.braco.shape = null)\n    controles.add_child(esfera)\n    botao(\"Restaurar tudo · R\", restaurar_tudo)\n\nfunc restaurar_tudo() -> void:\n    rig.restaurar()\n    parede.position.z = 3.1\n    comprimento.set_value_no_signal(4.5)\n    distancia.set_value_no_signal(3)\n    fov.set_value_no_signal(75)\n    mascara.set_pressed_no_signal(true)\n    esfera.set_pressed_no_signal(false)\n\nfunc _process(_delta: float) -> void:\n    leitura.text = (\"BANCADA DE CÂMERA · alvo fixo\\n%s | desejado %.2f / hit %.2f u\\nFOV vertical %.0f° | yaw %.0f° / pitch %.0f°\\nWASD/setas: giro por toque; Esc: foco/mouse\" % [\n        \"FPS (sem braço)\" if rig.primeira_pessoa else \"Orbital\",\n        rig.braco.spring_length,rig.braco.get_hit_length(),rig.orbital.fov,\n        rig.yaw.rotation_degrees.y,rig.pitch.rotation_degrees.x])\n",
      "pros": "Testes repetíveis de forma, máscara, FOV, distância e captura sem recarregar.",
      "cons": "Interface de bancada para desktop, sem medição de desempenho ou controlador de jogo completo."
    }
  ],
  "simulator": {
    "type": "springarm_camera_3d",
    "title": "Laboratório: recolhimento e campo de visão",
    "description": "Modelo analítico Canvas/JS: esfera explícita contra plano infinito perpendicular a +Z, com folga própria. Desenho lateral e projeção vertical separados. Não executa Godot nem reproduz a pirâmide automática, colisão inicial resolvida, quinas ou suavização.",
    "guide": [
      {
        "title": "Preveja o recolhimento",
        "text": "Valores iniciais: L 4,5, D 3, r 0,25 e m 0,05 u → d 2,70 u. Com máscara desligada o centro vai para 4,50 u, podendo atravessar a parede. A/D ou setas mudam D por 0,25 u por toque, com foco no desenho."
      },
      {
        "title": "Compare projeções",
        "text": "Com máscara/forma explícita fixas, FOV muda a abertura, não d. Em KEEP_HEIGHT 75° e16:9, o horizontal é≈107,51°; em 1:1 é75°. A altura no plano do pivot é 2d × tan(FOVv/2). O plano desenhado é uma referência geométrica, não a imagem final renderizada."
      },
      {
        "title": "Restaure e reconheça o limite",
        "text": "R ou o botão repõe todos os controles. O modelo é estático; pausa não bloqueia ajustes. Com D≤r aparece condição inicial insegura. Não use o zero calculado como solução de colisão da Godot."
      }
    ]
  },
  "quiz": {
    "question": "A Camera3D é filha direta do SpringArm3D, shape está vazia e keep_aspect é KEEP_HEIGHT. Qual afirmação está correta?",
    "options": [
      "O braço pode usar a pirâmide do near plane; fov é vertical e a máscara física precisa incluir a parede.",
      "O braço sempre usa raio; fov75° é sempre horizontal.",
      "Diminuir near resolve qualquer interseção mesmo sem forma física na parede.",
      "Cull mask da câmera substitui collision_mask e dispensa excluir o alvo."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Hierarquia, projeção e consulta física têm funções diferentes.",
      "A câmera direta permite a pirâmide automática; KEEP_HEIGHT preserva o FOV vertical.",
      "Near é recorte de projeção, não substituto da consulta física.",
      "Cull mask controla renderização; collision_mask e exclusão controlam a consulta do braço."
    ],
    "explanation": "Com câmera direta e shape vazia, o braço usa a pirâmide associada ao near plane. KEEP_HEIGHT preserva o FOV vertical. A parede só participa se sua forma/camada passar pelo filtro físico."
  }
},

{
  "id": "3d-init-areas-raycasts-picking",
  "area": "3d",
  "level": "iniciante",
  "levelLabel": "Iniciante",
  "title": "6. Area3D, RayCast3D e seleção com o mouse",
  "subtitle": "Diferencie sobreposição, primeiro impacto e projeção do cursor; teste filtros e ausência de resultado antes de acionar um mecanismo.",
  "nodesUsed": [
    "Area3D",
    "RayCast3D",
    "Camera3D",
    "PhysicsRayQueryParameters3D"
  ],
  "feynman": {
    "title": "Detectar uma região, apontar e selecionar são consultas diferentes",
    "explanation": "Area3D acompanha corpos ou áreas que se sobrepõem ao seu volume. Um RayCast3D procura o primeiro objeto aceito ao longo de um segmento: ele pode parar numa parede antes de alcançar o mecanismo. Para selecionar com o mouse, a câmera fornece uma origem e uma direção no mundo a partir do pixel do Viewport; uma consulta física decide o que está nesse caminho. Nenhuma dessas consultas aciona automaticamente uma porta, move um personagem ou cria faíscas: essas ações precisam de código.",
    "analogies": [
      {
        "term": "Sensor de presença",
        "analogy": "Uma região avisa quem entrou ou saiu. Paredes não bloqueiam por si só esse teste de sobreposição; estar perto não prova que você está olhando para o objeto."
      },
      {
        "term": "Apontar com alcance",
        "analogy": "Um segmento tem origem, direção e fim. Entre os candidatos que passam pelos filtros, o primeiro pode ser uma parede sem interação. Ignorar a parede na máscara muda deliberadamente a regra."
      },
      {
        "term": "Selecionar pelo cursor",
        "analogy": "O pixel é uma coordenada de tela, não uma posição pronta no chão. Projeção da câmera e consulta de colisão são duas etapas. Clicar pode selecionar sem acionar nem iniciar locomoção."
      }
    ]
  },
  "howItWorks": {
    "overview": "Referência Godot 4.5, GDScript e desktop. Corpo/área precisam de CollisionShape3D com recurso válido; MeshInstance3D só desenha. Mantemos escala 1 e convencionamos 1 u = 1 m. A bancada tem dois ensaios independentes: um corpo entra/sai do sensor; a câmera consulta parede, mecanismo e piso. A interação central não depende de estar no sensor. Filtros são parte da regra do jogo, não uma medida de proximidade universal.",
    "anatomy": [
      {
        "prop": "Area3D: monitoring, mask e sinais",
        "desc": "monitoring habilita o acompanhamento. A collision_mask do sensor inclui a collision_layer do corpo observado; a máscara do corpo não precisa consultar o sensor para este teste. body_entered/body_exited tratam corpos; area_entered/area_exited tratam outras áreas. monitorable permite que outras áreas detectem esta e não substitui monitoring."
      },
      {
        "prop": "Sobreposição atualizada na física",
        "desc": "get_overlapping_bodies não muda imediatamente após reposicionar um corpo. Aguarde atualização física e use sinais para acompanhar transições. Não confunda manter-se dentro com entrar novamente a cada frame. Alterações do filtro reiniciam a contagem de ensaio do apoio; isso não é movimento do corpo."
      },
      {
        "prop": "RayCast3D: destino local e resultado global",
        "desc": "target_position é relativo ao nó do raio; (0,0,−alcance) aponta para −Z local, desde que hierarquia/rotação sejam coerentes. is_colliding deve ser verificado antes de ler ponto, normal ou collider. Ponto e normal são globais. O resultado é mantido até a próxima atualização física; force_raycast_update permite atualizar imediatamente uma configuração alterada."
      },
      {
        "prop": "Máscara, tipo, exceção e primeiro resultado",
        "desc": "RayCast3D consulta corpos por padrão; áreas precisam de collide_with_areas=true. A query direta também tem esses filtros. Máscara é um conjunto de bits: camadas 1/2/3/4 correspondem a valores 1/2/4/8; máscara 13 inclui 1,3,4. Exclua o próprio corpo explicitamente quando necessário. exclude_parent não procura arbitrariamente um ancestral do personagem."
      },
      {
        "prop": "Camera3D → origem + direção × alcance",
        "desc": "project_ray_origin e project_ray_normal recebem a posição no Viewport da câmera. Use ambos: em ortográfica, a origem depende do pixel; não substitua tudo pela posição global da câmera. Em _unhandled_input guarde o clique; consulte direct_space_state.intersect_ray em _physics_process. UI que consumiu o clique não deve disparar a seleção."
      },
      {
        "prop": "Resultado vazio e normal utilizável",
        "desc": "intersect_ray devolve Dictionary vazio sem acerto. Vector3.ZERO pode ser um ponto válido e não é sentinela de falha. hit_from_inside pode produzir normal zero, que não orienta um efeito. Para a haste modelada em −Z, look_at aponta esse eixo para a normal; se ela é quase paralela a UP, escolha outro up. Decals e partículas podem ter outros eixos locais."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "consultas.gd é o controlador principal, em Consultas. O apoio inclui sensor.gd, mecanismo.gd e oficina.gd, que monta a hierarquia em runtime. Copiar só o controlador exige criar os nós e injetar as referências descritas na configuração. Os exemplos mostram seleção e acionamento simples; não implementam tiro com dano, partículas ou click-to-move.",
    "duration": "70–95 min com previsão e ensaios de filtro (estimativa)",
    "prerequisite": "Aulas 3D 1–5: coordenadas locais/globais, formas físicas, corpos e Camera3D. Godot 4.5, GDScript, Compatibility, desktop. Execução do apoio no motor pendente; revisão documental não equivale a teste físico.",
    "objectives": [
      "Escolher Area3D para sobreposição e RayCast3D para o primeiro impacto, configurando tipos e máscaras.",
      "Projetar um clique pelo Viewport e tratar explicitamente resultado vazio, ponto global e normal.",
      "Acionar somente um primeiro resultado compatível, repetir testes e recuperar a entrada sem recarregar."
    ],
    "practice": {
      "title": "Prática guiada: presença, mira e seleção",
      "intro": "O corpo à esquerda é movido em passos de 0,25 u dentro de um sensor; não possui gravidade nem locomoção com colisão resolvida. O mecanismo central é uma Area3D atrás de uma parede. E consulta a mira central e tenta acionar; clicar no mundo apenas seleciona. A câmera é fixa e usa cursor visível.",
      "tree": "Oficina (Node3D / oficina.gd; montagem em runtime)\n├── Piso (StaticBody3D; camada 4, bit 8)\n├── Parede (StaticBody3D; camada 1, bit 1)\n├── CorpoEnsaio (AnimatableBody3D; camada 2, bit 2)\n│   └── CollisionShape3D + MeshInstance3D / esfera 0,3\n├── Sensor (Area3D / sensor.gd; máscara 2)\n│   └── CollisionShape3D + visual / esfera 1,5\n├── Mecanismo (Area3D / mecanismo.gd; camada 3, bit 4)\n│   └── CollisionShape3D + visual / esfera 0,7\n├── Consultas (Node3D / consultas.gd)\n│   ├── Camera3D atual\n│   │   └── Mira (RayCast3D, −Z local)\n│   └── Marcador (Node3D; haste visual em −Z)\n└── Luz / Ambiente / Interface\n\nFormas e malhas separadas; escala 1. Máscara do raio 13.\nO sensor acompanha o CorpoEnsaio; não bloqueia a interação central.",
      "download": {
        "url": "assets/aula-3d-06-sensores-raios.zip",
        "label": "Baixar projeto de apoio: sensores, raios e seleção"
      },
      "downloadNote": "Nove arquivos locais, incluindo quatro scripts, cena, configuração e roteiro. Compilação/execução na Godot pendentes.",
      "steps": [
        {
          "title": "Inspecione as três consultas",
          "text": "Importe o projeto e execute oficina.tscn. Na árvore Remota, confira as formas, a Camera3D e Mira como filha dela. Leia a configuração: parede na camada 1, corpo de ensaio na 2, mecanismo na 3 e piso na 4. Os valores dos bits são 1,2,4,8; máscara 13 não significa camada 13.",
          "expect": "Mesh e forma física têm funções distintas. O sensor usa máscara 2; raio/query usam máscara 13 e consultam áreas e corpos explicitamente. Nenhum InputMap é exigido: o apoio usa eventos físicos discretos."
        },
        {
          "title": "Entre, permaneça e saia do sensor",
          "text": "Aguarde a linha de base após iniciar. D ou o botão move o corpo 0,25 u à direita por toque; A move à esquerda. Sensor está em X=−4 e o corpo começa em X=−7. Observe body_entered quando houver sobreposição; pare dentro e depois saia. A leitura física pode aparecer no tick seguinte, não imediatamente na instrução de mover.",
          "expect": "Permanecer dentro não deve somar uma entrada por frame. A tangência exata depende do motor e de suas tolerâncias; não exija o limite analítico do Canvas. Sem comando, o corpo não anda sozinho."
        },
        {
          "title": "Compare geometria e filtro",
          "text": "Com o corpo dentro, desligue monitoring ou a consulta da camada 2. Cada mudança inicia nova contagem e três ticks de estabilização no apoio. Reative, aguarde e repita o trajeto. No navegador, compare sobreposição geométrica com detecção filtrada.",
          "expect": "Estar geometricamente dentro não basta se a consulta está desligada ou o layer não passa na máscara. monitorable não é o interruptor de detecção de corpos. O Canvas não emite sinais da Godot."
        },
        {
          "title": "Deixe a parede ser o primeiro resultado",
          "text": "Restaure. E ou o botão consulta a mira central. Com máscara 13 e corpos/áreas ligados, a parede fica antes do mecanismo. Observe collider, ponto e normal. Não salte o primeiro resultado apenas porque ele não tem interagir. Depois escolha máscara 12 ou 4 e repita.",
          "expect": "Com parede consultada, o mecanismo não é acionado atrás dela. Ignorar a camada da parede permite atravessá-la por regra explícita. O alvo implementa interagir e incrementa uma vez por pedido; só o último pedido antes do tick é consumido."
        },
        {
          "title": "Produza ausência de resultado",
          "text": "Na máscara 4, desligue a consulta de áreas e pressione E: não há candidato válido. Teste alcance curto e depois restaure. No navegador, máscara 13/ângulo 0/alcance 1 também não encontra impacto; alcance 8 encontra a face da parede a 2,6 u.",
          "expect": "A ausência é explícita; um novo comando sem resultado remove o marcador antigo e não cria faíscas fictícias. Dictionary vazio não deve virar ponto (0,0,0), pois essa coordenada poderia ser um acerto real."
        },
        {
          "title": "Selecione pelo cursor e examine a normal",
          "text": "Clique no mundo fora da UI para guardar a posição do evento; a consulta ocorre na física. Compare piso, parede e esfera, alterando filtros quando necessário. O clique seleciona sem acionar; E tenta acionar no centro. A haste guarda o último ponto/normal e não segue ajustes de filtro. Para o piso, a normal pode ser UP: o código usa RIGHT como up alternativo.",
          "expect": "Ponto e normal são globais. A haste foi modelada em −Z; outro efeito exigiria conferir seu eixo. Normal zero não recebe look_at. Coordenadas de um SubViewport exigiriam conversão apropriada; esta bancada usa um único Viewport."
        },
        {
          "title": "Repita com foco e reinício previsíveis",
          "text": "Na Godot, UI em foco suspende A/D/E/R; Esc libera foco. R ou botão restaura parâmetros, corpo, contadores e marcador; aguarde a física. No Canvas, setas mudam ângulo por 5°, A/D movem o corpo do sensor por 0,25 u, E consulta e R restaura. Clique no painel do raio ajusta direção arredondada a 1°; não é projeção real de câmera.",
          "expect": "Atalhos não repetem por tecla sustentada nem com Ctrl/Alt/Meta. Há botões equivalentes para mover, consultar e restaurar. O modelo web é estático, pode ser ajustado em pausa e não valida sinais, captura de clique ou colisões do motor."
        }
      ]
    },
    "checks": [
      {
        "question": "Estar dentro da esfera garante que Area3D detecte o corpo?",
        "answer": "Não. São necessárias formas válidas, monitoring e máscara incluindo o layer do corpo. A lista é atualizada pelo motor na física. Para outra área, também há o contrato de monitorable da área observada."
      },
      {
        "question": "Por que não procurar um interagível atrás do primeiro resultado?",
        "answer": "O primeiro objeto aceito pode ser uma parede que bloqueia a interação. Filtrar a parede deliberadamente cria outra regra; has_method não deve apagar a oclusão depois da consulta."
      },
      {
        "question": "Por que guardar o clique e consultar no passo físico?",
        "answer": "Acesso direto ao espaço pode estar bloqueado durante entrada. O evento registra a intenção; a consulta física resolve o resultado. O exemplo mantém só o último pedido antes do tick, sem uma fila de cliques."
      },
      {
        "question": "Como distinguir falha de um impacto na origem?",
        "answer": "Pelo Dictionary vazio versus um resultado com position. Vector3.ZERO sozinho é ambíguo. Ponto global, normal e collider só são usados quando existe um resultado."
      }
    ],
    "pitfalls": [
      {
        "title": "O sensor não avisa entrada",
        "text": "Confira forma física, monitoring, layer do corpo e mask do sensor. Aguarde a atualização física; o visual não participa da detecção. Não troque body_entered por area_entered para um PhysicsBody3D."
      },
      {
        "title": "O raio ignora meu mecanismo",
        "text": "O mecanismo desta bancada é Area3D na camada 3 (bit 4). Ligue collide_with_areas e inclua esse bit na máscara. Um corpo físico tem outro filtro de tipo."
      },
      {
        "title": "O clique na interface também seleciona",
        "text": "Use _unhandled_input e deixe a UI consumir seus eventos. A consulta manual não depende de input_ray_pickable; o picking automático por _input_event tem requisitos próprios. SubViewports exigem coordenadas do Viewport correto."
      },
      {
        "title": "A leitura ainda é da configuração anterior",
        "text": "RayCast3D guarda o resultado até atualizar. Use force_raycast_update ao precisar reler imediatamente uma alteração. Consultas diretas e mudança do corpo devem ser feitas no contexto físico apropriado."
      },
      {
        "title": "A marca fica virada errado no chão",
        "text": "Confira o eixo local da marca e o up usado em look_at. Uma normal quase paralela a UP exige outro up; uma normal zero não define orientação. Esta haste aponta em −Z, não é um Decal genérico."
      }
    ],
    "summary": "Volume, segmento e projeção do cursor resolvem perguntas diferentes. Tipos, máscaras e exceções definem candidatos; o primeiro pode bloquear uma ação. Trate ausência explicitamente, use o passo físico e confira ponto, normal e eixo do efeito antes de integrar a interação ao jogo.",
    "next": "Na aula 3D 7, estude materiais PBR. Aqui as cores apenas identificam objetos: aparência da malha não muda a forma física, a máscara ou a normal retornada pela consulta.",
    "sources": [
      {
        "label": "Area3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_area3d.html"
      },
      {
        "label": "RayCast3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_raycast3d.html"
      },
      {
        "label": "Ray-casting e entrada no passo físico",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/physics/ray-casting.html"
      },
      {
        "label": "PhysicsRayQueryParameters3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_physicsrayqueryparameters3d.html"
      },
      {
        "label": "Camera3D: projeção",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_camera3d.html"
      },
      {
        "label": "CollisionObject3D: picking automático",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_collisionobject3d.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Mira, clique e último resultado",
      "whenToUse": "Com a hierarquia e as referências fornecidas pela oficina.",
      "description": "consultas.gd fica em Consultas. Mantém uma intenção de clique/ação até o tick físico; usa RayCast3D para E e query projetada para o clique. O marcador é uma haste em −Z. O corpo é deslocado só para testar o sensor, sem resolver locomoção de jogo.",
      "code": "extends Node3D\n## Camera e RayCast são montados por oficina.gd antes de entrar na árvore.\n@onready var camera: Camera3D = $Camera3D\n@onready var raio: RayCast3D = $Camera3D/Mira\n@onready var marcador: Node3D = $Marcador\nvar corpo: AnimatableBody3D\nvar sensor: Area3D\nvar alvo: Area3D\nvar alcance := 20.0\nvar mascara := 13 # bits das camadas 1, 3 e 4: parede, alvo e piso\nvar incluir_areas := true\nvar incluir_corpos := true\nvar pedido := false\nvar pixel := Vector2.ZERO\nvar acionar := false\nvar deslocamento_pendente := 0.0\nvar ultimo := \"Sem consulta por comando\"\nvar previa := \"Aguardando física\"\n\nfunc _ready() -> void:\n    raio.add_exception(corpo)\n    restaurar()\n\nfunc pedir_centro() -> void:\n    pixel = get_viewport().get_visible_rect().size * 0.5\n    pedido = true\n    acionar = true\n\nfunc mover_corpo(delta_x: float) -> void:\n    deslocamento_pendente += delta_x\n\nfunc restaurar() -> void:\n    alcance = 20.0\n    mascara = 13\n    incluir_areas = true\n    incluir_corpos = true\n    pedido = false\n    acionar = false\n    deslocamento_pendente = 0.0\n    marcador.visible = false\n    ultimo = \"Sem consulta por comando\"\n    previa = \"Aguardando física\"\n\nfunc _unhandled_input(event: InputEvent) -> void:\n    # UI consome seus próprios cliques; aqui só chegam cliques não tratados.\n    if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:\n        pixel = event.position\n        pedido = true # no máximo o último clique antes do próximo tick\n        acionar = false # selecionar não implica acionar um mecanismo\n        get_viewport().set_input_as_handled()\n    if event is InputEventKey and event.pressed and not event.echo:\n        if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n            return\n        if get_viewport().gui_get_focus_owner() != null:\n            return\n        match event.physical_keycode:\n            KEY_A, KEY_LEFT: mover_corpo(-0.25)\n            KEY_D, KEY_RIGHT: mover_corpo(0.25)\n            KEY_E: pedir_centro()\n            KEY_R: get_parent().restaurar_tudo()\n            _: return\n        get_viewport().set_input_as_handled()\n\nfunc _input(event: InputEvent) -> void:\n    if event is InputEventKey and event.pressed and not event.echo and event.keycode == KEY_ESCAPE:\n        var foco := get_viewport().gui_get_focus_owner()\n        if foco != null:\n            foco.release_focus()\n        get_viewport().set_input_as_handled()\n\nfunc _physics_process(_delta: float) -> void:\n    if deslocamento_pendente != 0.0:\n        corpo.position.x = clampf(corpo.position.x + deslocamento_pendente, -7.0, -1.0)\n        deslocamento_pendente = 0.0\n    raio.target_position = Vector3(0, 0, -alcance) # coordenadas LOCAIS do RayCast\n    raio.collision_mask = mascara\n    raio.collide_with_areas = incluir_areas\n    raio.collide_with_bodies = incluir_corpos\n    raio.force_raycast_update() # parâmetros alteráveis; leitura imediata neste tick\n    previa = \"Sem colisão na mira\"\n    if raio.is_colliding():\n        previa = \"Mira: %s; distância %.2f u\" % [(raio.get_collider() as Node).name, camera.global_position.distance_to(raio.get_collision_point())]\n    if not pedido:\n        return\n    pedido = false\n    var resultado: Dictionary = {}\n    if acionar:\n        if raio.is_colliding():\n            resultado = {\"position\": raio.get_collision_point(), \"normal\": raio.get_collision_normal(), \"collider\": raio.get_collider()}\n    else:\n        # Não consulte direct_space_state dentro de _input: o espaço pode estar bloqueado.\n        var origem := camera.project_ray_origin(pixel)\n        var fim := origem + camera.project_ray_normal(pixel) * alcance\n        var query := PhysicsRayQueryParameters3D.create(origem, fim, mascara, [corpo.get_rid()])\n        query.collide_with_areas = incluir_areas\n        query.collide_with_bodies = incluir_corpos\n        resultado = get_world_3d().direct_space_state.intersect_ray(query)\n    registrar(resultado, acionar)\n    acionar = false\n\nfunc registrar(resultado: Dictionary, tentar_acao: bool) -> void:\n    if resultado.is_empty():\n        marcador.visible = false\n        ultimo = \"Sem resultado; nenhum ponto válido selecionado\"\n        return # Vector3.ZERO poderia ser um ponto válido; não é sentinela.\n    var ponto: Vector3 = resultado[\"position\"]\n    var normal: Vector3 = resultado[\"normal\"]\n    var objeto: Object = resultado[\"collider\"]\n    marcador.visible = true\n    marcador.global_position = ponto\n    marcador.get_child(0).visible = normal.length_squared() > 0.000001\n    if normal.length_squared() > 0.000001:\n        # A haste do marcador aponta em -Z local. Normal paralela a UP precisa de outro up.\n        var cima := Vector3.RIGHT if absf(normal.normalized().dot(Vector3.UP)) > 0.99 else Vector3.UP\n        marcador.look_at(ponto + normal, cima)\n    ultimo = \"%s; ponto=%s; normal=%s\" % [objeto.get(\"name\"), ponto, normal]\n    if tentar_acao:\n        if is_instance_valid(objeto) and objeto.has_method(\"interagir\"):\n            objeto.call(\"interagir\")\n            ultimo += \"; mecanismo acionado uma vez\"\n        else:\n            ultimo += \"; primeiro objeto não é interagível\"\n",
      "pros": "Acerto/ausência explícitos, oclusão preservada, filtro de tipos e recuperação de foco.",
      "cons": "Sem fila de cliques, dano, partículas ou click-to-move. Integração e execução na Godot ainda precisam ser homologadas."
    },
    {
      "title": "2. Sensor de entrada e saída",
      "whenToUse": "No Sensor da oficina, ligado ao CorpoEnsaio.",
      "description": "sensor.gd acompanha apenas o corpo referenciado e separa sinais de transição da lista de sobreposição. Reconfigurar o ensaio zera a contagem e espera três ticks de linha de base; não tenta simular um trajeto durante essa janela.",
      "code": "extends Area3D\n@export var corpo: PhysicsBody3D\nvar entradas := 0\nvar saidas := 0\nvar estabilizar := 3\nvar ultimo := \"Aguardando física\"\n\nfunc _ready() -> void:\n    body_entered.connect(ao_entrar)\n    body_exited.connect(ao_sair)\n\nfunc reiniciar_contagem() -> void:\n    entradas = 0\n    saidas = 0\n    estabilizar = 3\n    ultimo = \"Nova linha de base; aguarde física\"\n\nfunc _physics_process(_delta: float) -> void:\n    if estabilizar > 0:\n        estabilizar -= 1\n        if estabilizar == 0:\n            ultimo = \"Pronto; mova o corpo por comando\"\n\nfunc ao_entrar(body: Node3D) -> void:\n    if estabilizar == 0 and body == corpo:\n        entradas += 1\n        ultimo = \"body_entered\"\n\nfunc ao_sair(body: Node3D) -> void:\n    if estabilizar == 0 and body == corpo:\n        saidas += 1\n        ultimo = \"body_exited\"\n\nfunc detectado() -> bool:\n    # A lista é atualizada pelo passo físico, não imediatamente após mover.\n    return monitoring and corpo in get_overlapping_bodies()\n",
      "pros": "Evita somar entrada a cada frame e explicita o atraso da atualização física.",
      "cons": "Linha de base é uma política da bancada, não garantia universal de sincronização do motor. Testar cena e transições reais."
    },
    {
      "title": "3. Contrato do mecanismo",
      "whenToUse": "No Mecanismo (Area3D) desta prática.",
      "description": "mecanismo.gd implementa a ação chamada somente após um primeiro resultado compatível. Contar acionamentos é o efeito didático; não há porta animada ou dano oculto.",
      "code": "extends Area3D\nvar acionamentos := 0\n\nfunc interagir() -> void:\n    acionamentos += 1\n\nfunc restaurar() -> void:\n    acionamentos = 0\n",
      "pros": "Contrato mínimo verificável, sem confundir detecção com ação automática.",
      "cons": "Um jogo real precisa validar autorização, estado, alcance e consequências da interação."
    },
    {
      "title": "4. Configuração e dependências",
      "language": "text",
      "whenToUse": "Antes de copiar código ou comparar o apoio com o Canvas.",
      "description": "Referência textual com árvore runtime, bits, formas, dimensões, comandos e limites. Não é GDScript.",
      "code": "Godot 4.5 / GDScript / Compatibility / desktop. Convenção: 1 u = 1 m.\nAbra project.godot e execute oficina.tscn. oficina.gd constrói em runtime:\nOficina (Node3D / oficina.gd)\n  Piso (StaticBody3D; camada 4 = bit8; topo Y0)\n  Parede (StaticBody3D; camada 1 = bit1; centro0,3,3; tamanho3,6,0.2)\n  CorpoEnsaio (AnimatableBody3D; camada2 = bit2; esfera0.3; início−7,0.5,0)\n  Sensor (Area3D / sensor.gd; esfera1.5; centro−4,0.5,0; layer0/mask2)\n  Mecanismo (Area3D / mecanismo.gd; esfera0.7; centro0,1,0; layer4/mask0)\n  Consultas (Node3D / consultas.gd)\n    Camera3D (0,10,14; atual; olha para Mecanismo)\n      Mira (RayCast3D; target_position0,0,−alcance; consulta áreas/corpos)\n    Marcador (Node3D; haste aponta−Z; somente visual)\n  Luz / Ambiente / CanvasLayer (interface)\nEscala1 em nós/ancestrais. Mesh visual e forma física são objetos distintos.\nMáscaras são bits: camada1=1, camada2=2, camada3=4, camada4=8.\nMáscara13=1+4+8;12=4+8;4=só mecanismo;8=só piso. Não são números de camada.\nPiso/parede/mecanismo têm mask0; a consulta usa a própria mask contra o layer deles.\nSensor body_entered/body_exited filtram CorpoEnsaio; monitoring=true e mask2.\nmonitorable é sobre outras áreas detectarem esta; não liga a detecção de corpos.\nCorpo não tem gravidade/locomoção de jogo; deslocado por0.25u no tick, X−7..−1.\nMudar filtro/monitoring zera contagem e aguarda3 ticks de linha de base.\nA/D ou setas movem corpo por toque; E consulta/aciona primeiro objeto no centro.\nClique esquerdo não tratado pela UI seleciona no mundo; não aciona mecanismo.\nConsulta direta ocorre em _physics_process; só o último clique pendente é mantido.\nNo máximo um pedido de ação antes do próximo tick. Nenhum InputMap exigido.\nUI com foco suspende atalhos; Esc libera foco; eco/modificadores ignorados.\nR/botão restaura controles, corpo, contadores e marcador; aguarde nova física.\nRayCast e query excluem explicitamente o RID/corpo de ensaio.\nResultados vazios não são Vector3.ZERO. Coordenadas de impacto/normal são globais.\nHaste usa−Z e look_at com up alternativo para normal paralela aY; normal zero não orienta.\nPicking manual por intersect_ray não exige input_ray_pickable; picking automático tem outro contrato.\n",
      "pros": "Explicita como os quatro scripts se conectam e o que cada consulta observa.",
      "cons": "Não substitui execução no motor; o Canvas usa outra geometria e projeção."
    },
    {
      "title": "5. Montagem da oficina",
      "whenToUse": "Para reproduzir a cena, UI e ensaios.",
      "description": "oficina.gd fica na raiz, cria formas/visuais separados, injeta referências e conecta interface. Sliders/filtros têm valores restauráveis. Leitura exibe resultado de cada ensaio sem prometer equivalência com o modelo web.",
      "code": "extends Node3D\nvar consultas\nvar sensor\nvar alvo\nvar corpo: AnimatableBody3D\nvar leitura: Label\nvar painel: VBoxContainer\nvar alcance: HSlider\nvar mascara: OptionButton\nvar areas: CheckButton\nvar corpos: CheckButton\nvar monitoring: CheckButton\nvar filtro_sensor: CheckButton\n\nfunc material(cor: Color) -> StandardMaterial3D:\n    var m := StandardMaterial3D.new()\n    m.albedo_color = cor\n    return m\n\nfunc esfera(no: Node3D, raio: float, cor: Color) -> void:\n    var forma := SphereShape3D.new()\n    forma.radius = raio\n    var colisao := CollisionShape3D.new()\n    colisao.shape = forma\n    no.add_child(colisao)\n    var visual := MeshInstance3D.new()\n    var mesh := SphereMesh.new()\n    mesh.radius = raio\n    mesh.height = 2.0 * raio\n    visual.mesh = mesh\n    visual.material_override = material(cor)\n    no.add_child(visual)\n\nfunc caixa(nome: String, pos: Vector3, tamanho: Vector3, camada: int, cor: Color) -> void:\n    var b := StaticBody3D.new()\n    b.name = nome\n    b.position = pos\n    b.collision_layer = camada\n    b.collision_mask = 0\n    var c := CollisionShape3D.new()\n    var forma := BoxShape3D.new()\n    forma.size = tamanho\n    c.shape = forma\n    b.add_child(c)\n    var v := MeshInstance3D.new()\n    var mesh := BoxMesh.new()\n    mesh.size = tamanho\n    v.mesh = mesh\n    v.material_override = material(cor)\n    b.add_child(v)\n    add_child(b)\n\nfunc botao(texto: String, acao: Callable) -> void:\n    var b := Button.new()\n    b.text = texto\n    b.pressed.connect(acao)\n    painel.add_child(b)\n\nfunc chave(texto: String, acao: Callable) -> CheckButton:\n    var c := CheckButton.new()\n    c.text = texto\n    c.button_pressed = true\n    c.toggled.connect(acao)\n    painel.add_child(c)\n    return c\n\nfunc _ready() -> void:\n    caixa(\"Piso\",Vector3(0,-0.15,0),Vector3(20,0.3,20),8,Color(\"48341f\"))\n    caixa(\"Parede\",Vector3(0,3,3),Vector3(3,6,0.2),1,Color(\"8e5d34\"))\n    corpo = AnimatableBody3D.new()\n    corpo.name = \"CorpoEnsaio\"\n    corpo.sync_to_physics = false\n    corpo.collision_layer = 2\n    corpo.collision_mask = 0\n    corpo.position = Vector3(-7,0.5,0)\n    esfera(corpo,0.3,Color(\"56cfd5\"))\n    add_child(corpo)\n    sensor = Area3D.new()\n    sensor.name = \"Sensor\"\n    sensor.position = Vector3(-4,0.5,0)\n    sensor.collision_layer = 0\n    sensor.collision_mask = 2\n    esfera(sensor,1.5,Color(0.65,0.5,0.2,0.25))\n    sensor.get_child(1).material_override.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA\n    sensor.set_script(preload(\"res://sensor.gd\"))\n    sensor.corpo = corpo\n    add_child(sensor)\n    alvo = Area3D.new()\n    alvo.name = \"Mecanismo\"\n    alvo.position = Vector3(0,1,0)\n    alvo.collision_layer = 4\n    alvo.collision_mask = 0\n    esfera(alvo,0.7,Color(\"d4a359\"))\n    alvo.set_script(preload(\"res://mecanismo.gd\"))\n    add_child(alvo)\n    consultas = Node3D.new()\n    consultas.name = \"Consultas\"\n    var camera := Camera3D.new()\n    camera.name = \"Camera3D\"\n    camera.position = Vector3(0,10,14)\n    consultas.add_child(camera)\n    var raio := RayCast3D.new()\n    raio.name = \"Mira\"\n    camera.add_child(raio)\n    var marcador := Node3D.new()\n    marcador.name = \"Marcador\"\n    var haste := MeshInstance3D.new()\n    var mesh_haste := BoxMesh.new()\n    mesh_haste.size = Vector3(0.06,0.06,0.5)\n    haste.mesh = mesh_haste\n    haste.position.z = -0.25\n    haste.material_override = material(Color(\"59e0a6\"))\n    marcador.add_child(haste)\n    consultas.add_child(marcador)\n    consultas.set_script(preload(\"res://consultas.gd\"))\n    consultas.corpo = corpo\n    consultas.sensor = sensor\n    consultas.alvo = alvo\n    add_child(consultas)\n    camera.look_at(alvo.global_position,Vector3.UP)\n    camera.make_current()\n    var luz := DirectionalLight3D.new()\n    luz.rotation_degrees = Vector3(-55,-30,0)\n    add_child(luz)\n    var ambiente := WorldEnvironment.new()\n    ambiente.environment = Environment.new()\n    ambiente.environment.background_mode = Environment.BG_COLOR\n    ambiente.environment.background_color = Color(\"1b1711\")\n    ambiente.environment.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR\n    ambiente.environment.ambient_light_color = Color(\"cdbd9b\")\n    ambiente.environment.ambient_light_energy = 0.7\n    add_child(ambiente)\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var fundo := PanelContainer.new()\n    fundo.position = Vector2(12,12)\n    fundo.custom_minimum_size.x = 370\n    layer.add_child(fundo)\n    painel = VBoxContainer.new()\n    fundo.add_child(painel)\n    leitura = Label.new()\n    leitura.custom_minimum_size.x = 370\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    painel.add_child(leitura)\n    botao(\"Consultar e acionar no centro · E\",consultas.pedir_centro)\n    botao(\"Corpo −0,25 u · A\",func(): consultas.mover_corpo(-0.25))\n    botao(\"Corpo +0,25 u · D\",func(): consultas.mover_corpo(0.25))\n    var l := Label.new()\n    l.text = \"Alcance (u); clique no mundo seleciona\"\n    painel.add_child(l)\n    alcance = HSlider.new()\n    alcance.min_value = 5\n    alcance.max_value = 30\n    alcance.step = 1\n    alcance.value = 20\n    alcance.value_changed.connect(func(v): consultas.alcance=v)\n    painel.add_child(alcance)\n    mascara = OptionButton.new()\n    for texto in [\"13: parede + alvo + piso\",\"12: alvo + piso (atravessa parede)\",\"4: só alvo\",\"8: só piso\"]:\n        mascara.add_item(texto)\n    mascara.item_selected.connect(func(i): consultas.mascara=[13,12,4,8][i])\n    painel.add_child(mascara)\n    areas = chave(\"Raio consulta áreas\",func(v): consultas.incluir_areas=v)\n    corpos = chave(\"Raio consulta corpos\",func(v): consultas.incluir_corpos=v)\n    monitoring = chave(\"Sensor monitoring\",func(v):\n        sensor.set_deferred(\"monitoring\",v)\n        sensor.reiniciar_contagem())\n    filtro_sensor = chave(\"Sensor consulta camada 2\",func(v):\n        sensor.set_deferred(\"collision_mask\",2 if v else 0)\n        sensor.reiniciar_contagem())\n    botao(\"Restaurar tudo · R\",restaurar_tudo)\n\nfunc restaurar_tudo() -> void:\n    consultas.restaurar()\n    corpo.position = Vector3(-7,0.5,0)\n    sensor.set_deferred(\"monitoring\",true)\n    sensor.set_deferred(\"collision_mask\",2)\n    sensor.reiniciar_contagem()\n    alvo.restaurar()\n    alcance.set_value_no_signal(20)\n    mascara.select(0)\n    for c in [areas,corpos,monitoring,filtro_sensor]:\n        c.set_pressed_no_signal(true)\n\nfunc _process(_delta: float) -> void:\n    leitura.text = (\"SENSOR / RAIO / CLIQUE\\nCorpo X=%.2f; detectado=%s\\nEntradas%d / saídas%d; %s\\n%s\\nÚltimo: %s\\nAcionamentos%d | alcance%.0f | máscara%d\\nA/D movem só o corpo do sensor; E consulta centro.\\nClique seleciona; Esc libera foco; R restaura.\" % [\n        corpo.position.x,sensor.detectado(),sensor.entradas,sensor.saidas,sensor.ultimo,\n        consultas.previa,consultas.ultimo,alvo.acionamentos,consultas.alcance,consultas.mascara])\n",
      "pros": "Prática autocontida com nove arquivos e sem dependências externas.",
      "cons": "Interface desktop, sem medição de desempenho nem validação real de física neste ambiente."
    }
  ],
  "simulator": {
    "type": "raycast_picking_3d",
    "title": "Laboratório: sensor, primeiro impacto e ausência",
    "description": "Canvas/JS estático em seção z=0: segmento contra esfera e caixas; sensor com duas esferas coplanares. Calcula o primeiro candidato aceito pelos filtros. Não executa Godot, sinais Area3D, projeção de Camera3D, origem interna, back faces, partículas ou click-to-move. Os dois painéis são ensaios independentes.",
    "guide": [
      {
        "title": "Preveja antes de consultar",
        "text": "Ângulo 0°, alcance 8 u e máscara 13: parede a 2,6 u. Máscara 12: área alvo a 4,3 u. Com máscara 12 e áreas desligadas: piso a 7 u. Alcance 1: nenhum resultado. E guarda o ponto e tenta acionar só o mecanismo; mirar não aciona sozinho."
      },
      {
        "title": "Separe o sensor do raio",
        "text": "A/D movem o corpo de raio 0,3 u em relação ao sensor de raio 1,5 u. O modelo aceita sobreposição quando |X|≤1,8; monitoring e máscara também precisam estar ligados. Não produz contadores/sinais reais do motor nem mede oclusão do sensor."
      },
      {
        "title": "Use mouse, foco e reinício",
        "text": "Clique no painel do raio para ajustar direção a 1°; setas giram por 5°. E consulta, A/D movem corpo e R restaura, apenas com foco no desenho e sem repetição/modificadores. Há botões equivalentes. O último impacto não segue a mira; novo comando sem acerto o limpa. Controles funcionam em pausa."
      }
    ]
  },
  "quiz": {
    "question": "Um raio encontra uma parede antes do mecanismo, e uma consulta por clique pode não encontrar nada. Qual tratamento está correto?",
    "options": [
      "Respeitar o primeiro resultado aceito; acionar apenas se ele implementar a ação e tratar Dictionary vazio como ausência de acerto.",
      "Ignorar a parede depois da consulta se ela não tiver interagir e acionar o objeto atrás dela.",
      "Usar Vector3.ZERO como falha, porque nunca existe um impacto válido na origem.",
      "Ligar monitorable no sensor para fazer qualquer RayCast detectar áreas sem mudar seus filtros."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Filtros, primeiro resultado e ação têm contratos separados; ausência não é uma coordenada especial.",
      "Isso eliminaria a oclusão por uma parede consultada. Ignorá-la precisa ser uma regra explícita no filtro.",
      "A origem pode ser um ponto válido. Use o Dictionary vazio para representar ausência.",
      "monitorable não substitui collide_with_areas nem a máscara do raio."
    ],
    "explanation": "A consulta retorna o primeiro candidato aceito pelos filtros. A aplicação decide se esse resultado pode receber uma ação. Sem acerto, intersect_ray retorna Dictionary vazio; não reserve uma posição do mundo como sentinela."
  }
},

{
  "id": "3d-inter-pbr-materials",
  "area": "3d",
  "level": "intermediario",
  "levelLabel": "Intermediário",
  "title": "7. Materiais PBR: cor, reflexo e recursos",
  "subtitle": "Compare materiais sob a mesma luz e separe propriedades da superfície, emissão e compartilhamento de recursos.",
  "nodesUsed": [
    "StandardMaterial3D",
    "ORMMaterial3D",
    "MeshInstance3D",
    "ImageTexture"
  ],
  "feynman": {
    "title": "O material responde à luz; a cor sozinha não define a aparência",
    "explanation": "Um material PBR descreve como a superfície responde à iluminação. Metallic muda a distribuição entre reflexão especular e difusa; Roughness muda a nitidez dos reflexos. Albedo tem papel diferente em metal e não metal. Por isso, um dourado não vira latão convincente apenas ao escolher a cor, e uma superfície áspera continua refletindo luz. Para comparar propriedades, mantenha malha, câmera e iluminação iguais. Os valores desta aula são ilustrativos, sem calibração de materiais reais.",
    "analogies": [
      {
        "term": "Superfície e iluminação",
        "analogy": "A mesma peça muda de aparência entre uma sala escura e um estúdio. Compare os materiais sem trocar simultaneamente a luz, para saber o que causou a diferença."
      },
      {
        "term": "Nitidez do reflexo",
        "analogy": "Uma superfície mais rugosa espalha o reflexo em mais direções. Ela não vira automaticamente fosca sem reflexão, nem transparente. Roughness e transparência são controles diferentes."
      },
      {
        "term": "Recurso compartilhado",
        "analogy": "Duas peças podem apontar para a mesma receita. Alterar essa receita muda ambas. Criar uma cópia do material separa seus parâmetros; uma cópia rasa ainda pode apontar para as mesmas texturas."
      }
    ]
  },
  "howItWorks": {
    "overview": "Referência Godot 4.5. A bancada compara duas SphereMesh de uma superfície: A editável e B referência. Ambas recebem a mesma luz. Mesh desenha geometria; material modifica sua aparência, sem alterar colisão. StandardMaterial3D e ORMMaterial3D herdam BaseMaterial3D. ORMTexture3D não é uma classe da Godot: a textura empacotada é uma Texture2D, aplicada a um material adequado.",
    "anatomy": [
      {
        "prop": "Albedo, Metallic e Roughness",
        "desc": "No não metal, albedo fornece a cor difusa e há reflexão especular. No metal, ele colore principalmente o reflexo e a difusa é suprimida. Regiões homogêneas normalmente usam Metallic 0 ou 1; transições/misturas podem ter valores intermediários. Roughness não é opacidade e não mede ferrugem por si só. Iluminação e ambiente continuam necessários."
      },
      {
        "prop": "Material ativo, override e cópia",
        "desc": "material_override prevalece sobre os materiais das superfícies. O apoio usa esse caminho de forma consistente. get_active_material(0) pode retornar null ou outro tipo; a biblioteca valida antes de duplicar. Uma cópia rasa de StandardMaterial3D separa escalares, mas mantém texturas compartilhadas. Em modelos com várias superfícies, planeje o alcance da alteração."
      },
      {
        "prop": "Normal e mapas de dados",
        "desc": "Normal map modifica a normal de iluminação, não a silhueta ou a forma física. A Godot espera orientação OpenGL; UVs e tangentes coerentes são necessárias. No empacotamento ORM: R=oclusão ambiente, G=roughness, B=metallic. São dados lineares, não uma foto de albedo. O AO não é uma sombra física completa. O apoio gera mapas didáticos, sem bake real."
      },
      {
        "prop": "Emissão, iluminação e Glow",
        "desc": "Emission acrescenta contribuição emissiva à superfície. Ela não garante iluminar o piso ou outras peças: isso depende de uma técnica de iluminação/GI ou luz explícita. Glow é pós-processamento separado, desligado no apoio. Na Godot 4.5, Compatibility usa implementação simplificada e alguns parâmetros diferem dos outros renderizadores."
      },
      {
        "prop": "Overlay e parâmetros por instância",
        "desc": "material_overlay desenha uma camada adicional; não torna único o material base e pode acrescentar custo e limitações de transparência. O flash usa um único Timer reiniciável. set_instance_shader_parameter exige um ShaderMaterial com instance uniform declarado; não altera arbitrariamente o albedo de um StandardMaterial3D comum. Esse shader não é implementado nesta aula."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "materiais.gd contém as fábricas e operações principais. oficina.gd monta a bancada e seus controles em runtime. O projeto usa duas esferas de uma superfície; copiar a rotina de duplicação para outra malha exige respeitar validações e precedência. Não há vidro, refração ou shader por instância prometidos como prontos.",
    "duration": "65–90 min com comparações e repetição (estimativa)",
    "prerequisite": "Aulas 3D 1–6: malhas, recursos, câmera e diferença entre visual e física. Godot 4.5, GDScript, Compatibility, desktop. Scripts/cena revisados documentalmente, sem compilação ou execução no motor neste ambiente.",
    "objectives": [
      "Relacionar albedo, Metallic e Roughness à resposta de metal/não metal sob iluminação controlada.",
      "Modificar somente uma peça ou compartilhar deliberadamente o mesmo recurso, respeitando override e texturas.",
      "Distinguir normal/ORM, emissão e overlay, repetindo testes sem confundir aparência com geometria ou GI."
    ],
    "practice": {
      "title": "Prática guiada: a bancada de duas peças",
      "intro": "A é a esfera à esquerda; B é a referência à direita. A câmera e as peças ficam paradas. As texturas são geradas por código, sem arquivos externos. A cena não contém colisão, GI ou Glow. Emissão é ciano independente do albedo; os presets são pontos de partida ilustrativos, não materiais medidos.",
      "tree": "Oficina (Node3D / oficina.gd; montagem em runtime)\n├── A_Editavel (MeshInstance3D / SphereMesh)\n├── B_Referencia (MeshInstance3D / SphereMesh)\n├── Piso (MeshInstance3D / PlaneMesh; sem forma física)\n├── Camera3D fixa e atual\n├── DirectionalLight3D\n├── WorldEnvironment / Environment / Sky\n├── Timer único (one_shot; flash 0,35 s)\n└── CanvasLayer / Interface\n\nmateriais.gd: RefCounted com fábricas, cópia e mapas.\nUma superfície por esfera; escala 1; material_override.\nA e B iniciam com recursos diferentes e mesmos valores.",
      "download": {
        "url": "assets/aula-3d-07-materiais-pbr.zip",
        "label": "Baixar projeto de apoio: materiais PBR"
      },
      "downloadNote": "Sete arquivos locais: dois scripts, cena, projeto, configuração, leitura e roteiro. Execução na Godot pendente.",
      "steps": [
        {
          "title": "Inspecione a comparação",
          "text": "Extraia o projeto completo, importe project.godot e execute oficina.tscn. Confira a árvore Remota: A e B têm material_override próprio, Metallic 1, Roughness 0,2, cor dourada ilustrativa e emissão 0. A câmera e a luz são comuns. Observe o indicador Mesmo recurso=false.",
          "expect": "As duas peças começam com os mesmos parâmetros e recursos distintos. O resultado visual pode depender da posição no ambiente; compare a mesma propriedade e registre as condições, sem exigir igualdade de todos os pixels."
        },
        {
          "title": "Mude uma propriedade por vez",
          "text": "Altere Metallic de A entre 0 e 1 mantendo Roughness 0,2 e a mesma iluminação. Depois mantenha Metallic 1 e compare Roughness 0,2 e 0,8. Mude o azimute da luz para observar o reflexo; não altere cor/luz/rugosidade ao mesmo tempo na primeira comparação.",
          "expect": "Metallic muda a divisão difusa/especular e a cor do reflexo. Roughness altera sua distribuição, sem tornar o material transparente. Não há limiar físico em 0,5 nem aparência garantida para qualquer iluminação."
        },
        {
          "title": "Compartilhe e descompartilhe conscientemente",
          "text": "Ative A e B compartilham recurso e altere um escalar ou a cor de A. Depois desative: A recebe uma cópia rasa e B volta à base. A rotina valida o material ativo e atribui a cópia em material_override, sem esconder uma alteração de slot sob um override anterior.",
          "expect": "Compartilhar muda ambas porque é a mesma referência. Descompartilhar preserva os parâmetros de A e reinstala B como referência. Texturas da cópia podem continuar compartilhadas; nesta prática elas não são editadas."
        },
        {
          "title": "Leia normal e canais ORM como dados",
          "text": "Ative a normal procedural e compare iluminação versus contorno da esfera. Ative o mapa empacotado: R contém AO didático, G varia roughness e B separa regiões metálicas/não metálicas. No Standard, a mesma Texture2D é ligada aos três campos com os canais corretos. A função exemplo_orm mostra a alternativa ORMMaterial3D fora da UI.",
          "expect": "Normal não altera silhueta/colisão. Roughness e Metallic finais dos mapas são multiplicados pelos escalares: roughness 0,2 com G=0,5 resulta em 0,1. Colocar escalar 0 anula o respectivo mapa. O AO gerado não é oclusão calculada da cena."
        },
        {
          "title": "Isole emissão da iluminação recebida",
          "text": "Desative mapas para simplificar. Desligue luz direta e ambiente/reflexos do céu. Com emissão 0, não há fonte de iluminação nas peças; depois eleve a emissão ciano de A. Reative as fontes separadamente. No Canvas não existe céu: o controle de luz direta basta para isolar a emissão.",
          "expect": "A contribuição emissiva existe sem luz recebida. O piso não deve passar a receber iluminação só por mudar o material nesta cena sem GI; não há halo de Glow habilitado. Mudar o albedo não muda a cor emissiva ciano escolhida nesta prática."
        },
        {
          "title": "Repita o flash sem corrida entre timers",
          "text": "Restaure, pressione F ou o botão de flash e repita antes de 0,35 s. Um único Timer é reiniciado. Faça isso também com o recurso base compartilhado: o overlay fica na instância A. Pressione R durante o flash e espere mais de 0,35 s.",
          "expect": "Uma chamada anterior não deve apagar o flash novo antes do prazo reiniciado. R cancela o timer, remove o overlay e restaura materiais/controles/luzes. O overlay não altera os valores base nem deve aparecer em B só porque o material base é compartilhado."
        },
        {
          "title": "Preveja, confira e registre limites",
          "text": "No navegador, compare A/B, escolha os presets 1/2/3 e use Q/E para variar Roughness por 0,05, L para luz e R para restaurar, com foco no desenho. A emissão usa cor ciano fixa. Em M=0, o F0 do modelo é (0,04,0,04,0,04); em M=1, é a base linear. Compare com a telemetria antes de julgar a imagem.",
          "expect": "O Canvas calcula um shader próprio de luz direta; não executa StandardMaterial3D. Roughness efetiva é limitada a 0,08 nesse cálculo para evitar singularidade. Normal/ORM, céu, GI, transparência, overlay e Glow só são discutidos/testados no apoio ou como limite; não são efeitos escondidos do laboratório."
        }
      ]
    },
    "checks": [
      {
        "question": "Metallic 1 e cor dourada garantem latão realista em qualquer cena?",
        "answer": "Não. São parâmetros de superfície; iluminação, reflexos, geometria, exposição e calibração também importam. Os valores desta aula são ilustrativos, sem medição de um material real."
      },
      {
        "question": "Por que duas peças mudam juntas ao editar um material?",
        "answer": "Elas podem apontar para o mesmo Resource. Duplicar o material e atribuir a cópia ao caminho ativo separa parâmetros; uma cópia rasa ainda compartilha sub-recursos como texturas."
      },
      {
        "question": "Normal map e emissão substituem geometria e iluminação da cena?",
        "answer": "Não. Normal altera orientação usada na iluminação sem mudar silhueta/colisão. Emissão acrescenta radiância da superfície, mas iluminar outras superfícies depende de GI/luz explícita; Glow é outro efeito."
      },
      {
        "question": "Como ler um ORM sem confundir cor com dados?",
        "answer": "R é AO, G é Roughness e B é Metallic. O mapa é dado linear; não deve receber a interpretação sRGB de albedo. Confira canais e multiplicadores. Na Godot, ORMMaterial3D usa orm_texture; Standard pode selecionar canais em campos separados."
      }
    ],
    "pitfalls": [
      {
        "title": "Mudei a superfície, mas nada aconteceu",
        "text": "Confira material_override, que prevalece sobre os slots. get_active_material pode não ser StandardMaterial3D. A biblioteca valida e reatribui a cópia em override para a esfera de uma superfície."
      },
      {
        "title": "Só queria mudar A e B também mudou",
        "text": "Confira identidade dos Resources e o modo de compartilhamento. Não basta trocar cor por código; separar a referência é a decisão relevante. Duplicar o material não garante duplicar suas texturas."
      },
      {
        "title": "O metal ficou escuro",
        "text": "Confira luz direta e ambiente/reflexos. Sem iluminação para refletir, um metal sem emissão pode ficar escuro. No Canvas só existe luz direta; não há cenário refletido ou céu para preencher a aparência."
      },
      {
        "title": "O normal map está invertido ou muda pouco",
        "text": "Confira formato OpenGL, orientação Y, UV/tangentes, normal_enabled e normal_scale. O mapa procedural do apoio é uma demonstração, sem relevo geométrico ou custo zero garantido."
      },
      {
        "title": "A peça emite, mas o piso não fica iluminado",
        "text": "Esse é o limite esperado do apoio sem GI. Material emissivo, luz explícita e Glow são recursos diferentes. A disponibilidade e os controles dos efeitos dependem do renderizador/versão."
      }
    ],
    "summary": "Compare a resposta da superfície sob condições controladas. Albedo, Metallic e Roughness se combinam com a iluminação; recursos compartilhados se alteram juntos. Normal e ORM são dados de superfície, emissão não garante GI e overlay não torna o material base único.",
    "next": "Na aula 3D 8, aprofunde luzes e WorldEnvironment. A bancada desta aula usa uma luz e céu controláveis; não valida automaticamente Glow, neblina volumétrica ou iluminação global.",
    "sources": [
      {
        "label": "StandardMaterial3D e ORMMaterial3D",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/standard_material_3d.html"
      },
      {
        "label": "BaseMaterial3D 4.5",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_basematerial3d.html"
      },
      {
        "label": "ORMMaterial3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_ormmaterial3d.html"
      },
      {
        "label": "GeometryInstance3D: override, overlay e instance uniform",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_geometryinstance3d.html"
      },
      {
        "label": "Environment: luz e pós-processamento",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_environment.html"
      },
      {
        "label": "Filament: referência do modelo de reflexão",
        "url": "https://google.github.io/filament/main/filament.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Materiais, cópia e mapas",
      "whenToUse": "Como biblioteca RefCounted chamada pela oficina, ou respeitando as mesmas pré-condições.",
      "description": "materiais.gd cria StandardMaterial3D, valida e duplica o material ativo e gera normal/ORM em runtime. tornar_unico assume uma malha de uma superfície e usa material_override. Texturas da cópia rasa permanecem compartilhadas, sem edição nesta prática. exemplo_orm é uma alternativa de estudo, não usada automaticamente pela UI.",
      "code": "extends RefCounted\n## Cores e números ilustrativos, não medições de materiais reais.\nstatic func base() -> StandardMaterial3D:\n    var m := StandardMaterial3D.new()\n    m.albedo_color = Color(\"d4a359\")\n    m.metallic = 1.0\n    m.roughness = 0.2\n    m.metallic_specular = 0.5\n    m.emission_enabled = true\n    m.emission = Color(\"5ce1e6\")\n    m.emission_energy_multiplier = 0.0\n    return m\n\nstatic func tornar_unico(peca: MeshInstance3D) -> StandardMaterial3D:\n    # Prática com UMA superfície. material_override tem precedência sobre slots.\n    if peca.mesh == null or peca.mesh.get_surface_count() == 0:\n        push_error(\"Malha sem superfície\")\n        return null\n    var original := peca.get_active_material(0) as StandardMaterial3D\n    if original == null:\n        push_error(\"Esta prática exige StandardMaterial3D\")\n        return null\n    var copia := original.duplicate() as StandardMaterial3D\n    peca.material_override = copia\n    # Cópia rasa: texturas permanecem compartilhadas; aqui elas não são editadas.\n    return copia\n\nstatic func mapa_normal() -> ImageTexture:\n    var image := Image.create(64,64,false,Image.FORMAT_RGBA8)\n    for y in range(64):\n        for x in range(64):\n            var n := Vector3(-0.5 * cos(TAU * 8.0 * x / 64.0),0,1).normalized()\n            image.set_pixel(x,y,Color(n.x * 0.5 + 0.5,n.y * 0.5 + 0.5,n.z * 0.5 + 0.5,1))\n    return ImageTexture.create_from_image(image)\n\nstatic func mapa_orm() -> ImageTexture:\n    # Dados lineares didáticos: R=AO, G=roughness, B=metallic. Não é bake real.\n    var image := Image.create(64,64,false,Image.FORMAT_RGBA8)\n    for y in range(64):\n        for x in range(64):\n            image.set_pixel(x,y,Color(0.6 + 0.4 * x / 63.0,0.25 + 0.5 * y / 63.0,1.0 if x < 32 else 0.0,1))\n    return ImageTexture.create_from_image(image)\n\nstatic func aplicar_mapas(m: StandardMaterial3D, normal: Texture2D, orm: Texture2D, usar_normal: bool, usar_orm: bool) -> void:\n    m.normal_enabled = usar_normal\n    m.normal_texture = normal if usar_normal else null\n    m.ao_enabled = usar_orm\n    m.ao_texture = orm if usar_orm else null\n    m.ao_texture_channel = BaseMaterial3D.TEXTURE_CHANNEL_RED\n    m.roughness_texture = orm if usar_orm else null\n    m.roughness_texture_channel = BaseMaterial3D.TEXTURE_CHANNEL_GREEN\n    m.metallic_texture = orm if usar_orm else null\n    m.metallic_texture_channel = BaseMaterial3D.TEXTURE_CHANNEL_BLUE\n\nstatic func exemplo_orm() -> ORMMaterial3D:\n    # Alternativa ao Standard, para estudar fora da UI; não aplicada automaticamente.\n    var m := ORMMaterial3D.new()\n    m.orm_texture = mapa_orm()\n    m.ao_enabled = true\n    m.metallic = 1.0\n    m.roughness = 1.0\n    return m\n",
      "pros": "Tipos, precedência, canais e escopo da cópia explícitos, sem assets externos.",
      "cons": "Mapas e cores ilustrativos, sem bake/calibração real; execução no motor pendente."
    },
    {
      "title": "2. Configuração da comparação",
      "language": "text",
      "whenToUse": "Antes de copiar o código ou interpretar os números/imagens.",
      "description": "Referência textual com hierarquia runtime, valores, fontes de luz, canais, compartilhamento e controles.",
      "code": "Godot 4.5 / GDScript / Compatibility / desktop1440×960.\nOficina (Node3D / oficina.gd): cria a bancada em runtime.\n  A_Editavel / B_Referencia (MeshInstance3D / SphereMesh, uma superfície cada)\n  Piso (MeshInstance3D / PlaneMesh; sem forma física)\n  Camera3D fixa/atual; DirectionalLight3D; WorldEnvironment com Sky\n  Timer único one_shot0,35s; CanvasLayer com UI\nmateriais.gd é RefCounted com fábricas, cópia e texturas geradas em runtime.\nTodos os nós mantêm escala1. Alterar material não altera malha/colisão.\nA inicia com albedo#d4a359, metallic1, roughness0,2, specular0,5 e emissão0.\nB começa com outro recurso, mesmos valores. A é esquerda; B é direita.\nCompartilhar: B recebe a mesma referência de A. Editar A altera ambas.\nDescompartilhar: A recebe cópia rasa; B volta ao material base. Texturas permanecem compartilhadas, não editadas.\nmaterial_override é usado de forma consistente. Ele tem precedência sobre slots de superfície.\nNormal gerada64×64: vetor tangent-space codificado0..1, estilo OpenGL; sem alterar silhueta.\nMapa empacotado64×64: R AO0,6..1; G roughness0,25..0,75; B metallic1 à esquerda/0 à direita.\nDados ilustrativos, não bake de oclusão nem caracterização real de material.\nNo Standard: AO lêR, roughness lêG, metallic lêB da mesma Texture2D; escalares multiplicam G/B.\nexemplo_orm() retorna ORMMaterial3D com orm_texture; alternativa de estudo fora da UI.\nTexturas são dados lineares; não trate normal/ORM como foto de albedo sRGB.\nEmissão ciano#5ce1e6 independente do albedo; sem GI para iluminar outras superfícies.\nLuz direta e ambiente/reflexos do céu têm controles independentes. Fundo permanece cor escura.\nGlow desligado. Godot4.5 Compatibility tem implementação simplificada de Glow, fora do ensaio.\nFlash usa overlay alfa/unshaded, timer único reiniciável; não altera o recurso base.\nF repete flash; R restaura materiais/controles/luzes/flash. Nenhum InputMap exigido.\nEsc libera foco; UI em foco suspende F/R; eco/modificadores são ignorados.\nNão há vidro/refracção, efeitos por instance uniform ou performance medida nesta bancada.\n",
      "pros": "Define as condições de comparação e o que o projeto implementa.",
      "cons": "Não transforma o modelo Canvas no renderer da Godot nem comprova execução."
    },
    {
      "title": "3. Oficina, recursos e flash reiniciável",
      "whenToUse": "Para reproduzir a bancada com duas peças e controles.",
      "description": "oficina.gd fica na raiz, cria geometria/iluminação/UI e controla referências. Flash é overlay só em A com um Timer único reiniciável. R interrompe o efeito e restaura tudo. F/R são suspensos com UI em foco; Esc libera.",
      "code": "extends Node3D\nconst MATERIAIS = preload(\"res://materiais.gd\")\nvar a: MeshInstance3D\nvar b: MeshInstance3D\nvar mat_a: StandardMaterial3D\nvar mat_b: StandardMaterial3D\nvar normal: Texture2D\nvar orm: Texture2D\nvar luz: DirectionalLight3D\nvar ambiente: Environment\nvar painel: VBoxContainer\nvar leitura: Label\nvar metallic: HSlider\nvar roughness: HSlider\nvar emission: HSlider\nvar angulo: HSlider\nvar cor: OptionButton\nvar compartilhar: CheckButton\nvar usar_normal: CheckButton\nvar usar_orm: CheckButton\nvar luz_direta: CheckButton\nvar usar_ceu: CheckButton\nvar timer: Timer\nvar flash: StandardMaterial3D\nvar overlay_anterior: Material\nvar piscando := false\n\nfunc esfera(nome: String, x: float) -> MeshInstance3D:\n    var p := MeshInstance3D.new()\n    p.name = nome\n    var mesh := SphereMesh.new()\n    mesh.radius = 1.0\n    mesh.height = 2.0\n    p.mesh = mesh\n    p.position = Vector3(x,1,0)\n    add_child(p)\n    return p\n\nfunc botao(texto: String, acao: Callable) -> void:\n    var btn := Button.new()\n    btn.text = texto\n    btn.pressed.connect(acao)\n    painel.add_child(btn)\n\nfunc deslizador(texto: String, minimo: float, maximo: float, passo: float, valor: float, acao: Callable) -> HSlider:\n    var l := Label.new()\n    l.text = texto\n    painel.add_child(l)\n    var s := HSlider.new()\n    s.min_value=minimo\n    s.max_value=maximo\n    s.step=passo\n    s.value=valor\n    s.value_changed.connect(acao)\n    painel.add_child(s)\n    return s\n\nfunc chave(texto: String, valor: bool, acao: Callable) -> CheckButton:\n    var c := CheckButton.new()\n    c.text=texto\n    c.button_pressed=valor\n    c.toggled.connect(acao)\n    painel.add_child(c)\n    return c\n\nfunc _ready() -> void:\n    a=esfera(\"A_Editavel\",-1.5)\n    b=esfera(\"B_Referencia\",1.5)\n    mat_a=MATERIAIS.base()\n    mat_b=MATERIAIS.base()\n    a.material_override=mat_a\n    b.material_override=mat_b\n    normal=MATERIAIS.mapa_normal()\n    orm=MATERIAIS.mapa_orm()\n    var piso := MeshInstance3D.new()\n    var plane := PlaneMesh.new()\n    plane.size=Vector2(12,12)\n    piso.mesh=plane\n    var material_piso := StandardMaterial3D.new()\n    material_piso.albedo_color=Color(\"413526\")\n    material_piso.roughness=0.9\n    piso.material_override=material_piso\n    add_child(piso)\n    var camera := Camera3D.new()\n    camera.position=Vector3(0,3.2,8.5)\n    add_child(camera)\n    camera.look_at(Vector3(0,1,0),Vector3.UP)\n    camera.make_current()\n    luz=DirectionalLight3D.new()\n    luz.light_energy=3\n    luz.rotation_degrees=Vector3(-40,-35,0)\n    add_child(luz)\n    ambiente=Environment.new()\n    ambiente.background_mode=Environment.BG_COLOR\n    ambiente.background_color=Color(\"1d1812\")\n    var ceu := Sky.new()\n    var ceu_mat := ProceduralSkyMaterial.new()\n    ceu_mat.sky_top_color=Color(\"8b9aa9\")\n    ceu_mat.sky_horizon_color=Color(\"ddd1b8\")\n    ceu_mat.ground_bottom_color=Color(\"3b2c1b\")\n    ceu.sky_material=ceu_mat\n    ambiente.sky=ceu\n    ambiente.glow_enabled=false\n    definir_ceu(true)\n    var world := WorldEnvironment.new()\n    world.environment=ambiente\n    add_child(world)\n    flash=StandardMaterial3D.new()\n    flash.shading_mode=BaseMaterial3D.SHADING_MODE_UNSHADED\n    flash.transparency=BaseMaterial3D.TRANSPARENCY_ALPHA\n    flash.albedo_color=Color(1,0.85,0.35,0.35)\n    timer=Timer.new()\n    timer.one_shot=true\n    timer.wait_time=0.35\n    timer.timeout.connect(encerrar_flash)\n    add_child(timer)\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var fundo := PanelContainer.new()\n    fundo.position=Vector2(12,12)\n    fundo.custom_minimum_size.x=360\n    layer.add_child(fundo)\n    painel=VBoxContainer.new()\n    fundo.add_child(painel)\n    leitura=Label.new()\n    leitura.custom_minimum_size.x=360\n    leitura.autowrap_mode=TextServer.AUTOWRAP_WORD_SMART\n    painel.add_child(leitura)\n    metallic=deslizador(\"Metallic de A\",0,1,0.05,1,func(v): mat_a.metallic=v)\n    roughness=deslizador(\"Roughness de A\",0,1,0.05,0.2,func(v): mat_a.roughness=v)\n    emission=deslizador(\"Emissão ciano de A\",0,3,0.25,0,func(v): mat_a.emission_energy_multiplier=v)\n    angulo=deslizador(\"Yaw da luz direta\",-75,75,5,-35,func(v): luz.rotation_degrees.y=v)\n    cor=OptionButton.new()\n    for nome in [\"Dourado ilustrativo\",\"Cobre ilustrativo\",\"Revestimento ciano\"]:\n        cor.add_item(nome)\n    cor.item_selected.connect(func(i): mat_a.albedo_color=Color([\"d4a359\",\"c86438\",\"5ce1e6\"][i]))\n    painel.add_child(cor)\n    compartilhar=chave(\"A e B compartilham recurso\",false,definir_compartilhamento)\n    usar_normal=chave(\"Normal procedural (não muda silhueta)\",false,func(_v): atualizar_mapas())\n    usar_orm=chave(\"Mapa empacotado R/G/B didático\",false,func(_v): atualizar_mapas())\n    luz_direta=chave(\"Luz direta\",true,func(v): luz.visible=v)\n    usar_ceu=chave(\"Luz ambiente e reflexos do céu\",true,definir_ceu)\n    botao(\"Flash em A · F (repete/reinicia0,35s)\",piscar)\n    botao(\"Restaurar tudo · R\",restaurar)\n\nfunc atualizar_mapas() -> void:\n    MATERIAIS.aplicar_mapas(mat_a,normal,orm,usar_normal.button_pressed,usar_orm.button_pressed)\n\nfunc definir_ceu(ativo: bool) -> void:\n    ambiente.ambient_light_source=Environment.AMBIENT_SOURCE_SKY if ativo else Environment.AMBIENT_SOURCE_DISABLED\n    ambiente.reflected_light_source=Environment.REFLECTION_SOURCE_SKY if ativo else Environment.REFLECTION_SOURCE_DISABLED\n\nfunc definir_compartilhamento(ativo: bool) -> void:\n    if ativo:\n        mat_b=mat_a\n    else:\n        mat_a=MATERIAIS.tornar_unico(a)\n        mat_b=MATERIAIS.base()\n    a.material_override=mat_a\n    b.material_override=mat_b\n\nfunc piscar() -> void:\n    if not piscando:\n        overlay_anterior=a.material_overlay\n    piscando=true\n    a.material_overlay=flash\n    timer.start() # um único timer; repetição prorroga em vez de criar corridas de awaits\n\nfunc encerrar_flash() -> void:\n    a.material_overlay=overlay_anterior\n    overlay_anterior=null\n    piscando=false\n\nfunc restaurar() -> void:\n    timer.stop()\n    encerrar_flash()\n    mat_a=MATERIAIS.base()\n    mat_b=MATERIAIS.base()\n    a.material_override=mat_a\n    b.material_override=mat_b\n    metallic.set_value_no_signal(1)\n    roughness.set_value_no_signal(0.2)\n    emission.set_value_no_signal(0)\n    angulo.set_value_no_signal(-35)\n    cor.select(0)\n    compartilhar.set_pressed_no_signal(false)\n    usar_normal.set_pressed_no_signal(false)\n    usar_orm.set_pressed_no_signal(false)\n    luz_direta.set_pressed_no_signal(true)\n    usar_ceu.set_pressed_no_signal(true)\n    luz.visible=true\n    luz.rotation_degrees.y=-35\n    definir_ceu(true)\n\nfunc _input(event: InputEvent) -> void:\n    if event is InputEventKey and event.pressed and not event.echo and event.keycode==KEY_ESCAPE:\n        var foco:=get_viewport().gui_get_focus_owner()\n        if foco!=null:\n            foco.release_focus()\n        get_viewport().set_input_as_handled()\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo:\n        return\n    if event.ctrl_pressed or event.alt_pressed or event.meta_pressed or get_viewport().gui_get_focus_owner()!=null:\n        return\n    if event.physical_keycode==KEY_F:\n        piscar()\n    elif event.physical_keycode==KEY_R:\n        restaurar()\n    else:\n        return\n    get_viewport().set_input_as_handled()\n\nfunc _process(_delta: float) -> void:\n    leitura.text=(\"A editável (esquerda) / B referência (direita)\\nMesmo recurso: %s | A M%.2f R%.2f E%.2f\\nB M%.2f R%.2f E%.2f | flash %s\\nEmissão não ilumina piso nesta cena sem GI.\\nMapas multiplicam escalares; UVs da esfera.\\nSem transparência de vidro ou Glow.\" % [\n        mat_a==mat_b,mat_a.metallic,mat_a.roughness,mat_a.emission_energy_multiplier,\n        mat_b.metallic,mat_b.roughness,mat_b.emission_energy_multiplier,piscando])\n",
      "pros": "Comparações repetíveis, referência independente/compartilhada e timer sem awaits concorrentes.",
      "cons": "Sem vidro/refração, GI/Glow, controlador de jogo ou medição de performance. Cena/UI ainda precisam ser conferidas na Godot."
    }
  ],
  "simulator": {
    "type": "pbr_material_3d",
    "title": "Laboratório: duas superfícies sob a mesma luz",
    "description": "Rasterizador Canvas/JS próprio, com esfera ortográfica, luz direcional branca, reflexão Cook–Torrance/GGX, Smith separável, Fresnel Schlick e difusa Lambert ponderada. Cálculo em RGB linear, exibição com mapeamento L/(1+L) e sRGB. Não usa Godot/WebGL, céu/IBL, GI, normal/ORM maps, transparência, overlay ou Glow. Roughness é regularizada em pelo menos 0,08.",
    "guide": [
      {
        "title": "Compare A com B",
        "text": "B começa como referência M1/R0,20/E0/dourado. Ajuste um parâmetro de A e compare com a mesma luz. O modo Mesmos parâmetros de A representa compartilhamento lógico; não cria Resources reais. Presets alteram só o material, mantendo luz e modo."
      },
      {
        "title": "Isole emissão",
        "text": "Desligue a luz com L ou pelo controle e mantenha emissão 0: a esfera não tem iluminação recebida. Eleve emissão ciano de A; ela reaparece sem halo e sem iluminar B. Mudar albedo não altera a cor emissiva escolhida. Restaure antes de comparar rugosidade."
      },
      {
        "title": "Preveja os limites",
        "text": "F0 do modelo: M0 → (0,04,0,04,0,04); M1 → cor base linear. Q/E mudam Roughness por 0,05, 1/2/3 aplicam presets e R restaura tudo, só com foco no desenho. Há controles equivalentes; sem repetição/modificadores. O modelo é estático e aceita ajustes em pausa."
      }
    ]
  },
  "quiz": {
    "question": "Ao alterar o albedo de um StandardMaterial3D compartilhado, A e B mudam juntas. Para modificar só A nesta bancada de uma superfície, qual procedimento é coerente?",
    "options": [
      "Validar e duplicar o material ativo, atribuir a cópia ao material_override de A e então editar seus parâmetros; texturas da cópia rasa ainda podem ser compartilhadas.",
      "Usar set_instance_shader_parameter para mudar qualquer propriedade de StandardMaterial3D, sem ShaderMaterial ou declaração instance uniform.",
      "Aplicar material_overlay para tornar automaticamente único o Resource do material base.",
      "Aumentar emission para que a cópia do material e a iluminação do piso ocorram automaticamente."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Separar a referência e atribuí-la ao caminho ativo isola os parâmetros; sub-recursos têm seu próprio compartilhamento.",
      "Parâmetros por instância exigem o contrato de instance uniform de um shader apropriado.",
      "Overlay acrescenta uma camada visual; não duplica nem torna único o material base.",
      "Emissão não duplica Resource e não garante iluminação de outras superfícies."
    ],
    "explanation": "A e B apontavam para o mesmo recurso. A cópia atribuída ao override de A separa seus parâmetros neste exemplo de uma superfície. É preciso considerar precedência, tipo e compartilhamento de sub-recursos."
  }
},

{
  "id": "3d-inter-lighting-environment",
  "area": "3d",
  "level": "intermediario",
  "levelLabel": "Intermediário",
  "title": "8. Iluminação 3D: luzes, ambiente e neblina",
  "subtitle": "Escolha a fonte, observe a sombra e separe preenchimento, céu e efeitos de imagem antes de combinar tudo.",
  "nodesUsed": [
    "DirectionalLight3D",
    "OmniLight3D",
    "SpotLight3D",
    "WorldEnvironment",
    "Environment",
    "Sky"
  ],
  "feynman": {
    "title": "Luz na superfície, ambiente na cena e neblina na vista",
    "explanation": "Pense em uma oficina com um holofote sobre uma peça. A fonte define de onde a luz vem; o material define sua resposta. Um obstáculo pode bloquear a luz direta e projetar sombra no piso. O preenchimento ambiente pode manter essa sombra visível sem calcular luz rebatida. Já a neblina modifica o que a câmera enxerga através do meio. Primeiro observe cada contribuição isolada. Depois combine as que ajudam a leitura da cena, sem usar efeitos para esconder uma iluminação mal compreendida.",
    "analogies": [
      {
        "term": "Três fontes",
        "analogy": "Directional representa raios paralelos; Omni espalha luz a partir de um ponto; Spot restringe a emissão a um cone. Uma lâmpada decorativa pode precisar de malha visível e de um nó de luz separados."
      },
      {
        "term": "Céu e preenchimento",
        "analogy": "Ver um cenário pela janela e receber luz dele são decisões distintas. O apoio mantém o céu visível, mas usa uma cor ambiente controlada e desliga reflexos do céu para facilitar a comparação."
      },
      {
        "term": "Ar e lente",
        "analogy": "A neblina pertence ao meio observado; Glow e tonemapping tratam a imagem. Um halo visível não prova que a peça iluminou o piso, e uma sombra mais clara não prova que houve GI."
      }
    ]
  },
  "howItWorks": {
    "overview": "Referência: Godot 4.5. Comece no Compatibility com as três luzes, sombras e neblina comum. O apoio oferece controles específicos do Forward+ quando esse método está realmente ativo. A bancada é fixa, sem GI ou colisão. Energia, abertura, alcance e câmera devem permanecer controlados para identificar a causa de cada mudança.",
    "anatomy": [
      {
        "prop": "Directional, Omni e Spot",
        "desc": "Directional usa a direção do eixo global −Z; sua posição não muda a iluminação. Omni tem origem e alcance; girá-la não muda a emissão pontual. Spot também emite por −Z. `spot_angle` é a meia abertura: 32° corresponde a um cone total de 64°. Não aumentar escala para simular alcance."
      },
      {
        "prop": "Energia, alcance e sombras",
        "desc": "Energia aumenta a contribuição; alcance limita Omni/Spot e não se aplica à Directional. A queda depende de distância/atenuação. O mesmo valor numérico não iguala a iluminância entre tipos. `shadow_enabled` habilita sombras da luz, sujeitas à geometria e configuração; não precisa de `CollisionShape3D`. Bias inadequado pode causar acne ou sombras descoladas."
      },
      {
        "prop": "WorldEnvironment → Environment",
        "desc": "O nó fornece o recurso à cena; atribuir apenas um recurso solto não o ativa. `Camera3D.environment` tem prioridade quando definido. O sol/céu de prévia do editor não garante luz na execução. O apoio cria explicitamente ambiente e fontes, e separa fundo, preenchimento por cor e reflexos."
      },
      {
        "prop": "Neblina comum e volumétrica",
        "desc": "Neblina comum pode reduzir o contraste com a distância, mas não integra feixes locais de luz no ar. Volumetric Fog é exclusiva do Forward+; depende de densidade, luz e observação. `light_volumetric_fog_energy` controla a contribuição da luz no volume. Densidade zero não deve produzir um cone luminoso fixo."
      },
      {
        "prop": "Pós-processamento e renderizador",
        "desc": "Na Godot 4.5, Glow existe nos três métodos, simplificado no Compatibility. SSAO, SSR e neblina volumétrica requerem Forward+. SSAO é aproximação em espaço de tela; Glow não ilumina vizinhos. `Environment.TONE_MAPPER_AGX` é o nome correto; Linear, ACES e AgX não garantem realismo. AgX não é adequado ao Mobile. Meça custo antes de definir qualidade."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "A primeira aba configura as fontes; a segunda monta/configura o Environment. oficina.gd cria a cena e a interface. Os scripts RefCounted são bibliotecas chamadas pelo controlador. O ciclo solar é uma extensão independente, sem promessa de noite ou cores automáticas.",
    "duration": "65–90 min com comparações e registro (estimativa)",
    "prerequisite": "Aulas 3D 1–7: eixos/transformações, malhas, câmera e materiais. Godot 4.5, GDScript, desktop; Compatibility para a base, Forward+ para a extensão volumétrica/SSAO. Projeto revisado documentalmente; execução no motor ainda pendente.",
    "objectives": [
      "Escolher Directional, Omni ou Spot e prever os efeitos de direção, alcance, energia e meia abertura.",
      "Separar luz direta, sombra, preenchimento e céu por meio de comparações com uma variável alterada.",
      "Distinguir neblina comum, volume e pós-processamento e verificar a disponibilidade real do renderizador."
    ],
    "practice": {
      "title": "Prática guiada: a oficina com três fontes",
      "intro": "Extraia o apoio completo e importe project.godot. A cena cria piso, esfera elevada, três marcadores e um emissor ciano. Camera3D é fixa; a interface tem scroll. Comece sem neblina, Glow e SSAO. Não há GI, formas físicas ou navegação. Os números de energia são ilustrativos, sem unidades fotométricas habilitadas.",
      "tree": "Oficina (Node3D / oficina.gd; montagem em runtime)\n├── Piso, Obstaculo e Marcadores (MeshInstance3D)\n├── EmissorSemGI (MeshInstance3D / material emissivo)\n├── Sol (DirectionalLight3D)\n├── Lampada (OmniLight3D; y=3)\n├── Holofote (SpotLight3D; y=3)\n├── Mundo (WorldEnvironment / Environment / Sky)\n├── Camera3D atual; sem Environment próprio\n└── CanvasLayer / ScrollContainer / Interface\n\nluzes.gd e ambiente.gd: bibliotecas RefCounted.\nciclo_sol.gd: extensão para OUTRA cena; não anexada.",
      "download": {
        "url": "assets/aula-3d-08-iluminacao-ambiente.zip",
        "label": "Baixar projeto de apoio: luzes e ambiente"
      },
      "downloadNote": "Nove arquivos locais, incluindo quatro scripts e roteiro de testes. Compatibility como base; execução e efeitos Forward+ ainda precisam de validação na Godot.",
      "steps": [
        {
          "title": "Confira a cena e as condições",
          "text": "Execute oficina.tscn e confira a árvore Remota. Restaure os parâmetros: Spot, energia 3, alcance 12, azimute 0, meia abertura 32, ambiente 0,12 e densidade zero. Leia o método atual no painel. A câmera não tem Environment próprio.",
          "expect": "Uma única fonte fica ativa. O céu visível não significa que seus reflexos estejam ligados. Glow/SSAO/volume começam desligados e a cena tem fontes próprias, independentemente da prévia do editor."
        },
        {
          "title": "Compare os três tipos",
          "text": "Alterne Spot, Omni e Directional. Para Omni, mude alcance e energia separadamente; o azimute fica indisponível. Para Directional, o alcance fica indisponível; compare orientação. Para testar posição da direcional no Inspector Remoto, evite chamar atualizar durante a comparação.",
          "expect": "Omni depende de origem e alcance, sem orientação da emissão. Directional depende da direção e não da posição. Os resultados não precisam ter o mesmo brilho ao usar light_energy igual; a distribuição é diferente."
        },
        {
          "title": "Preveja a abertura do holofote",
          "text": "Volte a Spot e compare meia abertura 10, 32 e 60 graus mantendo azimute/energia/alcance. Leia o cone total calculado pelo painel. Depois restaure e varie só o azimute. A rotina look_at orienta −Z para o alvo.",
          "expect": "As aberturas totais são 20°, 64° e 120°. Alargar não é aumentar alcance. O rótulo e o valor de `spot_angle` devem concordar; dentro do cone a intensidade também depende de queda angular e distância."
        },
        {
          "title": "Isole sombra e preenchimento",
          "text": "Mantenha a esfera entre a fonte e uma região do piso. Alterne Sombras. Reduza preenchimento a zero e depois volte a 0,12, sem alterar material/luz. No laboratório web use S e D com foco no desenho e observe a sonda em (0,0,7).",
          "expect": "A sombra bloqueia a contribuição direta, mas o ambiente permanece. Preenchimento uniforme não equivale a GI calculada nem mostra color bleeding. No Canvas, a sonda usa exatamente o mesmo cálculo do piso."
        },
        {
          "title": "Compare duas formas de neblina",
          "text": "Com densidade 0,04 observe a neblina comum na Godot. Para testar a volumétrica, selecione Forward+, reinicie conforme o editor, confirme o método atual e ative Volumetric Fog. A prática desliga a comum durante essa comparação. Repita densidade zero/0,04 e luz com energia zero/3. Para isolar a interação no volume, altere `light_volumetric_fog_energy` de 1 para 0 no Inspector Remoto sem acionar atualizar.",
          "expect": "Somente Forward+ libera o volume. Densidade zero remove o meio; energia/contribuição zero remove a parcela local dessa luz. A câmera deve observar o volume iluminado; não existe feixe garantido para qualquer pose. O Canvas demonstra apenas neblina comum em painéis independentes, sem simular esse volume."
        },
        {
          "title": "Observe efeitos com uma referência",
          "text": "Restaure, identifique o emissor ciano e alterne Glow sem mudar sua emissão. Compare Linear e ACES com exposição 1, e AgX somente onde apropriado. Em Forward+, teste SSAO separadamente. Não ative todos os efeitos de uma vez nem chame o preset de gratuito.",
          "expect": "Glow modifica a imagem ao redor de áreas claras; não acrescenta iluminação ao piso nesta cena sem GI. Tonemapping muda a apresentação dos valores. SSAO não substitui sombra nem ilumina indiretamente. O custo depende da cena, resolução, método e hardware."
        },
        {
          "title": "Repita e explique os limites",
          "text": "No Canvas use 1/2/3 para Spot/Omni/Directional, S para sombras, D para luz direta isolada e R para restaurar, apenas com foco no desenho. Densidade altera os três painéis de referência; 0 deve produzir T=1 para todos. Em 0,1 e distância 10, preveja T≈0,368. O ciclo solar opcional exige outra cena e céu configurado.",
          "expect": "Todos os controles têm alternativa visível e ajustes funcionam em pausa. O modelo não executa shaders Godot, reflexos, GI, Glow ou volume. Girar o sol procedural pode mover o disco, mas este script não anima automaticamente cores do céu, ambiente, lua ou exposição."
        }
      ]
    },
    "checks": [
      {
        "question": "Spot com spot_angle=32° tem cone total de 32°?",
        "answer": "Não. O ângulo é medido do eixo central até a borda: meia abertura de 32° corresponde a abertura total de 64°."
      },
      {
        "question": "Uma sombra mais clara prova que houve luz rebatida?",
        "answer": "Não. Pode ser apenas preenchimento ambiente. Para concluir sobre GI, isole as fontes e a técnica responsável; este apoio não calcula GI."
      },
      {
        "question": "Marcar Volumetric Fog em qualquer projeto garante um feixe?",
        "answer": "Não. Requer Forward+ ativo e condições de densidade, luz/contribuição, meio e observação. Neblina comum, um cone desenhado e Glow não são a mesma operação."
      },
      {
        "question": "Por que o editor parecia iluminado e o jogo ficou escuro?",
        "answer": "A prévia pode usar sol/céu apenas do editor. Confira fontes reais e Environment atribuído ao WorldEnvironment, além de eventual override da câmera e do método atual."
      }
    ],
    "pitfalls": [
      {
        "title": "A opção existe, mas o efeito não aparece",
        "text": "Confira o método atual, que pode diferir do pretendido após fallback. Volumetric Fog/SSAO são Forward+; densidade zero e energia/contribuição zero também mudam o resultado. Não confundir recurso indisponível com bug de material."
      },
      {
        "title": "Aumentei o brilho e a luz pareceu maior",
        "text": "Energia e alcance são parâmetros separados. A região perceptível pode mudar por exposição/limiar visual; confira os valores e mantenha a escala da cena. Directional não recebe alcance Omni/Spot."
      },
      {
        "title": "Há céu, mas a peça continua escura",
        "text": "Fundo, ambiente e reflexos são fontes separáveis. O apoio usa preenchimento por cor e desliga reflexos do céu de propósito. Confira também a fonte ativa, sua direção, material e máscara de iluminação."
      },
      {
        "title": "O ciclo virou noite, mas o céu não mudou de cor",
        "text": "ProceduralSkyMaterial tem cores configuradas. A extensão só gira a fonte e corta energia/sombra abaixo do horizonte. Uma transição completa exige animar parâmetros adicionais; não anexar o ciclo à bancada cujo controlador também orienta a luz."
      },
      {
        "title": "A sombra está manchada ou descolada",
        "text": "Confira geometria, bias/normal bias e configurações de sombra. Não adicione `CollisionShape3D` como tentativa de corrigir sombra visual. Registre renderizador, escala e condições antes de ajustar valores."
      }
    ],
    "summary": "Escolha a distribuição da fonte, depois compare energia, alcance e abertura. Isole a sombra do preenchimento ambiente; separe céu visível, reflexos, neblina e efeitos de imagem. Confirme o renderizador e altere uma variável por vez.",
    "next": "A aula 3D 9 passa à montagem modular com GridMap e Decal. Iluminação global e reflexão serão aprofundadas na 3D13; o preenchimento desta aula não deve ser apresentado como GI.",
    "sources": [
      {
        "label": "Luzes e sombras 3D — Godot 4.5",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/lights_and_shadows.html"
      },
      {
        "label": "DirectionalLight3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_directionallight3d.html"
      },
      {
        "label": "OmniLight3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_omnilight3d.html"
      },
      {
        "label": "SpotLight3D: meia abertura e eixo",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_spotlight3d.html"
      },
      {
        "label": "Environment e pós-processamento",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/environment_and_post_processing.html"
      },
      {
        "label": "Matriz de recursos dos renderizadores",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/rendering/renderers.html"
      },
      {
        "label": "Neblina volumétrica",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/volumetric_fog.html"
      },
      {
        "label": "Environment: propriedades e enumerações",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_environment.html"
      },
      {
        "label": "Light3D: contribuição no volume",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_light3d.html"
      },
      {
        "label": "RenderingServer: método atual",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_renderingserver.html"
      },
      {
        "label": "ProceduralSkyMaterial",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_proceduralskymaterial.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Configurar fontes · luzes.gd",
      "whenToUse": "Comparar fontes controladas pelo mesmo painel.",
      "description": "Biblioteca RefCounted chamada por oficina.gd, com parâmetros explícitos. Somente uma fonte visível. Energia normalizada, sem igualar iluminância entre fontes. Abertura é meia abertura.",
      "code": "extends RefCounted\n# Escala ilustrativa de energia; unidades físicas de luz desativadas no projeto.\nstatic func configurar(direcional: DirectionalLight3D, omni: OmniLight3D,\n        spot: SpotLight3D, tipo: int, energia: float, alcance: float,\n        azimute: float, meia_abertura: float, sombras: bool) -> void:\n    direcional.visible = tipo == 2\n    omni.visible = tipo == 1\n    spot.visible = tipo == 0\n    var direcao := Vector3(sin(deg_to_rad(azimute)), -0.6,\n            cos(deg_to_rad(azimute))).normalized()\n    # look_at orienta o eixo -Z para o alvo. Posição não altera luz direcional.\n    direcional.look_at(direcional.global_position + direcao, Vector3.UP)\n    spot.look_at(spot.global_position + direcao, Vector3.UP)\n    omni.omni_range = alcance\n    spot.spot_range = alcance\n    spot.spot_angle = meia_abertura # 32 graus = cone total de 64 graus.\n    omni.omni_attenuation = 1.0\n    spot.spot_attenuation = 1.0\n    spot.spot_angle_attenuation = 1.0\n    for luz: Light3D in [direcional, omni, spot]:\n        luz.light_energy = energia\n        luz.shadow_enabled = sombras\n        luz.light_volumetric_fog_energy = 1.0\n    # O mesmo light_energy não garante igual iluminância entre tipos de luz.\n",
      "pros": "Direção, alcance, abertura e sombras separados.",
      "cons": "A queda real é da Godot; números e pixels não precisam coincidir com o Canvas."
    },
    {
      "title": "2. Separar ambiente · ambiente.gd",
      "whenToUse": "Controlar fundo, preenchimento e efeitos com condições do renderizador.",
      "description": "Biblioteca: criar devolve Environment e configurar aplica parâmetros. WorldEnvironment recebe esse recurso. O céu não fornece reflexos neste apoio. Volume substitui neblina comum durante a comparação.",
      "code": "extends RefCounted\n\nstatic func criar() -> Environment:\n    var e := Environment.new()\n    e.background_mode = Environment.BG_SKY\n    var ceu := Sky.new()\n    var material := ProceduralSkyMaterial.new()\n    material.sky_top_color = Color(0.08, 0.16, 0.24)\n    material.sky_horizon_color = Color(0.45, 0.34, 0.23)\n    ceu.sky_material = material\n    e.sky = ceu\n    # Céu visível separado do preenchimento e de reflexos.\n    e.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR\n    e.ambient_light_color = Color(0.65, 0.72, 0.8)\n    e.ambient_light_sky_contribution = 0.0\n    e.reflected_light_source = Environment.REFLECTION_SOURCE_DISABLED\n    return e\n\nstatic func configurar(e: Environment, preenchimento: float,\n        densidade: float, volume: bool, glow: bool, ssao: bool,\n        tonemap: int) -> void:\n    var metodo := RenderingServer.get_current_rendering_method()\n    var forward := metodo == &\"forward_plus\"\n    e.ambient_light_energy = preenchimento\n    e.tonemap_mode = tonemap\n    e.tonemap_exposure = 1.0\n    e.glow_enabled = glow\n    e.glow_intensity = 0.8\n    e.glow_hdr_threshold = 1.0\n    e.fog_enabled = densidade > 0.0 and not (volume and forward)\n    e.fog_mode = Environment.FOG_MODE_EXPONENTIAL\n    e.fog_density = densidade\n    e.fog_light_color = Color(0.35, 0.45, 0.5)\n    e.fog_light_energy = 1.0\n    e.volumetric_fog_enabled = volume and forward\n    e.volumetric_fog_density = densidade\n    e.volumetric_fog_albedo = Color(0.9, 0.9, 0.9)\n    e.volumetric_fog_emission = Color.BLACK\n    e.ssao_enabled = ssao and forward\n    # Glow existe em Compatibility 4.5, com implementação simplificada.\n    # Volumetric Fog/SSAO não são habilitados fora do Forward+.\n",
      "pros": "Disponibilidade verificada pelo método atual.",
      "cons": "Não mede custo nem implementa presets universais de desempenho."
    },
    {
      "title": "3. Montar a bancada · oficina.gd",
      "whenToUse": "Executar o projeto completo com câmera, geometria e interface.",
      "description": "Anexado ao Node3D raiz de oficina.tscn; cria todos os nós em runtime. Controles e reset não exigem InputMap. Consulte configuração e roteiro antes de adaptar.",
      "code": "extends Node3D\nconst LUZES = preload(\"res://luzes.gd\")\nconst AMBIENTE = preload(\"res://ambiente.gd\")\nvar sol: DirectionalLight3D\nvar omni: OmniLight3D\nvar spot: SpotLight3D\nvar ambiente: Environment\nvar painel: VBoxContainer\nvar leitura: Label\nvar tipo: OptionButton\nvar tonemap: OptionButton\nvar energia: HSlider\nvar alcance: HSlider\nvar angulo: HSlider\nvar abertura: HSlider\nvar preenchimento: HSlider\nvar densidade: HSlider\nvar sombras: CheckButton\nvar volume: CheckButton\nvar glow: CheckButton\nvar ssao: CheckButton\n\nfunc material(cor: Color) -> StandardMaterial3D:\n    var m := StandardMaterial3D.new()\n    m.albedo_color = cor\n    m.roughness = 0.65\n    return m\n\nfunc peca(nome: String, mesh: Mesh, posicao: Vector3,\n        mat: Material) -> MeshInstance3D:\n    var instancia := MeshInstance3D.new()\n    instancia.name = nome\n    instancia.mesh = mesh\n    instancia.position = posicao\n    instancia.material_override = mat\n    add_child(instancia)\n    return instancia\n\nfunc slider(texto: String, minimo: float, maximo: float,\n        passo: float, valor: float) -> HSlider:\n    var l := Label.new()\n    l.text = texto\n    painel.add_child(l)\n    var s := HSlider.new()\n    s.min_value = minimo\n    s.max_value = maximo\n    s.step = passo\n    s.value = valor\n    s.custom_minimum_size.x = 320\n    painel.add_child(s)\n    s.value_changed.connect(func(_v: float): atualizar())\n    return s\n\nfunc chave(texto: String, valor: bool) -> CheckButton:\n    var c := CheckButton.new()\n    c.text = texto\n    c.button_pressed = valor\n    painel.add_child(c)\n    c.toggled.connect(func(_v: bool): atualizar())\n    return c\n\nfunc _ready() -> void:\n    var piso := PlaneMesh.new()\n    piso.size = Vector2(12, 14)\n    peca(\"Piso\", piso, Vector3(0, 0, 5), material(Color(0.45, 0.27, 0.12)))\n    var esfera := SphereMesh.new()\n    esfera.radius = 1.0\n    esfera.height = 2.0\n    peca(\"Obstaculo\", esfera, Vector3(0, 1.1, 4.5), material(Color(0.2, 0.3, 0.32)))\n    var caixa := BoxMesh.new()\n    caixa.size = Vector3(0.6, 1.4, 0.6)\n    for i in range(3):\n        peca(\"Marcador%d\" % i, caixa, Vector3(2.7, 0.7, 2 + i * 3),\n                material(Color(0.55, 0.55, 0.55)))\n    var emissivo := material(Color(0.05, 0.1, 0.12))\n    emissivo.emission_enabled = true\n    emissivo.emission = Color(0.15, 0.8, 1.0)\n    emissivo.emission_energy_multiplier = 4.0\n    peca(\"EmissorSemGI\", caixa, Vector3(-2.7, 0.7, 5), emissivo)\n    sol = DirectionalLight3D.new()\n    sol.name = \"Sol\"\n    sol.sky_mode = DirectionalLight3D.SKY_MODE_LIGHT_AND_SKY\n    add_child(sol)\n    omni = OmniLight3D.new()\n    omni.name = \"Lampada\"\n    omni.position = Vector3(0, 3, 0)\n    add_child(omni)\n    spot = SpotLight3D.new()\n    spot.name = \"Holofote\"\n    spot.position = Vector3(0, 3, 0)\n    add_child(spot)\n    var world := WorldEnvironment.new()\n    world.name = \"Mundo\"\n    ambiente = AMBIENTE.criar()\n    world.environment = ambiente\n    add_child(world)\n    var camera := Camera3D.new()\n    camera.position = Vector3(11, 10, 15)\n    camera.fov = 60\n    add_child(camera)\n    camera.look_at(Vector3(0, 0, 4.5), Vector3.UP)\n    camera.make_current()\n    criar_interface()\n    restaurar()\n\nfunc criar_interface() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var scroll := ScrollContainer.new()\n    scroll.position = Vector2(16, 16)\n    scroll.size = Vector2(410, 900)\n    layer.add_child(scroll)\n    var fundo := PanelContainer.new()\n    scroll.add_child(fundo)\n    painel = VBoxContainer.new()\n    painel.add_theme_constant_override(\"separation\", 10)\n    fundo.add_child(painel)\n    leitura = Label.new()\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    leitura.custom_minimum_size.x = 350\n    painel.add_child(leitura)\n    tipo = OptionButton.new()\n    for nome in [\"Spot\", \"Omni\", \"Directional\"]:\n        tipo.add_item(nome)\n    painel.add_child(tipo)\n    tipo.item_selected.connect(func(_v: int): atualizar())\n    energia = slider(\"Energia normalizada\", 0, 5, 0.25, 3)\n    alcance = slider(\"Alcance Omni/Spot (u)\", 2, 18, 1, 12)\n    angulo = slider(\"Azimute Spot/Directional (graus)\", -60, 60, 5, 0)\n    abertura = slider(\"Meia abertura Spot (graus)\", 10, 60, 2, 32)\n    preenchimento = slider(\"Preenchimento ambiente\", 0, 0.6, 0.02, 0.12)\n    densidade = slider(\"Densidade da neblina\", 0, 0.3, 0.02, 0)\n    sombras = chave(\"Sombras\", true)\n    volume = chave(\"Volumetric Fog — requer Forward+\", false)\n    glow = chave(\"Glow — observar o emissor ciano\", false)\n    ssao = chave(\"SSAO — requer Forward+\", false)\n    tonemap = OptionButton.new()\n    tonemap.add_item(\"Linear\", Environment.TONE_MAPPER_LINEAR)\n    tonemap.add_item(\"ACES\", Environment.TONE_MAPPER_ACES)\n    if RenderingServer.get_current_rendering_method() != &\"mobile\":\n        tonemap.add_item(\"AgX\", Environment.TONE_MAPPER_AGX)\n    painel.add_child(tonemap)\n    tonemap.item_selected.connect(func(_v: int): atualizar())\n    var botao := Button.new()\n    botao.text = \"Restaurar parâmetros\"\n    botao.pressed.connect(restaurar)\n    painel.add_child(botao)\n\nfunc restaurar() -> void:\n    tipo.select(0)\n    tonemap.select(0)\n    energia.set_value_no_signal(3)\n    alcance.set_value_no_signal(12)\n    angulo.set_value_no_signal(0)\n    abertura.set_value_no_signal(32)\n    preenchimento.set_value_no_signal(0.12)\n    densidade.set_value_no_signal(0)\n    sombras.set_pressed_no_signal(true)\n    volume.set_pressed_no_signal(false)\n    glow.set_pressed_no_signal(false)\n    ssao.set_pressed_no_signal(false)\n    atualizar()\n\nfunc atualizar() -> void:\n    if not is_instance_valid(ssao):\n        return # Interface ainda em montagem.\n    var metodo := RenderingServer.get_current_rendering_method()\n    var forward := metodo == &\"forward_plus\"\n    volume.disabled = not forward\n    ssao.disabled = not forward\n    alcance.editable = tipo.selected != 2\n    abertura.editable = tipo.selected == 0\n    angulo.editable = tipo.selected != 1\n    LUZES.configurar(sol, omni, spot, tipo.selected, energia.value,\n            alcance.value, angulo.value, abertura.value, sombras.button_pressed)\n    AMBIENTE.configurar(ambiente, preenchimento.value, densidade.value,\n            volume.button_pressed, glow.button_pressed, ssao.button_pressed,\n            tonemap.get_selected_id())\n    leitura.text = (\"Renderizador: %s\\nEnergia %.2f | alcance %.1f u\\n\"\n            + \"Azimute %.0f graus | cone total %.0f graus\\n\"\n            + \"Ambiente %.2f | densidade %.2f\\n\"\n            + \"Céu visível; sem GI/reflexos do céu. Sem colisão/locomoção.\\n\"\n            + \"R restaura quando o foco não está num controle.\") % [\n            metodo, energia.value, alcance.value, angulo.value,\n            abertura.value * 2, preenchimento.value, densidade.value]\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if event is InputEventKey and event.pressed and not event.echo:\n        if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n            return\n        if event.keycode == KEY_R:\n            restaurar()\n            get_viewport().set_input_as_handled()\n",
      "pros": "Montagem e dependências explícitas; reset repetível.",
      "cons": "Cena sem física, movimento ou GI; execução real permanece pendente."
    },
    {
      "title": "4. Extensão: giro solar · ciclo_sol.gd",
      "whenToUse": "Investigar orientação e horizonte em outra cena, após a prática principal.",
      "description": "Anexar a uma DirectionalLight3D com céu procedural configurado. Não usar junto ao controlador da bancada. O giro não configura sozinho céu noturno, lua ou cores do pôr do sol.",
      "code": "extends DirectionalLight3D\n# Extensão independente: NÃO anexada à cena da bancada controlada.\n# Anexar a uma DirectionalLight3D em outra cena, com WorldEnvironment,\n# Environment/BG_SKY, Sky e ProceduralSkyMaterial configurados.\n@export_range(10.0, 1200.0) var segundos_por_volta := 120.0\n@export var energia_dia := 1.2\n\nfunc _process(delta: float) -> void:\n    rotate_x(TAU * delta / segundos_por_volta)\n    var direcao := -global_transform.basis.z.normalized()\n    var acima_do_horizonte := direcao.y < 0.0\n    light_energy = energia_dia if acima_do_horizonte else 0.0\n    shadow_enabled = acima_do_horizonte\n# A posição do disco solar acompanha a direção. Cores do céu, ambiente,\n# exposição e luz noturna exigem decisões próprias: este ciclo não as anima.\n",
      "pros": "Rotação dependente de delta e condição do horizonte visíveis.",
      "cons": "É uma extensão mínima de orientação; não um sistema completo de dia/noite."
    },
    {
      "title": "5. Configuração e limites",
      "whenToUse": "Preparar ambiente e conferir quais efeitos podem ser observados.",
      "description": "Leia antes de executar os scripts. Projeto usa Compatibility como base e exige mudança explícita para testar recursos Forward+.",
      "code": "Godot 4.5, GDScript, desktop. Projeto inicia em Compatibility.\nImportar project.godot e executar oficina.tscn; cena montada em runtime.\nNão requer InputMap, texturas externas, plugins ou dados de usuário.\nEnergia normalizada; use_physical_light_units permanece no padrão false.\nUnidades de mundo ilustrativas; não há calibração fotométrica.\nSombras pertencem às luzes e às malhas visuais; não exigem CollisionShape3D.\nCéu visível, ambiente por cor; reflexos do céu e GI desativados.\nCamera3D.environment não definido: WorldEnvironment fornece o ambiente.\nPara Volumetric Fog/SSAO: selecionar Forward+ e reiniciar conforme editor.\nConfirmar renderizador ATUAL mostrado no painel, inclusive após fallback.\nMobile/Compatibility: controles volumétricos/SSAO ficam indisponíveis.\nGlow disponível nos três renderizadores; Compatibility 4.5 é simplificado.\nAgX omitido na UI Mobile; sua referência branca é inadequada para esse método.\nCiclo solar: extensão independente; não anexar à bancada sem remover a\norientação controlada por oficina.gd. Não promete cor/noite automáticas.\nProjeto revisado estruturalmente/documentalmente; execução no motor pendente.\n",
      "language": "text",
      "pros": "Método, unidades e dependências registrados.",
      "cons": "Conferência documental não substitui compilar/executar a cena."
    }
  ],
  "simulator": {
    "type": "lighting_3d_env",
    "title": "Laboratório: luz no piso e neblina na vista",
    "description": "Modelo analítico próprio: iluminação de um piso com sombra de uma esfera elevada e, separadamente, três painéis iguais vistos através de neblina comum. Sem GI, Glow, reflexão ou volume Godot.",
    "guide": [
      {
        "title": "Comece pela luz",
        "text": "A vista superior mostra piso x=−5…5, z=0…10. Fonte pontual/Spot em (0,3,0); esfera com x=0, y=1,1 e z=4,5, raio 1. Sonda em (0,0,7). A marca ciano no topo é projeção da fonte; Directional usa esse ponto apenas como origem gráfica de sua direção."
      },
      {
        "title": "Compare sombra e ambiente",
        "text": "S alterna bloqueio; D zera ambiente e neblina. A sombra retira só luz direta. 1/2/3 escolhem o tipo, preservando outros parâmetros. Controles sem efeito no tipo escolhido ficam indisponíveis. R restaura tudo. Atalhos sem repetição/modificadores, apenas com foco no desenho."
      },
      {
        "title": "Leia a neblina separadamente",
        "text": "Os três painéis têm radiância inicial igual e distâncias 2, 6 e 10 u. T=exp(−densidade × distância); densidade zero dá T=1. Eles são referências independentes da luz no piso. Não há feixe iluminando o ar nem equivalência exata com a neblina da Godot. Modelo estático, ajustável em pausa."
      }
    ]
  },
  "quiz": {
    "question": "Com SpotLight3D.`spot_angle`=32°, qual interpretação permite testar a iluminação sem confundir seus efeitos?",
    "options": [
      "O cone total mede 64°; sombras bloqueiam a parcela direta e preenchimento pode permanecer. Feixe volumétrico exige Forward+ e condições de meio/luz, sem ser garantido por Glow.",
      "O cone total mede 32°; aumentar Glow ilumina automaticamente o piso e substitui GI.",
      "O cone total mede 64°; neblina comum sempre integra o cone de luz no ar em qualquer renderizador.",
      "Girar Omni muda o cone; mover Directional muda sua intensidade por distância."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto: meia abertura, contribuições e condições do volume são contratos distintos.",
      "`spot_angle` é meia abertura. Glow é pós-processamento e não substitui iluminação do piso.",
      "Neblina comum não integra feixes locais como a volumétrica, que requer Forward+.",
      "Omni é pontual sem cone orientado; posição da Directional não define a iluminação."
    ],
    "explanation": "Compare uma variável por vez: abertura geométrica, luz recebida, preenchimento e aparência através do meio. O renderizador limita quais efeitos podem ser testados."
  }
},

  {
    id: "3d-inter-gridmap-decals",
    area: "3d",
    level: "intermediario",
    levelLabel: "Intermediário",
    title: "9. Cenários Modulares com GridMap (MeshLibrary) e Adesivos 3D (Decal)",
    subtitle: "Como montar masmorras e cidades 3D inteiras como blocos de LEGO em grade e projetar manchas, ferrugem e miras sobre superfícies.",
    nodesUsed: ["GridMap", "MeshLibrary", "Decal"],
    feynman: {
      title: "Explicação Feynman: O LEGO 3D em Grade e o Projetor de Adesivos",
      explanation: "Lembra do `TileMapLayer` que carimbava pisos no 2D? O **`GridMap`** é o irmão gêmeo dele em 3D! Você cria uma caixa de peças 3D chamada **`MeshLibrary`** (com um bloco de Piso de Ferro, um de Parede de Tijolo, uma Escada e um Cano Curvo) e sai pintando nos 3 andares da grade como no Minecraft ou num conjunto de LEGO! Mas se você repetir a mesma parede 50 vezes, o jogador percebe que é tudo igual... É aí que entra o **`Decal` (Decalque 3D)**: ele funciona como um projetor de cinema pequenininho que 'carimba' uma textura de ferrugem, mancha de óleo, grafite ou poça d'água por cima de qualquer parede ou chão curvo, quebrando toda a repetição visual!",
      analogies: [
        {
          term: "MeshLibrary",
          analogy: "O catálogo de peças 3D (com suas malhas, materiais e colisões) exportado a partir de uma cena com vários `MeshInstance3D`."
        },
        {
          term: "GridMap",
          analogy: "Uma grade espacial 3D (X, Y, Z) que desenha milhares de peças modulares com altíssima performance."
        },
        {
          term: "Decal",
          analogy: "Uma caixa projetora invisível: tudo que estiver dentro do volume da caixa recebe a imagem projetada (rachaduras, sangue, óleo, mira de magia no chão irregular!)."
        },
        {
          term: "Decal.cull_mask",
          analogy: "Permite que um adesivo de sujeira na parede NÃO seja projetado na roupa do jogador quando ele passa encostado na parede!"
        }
      ]
    },
    howItWorks: {
      overview: "No `GridMap`, cada célula é identificada por um `Vector3i(x, y, z)`. Ele agrupa automaticamente as malhas em octrees para reduzir Draw Calls. Já o `Decal` projeta texturas completas (Albedo, Normal, ORM e até Emission!) sobre qualquer geometria 3D sem precisar modificar a malha original.",
      anatomy: [
        {
          prop: "gridmap.local_to_map(pos_3d) -> Vector3i",
          desc: "Converte uma posição em metros `(x, y, z)` para a coordenada inteira da célula no GridMap."
        },
        {
          prop: "gridmap.set_cell_item(coords: Vector3i, item_id: int, orientacao: int)",
          desc: "Coloca, gira ou remove (`item_id = -1`) um bloco 3D da grade em tempo real."
        },
        {
          prop: "Decal.texture_albedo / texture_normal",
          desc: "Texturas projetadas sobre as malhas que cruzam a caixa do Decal."
        },
        {
          prop: "Decal.upper_fade / lower_fade",
          desc: "Suaviza a projeção nas bordas da caixa para a mancha não cortar dura."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Construindo ou Destruindo Blocos 3D em Tempo Real no GridMap",
        whenToUse: "Jogos estilo Voxel/Minecraft, construtores de fábricas Steampunk ou pisos que desabam.",
        description: "Convertemos a posição do impacto 3D para `Vector3i` com `local_to_map()` e alteramos a célula com `set_cell_item()`.",
        code: `extends GridMap

const ITEM_VAZIO: int = -1
const ID_BLOCO_BRONZE: int = 0

func colocar_bloco_em(ponto_global: Vector3) -> void:
    var celula: Vector3i = local_to_map(to_local(ponto_global))
    set_cell_item(celula, ID_BLOCO_BRONZE, 0)

func destruir_bloco_em(ponto_global: Vector3) -> void:
    var celula: Vector3i = local_to_map(to_local(ponto_global))
    if get_cell_item(celula) != ITEM_VAZIO:
        set_cell_item(celula, ITEM_VAZIO)`,
        pros: "Atualiza malha visual e colisão física 3D instantaneamente com pouquíssima memória.",
        cons: "Quando mirar com RayCast3D para quebrar um bloco, subtraia `normal * 0.1` do ponto de impacto para entrar dentro do bloco atingido!"
      },
      {
        title: "Forma 2: Indicador de Área de Magia / Mira no Chão Irregular com Decal",
        whenToUse: "Círculos de seleção de unidades (RTS), miras de granada/morteiro que se moldam a escadas e rampas.",
        description: "Se você usar um plano 2D reto no chão, ele entra dentro de rampas e degraus. Usando um `Decal`, o círculo brilhante se curva perfeitamente sobre degraus, pedras e ladeiras!",
        code: `extends Decal

func atualizar_mira_no_chao(ponto_impacto: Vector3) -> void:
    global_position = ponto_impacto
    # Gira o círculo lentamente para dar charme mecânico
    rotate_y(1.5 * get_process_delta_time())`,
        pros: "Zero 'Z-fighting' (não fica piscando colado no chão) e acompanha qualquer relevo de escada ou rampa!",
        cons: "Desmarque a Visual Layer do Jogador no `cull_mask` do Decal se não quiser que a mira pinte o chapéu do personagem."
      },
      {
        title: "Forma 3: Marcas de Impacto / Vazamento de Óleo com Fade-Out Automático",
        whenToUse: "Buracos de bala, marcas de queimadura de vapor ou pegadas na lama que somem depois de alguns segundos.",
        description: "Instanciamos o `Decal` alinhado à parede e usamos um `Tween` na propriedade `modulate.a` para fazê-lo desaparecer suavemente.",
        code: `extends Decal

func _ready() -> void:
    # Espera 8 segundos e depois apaga suavemente em 2 segundos
    var tween := create_tween()
    tween.tween_interval(8.0)
    tween.tween_property(self, "modulate:a", 0.0, 2.0)
    tween.tween_callback(queue_free)`,
        pros: "Mantém a batalha visualmente intensa sem acumular milhares de nós infinitamente na memória.",
        cons: "Para rajadas muito rápidas, combine com Object Pooling."
      }
    ],
    simulator: {
      type: "gridmap_decal_3d",
      title: "Laboratório de GridMap Voxel 3D (`set_cell_item`) & Projeção de Decal",
      description: "Construa e remova blocos modulares 3D na grade (`Vector3i`) e projete Decals de engrenagem/vapor sobre os degraus!"
    },
    quiz: {
      question: "Por que usar um nó `Decal` é muito melhor do que usar um plano achatado (`PlaneMesh`) para desenhar um círculo de mira no chão ou uma mancha de óleo?",
      options: [
        "Porque o Decal tem gravidade própria.",
        "Porque o `Decal` projeta a textura sobre qualquer relevo 3D (acompanhando degraus, rampas e quinas perfeitamente) e nunca sofre de 'Z-fighting' (piscar colado na superfície).",
        "Porque o Decal substitui o CharacterBody3D.",
        "Porque o Decal só funciona em 2D."
      ],
      correctIndex: 1,
      explanation: "Perfeito! Um plano reto atravessa rampas ou flutua sobre degraus; já o volume do `Decal` veste a geometria 3D como uma pintura projetada!"
    }
  },

  // ==========================================================================
  // NÍVEL IV — AVANÇADO (Mestre Relojoeiro)
  // ==========================================================================
  {
    id: "3d-adv-animationtree-skeleton",
    area: "3d",
    level: "avancado",
    levelLabel: "Avançado",
    title: "10. Esqueletos (Skeleton3D), AnimationTree (BlendSpace2D) e Anexos de Osso",
    subtitle: "Como misturar animações 3D suavemente (andar, correr, mirar ao mesmo tempo) e prender espadas ou lanternas na mão do personagem.",
    nodesUsed: ["Skeleton3D", "AnimationTree", "AnimationNodeStateMachine", "BlendSpace2D", "BoneAttachment3D"],
    feynman: {
      title: "Explicação Feynman: O Boneco Articulado, o DJ de Animações e o Coldre na Mão",
      explanation: "Em 2D, animar era trocar desenhos. Em 3D, nosso personagem é uma escultura com um **Esqueleto de Ossos (`Skeleton3D`)** por dentro! Mas o que acontece se o boneco está 'Correndo' e de repente você manda tocar 'Parado' a seco? As pernas dão um teletransporte robótico feio! Pior: e se ele estiver andando na diagonal com o analógico meio inclinado? É aí que entra a **`AnimationTree`**: ela é uma **Mesa de DJ de Animações**! Com um **`BlendSpace2D`**, você coloca 'Parado' no centro, 'Andar' no meio e 'Correr' na ponta: se o jogador empurrar o analógico 40%, a `AnimationTree` mistura 60% de Parado com 40% de Andar sozinha! E para colocar uma espada ou chave inglesa na mão do boneco para ela balançar junto com o braço? Usamos o **`BoneAttachment3D`** — uma luva presa diretamente no osso da mão!",
      analogies: [
        {
          term: "Skeleton3D",
          analogy: "A estrutura de ossos (`Hips`, `Spine`, `Hand_R`, `Head`) que deforma a malha 3D do personagem."
        },
        {
          term: "BoneAttachment3D",
          analogy: "Um suporte colado em um osso específico (ex: mão direita ou cabeça): tudo que for filho dele acompanha o movimento daquele osso perfeitamente!"
        },
        {
          term: "AnimationTree + BlendSpace1D/2D",
          analogy: "Um misturador contínuo: interpola poses entre andar para frente, andar de lado (strafe) e correr conforme um vetor `(x, y)`."
        },
        {
          term: "OneShot + Filter (Máscara de Ossos)",
          analogy: "Permite que as pernas continuem tocando a animação de 'Correr' enquanto só da cintura para cima toca a animação de 'Atirar ou Acenar'!"
        }
      ]
    },
    howItWorks: {
      overview: "O `AnimationPlayer` guarda a biblioteca bruta de clipes de animação importados do `.glb`. O `AnimationTree` se conecta a esse `AnimationPlayer` e assume o comando, oferecendo Máquinas de Estado Visuais com transições suaves (`xfade_time`), `BlendSpace2D` e `OneShot` com filtros de ossos.",
      anatomy: [
        {
          prop: "anim_tree.set('parameters/locomocao/blend_position', vetor_2d)",
          desc: "Atualiza o ponto no gráfico BlendSpace2D para misturar andar/correr/strafe em tempo real."
        },
        {
          prop: "anim_tree.get('parameters/playback').travel('Pulo')",
          desc: "Pede para a StateMachine da AnimationTree viajar pelo caminho de transição configurado até o estado 'Pulo'."
        },
        {
          prop: "BoneAttachment3D.bone_name = 'Hand.R'",
          desc: "Vincula a posição e rotação deste nó diretamente ao osso escolhido do `Skeleton3D`."
        },
        {
          prop: "Skeleton3D.set_bone_pose_rotation(id, quat)",
          desc: "Permite girar um osso via código (ex: fazer a cabeça ou o tronco olhar para cima onde o jogador mira!)."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Locomoção Fluida em 8 Direções com AnimationTree + BlendSpace2D",
        whenToUse: "Personagens 3D em 3ª ou 1ª pessoa que andam, correm e dão passos laterais (Strafe).",
        description: "Convertemos a velocidade horizontal do personagem para o espaço local dele e alimentamos o `blend_position` do `BlendSpace2D`.",
        code: `extends CharacterBody3D

@onready var anim_tree: AnimationTree = $AnimationTree
@export var vel_maxima: float = 6.0
var blend_atual := Vector2.ZERO

func _physics_process(delta: float) -> void:
    # Converte a velocidade global para a direção local do corpo (X = lado, -Z = frente)
    var vel_local := global_transform.basis.inverse() * velocity
    var alvo_blend := Vector2(vel_local.x, -vel_local.z) / vel_maxima
    
    # Suaviza a transição do blend para as pernas acelerarem com peso natural
    blend_atual = blend_atual.lerp(alvo_blend, 10.0 * delta)
    anim_tree.set("parameters/Locomocao/blend_position", blend_atual)`,
        pros: "Transição 100% contínua entre parado, caminhada lenta, corrida e passos laterais sem cortes secos.",
        cons: "Certifique-se de que as animações de andar e correr estejam com Loop ativado na importação."
      },
      {
        title: "Forma 2: Atacando da Cintura para Cima enquanto Corre (AnimationNodeOneShot + Filter)",
        whenToUse: "Quando o personagem precisa atacar, recarregar ou beber uma poção sem parar de mexer as pernas se estiver andando.",
        description: "Na `AnimationTree`, adicionamos um nó `OneShot` com `Filter` habilitado apenas nos ossos do tronco, braços e cabeça, e disparamos via código!",
        code: `extends Node3D

@onready var anim_tree: AnimationTree = $AnimationTree

func disparar_golpe_braco() -> void:
    # Dispara o OneShot (que afeta apenas os ossos filtrados da cintura para cima!)
    anim_tree.set(
        "parameters/AtaqueTronco/request",
        AnimationNodeOneShot.ONE_SHOT_REQUEST_FIRE
    )`,
        pros: "Evita ter que criar animações duplicadas de 'Atacar Parado', 'Atacar Andando', 'Atacar Pulando'.",
        cons: "Lembre-se de marcar os ossos desejados na janela 'Edit Filters' do nó OneShot."
      },
      {
        title: "Forma 3: Trocando Armas na Mão do Esqueleto com BoneAttachment3D",
        whenToUse: "Sistemas de equipamento (espadas, chaves de grifo, escudos, chapéus, mochilas a vapor).",
        description: "Adicionamos um `BoneAttachment3D` filho do `Skeleton3D`, escolhemos o osso da mão no Inspector e instanciamos a arma dentro dele!",
        code: `extends BoneAttachment3D

var arma_atual: Node3D = null

func equipar_arma(cena_nova_arma: PackedScene) -> void:
    if arma_atual:
        arma_atual.queue_free()
    arma_atual = cena_nova_arma.instantiate() as Node3D
    add_child(arma_atual)
    # Posição (0,0,0) local já cai exatamente na palma da mão!
    arma_atual.position = Vector3.ZERO`,
        pros: "A arma segue cada milímetro da animação da mão em qualquer golpe ou cutscene.",
        cons: "No Blender, posicione a origem (Pivot) do modelo da arma exatamente no cabo onde a mão segura."
      }
    ],
    simulator: {
      type: "blendspace_2d_3d",
      title: "Laboratório de AnimationTree: BlendSpace2D (Mistura de Poses 3D)",
      description: "Arraste o ponto no gráfico `BlendSpace2D` (`X = Strafe Lateral`, `Y = Frente/Trás`) e veja como a AnimationTree calcula os pesos de cada clipe de animação 3D em tempo real!"
    },
    quiz: {
      question: "Qual nó da Godot 3D deve ser usado para prender uma espada ou lanterna diretamente ao osso da mão de um `Skeleton3D` para que ela acompanhe todas as animações do braço?",
      options: [
        "BoneAttachment3D",
        "SpringArm3D",
        "CanvasLayer",
        "WorldEnvironment"
      ],
      correctIndex: 0,
      explanation: "Exato! O `BoneAttachment3D` copia em tempo real a transformação de um osso específico do `Skeleton3D`, mantendo qualquer objeto filho preso perfeitamente àquela parte do corpo."
    }
  },

  {
    id: "3d-adv-navmesh-ai",
    area: "3d",
    level: "avancado",
    levelLabel: "Avançado",
    title: "11. Navegação 3D (NavigationRegion3D, NavMesh Baking) e Saltos (NavigationLink3D)",
    subtitle: "Como assar (Bake) malhas de navegação 3D sobre terrenos e escadas, e ensinar inimigos a pular abismos ou usar elevadores.",
    nodesUsed: ["NavigationRegion3D", "NavigationMesh", "NavigationAgent3D", "NavigationLink3D"],
    feynman: {
      title: "Explicação Feynman: O Tapete Azul Assado no Forno e as Pontes de Salto",
      explanation: "Num cenário 3D cheio de mesas, rampas, escadas e buracos, como o computador descobre onde um robô de `0.5m` de largura e `1.8m` de altura consegue passar sem bater a cabeça nem entalar? Você não precisa desenhar esse mapa na mão! Na Godot 3D, você coloca o cenário dentro de uma **`NavigationRegion3D`**, informa a altura e a grossura do seu robô no recurso **`NavigationMesh`** e clica no botão **'Bake NavMesh' (Assar Malha)**: a Godot escaneia toda a geometria 3D e estende automaticamente um tapete azul apenas nos chãos e rampas onde o robô cabe em pé! E se houver um buraco entre dois telhados que o robô pode pular? Você coloca um **`NavigationLink3D`** ligando as duas pontas para avisar o GPS que ali existe um atalho de pulo!",
      analogies: [
        {
          term: "Bake NavigationMesh",
          analogy: "Escanear automaticamente o cenário 3D para gerar o tapete caminhável descontando paredes, móveis e tetos baixos."
        },
        {
          term: "agent_radius & agent_height",
          analogy: "A 'barriga' e a 'altura' do inimigo: o NavMesh deixa uma margem de segurança das paredes igual ao `agent_radius` para o ombro do robô nunca raspar no muro!"
        },
        {
          term: "NavigationLink3D",
          analogy: "Uma ponte virtual que conecta duas ilhas separadas de NavMesh (usada para pulos sobre buracos, escadas de mão, teletransportadores ou portas)."
        },
        {
          term: "NavigationObstacle3D",
          analogy: "Um cilindro de desvio colocado em barris ou carros dinâmicos para os agentes contornarem objetos que se mexem."
        }
      ]
    },
    howItWorks: {
      overview: "Assim como no 2D, o inimigo 3D usa um nó filho `NavigationAgent3D`. A diferença crucial no 3D é manter o eixo vertical `velocity.y` controlado pela gravidade real enquanto a navegação controla o deslocamento horizontal `(velocity.x, velocity.z)`, além de escutar o sinal `link_reached` quando o agente chega num salto (`NavigationLink3D`).",
      anatomy: [
        {
          prop: "NavigationMesh.agent_max_slope (45°)",
          desc: "Inclinação máxima que o Bake considera como rampa caminhável no cenário 3D."
        },
        {
          prop: "NavigationMesh.agent_max_climb (0.25m)",
          desc: "Altura máxima de degrau que o agente consegue subir sem precisar de rampa."
        },
        {
          prop: "nav_agent.get_next_path_position() -> Vector3",
          desc: "Retorna o próximo ponto 3D da rota sobre o tapete do NavMesh."
        },
        {
          prop: "signal link_reached(details: Dictionary)",
          desc: "Dispara quando o agente pisa na entrada de um `NavigationLink3D` (hora de tocar a animação de pulo!)."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Inimigo 3D Perseguidor Respeitando a Gravidade",
        whenToUse: "Guardas mecânicos, monstros e aliados que andam e sobem escadas pelo cenário 3D.",
        description: "Calculamos a direção horizontal para `get_next_path_position()`, mas preservamos o `velocity.y` da gravidade para o inimigo cair fisicamente de degraus.",
        code: `extends CharacterBody3D

@export var alvo: Node3D
@export var velocidade: float = 4.5
@onready var nav: NavigationAgent3D = $NavigationAgent3D

func _physics_process(delta: float) -> void:
    if not is_on_floor():
        velocity += get_gravity() * delta
        
    if not alvo:
        return
    nav.target_position = alvo.global_position
    
    if not nav.is_navigation_finished():
        var proximo_ponto := nav.get_next_path_position()
        var dir := global_position.direction_to(proximo_ponto)
        velocity.x = dir.x * velocidade
        velocity.z = dir.z * velocidade
        # Gira suavemente para olhar para onde está andando
        if Vector2(dir.x, dir.z).length() > 0.1:
            rotation.y = lerp_angle(rotation.y, atan2(-dir.x, -dir.z), 8.0 * delta)
    else:
        velocity.x = move_toward(velocity.x, 0.0, velocidade)
        velocity.z = move_toward(velocity.z, 0.0, velocidade)
        
    move_and_slide()`,
        pros: "Combina a precisão do NavMesh 3D com a gravidade real do `CharacterBody3D`.",
        cons: "Aguarde o primeiro frame físico (`await get_tree().physics_frame`) antes de consultar o `NavigationServer3D` no `_ready()`."
      },
      {
        title: "Forma 2: Saltando Abismos entre Plataformas com NavigationLink3D",
        whenToUse: "Inimigos ágeis que pulam de uma passarela para outra ou descem de varandas.",
        description: "Conectamos o sinal `link_reached` do `NavigationAgent3D` e aplicamos um impulso vertical e horizontal em direção ao `link_exit_position`!",
        code: `extends CharacterBody3D

@onready var nav: NavigationAgent3D = $NavigationAgent3D

func _ready() -> void:
    nav.link_reached.connect(_ao_chegar_em_ponte_de_salto)

func _ao_chegar_em_ponte_de_salto(detalhes: Dictionary) -> void:
    var saida: Vector3 = detalhes["link_exit_position"]
    var dir_salto := global_position.direction_to(saida)
    velocity.x = dir_salto.x * 7.0
    velocity.z = dir_salto.z * 7.0
    velocity.y = 6.5 # Impulso de pulo 3D sobre o buraco!`,
        pros: "Permite que a IA use caminhos verticais e acrobáticos pelo mapa 3D.",
        cons: "Marque `bidirectional = false` no `NavigationLink3D` caso o inimigo só possa pular de cima para baixo (queda única)."
      },
      {
        title: "Forma 3: Re-Assando o NavMesh em Tempo Real (bake_navigation_mesh)",
        whenToUse: "Quando uma porta gigante abre, uma ponte levadiça abaixa ou o jogador constrói uma parede nova durante a partida.",
        description: "Chamamos `bake_navigation_mesh(true)` na `NavigationRegion3D` para recalcular a malha em uma thread de segundo plano sem travar o jogo!",
        code: `extends NavigationRegion3D

func atualizar_malha_apos_abrir_portao() -> void:
    # O argumento 'true' faz o cálculo rodar em outra thread sem dar engasgo!
    bake_navigation_mesh(true)`,
        pros: "A IA descobre imediatamente que o portão abriu ou que um corredor foi bloqueado.",
        cons: "Em mapas gigantescos, divida o mundo em várias `NavigationRegion3D` menores para re-assar apenas a sala que mudou."
      }
    ],
    simulator: {
      type: "navmesh_3d_sim",
      title: "Laboratório de NavMesh 3D (`agent_radius` Margin) & Salto com NavigationLink3D",
      description: "Ajuste o raio do agente (`agent_radius`), ative/desative a ponte `NavigationLink3D` sobre o fosso de vapor e veja o autômato escolher entre dar a volta longa ou saltar o abismo!"
    },
    quiz: {
      question: "Para que serve o nó `NavigationLink3D` dentro do sistema de navegação 3D da Godot?",
      options: [
        "Para tocar música 3D.",
        "Para conectar dois pontos separados da malha de navegação (como um abismo pulável, um degrau alto, um teletransporte ou escada de mão), avisando a IA que é possível atravessar dali para lá.",
        "Para pintar texturas no chão.",
        "Para substituir a Camera3D."
      ],
      correctIndex: 1,
      explanation: "Correto! O `NavigationLink3D` cria uma ponte lógica entre duas regiões desconectadas do NavMesh e dispara o sinal `link_reached` para você executar o pulo ou subida!"
    }
  },

  {
    id: "3d-adv-spatial-shaders-particles",
    area: "3d",
    level: "avancado",
    levelLabel: "Avançado",
    title: "12. Shaders Espaciais 3D (shader_type spatial) e Partículas 3D com Colisão",
    subtitle: "Como deformar vértices 3D na GPU (ondas de água, pulsação mecânica), criar escudos holográficos Fresnel e faíscas que quicam no chão.",
    nodesUsed: ["shader_type spatial", "Fresnel", "GPUParticles3D", "GPUParticlesCollisionBox3D"],
    feynman: {
      title: "Explicação Feynman: O Lençol Sacudido pelos Cantos e o Efeito da Bolha de Sabão",
      explanation: "Lembra dos duendes pintores da GPU no 2D? No 3D (`shader_type spatial`), eles ganham dois poderes novos espetaculares! 1) Na função **`vertex()`**, os duendes podem levantar e abaixar os pontos reais (`VERTEX.y`) da malha 3D: é como segurar um lençol plano de 1.000 pontos e sacudir em ondas senoidais para criar um oceano 3D agitado com custo quase zero! 2) Na função **`fragment()`**, existe um fenômeno óptico da vida real chamado **Efeito Fresnel**: quando você olha para o meio de uma bolha de sabão ou de uma bola de vidro, ela é quase transparente, mas nas **BORDAS** (onde a superfície curva para longe do seu olho) ela brilha intensamente! Com uma linha de código Fresnel, você cria escudos de energia de éter, fantasmas e hologramas 3D dignos de cinema!",
      analogies: [
        {
          term: "shader_type spatial;",
          analogy: "O shader do mundo 3D: em vez de definir apenas `COLOR`, você define `ALBEDO`, `METALLIC`, `ROUGHNESS` e `EMISSION` para interagir com todas as luzes 3D!"
        },
        {
          term: "VERTEX.y += sin(...) no vertex()",
          analogy: "Move a altura física dos vértices da malha 3D na placa de vídeo (perfeito para ondas de água, bandeiras, pistões pulsando e grama ao vento)."
        },
        {
          term: "Efeito Fresnel (dot(NORMAL, VIEW))",
          analogy: "Calcula o quão de raspão a câmera está olhando para a superfície, iluminando as silhuetas e bordas do modelo 3D."
        },
        {
          term: "GPUParticlesCollisionBox3D / Sphere3D",
          analogy: "Faz com que as faíscas de solda e brasas do `GPUParticles3D` realmente batam e quiquem na mesa e no chão 3D em vez de atravessarem o piso!"
        }
      ]
    },
    howItWorks: {
      overview: "Em um shader `spatial`, o código que você escreve em `fragment()` alimenta o motor PBR da Godot (`ALBEDO`, `ROUGHNESS`, `METALLIC`, `EMISSION`, `ALPHA`). E nas partículas 3D (`GPUParticles3D`), basta adicionar nós `GPUParticlesCollisionBox3D` no chão e ativar `Collision Mode = Rigid` no `ParticleProcessMaterial` para ter milhares de faíscas colidindo na GPU!",
      anatomy: [
        {
          prop: "ALBEDO / EMISSION / ROUGHNESS / METALLIC",
          desc: "Saídas do `fragment()` num shader `spatial` que recebem iluminação 3D completa."
        },
        {
          prop: "VERTEX (vec3 na função vertex)",
          desc: "Posição local do vértice 3D que pode ser deslocada em tempo real na GPU."
        },
        {
          prop: "dot(NORMAL, VIEW)",
          desc: "Produto escalar entre a normal da superfície e o olhar da câmera (vale `1.0` no centro e `0.0` na borda extrema)."
        },
        {
          prop: "GPUParticlesAttractorSphere3D",
          desc: "Nó 3D que puxa (vórtice/aspirador) ou empurra partículas de vapor e magia em tempo real!"
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Campo de Força / Holograma de Éter com Efeito Fresnel",
        whenToUse: "Escudos protetores, hologramas Steampunk, itens lendários brilhando ou inimigos espectrais.",
        description: "Calculamos o Fresnel a partir de `NORMAL` e `VIEW` para deixar o centro translúcido e as bordas brilhando em ciano elétrico!",
        code: `// --- Arquivo: escudo_fresnel.gdshader ---
shader_type spatial;
render_mode blend_add, cull_disabled, unshaded;

uniform vec4 cor_eter : source_color = vec4(0.36, 0.88, 0.90, 1.0);
uniform float potencia_borda : hint_range(0.5, 8.0) = 3.0;

void fragment() {
    // 1.0 na borda da silhueta, 0.0 no centro olhando de frente
    float fresnel = pow(1.0 - clamp(dot(NORMAL, VIEW), 0.0, 1.0), potencia_borda);
    ALBEDO = cor_eter.rgb;
    ALPHA = fresnel;
}`,
        pros: "Destaca perfeitamente a silhueta 3D de qualquer modelo independente do ângulo da câmera.",
        cons: "`render_mode blend_add` soma luz (ótimo para energia brilhante)."
      },
      {
        title: "Forma 2: Deslocamento de Vértices (Ondas Mecânicas / Líquido de Caldeira 3D)",
        whenToUse: "Água 3D, tanques de óleo borbulhante, bandeiras ou terrenos que ondulam.",
        description: "Subdividimos um `PlaneMesh` (ex: `subdivide_width = 32`, `subdivide_depth = 32`) e alteramos `VERTEX.y` na função `vertex()`.",
        code: `// --- Arquivo: ondas_caldeira.gdshader ---
shader_type spatial;

uniform float altura_onda : hint_range(0.0, 1.0) = 0.18;
uniform float velocidade : hint_range(0.5, 10.0) = 3.5;

void vertex() {
    // Levanta e abaixa a altura Y de cada vértice da malha 3D!
    VERTEX.y += sin(VERTEX.x * 4.0 + TIME * velocidade) * cos(VERTEX.z * 4.0 + TIME * velocidade) * altura_onda;
}

void fragment() {
    ALBEDO = vec3(0.12, 0.45, 0.52);
    ROUGHNESS = 0.15;
    METALLIC = 0.2;
}`,
        pros: "Deforma milhares de vértices diretamente na GPU sem gastar 1% da CPU.",
        cons: "O `PlaneMesh` precisa ter subdivisões (`subdivide_width/depth`) para ter vértices internos que possam subir e descer!"
      },
      {
        title: "Forma 3: Faíscas de Solda 3D que Quicam no Chão (GPUParticlesCollision)",
        whenToUse: "Forjas, impactos de tiros em armaduras de metal, esmeris e explosões de caldeira.",
        description: "Ativamos `collision_mode = COLLISION_RIGID` no `ParticleProcessMaterial` do `GPUParticles3D` e colocamos um `GPUParticlesCollisionBox3D` no piso.",
        code: `extends GPUParticles3D

func configurar_faiscas_colisiveis() -> void:
    var mat := process_material as ParticleProcessMaterial
    if mat:
        # Faz cada partícula bater e quicar em nós GPUParticlesCollision3D!
        mat.collision_mode = ParticleProcessMaterial.COLLISION_RIGID
        mat.collision_bounce = 0.65
        mat.collision_friction = 0.2`,
        pros: "Milhares de faíscas quicando fisicamente nos degraus e no chão calculadas 100% na placa de vídeo.",
        cons: "Partículas GPU colidem apenas com nós da família `GPUParticlesCollision3D` (não com `StaticBody3D` comuns)."
      }
    ],
    simulator: {
      type: "spatial_shader_3d",
      title: "Laboratório de Shader Espacial 3D: Ondas de Vértice (`VERTEX.y`) & Brilho Fresnel",
      description: "Ajuste a potência do Efeito Fresnel, a amplitude da onda de vértices (`vertex()`) e a velocidade temporal (`TIME`) em uma malha 3D interativa!"
    },
    quiz: {
      question: "Ao criar um shader de ondas de água 3D usando `VERTEX.y += sin(...)` num `PlaneMesh`, você nota que o plano inteiro apenas sobe e desce reto sem formar ondas. Por que isso aconteceu?",
      options: [
        "Porque o GDScript está desligado.",
        "Porque um `PlaneMesh` padrão tem apenas 4 vértices nos cantos! É preciso aumentar `subdivide_width` e `subdivide_depth` no PlaneMesh para existirem vértices no meio que possam ondular.",
        "Porque `TIME` só funciona em 2D.",
        "Porque falta um `StaticBody3D`."
      ],
      correctIndex: 1,
      explanation: "Na mosca! A função `vertex()` move os vértices existentes na malha. Se o plano só tiver os 4 cantos, não há pontos intermediários para formar a barriga da onda; basta aumentar `subdivide_width` e `subdivide_depth`!"
    }
  },

  // ==========================================================================
  // NÍVEL V — PROFISSIONAL (Arquiteto do Éter)
  // ==========================================================================
  {
    id: "3d-pro-global-illumination",
    area: "3d",
    level: "profissional",
    levelLabel: "Profissional",
    title: "13. Iluminação Global Avançada (LightmapGI, VoxelGI, SDFGI e ReflectionProbe)",
    subtitle: "Como fazer a luz rebater nas paredes coloridas (Global Illumination) escolhendo a tecnologia certa para o seu tipo de jogo.",
    nodesUsed: ["LightmapGI", "VoxelGI", "SDFGI", "ReflectionProbe"],
    feynman: {
      title: "Explicação Feynman: A Luz que Quica igual Bola de Tênis e o Espelho Mágico",
      explanation: "Na vida real, quando o sol entra pela janela e bate num tapete vermelho forte, a luz quica no tapete e pinta o teto branco com um tom rosado suave! Em computação gráfica, esse 'quique da luz' se chama **Iluminação Global (GI — *Global Illumination*)**. Sem luz indireta ou ambiente, as regiões que não recebem luz direta ficam escuras. A luz direta continua iluminando as superfícies voltadas para a fonte, inclusive os brilhos nos metais. Mas calcular milhões de raios de luz quicando em tempo real é pesado! Por isso a Godot 4 te dá **3 ferramentas de GI** para você escolher igual um engenheiro: 1) **`LightmapGI`** (assa a luz como uma pintura fixa nas paredes — pode ter baixo custo durante o jogo, dependendo da cena e do dispositivo.); 2) **`VoxelGI`** (calcula luz quicando em tempo real dentro de uma sala ou prédio fechado); e 3) **`SDFGI`** (liga com 1 clique para mundos abertos gigantescos com ciclo dia/noite!).",
      analogies: [
        {
          term: "LightmapGI (Luz Assada / Baked)",
          analogy: "Tirar uma fotografia perfeita das sombras e luzes rebatidas e colar como textura nas paredes: evita recalcular os rebatimentos durante o jogo, mas ainda há custo de memória e de renderização."
        },
        {
          term: "VoxelGI (Tempo Real para Interiores/Fases Médias)",
          analogy: "Uma caixa de sensores 3D que calcula luz e reflexos dinâmicos quando portas abrem ou luzes mudam de cor."
        },
        {
          term: "SDFGI (Signed Distance Field GI — Mundo Aberto)",
          analogy: "Iluminação global automática que segue a câmera pelo mundo aberto inteiro sem precisar posicionar caixas nem assar mapas."
        },
        {
          term: "ReflectionProbe (Sonda de Reflexo)",
          analogy: "Uma bola espelhada invisível colocada no centro da sala para que os metais (`metallic = 1.0`) reflitam as paredes reais daquela sala em vez de refletirem apenas o céu!"
        }
      ]
    },
    howItWorks: {
      overview: "Escolher a técnica de Iluminação Global correta é uma das decisões mais importantes de um Arquiteto 3D na Godot. Além disso, um `ReflectionProbe` pode melhorar os reflexos locais em uma sala fechada, pois metais polidos refletem o ambiente e também podem mostrar brilhos da luz direta. O resultado depende das fontes de reflexão disponíveis, como céu, GI e sondas locais.",
      anatomy: [
        {
          prop: "MeshInstance3D.gi_mode (Disabled / Static / Dynamic)",
          desc: "Informa ao sistema de GI se aquela malha faz parte do cenário fixo (`Static` — rebatedor de luz) ou se move (`Dynamic`)."
        },
        {
          prop: "Light3D.light_bake_mode (Disabled / Static / Dynamic)",
          desc: "Define se a luz será assada por completo no Lightmap (`Static`) ou se apenas a luz indireta será assada (`Dynamic`)."
        },
        {
          prop: "ReflectionProbe.update_mode (Once / Always)",
          desc: "`Once` tira uma foto 360° da sala no início (super rápido!); `Always` atualiza todo frame."
        },
        {
          prop: "Environment.sdfgi_enabled = true",
          desc: "Ativa SDFGI no Forward+: iluminação em tempo parcialmente real para geometria estática e luzes dinâmicas. Oclusores e emissores móveis não são suportados como contribuintes dinâmicos."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Máxima Performance e Qualidade para Cenários Fixos (LightmapGI + ReflectionProbe)",
        whenToUse: "Fases com geometria estática, inclusive em Mobile e Compatibility, respeitando os recursos do dispositivo.",
        description: "Marcamos as malhas do cenário com `gi_mode = GI_MODE_STATIC`, geramos UV2 na importação e clicamos em 'Bake Lightmaps' no `LightmapGI`.",
        code: `# Fluxo Profissional LightmapGI:
# 1. No Import do modelo .glb do cenário, ative "Meshes -> Light Baking = Static Lightmaps"
# 2. Adicione um nó LightmapGI na cena e clique em "Bake Lightmaps"
# 3. Adicione um ReflectionProbe em cada salão com Update Mode = ONCE:

extends ReflectionProbe

func _ready() -> void:
    update_mode = ReflectionProbe.UPDATE_ONCE
    box_projection = true # Corrige a perspectiva do reflexo em salas retangulares!`,
        pros: "Iluminação indireta digna de filme com o menor custo de GPU possível em tempo de execução.",
        cons: "Não permite derrubar paredes do cenário ou girar o sol livremente durante a partida."
      },
      {
        title: "Forma 2: Interiores Dinâmicos Ricos com VoxelGI",
        whenToUse: "Cenas internas ou médias no Forward+, com luzes dinâmicas. Objetos móveis que precisam contribuir com GI devem usar GI Mode Dynamic, com custo adicional.",
        description: "Posicionamos a caixa do `VoxelGI` cobrindo a área da fase e clicamos em 'Bake VoxelGI'. Luzes e objetos com materiais emissivos iluminam as paredes em tempo real!",
        code: `extends VoxelGI

# Dica de Ouro com VoxelGI:
# Qualquer MeshInstance3D com StandardMaterial3D que tenha EMISSION ligada
# passa a iluminar de verdade as paredes vizinhas sem precisar de OmniLight3D!`,
        pros: "Materiais emissivos (tubos de éter, lava, letreiros) iluminam o cenário ao redor com reflexos coloridos reais.",
        cons: "Exige placa de vídeo dedicada (Forward+) e funciona dentro dos limites da caixa do VoxelGI."
      },
      {
        title: "Forma 3: Mundos Abertos com Ciclo Dia/Noite Dinâmico (SDFGI)",
        whenToUse: "Cenários externos amplos no Forward+, com geometria estática e luzes dinâmicas, como ciclos solares. Não trata oclusores e superfícies emissivas móveis como VoxelGI.",
        description: "Ativamos `sdfgi_enabled = true` no `WorldEnvironment` (com `sdfgi_use_occlusion = true` para evitar vazamento de luz em salas).",
        code: `extends WorldEnvironment

func ativar_iluminacao_global_mundo_aberto() -> void:
    if environment:
        environment.sdfgi_enabled = true
        environment.sdfgi_use_occlusion = true
        environment.sdfgi_read_sky_light = true`,
        pros: "Dispensa bake manual prévio e acompanha regiões do mundo. Alterar geometria estática perto da câmera pode exigir regenerar os dados; malhas móveis não contribuem como oclusores dinâmicos.",
        cons: "Tem custo fixo maior na GPU; ofereça uma chave nas opções gráficas para desligar em PCs de entrada."
      }
    ],
    simulator: {
      type: "gi_reflection_3d",
      title: "Laboratório de Iluminação Global (Luz Direta vs GI Rebatida + ReflectionProbe)",
      description: "Compare a mesma sala sob a mesma luz direta. Ative separadamente o rebatimento difuso da parede vermelha e o reflexo ambiente na esfera metálica. Observe a esfera fosca e o chão: a cor rebatida depende da posição, orientação e oclusão, e não de uma camada de cor sobre toda a imagem."
    },
    quiz: {
      question: "Você colocou várias engrenagens de latão (`metallic = 1.0`, `roughness = 0.1`) dentro de uma sala fechada sem janelas e elas ficaram quase pretas, mesmo com uma `OmniLight3D` na sala! Qual nó você deve adicionar na sala para que o metal tenha o que refletir?",
      options: [
        "ReflectionProbe (com `box_projection = true`)",
        "CharacterBody3D",
        "AudioStreamPlayer3D",
        "RayCast3D"
      ],
      correctIndex: 0,
      explanation: "Um ReflectionProbe pode fornecer reflexos locais das paredes da sala. Ele complementa a iluminação difusa, e não substitui os rebatimentos de GI. Sem uma sonda, outras fontes de reflexão podem ser usadas, como o céu, GI ou SSR; o metal ainda pode apresentar brilhos da luz direta."
    }
  },

  {
    id: "3d-pro-optimization-culling-lod",
    area: "3d",
    level: "profissional",
    levelLabel: "Profissional",
    title: "14. Otimização 3D Profissional (Occlusion Culling, LOD, VisibilityRange e MultiMesh3D)",
    subtitle: "Como manter 60+ FPS em cidades Steampunk densas escondendo o que está atrás das paredes e trocando modelos distantes automaticamente.",
    nodesUsed: ["OccluderInstance3D", "VisibilityRange (HLOD)", "MultiMeshInstance3D", "RenderingServer"],
    feynman: {
      title: "Explicação Feynman: O Mágico que Não Desenha o que Está Atrás da Parede e o Binóculo de Longe",
      explanation: "Como um jogo 3D gigante consegue mostrar uma cidade inteira com 500 prédios sem explodir o computador? Usando 3 truques de ilusionismo profissional! 1) **Frustum Culling** (já vem ligado de fábrica): a Godot não desenha o que está nas costas da câmera. 2) **Occlusion Culling (`OccluderInstance3D`)**: e se houver 50 máquinas detalhadas lá dentro de uma sala, mas a porta está fechada e há uma parede na sua frente? Com um `OccluderInstance3D` dentro da parede, a Godot percebe que a parede tapa a visão e **desliga o desenho de tudo que está atrás dela**! 3) **LOD (*Level of Detail*) e `VisibilityRange`**: quando uma estátua está a 2 metros de você, ela usa 10.000 triângulos; quando você se afasta a 80 metros, a Godot troca sozinha para uma versão de 300 triângulos — como ela está pequenininha lá longe, ninguém nota a diferença e sua GPU agradece!",
      analogies: [
        {
          term: "Occlusion Culling (OccluderInstance3D)",
          analogy: "Se você está olhando para um muro alto, não precisa desenhar os carros e lojas que estão escondidos atrás do muro!"
        },
        {
          term: "Auto-LOD de Malhas (Importação Godot 4)",
          analogy: "Na hora de importar qualquer `.glb`, a Godot 4 já cria versões mais leves da malha automaticamente e troca sozinha conforme a distância!"
        },
        {
          term: "VisibilityRange (visibility_range_begin / end)",
          analogy: "Chave de distância em metros em todo `GeometryInstance3D`: faz pequenos parafusos e detalhes sumirem suavemente (`Fade`) quando estão a mais de 25 metros!"
        },
        {
          term: "MultiMeshInstance3D",
          analogy: "Desenha 20.000 árvores, rebites, pedras ou canos repetidos em 1 único comando para a placa de vídeo (GPU Instancing)."
        }
      ]
    },
    howItWorks: {
      overview: "Para ativar o Occlusion Culling na Godot 4: 1) Marque `Rendering -> Occlusion Culling -> Use Occlusion Culling` nas Configurações do Projeto; 2) Adicione um nó `OccluderInstance3D` na cena e clique em **'Bake Occluders'** no topo da viewport (ou use primitivas `BoxOccluder3D` dentro das paredes grandes).",
      anatomy: [
        {
          prop: "OccluderInstance3D (Bake Occluders)",
          desc: "Gera a geometria simplificada que bloqueia a visão da câmera e descarta objetos escondidos atrás de paredes."
        },
        {
          prop: "visibility_range_end = 35.0 / fade_mode = FADE_SELF",
          desc: "Faz objetos decorativos pequenos desaparecerem suavemente além de 35 metros sem dar 'pop-in' brusco."
        },
        {
          prop: "MultiMeshInstance3D.multimesh",
          desc: "Agrupa milhares de instâncias idênticas (grama, parafusos, engrenagens, destroços) em um único Draw Call."
        },
        {
          prop: "Viewport -> Display Overdraw / Wireframe",
          desc: "Modos de diagnóstico no editor 3D para enxergar onde há excesso de triângulos ou transparências empilhadas."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Configurando Visibility Range (HLOD) com Fade Suave",
        whenToUse: "Objetos de decoração pequenos (ferramentas em cima de mesas, rebites, garrafas, grama) que não precisam ser renderizados a 100 metros.",
        description: "Definimos `visibility_range_end` e `visibility_range_fade_mode` direto no `MeshInstance3D`.",
        code: `extends MeshInstance3D

func _ready() -> void:
    # Esconde este detalhe mecânico quando a câmera estiver a mais de 30 metros
    visibility_range_end = 30.0
    visibility_range_end_margin = 5.0
    # Faz um fade-out suave nos últimos 5 metros para não sumir no susto!
    visibility_range_fade_mode = GeometryInstance3D.VISIBILITY_RANGE_FADE_SELF`,
        pros: "Corta drasticamente o número de objetos e sombras desenhados ao longe sem nenhum impacto visual perceptível.",
        cons: "Não aplique em paredes grandes que servem de cobertura ou referência de navegação."
      },
      {
        title: "Forma 2: Populando 5.000 Peças 3D em 1 Único Draw Call (MultiMeshInstance3D)",
        whenToUse: "Florestas, campos de destroços, rebites em pontes metálicas, cardumes ou multidões no fundo.",
        description: "Configuramos um `MultiMesh` com `transform_format = TRANSFORM_3D` e posicionamos cada instância por índice com `set_instance_transform(i, transform)`!",
        code: `extends MultiMeshInstance3D

@export var malha_peca: Mesh
@export var quantidade: int = 2000

func _ready() -> void:
    multimesh = MultiMesh.new()
    multimesh.transform_format = MultiMesh.TRANSFORM_3D
    multimesh.mesh = malha_peca
    multimesh.instance_count = quantidade
    
    for i in quantidade:
        var t := Transform3D()
        t.origin = Vector3(randf_range(-50, 50), 0.0, randf_range(-50, 50))
        t.basis = Basis(Vector3.UP, randf() * TAU)
        multimesh.set_instance_transform(i, t)`,
        pros: "Renderiza 2.000 a 50.000 malhas 3D gastando apenas 1 Draw Call na placa de vídeo!",
        cons: "As instâncias do MultiMesh não possuem física individual automática (para árvores, crie colisão apenas perto do jogador ou use blocos simples)."
      },
      {
        title: "Forma 3: Monitoramento de Performance em Tempo Real (Performance Singleton)",
        whenToUse: "Criar um painel de telemetria técnica (F3) dentro do próprio jogo para medir FPS, Draw Calls, VRAM e Física.",
        description: "O singleton nativo `Performance` expõe todas as métricas internas do motor da Godot em tempo real.",
        code: `extends Label

func _process(_delta: float) -> void:
    var fps := Engine.get_frames_per_second()
    var draw_calls := Performance.get_monitor(Performance.RENDER_TOTAL_DRAW_CALLS_IN_FRAME)
    var objetos := Performance.get_monitor(Performance.RENDER_TOTAL_OBJECTS_IN_FRAME)
    var vram_mb := Performance.get_monitor(Performance.RENDER_VIDEO_MEM_USED) / (1024.0 * 1024.0)
    
    text = "FPS: %d | Draw Calls: %d | Objetos 3D: %d | VRAM: %.1f MB" % [
        fps, draw_calls, objetos, vram_mb
    ]`,
        pros: "Permite diagnosticar gargalos reais em qualquer máquina de teste mesmo fora do Editor.",
        cons: "Atualize o texto a cada 0.25s se não precisar de leitura quadro a quadro."
      }
    ],
    simulator: {
      type: "occlusion_lod_3d",
      title: "Laboratório de Occlusion Culling, Frustum Culling & Nível de Detalhe (LOD)",
      description: "Gire o cone de visão da `Camera3D` pela fábrica, ligue/desligue o `OccluderInstance3D` (paredes bloqueadoras) e o `LOD` e observe quantos triângulos e Draw Calls são economizados!"
    },
    quiz: {
      question: "Qual técnica faz com que a Godot deixe de enviar para a placa de vídeo objetos 3D que estão dentro do ângulo da câmera, mas totalmente escondidos atrás de uma parede sólida?",
      options: [
        "Occlusion Culling (usando `OccluderInstance3D`)",
        "Normal Mapping",
        "BlendSpace2D",
        "Coyote Time"
      ],
      correctIndex: 0,
      explanation: "Exato! O *Frustum Culling* descarta o que está fora do cone da câmera, enquanto o *Occlusion Culling* (`OccluderInstance3D`) descarta tudo que está escondido atrás de paredes e obstáculos opacos!"
    }
  }
];
