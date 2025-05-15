// Função para mostrar e esconder informações detalhadas dos cartões de tratamento
function showCardInfo(id) {
    const cardInfo = document.getElementById(id);
    // Alterna a visibilidade das informações do cartão
    if (cardInfo.style.display === 'block') {
        cardInfo.style.display = 'none';
    } else {
        // Esconde outras informações de cartões
        document.querySelectorAll('.card-content').forEach(info => {
            if (info.id !== id) {
                info.style.display = 'none';
            }
        });
        // Mostra o cartão selecionado
        cardInfo.style.display = 'block';
    }
}

const artigos = {
    artigo1: {
      titulo: "A Jornada Invisível da Evolução",
      texto: `Na existência, não há derrotas — há apenas etapas. Cada uma nos molda de maneira única, revelando-se não como sofrimento, mas como amadurecimento. A vida, em sua sabedoria silenciosa, nunca age por acaso. Tudo o que vivemos tem um propósito, ainda que nossa consciência presente não consiga alcançá-lo. A dor de hoje, com o tempo, revela-se como um portal necessário para a expansão da alma. São experiências que nos retiram da zona de conforto e nos empurram para versões mais inteiras de nós mesmos. E nesse caminhar, o mais valioso não é o quanto acumulamos ou conquistamos, mas as marcas que deixamos — não apenas em nossa história, mas na história daqueles que cruzam nosso caminho. Essa é a verdadeira semente da existência: o impacto que geramos no outro. A vida é um processo de semeadura invisível, onde cada gesto de amor, compreensão e presença constrói a ponte para a nossa própria evolução. Somos mais que corpos em trânsito pelo tempo. Somos consciências em constante expansão — seres em evolução psíquica, espiritual e emocional. O físico envelhece, sim, mas o espírito amadurece. E à medida que crescemos por dentro, a vida deixa de ser um campo de batalha e se transforma em uma escola silenciosa, onde até a perda é uma vitória disfarçada, uma dádiva ainda não compreendida. Somos apenas sopros navegando no oceano do tempo. E, mesmo sem entender agora, cada ato, cada escolha, cada dor e cada encontro tem um sentido maior, que se revelará no tempo certo.`,
      autor: "Wilfredo Finck Júnior"
    },
    artigo2: {
      titulo: "Depressão",
      texto: `Uma tristeza inexplicável, a melancolia da alma, uma sensação de vazio interior e desesperança, juntamente com a falta de energia e prazer pelas coisas que outrora eram prazerosas. Parece que tudo perde a graça e o sabor, o sono torna-se fragmentado e não restaurador, o acordar pela manhã já vem acompanhado de uma indisposição que permanece no decorrer do dia. A percepção do mundo torna-se angustiada e triste, associada a uma adinamia e baixa autoestima. A desesperança agrava a dor emocional e um contínuo desejo de chorar. O brilho da vida torna-se fosco e cinzento, a vontade de sorrir se esvai, e o inquietante desconforto emocional, se expressa através de lágrimas como forma de acalentar a dor. A mente aflita e inquieta deseja dormir e refugiar-se solitária em um quarto escuro. Muitos resistem em procurar um médico de saúde mental dentro da medicina psiquiátrica, um preconceito vinculado a ideia de fraqueza pessoal ou medo de estigmatização social ou profissional. Muitos sofrem demasiado e desnecessariamente por muito tempo, sendo que poderiam evitar esta dor e os prejuízos em sua vida social, familiar e profissional ocasionados pela doença. A ciência já comprova a existência da doença depressiva e a necessidade de um bom diagnóstico e tratamento. Procure ajuda e apoio em um médico de saúde mental.`,
      autor: "Wilfredo Finck Júnior"
    },
    artigo3: {
      titulo: "O Tempo",
      texto: `O sorriso de hoje não volta mais! A boa conversa, a que vale a pena, é única! O afeto dos momentos com os bons amigos e a família, são únicos! O canto do pássaro, o vento, o brilho do sol, o encanto das flores de hoje, são deste momento! Cada dia e momento são únicos! Então devemos aproveitar a oportunidade, pois não voltará. O ar que respiramos hoje e a saúde de nossa energia, amanhã pode não existir! Se temos um momento nosso, livre de trabalho e preocupações, devemos usufruí-lo ao máximo, cada detalhe, cada minuto, tudo é novo a cada olhar e a cada pensamento. Nada é igual a um simples minuto atrás! A vida é um sopro de viagem, uma mala que se desfaz rapidamente e não levamos absolutamente nada. Portanto, devemos carregar menos e curtir mais! Construir menos e usufruir ao máximo o que possuímos! Tudo voltará ao nada! Devemos comer bem, sorrir, agradecer e retribuir! Tomar sol, sentir o vento, observar o balançar das folhas e suas estações, as flores, a natureza, o som do mar, é um presente belo, majestoso, gratuito e gratificante! Temos que saber apreciar e admirar os detalhes, são dádivas maravilhosas e únicas. A cor e o formato da natureza são mágicas, contagiantes e sem explicação, simplesmente sublimes! Todavia, poucos conseguem enxergar e absorver a plenitude deste universo simples, natural e genuíno! Uma energia contagiante vem com a contemplação e introspecção da vida real! Um mundo que não precisa de imaginação e nem conquista, é gratuito e perene em sua magnificência! Um encontro com o poder da criação! O entendimento e percepção que dá sentido a esta curta jornada, chamada vida! Uma vida simples e riquíssima, que deve ser respirada e bem vivida! Um entendimento que deveria ser simples em sua plenitude, algo que passa rápido!`,
      autor: "Wilfredo Finck Júnior"
    },
    artigo4: {
      titulo: "Gratidão",
      texto: `Os valores da vida são pouco observados, sobretudo, quando nos chegam de forma facilitada. Quando nascemos e vivemos num universo blindado de problemas, não compreendemos as reais dores da vida, muitas lutas necessárias para o amadurecimento não foram lutadas por nós, sendo assim, saboreamos os louros da vitória conquistada por outro. Recebemos gratuitamente grande parte do todo, e lutamos por um caminho bem menos árduo e facilitado pela força de outro, que por amor, nos proporciona facilidades e muitas vantagens. Como diz o velho ditado: "quanto maior a luta, maior o sabor da vitória" é uma grande realidade!. Esta luta não gera apenas sabor, mas sobretudo, resistência às frustrações e desapontamentos com a vida, forjamos a têmpera necessária para os desafios que estão por vir. Esta força interior, além de potência de enfrentamento, gera proporcionalmente um sentimento de gratidão por cada conquista e entendimento da dádiva da vida na jornada do tempo. A gratidão é o sentimento fundamental na caminhada, a satisfação e sabor por aquilo que temos em cada momento da jornada, é a força que aplaca os momentos de fragilidade, a fonte de alegria interior pelo que somos e conquistamos. A gratidão é a dádiva da vida que nos proporciona felicidade.  É o valor do nosso momento existencial, o sentimento de celebrar a vida e novamente agradecer. É a resistência necessária para o enfrentamento da vida sem esmorecer diante das dificuldades. É o grande valor da vida - GRATIDÃO!`,
      autor: "Wilfredo Finck Júnior"
    }
  };

  const modal = document.getElementById("modal-artigo");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalTexto = document.getElementById("modal-texto");
  const modalAutor = document.getElementById("modal-autor");
  const closeBtn = document.querySelector(".close-btn");

  document.querySelectorAll(".leia-mais-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const artigo = artigos[btn.getAttribute("data-artigo")];
      modalTitulo.textContent = artigo.titulo;
      modalTexto.textContent = artigo.texto;
      modalAutor.textContent = artigo.autor;
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });