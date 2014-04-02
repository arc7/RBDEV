function facebookLogin() {
	FB.login(null, {scope: 'email'});
}

function authUser() {
  FB.Event.subscribe('auth.statusChange', handleStatusChange);
}

// Handle status changes
function handleStatusChange(session) {
    console.log('Got the user\'s session: ' + JSON.stringify(session));
    
    if (session.authResponse) {
        //document.body.className = 'connected';
        
        //Fetch user's id, name, and picture
        FB.api('/me', {
          fields: 'name, picture'
        },
        function(response) {
          if (!response.error) {
            document.body.className = 'connected';

            user = response;
            
            console.log('Got the user\'s name and picture: ' + JSON.stringify(response));
            
            //Update display of user name and picture
            if (document.getElementById('user-name')) {
              document.getElementById('user-name').innerHTML = user.name;
            }
            if (document.getElementById('user-picture')) {
              document.getElementById('user-picture').src = user.picture.data.url;
            }
          } else {
            document.body.className = 'not_connected';
            console.log('Error getting user info: ' + JSON.stringify(response.error));
            // Check for errors due to app being unininstalled
            if (response.error.error_subcode && response.error.error_subcode == "458") {
              setTimeout(function() {
                alert("The app was removed. Please log in again.");
              }, 0);              
            }
            logout();         
          }
          
          clearAction();
        });
    }
    else  {
      document.body.className = 'not_connected';
    
      clearAction();
    }
}

function updateAuthElements() {
  FB.Event.subscribe('auth.statusChange', function(session) {
    if (session.authResponse) { 
      //The user is logged in, so let's pre-fetch some data and check the current 
      //permissions to show/hide the proper elements.
      preFetchData();
      checkUserPermissions();
    }
  });
}


var nonAppFriendIDs = [];
var appFriendIDs = [];
var friendIDs = [];
var friendsInfo = [];

function preFetchData() {
	FB.api({method: 'friends.getAppUsers'}, function(appFriendResponse) {
		appFriendIDs = appFriendResponse;

		FB.api('/me/friends', { fields: 'id, name, picture' }, function(friendResponse) {
			friends = friendResponse.data;
      
			for (var k = 0; k < friends.length; k++) {
				var friend = friends[k];
				var index = 1;
        
				friendIDs[k] = friend.id;
				friendsInfo[k] = friend;
        
				for (var i = 0; i < appFriendIDs.length; i++) {
					if (appFriendIDs[i] == friend.id) {
						index = -1;
					}
				}       
        
				if (index == 1) { 
					nonAppFriendIDs.push(friend.id);
				}
			}

			//console.log('Got your friend\'s that use the app: ', appFriendIDs);
			alert('Got your friend\'s that use the app: ', appFriendIDs);
      
			//console.log('Got all of your friends: ', friendIDs);
			alert('Got all of your friends: ', friendIDs);
      
			//console.log('Got friends that are not using the app yet: ', nonAppFriendIDs);
			alert('Got friends that are not using the app yet: ', nonAppFriendIDs);
		});
	});
}