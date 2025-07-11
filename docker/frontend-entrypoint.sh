#!/bin/bash

cd /app/frontend

serve -s dist -l 80 &

wait -n
