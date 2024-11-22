import React from 'react';
import { Button } from 'react-bootstrap';

interface InventoryItemProps {
  id: string;
  type: string;
  description: string;
  added_at?: string;
  state: string;
  last_updated_at?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({
  id,
  type,
  description,
  added_at,
  state,
  last_updated_at,
  onEdit,
  onDelete,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{type}</td>
      <td>{description}</td>
      <td>{added_at}</td>
      <td>{state}</td>
      <td>{last_updated_at}</td>
      <td>
        <Button variant="primary" onClick={() => onEdit(id)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default InventoryItem;
