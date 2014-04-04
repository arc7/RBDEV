function notification(){
	var now = new Date().getTime(),

	window.plugin.notification.local.add({
	id: 1,
	title: 'Reminder',
	message: 'Dont forget to buy some flowers.',
	repeat: 'weekly',
	autoCancel: true;
	});
}