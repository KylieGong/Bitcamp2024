const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");

let symptoms = "itching,skin_rash,nodal_skin_eruptions,continuous_sneezing,shivering,chills,joint_pain,stomach_pain,acidity,ulcers_on_tongue,muscle_wasting,vomiting,burning_micturition,spotting_urination,fatigue,weight_gain,anxiety,cold_hands_and_feets,mood_swings,weight_loss,restlessness,lethargy,patches_in_throat,irregular_sugar_level,cough,high_fever,sunken_eyes,breathlessness,sweating,dehydration,indigestion,headache,yellowish_skin,dark_urine,nausea,loss_of_appetite,pain_behind_the_eyes,back_pain,constipation,abdominal_pain,diarrhoea,mild_fever,yellow_urine,yellowing_of_eyes,acute_liver_failure,fluid_overload,swelling_of_stomach,swelled_lymph_nodes,malaise,blurred_and_distorted_vision,phlegm,throat_irritation,redness_of_eyes,sinus_pressure,runny_nose,congestion,chest_pain,weakness_in_limbs,fast_heart_rate,pain_during_bowel_movements,pain_in_anal_region,bloody_stool,irritation_in_anus,neck_pain,dizziness,cramps,bruising,obesity,swollen_legs,swollen_blood_vessels,puffy_face_and_eyes,enlarged_thyroid,brittle_nails,swollen_extremeties,excessive_hunger,extra_marital_contacts,drying_and_tingling_lips,slurred_speech,knee_pain,hip_joint_pain,muscle_weakness,stiff_neck,swelling_joints,movement_stiffness,spinning_movements,loss_of_balance,unsteadiness,weakness_of_one_body_side,loss_of_smell,bladder_discomfort,foul_smell_of urine,continuous_feel_of_urine,passage_of_gases,internal_itching,toxic_look_(typhos),depression,irritability,muscle_pain,altered_sensorium,red_spots_over_body,belly_pain,abnormal_menstruation,dischromic _patches,watering_from_eyes,increased_appetite,polyuria,family_history,mucoid_sputum,rusty_sputum,lack_of_concentration,visual_disturbances,receiving_blood_transfusion,receiving_unsterile_injections,coma,stomach_bleeding,distention_of_abdomen,history_of_alcohol_consumption,fluid_overload,blood_in_sputum,prominent_veins_on_calf,palpitations,painful_walking,pus_filled_pimples,blackheads,scurring,skin_peeling,silver_like_dusting,small_dents_in_nails,inflammatory_nails,blister,red_sore_around_nose,yellow_crust_ooze".split(",");
let selectedSymptoms = [];
let top3 = [];

function renderSymptoms() {
    const filteredSymptoms = symptoms.filter(symptom =>
        symptom.toLowerCase().includes(searchInp.value.toLowerCase())
    );

    const checkboxes = filteredSymptoms.map(symptom =>
        `<input type="checkbox" id="${symptom}" value="${symptom}" ${selectedSymptoms.includes(symptom) ? 'checked' : ''}>
        <label for="${symptom}">${symptom}</label><br>`
    ).join('');

    options.innerHTML = checkboxes || `<p style="margin-top: 10px;">Oops! Symptom not found</p>`;
}

function addSymptom(symptom) {
    const index = selectedSymptoms.indexOf(symptom);
    if (index === -1) {
        // If symptom is not already selected, add it to the selectedSymptoms array
        selectedSymptoms.push(symptom);
    } else {
        // If symptom is already selected, remove it from the selectedSymptoms array
        selectedSymptoms.splice(index, 1);
    }
}

document.addEventListener('change', function(event) {
    if (event.target.matches('input[type="checkbox"]')) {
        const symptom = event.target.value;
        addSymptom(symptom);
    }
    // Update the UI after selection/deselection
    renderSymptoms();
});

