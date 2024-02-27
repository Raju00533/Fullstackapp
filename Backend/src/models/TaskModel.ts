import knex from "../db/knex";


class Todo {
    public static table = "tasks";

    public static async getAllTasks() {
        const tasks = await knex(this.table).select();
        return tasks;
    }

    public static async addTask(name: String){
        const insertedValue = await knex(this.table).insert({
            name:name,
        }).returning('*');

        return  insertedValue;
    }

    public static async deleteTask(id: number) {
        const deletedValue = await knex(this.table)
        .where('id', id)
        .del().returning('*');

        return deletedValue;
    }

    public static async editTask(id:number, name:string, is_completed:boolean){
        const editedValue = await knex(this.table).where('id', id).update({
            name: name,
            is_completed: is_completed
        }).returning('*');

        return editedValue;
    }


    

}



    


export default Todo;





