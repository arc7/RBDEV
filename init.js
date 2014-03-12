var map;

function initialize() {
	$('.adresse').on('tap', function() {
		window.open('https://maps.google.com/maps?q=Le Train Bleu Gare de Lyon - 1 place Louis Armand - 75012 Paris');
	});
	
	$('.telephone').on('tap', function() {
		window.open('tel:0123456789');
	});
	
	$('.Alain-Ries').on('tap', function() {
		$('.nom-source').css('background-color', 'rgba(255, 255, 255, 0)');
		$('.tag').css('background-color', 'rgba(255, 255, 255, 0)');
		$('.Alain-Ries').css('background-color', '#00007F');
	});
	
	$('.Philippe-Tarbouriech').on('tap', function() {
		$('.nom-source').css('background-color', 'rgba(255, 255, 255, 0)');
		$('.tag').css('background-color', 'rgba(255, 255, 255, 0)');
		$('.Philippe-Tarbouriech').css('background-color', '#002F00');
	});
}

function initialize_map() {
	/*var div_map = document.getElementById('map');
	map = createMap(48.844077, 2.3737547 , 14, div_map);
	addMarker(48.844077, 2.3737547, map);
	addCustomMarker(48.845, 2.374, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
	addCustomMarker(48.847, 2.366, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
	addCustomMarker(48.849, 2.377, map, "www/img/marker_rond_vert.png", "Le Train Bleu");
	addCustomMarker(48.838, 2.375, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
	addCustomMarker(48.851, 2.369, map, "www/img/marker_rond_vert.png", "Le Train Bleu");
	addCustomMarker(48.848, 2.368, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
	navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationFail, { enableHighAccuracy: true });*/
	
	document.addEventListener("deviceready",onDeviceReady,false);
	
	function onDeviceReady() {
		//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
		init_map();
	}
	
}

function init_map() {
	var networkState = navigator.connection.type;
	if(networkState==navigator.connection.NONE) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSLocal, fail);
	}
	else {
		var fromProjection = new OpenLayers.Projection("EPSG:4326");
		var toProjection   = new OpenLayers.Projection("EPSG:900913");
		var map = new OpenLayers.Map("map");
		map.addLayer(new OpenLayers.Layer.OSM());
		var position = new OpenLayers.LonLat(2.3737547, 48.844077).transform(fromProjection, toProjection);
		map.setCenter(position, 15);
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSServeur, fail);
	}
}

function gotFSLocal(FS) {
	var fromProjection = new OpenLayers.Projection("EPSG:4326");
	var toProjection   = new OpenLayers.Projection("EPSG:900913");
	var map = new OpenLayers.Map("map");
	var newLayer = new OpenLayers.Layer.OSM(
		"New Layer", 
		//"http://a.tile.openstreetmap.org/${z}/${x}/${y}.png", 
		FS.root.fullPath+"/openstreetmap/${z}/${x}/${y}.png", 
		//source,
		{zoomOffset: 15, resolutions: [4.77731426696777]}
	);
	map.addLayer(newLayer);
	var position = new OpenLayers.LonLat(2.3737547, 48.844077).transform(fromProjection, toProjection);
	map.setCenter(position, 15);
}

function gotFSServeur(FS) {
	//fileSystem = FS;
	var xtile = long2tile(2.3737547, 15);
	var ytile = lat2tile(48.844077, 15);
	
	
	var fileTransfer = new FileTransfer();
	for(var i=xtile-5; i<=xtile+5; i++) {
		for(var j=ytile-5; j<=ytile+5; j++) {
			fileTransfer.download(
				//"http://maps.googleapis.com/maps/api/staticmap?center=48.0469881,0.585018&zoom=15&size=400x320&sensor=false",
				//"http://ojw.dev.openstreetmap.org/StaticMap/?lat=48.0469881&lon=0.585018&z=15&layer=cloudmade_2&mode=Export&show=1",
				//"http://developer.android.com/design/media/switches_switches.png",
				"http://a.tile.openstreetmap.org/15/"+i+"/"+j+".png",
				FS.root.fullPath+"/openstreetmap/15/"+i+"/"+j+".png",
				//fileEntry.fullPath,
				function(entry) {
					var image = document.getElementById('photo');
					image.src = entry.fullPath;
				},
				function(error) {
					var output = document.getElementById('restaurant');
					output.innerHTML = output.innerHTML + '<br>Impossible to get image '+i+'-'+j+' : ';
					if(error.code == FileTransferError.FILE_NOT_FOUND_ERR) {
						output.innerHTML = output.innerHTML + 'File not found';
					}
					else if(error.code == FileTransferError.INVALID_URL_ERR) {
						output.innerHTML = output.innerHTML + 'Invalid URL';
					}
					else if(error.code == FileTransferError.CONNECTION_ERR) {
						output.innerHTML = output.innerHTML + 'Connection error';
					}
					else if(error.code == FileTransferError.ABORT_ERR) {
						output.innerHTML = output.innerHTML + 'Abort error';
					}
				}
			);
		}
	}
}

