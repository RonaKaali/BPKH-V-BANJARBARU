{ pkgs, ... }: {
  # You can install any package, this is just an example
  packages = [
    pkgs.mongodb
  ];

  # Sets environment variables in the workspace
  env = {};

  # Search for the starship package in nixpkgs
  # Adds it to the shell
  # You can also use legacyPackages.starship
  pre-init = ''
    mkdir -p .local/share/mongodb
    mongod --dbpath .local/share/mongodb &
  '';

  # The main shell to start when opening the workspace
  # Sets the welcome message as well
  start = ''
    echo "Welcome to your new workspace!"
    # The command to start your application
    npm run dev
  '';
}
