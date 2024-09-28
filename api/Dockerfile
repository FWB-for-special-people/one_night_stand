FROM python:3.12.6 AS development


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

ENV POETRY_VERSION=1.4.0 \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_HOME='/usr/local'

COPY ./install-poetry.py ./
RUN python3 install-poetry.py --version 1.7.0 \
    && $POETRY_HOME/bin/poetry --version

WORKDIR /app

RUN apt-get update \
    && apt-get install -y netcat-traditional \
    && apt-get clean

COPY ./pyproject.toml ./poetry.lock ./

RUN poetry install --no-interaction --no-ansi --no-root

COPY ./entrypoint.sh ./

RUN ["chmod", "+x", "./entrypoint.sh"]

ENTRYPOINT ["./entrypoint.sh"]

COPY . .

FROM development as prod

COPY --from=development /app /app

RUN poetry install --without dev --sync
