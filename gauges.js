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

	if (p.green)
		for (var i = 0; i < p.green.length; i++)
			drawArea(p.green[i], 'green');

	if (p.yellow)
		for (var i = 0; i < p.yellow.length; i++)
			drawArea(p.yellow[i], 'yellow');

	if (p.red)
		for (var i = 0; i < p.red.length; i++)
			drawArea(p.red[i], 'red');

	// Marker limits
	if (p.marker > 100) p.marker = 100;
	if (p.marker < 0) p.marker = 0;

	var marker = paper.path('M 4 ' + (100-p.marker) + ' l 12 -8 l 0 16 z');
	marker.attr({fill: 'white'});

	box.toFront();
}

function speedometer(p)
{
	var paper = Raphael(p.x, p.y, 120, 120);
	var border = paper.circle(60, 60, 55);
	border.attr({stroke: '#555', 'stroke-width': '6px'});

	function drawBand(from, to, color)
	{
		var radius = 49;

		// Band limits
		if (to > 100) to = 100;
		if (from < 0) from = 0;

		// Translate % into angles (220 deg total, from -20 to 200)
		from = 200 - (from * 2.2);
		to   = 200 - (to * 2.2);

		// Determine points of arc
		var x1 = 60 + Math.cos(to * Math.PI/180) * radius;
		var y1 = 60 + Math.sin(to * Math.PI/180) * radius * -1;
		var x2 = 60 + Math.cos(from * Math.PI/180) * radius;
		var y2 = 60 + Math.sin(from * Math.PI/180) * radius * -1;

		// If the arc is greather than 180, turn the large-arc-flag on
		var largeArcFlag = ((from-to) >= 180) ? 1 : 0;

		var path = paper.path('M ' + x1 + ',' + y1 + ' A ' + radius + ',' + radius + ' 0 ' + largeArcFlag + ',0 ' + x2 + ',' + y2);
		path.attr({stroke: color, 'stroke-width': '5px'});
	}

	if (p.green)
		for (var i = 0; i < p.green.length; i++)
			drawBand(p.green[i][0], p.green[i][1], 'green');
	if (p.yellow)
		for (var i = 0; i < p.yellow.length; i++)
			drawBand(p.yellow[i][0], p.yellow[i][1], 'yellow');
	if (p.red)
		for (var i = 0; i < p.red.length; i++)
			drawBand(p.red[i][0], p.red[i][1], 'red');

	var outline = paper.path('M 11.135983719 77.785047453 a 52,52 0 1,1 97.728032562 0');
	outline.attr({stroke: 'white'});

	// Marker limits
	if (p.marker > 100) p.marker = 100;
	if (p.marker < 0) p.marker = 0;

	var marker = paper.path('M 57 60 L 60 10 L 63 60 z');
	marker.attr({fill: 'white', 'stroke-width': 0});
	marker.rotate(-110 + (p.marker * 2.2), 60, 60);

	var lineDots = paper.set();
	lineDots.push(
		paper.path('M 11.135983719 77.785047453 l 9.396926208 -3.420201433'),
		paper.path('M 108.864016281 77.785047453 l -9.396926208 -3.420201433')
	);
	lineDots.attr({stroke: 'white'});

	var pivot = paper.circle(60, 60, 5);
	pivot.attr({fill: '#555', 'stroke-width': 0});

	if (p.title)
	{
		var title = paper.text(60, 80, p.title);
		title.attr({fill: 'white', 'font-size': '12px'});
	}

	if (p.value)
	{
		var value = paper.text(60, 95, p.value);
		value.attr({fill: 'white', 'font-size': '16px'});
	}
}
