import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-canvas">
      <div className="h-8 w-8 rounded-full border-2 border-border-mid border-t-navy animate-spin mb-4" />
      <span className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-slate-muted">
        Loading Assessment Dossier...
      </span>
    </div>
  );
}
