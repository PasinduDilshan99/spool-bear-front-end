"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

const LoginPage = () => {
  const { login } = useAuth()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({})
  
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const uniqueCode = sessionStorage.getItem('uniqueCode')
    if (uniqueCode) {
      router.push('/')
    }
  }, [router])

  const validateForm = () => {
    const newErrors: typeof errors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } 
    // else if (formData.password.length < 6) {
    //   newErrors.password = 'Password must be at least 6 characters'
    // }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // if (!validateForm()) {
    //   return
    // }
    
    setIsLoading(true)
    setErrors({})
    
    try {
      const response = await login(formData.username, formData.password)
      
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('savedUsername', formData.username)
      } else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('savedUsername')
      }
      
      // Redirect to home page
      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
      setErrors({
        general: error instanceof Error ? error.message : 'Login failed. Please check your credentials.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleForgotPassword = () => {
    // Navigate to forgot password page
    router.push('/forgot-password')
  }

  // Load saved username if remember me was checked
  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername')
    const shouldRemember = localStorage.getItem('rememberMe') === 'true'
    
    if (shouldRemember && savedUsername) {
      setFormData(prev => ({ ...prev, username: savedUsername }))
      setRememberMe(true)
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8fafc',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#3b82f6',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            marginBottom: '1rem'
          }}>
            <div style={{
              position: 'relative',
              width: '3rem',
              height: '3rem',
              marginRight: '0.75rem'
            }}>
              <Image
                src="/logo.svg"
                alt="3DPrintHub Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <span style={{
              fontSize: '1.875rem',
              fontWeight: 700,
              color: 'white'
            }}>
              3DPrintHub
            </span>
          </Link>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'white',
            margin: 0
          }}>
            Welcome Back
          </h2>
          <p style={{
            color: '#dbeafe',
            marginTop: '0.5rem',
            fontSize: '0.875rem'
          }}>
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '2rem' }}>
          {errors.general && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="username" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Username or Email
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem',
                    border: `1px solid ${errors.username ? '#f87171' : '#d1d5db'}`,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#111827',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = errors.username ? '#f87171' : '#3b82f6'
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.username ? '#f87171' : '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                  placeholder="Enter your username or email"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p style={{
                  color: '#dc2626',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem'
                }}>
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label htmlFor="password" style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151'
                }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  style={{
                    fontSize: '0.75rem',
                    color: '#3b82f6',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#1d4ed8'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#3b82f6'
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem',
                    border: `1px solid ${errors.password ? '#f87171' : '#d1d5db'}`,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    color: '#111827',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = errors.password ? '#f87171' : '#3b82f6'
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.password ? '#f87171' : '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  {showPassword ? (
                    <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p style={{
                  color: '#dc2626',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem'
                }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    marginRight: '0.5rem',
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #d1d5db',
                    backgroundColor: rememberMe ? '#3b82f6' : 'white',
                    cursor: 'pointer'
                  }}
                  disabled={isLoading}
                />
                <span style={{
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  Remember me
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: isLoading ? '#93c5fd' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#1d4ed8'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#3b82f6'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              {isLoading ? (
                <>
                  <svg style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    animation: 'spin 1s linear infinite'
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '1.5rem 0'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
              <span style={{
                padding: '0 1rem',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                Or continue with
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            </div>

            

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                Don&apos;t have an account?{' '}
                <Link href="/signup" style={{
                  color: '#3b82f6',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1d4ed8'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#3b82f6'
                }}>
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1rem 2rem',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: '#6b7280'
          }}>
            By signing in, you agree to our{' '}
            <Link href="/terms" style={{
              color: '#3b82f6',
              textDecoration: 'none'
            }}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" style={{
              color: '#3b82f6',
              textDecoration: 'none'
            }}>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        input[type="checkbox"] {
          appearance: none;
          position: relative;
        }
        
        input[type="checkbox"]:checked::after {
          content: "✓";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
        }
        
        @media (max-width: 640px) {
          .social-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default LoginPage