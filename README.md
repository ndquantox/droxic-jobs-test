# ![VueJS]

----------

# Getting started

## Installation

Clone the repository

    git clone https://github.com/ndquantox/droxic-jobs-test.git

Switch to the repo folder

    cd droxic-jobs-test
    
Install dependencies
    
    npm install

----------

## NPM scripts

- `npm run serve` - Start application

----------

## Start application

- `npm run serve`
- Test application with `http://localhost:8080` in your favourite browser

----------

# Docker

- `docker run -it -p 8080:8080 --rm --name droxic-jobs-test-docker-1 droxic-jobs-test-docker` - Build docker container for VueJS application (Test application with `http://localhost:8080` in your favourite browser)
- `docker-compose down` - Remove docker containers