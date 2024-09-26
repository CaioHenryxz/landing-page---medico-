// Função para mostrar e esconder informações detalhadas dos cartões de tratamento
function showCardInfo(id) {
    const cardInfo = document.getElementById(id);
    if (cardInfo.style.display === 'block') {
        cardInfo.style.display = 'none';
    } else {
        document.querySelectorAll('.card-content').forEach(info => {
            if (info.id !== id) {
                info.style.display = 'none';
            }
        });
        cardInfo.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating span');
    let currentRating = 0;

    // Função para atualizar as estrelas
    function updateStars(rating) {
        stars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Função para calcular o tempo decorrido desde a avaliação
    function calculateTimeDifference(timestamp) {
        const now = new Date();
        const diff = Math.abs(now - timestamp);
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        return diffDays >= 1 ? `${diffDays} dia(s) atrás` : `${diffHours} hora(s) atrás`;
    }

    // Função para buscar e exibir feedbacks salvos
    function loadFeedbacks() {
        fetch('http://localhost:3000/feedbacks')
            .then(response => response.json())
            .then(feedbacks => {
                const reviewList = document.getElementById('reviews-list');
                reviewList.innerHTML = '';
                feedbacks.forEach(feedback => {
                    const newReview = document.createElement('li');
                    const starContainer = document.createElement('div');
                    starContainer.classList.add('feedback-stars');

                    for (let i = 1; i <= 5; i++) {
                        const star = document.createElement('span');
                        star.innerHTML = (i <= feedback.rating) ? '&#9733;' : '&#9734;';
                        starContainer.appendChild(star);
                    }

                    newReview.innerHTML = `<strong>${feedback.userName}</strong> deixou uma avaliação: `;
                    newReview.appendChild(starContainer);
                    newReview.innerHTML += `<p>${feedback.comment}</p>`;

                    const deleteBtn = document.createElement('button');
                    deleteBtn.classList.add('delete-btn');
                    deleteBtn.textContent = 'Excluir';
                    deleteBtn.addEventListener('click', function() {
                        deleteFeedback(feedback.id);
                    });

                    const newReviewContainer = document.createElement('div');
                    newReviewContainer.classList.add('review-container');
                    newReviewContainer.appendChild(newReview);
                    newReviewContainer.appendChild(deleteBtn);

                    reviewList.appendChild(newReviewContainer);
                });
            })
            .catch(error => console.error('Erro ao carregar feedbacks:', error));
    }

    // Função para enviar novo feedback
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
            rating: currentRating
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

    // Função para deletar feedback
    function deleteFeedback(id) {
        fetch(`http://localhost:3000/feedbacks/${id}`, {
            method: 'DELETE'
        })
        .then(() => loadFeedbacks())
        .catch(error => console.error('Erro ao deletar feedback:', error));
    }

    // Carrega os feedbacks ao iniciar
    loadFeedbacks();

    // Código de interação das estrelas
    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-rating'));
            updateStars(currentRating);
        });
    });
});
