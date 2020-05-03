.PHONY: setup sync-certs copy-env enable-all deploy restart recreate build-recreate stop down destroy

ALL_DIRS              = $(shell cd services && ls -d */ | grep -v "_output" | grep -v "base")
ENABLED_DIRS          = $(shell cd services_enabled && ls -d */ | grep -v "_output" | grep -v "base")

export VAR_ALL_SERVICES       ?= $(ALL_DIRS:/=)
export VAR_ENABLED_SERVICES       ?= $(ENABLED_DIRS:/=)

setup:
	docker volume create development-volume; \
	make sync-certs;

sync-certs:
	cd jobs/self-signed-cert && docker-compose up --force-recreate self-signed-cert && docker-compose down --rmi local;

copy-env:
	$(foreach svc, $(VAR_ENABLED_SERVICES), \
		cp ./services_enabled/$(svc)/.env.sample ./services_enabled/$(svc)/.env; )

enable-all:
	$(foreach svc, $(VAR_ALL_SERVICES), \
		cp -r "./services/$(svc)" ./services_enabled; )

deploy:
	docker-compose up -d; \
	$(foreach svc, $(VAR_ENABLED_SERVICES), \
		cd "./services_enabled/$(svc)"; docker-compose up -d --remove-orphans; cd ../..; )

restart:
	docker-compose restart; \
	$(foreach svc, $(VAR_ENABLED_SERVICES), \
		cd "./services_enabled/$(svc)" && docker-compose restart && cd ../..; )

recreate:
	docker-compose up -d --force-recreate; \
	$(foreach svc, $(VAR_ENABLED_SERVICES), \
		cd "./services_enabled/$(svc)" && docker-compose up -d --remove-orphans --force-recreate && cd ../..; )

build-recreate:
	docker-compose up -d --build --force-recreate; \
	$(foreach svc, $(VAR_ENABLED_SERVICES), \
		cd "./services_enabled/$(svc)" && docker-compose up -d --remove-orphans --build --force-recreate && cd ../..; )

stop:
	$(foreach svc, $(VAR_ENABLED_SERVICES), \
		cd "./services_enabled/$(svc)" && docker-compose stop && cd ../..; )
	docker-compose stop;

down:
	$(foreach svc, $(VAR_ENABLED_SERVICES), \
		cd "./services_enabled/$(svc)" && docker-compose down && cd ../..; )
	docker-compose down;

destroy:
	$(foreach svc, $(VAR_ENABLED_SERVICES), \
		cd "./services_enabled/$(svc)" && docker-compose down --volumes --rmi local && cd ../..; )
	docker-compose down --volumes --rmi local;
