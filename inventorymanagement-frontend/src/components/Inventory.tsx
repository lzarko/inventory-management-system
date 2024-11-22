import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { InventoryItem } from '../services/inventoryService'; 
import InventoryItemComponent from './InventoryItem'; 
import ItemModal from './ItemModal'; 
import { fetchInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } from '../services/inventoryService';

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<InventoryItem | null>(null);

  useEffect(() => {
    fetchInventory().then(setInventory);
  }, []);

  const handleEdit = (id: string) => {
    const item = inventory.find((i) => i.id === id);
    if (item) {
      setItemToEdit(item);
      setShowModal(true);
    }
  };

  const handleDelete = (id: string) => {
    deleteInventoryItem(id).then(() => {
      setInventory(inventory.filter((item) => item.id !== id));
      setItemToEdit(null); 
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setItemToEdit(null);
  };

  const handleSave = (item: Omit<InventoryItem, 'added_at' | 'last_updated_at'>) => {
    if (item.id) {
      updateInventoryItem(item.id, item).then((updatedItem) => {
        setInventory(inventory.map((i) => (i.id === updatedItem.id ? updatedItem : i)));
      });
    } else {
      addInventoryItem(item).then((newItem) => {
        setInventory([...inventory, newItem]);
      });
    }
    handleCloseModal();
    setItemToEdit(null);
  };
  

  return (
    <div>
      <Button variant="primary" onClick={() => {
        setItemToEdit(null)
        setShowModal(true)}}>
        Add New Item
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>Added At</th>
            <th>State</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <InventoryItemComponent
              key={item.id}
              {...item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>

      <ItemModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        itemToEdit={itemToEdit}
      />
    </div>
  );
};

export default Inventory;
