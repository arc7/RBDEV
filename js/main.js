 document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
    function onDeviceReady() {
        var options = new ContactFindOptions();
        options.filter="";
        filter = ["displayName","name", "phoneNumbers", "emails"];
		options.multiple: true;
        navigator.contacts.find(filter, onSuccess, onError, options);
    }

    // onSuccess: Afficher le nom de tous les contacts
    //
    function onSuccess(contacts) {
		var elements = document.getElementById('contacts');
        for (var i=0; i<contacts.length; i++) {
		elements.innerHTML = elements.innerHTML + ' ID : ' + contacts[i].id + '<br>';
		elements.innerHTML = elements.innerHTML + 'Name : ' + contacts[i].name.formatted +'<br>';
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
	var deviceInfo = function() {
   
    document.getElementById("uuid").innerHTML = device.uuid;
    
};