function notification(){
	//var now = new Date().getTime(),

	window.plugin.notification.local.add({
	id: 1,
	title: 'Restaubook',
	message: 'Test notification',
	repeat: 'weekly',
	autoCancel: true;
	});
}