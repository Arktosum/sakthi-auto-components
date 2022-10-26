sql.queryAll(DBpath,`SELECT * FROM EMP_DATA`,(err,DATA)=>{
    database.EMP_DATA = DATA
  })