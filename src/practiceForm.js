console.log(`Hey, practiceForm is logged!`)

const form = document.querySelector("#practiceCard");
const date = document.getElementById('date')
const startTime = document.getElementById('start_time')
const endTime = document.getElementById('end_time')
const instrument = document.getElementById('instrument')
// Use 'escala' instead of 'scale' 
const escala = document.getElementById('scale')
const study = document.getElementById('study')
const piece = document.getElementById('piece')
// Use 'oExcerpt' instead of 'excerpt'
const oExcerpt = document.getElementById('excerpt')
const comment = document.getElementById('msg')
const saveButton = document.getElementById('save');


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
        document.getElementById('saved-start').innerHTML = lastPractice.startTime;
        document.getElementById('saved-end').innerHTML = lastPractice.endTime;
        document.getElementById('saved-instrument').innerHTML = lastPractice.instrument;
        document.getElementById('saved-scale').innerHTML = lastPractice.escala;
        document.getElementById('saved-study').innerHTML = lastPractice.study;
        document.getElementById('saved-piece').innerHTML = lastPractice.piece;
        document.getElementById('saved-excerpt').innerHTML = lastPractice.oExcerpt;
        document.getElementById('saved-comment').innerHTML = lastPractice.comment;
    }
}

saveButton.addEventListener('click', function(event){
    event.preventDefault();
    savePracticeLog();
    renderPracticeLog();
})

// The init() function fires when the page is loaded
function init(){
    renderPracticeLog()
}
init();

form.addEventListener("submit", (event) => {
    // event.preventDefault();
    console.log(`Submit!`);
    // sendData();
});