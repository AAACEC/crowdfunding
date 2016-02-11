(function () {
	'use strict';

	const TOOLTIP_MESSAGES = {
		'Xupita': 'Presidente da AAACEC - Gestão 2016',
		'Espaço Computação Alumni': 'Caderno entregue junto ao Kit Bixo destinado aos nossos ilustríssimos doadores do projeto de Crowdfunding. Cada doador terá uma foto, nome, apelido, ano e descrição. Obs.: válido apenas para doações até 16/02.',
		'agasalho AAACEC 2016': 'Entregas previstas para maio/2016.',
        'miniatura do bandeirão': 'Escala de aproximadamente 1:10.',
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
