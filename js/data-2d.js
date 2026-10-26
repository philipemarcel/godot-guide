// ============================================================================
// ACADEMIA AETHER & GODOT — CURRÍCULO COMPLETO DA OFICINA 2D
// Níveis: Introdução, Iniciante, Intermediário, Avançado, Profissional
// Pedagogia: Técnica Feynman ("Aprenda como se tivesse 10 anos") + Múltiplas Abordagens
// ============================================================================

window.GODOT_LESSONS_2D = [
  // ==========================================================================
  // NÍVEL I — INTRODUÇÃO (Aprendiz de Caldeira)
  // ==========================================================================
  {
    "id": "2d-intro-nodes-scenes",
    "area": "2d",
    "level": "introducao",
    "levelLabel": "Introdução",
    "title": "1. Nós, cenas e a árvore de cena",
    "subtitle": "Monte uma pequena locomotiva, descubra o que acontece com seus filhos e reutilize uma cena. A prática principal não exige programação.",
    "nodesUsed": [
      "Node",
      "Node2D",
      "Sprite2D",
      "SceneTree",
      "PackedScene"
    ],
    "teaching": {
      "duration": "25–35 min, incluindo a prática (estimativa)",
      "prerequisite": "Godot 4.x aberto. Localize os painéis Scene/Cena, FileSystem/Sistema de arquivos e Inspector/Inspetor. Se ainda não consegue criar um projeto e uma cena 2D, use o projeto de apoio para acompanhar e registre essa etapa como pré-requisito.",
      "objectives": [
        "Distinguir um nó, uma cena salva e uma instância dessa cena.",
        "Montar uma hierarquia pai–filho e prever o efeito de mover o pai.",
        "Salvar e reutilizar uma cena pelo editor, sem depender de código."
      ],
      "practice": {
        "title": "Prática guiada: sua primeira locomotiva",
        "intro": "Trabalhe no editor da Godot. Primeiro monte uma cena com dois nós; só depois reutilize o conjunto. Os nomes dos comandos podem variar com o idioma do editor.",
        "tree": "Locomotiva (Node2D) — posição (240, 145)\n└── Peca (Sprite2D) — posição local (68, 0)",
        "steps": [
          {
            "title": "Crie o pai",
            "text": "Em uma cena vazia, escolha uma raiz 2D (Node2D) e renomeie-a para `Locomotiva`. No Inspector, abra Transform e defina Position como `x = 240`, `y = 145`. Deixe Rotation em `0` e Scale em `(1, 1)`.",
            "expect": "Um Node2D vazio não desenha uma locomotiva. Sua função aqui é organizar a transformação do conjunto."
          },
          {
            "title": "Adicione uma peça visível",
            "text": "Selecione `Locomotiva` e adicione um filho `Sprite2D`, chamado `Peca`. Arraste uma imagem para a propriedade Texture. No projeto de apoio, use `engrenagem.svg`. Defina a Position do filho como `(68, 0)`.",
            "expect": "No painel Scene, Peca aparece recuada abaixo de Locomotiva. Com as transformações deste exemplo, a posição global da peça é `(308, 145)`."
          },
          {
            "title": "Preveja antes de mover",
            "text": "Sem alterar Peca, aumente apenas o X de Locomotiva de `240` para `340`. Antes de olhar, preveja: o filho fica parado ou acompanha o pai?",
            "expect": "A peça acompanha o pai por 100 pixels. Seu valor local continua `(68, 0)`; o global passa a `(408, 145)`. Aqui basta somar porque não há rotação nem escala diferente de 1."
          },
          {
            "title": "Compare com mover apenas o filho",
            "text": "Volte o pai para `(240, 145)`. Agora altere somente o X de Peca de `68` para `100`.",
            "expect": "Só a peça muda em relação ao pai. O pai continua em `(240, 145)` e a posição global da peça passa a `(340, 145)`."
          },
          {
            "title": "Salve a cena como um conjunto",
            "text": "Volte Peca para `(68, 0)` e salve a cena como `locomotiva.tscn`. O arquivo guarda a estrutura e as propriedades salvas dos nós.",
            "expect": "O arquivo aparece no FileSystem. Salvar uma cena não cria automaticamente uma nova cópia dela na cena atual."
          },
          {
            "title": "Instancie pelo editor",
            "text": "Crie outra cena 2D, com raiz `Oficina`, em `(0, 0)`. Salve como `oficina.tscn`. Arraste `locomotiva.tscn` do FileSystem para o painel Scene, sobre Oficina, duas vezes. Renomeie as instâncias para `LocomotivaA` e `LocomotivaB` e coloque-as em `(240, 145)` e `(440, 145)`.",
            "expect": "Agora existem duas instâncias do mesmo modelo. Mover A não move B: elas são irmãs, não pai e filho uma da outra."
          },
          {
            "title": "Confira a execução",
            "text": "Salve e use Executar cena atual (F6 no Windows/Linux, ou o comando equivalente do editor) com `oficina.tscn` aberta. O projeto de apoio já contém esse resultado para comparação.",
            "expect": "Você vê duas peças em posições diferentes. Se a janela estiver vazia, confirme Texture, posição e qual cena foi executada."
          }
        ],
        "download": {
          "url": "assets/aula-01-oficina.zip",
          "label": "Baixar projeto de apoio da aula 1"
        },
        "downloadNote": "Extraia o ZIP e importe o arquivo project.godot na Godot 4.x. É um exemplo completo para inspeção; o roteiro abaixo mostra como construí-lo. O projeto não precisa de scripts para a prática principal."
      },
      "pitfalls": [
        {
          "title": "“Meu nó não aparece.”",
          "text": "Node e Node2D não exibem uma imagem por conta própria. Neste exemplo, quem desenha a textura é Sprite2D. Confira também se Texture foi preenchida e se o objeto está na área visível."
        },
        {
          "title": "“O filho não acompanha o pai.”",
          "text": "Confira a hierarquia e os tipos. A herança de transformação descrita aqui vale para a cadeia de CanvasItem, como Node2D e Sprite2D, com Top Level desativado. Inserir um Node comum no meio interrompe essa cadeia; um Node comum não possui posição 2D."
        },
        {
          "title": "“O script não encontra Peca.”",
          "text": "`$Peca` procura um filho com esse nome a partir do nó que contém o script. Renomear ou mover a peça pode mudar o caminho. O exemplo de código deve estar em Locomotiva, não em Oficina."
        }
      ],
      "checks": [
        {
          "question": "Uma cena precisa ter muitos nós?",
          "answer": "Não. Uma cena pode ter apenas seu nó raiz. Ela também pode incluir árvores maiores e instâncias de outras cenas."
        },
        {
          "question": "Qual a diferença entre locomotiva.tscn e as duas locomotivas na Oficina?",
          "answer": "O arquivo é a cena salva, usada como modelo. A e B são instâncias: cada uma tem seu estado em execução e pode ter propriedades sobrescritas no editor. Uma alteração na cena original pode chegar às instâncias, mas uma propriedade sobrescrita na instância tem prioridade."
        },
        {
          "question": "Como explicaria posição local e global sem usar a analogia?",
          "answer": "Position descreve a transformação relativa ao pai CanvasItem. Global_position considera a cadeia de transformações até o espaço global 2D. Neste exemplo sem rotação e com escala unitária, a posição do filho é a soma das posições do pai e do filho."
        }
      ],
      "summary": "Um nó é uma unidade da cena; uma cena salva guarda uma estrutura reutilizável; instanciar cria uma ocorrência dessa estrutura. Antes de avançar, consiga montar a hierarquia e explicar por que mover Locomotiva move Peca, mas não uma locomotiva irmã.",
      "next": "Na aula 2, vamos estudar os eixos e Vector2 para entender melhor os números usados em position e global_position.",
      "sources": [
        {
          "label": "Godot: nós e cenas",
          "url": "https://docs.godotengine.org/en/stable/getting_started/step_by_step/nodes_and_scenes.html"
        },
        {
          "label": "Godot: criar instâncias de cenas",
          "url": "https://docs.godotengine.org/en/stable/getting_started/step_by_step/instancing.html"
        },
        {
          "label": "Godot: Node2D",
          "url": "https://docs.godotengine.org/en/stable/classes/class_node2d.html"
        },
        {
          "label": "Godot: CanvasItem e herança de transformação",
          "url": "https://docs.godotengine.org/en/stable/classes/class_canvasitem.html"
        },
        {
          "label": "Godot: nomes únicos na cena",
          "url": "https://docs.godotengine.org/en/stable/tutorials/scripting/scene_unique_nodes.html"
        }
      ]
    },
    "feynman": {
      "title": "Uma peça, um conjunto e um modelo reutilizável",
      "explanation": "Pense em uma oficina de brinquedos. Uma peça tem uma função; um conjunto reúne peças que trabalham juntas. Na Godot, o **nó** é a unidade básica: alguns desenham imagens, outros reproduzem áudio ou organizam o projeto. Não é obrigatório que cada nó faça apenas uma coisa.\n\nUma **cena** é uma árvore de nós com uma única raiz. Ela pode ser tão simples quanto um nó ou reunir um personagem inteiro. Ao salvar essa estrutura, você cria um arquivo como `locomotiva.tscn`.\n\n**Instanciar** é criar uma ocorrência dessa cena. Você pode colocar duas locomotivas na oficina: ambas vieram do mesmo modelo, mas cada uma pode ter sua própria posição. A analogia ajuda a começar; no editor, procure sempre os nós e suas relações reais.",
      "analogies": [
        {
          "term": "Nó → peça ou organizador",
          "analogy": "Uma unidade com propriedades e comportamentos. Node2D organiza posição, rotação e escala; Sprite2D pode exibir uma textura."
        },
        {
          "term": "Cena → conjunto com uma raiz",
          "analogy": "Locomotiva e sua peça formam uma pequena árvore que pode ser salva e usada em outras cenas."
        },
        {
          "term": "Instância → uma ocorrência do modelo",
          "analogy": "Duas locomotivas podem usar a mesma cena salva sem terem que compartilhar a mesma posição."
        }
      ]
    },
    "howItWorks": {
      "overview": "No painel **Scene/Cena**, o recuo mostra quem é filho de quem. Um filho pertence a um único pai por vez; o pai pode ter vários filhos. Dois nós sob o mesmo pai são irmãos.\n\nA árvore da cena que você edita não é toda a aplicação em execução. **SceneTree** é o objeto que gerencia a árvore ativa do jogo, que pode conter a cena atual e outros nós. A aba Remote/Remoto permite inspecionar essa árvore enquanto o jogo roda.\n\nNeste exemplo, Locomotiva é Node2D e Peca é Sprite2D, que também herda de Node2D. Nas configurações padrão, o filho acompanha posição, rotação e escala do pai. Isso não deve ser generalizado para todos os tipos de nó.\n\nPara começar, não use a posição na árvore como regra universal sobre execução ou desenho. Há propriedades de ordem visual, como `z_index`, e regras próprias dos callbacks. O ciclo de vida dos scripts será tratado na aula 3.",
      "anatomy": [
        {
          "prop": "Node",
          "desc": "Classe base dos nós. Um Node comum organiza lógica e filhos, mas não possui position 2D."
        },
        {
          "prop": "Node2D",
          "desc": "Nó com transformação 2D. Pode organizar os filhos mesmo sem desenhar uma imagem."
        },
        {
          "prop": "Sprite2D",
          "desc": "Nó 2D que exibe uma textura. Ele terá a imagem visível da peça neste exercício."
        },
        {
          "prop": "PackedScene",
          "desc": "Recurso que representa uma cena salva. Pelo editor você a arrasta para outra cena; por código, instantiate() cria a árvore e add_child() a conecta a um pai."
        }
      ]
    },
    "approaches": [
      {
        "title": "1. Ler um filho por caminho",
        "whenToUse": "Consulta opcional depois da prática. A sintaxe de GDScript será explicada na aula 3.",
        "description": "Anexe este script ao Node2D Locomotiva, que deve ter o filho direto chamado Peca. `_ready()` executa quando o nó fica pronto na árvore. `$Peca` é uma forma curta de buscar esse filho. Execute locomotiva.tscn e confira o painel Output/Saída.",
        "code": "extends Node2D\n\nfunc _ready() -> void:\n    print(\"Local: \", $Peca.position)\n    print(\"Global: \", $Peca.global_position)\n",
        "pros": "Relaciona os valores do Inspector com os valores vistos pelo script. No exemplo original, espere Local (68, 0) e Global (308, 145).",
        "cons": "O caminho é relativo ao nó que contém o script e depende dos nomes e da hierarquia."
      },
      {
        "title": "2. Referência com nome único",
        "whenToUse": "Consulta para quando já estiver confortável com caminhos e precisar reorganizar uma mesma cena.",
        "description": "Na cena locomotiva.tscn, marque Peca com Access as Unique Name/Acessar como nome único. O símbolo `%` permite encontrá-la pelo nome único dentro do escopo dessa cena. Isso não é uma busca global pelo projeto.",
        "code": "extends Node2D\n\n@onready var peca: Sprite2D = %Peca\n\nfunc _ready() -> void:\n    print(peca.global_position)\n",
        "pros": "Pode manter a referência ao reorganizar o caminho do nó dentro do mesmo escopo de cena.",
        "cons": "É preciso marcar o nome como único; renomear Peca ainda exige atualizar a referência. Cenas instanciadas têm seus próprios escopos."
      },
      {
        "title": "3. Instanciar por código",
        "whenToUse": "Extensão opcional. Primeiro entenda a instanciação pelo editor e o básico de GDScript.",
        "description": "Use uma cena separada, com um Node2D vazio chamado Fabricador, e anexe o script abaixo. No Inspector de Fabricador, atribua uma cena salva ao campo Cena Peca. Não atribua a própria cena do Fabricador: isso criaria instanciação recursiva.",
        "code": "extends Node2D\n\n@export var cena_peca: PackedScene\n\nfunc _ready() -> void:\n    if cena_peca == null:\n        push_warning(\"Atribua uma cena ao campo Cena Peca no Inspector.\")\n        return\n\n    var nova_peca = cena_peca.instantiate()\n    add_child(nova_peca)\n",
        "pros": "Mostra duas etapas distintas: instantiate() cria os nós; add_child() conecta o conjunto ao pai.",
        "cons": "Exige configurar a referência no Inspector. Os filhos que você adicionar ao Fabricador herdam a transformação dele quando os tipos permitem."
      }
    ],
    "simulator": {
      "type": "scene_tree",
      "title": "Laboratório de hierarquia pai–filho",
      "description": "As engrenagens representam um pai Node2D e seus filhos 2D. O desenho é um modelo da transformação; ele não cria cenas na Godot. O painel mostra a posição global do primeiro filho.",
      "guide": [
        {
          "title": "Preveja",
          "text": "Com pai em `(240, 145)`, rotação `0°` e distância do filho `68`, qual posição global você espera para o primeiro filho?"
        },
        {
          "title": "Experimente",
          "text": "Confira `(308, 145)` no painel. Mova o X do pai para `340`: o primeiro filho deve ir para `(408, 145)`, mantendo o deslocamento local."
        },
        {
          "title": "Explique",
          "text": "Volte o pai para `(240, 145)` e gire-o para `90°`. O primeiro filho passa a `(240, 213)`. Agora não basta somar 68 ao X: o deslocamento local também foi girado."
        }
      ]
    },
    "quiz": {
      "question": "Um pai Node2D está em `(240, 145)` e seu filho Sprite2D em posição local `(68, 0)`. Sem rotação, com escala `(1, 1)` e Top Level desativado, o pai muda para `(340, 145)`. O que acontece com o filho?",
      "options": [
        "Sua posição local muda para (168, 0), mas a posição global não muda.",
        "Sua posição local continua (68, 0) e a global passa a (408, 145).",
        "Sua posição local vira (0, 0), porque o pai passou a controlar o movimento.",
        "Uma nova instância do filho é criada automaticamente ao mover o pai."
      ],
      "correctIndex": 1,
      "explanation": "O deslocamento local continua `(68, 0)`. Nas condições do enunciado, some `(340, 145) + (68, 0)`: o resultado global é `(408, 145)`. Mover o pai não cria nós nem reescreve a posição local do filho.",
      "feedback": [
        "Você somou o movimento à posição local. Ao mover apenas o pai, o deslocamento do filho em relação a ele permanece (68, 0). Recalcule a posição global a partir da nova posição do pai.",
        "",
        "Ser filho não zera sua transformação local. A posição (68, 0) continua descrevendo o deslocamento em relação ao pai.",
        "Mover um nó não instancia uma cena. Criar outra instância exige uma ação no editor ou uma chamada de criação por código."
      ]
    }
  },

  {
    "id": "2d-intro-vectors-coords",
    "area": "2d",
    "level": "introducao",
    "levelLabel": "Introdução",
    "title": "2. Plano cartesiano e vetores (Vector2)",
    "subtitle": "Leia coordenadas, calcule o caminho entre dois pontos e descubra quando normalizar uma direção. A prática principal usa o editor, sem programação.",
    "nodesUsed": [
      "Node2D",
      "Sprite2D",
      "Vector2"
    ],
    "teaching": {
      "duration": "30–40 min, incluindo a prática (estimativa)",
      "prerequisite": "Concluir a aula 1: criar uma cena 2D, adicionar Sprite2D e alterar Position no Inspector. Use Godot 4.x. Para os cálculos, basta somar, subtrair e multiplicar; a raiz quadrada será explicada pelo exemplo.",
      "objectives": [
        "Ler os eixos X e Y e distinguir uma posição de um deslocamento no mesmo espaço.",
        "Calcular distância, direção e deslocamento a partir de um exemplo numérico.",
        "Explicar a diagonal mais rápida e comparar normalizar com limitar o comprimento."
      ],
      "practice": {
        "title": "Prática guiada: do ponto A ao ponto B",
        "intro": "Na oficina, vamos medir duas peças antes de programar seu movimento. Use uma cena sem Camera2D e sem rotação ou escala nos pais. O projeto de apoio contém apenas os dois marcadores visíveis; você fará as alterações pelo Inspector.",
        "tree": "Oficina (Node2D) — posição (0, 0), rotação 0°, escala (1, 1)\n├── PontoA (Sprite2D) — posição (200, 120)\n└── PontoB (Sprite2D) — posição (260, 200)",
        "download": {
          "url": "assets/aula-02-vetores.zip",
          "label": "Baixar projeto de apoio da aula 2"
        },
        "downloadNote": "Extraia o ZIP e importe project.godot na Godot 4.x. Abra oficina.tscn. O marcador dourado é A e o azul é B; nenhum script é necessário.",
        "steps": [
          {
            "title": "Prepare dois pontos no mesmo espaço",
            "text": "Crie a árvore acima ou abra o projeto de apoio. Nos dois Sprite2D, atribua uma textura. Deixe a raiz Oficina em `(0, 0)`, rotação `0` e escala `(1, 1)`. Defina as posições de A e B no Inspector.",
            "expect": "A aparece acima e à esquerda de B. Neste arranjo, as posições locais dos filhos coincidem com suas posições globais."
          },
          {
            "title": "Isole cada eixo e faça uma previsão",
            "text": "Em PontoA, altere apenas X de `200` para `240`. Depois volte X para `200` e altere apenas Y de `120` para `160`. Preveja o sentido de cada mudança antes de observar. Ao terminar, restaure A para `(200, 120)`.",
            "expect": "Aumentar X move a peça para a direita; aumentar Y move para baixo, nesta configuração. Alterar um eixo não altera o outro."
          },
          {
            "title": "Subtraia destino menos origem",
            "text": "De A `(200, 120)` para B `(260, 200)`, calcule separadamente: `260 − 200 = 60` e `200 − 120 = 80`. Portanto, o deslocamento é `(60, 80)`. Some-o a A para conferir.",
            "expect": "`(200, 120) + (60, 80) = (260, 200)`. Fazer A − B daria `(-60, -80)`, o caminho de volta."
          },
          {
            "title": "Meça a linha reta",
            "text": "O trajeto reto é a hipotenusa de um triângulo com lados 60 e 80. Seu comprimento é `√(60² + 80²) = √10000 = 100`. A raiz quadrada de 10000 é 100 porque `100 × 100 = 10000`.",
            "expect": "A distância em linha reta é 100 unidades da cena. Somar 60 + 80 daria 140, que corresponde ao caminho em L, primeiro horizontal e depois vertical."
          },
          {
            "title": "Separe direção, rapidez e tempo",
            "text": "Divida `(60, 80)` pelo comprimento 100: a direção unitária é `(0.6, 0.8)`. Com rapidez de `200 unidades/s`, a velocidade é `(120, 160) unidades/s`. Em `0.5 s`, o deslocamento é `(60, 80)`.",
            "expect": "A posição final volta a ser B: `(200, 120) + (120, 160) × 0.5 = (260, 200)`. O tempo não muda a direção; muda quanto se percorre."
          },
          {
            "title": "Compare com o laboratório",
            "text": "No laboratório abaixo, use entrada X `1`, Y `1` e intervalo `1 s`. Compare Sem tratamento e Normalizar. Depois use `(0.3, 0.4)` e compare Normalizar com Limitar a 1.",
            "expect": "A diagonal bruta tem comprimento ≈ 1.414; normalizada, ≈ 1. O vetor `(0.3, 0.4)` tem comprimento 0.5: normalizar o amplia para 1, enquanto limitar a 1 o mantém em 0.5."
          }
        ]
      },
      "pitfalls": [
        {
          "title": "“Somar as posições não aponta para o destino.”",
          "text": "Calcule `destino − origem`, usando posições no mesmo espaço. Se os nós tiverem pais diferentes, suas posições locais não são diretamente comparáveis; use ambas as global_position ou converta as coordenadas."
        },
        {
          "title": "“Normalizei um analógico leve e ele correu.”",
          "text": "Normalizar elimina a intensidade de qualquer vetor não nulo. Para manter intensidade e apenas cortar comprimentos acima de 1, use limit_length(1.0). Input.get_vector() já limita a 1 e trata uma zona morta circular; não normalize sua saída se quiser preservar a intensidade analógica."
        },
        {
          "title": "“Minha peça não aparece ou as coordenadas não batem.”",
          "text": "Confira Texture, a posição da raiz e qual cena está aberta. Zoom e pan do editor alteram a visualização, não os valores de Position. Camera2D, escala e rotação também mudam a relação entre mundo e tela."
        }
      ],
      "checks": [
        {
          "question": "A = (200, 120) e B = (260, 200). Qual é o deslocamento de B para A?",
          "answer": "A − B = `(-60, -80)`: 60 unidades para a esquerda e 80 para cima, no espaço usado no exercício. A distância continua sendo 100."
        },
        {
          "question": "Se A e B forem o mesmo ponto, qual direção escolher?",
          "answer": "O deslocamento é `(0, 0)` e não existe uma direção geométrica única. Na Godot, normalizar Vector2.ZERO retorna `(0, 0)`. Para valores muito próximos de zero, considere tolerância numérica e zona morta, em vez de tratar ruído como intenção."
        },
        {
          "question": "Por que Vector2(1, 1) não tem comprimento 1?",
          "answer": "O comprimento é `√(1² + 1²) = √2 ≈ 1.414`. Com fator 250 unidades/s, isso produziria rapidez ≈ 353.6 unidades/s. Normalizar resulta em componentes ≈ `(0.707, 0.707)`, cujo comprimento é 1."
        },
        {
          "question": "Vector2 sempre representa pixels?",
          "answer": "Não. É um par de números. Position pode usar unidades da cena, velocidade usa unidades por segundo e uma direção unitária é adimensional. Sem transformações de visualização, uma unidade 2D pode corresponder a um pixel; zoom, câmera e escala alteram essa correspondência."
        }
      ],
      "summary": "Posição responde “onde?”, deslocamento responde “quanto e para onde?” e velocidade responde “quanto e para onde por segundo?”. Subtraia posições no mesmo espaço, use o comprimento para medir a distância e normalize apenas quando quiser descartar a intensidade.",
      "next": "Na aula 3, vamos ler GDScript e entender _ready(), _process() e delta. Você já sabe por que velocidade × tempo produz um deslocamento.",
      "sources": [
        {
          "label": "Godot: introdução prática à matemática vetorial",
          "url": "https://docs.godotengine.org/en/stable/tutorials/math/vector_math.html"
        },
        {
          "label": "Godot: Vector2 — métodos e casos de vetor zero",
          "url": "https://docs.godotengine.org/en/stable/classes/class_vector2.html"
        },
        {
          "label": "Godot: Input.get_vector() e zona morta",
          "url": "https://docs.godotengine.org/en/stable/classes/class_input.html#class-input-method-get-vector"
        },
        {
          "label": "Godot: Node2D — posição local e global",
          "url": "https://docs.godotengine.org/en/stable/classes/class_node2d.html"
        },
        {
          "label": "Godot: transformações entre o canvas e a tela",
          "url": "https://docs.godotengine.org/en/stable/tutorials/2d/2d_transforms.html"
        }
      ]
    },
    "feynman": {
      "title": "O endereço da peça e o caminho até ela",
      "explanation": "Imagine a planta da oficina. O endereço da peça A é `(200, 120)`; o da peça B é `(260, 200)`. Esses números localizam cada peça em relação à mesma origem. Para ir de A até B, a instrução é outra: **60 para a direita e 80 para baixo**. Esse é o deslocamento `(60, 80)`.\n\n`Vector2(x, y)` guarda dois números. Ele pode representar uma posição, um deslocamento ou uma velocidade; o contexto determina o significado e a unidade. Uma seta ajuda a enxergar direção e comprimento, mas o vetor não carrega sozinho um ponto de partida.\n\nNo espaço 2D padrão da Godot, **+X aponta para a direita e +Y para baixo**. Então `Vector2.UP` é `(0, -1)`. Sem câmera ou outras transformações de visualização, a origem do canvas coincide com o canto superior esquerdo da área do jogo. Isso não significa que a origem do mundo esteja sempre nesse canto da tela.",
      "analogies": [
        {
          "term": "Posição → endereço",
          "analogy": "Diz onde está o ponto em relação a uma origem. Sempre pergunte: local ao pai ou global no canvas?"
        },
        {
          "term": "Deslocamento → caminho direto",
          "analogy": "É destino menos origem. Somar esse deslocamento à posição inicial leva à posição final."
        },
        {
          "term": "Direção e rapidez → rumo e ritmo",
          "analogy": "A direção unitária guarda o rumo. Multiplicá-la pela rapidez produz uma velocidade; multiplicar a velocidade pelo tempo produz o deslocamento."
        }
      ]
    },
    "howItWorks": {
      "overview": "Comece no mesmo espaço de coordenadas: `B − A = (260 − 200, 200 − 120) = (60, 80)`. O comprimento desse deslocamento é `100`, a distância em linha reta. A direção normalizada é `(0.6, 0.8)` porque dividimos cada componente por 100.\n\n**Normalizar não significa limitar a um máximo.** Normalizar `(0.3, 0.4)` transforma seu comprimento de 0.5 em 1. Limitar a 1 preserva esse vetor curto e só reduz vetores maiores que 1. Não há uma opção universalmente correta: depende de querer movimento em intensidade máxima ou preservar a intensidade.\n\nCom duas teclas, uma entrada bruta `(1, 1)` mede `√2 ≈ 1.414`, maior que `(1, 0)`. Usar ambas diretamente com o mesmo fator torna a diagonal cerca de 41.4% mais rápida. Uma direção unitária mantém a rapidez escolhida. Para controles analógicos, Input.get_vector() já oferece comprimento máximo 1 e zona morta circular, preservando intensidades intermediárias fora da zona morta.\n\n`position` é relativa ao pai; `global_position` considera as transformações até o espaço global 2D. Não misture uma com a outra em uma subtração. Rotação e escala do pai podem transformar o deslocamento local: o exercício mantém ambas neutras para isolar os eixos.",
      "anatomy": [
        {
          "prop": "Vector2(x, y)",
          "desc": "Par de componentes. Vector2 é um tipo de valor, não um nó para adicionar na árvore da cena."
        },
        {
          "prop": "length()",
          "desc": "Comprimento: √(x² + y²). Sua unidade acompanha o significado do vetor; não é sempre pixel."
        },
        {
          "prop": "normalized()",
          "desc": "Retorna uma nova direção de comprimento 1 para um vetor não nulo. O vetor zero retorna zero. O original não é alterado automaticamente."
        },
        {
          "prop": "limit_length(1.0)",
          "desc": "Retorna um vetor de comprimento máximo 1. Preserva vetores mais curtos, inclusive zero."
        },
        {
          "prop": "direction_to(destino)",
          "desc": "Equivale a (destino − origem).normalized(). Use pontos no mesmo espaço. Pontos coincidentes resultam no vetor zero."
        },
        {
          "prop": "velocidade × tempo",
          "desc": "Exemplo: (120, 160) unidades/s × 0.5 s = (60, 80) unidades. Em código de movimento, delta representa o intervalo entre atualizações, assunto da aula 3."
        }
      ]
    },
    "approaches": [
      {
        "title": "1. Conferir o cálculo entre dois pontos",
        "whenToUse": "Consulta opcional para comparar a conta manual com a saída da Godot.",
        "description": "Anexe a uma raiz Node2D vazia e execute a cena. O exemplo usa valores fixos; não depende de caminhos de nós nem move as peças. Leia cada resultado no painel Output/Saída.",
        "code": "extends Node2D\n\nfunc _ready() -> void:\n    var a := Vector2(200, 120)\n    var b := Vector2(260, 200)\n    var deslocamento := b - a\n    var direcao := deslocamento.normalized()\n    var velocidade := direcao * 200.0\n    var posicao_final := a + velocidade * 0.5\n\n    print(deslocamento)  # (60, 80)\n    print(deslocamento.length())  # 100\n    print(direcao)  # Aproximadamente (0.6, 0.8)\n    print(posicao_final)  # (260, 200)\n",
        "pros": "Liga posição, subtração, comprimento e tempo ao mesmo exemplo da prática.",
        "cons": "A sintaxe será explicada na aula 3. Pequenas diferenças na impressão de decimais são normais."
      },
      {
        "title": "2. Comparar normalizar e limitar",
        "whenToUse": "Quando precisar decidir se quer descartar ou preservar a intensidade de um vetor.",
        "description": "Anexe a outro Node2D e execute. Os métodos retornam novos valores; as variáveis de entrada continuam iguais. O caso zero não deve causar movimento.",
        "code": "extends Node2D\n\nfunc _ready() -> void:\n    var diagonal := Vector2(1, 1)\n    var leve := Vector2(0.3, 0.4)\n\n    print(diagonal.length())  # Aproximadamente 1.414\n    print(diagonal.normalized())  # Aproximadamente (0.707, 0.707)\n    print(leve.length())  # 0.5\n    print(leve.normalized())  # Aproximadamente (0.6, 0.8)\n    print(leve.limit_length(1.0))  # (0.3, 0.4)\n    print(Vector2.ZERO.normalized())  # (0, 0)\n",
        "pros": "Mostra que normalizar também pode aumentar um vetor, enquanto limitar a 1 preserva o vetor curto.",
        "cons": "A conta não simula zona morta nem lê um controle. Valores muito próximos de zero exigem cuidado numérico."
      },
      {
        "title": "3. Antecipação: entrada com intensidade",
        "whenToUse": "Depois da aula 3, para um objeto visual sem colisão. Corpos físicos serão estudados na aula 4.",
        "description": "Use uma cena separada com raiz Node2D chamada PecaMovel e um Sprite2D visível como filho. Anexe o script à raiz. Em Project > Project Settings > Input Map, crie mover_esquerda (A), mover_direita (D), mover_cima (W) e mover_baixo (S). Para testar intensidade analógica, associe também os eixos do controle às ações.\n\nInput.get_vector() limita o comprimento a 1 e aplica zona morta circular. O script usa sua saída diretamente: normalizá-la novamente eliminaria a intensidade analógica. O exemplo assume pai sem rotação nem escala.",
        "code": "extends Node2D\n\n@export var rapidez: float = 200.0\n\nfunc _process(delta: float) -> void:\n    var entrada := Input.get_vector(\n        \"mover_esquerda\", \"mover_direita\",\n        \"mover_cima\", \"mover_baixo\"\n    )\n    var velocidade := entrada * rapidez\n    position += velocidade * delta\n",
        "pros": "Mantém a velocidade diagonal limitada e permite intensidade parcial com entrada analógica configurada.",
        "cons": "Alterar position não resolve colisões. Não copie este movimento diretamente para CharacterBody2D: ele usa velocity e move_and_slide()."
      }
    ],
    "simulator": {
      "type": "vectors_2d",
      "title": "Laboratório de vetores: entrada, tratamento e deslocamento",
      "description": "Compare o vetor bruto com o resultado de normalizar ou limitar a 1. O diagrama inferior mostra a posição calculada após o intervalo escolhido, partindo de P = (0, 0). É um modelo matemático no navegador: não executa Godot, não lê teclado/controle e não simula a zona morta de Input.get_vector().",
      "guide": [
        {
          "title": "Preveja a diagonal",
          "text": "Com `(1, 1)` e `1 s`, compare Sem tratamento com Normalizar. A rapidez calculada deve cair de aproximadamente 353.6 para 250 unidades/s."
        },
        {
          "title": "Preserve a intensidade",
          "text": "Mude X para `0.3` e Y para `0.4`. Normalizar produz comprimento 1; Limitar a 1 mantém comprimento 0.5 e rapidez 125 unidades/s."
        },
        {
          "title": "Confira tempo e repouso",
          "text": "Em Limitar a 1, use `(0.6, 0.8)` e `0.4 s`: o deslocamento é `(60, 80)` e a distância é 100 unidades. Depois use `(0, 0)`: todos os modos devem permanecer na origem."
        }
      ]
    },
    "quiz": {
      "question": "A entrada `(0.3, 0.4)` tem comprimento 0.5. Para preservar sua intensidade e impedir apenas comprimentos acima de 1, qual resultado é adequado?",
      "options": [
        "Normalizar: o resultado fica (0.6, 0.8), com a mesma intensidade original.",
        "Limitar a 1: o resultado continua (0.3, 0.4), com comprimento 0.5.",
        "Somar 1 a cada componente para compensar a diagonal.",
        "Inverter o sinal de Y, pois todo vetor 2D precisa apontar para cima."
      ],
      "correctIndex": 1,
      "explanation": "Limitar a 1 preserva o vetor, pois seu comprimento 0.5 já está abaixo do máximo. Normalizar mantém o rumo, mas amplia o comprimento para 1 e perde a intensidade original.",
      "feedback": [
        "Normalizar preserva a direção, mas muda o comprimento de 0.5 para 1. A pergunta pede preservar a intensidade.",
        "",
        "Somar 1 muda tanto a direção quanto o comprimento. Compare o comprimento original com o máximo permitido.",
        "O sinal de Y indica o sentido vertical; ele não controla a intensidade. Um vetor pode apontar para baixo, para cima ou ser zero."
      ]
    }
  },

{
  "id": "2d-intro-gdscript-lifecycle",
  "area": "2d",
  "level": "introducao",
  "levelLabel": "Introdução",
  "title": "3. Primeiro script, ciclo de vida e delta",
  "subtitle": "Leia um pequeno script, acompanhe sua execução e transforme velocidade em deslocamento. Depois compare atualização visual com passos de física.",
  "nodesUsed": [
    "Node2D",
    "GDScript",
    "_ready()",
    "_process(delta)",
    "_physics_process(delta)"
  ],
  "teaching": {
    "duration": "35–45 min, incluindo a prática (estimativa)",
    "prerequisite": "Concluir as aulas 1 e 2: montar uma hierarquia, localizar Position e entender velocidade × tempo. Godot 4.x. Esta aula introduz o código usado na prática; não exige experiência anterior com programação.",
    "objectives": [
      "Ler variáveis, tipos, funções e um bloco if em um script pequeno.",
      "Distinguir preparação, atualização visual e atualização de física.",
      "Calcular deslocamento com delta e reconhecer quando uma API já considera o tempo."
    ],
    "practice": {
      "title": "Prática guiada: sua primeira peça em movimento",
      "intro": "Trabalhe no editor da Godot. Você vai anexar um script, executá-lo, observar a saída e mudar uma única variável por vez. O exemplo é visual e não resolve colisões.",
      "tree": "PecaMovel (Node2D) — posição (80, 140)\n└── Peca (Sprite2D) — posição local (0, 0), com Texture",
      "steps": [
        {
          "title": "Prepare uma peça visível",
          "text": "Crie a árvore acima. Atribua uma imagem à Texture do Sprite2D. Deixe rotação em 0 e escala em (1, 1). Salve a cena como `peca_movel.tscn`.",
          "expect": "A peça aparece perto da esquerda da área do jogo. Um Node2D sem Sprite2D ou textura não desenha nada."
        },
        {
          "title": "Anexe o primeiro script",
          "text": "Selecione a raiz PecaMovel e use Attach Script/Anexar script. Escolha GDScript, salve como `peca_movel.gd` e substitua todo o modelo pelo exemplo 1 da seção de código abaixo. Preserve o recuo das linhas.",
          "expect": "O arquivo começa com extends Node2D. O script pertence à raiz, não ao Sprite2D. Corrija os erros vermelhos antes de executar."
        },
        {
          "title": "Execute e observe dois efeitos",
          "text": "Salve e execute a cena atual (F6 no Windows/Linux). Abra Output/Saída. Observe a mensagem e o movimento durante os primeiros dois segundos.",
          "expect": "“Oficina pronta” aparece uma vez por execução desta cena. A peça anda para a direita e para perto de x = 320. Não espere exatamente 240 unidades: o último quadro cruza o limite de tempo e o exemplo o descarta."
        },
        {
          "title": "Leia o script linha por linha",
          "text": "Localize rapidez (120 unidades/s) e tempo (segundos). Em cada chamada, tempo += delta soma o intervalo. Se tempo ainda for menor ou igual a 2, position.x += rapidez * delta soma um deslocamento ao X.",
          "expect": "A condição if controla só a linha recuada abaixo dela. A posição não recebe 120 diretamente a cada quadro; recebe 120 multiplicado pelo intervalo em segundos."
        },
        {
          "title": "Mude uma variável e faça uma previsão",
          "text": "Pare o jogo. Selecione PecaMovel e altere Rapidez no Inspector para 60. Execute novamente. Depois teste 0 e restaure 120.",
          "expect": "Com 60, a distância em cerca de dois segundos fica próxima de 120 unidades. Com 0, não há movimento. Cada nova execução reinicia tempo em zero. Um valor exportado salvo no Inspector pode prevalecer sobre o padrão escrito no script."
        },
        {
          "title": "Explique e compare",
          "text": "Use o laboratório para comparar 15, 60 e 120 FPS, reiniciando a corrida a cada troca. Antes de observar, calcule 120 × (1/15) e 120 × (1/120).",
          "expect": "Os passos com delta são 8 e 1 unidade, respectivamente. Em um segundo simulado, ambos somam 120. O exemplo sem delta soma 2 por atualização e depende da quantidade de quadros."
        }
      ]
    },
    "checks": [
      {
        "question": "A 30 FPS constantes, quanto anda por atualização uma peça a 120 unidades/s?",
        "answer": "delta = 1/30 s; 120 × 1/30 = 4 unidades. Trinta atualizações somam 120 unidades, no modelo ideal sem outras forças."
      },
      {
        "question": "O que significa position.x += rapidez * delta?",
        "answer": "É uma abreviação de position.x = position.x + rapidez * delta. A multiplicação calcula um deslocamento e a soma atualiza a posição."
      },
      {
        "question": "_ready() volta a executar toda vez que removo e recoloco o mesmo nó?",
        "answer": "Por padrão, não: ele executa uma vez por instância. request_ready() pode solicitar nova preparação na próxima entrada na árvore. Uma nova instância tem seu próprio _ready(). Os filhos ficam prontos antes do pai."
      },
      {
        "question": "Devo multiplicar qualquer argumento de movimento por delta?",
        "answer": "Não. Verifique o contrato da API. CharacterBody2D.velocity usa unidades/s e move_and_slide() considera o passo internamente. Já move_and_collide() recebe um deslocamento. A aula 4 aplicará essa diferença."
      }
    ],
    "pitfalls": [
      {
        "title": "“O editor acusa erro de recuo.”",
        "text": "As instruções de uma função ficam recuadas; as de um if ficam mais um nível. Use o recuo do editor e não misture tabs e espaços no mesmo bloco. Confira também os dois-pontos no final de func e if."
      },
      {
        "title": "“Mudei rapidez no código e nada mudou.”",
        "text": "Confira o valor exportado no Inspector da instância. Pare e execute novamente; editar o arquivo não reinicia automaticamente os valores da cena já em execução."
      },
      {
        "title": "“O jogo lento continua diferente.”",
        "text": "delta corrige a dependência direta do número de atualizações neste movimento simples. Não garante estabilidade de integração, colisões perfeitas ou tempo real sob qualquer travamento. Escala de tempo, limites de passos e carga também interferem."
      }
    ],
    "summary": "Um script reúne dados e funções. A Godot chama os callbacks apropriados; você escreve o comportamento dentro deles. Rapidez em unidades/s × delta em segundos produz deslocamento em unidades. A fórmula não substitui conhecer a API que receberá esse valor.",
    "next": "Na aula 4, aplicaremos esses conceitos a corpos físicos, velocity e move_and_slide(). Arrays, laços e outras bases de programação ainda precisam ser aprofundados antes de exemplos mais complexos.",
    "sources": [
      {
        "label": "Godot: referência de GDScript",
        "url": "https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html"
      },
      {
        "label": "Godot: processamento visual e de física",
        "url": "https://docs.godotengine.org/en/stable/tutorials/scripting/idle_and_physics_processing.html"
      },
      {
        "label": "Godot: Node e callbacks",
        "url": "https://docs.godotengine.org/en/stable/classes/class_node.html"
      },
      {
        "label": "Godot: CharacterBody2D",
        "url": "https://docs.godotengine.org/en/stable/classes/class_characterbody2d.html"
      }
    ]
  },
  "feynman": {
    "title": "Uma ficha de instruções e dois relógios",
    "explanation": "Imagine uma peça automática na oficina. Sua ficha guarda dados, como a rapidez, e instruções, como avançar. No código, **variáveis** guardam valores e **funções** agrupam instruções. GDScript é a linguagem da Godot; lembra Python no recuo, mas é uma linguagem independente.\n\nA Godot chama funções especiais em momentos definidos. `_ready()` prepara uma instância quando ela fica pronta na árvore. `_process(delta)` atualiza a parte visual a cada quadro de processamento. `_physics_process(delta)` acompanha os passos de física. Esses nomes são callbacks: você não precisa chamar essas funções manualmente para iniciar o ciclo.\n\n**delta é um intervalo em segundos.** Se a rapidez é 120 unidades/s e passaram 0.1 s, o deslocamento é 12 unidades. Se cada atualização movesse sempre 2 unidades, um computador com mais atualizações por segundo moveria a peça mais depressa.",
    "analogies": [
      {
        "term": "Variável → mostrador",
        "analogy": "Guarda um valor que o código pode consultar ou alterar, como tempo ou rapidez."
      },
      {
        "term": "Função → procedimento",
        "analogy": "Agrupa instruções. Algumas funções são chamadas por você; os callbacks da aula são chamados pela engine."
      },
      {
        "term": "delta → intervalo do relógio",
        "analogy": "Permite calcular quanto avançar nesta atualização a partir de uma taxa por segundo."
      }
    ]
  },
  "howItWorks": {
    "overview": "Leia primeiro o vocabulário do exemplo, sem tentar decorar toda a linguagem. Um script anexado a Node2D pode usar suas propriedades, incluindo position.\n\nO recuo define os blocos: uma função contém linhas recuadas; um if executa seu bloco apenas quando a condição é verdadeira. Comentários começam com #. O ponto em position.x acessa a componente X de Vector2.\n\nUse _process() para este movimento visual sem colisão. Para lógica que interage com a física, use _physics_process(): a frequência configurada é 60 passos/s por padrão e pode ser alterada. Um quadro visual pode conter zero, um ou vários passos de física. Passos fixos não garantem ausência de falhas sob sobrecarga.\n\nTipagem ajuda a detectar incompatibilidades e melhora as sugestões do editor. Algumas operações tipadas têm otimizações, mas não há promessa de desempenho universal nem de autocompletar perfeito.",
    "anatomy": [
      {
        "prop": "extends Node2D",
        "desc": "A classe do script herda Node2D. Neste exercício, anexe o script à raiz Node2D."
      },
      {
        "prop": "var rapidez: float = 120.0",
        "desc": "var declara; rapidez é o nome; float indica número decimal; = atribui o valor inicial. int é inteiro, bool é verdadeiro/falso e String é texto."
      },
      {
        "prop": "@export",
        "desc": "Expõe a propriedade no Inspector. Valores salvos na cena podem substituir o padrão do script."
      },
      {
        "prop": "func _ready() -> void:",
        "desc": "func declara uma função. void informa que não retorna um valor. A preparação ocorre após os filhos ficarem prontos; normalmente uma vez por instância."
      },
      {
        "prop": "delta: float",
        "desc": "Parâmetro recebido pelo callback, em segundos do tempo de processamento. Não é FPS nem um número de pixels."
      },
      {
        "prop": "if tempo <= 2.0:",
        "desc": "Compara tempo com 2.0. O bloco recuado só executa se a comparação resultar em verdadeiro."
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Prática principal: mover uma peça",
      "whenToUse": "Use este script no passo 2 da prática guiada.",
      "description": "Anexe à raiz PecaMovel com um Sprite2D visível como filho. O movimento para após aproximadamente dois segundos. O limite simples descarta o quadro que ultrapassa 2 s, por isso o resultado final é aproximado.",
      "code": "extends Node2D\n\n@export var rapidez: float = 120.0\nvar tempo: float = 0.0\n\nfunc _ready() -> void:\n    print(\"Oficina pronta\")\n\nfunc _process(delta: float) -> void:\n    tempo += delta\n    if tempo <= 2.0:\n        position.x += rapidez * delta\n",
      "pros": "Um único exemplo conecta variável, tipo, exportação, função, condição e delta.",
      "cons": "Movimento visual sem colisões. Não mede FPS e não limita a janela de execução a um número exato de quadros."
    },
    {
      "title": "2. Extensão: ler o ciclo de vida",
      "whenToUse": "Depois de concluir o primeiro script, para observar quando cada callback é chamado.",
      "description": "Use outra cena com raiz Node chamada Pai e filho Node chamado Filho. Anexe este mesmo script aos dois nós, salve e execute. get_name() mostra qual nó imprimiu cada mensagem.",
      "code": "extends Node\n\nfunc _enter_tree() -> void:\n    print(name, \" entrou\")\n\nfunc _ready() -> void:\n    print(name, \" pronto\")\n",
      "pros": "Espere Pai entrou, Filho entrou, Filho pronto, Pai pronto nesta árvore simples.",
      "cons": "Não generalize essa sequência para a ordem de desenho nem para toda lógica de processamento."
    },
    {
      "title": "3. Extensão: inferir um tipo",
      "whenToUse": "Quando você já souber identificar o tipo do valor inicial.",
      "description": "Este script separado só imprime valores. := infere um tipo estático a partir da expressão; = apenas atribui. Uma função com retorno usa return para entregar um resultado.",
      "code": "extends Node\n\nfunc dobro(valor: float) -> float:\n    return valor * 2.0\n\nfunc _ready() -> void:\n    var rapidez := 120.0\n    var ativo: bool = true\n    if ativo:\n        print(dobro(rapidez))  # 240\n",
      "pros": "Introduz parâmetro, retorno e inferência em um exemplo curto e executável.",
      "cons": "É uma extensão, não uma substituição necessária do primeiro script. Arrays, laços e entrada por eventos ficam para estudos posteriores."
    }
  ],
  "simulator": {
    "type": "delta_fps",
    "title": "Laboratório do tempo: passo por segundo ou por quadro",
    "description": "Modelo de duas peças: a primeira soma 120 × delta por atualização; a segunda soma 2 unidades por atualização. A taxa selecionada é simulada no navegador e não representa o FPS real da Godot. Ao alcançar o fim do trilho, cada peça volta ao início; compare as taxas, não a liderança após uma volta.",
    "guide": [
      {
        "title": "Preveja",
        "text": "A 60 FPS, 120 × (1/60) = 2: as peças têm a mesma rapidez no modelo."
      },
      {
        "title": "Experimente",
        "text": "Troque para 15 FPS e reinicie. Com delta: 120 unidades/s. Sem delta: 2 × 15 = 30 unidades/s. A 120 FPS, a segunda passa a 240 unidades/s."
      },
      {
        "title": "Explique",
        "text": "O botão de pausa congela o avanço. Trocar a taxa altera o tamanho dos passos do modelo. Isso não demonstra colisões nem estabilidade do motor de física."
      }
    ]
  },
  "quiz": {
    "question": "Uma peça visual deve mover 120 unidades/s. Com delta = 0.05 s, qual deslocamento devemos somar nesta atualização?",
    "options": [
      "120 unidades, independentemente do intervalo.",
      "6 unidades, pois 120 × 0.05 = 6.",
      "2400 unidades, pois devemos dividir por delta.",
      "0.05 unidade, pois delta já contém a velocidade."
    ],
    "correctIndex": 1,
    "explanation": "Velocidade × tempo resulta em deslocamento: 120 unidades/s × 0.05 s = 6 unidades.",
    "feedback": [
      "Somar 120 a cada atualização produziria uma rapidez dependente do número de quadros.",
      "",
      "Dividir por segundos não produz um deslocamento. Confira as unidades da conta.",
      "delta informa tempo, sem conhecer a velocidade escolhida."
    ]
  }
},
{
  "id": "2d-init-physics-bodies",
  "area": "2d",
  "level": "iniciante",
  "levelLabel": "Iniciante",
  "title": "4. Corpos físicos e movimento",
  "subtitle": "Monte um chão e um personagem com colisão. Entenda quem controla o movimento de cada corpo antes de escolher uma API.",
  "nodesUsed": [
    "CharacterBody2D",
    "RigidBody2D",
    "StaticBody2D",
    "CollisionShape2D"
  ],
  "teaching": {
    "codeRequired": true,
    "duration": "40–55 min, incluindo a prática (estimativa)",
    "prerequisite": "Aulas 1–3: árvore de cena, Vector2, variáveis, if, funções e delta. Godot 4.x. Nesta aula, configure também três ações no Input Map.",
    "objectives": [
      "Escolher entre corpo estático, personagem controlado e corpo simulado.",
      "Construir um chão e um personagem com formas de colisão válidas.",
      "Aplicar gravidade, movimento e salto sem multiplicar velocity por delta duas vezes."
    ],
    "practice": {
      "title": "Prática guiada: personagem e chão",
      "intro": "Use uma cena nova com uma janela de 640 × 360. O primeiro exemplo é o código da prática. Os outros dois são extensões em cenas separadas.",
      "tree": "Oficina (Node2D) — posição (0, 0)\n├── Chao (StaticBody2D) — posição (320, 320)\n│   └── CollisionShape2D — RectangleShape2D, tamanho (600, 40)\n└── Jogador (CharacterBody2D) — posição (160, 240)\n    ├── CollisionShape2D — RectangleShape2D, tamanho (28, 44)\n    └── Sprite2D — textura atribuída e ajustada ao corpo",
      "steps": [
        {
          "title": "Prepare o chão",
          "text": "Crie uma raiz Oficina, salve como `oficina.tscn` e adicione Chao em `(320, 320)`. No filho CollisionShape2D, crie um novo RectangleShape2D e abra o recurso Shape para definir Size como `(600, 40)`. Deixe a posição local da forma em `(0, 0)`.",
          "expect": "O topo da forma do chão fica em Y = 300. Formas de colisão não desenham o cenário durante a execução normal; use Debug > Visible Collision Shapes para enxergá-las no teste."
        },
        {
          "title": "Prepare o personagem",
          "text": "Adicione Jogador em `(160, 240)` com a forma `(28, 44)` indicada na árvore. Atribua uma imagem ao Sprite2D e ajuste somente o Sprite para o tamanho visual desejado. Mantenha corpo e forma com escala `(1, 1)`, rotação 0 e forma habilitada.",
          "expect": "A base do personagem começa em Y = 262, acima do chão. A forma deve ser filha direta do corpo físico, com Shape preenchida. Use formas distintas para chão e personagem."
        },
        {
          "title": "Configure as ações",
          "text": "Em Project > Project Settings > Input Map, crie `mover_esquerda`, `mover_direita` e `pular`. Associe A ou seta esquerda, D ou seta direita e Espaço, respectivamente. Confira as camadas: ambos na Layer 1 e Mask 1; a aula 5 aprofundará esses filtros.",
          "expect": "Os nomes das ações coincidem exatamente com o script. Um evento de teclado só controla o jogo se estiver associado à ação consultada."
        },
        {
          "title": "Anexe e execute",
          "text": "Anexe o exemplo 1 ao CharacterBody2D Jogador, não à raiz Oficina. Salve e execute a cena atual. Ative a visualização de colisões no menu Debug antes de iniciar o teste.",
          "expect": "A gravidade escrita no script faz o personagem cair. Em repouso no chão plano, seu centro fica próximo de Y = 278; pode haver pequena margem de colisão. O chão não cai e não é empurrado."
        },
        {
          "title": "Teste o salto e seus limites",
          "text": "Aguarde o pouso, pressione Espaço e tente pressioná-lo novamente no ar. Use esquerda/direita. Pare e repita com rapidez 60 no Inspector.",
          "expect": "Há um salto por pouso, sem salto extra no ar. A velocidade horizontal muda com rapidez. O chão tem largura finita: sair por uma borda faz o jogador cair; reinicie a cena para retornar."
        },
        {
          "title": "Explique antes de estender",
          "text": "Localize as duas contas diferentes: gravidade × delta altera velocity.y; move_and_slide() usa velocity para mover. Só depois experimente os exemplos 2 e 3 em cenas separadas.",
          "expect": "Sem a gravidade do script, CharacterBody2D não cai sozinho. RigidBody2D, com gravidade e simulação habilitadas, cai sem esse código de personagem."
        }
      ]
    },
    "checks": [
      {
        "question": "Por que o CharacterBody2D não cai apenas por existir na cena?",
        "answer": "A engine não aplica gravidade automaticamente ao personagem. Seu script calcula a velocidade e chama a API de movimento."
      },
      {
        "question": "A gravidade é 900 unidades/s² e delta é 0.02 s. Quanto somar a velocity.y?",
        "answer": "900 × 0.02 = 18 unidades/s. Isso é mudança de velocidade, não deslocamento. O movimento usa a velocidade no passo seguinte."
      },
      {
        "question": "Quando is_on_floor() é atualizado?",
        "answer": "O resultado corresponde à última chamada de move_and_slide(). Antes do primeiro movimento ainda não há um contato de chão confirmado por essa chamada. A classificação também depende de up_direction e floor_max_angle."
      },
      {
        "question": "Força e impulso são a mesma coisa?",
        "answer": "Não. Força atua ao longo do tempo; impulso altera o momento em um evento. Para massa 2, um impulso central horizontal 200 produz mudança ideal de velocidade 100, sem outros efeitos. Repetir o impulso a cada quadro acumula mudanças, em vez de representar um único lançamento."
      }
    ],
    "pitfalls": [
      {
        "title": "“Meu personagem atravessa o chão.”",
        "text": "Confira CollisionShape2D, recurso Shape, Disabled, camadas/máscaras e se o movimento usa move_and_slide() em _physics_process(). Não mova o corpo por position a cada quadro para tentar resolver colisões."
      },
      {
        "title": "“A imagem e a colisão não coincidem.”",
        "text": "O Sprite e a forma são independentes. Ajuste o tamanho do recurso Shape e a textura visual; não suponha que a imagem cria colisão. CollisionPolygon2D também pode fornecer geometria de colisão, assunto para aprofundamento."
      },
      {
        "title": "“O barril não recebe meu lançamento.”",
        "text": "Confira o script no RigidBody2D, Freeze desligado e a forma válida. O exemplo 3 dispara no primeiro _integrate_forces(), com lancamento_pendente = true, e depois marca false. Reiniciar a cena cria outra instância e permite novo lançamento. Não aplique o impulso em todo callback sem essa proteção."
      }
    ],
    "summary": "StaticBody2D é apropriado para o chão fixo. CharacterBody2D exige lógica de velocidade e movimento. RigidBody2D delega a evolução à simulação e recebe forças ou impulsos. Formas, filtros e o contrato de cada API determinam a colisão.",
    "next": "Na aula 5, vamos distinguir contato físico de sensores Area2D e aprofundar Layer e Mask.",
    "sources": [
      {
        "label": "Godot: usar CharacterBody2D",
        "url": "https://docs.godotengine.org/en/stable/tutorials/physics/using_character_body_2d.html"
      },
      {
        "label": "Godot: CharacterBody2D",
        "url": "https://docs.godotengine.org/en/stable/classes/class_characterbody2d.html"
      },
      {
        "label": "Godot: RigidBody2D",
        "url": "https://docs.godotengine.org/en/stable/classes/class_rigidbody2d.html"
      },
      {
        "label": "Godot: StaticBody2D",
        "url": "https://docs.godotengine.org/en/stable/classes/class_staticbody2d.html"
      },
      {
        "label": "Godot: estado físico direto e impulso central",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_physicsdirectbodystate2d.html"
      }
    ]
  },
  "feynman": {
    "title": "Três responsabilidades para o movimento",
    "explanation": "O chão, um jogador e uma caixa podem ser sólidos, mas não precisam se mover da mesma maneira. **StaticBody2D** serve para superfícies que não respondem às forças dos outros corpos. **CharacterBody2D** segue a velocidade e as regras que seu script determina. **RigidBody2D** tem seu movimento calculado pela simulação.\n\nUma imagem não cria uma colisão. Neste exercício, um CollisionShape2D com Shape preenchida fornece a geometria física; o Sprite2D fornece a aparência. Essa separação permite desenhar uma peça detalhada e usar uma forma simples para o contato.\n\nO objetivo é escolher quem decide o movimento. O script do personagem calcula gravidade e salto; o corpo rígido recebe um impulso e a simulação continua seu movimento. Nenhuma dessas opções garante, sozinha, um controle adequado ou colisões perfeitas.",
    "analogies": [
      {
        "term": "StaticBody2D → chão fixo",
        "analogy": "Não é empurrado pelos contatos. Pode ser reposicionado por código, mas isso é um teletransporte; para plataformas móveis, investigue AnimatableBody2D."
      },
      {
        "term": "CharacterBody2D → peça comandada",
        "analogy": "O script define a velocidade; a API consulta contatos e ajusta o movimento."
      },
      {
        "term": "RigidBody2D → peça solta",
        "analogy": "A simulação considera massa, gravidade, contatos e outras propriedades. Não substitua isso por alterações contínuas de position."
      }
    ]
  },
  "howItWorks": {
    "overview": "Na prática, `velocity` contém unidades por segundo. `move_and_slide()` considera o intervalo internamente. A gravidade é uma aceleração: multiplicá-la por delta produz a mudança de velocidade. São operações diferentes.\n\n`move_and_collide()` recebe deslocamento e retorna informações de uma colisão. O segundo exemplo rebate a direção, mas descarta o restante do deslocamento daquele passo: é introdutório, não um resolvedor completo de múltiplos impactos.\n\nO laboratório do site é um modelo reduzido. A prática no editor é o local para observar o comportamento real das classes da Godot.\n\nNa extensão de corpo rígido, o lançamento único usa _integrate_forces() e o estado físico recebido pela engine. A variável booleana impede que ele se repita em cada passo. Isso também permite comparar massas sem disparar antes de seus dados físicos estarem atualizados.",
    "anatomy": [
      {
        "prop": "velocity",
        "desc": "Velocidade solicitada ao personagem. move_and_slide() pode modificá-la ao resolver o movimento."
      },
      {
        "prop": "move_and_slide()",
        "desc": "Move e trata deslizamento. Chame no passo de física; não multiplique velocity por delta antes da chamada."
      },
      {
        "prop": "is_on_floor()",
        "desc": "Informa o contato classificado como chão na última chamada de move_and_slide(), conforme as configurações do corpo."
      },
      {
        "prop": "apply_central_impulse()",
        "desc": "Impulso pontual no centro, sem torque por essa aplicação central. Não multiplique por delta para representar um único evento."
      },
      {
        "prop": "CollisionShape2D",
        "desc": "Neste exercício fornece a forma do corpo. Deve ter um recurso Shape e não estar desabilitado."
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Prática principal: plataforma simples",
      "whenToUse": "Para o Jogador da prática guiada, em chão plano.",
      "description": "Anexe a Jogador, configure as três ações e use a árvore indicada. O exemplo tem controle horizontal imediato; aceleração, rampas e tolerância de salto são extensões posteriores.",
      "code": "extends CharacterBody2D\n\n@export var rapidez: float = 160.0\n@export var gravidade: float = 900.0\n@export var velocidade_salto: float = -320.0\n\nfunc _physics_process(delta: float) -> void:\n    if not is_on_floor():\n        velocity.y += gravidade * delta\n\n    if Input.is_action_just_pressed(\"pular\") and is_on_floor():\n        velocity.y = velocidade_salto\n\n    var direcao := Input.get_axis(\"mover_esquerda\", \"mover_direita\")\n    velocity.x = direcao * rapidez\n    move_and_slide()\n",
      "pros": "Separa claramente aceleração, velocidade e deslocamento.",
      "cons": "Não inclui animação, limites de mundo nem reinício ao cair. O personagem pode sair do chão pelas bordas."
    },
    {
      "title": "2. Extensão: ricochete de um projétil",
      "whenToUse": "Em outra cena, com um CharacterBody2D, forma de colisão e paredes estáticas.",
      "description": "Monte paredes com formas e coloque o projétil dentro delas, sem sobreposição inicial. O exemplo trata uma colisão por atualização e não usa is_on_floor().",
      "code": "extends CharacterBody2D\n\nvar direcao := Vector2(1, -1).normalized()\n@export var rapidez: float = 200.0\n\nfunc _physics_process(delta: float) -> void:\n    var colisao := move_and_collide(direcao * rapidez * delta)\n    if colisao:\n        direcao = direcao.bounce(colisao.get_normal())\n",
      "pros": "Mostra uma API que recebe deslocamento, em contraste com move_and_slide().",
      "cons": "Descarta o restante do passo após bater. Alta rapidez e múltiplos impactos exigem tratamento adicional."
    },
    {
      "title": "3. Extensão: lançamento único de um corpo rígido",
      "whenToUse": "Em cena separada com um RigidBody2D e CollisionShape2D, acima de chão estático.",
      "description": "Anexe ao RigidBody2D. Deixe Freeze e Custom Integrator desligados e comece com Mass = 1. A Godot chama _integrate_forces(estado) com acesso ao estado físico do corpo. O impulso é aplicado nesse primeiro passo, quando a massa está disponível, e não em _ready().\n\nA variável lancamento_pendente começa como true. Após o primeiro impulso, passa a false; assim o callback pode continuar sendo chamado sem repetir o lançamento. O integrador padrão mantém gravidade e contatos. Para comparar Mass = 2, reinicie a cena mantendo o mesmo impulso e as outras condições.",
      "code": "extends RigidBody2D\n\n@export var impulso: Vector2 = Vector2(120, -200)\n\nvar lancamento_pendente: bool = true\n\nfunc _integrate_forces(estado: PhysicsDirectBodyState2D) -> void:\n    if lancamento_pendente:\n        estado.apply_central_impulse(impulso)\n        lancamento_pendente = false\n",
      "pros": "Lançamento único no estado físico, sem multiplicar impulso por delta; evita depender da atualização da massa em _ready().",
      "cons": "Massa, amortecimento e materiais influenciam o resultado. Não promete quique sem material físico. Relançar durante a mesma execução exigiria um comando explícito; este exemplo só lança na criação."
    }
  ],
  "simulator": {
    "type": "physics_bodies_2d",
    "title": "Laboratório de corpos: controle e queda",
    "description": "Modelo numérico no navegador, sem execução da Godot. O retângulo percorre automaticamente um trecho à velocidade indicada e pode saltar apenas apoiado. Os círculos caem e rebatem no chão e nos limites laterais. Os objetos não colidem entre si; não são simulados massa, torque, rampas ou move_and_slide(). O quique usa coeficiente fixo 0.68.",
    "guide": [
      {
        "title": "Compare",
        "text": "Mude a velocidade horizontal: ela corresponde ao módulo do movimento do retângulo, antes de inverter o sentido no limite."
      },
      {
        "title": "Experimente",
        "text": "Espere o apoio, use Pular e tente novamente no ar. O segundo comando não deve criar salto extra. Alterar a gravidade muda a trajetória."
      },
      {
        "title": "Confira os limites",
        "text": "Lançar adiciona um círculo com velocidade inicial definida no modelo, sem aplicar uma API da Godot. Há no máximo cinco círculos. Pause para inspecionar e reinicie para restaurar o estado."
      }
    ]
  },
  "quiz": {
    "question": "Com gravidade 900 unidades/s² e delta 0.02 s, qual atualização está correta para um CharacterBody2D no ar?",
    "options": [
      "Somar 18 a velocity.y e chamar move_and_slide() sem reduzir velocity por delta.",
      "Multiplicar velocity inteira por delta e então chamar move_and_slide().",
      "Chamar apply_central_impulse() no CharacterBody2D.",
      "Esperar que a gravidade seja aplicada automaticamente ao personagem."
    ],
    "correctIndex": 0,
    "explanation": "A gravidade altera a velocidade em 900 × 0.02 = 18 unidades/s. move_and_slide() usa velocity e considera o tempo internamente.",
    "feedback": [
      "",
      "Isso aplica o intervalo duas vezes ao movimento. Separe a aceleração que altera velocity da chamada de movimento.",
      "Essa API pertence ao RigidBody2D; o personagem usa velocidade controlada por script.",
      "CharacterBody2D não recebe gravidade automática da simulação."
    ]
  }
},
{
  "id": "2d-init-areas-collisions",
  "area": "2d",
  "level": "iniciante",
  "levelLabel": "Iniciante",
  "title": "5. Sensores, gatilhos e camadas",
  "subtitle": "Crie uma região atravessável e acompanhe entrada e saída. Separe sobreposição, filtros de detecção e resposta do jogo.",
  "nodesUsed": [
    "Area2D",
    "CollisionShape2D",
    "CollisionObject2D"
  ],
  "teaching": {
    "codeRequired": true,
    "duration": "35–45 min, incluindo a prática (estimativa)",
    "prerequisite": "Aulas 1–4: árvore, funções, Input Map e personagem com colisão. Reutilize a cena da aula 4 e suas ações de movimento. Godot 4.x.",
    "objectives": [
      "Criar uma Area2D que detecta o jogador sem bloquear o movimento.",
      "Configurar a máscara do sensor para reconhecer a camada do corpo.",
      "Distinguir eventos de entrada/saída, estado de sobreposição e grupos."
    ],
    "practice": {
      "title": "Prática guiada: uma zona de inspeção",
      "intro": "Parta da Oficina da aula 4. Mantenha o chão e o personagem funcionando antes de adicionar o sensor. Conectaremos os sinais por código; não faça uma segunda conexão pelo editor.",
      "tree": "Oficina (Node2D)\n├── Chao (StaticBody2D) — Layer 1, Mask 1\n├── Jogador (CharacterBody2D) — Layer 2, Mask 1; grupo jogador\n└── Sensor (Area2D) — posição (350, 250), Layer nenhuma, Mask 2\n    └── CollisionShape2D — RectangleShape2D, tamanho (100, 100)",
      "steps": [
        {
          "title": "Separe as camadas",
          "text": "No Jogador, desmarque Layer 1 e marque apenas Layer 2. Mantenha Mask 1 para detectar o chão. Na aba Groups/Grupos do nó, adicione o grupo `jogador`. Não altere o chão.",
          "expect": "O personagem continua apoiado e se move. Grupo é uma etiqueta de lógica; não substitui Layer nem Mask."
        },
        {
          "title": "Adicione a região",
          "text": "Crie Sensor como filho da Oficina em `(350, 250)`, sem rotação e com escala `(1, 1)`. Adicione a forma indicada na árvore, posição local `(0, 0)`, Disabled desligado. No Sensor, limpe todas as Layers e marque somente Mask 2. Deixe Monitoring ligado.",
          "expect": "A região ocupa X de 300 a 400 e Y de 200 a 300. Ela não é uma parede. Use Debug > Visible Collision Shapes para visualizá-la ao executar, ou acrescente uma representação visual separada."
        },
        {
          "title": "Conecte os eventos",
          "text": "Anexe o exemplo 1 ao Sensor. A função _ready() conecta body_entered e body_exited aos métodos que recebem o corpo. O parâmetro corpo identifica quem entrou ou saiu.",
          "expect": "O script registra as conexões ao executar a cena. Não é necessário consultar se o jogador entrou a cada quadro."
        },
        {
          "title": "Atravesse e observe",
          "text": "Execute a cena, abra Output/Saída e mova o jogador para dentro da região. Permaneça parado nela por alguns segundos; depois saia para o lado oposto.",
          "expect": "Aparece uma mensagem de entrada, nenhuma entrada repetida enquanto permanece dentro e uma mensagem de saída. O personagem atravessa o sensor e continua colidindo com o chão."
        },
        {
          "title": "Preveja o efeito da máscara",
          "text": "Pare o jogo. Troque a Mask do Sensor de 2 para 1, mantendo a Layer 2 do jogador. Repita a travessia. Depois restaure Mask 2.",
          "expect": "O sensor deixa de detectar o jogador, pois procura Layer 1. Alterar somente a Layer do Sensor não resolve a detecção que ele faz do jogador."
        },
        {
          "title": "Separe filtragem de resposta",
          "text": "Com a Mask restaurada, remova temporariamente o grupo jogador do personagem e execute novamente. Restaure o grupo ao terminar.",
          "expect": "O filtro físico ainda permite a detecção, mas o if do script ignora esse corpo e não imprime a mensagem. A ausência da mensagem não prova, sozinha, que não houve sobreposição."
        }
      ]
    },
    "checks": [
      {
        "question": "O sensor precisa estar na Layer 2 para detectar o jogador da Layer 2?",
        "answer": "Não. A detecção feita pelo sensor depende da Mask dele incluir uma Layer do jogador. A Layer do sensor informa a outros objetos onde ele está; na prática ela fica vazia."
      },
      {
        "question": "A Mask do jogador precisa incluir a Layer do sensor para o sensor detectá-lo?",
        "answer": "Não para esta detecção dirigida da Area2D para o corpo. O sensor examina a Layer do jogador. Não generalize esse exemplo como uma regra completa de resposta entre dois corpos físicos."
      },
      {
        "question": "body_entered funciona quando quem entra é outra Area2D?",
        "answer": "Use area_entered para outra área e body_entered para corpos. Na interação entre áreas, a observadora precisa de Monitoring; a área observada precisa de Monitorable e de uma Layer que a Mask da observadora inclua."
      },
      {
        "question": "Posso mover um corpo e consultar imediatamente get_overlapping_bodies() esperando a nova posição?",
        "answer": "A lista acompanha as atualizações da física. A consulta logo após a alteração pode refletir o estado anterior. Para entrada e saída, prefira sinais; para uma ação sobre o conjunto atual, consulte depois de a física atualizar a região."
      }
    ],
    "pitfalls": [
      {
        "title": "“Vejo a forma, mas não chega evento.”",
        "text": "Confira Monitoring, Shape, Disabled, Mask do sensor, Layer do corpo, a conexão e qual nó recebeu o script. Os objetos devem pertencer ao mesmo espaço/canvas físico. No exemplo, mantenha tudo sob Oficina."
      },
      {
        "title": "“A mensagem apareceu duas vezes.”",
        "text": "Não conecte o mesmo comportamento por código e pelo editor sem verificar as conexões. Confira também se há dois sensores instanciados ou mais de um corpo entrando."
      },
      {
        "title": "“A gravidade local não move meu CharacterBody2D.”",
        "text": "O personagem aplica a gravidade que seu script calcula. Uma área de gravidade influencia a simulação de RigidBody2D; o controlador do personagem precisa consultar e aplicar o campo compatível com sua versão. Isso fica como extensão, não ocorre automaticamente no script da aula 4."
      }
    ],
    "summary": "Area2D detecta sobreposições sem criar a resposta sólida de uma parede. Layer indica participação, Mask indica o que é examinado; Monitoring ativa a observação. Um sinal informa uma transição e um grupo permite escolher a resposta do jogo.",
    "next": "Na aula 6, vamos trabalhar a apresentação visual com sprites, animação e câmera, mantendo as formas físicas separadas da arte.",
    "sources": [
      {
        "label": "Godot: usar Area2D",
        "url": "https://docs.godotengine.org/en/stable/tutorials/physics/using_area_2d.html"
      },
      {
        "label": "Godot: Area2D e sobreposições",
        "url": "https://docs.godotengine.org/en/stable/classes/class_area2d.html"
      },
      {
        "label": "Godot: Layer e Mask",
        "url": "https://docs.godotengine.org/en/stable/classes/class_collisionobject2d.html"
      },
      {
        "label": "Godot: sinais",
        "url": "https://docs.godotengine.org/en/stable/getting_started/step_by_step/signals.html"
      }
    ]
  },
  "feynman": {
    "title": "Uma região que observa sem bloquear",
    "explanation": "Um sensor pode registrar a passagem de uma peça sem impedir seu movimento. Na Godot, **Area2D** representa essa região: ela acompanha sobreposições e pode avisar o código quando um corpo entra ou sai. Ela não fornece a barreira sólida de StaticBody2D.\n\nA forma delimita a região; os filtros escolhem o que ela observa. **Layer** informa em quais camadas um objeto participa. **Mask** informa quais camadas o observador procura. Na nossa prática, o jogador está na Layer 2 e a Mask do sensor procura a camada 2.\n\nDetectar e reagir são etapas diferentes. Após o evento, o script pode imprimir uma mensagem, abrir uma porta ou coletar um item. Um grupo chamado jogador é uma etiqueta para escolher essa resposta; ele não muda a geometria nem as camadas.",
    "analogies": [
      {
        "term": "Layer → identificação",
        "analogy": "Um objeto pode participar de uma ou várias das 32 camadas."
      },
      {
        "term": "Mask → seleção",
        "analogy": "O sensor examina as camadas marcadas na sua máscara, não apenas a camada em que ele próprio participa."
      },
      {
        "term": "Sinal → notificação",
        "analogy": "Uma transição chama o código conectado. Permanecer dentro não gera uma nova entrada a cada quadro."
      }
    ]
  },
  "howItWorks": {
    "overview": "No exemplo, uma forma retangular e o corpo do jogador podem se sobrepor sem bloquear a travessia. O corpo mantém suas colisões com o chão. A detecção exige geometria válida, filtros e Monitoring.\n\nOs sinais conectam um evento a uma função. Em `body_entered.connect(_ao_entrar)`, passamos a referência da função, sem parênteses: não queremos executá-la durante a conexão. Ela será chamada com o corpo detectado. A aula 7 aprofundará sinais.\n\nOs números 1 a 32 no Inspector identificam posições de bits, não o valor inteiro da máscara. Para configurar por número de camada no código, use set_collision_mask_value(). As camadas 1 e 2 juntas correspondem ao inteiro 3, não à “camada 3”.",
    "anatomy": [
      {
        "prop": "body_entered / body_exited",
        "desc": "Notificam entrada e saída de corpos. O parâmetro identifica o corpo; a resposta é definida no script conectado."
      },
      {
        "prop": "area_entered / area_exited",
        "desc": "São os eventos equivalentes para outra Area2D, observando também Monitorable da área detectada."
      },
      {
        "prop": "monitoring",
        "desc": "Permite que esta área acompanhe as sobreposições. Monitorable trata a possibilidade de outras áreas detectarem esta área."
      },
      {
        "prop": "get_overlapping_bodies()",
        "desc": "Consulta o conjunto acompanhado na atualização física. Não é uma varredura instantânea depois de qualquer mudança de posição."
      },
      {
        "prop": "is_in_group(\"jogador\")",
        "desc": "Filtra a resposta por uma etiqueta lógica, depois da detecção física."
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Prática principal: entrada e saída",
      "whenToUse": "Para o Sensor da prática guiada.",
      "description": "Anexe ao Sensor. As duas funções recebem um Node2D. O if imprime apenas para corpos do grupo jogador. Uma conexão por código é suficiente.",
      "code": "extends Area2D\n\nfunc _ready() -> void:\n    body_entered.connect(_ao_entrar)\n    body_exited.connect(_ao_sair)\n\nfunc _ao_entrar(corpo: Node2D) -> void:\n    if corpo.is_in_group(\"jogador\"):\n        print(\"Jogador entrou no sensor\")\n\nfunc _ao_sair(corpo: Node2D) -> void:\n    if corpo.is_in_group(\"jogador\"):\n        print(\"Jogador saiu do sensor\")\n",
      "pros": "Separa detecção, identificação do corpo e resposta do jogo.",
      "cons": "Imprimir não mostra uma interface ao jogador. Nesta prática, o resultado é observado no painel Output."
    },
    {
      "title": "2. Extensão: coletar uma única vez",
      "whenToUse": "Em outra Area2D usada como item, com forma, visual e Mask 2.",
      "description": "Anexe ao item. A variável coletado evita repetir a ação antes da remoção adiada do nó. O exemplo registra a coleta no Output; não depende de um método de inventário inexistente no jogador.",
      "code": "extends Area2D\n\nvar coletado: bool = false\n\nfunc _ready() -> void:\n    body_entered.connect(_ao_entrar)\n\nfunc _ao_entrar(corpo: Node2D) -> void:\n    if coletado or not corpo.is_in_group(\"jogador\"):\n        return\n    coletado = true\n    print(\"Item coletado\")\n    queue_free()\n",
      "pros": "A função é conectada e a guarda impede ação duplicada antes da liberação.",
      "cons": "Um inventário real exige definir onde guardar os dados. Se alterar Monitoring ou uma forma durante callbacks físicos, use alteração adiada apropriada."
    },
    {
      "title": "3. Extensão: consultar os ocupantes",
      "whenToUse": "Para observar o conjunto atual em intervalos, depois da prática principal.",
      "description": "Em uma cena separada, adicione um Timer filho chamado Consulta ao Sensor. Defina Wait Time = 1 s, One Shot desligado e Autostart ligado. O código conecta timeout e percorre a lista. Cada elemento da lista é chamado corpo dentro do laço for.",
      "code": "extends Area2D\n\nfunc _ready() -> void:\n    $Consulta.timeout.connect(_consultar)\n\nfunc _consultar() -> void:\n    for corpo in get_overlapping_bodies():\n        print(\"Ocupante: \", corpo.name)\n",
      "pros": "Mostra a diferença entre receber uma entrada e consultar quem continua dentro.",
      "cons": "A lista segue a atualização da física; ela não deve ser usada como teste imediato após mover ou criar a área. Não imprime apenas uma vez por entrada."
    }
  ],
  "simulator": {
    "type": "layers_masks",
    "title": "Laboratório de Area2D: presença, filtros e eventos",
    "description": "Mova o círculo pela região do sensor. Este é um modelo geométrico no navegador: a posição pode atravessar a região sem bloqueio. A detecção combina sobreposição, Layer do corpo, Mask do sensor e Monitoring. Apenas as posições selecionadas são avaliadas: saltar de um lado ao outro não simula o trajeto intermediário. Os controles recalculam o modelo imediatamente; na Godot, sobreposições e sinais acompanham a atualização física. Alterações de filtros aqui contam como transições do modelo, sem reproduzir a ordem de callbacks da engine.",
    "guide": [
      {
        "title": "Preveja",
        "text": "Com corpo na camada 2, Mask 2 e Monitoring ligado, aproxime o centro do corpo de X = 300. Deve haver uma entrada."
      },
      {
        "title": "Experimente",
        "text": "Permaneça dentro e ajuste a posição um pouco: não deve surgir nova entrada. Saia para X = 420: deve haver uma saída. O sensor não bloqueia o círculo."
      },
      {
        "title": "Compare filtros",
        "text": "Volte para X = 300 e troque a Mask para nenhuma. Existe sobreposição geométrica, mas não detecção. Restaure Mask 2 e teste Monitoring desligado. Reiniciar volta o corpo a X = 80 e zera os contadores, preservando os filtros escolhidos."
      }
    ]
  },
  "quiz": {
    "question": "O jogador está somente na Layer 2. O Sensor tem Monitoring ligado e forma válida. Qual configuração permite ao Sensor detectar esse corpo, mesmo com a Layer do próprio Sensor vazia?",
    "options": [
      "Mask do Sensor marcada apenas na camada 2.",
      "Layer do Sensor marcada na camada 2, com Mask vazia.",
      "Grupo jogador no corpo, com Mask do Sensor vazia.",
      "Transformar o Sensor em StaticBody2D."
    ],
    "correctIndex": 0,
    "explanation": "A Mask do observador deve incluir uma Layer do corpo observado. A Layer do Sensor pode ficar vazia nesta detecção dirigida.",
    "feedback": [
      "",
      "A Layer informa como o Sensor é identificado por outros objetos. É a Mask dele que escolhe o que observa.",
      "O grupo filtra a lógica depois da detecção; não substitui a máscara física.",
      "StaticBody2D fornece uma superfície sólida, com outra finalidade."
    ]
  }
},
{
  "id": "2d-init-sprites-cameras",
  "area": "2d",
  "level": "iniciante",
  "levelLabel": "Iniciante",
  "title": "6. Sprites, animação e câmera",
  "subtitle": "Anime o visual sem alterar a colisão, acompanhe o personagem com uma câmera e compare camadas de cenário.",
  "nodesUsed": [
    "Sprite2D",
    "AnimatedSprite2D",
    "SpriteFrames",
    "Camera2D",
    "Parallax2D"
  ],
  "teaching": {
    "codeRequired": true,
    "duration": "45–60 min, incluindo a prática (estimativa)",
    "prerequisite": "Aulas 1–5, em especial a Oficina com personagem e ações de movimento. Use Godot 4.3 ou mais recente para a extensão com Parallax2D. O pacote de apoio contém quatro SVGs para a animação e um fundo; não é um projeto pronto.",
    "objectives": [
      "Montar SpriteFrames e escolher animações no controlador em execução.",
      "Espelhar apenas a arte e observar o efeito de uma câmera ativa.",
      "Explicar o deslocamento relativo de duas camadas com fatores de parallax diferentes."
    ],
    "practice": {
      "title": "Prática guiada: movimento, imagem e enquadramento",
      "intro": "Use uma cópia da Oficina da aula anterior. Conclua animação e câmera antes da extensão de parallax. O pacote fornece arte simples para não depender de uma spritesheet externa.",
      "tree": "Oficina (Node2D)\n├── Chao (StaticBody2D)\n├── Sensor (Area2D) — opcional, mantenha o script anterior\n└── Jogador (CharacterBody2D)\n    ├── CollisionShape2D — mantenha a forma anterior\n    ├── AnimatedSprite2D — novo visual\n    └── Camera2D — posição local (0, 0)",
      "download": {
        "url": "assets/aula-06-quadros.zip",
        "label": "Baixar quadros e fundo de apoio"
      },
      "downloadNote": "Extraia os arquivos para uma pasta arte dentro do projeto. frame_0.svg a frame_3.svg medem 32 × 32; fundo.svg mede 1024 × 720. A seta na peça ajuda a observar flip_h. O pacote inclui instruções, sem código executável.",
      "steps": [
        {
          "title": "Substitua somente o visual",
          "text": "No Jogador, remova ou oculte o Sprite2D antigo e adicione AnimatedSprite2D com esse nome exato. Mantenha o corpo e CollisionShape2D intactos. Deixe o novo visual na posição local `(0, 0)`.",
          "expect": "Trocar o desenho não altera a forma física. Ainda não há animação: o novo nó precisa de um recurso SpriteFrames."
        },
        {
          "title": "Monte duas animações",
          "text": "Na propriedade Sprite Frames, crie um novo SpriteFrames e abra o painel inferior. Renomeie default para `parado` e arraste frame_0.svg para ela. Crie `corrida`, adicione frame_0.svg, frame_1.svg, frame_2.svg e frame_3.svg nessa ordem. Defina corrida com 8 FPS e Loop ligado.",
          "expect": "A prévia de corrida troca quatro quadros em meio segundo. Parado tem um único quadro. Confirme os nomes em letras minúsculas; eles serão usados no script."
        },
        {
          "title": "Integre ao movimento",
          "text": "Substitua o script do Jogador pelo exemplo 1. Ele mantém as três ações e a gravidade anteriores e chama atualizar_visual() depois de move_and_slide(). Execute a cena e mova o personagem.",
          "expect": "Movendo para a direita, a seta aponta à direita e corrida toca; à esquerda, flip_h espelha a arte. Ao parar, aparece parado. Esta versão mantém corrida no ar se houver movimento horizontal; não contém quadros próprios de salto."
        },
        {
          "title": "Ative uma câmera simples",
          "text": "Adicione Camera2D como filha do Jogador em `(0, 0)`, Enabled ligado, Zoom `(1, 1)`, Offset `(0, 0)` e drag margins desativadas. Deixe só essa câmera ativa no viewport. Execute sem suavização primeiro.",
          "expect": "A visão acompanha o personagem. O corpo continua no mesmo mundo; é a transformação da visualização que muda. Um mapa pequeno pode deixar áreas vazias visíveis ao redor."
        },
        {
          "title": "Compare a suavização",
          "text": "No Inspector da câmera, ligue Position Smoothing e comece com Speed 5. Execute, mova e pare. Compare com a opção desligada. Não configure limites nesta primeira comparação.",
          "expect": "O centro da visão leva um tempo para alcançar o alvo. A posição do nó da câmera pode diferir do centro efetivo mostrado por get_screen_center_position(). A suavização não muda a colisão do jogador."
        },
        {
          "title": "Acrescente uma camada de fundo",
          "text": "Extensão: em Godot 4.3+, adicione Parallax2D como filho da Oficina e um Sprite2D como filho dele. Use fundo.svg, Centered desligado e posição local `(0, 0)`. No Parallax2D, defina Z Index = -10, Scroll Scale `(0.2, 1)`, Repeat Size `(1024, 0)`, Ignore Camera Scroll desligado e Autoscroll `(0, 0)`.",
          "expect": "O fundo aparece atrás do personagem e repete na horizontal. O SVG tem bordas compatíveis para esse exemplo; Repeat Size não corrige uma imagem que não encaixa."
        },
        {
          "title": "Faça uma comparação controlada",
          "text": "Mude apenas Scroll Scale X de 0.2 para 1 e depois para 0. Volte a mover a câmera. Mantenha zoom e rotação constantes. Se houver espaços vazios ao afastar o zoom, aumente Repeat Times e reveja a cobertura do desenho.",
          "expect": "Com 1, a camada acompanha o deslocamento de cenário comum; com 0.2, desloca-se menos na tela; com 0, fica fixa em relação à rolagem da câmera neste arranjo. Não é a velocidade física do personagem que muda."
        }
      ]
    },
    "checks": [
      {
        "question": "A animação está configurada, mas nunca muda para corrida. O que verificar?",
        "answer": "Confira o nome da animação, os quadros e se atualizar_visual() é chamada pelo controlador após o movimento. Só definir uma função não a executa."
      },
      {
        "question": "Por que flip_h é aplicado no AnimatedSprite2D?",
        "answer": "Para alterar somente a apresentação. Corpo e forma física continuam com sua transformação. Isso evita usar a transformação do corpo para resolver uma tarefa visual; não é garantia universal de ausência de erros físicos."
      },
      {
        "question": "Uma câmera moveu 100 unidades à direita. Como comparar camadas 0.2 e 0.5 no modelo sem zoom?",
        "answer": "Os elementos fixos das camadas deslocam-se para a esquerda em 20 e 50 unidades na tela, respectivamente. O laboratório apresenta esses deslocamentos com sinal negativo e escala visual comum."
      },
      {
        "question": "Repeat Size faz qualquer imagem repetir sem costura?",
        "answer": "Não. É necessário ajustar o período à dimensão da arte e à cobertura. As bordas da imagem devem combinar; zoom, escala e Repeat Times também influenciam a cobertura."
      }
    ],
    "pitfalls": [
      {
        "title": "“O personagem ficou invisível.”",
        "text": "Confira SpriteFrames, quadros atribuídos e qual visual foi ocultado. Ajuste a escala só do visual se necessário. Não remova CollisionShape2D ao trocar a arte."
      },
      {
        "title": "“A câmera não segue ou segue outro nó.”",
        "text": "Confira Enabled, o viewport e a câmera atual, além do pai e da posição local. Limites, drag margins e suavização também podem mudar o enquadramento. Offset pode levar a visão além dos limites."
      },
      {
        "title": "“A pixel art continua tremendo com Nearest.”",
        "text": "Nearest controla a amostragem, mas não resolve sozinho posições fracionárias, zoom não inteiro ou escala da janela. Compare o projeto em escala inteira antes de adicionar câmera suave; escolha o efeito visual pretendido."
      }
    ],
    "summary": "Sprite2D mostra uma textura; AnimatedSprite2D organiza quadros em SpriteFrames. O controlador escolhe a animação e espelha a arte. Camera2D altera o enquadramento; Parallax2D diferencia a rolagem de camadas. Nenhum desses elementos substitui as formas de colisão.",
    "next": "Na aula 7, aprofundaremos sinais e comunicação entre nós, retomando as conexões usadas no Sensor.",
    "sources": [
      {
        "label": "Godot: animação de sprites 2D",
        "url": "https://docs.godotengine.org/en/stable/tutorials/2d/2d_sprite_animation.html"
      },
      {
        "label": "Godot: AnimatedSprite2D",
        "url": "https://docs.godotengine.org/en/stable/classes/class_animatedsprite2d.html"
      },
      {
        "label": "Godot: Camera2D",
        "url": "https://docs.godotengine.org/en/stable/classes/class_camera2d.html"
      },
      {
        "label": "Godot: parallax 2D e repetição",
        "url": "https://docs.godotengine.org/en/stable/tutorials/2d/2d_parallax.html"
      },
      {
        "label": "Godot: Parallax2D",
        "url": "https://docs.godotengine.org/en/stable/classes/class_parallax2d.html"
      }
    ]
  },
  "feynman": {
    "title": "A peça, sua imagem e a janela do cenário",
    "explanation": "O personagem físico pode permanecer com a mesma forma enquanto seu desenho muda. **Sprite2D** mostra uma textura. **AnimatedSprite2D** troca quadros de um recurso SpriteFrames, como uma sequência de imagens. O controlador decide quando mostrar parado ou corrida.\n\nA **Camera2D** define qual trecho do mundo aparece. Seguir o personagem não significa arrastar todo o cenário por código. Com suavização, o centro efetivo da visão pode ficar temporariamente atrás do alvo.\n\nNo **parallax**, camadas parecem estar a distâncias diferentes porque se deslocam de maneiras diferentes na tela quando a câmera se move. É um efeito de apresentação 2D, sem criar geometria 3D nem alterar colisões.",
    "analogies": [
      {
        "term": "SpriteFrames → sequência de quadros",
        "analogy": "A ordem e a duração dos quadros criam a animação; o desenho não determina a forma de colisão."
      },
      {
        "term": "Camera2D → enquadramento",
        "analogy": "Muda o trecho observado. O mundo e suas coordenadas continuam existindo fora da janela."
      },
      {
        "term": "Parallax2D → camadas de cenário",
        "analogy": "Um fator menor faz a camada rolar mais lentamente em relação à tela, sugerindo maior distância."
      }
    ]
  },
  "howItWorks": {
    "overview": "Na prática, play(\"corrida\") seleciona uma animação existente. flip_h espelha a textura do nó visual. Usar o mesmo nome com play() não precisa reiniciar a sequência a cada atualização.\n\nNearest mantém transições duras entre texels e Linear interpola amostras. São opções de apresentação, não classificações universais de qualidade.\n\nParallax2D foi introduzido na Godot 4.3 e é recomendado para novos arranjos. ParallaxBackground e ParallaxLayer ainda existem como alternativas antigas; não foram simplesmente removidos. A prática usa rotação zero, zoom unitário e deslocamento horizontal para isolar o conceito.",
    "anatomy": [
      {
        "prop": "SpriteFrames",
        "desc": "Recurso com nomes de animações, quadros, taxa de reprodução e repetição."
      },
      {
        "prop": "flip_h",
        "desc": "Espelha somente o desenho do Sprite2D ou AnimatedSprite2D."
      },
      {
        "prop": "position_smoothing_enabled",
        "desc": "Ativa o acompanhamento suave da câmera. Limites e drag margins têm efeitos adicionais."
      },
      {
        "prop": "get_screen_center_position()",
        "desc": "Consulta o centro efetivo da visão, que pode diferir da posição global do nó Camera2D."
      },
      {
        "prop": "scroll_scale / repeat_size",
        "desc": "Controlam a rolagem relativa e o período de repetição. A arte e a cobertura precisam corresponder à configuração."
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Prática principal: animação ligada ao movimento",
      "whenToUse": "No Jogador da Oficina, com as ações anteriores e as animações parado e corrida.",
      "description": "Este é o controlador completo da prática. Substitui o script anterior do personagem e mantém o caminho exato $AnimatedSprite2D. A função visual é chamada ao final do passo de física.",
      "code": "extends CharacterBody2D\n\n@export var rapidez: float = 160.0\n@export var gravidade: float = 900.0\n@export var velocidade_salto: float = -320.0\n@onready var anim: AnimatedSprite2D = $AnimatedSprite2D\n\nfunc _physics_process(delta: float) -> void:\n    if not is_on_floor():\n        velocity.y += gravidade * delta\n    if Input.is_action_just_pressed(\"pular\") and is_on_floor():\n        velocity.y = velocidade_salto\n    velocity.x = Input.get_axis(\"mover_esquerda\", \"mover_direita\") * rapidez\n    move_and_slide()\n    atualizar_visual()\n\nfunc atualizar_visual() -> void:\n    if velocity.x != 0.0:\n        anim.flip_h = velocity.x < 0.0\n        anim.play(\"corrida\")\n    else:\n        anim.play(\"parado\")\n",
      "pros": "Mostra onde o visual é atualizado e preserva a independência entre arte e forma física.",
      "cons": "Não tem animações de salto, queda ou ataque. Elas exigem arte, nomes e condições adicionais."
    },
    {
      "title": "2. Consulta: confirmar a câmera atual",
      "whenToUse": "Se houver mais de uma câmera no projeto e você precisar conferir qual está ativa.",
      "description": "Anexe este script à Camera2D filha do Jogador. make_current() seleciona a câmera para seu viewport. Primeiro teste sem suavização; depois habilite-a no Inspector.",
      "code": "extends Camera2D\n\nfunc _ready() -> void:\n    make_current()\n    print(\"Câmera atual: \", is_current())\n",
      "pros": "A função de configuração é chamada em _ready(), sem depender de uma função externa não conectada.",
      "cons": "Não alterna várias câmeras nem implementa limites. Esse comportamento requer regras do projeto."
    },
    {
      "title": "3. Extensão: tremor opcional com tecla de teste",
      "whenToUse": "Depois da prática principal, se quiser experimentar um efeito de impacto.",
      "description": "Em Input Map crie testar_tremor e associe T. Use este script no lugar do exemplo 2 na mesma Camera2D; não anexe os dois. Intensidade 0 desliga o efeito. O decaimento é limitado e depende do tempo, mas a amostra aleatória por quadro não será idêntica em FPS diferentes.",
      "code": "extends Camera2D\n\n@export_range(0.0, 20.0) var intensidade: float = 8.0\nvar amplitude: float = 0.0\n\nfunc _ready() -> void:\n    make_current()\n\nfunc _process(delta: float) -> void:\n    if Input.is_action_just_pressed(\"testar_tremor\"):\n        amplitude = intensidade\n    amplitude *= exp(-8.0 * delta)\n    if amplitude < 0.05:\n        amplitude = 0.0\n    offset = Vector2(randf_range(-amplitude, amplitude),\n        randf_range(-amplitude, amplitude))\n",
      "pros": "Há um gatilho explícito e uma forma de desativar a intensidade. O corpo físico não recebe o tremor.",
      "cons": "Offset também afeta o enquadramento nos limites da câmera. Ofereça controle para desativar o efeito no jogo."
    }
  ],
  "simulator": {
    "type": "camera_parallax_2d",
    "title": "Laboratório visual: quadros, câmera e parallax",
    "description": "Modelo no navegador, sem executar classes da Godot. Um marcador usa quatro desenhos vetoriais discretos para representar quadros; não carrega o SpriteFrames do projeto. A câmera usa aproximação exponencial própria, não uma reprodução exata de Position Smoothing. Câmera e camadas usam a mesma escala visual, sem zoom, rotação ou limites de mapa. O tremor é opcional e afeta só a vista; pausa congela o tempo. A escala visual é 0.5 pixel de canvas por unidade do mundo. A animação é escolhida manualmente e o controle de posição reposiciona o alvo, sem simular caminhada.",
    "guide": [
      {
        "title": "Compare a câmera",
        "text": "Sem acompanhamento suave, a peça fica no centro ao mudar sua posição. Com suavização, ela pode sair do enquadramento durante um salto grande de posição e reaparecer quando a câmera alcançar o alvo."
      },
      {
        "title": "Meça o parallax",
        "text": "Com acompanhamento imediato, aumente o X de 220 para 320: o fundo 0.2 desloca-se -20, o meio 0.5 desloca-se -50 e a frente 1.0 desloca-se -100 unidades."
      },
      {
        "title": "Confira os quadros",
        "text": "Ative a animação e ajuste sua taxa. São quatro quadros com índices 0 a 3. O tremor só começa pelo botão e pode ser desativado; reiniciar restaura os parâmetros iniciais."
      }
    ]
  },
  "quiz": {
    "question": "A peça deve virar para a esquerda mantendo a mesma forma física. Qual alteração atende a esse objetivo?",
    "options": [
      "Definir flip_h = true no AnimatedSprite2D, mantendo corpo e CollisionShape2D intactos.",
      "Girar o CharacterBody2D inteiro em 180 graus.",
      "Mudar a Mask para inverter o desenho.",
      "Alterar a posição do chão para o lado oposto."
    ],
    "correctIndex": 0,
    "explanation": "flip_h altera a apresentação do nó visual. A colisão permanece separada, sem precisar transformar o corpo para espelhar a arte.",
    "feedback": [
      "",
      "Isso transforma também o corpo e seus filhos. A tarefa é apenas visual.",
      "Mask filtra detecção física; não espelha a textura.",
      "Mover o chão muda o mundo físico, sem resolver a orientação da arte."
    ]
  }
},

{
  "id": "2d-inter-signals-events",
  "area": "2d",
  "level": "intermediario",
  "levelLabel": "Intermediário",
  "title": "7. Sinais e comunicação entre nós",
  "subtitle": "Conecte eventos a respostas observáveis e escolha quando uma conexão local ou um Event Bus faz sentido.",
  "nodesUsed": [
    "Signal",
    "Callable",
    "Button",
    "Autoload"
  ],
  "teaching": {
    "codeRequired": true,
    "duration": "35–50 min, incluindo a prática (estimativa)",
    "prerequisite": "Aulas 1–6 e leitura de funções em GDScript. Faça esta prática em uma cena nova: ela não substitui o controlador do personagem.",
    "objectives": [
      "Declarar um sinal com argumento, conectar funções e emitir valores.",
      "Distinguir o estado atual de um evento e prever o efeito de uma reconexão.",
      "Comparar conexões locais, um barramento global e espera com await."
    ],
    "practice": {
      "title": "Prática guiada: painel de pressão",
      "intro": "Comece com uma cena pequena, sem física nem arte externa. Um botão altera a pressão; dois ouvintes mostram o valor e um alerta. O primeiro código contém toda a prática principal.",
      "tree": "Painel (Node2D) — painel.gd\n├── Acionar (Button) — texto: Aumentar pressão\n├── Leitura (Label)\n└── Alerta (Label)",
      "steps": [
        {
          "title": "Monte uma cena visível",
          "text": "Crie a árvore com esses nomes exatos e salve painel.tscn. Posicione Acionar em `(40, 40)`, Leitura em `(40, 100)` e Alerta em `(40, 140)`. Dê ao botão um tamanho suficiente para o texto. Os Labels podem começar vazios.",
          "expect": "Os três controles ficam separados na janela. Não é preciso CollisionShape2D, Input Map ou conectar sinais pelo editor."
        },
        {
          "title": "Conecte por código",
          "text": "Anexe o exemplo 1 ao Painel. Não faça também a conexão pressed pelo editor: use apenas o caminho mostrado. Execute esta cena com F6.",
          "expect": "Antes do primeiro clique, aparecem Pressão: 0 e Normal. Isso vem da inicialização explícita; nenhum evento passado foi reproduzido."
        },
        {
          "title": "Emita e observe dois ouvintes",
          "text": "Clique uma vez, depois mais seis vezes. Cada clique aumenta a pressão em 10 até o limite de 100 e emite pressao_alterada com o novo valor.",
          "expect": "O primeiro clique mostra 10; no sétimo, mostra 70 e Alerta. As duas funções recebem o mesmo argumento da emissão. Ao chegar a 100, cliques adicionais não alteram o valor nem emitem novo evento."
        },
        {
          "title": "Desconecte um ouvinte",
          "text": "Pare a cena. Comente apenas a linha pressao_alterada.connect(_atualizar_alerta), execute novamente e clique sete vezes. Depois restaure a linha e execute de novo.",
          "expect": "Sem a conexão, Leitura chega a 70, mas Alerta permanece Normal. Restaurar o código e executar reinicia esta cena; não recupera os cliques da execução anterior."
        },
        {
          "title": "Teste a reconexão no laboratório",
          "text": "No laboratório, desconecte a porta, emita 70 e reconecte sem emitir. Em seguida emita 20. Compare o número de mensagens e o último valor recebido por cada destino.",
          "expect": "Reconectar não entrega o 70 antigo à porta. Ela recebe 20 somente na próxima emissão. Alterar o valor do controle também não é emitir."
        },
        {
          "title": "Extensões opcionais",
          "text": "Para o exemplo 2, crie eventos.gd com duas linhas: extends Node e signal pressao_alterada(valor: int), em linhas separadas. Registre-o em Project > Project Settings > Globals > Autoload como Eventos, habilitado. Em versões anteriores, procure a aba Autoload. Substitua o script do Painel pelo exemplo 2. Para o exemplo 3, use o mesmo Painel e substitua seu script; o Autoload não é necessário.",
          "expect": "O exemplo 2 envia pelo nó global Eventos; o exemplo 3 aguarda um segundo antes de alterar Leitura. São alternativas ao exemplo 1, não scripts para colar juntos."
        }
      ]
    },
    "pitfalls": [
      {
        "title": "“Um clique responde duas vezes.”",
        "text": "Confira se o mesmo comportamento foi conectado por caminhos diferentes, como editor e código. Uma conexão duplicada do mesmo Callable normalmente gera erro; is_connected() ajuda quando uma configuração pode se repetir."
      },
      {
        "title": "“Conectei, mas não recebi o valor antigo.”",
        "text": "Um sinal comum anuncia uma ocorrência, sem guardar histórico. Inicialize a interface consultando o estado no objeto responsável por ele. Não invente uma emissão antiga para corrigir uma tela desatualizada."
      },
      {
        "title": "“Eventos não foi encontrado.”",
        "text": "Crie o script, registre o Autoload com o nome Eventos e mantenha-o habilitado. O barramento continua sendo uma dependência compartilhada; nomes e argumentos formam um contrato."
      }
    ],
    "checks": [
      {
        "question": "Declarar signal já chama alguma função?",
        "answer": "Não. A declaração define o evento; connect registra a reação; emit anuncia uma ocorrência com seus argumentos."
      },
      {
        "question": "O emissor precisa conhecer o nome de cada receptor?",
        "answer": "Não precisa conhecê-los para emitir. Algum código ainda deve organizar as conexões. Nesta cena, o próprio Painel coordena a interface."
      },
      {
        "question": "Reconectar entrega eventos anteriores?",
        "answer": "Não neste modelo nem em um sinal comum da Godot. Se a aplicação precisar de histórico ou estado persistente, implemente essa responsabilidade explicitamente."
      },
      {
        "question": "Call Down, Signal Up é uma proibição da linguagem?",
        "answer": "Não. É uma orientação para reduzir dependências em árvores de cenas: um pai pode coordenar filhos, enquanto filhos anunciam acontecimentos. Referências diretas também podem ser adequadas quando a dependência é intencional."
      }
    ],
    "summary": "Um sinal comunica uma ocorrência aos ouvintes conectados. Conexão, emissão e estado são responsabilidades diferentes. Comece com conexões locais; use um barramento global quando o alcance do evento justificar a dependência compartilhada.",
    "next": "Na aula 8, organize o mundo com células, terrenos e dados dos blocos.",
    "sources": [
      {
        "label": "Godot: usando sinais",
        "url": "https://docs.godotengine.org/en/stable/getting_started/step_by_step/signals.html"
      },
      {
        "label": "Godot: Signal e conexões",
        "url": "https://docs.godotengine.org/en/stable/classes/class_signal.html"
      },
      {
        "label": "Godot: organização de cenas",
        "url": "https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html"
      },
      {
        "label": "Godot: Autoload",
        "url": "https://docs.godotengine.org/en/stable/tutorials/scripting/singletons_autoload.html"
      },
      {
        "label": "Godot: await em GDScript",
        "url": "https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html#awaiting-signals-or-coroutines"
      }
    ]
  },
  "feynman": {
    "title": "Eventos e respostas",
    "explanation": "Um botão pode anunciar que foi pressionado sem decidir tudo que acontece depois. Uma função conectada ao seu sinal reage ao evento. Com um sinal próprio, como **pressao_alterada**, o argumento leva o valor aos ouvintes.\n\nHá três ações distintas: **declarar** o evento, **conectar** uma resposta e **emitir** uma ocorrência. Nenhuma delas substitui as outras. Uma conexão nova recebe as próximas emissões, não as anteriores.\n\nUm **Event Bus** reúne sinais em um objeto compartilhado, muitas vezes um Autoload. Ele facilita alcançar partes distantes do projeto, mas essas partes continuam dependendo do nome global e do contrato dos eventos.",
    "analogies": [
      {
        "term": "Sinal → aviso",
        "analogy": "Informa que algo aconteceu. Não é, por si só, um banco de dados do estado atual."
      },
      {
        "term": "Callable → resposta registrada",
        "analogy": "É a função que será chamada com os argumentos compatíveis."
      },
      {
        "term": "Event Bus → ponto compartilhado",
        "analogy": "Centraliza eventos de alcance amplo; não elimina todas as dependências."
      }
    ]
  },
  "howItWorks": {
    "overview": "No padrão Observer, ouvintes registram interesse em um evento. A implementação com sinais permite que o emissor publique sem percorrer referências explícitas aos destinatários. O projeto ainda precisa definir quem conecta e qual é o contrato.\n\nAs conexões padrão usadas aqui chamam as respostas durante a emissão; não são pacotes viajando pela rede. Conexões com CONNECT_DEFERRED têm outro momento de execução e estão fora desta prática. Não dependa da ordem entre ouvintes para encadear regras.\n\nUse uma chamada direta para pedir uma ação conhecida e um sinal para anunciar uma ocorrência. Um Autoload é uma opção de alcance global, não uma exigência para usar sinais.",
    "anatomy": [
      {
        "prop": "signal pressao_alterada(valor: int)",
        "desc": "Declara o evento e o argumento esperado. O receptor deve aceitar esse argumento."
      },
      {
        "prop": "pressao_alterada.connect(funcao)",
        "desc": "Registra um Callable. Use is_connected(funcao) antes de conectar se a configuração puder se repetir."
      },
      {
        "prop": "pressao_alterada.emit(70)",
        "desc": "Emite uma ocorrência com valor 70. O sinal comum não armazena esse valor para ouvintes futuros."
      },
      {
        "prop": "disconnect(funcao)",
        "desc": "Remove essa conexão. Verifique is_connected(funcao) antes de removê-la quando não souber se existe."
      },
      {
        "prop": "await sinal",
        "desc": "Suspende essa função até o sinal, permitindo ao restante do jogo continuar. Controle reentrância e planeje a duração de vida da cena."
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Prática principal: um sinal, duas respostas",
      "whenToUse": "Na cena Painel com Button Acionar e os Labels Leitura e Alerta.",
      "description": "Um único arquivo painel.gd. O botão dispara _aumentar; o sinal próprio distribui o novo valor a duas funções. Inicializar as telas por chamada direta separa estado inicial de evento.",
      "code": "extends Node2D\n\nsignal pressao_alterada(valor: int)\n\n@onready var acionar: Button = $Acionar\n@onready var leitura: Label = $Leitura\n@onready var alerta: Label = $Alerta\nvar pressao: int = 0\n\nfunc _ready() -> void:\n    acionar.pressed.connect(_aumentar)\n    pressao_alterada.connect(_atualizar_leitura)\n    pressao_alterada.connect(_atualizar_alerta)\n    _atualizar_leitura(pressao)\n    _atualizar_alerta(pressao)\n\nfunc _aumentar() -> void:\n    if pressao >= 100:\n        return\n    pressao = mini(pressao + 10, 100)\n    pressao_alterada.emit(pressao)\n\nfunc _atualizar_leitura(valor: int) -> void:\n    leitura.text = \"Pressão: %d\" % valor\n\nfunc _atualizar_alerta(valor: int) -> void:\n    alerta.text = \"Alerta\" if valor >= 70 else \"Normal\"\n",
      "pros": "O gatilho e as duas respostas estão completos e visíveis. Não exige serviços globais.",
      "cons": "Esta cena concentra a coordenação. Em cenas maiores, distribua responsabilidades mantendo contratos claros."
    },
    {
      "title": "2. Extensão: emitir pelo Autoload Eventos",
      "whenToUse": "Depois de criar e registrar eventos.gd conforme a prática, para experimentar alcance global.",
      "description": "Substitua painel.gd por este arquivo. O Autoload só declara o sinal; o valor continua neste Painel e não persiste entre instâncias. Este exemplo usa apenas Leitura; Alerta fica vazio. Para um projeto real, prefira o barramento para eventos que várias cenas precisam observar.",
      "code": "extends Node2D\n\n@onready var leitura: Label = $Leitura\nvar pressao: int = 0\n\nfunc _ready() -> void:\n    $Acionar.pressed.connect(_aumentar)\n    Eventos.pressao_alterada.connect(_mostrar)\n    _mostrar(pressao)\n\nfunc _aumentar() -> void:\n    if pressao >= 100:\n        return\n    pressao = mini(pressao + 10, 100)\n    Eventos.pressao_alterada.emit(pressao)\n\nfunc _mostrar(valor: int) -> void:\n    leitura.text = \"Bus: %d\" % valor\n\nfunc _exit_tree() -> void:\n    if Eventos.pressao_alterada.is_connected(_mostrar):\n        Eventos.pressao_alterada.disconnect(_mostrar)\n",
      "pros": "Mostra a emissão e a assinatura explícitas no objeto global, além da remoção da conexão ao sair da árvore.",
      "cons": "Exige Autoload configurado e contrato global. O barramento vazio não conserva pressão, histórico ou destinatários de cenas futuras."
    },
    {
      "title": "3. Extensão: esperar sem bloquear a cena",
      "whenToUse": "No mesmo Painel, usando este script em lugar dos anteriores.",
      "description": "O clique inicia uma espera de um segundo e desabilita o botão durante a operação. O SceneTreeTimer emite timeout; await retoma esta função. Teste mantendo a cena aberta. Trocas de cena e cancelamento precisam de uma política própria; verificar self depois não torna seguro um objeto já destruído.",
      "code": "extends Node2D\n\n@onready var acionar: Button = $Acionar\n@onready var leitura: Label = $Leitura\nvar ocupado: bool = false\n\nfunc _ready() -> void:\n    acionar.pressed.connect(_aguardar)\n    leitura.text = \"Pronto\"\n\nfunc _aguardar() -> void:\n    if ocupado:\n        return\n    ocupado = true\n    acionar.disabled = true\n    leitura.text = \"Aguardando…\"\n    await get_tree().create_timer(1.0).timeout\n    leitura.text = \"Espera concluída\"\n    acionar.disabled = false\n    ocupado = false\n",
      "pros": "Tem um gatilho explícito e impede esperas sobrepostas. O restante da cena continua processando.",
      "cons": "É uma demonstração curta de espera, sem sistema de cancelamento, troca de cenas ou persistência."
    }
  ],
  "simulator": {
    "type": "signals_bus",
    "title": "Laboratório: emissão e ouvintes conectados",
    "description": "Modelo didático no navegador, sem executar a Godot. Cada emissão entrega o valor imediatamente aos destinos conectados naquele momento. A luz de destaque é apenas feedback visual, não atraso de transmissão. Porta abre e luz acende com valor ≥ 70; o HUD guarda o último valor recebido. São respostas escolhidas para este exemplo. O laboratório não simula Autoload, conexões diferidas ou rede. O valor usa uma escala didática de 0 a 100, sem unidade física.",
    "guide": [
      {
        "title": "Controle o valor",
        "text": "Ajustar a pressão prepara a próxima emissão; não modifica os receptores. Emita 70 e confira as três respostas e as contagens."
      },
      {
        "title": "Desconecte e reconecte",
        "text": "Desconecte a porta, emita 20 e reconecte. A porta mantém seu último valor. Só a emissão seguinte atualiza esse destino."
      },
      {
        "title": "Observe sem ouvintes",
        "text": "Desconecte os três e emita: a contagem de emissões aumenta, as de recebimento não. Limpar histórico zera os resultados, mantendo valor e conexões escolhidos. Pausar congela o destaque animado, mas permite emitir manualmente."
      }
    ]
  },
  "quiz": {
    "question": "A porta estava desconectada quando o emissor enviou 70. Ela se conecta depois, antes de qualquer nova emissão. O que acontece com um sinal comum?",
    "options": [
      "A porta recebe automaticamente o último 70.",
      "A porta aguarda uma próxima emissão; o sinal não reproduz o evento anterior.",
      "Conectar emite o sinal para todos os ouvintes.",
      "O HUD perde o valor que já recebeu."
    ],
    "correctIndex": 1,
    "explanation": "Conectar registra interesse em emissões futuras. Se um receptor precisa do estado atual ao entrar, inicialize-o consultando o objeto responsável por esse estado.",
    "feedback": [
      "Isso exigiria armazenamento e reprodução implementados pela aplicação.",
      "",
      "connect registra a resposta; não chama emit.",
      "Uma nova conexão não apaga o estado de outros receptores."
    ]
  }
},
{
  "id": "2d-inter-tilemaps-worlds",
  "area": "2d",
  "level": "intermediario",
  "levelLabel": "Intermediário",
  "title": "8. Mundos com TileMapLayer e TileSet",
  "subtitle": "Monte um atlas, pinte células e consulte dados do mapa antes de experimentar conexões de terrenos.",
  "nodesUsed": [
    "TileMapLayer",
    "TileSet",
    "TileSetAtlasSource",
    "TileData"
  ],
  "teaching": {
    "codeRequired": true,
    "duration": "50–70 min; terrenos são uma extensão (estimativa)",
    "prerequisite": "Godot 4.3 ou mais recente, aulas 1–7 e coordenadas locais/globais da aula 2. TileMapLayer é a opção atual; o antigo TileMap está obsoleto. Esta aula usa grade quadrada de 32 × 32, sem rotação ou escala no mapa.",
    "objectives": [
      "Criar um TileSet com atlas e pintar uma camada de mapa.",
      "Converter uma posição global em célula local e consultar metadados.",
      "Distinguir pintura, colisão configurada e conexão automática de terrenos."
    ],
    "practice": {
      "title": "Prática guiada: mapa de bronze, óleo e vapor",
      "intro": "Use uma cena nova e o atlas de apoio. Primeiro configure os três tipos de bloco e consulte seus dados. Pintura por código e terrenos ficam para depois da primeira execução.",
      "tree": "Mundo (Node2D)\n├── Chao (TileMapLayer) — script do exemplo 1\n└── Leitura (Label) — posição (20, 20)",
      "download": {
        "url": "assets/aula-08-atlas.zip",
        "label": "Baixar atlas e guia dos terrenos"
      },
      "downloadNote": "O ZIP contém atlas.svg (96 × 32), tubos.svg (128 × 128), tabela de conexões e instruções. São imagens e documentação; o TileSet será configurado na prática.",
      "steps": [
        {
          "title": "Crie a camada e o catálogo",
          "text": "Crie a árvore, salve mundo.tscn e extraia as imagens para arte no projeto. No Chao, crie um TileSet. Antes de adicionar a imagem, defina Tile Size `(32, 32)`, Tile Shape Square e mantenha o layout padrão. Abra o painel TileSet e arraste atlas.svg para criar um atlas com os três tiles.",
          "expect": "Há três peças de 32 × 32 em uma fonte de atlas. Confira Texture Region Size `(32, 32)`, sem margens ou separação. Tile Size define a grade; Region Size define o recorte da textura."
        },
        {
          "title": "Pinte um mapa pequeno",
          "text": "No painel TileMap, selecione a primeira peça, bronze, e pinte uma fileira de dez células. Pinte óleo e vapor em outras posições. Mova o nó Chao para `(64, 96)`, mantendo rotação 0 e escala `(1, 1)`. Não mova apenas as células para simular essa transformação.",
          "expect": "O mapa inteiro é deslocado no mundo. A célula `(0, 0)` continua com centro local `(16, 16)`; nesse arranjo seu centro global é `(80, 112)`."
        },
        {
          "title": "Configure os dados de cada tipo",
          "text": "No recurso TileSet, adicione Custom Data Layers: tipo_piso do tipo String e dano do tipo int. Na seleção das peças do atlas, atribua respectivamente bronze/0, oleo/0 e vapor/15. Os valores pertencem às peças do catálogo, não a cada posição pintada.",
          "expect": "Duas células pintadas com a mesma peça de vapor compartilham dano 15. Esse número ainda não diminui vida nem cria uma Area2D: precisa ser lido por uma regra de jogo."
        },
        {
          "title": "Consulte pelo clique",
          "text": "No Label Leitura, use um texto inicial como Clique no mapa e Mouse > Filter = Ignore. Anexe o exemplo 1 ao Chao e execute a cena com F6. Clique no centro dos três tipos e em uma região vazia.",
          "expect": "O Label mostra célula e dados do tile. No centro global `(80, 112)`, a célula é `(0, 0)`. Uma posição vazia mostra Sem tile. O código converte global para local antes de consultar a grade."
        },
        {
          "title": "Adicione colisão de forma explícita",
          "text": "No TileSet, crie Physics Layers, elemento 0, Collision Layer 1. Selecione a peça de bronze e desenhe nela um polígono quadrado que cubra a peça. Mantenha Collision Enabled no Chao. Para testar contato, instancie o Jogador físico das aulas anteriores, com máscara incluindo a camada 1, acima da fileira e use Debug > Visible Collision Shapes.",
          "expect": "A forma fica visível e o corpo pode pousar no bronze. Pintar uma imagem sozinha não cria colisão. Sem o Jogador, esta cena permite conferir a forma, mas não demonstra movimento físico."
        },
        {
          "title": "Experimente editar durante o jogo",
          "text": "Extensão: confira o ID da fonte atlas no painel TileSet. Substitua o script do Chao pelo exemplo 2 e configure fonte_id com esse ID no Inspector. Clique esquerdo pinta bronze, direito apaga. Pare e execute novamente para comparar.",
          "expect": "As alterações são da execução; não são salvas automaticamente na cena. O código identifica a fonte e o recorte `(0, 0)`. Alterações internas, inclusive físicas, são agrupadas pela Godot; apagar não garante que uma consulta física no mesmo instante já veja a remoção."
        },
        {
          "title": "Prepare terrenos com lados conectados",
          "text": "Extensão: crie outro TileMapLayer chamado Tubos e nele um TileSet separado, também de 32 × 32. Adicione tubos.svg como atlas de 16 peças. Crie Terrain Set 0 no modo Match Sides e um terreno Tubo de ID 0. Para cada peça, atribua Terrain Set 0 e terreno 0 ao centro; pinte os lados com tubo como terreno 0 e deixe os outros como vazio (-1). Use a tabela do ZIP, com índices de atlas começando em zero.",
          "expect": "As 16 peças cobrem as combinações dos quatro lados. O modo considera os lados, sem exigir cantos. Uma textura recortada não configura os peering bits por conta própria."
        },
        {
          "title": "Conecte um caminho de teste",
          "text": "No painel TileMap de Tubos, pinte com o modo de terrenos Connect, em vez de escolher uma peça isolada do atlas. Depois anexe o exemplo 3 ao Tubos e execute. Use um mapa de teste vazio; o código limpa a camada antes de desenhar seu caminho.",
          "expect": "Uma linha horizontal que vira para baixo escolhe retas, quina e pontas conforme os vizinhos. Se aparecerem conexões erradas, confira o terreno central, os quatro lados, o modo e a tabela. O algoritmo depende das combinações disponíveis."
        }
      ]
    },
    "pitfalls": [
      {
        "title": "“O clique seleciona a célula errada.”",
        "text": "local_to_map espera posição local do TileMapLayer. Converta com to_local quando partir do mundo. A origem do personagem não é necessariamente seu pé; uma consulta sob os pés precisa de um ponto de contato adequado."
      },
      {
        "title": "“O dado dano não causa dano.”",
        "text": "Custom Data é informação compartilhada pela peça. O controlador precisa decidir quando e como aplicá-la. Para durabilidade diferente em cada célula, use um estado próprio indexado por Vector2i, sem alterar o TileData compartilhado."
      },
      {
        "title": "“O terreno não faz a borda certa.”",
        "text": "Confira Terrain Set, ID do terreno, modo e peering bits, incluindo o vazio -1. set_cell escolhe uma peça específica; não pede ao sistema para resolver transições de terreno."
      }
    ],
    "checks": [
      {
        "question": "Com células de 32 × 32, qual é a célula da posição local (160, 96)?",
        "answer": "É (5, 3). Essa posição fica na borda superior esquerda da célula; seu centro é (176, 112). A regra usada nesta aula é a grade quadrada padrão."
      },
      {
        "question": "Qual é a célula da posição local (-1, -1)?",
        "answer": "É (-1, -1), usando piso matemático. Arredondar ou truncar em direção a zero daria um resultado errado neste modelo de grade."
      },
      {
        "question": "Por que um dano definido no TileSet não é exclusivo daquela célula?",
        "answer": "O dado pertence à peça do catálogo. Todas as posições que usam essa peça consultam os mesmos dados. Estado individual precisa de armazenamento separado."
      },
      {
        "question": "erase_cell apaga o arquivo da cena e atualiza a física imediatamente?",
        "answer": "Não. A edição em execução não é persistência em disco. A Godot agrupa atualizações internas no fim do quadro; não presuma sincronização física imediata."
      }
    ],
    "summary": "TileSet define as peças e suas propriedades; TileMapLayer define onde elas estão. Converta posições para o espaço local, trate células vazias e configure a colisão separadamente. Terrenos escolhem variantes preparadas, e dados customizados só têm efeito quando uma regra os usa.",
    "next": "Na aula 9, combine animações, Tweens e consultas com raios.",
    "sources": [
      {
        "label": "Godot: usando TileMaps",
        "url": "https://docs.godotengine.org/en/stable/tutorials/2d/using_tilemaps.html"
      },
      {
        "label": "Godot: criando TileSets",
        "url": "https://docs.godotengine.org/en/stable/tutorials/2d/using_tilesets.html"
      },
      {
        "label": "Godot: TileMapLayer",
        "url": "https://docs.godotengine.org/en/stable/classes/class_tilemaplayer.html"
      },
      {
        "label": "Godot: TileData e dados customizados",
        "url": "https://docs.godotengine.org/en/stable/classes/class_tiledata.html"
      }
    ]
  },
  "feynman": {
    "title": "O catálogo e o mapa",
    "explanation": "O **TileSet** é um catálogo de peças: cada uma pode ter textura, colisão e dados. O **TileMapLayer** registra qual peça ocupa cada célula de uma camada. Várias camadas podem representar chão, paredes e decoração.\n\nUma célula é um endereço inteiro, como `(5, 3)`. Uma posição local é um ponto contínuo dentro da camada. Para ligar as duas coisas, use **local_to_map** e **map_to_local**; se o ponto vier do mundo, converta-o antes.\n\nOs **terrenos** selecionam variantes de peças para combinar vizinhos. É preciso preparar as variantes e as regras de conexão. Um dado como dano = 15 é apenas informação até que o jogo a consulte.",
    "analogies": [
      {
        "term": "TileSet → catálogo",
        "analogy": "Define as peças reutilizáveis e as propriedades compartilhadas por elas."
      },
      {
        "term": "TileMapLayer → distribuição",
        "analogy": "Guarda as posições de uma camada. Sobrepor camadas exige outros nós TileMapLayer."
      },
      {
        "term": "Terrenos → escolha de variantes",
        "analogy": "Usam regras de vizinhança; não inventam desenhos ausentes no atlas."
      }
    ]
  },
  "howItWorks": {
    "overview": "A prática usa células quadradas de 32 × 32 com origem local em `(0, 0)`. Aqui a célula é obtida aplicando piso a cada coordenada dividida por 32. Outras formas de grade precisam das conversões próprias da Godot.\n\nsource_id identifica uma fonte do TileSet; atlas_coords identifica a peça dentro do atlas; alternative_tile identifica uma alternativa. Esses números não são a coluna e linha da célula no mundo.\n\nAs atualizações internas são agrupadas para eficiência. Não há garantia de um único corpo físico ou um número fixo de draw calls para qualquer mapa. Configuração, quadrantes e conteúdo influenciam o custo.",
    "anatomy": [
      {
        "prop": "local_to_map(to_local(ponto_global))",
        "desc": "Converte mundo → espaço da camada → endereço da célula."
      },
      {
        "prop": "map_to_local(celula)",
        "desc": "Devolve o centro local da célula. Use to_global para obter esse centro no mundo; a origem visual da textura pode diferir."
      },
      {
        "prop": "get_cell_tile_data(celula)",
        "desc": "Retorna TileData de uma peça de atlas, ou null quando não há dados desse tipo. Trate o caso vazio."
      },
      {
        "prop": "set_cell(celula, fonte_id, atlas_coords)",
        "desc": "Escolhe uma peça já existente na fonte. erase_cell remove a ocupação da célula."
      },
      {
        "prop": "set_cells_terrain_connect(celulas, 0, 0, false)",
        "desc": "Pede conexão de terreno, podendo mudar vizinhos. Neste teste, false faz o vazio participar da escolha das pontas."
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Prática principal: consultar o tile clicado",
      "whenToUse": "No Chao da cena Mundo, com os Custom Data Layers tipo_piso e dano configurados.",
      "description": "Este arquivo vai no TileMapLayer. O Label é seu irmão, por isso o caminho é ../Leitura. O código consulta o ponto do mouse; não afirma encontrar automaticamente o chão sob um personagem.",
      "code": "extends TileMapLayer\n\n@onready var leitura: Label = $\"../Leitura\"\n\nfunc _unhandled_input(event: InputEvent) -> void:\n    if event is InputEventMouseButton:\n        if event.pressed and event.button_index == MOUSE_BUTTON_LEFT:\n            var ponto_local := to_local(get_global_mouse_position())\n            var celula := local_to_map(ponto_local)\n            var dados := get_cell_tile_data(celula)\n            if dados == null:\n                leitura.text = \"Célula %s: Sem tile\" % str(celula)\n                return\n            var tipo: String = str(dados.get_custom_data(\"tipo_piso\"))\n            var dano: int = int(dados.get_custom_data(\"dano\"))\n            leitura.text = \"%s: %s, dano %d\" % [str(celula), tipo, dano]\n",
      "pros": "Conexão explícita entre posição, endereço e metadados, com resposta visível e tratamento de vazio.",
      "cons": "Não implementa atrito, dano contínuo ou detecção dos pés. Configurar os dois campos no TileSet faz parte da prática."
    },
    {
      "title": "2. Extensão: pintar e apagar em execução",
      "whenToUse": "No Chao, substituindo o primeiro script e informando o ID real da fonte atlas.",
      "description": "O atlas de apoio coloca bronze em (0, 0). O clique esquerdo usa essa peça; o direito remove uma célula. A edição afeta só a execução atual.",
      "code": "extends TileMapLayer\n\n@export var fonte_id: int = 0\n\nfunc _unhandled_input(event: InputEvent) -> void:\n    if event is not InputEventMouseButton:\n        return\n    if not event.pressed:\n        return\n    var celula := local_to_map(get_local_mouse_position())\n    if event.button_index == MOUSE_BUTTON_LEFT:\n        set_cell(celula, fonte_id, Vector2i(0, 0))\n    elif event.button_index == MOUSE_BUTTON_RIGHT:\n        erase_cell(celula)\n",
      "pros": "Há gatilhos de teste claros para inserir e remover células.",
      "cons": "Depende do ID e recorte configurados. Não salva a edição nem força consultas físicas a se sincronizarem no mesmo instante."
    },
    {
      "title": "3. Extensão: conectar um caminho de tubos",
      "whenToUse": "No Tubos, com todas as 16 combinações do atlas configuradas no terreno 0 do conjunto 0.",
      "description": "O script limpa apenas esta camada de teste e solicita as células em _ready. O último argumento false inclui as restrições do terreno vazio para escolher pontas compatíveis. Não anexe à camada de chão que deseja preservar.",
      "code": "extends TileMapLayer\n\nfunc _ready() -> void:\n    clear()\n    var caminho: Array[Vector2i] = [\n        Vector2i(0, 0), Vector2i(1, 0), Vector2i(2, 0),\n        Vector2i(2, 1), Vector2i(2, 2)\n    ]\n    set_cells_terrain_connect(caminho, 0, 0, false)\n",
      "pros": "Mostra um pedido de conexão real, com uma curva e duas pontas observáveis.",
      "cons": "O resultado depende dos terrenos e peering bits preparados. Não substitui a configuração do TileSet."
    }
  ],
  "simulator": {
    "type": "tilemap_grid",
    "title": "Laboratório: células, atlas e dados do tile",
    "description": "Grade quadrada de 32 × 32 unidades, desenhada em escala própria no navegador. Selecione ou pinte com mouse, toque ou teclado. As coordenadas começam em zero. Os metadados exibidos são exemplos compartilhados por tipo; dano não é aplicado e óleo não muda física. Não executa a Godot, colisões, terrenos ou gravação de arquivos.",
    "guide": [
      {
        "title": "Separe endereço e posição",
        "text": "Escolha a célula (5, 3): sua origem local é (160, 96) e seu centro é (176, 112). Mover a origem global da camada muda o centro no mundo, mantendo o endereço."
      },
      {
        "title": "Inspecione antes de pintar",
        "text": "No modo Inspecionar, o clique apenas seleciona. No modo Pintar, aplica o pincel. As setas selecionam; Enter ou Espaço aplica apenas no modo Pintar."
      },
      {
        "title": "Confira o vazio e os dados",
        "text": "Apague uma célula e confira source_id = -1 e ausência de TileData. Bronze, óleo e vapor usam a mesma fonte 0, mas recortes de atlas diferentes. Restaurar grade repõe as células iniciais, mantendo coordenadas, modo e pincel."
      }
    ]
  },
  "quiz": {
    "question": "Um mapa foi movido no mundo. Como obter corretamente a célula que contém um ponto global?",
    "options": [
      "local_to_map(ponto_global), sem considerar a transformação da camada.",
      "local_to_map(to_local(ponto_global)) no TileMapLayer correspondente.",
      "map_to_local(ponto_global), pois retorna um endereço inteiro.",
      "Usar sempre a posição do personagem como se fosse o ponto de contato do pé."
    ],
    "correctIndex": 1,
    "explanation": "to_local remove a transformação do TileMapLayer; local_to_map então encontra a célula nesse espaço. Endereço de grade, posição local e posição global são diferentes.",
    "feedback": [
      "A função espera posição local da camada.",
      "",
      "map_to_local recebe um endereço e retorna o centro local, não o contrário.",
      "A origem do personagem pode estar acima do chão e não coincide necessariamente com o ponto consultado."
    ]
  }
},
{
  "id": "2d-inter-tweens-raycasts",
  "area": "2d",
  "level": "intermediario",
  "levelLabel": "Intermediário",
  "title": "9. Animação, Tween e RayCast2D",
  "subtitle": "Compare uma animação preparada no editor com um efeito por código e consulte o primeiro obstáculo de um segmento.",
  "nodesUsed": [
    "AnimationPlayer",
    "Tween",
    "RayCast2D",
    "PhysicsRayQueryParameters2D"
  ],
  "teaching": {
    "codeRequired": true,
    "duration": "50–65 min com a extensão de raios (estimativa)",
    "prerequisite": "Aulas 1–8: nós, funções, sinais e camadas físicas. Use uma cena nova. A prática usa formas simples e não depende de imagens externas.",
    "objectives": [
      "Criar uma animação com chaves e dispará-la por um botão.",
      "Criar um Tween com duração, transição e easing, controlando chamadas repetidas.",
      "Configurar alcance e máscara de um RayCast2D e interpretar ponto e normal."
    ],
    "practice": {
      "title": "Prática guiada: peça animada e sonda",
      "intro": "Conclua a comparação visual primeiro. Acrescente a sonda física depois, para não confundir animação com detecção. Os exemplos 2 e 3 são duas alternativas para a consulta, em nós indicados.",
      "tree": "Bancada (Node2D) — exemplo 1\n├── Peca (ColorRect)\n├── AnimationPlayer\n├── Reproduzir (Button)\n├── Impulso (Button)\n├── Leitura (Label)\n├── Sonda (RayCast2D) — extensão, exemplo 2\n└── Parede (StaticBody2D)\n    └── CollisionShape2D",
      "steps": [
        {
          "title": "Monte a apresentação",
          "text": "Crie Bancada e os seis primeiros filhos da árvore. Defina Peca: Position `(80, 60)`, Size `(40, 40)`, cor bronze e Mouse > Filter = Ignore. Coloque Reproduzir em `(20, 130)`, Impulso em `(180, 130)` e Leitura em `(20, 180)`. Textos dos botões: Animação e Tween. Nos botões use Focus Mode = None; no Label, Mouse Filter = Ignore.",
          "expect": "A peça e os controles ficam separados na janela. Peca é um elemento visual, sem corpo físico. Alterar sua escala não é um teste de colisão."
        },
        {
          "title": "Crie ida_volta no AnimationPlayer",
          "text": "Selecione AnimationPlayer e crie a animação ida_volta, duração 1 segundo, sem Loop. Na linha do tempo, insira chaves da propriedade Position X de Peca: 80 em 0 s, 260 em 0.5 s e 80 em 1 s. Mantenha Y = 60. Use interpolação Linear e easing padrão na trilha; não grave outras propriedades.",
          "expect": "Na prévia do editor, a peça vai à direita e retorna ao ponto inicial. Se a trilha tiver Position inteira, use os vetores `(80, 60)`, `(260, 60)` e `(80, 60)` nessas chaves."
        },
        {
          "title": "Ligue os dois botões",
          "text": "Anexe o exemplo 1 à Bancada. Não conecte os botões também pelo editor. Execute com F6. Compare Animação e Tween; clique repetidamente e alterne os botões durante o movimento.",
          "expect": "Animação reproduz ida_volta. Tween vai de X = 80 a X = 260 em 0.6 s com TRANS_BACK e EASE_OUT, podendo ultrapassar o destino antes de terminar; a escala retorna ao normal em paralelo. Um novo disparo interrompe o anterior e reinicia a comparação."
        },
        {
          "title": "Prepare a parede e o segmento",
          "text": "Extensão: adicione Sonda à Bancada em `(80, 260)`, rotação 0, Target Position `(240, 0)`, Enabled ligado, Collide With Bodies ligado e Collision Mask apenas camada 1. Parede fica em `(300, 260)`, com Collision Layer apenas 1; use RectangleShape2D de tamanho `(24, 100)` no CollisionShape2D, posição local zero.",
          "expect": "O raio vai até o ponto global `(320, 260)`. A face esquerda da parede está em X = 288, a 208 unidades da origem. A parede pode ser vista ativando Debug > Visible Collision Shapes durante a execução."
        },
        {
          "title": "Consulte e gire a sonda",
          "text": "Anexe o exemplo 2 à Sonda, mantendo o exemplo 1 na Bancada. Execute e use as setas esquerda/direita para girar entre -45° e 15°. O Label recebe o resultado. Depois teste Target Position `(100, 0)` e desmarque a camada 1 da máscara, separadamente.",
          "expect": "Em 0°, a sonda informa impacto próximo de `(288, 260)`, normal `(-1, 0)`. Com alcance 100, não chega à parede. Com a máscara sem a camada da parede, não a detecta. O retorno também depende da direção; um raio não consulta infinitamente."
        },
        {
          "title": "Compare a consulta direta",
          "text": "Extensão alternativa: remova o script da Sonda e desligue Enabled. Adicione Consulta (Node2D) como filha da Bancada, posição `(80, 260)`, rotação 0, e anexe o exemplo 3. Deixe ignorar vazio, pois a origem desta cena não está dentro de um corpo próprio.",
          "expect": "A consulta usa os mesmos 240 de alcance e máscara 1, atualizando Leitura durante a física. Se reutilizar dentro de um corpo, atribua esse CollisionObject2D a ignorar; a lista de exclusões usa seu RID."
        }
      ]
    },
    "pitfalls": [
      {
        "title": "“A peça treme quando alterno efeitos.”",
        "text": "Não deixe AnimationPlayer e vários Tweens escreverem simultaneamente na mesma propriedade. O exemplo interrompe o outro animador e restaura uma base conhecida. kill() interrompe o Tween; não restaura sozinho os valores."
      },
      {
        "title": "“Meu raio não aparece.”",
        "text": "RayCast2D é uma consulta, não um laser visível do jogo. Use a depuração de colisões ou desenhe uma apresentação separada. Confira Enabled, alcance, máscara e os tipos de objeto aceitos."
      },
      {
        "title": "“O patrulheiro gira sem parar na borda.”",
        "text": "Uma patrulha precisa também de gravidade, chão, orientação dos sensores e atualização coerente após virar. Dois raios não garantem sozinhos que um inimigo nunca caia. Monte e teste essa lógica no contexto do controlador; aqui a sonda fica parada para isolar a detecção."
      }
    ],
    "checks": [
      {
        "question": "Qual a diferença entre transição e easing?",
        "answer": "A transição escolhe a família da curva, como SINE ou BACK. Easing define como a curva é aplicada ao início e ao fim, como EASE_IN ou EASE_OUT. Duração continua sendo outro parâmetro."
      },
      {
        "question": "O raio apontou para a parede, mas terminou antes dela. Deve haver impacto?",
        "answer": "Não. A consulta é um segmento finito da origem ao destino configurado. Direção sem alcance suficiente não produz esse impacto."
      },
      {
        "question": "get_collision_point retorna coordenadas locais?",
        "answer": "Não, retorna o ponto global. Para desenhar em um nó local, converta o ponto com to_local. A normal também é global e deve ser consultada quando há colisão."
      },
      {
        "question": "Criar um Tween exige chamar play depois?",
        "answer": "Node.create_tween cria um Tween que começa a ser processado automaticamente. Adicione os tweeners logo após criá-lo. Um Tween finalizado não deve ser reciclado como uma animação reutilizável; crie outro."
      }
    ],
    "summary": "AnimationPlayer organiza chaves no editor; Tween interpola propriedades por código. Coordene quem controla cada propriedade. RayCast2D consulta o primeiro objeto aceito em um segmento finito, usando filtros físicos; ponto e normal descrevem o impacto e não desenham um laser.",
    "next": "Na aula 10, organize iluminação 2D e a interface sobre o mundo.",
    "sources": [
      {
        "label": "Godot: introdução à animação",
        "url": "https://docs.godotengine.org/en/stable/tutorials/animation/introduction.html"
      },
      {
        "label": "Godot: Tween",
        "url": "https://docs.godotengine.org/en/stable/classes/class_tween.html"
      },
      {
        "label": "Godot: RayCast2D",
        "url": "https://docs.godotengine.org/en/stable/classes/class_raycast2d.html"
      },
      {
        "label": "Godot: ray-casting e exclusões",
        "url": "https://docs.godotengine.org/en/stable/tutorials/physics/ray-casting.html"
      },
      {
        "label": "Godot: equações de easing (4.3)",
        "url": "https://github.com/godotengine/godot/blob/4.3/scene/animation/easing_equations.h"
      }
    ]
  },
  "feynman": {
    "title": "Movimento visual e consulta física",
    "explanation": "O **AnimationPlayer** guarda uma sequência de chaves que você prepara no editor. Um **Tween** calcula mudanças de propriedades a partir de valores e durações definidos por código. Ambos podem animar uma posição; a escolha depende de como você quer criar e controlar a sequência.\n\nO **RayCast2D** faz outra tarefa: consulta um segmento para encontrar o primeiro objeto físico aceito pelos filtros. Ele não move o personagem nem desenha um feixe visível no jogo.\n\nA **normal** aponta para fora da superfície atingida. Na face esquerda de uma parede vertical, pode ser `(-1, 0)`. Sem impacto válido, não interprete ponto e normal como um resultado de colisão.",
    "analogies": [
      {
        "term": "AnimationPlayer → sequência preparada",
        "analogy": "As chaves ficam na linha do tempo e podem coordenar propriedades e chamadas de método."
      },
      {
        "term": "Tween → interpolação por código",
        "analogy": "Destino, duração, transição e easing descrevem o efeito. Não é necessário escrever cada quadro."
      },
      {
        "term": "RayCast2D → consulta de segmento",
        "analogy": "Tem origem, destino e filtros. Alcança apenas o que estiver dentro desse trajeto."
      }
    ]
  },
  "howItWorks": {
    "overview": "AnimatedSprite2D troca quadros; AnimationPlayer pode animar propriedades e ter trilhas de métodos. O momento de processamento e a modalidade das chamadas importam; não use uma trilha visual como promessa de precisão absoluta de física.\n\nOs tweeners são sequenciais por padrão; set_parallel(true) faz os deste exemplo ocorrerem em paralelo. Node.create_tween associa a vida do Tween ao nó que o cria. Evite animar diretamente a posição de um corpo que também é movimentado por move_and_slide.\n\nRayCast2D guarda o resultado entre passos de física. Se você alterar direção e precisar consultar de novo naquele passo, force_raycast_update atualiza a consulta. As máscaras e as opções de corpos/áreas continuam valendo. ShapeCast2D consulta uma forma em vez de uma linha e não é uma simulação de espessura visual de laser.",
    "anatomy": [
      {
        "prop": "AnimationPlayer.play(\"ida_volta\")",
        "desc": "Seleciona uma animação existente com suas trilhas e chaves. O nome precisa corresponder ao recurso preparado."
      },
      {
        "prop": "create_tween()",
        "desc": "Cria um Tween válido associado ao nó. Tween.new não serve para iniciar interpolação."
      },
      {
        "prop": "set_trans / set_ease",
        "desc": "Definem a família da curva e sua aplicação. BACK pode ultrapassar o destino sem ultrapassar a duração."
      },
      {
        "prop": "is_colliding()",
        "desc": "Confira antes de usar get_collider, get_collision_point e get_collision_normal."
      },
      {
        "prop": "target_position",
        "desc": "Destino relativo à origem do RayCast2D no seu espaço local; não é um ponto global."
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Prática principal: alternar animação e Tween",
      "whenToUse": "Na Bancada, com Peca, dois botões e ida_volta já configurados.",
      "description": "Os dois botões têm gatilhos explícitos. Cada disparo interrompe o efeito anterior e restaura a posição e a escala. A peça é apenas visual; este não é um controlador físico.",
      "code": "extends Node2D\n\n@onready var peca: ColorRect = $Peca\n@onready var anim: AnimationPlayer = $AnimationPlayer\nvar efeito: Tween\n\nfunc _ready() -> void:\n    $Reproduzir.pressed.connect(_animar)\n    $Impulso.pressed.connect(_impulso)\n    peca.pivot_offset = peca.size / 2.0\n\nfunc _preparar() -> void:\n    anim.stop()\n    if efeito != null and efeito.is_valid():\n        efeito.kill()\n    peca.position = Vector2(80, 60)\n    peca.scale = Vector2.ONE\n\nfunc _animar() -> void:\n    _preparar()\n    anim.play(\"ida_volta\")\n\nfunc _impulso() -> void:\n    _preparar()\n    peca.scale = Vector2(0.75, 1.35)\n    efeito = create_tween()\n    efeito.set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)\n    efeito.set_parallel(true)\n    efeito.tween_property(peca, \"position:x\", 260.0, 0.6)\n    efeito.tween_property(peca, \"scale\", Vector2.ONE, 0.35)\n",
      "pros": "Permite comparar, interromper e repetir os efeitos com resultado previsível.",
      "cons": "Reinicia a posição em cada clique de propósito. Um efeito que parte da posição atual precisa de outra regra de reinício."
    },
    {
      "title": "2. Extensão: sonda com RayCast2D",
      "whenToUse": "Na Sonda, mantendo o script principal na Bancada.",
      "description": "A direção usa as ações ui_left e ui_right, já existentes no projeto padrão. A atualização forçada garante uma consulta com a rotação recém-definida neste passo. O Label está fora da consulta física.",
      "code": "extends RayCast2D\n\n@onready var leitura: Label = $\"../Leitura\"\n\nfunc _physics_process(delta: float) -> void:\n    var eixo := Input.get_axis(\"ui_left\", \"ui_right\")\n    rotation_degrees = clampf(rotation_degrees + eixo * 60.0 * delta, -45.0, 15.0)\n    force_raycast_update()\n    if is_colliding():\n        leitura.text = \"Ponto %s | normal %s\" % [\n            str(get_collision_point()), str(get_collision_normal())]\n    else:\n        leitura.text = \"Sem impacto aceito no segmento\"\n",
      "pros": "Separa o visual animado da detecção e mostra ponto e normal reais da consulta na Godot.",
      "cons": "force_raycast_update consulta mesmo com Enabled desligado. Para interromper este exemplo, pare seu processamento ou remova o script. A sonda não aplica dano nem implementa patrulha."
    },
    {
      "title": "3. Alternativa: consulta direta no passo de física",
      "whenToUse": "No novo nó Consulta, com script removido da Sonda e Enabled desligado nela.",
      "description": "Usa origem e destino globais, máscara 1 e eventual exclusão por RID. O nó Consulta é Node2D, não um corpo físico; por isso não existe um RID de corpo próprio para excluir automaticamente.",
      "code": "extends Node2D\n\n@export var ignorar: CollisionObject2D\n@onready var leitura: Label = $\"../Leitura\"\n\nfunc _physics_process(_delta: float) -> void:\n    var origem := global_position\n    var destino := to_global(Vector2(240, 0))\n    var consulta := PhysicsRayQueryParameters2D.create(origem, destino, 1)\n    if ignorar != null:\n        consulta.exclude = [ignorar.get_rid()]\n    var resultado := get_world_2d().direct_space_state.intersect_ray(consulta)\n    if resultado.is_empty():\n        leitura.text = \"Consulta direta: sem impacto\"\n    else:\n        leitura.text = \"Ponto %s | normal %s\" % [\n            str(resultado[\"position\"]), str(resultado[\"normal\"])]\n",
      "pros": "Consulta explícita no passo físico, sem criar um RayCast2D para cada pergunta.",
      "cons": "Para ignorar um corpo, forneça seu RID pela referência exportada. Filtros, frequência e custo ainda precisam ser escolhidos para o jogo."
    }
  ],
  "simulator": {
    "type": "tween_raycast_2d",
    "title": "Laboratório: duração, curvas e alcance do raio",
    "description": "Modelo matemático no navegador, sem executar a Godot. Acima: posição de X = 70 a 350, com EASE_OUT fixo e famílias LINEAR, QUAD, SINE ou BACK. A duração representa tempo de simulação; pausas e suspensões da página não são tempo de execução. Abaixo: segmento finito contra uma parede na camada 1. O raio nasce em (70, 250); a face esquerda fica em X = 300, de Y = 190 a 320. Unidades do modelo, sem câmera ou transformação. Não simula AnimationPlayer, corpos em movimento, áreas, múltiplos obstáculos ou ShapeCast2D.",
    "guide": [
      {
        "title": "Dispare uma comparação",
        "text": "Escolha curva e duração e clique Iniciar Tween. A posição final é 350 em todas as curvas; BACK pode passar de 350 antes de voltar. Alterar controles durante a execução prepara o próximo disparo, sem mudar o atual."
      },
      {
        "title": "Meça o segmento",
        "text": "Em 0°, a parede está a 230 unidades da origem. Alcance 220 não toca; 230 alcança a face em (300, 250), com normal (-1, 0). Desligar a camada 1 na máscara elimina o impacto aceito."
      },
      {
        "title": "Separe pausa e consulta",
        "text": "Pausar congela o Tween, mas ângulo, alcance e máscara ainda podem ser consultados. Voltar ao início interrompe o Tween e recoloca a peça em 70, mantendo as escolhas dos controles."
      }
    ]
  },
  "quiz": {
    "question": "O raio aponta para uma parede na camada 1, mas seu segmento termina antes dela. O que deve acontecer?",
    "options": [
      "is_colliding deve retornar true porque a direção está correta.",
      "Não há impacto com essa parede; o alcance precisa chegar até ela e a máscara também precisa aceitá-la.",
      "A normal deve sempre ser (0, 1).",
      "O Tween aumenta automaticamente o alcance do RayCast2D."
    ],
    "correctIndex": 1,
    "explanation": "A consulta considera o segmento finito e seus filtros. Direção, alcance e máscara são condições diferentes; animar um visual não configura a consulta física.",
    "feedback": [
      "Uma direção correta não transforma o segmento em uma linha infinita.",
      "",
      "A normal depende da superfície e só deve ser interpretada quando há impacto.",
      "As duas ferramentas são independentes; é preciso programar qualquer relação entre elas."
    ]
  }
},
{
  "id": "2d-inter-lights-ui",
  "area": "2d",
  "level": "intermediario",
  "levelLabel": "Intermediário",
  "title": "10. Iluminação 2D, HUD e pausa",
  "subtitle": "Prepare uma luz com oclusão, mantenha a interface em seu próprio canvas e controle o que continua funcionando durante a pausa.",
  "nodesUsed": [
    "PointLight2D",
    "CanvasModulate",
    "LightOccluder2D",
    "CanvasLayer",
    "Control",
    "MarginContainer"
  ],
  "teaching": {
    "codeRequired": true,
    "duration": "60–80 min com as extensões (estimativa)",
    "prerequisite": "Aulas 1–9, incluindo câmera, sinais, camadas e Tween. Use uma cena de teste nova. Esta prática considera uma janela de referência de 640 × 360; redimensionar a janela faz parte da conferência.",
    "objectives": [
      "Configurar textura de luz, ambiente e oclusor com máscaras compatíveis.",
      "Organizar um HUD com CanvasLayer e Containers e comparar seu movimento ao do mundo.",
      "Abrir e fechar um menu que recebe comandos durante a pausa."
    ],
    "practice": {
      "title": "Prática guiada: oficina iluminada com HUD",
      "intro": "Primeiro monte a cena e compare luz e ambiente. Depois acrescente o HUD. Oscilação da luz e menu de pausa são extensões independentes, sem substituir o script principal.",
      "tree": "OficinaLuz (Node2D) — exemplo 1\n├── Mundo (Node2D)\n│   ├── Fundo (Sprite2D)\n│   ├── Pilar (Sprite2D)\n│   │   └── LightOccluder2D\n│   ├── CanvasModulate\n│   └── Lamparina (PointLight2D) — exemplo 2 opcional\n├── Camera2D\n└── HUD (CanvasLayer, layer 1)\n    └── Margem (MarginContainer)\n        └── Coluna (VBoxContainer)\n            ├── Rotulo (Label)\n            ├── Pressao (ProgressBar)\n            ├── Gastar (Button)\n            └── Noite (Button)",
      "download": {
        "url": "assets/aula-10-luz.zip",
        "label": "Baixar fundo e pilar de apoio"
      },
      "downloadNote": "O ZIP contém fundo.svg (640 × 360), pilar.svg (40 × 80) e instruções. A textura radial da luz é criada como recurso na Godot; não há projeto pronto.",
      "steps": [
        {
          "title": "Prepare um fundo que receba luz",
          "text": "Crie a árvore, salve oficina_luz.tscn e extraia os SVGs para arte. Em Project Settings > Display > Window > Size, use Viewport Width 640 e Height 360. Neste teste, Stretch Mode Disabled permite observar as âncoras sem uma escala adicional. No Fundo, use fundo.svg, Centered desligado, posição `(0, 0)`. No Pilar, use pilar.svg, Centered ligado, posição `(320, 180)`. Mantenha escala unitária. Configure a câmera em `(320, 180)`, Enabled ligado e Zoom `(1, 1)`.",
          "expect": "Há um fundo desenhado e um pilar no centro. A cor de limpeza do viewport não é uma superfície que recebe luz; o Sprite2D de fundo cumpre esse papel."
        },
        {
          "title": "Crie a textura radial da lamparina",
          "text": "Posicione Lamparina em `(180, 120)`. Em Texture, crie GradientTexture2D com Width/Height = 256, Fill = Radial, Fill From `(0.5, 0.5)`, Fill To `(1, 0.5)`. No Gradient, deixe branco no início e preto no fim. Use Blend Mode Add, Texture Scale 1.5 e Energy 1.0. Mantenha a cor clara e os materiais dos sprites no modo padrão.",
          "expect": "A luz tem uma textura e uma região de influência. Energy aumenta a contribuição da luz; Texture Scale altera a cobertura. Trocar só a energia não redimensiona a textura."
        },
        {
          "title": "Compare o ambiente",
          "text": "Em CanvasModulate, defina Color `(0.2, 0.2, 0.25, 1)`. Desative e ative Lamparina para comparar o que vem do ambiente e da luz. Não adicione um segundo CanvasModulate no mesmo canvas.",
          "expect": "Sem a luz, o mundo continua visível com a modulação ambiente. Com a luz, parte dele clareia. Escurecer o ambiente ajuda a perceber o efeito, mas não é uma exigência para a luz existir."
        },
        {
          "title": "Configure a sombra do pilar",
          "text": "No LightOccluder2D, crie um OccluderPolygon2D fechado e desenhe o retângulo local com cantos `(-20, -40)`, `(20, -40)`, `(20, 40)` e `(-20, 40)`. Mantenha Cull Mode Disabled. Ligue Shadow > Enabled na Lamparina; confira Item Cull Mask e Shadow Item Cull Mask incluindo 1 e os Light Masks compatíveis dos sprites/oclusor.",
          "expect": "A sombra fica atrás do pilar em relação à luz, dentro da cobertura da luz. O Sprite2D visível e o polígono oclusor são coisas diferentes. Esse oclusor não cria uma colisão física para o jogador."
        },
        {
          "title": "Monte um HUD que caiba na janela",
          "text": "No HUD, deixe layer 1, Follow Viewport desligado e Transform padrão. No Margem, use âncoras Bottom Wide: left 0, right 1, top/bottom 1; offsets left 16, right -16, top -132, bottom -16. Defina as quatro margens internas do MarginContainer como 0. Coluna organiza os quatro controles. Textos: Pressão, Gastar 15 e Alternar ambiente. Na ProgressBar use Min 0, Max 100 e Custom Minimum Size Y = 20. Nos botões, Focus Mode None. Evite mínimos de largura maiores que a área disponível.",
          "expect": "O HUD ocupa uma faixa inferior. Âncoras acompanham a área disponível; o VBoxContainer organiza os filhos. CanvasLayer, sozinho, não faz um layout responsivo."
        },
        {
          "title": "Conecte os controles e mova a câmera",
          "text": "Anexe o exemplo 1 à OficinaLuz. Execute com F6, clique em Gastar e Alternar ambiente e mova a câmera com as setas esquerda/direita. Redimensione a janela e compare também um formato estreito. Use textos curtos ou Autowrap no Label se precisar.",
          "expect": "O mundo se desloca com a câmera e muda de luminosidade; o HUD permanece na faixa da tela neste arranjo. A barra interpola até o valor real da pressão. Cliques repetidos interrompem a interpolação anterior."
        },
        {
          "title": "Acrescente a oscilação opcional",
          "text": "Anexe o exemplo 2 à Lamparina. Comece com variar desligado e compare com ligado. Não altere Texture Scale pelo script para confundir variação de energia com tamanho. Prefira variação pequena e ofereça opção de desativar o efeito.",
          "expect": "A energia varia suavemente e permanece não negativa. Esta extensão usa uma senoide de teste, não tenta reproduzir uma chama real nem garante um ganho de desempenho."
        },
        {
          "title": "Crie o menu de pausa opcional",
          "text": "Adicione MenuPausa (CanvasLayer, layer 10) como filho da OficinaLuz, com FundoPausa (ColorRect Full Rect, cor preta com alpha 0.65, Mouse Filter Stop). Nele adicione Centro (CenterContainer Full Rect) e dentro Retomar (Button, texto Retomar). Anexe o exemplo 3 ao MenuPausa. Execute e pressione Esc, use Retomar e teste Esc novamente.",
          "expect": "O script recebe Esc durante a pausa e o botão Retomar funciona. Câmera, oscilação e Tween do mundo param conforme seus modos de processamento. Ao trocar de cena por um menu real, desfaça a pausa antes da transição. Este exemplo tem um único dono da pausa."
        }
      ]
    },
    "pitfalls": [
      {
        "title": "“Há luz, mas não vejo sombra.”",
        "text": "Confira a textura, Shadow Enabled, polígono fechado, masks e a região alcançada pela luz. O desenho do pilar não é automaticamente um oclusor. Máscara de luz/sombra não é Collision Layer de física."
      },
      {
        "title": "“O HUD escurece ou se move.”",
        "text": "Confira em qual canvas seus elementos estão, a presença de CanvasModulate ou luzes no próprio HUD, seus materiais, Follow Viewport e Transform do CanvasLayer. A separação usada nesta prática evita o ambiente do mundo; não é uma imunidade universal."
      },
      {
        "title": "“Pausou e não consigo voltar.”",
        "text": "O dono do comando de retorno precisa continuar recebendo entrada. O exemplo usa Always no MenuPausa e Inherit nos filhos. Quando se herda When Paused, não se recebe o comando inicial enquanto o jogo roda; é preciso outro nó para abrir esse menu."
      }
    ],
    "checks": [
      {
        "question": "Energy maior significa textura maior?",
        "answer": "Não. Energia controla a contribuição; Texture Scale controla o tamanho da textura de luz. O aspecto percebido pode variar, mas são parâmetros diferentes."
      },
      {
        "question": "LightOccluder2D bloqueia movimento físico?",
        "answer": "Não. Ele participa da oclusão da luz. Para bloquear um corpo, configure colisão física separadamente."
      },
      {
        "question": "CanvasLayer resolve qualquer tamanho de tela?",
        "answer": "Não. Ele separa o canvas e sua transformação. Âncoras, Containers, mínimos, textos e configuração de escala da janela também precisam ser conferidos."
      },
      {
        "question": "SceneTree.paused impede qualquer função de ser chamada?",
        "answer": "Não. Modos de processamento definem callbacks ativos; sinais ainda podem chamar funções conectadas. A pausa não é um bloqueio universal de toda lógica."
      }
    ],
    "summary": "Textura, energia, ambiente e oclusão têm papéis distintos. Um HUD em canvas próprio pode acompanhar a tela, mas exige layout e configuração coerentes. O menu de pausa precisa continuar recebendo entrada e ter uma política clara de retorno.",
    "next": "Na aula 11, organize comportamento com estados e componentes.",
    "sources": [
      {
        "label": "Godot: luzes e sombras 2D",
        "url": "https://docs.godotengine.org/en/stable/tutorials/2d/2d_lights_and_shadows.html"
      },
      {
        "label": "Godot: CanvasLayer",
        "url": "https://docs.godotengine.org/en/stable/classes/class_canvaslayer.html"
      },
      {
        "label": "Godot: tamanho e âncoras",
        "url": "https://docs.godotengine.org/en/stable/tutorials/ui/size_and_anchors.html"
      },
      {
        "label": "Godot: pausa e modos de processamento",
        "url": "https://docs.godotengine.org/en/stable/tutorials/scripting/pausing_games.html"
      },
      {
        "label": "Godot: GradientTexture2D",
        "url": "https://docs.godotengine.org/en/stable/classes/class_gradienttexture2d.html"
      }
    ]
  },
  "feynman": {
    "title": "A luz, o mundo e a interface",
    "explanation": "Uma **PointLight2D** usa uma textura para acrescentar iluminação. O **CanvasModulate** define a modulação ambiente do seu canvas. Um **LightOccluder2D** descreve a forma que pode bloquear a contribuição da luz e produzir uma sombra; ele não substitui a colisão física.\n\nO **CanvasLayer** coloca elementos em um canvas separado. Com acompanhamento do viewport desligado e transformação padrão, o HUD desta prática permanece na tela enquanto a câmera move o mundo. O layout ainda precisa de âncoras e Containers.\n\nAo **pausar**, escolha quais nós continuam processando. O menu que permite retornar deve receber comandos mesmo quando o mundo estiver parado.",
    "analogies": [
      {
        "term": "Ambiente e luz → contribuições distintas",
        "analogy": "Uma sombra pode bloquear a luz direta sem apagar o ambiente que ainda torna o piso visível."
      },
      {
        "term": "CanvasLayer → canvas separado",
        "analogy": "Separa a apresentação do HUD, mas não escolhe tamanhos, margens ou comportamento de entrada sozinho."
      },
      {
        "term": "Process Mode → política de execução",
        "analogy": "Define quando callbacks processam. Always e When Paused atendem situações diferentes."
      }
    ]
  },
  "howItWorks": {
    "overview": "A prática usa iluminação 2D padrão com uma textura radial e materiais que recebem luz. DirectionalLight2D é outra opção para iluminação direcional, sem uma textura radial de alcance equivalente.\n\nUm oclusor participa da luz conforme configuração e máscaras. A área escura depende da contribuição bloqueada, do ambiente e de outras luzes; não é uma camada preta universal sobre tudo.\n\nLayer do CanvasLayer define a ordem entre canvases; z_index ordena dentro do contexto de desenho. Por padrão, Follow Viewport está desligado. O HUD usa seu próprio canvas, sem repetir nele o CanvasModulate do mundo. A configuração de janela e conteúdo ainda determina como a interface escala.",
    "anatomy": [
      {
        "prop": "PointLight2D.texture / energy",
        "desc": "A textura distribui a contribuição; energy a intensifica. texture_scale altera a cobertura."
      },
      {
        "prop": "shadow_enabled / máscaras",
        "desc": "Permitem calcular sombra com oclusores compatíveis. Não são os filtros de colisão física."
      },
      {
        "prop": "CanvasLayer.follow_viewport_enabled",
        "desc": "Nesta prática fica false. Ligar o acompanhamento muda a relação da camada com a vista."
      },
      {
        "prop": "Âncoras e Containers",
        "desc": "Âncoras usam o retângulo de referência; Containers distribuem os filhos e devem controlar seu layout."
      },
      {
        "prop": "Node.PROCESS_MODE_ALWAYS",
        "desc": "Permite ao dono do menu processar com e sem pausa; seus filhos Inherit acompanham essa política."
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Prática principal: ambiente, câmera e pressão",
      "whenToUse": "Na OficinaLuz, com árvore e nomes exatos da prática.",
      "description": "O mundo é Pausable. Os botões do HUD acionam funções por sinal; a barra usa um único Tween por vez. As setas movem a câmera, não o HUD. As verificações de pausa também protegem chamadas explícitas às ações.",
      "code": "extends Node2D\n\n@onready var ambiente: CanvasModulate = $Mundo/CanvasModulate\n@onready var camera: Camera2D = $Camera2D\n@onready var barra: ProgressBar = $HUD/Margem/Coluna/Pressao\n@onready var rotulo: Label = $HUD/Margem/Coluna/Rotulo\nvar pressao: int = 100\nvar noite: bool = true\nvar efeito_barra: Tween\n\nfunc _ready() -> void:\n    process_mode = Node.PROCESS_MODE_PAUSABLE\n    $HUD/Margem/Coluna/Gastar.pressed.connect(_gastar)\n    $HUD/Margem/Coluna/Noite.pressed.connect(_alternar_ambiente)\n    barra.value = pressao\n    rotulo.text = \"Pressão: %d\" % pressao\n    _aplicar_ambiente()\n\nfunc _process(delta: float) -> void:\n    camera.position.x += Input.get_axis(\"ui_left\", \"ui_right\") * 100.0 * delta\n\nfunc _gastar() -> void:\n    if get_tree().paused:\n        return\n    pressao = maxi(0, pressao - 15)\n    rotulo.text = \"Pressão: %d\" % pressao\n    if efeito_barra != null and efeito_barra.is_valid():\n        efeito_barra.kill()\n    efeito_barra = create_tween()\n    efeito_barra.tween_property(barra, \"value\", float(pressao), 0.25)\n\nfunc _alternar_ambiente() -> void:\n    if get_tree().paused:\n        return\n    noite = not noite\n    _aplicar_ambiente()\n\nfunc _aplicar_ambiente() -> void:\n    ambiente.color = Color(0.2, 0.2, 0.25) if noite else Color.WHITE\n",
      "pros": "Há gatilhos, valores iniciais e comparação de câmera e ambiente. A pressão real é separada da interpolação visual.",
      "cons": "A câmera pode sair dos limites da arte de teste. O script não implementa limites de mapa ou configurações completas de escala da janela."
    },
    {
      "title": "2. Extensão: variação opcional de energia",
      "whenToUse": "Na Lamparina, preservando o script principal na raiz.",
      "description": "A energia oscila de forma determinística com o tempo; Texture Scale permanece constante. Desative variar para uma comparação estável. Os intervalos no Inspector ajudam a manter os valores de demonstração controlados.",
      "code": "extends PointLight2D\n\n@export var variar: bool = false\n@export_range(0.0, 2.0) var energia_base: float = 1.0\n@export_range(0.0, 0.25) var amplitude: float = 0.1\nvar tempo: float = 0.0\n\nfunc _process(delta: float) -> void:\n    tempo += delta\n    var fator := 1.0 + amplitude * sin(TAU * 1.5 * tempo) if variar else 1.0\n    energy = maxf(0.0, energia_base * fator)\n",
      "pros": "Permite comparar energia constante e variável sem alterar o alcance da textura.",
      "cons": "É uma senoide de teste. O efeito pode ser indesejado para algumas pessoas; mantenha a possibilidade de desligá-lo."
    },
    {
      "title": "3. Extensão: menu que retoma a execução",
      "whenToUse": "No MenuPausa, com FundoPausa/Centro/Retomar configurado conforme a prática.",
      "description": "O nó fica Always e não depende de o menu estar visível para ouvir Esc. A entrada é marcada como tratada; o botão recebe foco ao abrir. Este exemplo é o único dono da pausa na cena.",
      "code": "extends CanvasLayer\n\n@onready var retomar: Button = $FundoPausa/Centro/Retomar\n\nfunc _ready() -> void:\n    process_mode = Node.PROCESS_MODE_ALWAYS\n    visible = false\n    retomar.pressed.connect(_retomar)\n\nfunc _input(event: InputEvent) -> void:\n    if event.is_action_pressed(\"ui_cancel\") and not event.is_echo():\n        _definir_pausa(not get_tree().paused)\n        get_viewport().set_input_as_handled()\n\nfunc _definir_pausa(ativar: bool) -> void:\n    get_tree().paused = ativar\n    visible = ativar\n    if ativar:\n        retomar.grab_focus()\n\nfunc _retomar() -> void:\n    _definir_pausa(false)\n",
      "pros": "A abertura e o retorno funcionam no mesmo dono, inclusive durante a pausa.",
      "cons": "Não coordena vários menus ou outros donos da pausa. Antes de trocar a cena por um menu principal, defina paused = false explicitamente."
    }
  ],
  "simulator": {
    "type": "lighting_2d",
    "title": "Laboratório: ambiente, luz direta, sombra e HUD",
    "description": "Modelo didático de uma luz pontual sobre um plano, com dois obstáculos circulares opacos. Não executa PointLight2D, texturas ou shaders da Godot. A luz direta usa queda quadrática dentro de um raio fixo e é bloqueada por interseção de segmento com os círculos; o ambiente permanece. Os obstáculos são representações de oclusão, não corpos físicos. Um HUD é desenhado por cima para comparar sua posição com a câmera. Não simula layout de Control, menu ou SceneTree.paused.",
    "guide": [
      {
        "title": "Separe energia e alcance",
        "text": "Mantenha o raio e varie energia: o limite geométrico não muda. O ambiente controla o piso sem luz direta. Saturação de cor limita o brilho mostrado."
      },
      {
        "title": "Confira a sonda",
        "text": "A sonda fica no mundo em (280, 170). Ponha a luz em (80, 170): o obstáculo em (180, 170) bloqueia o caminho. Desligue as sombras e compare a contribuição direta. Se a luz entrar em um obstáculo, este modelo bloqueia a luz para fora dele."
      },
      {
        "title": "Compare mundo e HUD",
        "text": "Mova Câmera X: o mundo e a sonda se deslocam juntos; o HUD fica no mesmo lugar. Pausar congela apenas a oscilação opcional, permitindo ajustar os controles. Não é uma implementação do sistema de pausa da Godot."
      }
    ]
  },
  "quiz": {
    "question": "O mundo escurece com CanvasModulate e se desloca com a câmera. O que mantém o HUD desta prática legível e posicionado na tela?",
    "options": [
      "Apenas aumentar z_index, sem mudar o canvas ou o layout.",
      "Usar um CanvasLayer separado, Follow Viewport desligado e transformação padrão, sem repetir o ambiente nele, além de configurar âncoras e Containers.",
      "Ativar Collision Layer 1 nos Labels.",
      "Definir todos os nós como When Paused."
    ],
    "correctIndex": 1,
    "explanation": "A separação do canvas e suas condições explicam o comportamento visual. O layout é outra responsabilidade; CanvasLayer não torna qualquer interface responsiva ou imune a toda iluminação.",
    "feedback": [
      "z_index não substitui a separação e a transformação do canvas.",
      "",
      "Labels não precisam de camada física para compor o HUD.",
      "When Paused define processamento durante a pausa, não o layout ou a iluminação."
    ]
  }
},

  // ==========================================================================
  // NÍVEL IV — AVANÇADO (Mestre Relojoeiro)
  // ==========================================================================
{
  "id": "2d-adv-fsm-components",
  "area": "2d",
  "level": "avancado",
  "levelLabel": "Avançado",
  "title": "11. Estados e componentes: FSM, Hitbox e Hurtbox",
  "subtitle": "Organize repouso, movimento e ataque; separe detecção de contato, regras de dano e pontos de vida.",
  "nodesUsed": [
    "CharacterBody2D",
    "Area2D",
    "CollisionShape2D",
    "Node",
    "Label"
  ],
  "teaching": {
    "codeRequired": true,
    "codeIntro": "Os exemplos 1 e 2 trabalham juntos na prática principal. O exemplo 3 é uma extensão independente e opcional.",
    "duration": "70–100 min com a extensão (estimativa)",
    "prerequisite": "Aulas 3–5 e 7: funções, delta, CharacterBody2D, Area2D, máscaras e sinais. Referência desta prática: Godot 4.5, GDScript. enum e match são explicados abaixo; não são pré-requisitos ocultos.",
    "objectives": [
      "Implementar três estados com uma transição central, janela de ataque e saída que desativa o golpe.",
      "Configurar a Hurtbox para detectar a Hitbox e distinguir número de camada de valor de bitmask.",
      "Aplicar 25 pontos uma vez por alvo em cada golpe, rejeitando o autor, aliados e dano após a vida chegar a zero."
    ],
    "practice": {
      "title": "Prática guiada: uma faixa de treino com alvo",
      "intro": "Primeiro execute os três estados em uma faixa horizontal, sem gravidade. Depois instale os componentes de combate. A separação em vários nós de estado é uma extensão independente, não um requisito para este personagem.",
      "tree": "Arena (Node2D) — arena.gd\n├── Automato (CharacterBody2D) — automato.gd; posição (120,200)\n│   ├── Sprite2D — automato.svg, escala (0.5,0.5)\n│   ├── CollisionShape2D — CircleShape2D, raio 14\n│   └── Hitbox (Area2D) — hitbox.gd; posição local (48,0)\n│       └── CollisionShape2D — RectangleShape2D (48,36), Disabled ligado\n├── Alvo (Node2D) — posição (360,200)\n│   ├── Sprite2D — alvo.svg, escala (0.75,0.75)\n│   ├── Health (Node) — health.gd\n│   └── Hurtbox (Area2D) — hurtbox.gd\n│       └── CollisionShape2D — CircleShape2D, raio 24\n└── Leitura (Label) — posição (16,16)",
      "download": {
        "url": "assets/aula-11-fsm.zip",
        "label": "Baixar arte, scripts de referência e roteiro"
      },
      "downloadNote": "O ZIP contém dois SVGs, cinco scripts da prática, dois scripts da extensão e instruções. Não é um projeto pronto nem foi executado no motor neste ambiente. Os códigos abaixo são a referência de instalação.",
      "steps": [
        {
          "title": "Prepare uma cena sem gravidade",
          "text": "Crie Arena, salve arena.tscn e monte a árvore. Em Display > Window > Size, use Viewport Width 640 e Height 360. Extraia a arte para res://arte e os scripts para res://scripts. No Automato, deixe Layer somente 2 e Mask somente 1; o modo Floating é definido pelo script. O Alvo é Node2D, sem corpo sólido. Não há piso ou gravidade nesta prática.",
          "expect": "Os dois desenhos aparecem lado a lado. A área do alvo permite atravessamento: detecção de dano não exige um obstáculo sólido."
        },
        {
          "title": "Defina a entrada e leia o contrato dos estados",
          "text": "Em Input Map crie atacar e associe Espaço. ui_left/ui_right usam as setas e ui_cancel usa Esc nas ações padrão do projeto. Confira essas associações. O enum Estado dá nomes a três valores; if decide a transição atual. match, usado como alternativa, seleciona um bloco pelo valor do enum. A FSM é código do projeto, não uma classe StateMachine nativa da Godot.",
          "expect": "Há um comando de ataque identificável. Você consegue descrever PARADO → ANDANDO por direção e PARADO/ANDANDO → ATACANDO por Espaço."
        },
        {
          "title": "Instale primeiro os componentes",
          "text": "Crie os arquivos separados do exemplo 2. Anexe health.gd ao Health, hitbox.gd à Hitbox e hurtbox.gd à Hurtbox. No Inspector da Hurtbox, arraste Alvo/Health para Health e Alvo para Receiver; Team = 2. Na Hitbox use Damage = 25 e Team = 1. O autor será atribuído pelo controlador.",
          "expect": "As classes personalizadas são reconhecidas. O Health controla a vida; a Hurtbox encaminha contatos; a Hitbox valida equipe, autor e repetição."
        },
        {
          "title": "Configure a detecção dirigida",
          "text": "Na Hitbox marque somente a caixa 3 de Collision Layer e deixe a Mask vazia; Monitoring desligado e Monitorable ligado. Na Hurtbox deixe a Layer vazia, marque somente a caixa 3 da Mask, mantenha Monitoring ligado e Monitorable desligado. As formas são as da árvore; deixe a forma da Hitbox inicialmente Disabled. A caixa 3 corresponde ao bitmask 4, não ao inteiro 3. Não use collision_layer = 3 para selecionar apenas a terceira camada.",
          "expect": "É a Hurtbox que busca a camada da Hitbox. O zero na Layer da Hurtbox não impede que ela monitore. Monitoring e Monitorable têm responsabilidades diferentes."
        },
        {
          "title": "Execute o controlador e a leitura",
          "text": "Anexe o exemplo 1 ao Automato e arena.gd do exemplo 2 à Arena. Execute a cena atual com F6. Use setas para andar. Pressione Espaço: o movimento para por 0.60 s; a forma só fica ativa entre 0.15 s inclusive e 0.40 s exclusive. Em Debug > Visible Collision Shapes, compare com a fase do golpe. Esc interrompe e limpa o ataque. A janela é amostrada pelos passos físicos; set_deferred não promete aplicação instantânea da forma.",
          "expect": "Apertar Espaço repetidamente durante o ataque não reinicia seu tempo. Ao sair, active torna-se falso e a desativação física é solicitada. Segurar uma seta volta a andar no passo seguinte ao término."
        },
        {
          "title": "Compare ar, acerto e repetição",
          "text": "Ataque em x=120: não deve haver dano. Aproxime o Automato de x=280 mantendo y=200 e ataque para a direita. A Hitbox vai de x=304 a 352 e o alvo tem centro x=360, raio 24. Semelhante geometria existe no laboratório, mas a física da Godot tem discretização própria. Execute quatro golpes separados e depois um quinto. Reinicie a cena para restaurar 100 pontos.",
          "expect": "Cada golpe válido retira 25: 100 → 75 → 50 → 25 → 0. Contato persistente não desconta a cada quadro. died é emitido uma vez; o quinto golpe não desconta mais vida."
        },
        {
          "title": "Faça uma variação e explique o resultado",
          "text": "Pare a execução. Troque Team da Hurtbox para 1: contato com o aliado deve ser rejeitado. Depois restaure Team = 2 e retire a caixa 3 da Mask: a área deixa de detectar a Hitbox. Compare esses dois motivos de rejeição. Para um teste de autor em uma cópia da cena, Receiver deve apontar para o próprio Automato; o filtro de autor precisa rejeitá-lo mesmo com Team diferente.",
          "expect": "Máscara decide quais áreas podem ser detectadas; equipe e autor são regras adicionais do jogo. Separar Layer e Mask não resolve fogo amigo sozinho."
        },
        {
          "title": "Experimente estados como nós, opcionalmente",
          "text": "Em outra cena, crie Experimento (Node) com filhos Parado e Trabalho (Node). Salve cada parte do exemplo 3 em seu arquivo. Anexe passo.gd aos dois filhos, maquina.gd à raiz e arraste Parado ao export Initial. Enter (ui_accept) começa Trabalho, que solicita voltar após 0.60 s. Observe exit anterior antes de enter seguinte. Este exemplo é uma demonstração de delegação, não um controlador de combate para instalar por cima do principal.",
          "expect": "Somente current recebe tick. Os filhos usam métodos comuns, não _physics_process próprios. Uma requisição de estado inativo é rejeitada; enter/exit não devem fazer transições recursivas nesta implementação."
        }
      ]
    },
    "pitfalls": [
      {
        "title": "Dano repetido ou golpe sem reentrada na área",
        "text": "A detecção é lida por passo físico; victims usa a identidade do Health e é limpa em begin_attack. Isso cobre contato persistente e múltiplas Hurtboxes ligadas ao mesmo Health. Apenas area_entered, sem cuidar da janela do golpe e do histórico, pode não atender ao contrato desejado."
      },
      {
        "title": "Camada 3 confundida com valor 3",
        "text": "A terceira caixa é bit 4. Um valor inteiro 3 ativa as caixas 1 e 2. Nesta configuração, Layer Hitbox = 4 e Mask Hurtbox = 4; a Mask da Hitbox é zero porque a detecção está no receptor."
      },
      {
        "title": "A FSM não limpa efeitos automaticamente",
        "text": "mudar_estado precisa executar a limpeza explicitamente. Uma variável booleana como active continua útil e não é proibida por uma FSM. Se quiser ataque durante corrida, projete outra regra ou máquinas ortogonais; exclusividade aqui é uma escolha desta prática."
      },
      {
        "title": "Formas e referências não prontas",
        "text": "Os filhos recebem _ready antes dos pais. A Hurtbox só usa Health no passo físico, depois da preparação da árvore. Confira os exports e os caminhos. A mudança de disabled usa set_deferred; active bloqueia dano imediatamente mesmo antes da atualização física."
      }
    ],
    "checks": [
      {
        "question": "O que o enum garante e o que ele não garante?",
        "answer": "Fornece nomes para valores de estado. As transições válidas e a limpeza dependem do controlador. Ele não impede automaticamente duas funções de mexerem na velocidade ou um nó inativo de processar."
      },
      {
        "question": "Por que o alvo perde apenas 25 em uma janela com vários passos?",
        "answer": "O Health é registrado em victims no primeiro contato aceito daquele golpe. Novas leituras do mesmo Health são rejeitadas até begin_attack limpar o histórico para outro golpe."
      },
      {
        "question": "Por que a Layer da Hurtbox pode ser zero?",
        "answer": "Ela não precisa ser encontrada por outra área neste exemplo. Seu Monitoring está ligado, sua Mask inclui a Layer da Hitbox e a Hitbox está Monitorable. Esses papéis são dirigidos."
      },
      {
        "question": "Por que não prometer que composição sempre é melhor?",
        "answer": "Para um protótipo pequeno, um script pode bastar. Componentes trazem configuração e referências adicionais. Escolha pelo reúso e pela responsabilidade, sem tratar o padrão como garantia de ausência de bugs."
      }
    ],
    "summary": "Uma FSM explicita qual comportamento controla o ator e quando ele entra ou sai. Composição separa sensores, regras do golpe e vida, mas exige contratos e referências bem definidos. Neste exemplo, máscara, equipe, autor, janela ativa e histórico por alvo são verificações distintas.",
    "next": "Na aula 12, diferencie encontrar um caminho, seguir seus pontos e desviar de outros agentes.",
    "sources": [
      {
        "label": "Godot 4.5: Area2D, monitoramento e listas de sobreposição",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_area2d.html"
      },
      {
        "label": "Godot 4.5: CollisionShape2D e set_deferred",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_collisionshape2d.html"
      },
      {
        "label": "Godot: CollisionObject2D, Layer e Mask",
        "url": "https://docs.godotengine.org/en/stable/classes/class_collisionobject2d.html"
      },
      {
        "label": "Godot: organização de cenas e responsabilidades",
        "url": "https://docs.godotengine.org/en/stable/tutorials/best_practices/scene_organization.html"
      },
      {
        "label": "Godot: GDScript, enum e match",
        "url": "https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html"
      }
    ]
  },
  "feynman": {
    "title": "Uma decisão ativa e peças com responsabilidades diferentes",
    "explanation": "Uma máquina de estados finitos descreve um conjunto de estados e as regras de transição entre eles. Nesta faixa de treino, o autômato fica parado, anda ou ataca. O controlador permite uma dessas ações por vez: entrar no ataque interrompe o movimento, e sair dele desativa o golpe.\n\nA comparação com uma caixa de marchas ajuda a imaginar exclusividade, mas não é uma lei para todo jogo. É possível combinar movimento e ataque com outro projeto de estados. Booleanos continuam úteis; o problema são regras contraditórias e efeitos sem um responsável claro.\n\nA composição organiza outra parte do problema. Hitbox e Hurtbox são nomes que damos a áreas de jogo, não classes nativas diferentes. A primeira oferece um golpe; a segunda detecta contatos e encaminha a tentativa. O componente de vida limita os pontos e emite sinais. Essa divisão permite reúso quando as referências e os contratos são compatíveis.",
    "analogies": [
      {
        "term": "Estado ativo",
        "analogy": "Uma marcha selecionada: identifica quem conduz o comportamento agora; as regras de troca continuam sendo responsabilidade do controlador."
      },
      {
        "term": "Janela do golpe",
        "analogy": "Uma válvula temporizada: contato só pode causar dano quando a regra de ataque está aberta."
      },
      {
        "term": "Componente de vida",
        "analogy": "Um medidor de integridade: recebe um valor de dano, limita a leitura e avisa quando muda, sem calcular geometria."
      }
    ]
  },
  "howItWorks": {
    "overview": "A rotina de física escolhe a intenção, executa o comportamento ativo e centraliza a troca. O enum nomeia PARADO, ANDANDO e ATACANDO. Em uma alternativa com match, cada valor selecionaria um ramo; a prática usa if para destacar o ataque temporizado. A extensão por nós delega tick apenas ao filho ativo.\n\nAs áreas não empurram corpos como uma colisão sólida. A Hurtbox monitora a camada da Hitbox; depois o código verifica active, autor, equipe e histórico. Health só aplica o dano aceito e limita o resultado a zero. A arquitetura é uma escolha do projeto, não uma vantagem automática de desempenho.",
    "anatomy": [
      {
        "prop": "mudar_estado(novo)",
        "desc": "Ignora a mesma escolha, limpa o ataque anterior, troca o estado e executa sua entrada. Não distribua trocas diretas por vários métodos."
      },
      {
        "prop": "0.15 ≤ tempo < 0.40 s",
        "desc": "Janela lógica do golpe dentro de um ataque de 0.60 s. A forma física é atualizada de maneira adiada; passos muito grandes podem perder uma janela curta."
      },
      {
        "prop": "collision_layer / collision_mask",
        "desc": "A caixa 3 vale 4 no bitmask. Aqui a Hurtbox busca esse bit; a Mask da Hitbox é vazia. Monitoring procura; Monitorable permite ser encontrado."
      },
      {
        "prop": "victims + Health.take_damage",
        "desc": "Cada Health pode receber uma tentativa por golpe. A vida retorna o dano realmente aplicado e não emite morte novamente após chegar a zero."
      }
    ]
  },
  "approaches": [
    {
      "title": "Exemplo 1: controlador principal com enum",
      "whenToUse": "Na prática da faixa de treino. Depende dos componentes do exemplo 2.",
      "description": "Salve como automato.gd e anexe a Automato. Este é o único controlador de movimento da prática. O golpe permanece à direita; mirar/espelhar é uma extensão futura.",
      "code": "extends CharacterBody2D\n# automato.gd: anexe a Automato. Exemplo principal, sem gravidade.\nenum Estado { PARADO, ANDANDO, ATACANDO }\nvar estado: Estado = Estado.PARADO\nvar tempo: float = 0.0\n@onready var golpe: Aula11Hitbox = $Hitbox\n\nfunc _ready() -> void:\n    motion_mode = CharacterBody2D.MOTION_MODE_FLOATING\n    golpe.source_actor = self\n    golpe.set_active(false)\n\nfunc mudar_estado(novo: Estado) -> void:\n    if novo == estado:\n        return\n    # Saída: encerra os efeitos que pertencem ao estado anterior.\n    if estado == Estado.ATACANDO:\n        golpe.set_active(false)\n    estado = novo\n    tempo = 0.0\n    # Entrada: prepara um golpe novo, sem reaproveitar os alvos anteriores.\n    if estado == Estado.ATACANDO:\n        velocity = Vector2.ZERO\n        golpe.begin_attack()\n\nfunc _physics_process(delta: float) -> void:\n    if Input.is_action_just_pressed(\"ui_cancel\"):\n        mudar_estado(Estado.PARADO)\n        velocity = Vector2.ZERO\n        return\n    if estado != Estado.ATACANDO and Input.is_action_just_pressed(\"atacar\"):\n        mudar_estado(Estado.ATACANDO)\n    if estado == Estado.ATACANDO:\n        tempo += delta\n        golpe.set_active(tempo >= 0.15 and tempo < 0.40)\n        if tempo >= 0.60:\n            mudar_estado(Estado.PARADO)\n        return\n    var eixo := Input.get_axis(\"ui_left\", \"ui_right\")\n    mudar_estado(Estado.ANDANDO if eixo != 0.0 else Estado.PARADO)\n    velocity = Vector2(eixo * 80.0, 0.0)\n    move_and_slide()\n    position.x = clampf(position.x, 48.0, 560.0)\n",
      "pros": "Concentra três comportamentos curtos e torna a limpeza visível.",
      "cons": "Não combina ataque com movimento. Muitos comportamentos exigem reavaliar a divisão."
    },
    {
      "title": "Exemplo 2: combate e leitura da vida",
      "whenToUse": "Junto do exemplo 1, nos nós e arquivos indicados.",
      "description": "São quatro arquivos separados: health.gd, hitbox.gd, hurtbox.gd e arena.gd. Mantenha apenas um class_name por arquivo. O componente de vida não depende de CharacterBody2D; o protocolo de detecção exige estes scripts e exports.",
      "code": "# --- health.gd ---\nclass_name Aula11Health\nextends Node\n# health.gd: no Health do alvo. Não conhece atacante nem geometria.\nsignal changed(current: float, maximum: float)\nsignal died\n@export_range(1.0, 1000.0) var maximum: float = 100.0\nvar current: float = 0.0\n\nfunc _ready() -> void:\n    current = maximum\n\nfunc take_damage(amount: float) -> float:\n    if amount <= 0.0 or current <= 0.0:\n        return 0.0\n    var applied := minf(current, amount)\n    current -= applied\n    changed.emit(current, maximum)\n    if current == 0.0:\n        died.emit()\n    return applied\n\n# --- hitbox.gd ---\nclass_name Aula11Hitbox\nextends Area2D\n# hitbox.gd: anexe a Automato/Hitbox.\n@export var damage: float = 25.0\n@export var team: int = 1\nvar source_actor: Node\nvar active: bool = false\nvar victims: Dictionary = {}\n@onready var shape: CollisionShape2D = $CollisionShape2D\n\nfunc begin_attack() -> void:\n    set_active(false)\n    victims.clear()\n\nfunc set_active(value: bool) -> void:\n    active = value\n    # O teste lógico é imediato; a mudança física é adiada com segurança.\n    shape.set_deferred(\"disabled\", not value)\n\nfunc try_hit(health: Aula11Health, receiver: Node, receiver_team: int) -> void:\n    if not active or receiver == source_actor or receiver_team == team:\n        return\n    var key := health.get_instance_id()\n    if victims.has(key):\n        return\n    victims[key] = true\n    var applied := health.take_damage(damage)\n    if applied > 0.0:\n        print(\"Dano aplicado: \", applied)\n\n# --- hurtbox.gd ---\nclass_name Aula11Hurtbox\nextends Area2D\n# hurtbox.gd: anexe a Alvo/Hurtbox; arraste Health e Alvo aos exports.\n@export var health: Aula11Health\n@export var receiver: Node\n@export var team: int = 2\n\nfunc _ready() -> void:\n    assert(health != null and receiver != null, \"Configure Health e Receiver\")\n\nfunc _physics_process(_delta: float) -> void:\n    # A lista reflete a atualização física; não é uma consulta imediata.\n    # A leitura contínua também cobre um golpe iniciado já dentro da área.\n    for area in get_overlapping_areas():\n        if area is Aula11Hitbox:\n            area.try_hit(health, receiver, team)\n\n# --- arena.gd ---\nextends Node2D\n# arena.gd: anexe a Arena. Os filhos já passaram por _ready().\n@onready var health: Aula11Health = $Alvo/Health\n@onready var label: Label = $Leitura\n\nfunc _ready() -> void:\n    health.changed.connect(_on_health_changed)\n    health.died.connect(_on_died)\n    _on_health_changed(health.current, health.maximum)\n\nfunc _on_health_changed(value: float, maximum: float) -> void:\n    label.text = \"Integridade: %.0f / %.0f\" % [value, maximum]\n\nfunc _on_died() -> void:\n    print(\"Alvo esgotado; novos golpes não emitem died novamente.\")\n",
      "pros": "Vida, aceitação de golpe, geometria e apresentação possuem responsabilidades explícitas.",
      "cons": "É preciso configurar referências e equipes; não oferece invulnerabilidade, rede ou cura nesta versão."
    },
    {
      "title": "Exemplo 3: estados como nós, extensão independente",
      "whenToUse": "Para entender delegação antes de transformar uma FSM maior em vários scripts.",
      "description": "Use uma nova cena Experimento. Parado e Trabalho compartilham passo.gd; apenas o ativo recebe tick. Para comportamentos diferentes, especialize esse contrato em scripts próprios. O bloqueio changing rejeita transições recursivas, sem enfileirá-las.",
      "code": "# Extensão: cena independente Experimento (Node).\n# Filhos: Parado (Node) e Trabalho (Node), ambos com passo.gd.\n# Não instale esta máquina junto ao controlador principal do autômato.\n\n# --- passo.gd: salve em arquivo próprio ---\nclass_name Aula11Passo\nextends Node\nsignal requested(origin: Aula11Passo, next: StringName)\nvar elapsed: float = 0.0\n\nfunc enter() -> void:\n    elapsed = 0.0\n    print(\"enter \", name)\n\nfunc exit() -> void:\n    print(\"exit \", name)\n\nfunc tick(delta: float) -> void:\n    elapsed += delta\n    if name == &\"Trabalho\" and elapsed >= 0.60:\n        requested.emit(self, &\"Parado\")\n\n# --- maquina.gd: outro arquivo, anexe a Experimento ---\nextends Node\n@export var initial: Aula11Passo\nvar current: Aula11Passo\nvar states: Dictionary = {}\nvar changing: bool = false\n\nfunc _ready() -> void:\n    for child in get_children():\n        if child is Aula11Passo:\n            states[StringName(child.name)] = child\n            child.requested.connect(_request)\n    assert(initial != null and initial.get_parent() == self)\n    current = initial\n    current.enter()\n\nfunc _request(origin: Aula11Passo, next: StringName) -> void:\n    if origin != current or changing or not states.has(next):\n        return\n    var target: Aula11Passo = states[next]\n    if target == current:\n        return\n    changing = true\n    current.exit()\n    current = target\n    current.enter()\n    changing = false\n\nfunc _physics_process(delta: float) -> void:\n    if Input.is_action_just_pressed(\"ui_accept\"):\n        _request(current, &\"Trabalho\")\n    current.tick(delta)\n",
      "pros": "Expõe entrada, saída, delegação e rejeição de pedidos de um estado inativo.",
      "cons": "É uma demonstração de dois estados, sem locomoção e sem combate. Não substitui o exemplo 1 automaticamente."
    }
  ],
  "simulator": {
    "type": "fsm_state_machine",
    "title": "Laboratório: estado, janela do golpe e dano por alvo",
    "description": "Modelo JavaScript em um mundo 640 × 300 unidades: três estados, movimento horizontal a 80 u/s e ataque de 0.60 s com janela [0.15,0.40). O retângulo ofensivo usa o mesmo desenho e teste de contato contra o círculo do alvo. Não executa Area2D, GDScript, set_deferred ou a física da Godot. Passos internos de até 1/240 s reduzem perdas da janela, sem oferecer colisão contínua geral. A posição de teste fica bloqueada durante o ataque. A relação de autoria/equipe é um filtro simulado do alvo desenhado, sem deslocá-lo para o atacante.",
    "guide": [
      {
        "title": "Preveja o alcance",
        "text": "Clique na cena ou alcance-a com Tab. Segure A/D ou ←/→ para andar e solte para parar; Espaço ou J inicia um ataque para a direita. Após atacar, solte e pressione a direção novamente. Os botões dão passos de 16 u, sem caminhada automática. Em x=120 o golpe erra. Em x=280, seu retângulo vai de 304 a 352; a distância ao centro do alvo x=360 é 8, menor que o raio 24. Um golpe válido retira 25."
      },
      {
        "title": "Compare tempo e interrupção",
        "text": "Para inspecionar a janela: pause, inicie o ataque e use Avançar 0,05 s. Três passos chegam a 0,15 s, início da janela. O modo pausado mantém o estado para você observar o desenho. Interromper ataque só atua quando há ataque."
      },
      {
        "title": "Separe os filtros",
        "text": "Desligue a máscara ou escolha aliado/próprio autor. Contato geométrico não basta. Restaurar repõe posição, modos, vida e contadores; a sonda geométrica usa os valores atuais."
      }
    ]
  },
  "quiz": {
    "question": "O alvo permanece em contato durante toda a janela de um ataque. Qual regra explica receber 25 pontos uma única vez, sem confundir detecção com vida?",
    "options": [
      "A Mask vazia da Hitbox impede qualquer contato, mas Health desconta por tempo.",
      "A Hurtbox detecta a camada; o golpe verifica janela, autor/equipe e histórico por Health; Health limita o dano aplicado.",
      "O enum impede automaticamente chamadas repetidas de qualquer componente.",
      "Uma Layer diferente elimina fogo amigo, independentemente da Mask e do código."
    ],
    "correctIndex": 1,
    "explanation": "Detecção dirigida, regras do golpe e alteração de vida são etapas diferentes. O histórico é limpo ao começar um novo ataque, permitindo outro acerto nesse próximo golpe.",
    "feedback": [
      "Sem detecção e contato aceito, não deve existir desconto. Aqui é a Hurtbox que monitora.",
      "Correto.",
      "enum apenas nomeia estados. O registro victims é que evita repetir o mesmo Health no golpe.",
      "Camadas filtram detecção; autor e equipe ainda precisam de regras explícitas."
    ]
  }
},

{
  "id": "2d-adv-ai-navigation",
  "area": "2d",
  "level": "avancado",
  "levelLabel": "Avançado",
  "title": "12. Navegação 2D: rotas A*, agentes e avoidance",
  "subtitle": "Separe encontrar uma rota, seguir seus pontos e ajustar a velocidade perto de vizinhos.",
  "nodesUsed": [
    "AStarGrid2D",
    "NavigationRegion2D",
    "NavigationPolygon",
    "NavigationAgent2D",
    "CharacterBody2D"
  ],
  "teaching": {
    "codeRequired": true,
    "codeIntro": "O exemplo 1 é a prática principal em grade. O exemplo 2 usa outra cena, com malha de navegação. O exemplo 3 é uma extensão opcional do exemplo 2.",
    "duration": "80–110 min com as extensões (estimativa)",
    "prerequisite": "Aulas 2–5 e 8: vetores, coordenadas locais/globais, física e células. Referência: Godot 4.5, GDScript. Faça primeiro a grade; malha e avoidance são etapas separadas.",
    "objectives": [
      "Configurar uma grade de quatro vizinhos, distinguir IDs de células de pontos locais e comparar custo de rotas.",
      "Mover um marcador ao longo da rota e distinguir ausência de caminho, origem igual ao destino e chegada.",
      "Configurar uma cena com NavigationAgent2D e explicar por que colisão, malha e avoidance são sistemas diferentes."
    ],
    "practice": {
      "title": "Prática guiada: da grade à malha de navegação",
      "intro": "Comece com uma cena de um nó que desenha uma grade e segue a rota. Depois monte outra cena para testar a navegação da Godot. A primeira permite cálculos exatos; a segunda exige uma malha construída e sincronizada.",
      "tree": "CENA 1: Grade (Node2D) — grade.gd, exemplo 1\n\nCENA 2: CenarioMalha (Node2D) — alvo_click.gd, exemplo 2\n├── Regiao (NavigationRegion2D) — NavigationPolygon\n│   └── Pilar (StaticBody2D) — posição (320,180), Layer 1\n│       ├── CollisionShape2D — RectangleShape2D (96,128)\n│       └── Polygon2D — retângulo visual de (-48,-64) a (48,64)\n├── Sentinela (CharacterBody2D) — posição (80,180), sentinela.gd\n│   ├── CollisionShape2D — CircleShape2D, raio 10\n│   ├── Polygon2D — quadrado visual de (-10,-10) a (10,10)\n│   └── NavigationAgent2D\n├── Alvo (Marker2D) — posição (560,180)\n│   └── Polygon2D — losango visual pequeno\n└── Leitura (Label) — posição (16,8)",
      "download": {
        "url": "assets/aula-12-navegacao.zip",
        "label": "Baixar scripts e roteiro de navegação"
      },
      "downloadNote": "Quatro scripts e instruções. A arte da prática é desenhada por código ou Polygon2D; não exige texturas. Não é um projeto pronto e não foi executado no motor neste ambiente.",
      "steps": [
        {
          "title": "Monte a grade mínima",
          "text": "Crie uma cena com raiz Node2D chamada Grade. Salve grade.tscn, anexe grade.gd do exemplo 1 e configure Viewport Width 640 e Height 360. O script cria 12 × 7 células de 32 px, com margem (16,16). A origem é (1,3), o destino (10,3) e uma barreira ocupa a coluna 5, linhas 1 a 5.",
          "expect": "Ao executar com F6, aparecem chão, barreira, linha da rota e marcador. Não é necessário TileMapLayer, região de navegação nem corpo físico nesta cena."
        },
        {
          "title": "Preveja o custo antes de executar",
          "text": "Sem barreiras, a diferença entre origem e destino é 9 colunas: são 9 passos e 10 pontos. Com a barreira inicial, a rota precisa passar pela linha 0 ou 6: sobe/desce 3 células, cruza 9 e retorna 3, totalizando 15 passos e 16 pontos. Rotas empatadas podem escolher lados diferentes.",
          "expect": "O texto informa o custo por passos; a linha mostra o caminho. Uma rota diferente pode ser igualmente curta. Comprimento da lista conta também o ponto inicial."
        },
        {
          "title": "Edite e teste os casos extremos",
          "text": "Clique com o botão esquerdo para escolher um destino livre e com o direito para alternar parede. Como alternativa, use setas para mover o cursor, Enter para destino e Espaço para parede. R reinicia o seguidor. Não é permitido bloquear origem/destino. Feche as passagens (5,0) e (5,6) e compare com um destino igual à origem.",
          "expect": "Barreira completa produz Sem rota e lista vazia. Origem igual ao destino produz zero passos e um ponto. Toda edição válida recalcula e reinicia o seguidor na origem, sem deslocá-lo por dentro de uma parede."
        },
        {
          "title": "Diferencie ID de ponto e planejamento de movimento",
          "text": "No código, get_id_path retorna IDs Vector2i. get_point_path retorna posições Vector2 derivadas de cell_size e offset. O centro de (1,3) é (64,128), não (1,3). O loop de física consome os segmentos a 64 px/s. AStarGrid2D só fornece os pontos: o movimento é nosso. Alterar set_point_solid não pede update; chamar update depois apaga a solidez e os pesos existentes.",
          "expect": "Você consegue explicar por que 15 passos de 32 px dão 480 px e levam 7.5 s a 64 px/s. A origem do mundo e os pontos locais só coincidem quando a transformação da raiz é identidade."
        },
        {
          "title": "Prepare outra cena com malha e colisão",
          "text": "Monte CenarioMalha pela árvore. Na Regiao, crie NavigationPolygon e desenhe o contorno externo (32,32), (608,32), (608,328), (32,328). Em seu recurso, use Agent Radius 12, Source Geometry Mode Root Node Children, Parsed Geometry Type Static Colliders e Parsed Collision Mask somente caixa 1. O Pilar deve ser filho da Regiao, com corpo/forma/arte configurados. Clique Bake NavigationPolygon na barra da região. Na Sentinela, Layer somente 2 e Mask somente 1.",
          "expect": "A região assada contorna o pilar com folga. Verifique a visualização de navegação. A forma física impede atravessamento, mas não altera a malha automaticamente; após mudar o pilar, faça novo bake."
        },
        {
          "title": "Siga o caminho sem avoidance",
          "text": "Anexe sentinela.gd à Sentinela e alvo_click.gd à raiz. No Inspector do corpo, arraste Alvo para Target e Leitura para Status; Speed 80 e Use Avoidance desligado. No NavigationAgent2D, use Path Desired Distance 4, Target Desired Distance 6, Radius 12 e Debug Enabled ligado. O código aguarda map_get_iteration_id diferente de zero antes de definir o destino. Clique em posições livres para mover o Alvo.",
          "expect": "A Sentinela segue os pontos da malha usando move_and_slide. O raio do agente regula avoidance; a folga da rota veio do Agent Radius do NavigationPolygon no bake. Um mapa sem sincronização mantém a cena à espera, não prova que não existe rota."
        },
        {
          "title": "Compare fim do caminho com alvo alcançado",
          "text": "Clique dentro do pilar ou fora da área navegável. Compare Leitura e posição final. is_navigation_finished também pode indicar chegada ao fim do caminho disponível quando o alvo não é alcançável; consulte is_target_reached para distinguir. O script só redefine target_position inicialmente ou após deslocamento maior que 4 px do marcador. Esse limiar é uma decisão deste exemplo, não uma otimização universal.",
          "expect": "A Sentinela pode parar no ponto navegável final sem tocar no alvo. Não interprete isso automaticamente como alvo alcançado nem como um caminho vazio."
        },
        {
          "title": "Experimente dois agentes, opcionalmente",
          "text": "Duplique a Sentinela e coloque a segunda em (80,230), sem sobreposição inicial. Em ambas, marque Use Avoidance e deixe os mesmos parâmetros Radius 12, Neighbor Distance 100, Max Neighbors 8, Avoidance Layers/Mask caixa 1. Mantenha Layer física 2 e Mask física 1 para isolar avoidance entre agentes sem colisão corporal entre eles. Cada corpo aponta para o mesmo Alvo; use Labels Status diferentes ou deixe Status vazio no segundo. Adicione um Label com distancia.gd do exemplo 3 e configure First/Second.",
          "expect": "Com avoidance ativo, a velocidade desejada é enviada ao agente e o corpo move apenas no callback velocity_computed. Observe situações de aproximação e passagem estreita; não prometa que nunca haverá sobreposição ou travamento. O monitor mede distância, não valida uma solução RVO."
        }
      ]
    },
    "pitfalls": [
      {
        "title": "Malha não é colisão nem arte",
        "text": "Um Sprite2D ou StaticBody2D fora da geometria do bake não muda o caminho. O bake considera as fontes escolhidas. A malha representa posições para o centro; a folga para o corpo deve ser construída com raio apropriado."
      },
      {
        "title": "Destino atualizado em todo quadro sem necessidade",
        "text": "Definir target_position pode pedir outra rota. Evite redefini-lo sem mudança relevante. O limiar usado aqui é uma escolha didática; medir com profiler é necessário antes de recomendar intervalos para multidões."
      },
      {
        "title": "Movimento duplicado com avoidance",
        "text": "Escolha uma via por passo: desejada diretamente quando avoidance está desligado, ou segura no callback quando está ligado. Envie velocidade zero quando o caminho terminar; não deixe a intenção anterior ativa por omissão."
      },
      {
        "title": "ID, ponto e update confundidos",
        "text": "get_id_path lista células; get_point_path lista posições calculadas pela grade. update reconstrói os pontos e limpa solidez/pesos; depois de mudar a região ou célula, reaplique seus obstáculos."
      }
    ],
    "checks": [
      {
        "question": "Uma lista de 16 pontos tem quantos passos e qual distância nesta grade?",
        "answer": "15 passos. Com quatro vizinhos, custo uniforme e célula de 32 px, são 480 px. Inclui o ponto inicial e o final."
      },
      {
        "question": "is_navigation_finished significa que o alvo foi alcançado?",
        "answer": "Nem sempre: a navegação também termina no fim do caminho disponível para um alvo inalcançável. is_target_reached testa a aproximação ao destino solicitado dentro da tolerância."
      },
      {
        "question": "Radius do NavigationAgent2D alarga a rota para o corpo?",
        "answer": "Não. Esse Radius pertence ao avoidance. A malha precisa ser construída com folga, por exemplo com Agent Radius do NavigationPolygon, e deve corresponder ao tamanho do corpo."
      },
      {
        "question": "O movimento contínuo do laboratório usa uma malha da Godot?",
        "answer": "Não. Ele interpola os pontos de uma rota A* em grade, usando um marcador sem volume de colisão. Não calcula NavigationPolygon, NavigationAgent2D ou avoidance/RVO."
      }
    ],
    "summary": "Planejamento responde por onde ir; seguimento usa a rota para mover; avoidance ajusta intenção de velocidade perante vizinhos. Grade, navegação em malha e colisão física têm dados e contratos diferentes. Compare resultados com as condições do exemplo, sem transformar uma demonstração simplificada em uma garantia da engine.",
    "next": "Na aula 13, organize dados de itens e persistência com Resources e arquivos.",
    "sources": [
      {
        "label": "Godot 4.5: AStarGrid2D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_astargrid2d.html"
      },
      {
        "label": "Godot 4.5: NavigationAgent2D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_navigationagent2d.html"
      },
      {
        "label": "Godot 4.5: uso de NavigationAgents",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/navigation/navigation_using_navigationagents.html"
      },
      {
        "label": "Godot 4.5: malhas de navegação",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/navigation/navigation_using_navigationmeshes.html"
      },
      {
        "label": "Godot 4.5: NavigationPolygon",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_navigationpolygon.html"
      }
    ]
  },
  "feynman": {
    "title": "Encontrar o caminho não move o autômato",
    "explanation": "Encontrar uma rota é escolher uma sequência de posições que evita as regiões bloqueadas do mapa usado pelo algoritmo. Seguir a rota é transformar esses pontos em movimento. A grade desta aula só permite quatro vizinhos e todos os passos custam 1; por isso podemos conferir o resultado contando células.\n\nNa Godot, AStarGrid2D calcula caminhos entre pontos de uma grade. NavigationAgent2D trabalha com dados de navegação em malha e ajuda a acompanhar o caminho, mas não move seu pai. O corpo continua precisando de código de movimento. A malha também não é atualizada automaticamente por qualquer desenho ou colisão que aparece na cena.\n\nAvoidance é outro mecanismo: ajusta velocidades em relação a agentes e obstáculos registrados no seu sistema. A comparação com pedestres é útil, mas não garante passagem por corredores estreitos nem substitui o planejamento ou a colisão. Encontrar um caminho não é, sozinho, toda a inteligência de um inimigo.",
    "analogies": [
      {
        "term": "Planejamento",
        "analogy": "Um roteiro de oficina: informa a sequência de passagens, mas não liga o motor do autômato."
      },
      {
        "term": "Seguimento",
        "analogy": "O operador que consome o roteiro ponto a ponto e define a velocidade do corpo."
      },
      {
        "term": "Avoidance",
        "analogy": "Um ajuste local de passagem: depende dos vizinhos e parâmetros conhecidos e pode não resolver um impasse."
      }
    ]
  },
  "howItWorks": {
    "overview": "A* compara custo já percorrido e uma estimativa até o destino. Na grade de quatro vizinhos e custos uniformes, usamos distância Manhattan: |dx| + |dy|. Ela ignora obstáculos na estimativa e não exige uma única rota ótima quando há empate.\n\nAStarGrid2D produz IDs ou posições. A malha de NavigationRegion2D é outro domínio; seus polígonos informam onde o centro do agente pode navegar. O NavigationAgent2D precisa de mapa pronto e de consultas de seguimento no passo físico enquanto houver navegação ativa. A velocidade desejada pode ser aplicada diretamente ou passar por avoidance antes de mover o corpo.",
    "anatomy": [
      {
        "prop": "get_id_path / get_point_path",
        "desc": "IDs são coordenadas inteiras da célula. Pontos usam cell_size e offset; só são globais se você os converter conforme a transformação da cena."
      },
      {
        "prop": "update / set_point_solid",
        "desc": "Configure a grade, execute update e depois marque os sólidos. Atualizar o layout limpa dados dos pontos; alternar um sólido não requer update."
      },
      {
        "prop": "is_navigation_finished / is_target_reached",
        "desc": "Fim do caminho e destino alcançado são perguntas distintas. Um alvo fora da malha pode terminar em um ponto navegável próximo."
      },
      {
        "prop": "velocity / velocity_computed",
        "desc": "Com avoidance, envie a intenção e use a velocidade segura para mover. O sistema não cria automaticamente uma rota nova através de paredes."
      }
    ]
  },
  "approaches": [
    {
      "title": "Exemplo 1: grade completa e seguidor",
      "whenToUse": "Prática principal: cena Grade, com um único Node2D.",
      "description": "Salve grade.gd e anexe à raiz. Não depende de arte externa. O marcador sem corpo segue os pontos locais; ao editar a grade, o experimento reinicia na origem. Controle por mouse e teclado.",
      "code": "extends Node2D\n# grade.gd: cena principal Grade (Node2D), sem outros nós obrigatórios.\nconst SIZE := Vector2i(12, 7)\nconst CELL := 32.0\nconst ORIGIN := Vector2(16, 16)\nvar grid := AStarGrid2D.new()\nvar start := Vector2i(1, 3)\nvar goal := Vector2i(10, 3)\nvar cursor := Vector2i(1, 3)\nvar ids: Array[Vector2i] = []\nvar points := PackedVector2Array()\nvar actor := Vector2.ZERO\nvar next_index: int = 1\nvar message: String = \"\"\n\nfunc _ready() -> void:\n    grid.region = Rect2i(Vector2i.ZERO, SIZE)\n    grid.cell_size = Vector2(CELL, CELL)\n    grid.offset = ORIGIN + Vector2(CELL, CELL) * 0.5\n    grid.diagonal_mode = AStarGrid2D.DIAGONAL_MODE_NEVER\n    grid.default_compute_heuristic = AStarGrid2D.HEURISTIC_MANHATTAN\n    grid.default_estimate_heuristic = AStarGrid2D.HEURISTIC_MANHATTAN\n    grid.update()\n    for y in range(1, 6):\n        grid.set_point_solid(Vector2i(5, y), true)\n    replan()\n\nfunc center(cell: Vector2i) -> Vector2:\n    return ORIGIN + (Vector2(cell) + Vector2(0.5, 0.5)) * CELL\n\nfunc replan() -> void:\n    ids = grid.get_id_path(start, goal)\n    points = grid.get_point_path(start, goal)\n    actor = center(start)\n    next_index = 1\n    message = \"Sem rota\" if ids.is_empty() else \"%d passos / %d pontos\" % [ids.size() - 1, ids.size()]\n    queue_redraw()\n\nfunc apply(cell: Vector2i, wall: bool) -> void:\n    if not grid.region.has_point(cell):\n        return\n    if wall:\n        if cell == start or cell == goal:\n            return\n        grid.set_point_solid(cell, not grid.is_point_solid(cell))\n        # Não chame update(): ele apagaria solidez/pesos dos pontos.\n    else:\n        if grid.is_point_solid(cell):\n            message = \"Destino bloqueado: escolha uma célula livre\"\n            queue_redraw()\n            return\n        goal = cell\n    replan()\n\nfunc _unhandled_input(event: InputEvent) -> void:\n    if event is InputEventMouseButton and event.pressed:\n        var local := to_local(get_global_mouse_position())\n        var cell := Vector2i(((local - ORIGIN) / CELL).floor())\n        if event.button_index == MOUSE_BUTTON_LEFT:\n            apply(cell, false)\n        elif event.button_index == MOUSE_BUTTON_RIGHT:\n            apply(cell, true)\n    if event is InputEventKey and event.pressed and not event.echo:\n        match event.physical_keycode:\n            KEY_LEFT: cursor.x = maxi(0, cursor.x - 1)\n            KEY_RIGHT: cursor.x = mini(SIZE.x - 1, cursor.x + 1)\n            KEY_UP: cursor.y = maxi(0, cursor.y - 1)\n            KEY_DOWN: cursor.y = mini(SIZE.y - 1, cursor.y + 1)\n            KEY_ENTER: apply(cursor, false)\n            KEY_SPACE: apply(cursor, true)\n            KEY_R: replan()\n        queue_redraw()\n\nfunc _physics_process(delta: float) -> void:\n    var budget := 64.0 * delta\n    while next_index < points.size() and budget > 0.0:\n        var distance := actor.distance_to(points[next_index])\n        if distance <= budget:\n            actor = points[next_index]\n            budget -= distance\n            next_index += 1\n        else:\n            actor = actor.move_toward(points[next_index], budget)\n            budget = 0.0\n    queue_redraw()\n\nfunc _draw() -> void:\n    for y in range(SIZE.y):\n        for x in range(SIZE.x):\n            var cell := Vector2i(x, y)\n            var color := Color(\"6c4526\") if grid.is_point_solid(cell) else Color(\"21190e\")\n            if ids.has(cell):\n                color = Color(\"235654\")\n            draw_rect(Rect2(ORIGIN + Vector2(cell) * CELL, Vector2(CELL - 1, CELL - 1)), color)\n    if points.size() > 1:\n        draw_polyline(points, Color(\"edc578\"), 2.0)\n    draw_circle(center(start), 7.0, Color(\"d4a359\"))\n    draw_circle(center(goal), 9.0, Color(\"5ce1e6\"))\n    draw_circle(actor, 5.0, Color.WHITE)\n    draw_rect(Rect2(ORIGIN + Vector2(cursor) * CELL, Vector2(CELL, CELL)), Color.WHITE, false, 2.0)\n    var font := ThemeDB.fallback_font\n    var phase := \" | chegou\" if not points.is_empty() and next_index >= points.size() else (\" | seguindo\" if not points.is_empty() else \"\")\n    draw_string(font, Vector2(16, 264), message + phase, HORIZONTAL_ALIGNMENT_LEFT, -1, 16)\n    draw_string(font, Vector2(16, 288), \"Clique: destino | direito: parede | setas + Enter/Espaco | R: reiniciar\", HORIZONTAL_ALIGNMENT_LEFT, -1, 14)\n",
      "pros": "Permite conferir passos, pontos e distância com cálculos simples.",
      "cons": "É um marcador sem raio/colisão; não implementa uma malha ou avoidance."
    },
    {
      "title": "Exemplo 2: NavigationAgent2D na malha",
      "whenToUse": "Na cena CenarioMalha, separada da Grade.",
      "description": "São dois arquivos: sentinela.gd no corpo e alvo_click.gd na raiz. Confira os exports e o bake. O mesmo controlador serve com avoidance ligado ou desligado, escolhendo uma única via para move_and_slide.",
      "code": "# --- sentinela.gd ---\nextends CharacterBody2D\n# sentinela.gd: no corpo Sentinela; export Target recebe o Marker2D Alvo.\n@export var target: Node2D\n@export var status: Label\n@export var speed: float = 80.0\n@export var use_avoidance: bool = false\n@onready var agent: NavigationAgent2D = $NavigationAgent2D\nvar assigned: bool = false\nvar last_goal := Vector2.ZERO\n\nfunc _ready() -> void:\n    motion_mode = CharacterBody2D.MOTION_MODE_FLOATING\n    agent.max_speed = speed\n    agent.avoidance_enabled = use_avoidance\n    agent.velocity_computed.connect(_safe_velocity)\n\nfunc _physics_process(delta: float) -> void:\n    if not is_instance_valid(target):\n        velocity = Vector2.ZERO\n        return\n    # Aguarda a primeira sincronização deste mapa. Não é um prazo fixo.\n    if NavigationServer2D.map_get_iteration_id(agent.get_navigation_map()) == 0:\n        if status != null:\n            status.text = \"Mapa aguardando sincronização\"\n        return\n    if not assigned or last_goal.distance_to(target.global_position) > 4.0:\n        last_goal = target.global_position\n        agent.target_position = last_goal\n        assigned = true\n    var desired := Vector2.ZERO\n    if not agent.is_navigation_finished():\n        var next := agent.get_next_path_position()\n        # Reduz sobrepassagem ao se aproximar do próximo ponto.\n        desired = global_position.direction_to(next) * minf(speed, global_position.distance_to(next) / delta)\n    if status != null:\n        status.text = \"Alvo alcançado\" if agent.is_target_reached() else (\"Fim do caminho; alvo não alcançado\" if agent.is_navigation_finished() else \"Seguindo caminho\")\n    if agent.avoidance_enabled:\n        agent.velocity = desired\n    else:\n        _move(desired)\n\nfunc _safe_velocity(safe: Vector2) -> void:\n    if agent.avoidance_enabled and is_instance_valid(target):\n        _move(safe)\n\nfunc _move(value: Vector2) -> void:\n    velocity = value\n    move_and_slide()\n\n# --- alvo_click.gd ---\nextends Node2D\n# alvo_click.gd: em CenarioMalha; o Marker2D Alvo é filho direto.\nfunc _unhandled_input(event: InputEvent) -> void:\n    if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:\n        $Alvo.global_position = get_global_mouse_position()\n",
      "pros": "Separa disponibilidade do mapa, definição do destino e movimento do corpo.",
      "cons": "Exige malha válida; tolerâncias e folga precisam ser testadas. As APIs de navegação consultadas são experimentais na referência 4.5."
    },
    {
      "title": "Exemplo 3: medir a aproximação entre agentes",
      "whenToUse": "Somente na extensão opcional com duas sentinelas.",
      "description": "Anexe distancia.gd a um Label adicional, configure First e Second no Inspector e compare avoidance ligado/desligado nos corpos. Este monitor não calcula uma velocidade segura e não substitui o controlador do exemplo 2.",
      "code": "extends Label\n# distancia.gd: em um Label extra, somente na extensão com duas sentinelas.\n@export var first: Node2D\n@export var second: Node2D\n\nfunc _process(_delta: float) -> void:\n    if is_instance_valid(first) and is_instance_valid(second):\n        text = \"Distância entre centros: %.1f px\" % first.global_position.distance_to(second.global_position)\n",
      "pros": "Torna observável a distância entre centros durante a comparação.",
      "cons": "Uma leitura de distância não prova ausência de colisão nem garante que a multidão encontre uma saída."
    }
  ],
  "simulator": {
    "type": "pathfinding_astar",
    "title": "Laboratório: A* em grade e seguimento da rota",
    "description": "Modelo JavaScript de A* em 12 × 7 células com quatro vizinhos, custo 1 e heurística Manhattan. Cada célula equivale a 32 unidades; o marcador não tem volume de colisão. Células e Seguir rota usam o mesmo caminho em grade. Não executa AStarGrid2D, NavigationAgent2D, malhas ou avoidance/RVO. Editar o mapa reinicia o seguidor na origem; pausa congela o movimento, mas permite editar.",
    "guide": [
      {
        "title": "Calcule antes de observar",
        "text": "No preset aberto, (1,3) → (10,3) custa 9 passos, 10 pontos e 288 unidades. A 64 u/s, leva 4.5 s de movimento simulado."
      },
      {
        "title": "Teste bloqueio e empate",
        "text": "A barreira parcial da coluna 5 exige 15 passos, via linha 0 ou 6. Feche a coluna toda: sem rota. Origem e destino iguais: zero passos e um ponto."
      },
      {
        "title": "Edite sem depender do mouse",
        "text": "Na grade, setas selecionam; Enter/Espaço aplicam a ferramenta, sem repetir ao segurar. Origem e destino são protegidos. Iniciar / repetir percurso ou R, com foco no mapa, seleciona Seguir rota, reinicia e retoma a animação. Após chegar, repita sem recarregar. Para conferir: pause e use Avançar 0,25 s; a 64 u/s são 16 u por passo."
      }
    ]
  },
  "quiz": {
    "question": "A sentinela parou porque is_navigation_finished() é verdadeiro. O alvo está dentro de uma região bloqueada. Qual interpretação é correta?",
    "options": [
      "A navegação pode ter terminado no último ponto disponível sem alcançar o alvo; compare is_target_reached e a configuração da malha.",
      "O alvo foi alcançado obrigatoriamente, pois fim do caminho e chegada ao destino sempre são a mesma condição.",
      "O Radius do agente deve abrir um corredor na malha automaticamente, mesmo sem alterar ou refazer o bake.",
      "Basta ativar avoidance para que o corpo atravesse a parede e transforme o alvo em um ponto navegável."
    ],
    "correctIndex": 0,
    "explanation": "Um alvo inalcançável pode encerrar o seguimento no último ponto da rota. A chegada ao destino solicitado tem um teste próprio e depende dos dados de navegação.",
    "feedback": [
      "Correto.",
      "Fim de caminho não prova chegada ao alvo. A referência descreve também o caso inalcançável.",
      "Radius do agente pertence ao avoidance. A folga da rota depende da construção da malha.",
      "Avoidance ajusta velocidades; não transforma parede em área navegável nem substitui colisão."
    ]
  }
},

{
  "id": "2d-adv-resources-saveload",
  "area": "2d",
  "level": "avancado",
  "levelLabel": "Avançado",
  "title": "13. Resources, inventário e save/load com validação",
  "subtitle": "Separe a definição do item, o estado da partida e o texto salvo antes de carregar dados de volta.",
  "nodesUsed": [
    "Resource",
    "ResourceLoader",
    "FileAccess",
    "JSON",
    "ConfigFile"
  ],
  "feynman": {
    "title": "A ficha da oficina e o inventário da partida",
    "explanation": "Um Martelo a Vapor tem nome, dano base e custo de vapor. Essa definição pode ser um Resource salvo como .tres e usado por vários personagens. Já quantidade e nível de uma pilha pertencem à partida: não precisam alterar a definição compartilhada. Nesta aula, cada entrada do inventário guarda um ID, uma quantidade e um nível. Ao salvar, copiamos esses dados para texto JSON. Ao carregar, primeiro conferimos o texto e o formato; só então substituímos o estado atual. Um texto legível pode conter um ID inexistente ou um nível fora do limite: interpretar JSON não significa aprovar seu conteúdo.",
    "analogies": [
      {
        "term": "Catálogo (.tres)",
        "analogy": "A ficha de fabricação informa o dano base. O jogo decide usá-la sem alterações; Resource não é imutável por natureza e pode ter métodos."
      },
      {
        "term": "Inventário em memória",
        "analogy": "A lista da bancada informa quantos itens existem e o nível da pilha. Neste exemplo, todas as unidades da mesma pilha têm o mesmo nível."
      },
      {
        "term": "Snapshot JSON",
        "analogy": "Uma fotografia dos dados no momento de salvar. Mudar a partida depois não deve modificar essa fotografia automaticamente."
      }
    ]
  },
  "howItWorks": {
    "overview": "O fluxo é catálogo → inventário → validação → texto → arquivo. Na volta: arquivo → interpretação do JSON → validação → novo inventário. IDs conhecidos resolvem as definições do catálogo; o save não fornece caminhos de scripts nem precisa repetir nome e dano calculado. Os limites desta prática são escolhas do exemplo: três tipos, quantidade 1–99, nível 1–10, ouro 0–999 e versão 1.",
    "anatomy": [
      {
        "prop": "Resource e cache",
        "desc": "O carregamento padrão reutiliza Resources em cache. Duas referências ao mesmo arquivo podem apontar para o mesmo objeto; editar uma propriedade pode afetar ambos os usuários."
      },
      {
        "prop": "duplicate() e estado separado",
        "desc": "duplicate() copia propriedades armazenadas/exportadas, mas uma cópia rasa ainda compartilha propriedades aninhadas. Aqui separamos quantidade/nível em dicionários, sem modificar o catálogo."
      },
      {
        "prop": "res:// e user://",
        "desc": "res:// identifica arquivos do projeto; na exportação, não conte com escrita nesse conteúdo. user:// é o local apropriado para dados graváveis do jogador, sujeito a erros de armazenamento."
      },
      {
        "prop": "JSON.parse e validar",
        "desc": "Análise sintática vem antes da validação de tipos, limites, versão, IDs e duplicatas. Campos extras são ignorados ao construir um estado limpo; falhas preservam o inventário atual."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "A prática principal usa dados_item.gd, oficina.gd e cofre.gd juntos. O projeto de apoio inclui os três .tres e a cena. O exemplo 3 é uma extensão opcional de configurações.",
    "duration": "70–100 min com a extensão (estimativa)",
    "prerequisite": "Aulas 3, 7 e 10: funções, sinais e interface. É necessário reconhecer Array, Dictionary, laços e retornos de função; os campos de cada registro são explicados abaixo. Referência: Godot 4.5, GDScript. O projeto de apoio não foi executado no motor neste ambiente.",
    "objectives": [
      "Criar uma definição .tres e separar seus atributos do nível/quantidade de uma pilha.",
      "Salvar e recuperar um inventário por IDs, preservando o estado atual quando a leitura ou validação falhar.",
      "Distinguir JSON, Resource e ConfigFile, explicando o que cada formato resolve e o que ainda exige tratamento."
    ],
    "practice": {
      "title": "Prática guiada: salvar a bancada e recuperar o inventário",
      "intro": "Abra o projeto de apoio ou monte a cena mínima abaixo. Não é necessário desenhar itens nem criar ações no InputMap: oficina.gd monta os controles e conecta os botões. Primeiro faça o ciclo normal; depois teste um save inválido sem arriscar dados de outro projeto.",
      "tree": "Oficina (Control) — oficina.gd\n└── VBoxContainer e controles criados pelo script\n\nres://dados_item.gd — classe DadosItem\nres://cofre.gd — classe CofreOficina\nres://itens/martelo.tres\nres://itens/pistola.tres\nres://itens/lamina.tres\n\nExtensão opcional: opcoes.gd — classe OpcoesOficina",
      "download": {
        "url": "assets/aula-13-inventario.zip",
        "label": "Baixar projeto de apoio: catálogo e inventário"
      },
      "downloadNote": "Projeto mínimo para Godot 4.5, com cena, scripts e três Resources. Revisado documentalmente; ainda não executado no motor neste ambiente. Usa um arquivo próprio em user://oficina_aula13.json.",
      "steps": [
        {
          "title": "Prepare os arquivos e a cena",
          "text": "Extraia o ZIP em outra pasta e importe project.godot pelo gerenciador da Godot 4.5. Alternativamente, crie um projeto com os scripts na raiz, uma pasta itens e uma cena Oficina de raiz Control; anexe oficina.gd e configure a janela em 640 × 640. cofre.gd e dados_item.gd definem classes, não precisam ser anexados a nós.",
          "expect": "Com F6 na cena Oficina, aparecem escolha de item, sete botões, inventário e mensagem. Se a classe não for reconhecida, confira nomes, arquivos salvos e erros de importação."
        },
        {
          "title": "Inspecione uma definição no editor",
          "text": "Abra itens/martelo.tres no Inspector: id martelo, nome Martelo a Vapor, dano_base 65 e custo_vapor 25. Para criar outro recurso do mesmo tipo, use Novo Recurso → DadosItem e salve como .tres. O catálogo do exemplo é fechado: novos IDs precisam ser registrados também em CATALOG antes de serem aceitos.",
          "expect": "Pistola usa base 28/vapor 8; lâmina usa base 42/vapor 14. O arquivo .tres armazena a definição e referencia dados_item.gd."
        },
        {
          "title": "Monte uma pilha e preveja o dano",
          "text": "Execute. Com o martelo selecionado, clique Adicionar unidade duas vezes e Melhorar pilha uma vez. Cada entrada é um Dictionary com id, quantity e level; inventory é um Array dessas entradas. Ouro começa em 50. A regra escolhida é dano_base + 12 × (nível − 1), por unidade.",
          "expect": "Martelo ×2, nível 2, dano por unidade 77. O dano base do Resource continua 65. Melhorar afeta toda a pilha; itens com níveis diferentes exigiriam outro modelo de inventário."
        },
        {
          "title": "Salve e altere a partida",
          "text": "Clique Salvar no disco e confira a mensagem. Depois melhore outra vez, remova uma unidade e ganhe ouro. Não salve de novo ainda. Abra Projeto → Abrir pasta de dados do usuário para localizar oficina_aula13.json. O texto contém version, gold e inventory; não precisa conter dano calculado ou caminhos .tres.",
          "expect": "O estado em execução passa a martelo ×1, nível 3, dano 89 e ouro 60. O arquivo anterior ainda representa ×2, nível 2 e ouro 50."
        },
        {
          "title": "Carregue e repita sem reiniciar o editor",
          "text": "Clique Carregar do disco. Depois use Reiniciar inventário: esse botão limpa só a partida para ouro 50 e inventário vazio. Carregue novamente. Encerre e execute a cena outra vez para comparar memória e disco; o carregamento é manual, não automático.",
          "expect": "O save recupera martelo ×2, nível 2 e ouro 50 nas duas cargas. Reiniciar a cena limpa a memória, mas não apaga o arquivo."
        },
        {
          "title": "Teste erros antes de aplicar os dados",
          "text": "Faça uma cópia do arquivo desta prática. Com o jogo em execução, altere level para 11, troque o ID por desconhecido ou remova uma vírgula, um caso por vez. Use Carregar. Remova temporariamente o arquivo para testar ausência. Depois restaure a cópia. Não abra ResourceLoader com um caminho vindo do save: os IDs só consultam o catálogo conhecido.",
          "expect": "Erro legível e inventário atual preservado. A leitura rejeita raiz inválida, versão diferente de 1, números fora dos limites, IDs duplicados e texto acima de 16 KiB. JSON numérico pode virar float; a validação aceita apenas valores finitos e integrais antes de converter."
        },
        {
          "title": "Compare configurações, opcionalmente",
          "text": "No fim de _ready de oficina.gd, acrescente print(OpcoesOficina.salvar(0.6, false)) e print(OpcoesOficina.carregar()). Execute, confira o retorno e o arquivo opcoes_aula13.cfg; depois retire a chamada de salvar para testar a leitura existente. O exemplo guarda volume normalizado de 0 a 1 e uma preferência booleana; não muda áudio nem a janela.",
          "expect": "A gravação retorna OK se funcionar; a leitura retorna os valores ou erro. get_value fornece padrão para chave ausente, mas não corrige um tipo inválido existente. Aplicar áudio, vídeo e teclas fica fora desta extensão."
        }
      ]
    },
    "checks": [
      {
        "question": "Dois personagens usam o mesmo .tres. O nível deve ser gravado nesse Resource?",
        "answer": "Não neste modelo: os personagens podem compartilhar a definição. A pilha guarda level separadamente. Copiar o Resource é outra opção, mas exige entender quais propriedades permanecem compartilhadas."
      },
      {
        "question": "Por que o save guarda id e level, mas não dano_total?",
        "answer": "O ID consulta o catálogo e o dano é calculado por base + 12 × (level − 1). Guardar um valor derivado criaria duas fontes que poderiam divergir. Mudanças futuras no catálogo podem exigir migração/balanceamento dos saves."
      },
      {
        "question": "JSON válido com level 11 deve substituir o inventário?",
        "answer": "Não. Interpretar texto só verifica a sintaxe. O validador rejeita level fora de 1–10 e o estado atual permanece intacto."
      },
      {
        "question": "Salvar em user:// garante que nada pode dar errado?",
        "answer": "Não. É o destino apropriado para gravação, mas abertura/escrita podem falhar. O exemplo verifica erros básicos; não implementa gravação atômica, backups automáticos, autenticação nem migração de versões."
      }
    ],
    "pitfalls": [
      {
        "title": "Resource não encontrado",
        "text": "Confira dados_item.gd, class_name DadosItem, pasta itens e os caminhos de preload. Não renomeie um ID no catálogo sem revisar os saves que dependem dele."
      },
      {
        "title": "Salvar não significa guardar referências vivas",
        "text": "JSON.stringify produz texto no instante da gravação. Alterações posteriores da partida só chegam ao arquivo ao salvar novamente. Carregar deve criar um estado separado e validado."
      },
      {
        "title": "Arquivo legível, conteúdo inválido",
        "text": "Confira versão, IDs, duplicatas, tipos e limites. A validação constrói outro dicionário antes de aplicar; não altere current parcialmente enquanto percorre dados não aprovados."
      },
      {
        "title": "Escrita direta tem limites",
        "text": "FileAccess.WRITE trunca o arquivo existente. Uma falha no meio pode perder o save anterior. Para produção, estudar escrita temporária, verificação e substituição, backup e migrações. JSON não fornece sigilo nem prova de autenticidade."
      }
    ],
    "summary": "Catálogo define o item; inventário registra a partida; snapshot captura dados em um momento. Carregar é interpretar, validar e só então substituir o estado. A pasta de destino, o formato e as verificações são decisões diferentes.",
    "next": "Na aula 14, use shaders e partículas para representar visualmente mudanças de estado, mantendo a lógica separada do efeito.",
    "sources": [
      {
        "label": "Godot 4.5 — Resources",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/scripting/resources.html"
      },
      {
        "label": "Godot 4.5 — Resource e duplicate",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_resource.html"
      },
      {
        "label": "Godot 4.5 — ResourceLoader e cache",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_resourceloader.html"
      },
      {
        "label": "Godot 4.5 — FileAccess",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_fileaccess.html"
      },
      {
        "label": "Godot 4.5 — JSON",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_json.html"
      },
      {
        "label": "Godot 4.5 — ConfigFile",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_configfile.html"
      },
      {
        "label": "Godot 4.5 — Caminhos de arquivos",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/io/data_paths.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Definição do item: dados_item.gd",
      "whenToUse": "Para guardar atributos de projeto usados por muitos itens ou personagens.",
      "description": "Uma classe Resource pode ter propriedades e métodos. Os arquivos .tres fornecem os valores. Aqui, nível e quantidade ficam fora da definição para evitar alterações involuntárias no catálogo compartilhado.",
      "code": "class_name DadosItem\nextends Resource\n\n@export var id: String = \"\"\n@export var nome: String = \"\"\n@export var dano_base: int = 0\n@export var custo_vapor: int = 0\n\nfunc dano_no_nivel(nivel: int) -> int:\n    return dano_base + 12 * (nivel - 1)\n",
      "pros": "Três itens usam a mesma estrutura e a mesma fórmula, preenchidos no Inspector.",
      "cons": "O código escolhe não alterar o catálogo; a classe Resource não impõe imutabilidade. duplicate() raso não isola todo recurso aninhado."
    },
    {
      "title": "2. Inventário e persistência: oficina.gd + cofre.gd",
      "whenToUse": "Para salvar os dados mínimos da partida e reconstruir um estado validado.",
      "description": "Dois arquivos que coexistem: oficina.gd vai no Control; cofre.gd é uma classe auxiliar. O validador normaliza números, resolve IDs conhecidos e recusa o documento inteiro se uma entrada falhar. O projeto de apoio já contém os arquivos separados.",
      "code": "# ARQUIVO: oficina.gd\nextends Control\n\n# Não alteramos os Resources do catálogo para guardar progresso.\nconst CATALOG := {\n    \"martelo\": preload(\"res://itens/martelo.tres\"),\n    \"pistola\": preload(\"res://itens/pistola.tres\"),\n    \"lamina\": preload(\"res://itens/lamina.tres\")\n}\nvar current: Dictionary = {\"version\": 1, \"gold\": 50, \"inventory\": []}\nvar choice: OptionButton\nvar readout: Label\nvar status: Label\n\nfunc _ready() -> void:\n    var box := VBoxContainer.new()\n    box.position = Vector2(24, 24)\n    box.custom_minimum_size.x = 580\n    add_child(box)\n    choice = OptionButton.new()\n    for id in CATALOG:\n        var item: DadosItem = CATALOG[id]\n        choice.add_item(item.nome)\n        choice.set_item_metadata(choice.item_count - 1, id)\n    box.add_child(choice)\n    for spec in [\n        [\"Adicionar unidade\", adicionar], [\"Melhorar pilha\", melhorar],\n        [\"Remover unidade\", remover], [\"Ganhar 10 de ouro\", ganhar_ouro],\n        [\"Salvar no disco\", salvar], [\"Carregar do disco\", carregar],\n        [\"Reiniciar inventário (preserva save)\", reiniciar]\n    ]:\n        var button := Button.new()\n        button.text = spec[0]\n        button.pressed.connect(spec[1])\n        box.add_child(button)\n    readout = Label.new()\n    box.add_child(readout)\n    status = Label.new()\n    status.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(status)\n    mostrar(\"Escolha um item. O catálogo não muda ao melhorar a pilha.\")\n\nfunc escolhido() -> String:\n    return str(choice.get_item_metadata(choice.selected))\n\nfunc indice() -> int:\n    for i in range(current[\"inventory\"].size()):\n        if current[\"inventory\"][i][\"id\"] == escolhido():\n            return i\n    return -1\n\nfunc adicionar() -> void:\n    var i := indice()\n    if i < 0:\n        current[\"inventory\"].append({\"id\": escolhido(), \"quantity\": 1, \"level\": 1})\n    elif current[\"inventory\"][i][\"quantity\"] < 99:\n        current[\"inventory\"][i][\"quantity\"] += 1\n    else:\n        mostrar(\"Limite: 99 unidades por pilha.\")\n        return\n    mostrar(\"Unidade adicionada.\")\n\nfunc melhorar() -> void:\n    var i := indice()\n    if i < 0:\n        mostrar(\"Adicione o item antes de melhorar.\")\n        return\n    if current[\"inventory\"][i][\"level\"] >= 10:\n        mostrar(\"Nível máximo: 10.\")\n        return\n    current[\"inventory\"][i][\"level\"] += 1\n    mostrar(\"Nível da pilha aumentado; catálogo preservado.\")\n\nfunc remover() -> void:\n    var i := indice()\n    if i < 0:\n        mostrar(\"Item ausente.\")\n        return\n    current[\"inventory\"][i][\"quantity\"] -= 1\n    if current[\"inventory\"][i][\"quantity\"] == 0:\n        current[\"inventory\"].remove_at(i)\n    mostrar(\"Unidade removida.\")\n\nfunc ganhar_ouro() -> void:\n    current[\"gold\"] = mini(999, current[\"gold\"] + 10)\n    mostrar(\"Ouro atualizado.\")\n\nfunc salvar() -> void:\n    var result := CofreOficina.salvar(current, CATALOG)\n    mostrar(result[\"message\"])\n\nfunc carregar() -> void:\n    var result := CofreOficina.carregar(CATALOG)\n    if result[\"ok\"]:\n        current = result[\"state\"]\n    mostrar(result[\"message\"] + \" Estado anterior preservado em caso de erro.\")\n\nfunc reiniciar() -> void:\n    current = {\"version\": 1, \"gold\": 50, \"inventory\": []}\n    mostrar(\"Inventário reiniciado. O arquivo salvo foi preservado.\")\n\nfunc mostrar(message: String) -> void:\n    var lines := PackedStringArray([\"Ouro: %d\" % current[\"gold\"]])\n    for entry in current[\"inventory\"]:\n        var item: DadosItem = CATALOG[entry[\"id\"]]\n        lines.append(\"%s ×%d | nível %d | dano %d\" % [\n            item.nome, entry[\"quantity\"], entry[\"level\"], item.dano_no_nivel(entry[\"level\"])])\n    readout.text = \"\\n\".join(lines)\n    status.text = message\n\n# ARQUIVO: cofre.gd — salve separadamente\nclass_name CofreOficina\nextends RefCounted\n\nconst PATH := \"user://oficina_aula13.json\"\nconst MAX_BYTES := 16384\n\nstatic func falha(message: String) -> Dictionary:\n    return {\"ok\": false, \"message\": message}\n\nstatic func inteiro_entre(value: Variant, low: int, high: int) -> bool:\n    if typeof(value) != TYPE_INT and typeof(value) != TYPE_FLOAT:\n        return false\n    var number := float(value)\n    return is_finite(number) and number == floor(number) and number >= low and number <= high\n\nstatic func validar(value: Variant, catalog: Dictionary) -> Dictionary:\n    if not value is Dictionary:\n        return falha(\"Raiz precisa ser um objeto.\")\n    if not inteiro_entre(value.get(\"version\"), 1, 1):\n        return falha(\"Versão não suportada; este exemplo só lê a versão 1.\")\n    if not inteiro_entre(value.get(\"gold\"), 0, 999):\n        return falha(\"Ouro deve ser inteiro entre 0 e 999.\")\n    var entries: Variant = value.get(\"inventory\")\n    if not entries is Array or entries.size() > 3:\n        return falha(\"Inventário deve ser uma lista com até três tipos.\")\n    var clean: Array = []\n    var seen: Dictionary = {}\n    for entry in entries:\n        if not entry is Dictionary:\n            return falha(\"Entrada do inventário deve ser um objeto.\")\n        var id: Variant = entry.get(\"id\")\n        if not id is String or not catalog.has(id) or seen.has(id):\n            return falha(\"ID desconhecido ou repetido.\")\n        if not inteiro_entre(entry.get(\"quantity\"), 1, 99):\n            return falha(\"Quantidade deve estar entre 1 e 99.\")\n        if not inteiro_entre(entry.get(\"level\"), 1, 10):\n            return falha(\"Nível deve estar entre 1 e 10.\")\n        seen[id] = true\n        clean.append({\"id\": id, \"quantity\": int(entry[\"quantity\"]), \"level\": int(entry[\"level\"])})\n    return {\"ok\": true, \"message\": \"Dados validados.\", \"state\": {\n        \"version\": 1, \"gold\": int(value[\"gold\"]), \"inventory\": clean}}\n\nstatic func ler_texto(text: String, catalog: Dictionary) -> Dictionary:\n    if text.to_utf8_buffer().size() > MAX_BYTES:\n        return falha(\"Texto excede 16 KiB.\")\n    var parser := JSON.new()\n    if parser.parse(text) != OK:\n        return falha(\"JSON inválido na linha %d: %s\" % [parser.get_error_line(), parser.get_error_message()])\n    return validar(parser.data, catalog)\n\nstatic func salvar(value: Dictionary, catalog: Dictionary) -> Dictionary:\n    var result := validar(value, catalog)\n    if not result[\"ok\"]:\n        return result\n    var text := JSON.stringify(result[\"state\"], \"  \")\n    var file := FileAccess.open(PATH, FileAccess.WRITE)\n    if file == null:\n        return falha(\"Falha ao abrir para escrita: %s\" % error_string(FileAccess.get_open_error()))\n    var written := file.store_string(text)\n    file.flush()\n    var error := file.get_error()\n    file.close()\n    if not written or error != OK:\n        return falha(\"Falha na escrita; confira o arquivo antes de continuar.\")\n    return {\"ok\": true, \"message\": \"Gravado em \" + PATH}\n\nstatic func carregar(catalog: Dictionary) -> Dictionary:\n    if not FileAccess.file_exists(PATH):\n        return falha(\"Ainda não há save. Salve antes de carregar.\")\n    var file := FileAccess.open(PATH, FileAccess.READ)\n    if file == null:\n        return falha(\"Falha ao abrir para leitura: %s\" % error_string(FileAccess.get_open_error()))\n    if file.get_length() > MAX_BYTES:\n        file.close()\n        return falha(\"Arquivo excede 16 KiB.\")\n    var text := file.get_as_text()\n    file.close()\n    return ler_texto(text, catalog)\n",
      "pros": "Permite repetir salvar → alterar → carregar e testar erros mantendo o estado da partida.",
      "cons": "Escrita direta, um slot e versão 1. Não implementa operação atômica, cópias de recuperação, migração, criptografia ou autenticação."
    },
    {
      "title": "3. Extensão opcional: opcoes.gd com ConfigFile",
      "whenToUse": "Para guardar poucas preferências organizadas em seções e chaves.",
      "description": "Guarda volume e tela_cheia como dados. O uso em _ready está no último passo da prática. O código distingue primeiro uso de falha de leitura, verifica o retorno de save e valida tipos/limites antes de devolver opções.",
      "code": "class_name OpcoesOficina\nextends RefCounted\n# Extensão opcional. Não controla volume real nem modo de janela.\nconst PATH := \"user://opcoes_aula13.cfg\"\n\nstatic func salvar(volume: float, tela_cheia: bool) -> Error:\n    if not is_finite(volume) or volume < 0.0 or volume > 1.0:\n        return ERR_INVALID_DATA\n    var cfg := ConfigFile.new()\n    cfg.set_value(\"audio\", \"volume\", volume)\n    cfg.set_value(\"video\", \"tela_cheia\", tela_cheia)\n    return cfg.save(PATH)\n\nstatic func carregar() -> Dictionary:\n    var defaults := {\"ok\": true, \"volume\": 0.8, \"tela_cheia\": false, \"message\": \"Padrões do primeiro uso.\"}\n    if not FileAccess.file_exists(PATH):\n        return defaults\n    var cfg := ConfigFile.new()\n    var error := cfg.load(PATH)\n    if error != OK:\n        return {\"ok\": false, \"message\": \"Erro ao ler opções: \" + error_string(error)}\n    var volume: Variant = cfg.get_value(\"audio\", \"volume\", 0.8)\n    var full: Variant = cfg.get_value(\"video\", \"tela_cheia\", false)\n    if (typeof(volume) != TYPE_INT and typeof(volume) != TYPE_FLOAT) or not full is bool:\n        return {\"ok\": false, \"message\": \"Tipos inválidos nas opções.\"}\n    var number := float(volume)\n    if not is_finite(number) or number < 0.0 or number > 1.0:\n        return {\"ok\": false, \"message\": \"Volume fora de 0 a 1.\"}\n    return {\"ok\": true, \"volume\": number, \"tela_cheia\": full, \"message\": \"Opções lidas.\"}\n",
      "pros": "Formato legível por seções e padrão explícito quando a chave não existe.",
      "cons": "Ainda precisa validar valores existentes e tratar falhas. Esta extensão não aplica AudioServer, DisplayServer ou InputMap."
    }
  ],
  "simulator": {
    "type": "resource_forge",
    "title": "Laboratório: catálogo, inventário e snapshot",
    "description": "Modelo JavaScript por ações, sem animação automática. Catálogo de três tipos; cada pilha guarda ID, quantidade 1–99 e nível 1–10. Dano/unidade = base + 12 × (nível − 1). O snapshot é texto em memória desta aula: não grava em user://, localStorage nem disco e se perde ao sair/recarregar. Não executa Resource, cache da Godot, FileAccess ou GDScript. JSON.parse do navegador pode ter regras sintáticas diferentes de JSON.parse da Godot.",
    "guide": [
      {
        "title": "Preveja e salve",
        "text": "Adicione martelo duas vezes e melhore uma: ×2, nível 2, dano/unidade 77. Salve o snapshot. Melhore outra vez: o inventário muda, o texto salvo permanece no nível 2."
      },
      {
        "title": "Reinicie e recupere",
        "text": "Reiniciar inventário limpa a partida e preserva o texto. Carregar recupera os dados validados. Com foco na cena: S salva, L carrega e R reinicia. Os mesmos comandos estão nos botões."
      },
      {
        "title": "Teste antes de aplicar",
        "text": "Prepare JSON inválido ou ID desconhecido e carregue: deve aparecer erro sem alterar o inventário. Também pode editar o texto. Restaurar laboratório esvazia tanto o inventário quanto o snapshot."
      }
    ]
  },
  "quiz": {
    "question": "O save tem JSON legível, mas uma pilha usa um ID que não existe no catálogo. Como o carregador desta prática deve agir?",
    "options": [
      "Criar automaticamente um Resource pelo caminho que vier no save.",
      "Aplicar as entradas válidas e apagar as demais sem informar o jogador.",
      "Rejeitar a carga e preservar o inventário atual, explicando o problema.",
      "Aceitar o ID, pois JSON legível já garante que o inventário é válido."
    ],
    "correctIndex": 2,
    "feedback": [
      "O save só fornece IDs do catálogo conhecido; não carrega scripts ou Resources por um caminho recebido.",
      "Este exemplo valida o documento inteiro antes de aplicar. Recuperação parcial precisaria de outra política explícita.",
      "Correto: ID conhecido faz parte do contrato, além de JSON legível.",
      "JSON pode ser sintaticamente válido e ainda violar tipos, IDs ou limites do jogo."
    ],
    "explanation": "A sintaxe é só a primeira etapa. Este contrato exige IDs conhecidos e aprova o documento inteiro antes de substituir o estado atual. A política de recuperação/migração poderia ser diferente em outro projeto, mas teria de ser explícita."
  }
},

{
  "id": "2d-adv-shaders-particles",
  "area": "2d",
  "level": "avancado",
  "levelLabel": "Avançado",
  "title": "14. Shaders 2D: flash, coordenadas UV e partículas",
  "subtitle": "Controle a aparência sem confundir o efeito visual com o estado do jogo e aprenda a repetir uma rajada.",
  "nodesUsed": [
    "ShaderMaterial",
    "Sprite2D",
    "GPUParticles2D",
    "ParticleProcessMaterial",
    "CurveTexture"
  ],
  "feynman": {
    "title": "A pintura da peça e o emissor de vapor",
    "explanation": "O inventário da aula anterior guarda o estado do item; um shader muda como uma superfície é desenhada. Um flash branco pode sinalizar um acerto, mas não calcula dano nem altera a colisão. No estágio fragment, o programa calcula a cor de saída de fragmentos da superfície. Uma coordenada UV informa onde ler a textura; variar essa leitura produz ondulação sem mover a geometria. Partículas são outro sistema: o emissor cria elementos com idade e movimento próprios. A comparação com pintura e vapor ajuda a separar as responsabilidades; ela não descreve a arquitetura real da GPU nem garante desempenho.",
    "analogies": [
      {
        "term": "Shader e ShaderMaterial",
        "analogy": "O shader contém as instruções; o material guarda o programa e seus parâmetros. Dois materiais podem usar o mesmo shader com valores diferentes."
      },
      {
        "term": "UV e alfa",
        "analogy": "UV localiza a amostra da textura. O canal alfa controla transparência; mudar RGB não exige tornar as margens transparentes opacas."
      },
      {
        "term": "Emissão e vida",
        "analogy": "Desligar a torneira impede novas partículas, mas as já emitidas podem continuar até o fim da vida. Reiniciar a rajada é outra ação."
      }
    ]
  },
  "howItWorks": {
    "overview": "Comece por um flash com intensidade entre 0 e 1. Depois desloque a coordenada de leitura: amostra.x = UV.x + amplitude × sin(UV.y × frequência + tempo × velocidade). Frequência e fase usam radianos; amplitude é uma fração da largura da textura, não uma distância do personagem. Por último, configure um ParticleProcessMaterial no process_material do emissor. O material visual de um Sprite2D e o material de processamento de partículas têm funções distintas.",
    "anatomy": [
      {
        "prop": "fragment(), COLOR e alfa",
        "desc": "Neste estágio, COLOR já inclui a textura e a modulação do CanvasItem. O flash simples mistura apenas RGB com branco e preserva COLOR.a. unshaded isola a comparação das luzes da cena."
      },
      {
        "prop": "uniform e set_shader_parameter",
        "desc": "uniform expõe um valor configurável. Alterar um ShaderMaterial compartilhado muda seus usuários; a prática cria materiais diferentes para A e B, usando o mesmo shader."
      },
      {
        "prop": "UV, tempo e margem",
        "desc": "A onda consulta outra posição na textura; não é um shader que lê o fundo da tela. O exemplo usa tempo fornecido pelo script para poder reiniciar e acompanhar a pausa do processo; TIME nativo não para com a pausa da árvore."
      },
      {
        "prop": "amount, lifetime e restart",
        "desc": "Com amount_ratio=1, a taxa contínua nominal é amount/lifetime. one_shot limita o ciclo; explosiveness=1 concentra o nascimento da rajada. restart limpa partículas existentes e permite repetir; finished informa o fim no modo one_shot."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "O projeto usa oficina.gd, onda_flash.gdshader e emissor.gd juntos. flash.gdshader é um exemplo isolado para estudar a mistura antes da onda. O terceiro exemplo configura o emissor real da prática.",
    "duration": "70–100 min, incluindo variações (estimativa)",
    "prerequisite": "Aulas 6, 9, 10 e 13: Sprite2D, delta, sinais, interface e Resources compartilhados. Referência: Godot 4.5, GDScript e linguagem de shaders da Godot. O projeto usa Compatibility; execução e comparação entre renderizadores ainda precisam ser feitas no motor.",
    "objectives": [
      "Misturar RGB preservando alfa e separar parâmetros de dois materiais que usam o mesmo shader.",
      "Prever uma consulta UV deslocada e distinguir deformação de textura, geometria e leitura do fundo.",
      "Configurar uma rajada com vida definida, repetir com restart e distinguir emissão contínua de partículas ainda vivas."
    ],
    "practice": {
      "title": "Prática guiada: duas placas e uma rajada repetível",
      "intro": "Use as imagens fornecidas e uma cena mínima. A primeira placa é o alvo do efeito; a segunda permite observar compartilhamento. O script cria a interface e os nós, para concentrar a prática em materiais e no emissor.",
      "tree": "Oficina (Node2D) — oficina.gd\n├── Sprite A (criado pelo script) — placa.svg + ShaderMaterial A\n├── Sprite B (criado pelo script) — placa.svg + ShaderMaterial B\n├── Emissor (GPUParticles2D criado pelo script) — emissor.gd\n│   ├── Texture: vapor.svg\n│   └── Process Material: ParticleProcessMaterial criado por código\n└── CanvasLayer / VBoxContainer / botões e leitura (criados pelo script)\n\nonda_flash.gdshader — programa compartilhado pelos dois materiais\nflash.gdshader — estudo isolado, não precisa ser instalado junto",
      "download": {
        "url": "assets/aula-14-shaders-particulas.zip",
        "label": "Baixar projeto de apoio: shaders e partículas"
      },
      "downloadNote": "Cena mínima, dois shaders, dois scripts e duas imagens SVG. Projeto para Godot 4.5; revisado documentalmente, ainda não executado no motor neste ambiente.",
      "steps": [
        {
          "title": "Abra a oficina e localize os objetos",
          "text": "Extraia o ZIP em outra pasta, importe project.godot na Godot 4.5 e abra oficina.tscn. A raiz é Node2D com oficina.gd; a janela é 640 × 560. Com F6, o script cria duas placas e o emissor, além dos botões. Na árvore Remote, inspecione os Sprite2D e o GPUParticles2D criados durante a execução.",
          "expect": "A está à esquerda, B ao centro e o cano do emissor está à direita. Inicialmente não há rajada ativa. As imagens estão no ZIP; não há dependência de arte externa."
        },
        {
          "title": "Estude o flash antes da onda",
          "text": "Leia flash.gdshader no exemplo 1. Para experimentá-lo isoladamente, crie um Sprite2D com placa.svg, um ShaderMaterial novo em Material e associe esse shader ao campo Shader. Ajuste intensidade para 0, 0.5 e 1 no Inspector do material. No projeto pronto, use Disparar flash ou F: um pulso de 0,4 s volta gradualmente a zero.",
          "expect": "A parte opaca pode ficar branca; a margem transparente continua transparente. O círculo central tem transparência parcial. Aumentar o flash não aumenta os pontos de vida nem muda a forma de colisão."
        },
        {
          "title": "Compare material e programa compartilhados",
          "text": "Na oficina, pressione F e observe B sem efeito. Ambos os materiais usam EFFECT, mas são objetos ShaderMaterial diferentes. Use Compartilhar / separar materiais ou M e pressione F novamente. Depois separe. Esta é uma continuação do problema de referências da aula 13; não é necessário duplicar o arquivo .gdshader.",
          "expect": "Com o mesmo objeto de material, A e B piscam juntos. Ao separar, só A recebe os parâmetros atualizados. Local to Scene é outra estratégia ligada à instanciação de cenas, não uma correção retroativa universal."
        },
        {
          "title": "Preveja a coordenada de leitura",
          "text": "Use Alternar onda ou O: amplitude muda para 0,05. No shader combinado, frequência é aproximadamente 2π e velocidade é 2 rad/s. Em UV=(0,50; 0,25), tempo zero dá seno de π/2=1, portanto amostra.x=0,55. Em uma textura de 160 px, amplitude 0,05 corresponde a no máximo 8 px de deslocamento da consulta. VERTEX não é alterado.",
          "expect": "O conteúdo parece ondular dentro da mesma superfície. Deslocar a consulta para a direita pode fazer o padrão aparecer à esquerda. Isso não distorce o cenário atrás da placa; screen-reading é outro tópico."
        },
        {
          "title": "Confira transparência e tempo",
          "text": "A imagem tem margem transparente de 32 px; 8 px de deslocamento cabem nela. Não existe uma regra universal de “dois pixels”. O shader trata UV fora de 0–1 como transparente e transporta a modulação do item por varying. O script envia tempo a cada _process; ao restaurar, o relógio volta a zero. TIME nativo também sofre rollover e não obedece à pausa da árvore.",
          "expect": "Sem repetição de borda nem margens brancas. O efeito não usa física. Ao pausar os processos no depurador, confira o comportamento do uniform tempo e compare depois com uma cópia que usa TIME."
        },
        {
          "title": "Configure e repita uma rajada",
          "text": "Leia emissor.gd. amount=24, lifetime=1.5, one_shot=true, explosiveness=1, emitting inicialmente false. O ParticleProcessMaterial define direção para cima, velocidades 50–80, gravidade (0,-20,0), escala e uma CurveTexture de alfa decrescente. Use P ou Disparar / repetir rajada. Espere o fim e repita; repetir antes do fim limpa as anteriores por escolha desta prática.",
          "expect": "finished aumenta o contador no modo one_shot. O nó é preservado para reúso; não conectamos queue_free no emissor reutilizável. Use restart em vez de depender apenas de emitting=true para a repetição imediata."
        },
        {
          "title": "Faça uma variação e restaure",
          "text": "Pare a execução e, em uma cópia de emissor.gd, troque one_shot para false e explosiveness para 0. Defina emitting=true depois da configuração. Com amount=24, amount_ratio=1 e lifetime=1.5, a taxa nominal contínua é 16 partículas/s. Desligue Emitting no Remote Inspector: observe a vida residual. R ou Restaurar oficina recria o emissor e repõe os shaders; não exige fechar o jogo.",
          "expect": "Na emissão contínua, finished não sinaliza cada ciclo. Parar emissão não é apagar imediatamente as partículas vivas. A prática não mede FPS; compare CPU/GPU no profiler antes de escolher outra implementação."
        }
      ]
    },
    "checks": [
      {
        "question": "Por que o branco não deve preencher a margem transparente?",
        "answer": "O flash mistura RGB, mas conserva o alfa de origem. Se a margem tem alfa zero, ela continua invisível. Um shader que troca toda a cor por vec4(1) perde essa informação."
      },
      {
        "question": "amplitude 0,05 significa mover o nó cinco pixels?",
        "answer": "Não. É uma fração da largura usada na consulta da textura: até 8 px em uma textura de 160 px. A transformação do nó e seus vértices não mudam neste exemplo."
      },
      {
        "question": "Como fazer B piscar de modo independente sem copiar o programa?",
        "answer": "Usar outro ShaderMaterial com o mesmo shader e parâmetros próprios, como a prática faz. Alterar um objeto de material ainda compartilhado afeta todos os seus usuários."
      },
      {
        "question": "Por que desligar emissão não apaga tudo e finished não ocorre continuamente?",
        "answer": "As partículas existentes conservam sua vida. finished é sinal de conclusão do modo one_shot; a emissão contínua não encerra uma rajada a cada intervalo de lifetime."
      }
    ],
    "pitfalls": [
      {
        "title": "Todos os sprites piscam",
        "text": "Confira se A e B receberam o mesmo ShaderMaterial. Um shader compartilhado com materiais diferentes é esperado; o que precisa variar são os parâmetros de cada objeto de material."
      },
      {
        "title": "Borda cortada ou repetida",
        "text": "Confira amplitude, margem, UV e filtragem. UV desloca a amostra dentro da superfície; não amplia sua geometria. Efeitos que precisam ler o fundo exigem outra técnica."
      },
      {
        "title": "Partículas não aparecem ou desaparecem cedo",
        "text": "Confira emitting/restart, Texture, Process Material, direção, escala e visibility_rect. O retângulo precisa cobrir o movimento; ajustá-lo não altera a trajetória física."
      },
      {
        "title": "Roda no navegador, mas ainda precisa da Godot",
        "text": "O laboratório usa Canvas e matemática JavaScript. Ele não compila GLSL/Godot shaders, não simula a GPU e não mede desempenho. A prática real ainda precisa ser executada na versão e renderizador declarados."
      }
    ],
    "summary": "O shader controla a aparência; seus parâmetros pertencem ao material ou ao mecanismo de instância escolhido. UV determina onde ler, alfa preserva transparência e o emissor controla nascimentos e vida. Repetir um efeito precisa de uma ação definida, não de recarregar a página.",
    "next": "Na aula 15, revise organização de cenas e carregamento, mantendo efeitos visuais separados da lógica da partida.",
    "sources": [
      {
        "label": "Godot 4.5 — CanvasItem shaders",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/shaders/shader_reference/canvas_item_shader.html"
      },
      {
        "label": "Godot 4.5 — ShaderMaterial",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_shadermaterial.html"
      },
      {
        "label": "Godot 4.5 — GPUParticles2D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_gpuparticles2d.html"
      },
      {
        "label": "Godot 4.5 — ParticleProcessMaterial",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_particleprocessmaterial.html"
      },
      {
        "label": "Godot 4.5 — Renderizadores",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/rendering/renderers.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Flash isolado: preservar alfa",
      "whenToUse": "Para estudar mistura de cor sem ondulação.",
      "description": "Salve como flash.gdshader e instale em um ShaderMaterial de Sprite2D. No projeto pronto, o shader combinado já contém o mesmo princípio. COLOR inclui textura e modulação no fragment; o modo unshaded evita luzes na comparação.",
      "code": "shader_type canvas_item;\nrender_mode unshaded;\n\nuniform float intensidade : hint_range(0.0, 1.0) = 0.0;\n\nvoid fragment() {\n    // COLOR já inclui textura, modulate e self_modulate neste estágio.\n    vec4 origem = COLOR;\n    COLOR = vec4(mix(origem.rgb, vec3(1.0), clamp(intensidade, 0.0, 1.0)), origem.a);\n}\n",
      "pros": "Expõe uma intensidade e preserva o recorte transparente.",
      "cons": "É um efeito visual; não representa dano, colisão nem desempenho medido.",
      "language": "Shader Godot · canvas_item"
    },
    {
      "title": "2. Onda UV e controlador da oficina",
      "whenToUse": "Na prática principal com duas placas, botões e parâmetros independentes.",
      "description": "Dois arquivos separados: onda_flash.gdshader e oficina.gd, que também usa emissor.gd do exemplo 3. O shader recebe um relógio do controlador em vez de TIME. Os nós e sinais são criados no _ready; o projeto de apoio já contém tudo instalado.",
      "code": "// ARQUIVO: onda_flash.gdshader\nshader_type canvas_item;\nrender_mode unshaded;\n\nuniform float intensidade : hint_range(0.0, 1.0) = 0.0;\nuniform float amplitude : hint_range(0.0, 0.1) = 0.0;\nuniform float frequencia = 6.283185;\nuniform float velocidade = 2.0;\nuniform float tempo = 0.0;\nvarying vec4 tom_do_item;\n\nvoid vertex() {\n    tom_do_item = COLOR;\n}\n\nvoid fragment() {\n    vec2 amostra = UV;\n    amostra.x += amplitude * sin(UV.y * frequencia + tempo * velocidade);\n    if (amostra.x < 0.0 || amostra.x > 1.0 || amostra.y < 0.0 || amostra.y > 1.0) {\n        COLOR = vec4(0.0);\n    } else {\n        vec4 origem = texture(TEXTURE, amostra) * tom_do_item;\n        COLOR = vec4(mix(origem.rgb, vec3(1.0), clamp(intensidade, 0.0, 1.0)), origem.a);\n    }\n}\n\n# ARQUIVO: oficina.gd — salve separadamente\nextends Node2D\n\nconst EFFECT = preload(\"res://onda_flash.gdshader\")\nconst EMITTER = preload(\"res://emissor.gd\")\nvar sprite_a: Sprite2D\nvar sprite_b: Sprite2D\nvar mat_a: ShaderMaterial\nvar mat_b: ShaderMaterial\nvar emitter: GPUParticles2D\nvar readout: Label\nvar clock: float = 0.0\nvar flash_age: float = 0.4\nvar wave_on: bool = false\nvar shared: bool = false\nvar finishes: int = 0\n\nfunc _draw() -> void:\n    draw_rect(Rect2(502, 250, 36, 20), Color(\"a66b3f\"))\n    draw_rect(Rect2(502, 250, 36, 20), Color(\"edc781\"), false, 2.0)\n\nfunc _ready() -> void:\n    mat_a = ShaderMaterial.new()\n    mat_a.shader = EFFECT\n    mat_b = ShaderMaterial.new()\n    mat_b.shader = EFFECT\n    sprite_a = criar_sprite(Vector2(140, 170), mat_a)\n    sprite_b = criar_sprite(Vector2(330, 170), mat_b)\n    criar_emissor()\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var box := VBoxContainer.new()\n    box.position = Vector2(16, 310)\n    box.custom_minimum_size.x = 608\n    layer.add_child(box)\n    for spec in [[\"F · Disparar flash\", disparar_flash], [\"O · Alternar onda\", alternar_onda],\n        [\"M · Compartilhar / separar materiais\", alternar_material],\n        [\"P · Disparar / repetir rajada\", disparar_rajada], [\"R · Restaurar oficina\", restaurar]]:\n        var button := Button.new()\n        button.text = spec[0]\n        button.pressed.connect(spec[1])\n        box.add_child(button)\n    readout = Label.new()\n    readout.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(readout)\n\nfunc criar_sprite(at: Vector2, material_instance: ShaderMaterial) -> Sprite2D:\n    var sprite := Sprite2D.new()\n    sprite.texture = preload(\"res://placa.svg\")\n    sprite.texture_filter = CanvasItem.TEXTURE_FILTER_NEAREST\n    sprite.material = material_instance\n    sprite.position = at\n    add_child(sprite)\n    return sprite\n\nfunc criar_emissor() -> void:\n    emitter = EMITTER.new()\n    emitter.position = Vector2(520, 250)\n    emitter.finished.connect(func(): finishes += 1)\n    add_child(emitter)\n\nfunc _process(delta: float) -> void:\n    clock += delta\n    flash_age = minf(0.4, flash_age + delta)\n    mat_a.set_shader_parameter(\"tempo\", clock)\n    mat_a.set_shader_parameter(\"intensidade\", maxf(0.0, 1.0 - flash_age / 0.4))\n    mat_a.set_shader_parameter(\"amplitude\", 0.05 if wave_on else 0.0)\n    readout.text = \"A à esquerda; B ao centro; vapor à direita.\\nMaterial: %s | onda: %s | rajadas concluídas: %d\" % [\n        \"compartilhado\" if shared else \"independente\", str(wave_on), finishes]\n\nfunc disparar_flash() -> void:\n    flash_age = 0.0\n\nfunc alternar_onda() -> void:\n    wave_on = not wave_on\n\nfunc alternar_material() -> void:\n    shared = not shared\n    sprite_b.material = mat_a if shared else mat_b\n\nfunc disparar_rajada() -> void:\n    # Limpa partículas anteriores e inicia outro ciclo, inclusive após finished.\n    emitter.restart(true)\n\nfunc restaurar() -> void:\n    clock = 0.0\n    flash_age = 0.4\n    wave_on = false\n    shared = false\n    finishes = 0\n    sprite_b.material = mat_b\n    remove_child(emitter)\n    emitter.queue_free()\n    criar_emissor()\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo:\n        return\n    if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n        return\n    match event.keycode:\n        KEY_F: disparar_flash()\n        KEY_O: alternar_onda()\n        KEY_M: alternar_material()\n        KEY_P: disparar_rajada()\n        KEY_R: restaurar()\n",
      "pros": "Permite comparar materiais, reiniciar o relógio e repetir efeitos por botões ou teclas.",
      "cons": "Não lê o fundo da tela nem desloca vértices. Misturar linguagem de shader e GDScript no mesmo arquivo causará erro; use os arquivos separados do ZIP.",
      "language": "Shader e GDScript · arquivos separados"
    },
    {
      "title": "3. Emissor reutilizável: vida e rajada",
      "whenToUse": "No GPUParticles2D criado pelo controlador.",
      "description": "emissor.gd configura o nó em _ready. O controlador chama restart(true) e conta finished; o emissor não se destrói. Para um efeito descartável em outra cena, finished pode liberar o nó, mas essa política impediria reutilizar a mesma instância.",
      "code": "extends GPUParticles2D\n\nfunc _ready() -> void:\n    emitting = false\n    amount = 24\n    lifetime = 1.5\n    one_shot = true\n    explosiveness = 1.0\n    randomness = 0.0\n    local_coords = true\n    fixed_fps = 60\n    use_fixed_seed = true\n    seed = 14\n    texture = preload(\"res://vapor.svg\")\n    visibility_rect = Rect2(-150, -220, 300, 260)\n\n    var motion := ParticleProcessMaterial.new()\n    motion.particle_flag_disable_z = true\n    motion.direction = Vector3(0, -1, 0)\n    motion.spread = 20.0\n    motion.initial_velocity_min = 50.0\n    motion.initial_velocity_max = 80.0\n    motion.gravity = Vector3(0, -20, 0)\n    motion.scale_min = 2.0\n    motion.scale_max = 4.0\n    motion.color = Color(0.75, 0.9, 0.95, 0.8)\n    var fade := Curve.new()\n    fade.add_point(Vector2(0, 1))\n    fade.add_point(Vector2(1, 0))\n    var fade_texture := CurveTexture.new()\n    fade_texture.curve = fade\n    motion.alpha_curve = fade_texture\n    process_material = motion\n\r\n",
      "pros": "Textura, material de processamento, curva e limites estão explícitos.",
      "cons": "Não é uma simulação física de vapor. Driver, renderizador, quantidade e área de partículas precisam de teste no hardware-alvo; CPUParticles2D não é uma garantia universal de maior compatibilidade ou desempenho."
    }
  ],
  "simulator": {
    "type": "shader_particles_2d",
    "title": "Laboratório: amostragem UV, materiais e emissão",
    "description": "Modelo didático em Canvas/JavaScript: duas placas procedurais amostradas em uma grade de 64 × 64; mistura de canais RGB numéricos e alfa preservado. Não executa shaders Godot, WebGL, GPUParticles2D nem mede custo de GPU. A onda desloca a consulta UV, não a geometria. Partículas usam nascimentos determinísticos, vida uniforme e trajetória analítica; não reproduzem toda a aleatoriedade ou o processamento da Godot. A pausa congela o relógio; controles continuam ativos.",
    "guide": [
      {
        "title": "Preveja a amostra",
        "text": "Pause, restaure o laboratório e ajuste os controles mantendo tempo zero. Com amplitude 0,05, frequência 2π e sonda (0,50; 0,25), U lido é 0,55. Flash manual 0,5 mistura o cobre (200,125,50) com branco: RGB arredondado (228,190,153), alfa 1."
      },
      {
        "title": "Repita sem recarregar",
        "text": "Com foco na cena: F dispara flash, P reinicia rajada, E alterna emissão contínua e R restaura. Há botões equivalentes. Em pausa, use Avançar 0,25 s. Rajada repõe N partículas; repetir limpa as anteriores."
      },
      {
        "title": "Separe nascer e permanecer",
        "text": "N=24 e T=1,5 s dão 16 partículas/s no modo contínuo. Desligar emissão mantém as vivas até morrerem. Mudar modo, N ou T limpa e para o emissor por escolha do modelo; ligue/dispare de novo."
      }
    ]
  },
  "quiz": {
    "question": "A rajada one_shot já terminou e você quer disparar imediatamente outra usando o mesmo emissor. Qual ação corresponde ao projeto desta aula?",
    "options": [
      "Chamar restart no emissor, aceitando que as partículas anteriores sejam limpas.",
      "Criar outro shader para obrigar o sinal finished a ocorrer no modo contínuo.",
      "Ativar emitting e supor que ele sempre reinicia imediatamente em qualquer condição.",
      "Recarregar a cena inteira porque um emissor só pode ser usado uma vez."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto.",
      "finished está ligado ao fim de one_shot; um novo shader não altera esse contrato.",
      "A referência documenta uma possível espera com emitting; restart permite a repetição imediata.",
      "O nó pode ser reutilizado. A prática o preserva e oferece uma ação para repetir a rajada."
    ],
    "explanation": "restart reinicia o ciclo e limpa as partículas existentes. Esta é a política de repetição da oficina. finished informa o fim de one_shot; não é um evento periódico da emissão contínua."
  }
},

{
  "id": "2d-pro-architecture-async",
  "area": "2d",
  "level": "profissional",
  "levelLabel": "Profissional",
  "title": "15. Arquitetura de cenas e carregamento em segundo plano",
  "subtitle": "Carregue um recurso, valide a próxima sala e preserve o estado da partida sem prometer uma troca instantânea.",
  "nodesUsed": [
    "ResourceLoader",
    "PackedScene",
    "Node2D",
    "Marker2D",
    "SceneTree"
  ],
  "feynman": {
    "title": "A oficina continua aberta enquanto a próxima sala é preparada",
    "explanation": "Imagine uma oficina com um jogador, suas moedas e um espaço que recebe uma sala por vez. O carregador busca o recurso da próxima sala; isso ainda não cria seus nós. Quando o recurso fica disponível, o controlador instancia a candidata, verifica o contrato e só então substitui a sala instalada. O jogador permanece fora desse espaço, portanto não é destruído junto com a sala. Esta organização separa estado persistente, conteúdo substituível e interface. A comparação ajuda a entender responsabilidades; não significa que instalar a sala será gratuito ou instantâneo.",
    "analogies": [
      {
        "term": "Recurso e instância",
        "analogy": "PackedScene é a descrição serializada. instantiate cria os nós; add_child os coloca na árvore ativa. São etapas diferentes."
      },
      {
        "term": "Carregamento e aplicação",
        "analogy": "Receber as peças não é montar a máquina. O progresso do recurso pode chegar a 100% antes de qualquer sala nova ser instalada."
      },
      {
        "term": "Persistência por posição na árvore",
        "analogy": "O jogador é irmão do ContainerSala. Trocar o filho desse contêiner preserva a instância do jogador e suas moedas."
      }
    ]
  },
  "howItWorks": {
    "overview": "ResourceLoader.load_threaded_request inicia um pedido e retorna um Error; OK significa pedido aceito, não recurso pronto. Consulte load_threaded_get_status em quadros separados. Enquanto IN_PROGRESS, o array de progresso contém uma razão entre 0 e 1. Só chame load_threaded_get depois de THREAD_LOAD_LOADED para evitar esperar pela conclusão nessa chamada. Em seguida, valide o tipo de recurso, instancie e confira a raiz e o Marker2D Entrada. A árvore ativa é modificada no thread principal. Mesmo com carregamento em segundo plano, instantiate, add_child e _ready podem produzir custo perceptível.",
    "anatomy": [
      {
        "prop": "Pedido → andamento → recurso pronto",
        "desc": "Trate erro no pedido, THREAD_LOAD_FAILED e THREAD_LOAD_INVALID_RESOURCE. Não faça um while de espera: bloquearia o processamento da interface. Arquivos pequenos ou em cache podem aparecer prontos quase imediatamente."
      },
      {
        "prop": "Recurso pronto → candidata → sala instalada",
        "desc": "100% descreve o recurso. A prática deixa Aplicar como ação separada. A candidata deve ser Node2D e conter um filho direto Marker2D chamado Entrada; os caminhos fazem parte de um contrato explícito."
      },
      {
        "prop": "Desistir da troca",
        "desc": "A API usada não fornece aqui um cancelamento do trabalho em andamento. O carregador marca o pedido como abandonado, continua acompanhando e descarta seu resultado ao terminar. Até lá, não aceita outro pedido nem reinicia o experimento."
      },
      {
        "prop": "Referências, grupos e Autoload",
        "desc": "Passe uma referência quando a dependência é conhecida. Grupos ajudam a localizar nós, mas não garantem unicidade nem substituem automaticamente injeção de dependência. Um Autoload pode guardar serviços entre mudanças de current_scene; não é obrigatório quando uma raiz persistente já atende ao ciclo de vida necessário."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "Use carregador.gd e oficina.gd juntos no projeto fornecido. medidor.gd é uma extensão opcional para comparar referência explícita e procura por grupo. A oficina cria os nós e controles; as salas do ZIP são fixtures passivos, sem scripts de _ready.",
    "duration": "70–100 min, incluindo falhas e variações (estimativa)",
    "prerequisite": "Aulas 1, 3, 7 e 13: árvore de nós, ciclo de vida, sinais e Resources. Referência: Godot 4.5, GDScript, Compatibility. Projeto revisado documentalmente, ainda não executado no motor neste ambiente.",
    "objectives": [
      "Distinguir pedido, progresso, recurso pronto, instanciação e instalação sem bloquear à espera de load_threaded_get.",
      "Preservar jogador e moedas ao trocar somente o conteúdo de ContainerSala, mantendo a sala atual se a candidata for incompatível.",
      "Escolher referência explícita, grupo ou Autoload segundo contrato e ciclo de vida, tratando ausência e duplicidade."
    ],
    "practice": {
      "title": "Prática guiada: duas salas, o mesmo jogador",
      "intro": "O projeto mínimo tem salas com arte geométrica, pontos de entrada e variantes inválidas para testar o contrato. O jogador é um marcador visual, sem física ou movimento: o objetivo é observar identidade e persistência, não locomoção.",
      "tree": "Oficina (Node2D) — oficina.gd\n├── ContainerSala (Node2D criado por código)\n│   └── SalaA ou SalaB (Node2D instanciado)\n│       ├── Piso (Polygon2D)\n│       └── Entrada (Marker2D)\n├── Jogador (Node2D persistente, grupo jogador)\n├── CarregadorSala (Node criado por código) — carregador.gd\n└── CanvasLayer / controles e leituras (criados por código)\n\nmedidor.gd — extensão opcional\nsala_sem_entrada.tscn, raiz_control.tscn, gradiente.tres — casos inválidos",
      "download": {
        "url": "assets/aula-15-arquitetura-carregamento.zip",
        "label": "Baixar projeto de apoio: salas e carregamento"
      },
      "downloadNote": "Godot 4.5. Inclui cenas válidas e inválidas, scripts e instruções. Execução no motor ainda pendente; o laboratório do navegador não executa estes arquivos.",
      "steps": [
        {
          "title": "Preveja o que será preservado",
          "text": "Extraia o ZIP, importe project.godot e abra oficina.tscn. Execute com F6. Na árvore Remote, localize ContainerSala e Jogador como irmãos. Anote o ID do jogador, a sala e as 10 moedas. Ganhe duas moedas com C ou pelo botão antes de carregar outra sala.",
          "expect": "O jogador mantém a mesma identidade durante a prática. A sala inicial A já é preloaded para abrir a oficina; isso não significa que todas as salas futuras precisam estar preloaded."
        },
        {
          "title": "Solicite B e observe o recurso",
          "text": "Selecione Sala B e use L ou Solicitar carregamento. Leia carregador.gd: só existe um pedido por vez, a resposta Error é verificada e _process consulta o status sem laço de espera. O sinal de progresso atualiza a barra. Se a cena é pequena ou está em cache, a barra pode saltar direto para 100%; não adicione uma espera artificial ao projeto real para fazê-la parecer lenta.",
          "expect": "Ao receber preparado, a barra chega a 100%, mas a sala A continua instalada. Nenhum instantiate aconteceu no carregador. O marcador giratório acompanha o processamento da interface, sem servir como medidor de FPS."
        },
        {
          "title": "Aplique a candidata e compare o estado",
          "text": "Use A ou Aplicar sala preparada. oficina.gd instancia fora da árvore, exige raiz Node2D e Marker2D Entrada no caminho direto, depois remove a sala antiga e adiciona a candidata. O jogador recebe a posição global de Entrada após add_child. Compare o ID e as moedas anotados; depois solicite A e repita.",
          "expect": "A posição de entrada muda com a sala, mas ID e moedas permanecem. instantiate e entrada na árvore ainda usam trabalho no thread principal; esta técnica não garante ausência de engasgos. Salas maiores exigem medição no profiler."
        },
        {
          "title": "Teste falhas antes de remover a sala atual",
          "text": "Selecione, um de cada vez: Sem Entrada, Raiz incompatível, Recurso não é cena e Caminho ausente. Solicite e, se o recurso for uma PackedScene preparada, aplique. O primeiro falha no contrato do marcador; o segundo no tipo da raiz; o terceiro é rejeitado pelo carregador; o último pode ser recusado no pedido ou terminar como falha de carregamento.",
          "expect": "A sala instalada, o jogador e suas moedas continuam disponíveis. Não há find_child por nome aproximado. Esses testes verificam um contrato limitado; não desfazem efeitos arbitrários de scripts executados em _init ou _ready."
        },
        {
          "title": "Desista e repita sem recarregar a página",
          "text": "Durante um pedido, use D se ainda estiver em andamento. O projeto passa a aguardar o término para descartar o resultado; a API não é apresentada como cancelamento do worker. Se o recurso já está preparado, D apenas libera a referência pendente. Depois solicite de novo. R restaura sala A e 10 moedas quando não existe carregamento em andamento.",
          "expect": "Não é possível disparar pedidos duplicados nem reiniciar uma tarefa em andamento. Como arquivos pequenos terminam rapidamente, o caso de desistência durante o carregamento é mais fácil de observar no modelo com duração sintética."
        },
        {
          "title": "Compare referência e procura por grupo",
          "text": "Leia medidor.gd. Para usar a extensão, adicione ao fim de _ready de oficina.gd: var meter = preload(\"res://medidor.gd\").new(); depois, em linhas separadas, meter.position = Vector2(16, 650), add_child(meter) e meter.configurar(player). Observe o ID. Para comparar, substitua configurar por procurar_por_grupo. Remova temporariamente a chamada add_to_group do jogador ou adicione outro Node2D ao mesmo grupo antes da procura.",
          "expect": "A referência explícita funciona sem busca. A busca recusa zero ou mais de um candidato. get_first_node_in_group retorna o primeiro na ordem da árvore ou null; não prova que há exatamente um jogador. O grupo não é uma promessa de velocidade nem um contêiner de dependências."
        },
        {
          "title": "Justifique o ciclo de vida escolhido",
          "text": "Explique por que esta oficina não precisa de Autoload: sua raiz permanece enquanto só muda um filho de ContainerSala. Se o jogo passar a substituir current_scene inteira, um serviço Autoload pode guardar estado que deva atravessar essa troca. change_scene_to_packed não destrói a SceneTree inteira: remove a current_scene e termina a mudança ao final do quadro. Consulte scene_changed quando precisar acessar a nova cena por essa API.",
          "expect": "Escolha o mecanismo pela duração e pelo contrato dos dados. Autoload não impede que outras instâncias da classe existam. Não transforme cada objeto do jogo em estado global."
        }
      ]
    },
    "checks": [
      {
        "question": "Por que não chamar load_threaded_get logo depois de fazer o pedido?",
        "answer": "Porque pode bloquear o chamador enquanto o recurso ainda não terminou. Consulte o status em quadros separados e obtenha o resultado depois de LOADED."
      },
      {
        "question": "O recurso está em 100%. Por que A ainda aparece?",
        "answer": "O recurso foi carregado, mas Aplicar ainda não instanciou nem instalou a sala. Separar essas etapas torna o custo e a validação observáveis."
      },
      {
        "question": "Por que o jogador não perde suas moedas ao trocar a sala?",
        "answer": "O mesmo nó Jogador permanece como irmão de ContainerSala. Somente o filho que representa a sala é substituído; nenhuma nova instância do jogador é criada."
      },
      {
        "question": "Desistir interrompe imediatamente o carregamento?",
        "answer": "Não nesta implementação. O pedido é marcado como abandonado, continua sendo acompanhado e seu resultado é descartado ao atingir um estado terminal."
      }
    ],
    "pitfalls": [
      {
        "title": "Barra em 100% confundida com troca completa",
        "text": "Progresso refere-se ao recurso, não à instanciação, ao _ready nem a uma medição de fluidez. O projeto só troca depois da ação Aplicar."
      },
      {
        "title": "Sala antiga removida cedo demais",
        "text": "Confirme PackedScene, raiz e Entrada antes de remover a sala atual. O exemplo usa fixtures passivos; validação estrutural não garante recuperação de efeitos colaterais de scripts arbitrários."
      },
      {
        "title": "Jogador localizado por um nome qualquer",
        "text": "Use o contrato de caminho para Entrada e uma referência explícita para o jogador. Se usar grupo, trate ausência e duplicidade; não confunda primeiro encontrado com único."
      },
      {
        "title": "Levar tudo para um Thread",
        "text": "A árvore ativa não deve ser modificada indiscriminadamente por outro thread. O carregador desta prática só busca recursos em segundo plano; a manipulação de nós ocorre no principal. Meça antes de repartir custos maiores."
      }
    ],
    "summary": "Carregar o recurso, criar nós e instalar uma sala são etapas diferentes. Estado persiste quando seu dono persiste. Um contrato explícito evita remover conteúdo válido diante de uma candidata incompatível; erros, descarte e repetição também fazem parte da arquitetura.",
    "next": "Na aula 16, investigue gargalos e otimizações com medições, sem assumir que pooling ou servidores sempre tornam o jogo mais rápido.",
    "sources": [
      {
        "label": "Godot 4.5 — Background loading",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/io/background_loading.html"
      },
      {
        "label": "Godot 4.5 — ResourceLoader",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_resourceloader.html"
      },
      {
        "label": "Godot 4.5 — PackedScene",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_packedscene.html"
      },
      {
        "label": "Godot 4.5 — Troca manual de cenas",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/scripting/change_scenes_manually.html"
      },
      {
        "label": "Godot 4.5 — SceneTree",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_scenetree.html"
      },
      {
        "label": "Godot 4.5 — Autoload",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/scripting/singletons_autoload.html"
      },
      {
        "label": "Godot 4.5 — APIs e threads",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/performance/thread_safe_apis.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Carregador: um pedido, status e descarte",
      "whenToUse": "Quando uma sala deve ser carregada sem esperar pelo recurso no thread principal.",
      "description": "Salve carregador.gd. Os sinais comunicam progresso, recurso preparado, falha e descarte. O arquivo não altera a sala. Desistir marca o pedido e aguarda seu término; não cancela a tarefa da Godot.",
      "code": "class_name CarregadorSala\nextends Node\n\nsignal progresso_alterado(ratio: float)\nsignal preparado(scene: PackedScene)\nsignal falhou(message: String)\nsignal descartado\n\nvar ocupado: bool = false\nvar abandonado: bool = false\nvar caminho: String = \"\"\n\nfunc solicitar(path: String) -> Error:\n    if ocupado:\n        return ERR_BUSY\n    var error := ResourceLoader.load_threaded_request(path)\n    if error != OK:\n        return error\n    caminho = path\n    ocupado = true\n    abandonado = false\n    progresso_alterado.emit(0.0)\n    return OK\n\nfunc desistir_da_troca() -> void:\n    # Não cancela a thread: continuamos consultando até um estado terminal.\n    if ocupado:\n        abandonado = true\n\nfunc _process(_delta: float) -> void:\n    if not ocupado:\n        return\n    var progress: Array = []\n    var status := ResourceLoader.load_threaded_get_status(caminho, progress)\n    match status:\n        ResourceLoader.THREAD_LOAD_IN_PROGRESS:\n            if not progress.is_empty():\n                progresso_alterado.emit(clampf(float(progress[0]), 0.0, 1.0))\n        ResourceLoader.THREAD_LOAD_LOADED:\n            # Só fazemos get depois de LOADED para evitar esperar pela thread aqui.\n            var resource := ResourceLoader.load_threaded_get(caminho)\n            ocupado = false\n            caminho = \"\"\n            if abandonado:\n                abandonado = false\n                descartado.emit()\n            elif resource is PackedScene:\n                progresso_alterado.emit(1.0)\n                preparado.emit(resource)\n            else:\n                falhou.emit(\"O recurso carregado não é PackedScene.\")\n        ResourceLoader.THREAD_LOAD_FAILED, ResourceLoader.THREAD_LOAD_INVALID_RESOURCE:\n            ocupado = false\n            caminho = \"\"\n            abandonado = false\n            falhou.emit(\"Falha ou requisição inválida. Sala atual preservada.\")\n",
      "pros": "Separa a obtenção do recurso da política de troca e trata estados terminais.",
      "cons": "Só aceita um pedido por vez; não mede nem elimina o custo de instanciar e adicionar nós."
    },
    {
      "title": "2. Raiz persistente e contrato da sala",
      "whenToUse": "Na oficina principal, mantendo jogador e moedas entre trocas de um filho.",
      "description": "Salve oficina.gd na raiz Node2D de oficina.tscn. Use as cenas do projeto de apoio. A candidata é verificada antes de remover a sala atual. Estas salas são passivas, sem scripts; a verificação não é uma transação capaz de desfazer efeitos arbitrários de _ready.",
      "code": "extends Node2D\n\nconst LOADER = preload(\"res://carregador.gd\")\nconst INITIAL = preload(\"res://sala_a.tscn\")\nconst TARGETS := {\n    \"Sala A\": \"res://sala_a.tscn\", \"Sala B\": \"res://sala_b.tscn\",\n    \"Sem Entrada\": \"res://sala_sem_entrada.tscn\",\n    \"Raiz incompatível\": \"res://raiz_control.tscn\",\n    \"Recurso não é cena\": \"res://gradiente.tres\",\n    \"Caminho ausente\": \"res://inexistente.tscn\"\n}\nvar loader: CarregadorSala\nvar world: Node2D\nvar player: Node2D\nvar room: Node2D\nvar pending: PackedScene\nvar choices: OptionButton\nvar bar: ProgressBar\nvar message: Label\nvar stats: Label\nvar load_button: Button\nvar apply_button: Button\nvar discard_button: Button\nvar reset_button: Button\nvar coins: int = 10\nvar spin: float = 0.0\n\nfunc _ready() -> void:\n    world = Node2D.new()\n    world.name = \"ContainerSala\"\n    add_child(world)\n    player = Node2D.new()\n    player.name = \"Jogador\"\n    player.add_to_group(\"jogador\")\n    var art := Polygon2D.new()\n    art.polygon = PackedVector2Array([Vector2(0,-14), Vector2(14,0), Vector2(0,14), Vector2(-14,0)])\n    art.color = Color(\"5ce1e6\")\n    player.add_child(art)\n    add_child(player)\n    loader = LOADER.new()\n    add_child(loader)\n    loader.progresso_alterado.connect(func(ratio: float): bar.value = ratio * 100.0)\n    loader.preparado.connect(_preparado)\n    loader.falhou.connect(_falhou)\n    loader.descartado.connect(func(): message.text = \"Resultado descartado. Você pode solicitar outra sala.\")\n    criar_interface()\n    pending = INITIAL\n    aplicar()\n\nfunc criar_interface() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var box := VBoxContainer.new()\n    box.position = Vector2(16, 315)\n    box.custom_minimum_size.x = 608\n    layer.add_child(box)\n    choices = OptionButton.new()\n    for label in TARGETS:\n        choices.add_item(label)\n        choices.set_item_metadata(choices.item_count - 1, TARGETS[label])\n    choices.select(1)\n    box.add_child(choices)\n    load_button = botao(box, \"L · Solicitar carregamento\", solicitar)\n    apply_button = botao(box, \"A · Aplicar sala preparada\", aplicar)\n    discard_button = botao(box, \"D · Desistir da troca\", desistir)\n    botao(box, \"C · Ganhar 1 moeda\", ganhar_moeda)\n    reset_button = botao(box, \"R · Reiniciar experimento\", reiniciar)\n    bar = ProgressBar.new()\n    bar.max_value = 100\n    box.add_child(bar)\n    message = Label.new()\n    message.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(message)\n    stats = Label.new()\n    stats.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(stats)\n\nfunc botao(parent: Node, text: String, action: Callable) -> Button:\n    var button := Button.new()\n    button.text = text\n    button.pressed.connect(action)\n    parent.add_child(button)\n    return button\n\nfunc _process(delta: float) -> void:\n    spin += delta * 2.0\n    queue_redraw()\n    var busy := loader.ocupado\n    load_button.disabled = busy or pending != null\n    apply_button.disabled = busy or pending == null\n    discard_button.disabled = (not busy and pending == null) or loader.abandonado\n    reset_button.disabled = busy\n    choices.disabled = busy or pending != null\n    stats.text = \"Moedas: %d | ID do jogador: %d | sala: %s\" % [coins, player.get_instance_id(), room.name]\n\nfunc _draw() -> void:\n    var center := Vector2(600, 28)\n    draw_circle(center, 12, Color(\"5b3f22\"))\n    draw_line(center, center + Vector2.from_angle(spin) * 11, Color(\"f4d088\"), 3)\n\nfunc solicitar() -> void:\n    if loader.ocupado or pending != null:\n        return\n    bar.value = 0\n    var path := str(choices.get_item_metadata(choices.selected))\n    var error := loader.solicitar(path)\n    message.text = \"Carregando o recurso...\" if error == OK else \"Pedido recusado: \" + error_string(error)\n\nfunc _preparado(scene: PackedScene) -> void:\n    pending = scene\n    message.text = \"Recurso carregado (100%). Ainda falta instanciar e aplicar a sala.\"\n\nfunc _falhou(text: String) -> void:\n    pending = null\n    message.text = text\n\nfunc desistir() -> void:\n    if loader.ocupado:\n        loader.desistir_da_troca()\n        message.text = \"Troca abandonada; aguardando a tarefa terminar para descartar o resultado.\"\n    elif pending != null:\n        pending = null\n        message.text = \"Cena preparada descartada. Sala atual preservada.\"\n\nfunc aplicar() -> void:\n    if loader.ocupado or pending == null:\n        return\n    var candidate := pending.instantiate()\n    pending = null\n    if not candidate is Node2D:\n        if candidate != null:\n            candidate.free()\n        message.text = \"A raiz precisa ser Node2D. Sala atual preservada.\"\n        return\n    var entry := candidate.get_node_or_null(\"Entrada\") as Marker2D\n    if entry == null:\n        candidate.free()\n        message.text = \"Falta Marker2D Entrada. Sala atual preservada.\"\n        return\n    # Estes fixtures são passivos; não executam efeitos de _ready na validação.\n    if is_instance_valid(room):\n        world.remove_child(room)\n        room.queue_free()\n    room = candidate as Node2D\n    world.add_child(room)\n    player.global_position = entry.global_position\n    message.text = \"Sala aplicada; o mesmo jogador e suas moedas foram preservados.\"\n\nfunc ganhar_moeda() -> void:\n    coins = mini(999, coins + 1)\n\nfunc reiniciar() -> void:\n    if loader.ocupado:\n        message.text = \"Desista e aguarde a tarefa terminar antes de reiniciar.\"\n        return\n    coins = 10\n    pending = INITIAL\n    aplicar()\n    bar.value = 0\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo:\n        return\n    if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n        return\n    match event.keycode:\n        KEY_L: solicitar()\n        KEY_A: aplicar()\n        KEY_D: desistir()\n        KEY_C: ganhar_moeda()\n        KEY_R: reiniciar()\n",
      "pros": "Explicita dono do estado, ponto de entrada, botões, teclas e restauração.",
      "cons": "A montagem ainda acontece no thread principal. Não é gerenciador universal de streaming, rede ou mundos enormes."
    },
    {
      "title": "3. Dependência explícita ou grupo com contrato",
      "whenToUse": "Como extensão opcional para uma leitura que precisa conhecer o jogador.",
      "description": "Salve medidor.gd e instale como descrito no passo 6. configurar recebe a referência do controlador. procurar_por_grupo é uma alternativa com validação de quantidade e tipo, não uma operação equivalente a injeção automática de dependência.",
      "code": "extends Label\n# Extensão opcional; configure uma referência explícita antes de usar.\nvar alvo: Node2D\n\nfunc configurar(node: Node2D) -> void:\n    alvo = node\n\nfunc procurar_por_grupo() -> bool:\n    var matches := get_tree().get_nodes_in_group(\"jogador\")\n    if matches.size() != 1 or not matches[0] is Node2D:\n        alvo = null\n        text = \"Esperado exatamente um Node2D no grupo jogador.\"\n        return false\n    configurar(matches[0] as Node2D)\n    return true\n\nfunc _process(_delta: float) -> void:\n    if not is_instance_valid(alvo):\n        text = \"Sem referência válida. Configure ou faça a busca explicitamente.\"\n        return\n    text = \"ID observado: %d | posição global: %s\" % [alvo.get_instance_id(), str(alvo.global_position)]\n",
      "pros": "Mostra de onde vem a dependência e trata alvo ausente ou liberado.",
      "cons": "A busca pontual não acompanha automaticamente substituições do jogador. Um projeto maior deve definir como atualizar a referência."
    }
  ],
  "simulator": {
    "type": "async_loader_sim",
    "title": "Laboratório: recurso pronto não é sala instalada",
    "description": "Modelo determinístico em Canvas/JavaScript, com custos sintéticos de carregamento e instanciação. Não lê arquivos, cria threads, instancia cenas Godot nem mede FPS. O bloqueio é representado pela engrenagem parada e pela ação de moeda indisponível; o navegador e a pausa continuam funcionando. A progressão linear é apenas didática, não uma previsão do progresso real.",
    "guide": [
      {
        "title": "Compare os custos",
        "text": "Solicite com L; compare síncrono e segundo plano. Use C durante o carregamento. Ao chegar a READY e 100%, confira que a sala ainda é A. Use A: o custo de instanciar bloqueia a UI representada nos dois modos."
      },
      {
        "title": "Pause, avance e repita",
        "text": "Pause a simulação para avançar em passos de 0,25 s. Com foco na cena: L solicita, A aplica, D desiste, C ganha moeda, R restaura. Botões equivalentes acima. R aguarda a tarefa terminal; depois de concluir, é possível solicitar outra sala sem recarregar."
      },
      {
        "title": "Falhe ou descarte com segurança",
        "text": "Escolha falha ao carregar, raiz incompatível ou ausência de Entrada. A sala atual e o jogador persistem. Durante carregamento em segundo plano, D entra em DRAINING até o trabalho terminar e o resultado ser descartado. Configurações ficam bloqueadas durante o pedido e a espera por Aplicar."
      }
    ]
  },
  "quiz": {
    "question": "O carregamento em segundo plano chegou a 100%, mas a interface pode engasgar quando você aplica a sala. Qual explicação corresponde a esta aula?",
    "options": [
      "100% se refere ao recurso; instantiate, add_child e _ready ainda podem ter custo no thread principal.",
      "100% significa que os nós já estão na árvore e que qualquer engasgo é impossível.",
      "É necessário destruir toda a SceneTree, incluindo todos os Autoloads, para aplicar uma sala.",
      "load_threaded_get deve ser chamado imediatamente após o pedido, mesmo antes de LOADED."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Recurso pronto e sala instalada são etapas distintas.",
      "O progresso do recurso não comprova instanciação ou fluidez.",
      "A prática troca só um filho. change_scene_to_packed também não destrói toda a árvore.",
      "Antes de LOADED, get pode bloquear esperando o recurso."
    ],
    "explanation": "O pedido em segundo plano reduz a espera do carregamento no principal, mas não torna a criação e a ativação de nós gratuitas. A prática separa Aplicar para observar essa diferença e validar a candidata antes de substituir a sala."
  }
},

{
  "id": "2d-pro-optimization-servers",
  "area": "2d",
  "level": "profissional",
  "levelLabel": "Profissional",
  "title": "16. Otimização 2D: medir, reutilizar e desenhar em lote",
  "subtitle": "Investigue o gargalo antes de escolher pooling, visibilidade, MultiMesh ou APIs de servidores.",
  "nodesUsed": [
    "Profiler",
    "VisibleOnScreenEnabler2D",
    "MultiMeshInstance2D",
    "RenderingServer",
    "PhysicsServer2D"
  ],
  "feynman": {
    "title": "Três problemas diferentes na mesma oficina",
    "explanation": "Uma oficina pode perder tempo fabricando peças descartáveis, atualizando máquinas que não precisam trabalhar ou enviando muitos objetos semelhantes para desenho. Reaproveitar peças ajuda no primeiro problema; controlar processamento ajuda no segundo; desenhar instâncias em lote pode ajudar no terceiro. Nenhuma dessas escolhas garante um número de FPS. Primeiro reproduza o problema e meça; depois mude uma coisa e compare o mesmo trabalho. Como na aula 15, criar e ativar objetos tem custo, mas é preciso descobrir se esse custo é relevante para o jogo.",
    "analogies": [
      {
        "term": "Pool fixo",
        "analogy": "Uma reserva de objetos já criados, emprestados e devolvidos. Se todos estão ocupados, é necessário decidir se o pedido será recusado, se a reserva crescerá ou se algum objeto será substituído. A prática escolhe recusar."
      },
      {
        "term": "Visibilidade e processamento",
        "analogy": "Não desenhar uma máquina e parar seu motor são decisões diferentes. Ocultar um CanvasItem não garante que sua lógica ou colisão deixou de trabalhar."
      },
      {
        "term": "MultiMesh e servidores",
        "analogy": "MultiMesh repete uma malha por instanciamento. As APIs de servidor oferecem controle de nível mais baixo por RID. Nenhum deles cria automaticamente a lógica ou a colisão de milhares de inimigos."
      }
    ]
  },
  "howItWorks": {
    "overview": "Registre um cenário reproduzível: quantidade de pedidos, vida dos objetos, duração, câmera e hardware. Use o Profiler para investigar tempos de script/quadro/física e os monitores apropriados para contagens. Um contador de criações não é tempo medido. Se o problema estiver na criação/destruição frequente, teste um pool. Se estiver no processamento desnecessário, defina quais objetos podem parar sem mudar as regras. Se estiver no envio de instâncias visuais semelhantes, avalie MultiMesh. Se a camada de nós for o gargalo demonstrado, considere servidores, aceitando gerenciar mais responsabilidades.",
    "anatomy": [
      {
        "prop": "Pooling: ativos, livres e contrato de retorno",
        "desc": "Cada objeto pertence a exatamente uma coleção. Retornar duas vezes o mesmo objeto pode duplicar empréstimos. Restaure posição, velocidade, vida e estado específico; desconecte eventos por uso e encerre efeitos quando existirem. Na prática, o controlador central atualiza apenas os ativos."
      },
      {
        "prop": "VisibleOnScreenNotifier2D e Enabler2D",
        "desc": "Notifier sinaliza entrada/saída; Enabler muda process_mode do nó indicado por enable_node_path (pai por padrão). Ambos dependem da visibilidade de renderização e não funcionam corretamente se o CanvasItem relevante estiver oculto. Isso não é uma promessa de remover corpos da física."
      },
      {
        "prop": "MultiMeshInstance2D e MultiMesh",
        "desc": "Defina TRANSFORM_2D e flags como use_colors antes de instance_count, que aloca os buffers. set_instance_transform_2d configura cada índice. visible_instance_count limita um prefixo de índices, não seleciona automaticamente objetos pela câmera. O lote não tem culling individual por instância como nós independentes."
      },
      {
        "prop": "RID, RenderingServer e PhysicsServer2D",
        "desc": "Um RID é um identificador opaco, não um Node. Libere os RIDs criados por sua implementação, sem liberar os pertencentes a um nó. RenderingServer cuida do visual; PhysicsServer2D exige configurar formas, corpos/áreas, espaço, filtros e ciclo de vida. Não é usado no projeto visual desta aula."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "O projeto principal usa oficina.gd e projetil.gd juntos. visibilidade.tscn é um exercício separado com Enabler. extensoes.tscn reúne uma grade MultiMesh e um item de servidor. Abra cada cena indicada com F6; não cole os arquivos combinados em um único script.",
    "duration": "80–110 min, incluindo coleta e comparação (estimativa)",
    "prerequisite": "Aulas 3, 5, 6 e 15: delta, colisões, câmera, ciclo de vida e troca de cenas. Godot 4.5, GDScript, Compatibility. Projeto revisado documentalmente, ainda não executado no motor neste ambiente. Não exige arte externa nem InputMap adicional.",
    "objectives": [
      "Formular uma hipótese de gargalo e comparar o mesmo cenário usando tempos reais, sem converter contagens em FPS inventados.",
      "Implementar empréstimo, devolução e reset de um pool fixo; reconhecer recusas e o custo inicial da reserva.",
      "Distinguir culling visual, desativação de processamento, instanciamento MultiMesh e responsabilidades de um RID."
    ],
    "practice": {
      "title": "Prática guiada: conte o trabalho e depois meça o custo",
      "intro": "Comece com projéteis visuais sem colisão. Isso isola o ciclo de vida, sem alegar equivalência a um bullet hell completo. Os exercícios de visibilidade e lote são separados para não misturar o efeito de várias mudanças.",
      "tree": "oficina.tscn — Node2D / oficina.gd\n├── Mundo (Node2D criado por código)\n│   └── Projéteis (instâncias de projetil.tscn / projetil.gd)\n└── CanvasLayer / controles e contadores (criados por código)\n\nvisibilidade.tscn — Node2D / visibilidade.gd\n├── Camera2D — controlada fora do alvo desativado\n├── Alvo (Node2D)\n│   ├── Rotor (Node2D / rotor.gd)\n│   │   ├── Arte (Polygon2D)\n│   │   └── Leitura (Label)\n│   └── Enabler (VisibleOnScreenEnabler2D) — enable_node_path: ../Rotor\n└── CanvasLayer / instrução\n\nextensoes.tscn — Node2D\n├── Lote (MultiMeshInstance2D / lote.gd)\n├── ItemServidor (Node2D / item_servidor.gd)\n└── CanvasLayer / instrução",
      "download": {
        "url": "assets/aula-16-otimizacao-medicao.zip",
        "label": "Baixar projeto de apoio: otimização e medição"
      },
      "downloadNote": "Inclui três cenas de estudo, cena de projétil e seis scripts. Referência Godot 4.5; execução real ainda pendente. As contagens do navegador não homologam os scripts.",
      "steps": [
        {
          "title": "Defina uma comparação justa",
          "text": "Extraia o ZIP, importe project.godot e abra oficina.tscn com F6. O cenário usa taxa 8/s, vida 2 s e emissão por 4 s, sem rajada extra. O primeiro pedido ocorre em 0,125 s e o último em 4 s: são 32 pedidos. Preveja o máximo simultâneo: taxa × vida = 16, neste caso regular e com expiração antes da emissão no mesmo instante.",
          "expect": "Essa conta é uma previsão para este cronograma, não uma fórmula universal de capacidade. Rajadas, vidas variáveis e desempates alteram a necessidade. O projeto ainda não executou no motor neste ambiente: confira esses valores ao rodar."
        },
        {
          "title": "Observe criar e destruir",
          "text": "Escolha Criar e destruir e pressione L ou Iniciar. Aguarde o relógio chegar a 6 s: a emissão acaba em 4 s e a última vida termina em 6 s. Anote pedidos, atendidos, criados, liberações solicitadas e ativos. Cada expiração remove o projétil da coleção ativa e solicita queue_free; a liberação da Godot ocorre ao final do quadro.",
          "expect": "Sem rajada, prevê-se 32 pedidos atendidos, 32 criações, 32 liberações solicitadas e zero ativos ao fim. Esses números descrevem operações do controlador, não bytes, duração ou FPS."
        },
        {
          "title": "Reutilize com capacidade suficiente",
          "text": "Escolha Pool fixo, capacidade 16 e use L novamente. O início limpa o experimento anterior e cria a reserva antes da emissão; o custo inicial deve ser considerado separadamente. Objetos livres ficam ocultos e não entram no loop central de atualização. Ao ativar, o script restaura os campos do projétil visual. Ao expirar, devolve uma única vez e retira da lista ativa.",
          "expect": "No fim regular, prevê-se 16 criados, 32 atendidos, 16 reativações de objetos já usados, zero recusas, zero ativos e 16 livres. O pool preserva objetos alocados enquanto a alternativa os libera. Menos criações durante o ciclo não prova menor tempo de quadro."
        },
        {
          "title": "Esgote a reserva e repita",
          "text": "Reduza a capacidade para 4 e reinicie. Compare atendidos e recusas com a alternativa anterior; depois volte a 16 e use B para uma rajada de oito pedidos durante a emissão. A política desta prática recusa quando o pool acaba, sem crescer nem roubar tiros ativos. R limpa; L recria a reserva e repete. No navegador, pause e avance em passos de 0,25 s para inspecionar os limites.",
          "expect": "Com capacidade 4 e sem rajada, a previsão é atender 8 dos 32 pedidos e recusar 24. Uma cena com menos tiros não é uma comparação de desempenho equivalente. Crescer o pool ou substituir o mais antigo são políticas diferentes, que precisam ser explicitadas e testadas."
        },
        {
          "title": "Colete evidências no motor",
          "text": "Execute os dois modos com capacidade suficiente e sem rajadas, sob a mesma taxa, vida, duração e câmera. No editor, abra Debugger → Profiler e inicie a coleta. Separe preparação da reserva, emissão e esvaziamento. Registre versão, renderizador, dispositivo, quantidade atendida e os tempos observados; repita a coleta para verificar variação. Depois compare também uma exportação no hardware-alvo, registrando build e condições.",
          "expect": "Preencha a tabela do LEIA-ME com resultados reais; ela começa sem números medidos. Se este fixture pequeno não mostrar diferença relevante, registre isso. UI, editor e profiler também têm custo; não conclua um ganho de 10x ou 60 FPS apenas por contar objetos."
        },
        {
          "title": "Separe visibilidade de regras do jogo",
          "text": "Pare a oficina, abra visibilidade.tscn e execute com F6. C alterna a câmera entre perto e longe. O Enabler usa enable_node_path=../Rotor, controlando somente o contador/rotação de Rotor. A câmera e seu controlador ficam fora desse alvo. Ao voltar, compare a leitura com os segundos passados longe. Notifier apenas avisaria por sinais; Enabler altera process_mode.",
          "expect": "A leitura do Rotor deve parar fora da região e continuar ao retornar. Isso depende da avaliação de visibilidade da renderização, não de uma busca de distância física. Não esconda o alvo para tentar economizar e esperar que o mesmo detector o reative. Não pause o movimento de um projétil que precisa voltar à tela ou expirar; colisão e regras fora da câmera exigem outra decisão."
        },
        {
          "title": "Experimente lote e RID, delimitando o escopo",
          "text": "Abra extensoes.tscn com F6. lote.gd prepara 64 quads coloridos; V alterna visible_instance_count entre 16 e 64. O prefixo segue a ordem dos índices. A peça ciano à direita é criada por item_servidor.gd com canvas_item_create, associada ao CanvasItem pai e liberada em _exit_tree. Compare os nós na árvore Remote: as 64 instâncias não são 64 Node2D.",
          "expect": "MultiMesh não cria colisão, IA ou culling individual. Um draw_texture repetido dentro de _draw também não garante um único draw call. Para lotes espalhados, avalie subdividir por regiões. O item de servidor não é um corpo físico; PhysicsServer2D fica como aprofundamento após medir um gargalo que justifique sua complexidade."
        }
      ]
    },
    "checks": [
      {
        "question": "O pool criou menos objetos. Isso já comprova que ficou mais rápido?",
        "answer": "Não. Confira se atendeu aos mesmos pedidos e meça o custo relevante no mesmo cenário e dispositivo. Preparação, memória mantida e custo de atualização também entram na decisão."
      },
      {
        "question": "Por que capacidade 4 não pode ser comparada como trabalho equivalente à alternativa que atende os 32 pedidos?",
        "answer": "Porque o pool desta prática recusa quando não há objeto livre. Ele atende 8 e recusa 24 no cronograma regular; menor carga visual e lógica pode explicar qualquer diferença observada."
      },
      {
        "question": "Ocultar um objeto desliga sua lógica e colisão?",
        "answer": "Não automaticamente. Visibilidade de desenho, processamento de nós e participação física são mecanismos distintos. O fixture não tem colisão; adicionar Area2D exige tratar também monitoramento, formas, filtros e eventos."
      },
      {
        "question": "visible_instance_count=16 escolhe os 16 mais próximos da câmera?",
        "answer": "Não. Mostra um prefixo dos índices do MultiMesh. O lote não fornece culling individual como nós independentes; organização por regiões pode ser necessária."
      }
    ],
    "pitfalls": [
      {
        "title": "Estado antigo reaparece no tiro reutilizado",
        "text": "Defina um único ponto de ativação/reset. Nesta prática, posição, origem, velocidade, nascimento e vida são repostos. Se acrescentar Timer, Tween, alvo ou conexão por disparo, restaure/encerre também esses mecanismos."
      },
      {
        "title": "Mesmo objeto emprestado duas vezes",
        "text": "Mantenha ativos e livres disjuntos e devolva somente ao retirar dos ativos. Não conecte retornos duplicados por disparo; teste expiração repetida e esgotamento."
      },
      {
        "title": "Objeto fora da câmera nunca volta nem expira",
        "text": "Você pode ter parado a própria lógica que o moveria ou devolveria ao pool. Não use visibilidade como regra universal de simulação. O recorte do laboratório afeta só desenho; tempo de vida continua."
      },
      {
        "title": "Um nó confundido com um draw call ou ganho garantido",
        "text": "Quantidade de nós, comandos de desenho e chamadas de renderização são contagens diferentes. Batching, materiais e backend influenciam o resultado. Servidores não resolvem automaticamente uma GPU já saturada."
      }
    ],
    "summary": "Otimize o gargalo demonstrado. Pooling muda o ciclo de vida e exige reset/política de esgotamento; visibilidade não define sozinha a simulação; MultiMesh repete uma malha; servidores transferem responsabilidades ao seu código. Compare comportamento e trabalho antes de comparar tempo.",
    "next": "Na aula 17, revise comunicação multiplayer e scripts de editor, mantendo autoridade, validação e ciclo de vida explícitos.",
    "sources": [
      {
        "label": "Godot 4.5 — Medição e otimização",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/performance/general_optimization.html"
      },
      {
        "label": "Godot 4.5 — Profiler",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/scripting/debug/the_profiler.html"
      },
      {
        "label": "Godot 4.5 — VisibleOnScreenEnabler2D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_visibleonscreenenabler2d.html"
      },
      {
        "label": "Godot 4.5 — VisibleOnScreenNotifier2D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_visibleonscreennotifier2d.html"
      },
      {
        "label": "Godot 4.5 — MultiMesh",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_multimesh.html"
      },
      {
        "label": "Godot 4.5 — RenderingServer",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_renderingserver.html"
      },
      {
        "label": "Godot 4.5 — PhysicsServer2D",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_physicsserver2d.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Ciclo de vida: controlador e projétil reutilizável",
      "whenToUse": "Para investigar criação/liberação de objetos visuais frequentes com cenário controlado.",
      "description": "Dois arquivos separados: oficina.gd na raiz de oficina.tscn e projetil.gd na raiz de projetil.tscn. O ZIP já instala os dois. A reserva é fixa, rejeita excesso e conta sua preparação. Objetos livres não recebem atualizações porque o controlador percorre só a lista ativa; esta cena não tem Area2D ou colisão.",
      "code": "# ARQUIVO: projetil.gd\nclass_name ProjetilOficina\nextends Node2D\n\nvar ativo: bool = false\nvar nascimento: float = 0.0\nvar origem := Vector2.ZERO\nvar velocidade := Vector2.ZERO\nvar vida: float = 2.0\nvar usos: int = 0\n\nfunc ativar(pos: Vector2, vel: Vector2, instante: float, duracao: float) -> void:\n    # Todo estado transitório deste projétil visual é restaurado aqui.\n    origem = pos\n    position = pos\n    velocidade = vel\n    nascimento = instante\n    vida = duracao\n    usos += 1\n    ativo = true\n    show()\n\nfunc atualizar(instante: float) -> void:\n    position = origem + velocidade * (instante - nascimento)\n\nfunc desativar() -> void:\n    ativo = false\n    velocidade = Vector2.ZERO\n    hide()\n\nfunc _draw() -> void:\n    draw_circle(Vector2.ZERO, 4, Color(\"5ce1e6\"))\n\n# Não há colisão, Timer, Tween ou sinais por tiro neste fixture.\n# Se acrescentá-los, amplie ativar/desativar e teste também o estado físico.\n\n# ARQUIVO: oficina.gd — salve separadamente\nextends Node2D\n\nconst BULLET = preload(\"res://projetil.tscn\")\nvar ativos: Array[ProjetilOficina] = []\nvar livres: Array[ProjetilOficina] = []\nvar modo_pool: bool = true\nvar rodando: bool = false\nvar tempo: float = 0.0\nvar proximo: int = 1\nvar taxa: int = 8\nvar capacidade: int = 16\nvar vida: float = 2.0\nvar duracao: float = 4.0\nvar pedidos: int = 0\nvar atendidos: int = 0\nvar criados: int = 0\nvar destruicoes: int = 0\nvar reusos: int = 0\nvar recusas: int = 0\nvar escolha: OptionButton\nvar limite: SpinBox\nvar status: Label\nvar mundo: Node2D\n\nfunc _ready() -> void:\n    mundo = Node2D.new()\n    add_child(mundo)\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var box := VBoxContainer.new()\n    box.position = Vector2(16, 330)\n    box.custom_minimum_size.x = 608\n    layer.add_child(box)\n    escolha = OptionButton.new()\n    escolha.add_item(\"Pool fixo\")\n    escolha.add_item(\"Criar e destruir\")\n    box.add_child(escolha)\n    var label := Label.new()\n    label.text = \"Capacidade do pool (aplicada ao iniciar):\"\n    box.add_child(label)\n    limite = SpinBox.new()\n    limite.min_value = 4\n    limite.max_value = 64\n    limite.step = 4\n    limite.value = 16\n    box.add_child(limite)\n    botao(box, \"L · Iniciar / repetir\", iniciar)\n    botao(box, \"B · Rajada de 8 pedidos\", rajada)\n    botao(box, \"R · Limpar experimento\", limpar)\n    status = Label.new()\n    status.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(status)\n\nfunc botao(parent: Node, text: String, action: Callable) -> void:\n    var button := Button.new()\n    button.text = text\n    button.pressed.connect(action)\n    parent.add_child(button)\n\nfunc limpar() -> void:\n    rodando = false\n    # Durante limpeza explícita, todos os objetos são liberados.\n    # A remoção imediata evita somar nós antigos ao próximo experimento.\n    for child in mundo.get_children():\n        mundo.remove_child(child)\n        child.queue_free()\n    ativos.clear()\n    livres.clear()\n    tempo = 0.0\n    proximo = 1\n    pedidos = 0\n    atendidos = 0\n    criados = 0\n    destruicoes = 0\n    reusos = 0\n    recusas = 0\n\nfunc criar() -> ProjetilOficina:\n    var p := BULLET.instantiate() as ProjetilOficina\n    mundo.add_child(p)\n    p.desativar()\n    criados += 1\n    return p\n\nfunc iniciar() -> void:\n    limpar()\n    modo_pool = escolha.selected == 0\n    capacidade = int(limite.value)\n    if modo_pool:\n        for _i in capacidade:\n            livres.push_back(criar())\n    rodando = true\n\nfunc emitir() -> void:\n    pedidos += 1\n    var p: ProjetilOficina\n    if modo_pool:\n        if livres.is_empty():\n            recusas += 1 # Política deliberada: não cresce nem rouba tiro ativo.\n            return\n        p = livres.pop_back()\n        if p.usos > 0:\n            reusos += 1\n    else:\n        p = criar()\n    atendidos += 1\n    p.ativar(Vector2(40, 80 + (pedidos % 5) * 38), Vector2(240, 0), tempo, vida)\n    ativos.push_back(p)\n\nfunc rajada() -> void:\n    if rodando and tempo < duracao:\n        for _i in 8:\n            emitir()\n\nfunc expirar_e_mover(instante: float) -> void:\n    # Varredura reversa permite remover sem pular o próximo elemento.\n    for i in range(ativos.size() - 1, -1, -1):\n        var p := ativos[i]\n        if p.nascimento + p.vida <= instante + 0.000000001:\n            ativos.remove_at(i)\n            p.desativar()\n            if modo_pool:\n                livres.push_back(p)\n            else:\n                mundo.remove_child(p)\n                p.queue_free()\n                destruicoes += 1\n        else:\n            p.atualizar(instante)\n\nfunc _physics_process(delta: float) -> void:\n    if rodando:\n        var fim := minf(tempo + delta, duracao + vida)\n        # Expirar antes de emitir define o desempate no mesmo instante.\n        while float(proximo) / taxa <= minf(fim, duracao) + 0.000000001:\n            tempo = float(proximo) / taxa\n            expirar_e_mover(tempo)\n            emitir()\n            proximo += 1\n        tempo = fim\n        expirar_e_mover(tempo)\n        if tempo >= duracao + vida - 0.000000001:\n            rodando = false\n    status.text = (\"Tempo: %.2f s | pedidos: %d | atendidos: %d\\n\" +\n        \"Criados: %d | liberações solicitadas: %d | reativações: %d\\n\" +\n        \"Ativos: %d | livres: %d | recusas: %d\\n\" +\n        \"Modelo visual sem colisão. Contagens não são medidas de FPS.\") % [\n        tempo, pedidos, atendidos, criados, destruicoes, reusos,\n        ativos.size(), livres.size(), recusas]\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo:\n        return\n    if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n        return\n    match event.keycode:\n        KEY_L: iniciar()\n        KEY_B: rajada()\n        KEY_R: limpar()\n",
      "pros": "Expõe pedidos atendidos/recusados, criações, devolução, reset e repetição.",
      "cons": "Não é benchmark de um jogo completo. Reserva mantém memória; pooling só deve ser adotado quando o benefício medido compensa a complexidade."
    },
    {
      "title": "2. Processamento condicionado à visibilidade",
      "whenToUse": "Quando parar uma lógica fora da região visível não altera indevidamente as regras.",
      "description": "Scripts de cenas diferentes: visibilidade.gd na raiz e rotor.gd no Rotor. A cena fornecida já tem Enabler com enable_node_path=../Rotor e rect de 80×80. O controlador da câmera não faz parte do alvo desativado; C permite sair e voltar. Não há código de colisão neste exercício.",
      "code": "# ARQUIVO: visibilidade.gd\nextends Node2D\n\nfunc _ready() -> void:\n    $Camera2D.position = Vector2(320, 300)\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if event is InputEventKey and (event.ctrl_pressed or event.alt_pressed or event.meta_pressed):\n        return\n    if event is InputEventKey and event.pressed and not event.echo and event.keycode == KEY_C:\n        $Camera2D.position.x = 1000 if $Camera2D.position.x < 500 else 320\n\n# O controlador e a câmera ficam fora do alvo desativado.\n# C afasta e aproxima a câmera; o Enabler controla só Rotor.\n\n# ARQUIVO: rotor.gd — salve separadamente\nextends Node2D\n\nvar segundos: float = 0.0\n\nfunc _process(delta: float) -> void:\n    segundos += delta\n    $Arte.rotation += delta\n    $Leitura.text = \"Processado: %.2f s\" % segundos\n",
      "pros": "Torna observável o que parou de processar sem parar o controlador responsável pelo retorno.",
      "cons": "Depende de render culling e visibilidade; não representa uma pausa física completa nem economia percentual garantida."
    },
    {
      "title": "3. Extensões visuais: MultiMesh e um RID próprio",
      "whenToUse": "Para estudar instanciamento visual e propriedade de recursos de servidor, após identificar o problema relevante.",
      "description": "Dois arquivos separados em extensoes.tscn: lote.gd no MultiMeshInstance2D e item_servidor.gd no Node2D ItemServidor. Os quads não precisam de textura externa. V altera o prefixo visível. O script de servidor libera somente o item que criou; não libera o CanvasItem do pai.",
      "code": "# ARQUIVO: lote.gd\nextends MultiMeshInstance2D\n\nfunc _ready() -> void:\n    var quad := QuadMesh.new()\n    quad.size = Vector2(18, 18)\n    var batch := MultiMesh.new()\n    batch.transform_format = MultiMesh.TRANSFORM_2D\n    batch.use_colors = true # Antes de alocar instance_count.\n    batch.mesh = quad\n    batch.instance_count = 64\n    for i in 64:\n        var pos := Vector2(40 + (i % 8) * 32, 45 + floori(float(i) / 8.0) * 32)\n        batch.set_instance_transform_2d(i, Transform2D(0.0, pos))\n        batch.set_instance_color(i, Color(\"d4a359\"))\n    batch.visible_instance_count = 64\n    multimesh = batch\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if event is InputEventKey and (event.ctrl_pressed or event.alt_pressed or event.meta_pressed):\n        return\n    if event is InputEventKey and event.pressed and not event.echo and event.keycode == KEY_V:\n        multimesh.visible_instance_count = 16 if multimesh.visible_instance_count == 64 else 64\n\n# V alterna o prefixo de 16/64 índices; não escolhe automaticamente os mais próximos.\n# Não cria Area2D, colisão, IA ou um nó por instância.\n\n# ARQUIVO: item_servidor.gd — salve separadamente\nextends Node2D\n\nvar item: RID\n\nfunc _ready() -> void:\n    item = RenderingServer.canvas_item_create()\n    RenderingServer.canvas_item_set_parent(item, get_canvas_item())\n    RenderingServer.canvas_item_add_rect(item, Rect2(-16, -16, 32, 32), Color(\"5ce1e6\"))\n    RenderingServer.canvas_item_set_transform(item, Transform2D(0.25, Vector2(420, 140)))\n\nfunc _exit_tree() -> void:\n    # Só libera o RID criado por este script. Não libera get_canvas_item().\n    if item.is_valid():\n        RenderingServer.free_rid(item)\n        item = RID()\n\n# Este exemplo é visual: não cria corpo, shape ou area do PhysicsServer2D.\n",
      "pros": "Mostra configuração antes da alocação e criação/liberação explícita de RID.",
      "cons": "Não implementa PhysicsServer2D, colisão, IA ou culling individual por instância. Um único nó não implica uma única chamada de desenho em qualquer implementação."
    }
  ],
  "simulator": {
    "type": "optimization_pool",
    "title": "Laboratório: comparar pedidos, criações e reúso",
    "description": "Modelo determinístico em Canvas/JavaScript. As duas estratégias recebem os mesmos pedidos; o pool fixo recusa quando acaba a reserva. Criação inicial, reativações e recusas são contadas. Não mede FPS, bytes, draw calls ou tempo da Godot; não executa MultiMesh, servidores ou física. O recorte azul limita apenas o desenho representado, mantendo movimento e expiração.",
    "guide": [
      {
        "title": "Preveja e confira",
        "text": "Inicie com 8/s, vida 2 s, capacidade 16 e emissão 4 s. O primeiro pedido é em 0,125 s. Ao fim de 6 s: 32 atendidos em cada lado; 32 criações na alternativa e 16 no pool, com 16 reativações. A reserva começa pré-criada."
      },
      {
        "title": "Teste limites e repetição",
        "text": "Pause e avance 0,25 s. Com foco na cena: L inicia/reinicia, B pede rajada de 8 durante RUNNING, R limpa. Botões equivalentes acima. Capacidade 4 produz recusas: compare atendidos antes de interpretar criações. L zera relógio, objetos e contadores com os parâmetros escolhidos."
      },
      {
        "title": "Separe desenho e ciclo de vida",
        "text": "Alterne Todos os ativos / Somente no recorte. Os contadores de ativos, pedidos e expiração não mudam por essa escolha. Parâmetros numéricos só valem no próximo início; o ciclo atual mostra o snapshot usado. Este diagrama não simula automaticamente Enabler ou culling de MultiMesh."
      }
    ]
  },
  "quiz": {
    "question": "Um teste com pool mostra menos criações, mas também recusou parte dos tiros por falta de objetos livres. Qual é o próximo passo para avaliar se a mudança ajuda?",
    "options": [
      "Comparar pedidos atendidos, ajustar uma política/capacidade equivalente e medir o gargalo no mesmo cenário e dispositivo.",
      "Concluir que menos objetos criados sempre significam menos tempo de quadro, independentemente dos tiros recusados.",
      "Trocar tudo por MultiMesh porque cada instância passa a ganhar colisão e inteligência próprias.",
      "Ocultar todos os projéteis para garantir que seus scripts e colisões sejam desativados automaticamente."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Preserve o trabalho comparado e então meça o custo relevante.",
      "Contagem não é duração; além disso, o teste atendeu a cargas diferentes.",
      "MultiMesh resolve uma parte visual; não cria lógica ou colisão por instância.",
      "Visibilidade, processamento e física têm controles distintos."
    ],
    "explanation": "Um pool que recusa trabalho pode parecer mais leve porque faz menos. Primeiro compare comportamento e pedidos atendidos; depois colete tempos no mesmo cenário, incluindo a preparação da reserva e a memória mantida."
  }
},

{
  "id": "2d-pro-multiplayer-tools",
  "area": "2d",
  "level": "profissional",
  "levelLabel": "Profissional",
  "title": "17. Multiplayer 2D: pedidos, autoridade e ferramentas de editor",
  "subtitle": "Conecte duas execuções locais, valide ações no servidor e separe replicação de estado da prévia feita com @tool.",
  "nodesUsed": [
    "ENetMultiplayerPeer",
    "MultiplayerSpawner",
    "MultiplayerSynchronizer",
    "SceneReplicationConfig",
    "@rpc",
    "@tool"
  ],
  "feynman": {
    "title": "Duas oficinas, uma decisão autorizada",
    "explanation": "Cada execução tem sua árvore de nós e seu estado em memória. O cliente pode pedir um movimento ou tiro; o servidor identifica quem enviou, verifica as regras e altera o estado autorizado. A outra execução recebe uma réplica desse resultado depois. “Quem controla o teclado” e “quem tem autoridade sobre o nó” não precisam ser o mesmo peer: nesta prática, cada participante envia ações de seu jogador, mas o servidor mantém a autoridade de todos os jogadores. Em uma extensão separada, @tool permite desenhar uma prévia no editor; ele não resolve nenhum problema de rede.",
    "analogies": [
      {
        "term": "Pedido e estado",
        "analogy": "Pedir para mover uma peça não é anunciar que ela já se moveu. O servidor recebe intenção, não confia em uma posição final fornecida pelo cliente."
      },
      {
        "term": "Criação e propriedades",
        "analogy": "Spawner cuida das instâncias configuradas; Synchronizer replica as propriedades escolhidas. Um não substitui o outro nem descobre automaticamente o que o jogo precisa enviar."
      },
      {
        "term": "Estado recebido e apresentação",
        "analogy": "A réplica pode mudar em saltos. Um efeito visual de suavização pode acompanhar o alvo recebido, mas é outra camada e não muda a decisão do servidor."
      }
    ]
  },
  "howItWorks": {
    "overview": "ENetMultiplayerPeer prepara servidor ou cliente; verifique Error antes de atribuir o peer ao MultiplayerAPI. create_client retornar OK inicia a tentativa: espere connected_to_server, connection_failed ou server_disconnected. No projeto, a RPC de pedido usa any_peer, call_remote e reliable, direcionada ao ID 1. No receptor, get_remote_sender_id fornece a identidade do remetente; um dicionário do servidor associa esse ID ao jogador permitido. Sequência, ação, direção e cooldown são conferidos antes de mudar posição ou contador. O host passa pela mesma função de validação diretamente, evitando depender de um remetente remoto em chamada local.",
    "anatomy": [
      {
        "prop": "Autoridade por nó e identidade do participante",
        "desc": "O servidor tem ID 1; IDs de clientes reais não são necessariamente 2. A autoridade de um nó é 1 por padrão e pode ser alterada. owner_peer nesta prática é uma propriedade própria para indicar quem envia intenções; não transfere autoridade. set_multiplayer_authority não se replica automaticamente."
      },
      {
        "prop": "@rpc: quem chama, onde executa e como transmite",
        "desc": "any_peer permite chamadas remotas; não valida uma regra de jogo. call_remote evita execução local por essa chamada de RPC; call_local permite a participação local conforme a invocação. reliable tenta reenviar e preservar ordem enquanto há conexão, sem garantir uma ação após desconexão nem autorizar o conteúdo."
      },
      {
        "prop": "Caminho, spawn e replicação configurados",
        "desc": "Os nós de RPC precisam do mesmo NodePath e declaração compatível nas execuções. O Spawner usa ../Jogadores e uma spawn_function que retorna o jogador fora da árvore; o Spawner o adiciona. O Synchronizer de jogador.tscn tem root_path=.. e configuração explícita de owner_peer, position e tiros. Não envia Resources, RIDs ou IDs de instância locais como estado portátil."
      },
      {
        "prop": "@tool: desenho de editor e lógica de jogo",
        "desc": "previa.gd desenha o raio apenas quando Engine.is_editor_hint é true. O setter pede redraw e atualiza avisos; _get_configuration_warnings explica raio zero. O _process retorna no editor e anima só durante Play. A prévia não remove nós, não grava arquivos e não implementa detecção física."
      }
    ]
  },
  "teaching": {
    "codeRequired": true,
    "codeIntro": "Prática principal: oficina.gd na raiz da cena e jogador.gd em jogador.tscn. A cena do jogador já inclui Synchronizer e SceneReplicationConfig. Extensão separada: previa.gd em previa.tscn; não é um script de rede nem deve substituir o controlador principal.",
    "duration": "90–120 min, incluindo duas execuções e falhas (estimativa)",
    "prerequisite": "Aulas 1, 3, 7, 15 e 16: árvore, entrada, sinais, estado e ciclo de vida. Referência Godot 4.5, GDScript, Compatibility, duas execuções desktop do mesmo projeto. Projeto revisado documentalmente; ainda não executado no motor neste ambiente. ENet desta prática usa apenas 127.0.0.1 e não é um projeto Web.",
    "objectives": [
      "Conectar e encerrar duas execuções locais tratando tentativa, sucesso, falha e reconexão.",
      "Enviar intenções para o servidor, validar remetente/contrato e distinguir criação de jogadores, replicação de propriedades e apresentação visual.",
      "Criar uma prévia @tool com redraw e avisos sem executar a lógica de jogo durante edição."
    ],
    "practice": {
      "title": "Prática guiada: uma sessão local e uma prévia de alcance",
      "intro": "A rede começa pequena: um host e um cliente na mesma máquina. Cada jogador é um marcador visual sem colisão, com movimento por passos e um contador de tiros autorizados. Não há projétil real, dano, previsão local, rollback ou sistema de autenticação de produção. A extensão de editor é feita depois, em outra cena.",
      "tree": "oficina.tscn — Oficina (Node2D / oficina.gd)\n├── Jogadores (Node2D criado por código)\n│   └── jogador.tscn, nomeado pelo peer ID, criado pelo Spawner\n│       ├── Leitura (Label)\n│       └── MultiplayerSynchronizer\n│           └── SceneReplicationConfig: owner_peer, position, tiros\n├── Spawner (MultiplayerSpawner criado por código)\n│   ├── spawn_path: ../Jogadores\n│   └── spawn_function: criar_jogador\n└── CanvasLayer / interface (criada por código)\n\nprevia.tscn — Previa (Node2D / previa.gd, @tool)\n└── Arte (Polygon2D)\n\nA raiz Oficina e as RPCs têm o mesmo caminho nas duas execuções.",
      "download": {
        "url": "assets/aula-17-multiplayer-ferramentas.zip",
        "label": "Baixar projeto de apoio: rede local e @tool"
      },
      "downloadNote": "Inclui projeto, três cenas, três scripts e roteiro de teste com duas execuções. Referência Godot 4.5; execução real da rede e do editor ainda pendente.",
      "steps": [
        {
          "title": "Abra duas execuções do mesmo projeto",
          "text": "Extraia o ZIP, importe project.godot e abra oficina.tscn. Execute uma instância desktop; abra uma segunda execução pelo recurso de múltiplas instâncias do editor, ou execute o mesmo projeto em outro processo Godot. Ambas precisam usar os mesmos arquivos e a raiz Oficina. Se estiver usando o editor embutido, destaque as janelas para poder dar foco e identificar qual é host/cliente.",
          "expect": "As duas começam offline, sem jogadores. O projeto não abre conexão sozinho. Os botões de hospedar/conectar são ações distintas; não tente hospedar duas vezes na mesma porta."
        },
        {
          "title": "Hospede e confirme a conexão",
          "text": "Na primeira execução, use Hospedar localmente. O código limita o bind a 127.0.0.1, porta 7000, e aceita um cliente além do host. Na segunda, use Conectar ao host local. Confira a mudança de conectando para cliente e o ID local mostrado. O servidor registra cada participante e chama spawner.spawn(id); criar_jogador retorna o nó, sem chamar add_child nesse callback.",
          "expect": "O host tem ID 1. O cliente recebe um ID positivo que não deve ser presumido como 2. Duas instâncias de jogador aparecem em ambas as árvores Remote; seus nomes/caminhos correspondem entre execuções. owner_peer indica controle, mas a autoridade de ambos continua 1."
        },
        {
          "title": "Peça um passo, em vez de impor uma posição",
          "text": "Dê foco à janela do cliente. Use WASD ou setas: cada toque pede um passo de 40 unidades em um eixo; a repetição automática da tecla é ignorada. Há botões equivalentes. O servidor descobre o remetente pela RPC, procura seu jogador, exige sequência nova, direção cardinal e intervalo mínimo de 0,1 s entre movimentos, e limita x a 80–560 e y a 100–260. Toques muito rápidos podem ser recusados.",
          "expect": "Só o jogador associado ao remetente muda. O cliente não escreve a posição final por RPC nem recebe autoridade sobre o nó. A posição é replicada pelo Synchronizer; no projeto ela pode aparecer em saltos, pois não foi implementada interpolação visual."
        },
        {
          "title": "Valide tiros e rejeite entradas inválidas",
          "text": "Pressione Espaço ou Pedir tiro: o servidor aumenta apenas o contador do jogador do remetente, com cooldown de 0,5 s. Clique duas vezes rapidamente para observar recusa por cooldown. Use P para reenviar a mesma sequência e conferir sua recusa. Use V ou Direção inválida: envia dx=9, fora do contrato, com sequência nova. Confira o feedback na janela de origem e os totais de aceitos/recusados na janela do host.",
          "expect": "Direção inválida não muda posição nem contador. O host também passa por validar, usando sua identidade local. O protocolo consome uma sequência nova mesmo quando o pedido depois falha em direção/cooldown. Sequência não é senha nem autenticação; é parte do contrato desta sessão."
        },
        {
          "title": "Inspecione o que realmente está sendo replicado",
          "text": "Pare a execução e abra jogador.tscn. Selecione MultiplayerSynchronizer: root_path é .. e SceneReplicationConfig lista .:owner_peer, .:position e .:tiros, com spawn ativo. owner_peer e tiros usam ON_CHANGE; position usa ALWAYS, com replication_interval=0.1 s. O controlador configura o Spawner, não uma criação arbitrária em qualquer lugar da árvore.",
          "expect": "ALWAYS usa atualizações não confiáveis; ON_CHANGE usa envio confiável quando há mudança. Replicação não faz colisão, IA ou interpolação por conta própria. reliable das RPCs de pedido é outra configuração. Ao reexecutar as mesmas versões nas duas janelas, caminhos e declarações continuam compatíveis."
        },
        {
          "title": "Desconecte, falhe e recomece",
          "text": "Use Desconectar no cliente: o servidor remove o jogador e o Spawner replica o despawn. Reconecte: confira o novo jogador e o estado inicial. Depois desconecte o host e observe a limpeza no cliente. Para testar falha, tente conectar sem host e aguarde connection_failed. Para erro imediato de hospedagem, tente abrir outro host na mesma porta. Desconectar / limpar permite iniciar outra sessão sem recarregar o projeto.",
          "expect": "Sem nós duplicados ou sessão antiga ainda ativa. create_client retornar OK não equivale a estar conectado. Mensagens reliable não garantem completar ações de uma sessão encerrada. O projeto não é lobby de internet, NAT traversal, criptografia ou proteção completa contra abuso."
        },
        {
          "title": "Faça a extensão de editor separadamente",
          "text": "Pare as execuções, abra previa.tscn no editor e selecione Previa. Ajuste raio no Inspector: o círculo deve redesenhar sem Play. Use zero para ver o aviso de configuração; restaure 140. Execute essa cena com F6: o círculo de editor não é desenhado e Arte recebe uma pequena animação em runtime. Leia o retorno de Engine.is_editor_hint no _process e a condição inversa no _draw.",
          "expect": "Apenas as partes previstas rodam no editor. @tool não significa “só no editor”. O raio é auxílio visual, sem Area2D ou detecção. A extensão evita mudanças destrutivas na árvore editada; adicionar geração/remoção de nós exigiria também tratar owner, persistência e desfazer/refazer."
        }
      ]
    },
    "checks": [
      {
        "question": "O cliente controla o teclado do próprio jogador. Ele precisa ser a autoridade do nó?",
        "answer": "Não. Na prática, owner_peer identifica quem envia intenção e a autoridade continua no servidor. Transferir autoridade seria outra arquitetura e não tornaria o cliente confiável por si só."
      },
      {
        "question": "Por que any_peer e reliable não bastam para autorizar um tiro?",
        "answer": "any_peer permite a chamada remota e reliable define transmissão; nenhum verifica jogador, ação, sequência ou cooldown. A decisão de jogo acontece na validação do servidor."
      },
      {
        "question": "O Synchronizer já suaviza o movimento e escolhe todas as propriedades?",
        "answer": "Não. A prática configura explicitamente posição, dono de controle e tiros. A apresentação pode usar suavização própria, mas ela não é automática nem equivale à previsão local ou rollback."
      },
      {
        "question": "@tool roda exclusivamente no editor?",
        "answer": "Não. As partes sem condição podem rodar no editor e no jogo. Engine.is_editor_hint permite escolher; setters/redraw/avisos cuidam da prévia e o _process retorna durante edição."
      }
    ],
    "pitfalls": [
      {
        "title": "Cliente parece conectado antes de terminar",
        "text": "Diferencie o Error da criação do peer dos sinais de conexão. Trate falha e saída do servidor, feche o peer e limpe o estado antes de outra sessão."
      },
      {
        "title": "RPC ausente ou personagem duplicado",
        "text": "Confira mesmos arquivos, declaração e NodePath nas execuções. A spawn_function retorna um nó fora da árvore; não o adicione manualmente. Só o servidor registra/cria jogadores nesta prática."
      },
      {
        "title": "Estado crítico confiado ao cliente",
        "text": "Use o remetente fornecido pela RPC e a associação mantida pelo servidor. Não receba um ID arbitrário para escolher outra vítima, posição final ou quantidade de ouro. A demonstração ainda não substitui autenticação e controles de produção."
      },
      {
        "title": "Ferramenta altera a cena enquanto você edita",
        "text": "@tool tem acesso à cena editada. Limite a prévia ao desenho neste exercício e não use queue_free para limpar nós indiscriminadamente. O comportamento de editor também precisa de teste no motor."
      }
    ],
    "summary": "O cliente pede, o servidor decide e a réplica recebe estado configurado. Autoridade, identidade, spawn, sincronização e apresentação são responsabilidades distintas. @tool pertence a outro contexto: declare o que pode rodar na edição e mantenha a lógica de jogo fora desse caminho.",
    "next": "Você chegou ao fim da trilha 2D. No menu superior 3D, abra a aula 1 sobre espaço, eixos, unidades e Node3D; as ressalvas de execução e a avaliação final de lacunas do curso continuam registradas.",
    "sources": [
      {
        "label": "Godot 4.5 — Multiplayer de alto nível",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/networking/high_level_multiplayer.html"
      },
      {
        "label": "Godot 4.5 — ENetMultiplayerPeer",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_enetmultiplayerpeer.html"
      },
      {
        "label": "Godot 4.5 — MultiplayerAPI",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_multiplayerapi.html"
      },
      {
        "label": "Godot 4.5 — MultiplayerSpawner",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_multiplayerspawner.html"
      },
      {
        "label": "Godot 4.5 — MultiplayerSynchronizer",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_multiplayersynchronizer.html"
      },
      {
        "label": "Godot 4.5 — SceneReplicationConfig",
        "url": "https://docs.godotengine.org/en/4.5/classes/class_scenereplicationconfig.html"
      },
      {
        "label": "Godot 4.5 — Código no editor",
        "url": "https://docs.godotengine.org/en/4.5/tutorials/plugins/running_code_in_the_editor.html"
      }
    ]
  },
  "approaches": [
    {
      "title": "1. Sessão, pedidos e validação no servidor",
      "whenToUse": "No controlador da prática local com um host e um cliente.",
      "description": "Salve oficina.gd na raiz Oficina de oficina.tscn. jogador.tscn do exemplo 2 é uma dependência. A RPC só encaminha para validar; o host chama essa função diretamente. Bind em loopback e limites desta demonstração estão explícitos; não é código de infraestrutura para publicar uma partida na internet.",
      "code": "extends Node2D\n\nconst PLAYER = preload(\"res://jogador.tscn\")\nconst PORTA: int = 7000\nvar modo: String = \"offline\"\nvar sequencia_local: int = 0\nvar ultimo_pedido: Array = []\nvar regras: Dictionary = {}\nvar aceitos: int = 0\nvar recusados: int = 0\nvar jogadores: Node2D\nvar spawner: MultiplayerSpawner\nvar leitura: Label\nvar mensagem: Label\n\nfunc _ready() -> void:\n    jogadores = Node2D.new()\n    jogadores.name = \"Jogadores\"\n    add_child(jogadores)\n    spawner = MultiplayerSpawner.new()\n    spawner.name = \"Spawner\"\n    spawner.spawn_path = NodePath(\"../Jogadores\")\n    spawner.spawn_function = criar_jogador\n    add_child(spawner)\n    multiplayer.peer_connected.connect(peer_entrou)\n    multiplayer.peer_disconnected.connect(peer_saiu)\n    multiplayer.connected_to_server.connect(conectou)\n    multiplayer.connection_failed.connect(falhou)\n    multiplayer.server_disconnected.connect(servidor_saiu)\n    criar_interface()\n\nfunc criar_interface() -> void:\n    var layer := CanvasLayer.new()\n    add_child(layer)\n    var box := VBoxContainer.new()\n    box.position = Vector2(16, 330)\n    box.custom_minimum_size.x = 608\n    layer.add_child(box)\n    botao(box, \"Hospedar localmente (127.0.0.1:7000)\", hospedar)\n    botao(box, \"Conectar ao host local\", entrar)\n    botao(box, \"Desconectar / limpar\", desconectar)\n    var row := HBoxContainer.new()\n    box.add_child(row)\n    botao(row, \"← / A\", func(): solicitar(\"mover\", -1, 0))\n    botao(row, \"↑ / W\", func(): solicitar(\"mover\", 0, -1))\n    botao(row, \"↓ / S\", func(): solicitar(\"mover\", 0, 1))\n    botao(row, \"→ / D\", func(): solicitar(\"mover\", 1, 0))\n    botao(box, \"Espaço · Pedir tiro (contador visual)\", func(): solicitar(\"atirar\"))\n    botao(box, \"V · Enviar direção inválida\", func(): solicitar(\"mover\", 9, 0))\n    botao(box, \"P · Reenviar mesmo pedido\", reenviar)\n    leitura = Label.new()\n    leitura.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    box.add_child(leitura)\n    mensagem = Label.new()\n    mensagem.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART\n    mensagem.text = \"Abra duas execuções: hospede em uma, conecte na outra.\"\n    box.add_child(mensagem)\n\nfunc botao(parent: Node, text: String, action: Callable) -> void:\n    var button := Button.new()\n    button.text = text\n    button.pressed.connect(action)\n    parent.add_child(button)\n\nfunc hospedar() -> void:\n    if modo != \"offline\":\n        mensagem.text = \"Desconecte antes de iniciar outra sessão.\"\n        return\n    var peer := ENetMultiplayerPeer.new()\n    peer.set_bind_ip(\"127.0.0.1\") # Exercício só nesta máquina.\n    var error := peer.create_server(PORTA, 1) # Um cliente, além do host.\n    if error != OK:\n        mensagem.text = \"Falha ao hospedar: \" + error_string(error)\n        return\n    multiplayer.multiplayer_peer = peer\n    modo = \"host\"\n    registrar(1)\n    mensagem.text = \"Host ID 1 pronto. Conecte a segunda execução.\"\n\nfunc entrar() -> void:\n    if modo != \"offline\":\n        return\n    var peer := ENetMultiplayerPeer.new()\n    var error := peer.create_client(\"127.0.0.1\", PORTA)\n    if error != OK:\n        mensagem.text = \"Pedido de conexão recusado: \" + error_string(error)\n        return\n    multiplayer.multiplayer_peer = peer\n    modo = \"conectando\"\n    mensagem.text = \"Conectando... OK no pedido ainda não confirma a conexão.\"\n\nfunc conectou() -> void:\n    modo = \"cliente\"\n    mensagem.text = \"Conectado. Seu ID real é %d; aguarde seu jogador aparecer.\" % multiplayer.get_unique_id()\n\nfunc falhou() -> void:\n    desconectar()\n    mensagem.text = \"Conexão falhou. Confira host, porta e segunda execução.\"\n\nfunc servidor_saiu() -> void:\n    desconectar()\n    mensagem.text = \"Host desconectou. Estado local limpo; conecte novamente.\"\n\nfunc desconectar() -> void:\n    modo = \"offline\"\n    if multiplayer.multiplayer_peer != null:\n        multiplayer.multiplayer_peer.close()\n    multiplayer.multiplayer_peer = OfflineMultiplayerPeer.new()\n    for child in jogadores.get_children():\n        jogadores.remove_child(child)\n        child.queue_free()\n    regras.clear()\n    sequencia_local = 0\n    ultimo_pedido.clear()\n    aceitos = 0\n    recusados = 0\n    mensagem.text = \"Sessão encerrada; pode hospedar ou conectar novamente.\"\n\nfunc registrar(id: int) -> void:\n    if regras.has(id):\n        return\n    regras[id] = {\"seq\": 0, \"mover\": -1000000.0, \"atirar\": -1000000.0}\n    spawner.spawn(id) # A função retorna o nó fora da árvore; Spawner o adiciona.\n\nfunc peer_entrou(id: int) -> void:\n    if modo == \"host\":\n        registrar(id)\n\nfunc peer_saiu(id: int) -> void:\n    if modo != \"host\":\n        return\n    regras.erase(id)\n    var actor := jogadores.get_node_or_null(str(id))\n    if actor != null:\n        actor.queue_free() # A autoridade remove; Spawner replica o despawn.\n\nfunc criar_jogador(data: Variant) -> Node:\n    var actor := PLAYER.instantiate() as JogadorRede\n    actor.owner_peer = int(data)\n    actor.name = str(actor.owner_peer)\n    actor.position = Vector2(320, 130 if actor.owner_peer == 1 else 230)\n    # Autoridade continua ID 1 em todos os pares. owner_peer é outra função.\n    return actor\n\nfunc solicitar(acao: String, dx: int = 0, dy: int = 0) -> void:\n    if modo != \"host\" and modo != \"cliente\":\n        mensagem.text = \"Conecte antes de enviar ações.\"\n        return\n    sequencia_local += 1\n    ultimo_pedido = [sequencia_local, acao, dx, dy]\n    if modo == \"host\":\n        validar(1, sequencia_local, acao, dx, dy) # Host usa a mesma validação.\n    else:\n        receber_pedido.rpc_id(1, sequencia_local, acao, dx, dy)\n\nfunc reenviar() -> void:\n    if ultimo_pedido.is_empty() or (modo != \"host\" and modo != \"cliente\"):\n        return\n    var seq := int(ultimo_pedido[0])\n    var acao := str(ultimo_pedido[1])\n    var dx := int(ultimo_pedido[2])\n    var dy := int(ultimo_pedido[3])\n    if modo == \"host\":\n        validar(1, seq, acao, dx, dy)\n    else:\n        receber_pedido.rpc_id(1, seq, acao, dx, dy)\n\n@rpc(\"any_peer\", \"call_remote\", \"reliable\", 0)\nfunc receber_pedido(seq: int, acao: String, dx: int, dy: int) -> void:\n    if modo != \"host\" or not multiplayer.is_server():\n        return\n    var remetente := multiplayer.get_remote_sender_id()\n    validar(remetente, seq, acao, dx, dy)\n\nfunc validar(id: int, seq: int, acao: String, dx: int, dy: int) -> void:\n    if not regras.has(id):\n        return\n    var actor := jogadores.get_node_or_null(str(id)) as JogadorRede\n    if actor == null:\n        responder(id, seq, false, \"Jogador ainda não disponível.\")\n        return\n    if seq <= int(regras[id][\"seq\"]) or seq > 1000000000:\n        responder(id, seq, false, \"Sequência repetida ou fora do contrato.\")\n        return\n    regras[id][\"seq\"] = seq # Mesmo um pedido inválido novo consome a sequência.\n    if acao != \"mover\" and acao != \"atirar\":\n        responder(id, seq, false, \"Ação desconhecida.\")\n        return\n    if acao == \"mover\" and not (((dx == -1 or dx == 1) and dy == 0) or ((dy == -1 or dy == 1) and dx == 0)):\n        responder(id, seq, false, \"Direção inválida: use um eixo por pedido.\")\n        return\n    var agora := Time.get_ticks_msec() / 1000.0\n    var espera: float = 0.1 if acao == \"mover\" else 0.5\n    if agora - float(regras[id][acao]) < espera:\n        responder(id, seq, false, \"Ação em cooldown no servidor.\")\n        return\n    regras[id][acao] = agora\n    if acao == \"mover\":\n        actor.position += Vector2(dx, dy) * 40\n        actor.position.x = clampf(actor.position.x, 80, 560)\n        actor.position.y = clampf(actor.position.y, 100, 260)\n    else:\n        actor.tiros += 1 # Contador, não um projétil/dano de jogo completo.\n    responder(id, seq, true, \"Estado autorizado; Synchronizer replica as propriedades configuradas.\")\n\nfunc responder(id: int, seq: int, ok: bool, text: String) -> void:\n    if ok:\n        aceitos += 1\n    else:\n        recusados += 1\n    if id == 1:\n        exibir_resultado(seq, ok, text)\n    elif id in multiplayer.get_peers():\n        resultado.rpc_id(id, seq, ok, text)\n\n@rpc(\"authority\", \"call_remote\", \"reliable\", 0)\nfunc resultado(seq: int, ok: bool, text: String) -> void:\n    exibir_resultado(seq, ok, text)\n\nfunc exibir_resultado(seq: int, ok: bool, text: String) -> void:\n    mensagem.text = \"Pedido %d: %s. %s\" % [seq, \"aceito\" if ok else \"recusado\", text]\n\nfunc _process(_delta: float) -> void:\n    leitura.text = \"Modo: %s | ID local: %d | jogadores: %d\\nNo host: aceitos %d / recusados %d\" % [\n        modo, multiplayer.get_unique_id(), jogadores.get_child_count(), aceitos, recusados]\n\nfunc _unhandled_key_input(event: InputEvent) -> void:\n    if not event is InputEventKey or not event.pressed or event.echo:\n        return\n    if event.ctrl_pressed or event.alt_pressed or event.meta_pressed:\n        return\n    match event.keycode:\n        KEY_A, KEY_LEFT: solicitar(\"mover\", -1, 0)\n        KEY_D, KEY_RIGHT: solicitar(\"mover\", 1, 0)\n        KEY_W, KEY_UP: solicitar(\"mover\", 0, -1)\n        KEY_S, KEY_DOWN: solicitar(\"mover\", 0, 1)\n        KEY_SPACE: solicitar(\"atirar\")\n        KEY_V: solicitar(\"mover\", 9, 0)\n        KEY_P: reenviar()\n",
      "pros": "Trata conexão, falha, saída, reconexão, identidade, contrato e cooldown no mesmo fluxo observável.",
      "cons": "Movimento por passos sem colisão ou previsão; sem autenticação de produção ou proteção completa contra sobrecarga. Reliable não elimina latência."
    },
    {
      "title": "2. Jogador e propriedades do Synchronizer",
      "whenToUse": "Na cena replicada pelo Spawner; a configuração já vem instalada no ZIP.",
      "description": "jogador.gd deve ficar na raiz Node2D de jogador.tscn. O script só desenha e apresenta valores; a configuração na cena replica owner_peer, position e tiros. owner_peer não é a autoridade. Confira no passo 5 os paths e modos exatos; não basta adicionar um Synchronizer vazio.",
      "code": "class_name JogadorRede\nextends Node2D\n\n@export var owner_peer: int = 0\n@export var tiros: int = 0\n\nfunc _process(_delta: float) -> void:\n    $Leitura.global_position = Vector2(clampf(global_position.x - 150, 8, 328), global_position.y + 24)\n    $Leitura.text = \"Controle: peer %d | autoridade: %d | tiros: %d\" % [\n        owner_peer, get_multiplayer_authority(), tiros]\n\nfunc _draw() -> void:\n    draw_circle(Vector2.ZERO, 16, Color(\"5ce1e6\"))\n    draw_line(Vector2.ZERO, Vector2(24, 0), Color(\"d4a359\"), 6)\n\n# A posição e o contador são alterados pelo servidor, não por este _process.\n# O Synchronizer da cena replica as propriedades configuradas; não interpola.\n",
      "pros": "Separa estado autorizado de leitura visual e evita Resources/RIDs no contrato de replicação.",
      "cons": "Não interpola por padrão. As propriedades precisam de configuração explícita e compatível nas duas execuções."
    },
    {
      "title": "3. @tool: raio, redraw e avisos",
      "whenToUse": "Na cena independente previa.tscn, durante a preparação do cenário.",
      "description": "Salve previa.gd na raiz Previa; Arte é um Polygon2D filho. O setter limita o raio e atualiza desenho/avisos. O editor mostra o círculo; o jogo executa apenas a animação prevista. Nenhum nó é removido e nenhum arquivo é gravado por esta extensão.",
      "code": "@tool\nextends Node2D\n\n@export_range(0, 300, 1) var raio: float = 140.0:\n    set(value):\n        raio = clampf(value, 0, 300)\n        queue_redraw()\n        if is_inside_tree():\n            update_configuration_warnings()\n\nvar tempo: float = 0.0\n\nfunc _ready() -> void:\n    update_configuration_warnings()\n    queue_redraw()\n\nfunc _get_configuration_warnings() -> PackedStringArray:\n    if raio <= 0:\n        return PackedStringArray([\"Defina raio maior que zero para enxergar o alcance.\"])\n    return PackedStringArray()\n\nfunc _draw() -> void:\n    if Engine.is_editor_hint() and raio > 0:\n        draw_circle(Vector2.ZERO, raio, Color(0.36, 0.88, 0.90, 0.12))\n        draw_arc(Vector2.ZERO, raio, 0, TAU, 64, Color(\"5ce1e6\"), 2)\n\nfunc _process(delta: float) -> void:\n    if Engine.is_editor_hint():\n        return\n    tempo += delta\n    $Arte.rotation = sin(tempo) * 0.1\n\n# Prévia só desenha: não remove nós nem grava arquivos da cena editada.\n# O círculo é um auxílio visual, não uma Area2D ou detecção de inimigos.\n",
      "pros": "Prévia legível sem iniciar o jogo e aviso de configuração para raio zero.",
      "cons": "É auxílio visual, sem detecção física. Ferramentas que alteram nós ou arquivos exigem outro projeto de persistência e desfazer/refazer."
    }
  ],
  "simulator": {
    "type": "multiplayer_rpc_sim",
    "title": "Laboratório: intenção → validação → réplica",
    "description": "Modelo determinístico em Canvas/JavaScript, com cliente didático ID 2 e servidor ID 1. Não abre rede, executa ENet, Synchronizer ou @tool. RTT é sintético: cada trecho tem atraso base RTT/2, preservando a ordem dos pedidos; não há perdas, retransmissões ou jitter. A posição só muda após um pedido aceito no servidor; a réplica recebe depois. Suavização visual é uma camada própria, sem previsão local. A configuração de snapshots deste modelo não reproduz os modos ALWAYS/ON_CHANGE do projeto real.",
    "guide": [
      {
        "title": "Siga um pedido",
        "text": "Pause com RTT=200 ms. Com foco na cena, D pede um passo à direita. Avance 0,10 s: o servidor vai de x=320 para 360, a réplica fica em 320. Mais 0,10 s: ela recebe x=360. O boneco fica parado sem comandos; cada toque é um pedido."
      },
      {
        "title": "Teste regras e falhas",
        "text": "WASD/setas pedem passos; Espaço pede tiro; P reenvia a mesma sequência de aplicação; V envia direção inválida; C desconecta/reconecta; R restaura. Há botões equivalentes. Reenviar P é outro pedido de aplicação deliberado, não uma simulação de duplicatas internas do ENet. Tiro tem cooldown de 0,5 s; mover, 0,1 s."
      },
      {
        "title": "Compare estado e apresentação",
        "text": "Mude para Suavização visual própria e observe alvo recebido versus posição desenhada. Desconectar descarta a fila; reconectar cria nova sessão e jogador inicial. Alterar RTT muda o atraso base de novas mensagens; pedidos preservam ordem e podem esperar os anteriores. Mensagens já enfileiradas mantêm seu prazo. Use pausa e passos para inspecionar; isso não comprova a rede real."
      }
    ]
  },
  "quiz": {
    "question": "Um cliente chama uma RPC any_peer e reliable pedindo um tiro. Qual decisão corresponde à arquitetura desta aula?",
    "options": [
      "O servidor identifica o remetente e valida o pedido antes de alterar o estado; depois as propriedades configuradas são replicadas.",
      "A confiabilidade do transporte já comprova que o pedido é permitido e dispensa verificar cooldown ou jogador.",
      "O cliente deve informar a posição final e o ID de qualquer jogador que deseja controlar, e o servidor apenas os copia.",
      "Adicionar um MultiplayerSynchronizer vazio basta para criar jogadores, escolher propriedades e interpolar o movimento."
    ],
    "correctIndex": 0,
    "feedback": [
      "Correto. Transporte e permissão de invocação não substituem a regra de jogo.",
      "Reliable trata transmissão; não autoriza o conteúdo da ação.",
      "A associação entre remetente e jogador vem do servidor; a prática recebe intenção, não estado final arbitrário.",
      "Spawner e Synchronizer têm configurações e funções distintas; interpolação visual também precisa ser projetada."
    ],
    "explanation": "O servidor usa a identidade do remetente e o contrato da sessão, verifica sequência, ação, direção e cooldown, altera o estado autorizado e permite a replicação configurada. O host passa pela mesma validação; o cliente não ganha autoridade sobre o nó só por controlar a entrada."
  }
}
];


