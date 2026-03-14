import { vi } from 'vitest';

export const initializeApp = vi.fn();
export const getFirestore = vi.fn(() => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
}));
