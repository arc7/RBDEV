
function testWhitelist() {
	var ref = window.open('http://rb.cerivan.com/app/call/post.php?g=yes&data={%22data%22:{%22uuid%22:%223a6fdb5b840fe3ac%22},%22params%22:{%22action%22:%22register%22}}', '_blank', 'location=yes');
}

function getPhoneNumber() {
	var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
	telephoneNumber.get(
		function(result) {
			alert("Phone number : " + result);
			return result;
		},
		function() {
			alert("Can't get phone number");
		}
	);
}

function onError(contactError) {
	alert('onError!');
}

	function postContacts() {
	    navigator.contacts.find(["*"], function(contacts) {
	    
	        alert("contacts.length = " + contacts.length);
		
		contacts_filtre=[];
		
		/* Filtrage des contacts
		*   Les propriétés conservées sont le nom, les numéro de téléphones et les emails en réduisant la taille du nom des propriétés
		*/
		for(i=0; i<contacts.length; i++) {
			//delete contacts[i].id;
			contact = new Object;
			if((contacts[i].name.givenName!=null)&&(contacts[i].name.givenName!='undefined')) {
				contact["N"]=contacts[i].name.givenName;
			}
			for(j=0; j<contacts[i].phoneNumbers.length; j++) {
				contact["P"+(j+1).toString()]=contacts[i].phoneNumbers[i].value.replace(/\s+/g,"");
			}
			for(j=0; j<contacts[i].emails.length; j++) {
				contact["E"+(j+1).toString()]=contacts[i].emails[i].value;
			}
			contacts_filtre.push(contact);
		}
		    
		    
	    jsonContacts = "data="+JSON.stringify(contacts_filtre);
	    alert(jsonContacts);
	        
		storeJson("postContacts", jsonContacts);
	        
	    }, onError, {"multiple": true});   
	     
	} 
		
	


//#######################################################################################
//#######################################################################################
//#######################################################################################
//#######################################################################################
//#######################################################################################

function removeData() {
	removeStorageVal("uid");
	removeStorageVal("token");
	alert("Infos supprimées");
}




function getCurrentUser() {

	//removeStorageVal("uid");
	//alert(getStorageVal("uid"));
	//alert(getStorageVal("token"));
	
	if (getStorageVal("uid") && getStorageVal("token")) {
		alertToken();
		return returnUserInfo(getStorageVal("uid"),getStorageVal("token"));
	}

	obj = new Object;
	

	if (typeof device == "undefined") obj.uuid = "testCerivan";
	else obj.uuid = device.uuid; 
	
	//if (typeof cordova != "undefined") obj.phone = getPhoneNumber();
	
	storeJson("register", obj, "storeUserInfo", false);
	//userInfo = storeJson("register", obj, "storeUserInfo", false);
	
	
	
}

function alertToken() {
	alert("User : "+getStorageVal("uid")+" -> "+getStorageVal("token"));
}

function storeUserInfo(userInfo) {
	console.log(userInfo);
	
	setStorageVal("uid", userInfo.data.uid);
	setStorageVal("token", userInfo.data.token);
	alertToken();
	
	return returnUserInfo(getStorageVal("uid"),getStorageVal("token"));

}


function returnUserInfo(uid, token) {
	v = new Object;
	v.uid = uid;
	v.token = token;
	return v;
}



 













