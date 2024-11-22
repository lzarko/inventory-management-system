import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { InventoryItem } from '../services/inventoryService';

interface ItemModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
  itemToEdit: InventoryItem | null;
}

const ItemModal: React.FC<ItemModalProps> = ({ show, onClose, onSave, itemToEdit }) => {
  const [formData, setFormData] = useState<Omit<InventoryItem, 'added_at' | 'last_updated_at'>>({
    id: '',
    type: 'computer_equipment',
    description: '',
    state: 'in_use',
  });

  useEffect(() => {
    if (itemToEdit) {
      const { added_at, last_updated_at, ...itemWithoutDates } = itemToEdit;
      setFormData(itemWithoutDates);
    } else {
      setFormData({
        id: '',
        type: 'computer_equipment',
        description: '',
        state: 'in_use',
      });
    }
  }, [itemToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement || e.target instanceof HTMLTextAreaElement) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{itemToEdit ? 'Edit Inventory Item' : 'Add New Inventory Item'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="computer_equipment">Computer Equipment</option>
              <option value="communication_equipment">Communication Equipment</option>
              <option value="machinery">Machinery</option>
              <option value="furniture">Furniture</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formState">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="in_use">In Use</option>
              <option value="lost">Lost</option>
              <option value="deprecated">Deprecated</option>
              <option value="broken">Broken</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModal;
