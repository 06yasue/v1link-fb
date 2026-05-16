import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function ViralPostCollage({ contentImgs, plusCountText }) {
  const cardRef = useRef(null);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 1, // KUNCI MUTLAK MENCEGAH RESOLUSI NAIK JADI 800+
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
        {/* AREA CAPTURE KOLASE PERSEGI 526x526 */}
        <div 
          ref={cardRef} 
          style={{ 
            width: '526px', 
            height: '526px', 
            minWidth: '526px', // Paksa ukuran agar tidak hancur di HP
            background: '#fff', 
            margin: '0 auto', 
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)', // Dibagi 6 agar bisa memuat format 2 dan 3 gambar
            gridTemplateRows: 'repeat(2, 1fr)',    // 2 Baris (Atas dan Bawah)
            gap: '4px', // Jarak putih khas kolase FB
            overflow: 'hidden'
          }}
        >
          {/* Gambar 1 (Atas Kiri - Memakan 3 dari 6 kolom) */}
          <div style={{ gridColumn: '1 / span 3', gridRow: '1', background: '#eee', position: 'relative' }}>
            {contentImgs[0] && <img src={contentImgs[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="1" />}
          </div>
          
          {/* Gambar 2 (Atas Kanan - Memakan 3 dari 6 kolom) */}
          <div style={{ gridColumn: '4 / span 3', gridRow: '1', background: '#eee', position: 'relative' }}>
            {contentImgs[1] && <img src={contentImgs[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="2" />}
          </div>

          {/* Gambar 3 (Bawah Kiri - Memakan 2 dari 6 kolom) */}
          <div style={{ gridColumn: '1 / span 2', gridRow: '2', background: '#eee', position: 'relative' }}>
            {contentImgs[2] && <img src={contentImgs[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="3" />}
          </div>

          {/* Gambar 4 (Bawah Tengah - Memakan 2 dari 6 kolom) */}
          <div style={{ gridColumn: '3 / span 2', gridRow: '2', background: '#eee', position: 'relative' }}>
            {contentImgs[3] && <img src={contentImgs[3]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="4" />}
          </div>

          {/* Gambar 5 (Bawah Kanan - Memakan 2 dari 6 kolom) + OVERLAY */}
          <div style={{ gridColumn: '5 / span 2', gridRow: '2', background: '#eee', position: 'relative' }}>
            {contentImgs[4] && <img src={contentImgs[4]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="5" />}
            
            {/* Overlay Hitam Transparan & Teks Angka */}
            {plusCountText && (
              <div style={{ 
                position: 'absolute', 
                top: 0, left: 0, right: 0, bottom: 0, 
                backgroundColor: 'rgba(0,0,0,0.5)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span style={{ color: '#fff', fontSize: '38px', fontWeight: 'bold' }}>
                  {plusCountText}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>

      <button type="button" className="btn btn-success btn-lg btn-block" style={{ fontWeight: 'bold' }} onClick={_downloadImage}>
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i> DOWNLOAD COLLAGE (526x526)
      </button>
    </>
  );
}
