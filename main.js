var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));

}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}
// A button will call this function
	//
	function getContacts() {
		var filterChoice = document.getElementById('filter');
		//var fields = ["id", "name", "phoneNumbers", "emails", "addresses"];
		var fields = [];
		if((document.getElementById('name')).checked) {
			fields.push("name");
		}
		if((document.getElementById('phoneNumbers')).checked) {
			fields.push("phoneNumbers");
		}
		if((document.getElementById('emails')).checked) {
			fields.push("emails");
		}
		if((document.getElementById('addresses')).checked) {
			fields.push("addresses");
		}
		if(fields.length==0) {
			fields.push("*");
		}
		var options = new ContactFindOptions();
		options.filter = filterChoice.value;
		options.multiple = true;
		navigator.contacts.find(fields, onContactsFindSuccess, onContactsFindError, options);
	}
   
	// Called if contacts found
	//
	function onContactsFindSuccess(contacts) {
		var elements = document.getElementById('contacts');
		elements.innerHTML = '<li>Nombre contacts : ' + contacts.length + '</li>';
		for (var i=0; i<contacts.length; i++) {
			elements.innerHTML = elements.innerHTML + '<li>';
			if((document.getElementById('id')).checked) {
				elements.innerHTML = elements.innerHTML + ' ID : ' + contacts[i].id + '<br>';
			}
			if((document.getElementById('name')).checked) {
				/* if((contacts[i].name.familyName!='undefined')&&(contacts[i].name.givenName!='undefined')) { */ 
					elements.innerHTML = elements.innerHTML + 'Name : ' + contacts[i].name.givenName + '<br>';
				/* } */
			}
			if((document.getElementById('phoneNumbers')).checked) {
				if((contacts[i].phoneNumbers!=null)&&(contacts[i].phoneNumbers.length>0)) {
					elements.innerHTML = elements.innerHTML + '<ol>Phone number : ';
					for(var j=0; j<contacts[i].phoneNumbers.length; j++) {
						if((contacts[i].phoneNumbers[j]!=null)&&(contacts[i].phoneNumbers[j]!='undefined')) {
							elements.innerHTML = elements.innerHTML + '<li>' + contacts[i].phoneNumbers[j].value + '</li>';
						}
					}
					elements.innerHTML = elements.innerHTML + '</ol><br>';
				}
			}
			if((document.getElementById('emails')).checked) {
				if((contacts[i].emails!=null)&&(contacts[i].emails.length>0)) {
					elements.innerHTML = elements.innerHTML + '<ol>Email : ';
					for(var j=0; j<contacts[i].emails.length; j++) {
						if(contacts[i].emails[j]!=null) {
							elements.innerHTML = elements.innerHTML + '<li>' + contacts[i].emails[j].value + '</li>';
						}
					}
					elements.innerHTML = elements.innerHTML + '</ol><br>';
				}
			}
			if((document.getElementById('addresses')).checked) {
				if((contacts[i].addresses!=null)&&(contacts[i].addresses.length>0)) {
					elements.innerHTML = elements.innerHTML + '<ol>Address : ';
					for(var j=0; j<contacts[i].addresses.length; j++) {
						elements.innerHTML = elements.innerHTML + '<li>' + contacts[i].addresses[j].streetAddress + ' ' + contacts[i].addresses[j].postalCode + ' ' + contacts[i].addresses[j].locality + '</li>';
						elements.innerHTML = elements.innerHTML + '</ol><br>';
					}
				}
			}
			elements.innerHTML = elements.innerHTML + '</li>';
		}
	}
   
	// Called if no contacts found
	//
	function onContactsFindError(contactError) {
		navigation.notification.alert('Error to find contacts');
	}
	

function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    alert(confirm('Connection type:\n ' + states[networkState]));
}

var watchID = null;

function updateHeading(h) {
    document.getElementById('h').innerHTML = h.magneticHeading;
}

function toggleCompass() {
    if (watchID !== null) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
        updateHeading({ magneticHeading : "Off"});
    } else {        
        var options = { frequency: 1000 };
        watchID = navigator.compass.watchHeading(updateHeading, function(e) {
            alert('Compass Error: ' + e.code);
        }, options);
    }
}

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}

