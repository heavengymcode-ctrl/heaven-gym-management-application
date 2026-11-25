import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import HeavenLogo from '@/components/public/HeavenLogo';
import Hero3DCanvas from '@/components/public/Hero3DCanvas';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { signIn } from '@/redux/slices/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await dispatch(signIn({ email, password })).unwrap();
      if (result.user) {
        navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050608] text-white">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative flex flex-col overflow-hidden border-b border-white/10 px-5 pb-2 pt-6 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-10 xl:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_15%,rgba(220,38,38,0.18),transparent_42%),radial-gradient(ellipse_at_80%_75%,rgba(16,185,129,0.10),transparent_38%)]" />
          <div className="absolute inset-0 bg-hero-grid bg-[size:44px_44px] opacity-[0.08]" />
          <div className="relative z-10 flex items-center justify-between">
            <Link to="/" aria-label="Heaven Gym home">
              <HeavenLogo variant="header" theme="dark" size="sm" />
            </Link>
            <Link to="/" className="text-xs font-medium text-surface-400 transition hover:text-white">
              Back to website
            </Link>
          </div>

          <div className="relative z-10 mx-auto mt-6 w-full max-w-2xl lg:my-auto lg:mt-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">
              <ShieldCheck size={14} />
              Member & admin access
            </div>
            <h1 className="mt-5 max-w-xl font-display text-3xl font-black leading-tight tracking-tight sm:text-5xl xl:text-6xl">
              Your next level
              <span className="block bg-gradient-to-r from-brand-300 via-red-400 to-amber-300 bg-clip-text text-transparent">
                starts here.
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-surface-300 sm:text-base sm:leading-7">
              Sign in to manage your membership, follow your progress, and keep your training journey moving.
            </p>
            <div className="relative mt-2 h-[190px] w-full sm:h-[260px] lg:mt-5 lg:h-[360px] xl:h-[420px]">
              <Hero3DCanvas />
            </div>
            <div className="hidden items-center gap-3 text-xs text-surface-400 sm:flex">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Membership</span>
              <span className="h-1 w-1 rounded-full bg-surface-600" />
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Progress tracking</span>
              <span className="h-1 w-1 rounded-full bg-surface-600" />
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Orders & payments</span>
            </div>
          </div>
          <p className="relative z-10 mt-5 text-[11px] text-surface-500 lg:mt-8">© {new Date().getFullYear()} Heaven Gym. Built through discipline.</p>
        </section>

        <section className="relative flex items-center justify-center px-5 py-10 sm:px-8 lg:px-10 xl:px-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.08),transparent_45%)]" />
          <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">Welcome back</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white">Sign in</h2>
              <p className="mt-2 text-sm leading-6 text-surface-400">Enter your account details to continue.</p>
            </div>

            {location.state?.verified && (
              <div role="status" className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
                Email verified successfully. You can now sign in.
              </div>
            )}
            {location.state?.message && (
              <div role="status" className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                {location.state.message}
              </div>
            )}
            {error && (
              <div role="alert" className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Email address" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="border-white/10 bg-[#0b0d12] text-white placeholder:text-surface-600" />
              <Input label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="border-white/10 bg-[#0b0d12] text-white placeholder:text-surface-600" />
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm font-medium text-brand-300 transition hover:text-brand-200">Forgot password?</Link>
              </div>
              <Button type="submit" loading={loading} className="w-full" size="lg">
                Sign in <ArrowRight size={16} />
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-surface-400">
              Don’t have an account? <Link to="/register" className="font-semibold text-brand-300 transition hover:text-brand-200">Create one</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
