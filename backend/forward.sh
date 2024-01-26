#!/bin/bash

#generates a random port between 2000-65000 and checks if it is already open. if it is it loops again, else it exports the port
function random_unused_port {
    local port=$(shuf -i 2000-65000 -n 1)
    netstat -lat | grep $port > /dev/null
    if [[ $? == 1 ]] ; then
        export RANDOM_PORT=$port
    else
        random_unused_port
    fi
}

random_unused_port

# Echoing out the variable
echo $RANDOM_PORT

# Running the JavaScript file with the variable as an argument
node mqtt-port-forward.js $RANDOM_PORT
