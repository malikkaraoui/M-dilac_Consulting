const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const RECIPIENT_EMAIL = defineSecret("RECIPIENT_EMAIL");
const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_PASS = defineSecret("SMTP_PASS");
const RECAPTCHA_SECRET = defineSecret("RECAPTCHA_SECRET");

function safeStr(value) {
  return typeof value === "string" ? value.trim() : "";
}

exports.contact = onRequest(
  {
    region: "europe-west1",
    secrets: [RECIPIENT_EMAIL, SMTP_USER, SMTP_PASS, RECAPTCHA_SECRET]
  },
  async (req, res) => {
    cors(req, res, async () => {
      try {
        if (req.method !== "POST") {
          return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
        }

        const { firstName, lastName, email, message, website, recaptchaToken } = req.body || {};
        if (safeStr(website)) {
          return res.status(200).json({ ok: true });
        }

        const fn = safeStr(firstName);
        const ln = safeStr(lastName);
        const em = safeStr(email);
        const msg = safeStr(message);
        const captcha = safeStr(recaptchaToken);

        if (!fn || !ln || !em || !msg) {
          return res.status(400).json({ ok: false, error: "MISSING_FIELDS" });
        }
        if (msg.length > 200) {
          return res.status(400).json({ ok: false, error: "MESSAGE_TOO_LONG" });
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
        if (!emailOk) {
          return res.status(400).json({ ok: false, error: "INVALID_EMAIL" });
        }
        if (!captcha) {
          return res.status(400).json({ ok: false, error: "MISSING_RECAPTCHA_TOKEN" });
        }

        const recipient = RECIPIENT_EMAIL.value();
        const smtpUser = SMTP_USER.value();
        const smtpPass = SMTP_PASS.value();
        const recaptchaSecret = RECAPTCHA_SECRET.value();

        if (!recipient || !smtpUser || !smtpPass) {
          return res.status(500).json({ ok: false, error: "MISSING_SMTP_CONFIG" });
        }
        if (!recaptchaSecret) {
          return res.status(500).json({ ok: false, error: "MISSING_RECAPTCHA_SECRET" });
        }

        const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ secret: recaptchaSecret, response: captcha }).toString()
        });
        const captchaJson = await captchaRes.json().catch(() => ({ success: false }));
        if (!captchaJson.success) {
          return res.status(400).json({ ok: false, error: "RECAPTCHA_FAILED" });
        }

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: { user: smtpUser, pass: smtpPass }
        });

        const subject = `Contact site — ${fn} ${ln}`
          .replace(/[\r\n]+/g, " ")
          .slice(0, 120);

        const text = `Nouveau message via formulaire:\n\nNom: ${ln}\nPrénom: ${fn}\nEmail: ${em}\n\nMessage (<= 200):\n${msg}\n`;

        await transporter.sendMail({
          from: smtpUser,
          to: recipient,
          replyTo: em,
          subject,
          text
        });

        return res.json({ ok: true });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ ok: false, error: err?.message || "INTERNAL_ERROR" });
      }
    });
  }
);
