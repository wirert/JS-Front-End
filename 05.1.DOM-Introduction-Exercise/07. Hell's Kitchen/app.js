function solve() {
  document.querySelector("#btnSend").addEventListener("click", onClick);

  function createRestaurant(name, workers) {
    return {
      name,
      workers,
      averageSalary() {
        let total = workers.reduce((acc, curr) => (acc += curr.salary), 0);

        return (total / this.workers.length).toFixed(2);
      },
      bestSalary() {
        let bestSalary = this.workers[0].salary;
        return bestSalary.toFixed(2);
      },
    };
  }

  function parseInputIntoRestaurants(input) {
    let restaurants = [];
    input.forEach((text) => {
      let [name, workersInfo] = text.split(" - ");
      let workers = workersInfo
        .split(", ")
        .map((worker) => {
          let [name, salary] = worker.split(" ");
          return { name, salary: Number(salary) };
        })
        .sort((a, b) => b.salary - a.salary);
      let restaurant = restaurants.find((r) => r.name === name);
      if (restaurant) {
        restaurant.workers.push(...workers);
        restaurant.workers.sort((a, b) => b.salary - a.salary);
      } else {
        restaurants.push(createRestaurant(name, workers));
      }
    });

    return restaurants;
  }

  function onClick() {
    let input = document.querySelector("#inputs textarea");
    if (!input.value) {
      return;
    }
    inputText = JSON.parse(input.value);
    let restaurants = parseInputIntoRestaurants(inputText);

    restaurants.sort((a, b) => b.averageSalary() - a.averageSalary());

    let bestRestP = document.querySelector("#bestRestaurant p");
    let bestRestWorkersP = document.querySelector("#workers p");
    let bestRestaurant = restaurants[0];
    bestRestP.textContent = `Name: ${
      bestRestaurant.name
    } Average Salary: ${bestRestaurant.averageSalary()} Best Salary: ${bestRestaurant.bestSalary()}`;
    let workersText = bestRestaurant.workers
      .map((worker) => {
        return `Name: ${worker.name} With Salary: ${worker.salary}`;
      })
      .join(" ");

    bestRestWorkersP.textContent = workersText;
  }
}
