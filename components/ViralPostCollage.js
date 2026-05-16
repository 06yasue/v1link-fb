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
        style: { width: '526px', height: '526px', maxWidth: '526px', margin: '0', transform: 'none' }
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
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Otomatis ngasih jarak (gap) berdasarkan sisa persentase
          boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
      >
        {/* BARIS ATAS (Tinggi persis 60.5%) */}
        <div style={{ display: 'flex', height: '60.5%', gap: '4px', width: '100%' }}>
          <div style={{ flex: 1, backgroundColor: '#eee' }}>
            {contentImgs[0] && <img src={contentImgs[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="1" />}
          </div>
          <div style={{ flex: 1, backgroundColor: '#eee' }}>
            {contentImgs[1] && <img src={contentImgs[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="2" />}
          </div>
        </div>

        {/* BARIS BAWAH (Tinggi persis 38.5%) */}
        <div style={{ display: 'flex', height: '38.5%', gap: '4px', width: '100%' }}>
          <div style={{ flex: 1, backgroundColor: '#eee' }}>
            {contentImgs[2] && <img src={contentImgs[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="3" />}
          </div>
          <div style={{ flex: 1, backgroundColor: '#eee' }}>
            {contentImgs[3] && <img src={contentImgs[3]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="4" />}
          </div>
          
          {/* SLOT 5: EFEK BLUR & TEKS */}
          <div style={{ flex: 1, backgroundColor: '#eee', position: 'relative', overflow: 'hidden' }}>
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
      </div>

      <button type="button" className="btn btn-success btn-lg btn-block" style={{ fontWeight: 'bold', maxWidth: '526px', margin: '20px auto 0 auto' }} onClick={_downloadImage}>
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i> DOWNLOAD COLLAGE (526x526)
      </button>
    </>
  );
}
