const eventFactory = (function() {
  return {
    createEvent: function() {
      const event = {
        listeners: []
      };

      event.attach = function(listener) {
        event.listeners.push(listener);
      };

      event.notify = function(args) {
        for (let i = 0; i < this.listeners.length; i++) {
          this.listeners[i](args);
        }
      };

      return event;
    }
  };
})();

export default eventFactory;