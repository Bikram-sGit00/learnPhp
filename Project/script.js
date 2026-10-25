// Grab the elements we need once, up front
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const successBox = document.getElementById('success');
const message = document.getElementById('message');
const counter = document.getElementById('counter');

// Each rule returns an error string, or '' if the field is fine.
// Keeping rules in one object makes it easy to add or change fields later.
const rules = {
  name: (v) => (v.trim().length < 2 ? 'Please enter your full name.' : ''),

  email: (v) => {
    if (!v.trim()) return 'Please enter your email address.';
    // Simple pattern: something@something.something
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'That email address looks incomplete.';
  },

  phone: (v) => {
    // Optional field: only check it if the person typed something
    if (!v.trim()) return '';
    return /^[+\d][\d\s()-]{6,}$/.test(v) ? '' : 'Use digits only, with an optional + at the start.';
  },

  topic: (v) => (v ? '' : 'Pick a topic so I know where to start.'),

  message: (v) => (v.trim().length < 10 ? 'Write at least 10 characters.' : ''),

  consent: (_v, el) => (el.checked ? '' : 'Tick this box so I can reply to you.'),
};

// Validate one field and show or clear its error. Returns true if valid.
function validateField(el) {
  const rule = rules[el.name];
  if (!rule) return true;

  const error = rule(el.value, el);
  document.getElementById(`${el.name}-error`).textContent = error;
  el.classList.toggle('invalid', Boolean(error));
  el.setAttribute('aria-invalid', error ? 'true' : 'false');
  return !error;
}

// Check fields when the person leaves them, and re-check live once an error is showing
form.querySelectorAll('input, select, textarea').forEach((el) => {
  el.addEventListener('blur', () => validateField(el));
  el.addEventListener('input', () => {
    if (el.classList.contains('invalid')) validateField(el);
  });
});

// Live character counter for the message box
message.addEventListener('input', () => {
  counter.textContent = `${message.value.length} / ${message.maxLength}`;
});

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // stop the page from reloading

  // Validate everything, not just the last field touched
  const fields = [...form.elements].filter((el) => el.name);
  const results = fields.map(validateField);

  if (results.includes(false)) {
    // Move focus to the first problem so keyboard users land on it
    form.querySelector('.invalid').focus();
    return;
  }

  // Disable the button so the form can't be sent twice
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const data = Object.fromEntries(new FormData(form));

  try {
    // Replace this fake delay with a real request, for example:
    // await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log('Form data:', data);

    // Swap the form for the success message
    document.getElementById('success-name').textContent = data.name.split(' ')[0];
    document.getElementById('success-email').textContent = data.email;
    form.hidden = true;
    successBox.hidden = false;
  } catch (err) {
    alert('Something went wrong. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
  }
});

// "Send another message" brings the empty form back
resetBtn.addEventListener('click', () => {
  form.reset();
  counter.textContent = `0 / ${message.maxLength}`;
  form.querySelectorAll('.invalid').forEach((el) => el.classList.remove('invalid'));
  form.querySelectorAll('.error').forEach((p) => (p.textContent = ''));
  successBox.hidden = true;
  form.hidden = false;
});