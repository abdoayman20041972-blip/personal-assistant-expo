#!/bin/sh
set -a
. ../.env.local
set +a
exec npx eas-cli@24.12.0 "$@"
