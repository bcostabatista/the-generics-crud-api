exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert([
          {
            email: 'administrator@example.com',
            //123456
            password: '$2a$10$JEWt8w0Gmwm0DrLSZ0OKI.GZ1NKY1nYSBDqgfMti3Y3T3oh5m/8zy',
            role: 'administrator',
            confirmed: true,
            status: 1,
            created_at: '2018-10-15 10:00',
          },
          {
            email: 'ordinary@example.com',
            //123456
            password: '$2a$10$JEWt8w0Gmwm0DrLSZ0OKI.GZ1NKY1nYSBDqgfMti3Y3T3oh5m/8zy',
            role: 'ordinary',
            confirmed: true,
            status: 1,
            created_at: '2018-10-15 10:00',
          }
        ])
      ])
    })
}