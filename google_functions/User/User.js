const mysql = require('mysql');
const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

const connection = mysql.createConnection({
    user: "service-user",
    database: "db_1",
    socketPath: `${dbSocketPath}/viergewinnt-ss21:europe-west3:db-viergewinnt`
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as thread id: ' + connection.threadId);
  console.log('SQL connection successfull');
});

const insert = async (user) => {
    console.log(user);
    let username = JSON.stringify(user.username);
    let password = JSON.stringify(user.password);
    let isSelected = JSON.stringify(user.isSelected);
    const query = "INSERT INTO users(username, password, isSelected) VALUES("+username+","+password+","+isSelected+");";
    connection.query(query, (error, result) => {
        if (!result) {
            console.log(error)
        } else {
            console.log("SQL INSERT success")
            console.log(result)
        }
    })
    return user
}

const readUsers = async () => {
    let users2 = [];
    const query = "SELECT * FROM users;";
    const q = new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (!result) {
                return reject(error)
            } else {
                for (let key in result) {
                    let bool = false
                    if (result[key].isSelected > 0) {
                        bool = true;
                    }
                    let x = {
                        username: result[key].username,
                        password: result[key].password,
                        isSelected: bool
                    }
                    users2.push(x)
                }
            }
        resolve()
        });
    });
    await q;
    console.log(users2);
    return users2;
}

const selectUser = async (username) => {
    const query = "UPDATE users SET isSelected = CASE WHEN isSelected = FALSE THEN TRUE WHEN isSelected = TRUE THEN FALSE END WHERE username ="+JSON.stringify(username.value)+";";
    connection.query(query, (error, result) => {
        if (!result) {
            console.log(error)
        } else {
            console.log("SQL UPDATE success")
            console.log(result)
        }
    });
    const users = await readUsers()
    return users
}

const deleteUser = async () => {
    const query = "SELECT * FROM users WHERE isSelected IS NOT FALSE;"
    const q = new Promise((resolve, reject) => {
        connection.query(query, (error, result) => {
            if (!result) {
                return reject(error)
            } else {
                for (let key in result) {
                    let x = {
                        username: result[key].username,
                        password: result[key].password,
                        isSelected: result[key].isSelected
                    }
                    doDelete(x)
                }
            }
        resolve()
        });
    });
    await q;
    console.log("DELETE done")
    const users = await readUsers()
    return users
}

const doDelete = async (user) => {
    const query = "DELETE FROM users WHERE username ="+JSON.stringify(user.username)+";";    
    connection.query(query, (error, result) => {
        if (!result) {
            console.log(error)
        } else {
            console.log("SQL DELETE success" + JSON.stringify(user.username))
            console.log(result)
        }
    });
}

exports.insertUser = async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.set('Content-Type','application/json');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS').status(200);

    switch(req.method) {
        case "GET": 
            const allUsers = await readUsers();
            console.log("users: "+allUsers)
            res.send({users: allUsers});
            break;
        case "POST":
            console.log(req.body);
            let user = req.body.value;
            insert(user)
            let posted = await readUsers();
            res.send({users: posted});
            break;
        case "PATCH":
            console.log(req.body);
            selected = await selectUser(req.body)
            res.send({users: selected});
            break;
        case "DELETE":
            deleted = await deleteUser();
            res.send({users: deleted})
            break;
        case "OPTIONS": 
            res.sendStatus(204);
            break;
    }
};


