'use client';

import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import ProductModel from './ProductModel';

function Loader() {
  return (
    <Html center>
      <div className="flex items-center gap-2 text-white bg-slate-900/80 px-4 py-2 rounded-lg backdrop-blur border border-slate-800">
        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-medium">Cargando modelo 3D...</span>
      </div>
    </Html>
  );
}

// Componente helper para capturar el buffer del canvas
function SnapshotHandler() {
  const { gl } = useThree();

  useEffect(() => {
    const handleSnapshot = () => {
      const dataUrl = gl.domElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `configuracion-3d-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    };

    window.addEventListener('take-snapshot', handleSnapshot);
    return () => window.removeEventListener('take-snapshot', handleSnapshot);
  }, [gl]);

  return null;
}

export default function SceneCanvas() {
  return (
    <div className="w-full h-full relative bg-slate-950 cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
        gl={{ preserveDrawingBuffer: true }} // Necesario para toDataURL()
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />

        <Suspense fallback={<Loader />}>
          <ProductModel />
        </Suspense>

        <ContactShadows position={[0, -1.2, 0]} opacity={0.6} scale={10} blur={1.5} far={4} />
        <Environment preset="city" />

        <OrbitControls makeDefault enablePan={false} minDistance={1.5} maxDistance={8} />
        <SnapshotHandler />
      </Canvas>
    </div>
  );
}