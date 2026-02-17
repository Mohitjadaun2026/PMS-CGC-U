import React, { useState, useEffect } from 'react';
import './DynamicFormFieldBuilder.css';
import { GripVertical, Trash2, Plus, Copy } from 'lucide-react';

const PREDEFINED_FIELDS = [
  { fieldId: 'name', fieldName: 'Full Name', fieldType: 'text', isRequired: true, isPredefined: true },
  { fieldId: 'email', fieldName: 'Email', fieldType: 'email', isRequired: true, isPredefined: true },
  { fieldId: 'phone', fieldName: 'Phone Number', fieldType: 'phone', isRequired: false, isPredefined: true },
  { fieldId: 'cgpa', fieldName: 'CGPA', fieldType: 'number', isRequired: false, isPredefined: true },
  { fieldId: 'branch', fieldName: 'Branch', fieldType: 'select', isRequired: true, isPredefined: true, options: ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE', 'AIML', 'DS'] },
  { fieldId: 'resume', fieldName: 'Resume Upload', fieldType: 'file', isRequired: false, isPredefined: true }
];

const FIELD_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'number', label: 'Number' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'select', label: 'Dropdown' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio Button' },
  { value: 'date', label: 'Date' },
  { value: 'file', label: 'File Upload' }
];

const DynamicFormFieldBuilder = ({ fields = [], initialFields = [], onChange }) => {
  // Support both 'fields' and 'initialFields' props for flexibility
  const initialData = initialFields && initialFields.length > 0 ? initialFields : fields;
  
  const [fields_state, setFields] = useState(initialData.length > 0 ? initialData : PREDEFINED_FIELDS.map(f => ({ ...f, order: PREDEFINED_FIELDS.indexOf(f) })));
  const [selectedField, setSelectedField] = useState(null);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customFieldData, setCustomFieldData] = useState({
    fieldName: '',
    fieldType: 'text',
    isRequired: true,  // 🔧 Changed from false to true - fields required by default!
    placeholder: '',
    helpText: '',
    options: ''
  });

  // Debug logging
  console.log('DynamicFormFieldBuilder initialized with:', {
    propsFields: fields.length,
    propsInitialFields: initialFields.length,
    stateFields: fields_state.length
  });

  // Update parent component when fields change
  const updateParent = (newFields) => {
    if (onChange) {
      console.log('📤 Calling onChange callback with', newFields.length, 'fields');
      //Sort by order
      const sorted = newFields.sort((a, b) => (a.order || 0) - (b.order || 0));
      console.log('   Sorted fields:', sorted.map(f => f.fieldName));
      onChange(sorted);
    } else {
      console.warn('⚠️ onChange callback not provided!');
    }
  };

  // Watch for changes in initialFields prop (e.g., when editing a job)
  useEffect(() => {
    if (initialFields && initialFields.length > 0) {
      console.log('✅ Updating fields from initialFields prop:', initialFields);
      setFields(initialFields);
      updateParent(initialFields); // 🔧 IMPORTANT: Tell parent about these fields
    }
  }, [initialFields, onChange]);

  // On component mount, tell parent about initial predefined fields
  useEffect(() => {
    console.log('🎯 Component mounted, initial fields_state count:', fields_state.length);
    if (fields_state.length > 0 && !initialFields?.length) {
      console.log('📤 Sending initial predefined fields to parent');
      updateParent(fields_state);
    }
  }, []); // Only on mount


  const handleAddCustomField = () => {
    if (!customFieldData.fieldName) {
      alert('Please enter field name');
      return;
    }

    const newField = {
      fieldId: `custom-${Date.now()}`,
      fieldName: customFieldData.fieldName,
      fieldType: customFieldData.fieldType,
      isRequired: customFieldData.isRequired,
      isPredefined: false,
      placeholder: customFieldData.placeholder,
      helpText: customFieldData.helpText,
      options: customFieldData.fieldType === 'select' || customFieldData.fieldType === 'radio' || customFieldData.fieldType === 'checkbox'
        ? customFieldData.options.split(',').map(s => s.trim()).filter(s => s)
        : [],
      order: fields_state.length
    };

    const newFields = [...fields_state, newField];
    setFields(newFields);
    updateParent(newFields);

    // Reset form
    setCustomFieldData({
      fieldName: '',
      fieldType: 'text',
      isRequired: false,
      placeholder: '',
      helpText: '',
      options: ''
    });
    setShowAddCustom(false);
  };

  const handleDeleteField = (fieldId) => {
    if (PREDEFINED_FIELDS.some(f => f.fieldId === fieldId)) {
      alert('Cannot delete predefined fields');
      return;
    }

    const newFields = fields_state.filter(f => f.fieldId !== fieldId);
    setFields(newFields);
    updateParent(newFields);
    if (selectedField?.fieldId === fieldId) {
      setSelectedField(null);
    }
  };

  const handleEditField = (field) => {
    if (field.isPredefined) {
      alert('Cannot edit predefined fields');
      return;
    }
    setSelectedField(field);
  };

  const handleUpdateField = (updates) => {
    const newFields = fields_state.map(f =>
      f.fieldId === selectedField.fieldId ? { ...f, ...updates } : f
    );
    setFields(newFields);
    updateParent(newFields);
    setSelectedField(null);
  };

  const handleReorderFields = (fromIndex, toIndex) => {
    const newFields = [...fields_state];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    
    // Update order values
    const updatedFields = newFields.map((f, idx) => ({ ...f, order: idx }));
    setFields(updatedFields);
    updateParent(updatedFields);
  };

  const toggleRequired = (fieldId) => {
    const newFields = fields_state.map(f =>
      f.fieldId === fieldId ? { ...f, isRequired: !f.isRequired } : f
    );
    setFields(newFields);
    updateParent(newFields);
  };

  return (
    <div className="form-field-builder">
      <div className="builder-header">
        <h3>Application Form Fields</h3>
        <p className="builder-subtitle">Customize the fields that students must fill when applying</p>
      </div>

      {/* Fields List */}
      <div className="fields-list">
        {fields_state.map((field, index) => (
          <div 
            key={field.fieldId} 
            className={`field-item ${field.isPredefined ? 'predefined' : 'custom'} ${selectedField?.fieldId === field.fieldId ? 'selected' : ''}`}
            onClick={() => !field.isPredefined && handleEditField(field)}
          >
            <div className="field-item-header">
              <div className="field-grip">
                <GripVertical size={16} />
              </div>

              <div className="field-info">
                <h4 className="field-name">
                  {field.fieldName}
                  {field.isPredefined && <span className="badge-predefined">Predefined</span>}
                </h4>
                <p className="field-type">{FIELD_TYPES.find(t => t.value === field.fieldType)?.label || field.fieldType}</p>
              </div>

              <div className="field-actions">
                <label className="required-toggle" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={field.isRequired}
                    onChange={() => toggleRequired(field.fieldId)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className={field.isRequired ? 'checked' : ''}>Required</span>
                </label>

                {!field.isPredefined && (
                  <>
                    <button
                      className="btn-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditField(field);
                      }}
                      title="Edit field"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteField(field.fieldId);
                      }}
                      title="Delete field"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Field Preview */}
            {selectedField?.fieldId === field.fieldId && !field.isPredefined && (
              <FieldEditPanel
                field={selectedField}
                onUpdate={handleUpdateField}
                onCancel={() => setSelectedField(null)}
                fieldTypes={FIELD_TYPES}
              />
            )}
          </div>
        ))}
      </div>

      {/* Add Custom Field Section */}
      <div className="add-field-section">
        <button
          className="btn-add-field"
          onClick={() => setShowAddCustom(!showAddCustom)}
        >
          <Plus size={18} />
          Add Custom Field
        </button>

        {showAddCustom && (
          <div className="custom-field-form">
            <div className="form-group">
              <label>Field Name *</label>
              <input
                type="text"
                placeholder="e.g., GitHub Profile, Write-Up, etc."
                value={customFieldData.fieldName}
                onChange={(e) => setCustomFieldData({ ...customFieldData, fieldName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Field Type *</label>
              <select
                value={customFieldData.fieldType}
                onChange={(e) => setCustomFieldData({ ...customFieldData, fieldType: e.target.value })}
              >
                {FIELD_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Placeholder</label>
              <input
                type="text"
                placeholder="Optional helper text in the field"
                value={customFieldData.placeholder}
                onChange={(e) => setCustomFieldData({ ...customFieldData, placeholder: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Help Text</label>
              <input
                type="text"
                placeholder="Optional hint shown below the field"
                value={customFieldData.helpText}
                onChange={(e) => setCustomFieldData({ ...customFieldData, helpText: e.target.value })}
              />
            </div>

            {(customFieldData.fieldType === 'select' || customFieldData.fieldType === 'radio' || customFieldData.fieldType === 'checkbox') && (
              <div className="form-group">
                <label>Options (comma-separated) *</label>
                <input
                  type="text"
                  placeholder="e.g., Option 1, Option 2, Option 3"
                  value={customFieldData.options}
                  onChange={(e) => setCustomFieldData({ ...customFieldData, options: e.target.value })}
                />
              </div>
            )}

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={customFieldData.isRequired}
                  onChange={(e) => setCustomFieldData({ ...customFieldData, isRequired: e.target.checked })}
                />
                Make this field required
              </label>
            </div>

            <div className="form-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowAddCustom(false)}
              >
                Cancel
              </button>
              <button
                className="btn-add"
                onClick={handleAddCustomField}
              >
                Add Field
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="info-box">
        <h4>ℹ️ Tips for Building Forms</h4>
        <ul>
          <li>Predefined fields (Name, Email, etc.) cannot be removed or edited</li>
          <li>Mark fields as required if they are essential for the application</li>
          <li>Use clear and descriptive field names</li>
          <li>For dropdowns, checkboxes, and radio buttons, enter options separated by commas</li>
          <li>Help text appears below the field to guide applicants</li>
        </ul>
      </div>
    </div>
  );
};

// Edit Panel Component
const FieldEditPanel = ({ field, onUpdate, onCancel, fieldTypes }) => {
  const [editData, setEditData] = useState({ ...field });

  const handleSave = () => {
    const updates = {
      fieldName: editData.fieldName,
      fieldType: editData.fieldType,
      placeholder: editData.placeholder,
      helpText: editData.helpText
    };

    if (editData.fieldType === 'select' || editData.fieldType === 'radio' || editData.fieldType === 'checkbox') {
      updates.options = editData.options;
    }

    onUpdate(updates);
  };

  return (
    <div className="field-edit-panel">
      <div className="panel-content">
        <div className="edit-group">
          <label>Field Name</label>
          <input
            type="text"
            value={editData.fieldName}
            onChange={(e) => setEditData({ ...editData, fieldName: e.target.value })}
          />
        </div>

        <div className="edit-group">
          <label>Field Type</label>
          <select
            value={editData.fieldType}
            onChange={(e) => setEditData({ ...editData, fieldType: e.target.value })}
          >
            {fieldTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="edit-group">
          <label>Placeholder</label>
          <input
            type="text"
            value={editData.placeholder || ''}
            onChange={(e) => setEditData({ ...editData, placeholder: e.target.value })}
          />
        </div>

        <div className="edit-group">
          <label>Help Text</label>
          <input
            type="text"
            value={editData.helpText || ''}
            onChange={(e) => setEditData({ ...editData, helpText: e.target.value })}
          />
        </div>

        {(editData.fieldType === 'select' || editData.fieldType === 'radio' || editData.fieldType === 'checkbox') && (
          <div className="edit-group">
            <label>Options (comma-separated)</label>
            <input
              type="text"
              value={Array.isArray(editData.options) ? editData.options.join(', ') : editData.options}
              onChange={(e) => setEditData({ ...editData, options: e.target.value.split(',').map(s => s.trim()) })}
            />
          </div>
        )}

        <div className="edit-actions">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn-save" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default DynamicFormFieldBuilder;
