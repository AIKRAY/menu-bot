source ./.env

npm config set //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN} 
npm config set @aikray:registry=https://npm.pkg.github.com/

npm install
