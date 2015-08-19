function redraw() {

  function imageUrl(name) {
    return 'url("images/' + name + '.png")';
  }

  var i = {};
  var j = {};

  var sprites = [];

  for (var depth = 1; depth <= 7; depth++) {

    switch (player.facing) {

    case 'N':
      i['L'] = i['C'] = i['R'] = player.i - depth;
      j['L'] = player.j - 1;
      j['C'] = player.j;
      j['R'] = player.j + 1;
      break;

    case 'E':
      i['L'] = player.i - 1;
      i['C'] = player.i;
      i['R'] = player.i + 1;
      j['L'] = j['C'] = j['R'] = player.j + depth;
      break;

    case 'S':
      i['L'] = i['C'] = i['R'] = player.i + depth;
      j['L'] = player.j + 1;
      j['C'] = player.j;
      j['R'] = player.j - 1;
      break;

    case 'W':
      i['L'] = player.i + 1;
      i['C'] = player.i;
      i['R'] = player.i - 1;
      j['L'] = j['C'] = j['R'] = player.j - depth;
      break;
    }

    ['C', 'L', 'R'].forEach(function (position) {
      if (isEnemyAt(i[position], j[position]))
        sprites.push(imageUrl('enemy' + depth + position));
      else if (isGemAt(i[position], j[position]))
        sprites.push(imageUrl('gem' + depth + position));
      else if (!isOpen(i[position], j[position]))
        sprites.push(imageUrl('wall' + depth + position));
    });
  }

  document.getElementById('backdrop').style.backgroundImage = sprites.join(', ');
}

function forward() {

  movePlayerForward();

  if (isEnemyAt(player.i, player.j)) {
    document.getElementById('viewport').className = 'gameover';
    return;
  }

  if (isGemAt(player.i, player.j)) {
    document.getElementById('viewport').className = 'success';
    return;
  }

  moveEnemy();

  if (isEnemyAt(player.i, player.j)) {
    document.getElementById('viewport').className = 'gameover';
    return;
  }

  redraw();
}

function left() {
  rotatePlayerLeft();
  redraw();
}

function right() {
  rotatePlayerRight();
  redraw();
}

function restart() {
  resetGame();
  redraw();
  document.getElementById('viewport').className = '';
}
