<?php

namespace Database\Factories;

use App\Models\DubbingJob;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DubbingJob>
 */
class DubbingJobFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\DubbingJob>
     */
    protected $model = DubbingJob::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sourceType = fake()->randomElement(['url', 'file']);
        $status = fake()->randomElement(['pending', 'processing', 'completed', 'failed']);
        
        return [
            'user_id' => fake()->boolean(70) ? User::factory() : null,
            'source_type' => $sourceType,
            'source_url' => $sourceType === 'url' ? fake()->randomElement([
                'https://www.youtube.com/watch?v=' . fake()->regexify('[A-Za-z0-9_-]{11}'),
                'https://www.tiktok.com/@user/video/' . fake()->numerify('####################'),
                'https://www.instagram.com/p/' . fake()->regexify('[A-Za-z0-9_-]{11}') . '/',
                'https://www.facebook.com/video.php?v=' . fake()->numerify('##########'),
            ]) : null,
            'source_file' => $sourceType === 'file' ? 'videos/' . fake()->uuid() . '.mp4' : null,
            'dubbing_mode' => fake()->randomElement(['auto', 'manual']),
            'voice_style' => fake()->randomElement(['natural', 'anime', 'robot', 'formal', 'casual', 'dramatic']),
            'output_mode' => fake()->randomElement(['replace', 'mix']),
            'status' => $status,
            'progress' => $status === 'completed' ? 100 : ($status === 'processing' ? fake()->numberBetween(10, 95) : 0),
            'detected_characters' => $this->generateDetectedCharacters(),
            'processing_info' => $this->generateProcessingInfo(),
            'output_files' => $status === 'completed' ? $this->generateOutputFiles() : null,
            'error_message' => $status === 'failed' ? fake()->sentence() : null,
            'started_at' => in_array($status, ['processing', 'completed', 'failed']) ? fake()->dateTimeBetween('-1 hour', 'now') : null,
            'completed_at' => $status === 'completed' ? fake()->dateTimeBetween('started_at', 'now') : null,
        ];
    }

    /**
     * Indicate that the job is processing.
     */
    public function processing(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'processing',
            'progress' => fake()->numberBetween(10, 95),
            'started_at' => fake()->dateTimeBetween('-30 minutes', 'now'),
            'completed_at' => null,
        ]);
    }

    /**
     * Indicate that the job is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'progress' => 100,
            'output_files' => $this->generateOutputFiles(),
            'started_at' => fake()->dateTimeBetween('-2 hours', '-30 minutes'),
            'completed_at' => fake()->dateTimeBetween('started_at', 'now'),
        ]);
    }

    /**
     * Indicate that the job has failed.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'failed',
            'progress' => fake()->numberBetween(10, 90),
            'error_message' => fake()->randomElement([
                'Video download failed: Invalid URL',
                'Audio processing error: Unsupported format',
                'AI service timeout: Please try again',
                'File size too large: Maximum 100MB allowed',
                'Video too long: Maximum 10 minutes allowed',
            ]),
            'started_at' => fake()->dateTimeBetween('-1 hour', 'now'),
            'completed_at' => null,
        ]);
    }

    /**
     * Indicate that the job has a video URL source.
     */
    public function fromUrl(): static
    {
        return $this->state(fn (array $attributes) => [
            'source_type' => 'url',
            'source_url' => fake()->randomElement([
                'https://www.youtube.com/watch?v=' . fake()->regexify('[A-Za-z0-9_-]{11}'),
                'https://www.tiktok.com/@user/video/' . fake()->numerify('####################'),
                'https://www.instagram.com/p/' . fake()->regexify('[A-Za-z0-9_-]{11}') . '/',
                'https://www.facebook.com/video.php?v=' . fake()->numerify('##########'),
            ]),
            'source_file' => null,
        ]);
    }

    /**
     * Indicate that the job has an uploaded file source.
     */
    public function fromFile(): static
    {
        return $this->state(fn (array $attributes) => [
            'source_type' => 'file',
            'source_url' => null,
            'source_file' => 'videos/' . fake()->uuid() . '.mp4',
        ]);
    }

    /**
     * Generate mock detected characters data.
     *
     * @return array
     */
    protected function generateDetectedCharacters(): array
    {
        $characters = [];
        $numCharacters = fake()->numberBetween(1, 4);
        
        for ($i = 1; $i <= $numCharacters; $i++) {
            $startTime = fake()->numberBetween(0, 180); // 0-3 minutes
            $duration = fake()->numberBetween(10, 60); // 10-60 seconds
            $endTime = $startTime + $duration;
            
            $characters[] = [
                'id' => (string) $i,
                'gender' => fake()->randomElement(['male', 'female']),
                'confidence' => fake()->numberBetween(75, 98),
                'timestamp' => sprintf('%02d:%02d-%02d:%02d', 
                    intval($startTime / 60), $startTime % 60,
                    intval($endTime / 60), $endTime % 60
                ),
                'detection_method' => fake()->randomElement(['voice', 'face', 'both']),
                'original_language' => 'mandarin',
                'translated_text' => fake()->sentence(),
            ];
        }
        
        return $characters;
    }

    /**
     * Generate mock processing info.
     *
     * @return array
     */
    protected function generateProcessingInfo(): array
    {
        $duration = fake()->numberBetween(30, 600); // 30 seconds to 10 minutes
        
        return [
            'original_duration' => sprintf('%02d:%02d', intval($duration / 60), $duration % 60),
            'file_size' => fake()->randomFloat(1, 5.0, 150.0) . ' MB',
            'resolution' => fake()->randomElement(['1280x720', '1920x1080', '3840x2160', '854x480']),
            'voice_style_used' => fake()->randomElement(['natural', 'anime', 'robot', 'formal', 'casual', 'dramatic']),
            'translation_accuracy' => fake()->numberBetween(85, 98) . '%',
            'processing_time' => fake()->numberBetween(30, 300) . ' seconds',
            'ai_model_version' => 'v' . fake()->randomFloat(1, 1.0, 3.0),
        ];
    }

    /**
     * Generate mock output files.
     *
     * @return array
     */
    protected function generateOutputFiles(): array
    {
        $jobId = fake()->uuid();
        
        return [
            'dubbed_video' => "/storage/videos/dubbed_{$jobId}.mp4",
            'subtitles' => "/storage/subtitles/{$jobId}.srt",
            'audio_only' => "/storage/audio/dubbed_{$jobId}.mp3",
            'original_audio' => "/storage/audio/original_{$jobId}.mp3",
            'thumbnail' => "/storage/thumbnails/{$jobId}.jpg",
        ];
    }
}