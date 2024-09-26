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
    const stars = document.querySelectorAll('.star-rating span');
    let currentRating = 0;

    // Evento para selecionar estrelas
    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-rating'));
            updateStars(currentRating);
            console.log(`Avaliação selecionada: ${currentRating} estrelas`);
        });
    });

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
        const diff = Math.abs(now - timestamp); // Diferença em milissegundos
        const diffHours = Math.floor(diff / (1000 * 60 * 60)); // Diferença em horas
        const diffDays = Math.floor(diffHours / 24); // Diferença em dias

        if (diffDays >= 1) {
            return `${diffDays} dia(s) atrás`;
        } else {
            return `${diffHours} hora(s) atrás`;
        }
    }

    // Evento para enviar o feedback
    document.getElementById('submit-review').addEventListener('click', function() {
        const comment = document.getElementById('comment').value;
        const userName = document.getElementById('user-name').value;

        if (currentRating === 0 || comment.trim() === '' || userName.trim() === '') {
            alert('Por favor, selecione uma avaliação, escreva um comentário e insira seu nome.');
            return;
        }

        // Adiciona feedback à lista
        const reviewList = document.getElementById('reviews-list');
        const newReview = document.createElement('li');
        const timestamp = new Date(); // Marca o tempo atual

        // Criar as estrelas visuais para o feedback
        const starContainer = document.createElement('div');
        starContainer.classList.add('feedback-stars');
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.innerHTML = (i <= currentRating) ? '&#9733;' : '&#9734;'; // Estrela cheia ou vazia
            starContainer.appendChild(star);
        }

        // Inserir o nome, estrelas e comentário no feedback
        newReview.innerHTML = `<strong>${userName}</strong> deixou uma avaliação: `;
        newReview.appendChild(starContainer); // Estrelas no feedback
        newReview.innerHTML += `<p>${comment}</p>`;

        // Inserir o tempo decorrido desde a avaliação
        const timeElapsed = document.createElement('div');
        timeElapsed.classList.add('review-time');
        timeElapsed.textContent = calculateTimeDifference(timestamp);

        // Criar botão de exclusão
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.addEventListener('click', function() {
            reviewList.removeChild(newReviewContainer); // Remove o feedback da lista
        });

        // Contêiner para alinhar o feedback e o botão "Excluir"
        const newReviewContainer = document.createElement('div');
        newReviewContainer.classList.add('review-container');
        newReviewContainer.appendChild(newReview);
        newReviewContainer.appendChild(deleteBtn);

        // Adiciona o feedback completo à lista
        reviewList.appendChild(newReviewContainer);

        // Atualiza o tempo de feedback a cada minuto
        setInterval(function() {
            timeElapsed.textContent = calculateTimeDifference(timestamp);
        }, 60000); // Atualiza a cada minuto (60.000 ms)

        newReview.appendChild(timeElapsed);

        // Resetar campos
        currentRating = 0;
        updateStars(currentRating);
        document.getElementById('comment').value = '';
        document.getElementById('user-name').value = '';
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star-rating span');
    let currentRating = 0;

    // Função para buscar e exibir feedbacks salvos
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

    // Código de interação das estrelas e outras funcionalidades
    stars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-rating'));
            updateStars(currentRating);
        });
    });

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
});

// Para buscar feedbacks
fetch('http://localhost:3000/api/feedbacks')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Aqui você verá a lista de feedbacks
    })
    .catch(error => console.error('Erro:', error));

// Para enviar um novo feedback
fetch('http://localhost:3000/api/feedbacks', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        userName: 'Sofia',
        comment: 'Ótimo serviço!',
        rating: 5,
    }),
})
.then(response => response.json())
.then(data => {
    console.log('Feedback enviado:', data);
})
.catch(error => console.error('Erro:', error));
