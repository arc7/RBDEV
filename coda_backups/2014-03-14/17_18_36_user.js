
	function postContacts() {
	    navigator.contacts.find(["name", "phoneNumbers", "emails"], function(contacts) {
	        alert("contacts.length = " + contacts.length);
	        jsonContacts = "data="+JSON.stringify(contacts);
	        alert(jsonContacts);
	        
			postJson("postContacts", contacts);
	        
	    }, onError, {"multiple": true});   
	     
	} 



    //
    function getContacts() {
        var options = new ContactFindOptions();
        options.filter="";
		options.multiple=true;
        filter = ["displayName","name", "phoneNumbers", "emails"];
		navigator.contacts.find(filter, onSuccess, onError, options);
    }


	function onSuccess(contacts) {
		var elements =  new Object();
		elements.nombreContacts= contacts.length ;
        for (var i=0; i<contacts.length; i++) {
		elements.id =  contacts[i].id ;
		elements.name = contacts[i].name.givenName;
				for(var j=0; j<contacts[i].phoneNumbers.length; j++) {
						if((contacts[i].phoneNumbers[j]!=null)&&(contacts[i].phoneNumbers[j]!='undefined')) {
							elements.phoneNumbers =  contacts[i].phoneNumbers[j].value ;
						}
					}
				for(var j=0; j<contacts[i].emails.length; j++) {
						if(contacts[i].emails[j]!=null) {
							elements.emails =  contacts[i].emails[j].value;
						}
					}
		}
		elements.uuid = device.uuid;
		jsonContacts = "data=" + JSON.stringify(elements);
	        alert(jsonContacts);
	        
			$.ajax({
			    type       : "POST",
			    url        : "http://rb-cron.ceri.es/app/post.php",
			    data       : jsonContacts,
			    dataType   : 'json',
			    success    : function(response) {
			        console.log(JSON.stringify(response));
			        console.log('Works!');
			    },
			    error      : function() {
			        console.error("Erreur");
			        console.log('Not working!');                  
			    }
			}); 

	};

    // onError: Echec de récupération des contacts
    //
    function onError(contactError) {
        alert('onError!');
    }

    
	var deviceinfo = function() {   
		document.getElementById("uuid").innerHTML = device.uuid;
		};
		
	//Json Contacts
	
	function backupAllTheContacts() {
	    navigator.contacts.find(["*"], function(contacts) {
	        alert("contacts.length = " + contacts.length);
	        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
	            fileSystem.root.getFile("contacts.bak", {create: true, exclusive: false}, function(fileEntry) {
	                fileEntry.createWriter(function(writer) {
	                    writer.onwriteend = function() {
	                        alert("backup complete");
	                    };
	                    writer.write(JSON.stringify(contacts));
	                }, onError);
	            }, onError);
	        }, onError);
	    }, onError, {"multiple": true});    
	}


//#######################################################################################
//#######################################################################################
//#######################################################################################
//#######################################################################################
//#######################################################################################


function getCurrentUser() {

	//removeStorageVal("uid");
	
	if (getStorageVal("uid") && getStorageVal("token")) {
		return returnUserInfo(getStorageVal("uid"),getStorageVal("token"));
	}

	uuid = "testStéphane";

	obj = new Object;
	obj.uuid = uuid;
	
	userInfo = postJson("register", obj, "storeUserInfo", false);
	
	
	
}

function storeUserInfo(userInfo) {
	console.log(userInfo);
	
	setStorageVal("uid", userInfo.data.uid);
	setStorageVal("token", userInfo.data.token);
	//alert("YEAH !"+getStorageVal("uid")+getStorageVal("token"));
	return returnUserInfo(getStorageVal("uid"),getStorageVal("token"));

}


function returnUserInfo(uid, token) {
	v = new Object;
	v.uid = uid;
	v.token = token;
	return v;
}


myUser = getCurrentUser();
console.log(myUser);

jsonContacts = [{"id":"1","rawId":"1","displayName":"Mimoun","name":{"formatted":"Mimoun ","givenName":"Mimoun"},"nickname":"Fellah","phoneNumbers":[{"type":"mobile","value":"06 65 02 31 22","id":"1","pref":false}],"emails":[{"type":"home","value":"arr@voila.fr","id":"5","pref":false}],"addresses":[{"streetAddress":"Le Mans\\nSL JG","id":"2","formatted":"Le Mans\\nSL JG","type":"home","pref":false}],"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null},{"id":"2","rawId":"2","displayName":"Biguet","name":{"formatted":"Biguet ","givenName":"Biguet"},"nickname":null,"phoneNumbers":[{"type":"mobile","value":"06 33 55 22 11","id":"6","pref":false}],"emails":[{"type":"home","value":"xgf@wxc.fr","id":"7","pref":false}],"addresses":null,"ims":null,"organizations":null,"birthday":null,"note":null,"photos":null,"categories":null,"urls":null}];

r = postJson("postContacts", jsonContacts);
//console.log(r);















