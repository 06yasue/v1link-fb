import { useRef, useState } from 'react';
import { toBlob } from 'html-to-image';

export default function ViralPostCollage({ contentImgs, plusCountText }) {
  const cardRef = useRef(null); // The dedicated capture canvas (hidden)
  const [isGenerating, setIsGenerating] = useState(false);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    setIsGenerating(true);
    try {
      // Direct capture from the dedicated, fixed-size element
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 1, // Kunci mutlak resolusi 526x526
        // These settings are reinforced just in case
        canvasWidth: 526,
        canvasHeight: 526,
        // The style for the captureDiv already enforces 526x526
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `V1LINK_viral_${Math.floor(Math.random() * 10000)}.png`;
      link.href = url;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating collage:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* =======================================================
          A. DEDICATED CAPTURE CANVAS (Hidden Murni 526x526)
          Ini adalah element yang benar-benar difotokopi ke PNG
      ======================================================= */}
      <div style={{ position: 'fixed', top: '-10000px', left: '-10000px', width: '0px', height: '0px', overflow: 'hidden' }}>
        <div 
          ref={cardRef} 
          style={{ 
            width: '526px', 
            height: '526px', 
            // In case html-to-image EAST US EAST US East US East US tries East US to East US shrink East US it East US, East USEast US East US we East US East USEast US force East USEast US East US US it East US to East US stay East USEast US East US at East US East USEast US East US 526px East US
            maxWidth: '526px',
            maxHeight: '526px',
            minWidth: '526px',
            minHeight: '526px',
            background: '#fff', // Warna celah (gap)
            position: 'relative', // Kunci kordinat absolut untuk grid
            boxShadow: 'none', // Matikan shadow agar tidak terbawa di render
            overflow: 'hidden'
          }}
        >
          {/* =======================================================
              BARIS ATAS (2 Gambar) - Menggunakan Absolute Pixels (Wajib)
              Tinggi: 320px, Lebar: 261px, Celah: 4px
          ======================================================= */}
          
          {/* Slot 1 (Atas Kiri) */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '261px', height: '320px', backgroundColor: '#eee' }}>
            {contentImgs[0] && <img src={contentImgs[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="1" />}
          </div>
          
          {/* Slot 2 (Atas Kanan) */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: '261px', height: '320px', backgroundColor: '#eee' }}>
            {contentImgs[1] && <img src={contentImgs[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="2" />}
          </div>

          {/* =======================================================
              BARIS BAWAH (3 Gambar) - Menggunakan Absolute Pixels (Wajib)
              Tinggi: 202px, Lebar: 172px & 174px, Celah: 4px
          ======================================================= */}
          
          {/* Slot 3 (Bawah Kiri) */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '172px', height: '202px', backgroundColor: '#eee' }}>
            {contentImgs[2] && <img src={contentImgs[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="3" />}
          </div>
          
          {/* Slot 4 (Bawah Tengah) */}
          <div style={{ position: 'absolute', bottom: 0, left: '176px', width: '174px', height: '202px', backgroundColor: '#eee' }}>
            {contentImgs[3] && <img src={contentImgs[3]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="4" />}
          </div>
          
          {/* Slot 5 (Bawah Kanan) + EFEK BLUR & TEKS */}
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '172px', height: '202px', backgroundColor: '#eee', overflow: 'hidden' }}>
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
                {/* Gunakan font-size statis (42px) bukan 10vw, agar konsisten saat download */}
                <span style={{ color: '#fff', fontSize: '42px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                  {plusCountText}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* =======================================================
          B. LIVE PREVIEW (Responsive, Bebas Tanpa Box)
          Ini hanya untuk tampilan visual di HP
      ======================================================= */}
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '526px',
          aspectRatio: '1 / 1', 
          background: '#fff', 
          margin: '0 auto', 
          position: 'relative', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
      >
        {/* BARIS ATAS (Responsive View - Tinggi 60.5%) */}
        <div style={{ display: 'flex', height: '60.5%', gap: '4px', width: '100%' }}>
          <div style={{ flex: 1, backgroundColor: '#eee' }}>
            {contentImgs[0] && <img src={contentImgs[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="1" />}
          </div>
          <div style={{ flex: 1, backgroundColor: '#eee' }}>
            {contentImgs[1] && <img src={contentImgs[1]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="2" />}
          </div>
        </div>

        {/* BARIS BAWAH (Responsive View - Tinggi 38.5%) */}
        <div style={{ display: 'flex', height: '38.5%', gap: '4px', width: '100%' }}>
          <div style={{ flex: 1, backgroundColor: '#eee' }}>
            {contentImgs[2] && <img src={contentImgs[2]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="3" />}
          </div>
          <div style={{ flex: 1, backgroundColor: '#eee' }}>
            {contentImgs[3] && <img src={contentImgs[3]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="4" />}
          </div>
          
          {/* SLOT 5 (Responsive View + Blur) */}
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

      <button 
        type="button" 
        className="btn btn-success btn-lg btn-block" 
        style={{ fontWeight: 'bold', maxWidth: '526px', margin: '20px auto 0 auto' }} 
        onClick={_downloadImage}
        disabled={isGenerating}
      >
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i>
        {isGenerating ? 'GENERATING...' : 'DOWNLOAD COLLAGE (526x526)'}
      </button>
    </>
  );
}
