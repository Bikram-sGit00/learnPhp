
const form = document.getElementById('registration-form');

// Validation rules for each field
const rules = {
    name: (v) =>
        v.trim().length < 2 ? 'Enter your full name.' : '',

    email: (v) => {
        if (!v.trim()) return 'Enter your email address.';

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            ? ''
            : 'This email address looks incomplete.';
    },

    phone: (v) => {
        if (!v.trim()) return 'Enter your phone number.';

        return /^\+?[\d\s()-]{6,}$/.test(v)
            ? ''
            : 'Use a valid phone number.';
    },

    dob: (v) => {
        if (!v) return 'Choose your date of birth.';

        return new Date(v + 'T00:00:00') > new Date()
            ? "Date of birth can't be in the future."
            : '';
    },

    address: (v) =>
        v.trim().length < 8 ? 'Enter your full address.' : ''
};


// Validate gender radio buttons
function validateGender() {
    const chosen = form.querySelector('input[name="gender"]:checked');

    document.getElementById('gender-error').textContent =
        chosen ? '' : 'Select one option.';

    return Boolean(chosen);
}


// Validate individual fields
function validateField(el) {
    const rule = rules[el.name];

    if (!rule) return true;

    const error = rule(el.value);

    document.getElementById(`${el.name}-error`).textContent = error;

    el.classList.toggle('invalid', Boolean(error));

    return !error;
}


// Validate fields when the user leaves them
form.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="tel"], input[type="date"], textarea'
).forEach((el) => {

    el.addEventListener('blur', () => validateField(el));

    // Revalidate while correcting an existing error
    el.addEventListener('input', () => {
        if (el.classList.contains('invalid')) {
            validateField(el);
        }
    });

});


// Clear gender error when an option is selected
form.querySelectorAll('input[name="gender"]').forEach((el) => {
    el.addEventListener('change', validateGender);
});


// Handle form submission
form.addEventListener('submit', (event) => {

    // Prevent default submission until validation finishes
    event.preventDefault();

    // Validate all fields
    const fieldResults = [
        ...form.querySelectorAll('input[name], textarea')
    ]
        .filter((el) => el.type !== 'radio')
        .map(validateField);

    const genderValid = validateGender();

    // Check whether every field is valid
    const allValid =
        !fieldResults.includes(false) && genderValid;

    if (!allValid) {

        // Focus the first invalid field
        const firstBad = form.querySelector('.invalid');

        if (firstBad) {
            firstBad.focus();
        }

        return;
    }

    // All validations passed.
    // Submit form data to index.php using POST.
    form.submit();

});
