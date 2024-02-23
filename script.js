const playerForm = document.getElementById('playerForm');
const playersContainer = document.getElementById('players');

document.getElementById('name').addEventListener('input',function(){
            document.querySelector("#p1").textContent = "";
})

document.getElementById('age').addEventListener('input',function(){
    document.querySelector("#p2").textContent = "";
})

document.getElementById('gender').addEventListener('input',function(){
    document.querySelector("#p3").textContent = "";
})

document.getElementById('gameType').addEventListener('input',function(){
    document.querySelector("#p4").textContent = "";
})

document.getElementById('sports').addEventListener('input',function(){
    document.querySelector("#p5").textContent = "";
})

document.getElementById('image').addEventListener('input',function(){
    document.querySelector("#p6").textContent = "";
})

let players = [];
let check = null;

function showSportsOptions(){
    let gametypenew = document.querySelector("#gameType");
    let gametype = gametypenew.value;
    let indoor = ["Select a sport","Carrom", "Chess", "Ludo",];
    let outdoor = ["Select a sport","Cricket", "Kho-Kho", "Kabaddi"];
    let sport = document.querySelector("#sports");
    sport.innerHTML = "";
    if (gametype === "Indoor") {
        for (let x of indoor) {
            let optvalue = document.createElement("option");  
            optvalue.textContent = x;
            sport.appendChild(optvalue);
            sport.children[0].disabled = true;
            sport.children[0].selected = true;
        }
    }  else if(gametype=="Outdoor") {
        for (let y of outdoor) {
            let optvalue = document.createElement("option");
            optvalue.textContent = y;
            sport.appendChild(optvalue);
            sport.children[0].disabled = true;
            sport.children[0].selected = true;
        }
    }
    sport.disabled = false;
}


function addOrUpdatePlayer() {
    const playerName = playerForm.name.value;
    const playerAge = playerForm.age.value;
    const playerGender = playerForm.gender.value;
    const playerGameType = playerForm.gameType.value;
    const playerSports = playerForm.sports.value;
    const playerImageFile = playerForm.image.files[0];

    const existingPlayer = players.find(player => player.name === playerName);
    if (existingPlayer && existingPlayer.id !== check) {
        alert("Same Player name already exists !! so, Please provide an unique name !!");
        return;
    }

    if (!playerName || !playerAge || !playerGender || !playerGameType || !playerSports || !playerImageFile) {
        if (!playerName) 
        {document.querySelector("#p1").textContent = "**fill your name**";}
        if (!playerAge) 
        {document.querySelector("#p2").textContent = "**fill your age**";}
        if (!playerGender) 
        {document.querySelector("#p3").textContent = "**fill your gender**";}
        if (!playerGameType) 
        {document.querySelector("#p4").textContent = "**fill your gametype**";}
        if (!playerSports) 
        {document.querySelector("#p5").textContent = "**fill your sport**";}
        if (!playerImageFile) 
        {document.querySelector("#p6").textContent = "**fill your file**";}
        return; 
    } else {
        document.querySelector("#p1").textContent = "";
        document.querySelector("#p2").textContent = "";
        document.querySelector("#p3").textContent = "";
        document.querySelector("#p4").textContent = "";
        document.querySelector("#p5").textContent = "";
        document.querySelector("#p6").textContent = "";
    }
    

const player = {
    id: Date.now(),
    name: playerName,
    age: playerAge,
    gender: playerGender,
    gameType: playerGameType,
    sports: playerSports,
    image: URL.createObjectURL(playerImageFile)
};

const playerIndex = players.findIndex(p => p.id === check);
if (playerIndex !== -1) {
    players[playerIndex] = player;
} else {
    players.push(player);
}

check = null; 

const filterValue = document.getElementById('filter').value;
const searchValue = document.getElementById('search').value.toLowerCase();

let filteredPlayers = players;
if (filterValue) {
    filteredPlayers = players.filter(p => p.gameType === filterValue);
} else if (searchValue) {
    filteredPlayers = players.filter(p => p.name.toLowerCase().includes(searchValue));
}

playersContainer.innerHTML = '';
filteredPlayers.forEach(player => {
    addPlayer(player);
});

playerForm.reset();
let sports = document.querySelector("#sports");
sports.disabled = true;
sports.children[0].disabled = true;
sports.children[0].selected = true;
}

function show() {
    playersContainer.innerHTML = '';
    players.forEach(addPlayer);
}

function addPlayer(player, index) {
    const parentDiv = document.createElement('div');
    parentDiv.id="parentDiv";

    const imgDiv = document.createElement('div');
    imgDiv.style.backgroundImage = `url(${player.image})`;
    imgDiv.id="imgDiv";

    const playerDiv = document.createElement('div');
    playerDiv.id="playerDiv";

    const playerName = document.createElement('p');
    playerName.textContent = `Name: ${player.name}`;
    playerDiv.appendChild(playerName);

    const playerAge = document.createElement('p');
    playerAge.textContent = `Age: ${player.age}`;
    playerDiv.appendChild(playerAge);

    const playerGender = document.createElement('p');
    playerGender.textContent = `Gender: ${player.gender}`;
    playerDiv.appendChild(playerGender);

    const playerGameType = document.createElement('p');
    playerGameType.textContent = `Game Type: ${player.gameType}`;
    playerDiv.appendChild(playerGameType);

    const playerSports = document.createElement('p');
    playerSports.textContent = `Sports: ${player.sports}`;
    playerDiv.appendChild(playerSports);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        editPlayer(player.id);
    };
    playerDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deletePlayer(player.id);
    };
    playerDiv.appendChild(deleteButton);

    parentDiv.appendChild(imgDiv);
    parentDiv.appendChild(playerDiv);
    playersContainer.appendChild(parentDiv);
}

function deletePlayer(playerId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this player?");
    if (confirmDelete) {
        players = players.filter(p => p.id !== playerId);
        show();
    }
}



function editPlayer(playerId) {
    const player = players.find(p => p.id === playerId);
    check = player.id;

    document.getElementById('name').value = player.name;
    document.getElementById('age').value = player.age;
    document.getElementById('gender').value = player.gender;
    document.getElementById('gameType').value = player.gameType;
    showSportsOptions(); 
    document.getElementById('sports').value = player.sports;
    document.getElementById('sports').disabled = false;
}




const search = document.getElementById('search');
search.addEventListener('input', function() {
    const searchText = search.value.toLowerCase();
    const filteredPlayers = players.filter(player => player.name.toLowerCase().includes(searchText));
    getFilteredPlayers(filteredPlayers);
});

const filter = document.getElementById('filter');
filter.addEventListener('change', function() {
    const selectedGameType = filter.value;
    if (selectedGameType) {
        const filteredPlayers = players.filter(player => player.gameType === selectedGameType);
        getFilteredPlayers(filteredPlayers);
    } else {
        show();
    }
});

function getFilteredPlayers(filteredPlayers) {
    playersContainer.innerHTML = '';
    filteredPlayers.forEach((player, index) => {
        addPlayer(player, index); 
    });
}