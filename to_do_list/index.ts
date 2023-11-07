import inquirer from "inquirer";
import chalk from "chalk";

let my_todo_list:string[] = [];

async function todo_app() {
    let check:boolean = true

    while (check)
    {
        let answer = await inquirer.prompt({
            name: "my_operation",
            type: "list",
            message: "What would you like to do:",
            choices: ["Add", "Delete", "View", "Update", "Exit"]
        });

        if(answer.my_operation === "Add")
        {
            let data = await inquirer.prompt({
                name: "my_data",
                type: "input",
                message: "Enter your task:",
            });
            my_todo_list.push(data.my_data);
            console.log("Task inserted successfully:");
        }
        else if(answer.my_operation === "Delete")
        {
            if(my_todo_list.length != 0)
            {
                let data = await inquirer.prompt({
                    name: "my_data",
                    type: "list",
                    message: "Select the task to delete",
                    choices: my_todo_list.map(item => item)
                });
                let index_to_delete = my_todo_list.indexOf(data.my_data)
                if(index_to_delete === 0)
                {
                    my_todo_list.shift()
                }
                else
                {
                    my_todo_list.splice(index_to_delete, index_to_delete)                    
                }
                console.log("Task deleted successfully:");
            }
            else
            {
                console.log("Your todo list is empty");
            }
        }
        else if(answer.my_operation === "View")
        {
            if(my_todo_list.length != 0)
            {
                console.log("Below is your todo list:");
                
                for(let i = 0; i < my_todo_list.length; i++)
                {
                    console.log(`${i + 1}: ${my_todo_list[i]}`);
                }
            }
            else
            {
                console.log("Your todo list is empty");
            }
        }
        else if(answer.my_operation === "Update")
        {
            if(my_todo_list.length != 0)
            {
                let data = await inquirer.prompt([
                    {
                        name: "my_data",
                        type: "list",
                        message: "Select the task to delete",
                        choices: my_todo_list.map(item => item)
                    },
                    {
                        name: "new_value",
                        type: "input",
                        message: "Enter new value:",
                    }
                ]);

                let index_to_update = my_todo_list.indexOf(data.my_data)
                if(index_to_update === 0)
                {
                    my_todo_list.shift()
                    my_todo_list.unshift(data.new_value)
                }
                else
                {
                    my_todo_list.splice(index_to_update, index_to_update, data.new_value)                    
                }
                console.log("Task updated successfully:");
            }
            else
            {
                console.log("Your todo list is empty");
            }
        }
        else
        {
            check = false;
            console.log("Have a great day:");
        }
    }
}


todo_app()