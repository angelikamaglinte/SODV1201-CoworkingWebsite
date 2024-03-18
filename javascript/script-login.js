 
// MARM: login validation
document.getElementById('loginUser').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
 
    // MARM: retrieve sign-up information from localStorage
    const signUpInfo = JSON.parse(localStorage.getItem('signUpInfo'));
 
    if (signUpInfo) {
        const signUpEmail = signUpInfo.email;
        const signUpPassword = signUpInfo.password;
        const signUpRole = signUpInfo.role;
 
        // MARM: check if email and password match
        if (email === signUpEmail && password === signUpPassword) {
            // Redirect based on role
            window.location.href = 'features.html';
        } else {
            // MARM: how error message if email or password is incorrect
            document.getElementById('errorMessage').style.display = 'block';
        }
    } else {
        // MARM: how error message if no sign-up information found
        document.getElementById('errorMessage').style.display = 'block';
    }
});
 











// // MARM: login validation
// document.getElementById('loginUser').addEventListener('click', function () {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     // MARM: retrieve sign-up information from localStorage
//     const signUpInfo = JSON.parse(localStorage.getItem('signUpInfo'));

//     if (signUpInfo) {
//         const signUpEmail = signUpInfo.email;
//         const signUpPassword = signUpInfo.password;
//         const signUpRole = signUpInfo.role;

//         // MARM: check if email and password match
//         if (email === signUpEmail && password === signUpPassword) {
//             // Redirect based on role
//             if (signUpRole === 'owner') {
//                 window.location.href = 'owner.html';
//             } else if (signUpRole === 'coworker') {
//                 window.location.href = 'coworker.html';
//             }
//         } else {
//             // MARM: how error message if email or password is incorrect
//             document.getElementById('errorMessage').style.display = 'block';
//         }
//     } else {
//         // MARM: how error message if no sign-up information found
//         document.getElementById('errorMessage').style.display = 'block';
//     }
// });
