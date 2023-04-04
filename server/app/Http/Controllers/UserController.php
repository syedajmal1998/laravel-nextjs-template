<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $users = User::query();
        $users->when(
            $request->get('q'),
            fn($users, $q) =>
            $users->where('name', 'like', "%$q%")
                ->orWhere('email', 'like', "%$q%")
        );
        switch ($request->get('type')) {
            case 'Vendor':
                $users = $users->get()->where(function ($user, $key) {
                    return $user->hasRole('Vendor');
                });
                break;
            case 'Customer':
                $users = $users->get()->where(function ($user, $key) {
                    return $user->hasRole('Customer');
                });
                break;

            default:
                $users = $users->get();
                break;
        }
        if ($users->count()) {
            $users = $users->toQuery()->paginate(20)->withQueryString();
        }

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $validatedData = $request->validated();

        /** @var User $user description */
        $user = User::create($validatedData);

        $newImage = $request->file('new_image');
        if ($newImage) {
            $user->clearMediaCollection();
            $user->addMedia($newImage)
                ->toMediaCollection();
        }
        $user->syncRoles(json_decode($validatedData['roles'], 1));
        $user->email_verified_at = $validatedData['email_verified_at'];
        $user->save();
        return response('', 204);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, User $user)
    {
        $validatedData = $request->validated();
        /** @var User $user description */
        $user->update($validatedData);
        $newImage = $request->file('new_image');
        if ($newImage) {
            $user->clearMediaCollection();
            $user->addMedia($newImage)
                ->toMediaCollection();
        }
        if (!$request->image) {
            $user->clearMediaCollection();
        }

        $user->email_verified_at = $validatedData['email_verified_at'];
        $user->save();
        $user->syncRoles(json_decode($validatedData['roles'], 1));
        return response($user, 201);
    }
    public function destroy(Request $request, User $user)
    {

        if ($user->id == user()->id) {
            return abort(422, 'current user can\'t be deleted');
        }
        $user->delete();
        return response("", 204);
    }
}
