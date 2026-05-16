'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // Jika sukses, arahkan ke dashboard/generator
        router.push('/link'); 
      } else {
        // Jika gagal, tampilkan error di UI (Bukan pakai alert!)
        setErrorMsg(data.message || 'Authentication failed.');
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* CSS Animasi Khusus Halaman Login */}
      <style dangerouslySetInnerHTML={{__html: `
        .login-bg {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        .login-panel {
          border: none;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animated-svg {
          animation: float 3s ease-in-out infinite;
        }
        .form-control-custom {
          border-radius: 6px;
          height: 46px;
          box-shadow: none;
          border: 2px solid #eee;
        }
        .form-control-custom:focus {
          border-color: #337ab7;
          box-shadow: none;
        }
        .btn-custom {
          border-radius: 6px;
          padding: 12px;
          font-weight: bold;
          letter-spacing: 1px;
        }
      `}} />

      <div className="login-bg">
        <div className="container">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
              
              <div className="panel panel-default login-panel">
                <div className="panel-body" style={{ padding: '40px 30px' }}>
                  
                  {/* Bagian Logo & SVG Animasi */}
                  <div className="text-center" style={{ marginBottom: '30px' }}>
                    <svg className="animated-svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#337ab7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <h3 style={{ fontWeight: 'bold', marginTop: '15px', color: '#333' }}>Secure Access</h3>
                    <p className="text-muted" style={{ fontSize: '13px' }}>Please sign in to continue</p>
                  </div>

                  {/* Area Error Message (Pengganti JS Alert) */}
                  {errorMsg && (
                    <div className="alert alert-danger text-center" style={{ borderRadius: '6px', fontSize: '13px', padding: '10px' }}>
                      <i className="material-icons" style={{ fontSize: '16px', verticalAlign: 'text-bottom', marginRight: '5px' }}>error_outline</i>
                      {errorMsg}
                    </div>
                  )}

                  {/* Form Login */}
                  <form onSubmit={handleLogin}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ color: '#555', fontSize: '13px' }}>Email Address</label>
                      <input 
                        type="email" 
                        className="form-control form-control-custom" 
                        placeholder="admin@v1link.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        disabled={isLoading}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '30px' }}>
                      <label style={{ color: '#555', fontSize: '13px' }}>Password</label>
                      <input 
                        type="password" 
                        className="form-control form-control-custom" 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        disabled={isLoading}
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary btn-block btn-custom" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                         <span><i className="material-icons" style={{ fontSize: '16px', verticalAlign: 'middle' }}>hourglass_empty</i> AUTHENTICATING...</span>
                      ) : (
                        'SIGN IN'
                      )}
                    </button>
                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
