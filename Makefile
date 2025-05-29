build:
	docker-compose build --no-cache
up:
	docker-compose up
down:
	docker-compose down
dev:
	docker-compose -f docker-compose.backend.yml up
end:
	docker-compose -f docker-compose.backend.yml down
dev-build:
	docker-compose -f docker-compose.backend.yml up --build