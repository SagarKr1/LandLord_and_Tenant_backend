const nodemailer = require('nodemailer');

const SignupMail = async (code, email) => {
    try {
        // Create a transporter object using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "sag197348@gmail.com",
                pass: "zndf ehye opcu xxwf", // App password if using Gmail with two-factor authentication
            },
        });

        // Attractive HTML email template
        const htmlContent = `
        <!DOCTYPE html>
        <html>
            <body style="background-image: url('https://img.freepik.com/free-photo/luxury-cottage-old-suburb-illuminated-by-twilight-lighting-generated-by-artificial-intelligence_188544-150345.jpg'); background-size: cover; padding: 20px; color: #333;">
                <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                    <h2>Welcome to LandLord!</h2>
                    <p>Thank you for signing up for LandLord. Your verification code is:</p>
                    <h1 style="background-color: #f4f4f4; padding: 10px; text-align: center;">${code}</h1>
                    <p>Please enter this code in the app to complete your registration.</p>
                    <p>If you didn’t request this email, please ignore it.</p>
                    <br>
                    <p>Best regards,</p>
                    <p>The LandLord Team</p>
                </div>
            </body> 
        </html>
        `;

        // Email details
        const mail = {
            from: `"LandLord App" <sag197348@gmail.com>`, // Professional sender name and email
            to: email, // Recipient email from request
            subject: "LandLord App - Signup Verification Code", // Subject line
            text: `Your verification code is: ${code}`, // Plain text body for non-HTML email clients
            html: htmlContent, // Attractive HTML body with the verification code
        };

        // Send email
        const info = await transporter.sendMail(mail);

        console.log("Verification email sent: %s", info.messageId);

        return {
            status: true,
            message: "Verification code sent to email.",
            info: info,
        };

    } catch (e) {
        console.error(e);
        return {
            status: false,
            message: "Failed to send verification code.",
            error: e.message,
        };
    }
};

module.exports = SignupMail;