import React, { useState } from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = () => {
  const [duration, setDuration] = useState(5);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    if (isRunning || !duration || duration < 0) return;
    setIsRunning(true);
    setProgress(0);
    const totalDuration = parseInt(duration, 10) * 1000;
    const intervalDuration = 50;
    const step = (100 / totalDuration) * intervalDuration;
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += step;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setIsRunning(false);
      }
      setProgress(currentProgress);
    }, intervalDuration);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === '') {
      setDuration(1);
    } else {
      setDuration(value);
    }
  };

  return (
    <>
      <div className={styles.titleDiv}>
        <div className={styles.line}></div>
        <div className={styles.content}>Time 1.5Hr</div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.mainDiv}>
          <input
            type='number'
            placeholder='Enter duration'
            value={duration}
            onChange={(e) => handleChange(e)}
            disabled={isRunning}
            className={styles.input}
            min={1}
          />
          <div className={styles.buttons}>
            <button disabled={isRunning || !duration} onClick={handleStart}>
              Start
            </button>
          </div>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          ></div>
          <p className={styles.percentage}>
            {Math.min(progress, 100).toFixed(0)}%
          </p>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
