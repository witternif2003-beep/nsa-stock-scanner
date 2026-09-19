import React from 'react';

export default function StockTable({ rows }) {
  if (!Array.isArray(rows) || rows.length === 0) return null;

  return (
    <div className="table-container" style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ minWidth: '780px', width: '100%' }}>
        <thead>
          <tr>
            <th className="col-symbol">RANK / TIER</th>
            <th>SYMBOL</th>
            <th>PRICE</th>
            <th>CHG %</th>
            <th>SCORE</th>
            <th>VOL EXP</th>
            <th>RANGE</th>
            <th>MOM 5D</th>
            <th>CONVICTION TIER</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const sym = String(r.symbol || '—');
            const rank = r.rank || i + 1;
            const price = typeof r.price === 'number' ? r.price : Number(r.price) || 0;
            const chg = typeof r.change_pct === 'number' ? r.change_pct : Number(r.change_pct) || 0;
            const volExp = r.vol_exp || '1.0x';
            const rangePct = r.range_pct || '50.0%';
            const mom5d = r.mom5d != null ? Number(r.mom5d) : chg;
            const score = typeof r.score === 'number' ? r.score : (typeof r.signal_score === 'number' ? r.signal_score : 75);
            const tier = r.tier || (rank <= 8 ? 'TIER1' : (rank <= 26 ? 'TIER2' : 'WATCH'));
            const tierColor = tier === 'TIER1' ? '#00e5ff' : tier === 'TIER2' ? '#5b5bff' : '#ffb800';
            const priceFormatted = price < 1 ? price.toFixed(4) : price.toFixed(2);
            const isUp = chg >= 0;

            return (
              <tr key={sym !== '—' ? sym : i}>
                <td className="col-symbol">
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      padding: '1px 5px',
                      borderRadius: '3px',
                      border: `1px solid ${tierColor}`,
                      color: tierColor,
                      background: 'rgba(0, 229, 255, 0.08)',
                      letterSpacing: '0.05em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    #{rank} {tier}
                  </span>
                </td>
                <td className="neon-text" style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                  {sym}
                </td>
                <td style={{ fontWeight: 700, color: '#ffffff' }}>${priceFormatted}</td>
                <td className={isUp ? 'up' : 'down'} style={{ fontWeight: 700 }}>
                  {isUp ? '+' : ''}{chg.toFixed(2)}%
                </td>
                <td style={{ fontWeight: 700, color: '#ffffff' }}>{score}</td>
                <td style={{ color: '#00e5ff', fontWeight: 600 }}>{volExp}</td>
                <td style={{ color: '#d7e6f5' }}>{rangePct}</td>
                <td style={{ color: mom5d >= 0 ? '#00ff9d' : '#ff3d71', fontWeight: 600 }}>
                  {mom5d >= 0 ? '+' : ''}{mom5d.toFixed(2)}%
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="score-bar">
                      <span
                        className="score-fill"
                        style={{
                          width: `${Math.min(100, Math.max(0, score))}%`,
                          background: `linear-gradient(90deg, ${tierColor}, #00ff9d)`,
                        }}
                      />
                    </span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: tierColor }}>
                      [{tier}]
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
