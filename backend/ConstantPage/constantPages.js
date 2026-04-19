export const signUpTemplate=({name})=>{
    return `<div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <h2 style="color: #4e944f; text-align: center;">Welcome to Meet Up 🚀</h2>
      <p style="font-size: 16px; color: #333;">
        Hi <strong>${name}</strong>,
      </p>
      <p style="font-size: 15px; color: #555;">
        We're excited to have you onboard! 🎉  
        Meet Up helps you connect, share, and grow your network effortlessly.
      </p>
      <div style="text-align: center; margin: 25px 0;">
        <a href="#" 
           style="background-color: #4e944f; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Get Started
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">
        If you have any questions, feel free to reply to this email. We're here to help!
      </p>
      <hr style="margin: 20px 0;" />
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        © 2026 Meet Up. All rights reserved.
      </p>
    </div>
  </div>
  `
}

export const tokenTemplate = ({ token }) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <h2 style="color: #2563eb; text-align: center;">
        Verification Code 🔐
      </h2>

      <p style="font-size: 15px; color: #555;">
        Use the following verification code to continue:
      </p>

      <!-- TOKEN BOX -->
      <div style="
        text-align: center;
        margin: 25px 0;
        padding: 15px;
        background: #f1f5f9;
        border-radius: 8px;
        border: 1px dashed #2563eb;
      ">
        <span style="
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
          letter-spacing: 3px;
        ">
          ${token}
        </span>
      </div>

      <p style="font-size: 14px; color: #777;">
        This code is valid for a limited time. Do not share it with anyone.
      </p>

      <hr style="margin: 20px 0;" />

      <p style="font-size: 12px; color: #aaa; text-align: center;">
        © 2026 MeetUp. All rights reserved.
      </p>

    </div>
  </div>
  `;
};