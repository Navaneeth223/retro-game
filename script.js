 const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;
        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 0;
        let dy = 0;
        let score = 0;
        let gameLoop;

        function drawGame() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw snake
            ctx.fillStyle = '#0f0';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });

            // Draw food
            ctx.fillStyle = '#f00';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

            // Move snake
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            snake.unshift(head);

            // Check if food is eaten
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
                generateFood();
            } else {
                snake.pop();
            }

            // Check collision
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
                clearInterval(gameLoop);
                alert(`Game Over! Score: ${score}`);
            }
        }

        function generateFood() {
            food.x = Math.floor(Math.random() * tileCount);
            food.y = Math.floor(Math.random() * tileCount);
        }

        document.getElementById('startButton').addEventListener('click', () => {
            snake = [{ x: 10, y: 10 }];
            dx = 0;
            dy = 0;
            score = 0;
            document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
            generateFood();
            clearInterval(gameLoop);
            gameLoop = setInterval(drawGame, 100);
        });

        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowUp': if (dy !== 1) { dx = 0; dy = -1; } break;
                case 'ArrowDown': if (dy !== -1) { dx = 0; dy = 1; } break;
                case 'ArrowLeft': if (dx !== 1) { dx = -1; dy = 0; } break;
                case 'ArrowRight': if (dx !== -1) { dx = 1; dy = 0; } break;
            }
        });

        document.getElementById('highScoreButton').addEventListener('click', () => {
            const highScoreDiv = document.getElementById('highScoreDisplay');
            highScoreDiv.classList.toggle('hidden');
            // Placeholder for fetching high scores (Node.js backend required)
            highScoreDiv.textContent = 'High Scores: Connect to backend for scores';
        });

        document.getElementById('submitGameButton').addEventListener('click', () => {
            document.getElementById('submitForm').classList.toggle('hidden');
        });

        document.getElementById('submitGame').addEventListener('click', () => {
            const gameName = document.getElementById('gameName').value;
            const gameDescription = document.getElementById('gameDescription').value;
            const gameFile = document.getElementById('gameFile').files[0];
            // Placeholder for backend submission
            alert(`Game Submission: ${gameName}\nDescription: ${gameDescription}\nFile: ${gameFile ? gameFile.name : 'None'}`);
        });


function setDirection(dir) {
  if(dir === 'LEFT' && d !== 'RIGHT') d = 'LEFT';
  else if(dir === 'UP' && d !== 'DOWN') d = 'UP';
  else if(dir === 'RIGHT' && d !== 'LEFT') d = 'RIGHT';
  else if(dir === 'DOWN' && d !== 'UP') d = 'DOWN';
}
