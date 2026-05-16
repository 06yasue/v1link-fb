import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function ViralPostCollage({ contentImgs, plusCountText }) {
  const cardRef = useRef(null);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 1, // Kunci mutlak resolusi 526x526
        width: 526,
        height: 526,
        style: { transform: 'none', margin: '0' }
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `V1LINK_viral_${Math.floor(Math.random() * 10000)}.png`;
      link.href = url;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating collage:', err);
    }
  };

  return (
    <>
      {/* EFEK IFRAME/SCROLL DIBUANG TOTAL */}
      <div 
        ref={cardRef} 
        style={{ 
          width: '526px', 
          height: '526px', 
          minWidth: '526px', 
          background: '#fff', 
          margin: '0 auto', 
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
        }}
      >
        {/* BARIS ATAS (Lebih Besar - Tinggi 320px) */}
        <div style={{ display: 'flex', width: '100%', height: '320px', justifyContent: 'space-between' }}>
          <div style={{ width: '261px', height: '100%', backgroundColor: '#eee' }}>
            {contentImgs[0] && <img src={contentImgs[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="1" />}
          </div>
          <div style={{ width: '261px', height: '100%', backgroundColor: '#eee' }}>
            {contentImgs[1] && <img src={contentImgs[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="2" />}
          </div>
        </div>

        {/* BARIS BAWAH (Lebih Kecil - Tinggi 202px) */}
        <div style={{ display: 'flex', width: '100%', height: '202px', justifyContent: 'space-between' }}>
          <div style={{ width: '172px', height: '100%', backgroundColor: '#eee' }}>
            {contentImgs[2] && <img src={contentImgs[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="3" />}
          </div>
          <div style={{ width: '174px', height: '100%', backgroundColor: '#eee' }}>
            {contentImgs[3] && <img src={contentImgs[3]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="4" />}
          </div>
          
          {/* SLOT 5: EFEK BLUR KHUSUS GAMBAR */}
          <div style={{ width: '172px', height: '100%', backgroundColor: '#eee', position: 'relative', overflow: 'hidden' }}>
            {contentImgs[4] && (
              <img 
                src={contentImgs[4]} 
                style={{ 
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: plusCountText ? 'blur(3px)' : 'none' // Efek blur cuma kena ke gambarnya aja
                }} 
                alt="5" 
              />
            )}
            
            {/* OVERLAY TEKS (Gak kena efek blur) */}
            {plusCountText && (
              <div style={{ 
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
              }}>
                <span style={{ color: '#fff', fontSize: '42px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                  {plusCountText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <button type="button" className="btn btn-success btn-lg btn-block" style={{ fontWeight: 'bold', maxWidth: '526px', margin: '20px auto 0 auto' }} onClick={_downloadImage}>
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i> DOWNLOAD COLLAGE (526x526)
      </button>
    </>
  );
}
