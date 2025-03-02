<form method="POST" action="{{ route('register') }}">
    @csrf
    <input type="hidden" name="email" value="{{ $socialUser['email'] }}">
    <label>Nom :</label>
    <input type="text" name="name" value="{{ $socialUser['name'] ?? '' }}" required>

    <label>Mot de passe :</label>
    <input type="password" name="password" required>

    <label>Confirmer le mot de passe :</label>
    <input type="password" name="password_confirmation" required>

    <button type="submit">Créer mon compte</button>
</form>
