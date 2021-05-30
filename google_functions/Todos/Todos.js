const Firestore = require('@google-cloud/firestore');
const db = new Firestore ({
    projectId: 'viergewinnt-ss21',
    keyFilename:'viergewinnt-ss21-0768b24ca13d.json'
})
const collection = db.collection('todos');

const readTodos = async function () {
    let toDos2 = []
    
    const result = await collection.get()
    result.forEach((doc) => {
        data = doc.data();
        data.id = doc.id
        toDos2.push(data);
    });
    return toDos2
}

const writeTodo = async (todo) => {
    const todos = await db.collection('todos').add(todo);
    return todos
}

const deleteTodo = async () => {
    todos2 = await readTodos();
    for (let i = 0; i < todos2.length; i++) {
        if (todos2[i].isSelected === true) {
            console.log('removing - ', todos2[i]);
            await collection.doc(todos2[i].id).delete();
            deleteTodo(todos2[i]);
        }   
    }
    return todos2;
}

const selectTodo = async (todo) => {
    todos2 = await readTodos();
    try {
        const selectedRef = collection.doc(todo.id)
        const status = selectedRef.isSelected;
        if (status) {
            const res = await selectedRef.update({isSelected: false})
            console.log(res)
            return todos2
        } else {
            const res = await selectedRef.update({isSelected: true})
            console.log(res)
            return todos2
        }
    } catch (e) {
        console.log(e)
        return
    }
} 

exports.Todos = async (req, res) => {
    
    res.set("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.set("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.set('Content-Type','application/json');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS').status(200);

    if(req.method === 'OPTIONS') {
        res.sendStatus(204);
    }
    
    switch (req.method) {
    case "GET":
        todos = await readTodos();
        res.send({toDos: todos});
        break;
    case "POST":
        req.body.value.isSelected = false;
        console.log('adding - ', req.body);
        writtenTodo = await writeTodo(req.body.value);
        res.send({toDos: await readTodos()});
        break;
    case "PATCH":
        selectedTodo = await selectTodo(req.body.value)
        res.send({toDos: await readTodos()});
        break;
    case "DELETE":
        deletedTodo = await deleteTodo()
        res.send({toDos: await readTodos()});
        break;
    default:
        res.status(405).end();
        // Anweisungen werden ausgeführt,
        // falls keine der case-Klauseln mit expression übereinstimmt
        break;
    }
    
};