let myLeads =[]

let button =document.querySelector("#input-btn")
let inputEl= document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const deleteBtn =document.querySelector("#delete-btn")
const saveBtn=document.querySelector("#tab-btn")

// rendering the item from localstorage and appending to the page
const leadsFromLocalStorage= JSON.parse( localStorage.getItem("myLeads") )
// if (leadsFromLocalStorage){
//     myLeads=leadsFromLocalStorage
//     renderleads()
// }



saveBtn.addEventListener("click", function (){
    // Grab URL of the current tab

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderleads()
        // console.log(tab[0].url)
    });

   
})

button.addEventListener("click", function (){
    myLeads.push(inputEl.value)
    inputEl.value=""
    // setting data in the local storage
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderleads()

    // console.log(localStorage.getItem("myLeads" ))
    
    // the input fill is focussed
    inputEl.focus()
}) 


renderleads=()=>{
    let listItems = ""
    for(let i=0; i<myLeads.length; i++){
        listItems+=
        `<li>
            <a target='_blank' href='${myLeads[i]}' >
                ${myLeads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML=listItems
}

if (leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    renderleads()
}


deleteBtn.addEventListener("click", function(){
    // clearing the local storage using the delete button
    localStorage.clear()
    // setting the myLeads variable to an empty array
    myLeads=[]
    // calling the renderleads function after clearing it content
    renderleads()

})

// -----------------------------------------------------------------------


