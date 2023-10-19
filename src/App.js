import './App.css';
import React from 'react'

function App() {
  var miliseconds = 0
  var lapsDisplay = `Lap | Lap-time    | Overall-time`
  var lapCounter = 0
  var lapOverall = '00:00:00,00'
  var lapHour = 0
  var lapMinute = 0
  var lapSecond = 0
  var lapMilisecond = 0
  var previousMiliseconds = 0
  let interval;

  function startTimer() {
    if (document.getElementById('start').textContent === 'Start') {
      interval = setInterval(runTimer, 10)
      document.getElementById('start').innerHTML = 'Stop'
      document.getElementById('lap').innerHTML = 'Lap'
    } else if (document.getElementById('start').textContent === 'Stop') {
      clearInterval(interval)
      document.getElementById('start').innerHTML = 'Resume'
      document.getElementById('lap').innerHTML = 'Reset'
    } else {
      interval = setInterval(runTimer, 10)
      document.getElementById('start').innerHTML = 'Stop'
      document.getElementById('lap').innerHTML = 'Lap'
    }
  }

  function lapTimer() {
    if (document.getElementById('lap').textContent === 'Lap') {
      ++lapCounter;
      var computedLapCounter = ''
      if (lapCounter < 10) {
        computedLapCounter = `00${lapCounter}`
      } else if (lapCounter < 100) {
        computedLapCounter = `0${lapCounter}`
      } else if (lapCounter < 1000) {
        computedLapCounter = `${lapCounter}`
      } else {
        computedLapCounter = '---'
      }

      var lapMiliseconds = Math.abs(miliseconds - previousMiliseconds)
      lapHour = Math.floor(lapMiliseconds / 360000)
      lapMinute = Math.floor((lapMiliseconds - (lapHour * 360000)) / 6000)
      lapSecond = Math.floor((lapMiliseconds - ((lapHour * 360000) + (lapMinute * 6000))) / 100)
      lapMilisecond = lapMiliseconds - ((lapHour * 360000) + (lapMinute * 6000) + (lapSecond * 100))

      var computedLapHour = ''
      if (lapHour < 10) {
        computedLapHour = `0${lapHour}`
      } else {
        computedLapHour = `${lapHour}`
      }
      var computedLapMinute = ''
      if (lapMinute < 10) {
        computedLapMinute = `0${lapMinute}`
      } else {
        computedLapMinute = `${lapMinute}`
      }
      var computedLapSecond = ''
      if (lapSecond < 10) {
        computedLapSecond = `0${lapSecond}`
      } else {
        computedLapSecond = `${lapSecond}`
      }
      var computedLapMilisecond = ''
      if (lapMilisecond < 10) {
        computedLapMilisecond = `0${lapMilisecond}`
      } else {
        computedLapMilisecond = `${lapMilisecond}`
      }
      
      lapOverall = `${document.getElementById('display').textContent}`
      
      if (lapCounter === 1) {
        document.getElementById('lastLap').innerHTML = 'Last Lap Data'
        document.getElementById('lapData').innerHTML = `| ${lapsDisplay} |`
        document.getElementById('laps').innerHTML = 'See Console for more Laps Information'
        console.log(`| ${lapsDisplay} |`)
      }
      // Possible add-on: fastest and slowest lap
      document.getElementById('currentLapData').innerHTML = `| ${computedLapCounter} | ${computedLapHour}:${computedLapMinute}:${computedLapSecond},${computedLapMilisecond} | ${lapOverall}  |`
      console.log(`| ${computedLapCounter} | ${computedLapHour}:${computedLapMinute}:${computedLapSecond},${computedLapMilisecond} | ${lapOverall}  |`)
      
      lapHour = 0
      lapMinute = 0
      lapSecond = 0
      lapMilisecond = 0
      previousMiliseconds = miliseconds
    } else if (document.getElementById('lap').textContent === 'Reset') {
      clearInterval(interval)
      miliseconds = 0
      lapsDisplay = `Lap | Lap-time    | Overall-time`
      lapCounter = 0
      lapOverall = '00:00:00,00'
      lapHour = 0
      lapMinute = 0
      lapSecond = 0
      lapMilisecond = 0
      previousMiliseconds = 0
      document.getElementById('display').innerHTML = '00:00:00,00'
      document.getElementById('start').innerHTML = 'Start'
      document.getElementById('lap').innerHTML = 'lap'
      document.getElementById('lastLap').innerHTML = ''
      document.getElementById('lapData').innerHTML = ''
      document.getElementById('currentLapData').innerHTML = ''
      document.getElementById('laps').innerHTML = ''
    }
  }

  function runTimer() {
    ++miliseconds;
    
    var hour = Math.floor(miliseconds / 360000);
    var computedHour = ''
    if (hour < 10) {
      computedHour = `0${hour}`
    } else {
      computedHour = `${hour}`
    }
    
    var minute = Math.floor((miliseconds - (hour * 360000)) / 6000);
    var computedMinute = ''
    if (minute < 10) {
      computedMinute = `0${minute}`
    } else {
      computedMinute = `${minute}`
    }

    var second = Math.floor(
      (miliseconds - ((hour * 360000) + (minute * 6000))) / 100
    )
    var computedSecond = ''
    if (second < 10) {
      computedSecond = `0${second}`
    } else {
      computedSecond = `${second}`
    }

    var milisecond = miliseconds - (
      (hour * 360000) + (minute * 6000) + (second * 100)
    )
    var computedMilisecond = ''
    if (milisecond < 10) {
      computedMilisecond = `0${milisecond}`
    } else {
      computedMilisecond = `${milisecond}`
    }
    
    document.getElementById('display').innerHTML =
      `${computedHour}:${computedMinute}:${computedSecond},${computedMilisecond}`
  }

  return (
    <div className='App'>
      <p id='display'>00:00:00,00</p>
      <button id='lap' onClick={lapTimer}>lap</button>
      <button id='start' onClick={startTimer}>Start</button>
      <div>
        <p id='lastLap'></p>
        <p id='lapData'></p>
        <p id='currentLapData'></p>
        <p id='laps'></p>
      </div>
    </div>
  );
}

export default App;
