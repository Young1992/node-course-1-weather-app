console.log('Strating app');

setTimeout(() => {
  console.log('Inside of callbacks');
}, 2000);

setTimeout(() => {
  console.log('Inside of second callbacks');
}, 0);

console.log('Finishing app');
