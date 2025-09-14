import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { SmartDubbingApp } from '@/components/smart-dubbing-app';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="🎬 Smart AI Dubbing - Transform Your Videos">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
                {/* Header Navigation */}
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">🎬</span>
                                </div>
                                <span className="font-bold text-xl text-gray-900 dark:text-white">Smart AI Dubbing</span>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            Daftar Gratis
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6 dark:bg-purple-900 dark:text-purple-300">
                                <span className="animate-pulse">✨</span>
                                <span>Teknologi AI Terdepan</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                🎬 <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Smart AI Dubbing</span>
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                                Transformasi video dengan teknologi AI canggih. Deteksi otomatis gender, terjemahan 
                                Mandarin ke Indonesia, dan dubbing yang natural dengan voice matching sempurna! 🚀
                            </p>
                            
                            {/* Feature Highlights */}
                            <div className="grid md:grid-cols-3 gap-6 mt-12">
                                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/20">
                                    <div className="text-3xl mb-3">🤖</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Auto Gender Detection</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">Deteksi otomatis gender pembicara dengan analisis suara & wajah</p>
                                </div>
                                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/20">
                                    <div className="text-3xl mb-3">🌏</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Translate & Dub</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">Terjemahan Mandarin ke Indonesia dengan dubbing sinkron</p>
                                </div>
                                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 dark:bg-gray-800/60 dark:border-gray-700/20">
                                    <div className="text-3xl mb-3">🎭</div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Voice Changer</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">Ubah suara pria jadi wanita atau sebaliknya dengan berbagai gaya</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main App Section */}
                <section className="py-16 bg-white/50 dark:bg-gray-800/50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SmartDubbingApp />
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🚀 Fitur Unggulan</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300">Teknologi AI terdepan untuk transformasi video yang menakjubkan</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">📹</div>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Multi Platform Input</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">YouTube, TikTok, Instagram, Facebook, atau upload dari galeri</p>
                            </div>
                            
                            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">🧠</div>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Speech-to-Text AI</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Deteksi otomatis pembicara dan klasifikasi gender</p>
                            </div>
                            
                            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">👥</div>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Face Recognition</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Analisis wajah untuk deteksi gender pada video tanpa suara</p>
                            </div>
                            
                            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">🎨</div>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Gaya Suara</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Natural, anime, robot, formal, santai - pilihan beragam!</p>
                            </div>
                            
                            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Real-time Preview</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Preview hasil dubbing secara langsung</p>
                            </div>
                            
                            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">📝</div>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Auto Subtitle</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Subtitle otomatis sinkron dengan dubbing</p>
                            </div>
                            
                            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">🔄</div>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Audio Mixing</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Ganti audio asli atau campur dengan dubbing</p>
                            </div>
                            
                            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Easy Sharing</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">Simpan ke galeri atau bagikan ke media sosial</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-bold text-white mb-6">Siap Mencoba? 🎉</h2>
                        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            Bergabung dengan ribuan kreator yang sudah menggunakan Smart AI Dubbing untuk 
                            transformasi video yang menakjubkan!
                        </p>
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl"
                                >
                                    🚀 Mulai Gratis Sekarang
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
                                >
                                    Masuk ke Akun
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🎬</span>
                            </div>
                            <span className="font-bold text-xl">Smart AI Dubbing</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Transformasi video dengan teknologi AI terdepan. Dibuat dengan ❤️ untuk kreator Indonesia.
                        </p>
                        <div className="text-sm text-gray-500">
                            © 2024 Smart AI Dubbing. Semua hak dilindungi.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}