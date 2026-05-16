export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f9fafa',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* INJEKSI CSS ANIMASI LOKAL */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          @keyframes spinSlow {
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseDot {
            0% { opacity: 0.4; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.4; transform: scale(0.8); }
          }
          .animate-fade-up {
            animation: fadeInUp 1s ease-out forwards;
          }
        `
      }} />

      {/* KONTAINER UTAMA */}
      <div className="animate-fade-up text-center" style={{ maxWidth: '600px', zIndex: 2 }}>
        
        {/* SVG ANIMASI: Server/Gateway Node */}
        <div style={{ animation: 'float 4s ease-in-out infinite', display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <svg viewBox="0 0 100 100" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
            {/* Lingkaran Putar Putus-putus Luar */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="#d0d7de" strokeWidth="2" strokeDasharray="6 6" style={{ animation: 'spinSlow 20s linear infinite', transformOrigin: 'center' }} />
            
            {/* Koneksi Garis (Network) */}
            <line x1="50" y1="15" x2="50" y2="30" stroke="#337ab7" strokeWidth="2" />
            <line x1="50" y1="70" x2="50" y2="85" stroke="#337ab7" strokeWidth="2" />
            <line x1="15" y1="50" x2="30" y2="50" stroke="#337ab7" strokeWidth="2" />
            <line x1="70" y1="50" x2="85" y2="50" stroke="#337ab7" strokeWidth="2" />
            
            {/* Titik Server Luar */}
            <circle cx="50" cy="15" r="4" fill="#337ab7" />
            <circle cx="50" cy="85" r="4" fill="#337ab7" />
            <circle cx="15" cy="50" r="4" fill="#337ab7" />
            <circle cx="85" cy="50" r="4" fill="#337ab7" />

            {/* Lingkaran Inti Gateway */}
            <circle cx="50" cy="50" r="20" fill="#fff" stroke="#337ab7" strokeWidth="3" />
            
            {/* Ceklis Keamanan di Tengah */}
            <path d="M42 50 l 6 6 l 12 -12" fill="none" stroke="#5cb85c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* TEKS UTAMA */}
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '900', 
          color: '#2c3e50', 
          letterSpacing: '1px',
          textTransform: 'uppercase',
          margin: '0 0 15px 0'
        }}>
          System Gateway
        </h1>
        
        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.7', 
          color: '#6c7a89', 
          marginBottom: '35px',
          padding: '0 15px'
        }}>
          The central traffic routing infrastructure is currently under maintenance. We are optimizing our servers for secure, fast, and reliable link management.
        </p>

        {/* STATUS BADGE */}
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          backgroundColor: '#fff', 
          padding: '10px 20px', 
          borderRadius: '50px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          border: '1px solid #e1e8ed'
        }}>
          {/* Titik Animasi Pulse (Warna Kuning/Orange tanda Standby) */}
          <div style={{ 
            width: '10px', 
            height: '10px', 
            backgroundColor: '#f39c12', 
            borderRadius: '50%', 
            marginRight: '10px',
            animation: 'pulseDot 2s ease-in-out infinite'
          }}></div>
          <span style={{ 
            fontSize: '13px', 
            fontWeight: 'bold', 
            color: '#7f8c8d', 
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>
            Status: Standby Mode
          </span>
        </div>

      </div>

      {/* WATERMARK KECIL DI POJOK BAWAH */}
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        color: '#bacad6', 
        fontSize: '12px',
        fontWeight: 'bold',
        letterSpacing: '1px'
      }}>
        V1LINK &copy; {new Date().getFullYear()}
      </div>

    </div>
  );
}
