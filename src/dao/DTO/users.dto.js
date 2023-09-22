export default class userDTO {
    constructor(user) {
        this.id = `${user._id}`;
        this.username = `${user.firstName} ${user.lastName}`;
        this.email = `${user.email}`;
        this.role = `${user.role}`;
    }

    getUser = async () => {
        return {
        username: this.username,
        email: this.email,
        rol: this.role,
        id: this.id
        };
    };
}