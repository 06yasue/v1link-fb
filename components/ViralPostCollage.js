import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function ViralPostCollage({ contentImgs, plusCountText }) {
  const cardRef = useRef(null);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const blob = await toBlob(cardRef.current, {
        canvasWidth: 526,
        canvasHeight: 526,
        style: { transform: 'scale(1)', transformOrigin: 'top left' }
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `V1LINK_viral_collage_${Math.floor(Math.random() * 10000)}.png`;
      link.href = url;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating collage image:', err);
    }
  };

  return (
    <>
      {/* AREA CAPTURE KOLASE PERSEGI 526x526 */}
      <div 
        ref={cardRef} 
        style={{ 
          width: '526px', 
          height: '526px', 
          background: '#fafafa', 
          margin: '0 auto', 
          overflow: 'hidden', 
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr',
          gridTemplateAreas: '"img1 img1" "img2 img3" "img4 img5"',
          gap: '3px', // Jarak tipis antar gambar
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        {/* Gambar Kolase (Ditempatkan berdasarkan grid-area) */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ gridArea: `img${i + 1}`, background: '#e9e9e9', overflow: 'hidden', position: 'relative' }}>
            {contentImgs[i] ? (
              <img src={contentImgs[i]} alt={`Slot ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="material-icons" style={{ fontSize: '24px', color: '#ccc' }}>image</i>
              </div>
            )}
            
            {/* Teks Plus (+X) di Pojok Bawah Gambar Terakhir */}
            {i === 4 && plusCountText && (
              <div style={{ position: 'absolute', bottom: '15px', right: '15px', backgroundColor: 'rgba(255,255,255,0.85)', padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd', color: '#333', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                {plusCountText}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* TOMBOL DOWNLOAD */}
      <button 
        type="button" 
        className="btn btn-success btn-lg btn-block" 
        style={{ marginTop: '25px', fontWeight: 'bold', maxWidth: '526px', margin: '25px auto 0 auto' }} 
        onClick={_downloadImage}
      >
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i>
        DOWNLOAD VIRAL COLLAGE (526x526)
      </button>
    </>
  );
}
