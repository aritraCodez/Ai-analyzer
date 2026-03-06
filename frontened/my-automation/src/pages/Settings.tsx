import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Briefcase, MapPin, Monitor, LogOut, Sparkles, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/components/AuthContext'

export default function Settings() {
    const [loading, setLoading] = useState(false)
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
        navigate('/login')
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // TODO: Save to Supabase
        setTimeout(() => setLoading(false), 1000)
    }

    return (
        <div className="min-h-screen w-full mesh-gradient text-white p-4 md:p-8 font-sans overflow-x-hidden">
            <div className="max-w-4xl mx-auto space-y-8 relative">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-3xl glass gap-4">
                    <div className="flex items-center gap-4">
                        <Link to="/">
                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/70">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold font-['Outfit'] tracking-tight">Settings</h1>
                            <p className="text-white/40 text-sm font-medium">Manage your automation preferences</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all font-bold text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

                <form onSubmit={handleSave} className="grid grid-cols-1 gap-8">
                    {/* Job Preferences Card */}
                    <div className="p-8 rounded-3xl glass space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center border border-indigo-600/30">
                                <Briefcase className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold font-['Outfit']">Job Preferences</h2>
                                <p className="text-white/30 text-xs">Define your target roles and locations</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Job Titles</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-sm transition-all"
                                    placeholder="e.g. Software Engineer, React Developer"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Locations</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-sm transition-all"
                                        placeholder="e.g. Remote, Bangalore"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Browser Settings Card */}
                    <div className="p-8 rounded-3xl glass space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-600/30">
                                <Monitor className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold font-['Outfit']">Browser Configuration</h2>
                                <p className="text-white/30 text-xs">How the automation interacts with your device</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Default Browser</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none font-medium text-sm transition-all">
                                    <option value="chrome">Google Chrome</option>
                                    <option value="edge">Microsoft Edge</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Connection Mode</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none font-medium text-sm transition-all">
                                    <option value="connect">Connect to Existing (Port 9222)</option>
                                    <option value="launch">Launch New Instance</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                            <p className="text-xs text-white/50 leading-relaxed font-medium">
                                For <span className="text-white">Connect Mode</span>, ensure your browser is launched with
                                <code className="mx-1 px-1.5 py-0.5 bg-black/40 rounded border border-white/5 text-purple-300">--remote-debugging-port=9222</code>
                            </p>
                        </div>
                    </div>

                    {/* Save Footer */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-4 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all shadow-xl shadow-white/10 flex items-center gap-3 disabled:opacity-50"
                        >
                            {loading ? (
                                <Activity className="w-5 h-5 animate-spin" />
                            ) : (
                                <Save className="w-5 h-5" />
                            )}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
