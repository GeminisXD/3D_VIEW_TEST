import { create } from 'zustand';
import { trackEvent } from '@/lib/analytics';

export interface ProductConfig {
  variant: string;
  color: string;
  material: 'metal' | 'plastic' | 'leather';
  activeAnimation: string;
}

interface ConfiguratorState {
  config: ProductConfig;
  setVariant: (variant: string) => void;
  setColor: (color: string) => void;
  setMaterial: (material: ProductConfig['material']) => void;
  setAnimation: (animation: string) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  config: {
    variant: 'Modelo Base',
    color: '#3b82f6',
    material: 'plastic',
    activeAnimation: 'idle',
  },
  setVariant: (variant) => set((state) => ({ config: { ...state.config, variant } })),
  setColor: (color) => {
    trackEvent('change_color', { color });
    set((state) => ({ config: { ...state.config, color } }));
  },
  setMaterial: (material) => {
    trackEvent('change_material', { material });
    set((state) => ({ config: { ...state.config, material } }));
  },
  setAnimation: (activeAnimation) => {
    trackEvent('change_animation', { animation: activeAnimation });
    set((state) => ({ config: { ...state.config, activeAnimation } }));
  },
}));