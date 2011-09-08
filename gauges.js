/*
 * Call example:
 *
 * verticalGauge({
 * 	x: 100,
 * 	y: 100,
 * 	red: [[0,10], [80, 100]],
 * 	yellow: [[40,70]],
 * 	green: [[15,30]],
 * 	marker: 53,
 * });
 */
function verticalGauge(p)
{
	var paper = Raphael(p.x, p.y, 16, 100);

	var box = paper.path('M 16 0 L 0 0 L 0 100 L 16 100');
	box.attr({stroke: 'white'});

	function drawArea(points, color)
	{
		points[0] = 100 - points[0];
		points[1] = 100 - points[1];

		var path = 'M 0 ' + points[0] + ' l 8 0 l 0 ' + (points[1] - points[0]) + ' l -8 0 z';

		var area = paper.path(path);
		area.attr({fill: color, 'stroke-width': 0});
	}

	if (p.red)
		for (var i = 0; i < p.red.length; i++)
			drawArea(p.red[i], 'red');

	if (p.yellow)
		for (var i = 0; i < p.yellow.length; i++)
			drawArea(p.yellow[i], 'yellow');

	if (p.green)
		for (var i = 0; i < p.green.length; i++)
			drawArea(p.green[i], 'green');

	var marker = paper.path('M 4 ' + (100-p.marker) + ' l 12 -8 l 0 16 z');
	marker.attr({fill: 'white'});

	box.toFront();
}
