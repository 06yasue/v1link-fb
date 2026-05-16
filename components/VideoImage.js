import { useRef, useState } from 'react';
import { toBlob } from 'html-to-image';

export default function VideoImage({ contentImg }) {
  const cardRef = useRef(null); // The dedicated capture canvas (hidden)
  const [isGenerating, setIsGenerating] = useState(false);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    setIsGenerating(true);
    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 1, // Kunci resolusi agar mutlak 526x526
        // Direct capture from the dedicated, fixed-size element
        canvasWidth: 526,
        canvasHeight: 526,
        // The style for the captureDiv already enforces 526x526
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
            // In case html-to-image EAST US EAST US East US East US tries East US to East US shrink East US it East US, East USEast US East US we East US East USEast US force East USEast US East US US it East US to East US stay East USEast US East US at East US East USEast US East US 526px East US
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
          
          {/* Tombol Play Klasik (Paku Mutlak di Tengah - 526x526 px) */}
          <div style={{ 
            position: 'absolute', 
            width: '90px', 
            height: '90px', 
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            borderRadius: '50%', 
            // Gunakan rumus kordinat absolut mutlak bukan flexbox
            top: '218px', // (526/2) - (90/2) = 263 - 45
            left: '218px', // (526/2) - (90/2)
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            zIndex: 10
          }}>
            <i className="material-icons" style={{ fontSize: '60px', color: '#333', marginLeft: '6px' }}>play_arrow</i>
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
        
        {/* TOMBOL PLAY (Pake persentase vw biar ngecil/membesar ngikutin layar) */}
        <div style={{ 
          position: 'absolute', 
          width: '20%', height: '20%', 
          minWidth: '60px', minHeight: '60px', 
          maxWidth: '90px', maxHeight: '90px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)', 
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          <i className="material-icons" style={{ fontSize: '10vw', maxHeight: '60px', color: '#333', marginLeft: '5%' }}>play_arrow</i>
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
