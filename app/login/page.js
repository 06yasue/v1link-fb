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
        router.push('/link'); 
      } else {
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
      <style dangerouslySetInnerHTML={{__html: `
        body {
          margin: 0;
          background-color: #f5f7fa;
        }
        .login-bg {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
        }
        .login-wrapper {
          width: 100%;
          max-width: 420px; /* Bikin kotaknya lebar dan ideal */
        }
        .login-panel {
          border: none;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          background: #fff;
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
          border-radius: 8px;
          height: 50px; /* Bikin inputan lebih tinggi dan gemuk */
          font-size: 15px;
          box-shadow: none;
          border: 2px solid #e2e8f0;
          padding: 10px 15px;
        }
        .form-control-custom:focus {
          border-color: #337ab7;
          box-shadow: 0 0 0 3px rgba(51, 122, 183, 0.1);
          outline: none;
        }
        .btn-custom {
          border-radius: 8px;
          height: 50px;
          font-weight: bold;
          font-size: 15px;
          letter-spacing: 1px;
          transition: all 0.3s;
        }
        .btn-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(51, 122, 183, 0.3);
        }
      `}} />

      <div className="login-bg">
        <div className="login-wrapper">
          
          <div className="panel panel-default login-panel">
            <div className="panel-body" style={{ padding: '40px' }}>
              
              {/* Bagian Logo & SVG Animasi */}
              <div className="text-center" style={{ marginBottom: '35px' }}>
                <svg className="animated-svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#337ab7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <h3 style={{ fontWeight: 'bold', margin: '20px 0 5px 0', color: '#2d3748', fontSize: '24px' }}>Secure Access</h3>
                <p className="text-muted" style={{ fontSize: '14px' }}>Please sign in to continue</p>
              </div>

              {/* Area Error Message */}
              {errorMsg && (
                <div className="alert alert-danger text-center" style={{ borderRadius: '8px', fontSize: '14px', padding: '12px', marginBottom: '25px', border: 'none', backgroundColor: '#fee2e2', color: '#991b1b' }}>
                  <i className="material-icons" style={{ fontSize: '18px', verticalAlign: 'text-bottom', marginRight: '5px' }}>error_outline</i>
                  {errorMsg}
                </div>
              )}

              {/* Form Login */}
              <form onSubmit={handleLogin}>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#4a5568', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Email Address</label>
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

                <div className="form-group" style={{ marginBottom: '35px' }}>
                  <label style={{ color: '#4a5568', fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Password</label>
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
                     <span><i className="material-icons" style={{ fontSize: '18px', verticalAlign: 'text-bottom', marginRight: '8px' }}>hourglass_empty</i> AUTHENTICATING...</span>
                  ) : (
                    'SIGN IN'
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
