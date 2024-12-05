export function validateLogInForm(formData) {
    const errors = {};
  
    if (!formData.username.trim()) {
      errors.username = 'Username is required.';
    }
  
    if (!formData.password.trim()) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }
  
    return errors;
  }