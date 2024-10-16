export const isValid = {
  'registerData': (data: any) => {
    const fields = [
      'email',
      'positive',
      'negative',
      'beforeQuestion',
      'question',
      'confirm',
      'cancel',
    ];

    let errors: Array<string> = [];
    let valid = true;
    
    fields.forEach(key => {
      if (!data?.[key]) {
        errors.push(`alert.fields.${key}`);
        valid = false;
      } else if (data[key].length === 0) {
        valid = false;
        errors.push(`alert.fields.${key}`);
      }
    })

    return { errors, valid };
  }
} 