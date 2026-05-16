import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function VideoImage({ contentImg }) {
  const cardRef = useRef(null);

  // Fungsi download gambar murni di browser (526x526)
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
      link.download = `V1LINK_fake_video_${Math.floor(Math.random() * 10000)}.png`;
      link.href = url;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  return (
    <>
      {/* AREA CAPTURE GAMBAR PERSEGI 526x526 */}
      <div 
        ref={cardRef} 
        style={{ 
          width: '526px', 
          height: '526px', 
          background: '#000', // Warna hitam jika gambar belum diupload
          margin: '0 auto', 
          overflow: 'hidden', 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        {/* Gambar Utama (Video Frame) */}
        {contentImg ? (
          <img src={contentImg} alt="Main Content" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <i className="material-icons" style={{ fontSize: '100px', color: '#555' }}>image</i>
        )}
        
        {/* Tombol Play Besar di Tengah */}
        <i className="material-icons" style={{ position: 'absolute', fontSize: '120px', color: 'rgba(255,255,255,0.85)', textShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>play_circle</i>
      </div>

      {/* TOMBOL DOWNLOAD */}
      <button 
        type="button" 
        className="btn btn-danger btn-lg btn-block" 
        style={{ marginTop: '25px', fontWeight: 'bold', maxWidth: '526px', margin: '25px auto 0 auto' }} 
        onClick={_downloadImage}
      >
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i>
        DOWNLOAD FAKE VIDEO (526x526)
      </button>
    </>
  );
}
