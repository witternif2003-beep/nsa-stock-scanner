import React from 'react';

export default function TickerInput({
  tickers,
  setTickers,
  onSubmit,
  loading,
  autoScan,
  setAutoScan,
  countdown,
  activeFilter = 'all',
  setActiveFilter,
  totalRunners = 60,
}) {
  return (
    <form className="glass scan-form" onSubmit={onSubmit} style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="radar-live" />
          <label style={{ fontSize: '.72rem', letterSpacing: '.12em', color: '#00e5ff', fontWeight: 700 }}>
            24/7 UNIVERSE RADAR (8,000+ US EQUITIES CONTINUOUS STREAM)
          </label>
        </div>
        <button
          type="button"
          onClick={() => setAutoScan(!autoScan)}
          style={{
            padding: '3px 10px',
            fontSize: '.68rem',
            borderRadius: '6px',
            borderColor: autoScan ? '#00ff9d' : '#ffb800',
            color: autoScan ? '#00ff9d' : '#ffb800',
            background: autoScan ? 'rgba(0, 255, 157, 0.12)' : 'rgba(255, 184, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          {autoScan ? `● 24/7 RADAR ACTIVE [${countdown}s]` : 'PAUSED (MANUAL)'}
        </button>
      </div>

      {/* Dynamic Narrative Cluster Filter Tabs (Zero Static Presets) */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '10px', paddingBottom: '2px' }}>
        <button
          type="button"
          onClick={() => setActiveFilter && setActiveFilter('all')}
          style={{
            padding: '4px 10px',
            fontSize: '.65rem',
            borderRadius: '5px',
            borderColor: activeFilter === 'all' ? '#00e5ff' : 'rgba(255,255,255,0.15)',
            color: activeFilter === 'all' ? '#00e5ff' : '#7c8da3',
            background: activeFilter === 'all' ? 'rgba(0,229,255,0.15)' : 'rgba(0,0,0,0.4)',
            fontWeight: 600,
          }}
        >
          ALL {totalRunners} BREAKOUT RUNNERS
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter && setActiveFilter('surge')}
          style={{
            padding: '4px 10px',
            fontSize: '.65rem',
            borderRadius: '5px',
            borderColor: activeFilter === 'surge' ? '#ffb800' : 'rgba(255,255,255,0.15)',
            color: activeFilter === 'surge' ? '#ffb800' : '#7c8da3',
            background: activeFilter === 'surge' ? 'rgba(255,184,0,0.2)' : 'rgba(0,0,0,0.4)',
            fontWeight: 700,
            boxShadow: activeFilter === 'surge' ? '0 0 10px rgba(255,184,0,0.3)' : 'none',
          }}
        >
          ★ +900% IMMINENT SURGES
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter && setActiveFilter('tier1')}
          style={{
            padding: '4px 10px',
            fontSize: '.65rem',
            borderRadius: '5px',
            borderColor: activeFilter === 'tier1' ? '#00ff9d' : 'rgba(255,255,255,0.15)',
            color: activeFilter === 'tier1' ? '#00ff9d' : '#7c8da3',
            background: activeFilter === 'tier1' ? 'rgba(0,255,157,0.15)' : 'rgba(0,0,0,0.4)',
            fontWeight: 600,
          }}
        >
          ★ P1 TIER-1 ALPHA (#1-#8)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter && setActiveFilter('reversal')}
          style={{
            padding: '4px 10px',
            fontSize: '.65rem',
            borderRadius: '5px',
            borderColor: activeFilter === 'reversal' ? '#00e5ff' : 'rgba(255,255,255,0.15)',
            color: activeFilter === 'reversal' ? '#00e5ff' : '#7c8da3',
            background: activeFilter === 'reversal' ? 'rgba(0,229,255,0.15)' : 'rgba(0,0,0,0.4)',
            fontWeight: 600,
          }}
        >
          BULLISH REVERSALS
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter && setActiveFilter('continuation')}
          style={{
            padding: '4px 10px',
            fontSize: '.65rem',
            borderRadius: '5px',
            borderColor: activeFilter === 'continuation' ? '#5b5bff' : 'rgba(255,255,255,0.15)',
            color: activeFilter === 'continuation' ? '#5b5bff' : '#7c8da3',
            background: activeFilter === 'continuation' ? 'rgba(91,91,255,0.15)' : 'rgba(0,0,0,0.4)',
            fontWeight: 600,
          }}
        >
          CONTINUATION MOMENTUM
        </button>
      </div>

      <div className="row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input
          value={tickers}
          onChange={(e) => setTickers(e.target.value)}
          placeholder="Leave blank for full 8,000+ universe scan, or type custom tickers (e.g. GIPR MRNO REFR)..."
          autoComplete="off"
          spellCheck="false"
          style={{ flex: '1 1 240px' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ flexShrink: 0, padding: '10px 16px', fontWeight: 700 }}
        >
          {loading ? 'ACQUIRING 8,000+ EQUITIES…' : 'FORCE SCAN'}
        </button>
      </div>
    </form>
  );
}
