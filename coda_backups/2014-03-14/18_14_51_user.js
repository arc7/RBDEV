
	function postContacts() {
	    navigator.contacts.find(["*"], function(contacts) {
	    
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
	//alert(getStorageVal("uid"));
	//alert(getStorageVal("token"));
	
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



 













