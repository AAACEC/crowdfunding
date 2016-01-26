(function () {
	'use strict';

	const TOOLTIP_MESSAGES = {
		'Xupita': 'Presidente da AAACEC - Gestão 2016',
		'Valeska': 'Vice-Presidente da AAACEC - Gestão 2016',
		'Espaço Computação Alumni': 'Espaço no Manual dos Bixos dedicado aos ilustríssimos doadores deste projeto. Cada doador terá uma foto, nome, apelido, ano e descrição.',
		'agasalho AAACEC 2016': 'Entregas previstar para Maio de 2016.',
		'miniatura do 100Nossão': 'Escala de aproximadamente 1:10.',
	};

	let $abbrTooltips = $('.abbr-tooltip');

	$abbrTooltips.tooltip({
		container: 'body',
		title: function () {
			return TOOLTIP_MESSAGES[$(this).text()];
		},
	});
})();
