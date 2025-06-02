import { useCallback, useEffect, useState } from 'react';
import { PipelineNode, PipelineEdge, Pipeline, PipelineConfig } from '../types/pipeline';

const STORAGE_KEY = 'pipeline-state';

const defaultConfig: PipelineConfig = {
  name: '',
  fields: []
};

export const usePipeline = () => {
  const [nodes, setNodes] = useState<PipelineNode[]>([]);
  const [edges, setEdges] = useState<PipelineEdge[]>([]);
  const [config, setConfig] = useState<PipelineConfig>(defaultConfig);

  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const { nodes: savedNodes, edges: savedEdges, config: savedConfig } = JSON.parse(savedState) as Pipeline;
      setNodes(savedNodes);
      setEdges(savedEdges);
      setConfig(savedConfig || defaultConfig);
    }
  }, []);

  const savePipeline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges, config }));
  }, [nodes, edges, config]);

  const createNewPipeline = useCallback((newConfig: PipelineConfig) => {
    setNodes([]);
    setEdges([]);
    setConfig(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes: [], edges: [], config: newConfig }));
  }, []);

  const exportPipeline = useCallback(() => {
    const pipelineData = JSON.stringify({ nodes, edges, config }, null, 2);
    const blob = new Blob([pipelineData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.name || 'pipeline'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges, config]);

  const importPipeline = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const pipeline = JSON.parse(e.target?.result as string) as Pipeline;
        setNodes(pipeline.nodes);
        setEdges(pipeline.edges);
        setConfig(pipeline.config || defaultConfig);
        savePipeline();
      } catch (error) {
        console.error('Failed to import pipeline:', error);
      }
    };
    reader.readAsText(file);
  }, [savePipeline]);

  return {
    nodes,
    edges,
    config,
    setNodes,
    setEdges,
    setConfig,
    savePipeline,
    createNewPipeline,
    exportPipeline,
    importPipeline,
  };
};