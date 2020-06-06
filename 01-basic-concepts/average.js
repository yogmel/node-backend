const scores = [90, 98, 89, 100, 100, 86, 94];
const scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

const average = scores => {
  const sum = scores.reduce((acc, curr) => acc + curr);
  console.log(Math.round(sum / scores.length));
}

average(scores);
average(scores2);
