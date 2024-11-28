import dbConnection from "../../db.js";

const selectQuery = async ({ tableName, condition, indexes }) => {
  const indexString = indexes ? `, ${indexes.join(", ")}` : "";
  const query = `select * from ${tableName} where ${condition} ${indexString}`;
  const [userRetrivedData] = await dbConnection.promise().query(query);
  if (userRetrivedData.length > 0) {
    return userRetrivedData;
  }
  return null;
};

const createRole = async (tableName, values) => {
  try {
    const query = `INSERT INTO ${tableName} (role_name, role_id) VALUES (?,?)`;
    const [rows] = await dbConnection.promise().query(query, values);
    if (rows.affectedRows > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error, "error");
    return false;
  }
};

export { selectQuery, createRole };
