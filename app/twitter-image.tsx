import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ahara — Science-Backed Nutrition for Vegetarian Diets'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ background: '#060D07', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '80px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 40, left: 40, width: 28, height: 28, borderTop: '1px solid rgba(196,151,58,0.4)', borderLeft: '1px solid rgba(196,151,58,0.4)' }} />
        <div style={{ position: 'absolute', top: 40, right: 40, width: 28, height: 28, borderTop: '1px solid rgba(196,151,58,0.4)', borderRight: '1px solid rgba(196,151,58,0.4)' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 40, width: 28, height: 28, borderBottom: '1px solid rgba(196,151,58,0.4)', borderLeft: '1px solid rgba(196,151,58,0.4)' }} />
        <div style={{ position: 'absolute', bottom: 40, right: 40, width: 28, height: 28, borderBottom: '1px solid rgba(196,151,58,0.4)', borderRight: '1px solid rgba(196,151,58,0.4)' }} />
        <div style={{ color: '#C4973A', fontSize: 13, letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: 24 }}>EST. 2025  ·  NUTRACEUTICAL RESEARCH  ·  INDIA</div>
        <div style={{ color: '#FFFFFF', fontSize: 96, fontWeight: 300, lineHeight: 1.05, marginBottom: 24 }}>Ahara</div>
        <div style={{ color: 'rgba(242,237,227,0.75)', fontSize: 26, lineHeight: 1.5, maxWidth: 600 }}>Science-backed nutrition for vegetarian diets. Built around how your body actually absorbs nutrients.</div>
        <div style={{ position: 'absolute', bottom: 60, left: 80, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 1, background: '#C4973A', opacity: 0.6 }} />
          <div style={{ color: '#C4973A', fontSize: 13, letterSpacing: '0.1em', fontFamily: 'monospace' }}>AHARA.CO</div>
          <div style={{ width: 40, height: 1, background: '#C4973A', opacity: 0.6 }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
