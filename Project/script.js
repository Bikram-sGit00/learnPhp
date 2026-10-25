const form = document.getElementById('registration-form');

// Each rule returns an error string, or '' when the field is fine
const rules = {
  name: (v) => (v.trim().length < 2 ? 'Enter your full name.' : ''),

  email: (v) => {
    if (!v.trim()) return 'Enter your email address.';
    // Basic shape check: something@something.something
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'This email address looks incomplete.';
  },

  phone: (v) => {
    if (!v.trim()) return 'Enter your phone number.';
    // Optional + at the start, then at least 6 digits (spaces, dashes and brackets allowed)
    return /^\+?[\d\s()-]{6,}$/.test(v) ? '' : 'Use digits only, with an optional + at the start.';
  },

  dob: (v) => {
    if (!v) return 'Choose your date of birth.';
    // A birth date in the future can't be right
    return new Date(v) > new Date() ? 'Date of birth can\'t be in the future.' : '';
  },

  address: (v) => (v.trim().length < 8 ? 'Enter your full address.' : ''),
};

// Radio group is checked separately because it's several inputs sharing one name
function validateGender() {
  const chosen = form.querySelector('input[name="gender"]:checked');
  document.getElementById('gender-error').textContent = chosen ? '' : 'Select one option.';
  return Boolean(chosen);
}

// Validate a single field, show or clear its error, and return true when valid
function validateField(el) {
  const rule = rules[el.name];
  if (!rule) return true;

  const error = rule(el.value);
  document.getElementById(`${el.name}-error`).textContent = error;
  el.classList.toggle('invalid', Boolean(error));
  return !error;
}

// Check a field when the person leaves it, then re-check live while an error is showing
form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"], textarea')
  .forEach((el) => {
    el.addEventListener('blur', () => validateField(el));
    el.addEventListener('input', () => {
      if (el.classList.contains('invalid')) validateField(el);
    });
  });

// Clear the gender error as soon as an option is picked
form.querySelectorAll('input[name="gender"]').forEach((el) => {
  el.addEventListener('change', validateGender);
});

form.addEventListener('submit', (event) => {
  event.preventDefault(); // stop the page from reloading

  // Run every check (not just until the first failure) so all errors show at once
  const fieldResults = [...form.querySelectorAll('input[name], textarea')]
    .filter((el) => el.type !== 'radio')
    .map(validateField);
  const genderValid = validateGender(); // called on its own so its error always shows
  const allValid = !fieldResults.includes(false) && genderValid;

  if (!allValid) {
    // Send focus to the first field with a problem
    const firstBad = form.querySelector('.invalid');
    if (firstBad) firstBad.focus();
    return;
  }

  // All good: collect the values as a plain object
  const data = Object.fromEntries(new FormData(form));

  // Replace this with a real request when you have a backend, for example:
  // fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  console.log(data);

  form.reset();
});