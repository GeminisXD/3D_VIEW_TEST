'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';

export default function ProductModel() {
  const meshRef = useRef<Group | any>(null);
  const [hovered, setHovered] = useState(false);
  const { config, setColor } = useConfiguratorStore();

  // Carga el modelo desde la carpeta public/
  const { scene } = useGLTF('/model.glb');

  // Ajuste de materiales según la selección de Zustand
  const materialProps = {
    metal: { metalness: 0.9, roughness: 0.15 },
    plastic: { metalness: 0.1, roughness: 0.4 },
    leather: { metalness: 0.0, roughness: 0.8 },
  }[config.material];

  // Aplicar color y material a todas las mallas del modelo
  scene.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const mesh = child as Mesh;
      if (mesh.material) {
        const mat = mesh.material as MeshStandardMaterial;
        mat.color.set(config.color);
        mat.metalness = materialProps.metalness;
        mat.roughness = materialProps.roughness;
      }
    }
  });

  // Animaciones continuas de prueba
  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (config.activeAnimation === 'rotate-360') {
      meshRef.current.rotation.y += delta * 1.5;
    } else if (config.activeAnimation === 'bounce') {
      meshRef.current.position.y = Math.sin(Date.now() * 0.003) * 0.2;
    } else {
      meshRef.current.position.y = 0;
    }
  });

  // Lista de colores aleatorios para cuando el usuario hace clic directo en el 3D
  const quickColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  const handleModelClick = (e: any) => {
    e.stopPropagation(); // Evitar propagación del evento
    // Al hacer clic sobre el modelo, cambiamos a un color aleatorio
    const nextColor = quickColors[Math.floor(Math.random() * quickColors.length)];
    setColor(nextColor);
  };

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={hovered ? 1.05 : 1} // Efecto de micro-interacción al pasar el ratón
      position={[0, 0, 0]}
      onClick={handleModelClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

// Pre-cargar el modelo para mejorar el rendimiento
useGLTF.preload('/model.glb');