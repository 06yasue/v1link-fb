import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function VideoImage({ contentImg }) {
  const cardRef = useRef(null);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 1, // KUNCI MUTLAK AGAR UKURAN TIDAK MEMBENGKAK DI HP
        width: 526,
        height: 526,
        style: { transform: 'none', margin: '0' }
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
      <div className="table-responsive" style={{ border: 'none', overflowX: 'auto', marginBottom: '15px' }}>
        {/* AREA CAPTURE GAMBAR PERSEGI 526x526 */}
        <div 
          ref={cardRef} 
          style={{ 
            width: '526px', 
            height: '526px', 
            minWidth: '526px', // Mencegah terkompresi di layar HP kecil
            background: '#000', 
            margin: '0 auto', 
            overflow: 'hidden', 
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {contentImg ? (
            <img src={contentImg} alt="Video Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <i className="material-icons" style={{ fontSize: '80px', color: '#444' }}>image</i>
          )}
          
          {/* Tombol Play Klasik (Bulat Putih, Panah Gelap) */}
          <div style={{ 
            position: 'absolute', 
            width: '90px', 
            height: '90px', 
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <i className="material-icons" style={{ fontSize: '60px', color: '#333', marginLeft: '5px' }}>play_arrow</i>
          </div>
        </div>
      </div>

      <button type="button" className="btn btn-danger btn-lg btn-block" style={{ fontWeight: 'bold' }} onClick={_downloadImage}>
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i> DOWNLOAD VIDEO (526x526)
      </button>
    </>
  );
}
