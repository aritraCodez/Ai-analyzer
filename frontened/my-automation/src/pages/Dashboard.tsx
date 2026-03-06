import { useState } from 'react'
import { Play, Settings as SettingsIcon, Activity, Sparkles, LayoutDashboard, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Dashboard() {
    const [isRunning, setIsRunning] = useState(false)
    const [logs, setLogs] = useState<string[]>([])
    const [config, setConfig] = useState({
        platform: 'linkedin',
        search_query: 'Software Engineer',
        browser: 'chrome',
        mode: 'connect'
    })

    const toggleAutomation = async () => {
        if (isRunning) {
            setLogs(prev => [...prev, `Stopping automation...`])
            try {
                await fetch('http://localhost:8000/stop-automation', { method: 'POST' })
                setLogs(prev => [...prev, `Automation stopped.`])
                setIsRunning(false)
            } catch (error) {
                setLogs(prev => [...prev, `Error stopping: ${error}`])
            }
            return
        }

        setIsRunning(true)
        setLogs(prev => [...prev, `Starting automation (${config.platform} - "${config.search_query}" - ${config.browser})...`])

        try {
            const response = await fetch('http://localhost:8000/run-automation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            })

            if (!response.ok) throw new Error('Failed to start')

            const data = await response.json()
            setLogs(prev => [...prev, `Automation started: ${JSON.stringify(data.config)}`])
        } catch (error) {
            setLogs(prev => [...prev, `Error: ${error}`])
            setIsRunning(false)
        }
    }

    return (
        <div className="min-h-screen w-full mesh-gradient text-white p-4 md:p-8 font-sans overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-8 relative">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-3xl glass gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                            <Sparkles className="text-white w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold font-['Outfit'] tracking-tight">AutoFlow Dashboard</h1>
                            <p className="text-white/40 text-sm font-medium">Powering your daily automations</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className={`px-4 py-2 rounded-full border ${isRunning ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-white/5 border-white/10 text-white/40'} text-xs font-bold flex items-center gap-2`}>
                            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-white/20'}`}></div>
                            {isRunning ? 'SYSTEM ONLINE' : 'SYSTEM IDLE'}
                        </div>
                        <Link to="/settings">
                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/70">
                                <SettingsIcon className="w-5 h-5" />
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column - Config */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 rounded-3xl glass space-y-6">
                            <div className="flex items-center gap-2 mb-2">
                                <LayoutDashboard className="w-5 h-5 text-indigo-400" />
                                <h2 className="text-lg font-bold font-['Outfit']">Configuration</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Platform</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none font-medium text-sm"
                                        value={config.platform}
                                        onChange={(e) => setConfig({ ...config, platform: e.target.value })}
                                    >
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="naukri">Naukri</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Search Query</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-medium text-sm transition-all"
                                        placeholder="e.g. Software Engineer"
                                        value={config.search_query}
                                        onChange={(e) => setConfig({ ...config, search_query: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Browser</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none font-medium text-sm"
                                        value={config.browser}
                                        onChange={(e) => setConfig({ ...config, browser: e.target.value })}
                                    >
                                        <option value="chrome">Google Chrome</option>
                                        <option value="edge">Microsoft Edge</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Mode</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none font-medium text-sm"
                                        value={config.mode}
                                        onChange={(e) => setConfig({ ...config, mode: e.target.value })}
                                    >
                                        <option value="connect">Connect to Existing</option>
                                        <option value="launch">Launch New Instance</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={toggleAutomation}
                                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg ${isRunning
                                    ? 'bg-red-600 hover:bg-red-500 shadow-red-600/20'
                                    : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'}`}
                            >
                                {isRunning ? (
                                    <>
                                        <Activity className="w-5 h-5 animate-spin" />
                                        Stop Automation
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5 fill-current" />
                                        Start Automation
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Stats & Logs */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Applications', value: '0', sub: '+0 today', color: 'blue' },
                                { label: 'Success Rate', value: '0%', sub: '+0% last week', color: 'green' },
                                { label: 'Next Run', value: '00:00', sub: 'Scheduled hourly', color: 'purple' }
                            ].map((stat, i) => (
                                <div key={i} className="p-6 rounded-3xl glass border-white/5 bg-linear-to-br from-white/5 to-transparent">
                                    <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">{stat.label}</p>
                                    <div className="text-3xl font-bold font-['Outfit'] mb-1">{stat.value}</div>
                                    <p className="text-xs text-indigo-400 font-medium">{stat.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-0 rounded-3xl glass overflow-hidden border-white/5 flex flex-col h-[500px]">
                            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                                <div className="flex items-center gap-3">
                                    <Terminal className="w-5 h-5 text-indigo-400" />
                                    <h2 className="text-lg font-bold font-['Outfit']">Live Logs</h2>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-50"></div>
                                </div>
                            </div>
                            <ScrollArea className="flex-1 p-6 font-mono text-sm leading-relaxed">
                                {logs.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-white/20 italic space-y-4 py-20">
                                        <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center">
                                            <Activity className="w-8 h-8 opacity-20" />
                                        </div>
                                        <p>No activity recorded yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {logs.map((log, i) => (
                                            <div key={i} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                                                <span className="text-[10px] text-indigo-400/50 font-bold whitespace-nowrap mt-1 uppercase tracking-tighter">
                                                    {new Date().toLocaleTimeString([], { hour12: false })}
                                                </span>
                                                <span className="text-white/80">{log}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
