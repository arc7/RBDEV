
function testWhitelist() {
	var ref = window.open('http://rb.cerivan.com/app/call/post.php?g=yes&data={%22data%22:{%22uuid%22:%223a6fdb5b840fe3ac%22},%22params%22:{%22action%22:%22register%22}}', '_blank', 'location=yes');
}

/*function getPhoneNumber() {
	if(getStorageVal("phoneNumber")) {
		return true;
	}
	var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
	telephoneNumber.get(
		function(result) {
			setStorageVal("phoneNumber", result);
			obj = new Object();
			obj.phone = result;
			storeJSON("updateUser", obj);
			alert("Phone number : " + result);
			//return result;
		},
		function() {
			//alert("Can't get phone number");
			setStorageVal("phoneNumber", false);
		}
	);
}*/

function onError(contactError) {
	alert('onError!');
}

	function postContacts() {
		
		/*contacts_reels = [];
		obj = new Object;
		obj["ID"] = "1";
		obj["N"] = "Test1";
		contacts_reels.push(obj);
		obj = new Object;
		obj["ID"] = "2";
		obj["N"] = "Test2";
		contacts_reels.push(obj);
		$.each(contacts_reels, function(index, value) {
			$("#contacts").append("<span id=\"contact" + value.ID + "\">" + value.ID + " : " + value.N + "</span><br />");
		});*/
		
	    navigator.contacts.find(["*"], function(contacts) {
	    
	        //alert("contacts.length = " + contacts.length);
		$("#debug").append("Contacts.length = " + contacts.length + "<br />");
		    
		//contacts_filtre=[];
		contacts_corrects = 0;
		contacts_filtre = [];
		contacts_reels = [];
		maxContacts = 100;
		//for(i=0; i<contacts.length; i++) {
		$.each(contacts, function(i, value) {
			if((value.phoneNumbers!='undefined')&&(value.phoneNumbers!=null)&&(value.phoneNumbers.length>0)) {
				contact = new Object;
				contact["ID"]=value.id;
				if((value.name.givenName!=null)&&(value.name.givenName!='undefined')) {
					contact["N"]=value.name.givenName;
				}
				//for(j=0; j<value.phoneNumbers.length; j++) {
				$.each(value.phoneNumbers, function(j, val) {
					contact["P"+(j+1).toString()]=val.value.replace(/[\s\.()]+/g,"").replace(/\+/g,"00");
				});
				
				//for(j=0; j<value.emails.length; j++) {
				if(value.emails===null)  value.emails = new Array;
				$.each(value.emails, function(j, val) {
					contact["E"+(j+1).toString()]=val.value;
				});
				
				contacts_filtre.push(contact);
				contacts_reels.push(contact);
				if(contacts_filtre.length==maxContacts) {
					storeJSON("postContacts", contacts_filtre);
					contacts_corrects += contacts_filtre.length;
					//alert(JSON.stringify(contacts_filtre));
					contacts_filtre = [];
				}
			}
		});
		storeJSON("postContacts", contacts_filtre);
		contacts_corrects += contacts_filtre.length;
		//alert(JSON.stringify(contacts_filtre));
		//alert("Contacts réels : "+contacts_corrects);
		$("#debug").append("Contacts réels : " + contacts_corrects + "<br />");
		
		storeJSON("getContactsMatch", new Object, "displayMatchingContacts");
		
		contacts_reels.sort(function(a,b) {
			if (a.N < b.N)
				return -1;
			if (a.N > b.N)
				return 1;
			return 0;
		});
		
		$.each(contacts_reels, function(index, value) {
			$("#contacts").append("<span id=\"contact" + value.ID + "\">" + value.N + "</span><br />");
		});
		queueJSON = getStorageVal("queueJSON");
		if(queueJSON) {
			queueJSON = JSON.parse(queueJSON);
			processQueue(queueJSON.length);
		}
		
		/*ids = new Array();
		ids.push(2);
		displayMatchingContacts(ids);*/
		/*for(i=0; i<contacts.length; i++) {
			if(contacts[i].phoneNumbers.length==0) {
				contacts.splice(i, 1);
				i=i-1;
			}
		}*/
		
		/* Filtrage des contacts
		*   Les propriétés conservées sont le nom, les numéro de téléphones et les emails en réduisant la taille du nom des propriétés
		*/
		
		/*for(i=0; i<contacts.length-maxContacts; i=i+maxContacts) {
			contacts_filtre=[];
			for(k=0; k<maxContacts; k++) {
				contact = new Object;
				if((contacts[i*maxContacts+k].name.givenName!=null)&&(contacts[i*maxContacts+k].name.givenName!='undefined')) {
					contact["N"]=contacts[i*maxContacts+k].name.givenName;
				}
				for(j=0; j<contacts[i*maxContacts+k].phoneNumbers.length; j++) {
					contact["P"+(j+1).toString()]=contacts[i*maxContacts+k].phoneNumbers[j].value.replace(/\s+/g,"");
				}
				for(j=0; j<contacts[i*maxContacts+k].emails.length; j++) {
					contact["E"+(j+1).toString()]=contacts[i*maxContacts+k].emails[j].value;
				}
				contacts_filtre.push(contact);
			}
			storeJSON("postContacts", contacts_filtre);
		}
		contacts_filtre=[];  
		for(; i<contacts.length; i++) {
			//delete contacts[i].id;
			contact = new Object;
			if((contacts[i].name.givenName!=null)&&(contacts[i].name.givenName!='undefined')) {
				contact["N"]=contacts[i].name.givenName;
			}
			for(j=0; j<contacts[i].phoneNumbers.length; j++) {
				contact["P"+(j+1).toString()]=contacts[i].phoneNumbers[j].value.replace(/\s+/g,"");
			}
			for(j=0; j<contacts[i].emails.length; j++) {
				contact["E"+(j+1).toString()]=contacts[i].emails[j].value;
			}
			contacts_filtre.push(contact);
		}
		
		
		jsonContacts = JSON.stringify(contacts_filtre);
		alert(jsonContacts);
	        
		storeJSON("postContacts", contacts_filtre);*/
	        
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
	$("#debug").append("Infos supprimées<br />");
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
	
	storeJSON("register", obj, "storeUserInfo", false);
	//userInfo = storeJson("register", obj, "storeUserInfo", false);
	
	
	
}

function alertToken() {
	//alert("User : "+getStorageVal("uid")+" -> "+getStorageVal("token"));
	$("#debug").append("User : "+getStorageVal("uid")+" -> "+getStorageVal("token") + "<br />");
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



 













