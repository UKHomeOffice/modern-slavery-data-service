FROM node:10.15-slim

RUN addgroup --system app
RUN adduser --system app --ingroup app --uid 999 --home /app/
RUN chown -R app:app /app/

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci --production
COPY . /app

USER 999

#CMD npm start // Disabled to see dubugger logs
CMD npm run dev
