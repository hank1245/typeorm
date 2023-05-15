import express from "express";
import { DataSource } from "typeorm";
import { User } from "./Entities/User";
const app = express();
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "12345678",
  database: "nestjs",
  logging: true,
  synchronize: true,
  entities: [User],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.listen(3001, (): void => {
  console.log("server running");
});

app.get("/", (req, res) => {
  User.find().then((data) => {
    res.json(data);
  });
});

app.post("/", (req, res) => {
  User.insert({
    firstName: "Hank",
    lastName: "Kim",
    username: "traversy",
    password: "password",
  });
  res.json({ success: true });
});

app.delete("/", (req, res) => {
  AppDataSource.getRepository(User)
    .createQueryBuilder()
    .delete()
    .from(User)
    .where("id = :id", { id: 2 })
    .execute();
  res.end();
});
