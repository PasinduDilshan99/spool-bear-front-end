"use client"
import React, { JSX, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { SignupData, useAuth } from '@/context/AuthContext'

const SignupPage = () => {
  const { signup } = useAuth()
  const router = useRouter()
  
  const [formData, setFormData] = useState<SignupData>({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobileNumber1: '',
    mobileNumber2: '',
  })
  
  const [errors, setErrors] = useState<{
    [key in keyof SignupData | 'confirmPassword' | 'terms' | 'general']?: string
  }>({})
  
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const validateForm = () => {
    const newErrors: typeof errors = {}
    
    // Required fields
    const requiredFields: (keyof SignupData)[] = [
      'username', 'password', 'firstName', 'lastName', 
      'email', 'mobileNumber1'
    ]
    
    requiredFields.forEach(field => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      }
    })
    
    // Username validation
    if (formData.username && formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }
    
    // Password validation
    if (formData.password) {
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, and numbers'
      }
    }
    
    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    if (formData.mobileNumber1 && !/^\d{10}$/.test(formData.mobileNumber1.replace(/\D/g, ''))) {
      newErrors.mobileNumber1 = 'Please enter a valid 10-digit phone number'
    }
    
    if (formData.mobileNumber2 && !/^\d{10}$/.test(formData.mobileNumber2.replace(/\D/g, ''))) {
      newErrors.mobileNumber2 = 'Please enter a valid 10-digit phone number'
    }
    
    // Terms acceptance
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    setErrors({})
    
    try {
      // Prepare signup data (remove confirmPassword as it's not part of SignupData type)
      const { confirmPassword, ...signupData } = formData
      
      await signup(signupData as SignupData)
      
      // Redirect to login page with success message
      router.push('/login?signup=success')
    } catch (error) {
      console.error('Signup error:', error)
      setErrors({
        general: error instanceof Error ? error.message : 'Signup failed. Please try again.'
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

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0,3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0,3)}) ${numbers.slice(3,6)}-${numbers.slice(6,10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const formatted = formatPhoneNumber(value)
    handleChange({
      ...e,
      target: { ...e.target, name, value: formatted }
    })
  }

  const formSections = [
    {
      title: 'Account Information',
      fields: [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          placeholder: 'Enter your username',
          icon: 'user',
          description: 'Choose a unique username (3+ characters)'
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'Enter your email',
          icon: 'mail',
          description: 'We\'ll send a verification email'
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'Create a strong password',
          icon: 'lock',
          description: 'Minimum 8 characters with uppercase, lowercase, and numbers'
        },
        {
          name: 'confirmPassword',
          label: 'Confirm Password',
          type: 'password',
          placeholder: 'Re-enter your password',
          icon: 'lock',
          description: 'Must match the password above'
        }
      ]
    },
    {
      title: 'Personal Information',
      fields: [
        {
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'Enter your first name',
          icon: 'user-circle'
        },
        {
          name: 'middleName',
          label: 'Middle Name (Optional)',
          type: 'text',
          placeholder: 'Enter your middle name',
          icon: 'user-circle'
        },
        {
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Enter your last name',
          icon: 'user-circle'
        },
        {
          name: 'mobileNumber1',
          label: 'Primary Phone Number',
          type: 'tel',
          placeholder: '(123) 456-7890',
          icon: 'phone',
          description: 'Your primary contact number'
        },
        {
          name: 'mobileNumber2',
          label: 'Secondary Phone Number (Optional)',
          type: 'tel',
          placeholder: '(123) 456-7890',
          icon: 'phone',
          description: 'Optional secondary contact number'
        }
      ]
    }
  ]

  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      user: (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      mail: (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      lock: (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      'user-circle': (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      phone: (
        <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    }
    return icons[iconName] || icons.user
  }

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
        maxWidth: '48rem',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: '#7c3aed',
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
            Create Your Account
          </h2>
          <p style={{
            color: '#ddd6fe',
            marginTop: '0.5rem',
            fontSize: '0.875rem'
          }}>
            Join our 3D printing community today
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
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {formSections.map((section, sectionIndex) => (
              <div key={sectionIndex} style={{
                marginBottom: sectionIndex === 0 ? '2rem' : '2.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '2px solid #e5e7eb'
                }}>
                  {section.title}
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  {section.fields.map((field) => (
                    <div key={field.name} style={{
                      marginBottom: '1rem'
                    }}>
                      <label htmlFor={field.name} style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#374151',
                        marginBottom: '0.25rem'
                      }}>
                        {field.label}
                      </label>
                      
                      <div style={{ position: 'relative' }}>
                        <div style={{
                          position: 'absolute',
                          left: '0.75rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: errors[field.name as keyof typeof errors] ? '#f87171' : '#9ca3af'
                        }}>
                          {getIcon(field.icon)}
                        </div>
                        
                        <input
                          id={field.name}
                          name={field.name}
                          type={
                            field.type === 'password' 
                              ? (field.name === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password'))
                              : field.type
                          }
                          value={formData[field.name as keyof typeof formData] || ''}
                          onChange={field.name.includes('mobileNumber') ? handlePhoneChange : handleChange}
                          style={{
                            width: '100%',
                            padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                            border: `1px solid ${errors[field.name as keyof typeof errors] ? '#f87171' : '#d1d5db'}`,
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            color: '#111827',
                            backgroundColor: 'white',
                            transition: 'all 0.2s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = errors[field.name as keyof typeof errors] ? '#f87171' : '#7c3aed'
                            e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = errors[field.name as keyof typeof errors] ? '#f87171' : '#d1d5db'
                            e.target.style.boxShadow = 'none'
                          }}
                          placeholder={field.placeholder}
                          disabled={isLoading}
                        />
                        
                        {(field.name === 'password' || field.name === 'confirmPassword') && (
                          <button
                            type="button"
                            onClick={() => field.name === 'password' 
                              ? setShowPassword(!showPassword)
                              : setShowConfirmPassword(!showConfirmPassword)
                            }
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
                            {field.name === 'password' ? (
                              showPassword ? (
                                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              ) : (
                                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              )
                            ) : (
                              showConfirmPassword ? (
                                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              ) : (
                                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              )
                            )}
                          </button>
                        )}
                      </div>
                      
                      {field.description && (
                        <p style={{
                          color: '#6b7280',
                          fontSize: '0.75rem',
                          marginTop: '0.25rem'
                        }}>
                          {field.description}
                        </p>
                      )}
                      
                      {errors[field.name as keyof typeof errors] && (
                        <p style={{
                          color: '#dc2626',
                          fontSize: '0.75rem',
                          marginTop: '0.25rem'
                        }}>
                          {errors[field.name as keyof typeof errors]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Terms and Conditions */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => {
                    setAcceptTerms(e.target.checked)
                    if (errors.terms) {
                      setErrors(prev => ({ ...prev, terms: undefined }))
                    }
                  }}
                  style={{
                    marginTop: '0.25rem',
                    marginRight: '0.5rem',
                    width: '1rem',
                    height: '1rem',
                    borderRadius: '0.25rem',
                    border: `1px solid ${errors.terms ? '#f87171' : '#d1d5db'}`,
                    backgroundColor: acceptTerms ? '#7c3aed' : 'white',
                    cursor: 'pointer'
                  }}
                  disabled={isLoading}
                />
                <span style={{
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  I agree to the{' '}
                  <Link href="/terms" style={{
                    color: '#7c3aed',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" style={{
                    color: '#7c3aed',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}>
                    Privacy Policy
                  </Link>
                  . I understand that my data will be used to provide 3D printing services and improve my experience.
                </span>
              </label>
              {errors.terms && (
                <p style={{
                  color: '#dc2626',
                  fontSize: '0.75rem',
                  marginLeft: '1.5rem',
                  marginTop: '0.25rem'
                }}>
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                backgroundColor: isLoading ? '#a78bfa' : '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#6d28d9'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#7c3aed'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              {isLoading ? (
                <>
                  <svg style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    animation: 'spin 1s linear infinite'
                  }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create Account
                </>
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
                Or sign up with
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }} />
            </div>

            {/* Social Signup Options */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                  e.currentTarget.style.borderColor = '#9ca3af'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.borderColor = '#d1d5db'
                }}
              >
                <svg style={{ width: '1.25rem', height: '1.25rem' }} viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb'
                  e.currentTarget.style.borderColor = '#9ca3af'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white'
                  e.currentTarget.style.borderColor = '#d1d5db'
                }}
              >
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="#000000" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>

            {/* Login Link */}
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                Already have an account?{' '}
                <Link href="/login" style={{
                  color: '#7c3aed',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#6d28d9'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#7c3aed'
                }}>
                  Sign in
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
            By creating an account, you get access to our 3D printing services,
            model marketplace, design tools, and community features.
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
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          
          .social-buttons {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default SignupPage