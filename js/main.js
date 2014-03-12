 document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
    function onDeviceReady() {
        var options = new ContactFindOptions();
        options.filter="";
        filter = ["displayName","name"];
        navigator.contacts.find(filter, onSuccess, onError, options);
    }

    // onSuccess: Afficher le nom de tous les contacts
    //
    function onSuccess(contacts) {
        for (var i=0; i<contacts.length; i++) {
            alert("Nom complet : " + contacts[i].name.formatted + "\n" + 
                    "Nom de famille : "  + contacts[i].name.familyName + "\n" + 
                    "Prénom : "  + contacts[i].name.givenName);
        }
    };

    // onError: Echec de récupération des contacts
    //
    function onError(contactError) {
        alert('onError!');
    }
