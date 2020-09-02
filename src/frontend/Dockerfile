FROM node
RUN mkdir /code
WORKDIR /code
ADD package.json /code/
RUN npm cache clean -f
RUN npm install --no-progress --ignore-optional
ADD . /code/
