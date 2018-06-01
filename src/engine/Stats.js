import stopWatchFactory from "../engine/StopWatchFactory.js";

const stats = (function() {
  const gameWatch = stopWatchFactory.createStopWatch();

  return {
    gamesAmount: 0,
    turnAmount: 0,
    gameWatch: gameWatch,
    getElapsedTime: function() {
      return stats.gameWatch.getElapsedTime();
    },

    resetGameWatch: function(){
      this.gameWatch.reset();
    },

    copyState: function() {
      return {
        gamesAmount: stats.gamesAmount,
        turnAmount: stats.turnAmount,
        gameElapsedTime: stats.getElapsedTime()
      };
    }
  };
})();

export default stats;
