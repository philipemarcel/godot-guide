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
  "id": "3d-inter-gridmap-decals",
  "area": "3d",
  "level": "intermediario",
  "levelLabel": "Intermediário",
  "title": "9. GridMap e Decal: módulos, células e projeção",
  "subtitle": "Monte uma biblioteca pequena, edite células em referenciais explícitos e limite onde uma marca pode aparecer.",
  "nodesUsed": [
    "GridMap",
    "MeshLibrary",
    "BoxMesh",
    "BoxShape3D",
    "Decal"
  ],
  "feynman": {
    "title": "O catálogo escolhe a peça; a grade escolhe o lugar",
    "explanation": "Imagine uma oficina com dois módulos: um bloco inteiro e um estreito. A MeshLibrary é o catálogo dessas peças. O GridMap guarda qual item ocupa cada endereço inteiro X/Y/Z e sua orientação. Trocar o endereço muda onde a peça está; trocar o ID muda qual peça será usada. Um Decal é outra operação: projeta uma textura sobre superfícies elegíveis dentro de um volume, sem criar geometria ou colisão. Organize primeiro os módulos e depois compare a marca, para não confundir construção e aparência.",
    "analogies": [
      {
        "term": "Endereço e catálogo",
        "analogy": "A célula (0,0,0) pode conter o item 7, o item 0 ou estar vazia. O número do catálogo não é a coordenada da célula, nem uma layer. No apoio, os IDs são deliberadamente não sequenciais."
      },
      {
        "term": "Módulo e corpo físico",
        "analogy": "Uma peça desenhada não é automaticamente sólida. A biblioteca precisa de formas físicas se a prática exigir colisão. Da mesma forma, navegação precisa de recursos/configuração próprios; não nasce só de pintar blocos."
      },
      {
        "term": "Marca projetada",
        "analogy": "Pense num volume que aplica uma imagem aos receptores permitidos. Dentro da caixa ainda pode haver texels transparentes. A projeção não precisa parar no primeiro objeto, nem é garantida em qualquer superfície ou renderizador."
      }
    ]
  },
  "howItWorks": {
    "overview": "Referência Godot 4.5. O projeto usa GridMap com células de 2 × 2 × 2 unidades, centros XYZ ligados, escala 1 e biblioteca procedural com itens 0 e 7. Decal requer Forward+ ou Mobile; Compatibility permite a parte da grade, mas não esse efeito. A cena é fixa, sem personagens ou navegação. Não há promessa de quantidade de draw calls ou ganho de desempenho sem medição.",
    "anatomy": [
      {
        "prop": "MeshLibrary: malha, ID e formas",
        "desc": "Cada item tem ID, malha/material e, opcionalmente, colisão e navegação. O apoio coloca material no recurso BoxMesh e adiciona BoxShape3D explicitamente. Na alternativa de exportação pelo editor, respeite a estrutura suportada; materiais só no override do nó não substituem o material da malha exportada."
      },
      {
        "prop": "Coordenada local, célula e centro",
        "desc": "local_to_map recebe posição local da grade; para ponto global, use to_local antes. map_to_local devolve a posição local da célula, convertida ao mundo com to_global. Com centros ligados, célula (0,0,0) tem centro (1,1,1). Coordenadas negativas exigem atenção: ponto local −0,01 no eixo X pertence à célula −1, não à 0."
      },
      {
        "prop": "Item e orientação ortogonal",
        "desc": "set_cell_item usa coordenada Vector3i, ID e índice de orientação; um ID negativo limpa a célula. O índice não é um ângulo em graus: crie uma Basis e use `get_orthogonal_index_from_basis`. A biblioteca é compartilhada entre usos dos itens; alterar a malha/recurso pode afetar várias células. GridMap agrupa células em octantes, sem garantir custo zero ou atualização física instantânea."
      },
      {
        "prop": "Volume, textura e receptor",
        "desc": "Decal projeta por −Y local. size define o volume completo; o anel RGBA do apoio possui centro transparente. cull_mask filtra layers visuais do receptor, não camadas físicas. GridMap não herda VisualInstance3D e não oferece layers visuais por célula; o objeto de layer 2 é um MeshInstance3D separado. A textura não cria relevo físico nem resolve oclusão como um raycast."
      },
      {
        "prop": "Fade e limites do efeito",
        "desc": "upper_fade/lower_fade controlam atenuação ao longo da profundidade; normal_fade trata ângulo e o alfa da textura trata seu desenho. Não são todos um fade de borda X/Z. modulate.a afeta albedo, mas não emissão. A prática anima só albedo, cancela Tween anterior e reutiliza a marca. Decal não é sempre superior a um plano e não garante projeção perfeita ou desempenho gratuito."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "A biblioteca e as operações de grade são RefCounted chamadas por oficina.gd. marca.gd estende Decal; o controlador instancia esse script e monta a interface. O apoio não requer InputMap nem arte externa. A função editar_impacto é extensão opcional: recebe um resultado físico válido, mas não instala uma ferramenta de clique pronta.",
    "duration": "70–95 min com comparação e repetição (estimativa)",
    "prerequisite": "Aulas 3D 1–8: transformações, malhas, física/consultas, materiais e luzes. Godot 4.5, GDScript, desktop. Forward+ ou Mobile para Decal. Scripts/cena revisados documentalmente; execução real no motor ainda pendente.",
    "objectives": [
      "Distinguir endereço de célula, ID do item, centro local/global e orientação ao editar um GridMap.",
      "Preparar biblioteca com material e forma física explícitos e verificar o resultado sem assumir sincronização imediata.",
      "Controlar projeção por volume/máscara/textura e repetir o fade, respeitando limites do renderizador e do alfa."
    ],
    "practice": {
      "title": "Prática guiada: módulos e anel de marcação",
      "intro": "Extraia o apoio completo e importe project.godot. A cena monta biblioteca, grade transformada, objeto cinza separado, marca e câmera. A base tem 25 células em Y=0 e um módulo em Y=1. As malhas são caixas simples. Comece com a marca estável, sem fade automático. A esfera amarela é indicação da seleção, sem colisão.",
      "tree": "Oficina (Node3D / oficina.gd; montagem em runtime)\n├── Grade (GridMap; posição 10,0,−4; yaw +90°)\n│   ├── MeshLibrary procedural: IDs 0 e 7\n│   │   └── BoxMesh/material + BoxShape3D por item\n│   └── Marca (Decal / marca.gd; projeção local −Y)\n├── ObjetoLayer2 (MeshInstance3D; sem corpo físico)\n├── SelecaoSemColisao (MeshInstance3D; layer visual 3)\n├── Camera3D atual, DirectionalLight3D e WorldEnvironment\n└── CanvasLayer / ScrollContainer / Interface\n\nbiblioteca.gd e grade.gd: bibliotecas RefCounted.\nCélulas 2×2×2; centros XYZ ligados; escala 1.\nA base ocupa Y=0; módulo extra em (0,1,0).",
      "download": {
        "url": "assets/aula-3d-09-gridmap-decal.zip",
        "label": "Baixar projeto de apoio: GridMap e Decal"
      },
      "downloadNote": "Nove arquivos, incluindo quatro scripts e roteiro. Forward+ como base; Decal indisponível em Compatibility. Execução no motor pendente.",
      "steps": [
        {
          "title": "Inspecione a biblioteca antes de pintar",
          "text": "Execute oficina.tscn e confira a árvore Remota. Abra mesh_library da Grade e inspecione os IDs 0 e 7: cubo de tamanho (2,2,2) e módulo (2,2,1), material na malha e forma BoxShape3D correspondente. O painel mostra o renderizador atual.",
          "expect": "Há peças distintas, com IDs explícitos e colisão configurada separadamente. Em Compatibility a grade permanece, mas a marca fica indisponível; não exigir Decal como prova de funcionamento nesse método."
        },
        {
          "title": "Preveja centro e endereço",
          "text": "Selecione célula (0,0,0), sem mover a grade, e compare local (1,1,1) com global (11,1,−5). A transformação tem translação (10,0,−4) e yaw +90°. Confira a volta com to_local e local_to_map. Teste também ponto local X=−0,01 e as fronteiras em múltiplos de 2.",
          "expect": "Uma posição global não entra diretamente em local_to_map. O centro não é necessariamente a origem inteira da célula. O exemplo negativo cai em X=−1. O laboratório desenha no referencial local; sua telemetria mostra a conversão global separadamente."
        },
        {
          "title": "Edite uma célula e uma camada por vez",
          "text": "Escolha item 7, célula (1,0,0), yaw 0 e Colocar. Repita a mesma operação; depois use yaw 90°, 180° e 270°. Remova a célula, visite Y=1 e volte. No Canvas, clique apenas seleciona; P coloca, X remove e Q/E trocam camada. Botões/sliders oferecem as mesmas ações essenciais.",
          "expect": "Recolocar substitui a célula, sem acumular novas instâncias nesse endereço. Remover não apaga outras camadas. A forma estreita torna o giro visível. O apoio converte Basis em índice ortogonal; o modelo web mostra quartos de volta, sem fingir calcular o índice nativo."
        },
        {
          "title": "Verifique a colisão como resultado separado",
          "text": "Após editar e aguardar atualização da grade, pressione Consultar física após edição. A consulta roda no callback físico e lança um raio de cima para baixo na coluna selecionada. Na coluna (0,*,0), remova primeiro o módulo superior, consulte novamente e depois remova o bloco da base.",
          "expect": "O primeiro hit pode pertencer a uma peça acima da camada selecionada. Após remover toda a coluna deve haver ausência de hit, quando a atualização estiver aplicada. O objeto cinza é só visual. Não declarar colisão atualizada instantaneamente por causa do retorno de set_cell_item ou de uma mensagem do painel."
        },
        {
          "title": "Isole volume, máscara e texel",
          "text": "Restaure e mantenha o projetor em centro local (1,2,1), tamanho (4,2,4). Compare máscara 1, 2, 3 e zero sobre grade e objeto separado. Depois mude centro Y e profundidade Y, sem alterar máscara. Desloque X para que o anel passe pela superfície em vez de seu centro transparente.",
          "expect": "Um receptor precisa estar no volume e passar pela máscara visual; depois o texel ainda pode ter alfa zero. Máscara 1 inclui a grade, 2 o objeto separado, 3 ambos e zero nenhum. Não é filtro físico. A projeção pode alcançar mais de uma superfície; não se apresenta como raycast que para no primeiro obstáculo."
        },
        {
          "title": "Repita o fade e cancele sem corrida",
          "text": "Pressione Repetir/F. A marca mantém albedo por 2 s e apaga em 1 s. Pressione de novo antes de terminar e também depois de desaparecer. Use Restaurar/R durante a animação e espere mais de 3 s. No Canvas, o tempo é manual: T avança 0,5 s e F volta a zero.",
          "expect": "Um Tween antigo não deve apagar uma marca reiniciada; R cancela e restaura. O nó é reutilizado, sem queue_free ou pooling nesta prática. Como só há albedo, o alfa atende ao exemplo. Se adicionar emissão, será necessário controlar sua energia separadamente."
        },
        {
          "title": "Compare com o fluxo do editor e registre limites",
          "text": "Como alternativa separada, crie cena Node3D com MeshInstance3D filhos, material na malha e StaticBody3D/CollisionShape3D na estrutura suportada; exporte em Scene > Export As > MeshLibrary. Confira o recurso resultante antes de atribuir ao GridMap. No laboratório, teste vazio, filtros, profundidade e reset antes de julgar a figura.",
          "expect": "A exportação de biblioteca não é um empacotador de quaisquer nós/scripts da cena. A prática entregue usa criação procedural, não comprova a execução dessa exportação. Navegação, otimização medida, normal/depth fades e projeção em relevo complexo exigem ensaios próprios."
        }
      ]
    },
    "checks": [
      {
        "question": "A célula (0,0,0), o item 7 e yaw 90° são a mesma coisa?",
        "answer": "Não. São endereço, chave do catálogo e orientação. set_cell_item recebe um índice ortogonal para a rotação, obtido de uma Basis; não recebe diretamente o número de graus."
      },
      {
        "question": "Por que local_to_map(ponto_global) pode editar a peça errada?",
        "answer": "A função espera um ponto no referencial local do GridMap. Transforme com to_local antes. Para levar o centro de uma célula ao mundo, combine map_to_local e to_global."
      },
      {
        "question": "Estar no volume do Decal garante ver o anel?",
        "answer": "Não. Renderizador, máscara visual, textura/alfa, orientação e parâmetros de fade também importam. O centro do anel é transparente. Não usar camadas físicas como se fossem layers visuais."
      },
      {
        "question": "Por que uma marca com emissão pode continuar brilhando após animar modulate.a?",
        "answer": "O alfa de modulate atua no albedo, não na emissão. O exemplo só usa albedo. Se houver textura emissiva, planeje também sua energia e teste a combinação; não generalize o fade deste apoio."
      }
    ],
    "pitfalls": [
      {
        "title": "O ID 7 não existe no meu catálogo",
        "text": "Confira get_item_list e o recurso atribuído; IDs não são índices sequenciais garantidos. A rotina de colocação valida a biblioteca antes de editar."
      },
      {
        "title": "A marca não aparece no Compatibility",
        "text": "Esse método não oferece Decal na Godot 4.5. Teste em Forward+ ou Mobile compatível com o hardware. Um plano/Sprite3D pode ser alternativa para superfícies quase planas, mas não oferece a mesma projeção volumétrica."
      },
      {
        "title": "Quero excluir só uma célula da máscara visual",
        "text": "GridMap não oferece layers visuais por célula. Separe o receptor em MeshInstance3D quando precisar de controle de layer como o objeto cinza desta prática. Não confundir ID do item com número da layer."
      },
      {
        "title": "A consulta ainda encontra a peça removida",
        "text": "Confira atualização da grade, ordem da consulta e se há outra peça na coluna. O apoio consulta a primeira superfície por comando no callback físico. Registre o resultado real; não suponha que a colisão já mudou no mesmo instante da edição."
      },
      {
        "title": "A marca atravessa ou corta uma superfície",
        "text": "Inspecione volume, direção local −Y, textura e filtros. A projeção pode afetar múltiplos receptores; depth/normal fades têm papéis próprios e podem precisar de ajuste. Não prometer adaptação perfeita a qualquer relevo."
      }
    ],
    "summary": "Separe catálogo, endereço e orientação. Configure material, colisão e navegação conforme sua necessidade e confira os referenciais. Decal projeta aparência sobre receptores elegíveis, com volume, máscara e textura; não cria geometria nem substitui consulta física.",
    "next": "Na aula 3D10, passe de módulos estáticos à animação de esqueletos e misturas. O cenário desta aula não implementa personagem, navegação ou bake de iluminação; esses temas não devem ser inferidos da presença de um GridMap.",
    "sources": [
      {
        "label": "GridMap: células, referenciais e orientações",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_gridmap.html"
      },
      {
        "label": "MeshLibrary: IDs, malhas e formas",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_meshlibrary.html"
      },
      {
        "label": "Montar/exportar GridMaps no editor",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/using_gridmaps.html"
      },
      {
        "label": "Decal: projeção, máscara e alfa",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_decal.html"
      },
      {
        "label": "Usar Decals e seus limites",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/using_decals.html"
      },
      {
        "label": "VisualInstance3D e layers",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_visualinstance3d.html"
      },
      {
        "label": "Node3D e transformações",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_node3d.html"
      },
      {
        "label": "Consultas de raycast",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/physics/ray-casting.html"
      },
      {
        "label": "Tween: cancelamento e ciclo de vida",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_tween.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Criar catálogo · biblioteca.gd",
      "whenToUse": "Preparar dois módulos com IDs, materiais e colisão explícitos.",
      "description": "Biblioteca RefCounted chamada pelo controlador. A forma física e a malha usam as mesmas dimensões; não há navegação embutida nem cena externa necessária.",
      "code": "extends RefCounted\n\nstatic func criar() -> MeshLibrary:\n    var biblioteca := MeshLibrary.new()\n    # Os IDs 0 e 7 são chaves, não índices sequenciais de um array.\n    for id: int in [0, 7]:\n        biblioteca.create_item(id)\n        biblioteca.set_item_name(id, \"Inteiro\" if id == 0 else \"Estreito\")\n        var mesh := BoxMesh.new()\n        mesh.size = Vector3(2, 2, 2) if id == 0 else Vector3(2, 2, 1)\n        var material := StandardMaterial3D.new()\n        material.albedo_color = Color(0.5, 0.3, 0.12) if id == 0 else Color(0.1, 0.4, 0.45)\n        material.roughness = 0.7\n        mesh.material = material # Material pertence à malha da biblioteca.\n        biblioteca.set_item_mesh(id, mesh)\n        biblioteca.set_item_mesh_transform(id, Transform3D.IDENTITY)\n        var forma := BoxShape3D.new()\n        forma.size = mesh.size\n        # Array alterna Shape3D e sua transformação local.\n        biblioteca.set_item_shapes(id, [forma, Transform3D.IDENTITY])\n    return biblioteca\n",
      "pros": "Dados mínimos suficientes para testar peças inteiras/estreitas.",
      "cons": "É uma biblioteca procedural; não equivale a testar exportação/importação no editor."
    },
    {
      "title": "2. Editar e converter · grade.gd",
      "whenToUse": "Colocar/remover com referência local/global e orientação controladas.",
      "description": "A interface principal edita por célula. editar_impacto é uma extensão que exige Dictionary de hit válido e collider correto. Epsilon ilustrativo para células de 2 u e escala unitária, sem garantia geral em bordas/cantos.",
      "code": "extends RefCounted\n\nstatic func configurar(grid: GridMap, biblioteca: MeshLibrary) -> void:\n    grid.mesh_library = biblioteca\n    grid.cell_size = Vector3(2, 2, 2)\n    grid.cell_scale = 1.0\n    grid.cell_center_x = true\n    grid.cell_center_y = true\n    grid.cell_center_z = true\n    grid.collision_layer = 1\n    grid.collision_mask = 1\n    grid.bake_navigation = false\n\nstatic func colocar(grid: GridMap, celula: Vector3i, id: int, quartos: int) -> bool:\n    if grid.mesh_library == null or not grid.mesh_library.get_item_list().has(id):\n        return false\n    var basis := Basis(Vector3.UP, posmod(quartos, 4) * PI / 2.0)\n    var orientacao := grid.get_orthogonal_index_from_basis(basis)\n    grid.set_cell_item(celula, id, orientacao)\n    return true\n\nstatic func remover(grid: GridMap, celula: Vector3i) -> void:\n    grid.set_cell_item(celula, GridMap.INVALID_CELL_ITEM)\n\nstatic func centro_global(grid: GridMap, celula: Vector3i) -> Vector3:\n    return grid.to_global(grid.map_to_local(celula))\n\nstatic func celula_global(grid: GridMap, ponto: Vector3) -> Vector3i:\n    return grid.local_to_map(grid.to_local(ponto))\n\n# Extensão opcional para resultado de raycast; a interface principal edita por célula.\n# O ponto e a normal devem estar em coordenadas globais e o collider ser este GridMap.\nstatic func editar_impacto(grid: GridMap, hit: Dictionary, adicionar: bool,\n        id: int = 0, quartos: int = 0) -> bool:\n    if hit.is_empty() or hit.get(\"collider\") != grid:\n        return false\n    if not hit.has(\"position\") or not hit.has(\"normal\"):\n        return false\n    var normal: Vector3 = hit[\"normal\"]\n    if normal.is_zero_approx():\n        return false\n    # Nesta prática, escala global unitária e células de 2 u.\n    var epsilon := grid.cell_size[grid.cell_size.min_axis_index()] * 0.001\n    var ponto: Vector3 = hit[\"position\"]\n    ponto += normal.normalized() * epsilon * (1.0 if adicionar else -1.0)\n    var celula := celula_global(grid, ponto)\n    if adicionar:\n        return colocar(grid, celula, id, quartos)\n    remover(grid, celula)\n    return true\n",
      "pros": "ID, endereço e índice de orientação separados.",
      "cons": "Nem o retorno booleano nem a edição visual comprovam sincronização imediata da física."
    },
    {
      "title": "3. Marca repetível · marca.gd",
      "whenToUse": "Testar um Decal de albedo com anel transparente e fade reiniciável.",
      "description": "Anexado ao Decal criado pelo controlador. Cria ImageTexture local, mantém por 2 s e apaga em 1 s somente quando solicitado. A marca persistente é reutilizada.",
      "code": "extends Decal\nvar animacao: Tween\n\nfunc textura_anel() -> Texture2D:\n    var imagem := Image.create(128, 128, false, Image.FORMAT_RGBA8)\n    for y in range(128):\n        for x in range(128):\n            var raio := (Vector2(x, y) + Vector2(0.5, 0.5) - Vector2(64, 64)).length() / 32.0\n            var alfa := 1.0 if raio >= 1.0 and raio <= 1.5 else 0.0\n            imagem.set_pixel(x, y, Color(0.2, 0.9, 1.0, alfa))\n    return ImageTexture.create_from_image(imagem)\n\nfunc _ready() -> void:\n    texture_albedo = textura_anel()\n    # Só albedo nesta prática: alfa de modulate não apaga emissão.\n    upper_fade = 0.0\n    lower_fade = 0.0\n    normal_fade = 0.0\n    distance_fade_enabled = false\n    restaurar()\n\nfunc restaurar() -> void:\n    if animacao != null and animacao.is_valid():\n        animacao.kill()\n    animacao = null\n    modulate = Color.WHITE\n\nfunc repetir() -> void:\n    restaurar() # Cancela a animação anterior antes de iniciar outra.\n    animacao = create_tween()\n    animacao.tween_interval(2.0)\n    animacao.tween_property(self, \"modulate:a\", 0.0, 1.0)\n    # A marca é reutilizada, não liberada; F pode repetir após desaparecer.\n",
      "pros": "Repetição cancela o Tween anterior; reset cancela e restaura.",
      "cons": "Alfa não controla emissão; sem normal/ORM, fade angular/profundidade ou pooling apresentados como prontos."
    },
    {
      "title": "4. Montar a oficina · oficina.gd",
      "whenToUse": "Executar cena, controles, câmera, fontes e consulta física.",
      "description": "Anexado ao Node3D raiz. A marca acompanha o referencial da grade, o objeto cinza é separado e o raio físico é agendado por comando. Confirmar o método atual no painel.",
      "code": "extends Node3D\nconst BIBLIOTECA = preload(\"res://biblioteca.gd\")\nconst GRADE = preload(\"res://grade.gd\")\nconst MARCA = preload(\"res://marca.gd\")\nvar grid: GridMap\nvar marca: MARCA\nvar objeto: MeshInstance3D\nvar selecao: MeshInstance3D\nvar painel: VBoxContainer\nvar leitura: Label\nvar resultado_fisico: Label\nvar sx: HSlider\nvar sy: HSlider\nvar sz: HSlider\nvar giro: HSlider\nvar dx: HSlider\nvar dy: HSlider\nvar profundidade: HSlider\nvar item: OptionButton\nvar mascara: OptionButton\nvar repetir_btn: Button\nvar consultar := false\n\nfunc celula() -> Vector3i:\n    return Vector3i(int(sx.value), int(sy.value), int(sz.value))\n\nfunc slider(titulo: String, minimo: float, maximo: float,\n        passo: float, valor: float) -> HSlider:\n    var texto := Label.new()\n    texto.text = titulo\n    painel.add_child(texto)\n    var s := HSlider.new()\n    s.min_value = minimo\n    s.max_value = maximo\n    s.step = passo\n    s.value = valor\n    s.custom_minimum_size.x = 340\n    painel.add_child(s)\n    s.value_changed.connect(func(_v: float): atualizar())\n    return s\n\nfunc botao(texto: String, acao: Callable) -> Button:\n    var b := Button.new()\n    b.text = texto\n    painel.add_child(b)\n    b.pressed.connect(acao)\n    return b\n\nfunc _ready() -> void:\n    grid = GridMap.new()\n    grid.name = \"Grade\"\n    grid.position = Vector3(10, 0, -4)\n    grid.rotation.y = PI / 2.0\n    add_child(grid)\n    GRADE.configurar(grid, BIBLIOTECA.criar())\n    marca = MARCA.new()\n    marca.name = \"Marca\"\n    grid.add_child(marca) # Transformações da grade afetam a marca também.\n    objeto = MeshInstance3D.new()\n    objeto.name = \"ObjetoLayer2\"\n    var mesh := BoxMesh.new()\n    mesh.size = Vector3.ONE\n    objeto.mesh = mesh\n    objeto.layers = 2 # Visual, independente de collision_layer.\n    objeto.position = grid.to_global(Vector3(1, 2, 1))\n    var mat := StandardMaterial3D.new()\n    mat.albedo_color = Color(0.6, 0.6, 0.6)\n    mat.roughness = 0.7\n    objeto.material_override = mat\n    add_child(objeto)\n    selecao = MeshInstance3D.new()\n    selecao.name = \"SelecaoSemColisao\"\n    var esfera := SphereMesh.new()\n    esfera.radius = 0.12\n    esfera.height = 0.24\n    selecao.mesh = esfera\n    var destaque := StandardMaterial3D.new()\n    destaque.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED\n    destaque.albedo_color = Color(1, 0.75, 0.2)\n    selecao.material_override = destaque\n    selecao.layers = 4 # Não participa das máscaras 1/2/3 do painel.\n    add_child(selecao)\n    var camera := Camera3D.new()\n    camera.position = grid.to_global(Vector3(12, 12, 16))\n    add_child(camera)\n    camera.look_at(grid.to_global(Vector3(1, 1, 1)), Vector3.UP)\n    camera.make_current()\n    var luz := DirectionalLight3D.new()\n    luz.rotation_degrees = Vector3(-50, -25, 0)\n    luz.shadow_enabled = true\n    add_child(luz)\n    var mundo := WorldEnvironment.new()\n    var e := Environment.new()\n    e.background_mode = Environment.BG_COLOR\n    e.background_color = Color(0.04, 0.03, 0.02)\n    e.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR\n    e.ambient_light_color = Color(0.7, 0.75, 0.8)\n    e.ambient_light_energy = 0.3\n    e.ambient_light_sky_contribution = 0.0\n    mundo.environment = e\n    add_child(mundo)\n    criar_interface()\n    restaurar()\n\nfunc criar_interface() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var scroll := ScrollContainer.new()\n    scroll.position = Vector2(16, 16)\n    scroll.size = Vector2(430, 900)\n    layer.add_child(scroll)\n    var fundo := PanelContainer.new()\n    scroll.add_child(fundo)\n    painel = VBoxContainer.new()\n    painel.add_theme_constant_override(\"separation\", 8)\n    fundo.add_child(painel)\n    leitura = Label.new()\n    leitura.custom_minimum_size.x = 370\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    painel.add_child(leitura)\n    sx = slider(\"Célula X\", -2, 2, 1, 0)\n    sy = slider(\"Camada Y\", 0, 2, 1, 0)\n    sz = slider(\"Célula Z\", -2, 2, 1, 0)\n    item = OptionButton.new()\n    item.add_item(\"ID 7 — estreito\", 7)\n    item.add_item(\"ID 0 — inteiro\", 0)\n    painel.add_child(item)\n    item.item_selected.connect(func(_v: int): atualizar())\n    giro = slider(\"Yaw da peça (quartos de volta)\", 0, 3, 1, 0)\n    botao(\"Colocar — P\", colocar)\n    botao(\"Remover célula — X\", remover)\n    dx = slider(\"Centro local X do projetor\", -3, 5, 0.5, 1)\n    dy = slider(\"Centro local Y do projetor\", 1, 5, 0.5, 2)\n    profundidade = slider(\"Profundidade Y do volume\", 0.5, 6, 0.5, 2)\n    mascara = OptionButton.new()\n    mascara.add_item(\"1 — GridMap\", 1)\n    mascara.add_item(\"2 — objeto separado\", 2)\n    mascara.add_item(\"3 — ambos\", 3)\n    mascara.add_item(\"0 — nenhum\", 0)\n    painel.add_child(mascara)\n    mascara.item_selected.connect(func(_v: int): atualizar())\n    repetir_btn = botao(\"Repetir marca: 2 s + fade 1 s — F\", repetir)\n    botao(\"Consultar física após edição\", func(): consultar = true)\n    resultado_fisico = Label.new()\n    resultado_fisico.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    painel.add_child(resultado_fisico)\n    botao(\"Restaurar cena — R\", restaurar)\n\nfunc atualizar() -> void:\n    if not is_instance_valid(repetir_btn):\n        return\n    var c := celula()\n    var local := grid.map_to_local(c)\n    var global := GRADE.centro_global(grid, c)\n    selecao.global_position = grid.to_global(local + Vector3(0, 1.2, 0))\n    marca.position = Vector3(dx.value, dy.value, 1)\n    marca.size = Vector3(4, profundidade.value, 4)\n    marca.cull_mask = mascara.get_selected_id()\n    var metodo := RenderingServer.get_current_rendering_method()\n    var suportado := metodo != \"gl_compatibility\"\n    marca.visible = suportado\n    repetir_btn.disabled = not suportado\n    leitura.text = (\"Método: %s\\nCélula %s | item %d | orientação %d\\n\"\n            + \"Centro local %s\\nCentro global %s\\nO desenho não altera colisões por si.\\n\"\n            + \"Decal: %s | máscara %d\\nCentro X %.1f Y %.1f | volume Y %.1f\\n\"\n            + \"Sem locomoção ou navegação. Restaure antes de repetir testes.\") % [\n            metodo, c, grid.get_cell_item(c), grid.get_cell_item_orientation(c),\n            local, global, \"disponível\" if suportado else \"indisponível em Compatibility\",\n            marca.cull_mask, dx.value, dy.value, profundidade.value]\n\nfunc colocar() -> void:\n    GRADE.colocar(grid, celula(), item.get_selected_id(), int(giro.value))\n    resultado_fisico.text = \"Edição solicitada. Aguarde atualização e consulte a física.\"\n    atualizar()\n\nfunc remover() -> void:\n    GRADE.remover(grid, celula())\n    resultado_fisico.text = \"Remoção solicitada. A sincronização física não é comprovada por este texto.\"\n    atualizar()\n\nfunc repetir() -> void:\n    if not repetir_btn.disabled:\n        marca.repetir()\n\nfunc restaurar() -> void:\n    consultar = false\n    grid.clear()\n    for x in range(-2, 3):\n        for z in range(-2, 3):\n            GRADE.colocar(grid, Vector3i(x, 0, z), 0, 0)\n    GRADE.colocar(grid, Vector3i(0, 1, 0), 7, 0)\n    sx.set_value_no_signal(0)\n    sy.set_value_no_signal(0)\n    sz.set_value_no_signal(0)\n    giro.set_value_no_signal(0)\n    dx.set_value_no_signal(1)\n    dy.set_value_no_signal(2)\n    profundidade.set_value_no_signal(2)\n    item.select(0)\n    mascara.select(0)\n    marca.restaurar()\n    resultado_fisico.text = \"Cena restaurada. Consulta física ainda não realizada.\"\n    atualizar()\n\nfunc _physics_process(_delta: float) -> void:\n    if not consultar:\n        return\n    consultar = false\n    var c := celula()\n    var p := grid.map_to_local(c)\n    var de := grid.to_global(Vector3(p.x, 8, p.z))\n    var ate := grid.to_global(Vector3(p.x, -2, p.z))\n    var query := PhysicsRayQueryParameters3D.create(de, ate, 1)\n    var hit := get_world_3d().direct_space_state.intersect_ray(query)\n    if hit.is_empty():\n        resultado_fisico.text = \"Raio: sem hit; apenas layer física 1.\"\n    else:\n        var pos: Vector3 = hit[\"position\"]\n        var normal: Vector3 = hit[\"normal\"]\n        var atingida := GRADE.celula_global(grid, pos - normal * 0.002)\n        resultado_fisico.text = \"Primeira superfície: célula %s, ponto %s. Pode haver peça acima da seleção.\" % [atingida, pos]\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo:\n        return\n    if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n        return\n    match event.keycode:\n        KEY_P: colocar()\n        KEY_X: remover()\n        KEY_F: repetir()\n        KEY_R: restaurar()\n        _: return\n    get_viewport().set_input_as_handled()\n",
      "pros": "Projeto completo com dependências e estados de reset explícitos.",
      "cons": "Scripts e cena precisam ser compilados/executados na Godot antes de homologar."
    },
    {
      "title": "5. Configuração e condições",
      "whenToUse": "Preparar o projeto e distinguir simulação web da cena real.",
      "description": "Leia com o roteiro de testes. Forward+/Mobile para Decal; biblioteca e grade podem ser conferidas sem esse efeito em Compatibility.",
      "code": "Godot 4.5, GDScript, desktop. Base Forward+; Decal também funciona em Mobile.\nCompatibility permite testar a grade, mas não renderiza Decal. O painel mostra\no método atual, inclusive após fallback. Não há substituto visual fingindo Decal.\nImportar project.godot e executar oficina.tscn. Tudo é montado em runtime.\nBiblioteca procedural: itens 0/7, BoxMesh + material na malha + BoxShape3D.\nCélulas 2x2x2, centros XYZ ligados, escala 1. Grade em (10,0,-4), yaw +90 graus.\nSem navegação/bake_navigation, personagens, InputMap ou assets externos.\nGridMap não é VisualInstance3D: não tem layers visuais por peça/célula.\nDecal mask 1 alcança o GridMap; objeto MeshInstance3D separado usa layer 2.\nAs camadas físicas da grade são outro filtro e não governam o Decal.\nDecal local -Y, volume (4, profundidade, 4), centro Z=1, anel albedo RGBA.\nupper/lower/normal fade zerados para comparação geométrica; filtro de textura\ndo renderer pode suavizar o anel. Centro do anel é transparente.\nmodulate.a anima somente albedo nesta prática; sem textura de emissão.\nMarca persistente: F espera 2s e apaga em 1s; repetir cancela Tween anterior.\nR cancela animação e restaura grade/controles/marca. Não há início automático.\nBotão de consulta física agenda raycast para callback físico. Após edição,\naguardar atualização; não confundir set_cell_item com colisão imediata garantida.\nO raio vertical consulta a primeira superfície, inclusive peças acima da seleção.\nExecução no motor ainda pendente; revisão documental não é homologação.\n",
      "language": "text",
      "pros": "Versão, escala, filtros e limites registrados.",
      "cons": "Não há medição de performance ou homologação do motor neste ambiente."
    }
  ],
  "simulator": {
    "type": "gridmap_decal_3d",
    "title": "Laboratório: editar células e filtrar a projeção",
    "description": "Modelo próprio Canvas/JS de grade por camadas, orientação por quartos de volta e projeção de um anel em superfícies horizontais. A segunda vista inspeciona amostras. Sem Godot, consulta física ou relevo complexo.",
    "guide": [
      {
        "title": "Edite pelo endereço",
        "text": "Há 25 células em Y=0 e uma em (0,1,0). Clique só seleciona, setas mudam X/Z e Q/E mudam camada. P coloca e X remove. Item 7 tem metade da profundidade; o giro mostra yaw 0/90/180/270, não índices ortogonais nativos."
      },
      {
        "title": "Separe receptor e texel",
        "text": "A caixa ciano é contorno do volume, não prova de marca aplicada. GridMap usa layer visual 1; objeto separado layer 2. Sua amostra fica em (1;2,5;1), sem ocultar a grade na vista do modelo. No volume e na máscara ainda pode haver texel transparente no centro do anel. Sem sombras/oclusão nem normal/depth fades."
      },
      {
        "title": "Controle o tempo manualmente",
        "text": "A marca mantém alfa 1 até 2 s e cai linearmente a zero em 3 s. O tempo não corre sozinho: use slider/T para avançar 0,5 s e F para repetir. R restaura grade, seleção, filtros e marca. Atalhos sem repetição/modificadores, só com foco no desenho; controles visíveis equivalentes. Ajustes funcionam em pausa."
      }
    ]
  },
  "quiz": {
    "question": "Na Godot 4.5, qual procedimento é coerente para editar módulos e limitar uma marca projetada?",
    "options": [
      "Converter ponto global para local antes de local_to_map, distinguir ID/orientação e usar volume/textura/máscara visual do Decal em Forward+ ou Mobile; GridMap não fornece layers visuais por célula.",
      "Passar 90 como índice de orientação, usar collision_layer para filtrar Decal e esperar que ele funcione em Compatibility.",
      "Usar o ID do item como layer visual da célula e considerar que qualquer ponto dentro da caixa terá textura opaca.",
      "Animar modulate.a para apagar automaticamente albedo e emissão e assumir colisão instantânea após set_cell_item."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Referenciais, dados da célula e critérios da projeção são contratos separados.",
      "Orientação usa índice ortogonal; Decal filtra layers visuais e não é suportado em Compatibility.",
      "ID e layer são dados distintos; GridMap não oferece layers visuais por célula e o texel pode ser transparente.",
      "Alfa de modulate não controla emissão; sincronização física precisa ser conferida no motor."
    ],
    "explanation": "Uma biblioteca visual/física bem definida não elimina a necessidade de validar o renderizador, os referenciais e os receptores da marca."
  }
},

{
  "id": "3d-adv-animationtree-skeleton",
  "area": "3d",
  "level": "avancado",
  "levelLabel": "Avançado",
  "title": "10. Skeleton3D e AnimationTree: poses, filtros e encaixes",
  "subtitle": "Preveja pesos num triângulo, separe a ação do braço da pose base e acompanhe um objeto preso à mão.",
  "nodesUsed": [
    "Skeleton3D",
    "AnimationPlayer",
    "AnimationLibrary",
    "AnimationTree",
    "AnimationNodeBlendSpace2D",
    "AnimationNodeOneShot",
    "BoneAttachment3D"
  ],
  "feynman": {
    "title": "O esqueleto organiza a pose; o grafo decide como misturá-la",
    "explanation": "Uma pose é uma configuração de transformações. O Skeleton3D organiza os ossos em hierarquia; o AnimationPlayer guarda os clipes e o AnimationTree avalia suas combinações. Um osso da mão herda a transformação do braço. Um objeto preso a essa mão pode acompanhar a pose sem deformar sua própria malha. Nesta oficina mecânica, começamos com peças rígidas e três poses constantes, para observar uma causa por vez antes de lidar com importação, pele deformável e ciclos de caminhada.",
    "analogies": [
      {
        "term": "Hierarquia e pele",
        "analogy": "As articulações organizam as partes, mas não dizem sozinhas como cada vértice de uma malha deve deformar. Um personagem com Skin e pesos exige uma ligação diferente das peças inteiras presas a anexos neste apoio."
      },
      {
        "term": "Triângulo de mistura",
        "analogy": "Cada vértice representa uma pose. Um ponto dentro do triângulo distribui participação entre essas três referências. O resultado depende dos vértices e da triangulação, não apenas da distância até o centro do gráfico."
      },
      {
        "term": "Encaixe na mão",
        "analogy": "O anexo fornece a transformação do osso. A ferramenta ainda precisa de um ajuste local de posição, rotação e escala conforme seu pivô. Local zero não é garantia de que qualquer modelo cairá na palma."
      }
    ]
  },
  "howItWorks": {
    "overview": "Referência Godot 4.5. O apoio cria seis ossos e peças rígidas, uma biblioteca com três poses constantes, RESET e uma ação de um segundo. Um BlendTree contém Mistura (BlendSpace2D), ClipeAcao e Acao (OneShot). A saída é avaliada manualmente. Não há personagem com Skin, locomoção, importação ou controlador de oito direções pronto.",
    "anatomy": [
      {
        "prop": "Rest, pose e espaço do esqueleto",
        "desc": "Rest é a referência inicial; pose descreve a transformação atual dos ossos. A chamada global pose do Skeleton3D ainda é relativa ao esqueleto, não necessariamente ao mundo. Skin e pesos ligam vértices aos ossos; BoneAttachment3D acompanha um osso com um nó inteiro. O rig desta prática não deforma vértices."
      },
      {
        "prop": "Biblioteca, pistas e raiz",
        "desc": "AnimationPlayer armazena AnimationLibrary/clipes; AnimationTree controla sua avaliação. Os paths Skeleton3D:osso são resolvidos a partir da raiz configurada. Não comandar as mesmas pistas por AnimationPlayer.play ou escrever pose por código ao mesmo tempo, esperando que não haja disputa. RESET explicita valores de referência."
      },
      {
        "prop": "Triângulo e parâmetros",
        "desc": "Mistura tem Parado(0,0), Passo(1,0), Lateral(0,1), com triângulo manual. O ponto (0,4;0,2) dá pesos 0,4/0,4/0,2. Nossa entrada positiva é dividida por max(1,X+Y) antes do grafo. Essa política não é a regra nativa para todos os pontos fora de triângulos. O path é `parameters/Mistura/blend_position`, com nomes exatos."
      },
      {
        "prop": "OneShot e filtro de pistas",
        "desc": "Acao recebe base em in e clipe temporário em shot; FIRE solicita reprodução, ABORT cancela e active é leitura de estado. O filtro seleciona a pista Skeleton3D:Braco_R. A mão acompanha a hierarquia, sem precisar de pista própria. Desligar filtro deixa o clipe afetar também as pernas que ele contém. Não é um toggle de animação em loop."
      },
      {
        "prop": "Anexo, movimento e limites",
        "desc": "BoneAttachment3D aponta para Mao_R com override_pose=false; EncaixeLocal desloca a ferramenta no referencial herdado. Animar a pose não desloca CharacterBody3D nem resolve colisão. Para velocidades em um eixo, BlendSpace1D pode bastar; locomoção multidirecional exige clipes e triangulação próprios. StateMachine é outro grafo, com caminhos e transições configurados; não há parameters/playback nesta raiz BlendTree."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "Quatro scripts montam rig, clipes, grafo e interface em runtime. As poses constantes isolam a mistura. O tempo é manual tanto no apoio quanto no modelo: T/botão avança 0,1 s. Não há importação externa prometida como pronta, nem ataque com física/dano.",
    "duration": "70–100 min com previsões e repetição (estimativa)",
    "prerequisite": "Aulas 3D 1–9: transformações, malhas, referenciais e separação entre visual/física. Godot 4.5, GDScript, Compatibility, desktop. Apoio conferido documentalmente; compilação/execução no motor pendentes.",
    "objectives": [
      "Distinguir hierarquia de ossos, pose, malha deformável e objeto rígido preso a um anexo.",
      "Prever pesos de três poses no triângulo e configurar paths/conexões da AnimationTree.",
      "Comparar uma ação filtrada com corpo todo, repetir/cancelar e ajustar o encaixe local da ferramenta."
    ],
    "practice": {
      "title": "Prática guiada: o manequim mecânico",
      "intro": "Extraia o projeto e importe project.godot. A cena cria um rig simples com peças rígidas e uma ferramenta. Parado, Passo e Lateral são nomes de poses constantes, não clipes de deslocamento. A câmera é fixa; não há física, Skin ou personagens externos. Comece sem ação, em pedido X=0/Y=0.",
      "tree": "Oficina (Node3D / oficina.gd; montagem em runtime)\n├── Skeleton3D\n│   ├── Raiz → Tronco → Braco_R → Mao_R (ossos)\n│   ├── Raiz → Perna_L / Perna_R (ossos)\n│   ├── Anexos das peças rígidas (BoneAttachment3D)\n│   └── SuporteMao (BoneAttachment3D; bone_name=Mao_R)\n│       └── EncaixeLocal → FerramentaRigida\n├── AnimationPlayer / AnimationLibrary\n│   └── Parado, Passo, Lateral, Acao e RESET\n├── AnimationTree / BlendTree\n│   ├── Mistura: triângulo Parado/Passo/Lateral\n│   └── Mistura → Acao(in); ClipeAcao → Acao(shot) → output\n├── Camera3D, luz e WorldEnvironment\n└── CanvasLayer / Interface\n\nOssos são dados no Skeleton3D, não nós filhos da SceneTree.\nSem Skin/pesos: malhas inteiras acompanham anexos.",
      "download": {
        "url": "assets/aula-3d-10-animacao-esqueleto.zip",
        "label": "Baixar projeto de apoio: poses, filtro e encaixe"
      },
      "downloadNote": "Nove arquivos, incluindo quatro scripts e roteiro. Tudo criado localmente; execução no motor ainda pendente.",
      "steps": [
        {
          "title": "Reconheça o rig e a biblioteca",
          "text": "Execute oficina.tscn e inspecione a árvore Remota. No Skeleton3D confira seis ossos, pais e rest transforms. Abra a biblioteca do AnimationPlayer: três poses constantes, ação sem loop e RESET. O AnimationTree aponta para esse player e usa raiz BlendTree.",
          "expect": "Peças rígidas acompanham anexos; não há Skin ou deformação de vértices. Ossos não aparecem como nós independentes na SceneTree. A biblioteca contém os dados e o grafo decide a combinação."
        },
        {
          "title": "Preveja os pesos antes de olhar a pose",
          "text": "Compare pedidos (0,0), (1,0), (0,1) e (0,4;0,2). Identifique o triângulo e seus vértices. Depois peça (1,1) e confira que o controlador envia (0,5;0,5), dividindo pela soma. No Canvas, o quadrado indica pedido e o ponto ciano indica o valor aplicado.",
          "expect": "Pesos nos vértices são exclusivos. Em (0,4;0,2), Parado=0,4, Passo=0,4 e Lateral=0,2. Em pedido (1,1), aplicado (0,5;0,5), Parado=0. Não usar norma do vetor como se ela determinasse todos os pesos do BlendSpace2D."
        },
        {
          "title": "Confira as conexões e os nomes",
          "text": "Abra o grafo criado: Mistura entra em Acao pela porta in; ClipeAcao entra por shot; Acao entra em output. Confira o filtro da pista Skeleton3D:Braco_R e o path parameters/Mistura/blend_position. Os paths de Acao/request e Acao/active pertencem ao OneShot deste grafo.",
          "expect": "Um nó desconectado da saída não contribui. Os nomes precisam coincidir em código e grafo. parameters/playback só faria sentido com a StateMachine e o caminho adequados; essa estrutura não existe automaticamente."
        },
        {
          "title": "Dispare e avance sem perder o momento",
          "text": "Escolha X=0,4/Y=0,2, pressione F ou Disparar e depois T cinco vezes. Não há avanço automático. Observe a leitura active da árvore e a ação em torno da metade do clipe. Continue até terminar; dispare novamente e cancele com C. Na Godot, o contador indica comandos, não tempo de parede.",
          "expect": "A ação é temporária e repetível. Sua solicitação é consumida pela árvore, enquanto active informa o estado real. Ajustar X/Y não deve fazer o tempo correr. Os fades nativos são 0,1 s e precisam ser conferidos no motor, sem exigir igualdade com o modelo angular web."
        },
        {
          "title": "Compare o filtro sem mudar a base",
          "text": "Repita até aproximadamente 0,5 s com filtro somente braço. Compare as pernas com a pose sem ação. Desligue o filtro e repita nas mesmas entradas. O clipe Acao contém pistas zeradas nas pernas justamente para tornar a comparação observável.",
          "expect": "Com filtro, as pistas das pernas continuam vindo da base; sem filtro, elas podem ser substituídas pelo clipe da ação. Mao_R acompanha o braço por herança, sem adicionar uma pista de mão só para fazê-la acompanhar."
        },
        {
          "title": "Ajuste o encaixe no espaço local",
          "text": "Mantenha a ação no meio e compare offsets 0, 0,2 e 0,5. Observe o nó EncaixeLocal e o pivô da ferramenta. Repita em outra pose. Reinicie com F durante uma ação e use R antes do final; depois avance novamente.",
          "expect": "O deslocamento acompanha a orientação da mão. Zero não garante encaixe de qualquer recurso. Repetir processa ABORT antes de FIRE; R cancela a ação e restaura os parâmetros. Confirmar no motor que nenhuma ação antiga reaparece."
        },
        {
          "title": "Transfira o raciocínio com limites claros",
          "text": "Explique como substituir estas poses por clipes reais. Num personagem importado, confira malha/Skin/pesos, rest pose, nomes, trilhas, escala e loops. Para locomover, complete o gráfico e alimente o parâmetro com velocidade no referencial escolhido, mantendo deslocamento e colisão no controlador.",
          "expect": "Esta oficina não é um sistema pronto de oito direções, importação/retarget, root motion ou troca de armas. Suavização também é outra decisão: se usar lerp dependente de delta, prefira um fator limitado ou exponencial, não 10×delta sem considerar passos grandes. Registre esses aprofundamentos antes de assumir que estão implementados."
        }
      ]
    },
    "checks": [
      {
        "question": "Por que o mesmo ponto pode produzir pesos diferentes em outro BlendSpace2D?",
        "answer": "Porque vértices, posições e triangulação definem a mistura. Os pesos apresentados pertencem ao triângulo desta prática, não a uma fórmula universal baseada na distância ao centro."
      },
      {
        "question": "Uma malha no mesmo nó Skeleton3D já tem deformação de pele?",
        "answer": "Não. A malha deformável precisa da ligação de Skin/pesos e de recursos compatíveis. As peças desta oficina são rígidas, presas a BoneAttachment3D; isso não valida importação ou skinning."
      },
      {
        "question": "Por que as pernas mudam quando desligo o filtro da ação?",
        "answer": "O clipe Acao também contém pistas de pernas. Sem o filtro, elas entram na ação e podem substituir a base. Com o filtro apenas Braco_R é afetado; Mao_R acompanha a hierarquia."
      },
      {
        "question": "Por que local zero não garante que a ferramenta está na palma?",
        "answer": "O anexo fornece a transformação do osso, mas o pivô/orientação/tamanho do asset podem exigir um Transform local de encaixe. O ajuste deve ser inspecionado em várias poses, não só em repouso."
      }
    ],
    "pitfalls": [
      {
        "title": "Alterei o parâmetro e nada aconteceu",
        "text": "Confira root_node, anim_player, clipes, grafo conectado ao output e nome exato do path. O apoio avalia manualmente; alterar parâmetros chama advance(0), e T avança a ação. Não copiar parameters/Locomocao de outro grafo sem criar esse nó."
      },
      {
        "title": "O OneShot não termina ou nunca repete",
        "text": "Confira loop do clipe, autorestart e porta shot. O apoio tem clipe de 1 s, sem loop, e exige avanço manual. Repetição consome cancelamento antes de disparar; o comportamento real deve ser conferido na Godot."
      },
      {
        "title": "O braço parece disputar com meu script",
        "text": "Não escreva a pose do mesmo osso em paralelo à árvore sem uma política de ordem/modificação. Para ajustes procedurais avançados, estudar a etapa de modificadores é um aprofundamento separado."
      },
      {
        "title": "Misturei poses, mas o personagem não anda",
        "text": "Este exemplo não possui controlador físico. Pose visual, velocidade, deslocamento e root motion são decisões distintas. Os clipes constantes servem à comparação, não formam passos locomotores completos."
      },
      {
        "title": "O acessório segue a mão, mas está deslocado",
        "text": "Confira bone_name, esqueleto pai/externo, override_pose e Transform local de encaixe. Não corrigir um pivô inadequado presumindo que posição local zero serve para todos os modelos."
      }
    ],
    "summary": "Confira referências, nomes e trilhas antes de misturar. Pesos dependem do triângulo; filtros limitam quais pistas a ação substitui. Um anexo acompanha o osso, mas o asset ainda precisa de encaixe local. A animação visual não é o controlador de movimento.",
    "next": "A aula 3D11 passa à navegação e aos contratos de caminho/agente. Importação com Skin, retarget, ciclos completos, StateMachine, root motion e equipamento ficam como aprofundamentos a avaliar após revisar todo o currículo.",
    "sources": [
      {
        "label": "Skeleton3D: rest e pose",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_skeleton3d.html"
      },
      {
        "label": "Animation e pistas de rotação",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_animation.html"
      },
      {
        "label": "AnimationLibrary",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_animationlibrary.html"
      },
      {
        "label": "AnimationTree e conexões",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/animation/animation_tree.html"
      },
      {
        "label": "BlendSpace2D: triângulos",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_animationnodeblendspace2d.html"
      },
      {
        "label": "AnimationNode: filtros",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_animationnode.html"
      },
      {
        "label": "OneShot: requests e estado",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_animationnodeoneshot.html"
      },
      {
        "label": "BoneAttachment3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_boneattachment3d.html"
      },
      {
        "label": "AnimationMixer: avanço manual",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_animationmixer.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Hierarquia e anexos · rig.gd",
      "whenToUse": "Inspecionar ossos e objetos rígidos sem depender de importação.",
      "description": "Biblioteca RefCounted chamada pelo controlador. Rest e pais explícitos; anexos copiam pose com override_pose=false. EncaixeLocal permite ajustar a ferramenta.",
      "code": "extends RefCounted\n\nstatic func osso(s: Skeleton3D, nome: String, pai: int, origem: Vector3) -> int:\n    var id := s.add_bone(nome)\n    if pai >= 0:\n        s.set_bone_parent(id, pai)\n    s.set_bone_rest(id, Transform3D(Basis.IDENTITY, origem))\n    return id\n\nstatic func peca(s: Skeleton3D, nome_osso: String, tamanho: Vector3,\n        offset: Vector3, cor: Color) -> BoneAttachment3D:\n    var anexo := BoneAttachment3D.new()\n    anexo.name = \"Anexo_\" + nome_osso\n    s.add_child(anexo)\n    anexo.bone_name = nome_osso\n    anexo.override_pose = false\n    var mesh := BoxMesh.new()\n    mesh.size = tamanho\n    var instancia := MeshInstance3D.new()\n    instancia.mesh = mesh\n    instancia.position = offset\n    var mat := StandardMaterial3D.new()\n    mat.albedo_color = cor\n    mat.roughness = 0.6\n    instancia.material_override = mat\n    anexo.add_child(instancia)\n    return anexo\n\nstatic func criar(pai: Node3D) -> Dictionary:\n    var s := Skeleton3D.new()\n    s.name = \"Skeleton3D\"\n    pai.add_child(s)\n    var raiz := osso(s, \"Raiz\", -1, Vector3.ZERO)\n    var tronco := osso(s, \"Tronco\", raiz, Vector3(0, 1.1, 0))\n    var braco := osso(s, \"Braco_R\", tronco, Vector3(0.35, 0.35, 0))\n    osso(s, \"Mao_R\", braco, Vector3(0.7, 0, 0))\n    osso(s, \"Perna_L\", raiz, Vector3(-0.2, 1.1, 0))\n    osso(s, \"Perna_R\", raiz, Vector3(0.2, 1.1, 0))\n    s.reset_bone_poses()\n    peca(s, \"Tronco\", Vector3(0.6, 0.75, 0.3), Vector3(0, 0.35, 0), Color(0.6, 0.4, 0.16))\n    peca(s, \"Braco_R\", Vector3(0.7, 0.12, 0.15), Vector3(0.35, 0, 0), Color(0.1, 0.7, 0.75))\n    peca(s, \"Perna_L\", Vector3(0.15, 1, 0.18), Vector3(0, -0.5, 0), Color(0.6, 0.4, 0.16))\n    peca(s, \"Perna_R\", Vector3(0.15, 1, 0.18), Vector3(0, -0.5, 0), Color(0.6, 0.4, 0.16))\n    var mao := BoneAttachment3D.new()\n    mao.name = \"SuporteMao\"\n    s.add_child(mao)\n    mao.bone_name = \"Mao_R\"\n    mao.override_pose = false\n    var encaixe := Node3D.new()\n    encaixe.name = \"EncaixeLocal\"\n    mao.add_child(encaixe)\n    var ferramenta := MeshInstance3D.new()\n    ferramenta.name = \"FerramentaRigida\"\n    var mesh := BoxMesh.new()\n    mesh.size = Vector3(0.7, 0.08, 0.12)\n    ferramenta.mesh = mesh\n    ferramenta.position.x = 0.35\n    encaixe.add_child(ferramenta)\n    # Sem Skin ou pesos: cada peça inteira acompanha um anexo.\n    return {\"skeleton\": s, \"encaixe\": encaixe}\n",
      "pros": "Hierarquia e offset local visíveis.",
      "cons": "Não há Skin/pesos ou deformação de malha; não valida personagem importado."
    },
    {
      "title": "2. Biblioteca de poses · clipes.gd",
      "whenToUse": "Criar referências constantes e uma ação temporária controlada.",
      "description": "Cada pose contém pistas das pernas e braço. A ação contém as mesmas pistas para permitir comparar filtro ligado/desligado. Não são ciclos de caminhada.",
      "code": "extends RefCounted\nconst OSSOS = [\"Perna_L\", \"Perna_R\", \"Braco_R\"]\n\nstatic func pista(a: Animation, osso: String, tempos: Array, angulos: Array) -> void:\n    var i := a.add_track(Animation.TYPE_ROTATION_3D)\n    a.track_set_path(i, NodePath(\"Skeleton3D:\" + osso))\n    for k in range(tempos.size()):\n        a.rotation_track_insert_key(i, tempos[k], Quaternion(Vector3.FORWARD, -angulos[k]))\n    # FORWARD é -Z; sinal negativo equivale a giro positivo em +Z.\n\nstatic func pose(angulos: Array) -> Animation:\n    var a := Animation.new()\n    a.length = 1.0\n    a.loop_mode = Animation.LOOP_LINEAR\n    for i in range(OSSOS.size()):\n        pista(a, OSSOS[i], [0.0, 1.0], [angulos[i], angulos[i]])\n    return a\n\nstatic func criar(player: AnimationPlayer) -> void:\n    var biblioteca := AnimationLibrary.new()\n    biblioteca.add_animation(\"Parado\", pose([0.0, 0.0, 0.0]))\n    biblioteca.add_animation(\"Passo\", pose([-0.35, 0.35, 0.1]))\n    biblioteca.add_animation(\"Lateral\", pose([0.45, 0.45, -0.25]))\n    var reset := pose([0.0, 0.0, 0.0])\n    reset.loop_mode = Animation.LOOP_NONE\n    biblioteca.add_animation(\"RESET\", reset)\n    var acao := Animation.new()\n    acao.length = 1.0\n    acao.loop_mode = Animation.LOOP_NONE\n    pista(acao, \"Braco_R\", [0.0, 0.5, 1.0], [0.0, 1.2, 0.0])\n    pista(acao, \"Perna_L\", [0.0, 1.0], [0.0, 0.0])\n    pista(acao, \"Perna_R\", [0.0, 1.0], [0.0, 0.0])\n    biblioteca.add_animation(\"Acao\", acao)\n    player.add_animation_library(\"\", biblioteca)\n    # Três POSES constantes para isolar pesos, não três ciclos de caminhada.\n",
      "pros": "Clipes e caminhos completos; RESET explícito.",
      "cons": "Rotações nativas usam quaternions; o Canvas usa aproximação angular separada."
    },
    {
      "title": "3. Triângulo e OneShot · grafo.gd",
      "whenToUse": "Construir o BlendTree com nomes e conexões verificáveis.",
      "description": "Triângulo manual de três poses, portas in/shot e output. A política de limitar entrada ocorre antes da árvore; não descreve o comportamento nativo fora do triângulo.",
      "code": "extends RefCounted\n\nstatic func animacao(nome: StringName) -> AnimationNodeAnimation:\n    var a := AnimationNodeAnimation.new()\n    a.animation = nome\n    return a\n\nstatic func criar() -> AnimationNodeBlendTree:\n    var raiz := AnimationNodeBlendTree.new()\n    var mistura := AnimationNodeBlendSpace2D.new()\n    mistura.auto_triangles = false\n    mistura.min_space = Vector2.ZERO\n    mistura.max_space = Vector2.ONE\n    mistura.blend_mode = AnimationNodeBlendSpace2D.BLEND_MODE_INTERPOLATED\n    mistura.add_blend_point(animacao(\"Parado\"), Vector2.ZERO)\n    mistura.add_blend_point(animacao(\"Passo\"), Vector2(1, 0))\n    mistura.add_blend_point(animacao(\"Lateral\"), Vector2(0, 1))\n    mistura.add_triangle(0, 1, 2)\n    var acao := AnimationNodeOneShot.new()\n    acao.autorestart = false\n    acao.fadein_time = 0.1\n    acao.fadeout_time = 0.1\n    acao.mix_mode = AnimationNodeOneShot.MIX_MODE_BLEND\n    acao.filter_enabled = true\n    acao.set_filter_path(NodePath(\"Skeleton3D:Braco_R\"), true)\n    raiz.add_node(\"Mistura\", mistura, Vector2(0, 0))\n    raiz.add_node(\"ClipeAcao\", animacao(\"Acao\"), Vector2(0, 180))\n    raiz.add_node(\"Acao\", acao, Vector2(250, 0))\n    raiz.connect_node(\"Acao\", 0, \"Mistura\")\n    raiz.connect_node(\"Acao\", 1, \"ClipeAcao\")\n    raiz.connect_node(\"output\", 0, \"Acao\")\n    return raiz\n\nstatic func limitar(pedido: Vector2) -> Vector2:\n    var p := pedido.clamp(Vector2.ZERO, Vector2.ONE)\n    return p / maxf(1.0, p.x + p.y)\n    # Política radial desta bancada, aplicada ANTES de enviar ao BlendSpace.\n",
      "pros": "Paths e máscara de pista coerentes com os clipes.",
      "cons": "Sem StateMachine, oito direções ou clipes importados configurados."
    },
    {
      "title": "4. Comandos e avanço · oficina.gd",
      "whenToUse": "Executar a bancada com parâmetros, repetição, cancelamento e reset.",
      "description": "Anexado ao Node3D raiz. Avaliação manual por advance; nenhuma chamada AnimationPlayer.play disputa as pistas. O contador acompanha passos solicitados, não mede tempo de parede.",
      "code": "extends Node3D\nconst RIG = preload(\"res://rig.gd\")\nconst CLIPES = preload(\"res://clipes.gd\")\nconst GRAFO = preload(\"res://grafo.gd\")\nvar arvore: AnimationTree\nvar encaixe: Node3D\nvar painel: VBoxContainer\nvar leitura: Label\nvar x: HSlider\nvar y: HSlider\nvar offset: HSlider\nvar filtro: CheckButton\nvar tempo := 0.0\n\nfunc slider(texto: String, minimo: float, maximo: float, passo: float, valor: float) -> HSlider:\n    var l := Label.new()\n    l.text = texto\n    painel.add_child(l)\n    var s := HSlider.new()\n    s.min_value = minimo\n    s.max_value = maximo\n    s.step = passo\n    s.value = valor\n    s.custom_minimum_size.x = 340\n    painel.add_child(s)\n    s.value_changed.connect(func(_v: float): atualizar())\n    return s\n\nfunc botao(texto: String, acao: Callable) -> void:\n    var b := Button.new()\n    b.text = texto\n    painel.add_child(b)\n    b.pressed.connect(acao)\n\nfunc _ready() -> void:\n    var dados := RIG.criar(self)\n    encaixe = dados[\"encaixe\"]\n    var player := AnimationPlayer.new()\n    player.name = \"AnimationPlayer\"\n    player.root_node = NodePath(\"..\")\n    add_child(player)\n    CLIPES.criar(player)\n    arvore = AnimationTree.new()\n    arvore.name = \"AnimationTree\"\n    add_child(arvore)\n    arvore.anim_player = NodePath(\"../AnimationPlayer\")\n    arvore.root_node = NodePath(\"..\")\n    arvore.tree_root = GRAFO.criar()\n    arvore.callback_mode_process = AnimationMixer.ANIMATION_CALLBACK_MODE_PROCESS_MANUAL\n    arvore.active = true\n    var camera := Camera3D.new()\n    camera.position = Vector3(3.5, 2.8, 5)\n    add_child(camera)\n    camera.look_at(Vector3(0.5, 1.3, 0), Vector3.UP)\n    camera.make_current()\n    var luz := DirectionalLight3D.new()\n    luz.rotation_degrees = Vector3(-45, -30, 0)\n    add_child(luz)\n    var mundo := WorldEnvironment.new()\n    var e := Environment.new()\n    e.background_mode = Environment.BG_COLOR\n    e.background_color = Color(0.04, 0.03, 0.02)\n    e.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR\n    e.ambient_light_color = Color.WHITE\n    e.ambient_light_energy = 0.3\n    e.ambient_light_sky_contribution = 0.0\n    mundo.environment = e\n    add_child(mundo)\n    criar_interface()\n    restaurar()\n\nfunc criar_interface() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var fundo := PanelContainer.new()\n    fundo.position = Vector2(16, 16)\n    layer.add_child(fundo)\n    painel = VBoxContainer.new()\n    painel.add_theme_constant_override(\"separation\", 10)\n    fundo.add_child(painel)\n    leitura = Label.new()\n    leitura.custom_minimum_size.x = 380\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    painel.add_child(leitura)\n    x = slider(\"Pedido X — pose Passo\", 0, 1, 0.05, 0)\n    y = slider(\"Pedido Y — pose Lateral\", 0, 1, 0.05, 0)\n    offset = slider(\"Offset local da ferramenta (u)\", 0, 0.5, 0.05, 0.2)\n    filtro = CheckButton.new()\n    filtro.text = \"Filtrar somente Braco_R\"\n    filtro.button_pressed = true\n    painel.add_child(filtro)\n    filtro.toggled.connect(func(_v: bool): atualizar())\n    botao(\"Disparar / repetir — F\", disparar)\n    botao(\"Avançar 0,1 s — T\", avancar)\n    botao(\"Cancelar ação — C\", cancelar)\n    botao(\"Restaurar — R\", restaurar)\n\nfunc atualizar() -> void:\n    if not is_instance_valid(filtro):\n        return\n    var p := GRAFO.limitar(Vector2(x.value, y.value))\n    arvore.set(\"parameters/Mistura/blend_position\", p)\n    var raiz := arvore.tree_root as AnimationNodeBlendTree\n    var acao := raiz.get_node(\"Acao\") as AnimationNodeOneShot\n    acao.filter_enabled = filtro.button_pressed\n    encaixe.position = Vector3(offset.value, 0, 0)\n    arvore.advance(0.0)\n    leitura.text = (\"Tempo MANUAL %.1f s\\nPedido (%.2f, %.2f) → aplicado %s\\n\"\n            + \"Pesos previstos: %.3f / %.3f / %.3f\\nOneShot ativo: %s\\n\"\n            + \"Peças rígidas, sem Skin ou locomoção.\\nX/Y não são posição no mundo.\") % [\n            tempo, x.value, y.value, p, 1.0 - p.x - p.y, p.x, p.y,\n            arvore.get(\"parameters/Acao/active\")]\n\nfunc cancelar() -> void:\n    arvore.set(\"parameters/Acao/request\", AnimationNodeOneShot.ONE_SHOT_REQUEST_ABORT)\n    arvore.advance(0.0) # Consumir o cancelamento antes de possível FIRE.\n    tempo = 0.0\n    atualizar()\n\nfunc disparar() -> void:\n    cancelar()\n    arvore.set(\"parameters/Acao/request\", AnimationNodeOneShot.ONE_SHOT_REQUEST_FIRE)\n    arvore.advance(0.0)\n    atualizar()\n\nfunc avancar() -> void:\n    tempo = snappedf(tempo + 0.1, 0.1)\n    arvore.advance(0.1)\n    atualizar()\n\nfunc restaurar() -> void:\n    x.set_value_no_signal(0)\n    y.set_value_no_signal(0)\n    offset.set_value_no_signal(0.2)\n    filtro.set_pressed_no_signal(true)\n    cancelar()\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo:\n        return\n    if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n        return\n    match event.keycode:\n        KEY_F: disparar()\n        KEY_T: avancar()\n        KEY_C: cancelar()\n        KEY_R: restaurar()\n        _: return\n    get_viewport().set_input_as_handled()\n",
      "pros": "Momento da ação inspecionável e repetível.",
      "cons": "Compilação e comportamento real das solicitações/fades ainda precisam de execução no motor."
    },
    {
      "title": "5. Configuração e escopo",
      "whenToUse": "Conferir recursos, paths e o que a prática não implementa.",
      "description": "Leia com o roteiro de testes; projeto local sem assets externos ou InputMap.",
      "code": "Godot 4.5, GDScript, Compatibility, desktop. Importar project.godot.\nOficina.tscn contém só a raiz; oficina.gd cria a cena em runtime.\nSem GLB, Skin, pesos de vértices, física, root motion, retarget ou InputMap.\nSeis ossos: Raiz, Tronco, Braco_R, Mao_R, Perna_L e Perna_R.\nMalhas rígidas via BoneAttachment3D, override_pose=false. Ferramenta no\nanexo da mão, com EncaixeLocal e offset próprio. Não é uma malha deformável.\nClipes Parado/Passo/Lateral são POSES constantes de um segundo em loop;\nnão formam ciclos de caminhada ou um controlador de oito direções.\nAcao é clipe de um segundo sem loop, com pistas de braço e pernas.\nRESET fornece valores de referência para as pistas usadas.\nAnimationPlayer armazena a biblioteca; AnimationTree controla a avaliação.\nBlendTree: Mistura -> Acao(in); ClipeAcao -> Acao(shot); Acao -> output.\nMistura: triângulo explícito Parado(0,0), Passo(1,0), Lateral(0,1).\nPedido limitado ao quadrante e dividido por max(1,X+Y) antes do grafo.\nCaminhos são sensíveis aos nomes: parameters/Mistura/blend_position e\nparameters/Acao/request; filtro da pista Skeleton3D:Braco_R.\nTodo o avanço é MANUAL: botão/T chama advance(0.1). Ajustar chama advance(0).\nF consome ABORT antes de FIRE; C cancela; R restaura parâmetros/ação.\nO comportamento real dessas solicitações deve ser conferido no motor.\nFiltro ligado preserva pistas das pernas da mistura. Desligado permite\nao clipe Acao substituir também as pernas. Fades nativos de 0,1 s.\nNão escrever a rotação dos mesmos ossos por código enquanto a árvore os anima.\nStateMachine não é a raiz deste grafo; parameters/playback não existe aqui.\nSe adicionar StateMachine, configurar estados/transições e conferir seu caminho.\nProjeto revisado documentalmente; compilação/execução na Godot pendentes.\n",
      "language": "text",
      "pros": "Dependências e limites explícitos.",
      "cons": "Conferência documental não homologa o runtime."
    }
  ],
  "simulator": {
    "type": "blendspace_2d_3d",
    "title": "Laboratório: pesos, ação filtrada e ferramenta",
    "description": "Modelo próprio de três poses num triângulo e hierarquia angular em plano 2D. Tempo manual; não executa o mixer de quaternions, Skin ou AnimationTree Godot.",
    "guide": [
      {
        "title": "Preveja os três pesos",
        "text": "Parado(0,0), Passo(1,0), Lateral(0,1). A entrada é dividida por max(1,X+Y) antes de calcular (1−X−Y;X;Y). O quadrado indica pedido e o ponto ciano aplicado. Sliders ou WASD/setas ajustam parâmetros; não há arraste nem movimento no mundo."
      },
      {
        "title": "Dispare e avance",
        "text": "F inicia/reinicia, T avança 0,1 s, C cancela e R restaura. Nada avança sozinho, inclusive fora da pausa. A ação dura 1 s; aproximação própria de envelope/fades. Com filtro só braço, pernas preservam base; sem filtro podem ir à pose da ação."
      },
      {
        "title": "Observe a hierarquia",
        "text": "A mão é filha do braço e o offset da ferramenta é local. Ponta = mão + rotação do braço × (offset + comprimento). A vista é plana, com partes rígidas; não comprova skinning ou encaixe em outro asset. Atalhos somente com foco, sem repetição/modificadores; há botões equivalentes."
      }
    ]
  },
  "quiz": {
    "question": "No triângulo Parado(0,0), Passo(1,0), Lateral(0,1), qual interpretação de pedido (0,4;0,2) e ação filtrada é correta?",
    "options": [
      "Pesos 0,4/0,4/0,2; filtrar a pista do braço pode preservar a base das pernas, e a ferramenta ainda precisa de ajuste local no anexo da mão.",
      "O peso de Parado é sempre 1 menos o comprimento do vetor; a triangulação não importa.",
      "FIRE mantém a ação em loop até outra chamada e modifiquei a pose, então CharacterBody3D se move automaticamente.",
      "BoneAttachment3D cria Skin/pesos e garante que qualquer ferramenta em local zero fique encaixada na palma."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Pesos, filtro de pistas e encaixe local são contratos distintos.",
      "A distância ao centro não determina pesos gerais; neste triângulo os pesos são baricêntricos.",
      "OneShot é temporário conforme clipe/configuração; pose não é deslocamento físico.",
      "Anexo acompanha transformação; não cria skinning nem garante pivô/orientação do asset."
    ],
    "explanation": "A soma dos pesos é 1 no triângulo. O filtro controla pistas da ação, enquanto a hierarquia e o Transform local controlam o acessório."
  }
},

{
  "id": "3d-adv-navmesh-ai",
  "area": "3d",
  "level": "avancado",
  "levelLabel": "Avançado",
  "title": "11. Navegação 3D: malha, rota e travessia de links",
  "subtitle": "Separe onde o centro pode passar, qual caminho foi encontrado e quem realmente move o corpo.",
  "nodesUsed": [
    "NavigationRegion3D",
    "NavigationMesh",
    "NavigationAgent3D",
    "NavigationLink3D",
    "CharacterBody3D"
  ],
  "feynman": {
    "title": "Um caminho é uma orientação; atravessá-lo exige um controlador",
    "explanation": "Na oficina, dois pisos estão separados por um fosso. O autômato precisa de três decisões: onde pode apoiar o centro do corpo, por quais pontos seguir e como atravessar a interrupção. A malha descreve a superfície permitida; o agente consulta e acompanha o caminho; o controlador aplica movimento e colisão. Um link acrescenta uma ligação lógica entre pontos. Ele não cria piso, impulso, animação ou elevador.",
    "analogies": [
      {
        "term": "Malha para o centro",
        "analogy": "Imagine riscar uma faixa no chão afastada das bordas. O centro do robô segue a faixa, enquanto seu corpo ocupa espaço ao redor. O bake aproxima essa margem conforme parâmetros e resolução: não é certificado de passagem em qualquer cenário."
      },
      {
        "term": "Rota e chegada",
        "analogy": "Uma rota pode terminar no ponto mais próximo que ainda pertence à ilha acessível. Isso significa fim de caminho, mas não chegada ao endereço pedido. Compare explicitamente os dois estados."
      },
      {
        "term": "Conexão e execução",
        "analogy": "O mapa pode dizer que uma passarela móvel conecta duas salas, mas alguém ainda precisa esperar, embarcar e desembarcar. O link declara a possibilidade; uma regra de jogo realiza a travessia."
      }
    ]
  },
  "howItWorks": {
    "overview": "Referência Godot 4.5. A prática usa dois pisos planos, uma região com duas ilhas de NavigationMesh e um link. Ao abrir, o projeto faz bake e espera sincronização; R inicia um percurso repetível. O arco de travessia é controlado pelo nosso script. Não há perseguidor contínuo, salto balístico, rampas, escadas, elevador ou avoidance implementados.",
    "anatomy": [
      {
        "prop": "Fonte → bake → mapa sincronizado",
        "desc": "NavigationRegion3D recebe um NavigationMesh. Nesta prática a fonte são StaticBody3D filhos, com máscara física 1; meshes decorativas e o personagem não entram no bake. Confira polígonos e conexões com navegação visível. bake_finished informa conclusão do bake; antes de consultar, a atualização precisa chegar ao mapa. O apoio espera mudança de map_get_iteration_id e não libera movimento com mapa vazio."
      },
      {
        "prop": "Três raios com responsabilidades distintas",
        "desc": "NavigationMesh.agent_radius influencia a margem do próximo bake. NavigationAgent3D.radius pertence ao avoidance. CapsuleShape3D.radius pertence à colisão. Alterar um não redimensiona os outros. agent_height, agent_max_slope e agent_max_climb são critérios do bake, não poderes novos de CharacterBody3D: degraus aceitos pela malha ainda exigem controlador que consiga percorrê-los."
      },
      {
        "prop": "Destino global e seguidor físico",
        "desc": "Atribua target_position em coordenadas globais por comando. Para alvo móvel, escolha limiar/cadência conforme o jogo, em vez de refazer a rota a cada frame sem necessidade. No passo físico ativo, obtenha o próximo ponto uma vez; projete a diferença no plano XZ e normalize depois. Preserve gravidade em Y e use move_and_slide também ao parar. Distâncias de avanço/chegada precisam combinar com velocidade e frequência física."
      },
      {
        "prop": "Link, sentido, camadas e metadados",
        "desc": "O link precisa alcançar polígonos pelas duas pontas, dentro do raio de conexão, e compartilhar navigation_layers com a consulta. bidirectional=false só permite start→end. link_reached depende dos metadados; o apoio usa INCLUDE_ALL e valida link_exit_position. O callback apenas guarda dados; o passo físico suspende o seguidor e executa a travessia. Concluir a navegação não garante is_target_reached."
      },
      {
        "prop": "Atualização e desvio local",
        "desc": "Bake com on_thread=true não elimina parsing na thread principal, custo nem espera por sincronização. Mudanças de geometria exigem atualizar a malha; um portão pode pedir outro desenho de regiões/links. NavigationObstacle3D pode afetar bake conforme affect_navigation_mesh e carve_navigation_mesh ou velocidades de avoidance. Mover um obstáculo não refaz automaticamente a rota. Para RVO, habilite avoidance, envie velocity e consuma velocity_computed; colisão e bordas continuam exigindo atenção. Esta prática mantém RVO desligado."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "Três scripts fornecidos criam a oficina, o corpo e a interface. Leia na ordem cenário → agente → comandos. Primeiro preveja o resultado, depois execute e compare. Browser e Godot têm propósitos diferentes: o laboratório analítico avança manualmente; o apoio usa física em tempo real após o comando.",
    "duration": "70–100 min com previsões e testes (estimativa)",
    "prerequisite": "Aulas 3D 1–10: referenciais, CharacterBody3D, colisões e separação de animação/movimento; aula 2D12 ajuda na distinção rota/seguidor. Godot 4.5, GDScript, Compatibility, desktop. Execução no motor ainda pendente.",
    "objectives": [
      "Distinguir parâmetros de bake, avoidance e colisão, identificando quando a malha precisa ser atualizada.",
      "Seguir pontos globais no plano XZ, preservando gravidade e diferenciando fim alcançável de alvo alcançado.",
      "Configurar sentido e conexão de um link e explicar o contrato de uma travessia executada pelo controlador."
    ],
    "practice": {
      "title": "Prática guiada: duas plataformas na oficina",
      "intro": "Extraia e importe project.godot. A cena raiz monta os nós em runtime; inspecione a árvore Remote. O primeiro bake é automático, mas o movimento só começa com R/botão. Pisos coplanares com topo Y=0: esquerda X[-6,-1], direita X[1,6], Z[-2,2]. Origem(-4,0,0), alvo(4,0,0), link(-2,0,0)→(2,0,0).",
      "tree": "Oficina (Node3D / oficina.gd)\n├── Regiao (NavigationRegion3D / NavigationMesh)\n│   ├── PisoEsquerdo (StaticBody3D, layer 1)\n│   │   └── CollisionShape3D + MeshInstance3D\n│   └── PisoDireito (StaticBody3D, layer 1)\n│       └── CollisionShape3D + MeshInstance3D\n├── Travessia (NavigationLink3D, navigation_layers 1)\n├── Automato (CharacterBody3D / agente.gd)\n│   ├── CollisionShape3D (cápsula raio  0,3 / altura 1,6)\n│   ├── MeshInstance3D\n│   └── NavigationAgent3D (avoidance desligado)\n├── Camera3D + DirectionalLight3D + WorldEnvironment\n└── CanvasLayer / Interface\n\nCenário montado por cenario.gd; nós não são filhos salvos no .tscn.",
      "download": {
        "url": "assets/aula-3d-11-navegacao-links.zip",
        "label": "Baixar projeto de apoio: navegação e travessia"
      },
      "downloadNote": "Oito arquivos locais, três scripts e roteiro de testes. Compilação/execução na Godot pendentes.",
      "steps": [
        {
          "title": "Identifique os três contratos",
          "text": "Antes de executar, localize o raio 0,4 do NavigationMesh, raio 0,3 de NavigationAgent3D e cápsula 0,3. Preveja qual muda a malha e qual muda o corpo. Leia fonte STATIC_COLLIDERS e máscara 1.",
          "expect": "Bake, avoidance e colisão são independentes. A fonte inclui os dois pisos sob a região; o personagem fora dela não é assado junto. O raio do agente não muda a cápsula nem abre espaço na rota."
        },
        {
          "title": "Confira bake e sincronização",
          "text": "Execute, aguarde polígonos >0 e habilite Debug → Visible Navigation. Observe duas ilhas. Leia bake_finished e a espera pela iteração do mapa. Não iniciar consulta dentro de _ready assumindo mapa pronto.",
          "expect": "O controlador libera comandos após dados válidos e atualização do mapa. Se não sincronizar, a mensagem conserva a pendência. Malha vazia é diagnóstico de fontes/parâmetros, não confirmação de que o alvo foi alcançado."
        },
        {
          "title": "Percorra e repita a referência",
          "text": "Com raio 0,4, link bidirecional e executor presente, use R. Observe seguir → travessia → seguir → parado. Repita após chegar e no meio do arco. Use C para restaurar posição mantendo opções.",
          "expect": "O agente segue no plano XZ; o código especial assume o movimento na travessia e o devolve ao seguidor. R não depende de recarregar a página/cena. O arco tem 1,2s/altura 1,2 e teste de movimento; não é salto físico geral."
        },
        {
          "title": "Separe fim e chegada",
          "text": "Desligue o link, aguarde atualização e repita. Compare o último ponto alcançável com o alvo na outra ilha. Depois ligue sentido único, inverta origem/destino e repita nas duas direções.",
          "expect": "Sem ligação, o agente pode chegar ao fim da ilha acessível sem chegar ao alvo. is_navigation_finished e is_target_reached respondem perguntas diferentes. Sentido único permite start→end, não o retorno."
        },
        {
          "title": "Retire o executor sem retirar a ligação",
          "text": "Volte ao link bidirecional e desmarque executor. R deve levar à entrada e parar. Confira flags/metadados e por que o callback só guarda dados. Reative o executor e reinicie.",
          "expect": "A rota existe, mas o link não produz salto. O contrato evita deixar o seguidor caminhar pelo fosso. Sem link_exit_position válido, o apoio para com diagnóstico em vez de inventar uma saída."
        },
        {
          "title": "Mude um raio e observe o que realmente mudou",
          "text": "No laboratório web, mude o raio solicitado sem B: a margem aplicada deve permanecer anterior. Aplique B e compare 0,2/0,4/1,2. Na Godot faça novo bake e observe a malha real, células, polígonos e pontas do link.",
          "expect": "O browser encolhe retângulos exatamente e compara distância da ponta com 0,15u; é modelo próprio. Recast usa voxelização e arredondamentos e pode dar limites diferentes. Raio menor que a cápsula não garante passagem segura; raio maior pode deixar pontas sem conexão."
        },
        {
          "title": "Transfira com cautela para uma cena real",
          "text": "Explique como trataria alvo móvel, degrau, porta dinâmica e vários agentes. Revise o roteiro do apoio. Se adicionar RVO, envie velocidade e use velocity_computed, sem afirmar que isso troca a rota ou garante colisão. Meça antes de prometer bake sem engasgos.",
          "expect": "Critérios do bake precisam combinar com a capacidade física. Atualizar geometria, caminho e velocidade são etapas distintas. Rampas/escadas, avoidance completo, plataformas móveis e salto balístico precisam de implementações e testes próprios."
        }
      ]
    },
    "checks": [
      {
        "question": "Aumentei NavigationAgent3D.radius. Por que o caminho ainda passa perto da borda?",
        "answer": "Esse raio pertence ao avoidance. Para reservar espaço ao centro no pathfinding, configure a margem do NavigationMesh e refaça o bake, mantendo colisão e tamanho reais coerentes."
      },
      {
        "question": "A navegação terminou, então o alvo foi alcançado?",
        "answer": "Não necessariamente. O último ponto do caminho pode ser o mais próximo ainda alcançável. Compare is_target_reached e o alvo solicitado; não trate fim de caminho como sucesso automático."
      },
      {
        "question": "O link tem caminho, mas o robô cai no fosso. O que falta?",
        "answer": "Uma travessia executável pelo controlador. Suspenda o seguidor, valide entrada/saída e execute a ação adequada; depois retome. O nó de link não cria salto ou plataforma."
      },
      {
        "question": "Por que o bake em outra thread ainda pode causar engasgos?",
        "answer": "A coleta de fontes e sincronizações podem custar tempo na thread principal, além do trabalho de bake. O resultado também precisa atualizar o mapa. Reduza/organize fontes, meça e considere setores conforme o cenário."
      }
    ],
    "pitfalls": [
      {
        "title": "Rota vazia no início",
        "text": "Confira fontes, máscara física, navegação visível, camadas e sincronização. Um frame arbitrário de espera não substitui confirmar que a atualização necessária chegou ao mapa."
      },
      {
        "title": "Autômato anda e volta",
        "text": "Evite redefinir o mesmo destino a cada frame. Ajuste path_desired_distance e target_desired_distance à velocidade e passo físico; avalie overshoot e tamanho dos segmentos."
      },
      {
        "title": "Velocidade horizontal menor numa rampa",
        "text": "Não normalize o vetor3D e só depois descarte Y. Projete no plano XZ e normalize, preservando gravidade separada. Isso não resolve por si só escadas/degraus."
      },
      {
        "title": "Link desenhado, mas não utilizado",
        "text": "Confira enabled, sentido, navigation_layers, distâncias ponta-polígono e raio de busca. Para receber dados, confira path_metadata_flags/owner; não faça consulta recursiva no callback."
      },
      {
        "title": "Mudei o raio/obstáculo e a rota não mudou",
        "text": "O raio do bake só vale após atualização da malha. Avoidance ajusta velocidades localmente e não é rebake automático; obstáculo de bake precisa ser configurado/incluído. Não confundir colisão visível com topologia de navegação."
      }
    ],
    "summary": "A malha descreve onde o centro pode ir; o agente gerencia caminho e avanço; o controlador move e colide. Fim alcançável pode ficar longe do alvo. Um link só funciona como travessia de jogo quando existe código que a executa e devolve o controle ao seguidor.",
    "next": "A aula 3D12 passa a shaders espaciais e partículas. Após revisar todo o currículo, avaliar aprofundamentos em movimento sobre degraus, RVO, alvos móveis e links dinâmicos.",
    "sources": [
      {
        "label": "Godot4.5 — malhas de navegação e bake",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/navigation/navigation_using_navigationmeshes.html"
      },
      {
        "label": "NavigationMesh — parâmetros e fontes",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_navigationmesh.html"
      },
      {
        "label": "NavigationAgents — seguir e avoidance",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/navigation/navigation_using_navigationagents.html"
      },
      {
        "label": "NavigationAgent3D — estados, sinais e metadados",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_navigationagent3d.html"
      },
      {
        "label": "NavigationLinks — ligação e execução",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/navigation/navigation_using_navigationlinks.html"
      },
      {
        "label": "NavigationLink3D — sentido e pontas",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_navigationlink3d.html"
      },
      {
        "label": "NavigationServer3D — sincronização",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_navigationserver3d.html"
      },
      {
        "label": "NavigationObstacle3D — bake e avoidance",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_navigationobstacle3d.html"
      },
      {
        "label": "NavigationMeshGenerator — custos de parsing",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_navigationmeshgenerator.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Pisos e fonte do bake · cenario.gd",
      "whenToUse": "Montar a referência mínima antes de seguir caminhos.",
      "description": "Duas plataformas com colisão sob uma região; máscara de fontes explícita. O raio só influencia um bake posterior.",
      "code": "extends RefCounted\n\nstatic func caixa(pai: Node3D, nome: String, centro: Vector3, tamanho: Vector3) -> void:\n    var corpo := StaticBody3D.new()\n    corpo.name = nome\n    corpo.position = centro\n    corpo.collision_layer = 1\n    pai.add_child(corpo)\n    var forma := CollisionShape3D.new()\n    var box := BoxShape3D.new()\n    box.size = tamanho\n    forma.shape = box\n    corpo.add_child(forma)\n    var visual := MeshInstance3D.new()\n    var malha := BoxMesh.new()\n    malha.size = tamanho\n    visual.mesh = malha\n    var material := StandardMaterial3D.new()\n    material.albedo_color = Color(0.35, 0.25, 0.12)\n    visual.material_override = material\n    corpo.add_child(visual)\n\nstatic func criar(pai: Node3D) -> NavigationRegion3D:\n    var regiao := NavigationRegion3D.new()\n    regiao.name = \"Regiao\"\n    regiao.navigation_layers = 1\n    var malha := NavigationMesh.new()\n    malha.cell_size = 0.1\n    malha.cell_height = 0.1\n    malha.agent_radius = 0.4\n    malha.agent_height = 1.8\n    malha.agent_max_climb = 0.25\n    malha.agent_max_slope = 45.0\n    malha.geometry_parsed_geometry_type = NavigationMesh.PARSED_GEOMETRY_STATIC_COLLIDERS\n    malha.geometry_collision_mask = 1\n    malha.region_min_size = 0.0\n    regiao.navigation_mesh = malha\n    pai.add_child(regiao)\n    caixa(regiao, \"PisoEsquerdo\", Vector3(-3.5, -0.25, 0), Vector3(5, 0.5, 4))\n    caixa(regiao, \"PisoDireito\", Vector3(3.5, -0.25, 0), Vector3(5, 0.5, 4))\n    return regiao\n",
      "pros": "Geometria, máscara e resolução inspecionáveis.",
      "cons": "Cenário plano; não valida rampas, tetos ou degraus."
    },
    {
      "title": "2. Seguidor e travessia · agente.gd",
      "whenToUse": "Separar caminho, gravidade e ação especial.",
      "description": "Destino por comando; consulta no passo físico; callback guarda metadados; arco suspende o seguidor e verifica colisão.",
      "code": "extends CharacterBody3D\nvar nav: NavigationAgent3D\nvar estado := \"parado\"\nvar executor := true\nvar pendente: Dictionary = {}\nvar inicio := Vector3.ZERO\nvar fim := Vector3.ZERO\nvar tempo := 0.0\nvar mensagem := \"Aguardando mapa.\"\nconst VELOCIDADE := 2.0\nconst DURACAO := 1.2\n\nfunc _ready() -> void:\n    nav = NavigationAgent3D.new()\n    nav.name = \"NavigationAgent3D\"\n    nav.navigation_layers = 1\n    nav.path_desired_distance = 0.2\n    nav.target_desired_distance = 0.2\n    nav.path_max_distance = 3.0\n    nav.path_metadata_flags = NavigationPathQueryParameters3D.PATH_METADATA_INCLUDE_ALL\n    nav.avoidance_enabled = false\n    nav.radius = 0.3 # Apenas avoidance; NÃO muda o bake nem a cápsula.\n    nav.debug_enabled = true\n    add_child(nav)\n    nav.link_reached.connect(_link_reached)\n    var col := CollisionShape3D.new()\n    var shape := CapsuleShape3D.new()\n    shape.radius = 0.3\n    shape.height = 1.6\n    col.shape = shape\n    col.position.y = 0.8\n    add_child(col)\n    var mesh := MeshInstance3D.new()\n    var capsule := CapsuleMesh.new()\n    capsule.radius = 0.3\n    capsule.height = 1.6\n    mesh.mesh = capsule\n    mesh.position.y = 0.8\n    add_child(mesh)\n\nfunc preparar(origem: Vector3, alvo: Vector3, com_executor: bool) -> void:\n    estado = \"parado\"\n    pendente.clear()\n    global_position = origem\n    velocity = Vector3.ZERO\n    executor = com_executor\n    tempo = 0.0\n    nav.target_position = alvo # Uma atribuição por comando, não por frame.\n    mensagem = \"Pronto. Iniciar/repetir libera o movimento.\"\n\nfunc _link_reached(detalhes: Dictionary) -> void:\n    # Só guarda metadados. Não consultar caminho dentro do callback.\n    pendente = detalhes.duplicate()\n\nfunc _physics_process(delta: float) -> void:\n    if estado == \"travessia\":\n        tempo = minf(DURACAO, tempo + delta)\n        var u := tempo / DURACAO\n        var desejado := inicio.lerp(fim, u) + Vector3.UP * (1.2 * sin(PI * u))\n        var colisao := move_and_collide(desejado - global_position)\n        if colisao != null:\n            estado = \"parado\"\n            mensagem = \"Travessia bloqueada por colisão; reinicie e inspecione.\"\n        elif u >= 1.0:\n            estado = \"seguir\"\n            velocity = Vector3.ZERO\n        return\n    velocity.x = 0.0\n    velocity.z = 0.0\n    if not is_on_floor():\n        velocity += get_gravity() * delta\n    if estado == \"seguir\":\n        var mapa := nav.get_navigation_map()\n        if NavigationServer3D.map_get_iteration_id(mapa) == 0:\n            mensagem = \"Mapa ainda não sincronizado.\"\n        elif nav.is_navigation_finished():\n            estado = \"parado\"\n            mensagem = \"Alvo alcançado.\" if nav.is_target_reached() else \"Fim alcançável; alvo não alcançado.\"\n        else:\n            var proximo := nav.get_next_path_position() # Uma consulta por passo físico ativo.\n            if not pendente.is_empty():\n                if not executor:\n                    estado = \"parado\"\n                    mensagem = \"Link encontrado; sem executor de travessia.\"\n                elif pendente.has(\"link_exit_position\"):\n                    inicio = global_position\n                    fim = pendente[\"link_exit_position\"]\n                    # Os pisos desta oficina têm superfície y=0; só este cenário é suportado.\n                    fim.y = 0.0\n                    tempo = 0.0\n                    velocity = Vector3.ZERO\n                    estado = \"travessia\"\n                    mensagem = \"Controlador executando arco; não é impulso balístico.\"\n                else:\n                    estado = \"parado\"\n                    mensagem = \"Metadados de saída ausentes; conferir owner/flags.\"\n                pendente.clear()\n                return\n            var diferenca := proximo - global_position\n            diferenca.y = 0.0\n            var direcao := diferenca.normalized()\n            var rapidez := minf(VELOCIDADE, diferenca.length() / maxf(delta, 0.0001))\n            velocity.x = direcao.x * rapidez\n            velocity.z = direcao.z * rapidez\n            mensagem = \"Seguindo caminho; gravidade separada do plano XZ.\"\n    move_and_slide() # Também parado ou sem caminho: gravidade não fica suspensa.\n    if global_position.y < -5.0:\n        estado = \"parado\"\n        mensagem = \"Queda detectada; reinicie e confira bake/colisão/travessia.\"\n",
      "pros": "Estados e diagnóstico de fim/chegada explícitos.",
      "cons": "Arco próprio para estes pisos; não calcula salto balístico, elevador ou RVO."
    },
    {
      "title": "3. Bake, sincronização e repetição · oficina.gd",
      "whenToUse": "Executar e repetir comparações sem recarregar a cena.",
      "description": "Interface local, bake serializado, atualização de link e espera de iteração. Física roda em tempo real depois de R.",
      "code": "extends Node3D\nconst CENARIO = preload(\"res://cenario.gd\")\nconst AGENTE = preload(\"res://agente.gd\")\nvar regiao: NavigationRegion3D\nvar ator\nvar link: NavigationLink3D\nvar painel: VBoxContainer\nvar leitura: Label\nvar raio: HSlider\nvar modo: OptionButton\nvar sentido: CheckButton\nvar executor: CheckButton\nvar sincronizando := false\nvar iteracao_anterior := 0\nvar tempo_espera := 0.0\nvar pronto := false\n\nfunc botao(texto: String, acao: Callable) -> void:\n    var b := Button.new()\n    b.text = texto\n    painel.add_child(b)\n    b.pressed.connect(acao)\n\nfunc _ready() -> void:\n    regiao = CENARIO.criar(self)\n    regiao.bake_finished.connect(_bake_finished)\n    link = NavigationLink3D.new()\n    link.name = \"Travessia\"\n    link.start_position = Vector3(-2, 0, 0)\n    link.end_position = Vector3(2, 0, 0)\n    link.navigation_layers = 1\n    add_child(link)\n    ator = CharacterBody3D.new()\n    ator.name = \"Automato\"\n    ator.position = Vector3(-4, 0, 0)\n    ator.set_script(AGENTE)\n    add_child(ator)\n    var camera := Camera3D.new()\n    camera.position = Vector3(0, 12, 12)\n    add_child(camera)\n    camera.look_at(Vector3.ZERO)\n    camera.make_current()\n    var luz := DirectionalLight3D.new()\n    luz.rotation_degrees = Vector3(-55, -25, 0)\n    add_child(luz)\n    var mundo := WorldEnvironment.new()\n    var ambiente := Environment.new()\n    ambiente.background_mode = Environment.BG_COLOR\n    ambiente.background_color = Color(0.04, 0.03, 0.02)\n    ambiente.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR\n    ambiente.ambient_light_color = Color.WHITE\n    ambiente.ambient_light_energy = 0.4\n    mundo.environment = ambiente\n    add_child(mundo)\n    interface()\n    call_deferred(\"assar\")\n\nfunc interface() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var fundo := PanelContainer.new()\n    fundo.position = Vector2(24, 24)\n    layer.add_child(fundo)\n    painel = VBoxContainer.new()\n    painel.custom_minimum_size.x = 460\n    fundo.add_child(painel)\n    var titulo := Label.new()\n    titulo.text = \"ROTA, LINK E TRAVESSIA — GODOT 4.5\"\n    painel.add_child(titulo)\n    var ajuda := Label.new()\n    ajuda.text = \"Raio solicitado: aplicar exige bake; 0,4 é a referência.\\nMudanças de link/sentido/executor param e sincronizam.\\nB: bake · R: iniciar/repetir · C: parar e restaurar posição\"\n    painel.add_child(ajuda)\n    raio = HSlider.new()\n    raio.min_value = 0.2\n    raio.max_value = 1.2\n    raio.step = 0.1\n    raio.value = 0.4\n    painel.add_child(raio)\n    modo = OptionButton.new()\n    for nome in [\"Link bidirecional\", \"Só esquerda → direita\", \"Link desligado\"]:\n        modo.add_item(nome)\n    painel.add_child(modo)\n    modo.item_selected.connect(func(_i: int): atualizar_link())\n    sentido = CheckButton.new()\n    sentido.text = \"Inverter origem/destino\"\n    painel.add_child(sentido)\n    sentido.toggled.connect(func(_v: bool): atualizar_link())\n    executor = CheckButton.new()\n    executor.text = \"Executor de travessia presente\"\n    executor.button_pressed = true\n    painel.add_child(executor)\n    executor.toggled.connect(func(_v: bool): atualizar_link())\n    botao(\"Aplicar raio e fazer bake · B\", assar)\n    botao(\"Iniciar / repetir percurso · R\", iniciar)\n    botao(\"Parar e restaurar posição · C\", restaurar)\n    leitura = Label.new()\n    leitura.custom_minimum_size.x = 460\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    painel.add_child(leitura)\n\nfunc assar() -> void:\n    if regiao.is_baking() or sincronizando:\n        return\n    pronto = false\n    ator.estado = \"parado\"\n    iteracao_anterior = NavigationServer3D.map_get_iteration_id(ator.nav.get_navigation_map())\n    regiao.navigation_mesh.agent_radius = raio.value\n    ator.mensagem = \"Bake solicitado; aguarde sinal e sincronização.\"\n    regiao.bake_navigation_mesh(true)\n\nfunc _bake_finished() -> void:\n    aguardar_mapa()\n\nfunc aguardar_mapa() -> void:\n    pronto = false\n    ator.estado = \"parado\"\n    tempo_espera = 0.0\n    sincronizando = true\n\nfunc atualizar_link() -> void:\n    if regiao.is_baking() or sincronizando:\n        ator.mensagem = \"Aguarde terminar e reaplique a opção.\"\n        return\n    var habilitado := modo.selected != 2\n    var duplo := modo.selected == 0\n    if link.enabled != habilitado or link.bidirectional != duplo:\n        iteracao_anterior = NavigationServer3D.map_get_iteration_id(ator.nav.get_navigation_map())\n        link.enabled = habilitado\n        link.bidirectional = duplo\n        aguardar_mapa()\n    else:\n        restaurar() # Sentido/executor não alteram o mapa.\n\nfunc restaurar() -> void:\n    if not pronto:\n        return\n    var sinal := -1.0 if sentido.button_pressed else 1.0\n    ator.preparar(Vector3(-4 * sinal, 0, 0), Vector3(4 * sinal, 0, 0), executor.button_pressed)\n\nfunc iniciar() -> void:\n    if pronto:\n        restaurar()\n        ator.estado = \"seguir\"\n\nfunc _physics_process(delta: float) -> void:\n    if sincronizando:\n        tempo_espera += delta\n        var atual := NavigationServer3D.map_get_iteration_id(ator.nav.get_navigation_map())\n        if atual != 0 and atual != iteracao_anterior:\n            sincronizando = false\n            pronto = regiao.navigation_mesh.get_polygon_count() > 0\n            if pronto:\n                restaurar()\n            else:\n                ator.mensagem = \"Bake sem polígonos; confira fontes e parâmetros.\"\n        elif tempo_espera > 5.0:\n            ator.mensagem = \"Sincronização ainda pendente; inspecione o mapa e os avisos.\"\n    var ocupado := regiao.is_baking() or sincronizando\n    modo.disabled = ocupado\n    sentido.disabled = ocupado\n    executor.disabled = ocupado\n    raio.editable = not ocupado\n    if leitura != null:\n        leitura.text = \"Pedido %.1f / recurso %.1f | polígonos %d\\n%s\\nEstado: %s | posição %s\\nMudança de raio só vale após novo bake. Sem avoidance/RVO.\" % [raio.value, regiao.navigation_mesh.agent_radius, regiao.navigation_mesh.get_polygon_count(), ator.mensagem, ator.estado, ator.global_position]\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if event is InputEventKey and event.pressed and not event.echo and not event.ctrl_pressed and not event.alt_pressed and not event.meta_pressed:\n        if event.keycode == KEY_B:\n            assar()\n        elif event.keycode == KEY_R:\n            iniciar()\n        elif event.keycode == KEY_C:\n            restaurar()\n",
      "pros": "Prática autocontida, sem assets externos e com reinício.",
      "cons": "Importação/compilação/runtime ainda pendentes; medir custos em cena real."
    },
    {
      "title": "4. Configuração e contratos",
      "whenToUse": "Conferir parâmetros e limites de cada representação.",
      "description": "Leia junto ao roteiro de testes. A unidade web é ilustrativa e a malha nativa pode diferir por voxelização.",
      "code": "Godot 4.5, GDScript, Compatibility, desktop. Execução no motor pendente.\nImportar project.godot e executar oficina.tscn; montagem procedural em runtime.\nUma NavigationRegion3D contém dois StaticBody3D/pisos (camada física 1).\nPisos: X [-6,-1] e [1,6], Z [-2,2], topo Y=0. Fosso sem piso.\nFonte do bake: STATIC_COLLIDERS, collision_mask=1, recursiva na região.\nNavigationMesh: cell_size=0.1, cell_height=0.1, radius=0.4, height=1.8,\nmax_climb=0.25, max_slope=45. Ajuste do mapa/célula no project.godot.\nLink: (-2,0,0) a (2,0,0), navigation_layers=1, raio de conexão=0.15.\nAgente: layers=1, path/target_desired_distance=0.2, metadata INCLUDE_ALL.\nCápsula: raio físico 0.3, altura1.6; NavigationAgent.radius não altera isso.\nDestino em global_position, atribuído no comando, uma consulta por frame ativo.\nGravity Y e direção XZ separadas; move_and_slide também quando parado.\nTravessia especial: arco paramétrico de1.2s/altura1.2, move_and_collide.\nAo entrar: suspender seguidor, consumir metadados, percorrer, retomar ao sair.\nSem executor: parar na entrada; sem link: terminar no último ponto alcançável.\nSem avoidance/RVO, perseguição contínua, elevadores, pulo balístico ou rampas.\nBake(true) não garante ausência de engasgo: parsing/custos e sincronização existem.\nNo browser: retângulos analíticos sem voxelização/colisão; tempo só avança com T.\nNo motor: física em tempo real após R; não há avanço manual do PhysicsServer.\n",
      "language": "text",
      "pros": "Nomes, números e responsabilidades reunidos.",
      "cons": "Conferência documental não substitui executar a Godot."
    }
  ],
  "simulator": {
    "type": "navmesh_3d_sim",
    "title": "Laboratório: margem aplicada, rota e executor de link",
    "description": "Modelo analítico de duas ilhas planas: compare direção, conexão das pontas e código de travessia. O tempo só avança por T/botão; não há robô oscilando sozinho.",
    "guide": [
      {
        "title": "Pedido não é bake aplicado",
        "text": "Raio pedido 0,2–1,2u; B aplica a margem e reinicia. Retângulos físicos: X[-6,-1]/[1,6], Z[-2,2]. Modelo encolhe bordas por r; corpo de referência0,3u. Não é voxelização Recast."
      },
      {
        "title": "Faça uma previsão e compare",
        "text": "Com raio 0,4, link bidirecional/executor presente, T percorre a rota. Sem link ou no retorno de sentido único, termina no limite alcançável, sem alcançar o alvo. Pontas±2 precisam estar a até0,15u dos retângulos: em r 1,2 ficam a0,2u e desconectam neste modelo."
      },
      {
        "title": "O link não move o corpo",
        "text": "Executor ausente: para na entrada. Presente: arco de 1,2s com altura 1,2u, definido pelo nosso código. R repete mantendo opções; C restaura tudo. Clique na vista para focar B/R/T/C, ou use botões. Não há WASD porque o exercício é seguir caminho, sem movimento livre."
      }
    ]
  },
  "quiz": {
    "question": "O link está ligado, a rota até a outra plataforma existe e o agente chegou à entrada. Qual conclusão está correta?",
    "options": [
      "O link garante um salto físico sem código adicional.",
      "É preciso executar a travessia no controlador; o link não move o corpo. Também é necessário distinguir fim de caminho de alvo alcançado.",
      "Aumentar NavigationAgent3D.radius refaz a malha e altera a cápsula automaticamente.",
      "bake_navigation_mesh(true) entrega a rota imediatamente e garante ausência de engasgos."
    ],
    "correctIndex": 1,
    "feedback": [
      "O link declara a conexão; salto, plataforma ou teleporte precisam de implementação.",
      "Correto. Caminho, execução e critério de chegada são contratos distintos.",
      "Raio de avoidance, margem do bake e forma de colisão são independentes.",
      "Thread não elimina coleta/sincronização/custo e o mapa não se atualiza imediatamente."
    ],
    "explanation": "A ligação precisa de pontas conectadas, sentido/camadas corretos e código de travessia. Terminar o caminho pode significar apenas chegar ao último ponto alcançável."
  }
},

{
  "id": "3d-adv-spatial-shaders-particles",
  "area": "3d",
  "level": "avancado",
  "levelLabel": "Avançado",
  "title": "12. Shaders spatial e partículas: forma, borda e colisão",
  "subtitle": "Deforme uma malha com normais coerentes, controle uma máscara por ângulo e separe o desenho das partículas de sua simulação.",
  "nodesUsed": [
    "ShaderMaterial",
    "PlaneMesh",
    "GPUParticles3D",
    "ParticleProcessMaterial",
    "GPUParticlesCollisionBox3D"
  ],
  "feynman": {
    "title": "Três tarefas visuais, três contratos diferentes",
    "explanation": "Uma chapa pode parecer ondular porque o shader muda a posição dos vértices enviados ao desenho. Um escudo pode ganhar borda porque uma fórmula compara normal e direção de visão. Faíscas podem quicar porque um material de processamento e um colisor específico interagem. Esses efeitos não se tornam colisão de gameplay nem iluminação física completa apenas por terem aparência convincente. Vamos observar um mecanismo por vez e depois reconhecer o que cada um não resolve.",
    "analogies": [
      {
        "term": "Malha como amostragem",
        "analogy": "Uma superfície com poucos pontos só permite mover esses pontos e ligar os trechos entre eles. Mais células amostram melhor a onda, mas custam mais vértices. A função não cria detalhe geométrico entre os vértices automaticamente."
      },
      {
        "term": "Normal como orientação",
        "analogy": "Depois de curvar uma chapa, sua inclinação muda. Iluminá-la com a direção antiga faz a forma e a luz discordarem. Nesta onda simples calculamos a normal pelas derivadas da altura, sem prometer que a mesma conta serve para qualquer deformação."
      },
      {
        "term": "Dois tipos de chão",
        "analogy": "O piso desenhado e o piso que as partículas consultam podem ser objetos diferentes. Apagar o colisor GPU pode deixar a mesa visível e permitir que as faíscas a atravessem. Isso ajuda a distinguir aparência de dados de simulação."
      }
    ]
  },
  "howItWorks": {
    "overview": "Referência Godot 4.5. O apoio usa Forward+ em desktop: duas shaders spatial e um emissor GPU com box de colisão. O shader da onda recebe uniform tempo controlado por T; partículas nativas usam tempo real após F. O laboratório web é Canvas com fórmulas próprias e tempo manual, não uma execução desses shaders.",
    "anatomy": [
      {
        "prop": "vertex(): posição e normal no referencial correto",
        "desc": "Sem render modes que mudem o referencial, VERTEX e NORMAL no vertex são locais à malha. Para y=A·sin(2x+t·v)·cos(2z+t·v), a normal é normalize(−dy/dx,1,−dy/dz). Isso vale para este plano/parametrização. Não há normal map; tangentes adicionais seriam outro problema. Deslocar VERTEX no desenho não atualiza CollisionShape3D nem navegação."
      },
      {
        "prop": "Células, amostragem e culling",
        "desc": "No PlaneMesh desta oficina, n células por lado usam subdivide_width/depth=n−1, com (n+1)² vértices. Duas células não têm a mesma capacidade de representar a onda que 32. Amplitude 0 produz plano; velocidade 0 congela a fase. A deformação precisa caber nos limites usados por culling: o apoio reserva extra_cull_margin 0,8 para amplitude máxima 0,8. Subdivisão e margem têm custo; não são garantia de qualidade/performance."
      },
      {
        "prop": "fragment(): material e máscara de borda",
        "desc": "O shader da onda fornece ALBEDO, METALLIC e ROUGHNESS para o sombreamento do motor. A esfera usa unshaded/blend_add/cull_back e ALPHA = (1 − clamp(dot(NORMAL, VIEW), 0, 1))^p, com vetores normalizados em view space. Expoente maior estreita a região clara; não aumenta igualmente a opacidade. É máscara artística inspirada no Fresnel, sem refração, conservação de energia ou glow garantido. Transparência também traz custo e ordenação."
      },
      {
        "prop": "Desenho e processamento das partículas",
        "desc": "GPUParticles3D usa draw_pass_1 para a malha visível e ParticleProcessMaterial em process_material para emissão/movimento/colisão. COLLISION_RIGID e GPUParticlesCollisionBox3D habilitam a interação; um StaticBody3D comum não fornece esse dado diretamente. Na Godot 4.5 a caixa usa size, e cull_mask filtra camadas visuais do emissor. collision_base_size é diâmetro; não confundir com raio nem máscara física."
      },
      {
        "prop": "Ciclo de vida, tempo e limites de plataforma",
        "desc": "one_shot=true limita o ciclo; explosiveness=1 reúne a emissão. emitting=false interrompe novas emissões, sem significar apagar instantaneamente tudo que já nasceu. restart limpa/reinicia e evita depender apenas de emitting=true após o término. finished indica fim do ciclo, não colisão individual. visibility_aabb precisa cobrir o efeito e influencia onde colisão/atração ocorrem. TIME nativo não acompanha pausa da árvore; aqui uniform tempo próprio mantém a onda controlável. Recursos devem ser conferidos no renderizador/hardware de destino."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "Leia as duas shaders, a fábrica de partículas e o controlador. A cena cria os três exemplos sem assets externos. A colisão do apoio é GPU e visual; dano, coleta, som de impacto e física de gameplay exigem outra arquitetura.",
    "duration": "75–110 min com previsões e comparações (estimativa)",
    "prerequisite": "Aulas 3D 1–11: malhas, normais/referenciais, materiais PBR e separação visual/física. GDScript e funções seno/cosseno; derivadas são explicadas pela inclinação da altura. Godot 4.5/Forward+/desktop compatível com RenderingDevice. Compilação/execução no motor pendentes.",
    "objectives": [
      "Relacionar amostragem, deslocamento e normal da onda, sem confundir desenho com colisão.",
      "Prever a máscara de borda pelo ângulo e expoente, reconhecendo seus limites artísticos.",
      "Configurar o desenho, o processamento e o colisor das partículas e repetir/limpar um ciclo sem recarregar a cena."
    ],
    "practice": {
      "title": "Prática guiada: três bancadas da forja",
      "intro": "Extraia o apoio, importe project.godot e execute oficina.tscn. Os nós são montados em runtime e aparecem na árvore Remote. Da esquerda para direita: plano ondulado, esfera e piso de faíscas. O plano começa com tempo 0, emissor parado. T avança só a onda; F inicia as partículas em tempo real; R zera a onda e recria o emissor parado, preservando opções.",
      "tree": "Oficina (Node3D / oficina.gd)\n├── PlanoOndulado (MeshInstance3D / PlaneMesh 4×4)\n│   └── ShaderMaterial: onda.gdshader\n├── Escudo (MeshInstance3D / SphereMesh)\n│   └── ShaderMaterial: borda.gdshader\n├── PisoVisual (MeshInstance3D, sem física)\n├── ColisorGPU (GPUParticlesCollisionBox3D; size 5×0,2×5)\n├── Faiscas (GPUParticles3D; emissor em4/1,6/0)\n│   ├── process_material: ParticleProcessMaterial\n│   └── draw_pass_1: SphereMesh raio 0,06\n├── Camera3D + luz + WorldEnvironment\n└── CanvasLayer / Interface\n\nNada no shader atualiza CollisionShape3D. O piso visual não substitui o colisor GPU.",
      "download": {
        "url": "assets/aula-3d-12-shaders-particulas.zip",
        "label": "Baixar projeto de apoio: shaders e partículas"
      },
      "downloadNote": "Nove arquivos locais, duas shaders, dois scripts e roteiro. Validação documental; execução Godot pendente.",
      "steps": [
        {
          "title": "Identifique o que cada estágio modifica",
          "text": "Abra onda.gdshader e borda.gdshader. Localize vertex/fragment, uniform tempo, saídas PBR e ALPHA. Compare o nó visual do piso com o colisor GPU. Faça uma previsão antes de disparar partículas.",
          "expect": "Vertex altera dados para desenho; fragment fornece material/cor; process_material controla partículas. O cenário não ganha colisão de gameplay ondulante nem recebe impacto individual em GDScript por causa desses efeitos."
        },
        {
          "title": "Compare a amostragem com o mesmo tempo",
          "text": "No browser escolha Onda, mantenha amplitude 0,3/fase 1/tempo 0 e compare 2/8/32 células. No apoio os mesmos valores correspondem a subdivide 1/7/31. Observe o ponto de amostra(0,5;0) e a normal.",
          "expect": "São 9/81/1089 vértices, respectivamente. Mais vértices representam mais amostras da mesma função; não mudam sua amplitude. Com tempo 0, y(0,5; 0) = 0,3 sen(1) ≈ 0,2524. O ponto ouro representa avaliação da função, não necessariamente um vértice na malha mais grossa."
        },
        {
          "title": "Isole amplitude, fase e normal",
          "text": "Teste amplitude 0, amplitude 0,8 e velocidade 0. Avance cinco vezes e reinicie. Confira no shader dy/dx = 2A cos(a) cos(b), dy/dz = −2A sen(a) sen(b). Compare iluminação ao recalcular a normal e considere a margem de culling.",
          "expect": "Amplitude 0 deixa y=0/normalUP; velocidade 0 impede mudança da fase mesmo com tempo avançando. Normal unitária deriva da inclinação deste plano. Colisão física permanece independente; normal map/tangentes e outras deformações exigem soluções adicionais."
        },
        {
          "title": "Preveja antes de olhar a borda",
          "text": "Escolha Borda no browser. Em 60°, N·V=0,5: compare expoentes 1/3/6. Depois observe 0°/90°. No apoio altere expoente na esfera; a câmera fixa vê muitos ângulos simultaneamente.",
          "expect": "Máscaras 0,5/0,125/0,015625 para 60°. No centro 0; na silhueta 1. Aumentar expoente estreita a borda. O anel ouro identifica ângulo na esfera ideal, sem prometer rasterização PBR, transparência ou refração real no Canvas."
        },
        {
          "title": "Dispare, avance, limpe e repita",
          "text": "No browser escolha Partículas, F e T até perto de 0,9–1 s. Observe vida 2 s e índice3 ciano; repita antes do fim e após terminar. R limpa. Na Godot, F reinicia 48 partículas em tempo real e R recria o emissor; T continua afetando só a onda.",
          "expect": "O ciclo é repetível e não depende de recarregar a página/cena. O browser tem 8 pontos, um plano infinito, sem atrito/volume; não reproduz 48 partículas, box e integração GPU. finished é término do ciclo, não callback de impacto."
        },
        {
          "title": "Retire só o colisor",
          "text": "Compare piso ativo/off no mesmo instante do modelo. No apoio mantenha PisoVisual e desligue ColisorGPU. Confira COLLISION_RIGID, size, cull_mask/layers, visibility_aabb e collision_base_size.",
          "expect": "Sem colisão os pontos cruzam y=0; com colisão podem rebater conforme restituição. Mesh/StaticBody físico comum não é o colisor específico desse sistema. Máscara visual, diâmetro e área de simulação são contratos distintos; números do bounce não exigem trajetória igual ao modelo web."
        },
        {
          "title": "Transfira e diagnostique com limites",
          "text": "Explique por que aumentar subdivisões, partículas e transparência pode custar mais. Diferencie custo de simulação, desenho e overdraw. Consulte o roteiro e compare recursos no renderizador real antes de migrar o efeito.",
          "expect": "Não há promessa de custo zero, uso fixo de CPU ou milhares de impactos gratuitos. Efeitos de gameplay, normal maps, refração, glow, partículas contínuas e otimização precisam de implementações e medições próprias."
        }
      ]
    },
    "checks": [
      {
        "question": "Por que deformar VERTEX não faz o jogador subir numa onda?",
        "answer": "O shader altera geometria enviada ao desenho. A colisão física/navegação usa outros dados; não é atualizada automaticamente por essa operação."
      },
      {
        "question": "Em 60° e expoente 3, a máscara vale quanto? E se aumentar o expoente?",
        "answer": "N·V=cos60°=0,5; (1−0,5)^3=0,125. Aumentar o expoente diminui valores intermediários e concentra a faixa perto da silhueta."
      },
      {
        "question": "A mesh da partícula já define sua gravidade e colisão?",
        "answer": "Não. draw_pass define desenho; process_material define processamento. Colisão GPU exige modo/material e colisor específico, além de área/camadas coerentes."
      },
      {
        "question": "Por que emitir=false não é o mesmo que limpar todas as partículas?",
        "answer": "Parar emissão não elimina necessariamente as já ativas. O ciclo tem vida própria; restart reinicia, e o apoio oferece recriação do emissor para limpar de forma explícita."
      }
    ],
    "pitfalls": [
      {
        "title": "A onda parece uma chapa rígida ou facetada",
        "text": "Confira células/subdivisões, frequência e amostragem. Poucos pontos podem produzir inclinações ou aliasing; não é obrigatório o plano inteiro subir/descer de forma uniforme. Reveja também normal e escala."
      },
      {
        "title": "A forma muda, mas a luz parece errada",
        "text": "Recalcule normais no referencial correto. A fórmula fornecida só vale para esta altura sobre plano; normal map exige tangente/binormal coerentes."
      },
      {
        "title": "O efeito some perto da borda da tela",
        "text": "Confira enquadramento, extra_cull_margin da malha deformada e visibility_aabb das partículas. Aumentar limites sem critério também prejudica culling."
      },
      {
        "title": "A borda virou transparência estranha",
        "text": "Confira vetores no mesmo espaço, normalização, cull mode, blend e ordenação. A esfera usa cull_back para evitar somar uma segunda superfície traseira neste exemplo; não é vidro físico."
      },
      {
        "title": "Partículas atravessam o piso ou não repetem",
        "text": "Confira colisor GPU visível, size/topo, cull_mask/layers, COLLISION_RIGID e AABB. Para repetir one-shot use restart; não trate finished como sinal de colisão. No browser é preciso F e depois T."
      }
    ],
    "summary": "Amostragem e normal precisam acompanhar a forma visual. Máscara de borda depende de orientação e expoente, sem equivaler a vidro físico. Partículas têm processamento e desenho separados; colisão GPU, vida e reinício exigem configuração explícita.",
    "next": "A aula 3D  13 aprofunda iluminação global e reflexos. Após revisar o currículo integral, avaliar tangentes/normal map, transparência, refração, partículas contínuas e otimização como aprofundamentos.",
    "sources": [
      {
        "label": "Godot 4.5 — spatial shaders",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/shaders/shader_reference/spatial_shader.html"
      },
      {
        "label": "PlaneMesh — subdivisões",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_planemesh.html"
      },
      {
        "label": "GPUParticles3D — ciclo, desenho e limites",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_gpuparticles3d.html"
      },
      {
        "label": "ParticleProcessMaterial",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_particleprocessmaterial.html"
      },
      {
        "label": "Colisão de partículas3D",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/particles/collision.html"
      },
      {
        "label": "GPUParticlesCollisionBox3D — size",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_gpuparticlescollisionbox3d.html"
      },
      {
        "label": "GPUParticlesCollision3D — visibilidade",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_gpuparticlescollision3d.html"
      },
      {
        "label": "GeometryInstance3D — limites",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_geometryinstance3d.html"
      },
      {
        "label": "Renderizadores e plataformas",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/rendering/renderers.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Onda e normal · onda.gdshader",
      "whenToUse": "Deformação visual de um plano com altura analítica.",
      "description": "Tempo próprio e derivadas da altura; precisa de subdivisões/margem. Sem normal map nem colisão de gameplay.",
      "code": "shader_type spatial;\nuniform float amplitude : hint_range(0.0, 0.8) = 0.3;\nuniform float velocidade : hint_range(0.0, 3.0) = 1.0;\nuniform float tempo = 0.0;\n\nvoid vertex() {\n    float a = 2.0 * VERTEX.x + tempo * velocidade;\n    float b = 2.0 * VERTEX.z + tempo * velocidade;\n    float dx = 2.0 * amplitude * cos(a) * cos(b);\n    float dz = -2.0 * amplitude * sin(a) * sin(b);\n    VERTEX.y += amplitude * sin(a) * cos(b);\n    NORMAL = normalize(vec3(-dx, 1.0, -dz));\n}\n\nvoid fragment() {\n    ALBEDO = vec3(0.12, 0.45, 0.48);\n    ROUGHNESS = 0.35;\n    METALLIC = 0.2;\n}\n",
      "pros": "Forma e normal coerentes com a mesma função.",
      "cons": "Fórmula específica; não é água física.",
      "language": "Godot Shader Language (spatial)"
    },
    {
      "title": "2. Máscara angular · borda.gdshader",
      "whenToUse": "Borda estilizada de uma esfera/escudo.",
      "description": "Vetores normalizados em view space; transparência aditiva e face traseira descartada.",
      "code": "shader_type spatial;\nrender_mode blend_add, cull_back, unshaded;\nuniform vec4 cor : source_color = vec4(0.25, 0.85, 0.9, 1.0);\nuniform float expoente : hint_range(0.5, 6.0) = 3.0;\n\nvoid fragment() {\n    float nv = clamp(dot(normalize(NORMAL), normalize(VIEW)), 0.0, 1.0);\n    float borda = pow(1.0 - nv, expoente);\n    ALBEDO = cor.rgb;\n    ALPHA = borda;\n}\n",
      "pros": "Expoente e ângulo têm relação previsível.",
      "cons": "Não é Fresnel físico completo, glow ou refração.",
      "language": "Godot Shader Language (spatial)"
    },
    {
      "title": "3. Emissor GPU · particulas.gd",
      "whenToUse": "Criar ciclo de faíscas com desenho/processamento explícitos.",
      "description": "48 partículas, vida 2 s, seed fixo, material, draw pass e limites. O controlador fornece box separado.",
      "code": "extends RefCounted\n\nstatic func criar(pai: Node3D) -> GPUParticles3D:\n    var p := GPUParticles3D.new()\n    p.name = \"Faiscas\"\n    p.position = Vector3(4, 1.6, 0)\n    p.emitting = false\n    p.one_shot = true\n    p.amount = 48\n    p.lifetime = 2.0\n    p.explosiveness = 1.0\n    p.use_fixed_seed = true\n    p.seed = 29\n    p.local_coords = false\n    p.layers = 1\n    p.collision_base_size = 0.12 # Diâmetro de colisão, não raio.\n    p.visibility_aabb = AABB(Vector3(-5, -20, -5), Vector3(10, 26, 10))\n    var processo := ParticleProcessMaterial.new()\n    processo.direction = Vector3.UP\n    processo.spread = 30.0\n    processo.initial_velocity_min = 2.0\n    processo.initial_velocity_max = 3.0\n    processo.gravity = Vector3(0, -9.8, 0)\n    processo.collision_mode = ParticleProcessMaterial.COLLISION_RIGID\n    processo.collision_bounce = 0.6\n    processo.collision_friction = 0.2\n    p.process_material = processo\n    var esfera := SphereMesh.new()\n    esfera.radius = 0.06\n    esfera.height = 0.12\n    var desenho := StandardMaterial3D.new()\n    desenho.albedo_color = Color(1.0, 0.55, 0.15)\n    desenho.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED\n    esfera.material = desenho\n    p.draw_pass_1 = esfera\n    pai.add_child(p)\n    return p\n",
      "pros": "Dependências e repetição controláveis.",
      "cons": "Não fornece impactos individuais de gameplay; runtime pendente."
    },
    {
      "title": "4. Cena e comandos · oficina.gd",
      "whenToUse": "Montar a bancada procedural e repetir comparações.",
      "description": "Uniform da onda manual; partículas em tempo real após F. R zera tempo/recria emissor sem recarregar a cena.",
      "code": "extends Node3D\nconst PARTICULAS = preload(\"res://particulas.gd\")\nvar plano: MeshInstance3D\nvar onda: ShaderMaterial\nvar borda: ShaderMaterial\nvar faiscas: GPUParticles3D\nvar colisor: GPUParticlesCollisionBox3D\nvar painel: VBoxContainer\nvar leitura: Label\nvar amplitude: HSlider\nvar velocidade: HSlider\nvar expoente: HSlider\nvar celulas: OptionButton\nvar colisao: CheckButton\nvar tempo := 0.0\nvar estado := \"Emissor parado; F dispara/reinicia.\"\n\nfunc slider(texto: String, minimo: float, maximo: float, passo: float, valor: float) -> HSlider:\n    var l := Label.new()\n    l.text = texto\n    painel.add_child(l)\n    var s := HSlider.new()\n    s.min_value = minimo\n    s.max_value = maximo\n    s.step = passo\n    s.value = valor\n    painel.add_child(s)\n    s.value_changed.connect(func(_v: float): atualizar())\n    return s\n\nfunc botao(texto: String, acao: Callable) -> void:\n    var b := Button.new()\n    b.text = texto\n    painel.add_child(b)\n    b.pressed.connect(acao)\n\nfunc objeto(nome: String, mesh: Mesh, pos: Vector3) -> MeshInstance3D:\n    var m := MeshInstance3D.new()\n    m.name = nome\n    m.mesh = mesh\n    m.position = pos\n    add_child(m)\n    return m\n\nfunc _ready() -> void:\n    plano = objeto(\"PlanoOndulado\", PlaneMesh.new(), Vector3(-4, 0, 0))\n    plano.extra_cull_margin = 0.8\n    onda = ShaderMaterial.new()\n    onda.shader = preload(\"res://onda.gdshader\")\n    plano.material_override = onda\n    var esfera := SphereMesh.new()\n    esfera.radius = 1.0\n    esfera.height = 2.0\n    var escudo := objeto(\"Escudo\", esfera, Vector3(0, 1, 0))\n    borda = ShaderMaterial.new()\n    borda.shader = preload(\"res://borda.gdshader\")\n    escudo.material_override = borda\n    var caixa := BoxMesh.new()\n    caixa.size = Vector3(5, 0.2, 5)\n    objeto(\"PisoVisual\", caixa, Vector3(4, -0.1, 0))\n    colisor = GPUParticlesCollisionBox3D.new()\n    colisor.name = \"ColisorGPU\"\n    colisor.position = Vector3(4, -0.1, 0)\n    colisor.size = Vector3(5, 0.2, 5)\n    colisor.cull_mask = 1\n    add_child(colisor)\n    criar_emissor()\n    var camera := Camera3D.new()\n    camera.position = Vector3(9, 8, 14)\n    add_child(camera)\n    camera.look_at(Vector3(0, 0.7, 0))\n    camera.make_current()\n    var luz := DirectionalLight3D.new()\n    luz.rotation_degrees = Vector3(-50, -30, 0)\n    add_child(luz)\n    var mundo := WorldEnvironment.new()\n    var ambiente := Environment.new()\n    ambiente.background_mode = Environment.BG_COLOR\n    ambiente.background_color = Color(0.035, 0.025, 0.015)\n    ambiente.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR\n    ambiente.ambient_light_color = Color.WHITE\n    ambiente.ambient_light_energy = 0.35\n    mundo.environment = ambiente\n    add_child(mundo)\n    interface()\n    atualizar()\n\nfunc criar_emissor() -> void:\n    faiscas = PARTICULAS.criar(self)\n    faiscas.finished.connect(func(): estado = \"Ciclo GPU terminado; F permite repetir.\")\n\nfunc interface() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var fundo := PanelContainer.new()\n    fundo.position = Vector2(20, 550)\n    layer.add_child(fundo)\n    painel = VBoxContainer.new()\n    painel.custom_minimum_size.x = 490\n    fundo.add_child(painel)\n    amplitude = slider(\"Amplitude local\", 0, 0.8, 0.1, 0.3)\n    velocidade = slider(\"Velocidade de fase rad/s\", 0, 3, 0.25, 1)\n    expoente = slider(\"Expoente da borda\", 0.5, 6, 0.5, 3)\n    celulas = OptionButton.new()\n    for n in [2, 8, 32]:\n        celulas.add_item(\"%d células/lado\" % n, n)\n    celulas.select(1)\n    painel.add_child(celulas)\n    celulas.item_selected.connect(func(_i: int): atualizar())\n    colisao = CheckButton.new()\n    colisao.text = \"Colisor GPU ativo; piso visual independente\"\n    colisao.button_pressed = true\n    painel.add_child(colisao)\n    colisao.toggled.connect(func(_v: bool): atualizar())\n    botao(\"T: avançar onda0,1s · partículas usam tempo real\", passo)\n    botao(\"F: disparar/repetir ciclo GPU\", disparar)\n    botao(\"R: zerar onda e limpar partículas\", restaurar)\n    leitura = Label.new()\n    painel.add_child(leitura)\n\nfunc atualizar() -> void:\n    if leitura == null:\n        return\n    var n := celulas.get_selected_id()\n    var malha := PlaneMesh.new()\n    malha.size = Vector2(4, 4)\n    malha.subdivide_width = n - 1\n    malha.subdivide_depth = n - 1\n    plano.mesh = malha\n    onda.set_shader_parameter(\"amplitude\", amplitude.value)\n    onda.set_shader_parameter(\"velocidade\", velocidade.value)\n    onda.set_shader_parameter(\"tempo\", tempo)\n    borda.set_shader_parameter(\"expoente\", expoente.value)\n    colisor.visible = colisao.button_pressed\n\nfunc passo() -> void:\n    tempo = snappedf(tempo + 0.1, 0.1)\n    onda.set_shader_parameter(\"tempo\", tempo)\n\nfunc disparar() -> void:\n    faiscas.restart(true)\n    faiscas.emitting = true\n    estado = \"Ciclo GPU em tempo real; restart limpa o anterior.\"\n\nfunc restaurar() -> void:\n    tempo = 0.0\n    onda.set_shader_parameter(\"tempo\", tempo)\n    faiscas.free()\n    criar_emissor() # Novo nó parado: nenhuma partícula antiga precisa desaparecer por timer.\n    estado = \"Tempo zerado e emissor recriado parado.\"\n\nfunc _process(_delta: float) -> void:\n    if leitura != null:\n        leitura.text = \"Onda:%.1fs | A=%.1f | fase=%.2f | expoente=%.1f\\n%s\" % [tempo, amplitude.value, velocidade.value, expoente.value, estado]\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if event is InputEventKey and event.pressed and not event.echo and not event.ctrl_pressed and not event.alt_pressed and not event.meta_pressed:\n        if event.keycode == KEY_T:\n            passo()\n        elif event.keycode == KEY_F:\n            disparar()\n        elif event.keycode == KEY_R:\n            restaurar()\n",
      "pros": "Projeto local completo, sem assets externos.",
      "cons": "Compilar/executar no motor antes de homologar."
    },
    {
      "title": "5. Configuração e escopo",
      "whenToUse": "Conferir valores e separar modelo web do projeto.",
      "description": "Leia com o roteiro de testes e a versão/renderizador declarados.",
      "code": "Referência Godot4.5, Forward+, desktop compatível com RenderingDevice.\nImportar project.godot e executar oficina.tscn. Nove arquivos locais.\nMontagem em runtime: PlanoOndulado / Escudo / Faiscas / ColisorGPU.\nOnda: PlaneMesh4×4; n células/lado => subdivide=n-1 e (n+1)^2 vértices.\ny=A*sin(2*x+t*v)*cos(2*z+t*v). Normal analítica (-dy/dx,1,-dy/dz).\nAmplitude máxima0.8 e extra_cull_margin0.8. Sem normal map/tangente recalculada.\nTempo uniform próprio: T avança0.1s; TIME nativo não é usado.\nBorda: blend_add,cull_back,unshaded; ALPHA usa (1-clamp(N·V,0,1))^p.\nNão implementa refração, glow obrigatório ou Fresnel dielétrico completo.\nGPUParticles3D:48 partículas, one_shot=true, explosiveness=1, lifetime=2.\nuse_fixed_seed=true / seed29; local_coords=false; emitting=false inicial.\nprocess_material=ParticleProcessMaterial: direçãoUP, spread30, v2–3,\ngravity(0,-9.8,0), COLLISION_RIGID, bounce0.6, friction0.2.\ndraw_pass_1=SphereMesh raio0.06/altura0.12; collision_base_size=0.12 (diâmetro).\nColisorGPU: GPUParticlesCollisionBox3D, size(5,0.2,5), centro(4,-0.1,0).\nPisoVisual é apenas MeshInstance3D; cull_mask1 e layers1 do emissor.\nvisibility_aabb local(-5,-20,-5)+(10,26,10). Verificar cobertura real.\nF chama restart(true) e emitting=true; R recria emissor parado.\nPartículas nativas rodam em tempo real; T só controla a onda.\nBrowser usa8 pontos analíticos e plano infinito; não equivale ao GPU/atrito/box.\nSem colisão de gameplay alterada por shader; sem orçamento de desempenho medido.\n",
      "language": "text",
      "pros": "Contratos e limites reunidos.",
      "cons": "Não é benchmark nem garantia entre plataformas."
    }
  ],
  "simulator": {
    "type": "spatial_shader_3d",
    "title": "Laboratório: onda, máscara angular e partículas",
    "description": "Três experiências analíticas independentes em Canvas. Selecione o modo; controles sem relação ficam desabilitados. Tempo manual, repetição e limpeza; não executa shaders ou GPU.",
    "guide": [
      {
        "title": "Onda e amostragem",
        "text": "Plano 4×4:2/8/32 células dão 9/81/1089 vértices. Onda y=A·sen(2x+t·v)·cos(2z+t·v); normal pelas derivadas. Ouro é amostra(0,5;0), mesmo se não houver vértice ali na malha grossa. T avança, R reinicia."
      },
      {
        "title": "Borda por ângulo",
        "text": "Esfera ideal: N·V=cosθ; máscara=(1−clamp(N·V,0,1))^p. Em 60°/p3, valor 0,125. Expoente maior estreita a borda; não é apenas aumentar brilho. Anel ouro marca o ângulo selecionado. Não há transparência, refração ou glow real no Canvas."
      },
      {
        "title": "Ciclo de partículas",
        "text": "F inicia/reinicia 8 pontos e T avança 0,1 s, até vida 2 s. Piso ativo usa plano infinito e restituição; off permite cruzar o chão. Sem atrito/volume; não reproduz GPU. R zera tempo e limpa; C restaura tudo. Atalhos só na vista focada, sem repetição/modificadores, com botões equivalentes."
      }
    ]
  },
  "quiz": {
    "question": "Qual conjunto de afirmações descreve corretamente esta bancada?",
    "options": [
      "Deformar VERTEX atualiza a física, e aumentar o expoente torna toda a esfera igualmente mais opaca.",
      "Vertex altera o desenho; a normal precisa acompanhar a onda. O expoente estreita a borda; partículas exigem processamento/colisor próprios e reinício explícito.",
      "A mesh do draw pass determina sozinha gravidade, colisão e fim do ciclo.",
      "GPU garante custo zero na CPU e faz qualquer StaticBody3D fornecer colisão às partículas."
    ],
    "correctIndex": 1,
    "feedback": [
      "Desenho e colisão são separados; expoente não é opacidade uniforme.",
      "Correto. Forma, orientação, processamento e ciclo têm contratos distintos.",
      "Draw pass fornece desenho; o processamento e o ciclo são configurados separadamente.",
      "Há custos e limites; colisão GPU usa dados específicos, sem garantia de desempenho."
    ],
    "explanation": "O laboratório separa os três mecanismos. Aparência plausível não comprova física, implementação nativa ou desempenho."
  }
},

{
  "id": "3d-pro-global-illumination",
  "area": "3d",
  "level": "profissional",
  "levelLabel": "Profissional",
  "title": "13. Iluminação global e reflexos: escolher, preparar e comparar",
  "subtitle": "Separe rebatimento difuso de reflexão especular, escolha uma técnica pelo cenário e valide a preparação antes de julgar o resultado.",
  "nodesUsed": [
    "LightmapGI",
    "VoxelGI",
    "Environment / SDFGI",
    "ReflectionProbe",
    "ArrayMesh"
  ],
  "feynman": {
    "title": "Uma superfície pode receber luz rebatida e também refletir a sala",
    "explanation": "A parede vermelha recebe luz da lâmpada e devolve parte dela para superfícies próximas. Uma esfera fosca pode ganhar uma tonalidade vermelha por esse transporte indireto. Uma esfera metálica pode mostrar a própria parede no reflexo e também ter brilho da luz direta. São contribuições diferentes. Desligar a luz indireta não apaga automaticamente a iluminação direta, e adicionar uma sonda de reflexo não equivale a calcular todos os rebatimentos da sala.",
    "analogies": [
      {
        "term": "Luz que passa por uma superfície",
        "analogy": "Um cartão vermelho sob uma lâmpada pode devolver luz colorida ao entorno. A quantidade depende de onde ele está, para onde aponta e do que bloqueia o caminho. Uma camada vermelha sobre toda a imagem não representa esse mecanismo."
      },
      {
        "term": "Dados preparados e dados atuais",
        "analogy": "Um levantamento fixo de uma oficina não muda quando alguém derruba uma parede. Um bake precisa de uma política de atualização; suportar luz dinâmica não significa aceitar qualquer geometria mudando sem preparação."
      },
      {
        "term": "Uma captura local tem um ponto de vista",
        "analogy": "Uma sonda registra o entorno de uma posição. Essa aproximação pode ajudar o metal, mas não enxerga a sala de todos os pontos ao mesmo tempo. Box projection compensa parte da paralaxe em volumes adequados, sem transformar a captura em reflexão geométrica exata."
      }
    ]
  },
  "howItWorks": {
    "overview": "Referência Godot 4.5. Primeiro mantenha câmera, fonte, materiais e exposição fixos; depois varie uma contribuição. O browser oferece esse isolamento com um modelo próprio. O apoio prepara três variantes da mesma sala no editor, sem bakes prontos. No motor, GI também pode contribuir para reflexos, portanto os controles não isolam componentes exatamente como no Canvas.",
    "anatomy": [
      {
        "prop": "Direto, indireto difuso e especular",
        "desc": "Direto vem da fonte sem rebater antes. Indireto difuso passa por outras superfícies e depende de geometria/material. Especular pode vir tanto da luz direta quanto do ambiente. Sem sonda ainda podem existir reflexos de GI, céu ou SSR, conforme configuração. Nesta oficina o ambiente difuso da sonda é desativado, mas ReflectionProbe também possui opções de ambiente; não é exclusivamente um nó de espelho em qualquer uso."
      },
      {
        "prop": "LightmapGI: preparar UV2 e conservar o bake",
        "desc": "Bom candidato para geometria e iluminação predominantemente estáticas, com custo deslocado para bake/armazenamento. Malhas assadas precisam de UV2 válido e tamanho de lightmap. Objetos móveis podem receber indireto por probes, sem passar a ser contribuintes estáticos atualizados. Bake ocorre no editor; reprodução em outra plataforma não implica poder assar nela. A classe 4.5 documenta reflexão muito rugosa por harmônicos quando directional=true; isso não é captura local detalhada. O apoio usa directional=false e sonda separada."
      },
      {
        "prop": "VoxelGI: volume assado, contribuição dinâmica configurada",
        "desc": "Exige Forward+ na referência e bake inicial da geometria estática. Malhas/luzes em modo Static precisam de novo bake se mudarem. Dynamic tem outra participação e custo; não atribuir o mesmo comportamento a qualquer porta ou emissor. A caixa deve cobrir o necessário, com subdivisão e paredes suficientemente espessas. GPU dedicada é recomendação de desempenho, não o nome de uma condição de API que substitua medir o hardware."
      },
      {
        "prop": "SDFGI: regiões próximas à câmera e limites dinâmicos",
        "desc": "Também exige Forward+. Usa cascatas para representar regiões do cenário e pode acompanhar a câmera, sem bake manual como LightmapGI/VoxelGI. Não significa detalhe infinito em todo o mundo. Suporta luzes dinâmicas, mas oclusores e superfícies emissivas móveis não contribuem como geometria estática instantaneamente. Resolução, distância, convergência e vazamentos precisam de inspeção; use_occlusion reduz alguns problemas e custa trabalho, sem garantia de eliminá-los."
      },
      {
        "prop": "ReflectionProbe: captura, máscara e atualização",
        "desc": "Captura o entorno e filtra versões para diferentes rugosidades. size define influência; cull_mask define o que entra na captura. Box projection pode melhorar salas compatíveis com a aproximação. Once conserva uma captura até uma nova atualização pertinente; mudanças na luz não devem ser presumidas como recaptura automática. Always custa mais. O apoio exclui o próprio metal da captura, desliga ambiente difuso e oferece recaptura explícita."
      },
      {
        "prop": "Preparação é parte do resultado",
        "desc": "GI Mode das malhas e bake mode das luzes têm significado específico por técnica. Para Lightmap, luz Dynamic preserva direto em runtime e deixa indireto assado; mudar sua cor/energia depois não reescreve a textura. PrimitiveMesh puro não é o fluxo de lightmap fornecido: o gerador converte as formas em ArrayMesh e faz unwrap no editor, validando erros. Confira dados e recursos salvos antes de concluir que o método não funciona."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "Oito passos separam leitura do modelo, preparação no editor e comparação real. O ZIP contém quatro scripts e instruções; nenhum resultado de bake está pronto. Uma tela inicial explica como gerar as três cenas. Execute a cena escolhida com F6 depois da preparação.",
    "duration": "90–140 min com geração, bakes e comparações (estimativa; varia por hardware)",
    "prerequisite": "Aulas 3D 1–12: materiais PBR, sombras, normais, recursos e separação visual/física. Godot 4.5, editor e Forward+ em desktop compatível para comparar todas as variantes. Gerador, unwrap, bakes e runtime ainda não executados nesta revisão.",
    "objectives": [
      "Distinguir rebatimento difuso, reflexo ambiente e brilho direto por uma comparação controlada.",
      "Escolher LightmapGI, VoxelGI ou SDFGI segundo geometria, iluminação, plataforma e custo de atualização.",
      "Preparar malhas/dados/capturas e repetir a comparação, reconhecendo um sistema sem bake em vez de avaliá-lo como pronto."
    ],
    "practice": {
      "title": "Prática guiada: uma sala, três preparações",
      "intro": "Importe project.godot. F5 abre instruções; a comparação nativa só existe após executar o EditorScript e gerar as cenas. Não há GLB externo. A referência contém paredes espessas, esfera fosca, metal, bloco e uma OmniLight3D; câmera e materiais permanecem iguais entre variantes.",
      "tree": "Projeto de apoio\n├── inicio.tscn / inicio.gd: instruções\n├── gerar_cenas.gd: EditorScript executado manualmente\n├── sala.gd: geometria, ArrayMesh/UV2, materiais e presets\n├── controle.gd: controles das cenas geradas\n└── cenas/ (geradas no editor, não incluídas prontas)\n    ├── lightmap.tscn → LightmapGI + dados a assar\n    ├── voxel.tscn → VoxelGI + dados a assar\n    └── sdfgi.tscn → Environment.sdfgi_enabled\n\nCada Sala tem malhas, LuzDireta, Mundo, Sonda e Camera como filhos.\nMetal usa layer 2; captura da sonda usa layer 1 e exclui o próprio metal.\nA esfera dinâmica recebe GI conforme o sistema/probes; não exige UV2 de bake estático.",
      "download": {
        "url": "assets/aula-3d-13-gi-reflexos.zip",
        "label": "Baixar projeto de apoio: GI, bakes e reflexos"
      },
      "downloadNote": "Nove arquivos locais, quatro scripts e roteiro. Cenas/bakes são gerados por você no editor; execução nativa ainda pendente.",
      "steps": [
        {
          "title": "Faça previsões antes de comparar",
          "text": "No browser, observe as duas salas: referência só direta e ajustes. Identifique esfera fosca, metal, parede e sombra. Desligue rebatimento e captura; depois ligue somente a captura e somente o rebatimento.",
          "expect": "Sem rebatimento/captura, os quadros coincidem. A esfera fosca ganha indireto localizado quando há transporte da parede. O metal pode refletir a parede mesmo sem indireto difuso; o cálculo de brilho direto continua. Não confundir parede refletida com color bleeding na superfície fosca."
        },
        {
          "title": "Varie o ganho sem mexer na fonte",
          "text": "Compare ganho 0,0/0,2/1/2 com rebatimento ligado. Desligue rebatimento e confira que seu ganho fica desabilitado. G/P alternam componentes com a vista focada; R restaura a referência de controles.",
          "expect": "A fonte e a geometria não mudam. O ganho atua no termo indireto do modelo, não é um parâmetro universal da Godot. Com GI desligada, mudar um valor guardado não deve alterar a imagem; não há movimento nem ciclo a esperar."
        },
        {
          "title": "Escolha pela necessidade, não por um selo de qualidade",
          "text": "Explique escolhas para sala fixa em hardware limitado, interior com contribuintes dinâmicos e cenário amplo com luz solar variável. Considere plataforma de execução e de bake separadamente. Mantenha as limitações por técnica na resposta.",
          "expect": "Lightmap é candidato para fixo com UV2, bake e armazenamento; Voxel exige volume/bake inicial e modos dinâmicos adequados; SDFGI acompanha regiões e luzes, sem suportar qualquer oclusor/emissor móvel. Não há tecnologia sempre melhor nem FPS garantido."
        },
        {
          "title": "Gere cenas e confira a geometria assável",
          "text": "Abra gerar_cenas.gd no editor de scripts e use Arquivo → Executar (Ctrl+Shift+X). Confira Output/erros e as três cenas geradas. Em lightmap.tscn inspecione ArrayMesh, UV2 e GI Mode Static nas malhas fixas. O gerador não roda sozinho no jogo.",
          "expect": "As três cenas têm geometria equivalente, owner/hierarquia salvos e recursos preparados. Erro de unwrap interrompe a geração. Não tratar PrimitiveMesh sem UV2 como se já estivesse pronto para lightmap. O gerador recusa sobrescrever destinos existentes; guarde cópia e renomeie conscientemente antes de regenerar."
        },
        {
          "title": "Faça os dois bakes que a prática exige",
          "text": "Em lightmap.tscn selecione LightmapGI e Bake Lightmaps; salve dados/cena. Em voxel.tscn selecione VoxelGI, Bake, salve VoxelGIData em .res e a cena. Abra/reabra e confirme dados presentes. Execute cada cena atual com F6.",
          "expect": "Não basta adicionar o nó. A interface mostra aviso quando light_data ou voxel.data falta. A luz do apoio é Dynamic: Lightmap mantém direto em runtime, mas indireto permanece assado. Probes do Lightmap atendem o metal dinâmico; investigar distribuição se ele não recebe indireto."
        },
        {
          "title": "Observe SDFGI e compare sem contaminar o teste",
          "text": "Abra sdfgi.tscn, execute e aguarde estabilização. Confira Forward+, GI Mode Static, read_sky_light=false e use_occlusion=true. Mantenha energia 1, câmera e materiais iguais; desligue sistemas extras antes de comparar.",
          "expect": "Não há arquivo de bake equivalente aos dois anteriores. Uma imagem transitória ou vazamento não comprova que SDFGI aceita oclusores dinâmicos. A comparação nativa não deve exigir pixel igual ao Canvas: iluminação, materiais, captura, exposição e algoritmos diferem."
        },
        {
          "title": "Teste a captura antiga e a recaptura",
          "text": "Com sonda Once, altere a energia da luz. Compare a captura antiga, Recapturar e Always. R restaura luz/controles e recria a sonda. Confira AMBIENT_DISABLED, size, cull_mask e exclusão do próprio metal.",
          "expect": "Once não deve ser confundido com acompanhar toda mudança da sala. Always adiciona custo; box projection é aproximação. No motor, GI também pode fornecer reflexo, então desligar a sonda não implica metal sem qualquer reflexo. O browser separa esses termos para ensinar."
        },
        {
          "title": "Registre resultado e limite antes de otimizar",
          "text": "Use o roteiro do ZIP e anote versão/renderizador, dados salvos, resultado esperado/observado e custo medido. Investigue exposição, probes, UV2, volume/resolução e paredes antes de aumentar energia para esconder um erro.",
          "expect": "O laboratório web valida o conceito de transporte limitado e separação dos controles. Não homologa bake, convergência, fugas de luz ou custo nativo. A aula seguinte trata orçamento/otimização; aprofundamentos globais do currículo só serão avaliados após a última aula."
        }
      ]
    },
    "checks": [
      {
        "question": "Uma esfera metálica vermelha prova que a GI difusa está ligada?",
        "answer": "Não. Ela pode estar refletindo a parede vermelha por uma captura especular. Compare a superfície fosca e isole as contribuições; preserve também a luz direta."
      },
      {
        "question": "Por que adicionar LightmapGI sem preparar malha/dados pode não produzir o resultado esperado?",
        "answer": "A técnica exige malhas assáveis com UV2, configurações e bake válido. O apoio fornece conversão/unwrap no editor e exige salvar dados; não entrega um nó com iluminação pronta."
      },
      {
        "question": "Uma porta móvel participa igualmente em VoxelGI e SDFGI?",
        "answer": "Não. Modos e limites diferem. VoxelGI possui contribuição de malhas Dynamic com custo; SDFGI não trata oclusores móveis como contribuintes dinâmicos equivalentes. Alterar algo assado Static exige revisar a preparação."
      },
      {
        "question": "Por que desligar a sonda no motor não garante que o metal fique sem reflexos?",
        "answer": "Pode haver contribuição especular de GI, céu ou SSR. A sonda é uma fonte adicional; o modelo web desliga propositalmente as outras capturas para permitir a comparação."
      }
    ],
    "pitfalls": [
      {
        "title": "A sala clareia, mas não sei por quê",
        "text": "Desligue fontes extras, fixe exposição/câmera e varie um termo. Não mude luz direta, ambiente, GI e captura juntos para concluir que houve rebatimento."
      },
      {
        "title": "Lightmap não funciona com as formas criadas",
        "text": "Confira ArrayMesh/UV2, GI Mode, hierarquia, dados e erros de bake. O ZIP não promete lightmap em PrimitiveMesh puro ou bake em exportação."
      },
      {
        "title": "Mudei uma parede e a GI ficou antiga",
        "text": "Confira se a geometria era Static e requer novo bake. Não extrapole luz dinâmica para qualquer transformação de malha. Em SDFGI, observe atualização/convergência e limites de oclusores dinâmicos."
      },
      {
        "title": "Metal sem detalhes ou reflexo deslocado",
        "text": "Confira fontes de reflexão, rugosidade, influência/máscara da sonda, captura antiga e box projection. O cubemap tem limitações de ponto de captura; não é uma solução perfeita para toda geometria."
      },
      {
        "title": "A energia alta esconde vazamento e tudo satura",
        "text": "Reveja paredes/resolução/probes/exposição antes de intensificar luz. Números maiores não corrigem UV2, dados ausentes ou limites da técnica. Meça memória, tempo de bake e execução no destino."
      }
    ],
    "summary": "Separe direto, indireto difuso e especular. Escolha a técnica pelo que muda na cena e pelo destino. Prepare UV2, modos, volumes, bakes e capturas; valide dados antes de julgar a imagem. Uma sonda pode complementar a GI, mas não substitui todos os transportes de luz.",
    "next": "A aula 3D 14 aborda orçamento de renderização, culling e LOD. Depois dela será possível avaliar lacunas do currículo completo e priorizar as pendências de motor acumuladas.",
    "sources": [
      {
        "label": "Godot 4.5 — introdução e comparação de GI",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/global_illumination/introduction_to_global_illumination.html"
      },
      {
        "label": "LightmapGI — fluxo de preparação",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/global_illumination/using_lightmap_gi.html"
      },
      {
        "label": "LightmapGI — classe e directional",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_lightmapgi.html"
      },
      {
        "label": "VoxelGI — uso e modos",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/global_illumination/using_voxel_gi.html"
      },
      {
        "label": "VoxelGI — classe",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_voxelgi.html"
      },
      {
        "label": "SDFGI — requisitos e limites",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/global_illumination/using_sdfgi.html"
      },
      {
        "label": "ReflectionProbe — captura e ambiente",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_reflectionprobe.html"
      },
      {
        "label": "ArrayMesh — lightmap_unwrap",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_arraymesh.html"
      },
      {
        "label": "Light3D — bake mode",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_light3d.html"
      },
      {
        "label": "Environment — ambiente e reflexos",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_environment.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Sala, malhas e presets · sala.gd",
      "whenToUse": "Preparar geometria equivalente para três técnicas.",
      "description": "Converte formas em ArrayMesh, valida unwrap das estáticas, configura materiais, fonte, ambiente e sonda. Chamado pelo EditorScript, não por gameplay.",
      "code": "extends RefCounted\n\nstatic func anexar(raiz: Node3D, no: Node) -> void:\n    raiz.add_child(no)\n    no.owner = raiz\n\nstatic func malha(raiz: Node3D, nome: String, origem: PrimitiveMesh, pos: Vector3, cor: Color, metal: bool = false) -> MeshInstance3D:\n    var mesh := ArrayMesh.new()\n    mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, origem.surface_get_arrays(0))\n    if not metal:\n        var erro := mesh.lightmap_unwrap(Transform3D.IDENTITY, 0.15)\n        if erro != OK:\n            push_error(\"Falha de UV2 em %s: %s\" % [nome, error_string(erro)])\n            return null\n    var material := StandardMaterial3D.new()\n    material.albedo_color = cor\n    material.metallic = 1.0 if metal else 0.0\n    material.roughness = 0.12 if metal else 0.8\n    mesh.surface_set_material(0, material)\n    var no := MeshInstance3D.new()\n    no.name = nome\n    no.mesh = mesh\n    no.position = pos\n    no.gi_mode = GeometryInstance3D.GI_MODE_DYNAMIC if metal else GeometryInstance3D.GI_MODE_STATIC\n    no.layers = 2 if metal else 1 # Sonda captura layer1 e exclui a própria esfera metálica.\n    anexar(raiz, no)\n    return no\n\nstatic func criar(tipo: String) -> Node3D:\n    var raiz := Node3D.new()\n    raiz.name = \"Sala\"\n    raiz.set_meta(\"tecnica\", tipo)\n    raiz.set_script(preload(\"res://controle.gd\"))\n    var branco := Color(0.72, 0.70, 0.64)\n    var partes := [\n        [\"Piso\", Vector3(4.4, 0.2, 3.4), Vector3(0, -0.1, -0.5), branco],\n        [\"ParedeVermelha\", Vector3(0.2, 3.2, 3.4), Vector3(-2.1, 1.5, -0.5), Color(0.75, 0.035, 0.018)],\n        [\"ParedeDireita\", Vector3(0.2, 3.2, 3.4), Vector3(2.1, 1.5, -0.5), branco],\n        [\"Fundo\", Vector3(4.4, 3.2, 0.2), Vector3(0, 1.5, -2.1), branco],\n        [\"Teto\", Vector3(4.4, 0.2, 3.4), Vector3(0, 3.1, -0.5), branco],\n        [\"Bloco\", Vector3(0.38, 1.18, 0.62), Vector3(0.11, 0.59, -1.41), branco]\n    ]\n    for parte in partes:\n        var box := BoxMesh.new()\n        box.size = parte[1]\n        if malha(raiz, parte[0], box, parte[2], parte[3]) == null:\n            raiz.free()\n            return null\n    for i in range(2):\n        var esfera := SphereMesh.new()\n        esfera.radius = 0.57 if i == 0 else 0.62\n        esfera.height = esfera.radius * 2.0\n        esfera.radial_segments = 24\n        esfera.rings = 12\n        var pos := Vector3(-0.78, 0.57, -0.45) if i == 0 else Vector3(0.8, 0.62, -0.8)\n        if malha(raiz, \"Fosca\" if i == 0 else \"Metal\", esfera, pos, branco if i == 0 else Color(0.95, 0.76, 0.4), i == 1) == null:\n            raiz.free()\n            return null\n    var luz := OmniLight3D.new()\n    luz.name = \"LuzDireta\"\n    luz.position = Vector3(0.2, 2.8, 0.25)\n    luz.omni_range = 10.0\n    luz.light_energy = 1.0\n    luz.light_bake_mode = Light3D.BAKE_DYNAMIC\n    luz.shadow_enabled = true\n    anexar(raiz, luz)\n    var mundo := WorldEnvironment.new()\n    mundo.name = \"Mundo\"\n    var e := Environment.new()\n    e.background_mode = Environment.BG_COLOR\n    e.background_color = Color.BLACK\n    e.ambient_light_source = Environment.AMBIENT_SOURCE_DISABLED\n    e.reflected_light_source = Environment.REFLECTION_SOURCE_BG\n    e.tonemap_mode = Environment.TONE_MAPPER_FILMIC\n    e.sdfgi_enabled = tipo == \"sdfgi\"\n    e.sdfgi_read_sky_light = false\n    e.sdfgi_use_occlusion = true\n    mundo.environment = e\n    anexar(raiz, mundo)\n    var sonda := ReflectionProbe.new()\n    sonda.name = \"Sonda\"\n    sonda.position = Vector3(0, 1.5, -0.5)\n    sonda.size = Vector3(4.6, 3.4, 4.0)\n    sonda.interior = true\n    sonda.box_projection = true\n    sonda.ambient_mode = ReflectionProbe.AMBIENT_DISABLED\n    sonda.cull_mask = 1\n    sonda.enable_shadows = true\n    sonda.update_mode = ReflectionProbe.UPDATE_ONCE\n    anexar(raiz, sonda)\n    if tipo == \"lightmap\":\n        var lm := LightmapGI.new()\n        lm.name = \"LightmapGI\"\n        lm.interior = true\n        lm.directional = false\n        lm.generate_probes_subdiv = LightmapGI.GENERATE_PROBES_SUBDIV_8\n        anexar(raiz, lm)\n    elif tipo == \"voxel\":\n        var voxel := VoxelGI.new()\n        voxel.name = \"VoxelGI\"\n        voxel.position = Vector3(0, 1.5, -0.5)\n        voxel.size = Vector3(5, 4, 4)\n        voxel.subdiv = VoxelGI.SUBDIV_128\n        anexar(raiz, voxel)\n    var camera := Camera3D.new()\n    camera.name = \"Camera\"\n    camera.position = Vector3(0, 1.45, 5.6)\n    camera.rotation_degrees.x = -2.0\n    camera.current = true\n    anexar(raiz, camera)\n    return raiz\n",
      "pros": "UV2, modos e máscaras explícitos.",
      "cons": "Unwrap e comportamento real ainda exigem execução no editor."
    },
    {
      "title": "2. Geração no editor · gerar_cenas.gd",
      "whenToUse": "Criar as três cenas salvas antes dos bakes.",
      "description": "Executar manualmente via editor de scripts. Verifica pack/save e atualiza FileSystem. Não assa luz automaticamente.",
      "code": "@tool\nextends EditorScript\nconst SALA = preload(\"res://sala.gd\")\nfunc _run() -> void:\n    for tipo in [\"lightmap\", \"voxel\", \"sdfgi\"]:\n        if FileAccess.file_exists(\"res://cenas/%s.tscn\" % tipo):\n            push_error(\"Cena já existe: %s. Guarde cópia e escolha conscientemente como regenerar; nada será sobrescrito.\" % tipo)\n            return\n    var erro := DirAccess.make_dir_recursive_absolute(\"res://cenas\")\n    if erro != OK:\n        push_error(error_string(erro))\n        return\n    for tipo in [\"lightmap\", \"voxel\", \"sdfgi\"]:\n        var raiz := SALA.criar(tipo)\n        if raiz == null:\n            push_error(\"Geração interrompida; confira os erros de UV2.\")\n            return\n        var cena := PackedScene.new()\n        erro = cena.pack(raiz)\n        if erro == OK:\n            erro = ResourceSaver.save(cena, \"res://cenas/%s.tscn\" % tipo)\n        raiz.free()\n        if erro != OK:\n            push_error(\"Falha ao salvar %s: %s\" % [tipo, error_string(erro)])\n            return\n    get_editor_interface().get_resource_filesystem().scan()\n    print(\"Três cenas geradas. Abra uma, faça o bake indicado e execute com F6. O gerador recusa sobrescrever cenas existentes.\")\n",
      "pros": "Hierarquia/recursos locais, sem GLB externo.",
      "cons": "Recusa sobrescrever cenas existentes; regeneração exige guardar cópia e renomear destinos."
    },
    {
      "title": "3. Comparação e recaptura · controle.gd",
      "whenToUse": "Alternar GI/sonda e restaurar sem reabrir a cena.",
      "description": "Avisa se dados faltam. R restaura controles e recria sonda; luz nativa difere do ganho web. Não substitui bakes.",
      "code": "extends Node3D\n@onready var luz: OmniLight3D = $LuzDireta\n@onready var ambiente: Environment = $Mundo.environment\n@onready var sonda: ReflectionProbe = $Sonda\nvar lm: LightmapGI\nvar voxel: VoxelGI\nvar dados: LightmapGIData\nvar gi: CheckButton\nvar reflexo: CheckButton\nvar sempre: CheckButton\nvar energia: HSlider\nvar leitura: Label\n\nfunc _ready() -> void:\n    lm = get_node_or_null(\"LightmapGI\") as LightmapGI\n    voxel = get_node_or_null(\"VoxelGI\") as VoxelGI\n    if lm != null:\n        dados = lm.light_data\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var fundo := PanelContainer.new()\n    fundo.position = Vector2(20, 650)\n    layer.add_child(fundo)\n    var painel := VBoxContainer.new()\n    painel.custom_minimum_size.x = 600\n    fundo.add_child(painel)\n    gi = CheckButton.new()\n    gi.text = \"GI da cena ativa · G\"\n    gi.button_pressed = true\n    painel.add_child(gi)\n    gi.toggled.connect(func(_v: bool): atualizar())\n    reflexo = CheckButton.new()\n    reflexo.text = \"Sonda local ativa · P\"\n    reflexo.button_pressed = true\n    painel.add_child(reflexo)\n    reflexo.toggled.connect(func(_v: bool): atualizar())\n    sempre = CheckButton.new()\n    sempre.text = \"Sonda Always; mais capturas/custo\"\n    painel.add_child(sempre)\n    sempre.toggled.connect(func(_v: bool): atualizar())\n    energia = HSlider.new()\n    energia.min_value = 0.5\n    energia.max_value = 2.0\n    energia.step = 0.1\n    energia.value = 1.0\n    painel.add_child(energia)\n    energia.value_changed.connect(func(_v: float): atualizar())\n    for item in [[\"Recapturar sonda Once\", recapturar], [\"Restaurar referência · R\", restaurar]]:\n        var b := Button.new()\n        b.text = item[0]\n        painel.add_child(b)\n        b.pressed.connect(item[1])\n    leitura = Label.new()\n    leitura.custom_minimum_size.x = 600\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    painel.add_child(leitura)\n    atualizar()\n\nfunc atualizar() -> void:\n    if leitura == null:\n        return\n    luz.light_energy = energia.value\n    sonda.visible = reflexo.button_pressed\n    sonda.update_mode = ReflectionProbe.UPDATE_ALWAYS if sempre.button_pressed else ReflectionProbe.UPDATE_ONCE\n    if lm != null:\n        lm.light_data = dados if gi.button_pressed else null\n    elif voxel != null:\n        voxel.visible = gi.button_pressed\n    else:\n        ambiente.sdfgi_enabled = gi.button_pressed\n    var aviso := \"Aguarde convergência/captura; o teste nativo não separa componentes como o Canvas.\"\n    if lm != null and dados == null:\n        aviso = \"SEM LIGHTMAP: faça Bake Lightmaps no editor antes de avaliar GI.\"\n    elif voxel != null and voxel.data == null:\n        aviso = \"SEM VOXEL DATA: faça Bake e salve o recurso antes de avaliar GI.\"\n    leitura.text = \"%s | energia direta %.1f\\n%s\\nA energia da luz muda o direto; indireto pré-assado não acompanha automaticamente.\\nAmbiente difuso da sonda desativado; parede e materiais fixos.\" % [get_meta(\"tecnica\"), energia.value, aviso]\n\nfunc recapturar() -> void:\n    var nova := sonda.duplicate() as ReflectionProbe\n    add_child(nova)\n    sonda.free()\n    sonda = nova\n    atualizar()\n\nfunc restaurar() -> void:\n    gi.set_pressed_no_signal(true)\n    reflexo.set_pressed_no_signal(true)\n    sempre.set_pressed_no_signal(false)\n    energia.set_value_no_signal(1.0)\n    atualizar()\n    recapturar()\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if event is InputEventKey and event.pressed and not event.echo and not event.ctrl_pressed and not event.alt_pressed and not event.meta_pressed:\n        if event.keycode == KEY_G:\n            gi.button_pressed = not gi.button_pressed\n        elif event.keycode == KEY_P:\n            reflexo.button_pressed = not reflexo.button_pressed\n        elif event.keycode == KEY_R:\n            restaurar()\n",
      "pros": "Estados e limites visíveis.",
      "cons": "Sincronização/captura e toggles reais ainda não homologados."
    },
    {
      "title": "4. Configuração e contratos",
      "whenToUse": "Conferir o que cada variante exige.",
      "description": "Leia com o roteiro e os passos do editor. Não há resultado de bake pronto.",
      "code": "Godot4.5, Forward+/desktop para gerar e comparar as três variantes.\nNenhum bake pré-calculado é fornecido. Compilação/unwrap/bake/runtime pendentes.\nEditor: gerar_cenas.gd cria cenas/lightmap.tscn, voxel.tscn e sdfgi.tscn.\nBoxMesh/SphereMesh são convertidos para ArrayMesh; estáticos recebem UV2\npor lightmap_unwrap no editor. PrimitiveMesh puro não recebe lightmap neste fluxo.\nTodas as malhas/luzes/GI têm o mesmo pai Sala e owner para salvar PackedScene.\nParedes com espessura; frente aberta para câmera fixa. Sem jogador/colisão física.\nLuz Omni em(0.2,2.8,0.25), sombra ligada e light_bake_mode=BAKE_DYNAMIC.\nEnergia direta1; alterar após bake não recalcula indireto do Lightmap.\nWorldEnvironment: fundo preto, ambiente difuso disabled, SSR/SSAO/glow desligados.\nSonda: size(4.6,3.4,4), centro(0,1.5,-0.5), interior/box_projection true,\nambient_mode=AMBIENT_DISABLED, cull_mask1, captura de sombras, UPDATE_ONCE.\nMetal está na layer2: recebe reflexão, mas não entra na captura layer1.\nLightmap: directional=false, probes subdiv8; bake no editor e salvar dados.\nVoxel: size(5,4,4), subdiv128; Bake no editor e salvar VoxelGIData em .res.\nSDFGI: read_sky_light=false, use_occlusion=true; aguardar estabilizar.\nSomente um sistema GI ativo por variante; não sobrepor técnicas na comparação.\nR restaura controles e recria sonda para recapturar; G/P alternam GI/sonda.\nCaptura Once pode ficar antiga; Always custa mais e não é obrigatório.\nO modelo web separa rebatimento difuso de captura especular idealizada.\nNo motor, GI também pode contribuir para reflexos; não exigir isolamento idêntico.\nLightmap directional pode fornecer reflexão muito rugosa por harmônicos;\nnão fornece uma captura local detalhada comparável à sonda desta oficina.\n",
      "language": "text",
      "pros": "Pré-requisitos e limites reunidos.",
      "cons": "Não é benchmark nem garantia de equivalência entre algoritmos."
    }
  ],
  "simulator": {
    "type": "gi_reflection_3d",
    "title": "Laboratório: mesma sala, contribuições separadas",
    "description": "Referência fixa só direta e seus ajustes. Em tela estreita, as salas ficam empilhadas. Esfera fosca à esquerda de cada sala; metal à direita. Modelo próprio, sem executar técnicas GI Godot.",
    "guide": [
      {
        "title": "Isole antes de comparar",
        "text": "Desligue rebatimento e captura: os quadros coincidem. Ligue só rebatimento e observe superfícies foscas; ligue só captura e observe o metal. Metal refletindo parede vermelha não é a mesma evidência que indireto na esfera fosca."
      },
      {
        "title": "Ganho e oclusão",
        "text": "O ganho 0–2 multiplica um único rebatimento aproximado a partir de 9 áreas da parede. Distância, orientação e bloqueios entram no cálculo. Com GI desligada o ganho fica desabilitado; luz direta permanece fixa. Há só uma parede rebatedora e uma captura direcional idealizada, sem box projection/roughness nativos."
      },
      {
        "title": "Repita sem movimento",
        "text": "R restaura; G alterna rebatimento e P alterna captura com foco na vista, sem repetição/modificadores. Botões equivalentes pelos controles. Não há personagem, avanço temporal ou benchmark. A pausa global não muda a comparação estática."
      }
    ]
  },
  "quiz": {
    "question": "No teste com a mesma câmera e luz, o metal reflete a parede vermelha, mas a esfera fosca continua sem ganho indireto. Qual interpretação e próximo passo fazem sentido?",
    "options": [
      "A parede refletida já prova que todos os rebatimentos difusos estão calculados.",
      "É possível haver captura especular sem rebatimento difuso. Isole os controles e confira a preparação/dados da técnica antes de aumentar a energia.",
      "Adicionar ReflectionProbe sempre substitui LightmapGI e elimina qualquer necessidade de UV2.",
      "SDFGI aceita qualquer porta móvel como oclusor dinâmico, portanto não é preciso conferir modos ou limites."
    ],
    "correctIndex": 1,
    "feedback": [
      "Reflexo no metal e indireto na superfície fosca são evidências diferentes.",
      "Correto. Separe contribuições, confirme dados/modos e compare com uma variável por vez.",
      "Uma sonda pode fornecer reflexão/ambiente conforme configuração, mas não substitui o fluxo de bake de lightmaps.",
      "Oclusores móveis são uma limitação de SDFGI; modos e atualização precisam ser conferidos."
    ],
    "explanation": "A imagem precisa ser interpretada pelos mecanismos ativos. Reflexão especular, indireto difuso e brilho direto não são sinônimos."
  }
},

{
  "id": "3d-pro-optimization-culling-lod",
  "area": "3d",
  "level": "profissional",
  "levelLabel": "Profissional",
  "title": "14. Otimização 3D: medir, descartar, simplificar e agrupar",
  "subtitle": "Formule uma hipótese, compare nas mesmas condições e confira custo e qualidade visual antes de aprovar uma otimização.",
  "nodesUsed": [
    "OccluderInstance3D",
    "BoxOccluder3D",
    "GeometryInstance3D",
    "MultiMeshInstance3D",
    "Performance"
  ],
  "feynman": {
    "title": "Enviar menos trabalho só ajuda quando esse trabalho importa",
    "explanation": "Uma oficina pode ter peças fora da câmera, escondidas por uma parede ou pequenas demais para exigir todos os detalhes. Cada caso permite uma decisão diferente. Também é possível agrupar peças para reduzir submissões; porém um grupo grande pode obrigar a enviar objetos que seriam descartados separadamente. Otimizar exige identificar o gargalo, mudar uma variável e medir novamente, conservando a qualidade necessária. Nenhuma dessas técnicas garante 60 FPS ou custo zero.",
    "analogies": [
      {
        "term": "Quatro perguntas diferentes",
        "analogy": "Está fora da vista? Está inteiramente coberto? Está longe para este detalhe? Compartilha trabalho com outras peças? Frustum, oclusão, nível de detalhe e agrupamento respondem a perguntas diferentes."
      },
      {
        "term": "Caixa de peças versus caixas por setor",
        "analogy": "Uma caixa única facilita transportar tudo, mas pode levar peças de que ninguém precisa naquele destino. Caixas menores permitem selecionar por área. MultiMesh reduz parte da submissão, enquanto o tamanho dos grupos influencia o descarte e o detalhe."
      },
      {
        "term": "O número que caiu pode não ser o gargalo",
        "analogy": "Reduzir a quantidade de triângulos não corrige necessariamente um script caro, transparências, custo de sombras ou espera por sincronização. Medir e separar causas é mais útil que escolher a técnica pelo nome."
      }
    ]
  },
  "howItWorks": {
    "overview": "Referência Godot 4.5/Forward+/desktop para a prática. O browser usa uma planta 2D conservadora com doze peças e contagens calculadas; não mede GPU. O projeto nativo contém uma malha glTF própria para exercitar a importação de mesh LOD, agrupamento espacial, occluder e leitura de monitores. Importação/compilação/runtime continuam pendentes.",
    "anatomy": [
      {
        "prop": "Medir antes e depois",
        "desc": "Fixe dispositivo, build, resolução, câmera, aquecimento e condições. Use tempo por frame e profiler; FPS pode estar limitado por VSync. TIME_PROCESS e TIME_PHYSICS_PROCESS não são tempo GPU. Alguns monitores atrasam ou não estão disponíveis em determinado build; zero não prova custo nulo. O painel mede a cena inteira, incluindo chão/parede/UI."
      },
      {
        "prop": "Frustum e oclusão não são a mesma seleção",
        "desc": "Frustum testa limites do objeto contra o volume da câmera. Occlusion culling usa geometria de bloqueio e testes conservadores para não remover partes visíveis; não é um teste do centro nem um limite fixo de ângulo. Tem custo de CPU e pode não compensar em cenários abertos. O suporte ativa a opção do projeto e fornece BoxOccluder3D dentro da parede; a parede visual continua existindo quando o recurso occluder é retirado."
      },
      {
        "prop": "Mesh LOD da importação",
        "desc": "Pode gerar malhas menos detalhadas ao importar cenas 3D compatíveis. Não significa que qualquer PrimitiveMesh criada em runtime ganha níveis automaticamente. A seleção usa erro em espaço de tela, FOV/resolução e configurações, não só uma distância universal. Em MultiMesh, as instâncias compartilham o nível selecionado a partir dos limites do nó. Confira Generate LODs, reimporte e observe antes de concluir que está ativo."
      },
      {
        "prop": "Visibility ranges e HLOD manual",
        "desc": "Controlam visibilidade por alcance e podem trocar representações/nós. O suporte oferece esfera perto/caixa longe como HLOD manual, separado do mesh LOD importado. Com fade disabled, margens podem fornecer histerese; fades SELF/DEPENDENCIES têm custo e dependem de Forward+ na referência 4.5. A bancada nativa usa corte seco/margens 0 para uma referência clara, sem prometer transição imperceptível. Sumir da renderização não pausa automaticamente scripts/física."
      },
      {
        "prop": "MultiMesh e limites do grupo",
        "desc": "Compartilha malha e transforma instâncias por índice. Formato/flags devem ser definidos antes da alocação. O grupo tem limites e não oferece culling individual das suas instâncias: separar setores pode enviar menos geometria, mesmo com mais grupos. O número real de calls depende de superfícies, materiais, passes, sombras e otimizações do renderer. visible_instance_count limita uma quantidade/prefixo; não é máscara arbitrária de objetos. Física/IA individual não aparece automaticamente."
      },
      {
        "prop": "Contadores precisam de escopo",
        "desc": "O modelo soma instâncias enviadas × orçamento alto/baixo e grupos submetidos para uma superfície/um passo. Não são draw calls ou triângulos medidos na GPU. O monitor de primitivas reporta vértices/índices de renderização, com efeitos de passes; não deve ser igualado diretamente ao total de triângulos-fonte. Reduzir um contador sem comparar imagem e tempo não aprova a mudança."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "Três scripts e uma malha glTF própria fornecem uma bancada local. O modelo web usa alto 1200/baixo 120 por peça, enquanto a esfera-fonte nativa tem 2208 triângulos e a caixa 12. Os níveis gerados pela Godot e as métricas reais dependem de importação/renderização.",
    "duration": "80–120 min com hipóteses, importação e medições (estimativa)",
    "prerequisite": "Aulas 3D 1–13: câmera, malhas/importação, materiais, sombras e custos de GI/partículas. Godot 4.5/Forward+/desktop; editor e hardware alvo para medir. Importação do glTF, compilação e execução nativa pendentes.",
    "objectives": [
      "Distinguir frustum, oclusão, alcance, mesh LOD e HLOD por critérios observáveis.",
      "Comparar objetos separados e grupos espaciais, explicando a troca entre submissões e geometria enviada.",
      "Registrar um teste A/B com condições fixas, métricas e qualidade visual, sem converter contagens do modelo em promessa de FPS."
    ],
    "practice": {
      "title": "Prática guiada: doze peças e uma hipótese por vez",
      "intro": "Importe project.godot, confira peca.gltf no Import e execute oficina.tscn. A malha foi criada para esta aula e tem buffer embutido, sem download externo. A câmera nativa olha +X; há uma parede visual e um occluder separado. O browser é uma planta plana simplificada, sem rasterização ou medição de hardware.",
      "tree": "Oficina (Node3D / oficina.gd)\n├── Grupos: 12 nós / 3 MultiMeshes / 1 MultiMesh\n│   └── malha de peca.gltf ou caixa de HLOD manual\n├── ParedeVisual (MeshInstance3D)\n├── OccluderInstance3D → BoxOccluder3D\n├── Piso, Camera3D, luz sem sombras e WorldEnvironment\n└── CanvasLayer / Interface + Timer de medição\n\nMesh LOD: gerado pelo importador do glTF, a conferir.\nHLOD: duas representações com visibility ranges.\nSem física/IA individual. Descartar visual não é parar processamento.",
      "download": {
        "url": "assets/aula-3d-14-otimizacao-medicao.zip",
        "label": "Baixar projeto de apoio: visibilidade e medição"
      },
      "downloadNote": "Nove arquivos, três scripts e glTF próprio. Malha-fonte validada documentalmente; níveis importados/runtime ainda pendentes.",
      "steps": [
        {
          "title": "Escreva a hipótese e fixe a referência",
          "text": "Antes de ativar opções, registre câmera, resolução, dispositivo/build e qual custo pretende reduzir. Separe geometria enviada, chamadas, CPU, GPU e qualidade. No browser use R para restaurar a referência.",
          "expect": "A hipótese pode ser reduzir submissões ou geometria, não aumentar FPS por definição. O quadro estático do Canvas não mede o projeto; métricas de hardware só virão da execução real."
        },
        {
          "title": "Leia a contagem padrão do modelo",
          "text": "Com câmera 0/giro 0, occluder ligado, detalhe ligado, alcance desligado e peças individuais, some categorias e orçamento. Observe 12 peças,4 ocultas,8 enviadas; das enviadas 6 são altas e 2 baixas.",
          "expect": "6 × 1200 + 2 × 120 = 7440 triângulos teóricos;8 lotes ideais sob a hipótese de uma superfície/um passo. Os números vêm das peças/classificação. A parede e a UI não entram nesse orçamento, mas entram nas métricas nativas."
        },
        {
          "title": "Mude o enquadramento e o bloqueio separadamente",
          "text": "A/D ou setas giram, W/S alteram X no modelo, e sliders fazem o mesmo. Desligue só o occluder, mantendo a parede visual. Depois restaure e teste alcance 12. Observe descarte por grupo inteiro quando mudar o agrupamento.",
          "expect": "Frustum e oclusão são etapas diferentes. Occluder off não significa parede invisível; a renderização real ainda pode ocultar pixels pelo depth test depois de enviar geometria. Alcance 12 individual deixa 4 peças, enquanto um grupo global cujo centro fica além do limite pode sumir inteiro."
        },
        {
          "title": "Compare custo de agrupamento",
          "text": "Restaure e compare individual,3 colunas e grupo global. Mantenha as mesmas posições/opções. Compare não só lotes, mas também triângulos enviados e limites tracejados.",
          "expect": "Na referência: individual 8 lotes/7440 tris; colunas 3/10080; global 1/14400. São resultados deste modelo conservador. O grupo global envia mais trabalho geométrico; não comprova ser mais rápido. A Godot pode realizar outros agrupamentos e passes."
        },
        {
          "title": "Confira importação e os dois tipos de detalhe",
          "text": "No projeto, selecione peca.gltf, confira Generate LODs e reimporte. Compare Sem LOD, Mesh LOD e HLOD manual. A malha-fonte contém 2208 triângulos; níveis simplificados não são entregues como bake pronto.",
          "expect": "Mesh LOD depende da importação e do erro em tela. HLOD troca esfera/caixa em faixas; não é o mesmo mecanismo. PrimitiveMesh da caixa não precisa ganhar LOD automático para servir de representação manual. Avalie silhueta e transições."
        },
        {
          "title": "Observe oclusor e alcance nativos",
          "text": "Compare o recurso BoxOccluder3D ligado/desligado e alcance 20. Para medir custo global do sistema, faça outro teste com a opção do projeto desligada e reinicie. Mantenha câmera/build/resolução iguais.",
          "expect": "O checkbox do apoio remove só a forma; o sistema continua ativo. AABB e visibilidade nativas não precisam reproduzir a planta 2D. Objetos parcialmente visíveis não devem ser removidos; reveja forma/tamanho do occluder se isso acontecer."
        },
        {
          "title": "Registre A/B depois de estabilizar",
          "text": "Após cada troca de estratégia, aguarde a importação e a recriação terminarem e os medidores estabilizarem. Registre draw calls, índices/vértices reportados, tempo process/física, memória e observação visual. Use profiler/visual profiler para investigar GPU e gargalo.",
          "expect": "O painel atualiza 0,5 s, mas certos monitores atrasam até 1 s ou dependem do build. VSync pode mascarar diferenças em FPS. Compare custos repetidos em condições equivalentes; zero indisponível não é ganho demonstrado."
        },
        {
          "title": "Aprove qualidade e defina o próximo teste",
          "text": "Verifique popping, silhueta, paredes/aberturas, sombras e alcance. Teste R e trocas de grupo várias vezes. Escreva uma decisão com evidência e uma limitação; revise o roteiro do apoio.",
          "expect": "Uma redução de contador sem ganho relevante/qualidade aceitável não basta. O ciclo é hipótese → medição → mudança → reteste. Ao encerrar a trilha, integre os conceitos num projeto pequeno e valide no destino, preservando registros e pendências."
        }
      ]
    },
    "checks": [
      {
        "question": "Menos triângulos no modelo garantem mais FPS?",
        "answer": "Não. O gargalo pode estar em CPU, materiais, overdraw, sombras, sincronização ou outro trabalho. O modelo não mede a GPU; compare tempo e qualidade no hardware real."
      },
      {
        "question": "Por que um MultiMesh global pode enviar peças fora da vista?",
        "answer": "A seleção usa os limites do grupo, sem culling individual de cada instância. Grupos espaciais menores preservam mais oportunidades de descarte e seleção de detalhe."
      },
      {
        "question": "Por que o corte manual de 16 u não é o mesh LOD nativo?",
        "answer": "O corte é uma regra própria de distância. Mesh LOD gerado pela importação usa métrica em tela, limites, FOV e resolução. HLOD/visibility ranges permitem representações e faixas escolhidas pelo autor."
      },
      {
        "question": "Desligar o recurso occluder mede o custo total de desligar occlusion culling?",
        "answer": "Não. O apoio mantém o sistema habilitado no projeto. Para medir a diferença global, faça teste separado de configuração/reinício, nas mesmas condições."
      }
    ],
    "pitfalls": [
      {
        "title": "O contador caiu, mas o jogo não ficou mais rápido",
        "text": "Confirme gargalo, VSync, resolução, build e escopo do monitor. Separe process/física de GPU e considere ruído/aquecimento. Não invente percentual de economia a partir do Canvas."
      },
      {
        "title": "A parede corta objetos que ainda deveriam aparecer",
        "text": "Confira forma opaca, tamanho e aberturas do occluder; ele deve caber no bloqueio real. O modelo plano simplificado não valida um cenário com altura, portas e malhas transparentes."
      },
      {
        "title": "Mesh LOD parece não fazer nada",
        "text": "Confira importação de cena3D e geração/reimport; não espere níveis em qualquer PrimitiveMesh runtime. Observe FOV/resolução, bias e threshold. Compare geometria em vista/diagnóstico, não apenas FPS limitado."
      },
      {
        "title": "O agrupamento global ficou mais caro",
        "text": "Reveja AABB, distribuição espacial, luzes, superfícies, passes e seleção de detalhe compartilhada. visible_instance_count não substitui seleção espacial arbitrária. Teste setores menores."
      },
      {
        "title": "A transição tem popping ou custo de transparência",
        "text": "Escolha histerese/margens e representações adequadas. Fades podem custar mais e têm restrições de renderizador. A referência do projeto usa corte seco; não é uma configuração final universal."
      }
    ],
    "summary": "Identifique o gargalo, fixe condições e compare tempo e imagem. Frustum, oclusão, alcance, detalhe e agrupamento atuam em pontos diferentes do trabalho. Um grupo pode reduzir submissões e aumentar geometria; uma técnica só é aprovada para seu caso depois de medir.",
    "next": "A trilha termina aqui. O próximo exercício é integrar uma cena pequena, exportar para o dispositivo alvo e registrar testes. Conteúdos de publicação, acessibilidade e aprofundamentos devem ser planejados conforme os objetivos do projeto; não presumir que uma revisão editorial equivale à homologação no motor.",
    "sources": [
      {
        "label": "Godot 4.5 — occlusion culling",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/occlusion_culling.html"
      },
      {
        "label": "Mesh LOD — importação e erro em tela",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/mesh_lod.html"
      },
      {
        "label": "Visibility ranges/HLOD",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/3d/visibility_ranges.html"
      },
      {
        "label": "GeometryInstance3D — margens/fade",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_geometryinstance3d.html"
      },
      {
        "label": "MultiMesh — limites e instâncias",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_multimesh.html"
      },
      {
        "label": "OccluderInstance3D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_occluderinstance3d.html"
      },
      {
        "label": "BoxOccluder3D — size",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_boxoccluder3d.html"
      },
      {
        "label": "Performance — monitores e disponibilidade",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_performance.html"
      },
      {
        "label": "Viewport — LOD e configuração raiz",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_viewport.html"
      },
      {
        "label": "Otimização geral",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/performance/general_optimization.html"
      },
      {
        "label": "Otimização GPU",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/performance/gpu_optimization.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Grupos e faixas · grupos.gd",
      "whenToUse": "Separar instancing, limites espaciais e alcance.",
      "description": "Formato antes da alocação, transforms locais e AABB. Faixas de referência sem fade/histerese para comparar mecanismos.",
      "code": "extends RefCounted\n\nstatic func criar(mesh: Mesh, pontos: Array, separado: bool) -> GeometryInstance3D:\n    var centro := Vector3.ZERO\n    for p in pontos:\n        centro += p\n    centro /= pontos.size()\n    if separado:\n        var no := MeshInstance3D.new()\n        no.mesh = mesh\n        no.position = centro\n        return no\n    var mm := MultiMesh.new()\n    mm.transform_format = MultiMesh.TRANSFORM_3D # Antes de alocar instâncias.\n    mm.mesh = mesh\n    mm.instance_count = pontos.size()\n    var limites := AABB(pontos[0] - centro - Vector3.ONE * 0.45, Vector3.ONE * 0.9)\n    for i in range(pontos.size()):\n        var local: Vector3 = pontos[i] - centro\n        mm.set_instance_transform(i, Transform3D(Basis.IDENTITY, local))\n        limites = limites.merge(AABB(local - Vector3.ONE * 0.45, Vector3.ONE * 0.9))\n    mm.custom_aabb = limites\n    var grupo := MultiMeshInstance3D.new()\n    grupo.multimesh = mm\n    grupo.position = centro\n    return grupo\n\nstatic func faixas(no: GeometryInstance3D, inicio: float, fim: float) -> void:\n    no.visibility_range_begin = inicio\n    no.visibility_range_end = fim\n    no.visibility_range_begin_margin = 0.0\n    no.visibility_range_end_margin = 0.0\n    no.visibility_range_fade_mode = GeometryInstance3D.VISIBILITY_RANGE_FADE_DISABLED\n    # Referência de corte seco. Estude histerese/margens antes de adotar no jogo.\n",
      "pros": "Responsabilidades explícitas.",
      "cons": "Não adiciona física/IA individual nem garante um único call em todos os passes."
    },
    {
      "title": "2. Bancada nativa · oficina.gd",
      "whenToUse": "Comparar estratégias nas mesmas posições/câmera.",
      "description": "Carrega glTF, permite agrupamento, occluder, mesh LOD/HLOD e restauração. Trocar câmera não recria os grupos.",
      "code": "extends Node3D\nconst GRUPOS = preload(\"res://grupos.gd\")\nconst MEDICAO = preload(\"res://medicao.gd\")\nvar mesh_alta: Mesh\nvar mesh_baixa: BoxMesh\nvar camera: Camera3D\nvar colecao: Node3D\nvar bloqueador: OccluderInstance3D\nvar caixa_oclusao: BoxOccluder3D\nvar painel: VBoxContainer\nvar giro: HSlider\nvar posicao: HSlider\nvar agrupamento: OptionButton\nvar detalhe: OptionButton\nvar alcance: CheckButton\nvar oclusao: CheckButton\nvar leitura: Label\n\nfunc slider(texto: String, minimo: float, maximo: float, passo: float, valor: float) -> HSlider:\n    var l := Label.new()\n    l.text = texto\n    painel.add_child(l)\n    var s := HSlider.new()\n    s.min_value = minimo\n    s.max_value = maximo\n    s.step = passo\n    s.value = valor\n    painel.add_child(s)\n    s.value_changed.connect(func(_v: float): atualizar_camera())\n    return s\n\nfunc caixa(nome: String, tamanho: Vector3, pos: Vector3) -> void:\n    var m := MeshInstance3D.new()\n    m.name = nome\n    var box := BoxMesh.new()\n    box.size = tamanho\n    m.mesh = box\n    m.position = pos\n    add_child(m)\n\nfunc _ready() -> void:\n    var importada: PackedScene = load(\"res://peca.gltf\")\n    var instancia := importada.instantiate()\n    var meshes := instancia.find_children(\"*\", \"MeshInstance3D\", true, false)\n    if instancia is MeshInstance3D:\n        mesh_alta = instancia.mesh\n    elif not meshes.is_empty():\n        mesh_alta = (meshes[0] as MeshInstance3D).mesh\n    instancia.free()\n    if mesh_alta == null:\n        push_error(\"Mesh importada não encontrada; confira peca.gltf e Import/Generate LODs.\")\n        return\n    mesh_baixa = BoxMesh.new()\n    mesh_baixa.size = Vector3.ONE * 0.9\n    colecao = Node3D.new()\n    colecao.name = \"Grupos\"\n    add_child(colecao)\n    caixa(\"ParedeVisual\", Vector3(0.4, 3, 6), Vector3(10, 1.5, 0))\n    caixa(\"Piso\", Vector3(28, 0.2, 18), Vector3(12, -0.1, 0))\n    bloqueador = OccluderInstance3D.new()\n    bloqueador.position = Vector3(10, 1.5, 0)\n    caixa_oclusao = BoxOccluder3D.new()\n    caixa_oclusao.size = Vector3(0.35, 2.9, 5.9)\n    bloqueador.occluder = caixa_oclusao\n    add_child(bloqueador)\n    camera = Camera3D.new()\n    camera.keep_aspect = Camera3D.KEEP_WIDTH\n    camera.fov = 70\n    camera.near = 1\n    camera.far = 26\n    camera.current = true\n    add_child(camera)\n    var luz := DirectionalLight3D.new()\n    luz.rotation_degrees = Vector3(-45, -30, 0)\n    luz.shadow_enabled = false # Sombras adicionariam outros passes à comparação.\n    add_child(luz)\n    var mundo := WorldEnvironment.new()\n    var e := Environment.new()\n    e.background_mode = Environment.BG_COLOR\n    e.background_color = Color(0.04, 0.03, 0.02)\n    e.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR\n    e.ambient_light_color = Color.WHITE\n    e.ambient_light_energy = 0.35\n    mundo.environment = e\n    add_child(mundo)\n    interface()\n    restaurar()\n    var relogio := Timer.new()\n    relogio.wait_time = 0.5\n    relogio.timeout.connect(func(): leitura.text = MEDICAO.ler())\n    add_child(relogio)\n    relogio.start()\n\nfunc interface() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var fundo := PanelContainer.new()\n    fundo.position = Vector2(20, 550)\n    layer.add_child(fundo)\n    painel = VBoxContainer.new()\n    painel.custom_minimum_size.x = 690\n    fundo.add_child(painel)\n    giro = slider(\"Giro da câmera em graus\", -60, 60, 5, 0)\n    posicao = slider(\"Posição X da câmera\", 0, 4, 0.5, 0)\n    agrupamento = OptionButton.new()\n    for texto in [\"12 nós separados\", \"3 MultiMeshes por coluna\", \"1 MultiMesh global\"]:\n        agrupamento.add_item(texto)\n    painel.add_child(agrupamento)\n    agrupamento.item_selected.connect(func(_i: int): reconstruir())\n    detalhe = OptionButton.new()\n    for texto in [\"Sem LOD\", \"Mesh LOD da importação\", \"HLOD manual: esfera perto/caixa longe\"]:\n        detalhe.add_item(texto)\n    painel.add_child(detalhe)\n    detalhe.item_selected.connect(func(_i: int): reconstruir())\n    alcance = CheckButton.new()\n    alcance.text = \"Alcance final 20 u, sem fade (referência)\"\n    painel.add_child(alcance)\n    alcance.toggled.connect(func(_v: bool): reconstruir())\n    oclusao = CheckButton.new()\n    oclusao.text = \"Occluder ativo; parede visual permanece\"\n    painel.add_child(oclusao)\n    oclusao.toggled.connect(func(ativo: bool): bloqueador.occluder = caixa_oclusao if ativo else null)\n    var reset := Button.new()\n    reset.text = \"Restaurar referência · R\"\n    painel.add_child(reset)\n    reset.pressed.connect(restaurar)\n    leitura = Label.new()\n    painel.add_child(leitura)\n\nfunc atualizar_camera() -> void:\n    if posicao == null or giro == null:\n        return\n    camera.position = Vector3(posicao.value, 1.5, 0)\n    camera.rotation.y = -PI / 2.0 - deg_to_rad(giro.value)\n\nfunc reconstruir() -> void:\n    if alcance == null:\n        return\n    for filho in colecao.get_children():\n        filho.free()\n    var limiar := 1.0 if detalhe.selected == 1 else 0.0\n    ProjectSettings.set_setting(\"rendering/mesh_lod/lod_change/threshold_pixels\", limiar)\n    get_viewport().mesh_lod_threshold = limiar\n    var pontos: Array = []\n    for x in [8.0, 14.0, 20.0]:\n        for z in [-6.0, -2.0, 2.0, 6.0]:\n            pontos.append(Vector3(x, 0.45, z))\n    var grupos: Array = []\n    if agrupamento.selected == 0:\n        for p in pontos:\n            grupos.append([p])\n    elif agrupamento.selected == 1:\n        for i in range(3):\n            grupos.append(pontos.slice(i * 4, i * 4 + 4))\n    else:\n        grupos.append(pontos)\n    var material := StandardMaterial3D.new()\n    material.albedo_color = Color(0.65, 0.38, 0.13)\n    for grupo in grupos:\n        var alta := GRUPOS.criar(mesh_alta, grupo, agrupamento.selected == 0)\n        alta.material_override = material\n        colecao.add_child(alta)\n        var limite := 20.0 if alcance.button_pressed else 0.0\n        GRUPOS.faixas(alta, 0.0, 16.0 if detalhe.selected == 2 else limite)\n        if detalhe.selected == 2:\n            var baixa := GRUPOS.criar(mesh_baixa, grupo, agrupamento.selected == 0)\n            baixa.material_override = material\n            colecao.add_child(baixa)\n            GRUPOS.faixas(baixa, 16.0, limite)\n    # Recriação só ao trocar estratégia. Aguarde estabilizar antes de registrar métricas.\n\nfunc restaurar() -> void:\n    giro.set_value_no_signal(0)\n    posicao.set_value_no_signal(0)\n    agrupamento.select(0)\n    detalhe.select(1)\n    alcance.set_pressed_no_signal(false)\n    oclusao.set_pressed_no_signal(true)\n    bloqueador.occluder = caixa_oclusao\n    atualizar_camera()\n    reconstruir()\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if event is InputEventKey and event.pressed and not event.echo and not event.ctrl_pressed and not event.alt_pressed and not event.meta_pressed:\n        if event.keycode == KEY_R:\n            restaurar()\n",
      "pros": "Cena local sem assets externos.",
      "cons": "Importação/compilação/runtime e fronteiras devem ser testados no motor."
    },
    {
      "title": "3. Medir com escopo · medicao.gd",
      "whenToUse": "Ler a cena real sem chamar orçamento fictício de medida.",
      "description": "Unidades e limitações dos monitores explícitas. Atualização por Timer no controlador.",
      "code": "extends RefCounted\n\nstatic func ler() -> String:\n    var fps := Performance.get_monitor(Performance.TIME_FPS)\n    var processo_ms := Performance.get_monitor(Performance.TIME_PROCESS) * 1000.0\n    var fisica_ms := Performance.get_monitor(Performance.TIME_PHYSICS_PROCESS) * 1000.0\n    var chamadas := Performance.get_monitor(Performance.RENDER_TOTAL_DRAW_CALLS_IN_FRAME)\n    var primitivas := Performance.get_monitor(Performance.RENDER_TOTAL_PRIMITIVES_IN_FRAME)\n    var memoria_mib := Performance.get_monitor(Performance.RENDER_VIDEO_MEM_USED) / 1048576.0\n    return \"FPS %.0f | process %.2f ms | física %.2f ms\\nDraw calls/frame %.0f | índices/vértices reportados %.0f | memória reportada %.1f MiB\\nMétricas da cena inteira, incluindo piso/parede/UI; não apenas as 12 peças.\\nAlguns monitores atrasam até 1 s ou não estão disponíveis em todo build.\\nProcess/física não são tempo GPU; usar profiler e hardware alvo.\" % [fps, processo_ms, fisica_ms, chamadas, primitivas, memoria_mib]\n",
      "pros": "Process/física, calls, memória e FPS contextualizados.",
      "cons": "Não fornece tempo GPU nem disponibilidade idêntica por build."
    },
    {
      "title": "4. Configuração e limites",
      "whenToUse": "Conferir diferenças entre modelo e motor.",
      "description": "Leia junto ao roteiro; glTF próprio precisa de importação pela Godot.",
      "code": "Godot4.5/Forward+/desktop; execução nativa pendente. Nove arquivos locais.\nImportar project.godot; peca.gltf é malha própria com buffer embutido, sem download.\nConfira Import/Generate LODs e reimporte. Não assumir LOD em PrimitiveMesh criada no jogo.\n12 peças: X8/14/20, Z-6/-2/2/6, centroY0.45. Esfera fonte raio0.45.\nCamera: KEEP_WIDTH, fov70, near1, far26, posiçãoX0..4/Y1.5/Z0, olhando+X.\nRoot viewport: rendering/occlusion_culling/use_occlusion_culling=true no projeto.\nOccluder é uma BoxOccluder3D dentro da parede visual; checkbox remove só o recurso\noccluder, mantendo o sistema ligado. Para medir custo total do sistema, faça teste\nseparado com ProjectSettings desligado e reinicie, mantendo o restante igual.\nMultiMesh: formato3D antes de instance_count; mesh compartilhada; AABB por grupo.\nSem física/IA/colisão individual automática. visible_instance_count não é máscara arbitrária.\nSem LOD: mesh_lod_threshold0. Mesh LOD:threshold1, geração por importação.\nHLOD: duas geometrias, troca16u com faixas e margens0 na referência; sem fade.\nAlcance20u opcional. Inspecionar fronteiras e estudar histerese/margens antes de usar no jogo.\nNo browser: alto1200/baixo120 são orçamentos fictícios; no projeto, a esfera possui\n2208 triângulos-fonte e a caixa12. LOD gerado pode ter outros níveis; não confundir.\nMonitores: FPS, TIME_PROCESS/PHYSICS emms, draw calls, primitivas, memória emMiB.\nTexto atualiza0.5s; alguns monitores atrasam até 1 s/variam por build. Não mede tempo GPU.\nEsperar após troca de estratégia/importação e comparar mesma câmera/resolução/build.\nSem promessa de60FPS, único draw call global ou invisibilidade sem custo.\n",
      "language": "text",
      "pros": "Condições e limites reunidos.",
      "cons": "Não é benchmark nem orçamento aprovado."
    }
  ],
  "simulator": {
    "type": "occlusion_lod_3d",
    "title": "Laboratório: visibilidade e custo de agrupar",
    "description": "Planta 2D com 12 peças e contagens calculadas. Compare etapas e agrupamento sem confundir orçamento teórico com FPS ou draw calls medidos.",
    "guide": [
      {
        "title": "Conte por categoria",
        "text": "12 peças em X 8/14/20 e Z−6/−2/2/6, raio 0,45. Frustum horizontal 70°, perto 1/longe 26. Círculos contêm grupos e testes são conservadores; não são AABB/Embree3D. Parede emX10, Z−3..3, tratada como alta/opaca nesta planta."
      },
      {
        "title": "Compare desenho e submissão",
        "text": "Ciano enviado, cinza fora, laranja oculto e lilás alcance. Desligar o occluder não apaga a parede. Grupos são enviados/descartados por inteiro. Os orçamentos 1200/120 e o corte além de 16 u são regras próprias; lotes pressupõem uma superfície/um passo."
      },
      {
        "title": "Repita com controle",
        "text": "A/D ou setas giram a câmera; W/S ajustam X em 0,5 u; R restaura. Sliders/seletores fazem as mesmas comparações. Alcance fica desabilitado quando não se aplica. Cena estática, sem avanço temporal e sem benchmark de hardware."
      }
    ]
  },
  "quiz": {
    "question": "Ao trocar objetos separados por um MultiMesh global, os lotes teóricos caíram, mas a geometria enviada aumentou. Qual decisão está correta?",
    "options": [
      "A menor quantidade de lotes prova que o FPS vai aumentar.",
      "O grupo pode perder descarte individual e compartilhar seleção de detalhe. Compare setores menores, tempo real e qualidade nas mesmas condições.",
      "Visibility range desliga automaticamente toda física e IA fora do alcance.",
      "O número de triângulos do Canvas é o mesmo monitor de vértices/índices de qualquer frame Godot."
    ],
    "correctIndex": 1,
    "feedback": [
      "Menos lotes não determina sozinho o gargalo ou o custo final.",
      "Correto. Agrupamento tem tradeoffs; medir e avaliar imagem é parte da decisão.",
      "Visibilidade não pausa automaticamente lógica/física.",
      "São contagens e escopos diferentes; o modelo não mede renderização nativa."
    ],
    "explanation": "Otimização deve ser sustentada por teste A/B e qualidade, reconhecendo os limites de cada técnica e métrica."
  }
}
];
