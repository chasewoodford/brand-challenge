// Hint text for touch devices
if ("ontouchstart" in document.documentElement) {
    document.querySelector(".hint").innerHTML = "<p>Tap on the right to start the brand challenge</p>";
}

// Add variable for table
var table = document.getElementById("brandChallengeOneTable");

// Add click handler
function switchTable() {
    switch (table.id) {
        case "brandChallengeOneTable":
            window.table = document.getElementById("brandChallengeTwoTable");
            break;
        case "brandChallengeTwoTable":
            window.table = document.getElementById("brandChallengeThreeTable");
            break;
        case "brandChallengeThreeTable":
            window.table = document.getElementById("brandChallengeFourTable");
            break;
        case "brandChallengeFourTable":
            break;
        default:
            console.log("Not sure what to do with this table.");
    }
}

// Add row handler
function addRowHandlers() {

    // set variable for each answer/brand
    var brands = table.getElementsByTagName("td");

    // debug
    console.log("There are " + brands.length + " rows in this table.");

    // for each answer, add click handler event watcher
    for(i = 0; i < brands.length; i++) {
        var brand = table.rows[i];
        brand.onclick = clickHandler(brand);
    }
}

// Reset answers
function resetAnswers() {

    var currentSlide = document.getElementsByClassName("active")[0].id;

    // If on title screen, remove all 'selected' classnames
    if(currentSlide === "title") {

        var e = document.getElementsByClassName("selected");

        console.log("There are " + e.length + " answers selected.");

        if(e.length > 0) {

            [].forEach.call(e, function(el) {
                el.classList.remove("selected");
            });

            console.log("Class names removed.");
        }

    } else {
        console.log("Current slide is: " + currentSlide);
    }
}

function clickHandler(row) {
    return function() {

        // set variable for selected answer
        var id = row.getElementsByTagName("td")[0].id;

        // set variable for correct answer
        var correctAnswer = table.getElementsByClassName("correct")[0].id

        // compare
        if(id === correctAnswer) {
            // If correct, congratulate
            document.getElementById(id).className += " selected";
            console.log("Congrats! " + id + " is the correct answer!");
        } else  {
            // If incorrect, show correct answer
            document.getElementById(id).className += " selected";
            table.getElementsByClassName("correct")[0].className += " selected";
            console.log("You selected: " + id + "\nThe correct answer is: " + correctAnswer);
        }

        // debug
        console.log("Current table: " + table.id);

        // switch table focus to next table
        switchTable();

        // debug
        console.log("Next table: " + table.id);

        // re-run row handler for new table
        addRowHandlers();
    }
}

setInterval(resetAnswers, 1000);