#!/bin/bash
while true; do
  PID=$(lsof -ti:8686)

  if [[ ! -z "$PID" ]]; then
    echo "Port 8686 is in use by PID $PID. Attempting to kill..."
    kill $PID
    sleep 4
  fi

  echo "Starting the application foudre..."
  npm run start
  EXIT_CODE=$?
  if [ $EXIT_CODE -ne 0 ]; then
    echo "The program crashed with exit code $EXIT_CODE. Waiting before restarting..." >&2
    sleep 1
  else
    echo "The program exited successfully. No need to restart."
    break
  fi
done