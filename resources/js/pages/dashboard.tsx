import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DubbingJob {
    id: number;
    source_type: 'url' | 'file';
    source_url?: string;
    source_file?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    voice_style: string;
    created_at: string;
    completed_at?: string;
}

interface Props {
    jobs?: DubbingJob[];
    [key: string]: unknown;
}

export default function Dashboard({ jobs = [] }: Props) {
    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { variant: 'secondary' as const, icon: '⏳', text: 'Menunggu', color: 'text-yellow-600' },
            processing: { variant: 'default' as const, icon: '⚙️', text: 'Memproses', color: 'text-blue-600' },
            completed: { variant: 'secondary' as const, icon: '✅', text: 'Selesai', color: 'text-green-600' },
            failed: { variant: 'destructive' as const, icon: '❌', text: 'Gagal', color: 'text-red-600' }
        };
        
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        
        return (
            <Badge variant={config.variant} className={`${config.color} border-0`}>
                <span className="mr-1">{config.icon}</span>
                {config.text}
            </Badge>
        );
    };

    const getSourceDisplay = (job: DubbingJob) => {
        if (job.source_type === 'url') {
            const url = job.source_url || '';
            if (url.includes('youtube.com')) return { icon: '📺', platform: 'YouTube' };
            if (url.includes('tiktok.com')) return { icon: '🎵', platform: 'TikTok' };
            if (url.includes('instagram.com')) return { icon: '📸', platform: 'Instagram' };
            if (url.includes('facebook.com')) return { icon: '👥', platform: 'Facebook' };
            return { icon: '🔗', platform: 'URL' };
        }
        return { icon: '📁', platform: 'File Upload' };
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title="🎬 Dashboard - Smart AI Dubbing" />
            <AppShell>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            🎬 Dashboard Dubbing
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Kelola dan pantau proses dubbing AI Anda
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-900 dark:to-indigo-900">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl">📊</div>
                                    <div>
                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                                            {jobs.length}
                                        </p>
                                        <p className="text-sm text-blue-600 dark:text-blue-400">Total Jobs</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-900 dark:to-emerald-900">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl">✅</div>
                                    <div>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                                            {jobs.filter(job => job.status === 'completed').length}
                                        </p>
                                        <p className="text-sm text-green-600 dark:text-green-400">Completed</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-900 dark:to-amber-900">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl">⚙️</div>
                                    <div>
                                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">
                                            {jobs.filter(job => job.status === 'processing').length}
                                        </p>
                                        <p className="text-sm text-yellow-600 dark:text-yellow-400">Processing</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 dark:from-purple-900 dark:to-violet-900">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="text-3xl">🎨</div>
                                    <div>
                                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">AI</p>
                                        <p className="text-sm text-purple-600 dark:text-purple-400">Smart Dubbing</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Jobs */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>📋</span>
                                <span>Riwayat Dubbing Terbaru</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {jobs.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🎬</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        Belum Ada Proyek Dubbing
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        Mulai proyek pertama Anda dengan mengupload video atau memasukkan link
                                    </p>
                                    <Button 
                                        onClick={() => window.location.href = '/'}
                                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                                    >
                                        <span className="mr-2">🚀</span>
                                        Mulai Dubbing Sekarang
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {jobs.slice(0, 10).map((job) => {
                                        const source = getSourceDisplay(job);
                                        return (
                                            <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="text-2xl">{source.icon}</div>
                                                        <div>
                                                            <div className="flex items-center space-x-2">
                                                                <h3 className="font-medium text-gray-900 dark:text-white">
                                                                    {source.platform} Dubbing #{job.id}
                                                                </h3>
                                                                {getStatusBadge(job.status)}
                                                            </div>
                                                            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                                <span>{formatDate(job.created_at)}</span>
                                                                <span className="mx-2">•</span>
                                                                <span className="capitalize">{job.voice_style} style</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-4">
                                                        {job.status === 'processing' && (
                                                            <div className="w-32">
                                                                <Progress value={job.progress} className="h-2" />
                                                                <div className="text-xs text-center mt-1 text-gray-600">
                                                                    {job.progress}%
                                                                </div>
                                                            </div>
                                                        )}
                                                        
                                                        {job.status === 'completed' && (
                                                            <div className="flex space-x-2">
                                                                <Button size="sm" variant="outline">
                                                                    <span className="mr-1">👁️</span>
                                                                    Preview
                                                                </Button>
                                                                <Button size="sm">
                                                                    <span className="mr-1">⬇️</span>
                                                                    Download
                                                                </Button>
                                                            </div>
                                                        )}
                                                        
                                                        {job.status === 'failed' && (
                                                            <Button size="sm" variant="outline">
                                                                <span className="mr-1">🔄</span>
                                                                Retry
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                        <CardContent className="p-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4">🚀 Siap untuk Dubbing Baru?</h2>
                                <p className="text-purple-100 mb-6">
                                    Transformasikan video Anda dengan teknologi AI terdepan
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button 
                                        onClick={() => window.location.href = '/'}
                                        className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                                    >
                                        <span className="mr-2">🎬</span>
                                        Mulai Proyek Baru
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        className="border-white text-white hover:bg-white hover:text-purple-600"
                                    >
                                        <span className="mr-2">📚</span>
                                        Panduan Penggunaan
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </AppShell>
        </>
    );
}