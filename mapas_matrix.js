///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, -3],
		zoom: 6,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});

///////////Funcionalidades estructura del visor///////////
//Layers on top
map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';
//Barra de interacción de capas	tantaas sildebar como grupos de capas
var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);


///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<h3>Contaminanción atmosférica difusa en Espacios Naturales Protegidos<br>Proyecto IMPACTSIG</h3>';
	 return div;
	};
	title2.addTo(map);
//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix.png" width="75%" ></img></a>';
	 return div;
	};
	title1.addTo(map);
//Logo impactsig	
var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/impactsig.png" width="100px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  


///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2018 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2018 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});
//Límites
var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.3,
	opacity: 0.5,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);

///////////Otras funcionalidades
//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -5], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////

//SO2


function getColor1(a) {return a  > 3 ? '#BE1D00' :
	a > 1 ? '#E67701' :
	a > 0.30 ? '#FFD900' :
	a > 0.15 ? '#BAD578' :
	a > 0.05 ? '#318C00' :
    a > 0 ? '#004800' :
	'#C2523C';
};
function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.SO2),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup1(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>ENP: </strong>"+feature.properties.ODESIGN.toLocaleString()+" "+feature.properties.Nombre_ENP.toLocaleString()+
			"<strong><BR>Provincia: </strong>"+feature.properties.EV_2018__1.toLocaleString()+
			"<strong><BR>Emisiones de SO<sub>2</sub>: </strong>"+feature.properties.SO2.toFixed(3).replace(".", ",")+" t/km<sup>2</sup>"+
			"<strong><BR>Total de emisiones: </strong>"+feature.properties.E_TOT_SO2+" t",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
};
};
var geojson1 = L.geoJson(tabla_conta, {
	style: style1,
	onEachFeature: popup1
});

//NH3

function getColor2(a) {return a  > 1.20 ? '#BE1D00' :
	a > 0.60 ? '#E67701' :
	a > 0.45 ? '#FFD900' :
	a > 0.30 ? '#BAD578' :
	a > 0.15 ? '#318C00' :
    a > 0 ? '#004800' :
    a == 0 ? '#004800' :
	'#C2523C';
};
function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.NH3),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup2(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>ENP: </strong>"+feature.properties.ODESIGN.toLocaleString()+" "+feature.properties.Nombre_ENP.toLocaleString()+
			"<strong><BR>Provincia: </strong>"+feature.properties.EV_2018__1.toLocaleString()+
			"<strong><BR>Emisiones de NH<sub>3</sub>: </strong>"+feature.properties.NH3.toFixed(3).replace(".", ",")+" t/km<sup>2</sup>"+
			"<strong><BR>Total de emisiones: </strong>"+feature.properties.E_TOT_NH3+" t",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
};
};
var geojson2 = L.geoJson(tabla_conta, {
	style: style2,
	onEachFeature: popup2
});

//CO

function getColor3(a) {return a  > 12 ? '#BE1D00' :
	a > 6 ? '#E67701' :
	a > 3 ? '#FFD900' :
	a > 1.5 ? '#BAD578' :
	a > 0.5 ? '#318C00' :
    a > 0 ? '#004800' :
	'#C2523C';
};
function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.CO),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup3(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>ENP: </strong>"+feature.properties.ODESIGN.toLocaleString()+" "+feature.properties.Nombre_ENP.toLocaleString()+
			"<strong><BR>Provincia: </strong>"+feature.properties.EV_2018__1.toLocaleString()+
			"<strong><BR>Emisiones de CO: </strong>"+feature.properties.CO.toFixed(3).replace(".", ",")+" t/km<sup>2</sup>"+
			"<strong><BR>Total de emisiones: </strong>"+feature.properties.E_TOT_CO+" t",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
};
};
var geojson3 = L.geoJson(tabla_conta, {
	style: style3,
	onEachFeature: popup3
});

//Óxidos de nitógeno

function getColor4(a) {return a  >8 ? '#BE1D00' :
	a > 4 ? '#E67701' :
	a > 2 ? '#FFD900' :
	a > 1 ? '#BAD578' :
	a > 0.5 ? '#318C00' :
    a > 0 ? '#004800' :
    a == 0? '#004800' :
	'#C2523C';
};
function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.NOx),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup4(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>ENP: </strong>"+feature.properties.ODESIGN.toLocaleString()+" "+feature.properties.Nombre_ENP.toLocaleString()+
            "<strong><BR>Provincia: </strong>"+feature.properties.EV_2018__1.toLocaleString()+
			"<strong><BR> Emisiones de NO<SUB>x</SUB>: </strong>"+feature.properties.NOx.toFixed(3).replace(".", ",")+" t/km<sup>2</sup>"+
			"<strong><BR>Total de emisiones: </strong>"+feature.properties.E_TOT_NOx+" t",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
};
};
var geojson4 = L.geoJson(tabla_conta, {
	style: style4,
	onEachFeature: popup4
});

//partículas PM10


