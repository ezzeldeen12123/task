$( document ).ready(function() {
	$("#likes").circliful({
		animation: 1,
		animationStep: 5,
		foregroundBorderWidth: 15,
		backgroundBorderWidth: 7,
		percent: 78,
		fontColor: '#000000',
		foregroundColor: '#4266b2',
		backgroundColor: '#f5f6fa',
		multiPercentage: 1,
		percentages: [10, 20, 30],
	});
	$("#shares").circliful({
		animation: 1,
		animationStep: 5,
		foregroundBorderWidth: 15,
		backgroundBorderWidth: 7,
		percent: 65,
		fontColor: '#000000',
		foregroundColor: '#4266b2',
		backgroundColor: '#f5f6fa',
		multiPercentage: 1,
		percentages: [10, 20, 30],
	});
	$("#comments").circliful({
		animation: 1,
		animationStep: 5,
		foregroundBorderWidth: 15,
		backgroundBorderWidth: 7,
		percent: 85,
		fontColor: '#000000',
		foregroundColor: '#65ab53',
		backgroundColor: '#f5f6fa',
		multiPercentage: 1,
		percentages: [10, 20, 30],
	});

});
