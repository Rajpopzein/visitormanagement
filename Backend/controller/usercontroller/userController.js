import { successResponse, errorResponse } from "../../views/responseView.js";
import dbConnection from "../../db.js";
import { selectQuery, createRole } from "../../model/usemodel/userModel.js";
import { v4 as uuidv4 } from "uuid";
import { jwtGenetation, sendMail } from "../../utils/utile.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, role_id } = req.body;
    const existingUser = await selectQuery({
      tableName: "users",
      condition: `email = "${email}"`,
    });
    if (existingUser) {
      return res.status(400).json(errorResponse("User already exists", 404));
    }
    const userId = uuidv4().toString();
    const sql = `INSERT INTO users (name, email, password, phone, user_id, role_id) VALUES (?, ?, ?, ?, ?, ?)`;
    const value = [name, email, password, phone, userId, role_id];
    const [rows] = await dbConnection.promise().execute(sql, value);
    if (rows.affectedRows > 0) {
      return res
        .status(200)
        .json(successResponse({ message: "User created successfully!" }));
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(errorResponse("Internal Server Error", 500));
  }
};

const createUserRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    const role_id = uuidv4().toString();
    const values = [role_name, role_id];

    const roleCreated = await createRole("userrole", values);
    if (roleCreated) {
      return res
        .status(200)
        .json(successResponse({ message: "Role created successfully!" }));
    }
    return res.status(400).json(errorResponse("Role already exists", 400));
  } catch (e) {
    console.log(e);
    return res.status(500).json(errorResponse("Internal Server Error", 500));
  }
};

const fetchAllroles = async (req, res) => {
  try {
    const sql = `SELECT role_name, role_id FROM userrole where role_id != "12dd6532-046a-458d-8801-7b26044fb72c"`;
    const [rows] = await dbConnection.promise().execute(sql);
    return res.status(200).json(successResponse({ data: rows }));
  } catch (e) {
    console.log(e);
    return res.status(500).json(errorResponse("Internal Server Error", 500));
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const loginquery = await selectQuery({
      tableName: "users",
      condition: `email = "${username}" AND password = "${password}"`,
    });
    const { name, email, role_id, user_id } = loginquery[0];
    const token = jwtGenetation({
      data: {
        name: name,
        email: email,
        role_id: role_id,
        userId: user_id,
      },
    });
    console.log(loginquery);
    sendMail()
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const [rows] = await dbConnection
      .promise()
      .execute(sql, [username, password]);
    if (rows.length > 0) {
      return res
        .status(200)
        .json(successResponse({ message: "Login successful", data: token }));
    }
    return res.status(401).json(errorResponse("Invalid credentials", 401));
  } catch (e) {
    console.log(e);
    return res.status(500).json(errorResponse("Internal Server Error", 500));
  }
};

const visitorRequest = async (req, res) => {
  try {
    const { name, email, phone, date, site, purpose, vehicle, vehicleNumber, docs } = req.body;
    const visitorId = uuidv4().toString();
    const sql = `INSERT INTO visitors (name, email, phone, date, site, purpose, vehicle, vehicleNumber, docs, visitor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const value = [name, email, phone, date, site, purpose, vehicle, vehicleNumber, docs, visitorId];
    const [rows] = await dbConnection.promise().execute(sql, value);
    if (rows.affectedRows > 0) {
      return res
        .status(200)
        .json(successResponse({ message: "Visitor request sent successfully!" }));
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json(errorResponse("Internal Server Error", 500));
  }
};


export { createUser, createUserRole, fetchAllroles, login, visitorRequest};
