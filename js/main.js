document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
	getCurrentUser();
	getPhoneNumber();
	$("#debug").toggle(false);
	
	setTimeout(function(){postContacts()}, 2000);
	
	/*//Facebook
	FB.init({
		appId: '1378180769129155',
		nativeInterface: CDV.FB,
		useCachedDialogs: false
	});
	FB.getLoginStatus(handleStatusChange);
	authUser();
	updateAuthElements();
	
	//Twitter
	var root = this;
	cb = window.plugins.childBrowser;
	if(!localStorage.getItem(twitterKey)){
		$("#loginBtn").show();
		$("#logoutBtn").hide();
	}
	else {
		$("#loginBtn").hide();
		$("#logoutBtn").show();
	}
                     
	if (cb != null) {
		cb.onLocationChange = function(loc){ root.locChanged(loc); };
		cb.onClose = function(){root.onCloseBrowser()};
		cb.onOpenExternal = function(){root.onOpenExternal();};
	}*/
	
	//setInterval(function(){postJSON()},60000);
}

remainingPosts = 0;

function processQueue(count) {
	$("#debug").empty();
	//if(count) {
		remainingPosts = count;
	/*}
	else {
		queueJSON = getStorageVal("queueJSON");
		if(queueJSON) {
			queueJSON = JSON.parse(queueJSON);
		}
		else {
			queueJSON = new Array;
		}
		remainingPosts = queueJSON.length;
	}*/
		
	//if(count == ) {
	/*	do {
			postJson();
			queueJSON = getStorageVal("queueJSON");
			if(queueJSON) {
				queueJSON = JSON.parse(queueJSON);
			}
			else {
				queueJSON = new Array;
			}
		} while(queueJSON.length > 0);*/
	//}
	
	postJson();
}

function getPhoneNumber() {
	if(getStorageVal("phoneNumber")) {
		//alert("Phone number already defined");
		$("#debug").append("Phone number already defined<br />");
		obj = new Object();
		obj.phone = getStorageVal("phoneNumber");
		storeJSON("updateUser", obj);
		return true;
	}
	var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");
	telephoneNumber.get(
		function(result) {
			setStorageVal("phoneNumber", result.replace(/[\s\.()]+/g,"").replace(/\+/g,"00"));
			obj = new Object();
			obj.phone = result.replace(/[\s\.()]+/g,"").replace(/\+/g,"00");
			storeJSON("updateUser", obj);
			//alert("Phone number : " + result);
			$("#debug").append("Phone number : " + result.replace(/[\s\.()]+/g,"").replace(/\+/g,"00") + "<br />");
			//return result;
		},
		function() {
			//alert("Can't get phone number");
			$("#debug").append("Can't get phone number<br />");
			setStorageVal("phoneNumber", false);
		}
	);
}

function clearPhoneNumber() {
	removeStorageVal("phoneNumber");
}

function jsonError(response) {
	if (response) console.log(JSON.stringify(response));
    //console.error("Erreur");
    //alert("Erreur : " + JSON.stringify(response));
    $("#debug").append("Erreur : " + JSON.stringify(response) + "<br />");
    console.log('Not working!');                  
}

function clearJSON() {
	setStorageVal("queueJSON", new Array());
}

function storeJSON(action, obj, callback, needUserData) {
	object = new Object;
	object.action = action;
	object.obj = obj;
	object.callback = callback;
	object.needUserData = needUserData;
	//object.date = ;
	
	queueJSON = getStorageVal("queueJSON");
	if(queueJSON) {
		queueJSON = JSON.parse(queueJSON);
		queueJSON.push(object);
		//removeStorageVal("queueJSON");
		//setStorageVal("queueJSON", queueJSON);
		setStorageVal("queueJSON", JSON.stringify(queueJSON));
	}
	else {
		queueJSON = new Array();
		queueJSON.push(object);
		//setStorageVal("queueJSON", queueJSON);
		setStorageVal("queueJSON", JSON.stringify(queueJSON));
	}
	//alert(JSON.stringify(queueJSON));
	//$("#debug").append(JSON.stringify(queueJSON) + "<br />");
}

function displayMatchingContacts(contacts) {
	$.each(contacts.data.followed, function(index, value) {
		//$("#contact" + value).addClass("contactUser");
		//$("#contact" + value).appendTo("#contacts_already");
		$("[data_userid='userid_" + value + "']").appendTo("#menu_followers");
		$("[data_userid='userid_" + value + "']").html().replace(/data-type="\w+"/g, "data-type=\"user_unfollow\"");
	});
	$.each(contacts.data.matched, function(index, value) {
		//$("#contact" + value).addClass("contactUser");
		//$("#contact" + value).appendTo("#contacts_toInvite");
		$("[data_userid='userid_" + value + "']").appendTo("#menu_followings");
		$("[data_userid='userid_" + value + "']").html().replace(/data-type="\w+"/g, "data-type=\"user_follow\"");
		//$("#userid_" + value).append("<button class=\"follow" + value + "\" onclick=\"followContact(" + value + ")\">Follow</button><br />");
	});
}

function followContact(id) {
	storeJSON("contactFollow", id);
	$("[data_userid='userid_" + id + "']").appendTo("#menu_followers");
	//$(".follow" + id).remove();
}

