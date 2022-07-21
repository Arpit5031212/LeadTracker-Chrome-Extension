let myLeads = []
const inputBtn = document.getElementById("input-btn")
const deleteALLBtn = document.getElementById("delete-all-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}

tabBtn.addEventListener("click", function() { 
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    }) 
})

deleteALLBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})

function renderLeads(leads) {
    let listItems = ""
    for(let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
        console.log(listItems)
        //listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
        // const li = document.createElement("li")
        // li.textContent = myLeads[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}


