'use strict';

window.drawCloud = function (ctx, x, y, width, height) {
  var offset = 10;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + offset, y + height / 2);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x + width / 2, y + height - offset);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width - offset, y + height / 2);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width / 2, y + offset);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
};

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  window.drawCloud(ctx, 110, 20, 420, 270);

  ctx.fillStyle = '#fff';
  window.drawCloud(ctx, 100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;
  var min = Infinity;

  times.forEach(function (time) {
    if (time > max) {
      max = time;
    }
    if (time < min) {
      min = time;
    }
  });

  min = 0;

  var histoHeight = 150;
  var histoX = 140;
  var step = histoHeight / (max - min);
  var columnWidth = 40;
  var columnIndent = 50;

  for (var i = 0; i < times.length; i++) {
    var name = names[i];
    var time = times[i];
    var height = step * (time - min);

    ctx.fillText(parseInt(time, 10), histoX + (columnWidth + columnIndent) * i, 90 + histoHeight - height);
    ctx.fillText(name, histoX + (columnWidth + columnIndent) * i, 100 + histoHeight + 20);

    if (name === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, ' + parseInt(Math.random() * times.length * 50, 10) + ', ' + Math.random() + ')';
    }
    ctx.fillRect(histoX + (columnWidth + columnIndent) * i, 100 + histoHeight - height, columnWidth, height);

    ctx.fillStyle = '#000';
  }
};
