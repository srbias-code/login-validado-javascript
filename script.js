document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideBtn = document.getElementById('show-hide');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            alert('Inicio de sesión exitoso');
            saveToLocalStorage(); // Guardar el email en localStorage
        }
    });

    showHideBtn.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
            showHideBtn.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
            showHideBtn.textContent = 'Show';
        }
    });

    emailInput.addEventListener('blur', function () {
        validateEmail();
    });

    emailInput.addEventListener('input', function () {
        clearError(emailError);
    });

    passwordInput.addEventListener('input', function () {
        clearError(passwordError);
    });

    confirmPasswordInput.addEventListener('input', function () {
        clearError(confirmPasswordError);
    });

    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function validateForm() {
        const emailValid = validateEmail();
        const passwordValidMessage = validatePassword(passwordInput.value);
        const passwordsMatch = validatePasswordMatch();

        // Si la validación de la contraseña no es válida, mostramos el error
        if (passwordValidMessage !== "La contraseña es válida.") {
            showError(passwordError, passwordValidMessage);
        }

        return emailValid && passwordValidMessage === "La contraseña es válida." && passwordsMatch;
    }

    function validateEmail() {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailValue = emailInput.value.trim();
        
        if (!emailValue) {
            showError(emailError, "Este campo es obligatorio.");
            return false;
        }
        if (!emailRegex.test(emailValue)) {
            showError(emailError, "Por favor, ingrese un correo electrónico válido.");
            return false;
        }
        clearError(emailError);
        return true;
    }

    function clearError(element) {
        element.textContent = "";
        element.style.display = 'none';
    }

    function validatePassword(password) {
        if (!password) {
            showError(passwordError, "Este campo es obligatorio.");
            return "Este campo es obligatorio.";
        }
        if (password.length < 6) {
            return "La contraseña debe tener al menos 6 caracteres.";
        }
        if (password.length > 12) {
            return "La contraseña no debe exceder los 12 caracteres.";
        }
        if (!/[A-Z]/.test(password)) {
            return "La contraseña debe contener al menos una letra mayúscula.";
        }
        if (!/[a-z]/.test(password)) {
            return "La contraseña debe contener al menos una letra minúscula.";
        }
        if (!/[0-9]/.test(password)) {
            return "La contraseña debe contener al menos un número.";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "La contraseña debe contener al menos un carácter especial.";
        }
        
        return "La contraseña es válida.";
    }

    function validatePasswordMatch() {
        if (!confirmPasswordInput.value) {
            showError(confirmPasswordError, "Este campo es obligatorio.");
            return false;
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordError, "Las contraseñas no coinciden.");
            return false;
        }
        clearError(confirmPasswordError);
        return true;
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        const body = bodyBuilderJSON();
        console.log(body);
    }

    function bodyBuilderJSON() {
        return {
            "email": emailInput.value,
            "password": passwordInput.value
        };
    }
});
