$(document).ready(function() {


    //get character ID from URL
    const pathArray = window.location.pathname.split('/');
    console.log(pathArray);
    const workoutId = pathArray[pathArray.length-1];
    console.log(workoutId);
    //build query URL from ID
    const queryURL = "/api/workouts/" + workoutId;

    console.log(queryURL);
    //query API
    if (workoutId != "new"){
        console.log("EDIT CURRENT WORKOUT");
        $.getJSON( queryURL, function( workout ) {
            $("input#title").val(workout.title);
            $("#body").val(workout.body);
            console.log(workout);
        });
    } else{
        titlePage.innerText = "New Workout";
    }

    $("#submit").click( function(event) {
        event.preventDefault();

        if (workoutId != "new"){
            console.log("IS NOT NEW");
            $.ajax({
                type: "PUT",
                url: queryURL,
                data: {
                    title: $("input#title").val(),
                    body: $("#body").val()
                }
            });
        } else {
            console.log("IS NEW");
            $.ajax({
                type: "POST",
                url: "/api/workouts",
                data: {
                    title: $("input#title").val(),
                    body: $("#body").val()
                }
            }).done(function(){
                window.location.href = "/workouts";
            });
        }
    });

    $("#delete").click( function(event){
        event.preventDefault();
        $.ajax({
            type: "DELETE",
            url: queryURL,
        }).done(function(){
            window.location.href = "/workouts";
        });
    });

});
