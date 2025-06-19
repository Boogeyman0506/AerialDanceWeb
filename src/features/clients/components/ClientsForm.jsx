import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from 'primereact/calendar';
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";

export const ClientsForm = ({ cliente = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    // Personal data
    firstName: cliente?.firstName || '',
    lastName: cliente?.lastName || '',
    birthDate: cliente?.birthDate || null,
    age: cliente?.age || '',
    phone: cliente?.phone || null,
    email: cliente?.email || '',

    // Address
    state: cliente?.state || 'Nuevo León',
    city: cliente?.city || 'Monterrey',
    neighborhood: cliente?.neighborhood || '',
    street: cliente?.street || '',
    zipCode: cliente?.zipCode || '',

    // Emergency contact
    emergencyContactName: cliente?.emergencyContactName || '',
    emergencyContactPhone: cliente?.emergencyContactPhone || '',
    emergencyContactRelationship: cliente?.emergencyContactRelationship || null,

    // Medical history
    hasDisease: cliente?.hasDisease || false,
    diseaseName: cliente?.diseaseName || '',
    hasInjury: cliente?.hasInjury || false,
    injuryName: cliente?.injuryName || '',
    takesMedications: cliente?.takesMedications || false,
    medicationsName: cliente?.medicationsName || '',
    hasAllergies: cliente?.hasAllergies || false,
    allergiesName: cliente?.allergiesName || '',
    medicalObservations: cliente?.medicalObservations || '',

    // Class information
    howDidYouHear: cliente?.howDidYouHear || '',
    endOfClass: cliente?.endOfClass || '',
    classLevel: cliente?.classLevel || '',

    // Terms and conditions
    acceptsRegulations: cliente?.acceptsRegulations || false,
    acceptsResponsibility: cliente?.acceptsResponsibility || false,
    acceptsPrivacy: cliente?.acceptsPrivacy || false,
    signed: cliente?.signed || false,
  });

  const relationshipOptions = [
    { name: 'Padre', code: 'father' },
    { name: 'Madre', code: 'mother' },
    { name: 'Abuelo', code: 'grandfather' },
    { name: 'Abuela', code: 'grandmother' },
    { name: 'Hermano', code: 'brother' },
    { name: 'Hermana', code: 'sister' },
    { name: 'Tío', code: 'uncle' },
    { name: 'Tía', code: 'aunt' },
    { name: 'Primo', code: 'cousin' },
    { name: 'Otro', code: 'other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Calcular edad automáticamente cuando cambia la fecha de nacimiento
    if (field === 'birthDate' && value) {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      setFormData(prev => ({
        ...prev,
        age: age.toString()
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditing = !!cliente;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex mb-4">
        <Card className="w-full">
          <div className="text-center">
            <div className="text-4xl font-bold">Zenith</div>
            <div className="text-xl">Academia de danza aérea</div>
            <div className="mt-2">
              {isEditing ? 'Editar Cliente' : 'Registro de Nuevo Cliente'}
            </div>
          </div>
        </Card>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Datos del alumno */}
        <Card className="mb-4">
          <div className="">
            <span className="text-lg font-semibold">Datos del Alumno</span>
            <hr className="mb-5" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputText
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full"
                    required
                  />
                  <label htmlFor="firstName">Nombre(s)</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputText
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full"
                    required
                  />
                  <label htmlFor="lastName">Apellido(s)</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <Calendar
                    inputId="birthDate"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.value)}
                    dateFormat="dd/mm/yy"
                    className="w-full"
                  />
                  <label htmlFor="birthDate">Fecha de nacimiento</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputText
                    id="age"
                    disabled
                    value={formData.age}
                    className="w-full"
                  />
                  <label htmlFor="age">Edad</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputNumber
                    id="phone"
                    value={formData.phone}
                    onValueChange={(e) => handleInputChange('phone', e.value)}
                    useGrouping={false}
                    className="w-full"
                  />
                  <label htmlFor="phone">Teléfono</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputText
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full"
                    required
                  />
                  <label htmlFor="email">E-mail</label>
                </FloatLabel>
              </div>
            </div>
          </div>
        </Card>

        {/* Dirección */}
        <Card className="mb-4">
          <div className="">
            <span className="text-lg font-semibold">Dirección</span>
            <hr className="mb-5" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputText
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full"
                  />
                  <label htmlFor="state">Estado</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputText
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full"
                  />
                  <label htmlFor="city">Ciudad</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputText
                    id="neighborhood"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    className="w-full"
                  />
                  <label htmlFor="neighborhood">Colonia</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center md:col-span-2">
                <FloatLabel>
                  <InputText
                    id="street"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    className="w-full"
                  />
                  <label htmlFor="street">Calle y número</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputText
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full"
                  />
                  <label htmlFor="zipCode">Código postal</label>
                </FloatLabel>
              </div>
            </div>
          </div>
        </Card>

        {/* Contacto de emergencia */}
        <Card className="mb-4">
          <div className="">
            <span className="text-lg font-semibold">Contacto de Emergencia</span>
            <hr className="mb-5" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputText
                    id="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                    className="w-full"
                    required
                  />
                  <label htmlFor="emergencyContactName">Nombre completo</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <InputNumber
                    id="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onValueChange={(e) => handleInputChange('emergencyContactPhone', e.value)}
                    useGrouping={false}
                    className="w-full"
                    required
                  />
                  <label htmlFor="emergencyContactPhone">Teléfono</label>
                </FloatLabel>
              </div>

              <div className="flex align-items-center justify-content-center">
                <FloatLabel>
                  <Dropdown
                    id="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={(e) => handleInputChange('emergencyContactRelationship', e.value)}
                    options={relationshipOptions}
                    optionLabel="name"
                    className="w-full"
                  />
                  <label htmlFor="emergencyContactRelationship">Relación</label>
                </FloatLabel>
              </div>
            </div>
          </div>
        </Card>

        {/* Historial médico */}
        <Card className="mb-4">
          <div className="">
            <span className="text-lg font-semibold">Historial Médico</span>
            <hr className="mb-5" />

            {/* Enfermedades */}
            <div className="mb-4">
              <div className="flex align-items-center justify-content-between mb-3">
                <label>¿Padece de alguna condición médica relevante (asma, diabetes, problemas cardíacos, etc.)?</label>
                <InputSwitch
                  checked={formData.hasDisease}
                  onChange={(e) => handleInputChange('hasDisease', e.value)}
                />
              </div>
              {formData.hasDisease && (
                <FloatLabel>
                  <InputText
                    id="diseaseName"
                    value={formData.diseaseName}
                    onChange={(e) => handleInputChange('diseaseName', e.target.value)}
                    className="w-full"
                  />
                  <label htmlFor="diseaseName">En caso afirmativo, especificar.</label>
                </FloatLabel>
              )}
            </div>

            {/* Lesiones */}
            <div className="mb-4">
              <div className="flex align-items-center justify-content-between mb-3">
                <label>¿Ha tenido alguna lesión reciente o crónica (esguinces, fracturas, etc.)?</label>
                <InputSwitch
                  checked={formData.hasInjury}
                  onChange={(e) => handleInputChange('hasInjury', e.value)}
                />
              </div>
              {formData.hasInjury && (
                <FloatLabel>
                  <InputText
                    id="injuryName"
                    value={formData.injuryName}
                    onChange={(e) => handleInputChange('injuryName', e.target.value)}
                    className="w-full"
                  />
                  <label htmlFor="injuryName">En caso afirmativo, especificar.</label>
                </FloatLabel>
              )}
            </div>

            {/* Medicamentos */}
            <div className="mb-4">
              <div className="flex align-items-center justify-content-between mb-3">
                <label>Medicamentos que esté tomando actualmente:</label>
                <InputSwitch
                  checked={formData.takesMedications}
                  onChange={(e) => handleInputChange('takesMedications', e.value)}
                />
              </div>
              {formData.takesMedications && (
                <FloatLabel>
                  <InputText
                    id="medicationsName"
                    value={formData.medicationsName}
                    onChange={(e) => handleInputChange('medicationsName', e.target.value)}
                    className="w-full"
                  />
                  <label htmlFor="medicationsName">En caso afirmativo, especificar.</label>
                </FloatLabel>
              )}
            </div>

            {/* Alergias */}
            <div className="mb-4">
              <div className="flex align-items-center justify-content-between mb-3">
                <label>¿Tiene el estudiante alguna alergia (medicamentos, alimentos, etc.)?</label>
                <InputSwitch
                  checked={formData.hasAllergies}
                  onChange={(e) => handleInputChange('hasAllergies', e.value)}
                />
              </div>
              {formData.hasAllergies && (
                <FloatLabel>
                  <InputText
                    id="allergiesName"
                    value={formData.allergiesName}
                    onChange={(e) => handleInputChange('allergiesName', e.target.value)}
                    className="w-full"
                  />
                  <label htmlFor="allergiesName">En caso afirmativo, especificar.</label>
                </FloatLabel>
              )}
            </div>

            <div className="flex align-items-center justify-content-center">
              <FloatLabel>
                <InputTextarea
                  id="medicalObservations"
                  value={formData.medicalObservations}
                  onChange={(e) => handleInputChange('medicalObservations', e.target.value)}
                  rows={3}
                  className="w-full"
                />
                <label htmlFor="medicalObservations">Observaciones adicionales que consideren importantes para su bienestar en la academia:</label>
              </FloatLabel>
            </div>
          </div>
        </Card>

        {/* Información de la clase */}
        <Card className="mb-4">
          <div className="">
            <span className="text-lg font-semibold">Clase</span>
            <hr className="mb-5" />

            {/* Cómo se enteró */}
            <div className="mb-4">
              <label className="font-semibold mb-3 block">¿Cómo te enteraste de nosotros?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="social-media"
                    name="howDidYouHear"
                    value="social-media"
                    onChange={(e) => handleInputChange('howDidYouHear', e.value)}
                    checked={formData.howDidYouHear === 'social-media'}
                  />
                  <label htmlFor="social-media" className="ml-2">Redes sociales</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="friends-family"
                    name="howDidYouHear"
                    value="friends-family"
                    onChange={(e) => handleInputChange('howDidYouHear', e.value)}
                    checked={formData.howDidYouHear === 'friends-family'}
                  />
                  <label htmlFor="friends-family" className="ml-2">Amigos/Familiar</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="advertisement"
                    name="howDidYouHear"
                    value="advertisement"
                    onChange={(e) => handleInputChange('howDidYouHear', e.value)}
                    checked={formData.howDidYouHear === 'advertisement'}
                  />
                  <label htmlFor="advertisement" className="ml-2">Anuncio</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="walked-by"
                    name="howDidYouHear"
                    value="walked-by"
                    onChange={(e) => handleInputChange('howDidYouHear', e.value)}
                    checked={formData.howDidYouHear === 'walked-by'}
                  />
                  <label htmlFor="walked-by" className="ml-2">Pasé por aquí</label>
                </div>
              </div>
            </div>

            {/* Al finalizar clase */}
            <div className="mb-4">
              <label className="font-semibold mb-3 block">Al finalizar la clase</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="someone-picks-up"
                    name="endOfClass"
                    value="someone-picks-up"
                    onChange={(e) => handleInputChange('endOfClass', e.value)}
                    checked={formData.endOfClass === 'someone-picks-up'}
                  />
                  <label htmlFor="someone-picks-up" className="ml-2">Alguien debe recoger al alumno</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="leaves-alone"
                    name="endOfClass"
                    value="leaves-alone"
                    onChange={(e) => handleInputChange('endOfClass', e.value)}
                    checked={formData.endOfClass === 'leaves-alone'}
                  />
                  <label htmlFor="leaves-alone" className="ml-2">El alumno puede retirarse solo</label>
                </div>
              </div>
            </div>

            {/* Nivel de clase */}
            <div className="mb-4">
              <label className="font-semibold mb-3 block">Clase a la que desea pertenecer:</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="adults"
                    name="classLevel"
                    value="adults"
                    onChange={(e) => handleInputChange('classLevel', e.value)}
                    checked={formData.classLevel === 'adults'}
                  />
                  <label htmlFor="adults" className="ml-2">Adultos</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="kids-beginner"
                    name="classLevel"
                    value="kids-beginner"
                    onChange={(e) => handleInputChange('classLevel', e.value)}
                    checked={formData.classLevel === 'kids-beginner'}
                  />
                  <label htmlFor="kids-beginner" className="ml-2">Niños "principiantes"</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="kids-intermediate"
                    name="classLevel"
                    value="kids-intermediate"
                    onChange={(e) => handleInputChange('classLevel', e.value)}
                    checked={formData.classLevel === 'kids-intermediate'}
                  />
                  <label htmlFor="kids-intermediate" className="ml-2">Niños "intermedio"</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="kids-advanced"
                    name="classLevel"
                    value="kids-advanced"
                    onChange={(e) => handleInputChange('classLevel', e.value)}
                    checked={formData.classLevel === 'kids-advanced'}
                  />
                  <label htmlFor="kids-advanced" className="ml-2">Niños "avanzado"</label>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Términos y condiciones */}
        <Card className="mb-4">
          <div className="p-4">
            <span className="text-lg font-semibold">Términos y Condiciones</span>
            <hr className="mb-5" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex align-items-center">
                <Checkbox
                  inputId="regulations"
                  checked={formData.acceptsRegulations}
                  onChange={(e) => handleInputChange('acceptsRegulations', e.checked)}
                />
                <label htmlFor="regulations" className="ml-2">Aceptación de Reglamento Interno</label>
              </div>

              <div className="flex align-items-center">
                <Checkbox
                  inputId="responsibility"
                  checked={formData.acceptsResponsibility}
                  onChange={(e) => handleInputChange('acceptsResponsibility', e.checked)}
                />
                <label htmlFor="responsibility" className="ml-2">Liberación de Responsabilidad</label>
              </div>

              <div className="flex align-items-center">
                <Checkbox
                  inputId="privacy"
                  checked={formData.acceptsPrivacy}
                  onChange={(e) => handleInputChange('acceptsPrivacy', e.checked)}
                />
                <label htmlFor="privacy" className="ml-2">Política de Privacidad</label>
              </div>

              <div className="flex align-items-center">
                <Checkbox
                  inputId="signature"
                  checked={formData.signed}
                  onChange={(e) => handleInputChange('signed', e.checked)}
                />
                <label htmlFor="signature" className="ml-2">Firma del Estudiante/Padre/Tutor</label>
              </div>
            </div>
          </div>
        </Card>

        {/* Botones de acción */}
        <div className="flex justify-content-end gap-2 mt-4">
          <Button
            type="button"
            label="Cancelar"
            icon="pi pi-times"
            severity="secondary"
            onClick={onCancel}
          />
          <Button
            type="submit"
            label={isEditing ? 'Actualizar Cliente' : 'Registrar Cliente'}
            icon="pi pi-check"
          />
        </div>
      </form>
    </div>
  );
};
