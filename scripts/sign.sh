export GRAFANA_API_KEY="$(cat key.txt)"
npx @grafana/toolkit plugin:sign
