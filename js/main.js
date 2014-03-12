 document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap est prêt
    //
    function onDeviceReady() {
        // Rechercher tous les contacts qui ont 'Bob' dans l'un de leurs champs de nom
        var options = new ContactFindOptions();
        options.filter=""; 
        var fields = ["displayName", "name"];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    // onSuccess: Afficher le nom de tous les contacts trouvés
    //
    function onSuccess(contacts) {
        for (var i=0; i<contacts.length; i++) {
            alert("Nom  = " + contacts[i].displayName);
        }
    }

    // onError: Echec de récupération des contacts
    //
    function onError(contactError) {
        alert('onError!');
    }

   