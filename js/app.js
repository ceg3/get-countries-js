
document.addEventListener("DOMContentLoaded",()=> {

    const select = document.querySelector("select#countries");
    const populationDiv = document.querySelector(".population");
    const ageInput = document.querySelector(".age");
    const yearInput = document.querySelector(".year");

    select.addEventListener('change', (event)=> {
        getPopulationForCountry(event.target.selectedOptions[0].innerText)
    })

    // Get the country list from website
    fetch("https://d6wn6bmjj722w.population.io:443/1.0/countries",
    {headers: {accept: 'application/json; charset=utf=8'}})
    .then((res)=>{return res.json()})
    .then((json)=>{displayCountries(json.countries)});

    // This function displays the country list in the select element
    function displayCountries(list){
        list.forEach(country => {
            const option = document.createElement("option");
            option.textContent = country;
            select.appendChild(option);
        });
    }

    //  Get the actual population data for country at given age and year
    function getPopulationForCountry(country){

        age = ageInput.value;
        year = yearInput.value;
        
        const url = `https://d6wn6bmjj722w.population.io:443/1.0/population/${year}/${country}/${age}`;

        fetch(url,{headers: {accept: 'application/json; charset=utf=8'}})
        .then((res)=>{return res.json()})
        .then((json)=>{displayPopulation(json[age])});
    }

    // display the population number
    function displayPopulation(population){
        populationDiv.textContent = population.total;
    }

})
