export default function Footer() {
  return (
    <footer style={{ 
      padding: '30px 0', 
      borderTop: '1px solid #ddd', // GARIS JELAS DI ATAS AREA FOOTER
      marginTop: '50px', 
      background: '#fff' 
    }}>
      <div className="container text-center">
        <p style={{ color: '#666', fontSize: '14px', margin: 0, letterSpacing: '0.3px' }}>
          &copy; {new Date().getFullYear()} <strong>V1LINK FB</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
