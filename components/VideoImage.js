import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function VideoImage({ contentImg }) {
  const cardRef = useRef(null);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 1, // Kunci resolusi agar mutlak 526x526
        width: 526, 
        height: 526,
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
    }
  };

  return (
    <>
      {/* KANVAS MURNI 526x526 (ABSOLUTE POSITIONING) */}
      <div 
        ref={cardRef} 
        style={{ 
          width: '100%', 
          maxWidth: '526px',
          aspectRatio: '1 / 1', 
          background: '#000', 
          margin: '0 auto', 
          position: 'relative', // Kunci kordinat anak di dalamnya
          boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
      >
        {/* Gambar Utama (Full 100% menempati area) */}
        {contentImg ? (
          <img src={contentImg} alt="Video Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <i className="material-icons" style={{ fontSize: '80px', color: '#444' }}>image</i>
          </div>
        )}
        
        {/* TOMBOL PLAY KLASIK (Ngunci Mati di Tengah pakai rumus top/left 50%) */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', // Rumus mutlak center di koordinat absolute
          width: '90px', 
          height: '90px', 
          backgroundColor: 'rgba(255, 255, 255, 0.85)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 10
        }}>
          {/* Panah Play Icon */}
          <i className="material-icons" style={{ fontSize: '60px', color: '#333', marginLeft: '6px' }}>play_arrow</i>
        </div>
      </div>

      <button type="button" className="btn btn-danger btn-lg btn-block" style={{ fontWeight: 'bold', maxWidth: '526px', margin: '20px auto 0 auto' }} onClick={_downloadImage}>
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i> DOWNLOAD VIDEO (526x526)
      </button>
    </>
  );
}
