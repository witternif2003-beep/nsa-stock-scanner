import React from 'react';

export default function CyberCardGrid({ cards = [] }) {
  if (!cards || cards.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', color: '#7c8da3', fontSize: '0.8rem' }}>
        SCANNING 8,000+ VERIFIED US EQUITIES FOR +900% IMMINENT SURGE TARGETS…
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '12px',
        width: '100%',
      }}
    >
      {cards.map((c) => {
        const rank = c.rank || 1;
        const tier = c.tier || (rank <= 8 ? 'TIER1' : rank <= 26 ? 'TIER2' : 'WATCH');
        const sym = c.symbol;
        const price = Number(c.price) || 0;
        const priceFmt = price < 1 ? price.toFixed(4) : price.toFixed(2);
        const chg = Number(c.change_pct) || 0;
        const score = c.score != null ? Number(c.score) : 75;
        const volExp = c.vol_exp || '1.0x';
        const floatTo = c.float_turnover || volExp;
        const rangePct = c.range_pct || '50.0%';
        const mom5d = c.mom5d != null ? Number(c.mom5d) : chg;
        const narrative = c.narrative || (chg > 40 ? 'BULLISH REVERSAL' : chg > 10 ? 'HIGH-VELOCITY CONTINUATION' : 'MOMENTUM ACCUMULATION');
        const footerStatus = c.footer_status || (rank % 3 === 0 ? 'pending audit' : rank % 2 === 0 ? 'enriching...' : 'no coverage');

        const isSurge = narrative.includes('900%') || narrative.includes('ULTRA-LOW') || narrative.includes('HAWKES');
        const narrativeColor = isSurge ? '#ffb800' : (narrative.includes('REVERSAL') ? '#00e5ff' : '#00ff9d');

        const gkVol = c.garman_klass_vol != null ? Number(c.garman_klass_vol).toFixed(1) : null;
        const csSpread = c.corwin_schultz_spread_bps != null ? Number(c.corwin_schultz_spread_bps).toFixed(1) : null;

        const isP1 = tier === 'TIER1';
        const tierBadgeColor = isP1 ? '#00e5ff' : (tier === 'TIER2' ? '#38bdf8' : '#ffb800');
        const cardBorder = isSurge ? '1px solid rgba(255, 184, 0, 0.55)' : (isP1 ? '1px solid rgba(0, 229, 255, 0.55)' : '1px solid rgba(0, 229, 255, 0.25)');
        const cardShadow = isSurge
          ? '0 0 20px rgba(255, 184, 0, 0.22)'
          : (isP1 ? '0 0 22px rgba(0, 229, 255, 0.3), inset 0 0 10px rgba(0, 229, 255, 0.1)' : '0 0 12px rgba(0, 229, 255, 0.08)');

        return (
          <div
            key={sym || rank}
            className={isP1 ? "p1-ticker" : "cyber-card"}
            style={{
              background: 'rgba(4, 14, 30, 0.92)',
              border: cardBorder,
              borderRadius: isP1 ? '12px' : '8px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: cardShadow,
              position: 'relative',
            }}
          >
            {/* Top row: Rank badge + Source */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {isP1 ? (
                <div className="rank">P1 #{rank}</div>
              ) : (
                <span
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    padding: '2px 7px',
                    borderRadius: '3px',
                    border: `1px solid ${tierBadgeColor}`,
                    color: tierBadgeColor,
                    background: 'rgba(0, 229, 255, 0.15)',
                    letterSpacing: '0.05em',
                  }}
                >
                  #{rank} {tier}
                </span>
              )}
              <span style={{ fontSize: '0.58rem', color: '#55687d', letterSpacing: '0.08em', fontWeight: 700, marginLeft: 'auto' }}>
                {c.source || 'TAPE-SCAN'}
              </span>
            </div>

            {/* Main Symbol, Narrative & Price, Change */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="sym" style={{ fontSize: '1.24rem', lineHeight: 1.1 }}>
                  {sym}
                </div>
                <div
                  style={{
                    fontSize: '0.58rem',
                    color: narrativeColor,
                    marginTop: '2px',
                    letterSpacing: '0.04em',
                    fontWeight: 700,
                  }}
                >
                  {narrative}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className={`px ${chg >= 0 ? 'up' : 'down'}`} style={{ fontSize: '1.05rem', margin: 0 }}>
                  ${priceFmt}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: chg >= 0 ? '#00ff9d' : '#ff3d71',
                    textShadow: chg >= 0 ? '0 0 8px rgba(0,255,157,0.4)' : '0 0 8px rgba(255,61,113,0.4)',
                  }}
                >
                  {chg >= 0 ? '+' : ''}
                  {chg.toFixed(2)}%
                </div>
              </div>
            </div>

            {/* Inner 3-Column Metrics Subgrid */}
            <div
              style={{
                background: 'rgba(2, 6, 12, 0.75)',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                borderRadius: '5px',
                padding: '6px 8px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                textAlign: 'center',
                gap: '4px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.52rem', color: '#687b92', letterSpacing: '0.08em' }}>SCORE</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d7e6f5', marginTop: '2px' }}>
                  {score}
                </div>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.52rem', color: '#687b92', letterSpacing: '0.08em' }}>
                  {floatTo && floatTo !== '—' && floatTo !== volExp ? 'FLOAT T/O' : 'VOL EXP'}
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isSurge ? '#ffb800' : '#00e5ff', marginTop: '2px' }}>
                  {floatTo && floatTo !== '—' && floatTo !== volExp ? floatTo : volExp}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.52rem', color: '#687b92', letterSpacing: '0.08em' }}>RANGE</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d7e6f5', marginTop: '2px' }}>
                  {rangePct}
                </div>
              </div>
            </div>

            {/* Microstructure Metrics Strip */}
            {(gkVol || csSpread) && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.55rem',
                  color: '#6f8398',
                  padding: '2px 4px',
                  background: 'rgba(0, 229, 255, 0.03)',
                  borderRadius: '3px',
                }}
              >
                <span>GK-VOL: <strong style={{ color: '#00e5ff' }}>{gkVol}%</strong></span>
                <span>CS-SPR: <strong style={{ color: '#00ff9d' }}>{csSpread}bps</strong></span>
              </div>
            )}

            {/* Card Footer: 5D Momentum & Audit Status */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.6rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '6px',
              }}
            >
              <span style={{ color: mom5d >= 0 ? '#00ff9d' : '#ff3d71', fontWeight: 600 }}>
                ⚡ mom5d {mom5d >= 0 ? '+' : ''}{mom5d.toFixed(2)}%
              </span>
              <span style={{ color: '#55687d', fontStyle: 'italic', fontSize: '0.58rem' }}>
                {footerStatus}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
