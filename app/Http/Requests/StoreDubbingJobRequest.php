<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDubbingJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'video_url' => 'nullable|url|required_without:video_file',
            'video_file' => 'nullable|file|mimes:mp4,avi,mov,wmv,flv,webm,mkv|max:102400|required_without:video_url',
            'dubbing_mode' => 'required|in:auto,manual',
            'voice_style' => 'required|in:natural,anime,robot,formal,casual,dramatic',
            'output_mode' => 'required|in:replace,mix',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'video_url.required_without' => 'Please provide either a video URL or upload a video file.',
            'video_file.required_without' => 'Please provide either a video URL or upload a video file.',
            'video_url.url' => 'Please provide a valid video URL.',
            'video_file.mimes' => 'Video file must be in one of these formats: MP4, AVI, MOV, WMV, FLV, WebM, MKV.',
            'video_file.max' => 'Video file size cannot exceed 100MB.',
            'dubbing_mode.required' => 'Please select a dubbing mode.',
            'dubbing_mode.in' => 'Invalid dubbing mode selected.',
            'voice_style.required' => 'Please select a voice style.',
            'voice_style.in' => 'Invalid voice style selected.',
            'output_mode.required' => 'Please select an output mode.',
            'output_mode.in' => 'Invalid output mode selected.',
        ];
    }

    /**
     * Get custom attribute names for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'video_url' => 'video URL',
            'video_file' => 'video file',
            'dubbing_mode' => 'dubbing mode',
            'voice_style' => 'voice style',
            'output_mode' => 'output mode',
        ];
    }


}