function metarThermo()
{
	var paper = Raphael(0, 0, 320, 200);

	var thermo = paper.path('M 6 10 v 60 a 10 10 0 1 0 10 0 v -60 a 5 5 0 0 0 -10 0');
	thermo.attr({stroke: 'white', fill: '90-#f00-#fff'});

	var temp = paper.text(22, 25, '23');
	temp.attr({fill: 'white', 'text-anchor': 'start', 'font-size': '30px'});

	var windFrom = paper.path('M 35 40 l -5 25 l 10 0 z');
	windFrom.attr({fill: 'white'});
	windFrom.rotate(135);
}
