<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\DubbingJob
 *
 * @property int $id
 * @property int|null $user_id
 * @property string $source_type
 * @property string|null $source_url
 * @property string|null $source_file
 * @property string $dubbing_mode
 * @property string $voice_style
 * @property string $output_mode
 * @property string $status
 * @property int $progress
 * @property array|null $detected_characters
 * @property array|null $processing_info
 * @property array|null $output_files
 * @property string|null $error_message
 * @property \Illuminate\Support\Carbon|null $started_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob query()
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereDetectedCharacters($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereDubbingMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereErrorMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereOutputFiles($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereOutputMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereProcessingInfo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereSourceFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereSourceType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereSourceUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob whereVoiceStyle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob processing()
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob completed()
 * @method static \Illuminate\Database\Eloquent\Builder|DubbingJob failed()
 * @method static \Database\Factories\DubbingJobFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DubbingJob extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'source_type',
        'source_url',
        'source_file',
        'dubbing_mode',
        'voice_style',
        'output_mode',
        'status',
        'progress',
        'detected_characters',
        'processing_info',
        'output_files',
        'error_message',
        'started_at',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'detected_characters' => 'array',
        'processing_info' => 'array',
        'output_files' => 'array',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'progress' => 'integer',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'dubbing_jobs';

    /**
     * Status constants.
     */
    public const STATUS_PENDING = 'pending';
    public const STATUS_PROCESSING = 'processing';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_FAILED = 'failed';

    /**
     * Source type constants.
     */
    public const SOURCE_URL = 'url';
    public const SOURCE_FILE = 'file';

    /**
     * Dubbing mode constants.
     */
    public const MODE_AUTO = 'auto';
    public const MODE_MANUAL = 'manual';

    /**
     * Output mode constants.
     */
    public const OUTPUT_REPLACE = 'replace';
    public const OUTPUT_MIX = 'mix';

    /**
     * Scope a query to only include processing jobs.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeProcessing($query)
    {
        return $query->where('status', self::STATUS_PROCESSING);
    }

    /**
     * Scope a query to only include completed jobs.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', self::STATUS_COMPLETED);
    }

    /**
     * Scope a query to only include failed jobs.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFailed($query)
    {
        return $query->where('status', self::STATUS_FAILED);
    }

    /**
     * Get the user that owns the dubbing job.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Check if the job is processing.
     *
     * @return bool
     */
    public function isProcessing(): bool
    {
        return $this->status === self::STATUS_PROCESSING;
    }

    /**
     * Check if the job is completed.
     *
     * @return bool
     */
    public function isCompleted(): bool
    {
        return $this->status === self::STATUS_COMPLETED;
    }

    /**
     * Check if the job has failed.
     *
     * @return bool
     */
    public function hasFailed(): bool
    {
        return $this->status === self::STATUS_FAILED;
    }

    /**
     * Mark the job as started.
     *
     * @return void
     */
    public function markAsStarted(): void
    {
        $this->update([
            'status' => self::STATUS_PROCESSING,
            'started_at' => now(),
        ]);
    }

    /**
     * Mark the job as completed.
     *
     * @param array $outputFiles
     * @return void
     */
    public function markAsCompleted(array $outputFiles = []): void
    {
        $this->update([
            'status' => self::STATUS_COMPLETED,
            'progress' => 100,
            'output_files' => $outputFiles,
            'completed_at' => now(),
        ]);
    }

    /**
     * Mark the job as failed.
     *
     * @param string $errorMessage
     * @return void
     */
    public function markAsFailed(string $errorMessage): void
    {
        $this->update([
            'status' => self::STATUS_FAILED,
            'error_message' => $errorMessage,
        ]);
    }

    /**
     * Update the processing progress.
     *
     * @param int $progress
     * @param array $detectedCharacters
     * @return void
     */
    public function updateProgress(int $progress, array $detectedCharacters = []): void
    {
        $updateData = ['progress' => $progress];
        
        if (!empty($detectedCharacters)) {
            $updateData['detected_characters'] = $detectedCharacters;
        }
        
        $this->update($updateData);
    }
}