/*
    let form = document.getElementById("contactForm");
    let name = document.getElementById("name");
    let emailAddress = document.getElementById("emailAddress");
    let artist = document.getElementById("artist");
    let message = document.getElementById("message");
    let btn = document.getElementById("submitButton");

    form.addEventListener("submit", (e) => {
    e.preventDefault();
    validation();
});

    btn.addEventListener("click", () => {
    let itemsList = JSON.parse(localStorage.getItem("localItem")) || [];
    itemsList.push(name.value.trim());
    itemsList.push(emailAddress.value.trim());
    itemsList.push(artist.value.trim());
    itemsList.push(message.value.trim());
    localStorage.setItem("localItem", JSON.stringify(itemsList));
});
    const emailFormat = (e) => {
    const re = /\w+@\w+\.\w+/;
    return re.test(String(e).toLowerCase());
}

    const nameFormat = (n) => {
    const re = /^[a-zA-Z]{2,20}/;
    return re.test(n);
}

    const artistFormat = (a) => {
    const re = /^[a-zA-Z]{2,20}/;
    return re.test(a);
}
    function validation() {
    let user = name.value.trim();
    let mail = emailAddress.value.trim();
    let artist1 = artist.value.trim();
    let message1 = message.value.trim();


    if (user === "") {
    setError(name, "Username is required");
} else if (!nameFormat(user)) {
    setError(name, "There are wrong symbols");
} else {
    setSuccess(name);
}

    if (mail === "") {
    setError(emailAddress, "Email is required");
} else if (!emailFormat(mail)) {
    setError(emailAddress, "Invalid email format");
} else {
    setSuccess(emailAddress);
}

    if (artist1 === "") {
    setError(artist, "Username is required");
} else if (!artistFormat(artist1)) {
    setError(artist, "There are wrong symbols");
} else {
    setSuccess(artist);
}

    if (message1 === "") {
    setError(message, "Suggestion is required");
} else {
    setSuccess(message);
}
}
    localStorage.setItem("Is_name", user);
    localStorage.setItem("Is_emailAddress", mail);
    localStorage.setItem("Is_artist", artist1);
    localStorage.setItem("Is_message", message1);


let data = [
    {name: user, email: mail, artist: artist1, suggestion: message1}
]
function read() {
    localStorage.setItem("object", data);
    var tabledata = document.querySelector(".data_table");
    var object = localStorage.getItem("object");
    var object = JSON.parse(object);
    var elements = "";

    objectdata.map(record => {
        elements += '<tr>' +
            '<td>{record.name}</td> ' +
            '<td>{record.email}</td> ' +
            '<td>{record.artist}</td>' +
            '<td>{record.message}</td>' +
            '<td>' +
                '<button class="edit" onclick="{edit($record.id)}">Edit</button>' +
                '<button class="delete" onclick="{delete($record.id)}">Delete</button>'
            '</td>'
            '</tr>'
    })
    tabledata.innerHTML = elements;
}
function create(){
    document.querySelector(".create_form").style.display = "block";
}
function delet(id){
    data.splice(id, 1);
    read();
    }
function edit(id){
    document.querySelector(".update_form").style.display = "block";
    var obj = data.find(rec => rec.id --- id);
    document.querySelector("uname").value = obj.name;
    document.querySelector("uemail").value = obj.email;
    document.querySelector("uartist").value = obj.artist;
    document.querySelector("umessage").value = obj.suggestion;
}
function update(){
    var id = document.querySelector('.id').value;
    var name = document.querySelector('.uname').value;
    var email = document.querySelector('.uemail').value;
    var artist = document.querySelector('.uartist').value;
    var suggestion = document.querySelector('.umessage').value;

    var index = data.findIndex(rec => rec.id --- id);
    data[index] = {id, name, email, artist, suggestion};
    document.querySelector(".update_form").style.display = "none";
}
*/
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const formError = document.getElementById('form-error');
    const dataList = document.getElementById('data-list');

    displayData();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const emailAddress = document.getElementById('emailAddress').value;
        const artist = document.getElementById('artist').value;
        const message = document.getElementById('message').value;

        if (name.trim() === '' || emailAddress.trim() === '' || artist.trim() ==='' || message.trim() === '') {
            formError.textContent = 'Please complete all fields';
        } else {
            const data = {
                name: name,
                emailAddress: emailAddress,
                artist: artist,
                message: message
            };
            saveData(data);
            displayData();
            form.reset();
            formError.textContent = '';
        }
    });

    function saveData(data) {
        let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
        savedData.push(data);
        localStorage.setItem('savedData', JSON.stringify(savedData));
    }

    function displayData() {
        dataList.innerHTML = '';
        const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
        savedData.forEach(function (data, index) {
            const li = document.createElement('li');
            li.innerHTML = `Name: ${data.name}<br>Email: ${data.emailAddress}<br>Artist: ${data.artist}<br>Suggestion: ${data.message}<br>`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', function () {
                editReview(index);
            });
            li.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                deleteReview(index);
            });
            li.appendChild(deleteButton);

            dataList.appendChild(li);
        });
    }

    function editReview(index) {
        const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
        const data = savedData[index];
        const newName = prompt('Enter new name', data.name);
        if (newName === null) return;
        const newEmail = prompt('Enter new email', data.emailAddress);
        if (newEmail === null) return;
        const newArtist = prompt('Enter new artist', data.artist);
        if (newArtist === null) return;
        const newMessage = prompt('Enter new suggestion', data.message);
        if (newMessage === null) return;

        savedData[index] = {
            name: newName,
            emailAddress: newEmail,
            artist: newArtist,
            message: newMessage
        };
        localStorage.setItem('savedData', JSON.stringify(savedData));
        displayData();
    }

    function deleteReview(index) {
        const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
        savedData.splice(index, 1);
        localStorage.setItem('savedData', JSON.stringify(savedData));
        displayData();
    }
});