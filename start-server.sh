#!/bin/bash
# list of severs to start
nodemon src/publisher.server.js & nodemon src/subscriber.server.js &