<?php

namespace Tests\Feature;

use App\Models\DubbingJob;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DubbingTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_page_displays_dubbing_interface(): void
    {
        $response = $this->get('/');
        
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
        );
    }

    public function test_user_can_submit_video_url_for_dubbing(): void
    {
        $response = $this->post('/dubbing', [
            'video_url' => 'https://www.youtube.com/watch?v=test123',
            'dubbing_mode' => 'auto',
            'voice_style' => 'natural',
            'output_mode' => 'replace',
        ]);

        $response->assertStatus(302);
        $response->assertSessionHas('success');
    }

    public function test_user_can_upload_video_file_for_dubbing(): void
    {
        Storage::fake('public');
        
        $file = UploadedFile::fake()->create('test-video.mp4', 1024, 'video/mp4');

        $response = $this->post('/dubbing', [
            'video_file' => $file,
            'dubbing_mode' => 'auto',
            'voice_style' => 'natural',
            'output_mode' => 'replace',
        ]);

        $response->assertStatus(302);
        $response->assertSessionHas('success');
    }

    public function test_dubbing_form_validates_required_fields(): void
    {
        $response = $this->post('/dubbing', []);

        $response->assertSessionHasErrors(['dubbing_mode', 'voice_style', 'output_mode']);
    }

    public function test_dubbing_form_validates_video_url_format(): void
    {
        $response = $this->post('/dubbing', [
            'video_url' => 'not-a-valid-url',
            'dubbing_mode' => 'auto',
            'voice_style' => 'natural',
            'output_mode' => 'replace',
        ]);

        $response->assertSessionHasErrors(['video_url']);
    }

    public function test_dubbing_form_validates_file_type(): void
    {
        $file = UploadedFile::fake()->create('test-file.txt', 1024, 'text/plain');

        $response = $this->post('/dubbing', [
            'video_file' => $file,
            'dubbing_mode' => 'auto',
            'voice_style' => 'natural',
            'output_mode' => 'replace',
        ]);

        $response->assertSessionHasErrors(['video_file']);
    }

    public function test_authenticated_user_can_view_dashboard_with_jobs(): void
    {
        $user = User::factory()->create();
        $jobs = DubbingJob::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('dashboard')
                ->has('jobs', 3)
        );
    }

    public function test_guest_cannot_access_dashboard(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/login');
    }

    public function test_dubbing_job_model_has_correct_attributes(): void
    {
        $job = DubbingJob::factory()->create([
            'source_type' => 'url',
            'source_url' => 'https://www.youtube.com/watch?v=test123',
            'dubbing_mode' => 'auto',
            'voice_style' => 'natural',
            'output_mode' => 'replace',
            'status' => 'processing',
            'progress' => 50,
        ]);

        $this->assertEquals('url', $job->source_type);
        $this->assertEquals('https://www.youtube.com/watch?v=test123', $job->source_url);
        $this->assertEquals('auto', $job->dubbing_mode);
        $this->assertEquals('natural', $job->voice_style);
        $this->assertEquals('replace', $job->output_mode);
        $this->assertEquals('processing', $job->status);
        $this->assertEquals(50, $job->progress);
        $this->assertTrue($job->isProcessing());
        $this->assertFalse($job->isCompleted());
        $this->assertFalse($job->hasFailed());
    }

    public function test_dubbing_job_can_be_marked_as_completed(): void
    {
        $job = DubbingJob::factory()->create(['status' => 'processing']);

        $outputFiles = [
            'dubbed_video' => '/storage/videos/dubbed_123.mp4',
            'subtitles' => '/storage/subtitles/123.srt',
        ];

        $job->markAsCompleted($outputFiles);

        $this->assertEquals('completed', $job->status);
        $this->assertEquals(100, $job->progress);
        $this->assertEquals($outputFiles, $job->output_files);
        $this->assertNotNull($job->completed_at);
    }

    public function test_dubbing_job_can_be_marked_as_failed(): void
    {
        $job = DubbingJob::factory()->create(['status' => 'processing']);

        $errorMessage = 'Video download failed';
        $job->markAsFailed($errorMessage);

        $this->assertEquals('failed', $job->status);
        $this->assertEquals($errorMessage, $job->error_message);
        $this->assertTrue($job->hasFailed());
    }
}