function getCurrentLocation() {
	/*$("#debug").append("Getting current location ...<br />"); 
	navigator.geolocation.getCurrentPosition(
		function(position) {
			$("#debug").append("Current location : " + position.coords.latitude + ", " + position.coords.longitude + "<br />");
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				function(FS) {
					$("#debug").append("Root path : " + FS.root.fullPath + "<br />");
					downloadMap(position.coords.latitude, position.coords.longitude, 10, FS);
				},
				function(error) {
					$("#debug").append("Can't get filesystem<br />");
				}
			);
		},
		function(error) {
			$("#debug").append("Can't get current location<br />");*/
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
				function(FS) {
					$("#debug").append("Root path : " + FS.root.fullPath + "<br />");
					downloadMap(48.844077, 2.3737547, 10, FS);
				},
				function(error) {
					$("#debug").append("Can't get filesystem<br />");
				}
			);
		/*},
		{ enableHighAccuracy: true }
	);*/
}

function downloadMap(lat, lon, rayon, fileSystem) {
	var xtile = long2tile(lon, 15);
	var ytile = lat2tile(lat, 15);
	
	var x2tile = long2tile(lon-rayon*((1/Math.cos(lat))/111.12), 15);
	var y2tile = lat2tile(lat-rayon*0.00899928005759539236861051115911, 15);
	
	$("#debug").append("Starting map download ...<br />");
	
	/*var tile = 1;
	//var fileTransfer = new FileTransfer();
	var x = 0;
	var y = 0;
	$("#debug").append("xtile = " + xtile + "; x2tile = " + x2tile + "<br />");
	$("#debug").append("ytile = " + ytile + "; y2tile = " + y2tile + "<br />");
	for(x = x2tile; x <= 2*xtile-x2tile; x++) {
		for(y = 2*ytile-y2tile; y <= y2tile; y++) {
			var i = x;
			var j = y;
			$("#debug").append("i = " + i + "; j = " + j + "<br />");
			setTimeout(downloadTile(i, j, fileSystem), tile*500);
			tile++;
		}
	}*/
	minTileX = x2tile;
	minTileY = 2*ytile-y2tile;
	maxTileX = 2*xtile-x2tile;
	maxTileY = y2tile;
	downloadTile(minTileX, minTileY, minTileX, minTileY, maxTileX, maxTileY, fileSystem);
}

function downloadTile(tileX, tileY, minTileX, minTileY, maxTileX, maxTileY, fileSystem) {
	var fileTransfer = new FileTransfer();
	fileTransfer.download(
		encodeURI("http://a.tile.openstreetmap.org/15/" + tileX + "/" + tileY + ".png"),
		//fileSystem.root.fullPath+"sdcard/openstreetmap/15/" + tileX + "/" + tileY + ".png",
		"/sdcard/openstreetmap/15/" + tileX + "/" + tileY + ".png",
		function(entry) {
			$("#debug").append("Downloaded tile " + tileX + ":" + tileY + " from server a<br />");
			if(tileX < maxTileX) {
				tileX += 1;
				downloadTile(tileX, tileY, minTileX, minTileY, maxTileX, maxTileY, fileSystem);
			}
			else {
				if(tileY < maxTileY) {
					tileY +=1;
					tileX = minTileX;
					downloadTile(tileX, tileY, minTileX, minTileY, maxTileX, maxTileY, fileSystem);
				}
				else {
					$("#debug").append("Map download finished ...<br />");
				}
			}
		},
		function(error) {
			setTimeout(fileTransfer.download(
				encodeURI("http://b.tile.openstreetmap.org/15/" + tileX + "/" + tileY + ".png"),
				//fileSystem.root.fullPath+"sdcard/openstreetmap/15/" + tileX + "/" + tileY + ".png",
				"/sdcard/openstreetmap/15/" + tileX + "/" + tileY + ".png",
				function(entry) {
					$("#debug").append("Downloaded tile " + tileX + ":" + tileY + " from server b<br />");
					if(tileX < maxTileX) {
						tileX += 1;
						downloadTile(tileX, tileY, minTileX, minTileY, maxTileX, maxTileY, fileSystem);
					}
					else {
						if(tileY < maxTileY) {
							tileY +=1;
							tileX = minTileX;
							downloadTile(tileX, tileY, minTileX, minTileY, maxTileX, maxTileY, fileSystem);
						}
						else {
							$("#debug").append("Map download finished ...<br />");
						}
					}
				},
				function(error) {
					setTimeout(fileTransfer.download(
						encodeURI("http://c.tile.openstreetmap.org/15/" + tileX + "/" + tileY + ".png"),
						//fileSystem.root.fullPath+"sdcard/openstreetmap/15/" + tileX + "/" + tileY + ".png",
						"/sdcard/openstreetmap/15/" + tileX + "/" + tileY + ".png",
						function(entry) {
							$("#debug").append("Downloaded tile " + tileX + ":" + tileY + " from server c<br />");
							if(tileX < maxTileX) {
								tileX += 1;
								downloadTile(tileX, tileY, minTileX, minTileY, maxTileX, maxTileY, fileSystem);
							}
							else {
								if(tileY < maxTileY) {
									tileY +=1;
									tileX = minTileX;
									downloadTile(tileX, tileY, minTileX, minTileY, maxTileX, maxTileY, fileSystem);
								}
								else {
									$("#debug").append("Map download finished ...<br />");
								}
							}
						},
						function(error) {
							$("#debug").append("Can't get tile " + tileX + ":" + tileY + "<br />");
							$("#debug").append("Error :<br />");
							if(error.code==FileTransferError.FILE_NOT_FOUND_ERR) {
								$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Code = FILE NOT FOUND<br />");
							}
							else if(error.code==FileTransferError.INVALID_URL_ERR) {
								$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Code = INVALID URL<br />");
							}
							else if(error.code==FileTransferError.CONNECTION_ERR) {
								$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Code = CONNECTION<br />");
							}
							else if(error.code==FileTransferError.ABORT_ERR) {
								$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Code = ABORT<br />");
							}
							$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Source = " + error.source + "<br />");
							$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Target = " + error.target + "<br />");
							$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;HTTP_status = " + error.http_status + "<br />");
							if(tileX < maxTileX) {
								tileX += 1;
								downloadTile(tileX, tileY, minTileX, minTileY, maxTileX, maxTileY, fileSystem);
							}
							else {
								if(tileY < maxTileY) {
									tileY +=1;
									tileX = minTileX;
									downloadTile(tileX, tileY, minTileX, minTileY, maxTileX, maxTileY, fileSystem);
								}
								else {
									$("#debug").append("Map download finished ...<br />");
								}
							}
						},
						true
					), 500);
				},
				true
			), 500);
		},
		true
	);
}