searchInp.addEventListener("keyup", () => {
    renderSymptoms();
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

renderSymptoms();

// Submit button functions
//Function to write selected symptoms to a file
submitBtn.addEventListener("click", () => {
    top3 = []
    // Send selected symptoms data to Flask server
    fetch('http://localhost:5000/analyse_symptoms', { // Update the URL to match your Flask server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedSymptoms })
    })
    .then(response => response.json())
    .then(data => {
        results = data.message
        console.log(results); // message form server
        results = results.split("\n");
        results.forEach((result) => {
            const matches = result.match(/(.+)\s+(\d+\.\d+)/);
            
            if (matches) {
                const prog = matches[1].trim(); // Get prognosis and remove leading/trailing spaces
                const prob = matches[2]; // Get probability
                top3.push([prog, prob]);
            } else {
                console.log("DONE");
            }
        });
        sessionStorage.setItem('top3', JSON.stringify(top3));
        window.location.href = "..\\ResultsPage\\ResultsPage.html";
        // console.log(top3);
    })
    .catch(error => {
        console.error('Error analysing symptoms:', error);
    });
});


// const wrapper = document.querySelector(".wrapper"),
// selectBtn = wrapper.querySelector(".select-btn"),
// searchInp = wrapper.querySelector("input"),
// options = wrapper.querySelector(".options");

// let symptoms = "itching,skin_rash,nodal_skin_eruptions,continuous_sneezing,shivering,chills,joint_pain,stomach_pain,acidity,ulcers_on_tongue,muscle_wasting,vomiting,burning_micturition,spotting_urination,fatigue,weight_gain,anxiety,cold_hands_and_feets,mood_swings,weight_loss,restlessness,lethargy,patches_in_throat,irregular_sugar_level,cough,high_fever,sunken_eyes,breathlessness,sweating,dehydration,indigestion,headache,yellowish_skin,dark_urine,nausea,loss_of_appetite,pain_behind_the_eyes,back_pain,constipation,abdominal_pain,diarrhoea,mild_fever,yellow_urine,yellowing_of_eyes,acute_liver_failure,fluid_overload,swelling_of_stomach,swelled_lymph_nodes,malaise,blurred_and_distorted_vision,phlegm,throat_irritation,redness_of_eyes,sinus_pressure,runny_nose,congestion,chest_pain,weakness_in_limbs,fast_heart_rate,pain_during_bowel_movements,pain_in_anal_region,bloody_stool,irritation_in_anus,neck_pain,dizziness,cramps,bruising,obesity,swollen_legs,swollen_blood_vessels,puffy_face_and_eyes,enlarged_thyroid,brittle_nails,swollen_extremeties,excessive_hunger,extra_marital_contacts,drying_and_tingling_lips,slurred_speech,knee_pain,hip_joint_pain,muscle_weakness,stiff_neck,swelling_joints,movement_stiffness,spinning_movements,loss_of_balance,unsteadiness,weakness_of_one_body_side,loss_of_smell,bladder_discomfort,foul_smell_of urine,continuous_feel_of_urine,passage_of_gases,internal_itching,toxic_look_(typhos),depression,irritability,muscle_pain,altered_sensorium,red_spots_over_body,belly_pain,abnormal_menstruation,dischromic _patches,watering_from_eyes,increased_appetite,polyuria,family_history,mucoid_sputum,rusty_sputum,lack_of_concentration,visual_disturbances,receiving_blood_transfusion,receiving_unsterile_injections,coma,stomach_bleeding,distention_of_abdomen,history_of_alcohol_consumption,fluid_overload,blood_in_sputum,prominent_veins_on_calf,palpitations,painful_walking,pus_filled_pimples,blackheads,scurring,skin_peeling,silver_like_dusting,small_dents_in_nails,inflammatory_nails,blister,red_sore_around_nose,yellow_crust_ooze".split(",");
// let selectedSymptoms = [];
// // function addSymptom(selectedSymptom) {
// //     options.innerHTML = "";
// //     symptoms.forEach(symptom => {
// //         let isSelected = symptom == selectedSymptom ? "selected" : "";
// //         let li = `<li onclick="updateName(this)" class="${isSelected}">${symptom}</li>`;
// //         options.insertAdjacentHTML("beforeend", li);
// //     });
// // }
// // addSymptom();

// function renderSymptoms() {
//     const options = document.querySelector('.options');
//     options.innerHTML = "";

//     symptoms.forEach(symptom => {
//         const isSelected = selectedSymptoms.includes(symptom);
//         const checkbox = `<input type="checkbox" id="${symptom}" value="${symptom}" ${isSelected ? 'checked' : ''}>
//                           <label for="${symptom}">${symptom}</label><br>`;
//         options.insertAdjacentHTML("beforeend", checkbox);
//     });
// }

// // Function to handle selection/deselection of symptoms
// function addSymptom(symptom) {
//     const index = selectedSymptoms.indexOf(symptom);
//     if (index === -1) {
//         // If symptom is not already selected, add it to the selectedSymptoms array
//         selectedSymptoms.push(symptom);
//     } else {
//         // If symptom is already selected, remove it from the selectedSymptoms array
//         selectedSymptoms.splice(index, 1);
//     }
// }

// // Event listener to handle checkbox clicks
// document.addEventListener('change', function(event) {
//     if (event.target.matches('input[type="checkbox"]')) {
//         const symptom = event.target.value;
//         addSymptom(symptom);
//     }
//     // Update the UI after selection/deselection
//     renderSymptoms();
// });

// // Initial rendering of symptoms with checkboxes
// renderSymptoms();

// // OLD CODE BELOWW

// function updateName(selectedLi) {
//     searchInp.value = "";
//     addSymptom(selectedLi.innerText);
//     wrapper.classList.remove("active");
//     selectBtn.firstElementChild.innerText = selectedLi.innerText;
// }

// searchInp.addEventListener("keyup", () => {
//     let arr = [];
//     let searchWord = searchInp.value.toLowerCase();
//     arr = symptoms.filter(data => {
//         return data.toLowerCase().includes(searchWord);
//     }).map(data => {
//         let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
//         return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
//     }).join("");
//     options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Symptom not found</p>`;
// });

// selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));