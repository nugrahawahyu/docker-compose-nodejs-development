.PHONY: deploy recreate stop down

DIRS          = $(shell cd services && ls -d */ | grep -v "_output" | grep -v "base")

export VAR_SERVICES       ?= $(DIRS:/=)

deploy:
	$(shell docker-compose up -d) \
	$(foreach svc, $(VAR_SERVICES), \
		$(shell cd "./services/$(svc)" && docker-compose up -d) )

recreate:
	$(shell docker-compose up -d) \
	$(foreach svc, $(VAR_SERVICES), \
		$(shell cd "./services/$(svc)" && docker-compose up -d --build --force-recreate) )

stop:
	$(foreach svc, $(VAR_SERVICES), \
		$(shell cd "./services/$(svc)" && docker-compose stop) )
	$(shell docker-compose stop)

down:
	$(foreach svc, $(VAR_SERVICES), \
		$(shell cd "./services/$(svc)" && docker-compose down) )
	$(shell docker-compose down)
