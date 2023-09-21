    

export default class ResetPasswordEmailDTO{
    constructor(email,token) {
        this.userEmail = email;
        this.token = token;
    }

    generateContent() {   
      return `<table><tr><th>Reset Password</th></tr>
      <tr>
      <td>This is a password reset email. If you have not requested it, please ignore this message</td>
      </tr>
      <tr>
      <td><a href="http://localhost:8080/password-reset/${this.token}">Reset your password here</a></td>
      </tr>
    
      </table>`;
    }

    getEmail(){
      const email= {
        from: "Ecommerce Martin Neme",
        to: this.userEmail, 
        subject: "Reset Password - Ecommerce Martin Neme", 
        html:this.generateContent()
      }

      return email;
    }
  }
