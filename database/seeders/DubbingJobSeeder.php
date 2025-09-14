<?php

namespace Database\Seeders;

use App\Models\DubbingJob;
use App\Models\User;
use Illuminate\Database\Seeder;

class DubbingJobSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create some sample users if they don't exist
        $users = User::factory()->count(3)->create();

        // Create various types of dubbing jobs
        DubbingJob::factory()
            ->count(5)
            ->completed()
            ->fromUrl()
            ->create(['user_id' => $users->random()->id]);

        DubbingJob::factory()
            ->count(3)
            ->processing()
            ->fromFile()
            ->create(['user_id' => $users->random()->id]);

        DubbingJob::factory()
            ->count(2)
            ->failed()
            ->fromUrl()
            ->create(['user_id' => $users->random()->id]);

        DubbingJob::factory()
            ->count(1)
            ->state([
                'status' => 'pending',
                'progress' => 0,
            ])
            ->fromFile()
            ->create(['user_id' => $users->random()->id]);

        // Create some anonymous jobs (no user_id)
        DubbingJob::factory()
            ->count(3)
            ->completed()
            ->fromUrl()
            ->create(['user_id' => null]);

        $this->command->info('Created ' . DubbingJob::count() . ' dubbing jobs.');
    }
}