import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);
    const [resetMode, setResetMode] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyExistingSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    navigate("/dashboard", { replace: true });
                }
            } catch (err) {
                console.warn("Could not check existing session:", err);
            } finally {
                setCheckingSession(false);
            }
        };

        verifyExistingSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                navigate("/dashboard", { replace: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            toast.error("Supabase credentials missing in .env configuration.");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });

            if (error) {
                console.error("Login authentication error:", error);
                if (error.message.toLowerCase().includes("failed to fetch") || error.status === 503) {
                    toast.error("Supabase project is paused or unreachable. Please unpause it from Supabase Dashboard.", {
                        duration: 6000,
                    });
                } else {
                    toast.error(error.message);
                }
            } else if (data.session) {
                toast.success("Welcome back, Aman!");
                navigate("/dashboard");
            }
        } catch (err: any) {
            console.error("Unexpected login error:", err);
            toast.error(err.message || "An unexpected error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Please enter your admin email address.");
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                redirectTo: `${window.location.origin}/dashboard/editor`,
            });
            if (error) {
                toast.error(error.message);
            } else {
                setResetSent(true);
                toast.success("Password reset instructions sent to your email!");
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    if (checkingSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-md">
                {/* Back to Home Link */}
                <div className="mb-6">
                    <Link
                        to="/"
                        className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Aman UX Studio
                    </Link>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
                    <div className="text-center mb-8">
                        <div className="mx-auto h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {resetMode ? "Reset Password" : "Admin Portal"}
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            {resetMode
                                ? "Enter your admin email to receive a recovery link."
                                : "Sign in to manage blog posts, categories, and client inquiries."}
                        </p>
                    </div>

                    {!import.meta.env.VITE_SUPABASE_URL && (
                        <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-xs text-amber-800">
                            <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span>VITE_SUPABASE_URL is not set. Add your Supabase keys to your environment.</span>
                        </div>
                    )}

                    {resetMode ? (
                        resetSent ? (
                            <div className="text-center py-4 space-y-4">
                                <p className="text-sm text-slate-600">
                                    A password reset link has been dispatched to <strong>{email}</strong>. Check your inbox and spam folder.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => { setResetMode(false); setResetSent(false); }}
                                    className="w-full"
                                >
                                    Return to Sign In
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handlePasswordReset} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="reset-email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                                    <Input
                                        id="reset-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-11 border-slate-200"
                                        placeholder="admin@example.com"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                                >
                                    {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
                                    Send Recovery Link
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setResetMode(false)}
                                    className="w-full text-center text-xs text-slate-500 hover:text-blue-600 transition-colors pt-2"
                                >
                                    Cancel and return to sign in
                                </button>
                            </form>
                        )
                    ) : (
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-11 border-slate-200 focus:border-blue-500"
                                    placeholder="admin@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                                    <button
                                        type="button"
                                        onClick={() => setResetMode(true)}
                                        className="text-xs text-blue-600 hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-11 pr-10 border-slate-200 focus:border-blue-500"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        tabIndex={-1}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-11 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md hover:shadow-lg mt-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                        Authenticating...
                                    </>
                                ) : (
                                    "Sign In to Dashboard"
                                )}
                            </Button>
                        </form>
                    )}
                </div>

                <div className="mt-8 text-center text-xs text-slate-400">
                    <p>&copy; {new Date().getFullYear()} Aman UX Studio. Secure Administrative Gateway.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
