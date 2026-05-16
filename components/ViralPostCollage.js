import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function ViralPostCollage({ contentImgs, plusCountText }) {
  const cardRef = useRef(null);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 1, 
        width: 526, 
        height: 526,
        canvasWidth: 526,
        canvasHeight: 526,
        style: { 
          width: '526px', 
          height: '526px', 
          maxWidth: 'none', // Mencegah batas maksimal saat render
          margin: '0', 
          transform: 'none' 
        }
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
      <div 
        ref={cardRef} 
        style={{ 
          width: '100%', 
          maxWidth: '526px',
          aspectRatio: '1 / 1', 
          background: '#fff', 
          margin: '0 auto', 
          position: 'relative', // Kunci utama untuk absolute layout
          boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
      >
        {/* =======================================================
            BARIS ATAS (2 Gambar)
            Tinggi: 61%, Lebar: 49.6%, Celah: 0.8%
        ======================================================= */}
        
        {/* Slot 1 (Atas Kiri) */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '49.6%', height: '61%', backgroundColor: '#eee' }}>
          {contentImgs[0] && <img src={contentImgs[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="1" />}
        </div>
        
        {/* Slot 2 (Atas Kanan) */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '49.6%', height: '61%', backgroundColor: '#eee' }}>
          {contentImgs[1] && <img src={contentImgs[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="2" />}
        </div>


        {/* =======================================================
            BARIS BAWAH (3 Gambar)
            Tinggi: 38.2%, Lebar: 32.8%, Celah: 0.8%
        ======================================================= */}
        
        {/* Slot 3 (Bawah Kiri) */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '32.8%', height: '38.2%', backgroundColor: '#eee' }}>
          {contentImgs[2] && <img src={contentImgs[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="3" />}
        </div>
        
        {/* Slot 4 (Bawah Tengah) */}
        <div style={{ position: 'absolute', bottom: 0, left: '33.6%', width: '32.8%', height: '38.2%', backgroundColor: '#eee' }}>
          {contentImgs[3] && <img src={contentImgs[3]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="4" />}
        </div>
        
        {/* Slot 5 (Bawah Kanan) + EFEK BLUR & TEKS */}
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '32.8%', height: '38.2%', backgroundColor: '#eee', overflow: 'hidden' }}>
          {contentImgs[4] && (
            <img 
              src={contentImgs[4]} 
              style={{ 
                width: '100%', height: '100%', objectFit: 'cover',
                filter: plusCountText ? 'blur(3px)' : 'none' 
              }} 
              alt="5" 
            />
          )}
          {plusCountText && (
            <div style={{ 
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
              backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
            }}>
              <span style={{ color: '#fff', fontSize: '10vw', maxHeight: '42px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                {plusCountText}
              </span>
            </div>
          )}
        </div>

      </div>

      <button type="button" className="btn btn-success btn-lg btn-block" style={{ fontWeight: 'bold', maxWidth: '526px', margin: '20px auto 0 auto' }} onClick={_downloadImage}>
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i> DOWNLOAD COLLAGE (526x526)
      </button>
    </>
  );
}
