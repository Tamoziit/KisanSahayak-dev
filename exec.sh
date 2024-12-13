#!/bin/bash

# Function to open a new terminal window and run a command
open_terminal() {
    local cmd="$1"
    if command -v gnome-terminal >/dev/null 2>&1; then
        gnome-terminal -- bash -c "$cmd; exec bash"
    elif command -v xterm >/dev/null 2>&1; then
        xterm -e "$cmd; bash"
    elif command -v konsole >/dev/null 2>&1; then
        konsole -e "$cmd; bash"
    elif command -v powershell >/dev/null 2>&1; then
        powershell -Command "Start-Process powershell -ArgumentList '-NoExit', '-Command', \"$cmd\""
    else
        echo "No compatible terminal found. Please open a terminal manually."
        eval "$cmd"
    fi
}

# Commands to start the servers
backend_cmd="cd backend; npm start"
frontend_cmd="cd frontend; npm run dev"
ml_cmd="cd ML; uvicorn app:app --reload"

# Open terminals and run commands
open_terminal "$backend_cmd"
open_terminal "$frontend_cmd"
open_terminal "$ml_cmd"
