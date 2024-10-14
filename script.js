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

document.addEventListener('DOMContentLoaded', function() {
    let currentRating = 0;

    // Função para carregar feedbacks
    function loadFeedbacks() {
        fetch('http://localhost:3000/feedbacks')
            .then(response => response.json())
            .then(feedbacks => {
                const reviewList = document.getElementById('reviews-list');
                reviewList.innerHTML = ''; // Limpa a lista existente
                feedbacks.forEach(feedback => {
                    const newReview = document.createElement('li');
                    const starContainer = document.createElement('div');
                    starContainer.classList.add('feedback-stars');

                    // Adiciona estrelas ao feedback
                    for (let i = 1; i <= 5; i++) {
                        const star = document.createElement('span');
                        star.innerHTML = (i <= feedback.rating) ? '&#9733;' : '&#9734;';
                        star.setAttribute('data-rating', i); // Atribui rating à estrela
                        star.addEventListener('click', function() {
                            currentRating = i; // Atualiza o rating ao clicar na estrela
                            updateStars(currentRating);
                        });
                        starContainer.appendChild(star);
                    }

                    newReview.innerHTML = `<strong>${feedback.userName}</strong> deixou uma avaliação: `;
                    newReview.appendChild(starContainer);
                    newReview.innerHTML += `<p>${feedback.comment}</p>`;

                    // Criação do botão de exclusão
                    const deleteBtn = document.createElement('button');
                    deleteBtn.classList.add('delete-btn');
                    deleteBtn.textContent = 'Excluir';
                    deleteBtn.addEventListener('click', function() {
                        deleteFeedback(feedback.id); // Chama a função de exclusão
                    });

                    newReview.appendChild(deleteBtn); // Adiciona o botão à nova avaliação
                    reviewList.appendChild(newReview);
                });
            })
            .catch(error => console.error('Erro ao carregar feedbacks:', error));
    }

    // Envio de novo feedback
    document.getElementById('submit-review').addEventListener('click', function() {
        const comment = document.getElementById('comment').value;
        const userName = document.getElementById('user-name').value;

        if (currentRating === 0 || comment.trim() === '' || userName.trim() === '') {
            alert('Por favor, selecione uma avaliação, escreva um comentário e insira seu nome.');
            return;
        }

        const newFeedback = {
            userName: userName,
            comment: comment,
            rating: currentRating,
            timestamp: new Date().toISOString()
        };

        fetch('http://localhost:3000/feedbacks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        .then(response => response.json())
        .then(() => {
            loadFeedbacks(); // Recarrega a lista de feedbacks
            document.getElementById('comment').value = '';
            document.getElementById('user-name').value = '';
            currentRating = 0;
            updateStars(currentRating);
        })
        .catch(error => console.error('Erro ao enviar feedback:', error));
    });

    // Função para atualizar estrelas
    const stars = document.querySelectorAll('.star-rating span');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-rating'));
            updateStars(currentRating);
        });
    });

    function updateStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            star.innerHTML = (starRating <= rating) ? '&#9733;' : '&#9734;'; // Atualiza o conteúdo da estrela
            star.classList.toggle('active', starRating <= rating); // Adiciona ou remove classe ativa
        });
    }

    // Função para deletar feedback
    function deleteFeedback(id) {
        fetch(`http://localhost:3000/feedbacks/${id}`, {
            method: 'DELETE'
        })
        .then(() => loadFeedbacks()) // Recarrega os feedbacks após exclusão
        .catch(error => console.error('Erro ao deletar feedback:', error));
    }

    // Carrega os feedbacks ao iniciar
    loadFeedbacks();
});
