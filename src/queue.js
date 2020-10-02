import React, {useState, useEffect} from 'react'





export default function queue() {
  function useTheInterval() {

    const [seconds, setSeconds]=useState(0);
    const {queue, myName}=this.state;

    useEffect(() => {
      const interval=setInterval(() => {
        setSeconds(seconds => seconds+1);
      }, 5000);
      if(queue[0]===myName) {return () => clearInterval(interval);}
    }, [queue, myName]);
  }



  return ('something')
}
