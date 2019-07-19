# deepra_ui

## Project setup (install requirements)
```bash
$ yarn install
```

### Run application on electron (with hot-reloads for development)
(require dependency: `vue-cli-plugin-electron-builder`)
```bash
$ yarn run electron:serve
```

### Build application
- dependency: `vue-cli-plugin-electron-builder`

    If this package has not been installed, run the following command to install it
    ```bash
    $ vue add electron-build
    ```

- build this project into a standalone application
    ```bash
    $ yarn run electron:build
    ```

### Setup `.proto` files from backend repository (permission of accessing repository is required)
```bash
$ python ./scripts/setup_api_protos.py
```

## Test setup
### Install chrome driver
1. You can download and setup driver by executing the following script

    ```bash
    # chromedriver 75 will be downloaded by default
    $ python ./script/setup_chrome_driver.py

    # or you can assign version of driver by adding argument with `-c`
    $ python ./script/setup_chrome_driver.py -c 73
    ```
    or you can download it manually from [offical page](http://chromedriver.chromium.org/downloads)

2. Make chrome driver be executable from command line (the following steps equal to the message generated by script)

    - On Windows, open `cmd.exe` and enter the following command to open environment variable editor:

        ```bat
        > rundll32 sysdm.cpl,EditEnvironmentVariables
        ```

    - On Linux, you may need to make downloaded chromedriver be an executable by

        ```bash
        $ chmod +x ~/bin/chromedriver
        ```

### Run test
- Unit tests of javascript stuff

    ```bash
    $ yarn run test:unit
    ```

- Intergration test (GUI test)

    ```bash
    # Install requirements if this is the first run (for Python 3.6, 3.7)
    $ pip install -r ./tests/requirements.txt

    # Run tests
    $ python ./scripts/run_pytest_bdd.py
    # or run tests with showing BDD-style scenario
    $ python ./scripts/run_pytest_bdd.py --show_scenario
    ```

- Manual test

    Make sure that there is not pre-installed python package: `autodl` and `deepra` on the machine.

    Or you have to make sure that the version of those package is the latest.

    1. Install backend server and its requirements

        ```bash
        # Install `autodl`
        $ git clone http://10.0.4.52:3000/muen/autodl.git
        $ cd autodl
        $ pip install .
        $ cd ..

        # Install `deepra`
        $ git clone http://10.0.4.52:3000/muen/deepra.git
        $ cd deepra
        $ pip install .  # TODO: add setup.py
        $ cd ..
        ```

    2. Clone source of this application (`deepra_ui`) and install requirements

        NOTE: make sure that you have `node.js` and `yarn` installed on your machine
        
        - if you don't have `node.js (v10.15.3)`, please download and install it from [here](https://nodejs.org/zh-tw/download/releases/)

        - if you don't have `yarn`, please download and install it from [here](https://yarnpkg.com/lang/en/docs/install/#windows-stable)

        ```bash
        $ git clone http://10.0.4.52:3000/muen/deepra_ui.git
        $ cd deepra_ui
        $ yarn install
        ```

    3. Launch backend server

        ```bash
        $ cd deepra
        $ python -m deepra.api.api_server
        ```

    4. Launch this application (`deepra_ui`)

        ```bash
        $ cd deerpa_ui
        $ yarn run electron:serve
        ```

    5. Start your test

    6. If you want to remove all installed packages, you can

        ```bash
        # remove `autodl`
        $ pip uninstall autodl

        # remove `deepra`
        $ pip uninstall deepra
        ```

        - To remove `deepra_ui`, you just have to remove the `deepra_ui` folder
