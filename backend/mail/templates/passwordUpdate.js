exports.passwordUpdated = (email, name) => {
	return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
                text-align: left;
            }
    
            .logo {
                display: block;
                margin: 0 auto 20px;
                max-width: 180px;
            }
    
            .header {
                font-size: 22px;
                font-weight: bold;
                color: #4CAF50;
                text-align: center;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                line-height: 1.6;
                color: #555555;
                margin-bottom: 30px;
            }
    
            .highlight {
                color: #4CAF50;
                font-weight: bold;
            }
    
            .footer {
                font-size: 14px;
                color: #999999;
                text-align: center;
                border-top: 1px solid #eeeeee;
                padding-top: 20px;
                margin-top: 20px;
            }
    
            a {
                color: #4CAF50;
                text-decoration: none;
            }
    
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <a href="https://jobify-bhushan.vercel.app/">
                <img class="logo" src="https://res.cloudinary.com/dukvkbkoh/image/upload/v1727033057/Jobify/Logo_jobify.svg_bnuggk.png" alt="Jobify Logo">
            </a>
            <div class="header">Password Update Confirmation</div>
    
            <div class="body">
                <p>Hi ${name},</p>
                <p>Your password has been successfully updated for the account associated with <span class="highlight">${email}</span>.</p>
                <p>If you did not request this password change, please <a href="mailto:info@Jobify.com">contact us</a> immediately to secure your account.</p>
            </div>
    
            <div class="footer">
                If you have any questions, please don't hesitate to reach out to us at <a href="mailto:info@Jobify.com">info@Jobify.com</a>.
            </div>
        </div>
    </body>
    
    </html>`;
};
