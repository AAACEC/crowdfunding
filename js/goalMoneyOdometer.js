(function () {
	'use strict';

	let $goalDisplay  = $('.goal-display'),
		$goalProgress = $('.goal-progress'),
		controller     = new ScrollMagic.Controller(),
		goalOdometer  = new Odometer({
			el: $goalDisplay[0],
			value: 0.001,

			format: '(.ddd),ddd',
		});

	new ScrollMagic.Scene({
		triggerElement: $goalDisplay,
		triggerHook: 'onEnter',
	})
	.addTo(controller)
	.addIndicators()
	.on('start', () => {
		$({ value: 0 }).animate({ value: 50 }, {
			duration: 2000,
			step: function(now, _){
				$goalProgress.val(this.value);
			},
		});

		goalOdometer.update(50.001);

		controller.destroy();
	});
})();

