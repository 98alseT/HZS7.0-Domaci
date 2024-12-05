export function validateForm(elem) {
    const errors = {};
  
    if (!elem.title.trim()) {
      errors.title = 'Title is required.';
    }
  
    if (!elem.name.trim()) {
      errors.name = 'Name is required.';
    }
  
    if (!elem.description.trim()) {
      errors.description = 'Description is required.';
    }
  
    if (!elem.location.trim()) {
      errors.location = 'Location is required.';
    }
  
    if (!elem.date) {
      errors.date = 'Date is required.';
    }
  
    if (!elem.time) {
      errors.time = 'Time is required.';
    }
  
    if (!elem.type) {
      errors.type = 'Type is required.';
    }
  
    if (!elem.tag) {
      errors.tag = 'Tag is required.';
    }

    
  
    return errors;
  }
  