const recarregarBotao = document.getElementById('recarregarBotao'); 
const userTableBody = document.getElementById('usertable').getElementsByTagName('tbody')[0];

async function fetchUsers(){
    try {
        const response = await fetch('https://randomuser.me/api/?results=10&nat=br');
        const data = await response.json();

        return data.results;
        
    } catch (error){ 
        console.error('Erro ao buscar os usuários: ', error);
        return[];
    }
}

function renderTable(users) {

    userTableBody.innerHTML = '';

    users.forEach((user, index) => {

        const row = document.createElement('tr')

        const sequenciaNumerica = document.createElement('td');
        sequenciaNumerica.textContent = index + 1;
        row.appendChild(sequenciaNumerica); 

        const primeiroNome = document.createElement('td');
        primeiroNome.textContent = user.name.first;
        row.appendChild(primeiroNome);

        const sobrenomeUsuario = document.createElement('td');
        sobrenomeUsuario.textContent = user.name.last;
        row.appendChild(sobrenomeUsuario);

        const idadeUsuario = document.createElement('td');
        idadeUsuario.textContent = user.dob.age;
        row.appendChild(idadeUsuario);

        const cidadeUsuario = document.createElement('td');
        cidadeUsuario.textContent = user.location.city;
        row.appendChild(cidadeUsuario);

        const fotoUsuario = document.createElement('td');
        const img = document.createElement('img');
        img.src = user.picture.thumbnail;
        fotoUsuario.appendChild(img);
        row.appendChild(fotoUsuario);

        userTableBody.appendChild(row)
    });   
}

async function atualizarTabela(){
    const usuario = await fetchUsers();
    renderTable(usuario);
}

recarregarBotao.addEventListener('click', atualizarTabela);
atualizarTabela();