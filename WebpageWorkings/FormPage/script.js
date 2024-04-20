const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");

let symptoms = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
                 "Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
                 "Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
                 "Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
                 "Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
                 "Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"];

function addSymptom(selectedSymptom) {
    options.innerHTML = "";
    symptoms.forEach(symptom => {
        let isSelected = symptom == selectedSymptom ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${symptom}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addSymptom();

function updateName(selectedLi) {
    searchInp.value = "";
    addSymptom(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = symptoms.filter(data => {
        return data.toLowerCase().includes(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));