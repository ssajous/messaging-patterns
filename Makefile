start:
	docker-compose up --build

scale-up:
	docker-compose up --scale work-queue-python-worker=10 --scale work-queue-js-worker=10 -d

single-workers:
	docker-compose up --scale work-queue-python-worker=1 --scale work-queue-js-worker=1 -d

no-workers:
	docker-compose up --build --scale work-queue-python-worker=0 --scale work-queue-js-worker=0 -d

stop:
	docker-compose down --remove-orphans
  