


export default function generateSignupEmailBody(username) {


  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f8f8;
            color: #333;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }

          h2 {
            color: tomato;
          }

          p {
            line-height: 1.6;
          }

          .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
          }
        </style>
      </head>

      <body>

        <div class="container">

          <h2>Dear, ${username}!</h2>

          <p>Welcome to the Poster community.</p>

          <p>We're excited to have you on board!</p>
          
          <p>Your journey with Poster begins now.</p>

          <p class="footer">Best regards,<br> The Poster Team</p>
        </div>

      </body>

    </html>
  `;
}



