exports.applyJobEmail = (jobName, name) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Job Application Confirmation</title>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
    
            .logo {
                max-width: 150px;
                margin-bottom: 20px;
            }
    
            .header {
                font-size: 22px;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 15px;
            }
    
            .body {
                font-size: 16px;
                color: #555555;
                margin-bottom: 30px;
            }
    
            .highlight {
                font-weight: bold;
                color: #2980b9;
            }
    
            .cta {
                display: inline-block;
                padding: 12px 25px;
                background-color: #3498db;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }
    
            .cta:hover {
                background-color: #2980b9;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .footer {
                font-size: 12px;
                color: #b0b0b0;
                margin-top: 30px;
            }
    
            .footer a {
                color: #3498db;
                text-decoration: none;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <a href="https://jobify-bhushan.vercel.app/">
                <img class="logo" src="https://res.cloudinary.com/dukvkbkoh/image/upload/v1727033057/Jobify/Logo_jobify.svg_bnuggk.png" alt="Jobify Logo">
            </a>
            <div class="header">Job Application Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>Thank you for applying to the <span class="highlight">"${jobName}"</span> position. We have received your application, and our team is currently reviewing your details.</p>
                <p>In the meantime, you can visit your dashboard to track your application status and explore other job opportunities that match your profile.</p>
                <a class="cta" href="https://jobify-bhushan.vercel.app/dashboard">Go to Dashboard</a>
            </div>
            <div class="support">If you have any questions or need further assistance, feel free to contact us at <a href="mailto:info@jobify.com">info@jobify.com</a>.</div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Jobify. All rights reserved.</p>
                <p><a href="https://jobify-bhushan.vercel.app/privacy-policy">Privacy Policy</a> | <a href="https://jobify-bhushan.vercel.app/terms-of-service">Terms of Service</a></p>
            </div>
        </div>
    </body>
    
    </html>`;
};
