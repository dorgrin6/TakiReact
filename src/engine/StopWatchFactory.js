// inspired by https://stackoverflow.com/questions/1210701/compute-elapsed-time
const stopWatchFactory = (function() {
  return {
    stoppedValue: null,
    // from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript/21294619
    millisToMinutesAndSeconds: function(millis) {
      let minutes = Math.floor(millis / 60000);
      let seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },

    createStopWatch: function() {
      const stopWatch = {};

      stopWatch.startMillisecs = 0;
      stopWatch.elapsedMillisecs = 0;

      stopWatch.start = function() {
        stopWatch.stoppedValue = null;
        stopWatch.startMillisecs = new Date().getTime();
      };

      stopWatch.stop = function() {
        stopWatch.stoppedValue = stopWatch.elapsedMillisecs;
        return stopWatch.stoppedValue;
      };

      stopWatch.getElapsedTime = function() {
        if (stopWatch.stoppedValue) {
          return stopWatch.stoppedValue;
        }
        return stopWatchFactory.millisToMinutesAndSeconds(
          new Date().getTime() - stopWatch.startMillisecs
        );
      };

      stopWatch.getElapsedTimeInMillis = function() {
        return new Date().getTime() - stopWatch.startMillisecs;
      };

      stopWatch.reset = function() {
        stopWatch.elapsedMillisecs = 0;
        stopWatch.startMillisecs = 0;
      };

      return stopWatch;
    }
  };
})();

export default stopWatchFactory;
