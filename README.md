## Setup backend

Change directory into backend

```shell
cd backend
```

### Setup virtual environment

Activate Virtual Environment (Windows)

```shell
source venv/Scripts/activate
```

Upgrade PIP

```shell
pip install --upgrade pip
```

### Install Python packages

Install required Python packages

```shell
pip3 install openai python-decouple fastapi "uvicorn[standard]" python-multipart
```

### Create Environment Variables

Create your .env file

```shell
touch .env
```

Update your .env file with the following. You can see your .env by typing sudo nano .env or just by clicking on the file if you are in VS Code.

```plain
OPEN_AI_ORG=enter-you-key-here
OPEN_AI_KEY=enter-you-key-here

### Start your backend server

Start your backend server

```shell
uvicorn main:app
```

Alternatively, you can ensure your server resets every time you make a change by typing:

```shell
uvicorn main:app -- reload
```


## Setup frontend

Change directory into frontend

```shell
cd frontend
```

Install packages

```shell
yarn install
```

Build application

```shell
yarn build
```

Start server in dev mode

```shell
yarn dev
```

You can check your dev server is working by going to:

```plain
http://localhost:5173/health
```

or alternatively in live mode:

```shell
yarn start
```
