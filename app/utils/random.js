export const departments = ['Engineering', 'Marketing', 'Finance', 'HR', 'Sales']

export function getRandomDepartment() {
  return departments[Math.floor(Math.random() * departments.length)]
}

export function getRandomRating() {
  return Math.floor(Math.random() * 5) + 1
}
