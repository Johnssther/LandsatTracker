<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MapController extends Controller
{
    public function indexmap()
    {
        return Inertia::render('Map/Index');
    }

}
