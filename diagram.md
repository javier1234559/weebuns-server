``` json
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs


Enum user_role {
  user
  student
  teacher
  admin
}

Enum class_member_role {
  student
  teacher
}

Enum assignment_status {
  pending
  submitted
  graded
}

Enum auth_provider {
  local
  google
  facebook
}

Table users {
  id integer [primary key]
  username varchar [unique]
  email varchar [unique, not null]
  password_hash varchar
  role user_role [not null, default: 'user']
  auth_provider auth_provider [not null, default: 'local']
  auth_provider_id varchar
  first_name varchar
  last_name varchar
  profile_picture varchar
  is_email_verified boolean [default: false]
  last_login timestamp
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table classes {
  id integer [primary key]
  name varchar [not null]
  description text
  created_by integer [ref: > users.id]
  is_trial boolean [default: false]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
} 

Table class_members {
  id integer [primary key]
  class_id integer [ref: > classes.id]
  user_id integer [ref: > users.id]
  role class_member_role [not null]
  joined_at timestamp [default: `now()`]
}

Table assignments {
  id integer [primary key]
  class_id integer [ref: > classes.id]
  title varchar [not null]
  description text
  attachment_link varchar
  deadline timestamp
  created_by integer [ref: > users.id]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table assignment_submissions {
  id integer [primary key]
  assignment_id integer [ref: > assignments.id]
  user_id integer [ref: > users.id]
  submission_link varchar
  status assignment_status [default: 'pending']
  grade float
  feedback text
  submitted_at timestamp
  graded_at timestamp
}

Table quizzes {
  id integer [primary key]
  class_id integer [ref: > classes.id]
  title varchar [not null]
  description text
  time_limit integer // in minutes
  created_by integer [ref: > users.id]
  created_at timestamp [default: `now()`]
  updated_at timestamp [default: `now()`]
}

Table questions {
  id integer [primary key]
  quiz_id integer [ref: > quizzes.id]
  question_type varchar [not null] // e.g., 'multiple_choice', 'true_false', 'short_answer'
  question_text text [not null]
  options json // for multiple choice questions
  correct_answer varchar
  points integer [default: 1]
}

Table quiz_submissions {
  id integer [primary key]
  quiz_id integer [ref: > quizzes.id]
  user_id integer [ref: > users.id]
  start_time timestamp
  end_time timestamp
  score float
}

Table question_answers {
  id integer [primary key]
  submission_id integer [ref: > quiz_submissions.id]
  question_id integer [ref: > questions.id]
  user_answer varchar
  is_correct boolean
}



Ref: "quizzes"."id" < "quizzes"."created_at"
```