document.addEventListener("DOMContentLoaded", () => {
    const trapCountSpan = document.getElementById('trapCount');
    const trapRange = document.getElementById('trapRange');
    const signalButton = document.getElementById('signalButton');
    const grid = document.getElementById('grid');
    const rows = 5;
    const cols = 5;

    // Обновить отображение количества ловушек при изменении значения ползунка
    trapRange.addEventListener('input', () => {
        trapCountSpan.textContent = `КОЛИЧЕСТВО ЛОВУШЕК: ${trapRange.value}`;
    });

    // Функция для генерации сетки
    function generateGrid(rows, cols) {
        grid.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                row.appendChild(cell);
            }
            grid.appendChild(row);
        }
    }

    // Генерация начальной сетки
    generateGrid(rows, cols);

    // Функция для генерации случайных ловушек
    function generateSignals(trapCount) {
        // Удалить предыдущие ловушки
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('trap');
            cell.style.animation = ''; // Убираем анимацию
            cell.style.opacity = 1; // Восстанавливаем прозрачность
        });

        // Определить количество звёздочек в зависимости от значения ловушек
        let starsCount;
        switch(trapCount) {
            case 1:
                starsCount = 7;
                break;
            case 3:
                starsCount = 5;
                break;
            case 5:
                starsCount = 3;
                break;
            case 7:
                starsCount = 1;
                break;
            default:
                starsCount = trapCount; // на случай, если значение не попадает в наши условия
        }

        // Добавить новые звёздочки с задержкой
        let starsGenerated = 0;
        const interval = setInterval(() => {
            if (starsGenerated < starsCount) {
                const randomIndex = Math.floor(Math.random() * cells.length);
                if (!cells[randomIndex].classList.contains('trap')) {
                    cells[randomIndex].classList.add('trap');
                    cells[randomIndex].style.animation = `fadeIn 0.5s forwards`; // Добавляем анимацию
                    cells[randomIndex].style.opacity = 1; // Устанавливаем прозрачность
                    starsGenerated++;
                }
            } else {
                clearInterval(interval); // Останавливаем интервал, когда все звёздочки добавлены
            }
        }, 300); // Задержка между добавлением звёздочек
    }

    // Обработка клика на кнопку сигнала
    signalButton.addEventListener('click', () => {
        const trapCount = parseInt(trapRange.value);
        generateSignals(trapCount);
    });

    // Сделать клетки сетки кликабельными и отмечать ловушки
    grid.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            e.target.classList.toggle('trap');
        }
    });
});
