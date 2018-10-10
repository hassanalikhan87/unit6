console.log("This Good");
var searchBtn;
var search;
var newitem;
var data =["Dog",
            "Cat",
            "Rabbit",
            "Horse",
            "Fish",
            "Chicken"];

$(document).ready(function() {
    showbuttons();
    addNewButton();
    removePrevious();
    fireGif();
    clearer();


    function showbuttons (){    
        $("#choices").empty();
        for(i=0; i<data.length; i++){
        searchBtn = $("<button>");
        searchBtn.addClass("btn btn-primary");
        searchBtn.addClass("search");
        searchBtn.attr("data-name", data[i]);
        searchBtn.attr("Style", "margin:3px;");
        searchBtn.text(data[i]);
        $("#choices").append(searchBtn);
        
    }};

    function addNewButton() {
        $("#add").on("click", function() {
            newitem = $("#text").val().trim();
            console.log(newitem);
            if (newitem == "") {
                return false;
            }
            else{
                $("#text").val("");
                data.push(newitem);
                console.log(data);
                showbuttons();
                fireGif();
            }

            

        });
    };

    function removePrevious() {
        $("#remove").on("click", function() {
            data.pop(newitem);
            console.log(data);
            showbuttons();
            return false;
        })
    };

    function fireGif() {
        $(".search").on("click", function(){
            search = $(this).attr("data-name");
            console.log(search);
        
        var apiKey="OGyEIc40b1tJJQMFx9iFiC3FjhbJxA1m";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key="+apiKey+"&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .then(function(response) {
            $("#gif").empty();
            var results = response.data;
            console.log(response.data);
            

            if (results == "") {
                alert("There is not a giffy for this!");

            }
            for (var i = 0; i < 9; i++) {
                var gifDiv = $("<div class='col-sm-4 text-center' style='float:left;'>");
                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifImage.attr("Style", "float : auto;");
                gifDiv.append(gifImage);
                $("#gif").prepend(gifDiv);
                

       
    }})})};
    
    function clearer() {
        $("#clear").on("click", function() {
            $("#gif").empty();
        })
    };



    $(document).on("click", ".search", fireGif);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });


    function autoclear(){
        $("#gif").empty();
    }

    autoclear();

});
