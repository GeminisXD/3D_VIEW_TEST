import { create } from 'zustand';

export interface ProductConfig {
  variant: string;
  color: string;
  material: 'metal' | 'plastic' | 'leather';
  activeAnimation: string;
  customModelUrl: string | null; // Nueva propiedad
}

interface ConfiguratorState {
  config: ProductConfig;
  setColor: (color: string) => void;
  setMaterial: (material: ProductConfig['material']) => void;
  setAnimation: (animation: string) => void;
  setCustomModelUrl: (url: string) => void; // Nueva función
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  config: {
    variant: 'Modelo Base',
    color: '#3b82f6',
    material: 'plastic',
    activeAnimation: 'idle',
    customModelUrl: null,
  },
  setColor: (color) => set((state) => ({ config: { ...state.config, color } })),
  setMaterial: (material) => set((state) => ({ config: { ...state.config, material } })),
  setAnimation: (activeAnimation) => set((state) => ({ config: { ...state.config, activeAnimation } })),
  setCustomModelUrl: (customModelUrl) => set((state) => ({ config: { ...state.config, customModelUrl } })),
}));