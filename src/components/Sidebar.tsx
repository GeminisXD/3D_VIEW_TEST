'use client';

import { useState } from 'react';
import { useConfiguratorStore, ProductConfig } from '@/store/useConfiguratorStore';
import { Palette, Layers, PlayCircle, Sparkles, Camera, Upload, Menu, X } from 'lucide-react';

const COLORS = [
  { name: 'Azul Eléctrico', hex: '#3b82f6' },
  { name: 'Rojo Carmín', hex: '#ef4444' },
  { name: 'Verde Esmeralda', hex: '#10b981' },
  { name: 'Negro Mate', hex: '#18181b' },
];

const MATERIALS: ProductConfig['material'][] = ['plastic', 'metal', 'leather'];
const ANIMATIONS = ['idle', 'rotate-360', 'bounce'];

export default function Sidebar() {
  const { config, setColor, setMaterial, setAnimation, setCustomModelUrl } = useConfiguratorStore();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomModelUrl(url);
    }
  };

  const handleTakeSnapshot = () => {
    window.dispatchEvent(new CustomEvent('take-snapshot'));
  };

  return (
    <>
      {/* Botón Flotante para Abrir Menú en Móviles */}
      <button
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-slate-900/90 text-white border border-slate-700 rounded-full shadow-lg backdrop-blur"
      >
        {isOpenMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar Adaptable (Panel lateral en Desktop, Bottom/Drawer en Móviles) */}
      <aside
        className={`fixed md:relative z-40 top-0 left-0 h-screen w-full md:w-80 bg-slate-900/95 backdrop-blur-md text-white p-6 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6 overflow-y-auto max-h-[80vh] md:max-h-none">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Configurador 3D
            </h1>
            <p className="text-xs text-slate-400 mt-1">Personaliza tu producto en tiempo real</p>
          </div>

          {/* Cargar Modelo Personalizado */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Upload className="w-4 h-4" /> Cargar Modelo 3D
            </label>
            <label className="flex items-center justify-center w-full p-2 bg-slate-800 hover:bg-slate-700 border border-dashed border-slate-600 rounded-lg cursor-pointer text-xs text-slate-300 transition-colors">
              <span>Seleccionar archivo .glb / .gltf</span>
              <input type="file" accept=".glb,.gltf" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {/* Selectores de Color */}
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

          {/* Materiales */}
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

          {/* Animaciones */}
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

        {/* Botón Captura */}
        <button
          onClick={handleTakeSnapshot}
          className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
        >
          <Camera className="w-4 h-4" /> Exportar Captura HD
        </button>
      </aside>
    </>
  );
}