<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>SIG RML</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Styles / Scripts -->
        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @else
        @endif
    </head>
    <body class="font-sans antialiased dark:bg-black dark:text-white/50">
        <h1>Bienvenue sur SIG RML</h1>
        @php
            use Illuminate\Support\Facades\Auth;


            if (!($user = Auth::user())) {
                echo '<a href="/auth/redirect">Se connecter</a>';
            }

            if (($user = Auth::user())) {
                // dd($user);
                echo '<a href="/auth/logout">Se déconnecter</a>';
            }
        @endphp
    </body>
</html>
