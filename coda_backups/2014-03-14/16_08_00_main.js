


function jsonError(response) {
	if (response) console.log(JSON.stringify(response));
    console.error("Erreur");
    console.log('Not working!');                  
}

function postJson(action, obj, callback, needUserData) {
	
	obj.action = new action;
	console.log(obj);
	
	if (needUserData !=false) getCurrentUser();
	
    jsonTosend = "data="+JSON.stringify(obj);
    console.log(jsonTosend);
    
	$.ajax({
	    type       : "POST",
	    url        : "http://rb-cron.ceri.es/app/call/post.php",
	    data       : jsonTosend,
	    dataType   : 'json',
	    success    : function(response) {
	    	if (response.success == false) {
		    	jsonError(response);
		    	return false;
	    	}
	        console.log(JSON.stringify(response));
	        console.log('Works!');

			if (callback) {	        
			
				eval(callback+"(response)");
				// find object
				//var fn = window[fonction];
				 
				// is object a function?
				//if (typeof fn === "function") fn.apply(null, response);
	        }
	        
	        return response;
	    },
	    error      : function() {
		    jsonError(false);
	    }
	}); 
	
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




