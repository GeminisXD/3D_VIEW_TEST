import Sidebar from '@/components/Sidebar';
import SceneCanvas from '@/components/3d/SceneCanvas';

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row h-screen bg-slate-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 h-full">
        <SceneCanvas />
      </div>
    </main>
  );
}