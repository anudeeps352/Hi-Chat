@echo off

rem Check if two arguments are provided
if "%1"=="" goto :error
if "%2"=="" goto :error

rem Check if argument 1 (type) is either "prod" or "dev"
if /i "%1"=="prod" (
    set COMPOSE_FILE=docker-compose.prod.yaml
) else if /i "%1"=="dev" (
    set COMPOSE_FILE=docker-compose.dev.yaml
) else (
    goto :error
)

rem Check if argument 2 (UporDown) is either "up" or "down"
if /i "%2"=="up" (
    set ACTION=up
) else if /i "%2"=="down" (
    set ACTION=down
) else (
    goto :error
)

rem Execute docker-compose command
echo Running docker-compose -f docker-compose.yaml -f %COMPOSE_FILE% %ACTION%
docker-compose -f docker-compose.yaml -f %COMPOSE_FILE% %ACTION%
goto :eof

:error
echo Error: Arguments should follow the format "prod|dev up|down"
goto :eof