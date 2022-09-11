function updateSidebar(idx)
{
    const details=document.querySelector(".details")
    details.style.display="flex"
    if(data[idx].house)
    {
    details.innerHTML= `<img src="./${data[idx].picture}" alt="${data[idx].name}">
                        <div class="side_bar_name_house">
                            <h1>${data[idx].name}</h1>
                            <img src="./assets/houses/${data[idx].house}.png" alt="${data[idx].house}">
                        </div>
                        ${data[idx].bio}`
    }
    else
    {
        details.innerHTML= `<img src="./${data[idx].picture}" alt="${data[idx].name}">
        <div class="side_bar_name_house">
            <h1>${data[idx].name}</h1>
            <img src="./assets/houses/stark.png" alt="none">
        </div>
        ${data[idx].bio}`  
    }
}

function clickHander(element)
{
    updateSidebar(parseInt(element.id))
}

function buttonClickHandler()
{
    let nameSearch=document.querySelector("#namesearch")
    let idxOfname=data.map((item)=>item.name).indexOf(nameSearch.value)
    if(idxOfname==-1)
    {
        const details=document.querySelector(".details")
        details.innerHTML="Character not found"
    }
    else
    {
       updateSidebar(idxOfname) 
    }
}

let data=[]

async function fetchData() {
    let response = await fetch('/json/got.json');
    let data_arr = await response.json();

 data = data_arr.map((item) => {
    let tmp = item.name.split(" ");
    let tmp2=[tmp[tmp.length - 1], tmp[0]]
    item.sortname=tmp2.join('').toLowerCase()
    return item
})

data.sort((a, b) => {
    if (a.sortname === b.sortname) {
        return 0
    }
    else {
        if (a.sortname > b.sortname) {
            return 1
        }
        else {
            return -1
        }
    }
})

const gallary_container=document.querySelector(".gallary-container")

gallary_container.innerHTML=data.map((item,index)=>{
    return `<div class="persone-icon" onclick="clickHander(this)" id="${index}_persone_icon">
                <img src="./${item.portrait}" alt="${item.name}">
                ${item.name}
            </div>`
}).join('')

let side_bar_button=document.querySelector(".side_bar_button")

side_bar_button.addEventListener("click",buttonClickHandler)

let nameSearch=document.querySelector("#namesearch")

nameSearch.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      buttonClickHandler();
     
    }
  });

}

fetchData()


