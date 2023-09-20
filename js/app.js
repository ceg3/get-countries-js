
document.addEventListener("DOMContentLoaded",()=> {

    const select = document.querySelector("select#countries");
    const populationDiv = document.querySelector(".population");
    const ageInput = document.querySelector(".age");
    const yearInput = document.querySelector(".year");

    select.addEventListener('change', (event)=> {
        getPopulationForCountry(event.target.selectedOptions[0].innerText)
    })

    fetch("https://d6wn6bmjj722w.population.io:443/1.0/countries",
    {headers: {accept: 'application/json; charset=utf=8'}})
    .then((res)=>{return res.json()})
    .then((json)=>{displayCountries(json.countries)});

    function displayCountries(list){
        list.forEach(country => {
            const option = document.createElement("option");
            option.textContent = country;
            select.appendChild(option);
        });
    }

    function getPopulationForCountry(country){

        age = ageInput.value;
        year = yearInput.value;
        
        const url = `https://d6wn6bmjj722w.population.io:443/1.0/population/${year}/${country}/${age}`;

        fetch(url,{headers: {accept: 'application/json; charset=utf=8'}})
        .then((res)=>{return res.json()})
        .then((json)=>{displayPopulation(json[age])});
    }

    function displayPopulation(population){
        populationDiv.textContent = population.total;
    }

})