function viewJSON() {
	$("#debug").empty();
	queueJSON = getStorageVal("queueJSON");
	if(queueJSON) {
		$("#debug").append("Etat de la queue JSON : " + queueJSON + "<br />");
	}
}

function toggleJSON() {
	$("#debug").toggle();
}

//function postJson(action, obj, callback, needUserData) {
function postJson() {
	if((navigator.connection.type!=Connection.NONE)&&(navigator.connection.type!=Connection.UNKNOWN)) {
		queueJSON = getStorageVal("queueJSON");
		if(queueJSON) {
			queueJSON = JSON.parse(queueJSON);
			if((queueJSON.length>0)) {
				object = queueJSON[0];
				to = object.obj;
	
				obj = new Object;
				obj.data = to;
	
				obj.params = new Object;
				obj.params.action = object.action;
				if (object.needUserData != false) {
					getCurrentUser();
					obj.params.uid = getStorageVal("uid");
					obj.params.token = getStorageVal("token");
				}
	
				console.log(obj);
	
				//jsonTosend = "data="+JSON.stringify(obj);
				jsonTosend = "data="+JSON.stringify(obj);
				//jsonTosend = JSON.stringify(obj);
				//alert(jsonTosend);
				//$("#debug").append(jsonTosend + "<br />");
				console.log("http://rb.cerivan.com/app/call/post.php?g=yes&"+jsonTosend);
    
				urlToSend = "http://rb.cerivan.com/app/call/post.php?"+Math.floor((Math.random()*1000)+1);
				console.log(urlToSend);
    
				$.ajax({
					type       : "POST",
					url        : urlToSend,
					data       : jsonTosend,
					dataType : "json",
					cache		: false,
					success    : function(response) {
						if (response.success == false) {
							$("#debug").append("Operation echoue ! : "+response.success + "<br />")
							jsonError(response);
							return false;
						}
						console.log(JSON.stringify(response));
						console.log('Works!');
						//alert("Good : "+JSON.stringify(response));
						$("#debug").append("Good : "+JSON.stringify(response) + "<br />");

						queueJSON.shift();
						//$("#debug").append(JSON.stringify(queueJSON) + "<br />");
						setStorageVal("queueJSON", JSON.stringify(queueJSON));
						
						//removeStorageVal("queueJSON");
						//setStorageVal("queueJSON", queueJSON);
						//alert(JSON.stringify(queueJSON));
						
						if (object.callback) {	        
			
							eval(object.callback+"(response)");
							// find object
							//var fn = window[fonction];
				 
							// is object a function?
							//if (typeof fn === "function") fn.apply(null, response);
						}
						
						if(remainingPosts > 0) {
							remainingPosts -= 1;
							postJson();
						}
						
						return response;
					},
					error      : function() {
						jsonError(false);
					}
				}); 
			}
		}
	}
}

function getStorageVal(key) {
	value = window.localStorage.getItem(key);
	
	if (value) return value;
	else return false;
}

function setStorageVal(key, value) {
	window.localStorage.setItem(key, value);
}

function removeStorageVal(key) {
	window.localStorage.removeItem(key);
}


// Fonction de génération d'une chaîne aléatoire formées de caractères contenues dans charSet
/* var charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomString(length) {
	var i = 0;
	var charPos = 0;
	var string = "";
	for(i=0;i<length;i++) {
		charPos = Math.floor(Math.random()*charSet.length);
		//console.log(charPos);
		string = string.concat(charSet.charAt(charPos));
		//console.log(charSet.charAt(charPos));
	}
	return string;
}
			
var salt = randomString(6);
			
// Fonction de salage prenant en paramètres la chaîne à saler et la chaîne utilisée pour le salage
function saler(a,b)
{
	return b.substr(0,3).concat(a,b.substr(3,3));
}
	
// Fonction de test du hashage
function runTest() {
	//var texte_cryptage = $("#texte").val();
	var texte_cryptage = "Bonjour";
	/*$("#test").text("");
	$("#test").append("Numéro a saler et hasher : "+texte_cryptage+"<br />");
	var texte_cryptage_s = saler(texte_cryptage, salt);
	$("#test").append("Salage : "+texte_cryptage_s+"<br />");
	var texte_cryptage_s_h_md5 = hex_md5(texte_cryptage_s);
	$("#test").append("Hashage md5 : "+texte_cryptage_s_h_md5+"<br />");
	var texte_cryptage_s_h_sha1 = hex_sha1(texte_cryptage_s);
	$("#test").append("Hashage sha1 : "+texte_cryptage_s_h_sha1+"<br />");
	var results = "";
	results = results.concat("Numéro à saler et hasher : ",texte_cryptage,"<br />");
	var texte_cryptage_s = saler(texte_cryptage, salt);
	results = results.concat("Salage : ",texte_cryptage_s,"<br />");
	var texte_cryptage_s_h_md5 = hex_md5(texte_cryptage_s);
	results = results.concat("Hashage md5 : ",texte_cryptage_s_h_md5,"<br />");
	var texte_cryptage_s_h_sha1 = hex_sha1(texte_cryptage_s);
	results = results.concat("Hashage sha1 : ",texte_cryptage_s_h_sha1);
	alert(results);
}
 */