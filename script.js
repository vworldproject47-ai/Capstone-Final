// ==========================================================
// script.js — Milestone 4
// Runs on all three pages; each block checks that its elements
// exist before running, since not every page has every feature.
// ==========================================================

// ---------------------------------------------------------
// 1. DOM Interaction (required): project filter (projects.html)
// Uses querySelectorAll + addEventListener. Buttons are real
// <button> elements, so they're keyboard-focusable and
// activatable with Enter/Space with no extra work.
// ---------------------------------------------------------

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const chosenCategory = button.dataset.filter;

    // Show/hide cards based on the chosen category.
    projectCards.forEach(function (card) {
      const matches = chosenCategory === 'all' || card.dataset.category === chosenCategory;
      card.hidden = !matches;
    });

    // Update aria-pressed so screen readers know which filter is active.
    filterButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', 'false');
    });
    button.setAttribute('aria-pressed', 'true');
  });
});

// ---------------------------------------------------------
// 2. Form Validation (required): about.html contact form
// - Prevents submission if required fields are empty/invalid
// - Shows errors in the DOM, not alert()
// - Clears each field's error as soon as the user fixes it
// ---------------------------------------------------------

const form = document.getElementById('contact-form');

if (form) {
  const status = document.getElementById('form-status');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isFieldValid(fieldId) {
    const value = document.getElementById(fieldId).value.trim();
    if (fieldId === 'email') {
      return emailPattern.test(value);
    }
    return value.length > 0;
  }

  function setFieldError(fieldWrapperId, fieldId, hasError) {
    const wrapper = document.getElementById(fieldWrapperId);
    const input = document.getElementById(fieldId);
    wrapper.classList.toggle('has-error', hasError);
    input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
  }

  // Validate + clear errors live as the user types/edits each field.
  ['name', 'email', 'message'].forEach(function (fieldId) {
    const input = document.getElementById(fieldId);
    const wrapperId = fieldId + '-field';

    input.addEventListener('input', function () {
      // Only clear the error once the field becomes valid — this
      // avoids flashing an error the instant someone starts typing.
      if (isFieldValid(fieldId)) {
        setFieldError(wrapperId, fieldId, false);
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameValid = isFieldValid('name');
    const emailValid = isFieldValid('email');
    const messageValid = isFieldValid('message');

    setFieldError('name-field', 'name', !nameValid);
    setFieldError('email-field', 'email', !emailValid);
    setFieldError('message-field', 'message', !messageValid);

    if (nameValid && emailValid && messageValid) {
      const name = document.getElementById('name').value.trim();
      status.textContent = 'Thanks, ' + name + ' — your message has been received.';
      status.className = 'success';
      form.reset();
    } else {
      status.textContent = 'Please fix the highlighted fields below and try again.';
      status.className = 'error';
    }
  });
}

// ---------------------------------------------------------
// 3. API Fetch (optional bonus): random fact card (index.html)
// Includes error handling in case the network request fails.
// ---------------------------------------------------------

const factButton = document.getElementById('fact-btn');

if (factButton) {
  const factText = document.getElementById('fact-text');

  factButton.addEventListener('click', function () {
    factText.textContent = 'Loading...';

    fetch('https://catfact.ninja/fact')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(function (data) {
        factText.textContent = data.fact;
      })
      .catch(function () {
        factText.textContent = 'Could not load a fact right now — please try again.';
      });
  });
}
