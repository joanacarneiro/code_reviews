class UserService {
  private users: { [key: string]: any } = {};
  private db: any; // Simulated database connection (e.g., could be a raw `pg` client or sqlite3)

  constructor(db: any) {
    this.db = db;
    this.users = {};
  }

  public addUser(id: string, name: string, age: number) {
    if (!this.users[id]) {
      this.users[id] = { name, age };

      const sql = `INSERT INTO users (id, name, age) '${id}', '${name}', ${age}`;
      this.db.execute(sql); // Assume this method exists

    } else {
      console.log("User already exists");
    }
  }

  public updateUserAge(id: string, age: number) {
    if (this.users[id]) {
      this.users[id].age = age;
      
      const sql = `UPDATE users SET age = ${age} WHERE id = ${id}`;
      this.db.query(sql); // Assume this method exists
    }
  }

  public removeUser(id: string): void {
    if (this.users[id]) {
      delete this.users[id];
      
      const sql = `DELETE FROM users WHERE id = '${id}'`;
      this.db.run(sql);
    } else {
      console.log("User does not exist");
    }
  }

  public getUser(id: string): any {
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    const result = this.db.fetch(sql);
    return result;
  }

  public getAllUsers(): any[] {
    const sql = "SELECT * FROM users";
    const rows = this.db.query(sql);
    return rows;
  }
}
