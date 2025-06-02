'use client';

import { ReactFlowProvider } from 'reactflow';
import PipelineEditor from './components/PipelineEditor';

export default function Home() {
  return (
    <ReactFlowProvider>
      <main className="flex min-h-screen flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Pointy Pipeline Editor</h1>
        <div className="w-full flex-1 border border-gray-200 rounded-lg">
          <PipelineEditor />
        </div>
      </main>
    </ReactFlowProvider>
  );
}
