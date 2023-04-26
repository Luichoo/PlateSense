const addformListener = () => {
    const userForm = document.getElementById('user-form')
    console.log(userForm)
    userForm.onsubmit = async(e) => {
        console.log('submit')
        e.preventDefault()
        const formData = new FormData(userForm)
        const data = Object.fromEntries(formData.entries())
        await fetch('/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        
    }
}

const addpasswordListener = () => {
    const password = document.getElementById('password')
    const password2 = document.getElementById('password2')
    const submit = document.getElementById('submit')
    if (password.value.lenght < 3 ){
        console.log('password too short')
        password.setCustomValidity('Password must be at least 6 characters')
        password.className += ' is-invalid'
    }
    password.oninput = () => {
        if (password.value.lenght < 3 ){
            console.log('password too short')
            password.setCustomValidity('Password must be at least 6 characters')
            password.className += ' is-invalid'
        } else {
            password.setCustomValidity('')
            password.className += ' is-valid'
        }
    }
    password2.oninput = () => {
        if (password.value !== password2.value) {
            console.log('passwords do not match')
            password2.className += ' is-invalid'
            password.className += ' is-invalid'
            submit.disabled = true
        } else {
            password2.className += ' is-valid'
            password.className += ' is-valid'
            submit.disabled = false
            console.log('passwords match')
            password2.setCustomValidity('')
        }
    }
}

window.onload = () => {
    const password = document.getElementById('password')
    const password2 = document.getElementById('password2')
    password2.className += ' is-invalid'
    addformListener()
    addpasswordListener()
}