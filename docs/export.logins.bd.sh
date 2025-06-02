#!/bin/bash

docker exec -i vivotvshop-postgres-1 psql -U postgres -d auth_db -c "\copy (SELECT * FROM logins) TO STDOUT WITH CSV HEADER" > logins.csv
