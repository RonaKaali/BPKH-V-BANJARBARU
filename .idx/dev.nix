{ pkgs, ... }: {
  # You can install any package, this is just an example
  packages = [
    pkgs.mongodb
  ];

  # Sets environment variables in the workspace
  env = {};

  # The main shell to start when opening the workspace
  # Sets the welcome message as well
  start = ''
    echo "Welcome to your new workspace!"
    mkdir -p .local/share/mongodb
    mongod --dbpath .local/share/mongodb &
    # The command to start your application
    npm run dev
  '';
}
