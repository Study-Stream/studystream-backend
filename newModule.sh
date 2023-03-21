# Description: This script will create a new module for the project
#!/bin/bash

# Get the module name from the user
echo "Enter the module name: "
read moduleName

# Create the module directory
nest g module $moduleName
# Create the controller
nest g controller $moduleName
# Create the service
nest g service $moduleName
# Create the entity
