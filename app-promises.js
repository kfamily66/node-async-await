const users = [
  {
    id: 1,
    name: "Mike",
    schoolId: 101
  },
  {
    id: 2,
    name: "Jen",
    schoolId: 999
  }
];

const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 80
  },
  {
    id: 2,
    schoolId: 999,
    grade: 95
  },
  {
    id: 3,
    schoolId: 101,
    grade: 85
  }
];

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`);
    }
  });
};

const getGrades = schoolId => {
  return new Promise((resolve, reject) => {
    return resolve(grades.filter(grade => grade.schoolId === schoolId));
  });
};

const getStatus = id => {
  let user;
  return getUser(id).then(tempUser => {
    user = tempUser;
    return getGrades(user.schoolId).then(grades => {
      let average = 0;

      if (grades.length > 0) {
        average =
          grades.map(grade => grade.grade).reduce((a, b) => a + b) /
          grades.length;

        return `${user.name} has ${average}% in a class.`;
      }
    });
  });
};

getUser(2)
  .then(user => console.log(user))
  .catch(err => console.log(err));

getGrades(101)
  .then(grades_list => console.log(grades_list))
  .catch(err => console.log(err));

getStatus(2)
  .then(status => console.log(status))
  .catch(err => console.log(err));
