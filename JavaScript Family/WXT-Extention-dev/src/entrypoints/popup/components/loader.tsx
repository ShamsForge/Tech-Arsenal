import React from 'react';

const Loader: React.FC<{duration?: number; onFinish?: () => void}> = ({ duration = 1950 }) => {
  // purely presentational component — index will control mount/unmount
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <div className="flex flex-col items-center">
        <video
          className="h-[600px] w-[600px] object-cover bg-transparent"
          src="/minecraft/minecraft-loader.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="mt-3 text-sm text-gray-300">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;
