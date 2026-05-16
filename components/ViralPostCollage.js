import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function ViralPostCollage({ contentImgs, plusCountText }) {
  const cardRef = useRef(null);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 1, // Kunci mutlak agar resolusi tetap 526x526
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
      <div className="table-responsive" style={{ border: 'none', overflowX: 'auto', marginBottom: '15px' }}>
        {/* KANVAS MURNI 526x526 */}
        <div 
          ref={cardRef} 
          style={{ 
            width: '526px', 
            height: '526px', 
            minWidth: '526px', 
            background: '#fff', // Warna background menjadi warna garis celah (gap)
            margin: '0 auto', 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between' // Memisahkan baris atas dan bawah
          }}
        >
          {/* BARIS ATAS (2 Gambar - 50% 50%) */}
          <div style={{ display: 'flex', width: '100%', height: '261px', justifyContent: 'space-between' }}>
            {/* Slot 1 */}
            <div style={{ width: '261px', height: '100%', backgroundColor: '#eee' }}>
              {contentImgs[0] && <img src={contentImgs[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="1" />}
            </div>
            {/* Slot 2 */}
            <div style={{ width: '261px', height: '100%', backgroundColor: '#eee' }}>
              {contentImgs[1] && <img src={contentImgs[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="2" />}
            </div>
          </div>

          {/* BARIS BAWAH (3 Gambar - 33.3% 33.3% 33.3%) */}
          <div style={{ display: 'flex', width: '100%', height: '261px', justifyContent: 'space-between' }}>
            {/* Slot 3 */}
            <div style={{ width: '172px', height: '100%', backgroundColor: '#eee' }}>
              {contentImgs[2] && <img src={contentImgs[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="3" />}
            </div>
            {/* Slot 4 */}
            <div style={{ width: '174px', height: '100%', backgroundColor: '#eee' }}>
              {contentImgs[3] && <img src={contentImgs[3]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="4" />}
            </div>
            {/* Slot 5 + OVERLAY TEXT */}
            <div style={{ width: '172px', height: '100%', backgroundColor: '#eee', position: 'relative' }}>
              {contentImgs[4] && <img src={contentImgs[4]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="5" />}
              
              {/* Overlay Hitam 50% & Angka di Tengah (Persis FB) */}
              {plusCountText && (
                <div style={{ 
                  position: 'absolute', 
                  top: 0, left: 0, right: 0, bottom: 0, 
                  backgroundColor: 'rgba(0,0,0,0.5)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  zIndex: 10
                }}>
                  <span style={{ color: '#fff', fontSize: '42px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                    {plusCountText}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <button type="button" className="btn btn-success btn-lg btn-block" style={{ fontWeight: 'bold' }} onClick={_downloadImage}>
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i> DOWNLOAD COLLAGE (526x526)
      </button>
    </>
  );
}
