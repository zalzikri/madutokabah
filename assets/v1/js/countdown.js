(function () {
  var duration = 12624 * 1000;
  var storageKey = 'mta-countdown-end-v1';
  var output = document.getElementById('mta-countdown-value');
  if (!output) return;

  var now = Date.now();
  var end = 0;
  try { end = parseInt(localStorage.getItem(storageKey), 10) || 0; } catch (error) {}

  if (!end) {
    end = now + duration;
  } else if (Math.sign(end - now) !== 1) {
    end += (Math.floor((now - end) / duration) + 1) * duration;
  }

  try { localStorage.setItem(storageKey, String(end)); } catch (error) {}

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function updateCountdown() {
    var remaining = end - Date.now();
    if (Math.sign(remaining) !== 1) {
      end += (Math.floor(Math.abs(remaining) / duration) + 1) * duration;
      try { localStorage.setItem(storageKey, String(end)); } catch (error) {}
      remaining = end - Date.now();
    }

    var seconds = Math.max(0, Math.ceil(remaining / 1000));
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var secs = seconds % 60;
    output.textContent = pad(hours) + ' : ' + pad(minutes) + ' : ' + pad(secs);
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
