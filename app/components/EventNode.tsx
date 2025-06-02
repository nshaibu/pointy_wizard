'use client';

import { memo, useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { PipelineNode } from '../types/pipeline';

const EventNode = ({ data, id }: NodeProps<PipelineNode['data']>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nodeName, setNodeName] = useState(data.event.name);

  const onNameChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(evt.target.value);
  }, []);

  const onKeyDown = useCallback((evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      setIsEditing(false);
      data.event.name = nodeName;
    }
  }, [nodeName, data]);

  return (
    <div className="px-4 py-2 shadow-lg rounded-md bg-white border-2 border-stone-400 min-w-[150px]">
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      <div className="flex flex-col gap-2">
        {isEditing ? (
          <input
            type="text"
            value={nodeName}
            onChange={onNameChange}
            onKeyDown={onKeyDown}
            onBlur={() => {
              setIsEditing(false);
              data.event.name = nodeName;
            }}
            className="border px-1 py-0.5 text-sm rounded focus:outline-none focus:border-blue-500"
            autoFocus
          />
        ) : (
          <div
            onDoubleClick={() => setIsEditing(true)}
            className="text-sm font-bold cursor-pointer hover:text-blue-600"
          >
            {data.event.name}
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Event</span>
          <span className="text-xs text-gray-400">{id}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
};

export default memo(EventNode);