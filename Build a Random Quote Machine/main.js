$(document).ready(function(){
    var randomQuote;
    var randomAuthor;
    getQuote();
    function getQuote(){
        // var quotes = ["Hello, World", "Hello, Seal", "Hello, Sky!"];
        // var authors = ["-Author", "-Author2", "-Author3"];

        // var randomNum = Math.floor((Math.random()* quotes.length));
        // randomQuote = quotes[randomNum];
        // randomAuthor = authors[randomNum];
        // $(".quote").text(randomQuote);
        // $(".author").text(randomAuthor);

        var url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&jsonp=?";
        $.get(url, function(data){
             $(".quote").text(data.quoteText);
             $(".author").text(data.quoteAuthor);
        });

       
    }

    $("#newQuote").on("click", function(){
        getQuote();
    });

    $("#tweet").on("click", function(){
        window.open("https://twitter.com/intent/tweet?text=" + randomQuote + " " + randomAuthor );
    });

})