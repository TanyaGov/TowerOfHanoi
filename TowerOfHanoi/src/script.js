document.getElementById('start').addEventListener('click', startGame);

function startGame() {
  const numberOfDisks = parseInt(document.getElementById('disks').value);
  const towers = [[], [], []];

  const startBtn = document.getElementById('start');
  const input = document.getElementById('disks');
  startBtn.disabled = true;
  input.disabled = true;

  for (let i = numberOfDisks; i >= 1; i--) {
    towers[0].push(i);
  }

  resetTowers();
  renderTowers(towers, numberOfDisks);

  const moves = [];
  solveHanoi(numberOfDisks, 0, 2, 1, moves);
  animateMoves(moves, towers, numberOfDisks, startBtn, input);

}

function resetTowers() {
  document.querySelectorAll('.tower').forEach(tower => {
    tower.innerHTML = '<div class="pole"></div>';
  });
}

function renderTowers(towers, numberOfDisks) {
  const maxWidth = 175;
  const minWidth = 30;
  const diskHeight = 35;
  
  const diskColors = ['#FF68A8', '#64CFF7', '#F7E752', '#CA7CD8', '#50BCB9', '#81C953', '#ED7D51', '#A063C8', '#D84F74', '#44A9CC'];

  towers.forEach((tower, index) => {
    const towerElement = document.getElementById(`tower${index + 1}`);
    tower.forEach(disk => {
      const diskElement = document.createElement('div');
      diskElement.classList.add('disk');
    
      const diskWidth = minWidth + (maxWidth - minWidth) * (disk - 1) / (numberOfDisks - 1);
      diskElement.style.width = `${diskWidth}px`;

      diskElement.style.backgroundColor = diskColors[disk - 1];

      diskElement.style.height = `${diskHeight}px`; 
      towerElement.appendChild(diskElement);
    });
  });
}

function solveHanoi(numDisks, from, to, aux, moves) {
  if (numDisks === 1) {
    moves.push([from, to]);
  } else {
    solveHanoi(numDisks - 1, from, aux, to, moves);
    moves.push([from, to]);
    solveHanoi(numDisks - 1, aux, to, from, moves);
  }
}

function animateMoves(moves, towers, numberOfDisks, startBtn, input) {
  if (moves.length === 0) {
    startBtn.disabled = false;
    input.disabled = false;
    return;
  }

  const [from, to] = moves.shift();

  const fromTower = towers[from];
  const toTower = towers[to];

  const disk = fromTower.pop();
  toTower.push(disk);

  setTimeout(() => {
    resetTowers();
    renderTowers(towers, numberOfDisks);
    animateMoves(moves, towers, numberOfDisks, startBtn, input);
  }, 500);
}
