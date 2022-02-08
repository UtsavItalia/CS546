(function ($) {
  // console.log("page loaded");
  const requestConfig = {
    type: "GET",
    url: "http://api.tvmaze.com/shows",
  };
  $.ajax(requestConfig).then(function (responseMessage) {
    $("#showList").show();
    $("#show").hide();
    var shows = $(responseMessage);
    for (let i = 0; i < shows.length; i++) {
      $("#showList").append(
        `<li><a = id=${shows[i].id} href=${shows[i]._links.self.href}>${shows[i].name}</a></li>`
      );
      $(`#${shows[i].id}`).on("click", function (event) {
        event.preventDefault();
        $("#showList").hide();
        $("#show").empty();

        $("#homeLink").show();

        $.ajax({
          type: "GET",
          url: this.href,
        }).then(function (responseMessage) {
          const show = $(responseMessage)[0];
          let name, image, language, rating, network, summary;

          if (show.name == null) {
            name = "N/A";
          } else {
            name = show.name;
          }

          if (show.language == null) {
            language = "N/A";
          } else {
            language = show.language;
          }

          if (show.rating == null || show.rating.average == null) {
            rating = "N/A";
          } else {
            rating = show.rating.average;
          }

          if (show.network == null || show.network.name == null) {
            network = "N/A";
          } else {
            network = show.network.name;
          }

          if (show.summary == null) {
            summary = "N/A";
          } else {
            summary = show.summary;
          }

          if (show.image == null || show.image.medium == null) {
            image = "public/no_image.jpeg";
          } else {
            image = show.image.medium;
          }

          $("#show").append(`<h1>${name}</h1>`);
          $("#show").append(`<img src = ${image}></img>`);
          $("#show").append(`<dl>Language<dd>${language}</dd></dl>`);

          let list;
          if (show.genres == null || show.genres.length == 0) {
            list = "<li>N/A</li>";
          } else {
            list = "";
            for (let i = 0; i < show.genres.length; i++) {
              list += `<li> ${show.genres[i]}</li>`;
            }
          }
          $("#show").append(`<dl>Genres<dd><ul>${list}</ul></dd></dl>`);
          $("#show").append(`<dl>Average Rating<dd>${rating}</dd></dl>`);
          $("#show").append(`<dl>Network<dd>${network}</dd></dl>`);
          $("#show").append(`<dl>Summary<dd>${summary}</dd></dl>`);
          $("#show").show();
        });
      });
    }
    // console.log(shows);
  });

  $("#searchForm").submit(function (event) {
    event.preventDefault();
    let search = $("#search_term").val().trim();
    if (search.length == 0) {
      alert("Please enter show name to search");
      return;
    }

    $("#showList").empty();
    $.ajax({
      type: "GET",
      url: `http://api.tvmaze.com//search/shows?q=${search}`,
    }).then(function (resp) {
      $("#showList").show();
      $("#show").hide();
      $("#homeLink").show();
      var shows = $(resp);
      for (let i = 0; i < shows.length; i++) {
        shows[i] = shows[i].show;
        $("#showList").append(
          `<li><a = id=${shows[i].id} href=${shows[i]._links.self.href}>${shows[i].name}</a></li>`
        );
        $(`#${shows[i].id}`).on("click", function (event) {
          event.preventDefault();
          $("#showList").hide();
          $("#show").empty();

          $("#homeLink").show();

          $.ajax({
            type: "GET",
            url: this.href,
          }).then(function (responseMessage) {
            const show = $(responseMessage)[0];
            let name, image, language, rating, network, summary;

            if (show.name == null) {
              name = "N/A";
            } else {
              name = show.name;
            }

            if (show.language == null) {
              language = "N/A";
            } else {
              language = show.language;
            }

            if (show.rating == null || show.rating.average == null) {
              rating = "N/A";
            } else {
              rating = show.rating.average;
            }

            if (show.network == null || show.network.name == null) {
              network = "N/A";
            } else {
              network = show.network.name;
            }

            if (show.summary == null) {
              summary = "N/A";
            } else {
              summary = show.summary;
            }

            if (show.image == null || show.image.medium == null) {
              image = "public/no_image.jpeg";
            } else {
              image = show.image.medium;
            }

            $("#show").append(`<h1>${name}</h1>`);
            $("#show").append(`<img src = ${image}></img>`);
            $("#show").append(`<dl>Language<dd>${language}</dd></dl>`);

            let list;
            if (show.genres == null || show.genres.length == 0) {
              list = "<li>N/A</li>";
            } else {
              list = "";
              for (let i = 0; i < show.genres.length; i++) {
                list += `<li> ${show.genres[i]}</li>`;
              }
            }
            $("#show").append(`<dl>Genres<dd><ul>${list}</ul></dd></dl>`);
            $("#show").append(`<dl>Average Rating<dd>${rating}</dd></dl>`);
            $("#show").append(`<dl>Network<dd>${network}</dd></dl>`);
            $("#show").append(`<dl>Summary<dd>${summary}</dd></dl>`);
            $("#show").show();
          });
        });
      }
    });
  });
})(window.jQuery);
