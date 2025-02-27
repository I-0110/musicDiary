// My Practice Card Queries 
const prCard = document.querySelector('#practiceCard')
const savePrBtn = document.querySelector('#save');
const closePrBtn = document.querySelector('#close');

// Function to call local storage Practice Logs
function prItem() {
    const log1 = JSON.parse(localStorage.getItem("practice"))
    return log1;
}

//Function to LocalStorage the Practice Log
function prStore() {
    const prLog1 = prItem()
    const prInstrument = document.querySelector('#instrument')
    const prDate = document.querySelector('#date')
    const prTime = document.querySelector('#time')
    const prScale = document.querySelector('#scale')
    const prStudy = document.querySelector('#study')
    const prPiece = document.querySelector('#piece')
    const prExcerpt = document.querySelector('#excerpt')
    const prComment = document.querySelector('#comment')

    const prAdd = []
    const prCard = {
        instrument: prInstrument.value,
        date: prDate.value,
        time: prTime.value,
        scale: prScale.value,
        study: prStudy.value,
        piece: prPiece.value,
        excerpt: prExcerpt.value,
        comment: prComment.value,
    }
    if (prLog1 === null) {
        prAdd.push(prCard)
        localStorage.prItem('practice', JSON.stringify(prAdd))
    } else {
        for (let i = 0; i < prLog1.length; i++){
            prAdd.push(prLog1[i])
        }

        prAdd.push(prCard)
        localStorage.setItem('practice', JSON.stringify(prAdd))
    }

    closePrBtn.click()
    reload()
}

//Function to reload the webpage
function reload() {
    location.reload()
}

// Function to build the Practice Cards and append them to the DOM
function createPr() {
    let logs = prItem()
    if (logs === null) {
        console.log(`Please add your practice.`)
        return;
    } else {
        for (i = 0; i < logs.length; i++) {
            // getting ids
            const title = logs[i].title
            const instrument = logs[i].instrument
            const date = logs[i].date
            const time = logs[i].time
            const scale = logs[i].scale
            const study = logs[i].study
            const piece = logs[i].piece
            const excerpt = logs[i].excerpt
            const prComment = logs[i].prComment 

            // closing form after adding card
            cb.classList.add('practiceCard')
                // cb.classList.add('border-light')
                // cb.classList.add('m-2')
            cb.classList.add('text-center')
            cb.setAttribute('style', 'width: 20rem; max-height: fit-content;')

            // create the Practice Card
            const prTitle = document.createElement('h4')
                prTitle.classList.add('card-title')
                prTitle.textContent = title

            const prBody = document.createElement('div')
                prBtn.classList.add('card-body')

            const prSubtitle = document.createElement('h5')
                prSubtitle.classList.add('card-subtitle')
                prSubtitle.textContent = instrument

                prSubtitle.classList.add('card-subtitle')
                prSubtitle.textContent = date

                prSubtitle.classList.add('card-subtitle')
                prSubtitle.textContent = time

            const ul = document.createElement('ul')
                ul.classList.add('list-group')
                ul.classList.add('list-group-flush')

            const liScale = document.createElement('li')
                liScale.classList.add('list-group-item')
                liScale.textContent = `Scale(s): ${scale}`

            const liStudy = document.createElement('li')
                liStudy.classList.add('list-group-item')
                liStudy.textContent = `Study(-ies): ${study}`

            const liPiece = document.createElement('li')
                liPiece.classList.add('list-group-item')
                liPiece.textContent = `Piece(s): ${piece}`

            const liExcerpt = document.createElement('li')
                liExcerpt.classList.add('list-group-item')
                liExcerpt.textContent = `Excerpt(s): ${excerpt}`

            const divComment = document.createElement('div')
                divComment.classList.add('card-footer')

            const addPrBtn = document.createElement('button')
                addPrBtn.setAttribute('type', 'button')
                addPrBtn.setAttribute('card p-3 mb-2', '#practiceCard')
                addPrBtn.classList.add('btn')
                addPrBtn.classList.add('btn-primary')
                addPrBtn.textContent = 'Add Practice'

            // appendChildren 
            prTitle.appendChild(h4)
            prSubtitle.appendChild(h5)
            ul.appendChild(liScale)
            ul.appendChild(liStudy)
            ul.appendChild(liPiece)
            ul.appendChild(liExcerpt)
            .appendChild()
            prBody.appendChild(prBody)            
            prBody.appendChild(prTitle)
            prBody.appendChild(prComment)    
        }
    }
}

createPr()

savePrB.addEventListener('click', prStore)
closePrBtn.addEventListener('click')

