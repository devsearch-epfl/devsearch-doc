$(function () {

    // Side bar
    $('.button-collapse').sideNav();

    // Spinning wheel on search button
    $('#search-btn').click(function () {
        $('#search-btn').hide();
        $('#search-spin').show()
    });

    function showFilters() {
        var toggle = $('#toggle-filters').children("a");
        var filters = $(".language-filter");
        if ($(".language-filter:first").is(":hidden")) {
            filters.show("slow");
            toggle.text("Clear");
        } else {
            filters.hide("slow");
            filters.children("input").prop("checked", false);
            toggle.text("Advanced search");
        }

        return false;
    }


    // Show the filters
    $('#toggle-filters').children("a").click(showFilters);

    // filters should be visible if a chechbox is selected on page load
    if ($(".language-filter").children("input:checked").length > 0) {
        showFilters();
    }

    // Enable the modal
    $('.modal-trigger').leanModal();


    function constructCard(repo) {
        return '<div class="col s12 m6 l4">' +
            '<div class="card grey lighten-5">' +
            '<div class="card-content grey-text text-darken-3">' +
            '<span class="card-title grey-text text-darken-3">' +
            '<i class="mdi-hardware-keyboard-arrow-right prefix"></i>' +
            repo.name +
            '<a style="margin-right: 0px;" class="right" href="https://travis-ci.org/devsearch-epfl/'+repo.name+'">'+
            '<img src="https://travis-ci.org/devsearch-epfl/'+repo.name+'.svg?branch='+repo.default_branch+'">' +
            '</a>' +
            '</span>' +

            '<div class="section"><p>' + repo.description + '</p></div>' +
            '</div>' +
            '<div class="card-action center">' +
            '<a class="blue-text" href="' + repo.html_url + '">Github</a>' +
            '<a class="blue-text" href="' + repo.name + '/scaladoc/index.html">Scaladoc</a>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    $.getJSON("https://api.github.com/orgs/devsearch-epfl/repos",
        function (data) {
            var items = [];
            $.each(data, function (key, value) {
                if(value.name != "devsearch-doc"){
                    items.push(constructCard(value));
                }
            });

            $("#main-container").removeClass("center");
            $("#main-container").html(items.join(""));
        });

}); // end of document ready

