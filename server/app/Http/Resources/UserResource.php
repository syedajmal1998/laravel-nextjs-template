<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'name' => $this->name,
            'google_id' => $this->google_id,
            'image' => $this->getFirstMedia()?->original_url,
            'profile_photo_url' => $this->profile_photo_url,
            'is_active' => $this->is_active,
            'email_verified_at' => $this->email_verified_at?->format("Y-m-d h:m:s A"),
            'roles' => $this->roles->pluck('name'),
        ];
    }
}
