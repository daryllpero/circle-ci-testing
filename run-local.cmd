@echo off

echo ===== START PIPELINE ===== > output.log
echo. >> output.log

echo ========== BACKEND TESTS STARTED ========== >> output.log
echo. >> output.log
call npm test >> output.log 2>&1
echo. >> output.log

echo ========== FRONTEND TESTS STARTED ========== >> output.log
echo. >> output.log
call npm run frontend:test >> output.log 2>&1
echo. >> output.log

echo ========== PYTHON LINT STARTED ========== >> output.log
echo. >> output.log
cd pythonFiles
flake8 . >> ..\output.log 2>&1
echo. >> ..\output.log

echo ========== PYTHON TESTS STARTED ========== >> ..\output.log
echo. >> ..\output.log
pytest >> ..\output.log 2>&1
echo. >> ..\output.log
cd ..

echo ===== END PIPELINE ===== >> output.log