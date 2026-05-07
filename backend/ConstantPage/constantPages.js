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

export const Ticket = ({ name, eventName, seats, bookingId, qrCodeUrl }) => { 
  return ` 
  <div style=" margin:0; padding:40px 20px; background:#eef2ff; font-family:Arial,sans-serif; "> 
    <div style=" max-width:650px; margin:auto; background:white; border-radius:24px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.12); "> 
      <div style=" background:linear-gradient(135deg,#2563eb,#7c3aed); padding:45px 30px; text-align:center; color:white; "> 
        <h1 style=" margin:0; font-size:34px; letter-spacing:1px; "> EVENT TICKET </h1> 
        <p style=" margin-top:12px; font-size:16px; opacity:0.9; "> Your booking is confirmed successfully </p> 
      </div> 
      <div style="padding:45px 40px;"> 
        <h2 style=" margin-top:0; color:#111827; "> Hello ${name} </h2> 
        <p style=" color:#4b5563; font-size:16px; line-height:1.7; "> Thank you for booking . Your seat has been reserved successfully.</p> 
          <div style=" margin-top:35px; border:1px solid #e5e7eb; border-radius:18px; overflow:hidden; "> 
            <table style=" width:100%; border-collapse:collapse; "> 
              <tr style="background:#f9fafb;"> 
                <td style=" padding:18px; font-weight:bold; color:#374151; "> Event </td> 
                <td style=" padding:18px; color:#111827; "> ${eventName} </td> 
              </tr> 
              <tr> 
                <td style=" padding:18px; font-weight:bold; color:#374151; "> Seats </td> 
                <td style=" padding:18px; color:#111827; "> ${seats} </td> 
              </tr> 
              <tr style="background:#f9fafb;"> 
                <td style=" padding:18px; font-weight:bold; color:#374151; "> Booking ID </td> 
                <td style=" padding:18px; color:#111827; word-break:break-all; "> ${bookingId} </td>
              </tr>
            </table>
          </div> 
          <div style=" margin-top:45px; text-align:center; "> 
            <div style=" display:inline-block; padding:20px; border-radius:20px; background:#f9fafb; border:1px dashed #cbd5e1; "> 
              <img src="${qrCodeUrl}" alt="QR Code" width="220" height="220" style=" display:block; margin:auto; " /> 
            </div> 
          </div> 
          <p style=" text-align:center; margin-top:20px; color:#6b7280; font-size:15px; "> Scan this QR code at the event entrance </p>  
        </div>
      </div>
    </div> `; 
  };