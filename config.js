$(function() {
	Flms.start({

		title: "fala galera estou vendo filmes",
		subtitle: "flms / " + ( new Date() ).getFullYear(),
		moviesFile: "movies.txt",
		searchSufix: "Movie",
		reverseList: false,

		favoriteLabel: "Favorito",
		goodLabel: "Bom",
		badLabel: "Ruim",
		rewatchLabel: "Revisto",
		sortLabel: "Inverter Lista"

	});
});