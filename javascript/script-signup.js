// MARM: sign up button click event function
document.getElementById('signUpUser').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpass = document.getElementById('confirmpassword').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role_dropdown').value;

    // MARM: validation - check if name, email, password, confirm password, and role fields are not empty
    if (name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmpass.trim() !== '' && role.trim() !== '') {
        
        // MARM: validation - check if password and confirm password match
        if (password !== confirmpass) {
            // MARM: show error modal window if password and confirm password do not match
            const isPassSame = document.getElementById("isPassSame");
            isPassSame.style.display = "block";
            document.getElementById('password').style.borderColor = 'red';
            document.getElementById('confirmpassword').style.borderColor = 'red';

            // MARM: exit the function early if there's a mismatch
            return; 
        }

        // MARM: validation - validate phone number if less than 10 
        if (phone.replace(/\D/g, '').length < 10) {
            // MARM: show error modal window if phone number is invalid
            const invalidPhone = document.getElementById("invalidPhone");
            invalidPhone.style.display = "block";
            document.getElementById('phone').style.borderColor = 'red';
            return; 
        }

        // MARM: proceed with sign up
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
        document.getElementById('userNameModal').innerText = name;

        // MARM: store sign-up information in localStorage
        const signUpInfo = {
            email: email,
            password: password,
            role: role
        };
        localStorage.setItem('signUpInfo', JSON.stringify(signUpInfo));

        // MARM: redirect to another login.html after 3 seconds
        setTimeout(function() {
            window.location.href = "login.html";
        }, 3000);

        // MARM: clear input fields 
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirmpassword').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('role_dropdown').value = '';
    } else {
        // MARM: show error modal if any of the fields is empty
        const errorModal = document.getElementById("errorModal");
        errorModal.style.display = "block";

        // MARM: apply red border color to empty input fields
        if (name.trim() === '') {
            document.getElementById('name').style.borderColor = 'red';
        }
        if (email.trim() === '') {
            document.getElementById('email').style.borderColor = 'red';
        }
        if (password.trim() === '') {
            document.getElementById('password').style.borderColor = 'red';
        }
        if (confirmpass.trim() === '') {
            document.getElementById('confirmpassword').style.borderColor = 'red';
        }
        if (phone.trim() === '') {
            document.getElementById('phone').style.borderColor = 'red';
        }
        if (role.trim() === '') {
            document.getElementById('role_dropdown').classList.add('invalid');
        }
    }
});

// MARM: function to remove red border color when input fields are not empty anymore
function removeRedBorder(element) {
    if (element.value.trim() !== '') {
        element.style.borderColor = '';
    }
}

// MARM: format phone number as (XXX) XXX-XXXX and show error if less than 10 digits
function formatPhoneNumber() {
    console.log('Phone input event triggered');
    const phoneInput = document.getElementById('phone');
    
    // MARM: remove non-digit characters
    const phoneValue = phoneInput.value.replace(/[^\d]/g, ''); 

    if (phoneValue.length == 10) {
        // MARM: format phone number
        phoneInput.style.borderColor = '';
        phoneInput.value = phoneValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }

    // MARM: remove red border if input is not empty
    removeRedBorder(phoneInput);
}

// MARM: attach the event listener to call the function
document.getElementById('phone').addEventListener('input', formatPhoneNumber);

document.getElementById('email').addEventListener('input', function () {
    console.log('Email input event triggered');
    removeRedBorder(this);
});

document.getElementById('password').addEventListener('input', function () {
    console.log('Password input event triggered');
    removeRedBorder(this);
});

document.getElementById('confirmpassword').addEventListener('input', function () {
    console.log('Confirm Password input event triggered');
    removeRedBorder(this);
});

document.getElementById('role_dropdown').addEventListener('input', function () {
    console.log('Role input event triggered');
    removeRedBorder(this);
});

// MARM: remove red border from dropdown when an option is selected
document.getElementById('role_dropdown').addEventListener('change', function () {
    if (this.value.trim() !== '') {
        this.classList.remove('invalid');
    }
});

// MARM: close modals when clicking on the close button
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const modal = this.parentElement.parentElement;
        modal.style.display = 'none';
    });
});

// MARM: close modals when clicking outside the modal
window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
};
