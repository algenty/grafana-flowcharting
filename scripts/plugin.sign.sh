export GRAFANA_API_KEY="$(cat ../key.txt)"
cd ..
npx @grafana/toolkit plugin:sign
