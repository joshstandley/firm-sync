const bcrypt = require('bcryptjs');

// Mock user data (replace this with a database model in the future)
let users = [];

class User {
  constructor(email, password, firstName, lastName) {
    this.email = email;
    this.password = password; // This will be the hashed password
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // Create a new user
  static async create({ email, password, firstName, lastName }) {
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password
    const user = new User(email, hashedPassword, firstName, lastName);

    // Save to "database" (using the users array for now)
    users.push(user);
    return user;
  }

  // Find a user by email
  static async findByEmail(email) {
    return users.find(user => user.email === email);
  }

  // Validate the password
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password); // Compare hashed password
  }
}

module.exports = User;
