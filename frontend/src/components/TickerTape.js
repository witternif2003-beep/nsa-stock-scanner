import React from 'react';

export default function TickerTape({ items = [] }) {
  if (!items || items.length === 0) return null;

  // Duplicate items to ensure seamless infinite looping animation
  const stream = [...items, ...items];

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        background: 'rgba(2, 6, 12, 0.95)',
        borderBottom: '1px solid rgba(0, 229, 255, 0.3)',
        padding: '6px 0',
        whiteSpace: 'nowrap',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
      }}
    >
      <div
        className="ticker-marquee"
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: 'marquee-scroll 35s linear infinite',
        }}
      >
        {stream.map((t, idx) => {
          const sym = t.symbol || '—';
          const price = Number(t.price) || 0;
          const priceFmt = price < 1 ? price.toFixed(4) : price.toFixed(2);
          const chg = Number(t.change_pct) || 0;
          const isUp = chg >= 0;

          return (
            <span
              key={`${sym}-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                marginRight: '24px',
                fontSize: '0.72rem',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span style={{ color: '#00e5ff', fontWeight: 800 }}>{sym}</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>${priceFmt}</span>
              <span
                style={{
                  color: isUp ? '#00ff9d' : '#ff3d71',
                  fontWeight: 700,
                  fontSize: '0.68rem',
                }}
              >
                {isUp ? '▲ +' : '▼ '}
                {chg.toFixed(2)}%
              </span>
              <span style={{ color: 'rgba(0, 229, 255, 0.25)', marginLeft: '12px' }}>│</span>
            </span>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