function getColor5(a) 
    {return a > 1 ? '#BE1D00' :
	a > 0.50 ? '#E67701' :
	a > 0.30 ? '#FFD900' :
	a > 0.15 ? '#BAD578' :
	a > 0.05 ? '#318C00' :
    a > 0 ? '#004800' :
	'#C2523C';
};
function style5(feature) {
	return {
		fillColor: getColor5(feature.properties.PM10),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};
function popup5(feature, layer) {
	if (feature.properties && feature.properties.CO) {
layer.bindTooltip("<strong>ENP: </strong>"+feature.properties.ODESIGN.toLocaleString()+" "+feature.properties.Nombre_ENP.toLocaleString()+
    "<strong><BR>Provincia: </strong>"+feature.properties.EV_2018__1.toLocaleString()+
	"<strong><BR>Emisiones de partículas gruesas (PM<SUB>10</SUB>): </strong>"+feature.properties.PM10.toFixed(3).replace(".", ",")+" t/km<sup>2</sup>"+
	"<strong><BR>Total de emisiones: </strong>"+feature.properties.E_TOT_PM10+" t",{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};
var geojson5 = L.geoJson(tabla_conta, {
	style: style5,
	onEachFeature: popup5
});

//EMISIONES ENP

function getColor6(a) 
    {return a == 'Muy bajas' ? '#2892C6' :
	a == 'Bajas (excepto NH3)' ? '#9FC29A' :
	a == 'Medias' ? '#FFD900' :
	a == 'Altas (muy altas SO2'? '#E67701' :
	a == 'Muy altas' ? '#BE1D00' :

	'#C2523C';
};
function style6(feature) {
	return {
		fillColor: getColor6(feature.properties.TIPIF),
		weight: 0,
		opacity: 0.60,
		color: '#0B161D',
		dashArray: '1',
		fillOpacity: 1
	};
};



function popup6(feature, layer) {
	if (feature.properties && feature.properties.CO) {
		layer.bindTooltip("<strong>ENP: </strong>"+feature.properties.ODESIGN.toLocaleString()+" "+feature.properties.Nombre_ENP.toLocaleString()+
            "<strong><BR>Provincia: </strong>"+feature.properties.EV_2018__1.toLocaleString()+
			"<strong><BR>Clases de emisión: </strong>"+feature.properties.TIPIF.replace("3", "<sub>3</sub>").replace("2", "<sub>2</sub>"),{direction:"top",sticky:true, permanente:true,offset:[0,-5], pane: 'popups'});			
	};
};/*(feature.properties.Comp? feature.properties.Comp.toString().replace(".", ","):feature.properties.Comp)*/
var geojson6 = L.geoJson(tabla_conta, {
	style: style6,
	onEachFeature: popup6
});


var prov = L.geoJson(prov, {
	color: "#17202A", 
	weight: 1.3,
	opacity: 0.3,
	fillOpacity: 0,
	pane: 'límites', // layer goes on top.
	attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);

//lista capas desplegable


var mapa1 = L.layerGroup([geojson1]);
var mapa2 = L.layerGroup([geojson2]);
var mapa3 = L.layerGroup([geojson3]);
var mapa4 = L.layerGroup([geojson4]);
var mapa5 = L.layerGroup([geojson5]);
var mapa6 = L.layerGroup([geojson6]).addTo(map);


var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Mapas de emisiones de contaminación atmosférica difusa por Espacios Naturales Protegidos (ENP)',
	children: [
		{ label: "Clases de ENP según emisiones difusas", layer: mapa6 },
        { label: "Emisiones de partículas gruesas (PM<sub>10</sub>)", layer: mapa5 },
        { label: "Emisiones de NO<sub>x</sub>", layer: mapa4 },
        { label: "Emisiones de CO", layer: mapa3 },
        { label: "Emisiones de NH<sub>3</sub>", layer: mapa2 },
        { label: "Emisiones de SO<sub>2</sub>", layer: mapa1 },
		]
	},
	];
	
		/*{ label: "Concentración de NO<SUB>2</SUB>", layer: mapa2 },
		{ label: "Concentración de NH<SUB>3</SUB>", layer: mapa3 },
		{ label: "Concentración de CO", layer: mapa4 },
		{ label: "Clases de municipios según emisiones contaminantes", layer: mapa100 },
		{ label: "Vulnerabilidad de municipios por concentración de contaminantes", layer: mapa5 },
	*/
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
		{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "<b>Límites de provincias", layer: prov},
		{ label: "OpenStreetMap", layer: osm},

	]
};	

//////////Definicion del estilo de la leyenda de cada capa///////////
// leyenda mapa1	

var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Emisión anual de dióxido de azufre (SO<sub>2</sub>) de fuentes difusas en Espacios Naturales Protegidos'+"<\h3>",
			style: style1,
			layer: mapa1,
			elements: [{
				label:"<h4>"+  'Unidades: t/km<sup>2</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0,00 - 0,05'+"<\h4>",html: '',style: {'background-color': '#004800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,06 - 0,15'+"<\h4>",html: '',style: {'background-color': '#318C00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,16 - 0,30'+"<\h4>",html: '',style: {'background-color': '#BAD578','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,31 - 1,00'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,01 - 3,00'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '3,01 - 6,50'+"<\h4>",html: '',style: {'background-color': '#BE1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '<br> <i>Fuente: Elaboración desde datos de 2008 y Banco de Datos de la Naturaleza (AEMA, 2011;  MITECO, 2018)<i>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend1);








// leyenda mapa2	

var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Emisión anual de amoniaco (NH<sub>3</sub>) de fuentes difusas en Espacios Naturales Protegidos'+"<\h3>",
			style: style2,
			layer: mapa2,
			elements: [{
				label:"<h4>"+  'Unidades: t/km<sup>2</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0,00 - 0,15'+"<\h4>",html: '',style: {'background-color': '#004800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,16 - 0,30'+"<\h4>",html: '',style: {'background-color': '#318C00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,31 - 0,45'+"<\h4>",html: '',style: {'background-color': '#BAD578','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,46 - 0,60'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,61 - 1,20'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,21 - 2,00'+"<\h4>",html: '',style: {'background-color': '#BE1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '<br> <i>Fuente: Elaboración desde datos de 2008 y Banco de Datos de la Naturaleza (AEMA, 2011;  MITECO, 2018)<i>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend2);
	
// leyenda mapa3	

var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Emisión anual de monóxido de carbono (CO) de fuentes difusas en Espacios Naturales Protegidos'+"<\h3>",
			style: style3,
			layer: mapa3,
			elements: [{
				label:"<h4>"+  'Unidades: t/km<sup>2</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0,00 - 0,50'+"<\h4>",html: '',style: {'background-color': '#004800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,51 - 1,50'+"<\h4>",html: '',style: {'background-color': '#318C00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,51 - 3,00'+"<\h4>",html: '',style: {'background-color': '#BAD578','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '3,01 - 6,00'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '6,01 - 12,0'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '12,01 - 55,0'+"<\h4>",html: '',style: {'background-color': '#BE1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '<br> <i>Fuente: Elaboración desde datos de 2008 y Banco de Datos de la Naturaleza (AEMA, 2011;  MITECO, 2018)<i>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend3);


// leyenda mapa4	

var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Emisión anual de óxidos de nitrógeno (NO<sub>x</sub>) de fuentes difusas en Espacios Naturales Protegidos'+"<\h3>",
			style: style4,
			layer: mapa4,
			elements: [{
				label:"<h4>"+  'Unidades: t/km<sup>2</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0,00 - 0,50'+"<\h4>",html: '',style: {'background-color': '#004800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,51 - 1,00'+"<\h4>",html: '',style: {'background-color': '#318C00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,01 - 2,00'+"<\h4>",html: '',style: {'background-color': '#BAD578','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '2,01 - 4,00'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '4,01 - 8,00'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '8,01 - 20,0'+"<\h4>",html: '',style: {'background-color': '#BE1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '<br> <i>Fuente: Elaboración desde datos de 2008 y Banco de Datos de la Naturaleza (AEMA, 2011;  MITECO, 2018)<i>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend4);

// leyenda mapa5	


var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Emisión anual de partículas gruesas (PM<sub>10</sub>) de fuentes difusas en Espacios Naturales Protegidos'+"<\h3>",
			style: style5,
			layer: mapa5,
			elements: [{
				label:"<h4>"+  'Unidades: t/km<sup>2</sup>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  '0,00 - 0,05'+"<\h4>",html: '',style: {'background-color': '#004800','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,06 - 0,15'+"<\h4>",html: '',style: {'background-color': '#318C00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,15 - 0,30'+"<\h4>",html: '',style: {'background-color': '#BAD578','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,31 - 0,50'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '0,51 - 1,00'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  '1,01 - 2,50'+"<\h4>",html: '',style: {'background-color': '#BE1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {		
				label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '<br> <i>Fuente: Elaboración desde datos de 2008 y Banco de Datos de la Naturaleza (AEMA, 2011; MITECO, 2018)<i>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	});
	map.addControl(htmlLegend5);


// leyenda mapa6	


var htmlLegend6 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h3>"+ 'Clases multivariantes de Espacios Naturales Protegidos, según sus emisiones de fuentes difusas'+"<\h3>",
			style: style6,
			layer: mapa6,
			elements: [{
				label:"<h4>"+  'Clases de emisión'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h4>"+  'Muy bajas'+"<\h4>",html: '',style: {'background-color': '#2892C6','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Bajas (excepto NH<sub>3</sub>)'+"<\h4>",html: '',style: {'background-color': '#9FC29A','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Medias'+"<\h4>",html: '',style: {'background-color': '#FFD900','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Altas (muy altas en SO<sub>2</sub>)'+"<\h4>",html: '',style: {'background-color': '#E67701','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				label:"<h4>"+  'Muy altas'+"<\h4>",html: '',style: {'background-color': '#BE1D00','width': '40px','height': '14px', 'border': 'black 1px solid'}}, {
				
				//label:"<h5>"+  ''+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<h5>"+  '<br> <i>Fuente: Elaboración desde datos de 2008 y Banco de Datos de la Naturaleza (AEMA, 2011;  MITECO, 2018)<i'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}] 
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend6);

//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});