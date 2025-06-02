'use client';

import { useState, useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import PipelineConfiguration from './PipelineConfiguration';
import { PipelineConfig } from '../types/pipeline';

interface MenuBarProps {
  onNewPipeline: (config: PipelineConfig) => void;
  onImport: () => void;
  onExportJSON: () => void;
  onExportPointy: () => void;
  onAddEvent: () => void;
}

const MenuBar = ({
  onNewPipeline,
  onImport,
  onExportJSON,
  onExportPointy,
  onAddEvent,
}: MenuBarProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showPipelineConfig, setShowPipelineConfig] = useState(false);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleMenuClick = useCallback((menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  }, [activeMenu]);

  const handleMouseLeave = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const handleNewPipeline = useCallback(() => {
    setShowPipelineConfig(true);
    setActiveMenu(null);
  }, []);

  const handlePipelineConfigSave = useCallback((config: PipelineConfig) => {
    setShowPipelineConfig(false);
    onNewPipeline(config);
  }, [onNewPipeline]);

  const handlePipelineConfigCancel = useCallback(() => {
    setShowPipelineConfig(false);
  }, []);

  return (
    <>
      <div className="w-full bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4 relative">
            {/* File Menu */}
            <div className="relative" onMouseLeave={handleMouseLeave}>
              <button
                className={`px-3 py-2 hover:bg-gray-700 ${
                  activeMenu === 'file' ? 'bg-gray-700' : ''
                }`}
                onClick={() => handleMenuClick('file')}
              >
                File
              </button>
              {activeMenu === 'file' && (
                <div className="absolute left-0 top-full mt-1 w-48 bg-gray-800 shadow-lg rounded-md py-1 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={handleNewPipeline}
                  >
                    New Pipeline...
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={onImport}
                  >
                    Open...
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={onExportJSON}
                  >
                    Export as JSON
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={onExportPointy}
                  >
                    Export as Pointy
                  </button>
                </div>
              )}
            </div>

            {/* Edit Menu */}
            <div className="relative" onMouseLeave={handleMouseLeave}>
              <button
                className={`px-3 py-2 hover:bg-gray-700 ${
                  activeMenu === 'edit' ? 'bg-gray-700' : ''
                }`}
                onClick={() => handleMenuClick('edit')}
              >
                Edit
              </button>
              {activeMenu === 'edit' && (
                <div className="absolute left-0 top-full mt-1 w-48 bg-gray-800 shadow-lg rounded-md py-1 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={onAddEvent}
                  >
                    Add Event
                  </button>
                </div>
              )}
            </div>

            {/* View Menu */}
            <div className="relative" onMouseLeave={handleMouseLeave}>
              <button
                className={`px-3 py-2 hover:bg-gray-700 ${
                  activeMenu === 'view' ? 'bg-gray-700' : ''
                }`}
                onClick={() => handleMenuClick('view')}
              >
                View
              </button>
              {activeMenu === 'view' && (
                <div className="absolute left-0 top-full mt-1 w-48 bg-gray-800 shadow-lg rounded-md py-1 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={() => zoomIn()}
                  >
                    Zoom In
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={() => zoomOut()}
                  >
                    Zoom Out
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    onClick={() => fitView()}
                  >
                    Fit View
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render PipelineConfiguration when showPipelineConfig is true */}
      {showPipelineConfig && (
        <PipelineConfiguration
          onSave={handlePipelineConfigSave}
          onCancel={handlePipelineConfigCancel}
        />
      )}
    </>
  );
};

export default MenuBar;