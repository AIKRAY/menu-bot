[![Deploy docker image](https://github.com/aikray/menu-bot-front/actions/workflows/deploy-docker-image.yml/badge.svg)](https://github.com/aikray/menu-bot-front/actions/workflows/deploy-docker-image.yml)

# Run docker frontend with local backend:

- remove `homepage` prop from `package.json`;
- start local backend;
- use `docker-compose-dev.yml` to create a frontend container;
- change `API_URL` constant to `http://localhost:3030`;

> Note: It will work for any variations: local/docker frontend + local/docker backend.
