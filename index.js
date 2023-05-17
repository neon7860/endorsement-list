import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://scrimba-project-8c2cc-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsementList")

const textareaEl = document.getElementById("textarea-el")
const buttonEl = document.getElementById("button-el")
const endorsementEl = document.getElementById("endorsement-el")

buttonEl.addEventListener("click", function(){
    let textareaValue = textareaEl.value
    
    push(endorsementInDB, textareaValue)
    clearTextarea()
})

onValue(endorsementInDB, function(snapshot){
    if (snapshot.exists()){
        
        clearEndorsementList()
        let endorsementEntries = Object.entries(snapshot.val())
        

        for (let i = 0; i < endorsementEntries.length; i++){
            let currentEndorsement = endorsementEntries[i]
            let currentEndorsementID = currentEndorsement[0]
            let currentEndorsementValue = currentEndorsement[1]
        
            appendEndorsementToList(currentEndorsement)
        }
    } else{
        endorsementEl.innerHTML = "Nothing here yet..."
    }
})

function appendEndorsementToList(endorsement){
    let endorsementID = endorsement[0]
    let endorsementValue = endorsement[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = endorsementValue
    
    newEl.addEventListener("click", function(){
        let locationOfItem = ref(database, `endorsementList/${endorsementID}`)
        
        remove(locationOfItem)
    })
    
    endorsementEl.append(newEl)
}

function clearTextarea(){
    textareaEl.value = ""
}

function clearEndorsementList(){
    endorsementEl.innerHTML = ""
}