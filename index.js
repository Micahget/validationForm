let userForm = document.getElementById("user-form");

// validate date of birth
let dobs = document.getElementById("dob");
dobs.addEventListener('input', () => dobValidity(dobs));

function dobValidity(dobs) {
    let age = new Date().getFullYear() - new Date(dobs.value).getFullYear();

    
    let ageCheck = age >= 18 && age <= 55;
    console.log(ageCheck);
    if (!ageCheck) {
        dobs.setCustomValidity("Your age should be between 18 and 55");
        dobs.reportValidity();
    }
    else{
        dobs.setCustomValidity("");
        dobs.reportValidity();
    }
}

// // validate email
let emails = document.getElementById("email");
emails.addEventListener('input', () => emailValidity(emails));

function emailValidity(emails) {
    if(emails.validity.typeMismatch){
        emails.setCustomValidity("Your email should contain @. Please enter a valid email address");
        emails.reportValidity();
    }
    else{
        emails.setCustomValidity("");
    }
}
    

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    }
    else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dob = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = ` <td class='border px-4 py-2'>${entry.acceptTerms}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dob} ${acceptTermsCell}</tr>`;
        return row;
    }).join('\n');

    const table = `<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">Dob</th>
    <th class="px-4 py-2">Accepted Terms?</th>
    </tr>${tableEntries}</table>`;

    let details = document.getElementById('user-entries');
    details.innerHTML = table;

}

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTerms
    }
    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();

}
displayEntries();
userForm.addEventListener("submit", saveUserForm);
displayEntries();


