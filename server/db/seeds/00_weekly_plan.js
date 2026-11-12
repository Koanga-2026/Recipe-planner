/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Replace the planned weeks so the seed can be rerun.
  await knex('weekly_plan').del()
  await knex('weekly_plan').insert([
    { id: 1, week_start: '7/1/2027' },
    { id: 2, week_start: '14/1/2027' },
    { id: 3, week_start: '21/1/2027' },
  ])
}
