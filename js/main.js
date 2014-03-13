
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
	    navigator.contacts.find(["*"], function(getContacts) {
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
	        jsonContacts = "data=" + JSON.stringify(contacts);
	        alert(jsonContacts);
	        
			$.ajax({
			    type       : "POST",
			    url        : "http://rb-cron.ceri.es/app/post.php",
			    data       : jsonContacts,
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
	        jsonContacts = "data=" + {username : 'subeeeein'+Math.random(), password : 'passwordx'};
	        
			$.ajax({
			    type       : "POST",
			    url        : "http://rb-cron.ceri.es/app/post.php",
			    data       : jsonContacts,
			    success    : function(response) {
			        console.error(JSON.stringify(response));
			        //alert('Works!');
			    },
			    error      : function() {
			        console.error("error");
			        //alert('Not working!');                  
			    }
			}); 

	        
	     
	}








