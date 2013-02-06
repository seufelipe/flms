$(function() {
	Flms.start({

		title: "fala galera estou vendo filmes",
		subtitle: "flms / " + ( new Date() ).getFullYear(),
		moviesFile: "movies.txt",
		reverseList: false,

		favoriteLabel: "Gostei bastante",
		goodLabel: "Gostei",
		badLabel: "Não gostei",
		rewatchLabel: "Revisto",
		sortLabel: "Inverter Lista"

	});
});