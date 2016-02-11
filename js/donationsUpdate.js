(function () {
	'use strict';

	let fbRef = new Firebase('https://glowing-heat-59.firebaseio.com/'),
		$goalDisplay  = $('.goal-display'),
		$goalProgress = $('.goal-progress'),
		$donations    = $('#objetivos .list-group'),
		$rewards      = $($('.js-reward').get().reverse()),
		controller    = new ScrollMagic.Controller(),
		goalOdometer  = new Odometer({
			el: $goalDisplay[0],
			value: 0.001,

			format: '(.ddd),ddd',
		});

	moment.locale('pt-br');

	fbRef.once('value', (snapshot) => {
		let donations = snapshot.val(),
			totalDonated = 0,
			arrDonations = [];


		Object.keys(donations).forEach((k) => {
			arrDonations.push({
				 name  : k,
				 value : donations[k].value,
				 time  : donations[k].time,
			});
		});

		arrDonations.sort((a, b) => {
			return b.time - a.time;
		});

		arrDonations.forEach(function (v, i) {
			totalDonated += v.value;

			if (i < 8) {
				let tpt = `<li class="list-group-item">
					<span class="label label-success label-pill pull-xs-right">
						R$ ${v.value.toFixed(2).replace('.', ',')}
					</span>
					${v.name} <small class="text-muted">${moment.unix(v.time).fromNow()}</small>
				</li>`;

				$donations.html($donations.html() + tpt);
			}

			$rewards.each(function () {
				let $this = $(this);

				if ($this.data('minValue') <= v.value) {
					let $rcvd = $this.find('.js-received');
					$rcvd.text(parseInt($rcvd.text()) + 1);

					return false;
				}
			});
		});

		new ScrollMagic.Scene({
			triggerElement: $goalDisplay,
			triggerHook: 'onEnter',
		})
		.addTo(controller)
		.addIndicators()
		.on('start', () => {
			$({ value: 0 }).animate({ value: totalDonated }, {
				duration: 2000,
				step: function() {
					$goalProgress.val(this.value);
				},
				complete: function() {
					$goalProgress.val(this.value);
				},
			});

			goalOdometer.update(totalDonated + 0.001);

			controller.destroy();
		});
	});
})();
