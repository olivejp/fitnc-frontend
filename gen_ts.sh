##################### Configuration globale du script
port=8080
#####################

# Ce script permet de regénérer rapidement le T.S. si l'application est lancée

curl --insecure "http://localhost:$port/V3/api-docs" > openapi.json

rc=$?
if [ $rc -ne 0 ] ; then
  echo Erreur curl, vérifiez que le serveur est bien démarré, exit code [$rc]; exit $rc
fi

rm src/app/shared/generated/model/*.gen.model.ts
rm src/app/shared/generated/api/*.gen.service.ts
./node_modules/@openapitools/openapi-generator-cli/main.js generate
rm openapi.json
