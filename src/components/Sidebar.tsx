'use client';

import { useConfiguratorStore, ProductConfig } from '@/store/useConfiguratorStore';
import { Palette, Layers, PlayCircle, Sparkles, Camera } from 'lucide-react';

const COLORS = [
  { name: 'Azul Eléctrico', hex: '#3b82f6' },
  { name: 'Rojo Carmín', hex: '#ef4444' },
  { name: 'Verde Esmeralda', hex: '#10b981' },
  { name: 'Negro Mate', hex: '#18181b' },
];

const MATERIALS: ProductConfig['material'][] = ['plastic', 'metal', 'leather'];
const ANIMATIONS = ['idle', 'rotate-360', 'bounce'];

export default function Sidebar() {
  const { config, setColor, setMaterial, setAnimation } = useConfiguratorStore();

  const handleTakeSnapshot = () => {
    // Dispara un evento global que escuchará el Canvas 3D
    window.dispatchEvent(new CustomEvent('take-snapshot'));
  };

  return (
    <aside className="w-full md:w-80 bg-slate-900/80 backdrop-blur-md text-white p-6 flex flex-col justify-between border-r border-slate-800 h-screen">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Configurador 3D
          </h1>
          <p className="text-xs text-slate-400 mt-1">Personaliza tu producto en tiempo real</p>
        </div>

        {/* Selector de Color */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Palette className="w-4 h-4" /> Color
          </label>
          <div className="flex gap-3">
            {COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c.hex)}
                style={{ backgroundColor: c.hex }}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  config.color === c.hex ? 'border-white scale-110' : 'border-transparent'
                }`}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Selector de Material */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Material
          </label>
          <div className="grid grid-cols-3 gap-2">
            {MATERIALS.map((m) => (
              <button
                key={m}
                onClick={() => setMaterial(m)}
                className={`py-2 px-3 text-xs capitalize rounded-lg border transition-all ${
                  config.material === m
                    ? 'bg-blue-600 border-blue-400 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Animaciones */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <PlayCircle className="w-4 h-4" /> Animación
          </label>
          <div className="flex flex-col gap-2">
            {ANIMATIONS.map((anim) => (
              <button
                key={anim}
                onClick={() => setAnimation(anim)}
                className={`py-2 px-3 text-xs capitalize text-left rounded-lg border transition-all ${
                  config.activeAnimation === anim
                    ? 'bg-slate-800 border-blue-500 text-blue-400 font-medium'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {anim}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botón de Captura UI/UX */}
      <button
        onClick={handleTakeSnapshot}
        className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <Camera className="w-4 h-4" /> Exportar Captura HD
      </button>
    </aside>
  );
}