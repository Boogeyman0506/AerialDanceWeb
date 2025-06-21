export const clientsValidation = {

  // Validar email
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El email es requerido';
    if (!emailRegex.test(email)) return 'El formato del email es inválido';
    return null;
  },

  // Validar teléfono
  validatePhone(phone) {
    if (!phone) return null; // Teléfono es opcional
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.toString())) {
      return 'El teléfono debe tener 10 dígitos';
    }
    return null;
  },

  // Validar nombres
  validateName(name, fieldName) {
    if (!name || name.trim() === '') {
      return `${fieldName} es requerido`;
    }
    if (name.trim().length < 2) {
      return `${fieldName} debe tener al menos 2 caracteres`;
    }
    if (name.trim().length > 50) {
      return `${fieldName} no debe exceder 50 caracteres`;
    }
    return null;
  },

  // Validar fecha de nacimiento
  validateBirthDate(birthDate) {
    if (!birthDate) return 'La fecha de nacimiento es requerida';

    const today = new Date();
    const birth = new Date(birthDate);

    if (birth > today) {
      return 'La fecha de nacimiento no puede ser futura';
    }

    const age = today.getFullYear() - birth.getFullYear();
    if (age > 120) {
      return 'La fecha de nacimiento no es válida';
    }

    return null;
  },

  // Validar términos y condiciones
  validateTerms(formData) {
    const errors = {};

    if (!formData.acceptsRegulations) {
      errors.acceptsRegulations = 'Debe aceptar el reglamento interno';
    }
    if (!formData.acceptsResponsibility) {
      errors.acceptsResponsibility = 'Debe aceptar la liberación de responsabilidad';
    }
    if (!formData.acceptsPrivacy) {
      errors.acceptsPrivacy = 'Debe aceptar la política de privacidad';
    }
    if (!formData.signed) {
      errors.signed = 'Debe firmar el documento';
    }

    return errors;
  },

  // Validar contacto de emergencia
  validateEmergencyContact(formData) {
    const errors = {};

    const nameError = this.validateName(formData.emergencyContactName, 'Nombre del contacto de emergencia');
    if (nameError) errors.emergencyContactName = nameError;

    if (!formData.emergencyContactPhone) {
      errors.emergencyContactPhone = 'El teléfono del contacto de emergencia es requerido';
    } else {
      const phoneError = this.validatePhone(formData.emergencyContactPhone);
      if (phoneError) errors.emergencyContactPhone = phoneError;
    }

    if (!formData.emergencyContactRelationship) {
      errors.emergencyContactRelationship = 'La relación con el contacto de emergencia es requerida';
    }

    return errors;
  },

  // Validar campos condicionales del historial médico
  validateMedicalHistory(formData) {
    const errors = {};

    if (formData.hasDisease && !formData.diseaseName.trim()) {
      errors.diseaseName = 'Debe especificar la condición médica';
    }

    if (formData.hasInjury && !formData.injuryName.trim()) {
      errors.injuryName = 'Debe especificar la lesión';
    }

    if (formData.takesMedications && !formData.medicationsName.trim()) {
      errors.medicationsName = 'Debe especificar los medicamentos';
    }

    if (formData.hasAllergies && !formData.allergiesName.trim()) {
      errors.allergiesName = 'Debe especificar las alergias';
    }

    return errors;
  },

  // Validación completa del formulario
  validateClientsData(formData) {
    const errors = {};

    // Validar campos básicos
    const firstNameError = this.validateName(formData.firstName, 'Nombre');
    if (firstNameError) errors.firstName = firstNameError;

    const lastNameError = this.validateName(formData.lastName, 'Apellidos');
    if (lastNameError) errors.lastName = lastNameError;

    const emailError = this.validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const birthDateError = this.validateBirthDate(formData.birthDate);
    if (birthDateError) errors.birthDate = birthDateError;

    // Validar teléfono si se proporciona
    if (formData.phone) {
      const phoneError = this.validatePhone(formData.phone);
      if (phoneError) errors.phone = phoneError;
    }

    // Validar contacto de emergencia
    const emergencyContactErrors = this.validateEmergencyContact(formData);
    Object.assign(errors, emergencyContactErrors);

    // Validar historial médico
    const medicalHistoryErrors = this.validateMedicalHistory(formData);
    Object.assign(errors, medicalHistoryErrors);

    // Validar términos y condiciones
    const termsErrors = this.validateTerms(formData);
    Object.assign(errors, termsErrors);

    return errors;
  },

  // Validar campo individual
  validateField(field, value, formData = {}) {
    switch (field) {
      case 'firstName':
        return this.validateName(value, 'Nombre');
      case 'lastName':
        return this.validateName(value, 'Apellidos');
      case 'email':
        return this.validateEmail(value);
      case 'phone':
        return this.validatePhone(value);
      case 'birthDate':
        return this.validateBirthDate(value);
      case 'emergencyContactName':
        return this.validateName(value, 'Nombre del contacto de emergencia');
      case 'emergencyContactPhone':
        if (!value) return 'El teléfono del contacto de emergencia es requerido';
        return this.validatePhone(value);
      case 'emergencyContactRelationship':
        if (!value) return 'La relación con el contacto de emergencia es requerida';
        return null;
      case 'diseaseName':
        if (formData.hasDisease && !value?.trim()) {
          return 'Debe especificar la condición médica';
        }
        return null;
      case 'injuryName':
        if (formData.hasInjury && !value?.trim()) {
          return 'Debe especificar la lesión';
        }
        return null;
      case 'medicationsName':
        if (formData.takesMedications && !value?.trim()) {
          return 'Debe especificar los medicamentos';
        }
        return null;
      case 'allergiesName':
        if (formData.hasAllergies && !value?.trim()) {
          return 'Debe especificar las alergias';
        }
        return null;
      default:
        return null;
    }
  }
};