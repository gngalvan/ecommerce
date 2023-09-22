export default class ResetPasswordEmailDTO {
  constructor(email, token) {
    this.userEmail = email;
    this.token = token;
  }

  // Genera el contenido del correo electrónico de restablecimiento de contraseña.
  generateContent() {
    return `<table>
      <tr><th>Restablecer contraseña</th></tr>
      <tr>
        <td>Este es un correo electrónico de restablecimiento de contraseña. Si no lo ha solicitado, ignore este mensaje</td>
      </tr>
      <tr>
        <td><a href="http://localhost:8080/password-reset/${this.token}">Restablece tu contraseña aquí</a></td>
      </tr>
    </table>`;
  }

  // Obtiene el objeto de correo electrónico con la información necesaria.
  getEmail() {
    const email = {
      from: "Bolka",
      to: this.userEmail,
      subject: "Restablece tu contraseña",
      html: this.generateContent()
    };

    return email;
  }
}