<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Required meta tags always come first -->
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<title>AAACEC Crowdfunding - Faça a diferença!</title>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="/css/crowdfunding.min.css">
	</head>
	<body>
		{% include 'navbar.swig' %}

		{% include 'a-campanha.swig' %}

		{% include 'objetivos.swig' %}

		{% include 'recompensas.swig' %}

		{% include 'footer.swig' %}

		{% include 'modal-doacao.swig' %}

		<!-- jQuery first, then Bootstrap JS. -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src="https://cdn.firebase.com/js/client/2.4.0/firebase.js"></script>

		<script src="/js/crowdfunding.min.js"></script>
	</body>
</html>
