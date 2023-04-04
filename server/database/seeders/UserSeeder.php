<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@me.com',
            'password' => bcrypt('password'), // password
            'email_verified_at' => now(),
        ]);
        $user->assignRole("Super Admin");
    }
}
