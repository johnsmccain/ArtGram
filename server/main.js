import redisClient from './utils/redis';

(async () => {
  console.log(redisClient.isAlive());
  console.log('Main code line 2');
  console.log(await redisClient.get('myKey'));
  console.log('Main code line 3');
  await redisClient.set('myKey', 12, 5);
  console.log(await redisClient.get('myKey'));

  // setTimeout(async () => {
  //   console.log(await redisClient.get('myKey'));
  // }, 1000 * 10);
})();
