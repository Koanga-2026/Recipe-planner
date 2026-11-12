/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  await knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
    table.string('instruction')
    table.string('weekly_plan_id')
    table.string('planned_day')
    table.string('meal_type')
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
  await knex.schema.dropTable('recipes')
};
