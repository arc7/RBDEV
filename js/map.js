function getCurrentLocation() {
	navigator.geolocation.getCurrentPosition(
		function(position) {
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				function(FS) {
					downloadMap(position.coords.latitude, position.coords.longitude, 10, FS);
				},
				function(error) {
					$("#debug").append("Can't get filesystem<br />");
				}
			);
		},
		function(error) {
			$("#debug").append("Can't get current position<br />");
		},
		{ enableHighAccuracy: true }
	);
}

function downloadMap(lat, lon, rayon, fileSystem) {
	var xtile = long2tile(lon, 15);
	var ytile = lat2tile(lat, 15);
	
	var x2tile = long2tile(lon-rayon*((1/Math.cos(lat))/111.12), 15);
	var y2tile = lat2tile(lat-rayon*0.00899928005759539236861051115911, 15);
	
	var fileTransfer = new FileTransfer();
	for(var i=x2tile; i<=2*xtile-x2tile; i++) {
		for(var j=2*ytile-y2tile; j<=y2tile; j++) {
			setTimeout(fileTransfer.download(
				"http://a.tile.openstreetmap.org/15/"+i+"/"+j+".png",
				fileSystem.root.fullPath+"/openstreetmap/15/"+i+"/"+j+".png",
				function(entry) {
			
				},
				function(error) {
					setTimeout(fileTransfer.download(
						"http://b.tile.openstreetmap.org/15/"+i+"/"+j+".png",
						fileSystem.root.fullPath+"/openstreetmap/15/"+i+"/"+j+".png",
						function(entry) {
			
						},
						function(error) {
							setTimeout(fileTransfer.download(
								"http://c.tile.openstreetmap.org/15/"+i+"/"+j+".png",
								fileSystem.root.fullPath+"/openstreetmap/15/"+i+"/"+j+".png",
								function(entry) {
			
								},
								function(error) {
							
								}
							), 500);
						}
					), 500);
				}
			), 500);
		}
	}
}