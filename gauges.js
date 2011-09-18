/*
 * Call example:
 *
 * var gauge = new verticalGauge({
 * 	x: 100,
 * 	y: 100,
 * 	red: [[0,10], [80, 100]],
 * 	yellow: [[40,70]],
 * 	green: [[15,30]],
 * 	marker: 53,
 * });
 * gauge.setMarker(90);
 */
function verticalGauge(p)
{
	var paper = Raphael(p.x, p.y, 16, 100);

	var box = paper.path('M 16 0 L 0 0 L 0 100 L 16 100');
	box.attr({stroke: 'white'});

	var drawArea = function(points, color)
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

	// Method to set marker position
	this.marker = 0;
	this.setMarker = function(markerPos)
	{
		// Marker limits
		if (markerPos > 100) markerPos = 100;
		if (markerPos < 0) markerPos = 0;

		var t = markerPos - this.marker;
		this.marker = markerPos;

		markerArrow.animate({'translation': '0 ' + (t * -1)}, 1000, '>');
	}

	var markerArrow = paper.path('M 4 100 l 12 -8 l 0 16 z');
	markerArrow.attr({fill: 'white'});

	if (p.marker)
		this.setMarker(p.marker);

	box.toFront();
}

/*
 * var speed = new speedometer({
 * 	x: 0,
 * 	y: 0,
 * 	marker: 60,
 * 	green: [[10,50]],
 * 	yellow: [[50, 70]],
 * 	red: [[0,10], [70,100]],
 * 	value: 2260,
 * 	title: 'RPM',
 * });
 * speed.setMarker(90);
 */
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

	var markerArrow = paper.path('M 57 60 L 60 10 L 63 60 z');
	markerArrow.attr({fill: 'white', 'stroke-width': 0});

	this.marker = 0;
	this.setMarker = function(markerPos)
	{
		// Marker limits
		if (markerPos > 100) markerPos = 100;
		if (markerPos < 0) markerPos = 0;

		// markerArrow.rotate(-110 + (p.marker * 2.2), 60, 60);
		markerArrow.animate({'rotation': (-110 + (markerPos * 2.2)) + ' 60 60'}, 1000, '>');

		this.marker = markerPos;
	}

	if (p.marker)
		this.setMarker(p.marker);

	var lineDots = paper.set();
	lineDots.push(
		paper.path('M 11.135983719 77.785047453 l 9.396926208 -3.420201433'),
		paper.path('M 108.864016281 77.785047453 l -9.396926208 -3.420201433')
	);
	lineDots.attr({stroke: 'white'});

	var pivot = paper.circle(60, 60, 5);
	pivot.attr({fill: '#555', 'stroke-width': 0});

	this.setValue = function(valueStr)
	{
		value.attr({'text': valueStr});
	}

	this.setTitle = function(valueStr)
	{
		title.attr({'text': valueStr});
	}

	var value = paper.text(60, 95, '');
	value.attr({fill: 'white', 'font-size': '16px'});

	var title = paper.text(60, 80, '');
	title.attr({fill: 'white', 'font-size': '12px'});

	if (p.value)
	{
		this.setValue(p.value);
	}

	if (p.title)
	{
		this.setTitle(p.title);
	}
}

function svgClock(x, y)
{
	var center = 80;
	var paper = Raphael(x, y, 160, 160);

	// Outer border
	var border = paper.circle(center, center, 75);
	border.attr({stroke: '#555', 'stroke-width': '6px'});

	// 1-minute ticks
	for (var angle=0; angle < 360; angle += 6)
	{
		var tick = paper.path('M ' + center + ' 11 v -3');
		tick.attr({stroke: '#555', 'stroke-width': '1px'});
		tick.rotate(angle, center, center);
	}

	// 5-minute ticks
	for (var angle=0; angle < 360; angle += 30)
	{
		var tick = paper.path('M ' + center + ' 15 v -7');
		tick.attr({stroke: '#555', 'stroke-width': '1px'});
		tick.rotate(angle, center, center);
	}

	// clock pointers
	var minute = paper.path('M 78.5 80 v -58 l 1.5 -4 l 1.5 4 v 58 z');
	minute.attr({'stroke-width': 0, 'fill': 'white'});
	var minuteL = paper.path('M 80 80 v -58');
	minuteL.attr({'stroke-width': '1px', 'stroke': '#aaa'});

	var hour = paper.path('M 78.5 80 v -38 l 1.5 -4 l 1.5 4 v 38 z');
	hour.attr({'stroke-width': '0', 'fill': '#ddd'});
	var hourL = paper.path('M 80 80 v -38');
	hourL.attr({'stroke-width': '1px', 'stroke': '#aaa'});

	// pivot
	var pivot = paper.circle(center, center, 5);
	pivot.attr({'stroke-width': 0, fill: '#555'});

	var drawClock = function()
	{
		var now = new Date();
		var m = now.getMinutes() + (now.getSeconds() / 60.0);
		var h = now.getHours() + (m / 60.0);

		minute.rotate(m * 6, center, center);
		minuteL.rotate(m * 6, center, center);
		hour.rotate(h * 30, center, center);
		hourL.rotate(h * 30, center, center);
	}

	var setClock = function()
	{
		drawClock();
		setTimeout(function(){setClock()}, 1000);
	}

	setClock();
}
