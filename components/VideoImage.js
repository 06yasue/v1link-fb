import { useRef, useState } from 'react';
import { toBlob } from 'html-to-image';

export default function VideoImage({ contentImg }) {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    setIsGenerating(true);
    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 1, // Kunci resolusi agar mutlak 526x526
        canvasWidth: 526,
        canvasHeight: 526,
        style: { 
          width: '526px', 
          height: '526px', 
          maxWidth: 'none', 
          margin: '0', 
          transform: 'none' 
        }
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `V1LINK_video_${Math.floor(Math.random() * 10000)}.png`;
      link.href = url;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating image:', err);
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
            maxWidth: '526px',
            maxHeight: '526px',
            minWidth: '526px',
            minHeight: '526px',
            background: '#000', 
            margin: '0', 
            position: 'relative', // Kunci kordinat absolut untuk tombol play
            boxShadow: 'none', 
            overflow: 'hidden'
          }}
        >
          {contentImg ? (
            <img src={contentImg} alt="Video Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <i className="material-icons" style={{ fontSize: '80px', color: '#444' }}>image</i>
            </div>
          )}
          
          {/* TOMBOL PLAY PREMIUM (KOTAK HITAM SOLID, KUNCI MATI DI TENGAH) */}
          <div style={{ 
            position: 'absolute', 
            width: '100px', 
            height: '100px', 
            // BARU: Solid Hitam Pekat, Gak Pake Transparan
            backgroundColor: '#000000', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            // KUNCI MATI DI TENGAH SEMPURNA
            top: '213px', // (526/2) - (100/2) = 263 - 50
            left: '213px', // (526/2) - (100/2)
            zIndex: 10,
          }}>
            {/* Panah Play Icon (Putih Bersih biar kontras) */}
            <i className="material-icons" style={{ fontSize: '70px', color: '#ffffff', marginLeft: '8px' }}>play_arrow</i>
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
          background: '#000', 
          margin: '0 auto', 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
      >
        {contentImg ? (
          <img src={contentImg} alt="Video Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <i className="material-icons" style={{ fontSize: '80px', color: '#444' }}>image</i>
        )}
        
        {/* TOMBOL PLAY (PREVIEW RESPONSIVE) */}
        {/* BARU: Tampilan Solid Hitam Pekat di Preview juga */}
        <div style={{ 
          position: 'absolute', 
          width: '20%', height: '20%', 
          minWidth: '60px', minHeight: '60px', 
          maxWidth: '100px', maxHeight: '100px',
          backgroundColor: '#000000', // Solid Hitam Pekat
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          transition: 'transform 0.2s', // Animasi hover
        }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <i className="material-icons" style={{ fontSize: '10vw', maxHeight: '70px', color: '#ffffff', marginLeft: '5%' }}>play_arrow</i>
        </div>
      </div>

      <button 
        type="button" 
        className="btn btn-danger btn-lg btn-block" 
        style={{ fontWeight: 'bold', maxWidth: '526px', margin: '20px auto 0 auto' }} 
        onClick={_downloadImage}
        disabled={isGenerating}
      >
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i>
        {isGenerating ? 'GENERATING...' : 'DOWNLOAD VIDEO (526x526)'}
      </button>
    </>
  );
}
