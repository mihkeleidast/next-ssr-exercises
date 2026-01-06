'use client';
import React from 'react';
import format from 'date-fns/format';

import Spinner from '../../../components/Spinner'

function Clock() {
  const [time, setTime] = React.useState(null);

  React.useEffect(() => {
    setTime(new Date());
  }, []);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 50);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  if (!time) {
    return <Spinner />
  }

  return (
    <p className="clock">{format(time, 'hh:mm:ss.S a')}</p>
  );
}

export default Clock;
