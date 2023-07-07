import React, { useState } from 'react';

const FormGenerator = () => {
  const [formFields, setFormFields] = useState([]);
  const [formErrors, setFormErrors] = useState([]);

  const addFormField = () => {
    setFormFields([...formFields, { type: '', label: '', options: [] }]);
  };

  const removeFormField = (index) => {
    const updatedFormFields = [...formFields];
    updatedFormFields.splice(index, 1);
    setFormFields(updatedFormFields);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index][field] = value;
    setFormFields(updatedFormFields);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index].options[optionIndex] = value;
    setFormFields(updatedFormFields);
  };

  const addOption = (index) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index].options.push('');
    setFormFields(updatedFormFields);
  };

  const removeOption = (index, optionIndex) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index].options.splice(optionIndex, 1);
    setFormFields(updatedFormFields);
  };

  const renderFormField = (field, index) => {
    switch (field.type) {
      case 'text':
        return (
          <div key={index}>
            <label>
              {field.label}:
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
              />
            </label>
            <button onClick={() => removeFormField(index)}>Remove</button>
          </div>
        );
      case 'dropdown':
        return (
          <div key={index}>
            <label>
              {field.label}:
              <select
                value={field.value}
                onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
              >
                {field.options && field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => removeFormField(index)}>Remove</button>
          </div>
        );
      case 'checkbox':
        return (
          <div key={index}>
            <label>
              <input
                type="checkbox"
                checked={field.checked}
                onChange={(e) => handleFieldChange(index, 'checked', e.target.checked)}
              />
              {field.label}
            </label>
            <button onClick={() => removeFormField(index)}>Remove</button>
          </div>
        );
      case 'radio':
        return (
          <div key={index}>
            <label>
              <input
                type="radio"
                checked={field.checked}
                onChange={(e) => handleFieldChange(index, 'checked', e.target.checked)}
              />
              {field.label}
            </label>
            <button onClick={() => removeFormField(index)}>Remove</button>
          </div>
        );
      default:
        return null;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = [];
    formFields.forEach((field, index) => {
      if (field.type === 'text' && field.value === '') {
        errors.push(`Value is required for field ${index + 1}`);
      }
    });
    setFormErrors(errors);
    if (errors.length === 0) {
      console.log('Form submitted successfully');
    }
  };

  const saveFormConfiguration = () => {
    const jsonData = JSON.stringify(formFields);
    console.log(jsonData);
  };

  return (
    <div>
      <h2>Form Generator</h2>
      <form onSubmit={handleFormSubmit}>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>
              Field Type:
              <select
                value={field.type}
                onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="text">Text Input</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio Button</option>
              </select>
            </label>
            <br />
            <label>
              Field Label:
              <input
                type="text"
                value={field.label}
                onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
              />
            </label>
            <br />
            {field.type === 'dropdown' && (
              <>
                <label>Options:</label>
                {field.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    />
                    <button onClick={() => removeOption(index, optionIndex)}>Remove</button>
                  </div>
                ))}
                <button onClick={() => addOption(index)}>Add Option</button>
              </>
            )}
            {renderFormField(field, index)}
            <hr />
          </div>
        ))}
        <button type="button" onClick={addFormField}>
          Add Field
        </button>
        <button type="submit">Submit</button>
        <button type="button" onClick={saveFormConfiguration}>
          Save Configuration
        </button>

        {formErrors.map((error, index) => (
          <div key={index} className="error">{error}</div>
        ))}
      </form>
    </div>
  );
};

export default FormGenerator;

