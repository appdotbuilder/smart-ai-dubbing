<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dubbing_jobs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->comment('User who created the job (null for anonymous)');
            $table->enum('source_type', ['url', 'file'])->comment('Source type: URL or uploaded file');
            $table->text('source_url')->nullable()->comment('Video URL (YouTube, TikTok, Instagram, Facebook)');
            $table->string('source_file')->nullable()->comment('Uploaded video file path');
            $table->enum('dubbing_mode', ['auto', 'manual'])->default('auto')->comment('Dubbing mode: automatic or manual');
            $table->string('voice_style')->default('natural')->comment('AI voice style (natural, anime, robot, etc.)');
            $table->enum('output_mode', ['replace', 'mix'])->default('replace')->comment('Output mode: replace or mix audio');
            $table->enum('status', ['pending', 'processing', 'completed', 'failed'])->default('pending')->comment('Job processing status');
            $table->integer('progress')->default(0)->comment('Processing progress percentage (0-100)');
            $table->json('detected_characters')->nullable()->comment('AI detected characters with gender and timestamps');
            $table->json('processing_info')->nullable()->comment('Processing metadata and statistics');
            $table->json('output_files')->nullable()->comment('Generated output file paths');
            $table->text('error_message')->nullable()->comment('Error message if job failed');
            $table->timestamp('started_at')->nullable()->comment('When processing started');
            $table->timestamp('completed_at')->nullable()->comment('When processing completed');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('user_id');
            $table->index('status');
            $table->index('created_at');
            $table->index(['user_id', 'status']);
            $table->index(['status', 'created_at']);
            
            // Foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dubbing_jobs');
    }
};