function fail(error) {
	console.log(error.code);
}

function onLocationSuccess(position) {
	var div_map = document.getElementById('map');
	map = createMap(position.coords.latitude, position.coords.longitude, 14, div_map);
	addMarker(position.coords.latitude, position.coords.longitude, map);
	addCustomMarker(position.coords.latitude-0.001, position.coords.longitude-0.012, map, "www/img/marker_rond_vert.png", "Le Train Bleu");
	addCustomMarker(position.coords.latitude+0.002, position.coords.longitude+0.001, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
	addCustomMarker(position.coords.latitude-0.003, position.coords.longitude+0.003, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
	addCustomMarker(position.coords.latitude-0.011, position.coords.longitude-0.002, map, "www/img/marker_rond_vert.png", "Le Train Bleu");
	addCustomMarker(position.coords.latitude+0.009, position.coords.longitude+0.009, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
	addCustomMarker(position.coords.latitude, position.coords.longitude+0.001, map, "www/img/marker_rond_vert.png", "Le Train Bleu");
	addCustomMarker(position.coords.latitude+0.001, position.coords.longitude-0.008, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
}

function onLocationFail(error) {
	var div_map = document.getElementById('map');
	map = createMap(48.844077, 2.3737547 , 14, div_map);
	addMarker(48.844077, 2.3737547, map);
	addCustomMarker(48.845, 2.374, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
	addCustomMarker(48.847, 2.366, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
	addCustomMarker(48.849, 2.377, map, "www/img/marker_rond_vert.png", "Le Train Bleu");
	addCustomMarker(48.838, 2.375, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
	addCustomMarker(48.851, 2.369, map, "www/img/marker_rond_vert.png", "Le Train Bleu");
	addCustomMarker(48.848, 2.368, map, "www/img/marker_carre_bleu.png", "Le Train Bleu");
}

function createMap(lat, lon, z, div) {
	var mapOptions = {
		zoom: z,
		center: new google.maps.LatLng(lat, lon),
		panControl: true,
		zoomControl: true,
		scaleControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(div, mapOptions);
	return map;
}

function addMarker(lat, lon, map) {
	var marker = new google.maps.Marker({
		map: map,
		position: new google.maps.LatLng(lat, lon)
	});
	return marker;
}

function addCustomMarker(lat, lon, map, icone, titre) {
	var image = new google.maps.MarkerImage(
		icone,
		new google.maps.Size(16, 16),
		new google.maps.Point(0, 0),
		new google.maps.Point(8, 8)
	);
	
	var marker = new google.maps.Marker({
		map: map,
		icon: image,
		title: titre,
		position: new google.maps.LatLng(lat, lon)
	});
	
	
	var myWindowOptions = {
		content:
		'<h6>Le Train Bleu</h6>'+
		'<p><a href="./fiche_restaurant.html" title="Fiche du restaurant" data-ajax="false" data_transition="pop">Aller sur la fiche du restaurant</a></p>'
	};
 
	var infoWindow = new google.maps.InfoWindow(myWindowOptions);
 
	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.open(map,marker);
	});
	
	return marker;
}


function long2tile(lon,zoom) {
	return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
}

function lat2tile(lat,zoom) {
	return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
}

function tile2long(x,z) {
	return (x/Math.pow(2,z)*360-180);
}

function tile2lat(y,z) {
	var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
	return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}