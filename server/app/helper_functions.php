<?php

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductSpecification;
use App\Models\Warehouse;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Spatie\Tags\Tag;
use Illuminate\Pagination\LengthAwarePaginator;

use App\Integration\kydsc\Method;
use App\Models\ApiAccessToken;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use phpDocumentor\Reflection\Types\Boolean;
if (!function_exists('carbon')) {
    /**
     * Create a new Carbon instance for the given datetime and/or timezone.
     *
     * @param  \DateTime|string|null $datetime
     * @param  \DateTimeZone|string|null $tz
     * @return \Illuminate\Support\Carbon
     */
    function carbon($datetime = null, $tz = null)
    {
        if ($datetime instanceof \DateTime) {
            return \Illuminate\Support\Carbon::instance($datetime)->setTimezone($tz);
        }

        return \Illuminate\Support\Carbon::parse($datetime, $tz);
    }
}
if (!function_exists('can')) {
    /**
     * check's if current user has permission to do something.
     *
     * @param  string $permission
     * @return boolean
     */
    function can($permission)
    {
        if (!Auth::check()) {
            return false;
        }
        /** @var User $user description */
        $user = request()->user();

        return ($user->can($permission) || $user->hasRole($permission)) && (isset($user->email_verified_at) && $user->is_active);
    }
}
if (!function_exists('user')) {
    /**
     * return's current user.
     *
     * @param  string $permission
     * @return User
     */
    function user(): User|null
    {
        return request()->user() ?? null;
    }
}
if (!function_exists('currentUserRoles')) {
    function currentUserRoles(): Collection
    {
        if (user()) {
            return collect(user()->roles?->pluck("name"));
        }
        return collect();
    }
}

function paginateCollection($collection, $perPage = 20, $page = 1, $options = [])
{
    $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
    $items = $collection instanceof Collection ? $collection : Collection::make($collection);
    $results = $items->slice(($page - 1) * $perPage, $perPage)->values();
    $paginator = new LengthAwarePaginator($results, $items->count(), $perPage, $page, $options);
    return $paginator;
}
