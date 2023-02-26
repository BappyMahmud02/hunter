const loadPhones = async (searchText, dataLimit) => {
const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
const res = await fetch(URL) ;
const data = await res.json() ;
displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById("phones-container") ;
    phonesContainer.textContent = '' ;
    // display 20 phone only 
    const showall = document.getElementById("show-all") ;
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10) ;
        showall.classList.remove('d-none') ;
    }

    else{
        showall.classList.add('d-none')
    }

    // display no phone found
    const noPhone = document.getElementById("no-found-message") ;
    if(phones.length == 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none') ;
    }
    phones.forEach( phones =>{
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col') ;
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phones.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phones.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phones.slug}')" href ="#" class="btn btn-primary">show details</button>

            </div>
        </div>
        ` ;
        phonesContainer.appendChild(phoneDiv)
    })
    // stop loader
    toggleSpinner(false) ;
}
const processSearch = (dataLimit) => {
    toggleSpinner(true) ;
    const searchField = document.getElementById("search-field")
    const searchText = searchField.value ;
    loadPhones(searchText, dataLimit);
}

document.getElementById("btn-search").addEventListener('click', function(){
    // start loader
    processSearch(10)
})

// input field enter key handler 
document.getElementById('search-field').addEventListener('keypress', function(e){
    
    if(e.key === 'Enter'){
        processSearch(10) ;
    }
})


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

// not the best way to showall

document.getElementById('btn-showall').addEventListener('click', function(){
   processSearch() ;
})

const loadPhoneDetails = async id =>{
    const URL = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(URL) ;
    const data = await res.json() ;
    console.log(data.data);
}
// loadPhones()