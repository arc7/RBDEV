
function testWhitelist() {
	var ref = window.open('http://rb.cerivan.com/app/call/post.php?g=yes&data={%22data%22:{%22uuid%22:%223a6fdb5b840fe3ac%22},%22params%22:{%22action%22:%22register%22}}', '_blank', 'location=yes');
}

function onError(contactError) {
	alert('onError!');
}

/*tab["é"] = "e";
tab["è"] = "e";
tab["ê"] = "e";
tab["à"] = "a";*/


function postContacts() {
	$("#menu_followings").append("<img src=\"img/loading.gif\" />");
	navigator.contacts.find(["*"], function(contacts) {
    
		//alert("contacts.length = " + contacts.length);
		//$("#debug").append("Contacts.length = " + contacts.length + "<br />");
		    
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
				if((value.name.familyName!=null)&&(value.name.familyName!='undefined')) {
					if(value.name.familyName != "") {
						contact["N"] = value.name.familyName;
					}
					else if((value.name.givenName!=null)&&(value.name.givenName!='undefined')) {
						contact["N"] = value.name.givenName;
					}
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
				contacts_reels.push(value);
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
		//$("#debug").append("Contacts réels : " + contacts_corrects + "<br />");
		
		storeJSON("getContactsMatch", new Object, "displayMatchingContacts");
		
		contacts_reels.sort(function(a,b) {
			if (a.name.formatted < b.name.formatted)
				return -1;
			if (a.name.formatted > b.name.formatted)
				return 1;
			return 0;
		});
		
		/*$.each(contacts_reels, function(index, value) {
			//$("#contacts").append("<span id=\"contact" + value.id + "\">" + value.name.familyName + " " + value.name.givenName + "</span><br />");
			$("#contacts").append("<span id=\"contact" + value.id + "\">" + value.name.formatted + "</span><br />");
		});*/
		/*$("#contacts_already").empty();
		$("#contacts_toInvite").empty();
		$("#contacts_all").empty();
		$("#contacts_already").append("Contacts suivis : <br/>");
		$("#contacts_toInvite").append("Contacts à inviter : <br/>");
		$("#contacts_all").append("Tous les contacts : <br/>");*/
		first = "";
		$.each(contacts_reels, function(index, value) {
			p = value.name.formatted.substr(0,1).toUpperCase();
			if(p != first) {
				$("#menu_followings").append("<br />" + p.toUpperCase() + "<br /><hr>");
				first = p;
			}
			//$("#contacts_all").append("<span id=\"contact" + value.id + "\">" + value.name.formatted + "</span><br />");
			$("#menu_followings").append("<li data_userid=\"userid_" + value.id + "\" data-type=\"user_follow\"><p>" + value.name.formatted + "<span>" + value.id + "</span></p>15.6<p></p></li>");
		});

		queueJSON = getStorageVal("queueJSON");
		if(queueJSON) {
			queueJSON = JSON.parse(queueJSON);
			processQueue(queueJSON.length);
		}
	        
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



 













