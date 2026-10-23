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
    id: "3d-intro-space-axes",
    area: "3d",
    level: "introducao",
    levelLabel: "Introdução",
    title: "1. O Espaço 3D (Node3D, Eixos X/Y/Z, Regra da Mão Direita e Metros)",
    subtitle: "Como funciona a gravidade, por que no 3D o eixo Y finalmente aponta para cima e por que a frente do personagem é o -Z.",
    nodesUsed: ["Node3D", "Vector3", "Marker3D"],
    feynman: {
      title: "Explicação Feynman: O Quarto Real, a Mão Direita e a Fita Métrica",
      explanation: "Lembra que no 2D tudo era desenhado numa folha de caderno onde descer aumentava o Y? Quando entramos na **Forja 3D**, saímos do papel e entramos num quarto real! Aqui, cada `1.0` unidade na Godot equivale exatamente a **1 METRO** da vida real (se um humano tem `1.8` de altura, uma porta deve ter `2.1`!). No 3D, o eixo **Y (Verde)** finalmente aponta para o CÉU (`+Y` sobe, `-Y` cai). O eixo **X (Vermelho)** aponta para os lados. E surge o terceiro irmão: o eixo **Z (Azul)**, que é a PROFUNDIDADE! Faça um ' L ' com o polegar e o indicador da mão direita e aponte o dedo médio para você: o dedo médio é o `+Z` (vindo para trás/para a tela), então olhar para a **FRENTE** lá no fundo da cena é olhar para o **`-Z`** (`Vector3.FORWARD = Vector3(0, 0, -1)`)!",
      analogies: [
        {
          term: "1 Unidade 3D = 1 Metro Real",
          analogy: "A física, a luz e o som 3D da Godot são calibrados em metros: nunca faça um personagem com 200 metros de altura achando que são pixels, senão ele parecerá cair em câmera lenta igual a um prédio gigante!"
        },
        {
          term: "Eixo Y (Verde — Vertical)",
          analogy: "`Vector3.UP` é `(0, 1, 0)` (céu) e `Vector3.DOWN` é `(0, -1, 0)` (chão)."
        },
        {
          term: "Eixo Z (Azul — Profundidade)",
          analogy: "Pela Regra da Mão Direita (OpenGL/Godot), a frente padrão dos modelos e câmeras aponta para `-Z`: `Vector3.FORWARD = (0, 0, -1)`."
        },
        {
          term: "Node3D (Nós Vermelhos/Rosados)",
          analogy: "Enquanto o 2D usa nós azuis (`Node2D`), toda a família espacial 3D tem ícones avermelhados e herda de `Node3D`."
        }
      ]
    },
    howItWorks: {
      overview: "Todo `Node3D` possui posição (`position: Vector3`), rotação (`rotation` em radianos ou `rotation_degrees` em graus) e escala (`scale: Vector3`). Como a física 3D assume 1 unidade = 1 metro e gravidade padrão de `9.8 m/s²`, modelar em escala real garante que luzes, sombras, áudio espacial e colisões funcionem de primeira.",
      anatomy: [
        {
          prop: "Vector3.FORWARD -> Vector3(0, 0, -1)",
          desc: "Direção frontal padrão no espaço global 3D da Godot."
        },
        {
          prop: "Vector3.UP -> Vector3(0, 1, 0)",
          desc: "Aponta para o alto (oposto à gravidade no 3D)."
        },
        {
          prop: "position vs global_position (Vector3)",
          desc: "Coordenada em metros relativa ao nó pai (`position`) ou relativa ao centro `(0, 0, 0)` do mundo (`global_position`)."
        },
        {
          prop: "look_at(alvo_pos, Vector3.UP)",
          desc: "Gira o nó 3D para que sua frente (`-Z`) aponte diretamente para `alvo_pos` mantendo a cabeça em pé (`Vector3.UP`)."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Movendo no Espaço Global vs Espaço Local do Personagem",
        whenToUse: "Para entender a diferença entre mover para o Norte do mapa vs mover para a Frente do nariz do personagem.",
        description: "Somar em `global_position` move nos eixos do mundo; usar `-global_transform.basis.z` move na direção para onde o próprio objeto está virado!",
        code: `extends Node3D

@export var velocidade: float = 5.0 # 5 metros por segundo!

func _process(delta: float) -> void:
    # A) Movimento no eixo Z do MUNDO (sempre para o Norte, mesmo se girar o corpo):
    # global_position += Vector3.FORWARD * velocidade * delta
    
    # B) Movimento para a FRENTE LOCAL do próprio autômato (-basis.z):
    var frente_local: Vector3 = -global_transform.basis.z
    global_position += frente_local * velocidade * delta`,
        pros: "Usar `-global_transform.basis.z` garante que carros, aviões, projéteis e personagens avancem exatamente para onde estão olhando.",
        cons: "Lembre-se do sinal negativo (`-basis.z`), pois a frente na Godot 3D é o Z negativo."
      },
      {
        title: "Forma 2: Fazendo uma Torreta 3D Olhar Suavemente para o Alvo",
        whenToUse: "Torretas mecânicas, câmeras de vigilância ou cabeças de NPCs que acompanham o jogador.",
        description: "`look_at()` vira instantaneamente; para girar com peso mecânico suave, calculamos o ângulo no eixo Y (`atan2`) e interpolamos com `lerp_angle()`!",
        code: `extends Node3D

@export var alvo: Node3D
@export var velocidade_giro: float = 3.0

func _process(delta: float) -> void:
    if not alvo:
        return
    # Direção horizontal (ignorando diferença de altura Y)
    var dir := global_position.direction_to(alvo.global_position)
    # Calcula o ângulo para onde o eixo -Z deve apontar
    var angulo_alvo := atan2(-dir.x, -dir.z)
    # Gira suavemente pelo menor caminho angular (sem dar pirueta de 360 graus!)
    rotation.y = lerp_angle(rotation.y, angulo_alvo, velocidade_giro * delta)`,
        pros: "`lerp_angle` resolve automaticamente a passagem de -180° para +180° sem girar pelo lado errado.",
        cons: "Gira apenas no eixo horizontal Y (Yaw), o que é ideal para personagens no chão e bases de torreta."
      },
      {
        title: "Forma 3: Convertendo Input 2D do Teclado/Controle para Direção 3D no Chão",
        whenToUse: "Qualquer jogo 3D onde o teclado (WASD / Analógico) move o personagem pelo plano do chão (X e Z).",
        description: "Lemos um `Vector2` com `Input.get_vector()` e mapeamos o `x` para o eixo X 3D e o `y` do controle para o eixo Z 3D (deixando o Y 3D reservado para o pulo e gravidade!).",
        code: `extends Node3D

@export var velocidade: float = 6.0

func _process(delta: float) -> void:
    # 1. Lê o controle 2D (x = esquerda/direita, y = frente/trás)
    var input_2d := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
    
    # 2. Converte para o plano do chão 3D (X lateral, 0 altura, Z profundidade)
    var direcao_chao := Vector3(input_2d.x, 0.0, input_2d.y)
    
    global_position += direcao_chao * velocidade * delta`,
        pros: "Padrão universal para traduzir controles de 2 eixos para movimentação no piso 3D.",
        cons: "Se a câmera girar, multiplique a direção pela `Basis` da câmera (veremos na aula de Câmera 3D!)."
      }
    ],
    simulator: {
      type: "space_3d_axes",
      title: "Laboratório de Eixos 3D (X, Y, Z), Escala em Metros & Frente Local (-Z)",
      description: "Gire a câmara isométrica 3D, rotacione o Autômato no eixo Y (Yaw) e teste a diferença entre avançar no `Vector3.FORWARD` global vs `-transform.basis.z` local!"
    },
    quiz: {
      question: "Na Godot 3D, qual é o valor da constante `Vector3.FORWARD` e qual é a unidade de medida padrão do espaço?",
      options: [
        "Vector3(0, 0, 1) e a unidade é 1 pixel.",
        "Vector3(0, 0, -1) e 1.0 unidade equivale a 1 metro real.",
        "Vector3(0, -1, 0) e a unidade é 1 quilômetro.",
        "Vector3(1, 1, 1) sem unidade definida."
      ],
      correctIndex: 1,
      explanation: "Correto! Pela regra da mão direita usada na Godot 3D, a frente aponta para `-Z` (`Vector3(0, 0, -1)`) e cada `1.0` unidade no espaço equivale a 1 metro para a física e iluminação!"
    }
  },

  {
    id: "3d-intro-transforms-basis",
    area: "3d",
    level: "introducao",
    levelLabel: "Introdução",
    title: "2. Transform3D, Basis, Rotações Euler e Quaternions sem Mistério",
    subtitle: "Como funcionam a matriz Transform3D e a Basis, o que é Gimbal Lock e como girar qualquer objeto 3D com perfeição.",
    nodesUsed: ["Transform3D", "Basis", "Quaternion", "Node3D"],
    feynman: {
      title: "Explicação Feynman: A Caixa com 3 Varetas Coloridas e o Globo Terrestre",
      explanation: "Quando você ouve palavras como 'Matriz `Transform3D`', '`Basis`' e '`Quaternion`', parece matemática espacial da NASA! Mas pense assim: todo objeto 3D carrega um pacotinho de carteira de identidade chamado **`Transform3D`**. Dentro desse pacote existem apenas DUAS coisas: 1) **`origin`** (um `Vector3` que diz ONDE o objeto está na sala) e 2) **`basis`** (três varetas coladas no objeto: uma vermelha `x` apontando para a orelha direita dele, uma verde `y` apontando para o chapéu dele, e uma azul `z` apontando para as costas dele). Quando você gira ou estica o objeto, você só está girando essas 3 varetas (`basis`)! E o **`Quaternion`**? Quando você gira um avião usando 3 anéis separados (X, Y, Z), às vezes dois anéis se alinham e travam (*Gimbal Lock*). O Quaternion gira direto de uma pose para outra como se você rodasse uma bola de cristal com a palma da mão, sem nunca travar!",
      analogies: [
        {
          term: "Transform3D (transform / global_transform)",
          analogy: "O pacote completo do objeto 3D: junta a Posição (`origin`) + a Orientação/Escala (`basis`) numa única variável."
        },
        {
          term: "Basis (basis.x, basis.y, basis.z)",
          analogy: "As 3 setas de direção locais presas ao corpo do objeto (Direita = `+basis.x`, Cima = `+basis.y`, Frente = `-basis.z`)."
        },
        {
          term: "Rotações Euler (Pitch, Yaw, Roll)",
          analogy: "Simples de entender em graus: Pitch (X = dizer 'sim' com a cabeça), Yaw (Y = dizer 'não'), Roll (Z = tombar a cabeça de lado)."
        },
        {
          term: "Quaternion & slerp()",
          analogy: "Uma bússola esférica à prova de nós: `basis.slerp()` interpola qualquer rotação 3D pelo caminho mais curto e suave!"
        }
      ]
    },
    howItWorks: {
      overview: "Na prática, para rotações simples de personagens em pé (que só giram para a esquerda/direita no eixo Y), usar `rotation.y` é perfeito. Já para naves espaciais, câmeras livres 3D ou braços robóticos que giram nos 3 eixos ao mesmo tempo, usar `transform.basis` ou `Quaternion` com `.slerp()` evita qualquer distorção ou *Gimbal Lock*.",
      anatomy: [
        {
          prop: "global_transform.origin",
          desc: "Exatamente a mesma coisa que `global_position` (o ponto X, Y, Z onde o nó está)."
        },
        {
          prop: "global_transform.basis",
          desc: "Matriz 3x3 contendo os eixos locais X, Y e Z rotacionados e escalados do objeto."
        },
        {
          prop: "basis_a.slerp(basis_b, peso)",
          desc: "Interpolação Esférica Linear: gira suavemente da orientação A para a orientação B."
        },
        {
          prop: "transform.orthonormalized()",
          desc: "Limpa pequenos erros de arredondamento acumulados e garante que os 3 eixos continuem em 90 graus perfeitos."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Rotação Local vs Global com rotate_object_local e rotate_y",
        whenToUse: "Engrenagens girando, portas abrindo em dobradiças ou aviões inclinando as asas.",
        description: "Usamos métodos prontos do `Node3D` para girar ao redor do próprio eixo da peça sem complicação.",
        code: `extends Node3D

@export var rpm_engrenagem: float = 2.5 # Radianos por segundo

func _process(delta: float) -> void:
    # Gira ao redor do eixo Z local da própria engrenagem
    rotate_object_local(Vector3.BACK, rpm_engrenagem * delta)`,
        pros: "Uma única linha de código e funciona mesmo que a engrenagem esteja inclinada na parede.",
        cons: "Se acumular milhares de giros em múltiplos eixos compostos, chame `orthonormalize()` ocasionalmente."
      },
      {
        title: "Forma 2: Alinhamento Suave em 3 Eixos com Basis.looking_at + slerp()",
        whenToUse: "Drones a vapor, submarinos, mísseis 3D ou câmeras cinematográficas que olham em qualquer ângulo 3D.",
        description: "Calculamos a `Basis` ideal que olha para o alvo (`Basis.looking_at`) e usamos `.slerp()` para girar suavemente nos 3 eixos ao mesmo tempo sem Gimbal Lock!",
        code: `extends Node3D

@export var alvo: Node3D
@export var suavidade_giro: float = 5.0

func _process(delta: float) -> void:
    if not alvo:
        return
    var direcao := global_position.direction_to(alvo.global_position)
    if direcao.length_squared() < 0.001:
        return
        
    # 1. Descobre qual seria a Basis perfeita olhando para o alvo
    var basis_alvo := Basis.looking_at(direcao, Vector3.UP)
    
    # 2. Interpola esfericamente (Quaternion por baixo dos panos!) até ela
    global_transform.basis = global_transform.basis.orthonormalized().slerp(
        basis_alvo,
        suavidade_giro * delta
    )`,
        pros: "Rotação 3D cinematográfica, imune a Gimbal Lock e sem precisar manipular Quaternions manualmente.",
        cons: "`orthonormalized()` reseta a escala para `(1, 1, 1)`, então aplique em nós com escala unitária."
      },
      {
        title: "Forma 3: Alinhando o Personagem ou Carro à Inclinação da Rampa (Normal do Chão)",
        whenToUse: "Veículos a vapor, tanques ou aranhas mecânicas que precisam inclinar o chassi acompanhando o ângulo da ladeira.",
        description: "Reconstruímos o eixo `basis.y` do veículo para apontar na direção da `normal` do chão e recalculamos `x` e `z` com produto vetorial (`cross`).",
        code: `extends Node3D

func alinhar_com_rampa(normal_do_chao: Vector3, delta: float) -> void:
    var nova_basis: Basis = global_transform.basis
    # O novo "Cima" (Y) do carro passa a ser a inclinação da rampa
    nova_basis.y = normal_do_chao
    # Recalcula a Direita (X) perpendicular à frente atual e ao novo Cima
    nova_basis.x = -nova_basis.z.cross(normal_do_chao).normalized()
    # Garante que Z fique 90 graus perfeito
    nova_basis.z = nova_basis.x.cross(nova_basis.y).normalized()
    
    global_transform.basis = global_transform.basis.slerp(nova_basis.orthonormalized(), 10.0 * delta)`,
        pros: "Faz veículos e criaturas quadrúpedes aderirem perfeitamente a terrenos irregulares.",
        cons: "Use suavização (`slerp`) para o veículo não dar solavancos secos nas quinas."
      }
    ],
    simulator: {
      type: "transform_basis_3d",
      title: "Laboratório de Transform3D, Basis (X, Y, Z) & Rotação Slerp",
      description: "Ajuste Pitch (X), Yaw (Y) e Roll (Z) de um giroscópio Steampunk 3D e visualize ao vivo os 3 vetores da `Basis` (`basis.x`, `basis.y`, `-basis.z`) e a matriz `Transform3D`!"
    },
    quiz: {
      question: "O que a propriedade `global_transform.basis` de um `Node3D` armazena?",
      options: [
        "Apenas a cor e a textura do objeto.",
        "Três vetores 3D (`x`, `y`, `z`) que representam a orientação (rotação) e a escala dos eixos locais daquele objeto no espaço.",
        "O arquivo de som do objeto.",
        "A quantidade de vida do jogador."
      ],
      correctIndex: 1,
      explanation: "Exato! A `Basis` guarda os 3 eixos direcionais do objeto (`x` direita, `y` cima, `z` trás/frente `-z`), permitindo saber para onde ele aponta e rotacioná-lo no espaço 3D!"
    }
  },

  {
    id: "3d-intro-meshes-csg",
    area: "3d",
    level: "introducao",
    levelLabel: "Introdução",
    title: "3. Malhas 3D (MeshInstance3D), Prototipagem CSG e Importação GLTF/Blender",
    subtitle: "Como exibir modelos 3D, esculpir fases inteiras dentro da Godot com blocos CSG (Whiteboxing) e importar arquivos do Blender sem dor de cabeça.",
    nodesUsed: ["MeshInstance3D", "CSGBox3D", "CSGCylinder3D", "CSGCombiner3D", "GLTF / .glb"],
    feynman: {
      title: "Explicação Feynman: A Estátua de Arame com Papel Machê e os Cortadores de Massinha",
      explanation: "Como o computador desenha um objeto 3D na tela? Tudo é feito de uma gaiola de triângulos chamada **Malha (`Mesh`)**, exibida pelo nó **`MeshInstance3D`**. Mas e quando você quer testar uma fase hoje mesmo e ainda não modelou o castelo no Blender? A Godot tem os blocos **CSG (*Constructive Solid Geometry*)**! Eles funcionam como massinha de modelar com cortadores: você coloca um `CSGBox3D` grande para ser uma sala, coloca outro `CSGBox3D` menor dentro dele no modo **Subtração (`Subtraction`)** e pronto — ele cava a sala oca e abre o buraco das portas e janelas na hora, já com colisão física pronta para você sair andando!",
      analogies: [
        {
          term: "MeshInstance3D + PrimitiveMesh",
          analogy: "O manequim que exibe uma forma 3D (Caixa, Esfera, Cilindro, Cápsula ou um modelo importado)."
        },
        {
          term: "CSG (CSGBox3D, CSGCylinder3D, CSGPolygon3D)",
          analogy: "Blocos de prototipagem rápida (*Whiteboxing / Greyboxing*): permitem somar formas (`Union`), cavar buracos (`Subtraction`) ou pegar só o cruzamento (`Intersection`)."
        },
        {
          term: "use_collision = true (nos nós CSG)",
          analogy: "Um botão mágico no Inspector do CSG que cria a parede física automaticamente sem você precisar adicionar StaticBody3D na mão!"
        },
        {
          term: "Formato .glb / .gltf (Padrão Ouro Godot 4)",
          analogy: "A ponte direta e moderna entre o Blender/Blockbench e a Godot: traz malhas, materiais, luzes e animações perfeitas."
        }
      ]
    },
    howItWorks: {
      overview: "Para prototipar o level design (testar distâncias de pulo, corredores e escadas), usamos nós `CSG` com `use_collision = true`. Quando o layout da fase está divertido, substituímos por modelos finais `.glb` exportados do Blender (ou usamos sufixos automáticos de importação da Godot como `-col` no nome do objeto no Blender para gerar colisão automática!).",
      anatomy: [
        {
          prop: "MeshInstance3D.mesh",
          desc: "O recurso geométrico (`BoxMesh`, `SphereMesh`, `ArrayMesh`) que define os vértices e triângulos."
        },
        {
          prop: "CSGShape3D.operation (Union / Subtraction / Intersection)",
          desc: "Define se um bloco CSG filho adiciona volume ou escava um buraco no bloco CSG pai."
        },
        {
          prop: "CSGShape3D.use_collision = true",
          desc: "Gera colisão física automática acompanhando todos os recortes e buracos do CSG."
        },
        {
          prop: "Menu Malha -> Criar Forma de Colisão...",
          desc: "No topo da viewport 3D, cria automaticamente um `StaticBody3D + CollisionShape3D` para qualquer `MeshInstance3D` selecionado."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Prototipando Salas e Arcos Steampunk com CSG (Union + Subtraction)",
        whenToUse: "Fase de Level Design (Greyboxing) para testar tamanhos de salas, portas, pontes e tubulações rapidamente.",
        description: "Criamos um `CSGCombiner3D` com `use_collision = true`, adicionamos blocos no modo `Union` e usamos cilindros/caixas no modo `Subtraction` para abrir túneis e portas.",
        code: `extends CSGCombiner3D

func _ready() -> void:
    # Ativa colisão física para toda a estrutura combinada de uma vez!
    use_collision = true
    
    # Você também pode mover ou ativar recortes CSG via código para abrir passagens:
    var buraco_porta: CSGBox3D = $RecortePorta
    buraco_porta.operation = CSGShape3D.OPERATION_SUBTRACTION`,
        pros: "Permite construir e testar uma fase 3D jogável inteira em 15 minutos direto dentro da Godot.",
        cons: "CSG recalcula malhas na CPU; para o cenário final de produção, prefira malhas estáticas ou converta o CSG em `MeshInstance3D` pelo menu 'CSG -> Bake Mesh Instance'!"
      },
      {
        title: "Forma 2: Sufixos Mágicos de Importação do Blender (-col, -convcol, -navmesh)",
        whenToUse: "Ao importar cenários ou objetos `.glb` / `.blend` modelados no Blender.",
        description: "Basta nomear os objetos lá no Blender com sufixos especiais que a Godot cria os nós físicos automaticamente na hora de importar!",
        code: `# Nomes dos objetos dentro do Blender ao exportar para .glb:
#
# "PonteBronze-col"      -> Cria MeshInstance3D + StaticBody3D Trimesh exato!
# "BarrilVapor-convcol"  -> Cria colisão Convexa rápida (ideal para objetos móveis)!
# "ColisaoSecreta-colonly" -> Cria APENAS a colisão invisível (sem desenhar a malha)!
# "PisoSalao-navmesh"    -> Marca a malha automaticamente para navegação de IA!`,
        pros: "Economiza horas de trabalho manual configurando colisões para cada peça de cenário importada.",
        cons: "Use `-col` (Trimesh côncavo) apenas em cenários estáticos; para objetos que se movem (`RigidBody3D`), use sempre `-convcol` ou formas primitivas!"
      },
      {
        title: "Forma 3: Gerando ou Modificando Malhas por Código (ImmediateMesh / SurfaceTool)",
        whenToUse: "Para desenhar feixes de energia 3D, cabos suspensos, trilhos procedurais ou terrenos.",
        description: "`SurfaceTool` permite construir triângulos por código definindo vértices, normais e UVs e gerar um `ArrayMesh` pronto para a GPU.",
        code: `extends MeshInstance3D

func criar_triangulo_bronze() -> void:
    var st := SurfaceTool.new()
    st.begin(Mesh.PRIMITIVE_TRIANGLES)
    st.set_normal(Vector3.UP)
    
    st.set_uv(Vector2(0, 0)); st.add_vertex(Vector3(-1, 0, 0))
    st.set_uv(Vector2(1, 0)); st.add_vertex(Vector3(1, 0, 0))
    st.set_uv(Vector2(0.5, 1)); st.add_vertex(Vector3(0, 0, -2))
    
    # Entrega a malha finalizada para o MeshInstance3D
    mesh = st.commit()`,
        pros: "Liberdade total para geração procedural de geometria 3D.",
        cons: "Mais avançado; para objetos comuns, use primitivas prontas ou modelos `.glb`."
      }
    ],
    simulator: {
      type: "csg_boolean_3d",
      title: "Laboratório de Geometria Booleana CSG 3D (Union, Subtraction, Intersection)",
      description: "Alterne a operação entre `UNION`, `SUBTRACTION` e `INTERSECTION` e mova o cilindro cortador sobre o bloco de bronze para ver como o CSG esculpe túneis e arcos 3D!"
    },
    quiz: {
      question: "Qual propriedade de um nó `CSGBox3D` ou `CSGCombiner3D` permite que o jogador já caminhe e colida com os blocos e buracos esculpidos sem precisar criar um `StaticBody3D` manual?",
      options: [
        "use_collision = true",
        "flip_h = true",
        "one_shot = true",
        "autoplay = true"
      ],
      correctIndex: 0,
      explanation: "Isso mesmo! Ativar `use_collision = true` no nó CSG raiz gera toda a colisão física automaticamente respeitando inclusive os buracos feitos com `Subtraction`!"
    }
  },

  // ==========================================================================
  // NÍVEL II — INICIANTE (Mecânico de Bancada)
  // ==========================================================================
  {
    id: "3d-init-character-physics",
    area: "3d",
    level: "iniciante",
    levelLabel: "Iniciante",
    title: "4. Corpos Físicos 3D e Movimentação (CharacterBody3D, Rampas e Escadas)",
    subtitle: "Como programar movimentação 3D sólida em metros/segundo, subir ladeiras até o ângulo limite e lidar com gravidade tridimensional.",
    nodesUsed: ["CharacterBody3D", "RigidBody3D", "StaticBody3D", "CollisionShape3D"],
    feynman: {
      title: "Explicação Feynman: A Cápsula Deslizante no Mundo de Metros",
      explanation: "Por que quase todo personagem de jogo 3D usa uma **Cápsula (`CapsuleShape3D`)** como forma de colisão em vez de uma caixa quadrada? Imagine tentar empurrar uma caixa de sapato quadrada por uma calçada cheia de pequenos degraus: a quina viva da caixa engancha em qualquer desnível! Já a cápsula tem o fundo arredondado igual a um boneco 'João-Bobo', então ela desliza macio por cima de pequenos degraus e rampas! No `CharacterBody3D`, tudo funciona igual ao irmão 2D, com duas diferenças vitais: 1) pular agora é **positivo** (`velocity.y = +5.5`), porque o céu é `+Y`; e 2) as velocidades são em **metros por segundo** (ex: `5.0` a `8.0` m/s, e não `300.0` como nos pixels do 2D!).",
      analogies: [
        {
          term: "CapsuleShape3D",
          analogy: "O formato ideal para personagens 3D: não engancha nas quinas de rampas nem ao girar perto de paredes."
        },
        {
          term: "Velocidades em Metros/Segundo",
          analogy: "Andar = `3.5 m/s`, Correr = `7.0 m/s`, Pulo = `+4.8 m/s`, Gravidade = `-9.8 m/s²`."
        },
        {
          term: "floor_max_angle (45° padrão)",
          analogy: "A inclinação máxima de ladeira que o personagem consegue subir andando antes de escorregar como parede íngreme."
        },
        {
          term: "floor_snap_length",
          analogy: "Um 'ímã de sola de sapato' que mantém o personagem colado no chão quando ele desce uma rampa correndo, em vez de sair quicando no ar!"
        }
      ]
    },
    howItWorks: {
      overview: "No `CharacterBody3D`, `velocity` é um `Vector3`. Enquanto `velocity.y` cuida da gravidade (`get_gravity().y`) e do pulo, os eixos horizontais `velocity.x` e `velocity.z` cuidam da caminhada pelo chão.",
      anatomy: [
        {
          prop: "get_gravity() -> Vector3(0, -9.8, 0)",
          desc: "Retorna o vetor de gravidade 3D atual (já levando em conta se o personagem entrou numa Area3D de baixa gravidade!)."
        },
        {
          prop: "velocity.y = forca_pulo (+4.5 a +6.5)",
          desc: "No 3D, subir é +Y, então o impulso de pulo é sempre um número POSITIVO!"
        },
        {
          prop: "floor_stop_on_slope = true",
          desc: "Impede que o personagem escorregue sozinho para trás quando para no meio de uma rampa."
        },
        {
          prop: "get_slide_collision_count()",
          desc: "Permite descobrir em quais objetos 3D o jogador esbarrou durante o `move_and_slide()` (útil para empurrar caixas RigidBody3D!)."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Movimentação 3D Padrão Relativa à Orientação do Corpo",
        whenToUse: "Personagens em 1ª pessoa (FPS) ou 3ª pessoa onde o corpo gira junto com a direção da câmera.",
        description: "Multiplicamos a `transform.basis` pelo vetor de entrada `(input.x, 0, input.y)` para que apertar 'W' sempre ande para a frente atual do personagem.",
        code: `extends CharacterBody3D

@export var velocidade: float = 6.0
@export var forca_pulo: float = 5.0

func _physics_process(delta: float) -> void:
    # 1. Gravidade 3D (aponta para -Y)
    if not is_on_floor():
        velocity += get_gravity() * delta

    # 2. Pulo 3D (aponta para +Y!)
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = forca_pulo

    # 3. Direção horizontal relativa para onde o corpo está virado
    var input_dir := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
    var direcao := (transform.basis * Vector3(input_dir.x, 0.0, input_dir.y)).normalized()
    
    if direcao != Vector3.ZERO:
        velocity.x = direcao.x * velocidade
        velocity.z = direcao.z * velocidade
    else:
        velocity.x = move_toward(velocity.x, 0.0, velocidade * 8.0 * delta)
        velocity.z = move_toward(velocity.z, 0.0, velocidade * 8.0 * delta)

    move_and_slide()`,
        pros: "Responsivo, respeita áreas de gravidade com `get_gravity()` e possui frenagem suave nos eixos X e Z.",
        cons: "Não altere `velocity.y` no bloco de frenagem horizontal, senão você cancela a gravidade!"
      },
      {
        title: "Forma 2: Empurrando Objetos Físicos (RigidBody3D) ao Caminhar Contra Eles",
        whenToUse: "Quando seu personagem 3D precisa empurrar barris, engrenagens soltas ou caixotes pelo chão.",
        description: "Após o `move_and_slide()`, percorremos as colisões registradas e aplicamos um impulso nos `RigidBody3D` atingidos.",
        code: `extends CharacterBody3D

@export var forca_empurrao: float = 2.2

func empurrar_objetos_soltos() -> void:
    for i in get_slide_collision_count():
        var colisao := get_slide_collision(i)
        var objeto := colisao.get_collider()
        if objeto is RigidBody3D:
            # Empurra na direção oposta à normal da batida (apenas na horizontal)
            var dir_empurrao := -colisao.get_normal()
            dir_empurrao.y = 0.0
            objeto.apply_central_impulse(dir_empurrao.normalized() * forca_empurrao)`,
        pros: "Evita que um personagem `CharacterBody3D` saia arremessando barris a 100 km/h com força infinita.",
        cons: "Desative ou ajuste `infinite_inertia` se quiser que objetos muito pesados bloqueiem o jogador."
      },
      {
        title: "Forma 3: Coyote Time & Jump Buffer em 3D (Pulo Perdoável de Jogo AAA)",
        whenToUse: "Jogos de plataforma 3D ou ação onde o pulo precisa parecer justo e responsivo.",
        description: "Damos `0.12s` de tolerância para o jogador pular logo após sair da borda de uma plataforma (*Coyote Time*).",
        code: `extends CharacterBody3D

var tempo_coyote: float = 0.0
const TOLERANCIA_COYOTE: float = 0.12
@export var forca_pulo: float = 5.2

func atualizar_pulo_perdoavel(delta: float) -> void:
    if is_on_floor():
        tempo_coyote = TOLERANCIA_COYOTE
    else:
        tempo_coyote -= delta
        
    if Input.is_action_just_pressed("ui_accept") and tempo_coyote > 0.0:
        velocity.y = forca_pulo
        tempo_coyote = 0.0 # Consome o pulo!`,
        pros: "Elimina a frustração de 'apertei o botão de pulo na beiradinha e o boneco caiu direto!'.",
        cons: "Lembre-se de zerar `tempo_coyote` no instante do pulo para não permitir pulo duplo acidental."
      }
    ],
    simulator: {
      type: "character_3d_slopes",
      title: "Laboratório de CharacterBody3D: Gravidade em Metros, Rampas (`floor_max_angle`) e Snap",
      description: "Teste o autômato 3D subindo e descendo rampas de bronze, altere o ângulo da ladeira, a força do pulo (+Y) e o `floor_snap_length`!"
    },
    quiz: {
      question: "Por que em um `CharacterBody2D` o pulo usa um valor negativo (`velocity.y = -450`), mas em um `CharacterBody3D` o pulo usa um valor positivo pequeno (`velocity.y = 5.0`)?",
      options: [
        "Porque no 3D o personagem pula para baixo.",
        "Porque no 3D o eixo +Y aponta para cima (céu) e a unidade padrão é em metros/segundo (1.0 = 1 metro), enquanto no 2D o topo da tela é -Y e a unidade é em pixels!",
        "Porque no 3D não existe gravidade.",
        "É apenas uma escolha estética sem efeito na física."
      ],
      correctIndex: 1,
      explanation: "Exato! No 3D subir é `+Y` e `5.0` significa `5 metros por segundo` para o alto, lutando contra a gravidade de `-9.8 m/s²`."
    }
  },

  {
    id: "3d-init-cameras-springarm",
    area: "3d",
    level: "iniciante",
    levelLabel: "Iniciante",
    title: "5. Câmeras 3D, Visão 1ª Pessoa (FPS) e 3ª Pessoa com SpringArm3D",
    subtitle: "Como capturar o movimento do mouse, limitar o pescoço em 90 graus e usar o braço retrátil que impede a câmera de entrar dentro das paredes.",
    nodesUsed: ["Camera3D", "SpringArm3D", "InputEventMouseMotion"],
    feynman: {
      title: "Explicação Feynman: O Capacete de Mergulhador e o Bastão de Selfie com Mola",
      explanation: "Existem dois jeitos clássicos de enxergar um mundo 3D. Na **1ª Pessoa (FPS)**, a `Camera3D` fica dentro dos olhos do boneco: quando você mexe o mouse para os lados, você gira o CORPO inteiro (eixo Y); quando mexe o mouse para cima e para baixo, você inclina só a CABEÇA (eixo X), travando entre `-85°` e `+85°` para não dar cambalhota com o pescoço! Já na **3ª Pessoa**, a câmera fica atrás das costas do boneco. Mas e se o jogador encostar de costas numa parede? A câmera atravessaria o tijolo e mostraria o lado de fora do mapa! Para resolver isso sem matemática difícil, a Godot tem o **`SpringArm3D` (Braço de Mola)**: um bastão de selfie invisível com uma mola que encolhe sozinho quando bate na parede, trazendo a câmera para perto dos ombros do jogador!",
      analogies: [
        {
          term: "Input.MOUSE_MODE_CAPTURED",
          analogy: "Prende e esconde a setinha do mouse no centro da janela para você poder girar a câmera 3D infinitamente sem o cursor sair da tela."
        },
        {
          term: "clampf(rotacao_x, deg_to_rad(-85), deg_to_rad(85))",
          analogy: "O limite anatômico do pescoço humano: permite olhar para o chão e para o teto sem virar a cabeça de ponta-cabeça."
        },
        {
          term: "SpringArm3D (spring_length)",
          analogy: "Um bastão de selfie retrátil: tem um comprimento desejado (ex: `4.5 metros`), mas se encostar numa parede se retrai na hora!"
        },
        {
          term: "Camera3D.fov (Field of View — Padrão 75°)",
          analogy: "A abertura da lente: diminuir o FOV para `40°` dá efeito de luneta (Zoom); aumentar para `90°` quando o jogador corre dá sensação de alta velocidade!"
        }
      ]
    },
    howItWorks: {
      overview: "Em jogos 3D, a hierarquia limpa separa os eixos de rotação: o `CharacterBody3D` (ou um nó `PivoHorizontal`) gira apenas no eixo `Y` (esquerda/direita), e dentro dele um nó `Cabeca` ou `SpringArm3D` gira apenas no eixo `X` (cima/baixo).",
      anatomy: [
        {
          prop: "Input.mouse_mode = Input.MOUSE_MODE_CAPTURED",
          desc: "Trava o cursor do mouse para leitura de `event.relative` em jogos 3D."
        },
        {
          prop: "SpringArm3D.spring_length",
          desc: "Distância máxima em metros que a câmera fica afastada do pivô quando não há obstáculos."
        },
        {
          prop: "SpringArm3D.add_excluded_object(self.get_rid())",
          desc: "Ensina o bastão de mola a ignorar o próprio corpo do jogador para não encolher à toa!"
        },
        {
          prop: "Camera3D.current = true / make_current()",
          desc: "Define qual câmera 3D da cena está transmitindo imagem para a tela no momento."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Câmera em 1ª Pessoa (FPS) com Limite de Pescoço",
        whenToUse: "Jogos de exploração, tiro em primeira pessoa, terror ou simuladores de oficina.",
        description: "Giramos o corpo (`self`) no eixo Y e o nó filho `$Cabeca` no eixo X com `clampf`.",
        code: `extends CharacterBody3D

@export var sensibilidade_mouse: float = 0.0025
@onready var cabeca: Node3D = $Cabeca

func _ready() -> void:
    Input.mouse_mode = Input.MOUSE_MODE_CAPTURED

func _unhandled_input(event: InputEvent) -> void:
    if event is InputEventMouseMotion and Input.mouse_mode == Input.MOUSE_MODE_CAPTURED:
        # 1. Gira o corpo inteiro para a esquerda/direita (Yaw - Eixo Y)
        rotate_y(-event.relative.x * sensibilidade_mouse)
        # 2. Inclina apenas a cabeça para cima/baixo (Pitch - Eixo X)
        cabeca.rotate_x(-event.relative.y * sensibilidade_mouse)
        # 3. Trava o pescoço entre -85 graus e +85 graus
        cabeca.rotation.x = clampf(cabeca.rotation.x, deg_to_rad(-85.0), deg_to_rad(85.0))`,
        pros: "Movimento de mouse imediato, preciso e nunca entorta o eixo Z (Roll) da câmera.",
        cons: "Adicione uma tecla (como ESC) para devolver `Input.mouse_mode = Input.MOUSE_MODE_VISIBLE` nos menus!"
      },
      {
        title: "Forma 2: Câmera Orbital em 3ª Pessoa com SpringArm3D (Sem Atravessar Paredes)",
        whenToUse: "RPGs de ação, aventura 3D, plataforma 3D (estilo Zelda, Dark Souls, Mario Odyssey).",
        description: "Colocamos a `Camera3D` como filha de um `SpringArm3D`. Quando o personagem anda, o modelo visual (`$ModeloVisual`) gira suavemente para olhar na direção do movimento independente da câmera!",
        code: `extends Node3D # Nó Pivô da Câmera 3ª Pessoa

@export var sensibilidade: float = 0.003
@onready var braco_mola: SpringArm3D = $SpringArm3D

func _ready() -> void:
    # Impede o SpringArm de colidir com o próprio jogador (Pai)
    if get_parent() is CollisionObject3D:
        braco_mola.add_excluded_object(get_parent().get_rid())

func _unhandled_input(event: InputEvent) -> void:
    if event is InputEventMouseMotion:
        rotation.y -= event.relative.x * sensibilidade
        rotation.x = clampf(
            rotation.x - event.relative.y * sensibilidade,
            deg_to_rad(-65.0),
            deg_to_rad(30.0)
        )`,
        pros: "O `SpringArm3D` cuida de toda a matemática de colisão da câmera contra paredes e tetos automaticamente.",
        cons: "Configure um `SphereShape3D` pequeno (`0.2m`) na propriedade `shape` do `SpringArm3D` para evitar que a quina da lente entre na parede."
      },
      {
        title: "Forma 3: FOV Dinâmico de Velocidade / Luneta com Tween",
        whenToUse: "Quando o jogador ativa o Sprint a vapor, usa um Dash ou mira com uma luneta telescópica.",
        description: "Animamos suavemente a propriedade `fov` da `Camera3D` usando um `Tween`.",
        code: `extends Camera3D

var tween_fov: Tween

func ajustar_lente_velocidade(correndo_turbo: bool) -> void:
    if tween_fov:
        tween_fov.kill()
    tween_fov = create_tween().set_trans(Tween.TRANS_CUBIC).set_ease(Tween.EASE_OUT)
    var fov_alvo: float = 92.0 if correndo_turbo else 75.0
    tween_fov.tween_property(self, "fov", fov_alvo, 0.25)`,
        pros: "Cria sensação cinematográfica de impulso e velocidade sem adicionar nenhum custo gráfico.",
        cons: "Evite passar de 105° de FOV para não distorcer os cantos da tela (efeito olho de peixe)."
      }
    ],
    simulator: {
      type: "springarm_camera_3d",
      title: "Laboratório de SpringArm3D (Colisão de Câmera) & Campo de Visão (FOV)",
      description: "Aproxime uma parede de ferro atrás do personagem e veja como o `SpringArm3D` encolhe o bastão automaticamente para a `Camera3D` nunca atravessar o obstáculo!"
    },
    quiz: {
      question: "Qual é a função principal do nó `SpringArm3D` quando usado como pai de uma `Camera3D` em jogos de 3ª pessoa?",
      options: [
        "Fazer o personagem pular mais alto.",
        "Manter a câmera a uma distância definida atrás do jogador, encolhendo automaticamente o braço quando há uma parede ou obstáculo no caminho para a câmera não atravessar o cenário.",
        "Substituir a luz do sol.",
        "Tocar efeitos sonoros de mola."
      ],
      correctIndex: 1,
      explanation: "Perfeito! O `SpringArm3D` projeta um sensor para trás e ajusta a posição da `Camera3D` filha em tempo real sempre que uma parede bloqueia a visão!"
    }
  },

  {
    id: "3d-init-areas-raycasts-picking",
    area: "3d",
    level: "iniciante",
    levelLabel: "Iniciante",
    title: "6. Sensores Espaciais (Area3D), Mira Laser (RayCast3D) e Clique no Mundo 3D",
    subtitle: "Como interagir com portas/alavancas, criar armas de tiro instantâneo no centro da tela e clicar no chão 3D com o mouse.",
    nodesUsed: ["Area3D", "RayCast3D", "ShapeCast3D", "Camera3D.project_ray_origin"],
    feynman: {
      title: "Explicação Feynman: O Dedo Invisível do Jogador e o Raio que Sai da Lente",
      explanation: "Em um jogo 3D, quando você olha para uma alavanca de bronze na parede e aperta a tecla `E` para puxá-la, como o jogo sabe para qual objeto você está olhando? Nós colocamos um **`RayCast3D`** curtinho (de `2.5 metros`) saindo bem do meio da `Camera3D` para a frente (`target_position = Vector3(0, 0, -2.5)`): ele funciona como um braço invisível que toca o objeto à sua frente! E em jogos vistos de cima (como Diablo, League of Legends ou The Sims), quando você clica com o mouse na tela 2D, como descobrir em qual ponto do chão 3D você clicou? A `Camera3D` tem uma função mágica que transforma o clique 2D do vidro da tela num raio 3D que viaja até tocar o piso!",
      analogies: [
        {
          term: "RayCast3D de Interação (2.5m na Câmera)",
          analogy: "O alcance do braço do jogador: se o laser curto da câmera tocar algo do grupo `'interagivel'`, aparece na tela '[E] Abrir Válvula'."
        },
        {
          term: "RayCast3D Longo (100m — Hitscan)",
          analogy: "Disparo instantâneo de rifle ou raio elétrico: descobre o ponto exato `get_collision_point()` e a inclinação `get_collision_normal()` para soltar faíscas na parede!"
        },
        {
          term: "Area3D",
          analogy: "Bolha de detecção tridimensional para explosões, zonas de calor, coleta de itens e gatilhos de cutscenes."
        },
        {
          term: "project_ray_origin / project_ray_normal",
          analogy: "Transforma a posição `(x, y)` do cursor na janela 2D em um feixe 3D que entra dentro do mundo."
        }
      ]
    },
    howItWorks: {
      overview: "Por padrão, o `RayCast3D` detecta apenas Corpos Físicos (`StaticBody3D`, `CharacterBody3D`, `RigidBody3D`). Se você quiser que ele detecte também sensores `Area3D` (como caixas de interação ou Hurtboxes), basta marcar `collide_with_areas = true` no Inspector do `RayCast3D`!",
      anatomy: [
        {
          prop: "raycast.target_position = Vector3(0, 0, -3.0)",
          desc: "Define para onde e até quantos metros o feixe aponta (para a frente da câmera é `-Z`)."
        },
        {
          prop: "raycast.get_collision_point() -> Vector3",
          desc: "Retorna a coordenada global 3D exata onde o feixe atingiu a superfície."
        },
        {
          prop: "raycast.get_collision_normal() -> Vector3",
          desc: "Retorna o vetor perpendicular à superfície atingida (essencial para alinhar buracos de bala e faíscas na parede)."
        },
        {
          prop: "camera.project_ray_normal(mouse_pos)",
          desc: "Retorna a direção 3D apontando da lente da câmera através do pixel clicado pelo mouse."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Sistema de Interação em 1ª/3ª Pessoa ('Aperte E para Acionar')",
        whenToUse: "Portas, baús, alavancas, NPCs e itens que o jogador olha de perto para usar.",
        description: "Um `RayCast3D` filho da `Camera3D` verifica a cada frame se há um objeto com o método `interagir()` na mira.",
        code: `extends RayCast3D

@export var rotulo_dica_ui: Label

func _physics_process(_delta: float) -> void:
    if is_colliding():
        var objeto := get_collider()
        if objeto and objeto.has_method("interagir"):
            rotulo_dica_ui.text = "[E] Acionar Mecanismo"
            rotulo_dica_ui.visible = true
            if Input.is_action_just_pressed("interagir"):
                objeto.interagir()
            return
    rotulo_dica_ui.visible = false`,
        pros: "Extremamente leve e funciona para qualquer objeto que implemente `func interagir()`.",
        cons: "Marque `collide_with_areas = true` se seus objetos interativos forem `Area3D`."
      },
      {
        title: "Forma 2: Impacto 3D Alinhado à Parede (Faíscas e Decals com Normal)",
        whenToUse: "Disparos, magias ou ferramentas de solda que precisam criar faíscas apontando para fora da parede atingida.",
        description: "Instanciamos o efeito no `get_collision_point()` e usamos `look_at()` na direção da `get_collision_normal()`!",
        code: `extends RayCast3D

@export var cena_faiscas: PackedScene

func disparar_feixe_vapor() -> void:
    force_raycast_update()
    if not is_colliding():
        return
    var ponto: Vector3 = get_collision_point()
    var normal: Vector3 = get_collision_normal()
    
    var faisca := cena_faiscas.instantiate() as Node3D
    get_tree().current_scene.add_child(faisca)
    faisca.global_position = ponto
    # Alinha o efeito para jorrar perpendicular à parede atingida!
    if abs(normal.dot(Vector3.UP)) < 0.99:
        faisca.look_at(ponto + normal, Vector3.UP)`,
        pros: "As faíscas e marcas de impacto ficam com o ângulo perfeito seja no chão, no teto ou numa rampa inclinada.",
        cons: "Se a normal for exatamente igual a `Vector3.UP` (chão reto), passe `Vector3.RIGHT` como segundo argumento do `look_at`."
      },
      {
        title: "Forma 3: Clicar com o Mouse no Chão 3D (Click-to-Move / RTS / Isométrico)",
        whenToUse: "Jogos estilo Diablo, Baldur's Gate, RTS ou construção de fábricas onde o mouse aponta no cenário 3D.",
        description: "Projetamos um raio da `Camera3D` passando pela posição do mouse na tela e consultamos o `direct_space_state` 3D.",
        code: `extends Node3D

@export var camera: Camera3D

func obter_ponto_clicado_no_mundo() -> Vector3:
    var pos_mouse := get_viewport().get_mouse_position()
    var origem := camera.project_ray_origin(pos_mouse)
    var fim := origem + camera.project_ray_normal(pos_mouse) * 1000.0
    
    var espaco := get_world_3d().direct_space_state
    var query := PhysicsRayQueryParameters3D.create(origem, fim)
    var resultado := espaco.intersect_ray(query)
    
    if resultado.has("position"):
        return resultado["position"]
    return Vector3.ZERO`,
        pros: "Funciona com qualquer ângulo de câmera (Perspectiva ou Ortográfica/Isométrica).",
        cons: "Filtre `query.collision_mask` caso queira que o clique atravesse árvores e pegue apenas a camada do chão."
      }
    ],
    simulator: {
      type: "raycast_picking_3d",
      title: "Laboratório de RayCast 3D, Ponto de Impacto & Alinhamento pela Normal",
      description: "Mova a mira no espaço 3D sobre diferentes superfícies (chão, rampa e esfera de bronze) e veja como o feixe detecta o ponto de impacto e alinha a normal perpendicularmente!"
    },
    quiz: {
      question: "Quando um `RayCast3D` atinge uma parede inclinada, qual método devolve o vetor perpendicular à superfície (usado para alinhar faíscas ou marcas de impacto)?",
      options: [
        "get_collision_normal()",
        "get_viewport()",
        "is_on_floor()",
        "queue_free()"
      ],
      correctIndex: 0,
      explanation: "Exato! `get_collision_point()` diz ONDE bateu, e `get_collision_normal()` diz QUAL É A INCLINAÇÃO da superfície naquele ponto exato!"
    }
  },

  // ==========================================================================
  // NÍVEL III — INTERMEDIÁRIO (Engenheiro a Vapor)
  // ==========================================================================
  {
    id: "3d-inter-pbr-materials",
    area: "3d",
    level: "intermediario",
    levelLabel: "Intermediário",
    title: "7. Materiais Fisicamente Baseados — PBR (StandardMaterial3D)",
    subtitle: "Como criar latão polido, ferro enferrujado, vidro fosco, relevo de rebites e tubos incandescentes usando o StandardMaterial3D.",
    nodesUsed: ["StandardMaterial3D", "ORMTexture3D", "NormalMap", "Emission"],
    feynman: {
      title: "Explicação Feynman: A Receita Mágica que Imita Qualquer Material do Mundo Real",
      explanation: "Antigamente, fazer metal parecer metal num jogo exigia truques falsos. Hoje, a Godot 4 usa **PBR (*Physically Based Rendering*)** através do **`StandardMaterial3D`**: ele imita como a luz real bate nos objetos usando 4 botões principais! 1) **Albedo** é a tinta pura do objeto sem sombra. 2) **Metallic (0 a 1)** pergunta: 'Isso conduz eletricidade igual metal (`1.0`) ou é isolante igual madeira/plástico/pedra (`0.0`)?'. 3) **Roughness (Aspereza, 0 a 1)** pergunta: 'A superfície foi lixada até virar um espelho liso (`0.0`) ou é áspera e fosca igual tijolo (`1.0`)?'. E 4) **Normal Map** é uma textura roxa/azulada que engana a luz para fingir que há milhares de parafusos, rebites e arranhões em alto-relevo sem gastar triângulos extras!",
      analogies: [
        {
          term: "Albedo (Cor Base)",
          analogy: "A cor do material sob luz branca difusa (ex: amarelo-ouro `#d4a359` para o latão Steampunk)."
        },
        {
          term: "Metallic (0.0 ou 1.0)",
          analogy: "Na natureza quase tudo é `0.0` (madeira, couro, pedra, pele) ou `1.0` (ouro, cobre, ferro, bronze). Só usamos valores no meio se houver poeira ou ferrugem por cima do metal!"
        },
        {
          term: "Roughness (0.0 Espelho <-> 1.0 Fosco)",
          analogy: "O segredo do realismo! Um cano de cobre novo tem `Roughness = 0.2` (brilho nítido); um cano velho e gasto tem `Roughness = 0.75` (brilho espalhado)."
        },
        {
          term: "Emission (Emissão de Luz)",
          analogy: "Faz o material brilhar no escuro como filamento de lâmpada, lava ou tubo de éter ciano (especialmente lindo com o efeito Glow do ambiente!)."
        }
      ]
    },
    howItWorks: {
      overview: "Você pode aplicar um `StandardMaterial3D` na propriedade `material_override` do `MeshInstance3D` ou nos slots individuais de superfície da malha. Para alterar a cor ou emissão de apenas UM inimigo via código sem criar cópias do material inteiro, a Godot 4 oferece `GeometryInstance3D.set_instance_shader_parameter` ou `material_overlay`!",
      anatomy: [
        {
          prop: "albedo_color / albedo_texture",
          desc: "Define a cor base ou imagem de textura principal da superfície."
        },
        {
          prop: "metallic (0.0 a 1.0) & roughness (0.0 a 1.0)",
          desc: "Controlam o comportamento físico dos reflexos de luz sobre a peça."
        },
        {
          prop: "normal_enabled = true / normal_texture",
          desc: "Adiciona micro-relevo de iluminação (parafusos, ranhuras de metal, poros do couro) sem pesar nos vértices."
        },
        {
          prop: "emission_enabled = true / emission_energy_multiplier",
          desc: "Transforma partes da malha (ou uma máscara de textura) em fontes emissoras de brilho."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Configurando Latão Polido vs Cobre Oxidado vs Vidro no Inspector/Código",
        whenToUse: "Ao criar a biblioteca de materiais visuais do seu jogo 3D.",
        description: "Combinamos `albedo_color`, `metallic` e `roughness` para obter metais convincentes.",
        code: `extends MeshInstance3D

func aplicar_latao_steampunk() -> void:
    var mat := StandardMaterial3D.new()
    mat.albedo_color = Color("#d4a359") # Tom dourado/latão
    mat.metallic = 1.0                  # É 100% metal!
    mat.roughness = 0.22                # Polido com reflexos vivos
    material_override = mat`,
        pros: "Reage instantaneamente a todas as luzes e reflexos do cenário com realismo físico.",
        cons: "Um metal (`metallic = 1.0`) num cenário totalmente preto sem `WorldEnvironment`/céu parecerá escuro porque não tem nada ao redor para refletir!"
      },
      {
        title: "Forma 2: Aquecimento Incandescente Dinâmico com Emission",
        whenToUse: "Caldeiras superaquecendo, canos de armas ficando vermelhos de calor ou cristais de energia carregando.",
        description: "Ativamos `emission_enabled` e controlamos `emission_energy_multiplier` conforme a temperatura da máquina.",
        code: `extends MeshInstance3D

var mat_caldeira: StandardMaterial3D

func _ready() -> void:
    # Duplica o material para que apenas esta caldeira esquente sozinha
    mat_caldeira = get_active_material(0).duplicate() as StandardMaterial3D
    set_surface_override_material(0, mat_caldeira)
    mat_caldeira.emission_enabled = true
    mat_caldeira.emission = Color("#ff5511") # Laranja brasa

func definir_temperatura(nivel_0_a_1: float) -> void:
    mat_caldeira.emission_energy_multiplier = nivel_0_a_1 * 4.0`,
        pros: "Quando combinado com o `Glow` do `WorldEnvironment`, cria um halo incandescente espetacular.",
        cons: "Lembre-se de duplicar o material se quiser que apenas uma instância aqueça."
      },
      {
        title: "Forma 3: Efeito de Dano ou Escudo sem Duplicar o Material Original (material_overlay)",
        whenToUse: "Piscar um inimigo 3D complexo (que tem 5 materiais diferentes no corpo) quando leva dano ou ganha um escudo.",
        description: "Em vez de mexer nos materiais originais do modelo, todo `MeshInstance3D` tem a propriedade `material_overlay` que desenha uma película extra por cima da malha inteira!",
        code: `extends MeshInstance3D

@export var material_flash_branco: StandardMaterial3D

func piscar_impacto_3d() -> void:
    # Aplica a película brilhante por cima do modelo inteiro
    material_overlay = material_flash_branco
    await get_tree().create_timer(0.1).timeout
    # Remove a película voltando ao visual original intacto!
    material_overlay = null`,
        pros: "Não precisa duplicar materiais nem desfazer cores originais de personagens com múltiplas texturas.",
        cons: "O `material_overlay` renderiza a malha uma segunda vez durante aquele 0.1 segundo."
      }
    ],
    simulator: {
      type: "pbr_material_3d",
      title: "Laboratório de Materiais PBR 3D (Albedo, Metallic, Roughness & Emission)",
      description: "Gire as válvulas de `Metallic`, `Roughness`, `Emission` e a cor do `Albedo` sobre uma esfera mecânica 3D iluminada e veja como os reflexos especulares e o brilho reagem!"
    },
    quiz: {
      question: "No `StandardMaterial3D` (PBR), como você configura um material para parecer um metal de latão muito bem polido e brilhante?",
      options: [
        "Metallic = 0.0 e Roughness = 1.0",
        "Metallic = 1.0 e Roughness baixo (ex: 0.15 a 0.25), com Albedo em tom dourado.",
        "Desligando todas as luzes da cena.",
        "Colocando Transparency = 1.0."
      ],
      correctIndex: 1,
      explanation: "Perfeito! `Metallic = 1.0` define o comportamento condutor metálico e um `Roughness` baixo (próximo de zero) deixa a superfície lisa e altamente reflexiva!"
    }
  },

  {
    id: "3d-inter-lighting-environment",
    area: "3d",
    level: "intermediario",
    levelLabel: "Intermediário",
    title: "8. Iluminação 3D, WorldEnvironment, Céu e Neblina Volumétrica (Volumetric Fog)",
    subtitle: "Como dominar os 3 tipos de lâmpadas 3D e usar o WorldEnvironment para transformar uma cena chapada em uma pintura atmosférica.",
    nodesUsed: ["DirectionalLight3D", "OmniLight3D", "SpotLight3D", "WorldEnvironment", "Environment"],
    feynman: {
      title: "Explicação Feynman: O Sol, a Lâmpada Nua, a Lanterna e a Máquina de Neblina do Cinema",
      explanation: "Por que cenas 3D de iniciantes parecem de plástico e cenas de filmes parecem reais? O segredo está nas **3 Luzes** e no **Ar da Sala (`WorldEnvironment`)**! 1) A **`DirectionalLight3D`** é o **SOL**: não importa onde você coloque ela no mapa, só importa para onde ela aponta, pois seus raios vêm paralelos do infinito. 2) A **`OmniLight3D`** é uma **vela ou lâmpada sem abajur**: espalha luz em esfera para todos os lados até acabar a força (`omni_range`). 3) A **`SpotLight3D`** é um **farol de locomotiva ou lanterna**: joga um cone focado de luz. E o **`WorldEnvironment`**? Ele é o ar, o céu e a lente de cinema da fase: ativa o **Glow (Bloom)** nos metais incandescentes, o **SSAO** (aquela sombrinha escura nos cantinhos das paredes) e a **Volumetric Fog** (feixes de luz cortando a fumaça a vapor!).",
      analogies: [
        {
          term: "DirectionalLight3D",
          analogy: "O Sol ou a Lua: ilumina o mundo inteiro na direção em que está rotacionada."
        },
        {
          term: "OmniLight3D",
          analogy: "Lamparina de parede ou explosão: ilumina uma esfera ao redor da sua posição (`omni_range` em metros)."
        },
        {
          term: "SpotLight3D",
          analogy: "Holofote, lanterna de mão ou farol: ilumina um cone com abertura definida por `spot_angle`."
        },
        {
          term: "WorldEnvironment (Glow, SSAO, Volumetric Fog, Tonemap)",
          analogy: "O tratamento de cinema: troque o `Tonemap Mode` de `Linear` para **`ACES` ou `AgX`** e veja suas cores e luzes ganharem cara de jogo AAA na hora!"
        }
      ]
    },
    howItWorks: {
      overview: "Na Godot 4 (renderizador Forward+), ativar `Tonemap = AgX` (ou `ACES`), `Glow`, `SSAO` e `Volumetric Fog` dentro do recurso `Environment` do nó `WorldEnvironment` muda completamente a qualidade visual do projeto em menos de 1 minuto.",
      anatomy: [
        {
          prop: "Light3D.shadow_enabled = true",
          desc: "Faz a luz projetar sombras dinâmicas reais (ative apenas nas luzes principais para economizar GPU)."
        },
        {
          prop: "Environment.tonemap_mode = TONEMAPPER_AGX",
          desc: "Mapeia cores muito claras para não estourarem feio, imitando câmeras de cinema reais."
        },
        {
          prop: "Environment.volumetric_fog_enabled = true",
          desc: "Cria neblina tridimensional real que reage aos cones de `SpotLight3D` (God Rays / Feixes de Luz!)."
        },
        {
          prop: "Environment.ssao_enabled = true",
          desc: "Screen-Space Ambient Occlusion: escurece quinas, frestas e o contato dos objetos com o chão."
        }
      ]
    },
    approaches: [
      {
        title: "Forma 1: Ciclo Dia e Noite Girando a DirectionalLight3D",
        whenToUse: "Mundos abertos, cidades Steampunk ou jogos de sobrevivência com passagem de tempo.",
        description: "Como o `ProceduralSkyMaterial` da Godot 4 já acompanha automaticamente a rotação da `DirectionalLight3D`, girar o Sol no eixo X muda a cor do céu do meio-dia para o pôr do sol e noite sozinho!",
        code: `extends DirectionalLight3D

@export var velocidade_dia: float = 0.08 # Radianos por segundo

func _process(delta: float) -> void:
    # Girar o Sol no eixo X move o astro pelo céu e atualiza o ProceduralSkyMaterial!
    rotate_x(velocidade_dia * delta)
    
    # Desliga a sombra quando o sol está abaixo do horizonte (noite)
    var olhando_para_baixo := -global_transform.basis.z.y < 0.0
    shadow_enabled = olhando_para_baixo
    light_energy = 1.2 if olhando_para_baixo else 0.0`,
        pros: "O céu procedural da Godot 4 calcula o pôr do sol alaranjado automaticamente conforme o ângulo da `DirectionalLight3D`!",
        cons: "Durante a noite, desligue `shadow_enabled` do Sol ou troque para uma luz fraca da Lua."
      },
      {
        title: "Forma 2: Lanterna Tática (SpotLight3D) com Feixe Volumétrico na Neblina",
        whenToUse: "Exploração de masmorras escuras, fábricas abandonadas cheias de vapor ou fases noturnas.",
        description: "Anexamos uma `SpotLight3D` à câmera com `light_volumetric_fog_energy` alto para criar um facho de luz denso cortando o vapor.",
        code: `extends SpotLight3D

func _ready() -> void:
    spot_range = 18.0       # Alcance de 18 metros
    spot_angle = 32.0       # Abertura do cone em graus
    shadow_enabled = true
    # Multiplica a intensidade do feixe visível dentro da neblina volumétrica!
    light_volumetric_fog_energy = 3.5

func _unhandled_input(event: InputEvent) -> void:
    if event.is_action_pressed("lanterna"):
        visible = not visible`,
        pros: "Cria um feixe cônico visível no ar ('God Ray') digno de filmes quando `Volumetric Fog` está ativo no `WorldEnvironment`.",
        cons: "`Volumetric Fog` é um recurso do renderizador Forward+ (PC/Consoles)."
      },
      {
        title: "Forma 3: Ajuste de Qualidade Gráfica via Código (Menu de Opções 3D)",
        whenToUse: "Permitir que jogadores com PCs mais modestos desliguem SSAO, SSR e Neblina Volumétrica.",
        description: "Acessamos o recurso `.environment` do `WorldEnvironment` para ligar/desligar os efeitos de pós-processamento em tempo real.",
        code: `extends WorldEnvironment

func aplicar_preset_grafico(qualidade_alta: bool) -> void:
    if not environment:
        return
    environment.ssao_enabled = qualidade_alta
    environment.volumetric_fog_enabled = qualidade_alta
    environment.ssr_enabled = qualidade_alta
    environment.glow_enabled = true # Glow é super leve, pode ficar ativo!`,
        pros: "Dá controle imediato de performance ao usuário sem precisar reiniciar o jogo.",
        cons: "Guarde a escolha do usuário no seu `ConfigFile` (`user://settings.cfg`)."
      }
    ],
    simulator: {
      type: "lighting_3d_env",
      title: "Laboratório de Iluminação 3D (Directional, Omni, Spot) & Volumetric Fog",
      description: "Alterne entre Sol (`DirectionalLight3D`), Lâmpada (`OmniLight3D`) e Holofote (`SpotLight3D`), ajuste o ângulo solar e a densidade da Neblina Volumétrica!"
    },
    quiz: {
      question: "Qual combinação na Godot 4 faz com que um holofote (`SpotLight3D`) exiba um feixe cônico de luz visível atravessando o ar enfumaçado da sala?",
      options: [
        "Usar um Sprite2D na frente da câmera.",
        "Ativar `Volumetric Fog` dentro do recurso `Environment` do nó `WorldEnvironment`.",
        "Mudar a gravidade para zero.",
        "Aumentar o tamanho do CollisionShape3D."
      ],
      correctIndex: 1,
      explanation: "Exato! Quando `Volumetric Fog` está ativado no `WorldEnvironment`, todas as luzes 3D interagem fisicamente com a neblina do ar, criando feixes volumétricos reais!"
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
