
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
/* 	function getContacts() {
        // Spécifier des critères de recherche de contacts
        var options = new ContactFindOptions();
        options.filter="";          // une chaine vide permet de retrouver tous les contacts
        options.multiple=true;      // on veut que plusieurs résultats soient retournés
        filter = ["displayName"];   // on veut obtenir uniquement l'attribut contact.displayName des résultats

        // Lancer la recherche des contacts
        navigator.contacts.find(filter, onSuccess, onError, options);
    }

    // onSuccess: Afficher les noms de tous les contacts trouvés
    //
    function onSuccess(contacts) {
        for (var i=0; i<contacts.length; i++) {
            alert(contacts[i].displayName);
        }
    };

    // onError: Echec de récupération des contacts
    //
    function onError(contactError) {
        alert('onError!');
    }
    // onError: Echec de récupération des contacts
    //
    function onError(contactError) {
        alert('onError!');
    } */
	var deviceinfo = function() {
   
    document.getElementById("uuid").innerHTML = device.uuid;
    
};