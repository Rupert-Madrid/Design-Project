  var BackgroundTimer, timer;

  BackgroundTimer = (function() {
    function BackgroundTimer(interval, callback) {
      this.interval = interval;
      this.callback = callback;
    }

    BackgroundTimer.prototype.start = function() {
      console.log("starting");
      if (this.tickingEnabled) {
        this.startTicking();
      }
      this.timerID = setTimeout((function(_this) {
        return function() {
          _this.callback();
          return _this.cancel();
        };
      })(this), this.interval);
      document.addEventListener('resume', (function(_this) {
        return function() {
          console.log("resume");
          return _this.wakeup();
        };
      })(this), false);
      this.expirationDate = moment(moment() + this.interval);
      return this.running = true;
    };

    BackgroundTimer.prototype.getRemaining = function() {
      return this.expirationDate - moment();
    };

    BackgroundTimer.prototype.wakeup = function() {
      var remaining;
      if (this.running) {
        remaining = this.getRemaining();
        this.cancel();
        if (remaining > 0) {
          this.constructor(remaining, this.callback);
          return this.start();
        } else {
          this.callback();
          return this.cancel;
        }
      }
    };

    BackgroundTimer.prototype.enableTicking = function(tickInterval, tickCallback) {
      this.tickInterval = tickInterval;
      this.tickCallback = tickCallback;
      return this.tickingEnabled = true;
    };

    BackgroundTimer.prototype.pauseTicking = function() {
      if (this.tickerID) {
        clearInterval(this.tickerID);
        return this.tickerID = null;
      }
    };

    BackgroundTimer.prototype.resumeTicking = function() {
      return this.startTicking();
    };

    BackgroundTimer.prototype.roundTime = function(time) {
      return Math.floor((time + 100) / 1000) * 1000;
    };

    BackgroundTimer.prototype.startTicking = function() {
      if (this.tickingEnabled) {
        return this.tickerID = setInterval((function(_this) {
          return function() {
            return _this.tickCallback(_this.roundTime(_this.getRemaining()));
          };
        })(this), this.tickInterval);
      }
    };

    BackgroundTimer.prototype.disableTicking = function() {
      if (this.tickerID) {
        this.tickingEnabled = false;
        clearInterval(this.tickerID);
        return this.tickerID = null;
      }
    };

    BackgroundTimer.prototype.cancel = function() {
      console.log("cancel");
      if (this.running) {
        this.running = false;
        this.pauseTicking();
        clearTimeout(this.timerID);
        return this.timerID = null;
      }
    };

    return BackgroundTimer;

  })();
