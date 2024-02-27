import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('tasks', (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();;
        table.boolean('is_completed').notNullable().defaultTo(false);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('tasks');
}

