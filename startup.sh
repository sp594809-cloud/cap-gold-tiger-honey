#!/bin/bash
if curl -sf -o /dev/null --max-time 1 http://127.0.0.1:8080/; then
  exit 0
fi
cd /home/workdir/artifacts || exit 1
nohup npm run dev > /tmp/mangaldeep-dev.log 2>&1 &
sleep 2
exit 0
