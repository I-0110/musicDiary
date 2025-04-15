console.log(`Hey, practiceForm is logged!`)

const form = document.querySelector("#practiceCard");

function submit(event){
    event.preventDefault();
    console.log(event)
    console.log(event.target[0])
    // const practice = document.getElementById('practice')
    // const date = document.getElementById('date')
    // const startTime = document.getElementById('start_time')
    // const endTime = document.getElementById('end_time')
    // const instrument = document.getElementById('instrument')
    // // Use 'escala' instead of 'scale' 
    // const escala = document.getElementById('scale')
    // const study = document.getElementById('study')
    // const piece = document.getElementById('piece')
    // // Use 'oExcerpt' instead of 'excerpt'
    // const oExcerpt = document.getElementById('excerpt')
    // const comment = document.getElementById('msg')
    // const saveButton = document.getElementById('save');

    // if (!date.value || !startTime.value || !endTime.value || !escala.value){
    //     errorMessage.textContent = "Please log at least 10 minutes of practice scales.";
    //     return;
    // };

    const practicePost = {
        instrument: event.target[0].value,
        date: event.target[1].value,
        start: event.target[2].value,
        end: event.target[3].value,
        scale: event.target[4].value,
        study: event.target[5].value,
        piece: event.target[6].value,
        excerpt: event.target[7].value,
        comment: event.target[8].value.trim(),
    };

    let posts = JSON.parse(localStorage.getItem('practiceLog')) || [];
    posts.push(practiceLog);
    localStorage.setItem('practiceLog', JSON.stringify(posts));

    redirectPage();
};


function redirectPage() {
    window.location.href = "index.html"
}


function savePracticeLog() {
    // Save practice logs
    const practiceLog = {
        instrument: instrument.value,
        date: date.value,
        start: startTime.value,
        end: endTime.value,
        scale: escala.value,
        study: study.value,
        piece: piece.value,
        excerpt: oExcerpt.value,
        comment: comment.value.trim(),
    };
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem('practiceLog', JSON.stringify(practiceLog));
}

function renderPracticeLog() {
    const lastPractice = JSON.parse(localStorage.getItem('practiceLog'));

    if (lastPractice !== null) {
        document.getElementById('saved-date').innerHTML = lastPractice.date;
        document.getElementById('saved-start').innerHTML = lastPractice.start;
        document.getElementById('saved-end').innerHTML = lastPractice.end;
        document.getElementById('saved-instrument').innerHTML = lastPractice.instrument;
        document.getElementById('saved-scale').innerHTML = lastPractice.escala;
        document.getElementById('saved-study').innerHTML = lastPractice.study;
        document.getElementById('saved-piece').innerHTML = lastPractice.piece;
        document.getElementById('saved-excerpt').innerHTML = lastPractice.excerpt;
        document.getElementById('saved-comment').innerHTML = lastPractice.comment;
    }
}
// EVENTS
form.addEventListener("submit", submit);
// The init() function fires when the page is loaded
function init(){
    renderPracticeLog()
}
init();

