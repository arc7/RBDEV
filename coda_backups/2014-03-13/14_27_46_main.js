
    //
    function getContacts() {
        var options = new ContactFindOptions();
        options.filter="";
		options.multiple=true;
        filter = ["displayName","name", "phoneNumbers", "emails"];
		navigator.contacts.find(filter, onSuccess, onError, options);
    }

    // onSuccess: Afficher le nom de tous les contacts
    //
    function onSuccess(contacts) {
		var elements = document.getElementById('contacts');
		elements.innerHTML = elements.innerHTML + ' Nombre contacts : ' + contacts.length + '<br>';
        for (var i=0; i<contacts.length; i++) {
		elements.innerHTML = elements.innerHTML + ' ID : ' + contacts[i].id + '<br>';
		elements.innerHTML = elements.innerHTML + 'Name : ' + contacts[i].name.givenName +'<br>';
				for(var j=0; j<contacts[i].phoneNumbers.length; j++) {
						if((contacts[i].phoneNumbers[j]!=null)&&(contacts[i].phoneNumbers[j]!='undefined')) {
							elements.innerHTML = elements.innerHTML + 'Phone : ' + contacts[i].phoneNumbers[j].value +'<br>';
						}
					}
				for(var j=0; j<contacts[i].emails.length; j++) {
						if(contacts[i].emails[j]!=null) {
							elements.innerHTML = elements.innerHTML + 'Email : ' + contacts[i].emails[j].value + '<br>';
						}
					}
		}
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


	function postContacts() {
	    navigator.contacts.find(["*"], function(contacts) {
	        alert("contacts.length = " + contacts.length);
	        jsonContacts = JSON.stringify(contacts);
	        alert(jsonContacts);
	        
			$.ajax({
			    type       : "POST",
			    url        : "http://rb-cron.ceri.es/app/post.php",
			    crossDomain: true,
			    data       : jsonContacts,
			    dataType   : 'json',
			    success    : function(response) {
			        console.error(JSON.stringify(response));
			        alert('Works!');
			    },
			    error      : function() {
			        console.error("error");
			        alert('Not working!');                  
			    }
			}); 

	        
	    }, onError, {"multiple": true});   
	     
	} 

	function testContacts() {
	        jsonContacts = "[{\"id\":\"1\",\"rawId\":\"1\",\"displayName\":\"Mimoun\",\"name\":{\"formatted\":\"Mimoun \",\"givenName\":\"Mimoun\"},\"nickname\":\"Fellah\",\"phoneNumbers\":[{\"type\":\"mobile\",\"value\":\"06 65 02 31 22\",\"id\":\"1\",\"pref\":false}],\"emails\":[{\"type\":\"home\",\"value\":\"arr@voila.fr\",\"id\":\"5\",\"pref\":false}],\"addresses\":[{\"streetAddress\":\"Le Mans\\nSL JG\",\"id\":\"2\",\"formatted\":\"Le Mans\\nSL JG\",\"type\":\"home\",\"pref\":false}],\"ims\":null,\"organizations\":null,\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null},{\"id\":\"2\",\"rawId\":\"2\",\"displayName\":\"Biguet\",\"name\":{\"formatted\":\"Biguet \",\"givenName\":\"Biguet\"},\"nickname\":null,\"phoneNumbers\":[{\"type\":\"mobile\",\"value\":\"06 33 55 22 11\",\"id\":\"6\",\"pref\":false}],\"emails\":[{\"type\":\"home\",\"value\":\"xgf@wxc.fr\",\"id\":\"7\",\"pref\":false}],\"addresses\":null,\"ims\":null,\"organizations\":null,\"birthday\":null,\"note\":null,\"photos\":null,\"categories\":null,\"urls\":null}]";
	        
	        o = JSON.parse(jsonContacts);
	        console.log(o);
	        
			$.ajax({
			    type       : "POST",
			    url        : "http://rb-cron.ceri.es/app/post.php",
			    crossDomain: true,
			    data       : jsonContacts,
			    dataType   : 'json',
			    success    : function(response) {
			        console.error(JSON.stringify(response));
			        //alert('Works!');
			    },
			    error      : function() {
			        console.log("error");
			        //alert('Not working!');                  
			    }
			}); 

	        
	     
	}








