sql.queryAll(DBpath,`CREATE TABLE IF NOT EXISTS EMP_DATA (
//   id INT,
//   date DATE,
//   rhsi FLOAT,
//   rmi FLOAT,
//   rq FLOAT,
//   cc FLOAT,
//   pplan FLOAT,
//   pa FLOAT,
//   pp FLOAT,
//   kaizen FLOAT,
//   PRIMARY KEY (id,date)
// )`,(err,DATA)=>{console.log("Success!")})