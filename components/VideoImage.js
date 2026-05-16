import { useRef } from 'react';
import { toBlob } from 'html-to-image';

export default function VideoImage({ contentImg }) {
  const cardRef = useRef(null);

  const _downloadImage = async () => {
    if (cardRef.current === null) return;
    try {
      const blob = await toBlob(cardRef.current, {
        pixelRatio: 1,
        width: 526, // Paksa hasil render persis 526px
        height: 526,
        canvasWidth: 526,
        canvasHeight: 526,
        style: { 
          width: '526px', // Paksa ukuran asli saat didownload
          height: '526px', 
          maxWidth: '526px',
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
      <div 
        ref={cardRef} 
        style={{ 
          width: '100%', 
          maxWidth: '526px',
          aspectRatio: '1 / 1', // Menjaga gambar tetap proporsional bujur sangkar di layar HP
          background: '#000', 
          margin: '0 auto', 
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
      >
        {contentImg ? (
          <img src={contentImg} alt="Video Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <i className="material-icons" style={{ fontSize: '80px', color: '#444' }}>image</i>
        )}
        
        <div style={{ 
          position: 'absolute', width: '90px', height: '90px', backgroundColor: 'rgba(255, 255, 255, 0.85)', 
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
          <i className="material-icons" style={{ fontSize: '60px', color: '#333', marginLeft: '5px' }}>play_arrow</i>
        </div>
      </div>

      <button type="button" className="btn btn-danger btn-lg btn-block" style={{ fontWeight: 'bold', maxWidth: '526px', margin: '20px auto 0 auto' }} onClick={_downloadImage}>
        <i className="material-icons" style={{ verticalAlign: 'text-bottom', marginRight: '5px' }}>download</i> DOWNLOAD VIDEO (526x526)
      </button>
    </>
  );
}
