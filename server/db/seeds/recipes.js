/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('weekly_plan')
    .insert({ id: 1, week_start: '2026-11-09' })
    .onConflict('id')
    .ignore()
  await knex('recipes').del()
  await knex('recipes').insert([
    {
      id: 1,
      name: 'Tomato and basil pasta',
      description:
        'A quick pasta with cherry tomatoes, garlic, and fresh basil.',
      instruction:
        'Boil pasta until tender. Cook tomatoes and garlic in olive oil, then toss with pasta and basil.',
      weekly_plan_id: 1,
      planned_day: 'Monday',
      meal_type: 'Dinner',
    },
    {
      id: 2,
      name: 'Chickpea salad bowls',
      description:
        'A filling salad with chickpeas, cucumber, tomato, and lemon dressing.',
      instruction:
        'Rinse chickpeas and chop the vegetables. Mix with lemon juice, olive oil, salt, and pepper.',
      weekly_plan_id: 1,
      planned_day: 'Tuesday',
      meal_type: 'Lunch',
    },
    {
      id: 3,
      name: 'Vegetable fried rice',
      description:
        'A simple rice dish with mixed vegetables and scrambled egg.',
      instruction:
        'Scramble the egg and set aside. Stir-fry vegetables, add cooked rice and soy sauce, then mix in the egg.',
      weekly_plan_id: 1,
      planned_day: 'Wednesday',
      meal_type: 'Dinner',
    },
    {
      id: 4,
      name: 'Lentil and coconut curry',
      description:
        'Red lentils simmered in coconut milk with mild curry spices.',
      instruction:
        'Cook onion and curry spices until fragrant. Add lentils, coconut milk, and water; simmer until lentils are soft.',
      weekly_plan_id: 1,
      planned_day: 'Thursday',
      meal_type: 'Dinner',
    },
    {
      id: 5,
      name: 'Roasted vegetable wraps',
      description:
        'Warm wraps filled with roasted seasonal vegetables and hummus.',
      instruction:
        'Chop and roast vegetables until tender. Spread hummus on each wrap, add vegetables, and roll up.',
      weekly_plan_id: 1,
      planned_day: 'Friday',
      meal_type: 'Lunch',
    },
    {
      id: 6,
      name: 'Banana overnight oats',
      description:
        'Rolled oats soaked overnight with milk, banana, and a little honey.',
      instruction:
        'Mix oats, milk, sliced banana, and honey in a jar. Refrigerate overnight and serve chilled.',
      weekly_plan_id: 1,
      planned_day: 'Monday',
      meal_type: 'Breakfast',
    },
  ])
}
