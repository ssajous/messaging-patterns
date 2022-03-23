start:
	docker-compose up --build

scale-up:
	docker-compose up --scale work-queue-python-worker=10 --scale work-queue-js-worker=10 -d

scale-down:
	docker-compose up --scale work-queue-python-worker=1 --scale work-queue-js-worker=1 -d

stop:
	docker-compose down --remove-orphans
