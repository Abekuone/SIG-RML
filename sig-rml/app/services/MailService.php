<?php

namespace App\services;

use App\Mail\mailers\WelcomeMail;
use App\Mail\mailers\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class MailService
{
    /**
     * Envoie un e-mail en utilisant le mailer spécifié.
     *
     * @param string $email
     * @param string $mailer
     * @param array $data
     * @return void
     * @throws \Exception
     */
    public function sendMail(string $email, string $mailer, array $data = [])
    {
        if (!class_exists($mailer)) {
            throw new \Exception("Le mailer spécifié [{$mailer}] est introuvable.");
        }

        Mail::to($email)->send(new $mailer($data));
    }


    public function sendWelcomeMail()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non authentifié'], 401);
        }

        if (empty($user->token->email)) {
            return response()->json(['message' => 'Adresse e-mail de l\'utilisateur manquante'], 400);
        }

        try {

            Mail::to($user->token->email)->send(new WelcomeMail($user));

            return response()->json(['message' => 'Mail de bienvenue envoyé avec succès']);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de l\'envoi du mail : ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de l\'envoi du mail', 'error' => $e->getMessage()], 500);
        }
    }

    public function sendResetPasswordMail($user)
    {
        try {
            Mail::to($user->email)->send(new ResetPasswordMail($user->reset_code));
        } catch (\Exception $e) {
            \Log::error('Erreur d\'envoi de mail de réinitialisation : ' . $e->getMessage());
            throw new \Exception('Impossible d\'envoyer l\'email.');
        }
    }
}