/*function downloadTile(tileX, tileY, fileSystem) {
	var fileTransfer = new FileTransfer();
	fileTransfer.download(
		"http://a.tile.openstreetmap.org/15/" + tileX + "/" + tileY + ".png",
		fileSystem.root.fullPath+"sdcard/openstreetmap/15/" + tileX + "/" + tileY + ".png",
		function(entry) {
			$("#debug").append("Downloaded tile " + tileX + ":" + tileY + " from server a<br />");
		},
		function(error) {
			setTimeout(fileTransfer.download(
				"http://b.tile.openstreetmap.org/15/" + tileX + "/" + tileY + ".png",
				fileSystem.root.fullPath+"sdcard/openstreetmap/15/" + tileX + "/" + tileY + ".png",
				function(entry) {
					$("#debug").append("Downloaded tile " + tileX + ":" + tileY + " from server b<br />");
				},
				function(error) {
					setTimeout(fileTransfer.download(
						"http://c.tile.openstreetmap.org/15/" + tileX + "/" + tileY + ".png",
						fileSystem.root.fullPath+"sdcard/openstreetmap/15/" + tileX + "/" + tileY + ".png",
						function(entry) {
							$("#debug").append("Downloaded tile " + tileX + ":" + tileY + " from server c<br />");
						},
						function(error) {
							$("#debug").append("Can't get tile " + tileX + ":" + tileY + "<br />");
							$("#debug").append("Error :");
							if(error.code==FileTransferError.FILE_NOT_FOUND_ERR) {
								$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Code = FILE NOT FOUND<br />");
							}
							else if(error.code==FileTransferError.INVALID_URL_ERR) {
								$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Code = INVALID URL<br />");
							}
							else if(error.code==FileTransferError.CONNECTION_ERR) {
								$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Code = CONNECTION<br />");
							}
							else if(error.code==FileTransferError.ABORT_ERR) {
								$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Code = ABORT<br />");
							}
							$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Source = " + error.source + "<br />");
							$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;Target = " + error.target + "<br />");
							$("#debug").append("&nbsp;&nbsp;&nbsp;&nbsp;HTTP_status = " + error.http_status + "<br />");
						}
					), 500);
				}
			), 500);
		}
	);
}*/

function long2tile(lon,zoom) {
	return (Math.floor((lon+180)/360*Math.pow(2,zoom)));
}

function lat2tile(lat,zoom) {
	return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
}