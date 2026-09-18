import { Resend } from "resend";
import { logger } from "@/lib/monitoring/logger";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Zerobet <noreply@zerobet.app>";

/**
 * Send a welcome email after sign-up.
 */
export async function sendWelcomeEmail(email: string, name?: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Bienvenue sur Zerobet 🎉",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto; background: #0A0A0F; color: #fff; padding: 32px; border-radius: 16px;">
          <h1 style="color: #FF9500; font-size: 24px;">Bienvenue ${name || ""} !</h1>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
            Tu as fait le premier pas. Zerobet est là pour t'accompagner à chaque étape
            de ta récupération. Ouvre l'app, fais ton premier check-in, et commence ta série.
          </p>
          <a href="${process.env.APP_URL}" style="display: inline-block; background: linear-gradient(135deg, #FF3B30, #FF9500); color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold; margin-top: 16px;">
            Ouvrir Zerobet
          </a>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 24px;">
            Si tu n'as pas créé de compte, ignore cet email.
          </p>
        </div>
      `,
    });

    if (error) {
      logger.error("Welcome email error", error, { email });
      return false;
    }
    logger.info("Welcome email sent", { email, id: data?.id });
    return true;
  } catch (error) {
    logger.error("Welcome email exception", error, { email });
    return false;
  }
}

/**
 * Send a password reset email.
 */
export async function sendPasswordResetEmail(email: string, resetToken: string) {
  try {
    const resetUrl = `${process.env.APP_URL}/auth/reset?token=${resetToken}`;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Réinitialise ton mot de passe",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto; background: #0A0A0F; color: #fff; padding: 32px; border-radius: 16px;">
          <h1 style="color: #FF9500; font-size: 24px;">Réinitialisation</h1>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
            Clique sur le bouton ci-dessous pour réinitialiser ton mot de passe.
            Ce lien expire dans 1 heure.
          </p>
          <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #FF3B30, #FF9500); color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold; margin-top: 16px;">
            Réinitialiser
          </a>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 24px;">
            Si tu n'as pas demandé de réinitialisation, ignore cet email.
          </p>
        </div>
      `,
    });

    if (error) {
      logger.error("Password reset email error", error, { email });
      return false;
    }
    logger.info("Password reset email sent", { email, id: data?.id });
    return true;
  } catch (error) {
    logger.error("Password reset email exception", error, { email });
    return false;
  }
}

/**
 * Send a streak reminder email.
 */
export async function sendStreakReminderEmail(email: string, name: string, streakDays: number) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `🔥 Ta série est en jeu !`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto; background: #0A0A0F; color: #fff; padding: 32px; border-radius: 16px;">
          <h1 style="color: #FF3B30; font-size: 24px;">${streakDays} jours sans pari 🔥</h1>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.6;">
            ${name}, ta série de ${streakDays} jours est en jeu ! Ouvre l'app maintenant
            pour maintenir ta série et continuer ton parcours de récupération.
          </p>
          <a href="${process.env.APP_URL}" style="display: inline-block; background: linear-gradient(135deg, #FF3B30, #FF9500); color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold; margin-top: 16px;">
            Maintenir ma série
          </a>
        </div>
      `,
    });

    if (error) {
      logger.error("Streak reminder email error", error, { email });
      return false;
    }
    return true;
  } catch (error) {
    logger.error("Streak reminder email exception", error, { email });
    return false;
  }
}
