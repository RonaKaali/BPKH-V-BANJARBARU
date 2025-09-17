with import <nixpkgs> {};

mkShell {
  packages = [
    mongodb
    zip
  ];

  env = {
    MONGODB_URI = "mongodb://localhost:27017";
  };

  shellHook = ''
    echo "Welcome to your new workspace!"
    mkdir -p .local/share/mongodb
    mongod --dbpath .local/share/mongodb &
    npm run dev
  '';
}
