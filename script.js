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

let indiceAtual = 0;
const artigos = document.querySelectorAll(".artigo");

function trocarArtigo(direcao) {
  artigos[indiceAtual].classList.remove("active");
  indiceAtual = (indiceAtual + direcao + artigos.length) % artigos.length;
  artigos[indiceAtual].classList.add("active");
}
