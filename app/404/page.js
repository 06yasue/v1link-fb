export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div className="panel panel-default text-center" style={{ 
        maxWidth: '550px', 
        width: '100%',
        borderRadius: '6px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: 'none',
        borderTop: '4px solid #d9534f' 
      }}>
        <div className="panel-body" style={{ padding: '50px 30px' }}>
          
          {/* Ilustrasi SVG: Broken Link */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#d9534f" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ width: '120px', height: '120px', marginBottom: '25px' }}
          >
            {/* Sisi Kanan Link */}
            <path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3"></path>
            {/* Sisi Kiri Link */}
            <path d="M9 17H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path>
            {/* Garis Putus di Tengah (Menandakan link rusak) */}
            <line x1="8" y1="12" x2="16" y2="12" strokeDasharray="3 3"></line>
          </svg>

          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#333', 
            marginTop: '0',
            marginBottom: '10px',
            letterSpacing: '-1px'
          }}>
            404
          </h1>
          
          <h3 style={{ 
            fontSize: '22px', 
            color: '#555', 
            marginTop: '0', 
            marginBottom: '15px' 
          }}>
            Page Not Found
          </h3>
          
          <p className="text-muted" style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
            Oops! The link you clicked might be broken, or the page may have been removed. Please check the URL and try again.
          </p>
          
          <a href="/" className="btn btn-danger btn-lg" style={{ 
            padding: '12px 30px', 
            fontWeight: 'bold', 
            borderRadius: '4px',
            letterSpacing: '0.5px'
          }}>
            GO BACK HOME
          </a>

        </div>
      </div>
    </div>
  );
}
