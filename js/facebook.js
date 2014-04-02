function facebookLogin() {
	FB.login(null, {scope: 'email'});
}