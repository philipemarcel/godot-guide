// Complementos P1: preservam IDs e progresso das aulas existentes.
(function(){
  const additions=[
  {
    "id": "2d-ponte-dados",
    "after": "2d-intro-gdscript-lifecycle",
    "area": "2d",
    "level": "introducao",
    "levelLabel": "Introdução",
    "title": "3A. GDScript: coleções, contratos e composição",
    "subtitle": "Leia uma coleção, valide uma operação e entregue um resultado à interface sem misturar responsabilidades.",
    "nodesUsed": [
      "Array",
      "Dictionary",
      "RefCounted",
      "preload"
    ],
    "teaching": {
      "duration": "35–50 min (estimativa; validar com alunos)",
      "prerequisite": "Aula 3: variáveis, funções, if, _ready e execução de um script. Esta ponte prepara física e inventário; não exige sinais, Resources nem save.",
      "codeRequired": true,
      "codeIntro": "O exemplo 1 é o arquivo estoque.gd. Ele estende RefCounted: crie uma instância com new; não o anexe a um nó. hub.gd monta a interface e chama a regra. O exemplo 2 é uma conferência independente via --script; não substitui testar a interface.",
      "objectives": [
        "Percorrer Array e buscar valores em Dictionary por ID.",
        "Definir um contrato de entrada/retorno e rejeitar alterações inválidas.",
        "Compor objetos com estado independente e uma interface que só apresenta o resultado."
      ],
      "practice": {
        "title": "Prática guiada: Bancada de dados e contratos",
        "intro": "Baixe e extraia o projeto. Abra project.godot, importe os recursos e use Compatibility. A referência documental é Godot 4.5; a execução foi conferida na 4.7.2. Use F6 em oficina.tscn ou F5 para o projeto. hub.gd cria a interface e os serviços durante _ready: inspecione esses filhos na aba Remote/Remoto com a aplicação rodando. A aba Local inicialmente mostra apenas Oficina. Os arquivos .gd não são nós filhos. Abra o arquivo estoque.gd no FileSystem para estudar a regra desta oficina.",
        "tree": "Oficina (Control, script hub.gd)\n├── Som (Node, script som.gd; criado em execução)\n├── Controles (Node, script controles.gd; criado em execução)\n└── ScrollContainer (criado em execução)\n    └── MarginContainer\n        └── VBoxContainer (menus, avisos e oficina ativa)\n\nFora da árvore: Estoque, Contador e Partida são objetos RefCounted.\nArquivos .gd e a pasta sons/ ficam no FileSystem, não nesta hierarquia.",
        "download": {
          "url": "assets/oficina-percurso-completo.zip",
          "label": "Baixar projeto das cinco oficinas"
        },
        "downloadNote": "Projeto-fonte com código, sons e testes. Não é um executável exportado. O LEIA-ME contém roteiro, limites e comandos; os ajustes ficam em user:// e não na pasta do site.",
        "steps": [
          {
            "title": "Observe os dados antes da ação",
            "text": "Abra a oficina 1 · Dados. Leia CATALOGO em estoque.gd: um Array contém três Dictionary; cada peça possui id e quantidade. Anote engrenagem=3, valvula=2 e mola=1.",
            "expect": "Os três saldos iniciais aparecem antes de consumir qualquer peça."
          },
          {
            "title": "Leia o laço e a instância",
            "text": "_init percorre cada Dictionary e preenche um novo saldos. Em hub.gd, preload carrega o script e Estoque.new() cria o objeto. O controlador possui esse estoque: isto é composição.",
            "expect": "Outro Estoque.new() começa do catálogo; não recebe o consumo da primeira instância."
          },
          {
            "title": "Siga uma chamada sem decorar o código",
            "text": "Em consumir(\"engrenagem\", 1), id recebe a chave e quantidade recebe o inteiro. has encontra o ID; a guarda confere 1 > 0 e 1 ≤ 3. Só então saldos muda de 3 para 2. O Dictionary de retorno permite ao controlador escolher uma mensagem de sucesso ou de rejeição.",
            "expect": "Na falha não existe campo saldo: a interface lê resultado.ok antes de acessar esse campo. RefCounted não recebe _ready; sua inicialização ocorre em _init."
          },
          {
            "title": "Preveja e execute o caso válido",
            "text": "Escolha engrenagem e quantidade 1. Antes de clicar, preveja o saldo. O controlador chama consumir e apresenta o Dictionary retornado.",
            "expect": "ok=true e saldo=2; as outras peças permanecem iguais."
          },
          {
            "title": "Teste cada guarda",
            "text": "Tente ID inexistente, quantidade 0, -1 e um valor maior que o saldo. Compare o catálogo antes/depois. A guarda retorna antes de alterar saldos.",
            "expect": "ok=false; os saldos não mudam. O erro informa ID ou quantidade inválida."
          },
          {
            "title": "Diferencie tipo de regra",
            "text": "quantidade:int impede passar texto diretamente à função, mas não impede um inteiro negativo. Por isso validar tipo não substitui validar domínio. String é o tipo do ID, não garantia de existência.",
            "expect": "Explique por que -1 compila e ainda assim precisa ser rejeitado."
          },
          {
            "title": "Faça uma variação sem copiar",
            "text": "Adicione parafuso com quantidade 4 ao catálogo, consuma 2 e tente consumir mais 3. Não crie um if especial para esse ID.",
            "expect": "O mesmo laço cria saldo 4; primeiro consumo deixa 2, segundo é rejeitado. Outra instância continua com 4."
          }
        ]
      },
      "checks": [
        {
          "question": "Por que o catálogo não muda ao consumir?",
          "answer": "O laço constrói outro Dictionary para cada instância. consumir altera saldos, não o Array de configuração."
        },
        {
          "question": "Quando é seguro ler resultado.saldo?",
          "answer": "Depois de verificar resultado.ok. A falha só garante ok e motivo."
        },
        {
          "question": "Array[Dictionary] também tipa os campos id e quantidade?",
          "answer": "Não. O Array exige elementos Dictionary, mas os campos do Dictionary ainda precisam de um contrato. Este exemplo tem um catálogo local controlado; dados externos exigiriam validar tipos e chaves antes de montar o estado."
        }
      ],
      "pitfalls": [
        {
          "title": "Saldo ausente no retorno",
          "text": "Verifique ok antes de ler saldo; não esconda uma falha exibindo zero como se a operação tivesse ocorrido."
        },
        {
          "title": "Objeto não aparece na árvore",
          "text": "RefCounted não é Node. Instancie com new no controlador; não o anexe a oficina.tscn."
        }
      ],
      "summary": "Separe configuração, estado de cada instância e apresentação. Tipos documentam o contrato; guardas defendem as regras do jogo.",
      "next": "Retome a aula 4: use funções pequenas e guardas antes de alterar o movimento.",
      "sources": [
        {
          "label": "GDScript: tipos e coleções",
          "url": "https://docs.godotengine.org/en/4.5/tutorials/scripting/gdscript/gdscript_basics.html"
        },
        {
          "label": "RefCounted",
          "url": "https://docs.godotengine.org/en/4.5/classes/class_refcounted.html"
        }
      ]
    },
    "feynman": {
      "title": "Uma operação tem entrada, regra e resultado",
      "explanation": "Um Array organiza uma sequência; um Dictionary associa chaves a valores. Nesta oficina, o Array descreve as peças e o Dictionary saldos permite procurar uma peça pelo ID.\n\nO contrato de consumir recebe String e int e retorna um Dictionary com ok e motivo; saldo só existe no sucesso. A interface verifica ok antes de usar saldo. Todas as guardas acontecem antes da mutação.",
      "analogies": [
        {
          "term": "Catálogo",
          "analogy": "Configuração inicial; não diminui quando alguém consome."
        },
        {
          "term": "Saldo",
          "analogy": "Estado mutável exclusivo de uma instância."
        },
        {
          "term": "Composição",
          "analogy": "O controlador possui e usa um estoque, sem herdar dele."
        }
      ]
    },
    "howItWorks": {
      "overview": "RefCounted é um objeto sem posição na árvore e não recebe _ready. _init prepara o estado ao chamar new. O controlador Control apresenta o retorno; a regra continua testável sem montar a interface. Os valores do catálogo são escalares; se passar a aninhar coleções mutáveis, reveja as cópias e teste independência.",
      "anatomy": [
        {
          "prop": "Array[Dictionary]",
          "desc": "Array tipado; os campos internos ainda precisam de contrato explícito."
        },
        {
          "prop": "for peca in CATALOGO",
          "desc": "Visita as três configurações, sem copiar lógica para cada ID."
        },
        {
          "prop": "saldos.has(id)",
          "desc": "Confere existência antes de indexar."
        },
        {
          "prop": "return {\"ok\": false, ...}",
          "desc": "Resultado previsível; nenhuma mutação ocorreu."
        }
      ]
    },
    "approaches": [
      {
        "title": "Regra resolvida · estoque.gd",
        "whenToUse": "na oficina correspondente do projeto de apoio",
        "description": "Leia de cima para baixo e preveja o resultado antes de executar. O controlador chama esta regra e mostra seu retorno. A interface completa e os recursos estão no ZIP. Primeiro identifique as constantes e variáveis; depois as entradas da função, as guardas que rejeitam a operação e a alteração de estado. Por fim localize em hub.gd o ponto que chama essa função e apresenta seu resultado.",
        "code": "extends RefCounted\n\n# Configuração é copiada; cada instância mantém seu próprio estado.\nconst CATALOGO: Array[Dictionary] = [\n    {\"id\": \"engrenagem\", \"quantidade\": 3},\n    {\"id\": \"valvula\", \"quantidade\": 2},\n    {\"id\": \"mola\", \"quantidade\": 1}\n]\nvar saldos: Dictionary = {}\n\nfunc _init() -> void:\n    for peca in CATALOGO:\n        saldos[peca[\"id\"]] = int(peca[\"quantidade\"])\n\nfunc consumir(id: String, quantidade: int) -> Dictionary:\n    if not saldos.has(id):\n        return {\"ok\": false, \"motivo\": \"ID desconhecido\"}\n    if quantidade <= 0 or quantidade > int(saldos[id]):\n        return {\"ok\": false, \"motivo\": \"Quantidade inválida\"}\n    saldos[id] = int(saldos[id]) - quantidade\n    return {\"ok\": true, \"motivo\": \"Peça consumida\", \"saldo\": saldos[id]}\n",
        "pros": "Código idêntico ao arquivo entregue; regra separada da interface para testar entradas e resultados.",
        "cons": "Não representa sozinho a cena inteira. O arquivo de teste abaixo verifica a regra; confirme também foco, som e apresentação no editor."
      },
      {
        "title": "Conferência executável · dados-conferencia.gd",
        "whenToUse": "após prever os casos válidos e inválidos",
        "description": "Salve este arquivo na raiz do apoio. No terminal, use godot --headless --path . --script res://dados-conferencia.gd. Se godot não estiver no PATH, substitua pelo caminho do seu executável. O programa encerra após a conferência.",
        "code": "extends SceneTree\nfunc _initialize() -> void:\n    call_deferred(\"conferir\")\nfunc conferir() -> void:\n    var e = load(\"res://estoque.gd\").new()\n    assert(e.consumir(\"engrenagem\", 1).saldo == 2)\n    assert(not e.consumir(\"engrenagem\", 0).ok)\n    assert(not e.consumir(\"inexistente\", 1).ok)\n    var outro = load(\"res://estoque.gd\").new()\n    assert(outro.saldos.engrenagem == 3)\n    print(\"Dados: conferência aprovada\")\n    quit()\n",
        "pros": "Falha no contrato é visível por assert; permite repetir a mesma conferência após editar.",
        "cons": "Assert é ferramenta de desenvolvimento, não validação de entrada para uma build de produção. Fluxos de interface continuam no roteiro manual."
      }
    ],
    "simulator": {
      "type": "curriculum_data",
      "title": "Bancada de dados e contratos",
      "description": "Laboratório didático do navegador: consumo validado de um estoque em memória. Não executa GDScript, AudioServer, InputMap ou exportação da Godot. As ações são manuais e não iniciam animações automáticas; o estado é descrito em texto. Reiniciar limpa esta sessão do laboratório, preservando o progresso das aulas.",
      "guide": [
        {
          "title": "Preveja",
          "text": "Consuma uma engrenagem: espere saldo 2."
        },
        {
          "title": "Force uma rejeição",
          "text": "Tente zero, saldo insuficiente e ID ausente; confira que nada muda."
        },
        {
          "title": "Recomece",
          "text": "Reiniciar restaura as três peças; não altera sua conclusão da aula."
        }
      ]
    },
    "quiz": {
      "question": "A quantidade -1 é int. Como impedir que consumir(-1) aumente o estoque?",
      "options": [
        "Confiar apenas na anotação int.",
        "Validar quantidade > 0 antes de mudar o saldo.",
        "Transformar toda entrada em String."
      ],
      "correctIndex": 1,
      "explanation": "Tipo e domínio são contratos diferentes: um inteiro pode ser negativo. A guarda deve rejeitar antes da mutação.",
      "feedback": [
        "int aceita negativos.",
        "",
        "Converter não valida a quantidade."
      ]
    }
  },
  {
    "id": "2d-ponte-depuracao",
    "after": "2d-init-areas-collisions",
    "area": "2d",
    "level": "iniciante",
    "levelLabel": "Iniciante",
    "title": "5A. Depuração e Git: reproduzir, corrigir e recuperar",
    "subtitle": "Demonstre a causa de um defeito, crie uma regressão e preserve uma versão recuperável.",
    "nodesUsed": [
      "Debugger",
      "Remote",
      "Output",
      "Git"
    ],
    "teaching": {
      "duration": "40–60 min (estimativa; validar com alunos)",
      "prerequisite": "Aulas 3 e 5: executar cena, ler funções e árvore. Instale Git para a parte de versionamento; os testes da regra e o debugger não dependem do Git.",
      "codeRequired": true,
      "codeIntro": "O exemplo 1 é o arquivo contador.gd. Ele estende RefCounted: crie uma instância com new; não o anexe a um nó. hub.gd monta a interface e chama a regra. O exemplo 2 é uma conferência independente via --script; não substitui testar a interface.",
      "objectives": [
        "Reproduzir um defeito com esperado e observado claros.",
        "Inspecionar uma execução por breakpoint e distinguir causa de sintoma.",
        "Usar status, diff e commits locais; recuperar um arquivo de exercício sem descartar outros arquivos."
      ],
      "practice": {
        "title": "Prática guiada: Oficina de diagnóstico",
        "intro": "Baixe e extraia o projeto. Abra project.godot, importe os recursos e use Compatibility. A referência documental é Godot 4.5; a execução foi conferida na 4.7.2. Use F6 em oficina.tscn ou F5 para o projeto. hub.gd cria a interface e os serviços durante _ready: inspecione esses filhos na aba Remote/Remoto com a aplicação rodando. A aba Local inicialmente mostra apenas Oficina. Os arquivos .gd não são nós filhos. Abra o arquivo contador.gd no FileSystem para estudar a regra desta oficina.",
        "tree": "Oficina (Control, script hub.gd)\n├── Som (Node, script som.gd; criado em execução)\n├── Controles (Node, script controles.gd; criado em execução)\n└── ScrollContainer (criado em execução)\n    └── MarginContainer\n        └── VBoxContainer (menus, avisos e oficina ativa)\n\nFora da árvore: Estoque, Contador e Partida são objetos RefCounted.\nArquivos .gd e a pasta sons/ ficam no FileSystem, não nesta hierarquia.",
        "download": {
          "url": "assets/oficina-percurso-completo.zip",
          "label": "Baixar projeto das cinco oficinas"
        },
        "downloadNote": "Projeto-fonte com código, sons e testes. Não é um executável exportado. O LEIA-ME contém roteiro, limites e comandos; os ajustes ficam em user:// e não na pasta do site.",
        "steps": [
          {
            "title": "Reproduza antes de mexer",
            "text": "Na oficina 2 · Depuração, clique uma vez em Acionar contador. Esperado=1; observado=2. Anote em exercicio.txt o procedimento mínimo e sua hipótese. O defeito é intencional e está isolado desta oficina.",
            "expect": "O mesmo clique sempre reproduz +2 enquanto defeito_ativo=true."
          },
          {
            "title": "Pare na linha que altera o estado",
            "text": "Abra contador.gd, marque breakpoint na segunda linha total += 1, execute pelo editor e acione. No debugger, inspecione total e defeito_ativo. Avance uma linha: observe 1 virar 2. Continue para evitar confundir programa suspenso com travamento.",
            "expect": "Há duas somas na mesma chamada. É a regra duplicada, não o texto do Label."
          },
          {
            "title": "Compare Local, Remote e Output",
            "text": "Use Remote para localizar os nós vivos da oficina e Output para mensagens. Contador é RefCounted, por isso seus campos são inspecionados no contexto do script/breakpoint, não como um nó remoto.",
            "expect": "Uma árvore remota mostra instâncias reais; o profiler mede custo e não explica sozinho este erro lógico."
          },
          {
            "title": "Corrija e crie regressão",
            "text": "Clique Aplicar correção e zerar: corrigir desliga a segunda soma. Dois cliques devem dar 1 e 2. No código de produção, remova a soma indevida; mantenha esta versão com chave apenas como exercício comparável. Execute testar_antes.gd (saída 1 esperada) e depois testar.gd (saída 0).",
            "expect": "O teste anterior falha pelo contrato; o teste posterior aprova o incremento único."
          },
          {
            "title": "Guarde uma versão local",
            "text": "Extraia uma cópia só para o exercício Git. No terminal nessa pasta: git init; git status; git add .; git diff --cached; git commit -m \"Base da oficina\". Execute cada comando separadamente. Se Git pedir identidade, configure apenas esse repositório com os seus dados e repita o commit. Não publique nem configure remoto.",
            "expect": "Revise o diff antes do commit. .godot e build ficam fora; scripts, cenas, .uid, sons e arquivos .import de configuração ficam no histórico."
          },
          {
            "title": "Recupere só o arquivo de ensaio",
            "text": "Edite apenas exercicio.txt, use git diff -- exercicio.txt, copie seu texto se quiser guardá-lo e execute git restore --source=HEAD -- exercicio.txt. Rode git status; crie outro commit após a correção real.",
            "expect": "O arquivo volta à versão do último commit. restore descarta a edição não commitada apenas desse arquivo; os demais não mudam."
          },
          {
            "title": "Faça uma variação sem copiar",
            "text": "Troque a meta para +3 por clique: ajuste a implementação e o teste de propósito. Explique por que mudar apenas o teste para aceitar o defeito original não seria uma correção.",
            "expect": "Teste e implementação precisam obedecer à nova especificação, registrada antes da mudança."
          }
        ]
      },
      "checks": [
        {
          "question": "Por que mudar o Label esconderia a causa?",
          "answer": "O total continuaria errado, afetando qualquer outra regra que o consulte."
        },
        {
          "question": "O que provar antes de chamar uma correção de concluída?",
          "answer": "Que a mesma reprodução antes falha e depois passa, sem alterar o contrato; conferir também casos próximos."
        },
        {
          "question": "Por que o teste anterior ainda retorna 1 depois de clicar em Aplicar correção?",
          "answer": "O botão modifica a instância da interface. O teste anterior cria outra instância do arquivo com o defeito intencional ligado. Na correção definitiva do arquivo, o mesmo contrato deve passar sem a chave de demonstração. O teste de regressão posterior chama corrigir e verifica incrementos únicos."
        }
      ],
      "pitfalls": [
        {
          "title": "A cena parece congelada",
          "text": "Veja se o debugger está suspenso em breakpoint. Continue a execução ou remova o breakpoint."
        },
        {
          "title": "Git quer incluir cache",
          "text": "Confira .gitignore antes de git add. Não use git add -f .godot. Um ignore novo não remove arquivos que já foram rastreados; use uma cópia limpa para esta prática."
        }
      ],
      "summary": "Reproduza → observe → corrija a causa → repita o mesmo teste → registre uma versão. Não use profiler como sinônimo de debugger.",
      "next": "Retome a aula 6. Leve o ciclo reproduzir, observar e retestar para os próximos exemplos.",
      "sources": [
        {
          "label": "Ferramentas de depuração",
          "url": "https://docs.godotengine.org/en/4.5/tutorials/scripting/debug/overview_of_debugging_tools.html"
        },
        {
          "label": "Versionamento na Godot",
          "url": "https://docs.godotengine.org/en/4.5/tutorials/best_practices/version_control_systems.html"
        },
        {
          "label": "Git restore: referência oficial",
          "url": "https://git-scm.com/docs/git-restore"
        }
      ]
    },
    "feynman": {
      "title": "Observe antes de corrigir",
      "explanation": "Um erro visível pode ter uma causa distante do texto exibido. Defina um caso pequeno, registre o resultado esperado e observe a linha que modifica o estado.\n\nUm breakpoint suspende a execução para inspecionar valores e avançar. Um teste de regressão repete o contrato. Git guarda versões dos arquivos rastreados; não substitui teste nem inclui automaticamente o conteúdo de user://.",
      "analogies": [
        {
          "term": "Esperado/observado",
          "analogy": "Um clique soma 1; nesta falha soma 2."
        },
        {
          "term": "Regressão",
          "analogy": "O mesmo contrato deve falhar antes e passar depois."
        },
        {
          "term": "Commit",
          "analogy": "Versão local dos arquivos revisados; não envia nada à internet."
        }
      ]
    },
    "howItWorks": {
      "overview": "A oficina duplica a mutação dentro de uma chamada. O controlador conecta pressed uma única vez. Isso permite demonstrar a causa sem provocar erros de conexão duplicada. O Git é praticado em uma cópia descartável do projeto; .gitattributes fixa finais de linha e .gitignore exclui cache/build.",
      "anatomy": [
        {
          "prop": "breakpoint",
          "desc": "Pare antes da segunda soma e observe a transição 1→2."
        },
        {
          "prop": "git diff / git diff --cached",
          "desc": "Compare respectivamente edição e conteúdo preparado para commit."
        },
        {
          "prop": "git status",
          "desc": "Mostra rastreados, novos e alterações; não garante que o jogo funciona."
        },
        {
          "prop": "git restore --source=HEAD -- exercicio.txt",
          "desc": "Recupera esse arquivo e descarta sua edição não commitada."
        }
      ]
    },
    "approaches": [
      {
        "title": "Regra resolvida · contador.gd",
        "whenToUse": "na oficina correspondente do projeto de apoio",
        "description": "Leia de cima para baixo e preveja o resultado antes de executar. O controlador chama esta regra e mostra seu retorno. A interface completa e os recursos estão no ZIP. Primeiro identifique as constantes e variáveis; depois as entradas da função, as guardas que rejeitam a operação e a alteração de estado. Por fim localize em hub.gd o ponto que chama essa função e apresenta seu resultado.",
        "code": "extends RefCounted\n\n# Defeito intencional da oficina de depuração. Não usar no jogo final.\nvar defeito_ativo: bool = true\nvar total: int = 0\n\nfunc acionar() -> int:\n    total += 1\n    if defeito_ativo:\n        total += 1 # Coloque um breakpoint aqui e observe total.\n    return total\n\nfunc corrigir() -> void:\n    defeito_ativo = false\n    total = 0\n",
        "pros": "Código idêntico ao arquivo entregue; regra separada da interface para testar entradas e resultados.",
        "cons": "Não representa sozinho a cena inteira. O arquivo de teste abaixo verifica a regra; confirme também foco, som e apresentação no editor."
      },
      {
        "title": "Conferência executável · depuracao-conferencia.gd",
        "whenToUse": "após prever os casos válidos e inválidos",
        "description": "Salve este arquivo na raiz do apoio. No terminal, use godot --headless --path . --script res://depuracao-conferencia.gd. Se godot não estiver no PATH, substitua pelo caminho do seu executável. O programa encerra após a conferência.",
        "code": "extends SceneTree\nfunc _initialize() -> void:\n    call_deferred(\"conferir\")\nfunc conferir() -> void:\n    var c = load(\"res://contador.gd\").new()\n    assert(c.acionar() == 2) # Reprodução conhecida do defeito.\n    c.corrigir()\n    assert(c.acionar() == 1)\n    assert(c.acionar() == 2)\n    print(\"Depuração: antes reproduzido, depois aprovado\")\n    quit()\n",
        "pros": "Falha no contrato é visível por assert; permite repetir a mesma conferência após editar.",
        "cons": "Assert é ferramenta de desenvolvimento, não validação de entrada para uma build de produção. Fluxos de interface continuam no roteiro manual."
      },
      {
        "title": "Git: sequência local em uma cópia",
        "language": "Terminal · Git",
        "whenToUse": "apenas na cópia de exercício, com Git instalado",
        "description": "Execute as linhas separadamente, revise o diff antes do commit e use sua identidade local se Git solicitar. Depois do primeiro commit, edite apenas exercicio.txt para testar o trecho final. restore descarta a edição não commitada desse arquivo; copie seu texto antes caso queira guardá-lo. Nenhum remoto é criado.",
        "code": "git init\ngit status\ngit add .\ngit diff --cached\ngit commit -m \"Base da oficina\"\n\n# Agora edite somente exercicio.txt e confira a diferença.\ngit diff -- exercicio.txt\n# Este comando descarta apenas a edição de exercicio.txt.\ngit restore --source=HEAD -- exercicio.txt\ngit status\n",
        "pros": "Mantém o roteiro de versionamento copiável, com escopo explícito de recuperação.",
        "cons": "Git precisa estar instalado. Não execute restore sobre arquivos do seu trabalho que deseja preservar. Git não comprova que o jogo funciona."
      }
    ],
    "simulator": {
      "type": "curriculum_debug",
      "title": "Oficina de diagnóstico",
      "description": "Laboratório didático do navegador: contador com defeito intencional, checkpoint e correção. Não executa GDScript, AudioServer, InputMap ou exportação da Godot. As ações são manuais e não iniciam animações automáticas; o estado é descrito em texto. Reiniciar limpa esta sessão do laboratório, preservando o progresso das aulas.",
      "guide": [
        {
          "title": "Reproduza",
          "text": "Um clique dá 2. Inspecione o checkpoint e compare com o esperado 1."
        },
        {
          "title": "Corrija",
          "text": "Aplicar correção zera o contador e passa a somar 1."
        },
        {
          "title": "Separe ferramentas",
          "text": "O laboratório não executa Git nem o debugger; faça essa parte no apoio."
        }
      ]
    },
    "quiz": {
      "question": "O Label mostra 2 após um clique. Qual evidência localiza a causa?",
      "options": [
        "Mudar o texto para 1.",
        "No breakpoint, observar a segunda soma alterar total de 1 para 2.",
        "O FPS está alto."
      ],
      "correctIndex": 1,
      "explanation": "A inspeção demonstra a mutação extra; o teste confirma o contrato após corrigir.",
      "feedback": [
        "Isso muda o sintoma.",
        "",
        "FPS não identifica esta falha lógica."
      ]
    }
  },
  {
    "id": "2d-ponte-audio",
    "after": "2d-adv-resources-saveload",
    "area": "2d",
    "level": "avancado",
    "levelLabel": "Avançado",
    "title": "13A. Áudio: buses, volume e ajustes persistidos",
    "subtitle": "Separe música e efeitos, controle volume/mute e recupere ajustes com validação.",
    "nodesUsed": [
      "AudioStreamPlayer",
      "AudioServer",
      "ConfigFile",
      "AudioStreamWAV"
    ],
    "teaching": {
      "duration": "40–55 min (estimativa; validar com alunos)",
      "prerequisite": "Sinais (7), interface (10) e ConfigFile/validação (13). Leia som.gd junto das conexões de sliders em hub.gd.",
      "codeRequired": true,
      "codeIntro": "O exemplo 1 é o arquivo som.gd. Ele estende Node: o controlador cria uma instância e a adiciona à árvore antes de usar os serviços preparados em _ready. hub.gd monta a interface e chama a regra. O exemplo 2 é uma conferência independente via --script; não substitui testar a interface.",
      "objectives": [
        "Rotear players para Music/SFX e a saída Master.",
        "Aplicar volume linear sem converter zero em um valor infinito.",
        "Persistir ajustes validados e comunicar ações também visualmente."
      ],
      "practice": {
        "title": "Prática guiada: Mesa de áudio e persistência",
        "intro": "Baixe e extraia o projeto. Abra project.godot, importe os recursos e use Compatibility. A referência documental é Godot 4.5; a execução foi conferida na 4.7.2. Use F6 em oficina.tscn ou F5 para o projeto. hub.gd cria a interface e os serviços durante _ready: inspecione esses filhos na aba Remote/Remoto com a aplicação rodando. A aba Local inicialmente mostra apenas Oficina. Os arquivos .gd não são nós filhos. Abra o arquivo som.gd no FileSystem para estudar a regra desta oficina.",
        "tree": "Oficina (Control, script hub.gd)\n├── Som (Node, script som.gd; criado em execução)\n├── Controles (Node, script controles.gd; criado em execução)\n└── ScrollContainer (criado em execução)\n    └── MarginContainer\n        └── VBoxContainer (menus, avisos e oficina ativa)\n\nFora da árvore: Estoque, Contador e Partida são objetos RefCounted.\nArquivos .gd e a pasta sons/ ficam no FileSystem, não nesta hierarquia.",
        "download": {
          "url": "assets/oficina-percurso-completo.zip",
          "label": "Baixar projeto das cinco oficinas"
        },
        "downloadNote": "Projeto-fonte com código, sons e testes. Não é um executável exportado. O LEIA-ME contém roteiro, limites e comandos; os ajustes ficam em user:// e não na pasta do site.",
        "steps": [
          {
            "title": "Confira recursos e roteamento",
            "text": "Abra 3 · Áudio. sons/acao.wav e musica.wav foram sintetizados para o apoio e possuem licença incluída. Som cria Music e SFX quando ausentes e envia ambos a Master. No painel Audio, confira esses destinos enquanto executa.",
            "expect": "AudioStreamPlayer de ação usa SFX; música usa Music. Nenhum som começa sozinho."
          },
          {
            "title": "Dispare uma ação observável",
            "text": "Clique Tocar ação. Compare o contador visual e o som. Cada acionamento chama play uma vez num player existente; cliques rápidos reiniciam esse player em vez de criar nós ilimitados.",
            "expect": "Uma confirmação visual por clique, inclusive com Master silenciado. O modelo não promete polifonia."
          },
          {
            "title": "Separe as contribuições",
            "text": "Inicie música explicitamente e leve SFX a zero; depois inverta. Master afeta a soma. A música tem loop no arquivo .import incluído; efeito não tem loop.",
            "expect": "SFX não altera Music. O botão Iniciar/parar música também interrompe a repetição."
          },
          {
            "title": "Leia linear e decibéis",
            "text": "Slider usa 0…1. Em 0.5, linear_to_db dá aproximadamente -6.02 dB, não -0.5 dB. Zero usa mute e piso 0.0001 para evitar logaritmo de zero; o piso não deve produzir som porque o bus fica mudo.",
            "expect": "Zero e mute funcionam sem NaN/infinito. 100% significa ganho unitário, não volume acústico garantido."
          },
          {
            "title": "Salve e reabra",
            "text": "Ajuste volumes e mute, clique Salvar áudio, confira OK, feche e reabra o projeto. Só clicar no slider altera a sessão; salvar grava ConfigFile.",
            "expect": "Os mesmos ajustes reaparecem. user://aether_audio.cfg pertence à aplicação, não à pasta do projeto."
          },
          {
            "title": "Teste dados ausentes e inválidos",
            "text": "Use os casos de testar.gd: arquivo ausente usa padrão; volume textual, fora de 0…1 ou não finito é rejeitado. Erro de gravação deve ser exibido, não tratado como sucesso. Ouça a mistura no dispositivo e confira o VU do Master.",
            "expect": "Configuração inválida não injeta ganho arbitrário. A validação automatizada não prova qualidade auditiva nem ausência de clipping em todo dispositivo."
          },
          {
            "title": "Faça uma variação sem copiar",
            "text": "Inclua um efeito de vitória e um aviso textual correspondente. Reutilize SFX ou justifique outro bus; não toque automaticamente ao abrir o painel.",
            "expect": "O aviso permanece legível com Master mudo; um evento de vitória gera um disparo, sem empilhar players."
          }
        ]
      },
      "checks": [
        {
          "question": "Por que salvar 0.5 não basta para mudar o áudio?",
          "answer": "O valor precisa ser aplicado ao bus. Salvar só escreve a configuração para uma futura leitura."
        },
        {
          "question": "O alerta continua útil sem som?",
          "answer": "Sim: o controlador confirma a ação em texto. Informações essenciais não dependem apenas de áudio."
        },
        {
          "question": "SFX em 0.5 e Master em 0.5 produzem ganho 0.5 na saída?",
          "answer": "Não: os ganhos em sequência se multiplicam, resultando em 0.25. Os valores em dB se somam. Isso não equivale a medir percepção de volume ou clipping no dispositivo."
        }
      ],
      "pitfalls": [
        {
          "title": "O som não sai",
          "text": "Confira mute de Master e do bus, volume do dispositivo, stream importado e destino do player. A execução com audio-driver Dummy dos testes não comprova audição."
        },
        {
          "title": "Reabrir perdeu o ajuste",
          "text": "Confira se Salvar retornou OK e se abriu o mesmo projeto/application name; user:// depende da identidade da aplicação."
        }
      ],
      "summary": "Mantenha reprodução, roteamento e persistência como responsabilidades identificáveis. Teste zero, mute, reabertura e comunicação visual.",
      "next": "Siga para 13B: aplique a mesma política de validação aos controles e à acessibilidade.",
      "sources": [
        {
          "label": "AudioServer",
          "url": "https://docs.godotengine.org/en/4.5/classes/class_audioserver.html"
        },
        {
          "label": "AudioStreamPlayer",
          "url": "https://docs.godotengine.org/en/4.5/classes/class_audiostreamplayer.html"
        },
        {
          "label": "AudioStreamWAV e loop",
          "url": "https://docs.godotengine.org/en/4.5/classes/class_audiostreamwav.html"
        },
        {
          "label": "ConfigFile",
          "url": "https://docs.godotengine.org/en/4.5/classes/class_configfile.html"
        }
      ]
    },
    "feynman": {
      "title": "O player produz áudio; o bus organiza a mistura",
      "explanation": "Music e SFX recebem fontes diferentes e convergem em Master. Ajustar um bus muda o ganho daquele caminho. Um player não precisa ser recriado a cada disparo.\n\nA configuração é carregada, validada e aplicada ao AudioServer. Salvar apenas um número sem aplicá-lo não muda o som. Um evento essencial também precisa de texto ou forma para continuar compreensível no mute.",
      "analogies": [
        {
          "term": "Music/SFX",
          "analogy": "Grupos de fontes que podem ser ajustados separadamente."
        },
        {
          "term": "Master",
          "analogy": "Saída comum da mistura."
        },
        {
          "term": "Volume persistido",
          "analogy": "Valor validado, aplicado e salvo, não só um slider desenhado."
        }
      ]
    },
    "howItWorks": {
      "overview": "som.gd é Node e recebe _ready depois de ser adicionado à árvore por hub.gd. Players e buses são preparados antes de carregar ajustes. A estrutura já existente é reutilizada para não duplicar buses ao reconstruir painéis. Este exemplo não possui Autoload e não muda a configuração de áudio do sistema operacional.\n\nNesta rota sem efeitos adicionais, os ganhos lineares se multiplicam: SFX em 0.5 e Master em 0.5 resultam em ganho 0.25, aproximadamente -12.04 dB. Isso descreve ganho de amplitude, não uma previsão de volume percebido. Com Master mudo, ambos os destinos ficam silenciados. O laboratório agora mostra também esse produto.",
      "anatomy": [
        {
          "prop": "AudioServer.get_bus_index",
          "desc": "Confere a existência antes de criar um bus."
        },
        {
          "prop": "linear_to_db(maxf(v, 0.0001))",
          "desc": "Conversão com piso; zero ainda exige mute."
        },
        {
          "prop": "set_bus_mute",
          "desc": "Silencia Master ou o bus com volume zero."
        },
        {
          "prop": "ConfigFile.load/save",
          "desc": "Erros são retornados e dados precisam de validação por campo."
        }
      ]
    },
    "approaches": [
      {
        "title": "Regra resolvida · som.gd",
        "whenToUse": "na oficina correspondente do projeto de apoio",
        "description": "Leia de cima para baixo e preveja o resultado antes de executar. O controlador chama esta regra e mostra seu retorno. A interface completa e os recursos estão no ZIP. Primeiro identifique as constantes e variáveis; depois as entradas da função, as guardas que rejeitam a operação e a alteração de estado. Por fim localize em hub.gd o ponto que chama essa função e apresenta seu resultado.",
        "code": "extends Node\n\nconst ARQUIVO := \"user://aether_audio.cfg\"\nvar volumes: Dictionary = {\"Master\": 0.6, \"Music\": 0.4, \"SFX\": 0.6}\nvar mudo: bool = false\nvar efeito: AudioStreamPlayer\nvar musica: AudioStreamPlayer\nvar disparos: int = 0\n\nfunc _ready() -> void:\n    for nome in [\"Music\", \"SFX\"]:\n        if AudioServer.get_bus_index(nome) == -1:\n            AudioServer.add_bus()\n            AudioServer.set_bus_name(AudioServer.bus_count - 1, nome)\n        AudioServer.set_bus_send(AudioServer.get_bus_index(nome), \"Master\")\n    efeito = AudioStreamPlayer.new()\n    efeito.bus = &\"SFX\"\n    efeito.stream = load(\"res://sons/acao.wav\")\n    add_child(efeito)\n    musica = AudioStreamPlayer.new()\n    musica.bus = &\"Music\"\n    musica.stream = load(\"res://sons/musica.wav\")\n    add_child(musica)\n    carregar()\n\nfunc aplicar(nome: String, linear: float) -> bool:\n    if not volumes.has(nome) or not is_finite(linear):\n        return false\n    volumes[nome] = clampf(linear, 0.0, 1.0)\n    var indice := AudioServer.get_bus_index(nome)\n    AudioServer.set_bus_volume_db(indice, linear_to_db(maxf(volumes[nome], 0.0001)))\n    AudioServer.set_bus_mute(indice, volumes[nome] == 0.0 or (nome == \"Master\" and mudo))\n    return true\n\nfunc silenciar(valor: bool) -> void:\n    mudo = valor\n    aplicar(\"Master\", volumes[\"Master\"])\n\nfunc tocar_acao() -> void:\n    disparos += 1\n    efeito.play() # Uma chamada reinicia este único player, sem empilhar nós.\n\nfunc alternar_musica() -> void:\n    if musica.playing:\n        musica.stop()\n    else:\n        musica.play()\n\nfunc salvar(caminho: String = ARQUIVO) -> Error:\n    var cfg := ConfigFile.new()\n    for nome in volumes:\n        cfg.set_value(\"audio\", nome, volumes[nome])\n    cfg.set_value(\"audio\", \"mudo\", mudo)\n    return cfg.save(caminho)\n\nfunc carregar(caminho: String = ARQUIVO) -> Error:\n    var cfg := ConfigFile.new()\n    var erro := cfg.load(caminho)\n    var padroes := {\"Master\": 0.6, \"Music\": 0.4, \"SFX\": 0.6}\n    for nome in padroes:\n        var valor: Variant = cfg.get_value(\"audio\", nome, padroes[nome]) if erro == OK else padroes[nome]\n        if not (valor is int or valor is float) or not is_finite(float(valor)) or float(valor) < 0.0 or float(valor) > 1.0:\n            valor = padroes[nome]\n        aplicar(nome, float(valor))\n    var valor_mudo: Variant = cfg.get_value(\"audio\", \"mudo\", false) if erro == OK else false\n    silenciar(valor_mudo if valor_mudo is bool else false)\n    return erro\n",
        "pros": "Código idêntico ao arquivo entregue; regra separada da interface para testar entradas e resultados.",
        "cons": "Não representa sozinho a cena inteira. O arquivo de teste abaixo verifica a regra; confirme também foco, som e apresentação no editor."
      },
      {
        "title": "Conferência executável · audio-conferencia.gd",
        "whenToUse": "após prever os casos válidos e inválidos",
        "description": "Salve este arquivo na raiz do apoio. No terminal, use godot --headless --path . --script res://audio-conferencia.gd. Se godot não estiver no PATH, substitua pelo caminho do seu executável. O programa encerra após a conferência.",
        "code": "extends SceneTree\nfunc _initialize() -> void:\n    call_deferred(\"conferir\")\nfunc conferir() -> void:\n    var s = load(\"res://som.gd\").new()\n    root.add_child(s)\n    assert(s.aplicar(\"SFX\", 0.0))\n    assert(AudioServer.is_bus_mute(AudioServer.get_bus_index(\"SFX\")))\n    assert(not s.aplicar(\"SFX\", NAN))\n    s.queue_free()\n    await process_frame\n    print(\"Áudio: zero e validação aprovados\")\n    quit()\n",
        "pros": "Falha no contrato é visível por assert; permite repetir a mesma conferência após editar.",
        "cons": "Assert é ferramenta de desenvolvimento, não validação de entrada para uma build de produção. Fluxos de interface continuam no roteiro manual."
      }
    ],
    "simulator": {
      "type": "curriculum_audio",
      "title": "Mesa de áudio e persistência",
      "description": "Laboratório didático do navegador: ganhos e snapshots locais de Music/SFX/Master, sem reproduzir áudio. Não executa GDScript, AudioServer, InputMap ou exportação da Godot. As ações são manuais e não iniciam animações automáticas; o estado é descrito em texto. Reiniciar limpa esta sessão do laboratório, preservando o progresso das aulas.",
      "guide": [
        {
          "title": "Calcule",
          "text": "0.5 equivale a cerca de -6.02 dB; zero aparece como mute."
        },
        {
          "title": "Salve e recupere",
          "text": "Salvar snapshot e Reabrir restauram o modelo em memória; não escrevem user://."
        },
        {
          "title": "Confira no motor",
          "text": "Ouça WAVs, observe VU e teste reabertura real no projeto."
        }
      ]
    },
    "quiz": {
      "question": "Ao levar o volume linear a zero, qual política o exemplo usa?",
      "options": [
        "Converter zero diretamente e aceitar -infinito.",
        "Usar mute e um piso finito na conversão.",
        "Criar outro AudioStreamPlayer."
      ],
      "correctIndex": 1,
      "explanation": "O bus fica mudo; o piso mantém o ganho armazenado finito.",
      "feedback": [
        "O exemplo evita esse valor.",
        "",
        "Outro player não resolve o ganho."
      ]
    }
  },
  {
    "id": "2d-ponte-acessibilidade",
    "after": "2d-ponte-audio",
    "area": "2d",
    "level": "avancado",
    "levelLabel": "Avançado",
    "title": "13B. Controles: remapeamento, foco e acessibilidade",
    "subtitle": "Capture uma tecla, trate conflitos e mantenha o menu navegável com preferências persistidas.",
    "nodesUsed": [
      "InputMap",
      "InputEventKey",
      "Control",
      "ConfigFile"
    ],
    "teaching": {
      "duration": "45–60 min (estimativa; validar com alunos)",
      "prerequisite": "InputMap (2/4), Control e foco (10), ConfigFile (13). Este exercício cobre teclado; suporte a controle de jogo é uma extensão a implementar e testar.",
      "codeRequired": true,
      "codeIntro": "O exemplo 1 é o arquivo controles.gd. Ele estende Node: o controlador cria uma instância e a adiciona à árvore antes de usar os serviços preparados em _ready. hub.gd monta a interface e chama a regra. O exemplo 2 é uma conferência independente via --script; não substitui testar a interface.",
      "objectives": [
        "Remapear ações de jogo preservando as ações ui_* do menu.",
        "Cancelar captura, rejeitar conflitos e recuperar padrões.",
        "Aplicar texto ampliado/movimento reduzido e validar foco sem mouse."
      ],
      "practice": {
        "title": "Prática guiada: Painel de captura e recuperação",
        "intro": "Baixe e extraia o projeto. Abra project.godot, importe os recursos e use Compatibility. A referência documental é Godot 4.5; a execução foi conferida na 4.7.2. Use F6 em oficina.tscn ou F5 para o projeto. hub.gd cria a interface e os serviços durante _ready: inspecione esses filhos na aba Remote/Remoto com a aplicação rodando. A aba Local inicialmente mostra apenas Oficina. Os arquivos .gd não são nós filhos. Abra o arquivo controles.gd no FileSystem para estudar a regra desta oficina.",
        "tree": "Oficina (Control, script hub.gd)\n├── Som (Node, script som.gd; criado em execução)\n├── Controles (Node, script controles.gd; criado em execução)\n└── ScrollContainer (criado em execução)\n    └── MarginContainer\n        └── VBoxContainer (menus, avisos e oficina ativa)\n\nFora da árvore: Estoque, Contador e Partida são objetos RefCounted.\nArquivos .gd e a pasta sons/ ficam no FileSystem, não nesta hierarquia.",
        "download": {
          "url": "assets/oficina-percurso-completo.zip",
          "label": "Baixar projeto das cinco oficinas"
        },
        "downloadNote": "Projeto-fonte com código, sons e testes. Não é um executável exportado. O LEIA-ME contém roteiro, limites e comandos; os ajustes ficam em user:// e não na pasta do site.",
        "steps": [
          {
            "title": "Percorra sem mouse",
            "text": "Abra 4 · Controles. Use Tab/Shift+Tab e Enter/Space. Confira a borda de foco. As ações ui_* permanecem intactas. Os botões do jogo também oferecem alternativa ao teclado direcional.",
            "expect": "Todos os controles são alcançáveis; ampliar o texto deve preservar rolagem e leitura."
          },
          {
            "title": "Capture uma ação",
            "text": "Ative of_esquerda e pressione J. O controlador recebe a captura em _input, marca o evento como tratado e só então chama remapear. O exemplo aceita letras A–Z e setas, sem modificadores.",
            "expect": "J substitui A nessa ação. O mesmo evento não deve mover o personagem nem ativar outro botão."
          },
          {
            "title": "Cancele e force conflito",
            "text": "Inicie outra captura e pressione Escape: nada muda, foco volta ao botão. Tente D para esquerda quando direita ainda usa D: a política é rejeitar, explicar o conflito e manter ambos os mapas.",
            "expect": "Não há troca silenciosa nem duplicação. Tab/Enter/Space/Escape ficam reservados ao menu."
          },
          {
            "title": "Aplique e salve",
            "text": "Marque Texto ampliado e Movimento reduzido, remapeie uma tecla e clique Salvar controles. Feche/reabra e teste o jogo com a nova tecla. aplicar libera ações pressionadas antes de trocar eventos.",
            "expect": "As preferências voltam; o pulso de confirmação fica desligado. O deslocamento do jogo já é discreto, sem animação contínua."
          },
          {
            "title": "Recupere uma configuração válida",
            "text": "Use Restaurar e salvar padrões. O carregamento rejeita conjunto com duplicatas, tipo errado ou tecla não permitida e recupera WASD. user://aether_controles.cfg é separado do save da partida.",
            "expect": "Restaurar altera controles/preferências deste exercício; não apaga a partida nem o progresso do curso."
          },
          {
            "title": "Teste foco e perda de janela",
            "text": "No jogo, foque Tabuleiro e use as teclas escolhidas. Tab sai normalmente. Troque de janela: o controlador libera ações, cancela captura e pausa a partida. Ao voltar, retome explicitamente.",
            "expect": "O jogo não continua andando e não captura teclas digitadas nos menus. Esta checagem parcial não é certificação integral de acessibilidade."
          },
          {
            "title": "Faça uma variação sem copiar",
            "text": "Adicione uma ação interagir com uma tecla livre e uma mensagem visual. Defina o padrão, inclua validação/persistência e teste conflito com movimento.",
            "expect": "Remapear interagir não altera navegação do menu; reabrir e restaurar continuam consistentes."
          }
        ]
      },
      "checks": [
        {
          "question": "Por que não remapear ui_accept junto com andar?",
          "answer": "O aluno pode perder a forma de confirmar ou sair do menu. Ações de navegação ficam reservadas neste exercício."
        },
        {
          "question": "Qual é a política para duas ações com a mesma tecla?",
          "answer": "Rejeitar a nova escolha, explicar qual ação já usa a tecla e manter o mapa anterior."
        }
      ],
      "pitfalls": [
        {
          "title": "A tecla nova não move",
          "text": "Foque o botão Tabuleiro; confira a ação e o physical_keycode. Fora dele, as teclas pertencem à interface."
        },
        {
          "title": "Enter virou movimento",
          "text": "Não altere ui_*; capture o evento antes da regra de jogo e marque-o tratado. Teste cancelar e conflito também."
        },
        {
          "title": "Uma tecla reservada não encerra a captura",
          "text": "Durante a captura, Tab/Enter/Space são recusados e a espera continua; Escape cancela. Fora da captura, essas teclas voltam a navegar/ativar o menu. Uma tecla em conflito encerra a tentativa com aviso e preserva o mapa."
        }
      ],
      "summary": "Remapeamento só está completo quando cancelar, conflitar, restaurar, persistir e navegar por foco também funcionam.",
      "next": "Retome a aula 14; depois use estes ajustes no projeto integrador 18.",
      "sources": [
        {
          "label": "InputMap",
          "url": "https://docs.godotengine.org/en/4.5/classes/class_inputmap.html"
        },
        {
          "label": "InputEventKey",
          "url": "https://docs.godotengine.org/en/4.5/classes/class_inputeventkey.html"
        },
        {
          "label": "Control e foco",
          "url": "https://docs.godotengine.org/en/4.5/classes/class_control.html"
        },
        {
          "label": "Usar InputEvent",
          "url": "https://docs.godotengine.org/en/4.5/tutorials/inputs/inputevent.html"
        }
      ]
    },
    "feynman": {
      "title": "Entrada de jogo e navegação de menu têm contratos diferentes",
      "explanation": "Uma ação lógica, como of_esquerda, pode receber outra tecla sem reescrever a regra de movimento. O mapeamento deste exercício usa physical_keycode: posição física da tecla; nomes exibidos podem variar com layout.\n\nDurante a captura, uma tecla é uma candidata à configuração. Ela não deve também jogar. Escape cancela; um conflito é informado e rejeitado. Foco visível e opções de recuperação tornam essa decisão controlável.",
      "analogies": [
        {
          "term": "Ação lógica",
          "analogy": "Nome que a regra entende, separado da tecla física."
        },
        {
          "term": "Captura",
          "analogy": "Estado temporário com cancelar e retorno de foco."
        },
        {
          "term": "Alternativas",
          "analogy": "Texto/forma e botões acompanham cor, som e teclado."
        }
      ]
    },
    "howItWorks": {
      "overview": "controles.gd guarda o contrato e altera InputMap; hub.gd possui a captura e o foco. Só o botão Tabuleiro recebe movimento via gui_input, para não interceptar a navegação global. Modificadores são rejeitados no controlador. Salvar preferências é explícito; carregar valida o conjunto antes de aplicar.",
      "anatomy": [
        {
          "prop": "physical_keycode",
          "desc": "Somente esse campo é definido no evento de mapeamento."
        },
        {
          "prop": "action_erase_events / action_add_event",
          "desc": "Substitui o vínculo da ação própria, preservando ui_*."
        },
        {
          "prop": "Input.action_release",
          "desc": "Evita ação virtual permanecer pressionada após a troca."
        },
        {
          "prop": "grab_focus / accept_event",
          "desc": "Devolve foco e evita que uma tecla tratada se propague indevidamente."
        }
      ]
    },
    "approaches": [
      {
        "title": "Regra resolvida · controles.gd",
        "whenToUse": "na oficina correspondente do projeto de apoio",
        "description": "Leia de cima para baixo e preveja o resultado antes de executar. O controlador chama esta regra e mostra seu retorno. A interface completa e os recursos estão no ZIP. Primeiro identifique as constantes e variáveis; depois as entradas da função, as guardas que rejeitam a operação e a alteração de estado. Por fim localize em hub.gd o ponto que chama essa função e apresenta seu resultado.",
        "code": "extends Node\n\nconst ARQUIVO := \"user://aether_controles.cfg\"\nconst PADROES := {\"of_esquerda\": KEY_A, \"of_direita\": KEY_D, \"of_cima\": KEY_W, \"of_baixo\": KEY_S}\n# ui_* permanece separado: Tab/Enter/Space/Escape continuam navegando o menu.\nvar teclas: Dictionary = PADROES.duplicate()\nvar capturando: String = \"\"\nvar movimento_reduzido: bool = false\nvar texto_grande: bool = false\n\nfunc _ready() -> void:\n    carregar()\n\nfunc codigo_valido(codigo: int) -> bool:\n    return (codigo >= KEY_A and codigo <= KEY_Z) or codigo in [KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN]\n\nfunc aplicar() -> void:\n    for acao in teclas:\n        if not InputMap.has_action(acao):\n            InputMap.add_action(acao)\n        Input.action_release(acao)\n        InputMap.action_erase_events(acao)\n        var evento := InputEventKey.new()\n        evento.physical_keycode = teclas[acao]\n        InputMap.action_add_event(acao, evento)\n\nfunc remapear(acao: String, codigo: int) -> String:\n    if not teclas.has(acao) or not codigo_valido(codigo):\n        return \"Use letras A–Z ou setas; teclas de menu são reservadas.\"\n    for outra in teclas:\n        if outra != acao and teclas[outra] == codigo:\n            return \"Conflito com \" + outra + \"; nada foi alterado.\"\n    teclas[acao] = codigo\n    aplicar()\n    return \"Mapeamento aplicado\"\n\nfunc restaurar() -> void:\n    teclas = PADROES.duplicate()\n    capturando = \"\"\n    movimento_reduzido = false\n    texto_grande = false\n    aplicar()\n\nfunc salvar(caminho: String = ARQUIVO) -> Error:\n    var cfg := ConfigFile.new()\n    for acao in teclas:\n        cfg.set_value(\"teclas\", acao, teclas[acao])\n    cfg.set_value(\"acesso\", \"movimento_reduzido\", movimento_reduzido)\n    cfg.set_value(\"acesso\", \"texto_grande\", texto_grande)\n    return cfg.save(caminho)\n\nfunc carregar(caminho: String = ARQUIVO) -> Error:\n    var cfg := ConfigFile.new()\n    var erro := cfg.load(caminho)\n    var candidato := PADROES.duplicate()\n    var usados: Array[int] = []\n    var valido := erro == OK\n    for acao in candidato:\n        var codigo: Variant = cfg.get_value(\"teclas\", acao, PADROES[acao])\n        if not codigo is int or not codigo_valido(int(codigo)) or codigo in usados:\n            valido = false\n        else:\n            candidato[acao] = codigo\n            usados.append(codigo)\n    teclas = candidato if valido else PADROES.duplicate()\n    var reduzido: Variant = cfg.get_value(\"acesso\", \"movimento_reduzido\", false)\n    var grande: Variant = cfg.get_value(\"acesso\", \"texto_grande\", false)\n    movimento_reduzido = reduzido if erro == OK and reduzido is bool else false\n    texto_grande = grande if erro == OK and grande is bool else false\n    capturando = \"\"\n    aplicar()\n    return erro\n",
        "pros": "Código idêntico ao arquivo entregue; regra separada da interface para testar entradas e resultados.",
        "cons": "Não representa sozinho a cena inteira. O arquivo de teste abaixo verifica a regra; confirme também foco, som e apresentação no editor."
      },
      {
        "title": "Conferência executável · acessibilidade-conferencia.gd",
        "whenToUse": "após prever os casos válidos e inválidos",
        "description": "Salve este arquivo na raiz do apoio. No terminal, use godot --headless --path . --script res://acessibilidade-conferencia.gd. Se godot não estiver no PATH, substitua pelo caminho do seu executável. O programa encerra após a conferência.",
        "code": "extends SceneTree\nfunc _initialize() -> void:\n    call_deferred(\"conferir\")\nfunc conferir() -> void:\n    var k = load(\"res://controles.gd\").new()\n    root.add_child(k)\n    k.restaurar()\n    assert(k.remapear(\"of_esquerda\", KEY_J) == \"Mapeamento aplicado\")\n    assert(k.remapear(\"of_direita\", KEY_J).begins_with(\"Conflito\"))\n    assert(k.teclas.of_direita == KEY_D)\n    k.queue_free()\n    await process_frame\n    print(\"Controles: conflito preserva estado\")\n    quit()\n",
        "pros": "Falha no contrato é visível por assert; permite repetir a mesma conferência após editar.",
        "cons": "Assert é ferramenta de desenvolvimento, não validação de entrada para uma build de produção. Fluxos de interface continuam no roteiro manual."
      }
    ],
    "simulator": {
      "type": "curriculum_access",
      "title": "Painel de captura e recuperação",
      "description": "Laboratório didático do navegador: remapeamento local de letras/setas, conflito e cancelar. Não executa GDScript, AudioServer, InputMap ou exportação da Godot. As ações são manuais e não iniciam animações automáticas; o estado é descrito em texto. Reiniciar limpa esta sessão do laboratório, preservando o progresso das aulas.",
      "guide": [
        {
          "title": "Capture",
          "text": "Ative Remapear esquerda e pressione uma letra ou seta; Escape cancela."
        },
        {
          "title": "Conflite",
          "text": "Escolha D enquanto direita usa D: a escolha deve ser rejeitada."
        },
        {
          "title": "Recupere",
          "text": "Salvar/reabrir usa snapshot em memória. Reiniciar apaga esse snapshot; teste persistência real no apoio."
        },
        {
          "title": "Confira a leitura ampliada",
          "text": "Texto ampliado aumenta controles, avisos e resultados deste laboratório. Movimento reduzido fica registrado no snapshot, mas este modelo já é estático. No projeto Godot, ele desliga o pulso de confirmação."
        }
      ]
    },
    "quiz": {
      "question": "Ao capturar uma tecla já usada por outra ação, o que esta oficina deve fazer?",
      "options": [
        "Substituir as duas sem avisar.",
        "Rejeitar, explicar e preservar o mapeamento atual.",
        "Apagar ui_accept para liberar Enter."
      ],
      "correctIndex": 1,
      "explanation": "A política explícita evita configuração ambígua e mantém uma saída utilizável do menu.",
      "feedback": [
        "Troca silenciosa viola a política.",
        "",
        "As ações de menu são preservadas."
      ]
    }
  },
  {
    "id": "2d-projeto-integrador",
    "after": "2d-pro-multiplayer-tools",
    "area": "2d",
    "level": "profissional",
    "levelLabel": "Profissional",
    "title": "18. Projeto integrador: da oficina ao executável",
    "subtitle": "Entregue um jogo curto com início, objetivo, pausa, ajustes, save, reinício e roteiro de exportação.",
    "nodesUsed": [
      "Control",
      "ConfigFile",
      "InputMap",
      "AudioServer",
      "Export preset"
    ],
    "teaching": {
      "duration": "90–150 min, em duas sessões (estimativa; validar com alunos)",
      "prerequisite": "Base 2D até 13, complementos 3A/5A/13A/13B e noções de arquitetura (15). Multiplayer não é requisito do jogo. Nesta trilha o projeto fecha o percurso; não acrescente rede antes de entregar o ciclo local.",
      "codeRequired": true,
      "codeIntro": "O exemplo 1 é o arquivo partida.gd. Ele estende RefCounted: crie uma instância com new; não o anexe a um nó. hub.gd monta a interface e chama a regra. O exemplo 2 é uma conferência independente via --script; não substitui testar a interface.",
      "objectives": [
        "Integrar um ciclo de jogo completo com vitória/derrota e reinício.",
        "Preservar ajustes e validar save antes de substituir a sessão.",
        "Preparar preset/templates e testar uma build fora do editor com critérios registrados."
      ],
      "practice": {
        "title": "Prática guiada: Autômato: ciclo completo",
        "intro": "Baixe e extraia o projeto. Abra project.godot, importe os recursos e use Compatibility. A referência documental é Godot 4.5; a execução foi conferida na 4.7.2. Use F6 em oficina.tscn ou F5 para o projeto. hub.gd cria a interface e os serviços durante _ready: inspecione esses filhos na aba Remote/Remoto com a aplicação rodando. A aba Local inicialmente mostra apenas Oficina. Os arquivos .gd não são nós filhos. Abra o arquivo partida.gd no FileSystem para estudar a regra desta oficina.",
        "tree": "Oficina (Control, script hub.gd)\n├── Som (Node, script som.gd; criado em execução)\n├── Controles (Node, script controles.gd; criado em execução)\n└── ScrollContainer (criado em execução)\n    └── MarginContainer\n        └── VBoxContainer (menus, avisos e oficina ativa)\n\nFora da árvore: Estoque, Contador e Partida são objetos RefCounted.\nArquivos .gd e a pasta sons/ ficam no FileSystem, não nesta hierarquia.",
        "download": {
          "url": "assets/oficina-percurso-completo.zip",
          "label": "Baixar projeto das cinco oficinas"
        },
        "downloadNote": "Projeto-fonte com código, sons e testes. Não é um executável exportado. O LEIA-ME contém roteiro, limites e comandos; os ajustes ficam em user:// e não na pasta do site.",
        "steps": [
          {
            "title": "Defina a entrega",
            "text": "Em 5 · Jogo, o autômato coleta três peças e chega à saída em até 32 passos. Grade de 6×4; paredes não consomem passos. Menu inicial, jogando, vitória e derrota são fases explícitas; pausa é um bloqueio separado.",
            "expect": "Uma meta pequena e verificável; nenhuma promessa de física contínua neste protótipo por turnos."
          },
          {
            "title": "Jogue e explique as regras",
            "text": "Inicie e foque Tabuleiro. Use WASD padrão/remapeado ou botões. Rota de conferência: baixo, baixo, cima, cima, direita×5, baixo×3, esquerda, direita. Peças são coletadas na entrada da célula.",
            "expect": "As três peças são coletadas uma vez e a saída encerra em vitória com 14 passos."
          },
          {
            "title": "Teste pausa e ajustes juntos",
            "text": "Pause e tente mover: posição/passos não mudam. Abra Áudio/Controles para ajustar, salvar e voltar ao jogo. Uma coleta usa SFX e texto/contagem; mute não impede entender o objetivo.",
            "expect": "A partida permanece preservada ao trocar de oficina. O botão de retomar continua utilizável."
          },
          {
            "title": "Grave e recupere com segurança",
            "text": "Salve uma partida em andamento, reinicie e carregue. Versão, posição, passos, coleção e duplicatas são validados antes do commit. Testar.gd contém caso inválido; um erro deve preservar a sessão corrente.",
            "expect": "Carregar volta à posição/peças, em modo jogando e sem pausa. Save não inclui áudio/teclas: eles possuem seus próprios arquivos."
          },
          {
            "title": "Provoque derrota e repita",
            "text": "Alterne direita/esquerda na primeira linha por 32 passos, sem coletar as três peças. Confira derrota, movimento bloqueado e reinício. Voltar ao início não apaga ajustes nem save.",
            "expect": "Iniciar zera passos/coletas; Carregar é uma ação distinta. Vitória e derrota não continuam aceitando passos."
          },
          {
            "title": "Prepare a exportação Windows",
            "text": "Confirme a versão do editor e instale os export templates correspondentes via Editor > Manage Export Templates. Abra Project > Export: o apoio inclui preset Windows Desktop x86_64, cena principal e exportação de recursos. Crie a pasta build. Se mudar versão ou destino, revise o preset.",
            "expect": "Nenhum erro de template ausente. Código, cenas e WAVs necessários entram; testes e cache não são parte da entrega."
          },
          {
            "title": "Gere e teste fora do editor",
            "text": "Use Export Project no preset Windows Desktop, modo release, para build/OficinaAether.exe. Preserve o .pck ao lado quando gerado separadamente. Feche o editor e execute a pasta da build; teste menu→jogo→pausa→ajustes→save/load→vitória/derrota→reinício. Abra também numa pasta limpa.",
            "expect": "Um ZIP do projeto-fonte ou apenas um PCK não é uma build executável. Registre versão, sistema, resolução e resultado real; não marque esta etapa antes de executar."
          },
          {
            "title": "Prepare uma entrega revisável",
            "text": "Inclua executável e recursos necessários, versão 1.0.0, licença dos sons, instruções de controles e erros conhecidos. Não inclua .godot, credenciais ou dados pessoais de user://. Não há publicação automática nem assinatura configurada.",
            "expect": "A entrega local abre sem depender do editor instalado. Distribuição externa é etapa separada."
          },
          {
            "title": "Faça uma variação sem copiar",
            "text": "Crie uma quarta peça e ajuste meta, save e testes. Depois faça a extensão 3D descrita na conferência apenas se esse for seu objetivo; registre como outra entrega.",
            "expect": "Objetivo, coleção, validação e interface concordam; o ciclo ainda vence, perde, reinicia e exporta."
          }
        ]
      },
      "checks": [
        {
          "question": "Qual diferença entre reiniciar e carregar?",
          "answer": "Reiniciar cria estado inicial; carregar tenta restaurar um snapshot válido. Falha de carga não deve apagar a sessão atual."
        },
        {
          "question": "Como adaptar a entrega à trilha 3D?",
          "answer": "Preserve ciclo/UI/ajustes/save; substitua a grade por uma sala 3D com CharacterBody3D, colisão e câmera. Grave posição validada e teste reaparecimento sem interseção. Repita desempenho, renderizador e exportação no alvo; não trate esta extensão como já implementada."
        },
        {
          "question": "Ctrl+D ou Shift+D devem mover o personagem?",
          "answer": "Não neste exercício. O controlador aceita uma tecla de jogo sem modificadores, com foco no tabuleiro. Atalhos e teclas capturadas para configuração não podem vazar para o movimento."
        }
      ],
      "pitfalls": [
        {
          "title": "Exportação pede templates",
          "text": "Instale os templates da exata versão do editor e revise o preset. Um PCK executado pelo editor não comprova build final."
        },
        {
          "title": "Build abre sem som ou recurso",
          "text": "Confira filtro de exportação, importação e destino dos streams; teste pasta completa, inclusive .pck externo. Confira mensagens de execução no destino."
        },
        {
          "title": "Carregar apaga uma partida boa",
          "text": "Valide em variáveis candidatas e faça o commit só depois de todos os campos passarem; execute o caso inválido do teste."
        }
      ],
      "summary": "Avalie o fluxo inteiro, com erros e recuperação. Só declare uma build validada depois de executá-la fora do editor.",
      "next": "Faça a entrega local e guarde seu checklist de aceitação. A adaptação 3D é opcional e exige outra validação.",
      "sources": [
        {
          "label": "Exportar projetos",
          "url": "https://docs.godotengine.org/en/4.5/tutorials/export/exporting_projects.html"
        },
        {
          "label": "Exportar para Windows",
          "url": "https://docs.godotengine.org/en/4.5/tutorials/export/exporting_for_windows.html"
        },
        {
          "label": "ConfigFile",
          "url": "https://docs.godotengine.org/en/4.5/classes/class_configfile.html"
        },
        {
          "label": "Organização de cenas",
          "url": "https://docs.godotengine.org/en/4.5/tutorials/best_practices/scene_organization.html"
        }
      ]
    },
    "feynman": {
      "title": "Um jogo completo precisa de um ciclo recuperável",
      "explanation": "Funcionalidades isoladas só viram uma entrega quando cooperam. A regra Partida conhece fase, posição, passos e peças; o controlador organiza a interface e usa os serviços de áudio e controles.\n\nSalvar e carregar são fronteiras: valide todos os campos antes de substituir o estado. Reiniciar uma partida, restaurar ajustes e voltar ao menu são operações diferentes. Exportar inclui recursos e um runtime adequado ao destino.",
      "analogies": [
        {
          "term": "Ciclo",
          "analogy": "Início → jogo → resultado → reinício, com pausa e ajustes acessíveis."
        },
        {
          "term": "Snapshot",
          "analogy": "Representa uma partida em andamento, com versão e campos validados."
        },
        {
          "term": "Build",
          "analogy": "Runtime do destino e recursos exportados; não o projeto-fonte."
        }
      ]
    },
    "howItWorks": {
      "overview": "Partida é RefCounted e não controla nós de UI. mover exige um passo ortogonal e confirma limites antes de mutar. A ordem testa vitória antes do limite de passos: chegar com as três peças no passo 32 vence. O save é defensivo para corrupção comum, não é mecanismo antifraude nem prova que todo caminho salvo foi historicamente percorrido.",
      "anatomy": [
        {
          "prop": "fase / pausada",
          "desc": "Fase terminal e pausa bloqueiam movimento sem apagar estado."
        },
        {
          "prop": "ConfigFile + versao",
          "desc": "Formato explícito; dados inválidos retornam erro antes do commit."
        },
        {
          "prop": "export_presets.cfg",
          "desc": "Configuração de destino, recursos e nome da build."
        },
        {
          "prop": "Templates da mesma versão",
          "desc": "Necessários para exportar um executável; instalar editor não garante presença deles."
        }
      ]
    },
    "approaches": [
      {
        "title": "Regra resolvida · partida.gd",
        "whenToUse": "na oficina correspondente do projeto de apoio",
        "description": "Leia de cima para baixo e preveja o resultado antes de executar. O controlador chama esta regra e mostra seu retorno. A interface completa e os recursos estão no ZIP. Primeiro identifique as constantes e variáveis; depois as entradas da função, as guardas que rejeitam a operação e a alteração de estado. Por fim localize em hub.gd o ponto que chama essa função e apresenta seu resultado.",
        "code": "extends RefCounted\n\nconst ARQUIVO := \"user://aether_partida.cfg\"\nconst PECAS := [2, 12, 22]\nconst PAREDES := [8, 9, 15]\nvar fase: String = \"menu\"\nvar posicao: int = 0\nvar passos: int = 0\nvar coletadas: Array[int] = []\nvar pausada: bool = false\n\nfunc iniciar() -> void:\n    fase = \"jogando\"\n    posicao = 0\n    passos = 0\n    coletadas.clear()\n    pausada = false\n\nfunc mover(dx: int, dy: int) -> String:\n    if fase != \"jogando\" or pausada:\n        return \"Movimento bloqueado\"\n    if absi(dx) + absi(dy) != 1:\n        return \"Um passo ortogonal por ação\"\n    var x := posicao % 6 + dx\n    var y := posicao / 6 + dy\n    if x < 0 or x >= 6 or y < 0 or y >= 4 or y * 6 + x in PAREDES:\n        return \"Parede ou limite: nenhum passo gasto\"\n    posicao = y * 6 + x\n    passos += 1\n    if posicao in PECAS and not posicao in coletadas:\n        coletadas.append(posicao)\n    if posicao == 23 and coletadas.size() == 3:\n        fase = \"vitoria\"\n    elif passos >= 32:\n        fase = \"derrota\"\n    return \"Peças %d/3 · passos %d/32 · %s\" % [coletadas.size(), passos, fase]\n\nfunc salvar(caminho: String = ARQUIVO) -> Error:\n    if fase != \"jogando\":\n        return ERR_UNAVAILABLE\n    var cfg := ConfigFile.new()\n    cfg.set_value(\"partida\", \"versao\", 1)\n    cfg.set_value(\"partida\", \"posicao\", posicao)\n    cfg.set_value(\"partida\", \"passos\", passos)\n    cfg.set_value(\"partida\", \"coletadas\", coletadas)\n    return cfg.save(caminho)\n\nfunc carregar(caminho: String = ARQUIVO) -> Error:\n    var cfg := ConfigFile.new()\n    var erro := cfg.load(caminho)\n    if erro != OK:\n        return erro\n    for chave in [\"versao\", \"posicao\", \"passos\", \"coletadas\"]:\n        if not cfg.has_section_key(\"partida\", chave):\n            return ERR_INVALID_DATA\n    var versao: Variant = cfg.get_value(\"partida\", \"versao\", null)\n    var p: Variant = cfg.get_value(\"partida\", \"posicao\", null)\n    var n: Variant = cfg.get_value(\"partida\", \"passos\", null)\n    var lista: Variant = cfg.get_value(\"partida\", \"coletadas\", null)\n    if not versao is int or versao != 1 or not p is int or not n is int or not lista is Array:\n        return ERR_INVALID_DATA\n    if p < 0 or p >= 24 or p in PAREDES or n < 0 or n >= 32:\n        return ERR_INVALID_DATA\n    var copia: Array[int] = []\n    for item in lista:\n        if not item is int or not item in PECAS or item in copia:\n            return ERR_INVALID_DATA\n        copia.append(item)\n    if copia.size() > n or (p in PECAS and not p in copia) or (p == 23 and copia.size() == 3):\n        return ERR_INVALID_DATA\n    # Commit só depois de validar todos os campos: falha preserva a sessão.\n    posicao = p\n    passos = n\n    coletadas = copia\n    fase = \"jogando\"\n    pausada = false\n    return OK\n",
        "pros": "Código idêntico ao arquivo entregue; regra separada da interface para testar entradas e resultados.",
        "cons": "Não representa sozinho a cena inteira. O arquivo de teste abaixo verifica a regra; confirme também foco, som e apresentação no editor."
      },
      {
        "title": "Conferência executável · 2d-projeto-integrador-conferencia.gd",
        "whenToUse": "após prever os casos válidos e inválidos",
        "description": "Salve este arquivo na raiz do apoio. No terminal, use godot --headless --path . --script res://2d-projeto-integrador-conferencia.gd. Se godot não estiver no PATH, substitua pelo caminho do seu executável. O programa encerra após a conferência.",
        "code": "extends SceneTree\nfunc _initialize() -> void:\n    call_deferred(\"conferir\")\nfunc conferir() -> void:\n    var g = load(\"res://partida.gd\").new()\n    g.iniciar()\n    g.mover(1, 0)\n    g.pausada = true\n    g.mover(1, 0)\n    assert(g.posicao == 1 and g.passos == 1)\n    g.iniciar()\n    assert(g.posicao == 0 and g.coletadas.is_empty())\n    print(\"Integração: pausa e reinício aprovados\")\n    quit()\n",
        "pros": "Falha no contrato é visível por assert; permite repetir a mesma conferência após editar.",
        "cons": "Assert é ferramenta de desenvolvimento, não validação de entrada para uma build de produção. Fluxos de interface continuam no roteiro manual."
      }
    ],
    "simulator": {
      "type": "curriculum_capstone",
      "title": "Autômato: ciclo completo",
      "description": "Laboratório didático do navegador: jogo por passos com coleta, paredes, pausa, vitória/derrota e snapshot em memória. Não executa GDScript, AudioServer, InputMap ou exportação da Godot. As ações são manuais e não iniciam animações automáticas; o estado é descrito em texto. Reiniciar limpa esta sessão do laboratório, preservando o progresso das aulas.",
      "guide": [
        {
          "title": "Comece",
          "text": "Iniciar/reiniciar começa na célula 0. Foque a vista para WASD/setas; Tab sai."
        },
        {
          "title": "Verifique o ciclo",
          "text": "Recolha P nas células 2/12/22 e chegue à saída23. Há 32 passos; paredes não gastam turno."
        },
        {
          "title": "Teste recuperação",
          "text": "Salvar/reabrir é snapshot local da sessão. Não exporta jogo nem grava ConfigFile; faça essas etapas na Godot."
        }
      ]
    },
    "quiz": {
      "question": "Qual evidência permite marcar a entrega executável como testada?",
      "options": [
        "O ZIP do código foi criado.",
        "A build exportada foi aberta fora do editor e o ciclo completo foi conferido.",
        "O laboratório web mostrou vitória."
      ],
      "correctIndex": 1,
      "explanation": "A entrega precisa funcionar no runtime e nas condições do destino; fonte e modelo web não comprovam isso.",
      "feedback": [
        "Fonte não inclui necessariamente runtime de exportação.",
        "",
        "O navegador não executa a build Godot."
      ]
    }
  }
];
  for (const lesson of additions) {
    const index=window.GODOT_LESSONS_2D.findIndex(l=>l.id===lesson.after);
    if(index<0) throw new Error("Pré-requisito ausente: "+lesson.after);
    const previous=window.GODOT_LESSONS_2D[index];
    if(previous.teaching) previous.teaching.next="Antes de avançar, faça o complemento: "+lesson.title+". Use Próxima Aula para seguir a sequência.";
    window.GODOT_LESSONS_2D.splice(index+1,0,lesson);
  }
})();
