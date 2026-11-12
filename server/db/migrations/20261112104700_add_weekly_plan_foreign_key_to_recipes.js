/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const recipes = await knex('recipes').select(
    'id',
    'name',
    'description',
    'instruction',
    'weekly_plan_id',
    'planned_day',
    'meal_type',
  )

  await knex.schema.createTable('recipes_new', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
    table.string('instruction')
    table
      .integer('weekly_plan_id')
      .references('weekly_plan.id')
      .onDelete('CASCADE')
    table.string('planned_day')
    table.string('meal_type')
  })

  if (recipes.length > 0) {
    await knex('recipes_new').insert(recipes)
  }

  await knex.schema.dropTable('recipes')
  await knex.schema.renameTable('recipes_new', 'recipes')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  const recipes = await knex('recipes').select(
    'id',
    'name',
    'description',
    'instruction',
    'weekly_plan_id',
    'planned_day',
    'meal_type',
  )

  await knex.schema.createTable('recipes_old', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
    table.string('instruction')
    table.string('weekly_plan_id')
    table.string('planned_day')
    table.string('meal_type')
  })

  if (recipes.length > 0) {
    await knex('recipes_old').insert(recipes)
  }

  await knex.schema.dropTable('recipes')
  await knex.schema.renameTable('recipes_old', 'recipes')
}
