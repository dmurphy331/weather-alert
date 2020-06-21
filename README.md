# Approach

City list JSON downloaded from openweather API.
Tried inporting JSON locally but decided to move data to mongoDB and get using API vie expressJS for performance/scalabilty.

> **TODO:**
> - Interface and storage for adding/viewing favourites.
> - Create Interface for current and forecasted weather.
> - Add API call for hourly forecast https://openweathermap.org/api/hourly-forecast

# Setup

## Requirements

Please make sure you have the following minimum requirements on your machine. The project should function on Mac or PC.

- Node v12.16.1 or later
- Yarn 1.22.4 or later
- Docker

> **Mac OS Requirements installation**
>
> To get up and running on Mac OS, you can copy and paste following commands into a terminal in order.
>
> - `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
> - `brew install node@12`
> - `curl -o- -L https://yarnpkg.com/install.sh | bash`
> - `brew cask install docker`

## Project Quick Start

After installing the requirements above, in the project directory run `yarn && yarn start`. This will:

- Install node dependancies for the client and the server
- Download and start docker container for mongoDB (accessible on `localhost:27017` - details in `server/package.json`)
- Run PM2 in watch mode to start and live-refresh an express server (accessable at `http://localhost:8080/`)
- Start and live-refresh a react app on the client (accessable at `http://localhost:3000/`)

The client and server will reload if you make edits.
You will also see any lint errors in the console.
