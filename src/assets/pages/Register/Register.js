
const baseURL = 'https://back-sandbox.herokuapp.com/api';

const inputMail  = document.getElementById('userEmail');
const inputPass = document.getElementById('userPass');
const inputName  = document.getElementById('userName');
const inputLastName = document.getElementById('userLastName')
const containerRegister = document.getElementById('cardRegister')
const btnRegister = document.getElementById('btnRegister');
const containerResponse = document.getElementById('containerResp');
const containerRespError = document.getElementById('containerRespError')


const register = async () =>{

    const infoUsers = {
        email: inputMail.value,
        password: inputPass.value,
        name: inputName.value,
        lastName: inputLastName.value 
    };

    try {
       const response = await fetch(`${baseURL}/auth/register`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(infoUsers)
       });
       const json = await response.json();
       console.log(json);
       console.log(response)
       /* localStorage.setItem('token',json.token); */


      if (response.status === 201) {
            containerRegister.style.display = 'none';
            containerResponse.style.display = 'block';
        }
        else{
            containerRegister.style.display = 'none';
            containerRespError.style.display = 'flex';
        }

    
    } catch (error) {
        alert(error)
    }

    
}

btnRegister.addEventListener('click', register);