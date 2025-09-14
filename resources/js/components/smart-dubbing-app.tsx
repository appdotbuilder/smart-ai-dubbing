import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface VideoProcessingState {
    isProcessing: boolean;
    progress: number;
    currentStep: string;
    detectedCharacters: Array<{
        id: string;
        gender: 'male' | 'female';
        confidence: number;
        timestamp: string;
        detectionMethod: 'voice' | 'face' | 'both';
    }>;
}

export function SmartDubbingApp() {
    const [videoUrl, setVideoUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dubbingMode, setDubbingMode] = useState<'auto' | 'manual'>('auto');
    // Fixed language pair for Mandarin to Indonesian translation
    // Note: Currently hardcoded to Mandarin -> Indonesian as per requirements
    const [voiceStyle, setVoiceStyle] = useState('natural');
    const [outputMode, setOutputMode] = useState<'replace' | 'mix'>('replace');
    const [processing, setProcessing] = useState<VideoProcessingState>({
        isProcessing: false,
        progress: 0,
        currentStep: '',
        detectedCharacters: []
    });

    const handleUrlSubmit = async () => {
        if (!videoUrl.trim()) return;
        
        setProcessing({
            isProcessing: true,
            progress: 10,
            currentStep: 'Mengunduh video...',
            detectedCharacters: []
        });

        router.post(route('dubbing.store'), {
            video_url: videoUrl,
            dubbing_mode: dubbingMode,
            voice_style: voiceStyle,
            output_mode: outputMode,
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Continue with simulation for demo purposes
                simulateProcessing();
            },
            onError: (errors) => {
                console.error('Processing failed:', errors);
                setProcessing({
                    isProcessing: false,
                    progress: 0,
                    currentStep: 'Error: ' + (errors.video_url || errors.general || 'Processing failed'),
                    detectedCharacters: []
                });
            }
        });
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setProcessing({
            isProcessing: true,
            progress: 15,
            currentStep: 'Memproses video yang diunggah...',
            detectedCharacters: []
        });

        const formData = new FormData();
        formData.append('video_file', file);
        formData.append('dubbing_mode', dubbingMode);
        formData.append('voice_style', voiceStyle);
        formData.append('output_mode', outputMode);

        router.post(route('dubbing.store'), formData, {
            preserveState: true,
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                // Continue with simulation for demo purposes
                simulateProcessing();
            },
            onError: (errors) => {
                console.error('Processing failed:', errors);
                setProcessing({
                    isProcessing: false,
                    progress: 0,
                    currentStep: 'Error: ' + (errors.video_file || errors.general || 'Processing failed'),
                    detectedCharacters: []
                });
            }
        });
    };

    const simulateProcessing = async () => {
        const steps = [
            { progress: 25, step: 'Menganalisis audio dan video...' },
            { progress: 40, step: 'Mendeteksi karakter dengan AI...' },
            { progress: 55, step: 'Mengklasifikasi gender pembicara...' },
            { progress: 70, step: 'Menerjemahkan dari Mandarin ke Indonesia...' },
            { progress: 85, step: 'Menggenerate dubbing dengan AI...' },
            { progress: 100, step: 'Proses selesai! Video siap diunduh.' }
        ];

        for (const { progress, step } of steps) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setProcessing(prev => ({
                ...prev,
                progress,
                currentStep: step
            }));

            // Simulate character detection after analysis
            if (progress === 55) {
                setProcessing(prev => ({
                    ...prev,
                    detectedCharacters: [
                        {
                            id: '1',
                            gender: 'male',
                            confidence: 92,
                            timestamp: '00:05-01:23',
                            detectionMethod: 'voice'
                        },
                        {
                            id: '2', 
                            gender: 'female',
                            confidence: 88,
                            timestamp: '01:24-02:45',
                            detectionMethod: 'both'
                        },
                        {
                            id: '3',
                            gender: 'male',
                            confidence: 85,
                            timestamp: '02:46-03:30',
                            detectionMethod: 'face'
                        }
                    ]
                }));
            }
        }

        setTimeout(() => {
            setProcessing(prev => ({ ...prev, isProcessing: false }));
        }, 1000);
    };

    const resetApp = () => {
        setVideoUrl('');
        setSelectedFile(null);
        setProcessing({
            isProcessing: false,
            progress: 0,
            currentStep: '',
            detectedCharacters: []
        });
    };

    const supportedPlatforms = [
        { name: 'YouTube', icon: '📺', color: 'bg-red-100 text-red-800' },
        { name: 'TikTok', icon: '🎵', color: 'bg-pink-100 text-pink-800' },
        { name: 'Instagram', icon: '📸', color: 'bg-purple-100 text-purple-800' },
        { name: 'Facebook', icon: '👥', color: 'bg-blue-100 text-blue-800' }
    ];

    const voiceStyles = [
        { value: 'natural', label: '🎭 Natural', description: 'Suara alami dan ekspresif' },
        { value: 'anime', label: '🌟 Anime', description: 'Gaya suara anime Jepang' },
        { value: 'robot', label: '🤖 Robot', description: 'Suara robotik futuristik' },
        { value: 'formal', label: '👔 Formal', description: 'Suara profesional dan resmi' },
        { value: 'casual', label: '😊 Santai', description: 'Suara kasual dan ramah' },
        { value: 'dramatic', label: '🎬 Dramatis', description: 'Suara penuh emosi dan dramatis' }
    ];

    return (
        <div className="w-full space-y-8">
            {/* Main Processing Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center space-x-2">
                        <span>🚀</span>
                        <span>Smart AI Dubbing Engine</span>
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                        Upload video atau masukkan link untuk memulai proses dubbing otomatis
                    </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                    {!processing.isProcessing && processing.progress === 0 && (
                        <Tabs defaultValue="url" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="url" className="flex items-center space-x-2">
                                    <span>🔗</span>
                                    <span>Link Video</span>
                                </TabsTrigger>
                                <TabsTrigger value="upload" className="flex items-center space-x-2">
                                    <span>📁</span>
                                    <span>Upload File</span>
                                </TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="url" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="video-url">Link Video</Label>
                                    <div className="flex space-x-2">
                                        <Input
                                            id="video-url"
                                            placeholder="Masukkan link YouTube, TikTok, Instagram, atau Facebook..."
                                            value={videoUrl}
                                            onChange={(e) => setVideoUrl(e.target.value)}
                                            className="flex-1"
                                        />
                                        <Button 
                                            onClick={handleUrlSubmit}
                                            disabled={!videoUrl.trim()}
                                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                                        >
                                            <span className="mr-2">⚡</span>
                                            Proses
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-sm text-gray-600">Platform yang didukung:</span>
                                    {supportedPlatforms.map((platform) => (
                                        <Badge key={platform.name} className={`${platform.color} border-0`}>
                                            <span className="mr-1">{platform.icon}</span>
                                            {platform.name}
                                        </Badge>
                                    ))}
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="upload" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="video-file">Upload Video</Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                                        <div className="space-y-2">
                                            <div className="text-4xl">📁</div>
                                            <div className="text-gray-600">
                                                <Input
                                                    id="video-file"
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={handleFileUpload}
                                                    className="hidden"
                                                />
                                                <Label htmlFor="video-file" className="cursor-pointer text-purple-600 hover:text-purple-700 font-medium">
                                                    Klik untuk memilih video
                                                </Label>
                                                <p className="text-sm mt-1">atau drag & drop file video di sini</p>
                                            </div>
                                        </div>
                                        {selectedFile && (
                                            <div className="mt-4 text-sm text-gray-600">
                                                File dipilih: {selectedFile.name}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    )}

                    {/* Processing Status */}
                    {processing.isProcessing && (
                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-2xl mb-2">⚙️</div>
                                <h3 className="font-semibold text-lg text-gray-900">{processing.currentStep}</h3>
                                <p className="text-gray-600 text-sm">Mohon tunggu, AI sedang bekerja...</p>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Progress</span>
                                    <span>{processing.progress}%</span>
                                </div>
                                <Progress value={processing.progress} className="h-2" />
                            </div>
                        </div>
                    )}

                    {/* Character Detection Results */}
                    {processing.detectedCharacters.length > 0 && (
                        <div className="space-y-4">
                            <Separator />
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-3 flex items-center space-x-2">
                                    <span>🎭</span>
                                    <span>Karakter Terdeteksi</span>
                                </h3>
                                <div className="space-y-3">
                                    {processing.detectedCharacters.map((character) => (
                                        <div key={character.id} className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="text-2xl">
                                                        {character.gender === 'male' ? '👨' : '👩'}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            Karakter {character.id} - {character.gender === 'male' ? 'Pria' : 'Wanita'}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            {character.timestamp} • Confidence: {character.confidence}%
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge variant="secondary">
                                                    {character.detectionMethod === 'voice' && '🎤 Voice'}
                                                    {character.detectionMethod === 'face' && '👤 Face'}
                                                    {character.detectionMethod === 'both' && '🎯 Voice + Face'}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Settings Panel */}
                    {!processing.isProcessing && (processing.progress === 0 || processing.progress === 100) && (
                        <div className="space-y-6">
                            <Separator />
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Dubbing Mode */}
                                <div className="space-y-3">
                                    <Label className="text-base font-medium">🎯 Mode Dubbing</Label>
                                    <Select value={dubbingMode} onValueChange={(value: string) => setDubbingMode(value as 'auto' | 'manual')}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="auto">
                                                <div className="flex items-center space-x-2">
                                                    <span>🤖</span>
                                                    <span>Dubbing Otomatis (Gender Match)</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="manual">
                                                <div className="flex items-center space-x-2">
                                                    <span>✋</span>
                                                    <span>Dubbing Manual</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Voice Style */}
                                <div className="space-y-3">
                                    <Label className="text-base font-medium">🎨 Gaya Suara</Label>
                                    <Select value={voiceStyle} onValueChange={setVoiceStyle}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {voiceStyles.map((style) => (
                                                <SelectItem key={style.value} value={style.value}>
                                                    <div className="space-y-1">
                                                        <div>{style.label}</div>
                                                        <div className="text-xs text-gray-500">{style.description}</div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Language Settings */}
                                <div className="space-y-3">
                                    <Label className="text-base font-medium">🌍 Terjemahan</Label>
                                    <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                                        <span className="text-lg">🇨🇳</span>
                                        <span className="font-medium">Mandarin</span>
                                        <span>→</span>
                                        <span className="text-lg">🇮🇩</span>
                                        <span className="font-medium">Indonesia</span>
                                    </div>
                                </div>

                                {/* Output Mode */}
                                <div className="space-y-3">
                                    <Label className="text-base font-medium">🔄 Mode Output</Label>
                                    <Select value={outputMode} onValueChange={(value: string) => setOutputMode(value as 'replace' | 'mix')}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="replace">
                                                <div className="flex items-center space-x-2">
                                                    <span>🔄</span>
                                                    <span>Ganti Audio Asli</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="mix">
                                                <div className="flex items-center space-x-2">
                                                    <span>🎛️</span>
                                                    <span>Campur Audio Asli + Dubbing</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results and Actions */}
                    {processing.progress === 100 && !processing.isProcessing && (
                        <div className="space-y-4">
                            <Separator />
                            <div className="text-center space-y-4">
                                <div className="text-4xl">🎉</div>
                                <h3 className="text-xl font-bold text-green-600">Video Berhasil Diproses!</h3>
                                <p className="text-gray-600">
                                    Dubbing AI telah selesai dengan {processing.detectedCharacters.length} karakter terdeteksi. 
                                    Video siap untuk diunduh atau dibagikan.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        <span className="mr-2">⬇️</span>
                                        Download Video
                                    </Button>
                                    <Button variant="outline">
                                        <span className="mr-2">👁️</span>
                                        Preview
                                    </Button>
                                    <Button variant="outline">
                                        <span className="mr-2">📱</span>
                                        Share to Social Media
                                    </Button>
                                    <Button variant="outline" onClick={resetApp}>
                                        <span className="mr-2">🔄</span>
                                        Process New Video
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Feature Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-purple-800">
                            <span>🧠</span>
                            <span>AI Technology</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-purple-700">
                        <div>• Speech-to-Text dengan deteksi pembicara</div>
                        <div>• Klasifikasi gender otomatis</div>
                        <div>• Face Recognition untuk video silent</div>
                        <div>• Neural Voice Synthesis</div>
                        <div>• Real-time audio processing</div>
                    </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-800">
                            <span>⚡</span>
                            <span>Smart Features</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-green-700">
                        <div>• Auto subtitle generation</div>
                        <div>• Voice changer (M ↔ F)</div>
                        <div>• Multiple voice styles</div>
                        <div>• Sync perfect timing</div>
                        <div>• Social media ready output</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}