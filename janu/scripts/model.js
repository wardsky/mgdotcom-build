// Map of the maze, indicating which spaces are open.
var map = [1, 1, 1, 1, 0, 0, 1, 1, 
           0, 1, 0, 1, 1, 1, 1, 0, 
           0, 1, 1, 1, 0, 0, 1, 1, 
           0, 0, 0, 1, 0, 1, 0, 1, 
           1, 1, 0, 1, 0, 1, 1, 1, 
           0, 1, 1, 1, 1, 1, 0, 0, 
           1, 1, 0, 0, 0, 1, 0, 1, 
           0, 1, 1, 1, 1, 1, 1, 1];

// The size of the map.
const MAP_ROWS = 8;
const MAP_COLS = 8;

// Is the space at row i, column j open?
function isOpen(i, j) {
  if (i < 0 || i >= MAP_ROWS) return false;
  if (j < 0 || j >= MAP_COLS) return false;
  return map[i * MAP_COLS + j];
}

// Starting and current player position and facing.
var playerStart = { i: 0, j: 0, facing: 'E' };
var player = {};

// Starting and current enemy position.
var enemyStart = { i: 6, j: 7 };
var enemy = {};

// Gem location.
var gem = { i: 3, j: 5 };

function resetGame() {
  player.i = playerStart.i;
  player.j = playerStart.j;
  player.facing = playerStart.facing;
  enemy.i = enemyStart.i;
  enemy.j = enemyStart.j;
}

function isEnemyAt(i, j) {
  return i == enemy.i && j == enemy.j;
}

function isGemAt(i, j) {
  return i == gem.i && j == gem.j;
}

function moveEnemy() {
  var i, j;
  
  if (player.j == enemy.j && player.i < enemy.i) {
    // Player is directly N of enemy.
    j = enemy.j;
    for (i = enemy.i - 1; isOpen(i, j); i--)
      if (i == player.i) {
        // Enemy has line-of-sight to player: move enemy N.
        enemy.i -= 1;
        return;
      }
  }
  else if (player.i == enemy.i && player.j > enemy.j) {
    // Player is directly E of enemy.
    i = enemy.i;
    for (j = enemy.j + 1; isOpen(i, j); j++)
      if (j == player.j) {
        // Enemy has line-of-sight to player: move enemy E.
        enemy.j += 1;
        return;
      }
  }
  else if (player.j == enemy.j && player.i > enemy.i) {
    // Player is directly S of enemy.
    j = enemy.j;
    for (i = enemy.i + 1; isOpen(i, j); i++)
      if (i == player.i) {
        // Enemy has line-of-sight to player: move enemy S.
        enemy.i += 1;
        return;
      }
  }
  else if (player.i == enemy.i && player.j < enemy.j) {
    // Player is directly W of enemy.
    i = enemy.i;
    for (j = enemy.j - 1; isOpen(i, j); j--)
      if (j == player.j) {
        // Enemy has line-of-sight to player: move enemy W.
        enemy.j -= 1;
        return;
      }
  }
  
  // Enemy doesn't have line-of-sight to player: move enemy to an adjacent open space.
  if (isOpen(enemy.i - 1, enemy.j))
    enemy.i -= 1;
  else if (isOpen(enemy.i, enemy.j + 1))
    enemy.j += 1;
  else if (isOpen(enemy.i + 1, enemy.j))
    enemy.i += 1;
  else if (isOpen(enemy.i, enemy.j - 1))
    enemy.j -= 1;
}

// Move player one space in the direction they are currently facing, if possible.
function movePlayerForward() {

  switch (player.facing) {

  case 'N':
    if (isOpen(player.i - 1, player.j))
      player.i -= 1;
    break;

  case 'E':
    if (isOpen(player.i, player.j + 1))
      player.j += 1;
    break;

  case 'S':
    if (isOpen(player.i + 1, player.j))
      player.i += 1;
    break;

  case 'W':
    if (isOpen(player.i, player.j - 1))
      player.j -= 1;
    break;
  }
}

// Turn the player 90deg to their left.
function rotatePlayerLeft() {

  switch (player.facing) {

  case 'N':
    player.facing = 'W';
    break;

  case 'E':
    player.facing = 'N';
    break;

  case 'S':
    player.facing = 'E';
    break;

  case 'W':
    player.facing = 'S';
    break;
  }
}

// Turn the player 90deg to their right.
function rotatePlayerRight() {

  switch (player.facing) {

  case 'N':
    player.facing = 'E';
    break;

  case 'E':
    player.facing = 'S';
    break;

  case 'S':
    player.facing = 'W';
    break;

  case 'W':
    player.facing = 'N';
    break;
  }
}
