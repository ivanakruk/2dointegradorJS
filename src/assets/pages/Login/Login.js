const baseURL = 'https://back-sandbox.herokuapp.com/api';

const userLogin = document.getElementById('user');
const passUser = document.getElementById('passUser');
const loginBtn = document.getElementById('userLoginBtn');
const containerLogin = document.getElementById('loginRespOk');
const containerFormLogin = document.getElementById('formLogin');
const login = async () => {

    const loginUser = {
        email: userLogin.value,
        password: passUser.value
    }

    try {
        const response = await fetch(`${baseURL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(loginUser)
        });
        const json = await response.json();
        console.log(json);
        console.log(response);
        localStorage.setItem('token',json.token);

        if(response.status ===200) {
            containerFormLogin.style.display = 'none';
            containerLogin.style.display = 'flex';
        }
    } catch (error) {
        console.log(error);
    }
}


loginBtn.addEventListener('click', login);