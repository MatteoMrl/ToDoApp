module.exports = function(app,fs,todoUrl,bodyParser,chalk){
    
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json()) // parse application/json


    var readData = fs.readFileSync( todoUrl, "utf8" ); //{ "todo": ["...","..."]}
    var todoList = JSON.parse(readData); //{ todo: ["...","..."] }

    app.get("/", (req,res)=>{                     //when the user access to the page
        res.render("todo", {todoData: todoList.todo});
        console.log(chalk.green("Risposta alla chiamata GET eseguita con successo"));
    })

    app.post("/",(req,res)=>{                          //if the user wants to create a new data
        if(req.body.item!==todoList.todo[todoList.todo.length-1]){
            todoList.todo.push(req.body.item);                              //push the new user's item into the todo's array
            fs.writeFile(todoUrl, JSON.stringify(todoList), (err) => {               //write the new json todo
                if (err) {
                    return console.log(err);
                }
            });
        }
        res.render("todo", {todoData:todoList.todo});   //render to the page with the new json item
    })
                                        
    //if the user wants to delete a data
    app.delete("/assets/todoList.json", (req,res)=>{
        let objectToDelete = req.body.item;
        todoList.todo.forEach((element) => {
            if (element === objectToDelete){
                todoList.todo.splice(element, 1);
                fs.writeFile(todoUrl, JSON.stringify(todoList), (err) => {               //write the new json todo
                    if (err) {
                        return console.log(err);
                    }
                });
            }
        });
        console.log(todoList);
        res.end();
    })
};