'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, Leaf, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

export default function AuthModal() {
  const { authModalOpen, authModalMode, closeAuthModal, setAuthModalMode, login, register } = useAuth();
  const { show } = useToast();

  const [mode, setMode] = useState(authModalMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Sync mode with context
  useEffect(() => {
    setMode(authModalMode);
    setError('');
  }, [authModalMode, authModalOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!authModalOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setError('');
      setShowPassword(false);
      setIsLoading(false);
    }
  }, [authModalOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    if (authModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [authModalOpen, closeAuthModal]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const user = await login(email, password);
        show(`Welcome back, ${user.name || 'there'}!`, 'success');
      } else {
        const user = await register(name, email, password);
        show(`Welcome to Swan Botanicals, ${user.name}!`, 'success');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-sand overflow-hidden z-10 animate-scale-in">
        {/* Header decoration */}
        <div className="bg-forest px-6 py-7 text-white text-center relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-3">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-display text-2xl font-normal text-white">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="font-body text-xs text-white/80 mt-1 max-w-xs mx-auto">
            {mode === 'login'
              ? 'Sign in to access your saved ritual, orders, and botanical wishlist.'
              : 'Join the Swan Botanicals community for tailored botanical care.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-sand bg-cream/40">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setAuthModalMode('login');
              setError('');
            }}
            className={`flex-1 py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              mode === 'login'
                ? 'text-forest border-b-2 border-forest bg-white font-bold'
                : 'text-stone hover:text-charcoal'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setAuthModalMode('register');
              setError('');
            }}
            className={`flex-1 py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
              mode === 'register'
                ? 'text-forest border-b-2 border-forest bg-white font-bold'
                : 'text-stone hover:text-charcoal'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-body flex items-start gap-2">
              <span className="font-bold shrink-0">!</span>
              <span>{error}</span>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-cream/40 border border-sand rounded-xl text-sm font-body text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-cream/40 border border-sand rounded-xl text-sm font-body text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-cream/40 border border-sand rounded-xl text-sm font-body text-charcoal placeholder:text-stone/60 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <p className="text-[11px] text-stone">
              By registering, you agree to our Terms of Service & Privacy Policy.
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-forest hover:bg-forest/90 text-white rounded-xl font-body text-sm font-medium shadow-sm transition flex items-center justify-center gap-2 mt-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{mode === 'login' ? 'Signing In…' : 'Creating Account…'}</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>

          <div className="text-center pt-2">
            {mode === 'login' ? (
              <p className="text-xs text-stone">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setAuthModalMode('register');
                    setError('');
                  }}
                  className="text-forest font-semibold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className="text-xs text-stone">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setAuthModalMode('login');
                    setError('');
                  }}
                  className="text-forest font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
