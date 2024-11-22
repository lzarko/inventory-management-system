import axios from 'axios';

const BASE_URL = 'http://localhost:8000/items';

export interface InventoryItem {
  id: string;
  type: string;
  description: string;
  added_at?: string;
  state: string;
  last_updated_at?: string;
}

export const fetchInventory = async (): Promise<InventoryItem[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addInventoryItem = async (item: Omit<InventoryItem, 'added_at' | 'last_updated_at'>): Promise<InventoryItem> => {
  const response = await axios.post(`${BASE_URL}/create/`, item, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateInventoryItem = async (id: string, item: InventoryItem): Promise<InventoryItem> => {
  const response = await axios.put(`${BASE_URL}/${id}/update/`, item);
  return response.data;
};

export const deleteInventoryItem = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}/delete/`);
};
