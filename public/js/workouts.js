//query API
$.getJSON( "/api/workouts", function( workouts ) {

    let listHTML="";
    for (let i=0; i < workouts.length ; i++){
        listHTML+= `
        <a href="/workout/${workouts[i]._id}">
            <li class="workout">
                <div class="row">
                    <div class="col-12">${workouts[i].title}</div>
                </div>
            </li>
        </a>
        `;
    };
    //add HTML to page
    $("#workouts").html(listHTML);
  });