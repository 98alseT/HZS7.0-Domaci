export function validateForm(elem) {
    const errors = {};
  
    if (!elem.username.trim()) {
      errors.username = 'Username is required.';
    }
  
    if (!elem.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!elem.email.includes('@') || !elem.email.includes('.')) {
      errors.email = 'Invalid email format.';
    }
  
    if (!elem.password.trim()) {
      errors.password = 'Password is required.';
    } else if (elem.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }
  
    return errors;
}  