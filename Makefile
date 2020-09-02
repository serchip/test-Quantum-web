ifndef DC_BACKEND_FILE
	DC_BACKEND_FILE := src/backend/docker-compose.yml
endif
ifndef DC_FRONTEND_FILE
	DC_FRONTEND_FILE := src/frontend/docker-compose.yml
endif

DC_BACKEND_CMD = docker-compose -f ${DC_BACKEND_FILE}
DC_FRONTEND_CMD = docker-compose -f ${DC_FRONTEND_FILE}

bk-start:
	$(DC_BACKEND_CMD) up

bk-cli:
	$(DC_BACKEND_CMD) exec web bash

clean-backend:
	$(DC_BACKEND_CMD) rm

install-backend:
	$(DC_BACKEND_CMD) run --rm web ./manage.py migrate

bk-stop:
	$(DC_BACKEND_CMD) down

ft-start:
	$(DC_FRONTEND_CMD) up

ft-cli:
	$(DC_FRONTEND_CMD) exec frontend bash

ft-stop:
	$(DC_FRONTEND_CMD) down

build-frontend:
	@./node_modules/.bin/webpack --progress
