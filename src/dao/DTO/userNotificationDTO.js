export default class UserNotificationDTO {
  constructor(title, user, message) {
    this.userEmail = user.email;
    this.message = message;
    this.title = title;
  }

  generateNotification() {
    return `<table><tr><th>${this.title}</th></tr><tr><td>${this.message}</td></tr>`;
  }

  getEmail() {
    const notification = {
      from: "Bolka",
      to: this.userEmail,
      subject: "Aviso",
      html: this.generateNotification()
    };

    return notification;
  }
}
