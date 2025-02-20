const practice = document.querySelector(#practiceLog); 
const savePrBtn = document.querySelector('#save');
const closePrBtn = document.querySelector('#close');

// const sb = document.querySelector('#save')
// const cb = document.querySelector('#close')
// const del = document.querySelector('#delete-msg')
// const deleteIt = document.querySelector('#del-yes')
// const cb2 = document.querySelector('#no')

// Function to call filled Practice Logs from local storage
function getPractice() {
    const prLog = JSON.parse(localStorage.getItem("practiceLog"))
    return prLog
}

//     let logs = getPractice()
//     if (logs === null) {
//         console.log(`Please add your practice log.`)
//         return 
//     } else {
//         for (i=0; i < logs.lenght; i++) {

//         }
//     }
//     return
}
